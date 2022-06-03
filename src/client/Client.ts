import { join } from 'path';
import { readdir } from 'fs/promises';
import { Client, Collection } from 'discord.js';
import { ClientUtil } from './ClientUtil';
import {
  ButtonsManager,
  CommandsManager,
  EventsManager,
  InhibitorsManager,
  ModalsManager,
  SelectMenusManager,
} from '../managers';
import { ShewenyWarning } from '../helpers';
import { CLIENT_MODE } from '../constants/constants';
import type { Snowflake, ClientOptions } from 'discord.js';
import type { ShewenyClientOptions, Managers, ManagersCollections, Cooldowns } from '../typescript/interfaces';
/**
 * Sheweny framework client
 */
export class ShewenyClient extends Client {
  /**
   * The ID of the bot admins
   * @type {Snowflake[]}
   */
  public admins: Snowflake[];

  /**
   * The collections of handlers
   * @type {ManagersCollections}
   */
  public collections: ManagersCollections;

  /**
   * If the client is ready
   * @type {boolean}
   */
  public cooldowns: Cooldowns;

  /**
   * If the client is ready
   * @type {boolean}
   */
  public connected: boolean;

  /**
   * If the cooldown should be desactivated for admins
   * @type {boolean}
   */
  public disableCooldownsForAdmins: boolean;

  /**
   * If the client joins a Thread when created
   * @type {boolean}
   */
  public joinThreadsOnCreate: boolean;
  /**
   * The mode of the application (developement or production)
   * @type {string}
   */
  public mode?: typeof CLIENT_MODE.prod | typeof CLIENT_MODE.dev;

  /**
   * The manager of handlers
   * @type {Managers}
   */
  public managers: Managers;

  /**
   * A util tool to resolve channel, user, get data etc
   * @type {ClientUtil}
   */
  public util: ClientUtil;

  /**
   * Set options and your client is ready
   * @param {ShewenyClientOptions} options Client framework options
   * @param {ClientOptions} [clientOptions] Client discord.js options
   */
  constructor(options: ShewenyClientOptions, clientOptions?: ClientOptions) {
    super(options || clientOptions);
    this.admins = options.admins || [];
    this.collections = {
      commands: new Collection(),
      events: new Collection(),
      buttons: new Collection(),
      inhibitors: new Collection(),
      modals: new Collection(),
      selectMenus: new Collection(),
    };
    this.cooldowns = {
      commands: new Collection(),
      buttons: new Collection(),
      selectMenus: new Collection(),
      modals: new Collection(),
    };
    this.connected = false;
    this.disableCooldownsForAdmins = options.disableCooldownsForAdmins || false;
    this.joinThreadsOnCreate = options.joinThreadsOnCreate || false;
    
    /****** MANAGERS ******/
    // TODO: Remove loadAll option in managers 
    this.managers = {};
    
    //BUTTONS
    if(options.managers?.buttons){
      this.managers.buttons = new ButtonsManager(this, {
        directory: options.managers.buttons.directory,
      })
      this.managers.buttons.loadAll()
        .then(buttons => { 
          if(buttons) this.collections.buttons = buttons
        });
    }
    //COMMANDS
    if(options.managers?.commands){
      this.managers.commands = new CommandsManager(this, {
            directory: options.managers.commands.directory,
            guildId: options.managers.commands.guildId,
            prefix: options.managers.commands.prefix,
            applicationPermissions: options.managers.commands.applicationPermissions,
            autoRegisterApplicationCommands: options.managers.commands.autoRegisterApplicationCommands ?? true,
            default: options.managers.commands.default,
          })

      this.managers.commands.loadAll()
         .then(commands => { 
          if(commands) this.collections.commands = commands
        });
    }
    // EVENTS
    if(options.managers?.events){
      this.managers.events = new EventsManager(this, {
            directory: options.managers.events.directory,
            default: options.managers.events.default,
          })
      this.managers.events.loadAll()
         .then(events => { 
          if(events) this.collections.events = events
        });

    }
    // INHIBITORS
    if(options.managers?.inhibitors){
      this.managers.inhibitors = new InhibitorsManager(this, {
            directory: options.managers.inhibitors.directory,
            default: options.managers.inhibitors.default,
          })
      this.managers.inhibitors.loadAll()
         .then(inhibitors => { 
          if(inhibitors) this.collections.inhibitors = inhibitors
        });

    }
    // MODALS
    if(options.managers?.modals){
      this.managers.modals = new ModalsManager(this, {
            directory: options.managers.modals.directory,
          })
      this.managers.modals.loadAll()
         .then(modals => { 
          if(modals) this.collections.modals = modals
        });

    }
    // SELECT MENUS
    if(options.managers?.selectMenus){
      this.managers.selectMenus = new SelectMenusManager(this, {
            directory: options.managers.selectMenus.directory,
          })
      this.managers.selectMenus.loadAll()
         .then(selectmenus => { 
          if(selectmenus) this.collections.selectMenus = selectmenus
        });

    }

    this.mode = options.mode || CLIENT_MODE.dev;
    this.util = new ClientUtil(this);
    if (options.mode === CLIENT_MODE.dev) new ShewenyWarning(this, 'START');

    // Load framework events
    (async () => {
      const dir = join(__dirname, '../events');
      const files = await readdir(dir);

      for (const file of files) {
        const event = await import(`${dir}/${file}`).then(e => e.default);
        const evtName = file.split('.')[0];
        this.on(evtName, (...args) => event(this, ...args));
      }
    })();
  }

  /**
   * Return true when the client is ready
   * @returns {Promise<boolean>}
   */
  public awaitReady(): Promise<boolean> {
    return new Promise(resolve => {
      if (this.connected) return resolve(true);
      this.once('ready', () => {
        return resolve(true);
      });
    });
  }
}
