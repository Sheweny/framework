# ManagersDefaultOptions

## CommandsManagerDefaultOptions

| Name              | Type                                                                                                                                                                                                                                                                                   | Description                                   |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| adminOnly         | [Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)                                                                                                                                                                                          | If only the bot admins can use the command    |
| category          | [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)                                                                                                                                                                                            | The category of the command                   |
| channel           | "GUILD" or "DM"                                                                                                                                                                                                                                                                        | The channel where the command can be executed |
| clientPermissions | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)<[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)> or [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | The permissions of the client                 |
| cooldown          | [Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)                                                                                                                                                                                            | The cooldown of the command                   |
| description       | [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)                                                                                                                                                                                            | The description of the command                |
| examples          | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)<[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)> or [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | The examples of command                       |
| type              | "MESSAGE_COMMAND" or "SLASH_COMMAND" or "CONTEXT_MENU_USER" or "CONTEXT_MENU_MESSAGE"                                                                                                                                                                                                  | The type of the command                       |
| usage             | [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)                                                                                                                                                                                            | The usage of the command                      |
| userPermissions   | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)<[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)> or [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | The permissions required for users            |

## EventsManagerDefaultOptions

| Name    | Type                                                                                          | Description                         |
| ------- | --------------------------------------------------------------------------------------------- | ----------------------------------- |
| emitter | [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)                         | The emitter of the event            |
| once    | [Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | If the event will emitted just once |

## InhibitorsManagerDefaultOptions

| Name     | Type                                                                                                                                                                          | Description                    |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| priority | [Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)                                                                                   | The priority of the inhibitor  |
| type     | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)\<"COMMAND_MESSAGE" or "APPLICATION_COMMAND" or "BUTTON" or "SELECT_MENU" or "ALL"> | If the framework will load all |
