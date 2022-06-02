"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InhibitorsManager = void 0;
const _1 = require(".");
const Loader_1 = require("../utils/Loader");
const helpers_1 = require("../helpers");
/**
 * Manager for Inhibitors
 */
class InhibitorsManager extends _1.BaseManager {
    /**
     * Constructor to manage inhibitors
     * @param {ShewenyClient} client Client framework
     * @param {boolean} [options] The options of the manager
     */
    constructor(client, options) {
        super(client, options);
        this.default = {
            priority: options.default?.priority,
            type: options.default?.type,
        };
        if (options?.loadAll)
            this.loadAll();
    }
    /**
     * Load all inhibitors in collection
     * @returns {Promise<Collection<string, Inhibitor>>}
     */
    async loadAll() {
        const loader = new Loader_1.Loader(this.client, this.directory, "name");
        this.inhibitors = await loader.load();
        //TODO: Refactor for new system
        this.client.collections.inhibitors = this.inhibitors;
        new helpers_1.ShewenyInformation(this.client, `- Inhibitors loaded : ${this.inhibitors.size}`);
        return this.inhibitors;
    }
    /**
     * Unload all inhibitors
     * @returns {void}
     */
    unloadAll() {
        this.inhibitors = null;
        this.client.collections.inhibitors.clear();
    }
}
exports.InhibitorsManager = InhibitorsManager;
