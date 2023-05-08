import { access } from "node:fs/promises";
import { constants } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import chalk from "chalk";
import type { ICreateOptions } from "../../../typescript/interfaces/interfaces";
export async function getTemplateDirectory(options: ICreateOptions): Promise<ICreateOptions> {
  try {
    const curentdir = dirname(fileURLToPath(import.meta.url));

    const templateDir = resolve(curentdir, "../../../templates", `V${options.version}`, "create", options.template!);
    await access(templateDir, constants.R_OK);
    options = {
      ...options,
      templateDirectory: templateDir,
    };
    return options;
  } catch (err) {
    console.log(`${chalk.red.bold("ERROR")} An error occurred while retrieving the template`);
    return process.exit(1);
  }
}
