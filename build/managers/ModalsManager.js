"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalsManager = void 0;
const Loader_1 = require("../utils/Loader");
const _1 = require(".");
const helpers_1 = require("../helpers");
/**
 * Manager for Modals
 */
class ModalsManager extends _1.BaseManager {
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
        if (options?.loadAll)
            this.loadAll();
    }
    /**
     * Load all modals in collection
     * @returns {Promise<Collection<string[], Modal>>}
     */
    async loadAll() {
        const loader = new Loader_1.Loader(this.client, this.directory, "customId");
        this.modals = await loader.load();
        //TODO: Refactor for new system
        this.client.collections.modals = this.modals;
        new helpers_1.ShewenyInformation(this.client, `- Modals loaded : ${this.modals.size}`);
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
