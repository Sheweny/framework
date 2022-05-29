"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShewenyError = void 0;
// interface ErrorMessages {
//   INVALID_CLASS(name: string, path: string): string;
//   MISSING_PROPERTY_CLASS(property: string, path: string): string;
// }
// eslint-disable-next-line
const Messages = {
    INVALID_CLASS: (name, path) => `The class ${name} is malformed.\nPath : ${path}`,
    PATH_NOT_DEFINE: (classD, customId) => `The class ${classD} with customId ${customId} doesn't have path.`,
    MISSING_PROPERTY_CLASS: (property, path) => `The property ${property} is missing on class.\nPath : ${path}`,
    MISSING_PATH_LOADER: () => `Missing path for loader.`
};
class ShewenyError extends Error {
    constructor(client, err, ...args) {
        let message = '';
        if (!err)
            message = '[SHEWENY_ERROR]: Unknown error';
        else if (err instanceof Error)
            err.message = `[SHEWENY_ERROR]: ${err.message}`;
        else if (Messages[err])
            message = `[SHEWENY_ERROR]: ${Messages[err](...args)}`;
        else if (err)
            message = err;
        super(message);
        // Display error
        if (client.mode === 'development')
            throw err;
        else
            client.emit('error', this);
    }
}
exports.ShewenyError = ShewenyError;
