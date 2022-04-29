"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMenusManager = void 0;
const _1 = require(".");
const loadFiles_1 = require("../utils/loadFiles");
const helpers_1 = require("../helpers");
/**
 * Manager for Select Menus
 */
class SelectMenusManager extends _1.BaseManager {
    /**
     * Constructor to manage select menus
     * @param {ShewenyClient} client Client framework
     * @param {string} directory Directory of the select menus folder
     * @param {boolean} [loadAll] If the select menus are loaded during bot launch
     */
    constructor(client, options) {
        super(client, options);
        this.default = {
            cooldown: options.default?.cooldown || 0,
        };
        if (options?.loadAll)
            this.loadAll();
    }
    /**
     * Load all select menus in collection
     * @returns {Promise<Collection<string[], SelectMenu>>}
     */
    async loadAll() {
        const selectMenus = await (0, loadFiles_1.loadFiles)(this.client, {
            directory: this.directory,
            key: 'customId',
        });
        if (selectMenus)
            this.client.collections.selectMenus = selectMenus;
        this.selectMenus = selectMenus;
        new helpers_1.ShewenyInformation(this.client, `- Select-menus loaded : ${this.client.collections.selectMenus.size}`);
        return selectMenus;
    }
    /**
     * Unload all selectMenus
     * @returns {void}
     */
    unloadAll() {
        this.selectMenus = null;
        this.client.collections.selectMenus.clear();
    }
}
exports.SelectMenusManager = SelectMenusManager;
