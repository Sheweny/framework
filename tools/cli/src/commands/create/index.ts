import inquirer from "inquirer";
import Listr from "listr";
import { execa } from "execa";
import chalk from "chalk";
import { createDirProject, addInfosPackageJson, getTemplateDirectory, copyFiles } from "./util/index.js";
import type { ICreateOptions, ICommand } from "../../typescript/interfaces/interfaces";
const { prompt } = inquirer;
export class Project {
  /**
   * The options of the command
   * @param {ICommand} opts
   */
  public options: ICommand;
  /**
   * Config of the project
   * @param {ICreateOptions} config
   */
  public config: ICreateOptions = {};

  /**
   * @constructor
   * @param {ICommand} opts
   */
  constructor(opts: ICommand) {
    this.options = opts;
  }

  /**
   * Get the config parameters
   * @param options
   * @returns {Promise<ICreateOptions>} -The config parameters
   */
  async getConfig(): Promise<ICreateOptions> {
    if (this.options.skipPrompts)
      return {
        dirName: this.options.arguments?.join(" ") || "Project_Bot",
        template: "javascript",
        packageManager: "npm",
        handlers: ["commands", "events"],
        configFileType: "json",
        version: 4,
      };

    console.log(`\n📜 Please answer the questionnaires to get a better result\n`);

    const answers = await prompt([
      {
        type: "input",
        name: "dirName",
        message: "Please choose the name of the project:",
      },
      {
        type: "list",
        name: "version",
        message: "Please choose a version of Sheweny",
        choices: ["Version 2", "Version 3", "Version 4"],
        default: "Version 4",
      },
      {
        type: "list",
        name: "template",
        message: "Please choose a language template",
        choices: ["Javascript", "Typescript"],
        default: "Javascript",
      },

      {
        type: "confirm",
        name: "runInstall",
        message: "Do you want to install the packages ?",
        default: true,
      },
      {
        type: "list",
        name: "packageManager",
        message: "Which package manager do you want to install the packages with ?",
        choices: ["Npm", "Yarn", "Pnpm"],
        default: "Npm",
        when: (answer) => answer.runInstall,
      },
      {
        type: "checkbox",
        name: "optionnalLibrary",
        message: "What optional libraries do you want to install ?",
        choices: (answers) => ["@discordjs/voice"].concat(answers.template === "Javascript" ? "nodemon" : "ts-node-dev"),
      },
      {
        type: "confirm",
        name: "git",
        message: "Do you want initialize git ?",
        default: false,
      },
      {
        type: "confirm",
        name: "putToken",
        message: "Do you want to add the token of your bot ?",
        default: true,
      },
      {
        type: "password",
        name: "token",
        message: "Please write your bot token:",
        when: (answers) => answers.putToken,
      },
      {
        type: "checkbox",
        name: "handlers",
        message: "Which handlers do you want to add ?",
        choices: ["Events", "Commands", "Buttons", "SelectMenus", "Inhibitors", "Modals"],
      },

      {
        type: "list",
        name: "configFileType",
        message: "What type of configuration file do you want ?",
        choices: (answers) => ["Json", `${answers.template === "Javascript" ? "JS" : "TS"}`],
        default: "Json",
      },
    ]);
    let version = 4;
    if (answers.version === "Version 2") version = 2;
    if (answers.version === "Version 3") version = 3;
    return {
      dirName: this.options.arguments?.join(" ") || answers.dirName.replaceAll(" ", "_"),
      template: answers.template.toLowerCase(),
      packageManager: answers.packageManager ? answers.packageManager.toLowerCase() : undefined,
      token: answers.token,
      git: answers.git,
      handlers: (answers.handlers as string[]).map((e) => e.toLowerCase()),
      configFileType: answers.configFileType.toLowerCase(),
      optionnalLibrary: answers.optionnalLibrary,
      version: version,
    };
  }
  async create(config: ICreateOptions): Promise<void> {
    if (!config) throw new Error("Config is not defined");

    const tasks = new Listr([
      {
        title: " 📁 Creating Project folder",
        task: async () => {
          config = await createDirProject(config);
        },
      },
      {
        title: ` 🧮 Getting ${config.template!} template`,
        task: async () => {
          config = await getTemplateDirectory(config);
        },
      },
      {
        title: " ⚙️ Git init",
        enabled: () => config.git === true,
        task: async (_, task) => {
          const gitError = (await execa("git", ["--version"])).failed;

          if (gitError) {
            task.title = `${task.title} (or not)`;
            return task.skip("Git not available");
          }

          execa("git", ["init", config.dirName!]).then((res) => {
            if (res.failed) return task.skip("An error has occurred");
          });
        },
      },
      {
        title: " 📑 Creating package.json file",
        task: async (_, task) => {
          try {
            await addInfosPackageJson(config);
          } catch (err) {
            task.skip("An error has occurred");
          }
        },
      },
      {
        title: ` 🗃️ Install packages with yarn`,
        enabled: () => config.packageManager === "yarn",
        task: async (ctx, task) => {
          const yarnError = (await execa("yarn", ["--version"])).failed;

          if (config.packageManager === "yarn" && yarnError) {
            ctx.yarn = false;

            task.title = `${task.title} (or not)`;
            return task.skip("Yarn not available");
          }

          try {
            await execa("yarn", {
              cwd: config.targetDirectory,
            });
          } catch (err) {
            task.skip("An error has occurred");
          }
        },
      },
      {
        title: " 🗃️ Install packages with npm",
        enabled: (_) => config.packageManager === "npm",
        task: async (_, task) => {
          try {
            await execa("npm", ["install"], {
              cwd: config.targetDirectory,
            });
          } catch (err) {
            task.skip("An error has occurred");
          }
        },
      },
      {
        title: " 🗃️ Install packages with pnpm",
        enabled: () => config.packageManager === "pnpm",
        task: async (_, task) => {
          try {
            await execa("pnpm", ["install"], {
              cwd: config.targetDirectory,
            });
          } catch (err) {
            task.skip("An error has occurred");
          }
        },
      },
      {
        title: ` 🖨️ Copying files`,
        task: async () => {
          await copyFiles(config);
        },
      },
    ]);

    tasks
      .run()
      .then(() => {
        console.log(
          `\n🎉 Successfully created project ${chalk.yellow(config.dirName!)} !\n👉 Get started with the following commands:\n\n ${chalk.grey(
            "$"
          )} ${chalk.blue(`cd ${config.dirName!}`)}\n${
            config.packageManager
              ? ` ${chalk.grey("$")} ${chalk.blue(`${config.packageManager!} start`)}\n`
              : ` ${chalk.grey("$")} ${chalk.blue(`npm install`)}\n`
          }`
        );
      })
      .catch(() => {
        console.log(`${chalk.red.bold("ERROR")} An error has occurred`);
      });
  }
}
