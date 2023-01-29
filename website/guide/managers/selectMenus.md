# Select-Menus manager

Set up an select-menus manager to load select-menus interactions events.

## Setup in client

When setting up the client, it is possible to set the manager as a parameter :

::: code-group

```js [Javascript CJS]
const { ShewenyClient } = require('sheweny');

const client = new ShewenyClient({
  intents: ['Guilds'],
  managers: {
    selectMenus: {
      directory: './interactions/select-menus', // Directory where the select-menus are stored
    },
  },
});
```

```ts [Typescript ESM]
import { ShewenyClient } from 'sheweny';

const client = new ShewenyClient({
  intents: ['Guilds'],
  managers: {
    selectMenus: {
      directory: './interactions/select-menus', // Directory where the select-menus are stored
    },
  },
});
```

:::

## Setup with class

You can also use the class to set up the manager somewhere else :

::: code-group

```js [Javascript CJS]
const { ShewenyClient, SelectMenusManager } = require('sheweny');

const client = new ShewenyClient({ intents: ['GUILDS'] });

const selectManager = new SelectMenusManager(client, {
  directory: './interactions/select-menus', // Directory where the select-menus are stored
});

selectManager.loadAll();
```

```ts [Typescript ESM]
import { ShewenyClient, SelectMenusManager } = from "sheweny";

const client = new ShewenyClient({ intents: ["GUILDS"] });

const selectManager = new SelectMenusManager(client, {
  directory: "./interactions/select-menus", // Directory where the select-menus are stored
});

selectManager.loadAll()
```

:::
