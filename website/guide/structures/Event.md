# Event listener

With sheweny each Event must be a class which extends from the [Event](../../doc/structures/Event.md) class.
Please see [events manager](../managers/events) for setup the manager.

## Import Event

Import the [Event](../../doc/structures/Event.md) class :

:::: code-group
::: code-group-item CommonJS

```js
const { Event } = require("sheweny");
```

:::
::: code-group-item ESM

```js
import { Event } from "sheweny";
```

:::
::::

## Create the event listener

### guildMemberAdd Event

:::: code-group
::: code-group-item JS CommonJS

```js
const { Event } = require("sheweny");

module.exports = class GuildMemberAdd extends Event {
  constructor(client) {
    super(client, "guildMemberAdd", {
      description: "Member join the guild",
      once: false,
    });
  }

  execute(member) {
    console.log(member);
  }
};
```

:::
::: code-group-item TS ES Modules

```ts
import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { GuildMember } from "discord.js";

export class GuildMemberAdd extends Event {
  constructor(client: ShewenyClient) {
    super(client, "guildMemberAdd", {
      description: "Member join the guild",
      once: false,
    });
  }

  execute(member: GuildMember) {
    console.log(member);
  }
}
```

:::
::::

### Message create event

:::: code-group
::: code-group-item JS CommonJS

```js
const { Event } = require("sheweny");

module.exports = class Message extends Event {
  constructor(client) {
    super(client, "messageCreate", {
      description: "Message has been created",
      once: false,
    });
  }

  execute(message) {
    console.log(message);
  }
};
```

:::
::: code-group-item TS ES Modules

```ts
import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { Message } from "discord.js";

export class GuildMemberAdd extends Event {
  constructor(client: ShewenyClient) {
    super(client, "messageCreate", {
      description: "Message has been created",
      once: false,
    });
  }

  execute(message: Message) {
    console.log(message);
  }
}
```

:::
::::

## Once events

Some events can have the once property so that they can fire only once.

:::: code-group
::: code-group-item JS CommonJS

```js
const { Event } = require("sheweny");

module.exports = class Ready extends Event {
  constructor(client) {
    super(client, "ready", {
      description: "Client is logged in",
      once: true,
    });
  }

  execute(client) {
    console.log("The client is logged in");
  }
};
```

:::
::: code-group-item TS ES Modules

```ts
import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { Client } from "discord.js";

export class Ready extends Event {
  constructor(client: ShewenyClient) {
    super(client, "ready", {
      description: "Client is logged in",
      once: true,
    });
  }

  execute(client: Client) {
    console.log("The client is logged in");
  }
}
```

:::
::::

## Custom emitter

You can choose an other emitter than the client.

We can specify an emitter of type [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter) of Node.js.

:::: code-group
::: code-group-item JS CommonJS

```js
const { Event } = require("sheweny");

module.exports = class Ready extends Event {
  constructor(client) {
    super(client, "uncaughtException", {
      emitter: process,
    });
  }
  execute(ctx) {
    console.log("Woops... An uncaughtException error occured :");
    console.log(ctx);
  }
};
```

:::
::: code-group-item TS ES Modules

```ts
import { Event } from "sheweny";
import type { ShewenyClient } from "sheweny";

export default class Ready extends Event {
  constructor(client: ShewenyClient) {
    super(client, "uncaughtException", {
      emitter: process,
    });
  }
  execute(ctx: any) {
    console.log("Woops... An uncaughtException error occured :");
    console.log(ctx);
  }
}
```

:::
::::
