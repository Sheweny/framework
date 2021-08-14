# Sub-Command

| Name        | Type                                                                                                               | Description                           | Default | Required |
| ----------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------- | ------- | -------- |
| name        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)                  | The name of the sub-command           | None    | Yes      |
| description | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)                  | The description of the sub-command    | None    | Yes      |
| type        | [ApplicationCommandOptionType](https://discord.js.org/#/docs/main/stable/typedef/ApplicationCommandOptionType)     | The type of the sub-command           | None    | No       |
| required    | [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)                | If the sub-command is required or not | None    | No       |
| choices     | [ApplicationCommandOptionChoice](https://discord.js.org/#/docs/main/stable/typedef/ApplicationCommandOptionChoice) | If the sub-command is required or not | None    | No       |
| options     | [CommandArg](./CommandArg.md)                                                                                      | Additional options                    | None    | No       |
