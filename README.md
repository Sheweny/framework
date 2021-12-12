# Sheweny

![sheweny](https://cdn.discordapp.com/attachments/881988260925153322/882027519753224244/sheweny_baniere.png)

<div align="center">

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/Smaug6739/Spiritus)
[![made-with-Typescript](https://img.shields.io/badge/Made%20with-Typescript-1f425f.svg)](http://commonmark.org)
[![GitHub license](https://img.shields.io/github/license/Sheweny/framework.svg)](https://github.com/Smaug6739/master/LICENSE)
[![GitHub tag](https://img.shields.io/github/tag/Sheweny/framework.svg)](https://github.com/Sheweny/framework/tags/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

</div>

Sheweny is a framework for create discord bots with javascript (or typescript).

- [Sheweny](#sheweny)
- [Main feactures](#main-features-)
- [Getting started](#getting-started-)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Command Line Interface](#command-line-interface)
- [Useful links](#useful-links-)
- [Example](#example-)
- [Contributing](#contributing-)
- [Contributors](#contributors-)
- [Help](#help-)

## Main features ✨

- Modular and reloadable commands, inhibitors, events and interactions.

- Flexible command handling and creation.

- Interactions support like slash-commands, buttons, select-menus, modals.

- Powerful and thorough command arguments parsing.

- Development mode to limit errors

- Full javascript and typescript support

## Getting Started 🎈

### Prerequisites

Node.js 16.6.0 or newer is required.

### Installation

With npm :

```sh-session
npm install sheweny
```

With yarn :

```sh-session
yarn add sheweny
```

### Command Line interface

You can also use our official [Command Line Interface](https://github.com/Sheweny/CLI) for create your bot and/or add components like commands, events etc.

![image](https://user-images.githubusercontent.com/59796136/143768918-3ddf97df-e67e-47a9-89d6-5d56815f2287.png)

## Useful links 📖

- [Website](https://sheweny.js.org)
- [Documentation](https://sheweny.js.org/doc)
- [Guide](https://sheweny.js.org/guide)
- [NPM Registry](https://www.npmjs.com/package/sheweny)
- [Discord server](https://discord.gg/qgd85nEf5a)
- [GitHub organization](https://github.com/Sheweny)

## Example 👀

```js
const { ShewenyClient } = require('sheweny');
const config = require('./config.json');

const client = new ShewenyClient({
  admins: ['611468402263064577'],
  intents: ['GUILDS', 'GUILD_MEMBERS'],
  partials: ['GUILD_MEMBER'],
  mode: 'development',
  managers: {
    commands: {
      directory: './commands',
      guildId: ['877090306103840778'],
      prefix: '!',
    },
    events: {
      directory: './events',
    },
    buttons: {
      directory: './interactions/buttons',
    },
    selectMenus: {
      directory: './interactions/selectMenus',
    },
  },
});

client.login(config.token);
```

## Contributing 🌍

This project has an MIT license. And you are welcome to contribute.
For more details on contributions, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) file.

## Contributors 💡

- [Smaug6739](https://github.com/Smaug6739) - Developer and project owner.
- [Natchi59](https://github.com/Natchi59) - Old Sheweny developer
- [Ludo-Code](https://github.com/Ludo-code) - Tester of the framework and helper

## Help 👍

If you need help with the framework or your bot you can open an issue for bugs report or [join the discord server](https://discord.gg/qgd85nEf5a) for the questions.

---

> Thank you to everyone who contributes to the project. Thanks also to all the people who use it. ❤️
