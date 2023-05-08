import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import chalk from "chalk";
import type { ICreateOptions } from "../../../typescript/interfaces/interfaces";

function checkFile(options: ICreateOptions, file: string) {
  const dirHandlers = ["events", "commands", "buttons", "selectmenus", "modals", "inhibitors"];
  if (
    file === "interactions" &&
    !options.handlers?.includes("buttons") &&
    !options.handlers?.includes("selectmenus") &&
    !options.handlers?.includes("modals")
  )
    return true;
  else if (dirHandlers.includes(file) && !options.handlers?.includes(file)) return true;
  return false;
}
export async function copyFiles(
  options: ICreateOptions,
  template: string = options.templateDirectory!,
  target: string = options.targetDirectory!
): Promise<void> {
  try {
    const templateFiles = await readdir(template);
    for (const file of templateFiles) {
      const fileStat = await stat(resolve(template, file));
      if (fileStat.isDirectory()) {
        if (checkFile(options, file)) continue;
        await mkdir(resolve(target, file));
        await copyFiles(options, resolve(template, file), resolve(target, file));
      } else {
        if (checkFile(options, file)) continue;
        const fileRead = await import("file://" + resolve(template, file));
        const fileContent = fileRead.default(options);
        await writeFile(resolve(target, fileContent[1]), fileContent[0]);
      }
    }
  } catch (err) {
    console.log(`${chalk.red.bold("ERROR")} An error occurred while copying the files`);
    return process.exit(1);
  }
}
