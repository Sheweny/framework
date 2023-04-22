# Discord-resolve

Sheweny plugin

This module groups together functions to retrieve data from different types of arguments. The functions group together all the possible cases each time (id, mention, name, start of name, name + tag). This module can also be used with slash-commands to give several options to a user.

## Getting Started

Prerequisites

Node.js 16.6.0 or newer is required.

### Instalation

With npm :

```sh-session
npm install @sheweny/resolve
```

With yarn :

```sh-session
yarn add @sheweny/resolve
```

## Usage

Import the module from node_modules :

With CommonJS syntax :

```js
const { DiscordResolve } = require("@sheweny/resolve");
```

With module syntax :

```js
import { DiscordResolve } from "@sheweny/resolve";
```

Create a new instance of DiscordResolve with the client has a parameter.

```js
const resolve = new DiscordResolve(client).
```

## Methods

---

## [async] resolveUser(arg)

Get a user and fetch discord if it is not in the cache.

Parameters :

- arg : Id, mention, name, start of name, name + discriminator. (string)

Return : User or undefined

```js
const user = await resolve.resolveUser("@Sheweny#1234");
```

## resolveGuild(arg)

Get a guild in common with the bot.

Parameters :

- arg : Name or id of guild. (string)

```js
const guild = resolve.resolveGuild("Sheweny's server");
```

Return : Guild or undefined

## [async] resolveMember(guild, arg)

Get a guild member and fetch discord if it is not in the cache.

Parameters :

- guild : The guild where is the member (Guild)
- arg : Id, mention, username, start of username. (string)

Return : GuildMember or undefined

```js
const member = await resolve.resolveMember(guild, "@Sheweny#1234");
```

## resolveChannel(guild, arg)

Get a guild channel from a guild.

Parameters :

- guild : The guild where is the channel (Guild)
- arg : Id, mention, name, start of name. (string)

Return : GuildChannel or undefined

```js
const channel = resolve.resolveChannel(guild, "general");
```

## resolveRole(guild, arg)

Get a guild role.

Parameters :

- guild : The guild (Guild)
- arg : Id, mention, name, start of name. (string)

Return : Role or undefined

```js
const role = resolve.resolveRole(guild, "@everyone");
```

## resolveGuildEmoji(guild, arg)

Get a emoji from a guild.

Parameters :

- guild : The guild where is the emoji (Guild)
- arg : Id, name, emoji (mention). (string)

Return : GuildEmoji or undefined

```js
const emoji = resolve.resolveGuildEmoji(guild, ":smile:");
```

## resolveModo(member)

Check if user have a moderator permissions (ADMINISTRATOR, MANAGE_GUILD or BAN_MEMBERS).

Parameters :

- member : GuildMember

Return : Boolean

```js
const isModo = resolve.resolveModo(member);
```

## Example

```js
const { DiscordResolve } = require("@sheweny/resolve");
const { Client, Intents } = require("discord.js");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const util = new DiscordResolve(client);
client.on("messageCreate", async (msg) => {
  const args = msg.content.split(" ");
  const user = await util.resolveUser(args[0]); // args[0] accept id, mention, name, start of name and username + discriminator.
  const guild = util.resolveGuild(args[1]); // args[1] accept id, and name.
  const member = await util.resolveMember(msg.guild, args[2]); // args[2] accept id, mention, username, start of username.
  const channel = util.resolveChannel(msg.guild, args[3]); // args[3] accept id, mention and name.
  const role = util.resolveRole(msg.guild, args[4]); // args[4] accept id, mention, name and start of name.
  const emoji = util.resolveGuildEmoji(msg.guild, args[5]); // args[5] accept id, name and emoji.
});
client.login("token");
```
