# CommandsManager

Create an handler for bot commands. The commands can be in as many subfolders as desired and there may be other files exporting something else.

## Constructor

```js [Javascript CJS]
new CommandsManager(client, options);
```

| Name    | Type                                                                          | Description                     | Default | Optional |
| ------- | ----------------------------------------------------------------------------- | ------------------------------- | ------- | -------- |
| client  | [ShewenyClient](../client/ShewenyClient.md)                                   | The client                      | None    | No       |
| options | [CommandsManagerOptions](../typedef/ManagerOptions.md#commandsmanageroptions) | Options of the commands manager | None    | No       |

:::details Properties

- [applicationPermissions](#applicationpermissions)
- [autoRegisterApplicationCommands](#autoregisterapplicationcommands)
- [client](#client)
- [commands](#commands)
- [default](#default)
- [directory](#directory)
- [guildId](#guildid)
- [prefix](#prefix)

:::

:::details Methods

- [createCommand](#async-createcommand-command-guildid)
- [deleteAllCommands](#async-deleteallcommands-guildid)
- [deleteCommand](#async-deletecommand-command-guildid)
- [editCommand](#async-editcommand-oldcommand-newcommand-guildid)
- [getApplicationCommandData](#getapplicationcommanddata)
- [loadAll](#async-loadall)
- [registerApplicationCommands](#async-registerApplicationCommands-commands-guildid)
- [registerPermissions](#async-registerpermissions-commands-guildid)
- [unloadAll](#unloadall)

:::

:::details Events

- [clientMissingPermissions](#clientmissingpermissions)
- [cooldownLimit](#cooldownlimit)
- [invalidChannel](#invalidchannel)
- [userMissingPermissions](#usermissingpermissions)

:::

## Properties

### applicationPermissions

If the application permissions is set.

Return : [Boolean]

### autoRegisterApplicationCommands

If the application commands must be registered.

Return : [Boolean]

### client

The framework client.

Return : [ShewenyClient](../client/ShewenyClient.md)

### commands

The loaded commands.

Return : Collection<[Command](../structures/Command.md)>

### default

The default data of the commands.

Return : [CommandsManagerDefaultOption](../typedef/ManagersDefaultOptions.md#commandsmanagerdefaultoptions)

### directory

The directory of commands.

Return : [String]

### guildId

The guild id(s) for registering commands.

Return [String] or [Array]\<[String]>

### prefix

The prefix for message commands

Return : [String]

## Methods

### [async] createCommand(command, guildId)

Create single command.

Parameters :

| Name    | Type                                           | Description                   | Default | Optional |
| ------- | ---------------------------------------------- | ----------------------------- | ------- | -------- |
| command | [ApplicationCommand](../structures/Command.md) | The command                   |         |          |
| guildId | [String]                                       | The guild to register command |         | ✓        |

Return : [Promise]\<[ApplicationCommand](https://discord.js.org/#/docs/main/stable/class/ApplicationCommand)>

### [async] deleteAllCommands( guildId)

Delete all commands.

Parameters :

| Name    | Type     | Description                 | Default | Optional |
| ------- | -------- | --------------------------- | ------- | -------- |
| guildId | [String] | The guild to delete command |         | ✓        |

Return : [Promise]\<Collection<[Snowflake](https://discord.js.org/#/docs/main/stable/typedef/Snowflake), [ApplicationCommand](https://discord.js.org/#/docs/main/stable/class/ApplicationCommand)>>

### [async] deleteCommand(command, guildId)

Delete single command.

Parameters :

| Name    | Type                                                                                                           | Description                 | Default | Optional |
| ------- | -------------------------------------------------------------------------------------------------------------- | --------------------------- | ------- | -------- |
| command | [ApplicationCommandResolvable](https://discord.js.org/#/docs/main/stable/typedef/ApplicationCommandResolvable) | The command to delete       |         |          |
| guildId | [String]                                                                                                       | The guild to delete command |         | ✓        |

Return : [Promise]\<Collection<[Snowflake](https://discord.js.org/#/docs/main/stable/typedef/Snowflake), [ApplicationCommand](https://discord.js.org/#/docs/main/stable/class/ApplicationCommand)>>

### [async] editCommand(oldCommand, newCommand, guildId)

Edit single command.

Parameters :

| Name       | Type                                                                                                           | Description                 | Default | Optional |
| ---------- | -------------------------------------------------------------------------------------------------------------- | --------------------------- | ------- | -------- |
| oldCommand | [ApplicationCommandResolvable](https://discord.js.org/#/docs/main/stable/typedef/ApplicationCommandResolvable) | The command to edit         |         |          |
| newCommand | [ApplicationCommand](../structures/Command.md)                                                                 | The new command             |         |          |
| guildId    | [String]                                                                                                       | The guild to update command |         | ✓        |

Return : [Promise]\<[ApplicationCommand](https://discord.js.org/#/docs/main/stable/class/ApplicationCommand)>

### getApplicationCommandData()

Create an array with all commands data for register it.

Return : [Array]\<[ApplicationCommandData](https://discord.js.org/#/docs/main/stable/typedef/ApplicationCommandData)>| [ApplicationCommandData](https://discord.js.org/#/docs/main/stable/typedef/ApplicationCommandData) | undefined

### [async] loadAll()

Load all commands in collection.

Return : [Promise]\<Collection<[String], [ApplicationCommand](../structures/Command.md)>>

### [async] registerApplicationCommands(commands, guildId)

Register application commands.

Parameters :

| Name     | Type                                                                  | Description                    | Default                     | Optional |
| -------- | --------------------------------------------------------------------- | ------------------------------ | --------------------------- | -------- |
| commands | Collection<[String], [ApplicationCommand](../structures/Command.md))> | The commands                   | client.collections.commands | ✓        |
| guildId  | [String]                                                              | The guild to register commands |                             | ✓        |

Return : [Promise]\<Collection<[Snowflake](https://discord.js.org/#/docs/main/stable/typedef/Snowflake), [ApplicationCommand](https://discord.js.org/#/docs/main/stable/class/ApplicationCommand)>>

### [async] registerPermissions(commands, guildId)

Register application commands.

Parameters :

| Name                | Type                                                                                                            | Description                    | Default                     | Optional |
| ------------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------ | --------------------------- | -------- |
| applicationCommands | Collection<[String], [ApplicationCommand](https://discord.js.org/#/docs/main/stable/class/ApplicationCommand))> | The application commands       | client.collections.commands | ✓        |
| clientCommands      | Collection<[String], [Command](../structures/Command.md))>                                                      | The client commands            | client.collections.commands | ✓        |
| guildId             | [String] or [Array]\<[String]>                                                                                  | The guild to register commands |                             | ✓        |

Return : [Promise]\<Collection<[Snowflake](https://discord.js.org/#/docs/main/stable/typedef/Snowflake), [ApplicationCommand](https://discord.js.org/#/docs/main/stable/class/ApplicationCommand)>>

### unloadAll()

Unload all commands.

Return : void

## Events

### clientMissingPermissions

Emitted when client missing permissions.

Parameters :

| Name        | Type                                                                                                                                                                                     | Description                    |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| interaction | [CommandInteraction](https://discord.js.org/#/docs/main/stable/class/CommandInteraction) or [ContextMenuInteraction](https://discord.js.org/#/docs/main/stable/class/CommandInteraction) | The interaction                |
| missing     | [Array]<[Permission](https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS)>                                                                                      | The name of missing permission |
| command     | [Command](../structures/Command.md)                                                                                                                                                      | The command                    |

### cooldownLimit

Emitted when user hit the cooldown limit.

Parameters :

| Name        | Type                                                                                                                                                                                     | Description               |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| interaction | [CommandInteraction](https://discord.js.org/#/docs/main/stable/class/CommandInteraction) or [ContextMenuInteraction](https://discord.js.org/#/docs/main/stable/class/CommandInteraction) | The interaction           |
| time        | [Number]                                                                                                                                                                                 | The time before run again |

### invalidChannel

Emitted when user try to use command in invalid channel.

Parameters :

| Name        | Type                                                                                                                                                                                     | Description     |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| command     | [Command](../structures/Command.md)                                                                                                                                                      | The command     |
| interaction | [CommandInteraction](https://discord.js.org/#/docs/main/stable/class/CommandInteraction) or [ContextMenuInteraction](https://discord.js.org/#/docs/main/stable/class/CommandInteraction) | The interaction |

### userMissingPermissions

Emitted when user missing permissions.

Parameters :

| Name        | Type                                                                                                                                                                                     | Description                    |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| interaction | [CommandInteraction](https://discord.js.org/#/docs/main/stable/class/CommandInteraction) or [ContextMenuInteraction](https://discord.js.org/#/docs/main/stable/class/CommandInteraction) | The interaction                |
| missing     | [Array]<[Permission](https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS)> or BOT_ADMIN                                                                         | The name of missing permission |
| command     | [Command](../structures/Command.md)                                                                                                                                                      | The command                    |
