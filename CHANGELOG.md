# Changelog

**All notable changes to this project will be documented in this file.**

## [[4.2.1]](https://github.com/Sheweny/framework/compare/4.2.0...4.2.1) - December 27, 2022

### Fixed

- [Types]: Add typings for all structures & managers

## [[4.2.0]](https://github.com/Sheweny/framework/compare/4.1.1...4.2.0) - December 26, 2022

### Refactor

- [Internal events]: Refactor internat events loader & support new select-menus ([eb6ec5d](https://github.com/Sheweny/framework/commit/eb6ec5df482f7ffbfc60d043cb7f5488a5b756b0))

## [[4.1.1]](https://github.com/Sheweny/framework/compare/4.1.0...4.1.1) - October 29, 2022

### Fixed

- [Loader] Fix filter of files only accept .js and .ts files ([37dec6f](https://github.com/Sheweny/framework/commit/37dec6f2094be18012a8c4e308c12af3afda90ca))

## [[4.1.0]](https://github.com/Sheweny/framework/compare/4.0.3...4.1.0) - October 28, 2022

### Added

- [Loader]: Add `asyncRead` option to read files asynchronously (improve loading time ~20%-40%) ([552dc9e](https://github.com/Sheweny/framework/commit/552dc9e3876534702b926d81da085f1e70cf3384)).
- [ButtonsManager]: Add `asyncRead` option to load files asynchronously (use the new loader option). Default: `false` ([552dc9e](https://github.com/Sheweny/framework/commit/552dc9e3876534702b926d81da085f1e70cf3384)).
- [CommandsManager]: Add `asyncRead` option to load files asynchronously (use the new loader option). Default: `false` ([552dc9e](https://github.com/Sheweny/framework/commit/552dc9e3876534702b926d81da085f1e70cf3384)).
- [EventsManager]: Add `asyncRead` option to load files asynchronously (use the new loader option). Default: `false` ([552dc9e](https://github.com/Sheweny/framework/commit/552dc9e3876534702b926d81da085f1e70cf3384)).
- [InhibitorsManager]: Add `asyncRead` option to load files asynchronously (use the new loader option). Default: `false` ([552dc9e](https://github.com/Sheweny/framework/commit/552dc9e3876534702b926d81da085f1e70cf3384)).
- [ModalManager]: Add `asyncRead` option to load files asynchronously (use the new loader option). Default: `false` ([552dc9e](https://github.com/Sheweny/framework/commit/552dc9e3876534702b926d81da085f1e70cf3384)).
- [SelectMenusManager]: Add `asyncRead` option to load files asynchronously (use the new loader option). Default: `false` ([552dc9e](https://github.com/Sheweny/framework/commit/552dc9e3876534702b926d81da085f1e70cf3384)).

## [[4.0.3]](https://github.com/Sheweny/framework/compare/4.0.2...4.0.3) - September 3, 2022

### Fixes

- Fix `ClientUtil#getX` return an array of structures instedof an array of arrays ([d588c3f](https://github.com/Sheweny/framework/commit/d588c3f99b0dea3a7f972fd420e8f5364a009520))
- Fix `Structures#enabled` use the default values ([ab16444](https://github.com/Sheweny/framework/commit/ab164449803b3f1964125716e651f46d930b77c4))

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

# [[3.3.4]](https://github.com/Sheweny/framework/compare/3.3.3...3.3.4) - February 26, 2022

### Fixed

- Buttons : Fix regex match for global flag ([639de8a](https://github.com/Sheweny/framework/commit/639de8a1de857e93137a2e770e3ec66a3ac9526e)).
- SelectMenus Fix regex match for global flag ([ff10711](https://github.com/Sheweny/framework/commit/ff10711716a58594ca77b80d2504b4ab2534240a)).

# [[3.3.3]](https://github.com/Sheweny/framework/compare/3.3.2...3.3.3) - February 12, 2022

### Fixed

- Listeners: Fix async functions for inhibitors and events (once and no once) ([33bbdf8](https://github.com/Sheweny/framework/commit/33bbdf8102277628102cbc0a73fdee5317e170cd)).

# [[3.3.2]](https://github.com/Sheweny/framework/compare/3.3.1...3.3.2) - December 22, 2021

### Fixed

- Command: Fix bug in command message argument caused by order of properties ([f23193c](https://github.com/Sheweny/framework/commit/f23193ce4e012cc1f19c8faf4b3d4e6438041811))

# [[3.3.1]](https://github.com/Sheweny/framework/compare/3.3.0...3.3.1) - December 22, 2021

### Fixed

- CommandsManager: The `default` property is now optional ([3019c2e](https://github.com/Sheweny/framework/commit/3019c2e611fcf67ccfa96f69e34cec426c9d37b2))

# [[3.3.0]](https://github.com/Sheweny/framework/compare/3.2.0...3.3.0) - December 22, 2021

### Added

- CommandManager: Add default object in options for set default values in commands ([b893913](https://github.com/Sheweny/framework/commit/b8939131a833a2b60bc06899c47d4e4dc3b14888)).
- EventsManager: Add default object in options for set default values in events ([8127b56](https://github.com/Sheweny/framework/commit/8127b568e485aea88c60c35062119fa84d3b3ba2))
- InhibitorsManager: Add default object in options for set default values in inhibitors ([8127b56](https://github.com/Sheweny/framework/commit/8127b568e485aea88c60c35062119fa84d3b3ba2))
- DevelopmentMode: Add duplicate class check ([03de4ad](https://github.com/Sheweny/framework/commit/03de4ad528777887f91442cce8cf1a190e0dfeea))

### Changed

- ShewenyClientOptions: Add default object in options for set default values in commands ([8127b56](https://github.com/Sheweny/framework/commit/8127b568e485aea88c60c35062119fa84d3b3ba2) [8127b56](https://github.com/Sheweny/framework/commit/8127b568e485aea88c60c35062119fa84d3b3ba2))

### Fixed

- Command: Fix type property, now optional ([1807dc6](https://github.com/Sheweny/framework/commit/1807dc692b2bf4b826ae24802beb7accc77c6a70))

# [[3.2.0]](https://github.com/Sheweny/framework/compare/3.1.0...3.2.0) - December 20, 2021

### Added

- Managers: Add base manager export ([4561a68](https://github.com/Sheweny/framework/commit/4561a68b3aac4a3045952a476ee868937476b670))
- Command: Add `usage` and `examples` in structure ([70dda8d](https://github.com/Sheweny/framework/commit/70dda8d379aeaca8b7c96790a0973e8588be02ad))
- Client: Add `connected` propertie ([b8bf7d1](https://github.com/Sheweny/framework/commit/b8bf7d1e49f8c4cbe5b8ad26254583dca140ecef))

### Changed

- Structures: Refactor structures ([bff12bb](https://github.com/Sheweny/framework/commit/bff12bbb623e90c191867b026a48dc7d4a431d62))

### Fixed

- Client: Fix `awaitReady()` method when the client is already loged ([b8bf7d1](https://github.com/Sheweny/framework/commit/b8bf7d1e49f8c4cbe5b8ad26254583dca140ecef))
- Managers: Fix loadAll errors display ([13f48f7](https://github.com/Sheweny/framework/commit/13f48f7352b30d181ba9a3bf83f967b947c1ee1e))

# [[3.1.0]](https://github.com/Sheweny/framework/compare/3.0.0...3.1.0) - December 11, 2021

### Added

- Github: Add changelog file ([fbfd789](https://github.com/Sheweny/framework/commit/fbfd789bb5d05c807e82ac1ea98afd22521125fb))
- Setup CodeQL for code analysis ([8e45f7d](https://github.com/Sheweny/framework/commit/8e45f7de27ff54e8a8006885236d64e9477496fe))
- Github: Add pull-request template ([6d17fc1](https://github.com/Sheweny/framework/commit/6d17fc18ac970a811799c9b6ebda5cf2e342c35a))

### Changed

- Command: `cooldownLimit` event take a new parameter `time` ([8b771b7](https://github.com/Sheweny/framework/commit/8b771b7f1c19f593c792f04d10584f41e871bc5c))
- Button: `customId` property can be a Regex ([d3020b8](https://github.com/Sheweny/framework/commit/d3020b8915fa045122c9730a86e951db328f6c7f) [e27fbfe](https://github.com/Sheweny/framework/commit/e27fbfeb0e4712f0315fedb44475a19abf560805))
- SelectMenus: `customId` property can be a Regex ([d3020b8](https://github.com/Sheweny/framework/commit/d3020b8915fa045122c9730a86e951db328f6c7f) [e27fbfe](https://github.com/Sheweny/framework/commit/e27fbfeb0e4712f0315fedb44475a19abf560805))

### Fixed

- Structures: Fix errors display ([d6ee4f1](https://github.com/Sheweny/framework/commit/d6ee4f165ea3c08e454bf6442490b5317424e7d9))
- Github: Fix readme syntax ([24ad787](https://github.com/Sheweny/framework/commit/24ad787ec6cc7eb0ae156d5e91d8f40f4fa415d9))

# [[3.0.0]](https://github.com/Sheweny/framework/compare/2.1.0...3.0.0) - November 21, 2021

### Added

- ShewenyClientOptions: Add `autoRegisterApplicationCommand` option ([d998836](https://github.com/Sheweny/framework/commit/d99883681d13038ecd03a639f6ab1a5e2173e691))
- Command: Add autocomplete management ([66dd982](https://github.com/Sheweny/framework/commit/66dd982d7d8003679e1f0930f5f835478cc8c647))
- Event: Set emitter of event ([bdc6b1e](https://github.com/Sheweny/framework/commit/bdc6b1e43a11329ff3487b213290785f467b9881))

### Changed

- ShewenyClientOptions: Changed `handlers` to `managers` ([f648056](https://github.com/Sheweny/framework/commit/f648056126b72e727b33c6697e2ce4d74afdcdd4))
- ShewenyClient: The `util` property now return a ClientUtil instance ([f106045](https://github.com/Sheweny/framework/commit/f106045764670ca2fd1b47a9b695e28f28e9b4af))
- CommandsManagerOptions: Property `guildId` now support an array ([673c735](https://github.com/Sheweny/framework/commit/673c735ee61a9f984dba50c8ed4e789cf8e6db64))
- CommandsManager: Change parameters ([9a451aa](https://github.com/Sheweny/framework/commit/9a451aac35ffd04dbf11fa30e1859c28d47c2b5b))
- ButtonsManager: Change parameters ([9a451aa](https://github.com/Sheweny/framework/commit/9a451aac35ffd04dbf11fa30e1859c28d47c2b5b))
- SelectMenusManager: Change parameters ([9a451aa](https://github.com/Sheweny/framework/commit/9a451aac35ffd04dbf11fa30e1859c28d47c2b5b))
- InhibitorsManager: Change parameters ([9a451aa](https://github.com/Sheweny/framework/commit/9a451aac35ffd04dbf11fa30e1859c28d47c2b5b))
- EventsManager: Change parameters ([9a451aa](https://github.com/Sheweny/framework/commit/9a451aac35ffd04dbf11fa30e1859c28d47c2b5b))

## [[2.1.0]](https://github.com/Sheweny/framework/compare/2.0.0...2.1.0) - September 4, 2021

### Added

- Down cast support: Add support for down casting to a specific type in commands ([84d945c](https://github.com/Sheweny/framework/commit/84d945cc21e8d8d915c83dd73360a49a659ba035))

# [[2.0.0]](https://github.com/Sheweny/framework/compare/1.0.0-beta3...2.0.0) - September 4

### Added

- ShewenyClientOptions: `joinThreadsOnCreate` option ([205220d](https://github.com/Sheweny/framework/commit/205220d832d9c300dc00e7c3785c12b9d69aa918))
- ShewenyClientOptions: `mode` option ([66](https://github.com/Sheweny/framework/pull/66)) ([2c40bba](https://github.com/Sheweny/framework/commit/2c40bba534878647c65f710e68bfa63a0a75d7c9))
- CommandsManager: Manager for commands ([37b1417](https://github.com/Sheweny/framework/commit/37b1417f42027a6bc0f09109c0ea0c7a381a8ccc))
- ButtonsManager: Manager for buttons ([37b1417](https://github.com/Sheweny/framework/commit/37b1417f42027a6bc0f09109c0ea0c7a381a8ccc))
- SelectMenusManager: Manager for select-menus ([37b1417](https://github.com/Sheweny/framework/commit/37b1417f42027a6bc0f09109c0ea0c7a381a8ccc))
- InhibitorsManager: Manager for inhibitors ([37b1417](https://github.com/Sheweny/framework/commit/37b1417f42027a6bc0f09109c0ea0c7a381a8ccc))
- ApplicationPermissions: Add permissions on CommandsManager ([5c870b1](https://github.com/Sheweny/framework/commit/5c870b129894a0058f5edda7fb844ff0feb8a1fe))

### Changed

- Handlers are changed to Managers
- Collections are moved to `ShewenyClient.collections` ([f9aef8f](https://github.com/Sheweny/framework/commit/f9aef8fa27032e8d71a921dd4e3d3ba0ff8b8c85))

### Removed

- ButtonsHandler has been removed ([37b1417](https://github.com/Sheweny/framework/commit/37b1417f42027a6bc0f09109c0ea0c7a381a8ccc))
- InhibitorsHandler has beed removed ([37b1417](https://github.com/Sheweny/framework/commit/37b1417f42027a6bc0f09109c0ea0c7a381a8ccc))
- SelectMenusHandler has been removed ([37b1417](https://github.com/Sheweny/framework/commit/37b1417f42027a6bc0f09109c0ea0c7a381a8ccc))
- EventsHandler has beed removed ([37b1417](https://github.com/Sheweny/framework/commit/37b1417f42027a6bc0f09109c0ea0c7a381a8ccc))
- ApplicationCommandsHandler has been removed ([37b1417](https://github.com/Sheweny/framework/commit/37b1417f42027a6bc0f09109c0ea0c7a381a8ccc))
- MessageCommandHandler has beed removed ([37b1417](https://github.com/Sheweny/framework/commit/37b1417f42027a6bc0f09109c0ea0c7a381a8ccc))

# [[1.0.0]](https://github.com/Sheweny/framework/releases/tag/1.0.0-beta.3) - August 29, 2021

### Added

- Structures
- Handlers
- Client
- Errors management
