import  type{ ApplicationCommandOptionData, PermissionString } from "discord.js";
import type { ShewenyClient } from "../client/Client";
import type { CommandData } from "../interfaces/Command";

export abstract class Command {
  public client: ShewenyClient;
  public path: string = "";
  protected data: CommandData;
  public name: string;
  public type: "SLASH_COMMAND" | "CONTEXT_MENU_MESSAGE" | "CONTEXT_MENU_USER" | "MESSAGE";
  public defaultPermission?: boolean;
  public options?: ApplicationCommandOptionData[];
  public category?: string;
  public channel?: "GUILD" | "DM";
  public cooldown?: null;
  public adminsOnly?: boolean;
  public userPermissions?: PermissionString[];
  public clientPermissions?: PermissionString[];

  constructor(client: ShewenyClient, data: CommandData) {
    this.client = client;
    this.data = data;
    this.name = data.name;
    this.type = data.type;
    this.defaultPermission = data.type !== "MESSAGE" ? data.defaultPermission : undefined;
    this.options = data.type === "SLASH_COMMAND" ? data.options : undefined;
    this.category = data.category;
    this.channel = data.channel;
    this.cooldown = data.cooldown;
    this.adminsOnly = data.adminsOnly;
    this.userPermissions = data.userPermissions;
    this.clientPermissions = data.clientPermissions;
  }

  before?(...args: any[]): any | Promise<any>;

  abstract execute(...args: any[]): any | Promise<any>;
}
