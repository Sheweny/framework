# Inhibitor

Represents an inhibitor.

## Constructor

```js
new Inhibitor(client, options);
```

| Name    | Type                                                                                        | Description                  | Default | Optional |
| ------- | ------------------------------------------------------------------------------------------- | ---------------------------- | ------- | -------- |
| client  | [ShewenyClient](../classes/ShewenyClient.md)                                                | The client.                  | None    |          |
| name    | [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | The name of the inhibitor.   | None    |          |
| options | [InhibitorOptions](../typedef/InhibitorOptions.md)                                          | The options of the inhibitor | None    |          |

:::details Properties

- [client](#client)
- [enabled](#enabled)
- [manager](#manager)
- [name](#name)
- [path](#path)
- [priority](#priority)
- [type](#type)

:::

:::details Methods

- [execute](#abstract-execute)
- [onFailure](#abstract-onfailure)
- [register](#async-register)
- [reload](#async-reload)
- [unregister](#unregister)

:::

## Properties

- `client` - The client.
- `path` - The file path of the event.
- `name` - The name of the event.
- `type` - The type of the inhibitor.
- `priority` - The priority of the inhibitor.

### client

The framework client.

Return : [ShewenyClient](../client/ShewenyClient.md)

### enabled

If this structure is enabled or not.

### manager

The manager of this structure.

Return : [InhibitorsManager](../managers/InhibitorsManager.md)

### name

The name of the inhibitor.

Return : [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### path

The path of the file.

Return : [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### priority

The priority of the inhibitor.

Return : [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

### type

The type of the inhibitor.

Return : [InhibitorTypeResolvable](../typedef/InhibitorOptions.md#inhibitortyperesolvable)

## Methods

### [abstract] execute()

The execution of inhibitor.

Parameters :

| Name      | Type                                                                                                                                                                                                                          | Description |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| structure | [Button](../structures/Button.md), [Command](../structures/Command.md), [Event](../structures/Event.md), [Inhibitor](../structures/Inhibitor.md), [Modal](../structures/Modal.md), [SelectMenu](../structures/SelectMenu.md) | The context |
| ctx       | [Interaction](https://discord.js.org/#/docs/main/stable/class/Interaction) or [Message](https://discord.js.org/#/docs/main/stable/class/Message)                                                                              | The context |

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<any> | any

### [abstract] onFailure()

The execution if inhibitor has failed.

Parameters :

| Name      | Type                                                                                                                                                                                                                          | Description |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| structure | [Button](../structures/Button.md), [Command](../structures/Command.md), [Event](../structures/Event.md), [Inhibitor](../structures/Inhibitor.md), [Modal](../structures/Modal.md), [SelectMenu](../structures/SelectMenu.md) | The context |
| ctx       | [Interaction](https://discord.js.org/#/docs/main/stable/class/Interaction) or [Message](https://discord.js.org/#/docs/main/stable/class/Message)                                                                              | The context |

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<any> | any

### [async] register()

Register the inhibotor.

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[Inhibitor](./Inhibitor.md)> | [null](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Null)

### [async] reload()

Reload a inhibotor.

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[Inhibitor](./Inhibitor.md)> | [null](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Null)

### unregister()

Unregister a inhibitor from the bot.

Return : [Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
