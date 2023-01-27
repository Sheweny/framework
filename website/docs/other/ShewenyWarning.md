# ShewenyWarning

Put a warning in console in development mode and emit `warn` event on production mode.

## Constuctor

```js [Javascript CJS]
new ShewenyWarning(client, 'INVALID_CLASS', path);
```

| Name   | Type                                        | Description                 |
| ------ | ------------------------------------------- | --------------------------- |
| client | [ShewenyClient](../client/ShewenyClient.md) | The client                  |
| error  | [String]                                    | The name of the error       |
| args   | \*                                          | The arguments for functions |
