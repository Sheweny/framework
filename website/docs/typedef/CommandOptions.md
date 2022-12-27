# CommandOptions

| Name                     | Type                                                                                                                                                                                                                                                                                 | Description                                                                | Default | Optional |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------- | ------- | -------- |
| adminOnly                | [Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)                                                                                                                                                                                        | If the command is for bot admins only                                      | 0       | ✓        |
| args                     | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[CommandMessageArgument](#commandmessageargument)>                                                                                                                                         | The options for command (message-commands only)                            | None    | ✓        |
| category                 | [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)                                                                                                                                                                                          | The category of the command                                                | None    | ✓        |
| channel                  | [CommandOptionOnly](#commandoptiononly)                                                                                                                                                                                                                                              | Whre the command can be executed                                           | None    | ✓        |
| clientPermissions        | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>                                                                                               | The bot permissions required                                               | []      | ✓        |
| cooldown                 | [Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)                                                                                                                                                                                          | The cooldown time in seconde                                               | 0       | ✓        |
| defaultPermission        | [Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)                                                                                                                                                                                        | Whether the command is enabled by default when the app is added to a guild |         |          |
| description              | [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)                                                                                                                                                                                          | The description of the command                                             | None    | ✓        |
| descriptionLocalizations | [[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)\<[Locale](https://discord.js.org/#/docs/discord.js/stable/typedef/Locale), [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>     | The description of the command in an other languages                       | None    | ✓        |
| examples                 | [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) or[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)> | The examples of the command                                                | None    | ✓        |
| name                     | [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)                                                                                                                                                                                          | The name of the command                                                    | None    |          |
| nameLocalizations        | [[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)\<[Locale](https://discord.js.org/#/docs/discord.js/stable/typedef/Locale), [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>     | The name of the command in an other languages                              | None    | ✓        |

| options | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[ApplicationCommandOptionData](https://discord.js.org/#/docs/main/stable/typedef/ApplicationCommandOptionData)> | The options for command (slash-commands only) | None | ✓ |
| type | MESSAGE_COMMAND or SLASH_COMMAND or CONTEXT_MENU_USER or CONTEXT_MENU_MESSAGE | The type of the command | None | ✓ |
| usage | [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) or[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)> | The usage of the command | None | ✓ |
| userPermissions | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)> | The user permissions required | [] | ✓ |

## CommandOptionOnly

- GUILD

- DM

- GLOBAL

Type : [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)

## CommandMessageArgument

| Name    | Type                                                                                        | Description                   | Default | Optional |
| ------- | ------------------------------------------------------------------------------------------- | ----------------------------- | ------- | -------- |
| name    | [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | The name of the command       |         |          |
| default | \*                                                                                          | The default value of argument |         | ✓        |
| type    | [CommandMessageArgsType](#commandmessageargtype)                                            | The type of the command       | STRING  | ✓        |

## CommandMessageArgType

- `STRING` : String argument

- `NUMBER` : Number argument

- `BOOLEAN` : Boolean argument

- `REST` : The string with text (without previous arguments)

- `COMMAND` : A loaded command

- `GUILD` : A guild

- `CHANNEL` : A guild channel

- `MEMBER` : A guild member

- `GUILD_EMOJI` : A guild emoji

- `ROLE` : A guild role

- `USER` : A discord user

Type : [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)
