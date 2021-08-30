import { ShewenyClient } from "../client/Client";
const Messages: any = {
  INVALID_CLASS: (name: string, path: string) =>
    `The class ${name} is malformed.\nPath : ${path}`,
  MISSING_PROPERTY_CLASS: (property: string, path: string) =>
    `The property ${property} is is missing on class.\nPath : ${path}`,
};
export class ShewenyError extends Error {
  constructor(client: ShewenyClient, err: string, ...args: string[]) {
    let message: string = "";
    if (!err) message = "[SHEWENY_ERROR]: Unknown error";
    else if (Messages[err]) message = `[SHEWENY_ERROR]: ${Messages[err](...args)}`;
    else if (err) message = err;
    super(message);
    if (client.mode === "development") throw this;
    else client.emit("error", this);
  }
}
