# Command Args

| Name        | Type                                                                                                               | Description                        | Default | Required |
| ----------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------- | ------- | -------- |
| name        | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)                  | The name of the argument           | None    | Yes      |
| description | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)                  | The description of the argument    | None    | Yes      |
| type        | [ApplicationCommandOptionType](https://discord.js.org/#/docs/main/stable/typedef/ApplicationCommandOptionType)     | The type of the argument           | None    | No       |
| required    | [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)                | If the argument is required or not | None    | No       |
| choices     | [ApplicationCommandOptionChoice](https://discord.js.org/#/docs/main/stable/typedef/ApplicationCommandOptionChoice) | If the argument is required or not | None    | No       |
| options     | [CommandArg](.)                                                                                                    | Additional options                 | None    | No       |
