import type { ShewenyClient } from '../client/Client';

const Messages: any = {
  START: () =>
    'You are running Sheweny in development mode. Make sure to turn on production mode when deploying for production to avoid warnings.',
  INVALID_CLASS: (name: string, path: string) => `The class ${name} is malformed. Unable to load it.\nPath : ${path}`,
  MISSING_CLASS: (path: string) => `Cannot find a class to load at path :\n${path}`,
  MISSING_PROPERTY_CLASS: (property: string, path: string) => `The property ${property} is missing on class.\nPath : ${path}`,
};

export class ShewenyWarning {
  constructor(client: ShewenyClient, name: string, ...args: any[]) {
    if (!client || client.mode !== 'development') return;

    if (client.mode === 'development') {
      if (Messages[name]) console.warn(`\x1b[33m${Messages[name](...args)}\x1b[0m`);
      else console.warn(`\x1b[33m${name}\x1b[0m`);
      console.log('');
    } else {
      if (Messages[name]) client.emit('warn', Messages[name](...args));
      else client.emit('warn', name);
    }
  }
}
