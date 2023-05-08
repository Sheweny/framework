import chalk from "chalk";
import { constants } from "fs";
import { access } from "fs/promises";
import { resolve } from "path";
import { IAddOptions } from "../../../typescript/interfaces/interfaces";
import { resolveHandlersDir } from "./resolveHandlersDir.js";
export async function checkPath(options: IAddOptions): Promise<IAddOptions> {
  try {
    const pathDir = resolve(process.cwd(), resolveHandlersDir(options)!);
    await access(pathDir, constants.R_OK);
    options = {
      ...options,
      target: pathDir,
    };
    return options;
  } catch (err) {
    console.log(
      `${chalk.red.bold(
        "ERROR"
      )} The path for ${options.addType!} handler doesn't exist. Please check your cli-config.json and the structure of your project.`
    );
    return process.exit(1);
  }
}
