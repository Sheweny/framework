# Commands Handler

Create an handler for bot commands. The commands can be in as many subfolders as desired.

| Name    | Type                                                          | Description               | Default | Required |
| ------- | ------------------------------------------------------------- | ------------------------- | ------- | -------- |
| client  | [ShewenyClientOptions](./ShewenyClient.md)                    | The client                | None    | Yes      |
| options | [CommandsHandlerOptions](./typedef/CommandsHandlerOptions.md) | The directory of commands | None    | Yes      |

## Properties

### CommandsHandler.client

The client of framework.

Return : [ShewenyClientOptions](./ShewenyClient.md)

### CommandsHandler.directory

The directory of commands.

Return : String

## Methods

### CommandsHandler#registerAll()

Load all commands in directory of commands.

Return promise Collection\<string, [Command](./Command.md)>
