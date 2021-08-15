# Command

Represents a command.

| Name    | Type                                                                                              | Description                | Default | Required |
| ------- | ------------------------------------------------------------------------------------------------- | -------------------------- | ------- | -------- |
| Client  | [ShewenyClient](./ShewenyClient.md)                                                               | The client.                | None    | Yes      |
| name    | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The name of the command.   | None    | Yes      |
| options | [CommandOptions](./typedef/CommandOptions.md)                                                     | The options of the command | None    | Yes      |

## Methods

### unregister()

Unregister a command from the bot.

Return true

### [async] reload()

Reload a command of bot.

Return Promise\<Command>|null

### [async] register()

Register the command.

Return Promise\<Command>|null
