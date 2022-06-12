import type { ShewenyClient } from '../client/Client.js';
import type { IMessages } from '../typescript/utilityTypes';

const Messages: IMessages = {
  INVALID_CLASS: (name: string, path: string) => `The class ${name} is malformed.\nPath : ${path}`,
  PATH_NOT_DEFINE: (classD: string, customId: string[]) => `The class ${classD} with customId ${customId} doesn't have path.`,
  MISSING_PROPERTY_CLASS: (property: string, path: string) => `The property ${property} is missing on class.\nPath : ${path}`,
  MISSING_PATH_LOADER: () => 'Missing path for loader.',
};

export class ShewenyError extends Error {
  constructor(client: ShewenyClient, err: string | Error, ...args: string[]) {
    let message = '';
    if (!err) message = '[SHEWENY_ERROR]: Unknown error';
    else if (err instanceof Error) err.message = `[SHEWENY_ERROR]: ${err.message}`;
    else if (typeof Messages[err] === 'function') message = `[SHEWENY_ERROR]: ${Messages[err]!(...args)}`;
    else if (err) message = err;

    super(message);

    // Display error
    if (client.mode === 'development') throw err;
    else client.emit('error', this);
  }
}
