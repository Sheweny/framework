# Events Handler

Create an handler for bot events. The events can be in as many subfolders as desired.

| Name      | Type                                                                                              | Description             | Default | Required |
| --------- | ------------------------------------------------------------------------------------------------- | ----------------------- | ------- | -------- |
| client    | [ShewenyClientOptions](./ShewenyClient.md)                                                        | The client              | None    | Yes      |
| directory | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The directory of events | None    | Yes      |

## Properties

### EventsHandler.client

The client of framework.

Return : [ShewenyClientOptions](./ShewenyClient.md)

### EventsHandler.directory

The directory of events.

Return : String

## Methods

### EventsHandler#registerAll()

Regsiter all events in client.events Collection.

Return promise Collection\<string, [Event](./Event.md)>

### EventsHandler#loadAll()

Load registereds events and register them if no events exist.

Return Promise\<undefined>
