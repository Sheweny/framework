"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InhibitorsManager = void 0;
const _1 = require(".");
const loadFiles_1 = require("../utils/loadFiles");
const helpers_1 = require("../helpers");
/**
 * Manager for Inhibitors
 */
class InhibitorsManager extends _1.BaseManager {
    /**
     * Constructor to manage inhibitors
     * @param {ShewenyClient} client Client framework
     * @param {string} directory Directory of the inhibitors folder
     * @param {boolean} [loadAll] If the inhibitors are loaded during bot launch
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
        const inhibitors = await (0, loadFiles_1.loadFiles)(this.client, {
            directory: this.directory,
            key: 'name',
        });
        if (inhibitors)
            this.client.collections.inhibitors = inhibitors;
        this.inhibitors = inhibitors;
        new helpers_1.ShewenyInformation(this.client, `- Inhibitors loaded : ${this.client.collections.inhibitors.size}`);
        return inhibitors;
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
