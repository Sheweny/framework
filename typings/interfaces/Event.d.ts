/// <reference types="node" />
import type { EventEmitter } from "events";
export interface EventOptions {
    description?: string;
    emitter: Emitter;
    once?: boolean;
}
export declare type Emitter = "client" | "commandManager" | EventEmitter;
