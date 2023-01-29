# Modals manager

Set up an modals managers to load modals interactions events.

## Setup in client

When setting up the client, it is possible to set the manager as a parameter :

::: code-group

```js [Javascript CJS]
const { ShewenyClient } = require('sheweny');

const client = new ShewenyClient({
  intents: ['Guilds'],
  managers: {
    modals: {
      directory: './interactions/modals', // Directory where modals interactions are stored
    },
  },
});
```

```ts [Typescript ESM]
import { ShewenyClient } from 'sheweny';

const client = new ShewenyClient({
  intents: ['Guilds'],
  managers: {
    modals: {
      directory: './interactions/modals', // Directory where modals interactions are stored
    },
  },
});
```

:::

## Setup with class

You can also use the class to set up the manager somewhere else :

::: code-group

```js [Javascript CJS]
const { ShewenyClient, ModalsManager } = require('sheweny');

const client = new ShewenyClient({ intents: ['GUILDS'] });

const ModalsManager = new ModalsManager(client, {
  directory: './interactions/modals', // Directory where the modals are stored
});

ModalsManager.loadAll();
```

```ts [Typescript ESM]
import { ShewenyClient, ModalsManager } from 'sheweny';

const client = new ShewenyClient({ intents: ['GUILDS'] });

const ModalsManager = new ModalsManager(client, {
  directory: './interactions/modals', // Directory where the modals are stored
});

ModalsManager.loadAll();
```

:::
