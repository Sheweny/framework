# Sheweny

![sheweny](https://cdn.discordapp.com/attachments/881988260925153322/882027519753224244/sheweny_baniere.png)

Sheweny is a framework for create discord bots with javascript (or typescript).

- [Useful links](#useful-links)
- [Main feactures](#main-features-)
- [Getting started](#getting-started-)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Example](#example-)

## Useful links

- [WEBSITE](https://sheweny.js.org)  
- [DOCUMENTATION](https://sheweny.js.org/doc)  
- [GUIDE](https://sheweny.js.org/guide)  

## Main features ✨

- Modular and reloadable commands, inhibitors, events and interactions.

- Flexible command handling and creation.

- Interactions support like slash-commands, buttons, select-menus

- Powerful and thorough command arguments parsing.

- Development mode for limit errors

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
