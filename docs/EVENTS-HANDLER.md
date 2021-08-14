# Events Handler

Create an handler for bot events. The events can be in as many subfolders as desired.

| Name      | Type                                                                                              | Description             | Default | Required |
| --------- | ------------------------------------------------------------------------------------------------- | ----------------------- | ------- | -------- |
| client    | [ShewenyClientOptions](./SHEWENY-CLIENT.md)                                                       | The client              | None    | Yes      |
| directory | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The directory of events | None    | Yes      |

## Properties

### EventsHandler.client

The client of framework.

Return : [ShewenyClientOptions](./SHEWENY-CLIENT.md)

### EventsHandler.directory

The directory of events.

Return : String

## Methods

### EventsHandler#registerAll()

Regsiter all events in Collection of events.

Return promise Collection\<string, [Event](./EVENT.md)>

### EventsHandler#loadAll()

Load registereds events;

Return Promise\<undefined>
