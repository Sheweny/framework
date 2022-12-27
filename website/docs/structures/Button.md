# Button

Represents a button.

## Constructor

```js
new Button(client, options);
```

| Name     | Type                                                                                                                                                                                                                                                                                   | Description            | Default | Optional |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------- | -------- |
| client   | [ShewenyClient](./ShewenyClient.md)                                                                                                                                                                                                                                                    | The client.            | None    | No       |
| customId | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Regexp](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Regexp)> | The list of butons ids | None    | ✓        |
| options  | [ButtonOptions](../typedef/SelectMenuOptions.md)                                                                                                                                                                                                                                       | The options.           | None    | ✓        |

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

Return : [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [Regexp](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Regexp)>

### enabled

If this structure is enabled or not.

### manager

The manager of this structure.

Return : [ButtonsManager](../managers/ButtonsManager.md)

### path

The path of the file.

Return : [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

## Methods

### before()

Executed before button(s) checks.

Parameters :

| Name        | Type                                                                                   | Description     |
| ----------- | -------------------------------------------------------------------------------------- | --------------- |
| interaction | [ButtonInteraction](https://discord.js.org/#/docs/main/stable/class/ButtonInteraction) | The interaction |

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<any> | any

### [abstract] execute()

The execution of button(s).

Parameters :

| Name        | Type                                                                                   | Description     |
| ----------- | -------------------------------------------------------------------------------------- | --------------- |
| interaction | [ButtonInteraction](https://discord.js.org/#/docs/main/stable/class/ButtonInteraction) | The interaction |

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<any> | any

### [async] register()

Register the button.

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[Button](./Button.md)> | [null](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Null)

### [async] reload()

Reload a button of bot.

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[Button](./Button.md)> | [null](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Null)

### unregister()

Unregister a button from the bot.

Return : [Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
