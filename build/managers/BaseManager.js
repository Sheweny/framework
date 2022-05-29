"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseManager = void 0;
const events_1 = require("events");
class BaseManager extends events_1.EventEmitter {
    /**
     * Constructor of BaseManager class (extends EventEmitter)
     * @param {ShewenyClient} client
     * @param {BaseManagerOptions} options
     */
    constructor(client, options) {
        super();
        if (!client)
            throw new TypeError('Client must be provided.');
        if (!options || (options && !options?.directory))
            throw new TypeError('Directory must be provided.');
        this.client = client;
        this.directory = options.directory;
    }
}
exports.BaseManager = BaseManager;
