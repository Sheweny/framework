# ButtonsManager

Create an handler for bot buttons. The buttons can be in as many subfolders as desired and there may be other files exporting something else.

## Constructor

```js
new ButtonsManager(client, options);
```

| Name    | Type                                                                        | Description                | Default | Optional |
| ------- | --------------------------------------------------------------------------- | -------------------------- | ------- | -------- |
| client  | [ShewenyClient](../client/ShewenyClient.md)                                 | The client                 | None    | No       |
| options | [ButtonsManagerOptions](../typedef/ManagerOptions.md#buttonsmanageroptions) | The options of the manager | None    | No       |

:::details Properties

- [buttons](#buttons)
- [client](#client)
- [directory](#directory)

:::

:::details Methods

- [loadAll](#loadall)
- [unloadAll](#unloadall)

:::

:::details Events

- [cooldownLimit](#cooldownlimit)

:::

## Properties

### buttons

The collection of loaded buttons.

Return : Collection<[Button](../structures/Button.md)>

### client

The framework client.

Return : [ShewenyClient](../client/ShewenyClient.md)

### directory

The directory of buttons.

Return : [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

## Methods

### loadAll()

Load all buttons in directory of buttons.

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<Collection\<[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)\<[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)>, [Button](../structures/Button.md)>>

### unloadAll()

Unload all buttons.

Return : void

## Events

### cooldownLimit

Emitted when user hit the cooldown limit.

Parameters :

| Name        | Type                                                                                        | Description               |
| ----------- | ------------------------------------------------------------------------------------------- | ------------------------- |
| interaction | [CommandInteraction](https://discord.js.org/#/docs/main/stable/class/CommandInteraction)    | The interaction           |
| time        | [Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number) | The time before run again |
