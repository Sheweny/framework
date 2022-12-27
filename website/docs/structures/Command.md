# Command

Represents an application command.

## Constructor

```js
new Command(client, options);
```

| Name    | Type                                           | Description                | Default | Optional |
| ------- | ---------------------------------------------- | -------------------------- | ------- | -------- |
| client  | [ShewenyClient](../classes/ShewenyClient.md)   | The client.                | None    |          |
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

Return : [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

### aliases

The args of the command.

Return : [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>

### args

The args of the command.

Return : [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<[CommandOptions](../typedef/CommandOptions.md#commandmessageargument)>

### category

The category of the command.

Return : [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### channel

The channel of the command.

Return : [CommandOptionOnly](../typedef/CommandOptions#commandoptiononly)

### client

The framework client.

Return : [ShewenyClient](../client/ShewenyClient.md)

### clientPermissions

The name of the command.

Return : [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>

### cooldown

The cooldown of the command.

Return : [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

### cooldowns

Actives cooldowns for the command.

Return : Collection<[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), Collection<[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>>;

### defaultPermission

If the command can be used by default or not.

Return : [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

### description

The description of the command.

Return : [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### descriptionLocalizations

The description of the command in other languages.

Return : [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)\<[Locale](https://discord.js.org/#/docs/discord.js/stable/typedef/Locale), [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>

### enabled

If this structure is enabled or not.

### examples

The examples of the command.

Return : [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) or [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>

### manager

The manager of this structure.

Return : [CommandsManager](../managers/CommandsManager.md)

### name

The name of the command.

Return : [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### nameLocalizations

The name of the command in other languages.

Return : [Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)\<[Locale](https://discord.js.org/#/docs/discord.js/stable/typedef/Locale), [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>

### options

The options of the command.

Return : [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<[ApplicationCommandOptionData](https://discord.js.org/#/docs/main/stable/typedef/ApplicationCommandOptionData)>

### path

The path of the file.

Return : [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### type

The type of the command.

Return : [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### usage

The usage of the command.

Return : [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) or [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)\<[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>

### userPermissions

The userPermissions of the command.

Return : [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>

## Methods

### before()

Executed before command checks.

Parameters :

| Name        | Type                                                                                                                                                                                     | Description     |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| interaction | [CommandInteraction](https://discord.js.org/#/docs/main/stable/class/CommandInteraction) or [ContextMenuInteraction](https://discord.js.org/#/docs/main/stable/class/CommandInteraction) | The interaction |

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<any> | any

### [abstract] execute()

The execution of command.

Parameters :

| Name        | Type                                                                                                                                                                                                                                                           | Description                           |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| interaction | [CommandInteraction](https://discord.js.org/#/docs/main/stable/class/CommandInteraction) or [ContextMenuInteraction](https://discord.js.org/#/docs/main/stable/class/CommandInteraction) or [Message](https://discord.js.org/#/docs/main/stable/class/Message) | The interaction                       |
| arguments   | [Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)                                                                                                                                                                    | The arguments (only message-commands) |

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<any> | any

### onAutocomplete()

The execution of auto-complete (only slash-commands).

Parameters :

| Name        | Type                                                                                          | Description                   |
| ----------- | --------------------------------------------------------------------------------------------- | ----------------------------- |
| interaction | [CommandInteraction](https://discord.js.org/#/docs/main/stable/class/AutocompleteInteraction) | The auto-complete interaction |

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<any> | any

### [async] register()

Register the command.

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[ApplicationCommand](./Command.md)> | [null](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Null)

### [async] reload()

Reload a command of bot.

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[ApplicationCommand](./Command.md)> | [null](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Null)

### unregister()

Unregister a command from the bot.

Return : [Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
