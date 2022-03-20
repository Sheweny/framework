"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsManager = void 0;
const events_1 = require("events");
const _1 = require(".");
const loadFiles_1 = require("../utils/loadFiles");
const helpers_1 = require("../helpers");
/**
 * Manager for Events
 */
class EventsManager extends _1.BaseManager {
    /**
     * Constructor to manage events
     * @param {ShewenyClient} client Client framework
     * @param {string} directory Directory of the events folder
     * @param {boolean} [loadAll] If the events are loaded during bot launch
     */
    constructor(client, options) {
        super(client, options);
        this.default = {
            emitter: options.default?.emitter,
            once: options.default?.once,
        };
        if (options?.loadAll)
            this.loadAndRegisterAll();
    }
    /**
     * Load all events in collection
     * @returns {Promise<Collection<string, Event>>}
     */
    async loadAll() {
        const events = await (0, loadFiles_1.loadFiles)(this.client, {
            directory: this.directory,
            key: 'name',
        });
        if (events)
            this.client.collections.events = events;
        this.events = events;
        new helpers_1.ShewenyInformation(this.client, `- Events loaded : ${this.client.collections.events.size}`);
        return events;
    }
    /**
     * Load all and Register events
     * @returns {Promise<void>}
     */
    async loadAndRegisterAll() {
        const events = await this.loadAll();
        await this.registerAll(events);
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
            if (!(evt.emitter instanceof events_1.EventEmitter))
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
