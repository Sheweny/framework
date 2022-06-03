"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonsManager = void 0;
const Loader_1 = require("../utils/Loader");
const helpers_1 = require("../helpers");
const index_1 = require("./index");
/**
 * Manager for Buttons
 */
class ButtonsManager extends index_1.BaseManager {
    /**
     * Constructor to manage buttons
     * @param {ShewenyClient} client Client framework
     * @param {ButtonsManagerOptions} options The options of the manager
     */
    constructor(client, options) {
        super(client, options);
        this.default = {
            cooldown: options.default?.cooldown || 0,
        };
    }
    /**
     * Load all buttons in collection
     * @returns {Promise<Collection<string[], Button>>}
     */
    async loadAll() {
        const loader = new Loader_1.Loader(this.client, this.directory, 'customId');
        this.buttons = await loader.load();
        new helpers_1.ShewenyInformation(this.client, `- Buttons loaded : ${this.buttons.size}`);
        return this.buttons;
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
