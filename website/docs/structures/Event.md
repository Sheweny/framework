# Event

Represents an event.

## Constructor

```js
new Event(client, "ready", options);
```

| Name    | Type                                                                                              | Description              | Default | Optional |
| ------- | ------------------------------------------------------------------------------------------------- | ------------------------ | ------- | -------- |
| client  | [ShewenyClient](../classes/ShewenyClient.md)                                                      | The client.              | None    | No       |
| name    | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The name of the event    | None    | No       |
| options | [EventOptions](../typedef/EventOptions.md)                                                        | The options of the event | None    | No       |

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

Return : [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### emitter

The emitter of the event.

Return : [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

### manager

The manager of this structure.

Return : [EventsManager](../managers/EventsManager.md)

### name

The name of the event.

Return : [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### once

If the event is emitted juste once or not.

Return : [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

### path

The path of the file.

Return : [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

## Methods

### client

The framework client.

Return : [ShewenyClient](../client/ShewenyClient.md)

### description

The description of the event.

Return : [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### emitter

If the event is emitted juste once or not.

Return : [EventEmitter](https://nodejs.org/api/events.html#class-eventemitter)

### manager

The manager of this structure.

Return : [EventsManager](../managers/EventsManager.md)

### name

The name of the event.

Return : [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### once

If the event is emitted juste once or not.

Return : [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

### path

The path of the file.

Return : [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
PS D:\Development\Projects\Sheweny\website> node .\sort-content.js

### before()

Executed before event checks.

Parameters :

| Name    | Type                                                                                                      | Description     |
| ------- | --------------------------------------------------------------------------------------------------------- | --------------- |
| ...args | [args Events](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-applicationCommandCreate) | Args for events |

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<any> | any

### [abstract] execute()

The execution of event.

Parameters :

| Name    | Type                                                                                                      | Description     |
| ------- | --------------------------------------------------------------------------------------------------------- | --------------- |
| ...args | [args Events](https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-applicationCommandCreate) | Args for events |

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<any> | any

### [async] register()

Register the event.

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[Event](./Event.md)> | [null](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Null)

### [async] reload()

Reload a event of bot.

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[Event](./Event.md)> | [null](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Null)

### unregister()

Unregister a event from the bot.

Return : [Boolean](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
