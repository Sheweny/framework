# ManagerOptions

## BaseManagerOptions

| Name      | Type                                                                                          | Description                        |
| --------- | --------------------------------------------------------------------------------------------- | ---------------------------------- |
| directory | [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)   | The main directory of the commands |
| loadAll   | [Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | If the framework will load all     |
| default   | [Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)   | The default cooldown               |

## ButtonsManagerOptions

| Name     | Type                                                                                        | Description          |
| -------- | ------------------------------------------------------------------------------------------- | -------------------- |
| cooldown | [Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | The default cooldown |

## CommandsManagerOptions

| Name                            | Type                                                                                                                                                                                                                                                                                    | Description                                                                             |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| applicationPermissions          | [Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)                                                                                                                                                                                           | If the permissions for app commands must be required (only available if guildId is set) |
| autoRegisterApplicationCommands | [Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)                                                                                                                                                                                           | If the application commands must be registered                                          |
| default                         | [CommandsManagerDefaultOption](./ManagersDefaultOptions.md#commandsmanagerdefaultoptions)                                                                                                                                                                                               | The main directory of the commands                                                      |
| directory                       | [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)                                                                                                                                                                                             | The main directory of the commands                                                      |
| guildId                         | [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) or [Array](hthttps://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)<[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)> | The guild to register commands                                                          |
| loadAll                         | [Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)                                                                                                                                                                                           | If the framework will load all                                                          |
| prefix                          | [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)                                                                                                                                                                                             | The prefix for the bot                                                                  |

## EventsManagerOptions

| Name      | Type                                                                                          | Description                                    |
| --------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| default   | [EventsManagerDefaultOption](./ManagersDefaultOptions.md#eventsmanagerdefaultoptions)         | If the application commands must be registered |
| directory | [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)   | The main directory of the commands             |
| loadAll   | [Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | If the framework will load all                 |

## InhibitorsManagerOptions

| Name      | Type                                                                                          | Description                                    |
| --------- | --------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| default   | [InhibitorsManagerDefaultOption](./ManagersDefaultOptions.md#inhibitorsmanagerdefaultoptions) | If the application commands must be registered |
| directory | [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)   | The main directory of the commands             |
| loadAll   | [Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean) | If the framework will load all                 |

## ModalsManagerOptions

| Name     | Type                                                                                        | Description          |
| -------- | ------------------------------------------------------------------------------------------- | -------------------- |
| cooldown | [Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | The default cooldown |

## SelectMenuOptions

| Name     | Type                                                                                        | Description          |
| -------- | ------------------------------------------------------------------------------------------- | -------------------- |
| cooldown | [Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | The default cooldown |
