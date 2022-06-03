"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShewenyClient = void 0;
const path_1 = require("path");
const promises_1 = require("fs/promises");
const discord_js_1 = require("discord.js");
const ClientUtil_1 = require("./ClientUtil");
const managers_1 = require("../managers");
const helpers_1 = require("../helpers");
const constants_1 = require("../constants/constants");
/**
 * Sheweny framework client
 */
class ShewenyClient extends discord_js_1.Client {
    /**
     * Set options and your client is ready
     * @param {ShewenyClientOptions} options Client framework options
     * @param {ClientOptions} [clientOptions] Client discord.js options
     */
    constructor(options, clientOptions) {
        super(options || clientOptions);
        this.admins = options.admins || [];
        this.collections = {
            commands: new discord_js_1.Collection(),
            events: new discord_js_1.Collection(),
            buttons: new discord_js_1.Collection(),
            inhibitors: new discord_js_1.Collection(),
            modals: new discord_js_1.Collection(),
            selectMenus: new discord_js_1.Collection(),
        };
        this.cooldowns = {
            commands: new discord_js_1.Collection(),
            buttons: new discord_js_1.Collection(),
            selectMenus: new discord_js_1.Collection(),
            modals: new discord_js_1.Collection(),
        };
        this.connected = false;
        this.disableCooldownsForAdmins = options.disableCooldownsForAdmins || false;
        this.joinThreadsOnCreate = options.joinThreadsOnCreate || false;
        /** **** MANAGERS ******/
        // TODO: Remove loadAll option in managers
        this.managers = {};
        // BUTTONS
        if (options.managers?.buttons) {
            this.managers.buttons = new managers_1.ButtonsManager(this, {
                directory: options.managers.buttons.directory,
            });
            this.managers.buttons.loadAll().then(buttons => {
                if (buttons)
                    this.collections.buttons = buttons;
            });
        }
        // COMMANDS
        if (options.managers?.commands) {
            this.managers.commands = new managers_1.CommandsManager(this, {
                directory: options.managers.commands.directory,
                guildId: options.managers.commands.guildId,
                prefix: options.managers.commands.prefix,
                applicationPermissions: options.managers.commands.applicationPermissions,
                autoRegisterApplicationCommands: options.managers.commands.autoRegisterApplicationCommands ?? true,
                default: options.managers.commands.default,
            });
            this.managers.commands.loadAll().then(commands => {
                if (commands)
                    this.collections.commands = commands;
            });
        }
        // EVENTS
        if (options.managers?.events) {
            this.managers.events = new managers_1.EventsManager(this, {
                directory: options.managers.events.directory,
                default: options.managers.events.default,
            });
            this.managers.events.loadAll().then(events => {
                if (events)
                    this.collections.events = events;
            });
        }
        // INHIBITORS
        if (options.managers?.inhibitors) {
            this.managers.inhibitors = new managers_1.InhibitorsManager(this, {
                directory: options.managers.inhibitors.directory,
                default: options.managers.inhibitors.default,
            });
            this.managers.inhibitors.loadAll().then(inhibitors => {
                if (inhibitors)
                    this.collections.inhibitors = inhibitors;
            });
        }
        // MODALS
        if (options.managers?.modals) {
            this.managers.modals = new managers_1.ModalsManager(this, {
                directory: options.managers.modals.directory,
            });
            this.managers.modals.loadAll().then(modals => {
                if (modals)
                    this.collections.modals = modals;
            });
        }
        // SELECT MENUS
        if (options.managers?.selectMenus) {
            this.managers.selectMenus = new managers_1.SelectMenusManager(this, {
                directory: options.managers.selectMenus.directory,
            });
            this.managers.selectMenus.loadAll().then(selectmenus => {
                if (selectmenus)
                    this.collections.selectMenus = selectmenus;
            });
        }
        this.mode = options.mode || constants_1.CLIENT_MODE.dev;
        this.util = new ClientUtil_1.ClientUtil(this);
        if (options.mode === constants_1.CLIENT_MODE.dev)
            new helpers_1.ShewenyWarning(this, 'START');
        // Load framework events
        (async () => {
            const dir = (0, path_1.join)(__dirname, '../events');
            const files = await (0, promises_1.readdir)(dir);
            for (const file of files) {
                const event = await Promise.resolve().then(() => require(`${dir}/${file}`)).then(e => e.default);
                const evtName = file.split('.')[0];
                this.on(evtName, (...args) => event(this, ...args));
            }
        })();
    }
    /**
     * Return true when the client is ready
     * @returns {Promise<boolean>}
     */
    awaitReady() {
        return new Promise(resolve => {
            if (this.connected)
                return resolve(true);
            this.once('ready', () => {
                return resolve(true);
            });
        });
    }
}
exports.ShewenyClient = ShewenyClient;
