import type { Event as Evt } from "../../structures/Event";
export interface Event extends Evt {
    before: Function;
    execute: Function;
}
export interface IEventMeta {
    name: string;
    description: string;
    once: boolean;
}
