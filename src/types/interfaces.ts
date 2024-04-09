import { DocumentData } from "firebase/firestore";

export interface Builder {
  [key: string]: {
    state: boolean;
    value: string;
  };
}

export interface Columns {
  [key: string]: {
    name: string;
    cards: string[];
  };
}

interface Card {
  name: string;
  lastEditedBy: string;
  lastEditedAt: Date;
}


export interface Snapshot {
  [key: string]: DocumentData;
}

export interface Board {
  id?: string;
  order: string[];
  name: string;
  description: string;
  createdAt: string;
  public: boolean;
}
