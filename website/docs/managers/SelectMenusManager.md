# SelectMenusManager

Create an handler for bot select-menus. The select-menus can be in as many subfolders as desired and there may be other files exporting something else.

## Constructor

```js [Javascript CJS]
new SelectMenusManager(client, options);
```

| Name    | Type                                                                | Description                         | Default | Optional |
| ------- | ------------------------------------------------------------------- | ----------------------------------- | ------- | -------- |
| client  | [ShewenyClient](../client//ShewenyClient.md)                        | The client                          | None    | No       |
| options | [SelectMenuOptions](../typedef/ManagerOptions.md#selectmenuoptions) | Options of the select-menus manager | None    | No       |

:::details Properties

- [client](#client)
- [directory](#directory)
- [selectMenus](#selectMenus)

:::

:::details Methods

- [loadAll](#loadall)
- [unloadAll](#unloadall)

:::

:::details Events

- [cooldownLimit](#cooldownlimit)

:::

## Properties

### client

The framework client.

Return : [ShewenyClient](../client/ShewenyClient.md)

### directory

The directory of selectMenus.

Return : [String]

### selectMenus

The collection of loaded selectMenus.

Return : Collection<[SelectMenu](../structures/SelectMenu.md)>

## Methods

### loadAll()

Load all select-menus in directory of select-menus.

Return : [Promise]\<Collection\<[Array]\<[String]>, [SelectMenu](../structures/SelectMenu.md)>>

### unloadAll()

Unload all select-menus.

Return : void

## Events

### cooldownLimit

Emitted when user hit the cooldown limit.

Parameters :

| Name        | Type                                                                                     | Description               |
| ----------- | ---------------------------------------------------------------------------------------- | ------------------------- |
| interaction | [CommandInteraction](https://discord.js.org/#/docs/main/stable/class/CommandInteraction) | The interaction           |
| time        | [Number]                                                                                 | The time before run again |
