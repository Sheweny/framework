"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDirAndPush = void 0;
const promises_1 = require("fs/promises");
const path_1 = require("path");
async function readDirAndPush(d) {
    const files = [];
    async function read(dir) {
        const result = await (0, promises_1.readdir)(dir);
        for (const item of result) {
            const infos = await (0, promises_1.stat)((0, path_1.join)(dir, item));
            if (infos.isDirectory())
                await read((0, path_1.join)(dir, item));
            else
                files.push((0, path_1.join)(dir, item));
        }
        return;
    }
    await read(d);
    return files;
}
exports.readDirAndPush = readDirAndPush;
