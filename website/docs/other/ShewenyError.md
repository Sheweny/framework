# ShewenyError

Throw an error in production mode and emit `error` event on production mode.

## Constuctor

```js
new ShewenyError(client, "INVALID_CLASS", path);
```

| Name   | Type                                                                                        | Description                 |
| ------ | ------------------------------------------------------------------------------------------- | --------------------------- |
| client | [ShewenyClient](../client/ShewenyClient.md)                                                 | The client                  |
| error  | [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | The name of the error       |
| args   | \*                                                                                          | The arguments for functions |
