# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

## [[3.0.0]](https://github.com/Sheweny/framework/compare/2.1.0...3.0.0) - 2021-11-21

### Added

- ShewenyClientOptions: Add `autoRegisterApplicationCommand` option ([#d998836](https://github.com/Sheweny/framework/commit/d99883681d13038ecd03a639f6ab1a5e2173e691))
- Command: Add autocomplete management ([#66dd982](https://github.com/Sheweny/framework/commit/66dd982d7d8003679e1f0930f5f835478cc8c647))
- Event: Set emitter of event ([#bdc6b1e](https://github.com/Sheweny/framework/commit/bdc6b1e43a11329ff3487b213290785f467b9881))

### Changed

- ShewenyClientOptions: Changed `handlers` to `managers` ([#f648056](https://github.com/Sheweny/framework/commit/f648056126b72e727b33c6697e2ce4d74afdcdd4))
- ShewenyClient: The `util` property now return a ClientUtil instance ([#f106045](https://github.com/Sheweny/framework/commit/f106045764670ca2fd1b47a9b695e28f28e9b4af))
- CommandsManagerOptions: Property `guildId` now support an array ([#673c735](https://github.com/Sheweny/framework/commit/673c735ee61a9f984dba50c8ed4e789cf8e6db64))
- CommandsManager: Change parameters ([#9a451aa](https://github.com/Sheweny/framework/commit/9a451aac35ffd04dbf11fa30e1859c28d47c2b5b))
- ButtonsManager: Change parameters ([#9a451aa](https://github.com/Sheweny/framework/commit/9a451aac35ffd04dbf11fa30e1859c28d47c2b5b))
- SelectMenusManager: Change parameters ([#9a451aa](https://github.com/Sheweny/framework/commit/9a451aac35ffd04dbf11fa30e1859c28d47c2b5b))
- InhibitorsManager: Change parameters ([#9a451aa](https://github.com/Sheweny/framework/commit/9a451aac35ffd04dbf11fa30e1859c28d47c2b5b))
- EventsManager: Change parameters ([#9a451aa](https://github.com/Sheweny/framework/commit/9a451aac35ffd04dbf11fa30e1859c28d47c2b5b))

## [[2.1.0]](https://github.com/Sheweny/framework/compare/2.0.0...2.1.0) - 2021-09-04

### Added

- Down cast support: Add support for down casting to a specific type in commands ([#84d945c](https://github.com/Sheweny/framework/commit/84d945cc21e8d8d915c83dd73360a49a659ba035))

## [[2.0.0]](https://github.com/Sheweny/framework/compare/1.0.0-beta3...2.0.0) - 2021-09-04

### Added

- ShewenyClientOptions: `joinThreadsOnCreate` option ([#205220d](https://github.com/Sheweny/framework/commit/205220d832d9c300dc00e7c3785c12b9d69aa918))
- ShewenyClientOptions: `mode` option ([#66](https://github.com/Sheweny/framework/pull/66)) ([#2c40bba](https://github.com/Sheweny/framework/commit/2c40bba534878647c65f710e68bfa63a0a75d7c9))
- CommandsManager: Manager for commands ([#37b1417](https://github.com/Sheweny/framework/commit/37b1417f42027a6bc0f09109c0ea0c7a381a8ccc))
- ButtonsManager: Manager for buttons ([#37b1417](https://github.com/Sheweny/framework/commit/37b1417f42027a6bc0f09109c0ea0c7a381a8ccc))
- SelectMenusManager: Manager for select-menus ([#37b1417](https://github.com/Sheweny/framework/commit/37b1417f42027a6bc0f09109c0ea0c7a381a8ccc))
- InhibitorsManager: Manager for inhibitors ([#37b1417](https://github.com/Sheweny/framework/commit/37b1417f42027a6bc0f09109c0ea0c7a381a8ccc))
- ApplicationPermissions: Add permissions on CommandsManager ([#5c870b1](https://github.com/Sheweny/framework/commit/5c870b129894a0058f5edda7fb844ff0feb8a1fe))

### Changed

- Handlers are changed to Managers
- Collections are moved to `ShewenyClient.collections` ([#f9aef8f](https://github.com/Sheweny/framework/commit/f9aef8fa27032e8d71a921dd4e3d3ba0ff8b8c85))

### Removed

- ButtonsHandler has been removed ([#37b1417](https://github.com/Sheweny/framework/commit/37b1417f42027a6bc0f09109c0ea0c7a381a8ccc))
- InhibitorsHandler has beed removed ([#37b1417](https://github.com/Sheweny/framework/commit/37b1417f42027a6bc0f09109c0ea0c7a381a8ccc))
- SelectMenusHandler has been removed ([#37b1417](https://github.com/Sheweny/framework/commit/37b1417f42027a6bc0f09109c0ea0c7a381a8ccc))
- EventsHandler has beed removed ([#37b1417](https://github.com/Sheweny/framework/commit/37b1417f42027a6bc0f09109c0ea0c7a381a8ccc))
- ApplicationCommandsHandler has been removed ([#37b1417](https://github.com/Sheweny/framework/commit/37b1417f42027a6bc0f09109c0ea0c7a381a8ccc))
- MessageCommandHandler has beed removed ([#37b1417](https://github.com/Sheweny/framework/commit/37b1417f42027a6bc0f09109c0ea0c7a381a8ccc))

## [1.0.0] - 2021-08-29

### Added

- Structures
- Handlers
- Client
- Errors management
