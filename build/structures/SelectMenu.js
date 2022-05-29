"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMenu = void 0;
const discord_js_1 = require("discord.js");
const _1 = require(".");
const helpers_1 = require("../helpers");
/**
 * Represents an Select Menu structure
 * @extends {BaseStructure}
 */
class SelectMenu extends _1.BaseStructure {
    /**
     * Constructor for build a Select Menu
     * @param {ShewenyClient} client Client framework
     * @param {string[] | RegExp[]} customId Custom id for one or more select menus
     */
    constructor(client, customId, options) {
        super(client);
        this.cooldown = (options?.cooldown || client.managers.buttons?.default?.cooldown) ?? 0;
        this.customId = customId;
        this.manager = this.client.managers.selectMenus;
    }
    /**
     * Register a select menu in collections
     * @returns {Collection<string[]| RegExp[], SelectMenu | ShewenyError>} The select menus collection
     */
    async register() {
        if (!this.path)
            return new helpers_1.ShewenyError(this.client, 'PATH_NOT_DEFINE', 'SelectMenu', this.customId.toString());
        const SelectMenuImported = (await Promise.resolve().then(() => require(this.path))).default;
        const sm = new SelectMenuImported(this.client);
        return this.client.collections.selectMenus
            ? this.client.collections.selectMenus.set(sm.customId, sm)
            : new discord_js_1.Collection().set(sm.customId, sm);
    }
    /**
     * Reload a select menu
     * @returns {Promise<Collection<string[]| RegExp[], SelectMenu> | ShewenyError>} The select menus collection
     */
    async reload() {
        this.unregister();
        return this.register();
    }
    /**
     * Unregister a select menu from collections
     * @returns {boolean}
     */
    unregister() {
        this.client.collections.selectMenus?.delete(this.customId);
        if (!this.path)
            return false;
        delete require.cache[require.resolve(this.path)];
        return true;
    }
}
exports.SelectMenu = SelectMenu;
