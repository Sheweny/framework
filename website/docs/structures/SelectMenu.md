# SelectMenu

Represents a select-menu.

## Constructor

```js
new SelectMenu(client, options);
```

| Name     | Type                                                                                                                                                                                                                                                                                   | Description                  | Default | Optional |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------- | -------- |
| client   | [ShewenyClient](./ShewenyClient.md)                                                                                                                                                                                                                                                    | The client.                  | None    | ✓        |
| customId | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Regexp](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Regexp)> | The list of select-menus ids | None    | ✓        |
| options  | [ButtonOptions](../typedef/SelectMenuOptions.md)                                                                                                                                                                                                                                       | The options.                 | None    | ✓        |

:::details Properties

- [client](#client)
- [customId](#customid)
- [enabled](#enabled)
- [manager](#manager)
- [path](#path)

:::

:::details Methods

- [before](#before)
- [execute](#abstract-execute)
- [register](#async-register)
- [reload](#async-reload)
- [unregister](#unregister)

:::

## Properties

### client

The framework client.

Return : [ShewenyClient](../client/ShewenyClient.md)

### enabled

If this structure is enabled or not.

### manager

The manager of this structure.

Return : [SelectMenusManager](../managers/SelectMenusManager.md)

### path

The path of the file.

Return : [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### customId

The custom id(s) of the select-menu.

Return : [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [Regexp](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Regexp)>

## Methods

### before()

Executed before select menu(s) checks.

Parameters :

| Name        | Type                                                                                           | Description     |
| ----------- | ---------------------------------------------------------------------------------------------- | --------------- |
| interaction | [SelectMenuInteraction](https://discord.js.org/#/docs/main/stable/class/SelectMenuInteraction) | The interaction |

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<any> | any

### [abstract] execute()

The execution of select menu(s).

Parameters :

| Name        | Type                                                                                           | Description     |
| ----------- | ---------------------------------------------------------------------------------------------- | --------------- |
| interaction | [SelectMenuInteraction](https://discord.js.org/#/docs/main/stable/class/SelectMenuInteraction) | The interaction |

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<any> | any

### [async] register()

Register the select-menu.

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[SelectMenu](./SelectMenu.md)> | [null](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Null)

### [async] reload()

Reload a select-menus group.

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[SelectMenu](./SelectMenu.md)> | [null](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Null)

### unregister()

Unregister a select-menus group from the bot.

Return : [Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
