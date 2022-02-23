export type Awaitable<T> = PromiseLike<T> | T;
export type Constructable<V> = new (...args: unknown[]) => V;
// eslint-disable-next-line
type CallbackFunctionVariadic = (...args: any[]) => string;

export interface IMessages {
  [key: string]: CallbackFunctionVariadic;
}
