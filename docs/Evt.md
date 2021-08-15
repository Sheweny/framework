# Event

Represents a event.

| Name    | Type                                                                                              | Description              | Default | Required |
| ------- | ------------------------------------------------------------------------------------------------- | ------------------------ | ------- | -------- |
| Client  | [ShewenyClient](./ShewenyClient.md)                                                               | The client.              | None    | Yes      |
| name    | [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | The name of the event.   | None    | Yes      |
| options | [EventOptions](./typedef/EventOptions.md)                                                         | The options of the event | None    | Yes      |

## Methods

### Event#unregister()

Unregister a event from the bot.

Return true

### [async] Event#reload()

Reload a event of bot.

Return Promise\<[Event](.)>|null

### [async] Event#register()

Register the event.

Return Promise\<[Event](.)>|null
