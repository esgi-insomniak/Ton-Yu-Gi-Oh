export interface DefaultResponse {
  status: number;
  message?: string;
}

export interface QueryGetItems {
  limit: number;
  offset: number;
}

export interface ParamGetItemById {
  id: string;
}

export interface GetResponseArray<T> extends DefaultResponse {
  items: T[];
}

export interface GetResponseOne<T> extends DefaultResponse {
  item: T;
}
