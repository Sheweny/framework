import { join } from "node:path";
import { createRequire } from "node:module"; // Bring in the ability to create the 'require' method
import { IAddOptions, ICliConfig } from "../../../typescript/interfaces/interfaces";
const require = createRequire(import.meta.url); // construct the require method
const pathFile = join(process.cwd(), "cli-config.json");

export async function getCliConfig(options: IAddOptions): Promise<IAddOptions> {
  const config: ICliConfig = require(pathFile);
  options = {
    ...options,
    config,
  };
  return options;
}
