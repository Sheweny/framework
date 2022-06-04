"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsManager = void 0;
const node_events_1 = require("node:events");
const Loader_1 = require("../utils/Loader");
const helpers_1 = require("../helpers");
const index_1 = require("./index");
/**
 * Manager for Events
 */
class EventsManager extends index_1.BaseManager {
    /**
     * Constructor to manage events
     * @param {ShewenyClient} client Client framework
     * @param {EventsManagerOptions} [options] The options of the event manager
     */
    constructor(client, options) {
        super(client, options);
        this.default = {
            emitter: options.default?.emitter,
            once: options.default?.once,
        };
    }
    /**
     * Load all events in collection
     * @returns {Promise<Collection<string, Event>>} the events
     */
    async loadAll() {
        const loader = new Loader_1.Loader(this.client, this.directory, 'name', this);
        this.events = await loader.load();
        new helpers_1.ShewenyInformation(this.client, `- Events loaded : ${this.events.size}`);
        // Register
        await this.registerAll(this.events);
        return this.events;
    }
    /**
     * Emit all events in collection
     * @param {Collection<string, Event> | undefined} [events] Events collection that will be emit
     * @returns {Promise<void>}
     */
    async registerAll(events = this.events) {
        if (!events)
            throw new Error('No events found');
        for (const [name, evt] of events) {
            if (!(evt.emitter instanceof node_events_1.EventEmitter))
                throw new TypeError(`Event ${name} does not have a valid emitter.`);
            if (evt.once)
                evt.emitter.once(name, (...args) => evt.execute(...args));
            else
                evt.emitter.on(name, (...args) => evt.execute(...args));
        }
    }
    /**
     * Unload all events
     * @returns {void}
     */
    unloadAll() {
        this.events = null;
        this.client.collections.events.clear();
    }
}
exports.EventsManager = EventsManager;
