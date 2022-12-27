# Basic command

With sheweny each command must be a class which extends from the [Command](../../doc/structures/Command.md) for commands ans context-menus.
Please see [commands manager](../managers/commands) for setup the manager.

## Import Command

Import the [Command](../../doc/structures/Command.md)

:::: code-group
::: code-group-item CommonJS

```js
const { Command } = require("sheweny");
```

:::
::: code-group-item ESM

```js
import { Command } from "sheweny";
```

:::
::::

## Slash-command

:::: code-group
::: code-group-item JS CommonJS

```js
const { Command } = require("sheweny");

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      type: "SLASH_COMMAND",
      description: "Ping the bot",
      category: "Misc",
    });
  }
  execute(interaction) {
    interaction.reply({ content: "Pong !" });
  }
};
```

:::
::: code-group-item TS ES Modules

```ts
import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "ping",
      description: "Ping the bot",
      type: "SLASH_COMMAND",
      category: "Misc",
    });
  }
  execute(interaction: CommandInteraction) {
    interaction.reply({ content: "Pong !" });
  }
}
```

:::
::::

### Context-menu

:::: code-group
::: code-group-item JS CommonJS

```js
const { Command } = require("sheweny");

module.exports = class PingUserCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ping-user",
      description: "Send ping to a user",
      type: "CONTEXT_MENU_USER",
      category: "Misc",
    });
  }

  execute(interaction) {
    interaction.reply({ content: `Pong <@${interaction.targetId}> !` });
  }
};
```

:::
::: code-group-item TS ES Modules

```ts
import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { ContextMenuInteraction } from "discord.js";

export class PingUserCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "ping-user",
      description: "Send ping to a user",
      type: "CONTEXT_MENU_USER",
      category: "Misc",
    });
  }

  execute(interaction: ContextMenuInteraction) {
    interaction.reply({ content: `Pong <@${interaction.targetId}> !` });
  }
}
```

:::
::::

## Message command

:::: code-group
::: code-group-item JS CommonJS

```js
const { Command } = require("sheweny");

module.exports = class PingUserCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      description: "Ping a user",
      category: "Misc",
      args: [
        {
          name: "userToPing",
          type: "USER",
          default: null,
        },
      ],
    });
  }

  execute(message, args) {
    message.channel.send({
      content: `Pong ! ${args.userToPing ? args.userToPing : ""}`,
    });
  }
};
```

:::
::: code-group-item TS ES Modules

```ts
import { Command } from "sheweny";
import type { ShewenyClient  } from "sheweny";
import type { Message } from "discord.js";

export class PingUserCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "ping",
      description: "Ping a user",
      category: "Misc",
            args: [
        {
          name: "userToPing",
          type: "USER",
          default: null,
        },
      ],
    });
  }

  execute(message: Message, args:any) {
      content: `Pong ! ${args.userToPing ? args.userToPing : ""}`,
  }
}
```

:::
::::

## Command cooldown

Create cooldown in a command with the cooldown property in the constructor.

::: tip
The cooldown value is in seconds and it type is `number`
:::

### Slash-command

:::: code-group
::: code-group-item JS CommonJS

```js
const { Command } = require("sheweny");

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      description: "Ping the bot",
      type: "SLASH_COMMAND",
      category: "Misc",
      cooldown: 5, // cooldown 5 seconds
    });
  }

  execute(interaction) {
    interaction.reply({ content: "Pong !" });
  }
};
```

:::
::: code-group-item TS ES Modules

```ts
import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "ping",
      description: "Ping the bot",
      type: "SLASH_COMMAND",
      category: "Misc",
      cooldown: 5, // cooldown 5 seconds
    });
  }

  execute(interaction: CommandInteraction) {
    interaction.reply({ content: "Pong !" });
  }
}
```

:::
::::

### Message command

:::: code-group
::: code-group-item JS CommonJS

```js
const { Command } = require("sheweny");

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client {
      name: "ping",
      description: "Ping the bot",
      type: "MESSAGE_COMMAND",
      category: "Misc",
      cooldown: 5, // cooldown 5 seconds
    });
  }

  execute(message) {
    message.channel.send({ content: "Pong !" });
  }
};
```

:::
::: code-group-item TS ES Modules

```ts
import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { Message } from "discord.js";

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client {
      name: "ping",
      description: "Ping the bot",
      type: "MESSAGE_COMMAND",
      category: "Misc",
      cooldown: 5, // cooldown 5 seconds
    });
  }

  execute(message: Message) {
    message.channel.send({ content: "Pong !" });
  }
}
```

:::
::::

::: warning
After a restart of the bot the cooldowns are not kept
:::

## Command permissions

With sheweny you can defined permissions of bot and user.

If user missing permissions for the command, the `userMissingPermissions` will be emitted by [CommandManager](../../doc/managers/CommandsManager.md#usermissingpermissions) :

If bot missing permissions the command, the `clientMissingPermissions` will be emitted by [CommandManager](../../doc/managers/CommandsManager.md#clientmissingpermissions) :

### Slash-command

:::: code-group
::: code-group-item JS CommonJS

```js
const { Command } = require("sheweny");

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      description: "Ping the bot",
      type: "SLASH_COMMAND",
      category: "Misc",
      userPermissions: ["BanMembers", "ManageMessages"],
    });
  }

  execute(interaction) {
    interaction.reply({ content: "Pong !" });
  }
};
```

:::
::: code-group-item TS ES Modules

```ts
import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "ping",
      description: "Ping the bot",
      type: "SLASH_COMMAND",
      category: "Misc",
      userPermissions: ["BanMembers", "ManageMessages"],
    });
  }

  execute(interaction: CommandInteraction) {
    interaction.reply({ content: "Pong !" });
  }
}
```

:::
::::

### Message command

:::: code-group
::: code-group-item JS CommonJS

```js
const { Command } = require("sheweny");

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      description: "Ping the bot",
      type: "MESSAGE_COMMAND",
      category: "Misc",
      userPermissions: ["BanMembers", "ManageMessages"],
    });
  }

  execute(message) {
    message.channel.send({ content: "Pong !" });
  }
};
```

:::
::: code-group-item TS ES Modules

```ts
import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { Message } from "discord.js";

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "ping",
      description: "Ping the bot",
      type: "MESSAGE_COMMAND",
      category: "Misc",
      userPermissions: ["BanMembers", "ManageMessages"],
    });
  }

  execute(message: Message) {
    message.channel.send({ content: "Pong !" });
  }
}
```

:::
::::

## Command restrictions

You can add restrictions to prevent a command from being executed on a guild or in DMs

### Guild channel with slash-commands

:::: code-group
::: code-group-item JS CommonJS

```js
const { Command } = require("sheweny");

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client {
      name: "ping",
      description: "Ping the bot",
      type: "SLASH_COMMAND",
      category: "Misc",
      channel: "GUILD", // The command cannot be executed in DMs
    });
  }

  execute(interaction) {
    interaction.reply({ content: "Pong !" });
  }
};
```

:::
::: code-group-item TS ES Modules

```ts
import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { CommandInteraction } from "discord.js";

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client {
      name: "ping",
      description: "Ping the bot",
      type: "SLASH_COMMAND",
      category: "Misc",
      channel: "GUILD", // The command cannot be executed in DMs
    });
  }

  execute(interaction: CommandInteraction) {
    interaction.reply({ content: "Pong !" });
  }
}
```

:::
::::

### DMs channel with message-commands

:::: code-group
::: code-group-item JS CommonJS

```js
const { Command } = require("sheweny");

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client {
      name: "ping",
      description: "Ping the bot",
      type: "MESSAGE_COMMAND",
      category: "Misc",
      channel: "DM", // The command can only be executed in DMs
    });
  }
  execute(message) {
    message.channel.send({ content: "Pong !" });
  }
};
```

:::
::: code-group-item TS ES Modules

```ts
import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { Message } from "discord.js";

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client {
      name: "ping",
      description: "Ping the bot",
      type: "MESSAGE_COMMAND",
      category: "Misc",
      channel: "DM", // The command can only be executed in DMs
    });
  }
  execute(message: Message) {
    message.channel.send({ content: "Pong !" });
  }
}
```

:::
::::

## Auto-complete commands

The auto-complete commands are used to provide auto-complete suggestions for the arguments in application commands.

:::warning
For use auto-complete you must have discord.js V13.3.0 or higher and sheweny V3.0.0 or higher.
:::

:::: code-group
::: code-group-item JS CommonJS

```js
const { Command } = require("sheweny");
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = class PingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ping",
      type: "SLASH_COMMAND",
      description: "Ping the bot",
      category: "Misc",
      options: [
        {
          name: "name",
          description: "description",
          type: ApplicationCommandOptionType.String,
          autocomplete: true,
        },
        {
          name: "theme",
          description: "description",
          type: ApplicationCommandOptionType.String,
          autocomplete: true,
        },
      ],
    });
  }
  execute(interaction) {
    interaction.reply({ content: "Pong !" });
  }

  onAutocomplete(interaction) {
    const focusedOption = interaction.options.getFocused(true);

    let choices;

    if (focusedOption.name === "name") {
      choices = ["faq", "install", "collection", "promise", "debug"];
    }

    if (focusedOption.name === "theme") {
      choices = ["halloween", "christmas", "summer"];
    }

    const filtered = choices.filter((choice) =>
      choice.startsWith(focusedOption.value)
    );
    interaction.respond(
      filtered.map((choice) => ({ name: choice, value: choice }))
    );
  }
};
```

:::
::: code-group-item TS ES Modules

```ts
import { Command } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type {
  CommandInteraction,
  ApplicationCommandOptionType,
} from "discord.js";

export class PingCommand extends Command {
  constructor(client: ShewenyClient) {
    super(client, {
      name: "ping",
      description: "Ping the bot",
      type: "SLASH_COMMAND",
      category: "Misc",
      options: [
        {
          name: "name",
          description: "description",
          type: ApplicationCommandOptionType.String,
          autocomplete: true,
        },
        {
          name: "theme",
          description: "description",
          type: ApplicationCommandOptionType.String,
          autocomplete: true,
        },
      ],
    });
  }
  execute(interaction: CommandInteraction) {
    interaction.reply({ content: "Pong !" });
  }
  onAutocomplete(interaction: AutocompleteInteraction) {
    const focusedOption = interaction.options.getFocused(true);

    let choices: any;

    if (focusedOption.name === "name") {
      choices = ["faq", "install", "collection", "promise", "debug"];
    }

    if (focusedOption.name === "theme") {
      choices = ["halloween", "christmas", "summer"];
    }

    const filtered = choices!.filter((choice: any) =>
      choice.startsWith(focusedOption.value)
    );
    interaction.respond(
      filtered.map((choice: any) => ({ name: choice, value: choice }))
    );
  }
}
```

:::
::::
