export interface IServerResponse<T> {
  done: boolean;
  title?: string;
  message?: string;
  data: T;
}
