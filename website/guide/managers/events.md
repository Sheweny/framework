# Events manager

Set up an events manager to load and register events.

## Setup in client

When setting up the client, it is possible to set the manager as a parameter :

:::: code-group
::: code-group-item JS CommonJS

```js
const { ShewenyClient } = require("sheweny");

const client = new ShewenyClient({
  intents: ["Guilds"],
  managers: {
    events: {
      directory: "./events",
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
    events: {
      directory: "./events",
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
const { ShewenyClient, EventsManager } = require("sheweny");

const client = new ShewenyClient({ intents: ["GUILDS"] });

const EvtsManager = new EventsManager(client, {
  directory: "./events", // Directory where events are stored
  loadAll: true, // Load all events (default: true)
});

EvtsManager.loadAndRegisterAll().then(() => {
  console.log("All events loaded and registered");
});
```

:::
::: code-group-item TS ES Modules

```ts
import { ShewenyClient, EventsManager } = from "sheweny";

const client = new ShewenyClient({ intents: ["GUILDS"] });

const EvtsManager = new EventsManager(client, {
  directory: "./events", // Directory where events are stored
  loadAll: true, // Load all events (default: true)
  });

EvtsManager.loadAndRegisterAll().then(() => {
  console.log('All events loaded and registered')
})
```

:::
::::
