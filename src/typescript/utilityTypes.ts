/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export type Awaitable<T> = PromiseLike<T> | T;
export type Constructable<V> = new (...args: unknown[]) => V;

type CallbackFunctionVariadic = (...args: any[]) => string;

export interface IMessages {
  [key: string]: CallbackFunctionVariadic;
}

type Abstract<T> = Function & { prototype: T };
type Constructor<T> = new (...args: any[]) => T;
export type Class<T> = Abstract<T> | Constructor<T>;
