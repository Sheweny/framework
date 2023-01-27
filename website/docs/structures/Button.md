# Button

Represents a button.

## Constructor

```js [Javascript CJS]
new Button(client, options);
```

| Name     | Type                                             | Description            | Default | Optional |
| -------- | ------------------------------------------------ | ---------------------- | ------- | -------- |
| client   | [ShewenyClient](./ShewenyClient.md)              | The client.            | None    | No       |
| customId | [Array]\<[String] \| [RegExp]>                   | The list of butons ids | None    | ✓        |
| options  | [ButtonOptions](../typedef/SelectMenuOptions.md) | The options.           | None    | ✓        |

:::details Properties

- [client](#client)
- [cooldown](#cooldown)
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

### cooldown

The cooldown of the button (in seconds).

### customId

The custom id(s) of the button.

Return : [Array]\<[String] | [RegExp]>

### enabled

If this structure is enabled or not.

### manager

The manager of this structure.

Return : [ButtonsManager](../managers/ButtonsManager.md)

### path

The path of the file.

Return : [String]

## Methods

### before()

Executed before button(s) checks.

Parameters :

| Name        | Type                                                                                   | Description     |
| ----------- | -------------------------------------------------------------------------------------- | --------------- |
| interaction | [ButtonInteraction](https://discord.js.org/#/docs/main/stable/class/ButtonInteraction) | The interaction |

Return : [Promise]\<any> | any

### [abstract] execute()

The execution of button(s).

Parameters :

| Name        | Type                                                                                   | Description     |
| ----------- | -------------------------------------------------------------------------------------- | --------------- |
| interaction | [ButtonInteraction](https://discord.js.org/#/docs/main/stable/class/ButtonInteraction) | The interaction |

Return : [Promise]\<any> | any

### [async] register()

Register the button.

Return : [Promise]\<[Button](./Button.md)> | [Null]

### [async] reload()

Reload a button of bot.

Return : [Promise]\<[Button](./Button.md)> | [Null]

### unregister()

Unregister a button from the bot.

Return : [Boolean]
