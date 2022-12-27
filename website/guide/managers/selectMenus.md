# Select-Menus manager

Set up an select-menus manager to load select-menus interactions events.

## Setup in client

When setting up the client, it is possible to set the manager as a parameter :

:::: code-group
::: code-group-item JS CommonJS

```js
const { ShewenyClient } = require("sheweny");

const client = new ShewenyClient({
  intents: ["Guilds"],
  managers: {
    selectMenus: {
      directory: "./interactions/select-menus", // Directory where the select-menus are stored
      loadAll: true, // Load all select-menus (default: true)
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
    selectMenus: {
      directory: "./interactions/select-menus", // Directory where the select-menus are stored
      loadAll: true, // Load all select-menus (default: true)
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
const { ShewenyClient, SelectMenusManager } = require("sheweny");

const client = new ShewenyClient({ intents: ["GUILDS"] });

const selectManager = new SelectMenusManager(client, {
  directory: "./interactions/select-menus", // Directory where the select-menus are stored
  loadAll: true, // Load all select-menus (default: true)
});

selectManager.loadAll();
```

:::
::: code-group-item TS ES Modules

```ts
import { ShewenyClient, SelectMenusManager } = from "sheweny";

const client = new ShewenyClient({ intents: ["GUILDS"] });

const selectManager = new SelectMenusManager(client, {
  directory: "./interactions/select-menus", // Directory where the select-menus are stored
  loadAll: true, // Load all select-menus (default: true)
});

selectManager.loadAll()
```

:::
::::
