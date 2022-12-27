# ShewenyClient

The main hub for interacting with the Discord API, and the starting point for any bot.

## Constructor

```js
new ShewenyClient(options);
```

| Name          | Type                                                                             | Description                                                                 | Optional |
| ------------- | -------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | -------- |
| options       | [ShewenyClientOptions](../typedef/ShewenyClientOptions.md)                       | The options for the client                                                  | No       |
| clientOptions | [ClientOptions](https://discord.js.org/#/docs/main/stable/typedef/ClientOptions) | The options for the discord.js client (use first parameter if not provided) | ✓        |

:::details Properties

- [admins](#admins)
- [collections](#collections)
- [connected](#connected)
- [joinThreadsOnCreate](#jointhreadsoncreate)
- [managers](#managers)
- [mode](#mode)
- [util](#util)

:::

:::details Methods

- [awaitReady](#awaitready)

:::

:::details Events

- [interactionButtonCreate](#interactionbuttoncreate)
- [interactionCommandCreate](#interactioncommandcreate)
- [interactionContextMenuCreate](#interactioncontextmenucreate)
- [interactionMessageComponentCreate](#interactionmessagecomponentcreate)
- [interactionSelectMenuCreate](#interactionselectmenucreate)

:::

## Properties

### admins

The admins of the bot (no affected by cooldown and have adminOnly permission).

Return : [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>

### cooldowns

The cooldowns of the bot.

Return : [ShewenyClientCooldowns](../typedef/ShewenyClientCooldowns.md)

### collections

The collections of commands, events, buttons, select-menus, inhibitors.

Return : [ShewenyClientCollections](../typedef/ShewenyClientCollections.md)

### connected

Indicate when the client is connected to the Discord API.

Return : [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

### joinThreadsOnCreate

If the bot should join threads on create.

Return : [Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

### managers

The managers of the client.

Return : [ShewenyClientManagers](../typedef/ShewenyClientManagers.md).

### mode

The mode for run application (development or production).

Return : [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

### util

Useful functions for your bot.

Return : [ClientUtil](../client/ClientUtil.md).

## Methods

### awaitReady

Wait for the client to be ready.

Return [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<true>

## Events

### interactionButtonCreate

Emitted when an interaction button is created.

Parameters :

- interaction (type : [ButtonInteraction](https://discord.js.org/#/docs/main/stable/class/ButtonInteraction))

### interactionCommmandCreate

Emitted when an Slash Command or Context Menu is created.

Parameters :

- interaction (type : [CommandInteraction](https://discord.js.org/#/docs/main/stable/class/CommandInteraction) or [ContextMenuInteraction](https://discord.js.org/#/docs/main/stable/class/ContextMenuInteraction)))

### interactionContextMenuCreate

Emitted when an interaction Context Menu is created.

Parameters :

- interaction (type : [ContextMenuInteraction](https://discord.js.org/#/docs/main/stable/class/ContextMenuInteraction))

### interactionMessageComponentCreate

Emitted when an Message Component interaction is created.

Parameters :

- interaction (type : [MessageComponentInteraction](https://discord.js.org/#/docs/main/stable/class/MessageComponentInteraction))

### interactionSelectMenuCreate

Emitted when an Select Menu interaction is created.

Parameters :

- interaction (type : [SelectMenuInteraction](https://discord.js.org/#/docs/main/stable/class/SelectMenuInteraction))
