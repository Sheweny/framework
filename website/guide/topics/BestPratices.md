# Best pratices

In this part of the guide we will see the best options and configurations for running your bot in production mode.

- [Production mode](#production-mode)
- [Gateway intents](#gateway-intents)
- [Events](#events)
- [Fetch Data](#fetch-data)
- [Don't use synchronous functions](#don-t-use-synchronous-functions)
- [Handle exceptions properly](#handle-exceptions-properly)

## Production mode

In the client you can defined an option `mode` to `development` or `production`.  
For a bot in production it is important to set this option to `production`, this option will ensure that no warning is emitted in the console and with that the bot. Errors will not be written to the console either.  
The events will be emitted on the client (`warn` for the warnings and `error` for the errors)

::: warning
If you do not define any parameters you will be in development mode by default.
:::

## Gateway intents

Gateway intents introduced in version 6 of the discord API and made mandatory in version 8 allow you to choose the events that your bot will receive. For best performance it is important to only put the **strict minimum** of what your bot needs. If you define intents that you don't need your bot will have more traffic with discord and will cache information that you probably don't need.  
Note that some intents are privileged. You must therefore activate them on the panel of your bot on [https://discord.dev](https://discord.dev)
Privileged intents require additional verification if your bot exceeds 100 servers. So try to use them as little as possible.

## Events

To save memory, it's important to set the `once` property to vents you don't need. This option will delete the listner once the event has been emitted once. This can be particularly useful for events like the `ready` event which will in any case only be emitted once when the bot connects.

## Fetch Data

When you want to retrieve data you can call a discord.js `fetch ()` function. These functions have a `force` parameter, it is recommended to use it as little as possible because it prevents discord.js from checking the cache which can in some cases cause a request to the API when you already have the data.
However the cache can be outdated and in this case you will have to use the force option. Note that with a good configuration of the intents this problem should not arise.

## Don't use synchronous functions

Synchronous functions and methods tie up the executing process until they return. A single call to a synchronous function might return in a few microseconds or milliseconds, however for often requested bots, these calls add up and reduce the performance of the app. Avoid their use in production.

Although Node and many modules provide synchronous and asynchronous versions of their functions, always use the asynchronous version in production. The only time when a synchronous function can be justified is upon initial startup.

If you are using Node.js 4.0+, you can use the --trace-sync-io command-line flag to print a warning and a stack trace whenever your application uses a synchronous API.

## Handle exceptions properly

Normally sheweny's mode of production should handle most of the errors, however it is still useful to handle the errors. For this you can use

- try ... catch
- the promises

For example, you can configure your bot to send console errors to a discord channel so that you can better correct them.  
Here is an example code :

````js
import { WebhookClient } from 'discord.js';

const webhook = new WebhookClient({url:'https://discord.com/api/webhooks/{webhookId}/{webhookToken}'})

process.on('uncaughtException', (error) => {
  console.warn(error);
  if (!this.client) return;
  webhook.send({ content: "```js\n" + error.toString() + "```" });
});
process.on('unhandledRejection', (listener) => {
  console.warn(listener);
  if (!this.client) return;
  webhook.send({ content: "```js\n" + listener!.toString() + "```" });
});
process.on('rejectionHandled', (listener) => {
  console.warn(listener);
  if (!this.client) return;
  webhook.send({ content: "```js" + listener.toString() + "```" });
});
process.on('warning', (warning) => {
  console.warn(warning);
  if (!this.client) return;
  webhook.send({ content: "```js" + warning.toString() + "```" });
});

client.on('warn', (err) => {
  webhook.send({ content: "```js" + err.toString() + "```" });
})

client.on('error', (err) => {
  webhook.send({ content: "```js" + err.toString() + "```" });
})
````
