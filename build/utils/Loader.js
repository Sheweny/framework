"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = void 0;
const path_1 = require("path");
const discord_js_1 = require("discord.js");
const helpers_1 = require("../helpers");
// import type { Constructable } from '../typescript/utilityTypes';
const promises_1 = require("fs/promises");
class Loader {
    constructor(client, path, mainKey) {
        this.client = client;
        this.collection = new discord_js_1.Collection();
        this.mainPath = this.absolutePath(path);
        this.paths = [];
        this.mainKey = mainKey;
    }
    // Return the number of loaded paths
    async load(dir = this.mainPath) {
        if (dir)
            await this.readDirectory(this.absolutePath(dir));
        else if (this.mainPath)
            await this.readDirectory(this.mainPath);
        else
            new helpers_1.ShewenyError(this.client, 'MISSING_PATH_LOADER');
        if (!this.paths.length)
            return this.collection;
        for (const path of this.paths) {
            await this.loadFileStructures(path);
        }
        return this.collection;
    }
    absolutePath(dir) {
        let main = '';
        if (!require.main)
            main = process.cwd();
        else
            main = require.main.path;
        return (0, path_1.resolve)(main, dir);
    }
    async readDirectory(dir) {
        const result = await (0, promises_1.readdir)(dir);
        for (const item of result) {
            const resolvedPath = (0, path_1.resolve)(dir, item);
            const infos = await (0, promises_1.stat)(resolvedPath);
            if (infos.isDirectory())
                await this.readDirectory(resolvedPath);
            else
                this.paths.push(resolvedPath);
        }
    }
    async loadFileStructures(path) {
        try {
            const imported = await Promise.resolve().then(() => require(path));
            const keys = Object.keys(imported);
            if (keys) {
                for (const key of keys) {
                    await this.loadStructure(imported[key], path);
                }
            }
            else {
                await this.loadStructure(imported, path);
            }
        }
        catch (err) {
            const error = err;
            // TODO: Handle this error
            new helpers_1.ShewenyError(this.client, error);
        }
    }
    async loadStructure(Structure, path) {
        try {
            const instance = new Structure(this.client);
            if (!instance)
                return;
            if (!Object.hasOwn(instance, this.mainKey)) {
                return new helpers_1.ShewenyWarning(this.client, 'MISSING_PROPERTY_CLASS', this.mainKey, path);
            }
            if (this.collection.get(instance[this.mainKey])) {
                return new helpers_1.ShewenyWarning(this.client, 'DUPLICATE_CLASS', path);
            }
            this.collection.set(instance[this.mainKey], instance);
        }
        catch (err) {
            const error = err;
            // TODO: Implement this error
            new helpers_1.ShewenyWarning(this.client, 'INVALID_CLASS', Structure.toString(), path, error);
        }
    }
}
exports.Loader = Loader;
