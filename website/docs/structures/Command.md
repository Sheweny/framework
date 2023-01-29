# Command

Represents an application command.

## Constructor

```js [Javascript CJS]
new Command(client, options);
```

| Name    | Type                                           | Description                | Default | Optional |
| ------- | ---------------------------------------------- | -------------------------- | ------- | -------- |
| client  | [ShewenyClient](../client/ShewenyClient.md)    | The client.                | None    |          |
| options | [CommandOptions](../typedef/CommandOptions.md) | The options of the command | None    |          |

:::details Properties

- [adminOnly](#adminonly)
- [aliases](#aliases)
- [args](#args)
- [category](#category)
- [channel](#channel)
- [clientPermissions](#clientpermissions)
- [client](#client)
- [cooldown](#cooldown)
- [cooldowns](#cooldowns)
- [defaultPermission](#defaultpermission)
- [description](#description)
- [descriptionLocalizations](#descriptionlocalizations)
- [enabled](#enabled)
- [examples](#examples)
- [manager](#manager)
- [name](#name)
- [nameLocalizations](#namelocalizations)
- [options](#options)
- [path](#path)
- [type](#type)
- [usage](#usage)
- [userPermissions](#userpermissions)

:::

:::details Methods

- [before](#before)
- [execute](#abstract-execute)
- [onAutocomplete](#onautocomplete)
- [register](#async-register)
- [reload](#async-reload)
- [unregister](#unregister)

:::

## Properties

### adminOnly

If the command is only for admins or not.

Return : [Boolean]

### aliases

The args of the command.

Return : [Array]\<[String]>

### args

The args of the command.

Return : [Array]\<[CommandOptions](../typedef/CommandOptions.md#commandmessageargument)>

### category

The category of the command.

Return : [String]

### channel

The channel of the command.

Return : [CommandOptionOnly](../typedef/CommandOptions#commandoptiononly)

### client

The framework client.

Return : [ShewenyClient](../client/ShewenyClient.md)

### clientPermissions

The name of the command.

Return : [Array]\<[String]>

### cooldown

The cooldown of the command.

Return : [Number]

### cooldowns

Actives cooldowns for the command.

Return : Collection<[String], Collection<[String], [Number]>>;

### defaultPermission

If the command can be used by default or not.

Return : [Boolean]

### description

The description of the command.

Return : [String]

### descriptionLocalizations

The description of the command in other languages.

Return : [Object]\<[Locale](https://discord.js.org/#/docs/discord.js/stable/typedef/Locale), [String]>

### enabled

If this structure is enabled or not.

### examples

The examples of the command.

Return : [String] or [Array]\<[String]>

### manager

The manager of this structure.

Return : [CommandsManager](../managers/CommandsManager.md)

### name

The name of the command.

Return : [String]

### nameLocalizations

The name of the command in other languages.

Return : [Object]\<[Locale](https://discord.js.org/#/docs/discord.js/stable/typedef/Locale), [String]>

### options

The options of the command.

Return : [Array]\<[ApplicationCommandOptionData](https://discord.js.org/#/docs/main/stable/typedef/ApplicationCommandOptionData)>

### path

The path of the file.

Return : [String]

### type

The type of the command.

Return : [String]

### usage

The usage of the command.

Return : [String] or [Array]\<[String]>

### userPermissions

The userPermissions of the command.

Return : [Array]\<[String]>

## Methods

### before()

Executed before command checks.

Parameters :

| Name        | Type                                                                                                                                                                                     | Description     |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| interaction | [CommandInteraction](https://discord.js.org/#/docs/main/stable/class/CommandInteraction) or [ContextMenuInteraction](https://discord.js.org/#/docs/main/stable/class/CommandInteraction) | The interaction |

Return : [Promise]\<any> | any

### [abstract] execute()

The execution of command.

Parameters :

| Name        | Type                                                                                                                                                                                                                                                           | Description                           |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| interaction | [CommandInteraction](https://discord.js.org/#/docs/main/stable/class/CommandInteraction) or [ContextMenuInteraction](https://discord.js.org/#/docs/main/stable/class/CommandInteraction) or [Message](https://discord.js.org/#/docs/main/stable/class/Message) | The interaction                       |
| arguments   | [Object]                                                                                                                                                                                                                                                       | The arguments (only message-commands) |

Return : [Promise]\<any> | any

### onAutocomplete()

The execution of auto-complete (only slash-commands).

Parameters :

| Name        | Type                                                                                          | Description                   |
| ----------- | --------------------------------------------------------------------------------------------- | ----------------------------- |
| interaction | [CommandInteraction](https://discord.js.org/#/docs/main/stable/class/AutocompleteInteraction) | The auto-complete interaction |

Return : [Promise]\<any> | any

### [async] register()

Register the command.

Return : [Promise]\<[ApplicationCommand](./Command.md)> | [Null]

### [async] reload()

Reload a command of bot.

Return : [Promise]\<[ApplicationCommand](./Command.md)> | [Null]

### unregister()

Unregister a command from the bot.

Return : [Boolean]
