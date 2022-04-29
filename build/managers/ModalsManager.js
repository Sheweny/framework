"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalsManager = void 0;
const loadFiles_1 = require("../utils/loadFiles");
const _1 = require(".");
const helpers_1 = require("../helpers");
/**
 * Manager for Modals
 */
class ModalsManager extends _1.BaseManager {
    /**
     * Constructor to manage modals
     * @param {ShewenyClient} client Client framework
     * @param {string} directory Directory of the modals folder
     * @param {boolean} [loadAll] If the modals are loaded during bot launch
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
     * Load all modals in collection
     * @returns {Promise<Collection<string[], Modal>>}
     */
    async loadAll() {
        const modals = await (0, loadFiles_1.loadFiles)(this.client, {
            directory: this.directory,
            key: 'customId',
        });
        if (modals) {
            this.client.collections.modals = modals;
            this.modals = modals;
        }
        new helpers_1.ShewenyInformation(this.client, `- Modals loaded : ${this.client.collections.modals.size}`);
        return modals;
    }
    /**
     * Unload all modals
     * @returns {void}
     */
    unloadAll() {
        this.modals = null;
        this.client.collections.modals.clear();
    }
}
exports.ModalsManager = ModalsManager;
