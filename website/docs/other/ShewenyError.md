# ShewenyError

Throw an error in production mode and emit `error` event on production mode.

## Constuctor

```js [Javascript CJS]
new ShewenyError(client, 'INVALID_CLASS', path);
```

| Name   | Type                                        | Description                 |
| ------ | ------------------------------------------- | --------------------------- |
| client | [ShewenyClient](../client/ShewenyClient.md) | The client                  |
| error  | [String]                                    | The name of the error       |
| args   | \*                                          | The arguments for functions |
