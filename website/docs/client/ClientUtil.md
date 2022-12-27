# ClientUtil

Useful methods for the client.

## Constructor

```js
new ClientUtil(client);
```

| Name   | Type                                     | Description                  | Optional |
| ------ | ---------------------------------------- | ---------------------------- | -------- |
| client | [ShewenyClient](../client/ShewenyClient) | The sheweny client framework | No       |

:::details Methods

- [getButtons](#getbuttons)
- [getCommands](#getcommands)
- [getEvents](#getevents)
- [getInhibitors](#getinhibitors)
- [getSelectMenus](#getselectmenus)
- [resolveChannel](#resolvechannel-guild-arg)
- [resolveGuildEmoji](#resolveguildemoji-guild-arg)
- [resolveGuild](#resolveguild-arg)
- [resolveMember](#async-resolvemember-guild-arg)
- [resolveRole](#resolverole-guild-arg)
- [resolveUser](#async-resolveuser-arg)
  :::

## getButtons()

Get the loaded buttons of the bot.

Return : [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Button](../structures/Button.md)>

## getCommands()

Get the loaded commands of the bot.

Return : [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Command](../structures/Command.md)>

## getEvents()

Get the loaded events of the bot.

Return : [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Event](../structures/Event.md)>

## getInhibitors()

Get the loaded inhibitors of the bot.

Return : [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)<[Inhibitor](../structures/Inhibitor.md)>

## getSelectMenu()

Get the loaded select menu of the bot.

Return : [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)<[SelectMenu](../structures/SelectMenu.md)>

## resolveChannel(guild, arg)

Get a guild channel from a guild.

Parameters :

- guild : The guild where is the channel (Guild)
- arg : Id, mention, name, start of name. (string)

Return : [GuildChannel](https://discord.js.org/#/docs/main/stable/class/GuildChannel) or undefined

## resolveCommand(arg)

Get a command from the client.

Parameters :

- arg : Name or aliases. (string)

Return : [Command](../structures/Command.md) or undefined

## resolveGuild(arg)

Get a guild in common with the bot.

Parameters :

- arg : Name or id of guild. (string)

Return : [Guild](https://discord.js.org/#/docs/main/stable/class/Guild) or undefined

## resolveGuildEmoji(guild, arg)

Get a emoji from a guild.

Parameters :

- guild : The guild where is the emoji (Guild)
- arg : Id, name, emoji (mention). (string)

Return : [GuildEmoji](https://discord.js.org/#/docs/main/stable/class/GuildEmoji) or undefined

## [async] resolveMember(guild, arg)

Get a guild member and fetch discord if it is not in the cache.

Parameters :

- guild : The guild where is the member (Guild)
- arg : Id, mention, username, start of username. (string)

Return : [GuildMember](https://discord.js.org/#/docs/main/stable/class/GuildMember) or undefined

## resolveRole(guild, arg)

Get a guild role.

Parameters :

- guild : The guild (Guild)
- arg : Id, mention, name, start of name. (string)

Return : [Role](https://discord.js.org/#/docs/main/stable/class/Role) or undefined

## [async] resolveUser(arg)

Get a user and fetch discord if it is not in the cache.

Parameters :

- arg : Id, mention, name, start of name, name + discriminator. (string)

Return : [User](https://discord.js.org/#/docs/main/stable/class/User) or undefined
