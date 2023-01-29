# Buttons manager

Set up an buttons managers to load buttons interactions events.

## Setup in client

When setting up the client, it is possible to set the manager as a parameter :

::: code-group

```js [Javascript CJS]
const { ShewenyClient } = require('sheweny');

const client = new ShewenyClient({
  intents: ['Guilds'],
  managers: {
    buttons: {
      directory: './interactions/buttons', // Directory where buttons interactions are stored
    },
  },
});
```

```ts [Typescript ESM]
import { ShewenyClient } from 'sheweny';

const client = new ShewenyClient({
  intents: ['Guilds'],
  managers: {
    buttons: {
      directory: './interactions/buttons', // Directory where buttons interactions are stored
    },
  },
});
```

:::

## Setup with class

You can also use the class to set up the manager somewhere else :

::: code-group

```js [Javascript CJS]
const { ShewenyClient, ButtonsManager } = require('sheweny');

const client = new ShewenyClient({ intents: ['GUILDS'] });

const BtnsManager = new ButtonsManager(client, {
  directory: './interactions/buttons', // Directory where the buttons are stored
});

BtnsManager.loadAll();
```

```ts [Typescript ESM]
import { ShewenyClient, ButtonsManager } from 'sheweny';

const client = new ShewenyClient({ intents: ['GUILDS'] });

const BtnsManager = new ButtonsManager(client, {
  directory: './interactions/buttons', // Directory where the buttons are stored
});

BtnsManager.loadAll();
```

:::
