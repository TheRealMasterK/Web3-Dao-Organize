import { create } from "zustand";
import { DropResult } from "react-beautiful-dnd";
import {
  collection,
  DocumentReference,
  DocumentData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  Query,
} from "firebase/firestore";
import { uuidv4 as uuid } from "@firebase/util";

import { database } from "@/lib/firebase";

import { Cards, Columns, Board, Snapshot, Builder } from "@/types/interfaces";

interface Store {
  path: string;
  order: string[];
  cards: Cards;
  board: Board | null;
  columns: Columns;
  builder: Builder;
  status: number;

  ownerID: string;
  boardID: string;
  userID: string | null;
  updateChecklist: (cardID: string, checklist: { item: string; checked: boolean }[]) => void;


  boardDocRef: (pathSegments?: string[]) => DocumentReference;
  boardCollectionRef: (pathSegments?: string[]) => Query<DocumentData>;

  updateBuilder: (payload: any) => void;
  setStatus: (payload: number) => void;

  addCard: (column: string) => void;
  editCard: (id: string, name: string) => void;
  deleteCard: (columnID: string, ID: string) => void;
  deleteAllColumnCards: (columnID: string) => void;

  updateBoard: (payload: any) => void;
  deleteBoard: () => void;

  fetchBoard: () => void;
  fetchCards: () => void;
  fetchColumns: () => void;
  initializeBoard: (ownerID: string, boardID: string, userID: string) => void;

  DragAndDrop: (result: DropResult) => void;
}

const useBoardStore = create<Store>((set, get) => ({
  path: "",
  order: [],
  cards: {},
  board: null,
  columns: {},
  builder: {},
  status: 0,

  ownerID: "",
  boardID: "",
  userID: null,

  boardDocRef: (pathSegments?: string[]) =>
    doc(database, get().path, ...(pathSegments?.length ? pathSegments : [])),
  boardCollectionRef: (pathSegments?: string[]) =>
    collection(
      database,
      get().path,
      ...(pathSegments?.length ? pathSegments : [])
    ),

  updateBuilder: (payload: any) =>
    set((state) => ({ builder: { ...state.builder, ...payload } })),
  setStatus: (payload: number) => set({ status: payload }),

  addCard: (column: string) => {
    if (!get().builder[column].value) return;
    const id = uuid();
    const card = { [id]: { name: get().builder[column].value } };
    const columnCards = [...get().columns[column].cards, id];

    set({ cards: { ...get().cards, ...card } });
    set({
      columns: {
        ...get().columns,
        [column]: { ...get().columns[column], cards: columnCards },
      },
    });
    updateDoc(get().boardDocRef(["columns", column]), { cards: columnCards });
    setDoc(get().boardDocRef(["cards", id]), card[id]);
    get().updateBuilder({ [column]: { state: false, value: "" } });
  },

  updateChecklist: async (cardID: string, checklist: { item: string; checked: boolean }[]) => {
    console.log(`Updating checklist for card ID: ${cardID}`);
    await updateDoc(get().boardDocRef(["cards", cardID]), { checklist });
    console.log(`Updated checklist: ${JSON.stringify(checklist)}`);
    set((state) => ({
      cards: {
        ...state.cards,
        [cardID]: { ...state.cards[cardID], checklist },
      },
    }));
  },




  editCard: (id: string, name: string) => {
    set({
      cards: { ...get().cards, [id]: { ...get().cards[id], name: name } },
    });
    updateDoc(get().boardDocRef(["cards", id]), { name: name });
  },

  deleteCard: async (columnID: string, cardID: string) => {
    const columnCards = get().columns[columnID].cards.filter(
      (card) => card !== cardID
    );
    await deleteDoc(get().boardDocRef(["cards", cardID]));
    await updateDoc(get().boardDocRef(["columns", columnID]), {
      cards: columnCards,
    });

    set((state) => ({
      columns: {
        ...state.columns,
        [columnID]: {
          ...state.columns[columnID],
          cards: [...columnCards],
        },
      },
    }));
  },
  deleteAllColumnCards: async (columnID: string) => {
    const cards = get().cards;
    const columnCards = get().columns[columnID].cards;
    await updateDoc(get().boardDocRef(["columns", columnID]), { cards: [] });
    columnCards.forEach((cardID) => {
      deleteDoc(get().boardDocRef(["cards", cardID]));
      delete cards[cardID];
    });
    set((state) => ({
      columns: {
        ...state.columns,
        [columnID]: {
          ...state.columns[columnID],
          cards: [],
        },
      },
      cards,
    }));
  },

  updateBoard: async (payload: any) => {
    if (get()?.userID !== get().ownerID) return;
    await updateDoc(get().boardDocRef(), payload);
    set({ board: payload });
  },

  deleteBoard: async () => {
    if (get()?.userID !== get().ownerID) return;
    await deleteDoc(get().boardDocRef());
  },

  fetchBoard: async () => {
    const docSnap = await getDoc(get().boardDocRef());

    if (!docSnap.exists()) return set({ status: 404 });
    if (!docSnap.data().public && get().userID !== get().ownerID)
      return set({ status: 401 });

    set({
      order: docSnap.data().order,
      board: docSnap.data() as Board,
      status: 200,
    });
  },

  fetchColumns: async () => {
    const snapshot = await getDocs(get().boardCollectionRef(["columns"]));
    const snapColumns: Snapshot = {};
    const builder: Builder = {};

    snapshot.forEach((column) => {
      if (column.exists()) {
        snapColumns[column.id] = column.data();
        builder[column.id] = { state: false, value: "" };
      }
    });

    set({ columns: snapColumns as Columns, builder });
  },

  fetchCards: async () => {
    const snapshotCards = await getDocs(get().boardCollectionRef(["cards"]));
    const snapCards: Snapshot = {};

    snapshotCards.forEach((card) => {
      if (card.exists()) snapCards[card.id] = card.data();
    });

    set({ cards: snapCards as Cards });
  },

  initializeBoard: (ownerID: string, boardID: string, userID: string) => {
    if (!ownerID || !boardID) return set({ status: 404 });
    set({
      ownerID,
      boardID,
      userID,
      path: `users/${ownerID}/boards/${boardID}`,
    });
    get().fetchBoard();
    get().fetchCards();
    get().fetchColumns();
  },

  DragAndDrop: (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const sourceCards = [...get().columns[source.droppableId].cards];
      sourceCards.splice(source.index, 1);
      sourceCards.splice(destination.index, 0, result.draggableId);
      set((state) => ({
        columns: {
          ...state.columns,
          [source.droppableId]: {
            ...state.columns[source.droppableId],
            cards: sourceCards,
          },
        },
      }));

      updateDoc(get().boardDocRef(["columns", source.droppableId]), {
        cards: sourceCards,
      });
    } else {
      const sourceCards = [...get().columns[source.droppableId].cards];
      const destinationCards = [
        ...get().columns[destination.droppableId].cards,
      ];

      sourceCards.splice(source.index, 1);
      destinationCards.splice(destination.index, 0, result.draggableId);
      set((state) => ({
        columns: {
          ...state.columns,
          [source.droppableId]: {
            ...state.columns[source.droppableId],
            cards: sourceCards,
          },
          [destination.droppableId]: {
            ...state.columns[destination.droppableId],
            cards: destinationCards,
          },
        },
      }));

      updateDoc(get().boardDocRef(["columns", source.droppableId]), {
        cards: sourceCards,
      });
      updateDoc(get().boardDocRef(["columns", destination.droppableId]), {
        cards: destinationCards,
      });
    }
  },
}));

export default useBoardStore;
