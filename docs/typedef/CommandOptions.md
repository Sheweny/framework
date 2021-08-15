# CommandOptions

| Name            | Type                                                                                                      | Description                                        | Default | Required |
| --------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------- | -------- |
| description     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)         | Desription of the command                          |         | Yes      |
| aliases         | Array\<[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)> | Aliases of the command                             | []      | No       |
| options         | Array\<[CommandArgs](./CommandArgs.md)>                                                                   | Options of the command                             | null    | No       |
| category        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)         | Category of the command                            | Bot     | No       |
| cooldown        | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)         | Cooldown of the command                            | 0       | No       |
| userPermissions | Array\<[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)> | The member permissions required to execute command | []      | No       |
| botPermissions  | Array\<[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)> | The bot permissions required to execute command    | []      | No       |
| subCommands     | Array\<[SubCommand](./SubCommand.md)>                                                                     | The bot permissions required to execute command    | []      | No       |
