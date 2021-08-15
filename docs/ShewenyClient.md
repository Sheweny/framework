# Sheweny client

The Sheweny framework client.

Parameters :

| Name    | Type                                                      | Description                | Default | Required |
| ------- | --------------------------------------------------------- | -------------------------- | ------- | -------- |
| options | [ShewenyClientOptions](./typedef/ShewenyClientOptions.md) | The options for the client | None    | Yes      |

## Properties

### ShewenyClient.handlers

The handlers of the client.

Return : [ClientHandlers](./typedef/ClientHandlers.md).

### ShewenyClient.commands

A collection of commands or undefined if no command handler provided

Return : Collection\<[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Command](./Command.md)>.

### ShewenyClient.commandsType

The type of the commands (MESSAGE_COMMANDS or SLASH_COMMANDS)

Return : [CommandTypeResolvable](./typedef/CommandTypeResolvable.md) .

### ShewenyClient.events

A collection of commands or undefined if no command handler provided

Return : Collection\<[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Event](./Event.md)>.

# Events

## Events permissions

### ShewenyClient#userMissingPermissions

Emitted when an user missing permission for a command.

Parameters :

- interaction or message (if bot use slash-commands or not) (type : [Interaction](https://discord.js.org/#/docs/main/stable/class/Interaction) or [Message](https://discord.js.org/#/docs/main/stable/class/Message))
- missing (type : [Array\<[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>)

### ShewenyClient#botMissingPermissions

Emitted when bot missing permission for a command.

Parameters :

- interaction or message (if bot use slash-commands or not) (type : [Interaction](https://discord.js.org/#/docs/main/stable/class/Interaction) or [Message](https://discord.js.org/#/docs/main/stable/class/Message))
- missing (type : [Array\<[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>)

## Events cooldowns

### ShewenyClient#cooldownLimite

Emitted when command cooldown limit is reached.

Parameters :

- interaction or message (if bot use slash-commands or not) (type : [Interaction](https://discord.js.org/#/docs/main/stable/class/Interaction) or [Message](https://discord.js.org/#/docs/main/stable/class/Message))

## Events interactions

### ShewenyClient#interactionButtonCreate

Emitted when an interaction button is created.

Parameters :

- interaction (type : [ButtonInteraction](https://discord.js.org/#/docs/main/stable/class/ButtonInteraction))

### ShewenyClient#interactionCommmandCreate

Emitted when an slash-command is created.

Parameters :

- interaction (type : [CommandInteraction](https://discord.js.org/#/docs/main/stable/class/CommandInteraction))

### ShewenyClient#interactionContextMenuCreate

Emitted when an interaction context menu is created.

Parameters :

- interaction (type : [ContextMenuInteraction](https://discord.js.org/#/docs/main/stable/class/ContextMenuInteraction))

### ShewenyClient#interactionSelectMenuItemCreate

Emitted when an select menu interaction is created.

Parameters :

- interaction (type : [SelectMenuInteraction](https://discord.js.org/#/docs/main/stable/class/SelectMenuInteraction))

### ShewenyClient#interactionMessageComponentCreate

Emitted when an message component interaction is created.

Parameters :

- interaction (type : [MessageComponentInteraction](https://discord.js.org/#/docs/main/stable/class/MessageComponentInteraction))
