# Buttons manager

Set up an buttons managers to load buttons interactions events.

## Setup in client

When setting up the client, it is possible to set the manager as a parameter :

:::: code-group
::: code-group-item JS CommonJS

```js
const { ShewenyClient } = require("sheweny");

const client = new ShewenyClient({
  intents: ["Guilds"],
  managers: {
    buttons: {
      directory: "./interactions/buttons", // Directory where buttons interactions are stored
      loadAll: true, // Load all events (default: true)
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
    buttons: {
      directory: "./interactions/buttons", // Directory where buttons interactions are stored
      loadAll: true, // Load all events (default: true)
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
const { ShewenyClient, ButtonsManager } = require("sheweny");

const client = new ShewenyClient({ intents: ["GUILDS"] });

const BtnsManager = new ButtonsManager(client, {
  directory: "./interactions/buttons", // Directory where the buttons are stored
  loadAll: true, // Load all buttons (default: true)
});

BtnsManager.loadAll();
```

:::
::: code-group-item TS ES Modules

```ts
import { ShewenyClient, ButtonsManager } from "sheweny";

const client = new ShewenyClient({ intents: ["GUILDS"] });

const BtnsManager = new ButtonsManager(client, {
  directory: "./interactions/buttons", // Directory where the buttons are stored
  loadAll: true, // Load all buttons (default: true)
});

BtnsManager.loadAll();
```

:::
::::
