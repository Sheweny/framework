import { ShewenyClient } from '../client/Client';

// interface ErrorMessages {
//   INVALID_CLASS(name: string, path: string): string;
//   MISSING_PROPERTY_CLASS(property: string, path: string): string;
// }

const Messages: any = {
	INVALID_CLASS: (name: string, path: string) => `The class ${name} is malformed.\nPath : ${path}`,
	MISSING_PROPERTY_CLASS: (property: string, path: string) => `The property ${property} is missing on class.\nPath : ${path}`,
};

export class ShewenyError extends Error {
	constructor(client: ShewenyClient, err: any, ...args: any[]) {
		let message = '';
		if (!err) message = '[SHEWENY_ERROR]: Unknown error';
		else if (Messages[err]) message = `[SHEWENY_ERROR]: ${Messages[err](...args)}`;
		else if (err) message = err;
		super(message);
		if (client.mode === 'development') throw err;
		else client.emit('error', this);
	}
}
