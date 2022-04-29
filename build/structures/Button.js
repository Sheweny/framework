"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const discord_js_1 = require("discord.js");
const _1 = require(".");
const helpers_1 = require("../helpers");
/**
 * Represents an Button structure
 * @extends {BaseStructure}
 */
class Button extends _1.BaseStructure {
    /**
     * Constructor for build a Button
     * @param {ShewenyClient} client Client framework
     * @param {string[] | RegExp[]} customId Custom id for one or more buttons
     */
    constructor(client, customId, options) {
        super(client);
        this.cooldown = (options?.cooldown || client.managers.buttons?.default?.cooldown) ?? 0;
        this.customId = customId;
        this.manager = this.client.managers.buttons;
    }
    /**
     * Register a button in collections
     * @returns {Collection<string[] | RegExp[], Button>}
     */
    async register() {
        if (!this.path)
            return new helpers_1.ShewenyError(this.client, 'PATH_NOT_DEFINE', 'Button', this.customId.toString());
        const ButtonImported = (await Promise.resolve().then(() => require(this.path))).default;
        const btn = new ButtonImported(this.client);
        return this.client.collections.buttons
            ? this.client.collections.buttons.set(btn.customId, btn)
            : new discord_js_1.Collection().set(btn.customId, btn);
    }
    /**
     * Reload a button
     * @returns {Promise<Collection<string[] | RegExp[], Button> | ShewenyError>}
     */
    async reload() {
        this.unregister();
        return this.register();
    }
    /**
     * Unregister a button from collections
     * @returns {boolean}
     */
    unregister() {
        this.client.collections.buttons?.delete(this.customId);
        if (!this.path)
            return false;
        delete require.cache[require.resolve(this.path)];
        return true;
    }
}
exports.Button = Button;
