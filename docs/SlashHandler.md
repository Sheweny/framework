# Events Handler

Create an handler for bot events. The events can be in as many subfolders as desired.

| Name   | Type                                | Description | Default | Required |
| ------ | ----------------------------------- | ----------- | ------- | -------- |
| client | [ShewenyClient](./ShewenyClient.md) | The client  | None    | Yes      |

## Properties

### EventsHandler.client

The client of framework.

Return : [ShewenyClient](./ShewenyClient.md)

### EventsHandler.commands

The commands of bot.

Return : String

## Methods

### EventsHandler#getData()

Create an array with all commands data for register it.

Return promise Collection\<string, [Event](./Event.md)>

### [async] EventsHandler#registerCommands(commands, guildId)

Register commands.

Parameters :

- commands : [Optional] The commands to register (type Collection\<[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Command](./Command.md))>. Default : All commands loaded in loader.
- guildId : [Optional] The guild id to register commands.

Return Promise<Collection<Snowflake, ApplicationCommand>>;

### [async] EventsHandler#createCommand(command, guildId)

Create single commands.

Parameters :

- command : The commands to register (type [Command](./Command.md)).
- guildId : [Optional] The guild id to register command.

Return Promise<Collection<Snowflake, ApplicationCommand>>;

### [async] EventsHandler#editCommand(oldCommand, newCommand, guildId)

Create single commands.

Parameters :

- oldCommand : The old command (type [ApplicationCommandResolvable](https://discord.js.org/#/docs/main/stable/typedef/ApplicationCommandResolvable)).
- newCommand : The new command (type [Command](./Command.md)).
- guildId : [Optional] The guild id to register command.

Return Promise<Collection<Snowflake, ApplicationCommand>>;

### [async] EventsHandler#deleteCommand(command, guildId)

Create single commands.

Parameters :

- command : The old command (type [ApplicationCommandResolvable](https://discord.js.org/#/docs/main/stable/typedef/ApplicationCommandResolvable)).
- guildId : [Optional] The guild id to register command.

Return Promise<Collection<Snowflake, ApplicationCommand>>;

### [async] EventsHandler#deleteAllCommands( guildId)

Create single commands.

Parameters :

- guildId : [Optional] The guild id to delete commands.

Return Promise<Collection<Snowflake, ApplicationCommand>>;
