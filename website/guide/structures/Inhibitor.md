# Basic inhibitor

Inhibitors allow you to limit the use of a command, an event, or an interaction.

## Getting started

Inhibitors are a way to monitor or block messages or interactions.
Because inhibitors are another kind of module, we need another kind of manager.
To set it up, simply import and instantiate the InhibitorManager.
Please see [inhibitors manager](../managers/inhibitors) for setup the manager.

## Import Inhibitor

Import the [Inhibitor](../../docs/structures/Inhibitor) class :

::: code-group

```js [Javascript CJS]
const { Inhibitor } = require('sheweny');
```

```ts [Typescript ESM]
import { Inhibitor } from 'sheweny';
```

:::

## Inhibitor class

In your `inhibitors` directory create file with your inhibitor :

::: code-group

```js [Javascript CJS]
const { Inhibitor } = require("sheweny");

module.exports =  class BlackListInhibitor extends Inhibitor {
  constructor(client) {
    super(client, "blacklist", {
      type: ["APPLICATION_COMMAND"],
    });
  }

  execute(client, interaction) {
    return !["877090306103840778"].includes(interaction.guildId!);
  }

  onFailure(client, interaction) {
    interaction.reply("Your guild is blacklisted.");
  }
}
```

```ts [Typescript ESM]
import { Inhibitor } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import type { CommandInteraction } from 'discord.js';

export class BlackListInhibitor extends Inhibitor {
  constructor(client: ShewenyClient) {
    super(client, 'blacklist', {
      type: ['APPLICATION_COMMAND'],
    });
  }

  execute(client: ShewenyClient, interaction: CommandInteraction) {
    return !['877090306103840778'].includes(interaction.guildId!);
  }

  onFailure(client: ShewenyClient, interaction: CommandInteraction) {
    interaction.reply('Your guild is blacklisted.');
  }
}
```

:::

## Inhibitors priority

You can defined a priority to run some checks first.

::: code-group

```js [Javascript CJS]
const { Inhibitor } = require("sheweny");

module.exports = class InDatabaseInhibitor extends Inhibitor {
  constructor(client) {
    super(client, "blacklist", {
      type: "APPLICATION_COMMAND",
      priority: 1, // Executed before other inhibitors with lower priority
    });
  }

  execute(client, interaction) {
    return await dbPremium.findOne({ guildID: interaction.guildId });
  }

  onFailure(client, interaction) {
    interaction.reply("Your guild not have premium version of bot.");
  }
};
```

```ts [Typescript ESM]
import { Inhibitor } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import type { CommandInteraction } from 'discord.js';

export class InDatabaseInhibitor extends Inhibitor {
  constructor(client: ShewenyClient) {
    super(client, 'blacklist', {
      type: 'APPLICATION_COMMAND',
      priority: 1, // Executed before other inhibitors with lower priority
    });
  }

  execute(client: ShewenyClient, interaction: CommandInteraction) {
    return await dbPremium.findOne({ guildID: interaction.guildId });
  }

  onFailure(client: ShewenyClient, interaction: CommandInteraction) {
    interaction.reply('Your guild not have premium version of bot.');
  }
}
```

:::

## Inhibitors types

For inhibitors you can choose different types :

- `MESSAGE_COMMAND` : Inhibitors for commands message.

- `APPLICATION_COMMAND` : Inhibitors for application commands (slash-commands or context-menus).

- `BUTTON` : Inhibitors for buttons.

- `SELECT_MENU` : Inhibitors for select-menus.

- `ALL` : Inhibitors for all types.

::: warning
The inhibitors types must be an array of this types
:::
