# Changelog of V3 🚀

## [[3.3.4]](https://github.com/Sheweny/framework/compare/3.3.3...3.3.4) - February 26, 2022

### Fixed

- Buttons : Fix regex match for global flag ([639de8a](https://github.com/Sheweny/framework/commit/639de8a1de857e93137a2e770e3ec66a3ac9526e)).
- SelectMenus Fix regex match for global flag ([ff10711](https://github.com/Sheweny/framework/commit/ff10711716a58594ca77b80d2504b4ab2534240a)).

## [[3.3.3]](https://github.com/Sheweny/framework/compare/3.3.2...3.3.3) - February 12, 2022

### Fixed

- Listeners: Fix async functions for inhibitors and events (once and no once) ([33bbdf8](https://github.com/Sheweny/framework/commit/33bbdf8102277628102cbc0a73fdee5317e170cd)).

## [[3.3.2]](https://github.com/Sheweny/framework/compare/3.3.1...3.3.2) - December 22, 2021

### Fixed

- Command: Fix bug in command message argument caused by order of properties ([f23193c](https://github.com/Sheweny/framework/commit/f23193ce4e012cc1f19c8faf4b3d4e6438041811))

## [[3.3.1]](https://github.com/Sheweny/framework/compare/3.3.0...3.3.1) - December 22, 2021

### Fixed

- CommandsManager: The `default` property is now optional ([3019c2e](https://github.com/Sheweny/framework/commit/3019c2e611fcf67ccfa96f69e34cec426c9d37b2))

## [[3.3.0]](https://github.com/Sheweny/framework/compare/3.2.0...3.3.0) - December 22, 2021

### Added

- CommandManager: Add default object in options for set default values in commands ([b893913](https://github.com/Sheweny/framework/commit/b8939131a833a2b60bc06899c47d4e4dc3b14888)).
- EventsManager: Add default object in options for set default values in events ([8127b56](https://github.com/Sheweny/framework/commit/8127b568e485aea88c60c35062119fa84d3b3ba2))
- InhibitorsManager: Add default object in options for set default values in inhibitors ([8127b56](https://github.com/Sheweny/framework/commit/8127b568e485aea88c60c35062119fa84d3b3ba2))
- DevelopmentMode: Add duplicate class check ([03de4ad](https://github.com/Sheweny/framework/commit/03de4ad528777887f91442cce8cf1a190e0dfeea))

### Changed

- ShewenyClientOptions: Add default object in options for set default values in commands ([8127b56](https://github.com/Sheweny/framework/commit/8127b568e485aea88c60c35062119fa84d3b3ba2) [8127b56](https://github.com/Sheweny/framework/commit/8127b568e485aea88c60c35062119fa84d3b3ba2))

### Fixed

- Command: Fix type property, now optional ([1807dc6](https://github.com/Sheweny/framework/commit/1807dc692b2bf4b826ae24802beb7accc77c6a70))

## [[3.2.0]](https://github.com/Sheweny/framework/compare/3.1.0...3.2.0) - December 20, 2021

### Added

- Managers: Add base manager export ([4561a68](https://github.com/Sheweny/framework/commit/4561a68b3aac4a3045952a476ee868937476b670))
- Command: Add `usage` and `examples` in structure ([70dda8d](https://github.com/Sheweny/framework/commit/70dda8d379aeaca8b7c96790a0973e8588be02ad))
- Client: Add `connected` propertie ([b8bf7d1](https://github.com/Sheweny/framework/commit/b8bf7d1e49f8c4cbe5b8ad26254583dca140ecef))

### Changed

- Structures: Refactor structures ([bff12bb](https://github.com/Sheweny/framework/commit/bff12bbb623e90c191867b026a48dc7d4a431d62))

### Fixed

- Client: Fix `awaitReady()` method when the client is already loged ([b8bf7d1](https://github.com/Sheweny/framework/commit/b8bf7d1e49f8c4cbe5b8ad26254583dca140ecef))
- Managers: Fix loadAll errors display ([13f48f7](https://github.com/Sheweny/framework/commit/13f48f7352b30d181ba9a3bf83f967b947c1ee1e))

## [[3.1.0]](https://github.com/Sheweny/framework/compare/3.0.0...3.1.0) - December 11, 2021

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

## [[3.0.0]](https://github.com/Sheweny/framework/compare/2.1.0...3.0.0) - November 21, 2021

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
