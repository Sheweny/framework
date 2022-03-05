export declare type Awaitable<T> = PromiseLike<T> | T;
export declare type Constructable<V> = new (...args: unknown[]) => V;
declare type CallbackFunctionVariadic = (...args: any[]) => string;
export interface IMessages {
    [key: string]: CallbackFunctionVariadic;
}
export {};
