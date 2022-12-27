# Changelog of V2 🚀

## [[2.1.0]](https://github.com/Sheweny/framework/compare/2.0.0...2.1.0) - September 4, 2021

### Added

- Down cast support: Add support for down casting to a specific type in commands ([84d945c](https://github.com/Sheweny/framework/commit/84d945cc21e8d8d915c83dd73360a49a659ba035))

## [[2.0.0]](https://github.com/Sheweny/framework/compare/1.0.0-beta3...2.0.0) - September 4, 2021

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
