export interface DefaultResponse {
  status: number;
  message?: string;
}

export interface GetResponseArray<T> extends DefaultResponse {
  items: T[];
}

export interface GetResponseOne<T> extends DefaultResponse {
  item: T;
}
