# Modal

Represents a Modal.

## Constructor

```js
new Modal(client, options);
```

| Name     | Type                                                                                                                                                                                                                                                                                   | Description            | Default | Optional |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- | ------- | -------- |
| client   | [ShewenyClient](./ShewenyClient.md)                                                                                                                                                                                                                                                    | The client.            | None    | No       |
| customId | [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Regexp](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Regexp)> | The list of modals ids | None    | ✓        |
| options  | [ModalOptions](../typedef/SelectMenuOptions.md)                                                                                                                                                                                                                                        | The options.           | None    | ✓        |

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

The cooldown of the modal (in seconds).

### customId

The custom id(s) of the modal.

Return : [Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | [Regexp](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Regexp)>

### enabled

If this structure is enabled or not.

### manager

The manager of this structure.

Return : [ModalsManager](../managers/ModalsManager.md)

### path

The path of the file.

Return : [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

## Methods

### before()

Executed before modal(s) checks.

Parameters :

| Name        | Type                                                                                 | Description     |
| ----------- | ------------------------------------------------------------------------------------ | --------------- |
| interaction | [ModalInteraction](https://discord.js.org/#/docs/main/stable/class/ModalInteraction) | The interaction |

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<any> | any

### [abstract] execute()

The execution of modal(s).

Parameters :

| Name        | Type                                                                                 | Description     |
| ----------- | ------------------------------------------------------------------------------------ | --------------- |
| interaction | [ModalInteraction](https://discord.js.org/#/docs/main/stable/class/ModalInteraction) | The interaction |

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<any> | any

### [async] register()

Register the modal.

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[Modal](./Modal.md)> | [null](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Null)

### [async] reload()

Reload a modal of bot.

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[Modal](./Modal.md)> | [null](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Null)

### unregister()

Unregister a modal from the bot.

Return : [Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
