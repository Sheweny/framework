"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShewenyInformation = void 0;
const constants_1 = require("../constants/constants");
/**
 * Information class for Sheweny.
 */
class ShewenyInformation {
    constructor(client, message) {
        this.client = client;
        this.message = message;
        if (client.mode === constants_1.CLIENT_MODE.dev)
            console.log(`\x1b[34m${message}\x1b[0m`);
    }
}
exports.ShewenyInformation = ShewenyInformation;
