"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFiles = void 0;
const path_1 = require("path");
const readDirFiles_1 = require("./readDirFiles");
const discord_js_1 = require("discord.js");
const helpers_1 = require("../helpers");
async function loadFiles(client, options) {
    try {
        const collection = new discord_js_1.Collection();
        //  eslint-disable-next-line
        const filesPath = await (0, readDirFiles_1.readDirAndPush)((0, path_1.resolve)(require.main.path, options.directory));
        //  eslint-disable-next-line
        let Structure;
        for (const filePath of filesPath) {
            const file = await Promise.resolve().then(() => require(filePath));
            //  Import the first element
            if (Object.keys(file).length)
                Structure = file[Object.keys(file)[0]];
            else
                Structure = file;
            try {
                const instance = new Structure(client);
                if (!instance[options.key]) {
                    new helpers_1.ShewenyWarning(client, 'MISSING_PROPERTY_CLASS', options.key, filePath);
                    continue;
                }
                instance.path = filePath;
                if (collection.get(instance[options.key]))
                    new helpers_1.ShewenyWarning(client, 'DUPLICATE_CLASS', instance[options.key], filePath);
                collection.set(instance[options.key], instance);
            }
            catch (e) {
                new helpers_1.ShewenyWarning(client, 'INVALID_CLASS', Structure.toString(), filePath);
                continue;
            }
        }
        return collection;
    }
    catch (err) {
        const e = err;
        new helpers_1.ShewenyError(client, e);
    }
}
exports.loadFiles = loadFiles;
