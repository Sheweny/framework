# CommandOptions

| Name                     | Type                                                                                           | Description                                                                | Default | Optional |
| ------------------------ | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------- | -------- |
| adminOnly                | [Boolean]                                                                                      | If the command is for bot admins only                                      | 0       | ✓        |
| args                     | [Array]<[CommandMessageArgument](#commandmessageargument)>                                     | The options for command (message-commands only)                            | None    | ✓        |
| category                 | [String]                                                                                       | The category of the command                                                | None    | ✓        |
| channel                  | [CommandOptionOnly](#commandoptiononly)                                                        | Whre the command can be executed                                           | None    | ✓        |
| clientPermissions        | [Array]<[String]>                                                                              | The bot permissions required                                               | []      | ✓        |
| cooldown                 | [Number]                                                                                       | The cooldown time in seconde                                               | 0       | ✓        |
| defaultPermission        | [Boolean]                                                                                      | Whether the command is enabled by default when the app is added to a guild |         |          |
| description              | [String]                                                                                       | The description of the command                                             | None    | ✓        |
| descriptionLocalizations | [[Object]\<[Locale](https://discord.js.org/#/docs/discord.js/stable/typedef/Locale), [String]> | The description of the command in an other languages                       | None    | ✓        |
| examples                 | [String] or[Array]<[String]>                                                                   | The examples of the command                                                | None    | ✓        |
| name                     | [String]                                                                                       | The name of the command                                                    | None    |          |
| nameLocalizations        | [[Object]\<[Locale](https://discord.js.org/#/docs/discord.js/stable/typedef/Locale), [String]> | The name of the command in an other languages                              | None    | ✓        |
| options | [Array]<[ApplicationCommandOptionData](https://discord.js.org/#/docs/main/stable/typedef/ApplicationCommandOptionData)> | The options for command (slash-commands only) | None | ✓ |
| type | MESSAGE_COMMAND or SLASH_COMMAND or CONTEXT_MENU_USER or CONTEXT_MENU_MESSAGE | The type of the command | None | ✓ |
| usage | [String] or[Array]<[String]> | The usage of the command | None | ✓ |
| userPermissions | [Array]<[String]> | The user permissions required | [] | ✓ |

## CommandOptionOnly

- GUILD

- DM

- GLOBAL

Type : [String]

## CommandMessageArgument

| Name    | Type                                             | Description                   | Default | Optional |
| ------- | ------------------------------------------------ | ----------------------------- | ------- | -------- |
| name    | [String]                                         | The name of the command       |         |          |
| default | \*                                               | The default value of argument |         | ✓        |
| type    | [CommandMessageArgsType](#commandmessageargtype) | The type of the command       | STRING  | ✓        |

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

Type : [String]
