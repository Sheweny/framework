# Select-menu listener

With sheweny each selectMenu must be a class which extends from the [SelectMenu](../../doc/structures/SelectMenu.md) class.
Please see [selectMenus manager](../managers/selectMenus) for setup the manager.

## Import SelectMenu

Import the [SelectMenu](../../doc/structures/SelectMenu.md) class :

:::: code-group
::: code-group-item CommonJS

```js
const { SelectMenu } = require("sheweny");
```

:::
::: code-group-item ESM

```js
import { SelectMenu } from "sheweny";
```

:::
::::

## Create the select-menu listner

:::: code-group
::: code-group-item JS CommonJS

```js
const { SelectMenu } = require("sheweny");

module.exports = class SelectMenus1And2 extends SelectMenu {
  constructor(client) {
    super(client, ["select-one", "select-two"]);
  }

  execute(selectMenu) {
    console.log(selectMenu);
  }
};
```

:::
::: code-group-item TS ES Modules

```ts
import { SelectMenu } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { SelectMenuInteraction } from "discord.js";

export class SelectMenus1And2 extends SelectMenu {
  constructor(client: ShewenyClient) {
    super(client, ["select-one", "select-two"]);
  }

  execute(selectMenu: SelectMenuInteraction) {
    console.log(selectMenu);
  }
}
```

:::
::::

## Use regular expressions with select-menus

You can put regular expressions in the select-menu id's to match the select-menu id's.

:::: code-group
::: code-group-item JS CommonJS

```js
const { SelectMenu } = require("sheweny");

module.exports = class SelectRegex extends SelectMenu {
  constructor(client) {
    super(client, [/select-[0-9]+/]); // Regular expression
  }

  execute(selectMenu) {
    console.log(selectMenu);
  }
};
```

:::
::: code-group-item TS ES Modules

```ts
import { SelectMenu } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { SelectMenuInteraction } from "discord.js";

export class SelectRegex extends SelectMenu {
  constructor(client: ShewenyClient) {
    super(client, [/select-[0-9]+/]); // Regular expression
  }

  execute(selectMenu: SelectMenuInteraction) {
    console.log(selectMenu);
  }
}
```

:::
::::

## Use "before" method on select-menus

It is possible to add a `before` function to execute code before checks like inhibitors etc.

:::: code-group
::: code-group-item JS CommonJS

```js
const { SelectMenu } = require("sheweny");

module.exports = class SelectMenus1And2 extends SelectMenu {
  constructor(client) {
    super(client, ["selectMenuId1", "selectMenuId2"]);
  }

  before(selectMenu) {
    console.log("Before function");
  }

  execute(selectMenu) {
    console.log(selectMenu);
  }
};
```

:::
::: code-group-item TS ES Modules

```ts
import { SelectMenu } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { SelectMenuInteraction } from "discord.js";

export class SelectMenus1And2 extends SelectMenu {
  constructor(client: ShewenyClient) {
    super(client, ["selectMenuId1", "selectMenuId2"]);
  }

  before(selectMenu: SelectMenuInteraction) {
    console.log("Before function");
  }

  execute(selectMenu: SelectMenuInteraction) {
    console.log(selectMenu);
  }
}
```

:::
::::
