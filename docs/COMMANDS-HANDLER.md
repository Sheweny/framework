# Commands Handler

Create an handler for bot commands. The commands can be in as many subfolders as desired.

| Name      | Type                                                                                              | Description               | Default | Required |
| --------- | ------------------------------------------------------------------------------------------------- | ------------------------- | ------- | -------- |
| client    | [ShewenyClientOptions](./SHEWENY-CLIENT.md)                                                       | The client                | None    | Yes      |
| directory | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The directory of commands | None    | Yes      |

## Methods

### CommandsHandler.client

The client of framework.

Return : [ShewenyClientOptions](./SHEWENY-CLIENT.md)

### CommandsHandler.directory

The directory of commands.

Return : String

### CommandsHandler#registerAll()

Load all commands in directory of commands.

Return promise Collection\<string, [Command](./COMMAND.md)>
