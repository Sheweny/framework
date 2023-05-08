import type { IAddOptions } from "../../../typescript/interfaces/interfaces";

export function resolveHandlersDir(options: IAddOptions): string | undefined {
  if (options.addType === "command") return options.config!.handlers?.commands;
  if (options.addType === "event") return options.config!.handlers?.events;
  if (options.addType === "button") return options.config!.handlers?.buttons;
  if (options.addType === "selectmenu") return options.config!.handlers?.selectMenus;
  if (options.addType === "modal") return options.config!.handlers?.modals;
  if (options.addType === "inhibitor") return options.config!.handlers?.inhibitors;
  return;
}
