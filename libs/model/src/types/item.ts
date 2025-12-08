export interface ItemBase {
  id: number;
  active: boolean;
  deleted: boolean;
  created: string;
  updated: string;
}

export interface ItemLocaleBase<T> {
  locale: {
    [k: string]: T;
  };
}
