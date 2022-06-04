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
     */
    constructor(client) {
        this.client = client;
    }
}
exports.BaseStructure = BaseStructure;
