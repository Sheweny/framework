import type { EventEmitter } from "events";

export interface EventOptions {
  description?: string;
  emitter: Emitter;
  once?: boolean;
}

export type Emitter = "client" | "commandManager" | EventEmitter;
