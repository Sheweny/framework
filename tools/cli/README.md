# Sheweny CLI

![sheweny_baniere (5)](https://user-images.githubusercontent.com/59796136/146163807-a14768d5-c8c9-4968-a55f-a19157cf6ead.png)

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/Sheweny/cli)
[![made-with-Markdown](https://img.shields.io/badge/Made%20with-Typescript-1f425f.svg)](http://commonmark.org)
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Sheweny/master/LICENSE)
[![GitHub tag](https://img.shields.io/github/tag/Sheweny/cli.svg)](https://github.com/Sheweny/cli/tags/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

This module is a CLI (Command Line Interface) for create discord bots with Sheweny framework.

**Guide : [Click here](https://sheweny.js.org/guide/cli/Usage.html)**

- [Sheweny](#sheweny-cli)
- [Getting started](#getting-started-)
  - [Prerequisites](#prerequisites-)
  - [Installation](#installation-)
- [Usage](#usage-)
  - [Informations](#informations-)
  - [Create command](#create-command-)
  - [Add command](#add-command-)
  - [Init command](#init-command-)
  - [Version command](#version-command-)
- [Common errors](#common-errors-%EF%B8%8F)
- [Contributions/Licence](#contributionslicence-)
- [Help](#need-help-)

## Getting started ✨

### Prerequisites 👀

Node.js 16.6.0 or newer is required.

### Installation 🎈

For creating a discord bot project with the Sheweny framework, sheweny's command line interface will make your life easier.
To use it is very simple, you just need to have npm (or yarn), and to install the module.

Install with npm

```sh
npm install -g @sheweny/cli
```

Install with yarn

```sh
yarn global add @sheweny/cli
```

Once the command line interface is installed, you can go to the next section to learn more about the different commands.

## Usage 💡

### Informations 📖

The command line interface has several prefixes which are `sheweny` and `shw`, so for the following commands, you can use one of the 2 prefixes.
The help command is also at your disposal if you are too lazy to come to the guide.

```sh
sheweny --help
```

### Create command ⛏️

To create a project, you just need to run the following command.

```sh
sheweny create [project_name]
```

Then you will have a series of questions that will allow you to refine the result of your project creation and to have a bot start that meets your expectations.
Depending on what you have answered, you will have access from the start, the creation of the project has commands, events, or interactions.

For more information, you can run the help command: `sheweny --help create`

### Add command 🔥

To add a template in your project with the sheweny framework, you just need to run the following command.

```sh
sheweny add
```

You have several types of template addition depending on what you want to add

- command
- event
- button
- selectmenu
- inhibitor

After choosing the type of addition, you can answer the questions that are offered to once again refine the result of adding a template.

For more information, you can run the help command: `sheweny --help add`.

### Init command 🏁

This command is used to initialize the Command Line Interface (CLI) with **an existing project** .

### Version command 📈

This command return the version of the CLI (not the framework).

---

After having done all this, you can of course edit the project code as you wish with an editor, using the rest of the Guide or with the Documentation.

## Common errors ☢️

### Execution Policy 🔴

If you have an error :

```sh
File cannot be loaded because the execution of scripts is disabled on this system. Please see "get-help about_signing" for more details
```

Changed script execution parameter. On an administrator powershell, you can do this by running the following command:

```sh
Set-ExecutionPolicy Unrestricted
```

## Contributions/Licence 🌍

This project has an MIT license. And you are welcome to contribute.

## Need help 👍

If you have question or need help, open issue or join [support server](https://discord.gg/qgd85nEf5a).
