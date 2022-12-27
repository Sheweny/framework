# Inhibitors manager

Set up an inhibitors manager to load inhibitors.

## Setup in client

When setting up the client, it is possible to set the manager as a parameter :

:::: code-group
::: code-group-item JS CommonJS

```js
const { ShewenyClient } = require("sheweny");

const client = new ShewenyClient({
  intents: ["Guilds"],
  managers: {
    inhibitors: {
      directory: "./inhibitors", // Directory where the inhibitors are stored
      loadAll: true, // Load all inhibitors (default: true)
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
    inhibitors: {
      directory: "./inhibitors", // Directory where the inhibitors are stored
      loadAll: true, // Load all inhibitors (default: true)
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
const { ShewenyClient, InhibitorsManager } = require("sheweny");

const client = new ShewenyClient({ intents: ["GUILDS"] });

const InhibsManager = new InhibitorsManager(client, {
  directory: "./inhibitors",
  loadAll: true, // Load all inhibitors (default: true)
});

InhibsManager.loadAll();
```

:::
::: code-group-item TS ES Modules

```ts
import { ShewenyClient, Inhibitorsmanager } = from "sheweny";

const client = new ShewenyClient({ intents: ["GUILDS"] });

const InhibsManager = new InhibitorsManager(client, {
  directory: "./inhibitors",
  loadAll: true, // Load all inhibitors (default: true)
});

InhibsManager.loadAll()
```

:::
::::
