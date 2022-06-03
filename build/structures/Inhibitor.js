"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inhibitor = void 0;
const discord_js_1 = require("discord.js");
const index_1 = require("../index");
/**
 * Represents an Command structure
 * @extends {BaseStructure}
 */
class Inhibitor extends index_1.BaseStructure {
    /**
     * Constructor for build a Inhibitor
     * @param {ShewenyClient} client Client framework
     * @param {string} name Name of the event
     * @param {InhibitorOptions} [options] Options for the inhibitor
     */
    constructor(client, name, options) {
        super(client);
        const defaultData = client.managers.inhibitors?.default || {};
        this.manager = this.client.managers.inhibitors;
        this.name = name;
        this.priority = (options?.priority || defaultData.priority) ?? 0;
        this.type = (options?.type || defaultData.type) ?? [];
    }
    /**
     * Register a inhibitor in collections
     * @returns {Collection<string[], Inhibitor>} The inhibitors collection
     */
    async register() {
        if (!this.path)
            return new index_1.ShewenyError(this.client, 'PATH_NOT_DEFINE', 'Inhibitor', this.name);
        const InhibitorImported = (await Promise.resolve().then(() => require(this.path))).default;
        const inhib = new InhibitorImported(this.client);
        return this.client.collections.inhibitors
            ? this.client.collections.inhibitors.set(inhib.name, inhib)
            : new discord_js_1.Collection().set(inhib.name, inhib);
    }
    /**
     * Reload a inhibitor
     * @returns {Promise<Collection<string[], Inhibitor> | ShewenyError>} The inhibitors collection
     */
    async reload() {
        this.unregister();
        return this.register();
    }
    /**
     * Unregister a inhibitor from collections
     * @returns {boolean}
     */
    unregister() {
        this.client.collections.inhibitors?.delete(this.name);
        if (!this.path)
            return false;
        delete require.cache[require.resolve(this.path)];
        return true;
    }
}
exports.Inhibitor = Inhibitor;
