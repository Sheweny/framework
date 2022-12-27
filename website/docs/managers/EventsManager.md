# EventsManager

Create an handler for bot events. The events can be in as many subfolders as desired and there may be other files exporting something else.

## Constructor

```js
new EventsManager(client, options);
```

| Name    | Type                                                                  | Description                   | Default | Optional |
| ------- | --------------------------------------------------------------------- | ----------------------------- | ------- | -------- |
| client  | [ShewenyClient](../client/ShewenyClient.md)                           | The client                    | None    | No       |
| options | [BaseManagerOptions](../typedef/ManagerOptions.md#basemanageroptions) | Options of the events manager | None    | No       |

:::details Properties

- [client](#client)
- [default](#default)
- [directory](#directory)
- [events](#events)

:::

:::details Methods

- [loadAll](#loadall)
- [loadAndRegisterAll](#loadandregisterall)
- [registerAll](#registerAll)
- [unloadAll](#unloadall)

:::

## Properties

### client

The framework client.

Return : [ShewenyClient](../client/ShewenyClient.md)

### default

The default data of the events.

Return : [EventsManagerDefaultOption](../typedef/ManagersDefaultOptions.md#eventsmanagerdefaultoptions)

### directory

The directory of events.

Return : [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### events

The collection of loaded events.

Return : Collection<[Event](../structures/Event.md)>

## Methods

### loadAll()

Load all inhibitors in directory of events.

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<Collection\<[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [Event](./Event.md)>>

### registerAll(events)

Register loaded events and register them if no events exist.

Parameters :

- events (type: Collection\<[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String), [Event](../structures/Event.md))>)

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<void>

### loadAndRegisterAll()

Load and register all events.

Return : [Promise](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<void>

### unloadAll()

Unload all events.

Return : void
