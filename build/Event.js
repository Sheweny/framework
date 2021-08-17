"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
class Event {
    constructor(client, name, options) {
        this.description = "";
        this.once = false;
        this.client = client;
        this.name = name;
        this.description = options.description;
        this.once = options.once;
    }
    unregister() {
        this.client.events?.delete(this.name);
        delete require.cache[require.resolve(this.path)];
        return true;
    }
    async reload() {
        if (this.path) {
            this.unregister();
            return this.register();
        }
        return null;
    }
    async register() {
        const event = (await Promise.resolve().then(() => require(this.path))).default;
        const cmd = new event(this.client);
        return this.client.events?.set(cmd.name, cmd);
    }
}
exports.Event = Event;
