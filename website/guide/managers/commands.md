# Commands manager

Set up an application commands manager to load and register interactions.

## Setup in client

When setting up the client, it is possible to set the manager as a parameter :

:::: code-group
::: code-group-item JS CommonJS

```js
const { ShewenyClient } = require("sheweny");

const client = new ShewenyClient({
  intents: ["Guilds"],
  managers: {
    commands: {
      directory: "./commands", // Directory where the commands are stored
      guildId: ["877090306103840778"], // Register commands and context-menus in this guild
      prefix: "!", // Prefix for commands-message
      applicationPermissions: false,
      loadAll: true, // Load all commands (default: true)
    },
  },
});
```

:::
::: code-group-item TS ES Modules

```ts
import { ShewenyClient } from "sheweny";

const client = new ShewenyClient({
  intents: ["Guilds"],
  managers: {
    commands: {
      directory: "./commands", // Directory where the commands are stored
      guildId: "877090306103840778", // Register commands and context-menus in this guild
      prefix: "!", // Prefix for commands-message
      applicationPermissions: false,
      loadAll: true, // Load all commands (default: true)
    },
  },
});
```

:::
::::

## Setup with class

You can also use the class to set up the manager somewhere else :

:::: code-group
::: code-group-item JS CommonJS

```js
const { ShewenyClient, CommandsManager } = require("sheweny");

const client = new ShewenyClient({ intents: ["GUILDS"] });

const commandsHandler = new CommandsManager(client, {
  directory: "./commands", // Directory where the commands are stored
  guildId: "877090306103840778", // Register commands and context-menus in this guild
  prefix: "!", // Prefix for commands-message
  applicationPermissions: false,
  loadAll: true, // Load all commands (default: true)
});

commandsHandler.loadAndRegisterAll().then(() => {
  console.log("All commands loaded and registered");
});
```

:::
::: code-group-item TS ES Modules

```ts
import { ShewenyClient, CommandsManager } = from "sheweny";

const client = new ShewenyClient({ intents: ["GUILDS"] });

const commandsHandler = new CommandsManager(client, {
  directory: "./commands", // Directory where the commands are stored
  guildId: "877090306103840778", // Register commands and context-menus in this guild
  prefix: "!", // Prefix for commands-message
  applicationPermissions: false,
  loadAll: true, // Load all commands (default: true)
});

commandsHandler.loadAndRegisterAll().then(() => {
  console.log("All commands loaded and registered");
});
```

:::
::::
