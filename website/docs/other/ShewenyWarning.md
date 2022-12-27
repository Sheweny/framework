# ShewenyWarning

Put a warning in console in development mode and emit `warn` event on production mode.

## Constuctor

```js
new ShewenyWarning(client, "INVALID_CLASS", path);
```

| Name   | Type                                                                                        | Description                 |
| ------ | ------------------------------------------------------------------------------------------- | --------------------------- |
| client | [ShewenyClient](../client/ShewenyClient.md)                                                 | The client                  |
| error  | [String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String) | The name of the error       |
| args   | \*                                                                                          | The arguments for functions |
