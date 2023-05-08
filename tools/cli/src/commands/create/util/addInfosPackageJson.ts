import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import type { ICreateOptions } from "../../../typescript/interfaces/interfaces";

export async function addInfosPackageJson(options: ICreateOptions): Promise<void> {
  const filePath = join(options.targetDirectory!, "package.json");
  let file = {
    name: options.dirName,
    version: "1.0.0",
    description: "",
    main: "index.js",
    scripts: {},
    dependencies: {},
    devDependencies: {},
    keywords: [],
    author: "",
    license: "ISC",
  };

  /**
   * @description : add scripts in package.json
   */
  const scriptsJs: any = {
    start: "node ./src/index.js",
  };

  if (options.optionnalLibrary?.includes("nodemon")) scriptsJs["dev"] = "nodemon ./src/index.js";

  const scriptsTs: any = {
    start: "node ./dist/index.js",
    build: "tsc",
  };
  if (options.optionnalLibrary?.includes("ts-node-dev")) scriptsTs["dev"] = "tsnd --respawn --transpile-only --cls ./src/index.ts";

  /**
   * @description: Add dependencies to package.json
   */
  const dependencies: any = {};
  if (options.optionnalLibrary?.includes("@discordjs/voice")) dependencies["@discordjs/voice"] = "*";

  if (options.version === 2) dependencies["sheweny"] = "^2.0.0";
  if (options.version === 3) dependencies["sheweny"] = "^3.0.0";
  if (options.version === 4) dependencies["sheweny"] = "^4.0.0";

  if (options.version === 2) dependencies["discord.js"] = "^13.0.0";
  if (options.version === 3) dependencies["discord.js"] = "^13.0.0";
  if (options.version === 4) dependencies["discord.js"] = "^14.0.0";
  /**
   * @description: Add devDependencies to package.json
   */
  const devDependenciesJs: any = {};
  if (options.optionnalLibrary?.includes("nodemon")) devDependenciesJs["nodemon"] = "^2.0.0";

  const devDependenciesTs: any = {};
  if (options.optionnalLibrary?.includes("ts-node-dev")) devDependenciesTs["ts-node-dev"] = "^1.0.0";

  if (options.template === "typescript") file.main = "dist/index.js";
  else file.main = "src/index.js";
  file.scripts = options.template === "javascript" ? scriptsJs : scriptsTs;
  file.dependencies = dependencies;
  file.devDependencies = options.template === "javascript" ? devDependenciesJs : devDependenciesTs;
  await writeFile(filePath, JSON.stringify(file, null, 2));
}
