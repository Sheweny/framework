"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonsManager = void 0;
const loadFiles_1 = require("../utils/loadFiles");
const _1 = require(".");
const helpers_1 = require("../helpers");
/**
 * Manager for Buttons
 */
class ButtonsManager extends _1.BaseManager {
    /**
     * Constructor to manage buttons
     * @param {ShewenyClient} client Client framework
     * @param {string} directory Directory of the buttons folder
     * @param {boolean} [loadAll] If the buttons are loaded during bot launch
     */
    constructor(client, options) {
        super(client, options);
        if (options?.loadAll)
            this.loadAll();
    }
    /**
     * Load all buttons in collection
     * @returns {Promise<Collection<string[], Button>>}
     */
    async loadAll() {
        const buttons = await (0, loadFiles_1.loadFiles)(this.client, {
            directory: this.directory,
            key: 'customId',
        });
        if (buttons) {
            this.client.collections.buttons = buttons;
            this.buttons = buttons;
        }
        new helpers_1.ShewenyInformation(this.client, `- Buttons loaded : ${this.client.collections.buttons.size}`);
        return buttons;
    }
    /**
     * Unload all buttons
     * @returns {void}
     */
    unloadAll() {
        this.buttons = null;
        this.client.collections.buttons.clear();
    }
}
exports.ButtonsManager = ButtonsManager;
