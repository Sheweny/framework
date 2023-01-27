# Event

Represents an event.

## Constructor

```js [Javascript CJS]
new Event(client, 'ready', options);
```

| Name    | Type                                         | Description              | Default | Optional |
| ------- | -------------------------------------------- | ------------------------ | ------- | -------- |
| client  | [ShewenyClient](../classes/ShewenyClient.md) | The client.              | None    | No       |
| name    | [String]                                     | The name of the event    | None    | No       |
| options | [EventOptions](../typedef/EventOptions.md)   | The options of the event | None    | No       |

:::details Properties

- [client](#client)
- [description](#description)
- [emitter](#emitter)
- [enabled](#enabled)
- [manager](#manager)
- [name](#name)
- [once](#once)
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

### description

The description of the event.

Return : [String]

### emitter

The emitter of the event.

Return : [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

### manager

The manager of this structure.

Return : [EventsManager](../managers/EventsManager.md)

### name

The name of the event.

Return : [String]

### once

If the event is emitted juste once or not.

Return : [Boolean]

### path

The path of the file.

Return : [String]

## Methods

### client

The framework client.

Return : [ShewenyClient](../client/ShewenyClient.md)

### description

The description of the event.

Return : [String]

### emitter

If the event is emitted juste once or not.

Return : [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

### manager

The manager of this structure.

Return : [EventsManager](../managers/EventsManager.md)

### name

The name of the event.

Return : [String]

### once

If the event is emitted juste once or not.

Return : [Boolean]

### path

The path of the file.

Return : [String]
PS D:\Development\Projects\Sheweny\website> node .\sort-content.js

### before()

Executed before event checks.

Parameters :

| Name    | Type                                                                                                      | Description     |
| ------- | --------------------------------------------------------------------------------------------------------- | --------------- |
| ...args | [args Events](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-applicationCommandCreate) | Args for events |

Return : [Promise]\<any> | any

### [abstract] execute()

The execution of event.

Parameters :

| Name    | Type                                                                                                      | Description     |
| ------- | --------------------------------------------------------------------------------------------------------- | --------------- |
| ...args | [args Events](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-applicationCommandCreate) | Args for events |

Return : [Promise]\<any> | any

### [async] register()

Register the event.

Return : [Promise]\<[Event](./Event.md)> | [Null]

### [async] reload()

Reload a event of bot.

Return : [Promise]\<[Event](./Event.md)> | [Null]

### unregister()

Unregister a event from the bot.

Return : [Boolean]
