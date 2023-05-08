export interface ICommand {
  commandName?: "create" | "add" | "help" | "version" | "init";
  arguments: string[];
  skipPrompts: boolean;
}
export interface ICreateOptions {
  dirName?: string;
  targetDirectory?: string;
  templateDirectory?: string;
  template?: "javascript" | "typescript";
  packageManager?: "npm" | "yarn" | "pnpm";
  token?: string;
  git?: boolean;
  handlers?: string[];
  configFileType?: "json" | "js" | "ts";
  optionnalLibrary?: string[];
  version?: number;
}
export type AddType = "command" | "event" | "button" | "selectmenu" | "inhibitor" | "modal";
export interface IAddOptions {
  addType: AddType;
  addName: string;
  eventOptions: eventOptions;
  commandOptions: commandOptions;
  inhibitorOptions: inhibitorOptions;
  // Tacks
  templateDirectory?: string;
  version?: number;
  config?: ICliConfig;
  target?: string;
}

interface commandOptions {
  type: null | "SLASH_COMMAND" | "CONTEXT_MENU_USER" | "CONTEXT_MENU_MESSAGE" | "MESSAGE_COMMAND";
  description: null | string;
  category: null | string;
  only: null | "DM" | "GUILD";
  cooldown: null | number;
}

interface eventOptions {
  description?: string;
  once?: boolean;
}

interface inhibitorOptions {
  type: string[];
}

export interface ICliConfig {
  template: "javascript" | "typescript";
  version?: number;
  handlers: {
    commands: string | undefined;
    events: string | undefined;
    inhibitors: string | undefined;
    buttons: string | undefined;
    modals: string | undefined;
    selectMenus: string | undefined;
  };
}
