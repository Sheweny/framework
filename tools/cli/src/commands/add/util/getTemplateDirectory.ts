import { constants } from "node:fs";
import { access } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import chalk from "chalk";
import { IAddOptions } from "../../../typescript/interfaces/interfaces";
export async function getTemplateDirectory(options: IAddOptions): Promise<IAddOptions> {
  try {
    const curentdir = dirname(fileURLToPath(import.meta.url));

    const templateDir = resolve(curentdir, "../../../templates", `V${options.config?.version || "4"}`, "add", `${options.addType!}.js`);
    await access(templateDir, constants.R_OK);
    options = {
      ...options,
      templateDirectory: templateDir,
    };
    return options;
  } catch (err) {
    console.log(`${chalk.red.bold("ERROR")} The path for the ${options.addType!} template is not found`);
    return process.exit(1);
  }
}
