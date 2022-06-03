"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalsManager = void 0;
const Loader_1 = require("../utils/Loader");
const index_1 = require("../index");
/**
 * Manager for Modals
 */
class ModalsManager extends index_1.BaseManager {
    /**
     * Constructor to manage modals
     * @param {ShewenyClient} client Client framework
     * @param {boolean} [options] The options of the manager
     */
    constructor(client, options) {
        super(client, options);
        this.default = {
            cooldown: options.default?.cooldown || 0,
        };
    }
    /**
     * Load all modals in collection
     * @returns {Promise<Collection<string[], Modal>>}
     */
    async loadAll() {
        const loader = new Loader_1.Loader(this.client, this.directory, "customId");
        this.modals = await loader.load();
        new index_1.ShewenyInformation(this.client, `- Modals loaded : ${this.modals.size}`);
        return this.modals;
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
