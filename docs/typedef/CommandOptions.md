# CommandOptions

| Name            | Type                                                                                              | Description                                        | Default | Required |
| --------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ------- | -------- |
| description     | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | Desription of the command                          |         | Yes      |
| aliases         | Array\<string>                                                                                    | Aliases of the command                             | []      | No       |
| options         | Array\<[CommandArgs](./CommandArgs.md)>                                                           | Options of the command                             | null    | No       |
| category        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | Category of the command                            | Bot     | No       |
| cooldown        | [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | Cooldown of the command                            | 0       | No       |
| userPermissions | Array\<string>                                                                                    | The member permissions required to execute command | []      | No       |
| botPermissions  | Array\<string>                                                                                    | The bot permissions required to execute command    | []      | No       |
| subCommands     | Array\<[SubCommand]>                                                                              | The bot permissions required to execute command    | []      | No       |
