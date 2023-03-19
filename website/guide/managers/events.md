# Events manager

Set up an events manager to load and register events.

## Setup in client

When setting up the client, it is possible to set the manager as a parameter :

::: code-group

```js [Javascript CJS]
const { ShewenyClient } = require('sheweny');

const client = new ShewenyClient({
  intents: ['Guilds'],
  managers: {
    events: {
      directory: './events',
    },
  },
});
```

```ts [Typescript ESM]
import { ShewenyClient } from 'sheweny';

const client = new ShewenyClient({
  intents: ['Guilds'],
  managers: {
    events: {
      directory: './events',
    },
  },
});
```

:::

## Setup with class

You can also use the class to set up the manager somewhere else :

```js [Javascript CJS]
const { ShewenyClient, EventsManager } = require('sheweny');

const client = new ShewenyClient({ intents: ['GUILDS'] });

const EvtsManager = new EventsManager(client, {
  directory: './events', // Directory where events are stored
});

EvtsManager.loadAndRegisterAll().then(() => {
  console.log('All events loaded and registered');
});
```

```ts [Typescript ESM]
import { ShewenyClient, EventsManager } = from "sheweny";

const client = new ShewenyClient({ intents: ["GUILDS"] });

const EvtsManager = new EventsManager(client, {
  directory: "./events", // Directory where events are stored
  });

EvtsManager.loadAndRegisterAll().then(() => {
  console.log('All events loaded and registered')
})
```
