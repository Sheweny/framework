"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = void 0;
const discord_js_1 = require("discord.js");
const index_1 = require("../index");
/**
 * Represents an Modal structure
 * @extends {BaseStructure}
 */
class Modal extends index_1.BaseStructure {
    /**
     * Constructor to build a Modal
     * @param {ShewenyClient} client Client framework
     * @param {string[] | RegExp[]} customId Custom id for one or more modals
     */
    constructor(client, customId, options) {
        super(client);
        this.cooldown = (options?.cooldown || client.managers.buttons?.default?.cooldown) ?? 0;
        this.customId = customId;
        this.manager = this.client.managers.modals;
    }
    /**
     * Register a modal in collections
     * @returns {Collection<string[] | RegExp[], Modal>}
     */
    async register() {
        if (!this.path)
            return new index_1.ShewenyError(this.client, 'PATH_NOT_DEFINE', 'Modal', this.customId.toString());
        const ModalImported = (await Promise.resolve().then(() => require(this.path))).default;
        const mod = new ModalImported(this.client);
        return this.client.collections.modals
            ? this.client.collections.modals.set(mod.customId, mod)
            : new discord_js_1.Collection().set(mod.customId, mod);
    }
    /**
     * Reload a modal
     * @returns {Promise<Collection<string[] | RegExp[], Modal> | ShewenyError>}
     */
    async reload() {
        this.unregister();
        return this.register();
    }
    /**
     * Unregister a modal from collections
     * @returns {boolean}
     */
    unregister() {
        this.client.collections.modals?.delete(this.customId);
        if (!this.path)
            return false;
        delete require.cache[require.resolve(this.path)];
        return true;
    }
}
exports.Modal = Modal;
