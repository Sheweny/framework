import { existsSync } from "node:fs";
import { join } from "node:path";
import { IAddOptions } from "../../../typescript/interfaces/interfaces";

export async function renameFile(file: string, options: IAddOptions): Promise<string> {
  let fileName = `${file.toLowerCase()}${options.config!.template === "javascript" ? ".js" : ".ts"}`;
  const pathFile = join(options.target!, fileName);

  if (existsSync(pathFile)) {
    const reg = new RegExp(/\_[0-9]{1,2}/);
    const match = file.match(reg);
    if (match && match.index === file.length - match[0].length) {
      const number = parseInt(file.substring(match.index + 1, file.length)) + 1;
      file = file.replace(reg, `_${number}`);
      return renameFile(file, options);
    } else {
      file += "_1";
      return renameFile(file, options);
    }
  } else return fileName;
}
