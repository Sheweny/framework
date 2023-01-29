# Commands manager

Set up an application commands manager to load and register interactions.

## Setup in client

When setting up the client, it is possible to set the manager as a parameter :

:::code-group

```js [Javascript CJS]
const { ShewenyClient } = require('sheweny');

const client = new ShewenyClient({
  intents: ['Guilds'],
  managers: {
    commands: {
      directory: './commands', // Directory where the commands are stored
      guildId: ['877090306103840778'], // Register commands and context-menus in this guild
      prefix: '!', // Prefix for commands-message
      applicationPermissions: false,
    },
  },
});
```

```ts [Typescript ESM]
import { ShewenyClient } from 'sheweny';

const client = new ShewenyClient({
  intents: ['Guilds'],
  managers: {
    commands: {
      directory: './commands', // Directory where the commands are stored
      guildId: '877090306103840778', // Register commands and context-menus in this guild
      prefix: '!', // Prefix for commands-message
      applicationPermissions: false,
    },
  },
});
```

:::

## Setup with class

You can also use the class to set up the manager somewhere else :

::: code-group

```js [Javascript CJS]
const { ShewenyClient, CommandsManager } = require('sheweny');

const client = new ShewenyClient({ intents: ['GUILDS'] });

const commandsHandler = new CommandsManager(client, {
  directory: './commands', // Directory where the commands are stored
  guildId: '877090306103840778', // Register commands and context-menus in this guild
  prefix: '!', // Prefix for commands-message
  applicationPermissions: false,
});

commandsHandler.loadAndRegisterAll().then(() => {
  console.log('All commands loaded and registered');
});
```

```ts [Typescript ESM]
import { ShewenyClient, CommandsManager } = from "sheweny";

const client = new ShewenyClient({ intents: ["GUILDS"] });

const commandsHandler = new CommandsManager(client, {
  directory: "./commands", // Directory where the commands are stored
  guildId: "877090306103840778", // Register commands and context-menus in this guild
  prefix: "!", // Prefix for commands-message
  applicationPermissions: false,
});

commandsHandler.loadAndRegisterAll().then(() => {
  console.log("All commands loaded and registered");
});
```

:::
