# Sheweny

![sheweny](https://cdn.discordapp.com/attachments/881988260925153322/882027519753224244/sheweny_baniere.png)

<div align="center">

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=flat-square)](https://github.com/Sheweny/Spiritus)
[![made-with-Typescript](https://img.shields.io/badge/Made%20with-Typescript-1f425f.svg?style=flat-square)](http://commonmark.org)
[![GitHub license](https://img.shields.io/github/license/Sheweny/framework.svg?style=flat-square)](https://github.com/Sheweny/framework/LICENSE)
[![GitHub tag](https://img.shields.io/github/tag/Sheweny/framework.svg?style=flat-square)](https://github.com/Sheweny/framework/tags/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

![Compatible JS](https://img.shields.io/badge/Compatible-Typescript-informational?style=flat&logo=Code&logoColor=white&color=2bbc8a)
![Compatible TS](https://img.shields.io/badge/Compatible-Javascript-informational?style=flat&logo=Code&logoColor=white&color=2bbc8a)

</div>

## About

Sheweny is a framework for creating Discord bots in TypeScript. This repository contains multiple packages with separate releases.

## Packages

- [@sheweny/framework](./packages/sheweny/) - The main package of the framework.
- [@sheweny/heweny](./packages/heweny) - A package to create structures (commands, events, buttons etc.) with objects.
- [@sheweny/resolve](./packages/resolve/) - A package to parse strings and isolate structures from names, mentions, tags, parts etc. of users, guilds, channemls, roles etc.
- [@sheweny/markdown](./packages/markdown/) - A package to parse & create markdown strings with Discord markdown style.
- [@sheweny/mistial](./packages/mistial/) - A package to interact with databases (MongoDB, MySQL, PostgreSQL, SQLite...).
- [@sheweny/utils](./packages/utils/) - A package with multiple utilities functions.

## Examples

### Simple client

```js
import { ShewenyClient } from '@sheweny/framework';

const client = new ShewenyClient({
  intents: ['Guilds', 'GuildMembers', 'GuildMessages'],
  managers: {
    commands: {
      directory: './commands',
      applicationPermissions: true, // Enable slash-commands permissions
    },
    events: {
      directory: './events',
    },
    buttons: {
      directory: './buttons',
    },
  },
});
```

### Simple command

```js
const { Command } = require('sheweny');

class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'ping',
      description: 'Ping Pong',
      type: 'SLASH_COMMAND',
      cooldown: 5, // 5 seconds
    });
  }

  async execute(interaction) {
    interaction.reply({ content: 'Pong!' });
  }
}

module.exports = PingCommand;
```

This project has an MIT license. And you are welcome to contribute.
For more details on contributions, please read the [CONTRIBUTING.md](./CONTRIBUTING.md) file.

## Help

If you need help with the framework or your bot you can open an issue for bugs report or [join the discord server](https://discord.gg/qgd85nEf5a) for questions.
