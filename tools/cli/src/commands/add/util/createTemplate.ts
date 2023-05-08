import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { IAddOptions } from "../../../typescript/interfaces/interfaces";
import { renameFile } from "../../add/util/renameFile.js";

export async function createTemplate(options: IAddOptions): Promise<void> {
  const file = await import("file://" + options.templateDirectory!);
  const fileContent: string = file.default(options);
  const filename = await renameFile(options.addName!, options);
  const pathFile = resolve(options.target!, filename);
  await writeFile(pathFile, fileContent);
}
