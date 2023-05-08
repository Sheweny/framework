import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { existsSync } from "node:fs";
import chalk from "chalk";
import type { ICreateOptions } from "../../../typescript/interfaces/interfaces";

export async function renameDir(options: ICreateOptions): Promise<ICreateOptions> {
  if (options.dirName) options.dirName = options.dirName.replaceAll(/<|>|:|"|\/|\\|\||\?|\*|(^(aux|con|clock|nul|prn|com[1-9]|lpt[1-9])$)/gi, "");
  const pathProject = join(process.cwd(), options.dirName!);

  if (existsSync(pathProject) || !options.dirName) {
    const reg = new RegExp(/\_[0-9]{1,2}/);
    const match = options.dirName!.match(reg);
    if (match && match.index === options.dirName!.length - match[0].length) {
      const number = parseInt(options.dirName!.substring(match.index + 1, options.dirName!.length)) + 1;
      options = {
        ...options,
        dirName: options.dirName!.replace(reg, `_${number}`),
      };
      return renameDir(options);
    } else {
      options.dirName += "_1";
      return renameDir(options);
    }
  } else return options;
}

export async function createDirProject(options: ICreateOptions): Promise<ICreateOptions> {
  try {
    options = await renameDir(options);
    const pathDir = join(process.cwd(), options.dirName!);

    await mkdir(pathDir);
    options = {
      ...options,
      targetDirectory: pathDir,
    };
    return options;
  } catch (err) {
    console.log(`${chalk.red.bold("ERROR")} An error occurred while creating the folder`);
    return process.exit(1);
  }
}
