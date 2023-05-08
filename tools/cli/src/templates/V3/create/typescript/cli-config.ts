import { ICreateOptions } from "../../../../typescript/interfaces/interfaces";

export default (options: ICreateOptions) => {
  const commands = options.handlers!.includes("commands") ? `"src/commands"` : null;
  const events = options.handlers!.includes("events") ? `"src/events"` : null;
  const inhibitors = options.handlers!.includes("inhibitors") ? `"src/inhibitors"` : null;
  const buttons = options.handlers!.includes("buttons") ? `"src/interactions/buttons"` : null;
  const selectMenus = options.handlers!.includes("selectmenus") ? `"src/interactions/selectmenus"` : null;

  return [
    `{
  "template": "${options.template}",
  "version": 3,
  "handlers": {
    "commands": ${commands},
    "events": ${events},
    "inhibitors": ${inhibitors},
    "buttons": ${buttons},
    "selectMenus": ${selectMenus}
  }
}
`,
    "cli-config.json",
  ];
};
