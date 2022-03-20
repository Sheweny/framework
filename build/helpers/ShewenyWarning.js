"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShewenyWarning = void 0;
const Messages = {
    START: () => 'You are running Sheweny in development mode. Make sure to turn on production mode when deploying for production to avoid warnings.',
    INVALID_CLASS: (name, path) => `The class ${name} is malformed. Unable to load it.\nPath : ${path}`,
    MISSING_CLASS: (path) => `Cannot find a class to load at path :\n${path}`,
    MISSING_PROPERTY_CLASS: (property, path) => `The property ${property} is missing on class.\nPath : ${path}`,
    DUPLICATE_CLASS: (property, path) => `The class with id "${property}" is already loaded, only the last one will take effect.\nPath : ${path}`,
};
class ShewenyWarning {
    constructor(client, name, ...args) {
        if (!client || client.mode !== 'development')
            return;
        if (client.mode === 'development') {
            console.log('');
            if (Messages[name])
                console.warn(`\x1b[33m${Messages[name](...args)}\x1b[0m`);
            else
                console.warn(`\x1b[33m${name}\x1b[0m`);
            console.log('');
        }
        else if (Messages[name]) {
            client.emit('warn', Messages[name](...args));
        }
        else {
            client.emit('warn', name);
        }
    }
}
exports.ShewenyWarning = ShewenyWarning;
