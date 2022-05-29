"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseStructure = void 0;
/**
 * The base class for all structures
 */
class BaseStructure {
    /**
     * Constructor for build base of any structures
     * @param {ShewenyClient} client Client framework
     * @param {string} [path] Path for the structure
     */
    constructor(client, path) {
        this.client = client;
        this.path = path;
    }
}
exports.BaseStructure = BaseStructure;
