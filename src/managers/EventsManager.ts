import { ClientEvents, Collection, Snowflake } from "discord.js";
import { join } from "path";
import { ShewenyClient } from "../client/Client";
import { Event } from "../structures/Event";
import { readDirAndPush } from "../utils/readDirFiles";

export class EventsManager {
  private client: ShewenyClient;
  public directory: string;
  public events?: Collection<keyof ClientEvents, Event>;

  constructor(client: ShewenyClient, directory: string, loadAll?: boolean) {
    if (!client) throw new TypeError("Client must be provided.");
    if (!directory) throw new TypeError("Directory must be provided.");

    this.client = client;
    this.directory = directory;

    if (loadAll) this.loadAndRegisterAll();
    client.handlers.manager.events = this;
  }

  public async loadAll(): Promise<Collection<keyof ClientEvents, Event>> {
    const events: Collection<keyof ClientEvents, Event> = new Collection();
    const baseDir = join(require.main!.path, this.directory);
    const evtsPaths = await readDirAndPush(baseDir);

    for (const evtPath of evtsPaths) {
      const evtImport = await import(evtPath);
      const key = Object.keys(evtImport)[0];
      const Event = evtImport[key];
      if (!Event) continue;
      const instance: Event = new Event(this.client);
      if (!instance.name) continue;
      instance.path = evtPath;
      events.set(instance.name, instance);
    }

    this.client.handlers.collections.events = events;
    this.events = events;
    return events;
  }

  public async registerAll(
    events: Collection<keyof ClientEvents, Event> | undefined = this.events
  ): Promise<void> {
    if (!events) throw new Error("No events found");

    for (const [name, evt] of events) {
      if (evt.once) this.client.once(name, (...args: any[]) => evt.execute(...args));
      else this.client.on(name, (...args: any[]) => evt.execute(...args));
    }
  }

  public async loadAndRegisterAll(): Promise<void> {
    const events = await this.loadAll();
    await this.registerAll(events);
  }
}
