/**
 * Get the version of the application with package.json
 */
import { createRequire } from "node:module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
export function getVersion(): string {
  //@ts-ignore
  return require("../../../package.json").version;
}
