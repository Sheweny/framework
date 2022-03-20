"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
const discord_js_1 = require("discord.js");
const _1 = require(".");
const helpers_1 = require("../helpers");
/**
 * Represents an Event structure
 * @extends {BaseStructure}
 */
class Event extends _1.BaseStructure {
    /**
     * Constructor for build a Event
     * @param {ShewenyClient} client Client framework
     * @param {string} name Name of the event
     * @param {string[]} customId Custom id for one or more buttons
     */
    constructor(client, name, options) {
        super(client);
        const defaultData = client.managers.events?.default || {};
        this.description = options?.description || '';
        this.emitter = (options?.emitter || defaultData.emitter) ?? this.client;
        this.manager = this.client.managers.events;
        this.name = name;
        this.once = (options?.once || defaultData.once) ?? false;
    }
    /**
     * Register an event
     * @public
     * @async
     * @returns {Promise<Collection<string, Event>>} The events collection
     */
    async register() {
        if (!this.path)
            return new helpers_1.ShewenyError(this.client, 'PATH_NOT_DEFINE', 'Event', this.name);
        const EventImported = (await Promise.resolve().then(() => require(this.path))).default;
        const evt = new EventImported(this.client);
        return this.client.collections.events
            ? this.client.collections.events.set(evt.name, evt)
            : new discord_js_1.Collection().set(evt.name, evt);
    }
    /**
     * Reload an event
     * @public
     * @async
     * @returns {Promise<Collection<string, Event> | ShewenyError>} The events collection
     */
    async reload() {
        this.unregister();
        return this.register();
    }
    /**
     * Unregister an event
     * @public
     * @returns {boolean}
     */
    unregister() {
        this.client.collections.events?.delete(this.name);
        if (!this.path)
            return false;
        delete require.cache[require.resolve(this.path)];
        return true;
    }
}
exports.Event = Event;
