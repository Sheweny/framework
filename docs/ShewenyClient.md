# Sheweny client

The Sheweny framework client.

Parameters :

| Name    | Type                                                      | Description                | Default | Required |
| ------- | --------------------------------------------------------- | -------------------------- | ------- | -------- |
| options | [ShewenyClientOptions](./typedef/ShewenyClientOptions.md) | The options for the client | None    | Yes      |

## Properties

### ShewenyClient.handlers

The handlers options or undefined if no handler provided

Return : [HandlersOptions](./typedef/HandlersOptions.md).

### ShewenyClient.commands

A collection of commands or undefined if no command handler provided

Return : Collection\<[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Command](./Command.md)>.

### ShewenyClient.commandsType

The type of the commands (MESSAGE_COMMANDS or SLASH_COMMANDS)

Return : [CommandTypeResolvable](./typedef/CommandTypeResolvable.md) .

### ShewenyClient.events

A collection of commands or undefined if no command handler provided

Return : Collection\<[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Event](./Event.md)>.
