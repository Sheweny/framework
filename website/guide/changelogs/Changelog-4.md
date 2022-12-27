# Changelog of V4 🚀

## [[4.0.2]](https://github.com/Sheweny/framework/compare/4.0.1...4.0.2) - August 1, 2022

### Typings

- Fix typings: Add typings

## [[4.0.1]](https://github.com/Sheweny/framework/compare/4.0.0...4.0.1) - August 1, 2022

### Fixes

- Fix adminsOnly permission on commands (slash-commands AND message-commands) ([cff7c76](https://github.com/Sheweny/framework/commit/cff7c764c2d2973bfddba2b16d7d09022a2ab4b6))
- Fix `ClientUtil#getX` return an array of structures instedof an array of arrays ([05aaacb](https://github.com/Sheweny/framework/commit/05aaacba82c6a6e12989571cd5410d6235581996))

## [[4.0.0]](https://github.com/Sheweny/framework/compare/3.3.5...4.0.0) - July 30, 2022

## General

- Improve typings in general ([caeb29c](https://github.com/Sheweny/framework/commit/448f55e1d69061397e559e005e687f8cd91f6112))
- Improve errors management ([6f8b2b9](https://github.com/Sheweny/framework/commit/6f8b2b9db250c4283c35cd4597fceacd0677887c))
- [Cooldowns]: Refactor cooldown system (access in client.cooldowns) #87 ([1224753](https://github.com/Sheweny/framework/commit/12247534465494d6afba59b70f41a291d4e26925))

## Client

- Collections (`client.collections`) contain now an array of structures. ([cd74b3d](https://github.com/Sheweny/framework/commit/cd74b3d03fb25741e098d840872e1d17ed107c3d))
- [ShewenyClientOptions]: Add `disableCooldownForAdmins` option ([3fbd807](https://github.com/Sheweny/framework/commit/3fbd80743d3a96be218af5365ec97aaca5f41c5b))
- [ClientUtil]: `getX` return an array (Array.from(interator)) instedof an iterator. ([0cab451](https://github.com/Sheweny/framework/commit/0cab45103be8f7862fee80d8ebe17824e6fd04d6))
- [ClientUtil]: Add `resolveCommand` function ([88d93cd](https://github.com/Sheweny/framework/commit/88d93cd41125eec1498984372024eda763b42d8a)).

## Structures

- [Command]: Fix `descriptionLocalizations`. ([cb13044](https://github.com/Sheweny/framework/commit/cb130441c97abe755697d952501bc5e73e4693b2))
- [Inhibitor]: Change function `execute` and `onFailure` first parapeter is now the structure (client => structure type of BaseStructure) ([448f55e](https://github.com/Sheweny/framework/commit/448f55e1d69061397e559e005e687f8cd91f6112))
- [Command] : Add `nameLocalizations` and `descriptionLocalizations` keys in structures. ([897f1a1](https://github.com/Sheweny/framework/commit/897f1a19f18b256271b423295377508ccaf220ad) & [ed51bf5](https://github.com/Sheweny/framework/commit/ed51bf593b970e277ed134eef75b18a4fe4b2b97))
- [Command]: `userPermissions` and `clientPermissions` is now of type `PermissionResolvable[]`. ([897f1a1](https://github.com/Sheweny/framework/commit/897f1a19f18b256271b423295377508ccaf220ad) & [ed51bf5](https://github.com/Sheweny/framework/commit/ed51bf593b970e277ed134eef75b18a4fe4b2b97))
- [Command]: Fix channel types (add global) ([ed51bf5](https://github.com/Sheweny/framework/commit/ed51bf593b970e277ed134eef75b18a4fe4b2b97))
- [Command]: Support slash-commands permissions ([897f1a1](https://github.com/Sheweny/framework/commit/897f1a19f18b256271b423295377508ccaf220ad) & [ed51bf5](https://github.com/Sheweny/framework/commit/ed51bf593b970e277ed134eef75b18a4fe4b2b97))
- Possibility to enable or disable structures. ([2f054c9](https://github.com/Sheweny/framework/commit/2f054c97ce221b6668f501efab1b3e7f930dd48f))
- Change register and unregister functions: Return the structure without saving it in a collection. ([5ad3c46](https://github.com/Sheweny/framework/commit/5ad3c465275e14ecd7e7c5b8fb1662f6f41dc567))
- Modals support ([d084556](https://github.com/Sheweny/framework/commit/d08455697cac51f32305d0f6ed24577878c9f8a0))
  - [Modal]: Create this structure
- [Command]: Add "COMMAND" type in message command ([88d93cd](https://github.com/Sheweny/framework/commit/88d93cd41125eec1498984372024eda763b42d8a)).
- [Command]: Add "GLOBAL" type in channel option ([2933afd](https://github.com/Sheweny/framework/commit/2933afd56abb7c0523ba0d4ee2313ce1e2a801db)).
- [Structures]: Allow regular expressions and strings in same array ([c7f41b1](https://github.com/Sheweny/framework/commit/c7f41b156514c6787fab6c2c437c5daa74c7fec7))

## Managers

- [CommandsManager]: Change type of the `prefix` key, it can be a function with `ctx: Message | Interaction` as a parameter. ([644888b](https://github.com/Sheweny/framework/commit/644888bdf7d302d9bcdcfa37711e9933e9eda7fc))
- [CommandsManager]: Permissions events change signature: `(ctx: Message|Interaction, perms: string[], command:Command)`. ([2373369](https://github.com/Sheweny/framework/commit/23733691f1e2d575d791de702280a806865a27e6))
- [CommandsManager]: Add strategies for register application commands. ([09f3b49](https://github.com/Sheweny/framework/commit/09f3b497e6fdbff894292392f50a906423fcb767))
- Managers: Collections can't be null now, however the collections can be empty. ([cd74b3d](https://github.com/Sheweny/framework/commit/cd74b3d03fb25741e098d840872e1d17ed107c3d))
- CommandsManager: Change the `getApplicationCommandData` prototype : the parameter is the command (`Command` type) returns: `ApplicationCommandData`. ([92340a9](https://github.com/Sheweny/framework/commit/92340a9fc623762bc52b0cd3858907319a7e8163)).
- CommandsManager: Add getAllApplicationCommandData function that take a collection of commands in parameter and returns an array of `ApplicationCommandData` (`ApplicationCommandData[]`) ([92340a9](https://github.com/Sheweny/framework/commit/92340a9fc623762bc52b0cd3858907319a7e8163)).

## Events

- Improve errors display on events. ([43d3724](https://github.com/Sheweny/framework/commit/43d3724cb8f798c8723a9e364846e785f68c9bd8))
- Support array of structures in collections. ([1f88271](https://github.com/Sheweny/framework/commit/1f8827139429d95cd5b06ae11f433be94ee82869))
- [CommandsManager]: emit invalidChannel event when command is in bad channel ([b39ae2c](https://github.com/Sheweny/framework/commit/b39ae2c96cdf0fa751d3c789af382a373ff61766))

## Loader V2

- Support custom project structures
- Support arrays of structures. ([59ef1d2](https://github.com/Sheweny/framework/commit/59ef1d2bed6c7a582827cb8f94f02741dc7fb173) & [cd74b3d](https://github.com/Sheweny/framework/commit/cd74b3d03fb25741e098d840872e1d17ed107c3d))
- Fix loading cland readonly `_id` property on loadable classes (BaseStructure) ([7b2d691](https://github.com/Sheweny/framework/commit/7b2d6910f65b1867ab0d17ae78bcb0231e114d00))
- Add a static, private and readonly `_id` property on loadable classes (BaseStructure) ([7b2d691](https://github.com/Sheweny/framework/commit/7b2d6910f65b1867ab0d17ae78bcb0231e114d00))
- Check the instance of structure ([42dccc7](https://github.com/Sheweny/framework/commit/42dccc701a48b24b65751b4a8f94698b3b31b639))
- Allow multiples exportations per file ([42dccc7](https://github.com/Sheweny/framework/commit/42dccc701a48b24b65751b4a8f94698b3b31b639))
- Allow mix of structures in files ([42dccc7](https://github.com/Sheweny/framework/commit/42dccc701a48b24b65751b4a8f94698b3b31b639))
- Remove loadFiles function
- Remove readDirAndPush function
