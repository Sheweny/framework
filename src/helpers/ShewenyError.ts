import type { ShewenyClient } from '../client/Client.js';
import type { CallbackFunctionVariadic } from '../typescript/utilityTypes.js';

const Messages = {
  // Loader
  INVALID_CLASS: (name: string, path: string) => `The class ${name} is malformed.\nPath : ${path}`,
  PATH_NOT_DEFINE: (classD: string, id: string) => `The class ${classD} with identifier ${id} doesn't have path.`,
  MISSING_PROPERTY_CLASS: (property: string, path: string) => `The property ${property} is missing on class.\nPath : ${path}`,
  MISSING_PATH_LOADER: () => 'Missing path for loader.',
  LOAD_ERROR: (path: string, err: string) => `Error during the loading of path ${path}:\n${err}`,
  // Evaluation
  EVAL_ERROR: (evaluate: string, err: string) => `Error during evaluation of ${evaluate}:\n${err} `,
};

export class ShewenyError extends Error {
  constructor(client: ShewenyClient, err: keyof typeof Messages, ...args: string[]) {
    const func = Messages[err] as CallbackFunctionVariadic;
    if (!func) return;
    const message = `[SHEWENY_ERROR]: ${func(...args)}`;

    super(message);

    // Display error
    if (client.mode === 'development') throw err;
    else client.emit('error', this);
  }
}
