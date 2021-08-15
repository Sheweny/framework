# CommandOptions

| Name               | Type                                                                                                      | Description                                                                | Default | Required |
| ------------------ | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------- | -------- |
| description        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)         | Desription of the command                                                  |         | Yes      |
| type               | [ApplicationCommandType](https://discord.js.org/#/docs/main/stable/typedef/ApplicationCommandType)        | The type of the command                                                    | none    | Yes      |
| aliases            | Array\<[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)> | Aliases of the command                                                     | []      | No       |
| options            | Array\<[CommandArgs](./CommandArgs.md)>                                                                   | Options of the command                                                     | null    | No       |
| category           | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)         | Category of the command                                                    | Bot     | No       |
| cooldown           | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)         | Cooldown of the command                                                    | 0       | No       |
| userPermissions    | Array\<[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)> | The member permissions required to execute command                         | []      | No       |
| botPermissions     | Array\<[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)> | The bot permissions required to execute command                            | []      | No       |
| subCommands        | Array\<[SubCommand](./SubCommand.md)>                                                                     | The sub commands of the command                                            | []      | No       |
| defaultPermissions | [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)       | Whether the command is enabled by default when the app is added to a guild | []      | No       |
