# Create the client

## Import ShewenyClient

Import the [ShewenyClient](../../doc/client/ShewenyClient.md) class from library.

### Using CommonJS syntax

```js
const { ShewenyClient } = require("sheweny");
```

### Using ES modules syntax

```js
import { ShewenyClient } from "sheweny";
```

## Create new instance of client

Create a new instance of [ShewenyClient](../../doc/client/ShewenyClient.md) with [ShewenyClientOptions](../../doc/typedef/ShewenyClientOptions.md)

```js
const client = new ShewenyClient({
  intents: ["GUILDS", "GUILD_MESSAGES"],
  admins: ["611468402263064577"], // Admins permissions for the bot
  managers: {
    commands: {
      directory: "./commands", // Directory where commands are stored
      prefix: "!", // Prefix for commands-message
      loadAll: true, // Load all commands
      autoRegisterApplicationCommands: true, // Register application commands
    },
    events: {
      directory: "./events",
      loadAll: true,
    },
  },
});
```

::: warning
The `intents` options is required with discord.js V13.0.0 or higher.
:::
