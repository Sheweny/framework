# SelectMenu

Represents a select-menu.

## Constructor

```js [Javascript CJS]
new SelectMenu(client, options);
```

| Name     | Type                                             | Description                  | Default | Optional |
| -------- | ------------------------------------------------ | ---------------------------- | ------- | -------- |
| client   | [ShewenyClient](./ShewenyClient.md)              | The client.                  | None    | ✓        |
| customId | [Array]\<[String] \| [RegExp]>                   | The list of select-menus ids | None    | ✓        |
| options  | [ButtonOptions](../typedef/SelectMenuOptions.md) | The options.                 | None    | ✓        |

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

Return : [String]

### customId

The custom id(s) of the select-menu.

Return : [Array]\<[String] | [RegExp]>

## Methods

### before()

Executed before select menu(s) checks.

Parameters :

| Name        | Type                                                                                           | Description     |
| ----------- | ---------------------------------------------------------------------------------------------- | --------------- |
| interaction | [SelectMenuInteraction](https://discord.js.org/#/docs/main/stable/class/SelectMenuInteraction) | The interaction |

Return : [Promise]\<any> | any

### [abstract] execute()

The execution of select menu(s).

Parameters :

| Name        | Type                                                                                           | Description     |
| ----------- | ---------------------------------------------------------------------------------------------- | --------------- |
| interaction | [SelectMenuInteraction](https://discord.js.org/#/docs/main/stable/class/SelectMenuInteraction) | The interaction |

Return : [Promise]\<any> | any

### [async] register()

Register the select-menu.

Return : [Promise]\<[SelectMenu](./SelectMenu.md)> | [Null]

### [async] reload()

Reload a select-menus group.

Return : [Promise]\<[SelectMenu](./SelectMenu.md)> | [Null]

### unregister()

Unregister a select-menus group from the bot.

Return : [Boolean]
