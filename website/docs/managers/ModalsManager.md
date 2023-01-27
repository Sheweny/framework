# ModalsManager

Create an handler for bot modals. The modals can be in as many subfolders as desired and there may be other files exporting something else.

## Constructor

```js [Javascript CJS]
new ModalsManager(client, options);
```

| Name    | Type                                                                      | Description                | Default | Optional |
| ------- | ------------------------------------------------------------------------- | -------------------------- | ------- | -------- |
| client  | [ShewenyClient](../client/ShewenyClient.md)                               | The client                 | None    | No       |
| options | [ModalsManagerOptions](../typedef/ManagerOptions.md#modalsmanageroptions) | The options of the manager | None    | No       |

:::details Properties

- [modals](#modals)
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

### modals

The collection of loaded modals.

Return : Collection<[Modal](../structures/Modal.md)>

### client

The framework client.

Return : [ShewenyClient](../client/ShewenyClient.md)

### directory

The directory of modals.

Return : [String]

## Methods

### loadAll()

Load all modals in directory of modals.

Return : [Promise]\<Collection\<[Array]\<[String]>, [Modal](../structures/Modal.md)>>

### unloadAll()

Unload all modals.

Return : void

## Events

### cooldownLimit

Emitted when user hit the cooldown limit.

Parameters :

| Name        | Type                                                                                     | Description               |
| ----------- | ---------------------------------------------------------------------------------------- | ------------------------- |
| interaction | [CommandInteraction](https://discord.js.org/#/docs/main/stable/class/CommandInteraction) | The interaction           |
| time        | [Number]                                                                                 | The time before run again |
