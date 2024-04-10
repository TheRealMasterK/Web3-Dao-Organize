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

export interface Cards {
  [key: string]: {
    name: string;
  };
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


export interface ChecklistItem {
  value: string;
  checked: boolean;
}

export interface CardBuilderProps {
  columnID: string;
}

export interface CardBuilderState {
  checklist: ChecklistItem[];
  viewImages: boolean;
  viewVideos: boolean;
}

