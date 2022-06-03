"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectMenusManager = void 0;
const index_1 = require("../index");
const Loader_1 = require("../utils/Loader");
/**
 * Manager for Select Menus
 */
class SelectMenusManager extends index_1.BaseManager {
    /**
     * Constructor to manage select menus
     * @param {ShewenyClient} client Client framework
     * @param {SelectMenusManagerOptions} [options] The options of the manager
     */
    constructor(client, options) {
        super(client, options);
        this.default = {
            cooldown: options.default?.cooldown || 0,
        };
    }
    /**
     * Load all select menus in collection
     * @returns {Promise<Collection<string[], SelectMenu>>}
     */
    async loadAll() {
        const loader = new Loader_1.Loader(this.client, this.directory, "customId");
        this.selectMenus = await loader.load();
        new index_1.ShewenyInformation(this.client, `- Select-menus loaded : ${this.selectMenus.size}`);
        return this.selectMenus;
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
