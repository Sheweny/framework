# Modal listener

With sheweny each Modal must be a class which extends from the [Modal](../../doc/structures/Modal.md) class.
Please see [modals manager](../managers/Modals) for setup the manager.

## Import Modal

Import the [Modal](../../doc/structures/Modal.md) class :

:::: code-group
::: code-group-item CommonJS

```js
const { Modal } = require("sheweny");
```

:::
::: code-group-item ESM

```js
import { Modal } from "sheweny";
```

:::
::::

## Create the Modal listner

:::: code-group
::: code-group-item JS CommonJS

```js
const { Modal } = require("sheweny");

module.exports = class ModalTest extends Modal {
  constructor(client) {
    super(client, ["mod-1", "mod-2"]);
  }

  execute(modal) {
    console.log(modal);
  }
};
```

:::
::: code-group-item TS ES Modules

```ts
import { Modal } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { ModalInteraction } from "discord.js";

export class ModalTest extends Modal {
  constructor(client: ShewenyClient) {
    super(client, ["mod-1", "mod-2"]);
  }

  execute(Modal: ModalInteraction) {
    console.log(Modal);
  }
}
```

:::
::::

## Use regular expressions with modals

You can put regular expressions in the Modal id's to match the Modal id's.

:::: code-group
::: code-group-item JS CommonJS

```js
const { Modal } = require("sheweny");

module.exports = class RegexModal extends Modal {
  constructor(client) {
    super(client, [/mod-[0-9]+/]); // Regular expression
  }

  execute(modal) {
    console.log(modal);
  }
};
```

:::
::: code-group-item TS ES Modules

```ts
import { Modal } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { ModalInteraction } from "discord.js";

export class RegexModal extends Modal {
  constructor(client: ShewenyClient) {
    super(client, [/mod-[0-9]+/]); // Regular expression
  }

  execute(Modal: ModalInteraction) {
    console.log(Modal);
  }
}
```

:::
::::

## Use "before" method on modals

It is possible to add a `before` function to execute code before checks like inhibitors etc.

:::: code-group
::: code-group-item JS CommonJS

```js
const { Modal } = require("sheweny");

module.exports = class ModalTest extends Modal {
  constructor(client) {
    super(client, ["mod-1", "mod-2"]);
  }

  before(Modal) {
    console.log("Before function");
  }

  execute(modal) {
    console.log(modal);
  }
};
```

:::
::: code-group-item TS ES Modules

```ts
import { Modal } from "sheweny";
import type { ShewenyClient } from "sheweny";
import type { ModalInteraction } from "discord.js";

export class ModalTest extends Modal {
  constructor(client: ShewenyClient) {
    super(client, ["mod-1", "mod-2"]);
  }

  before(Modal: ModalInteraction) {
    console.log("Before function");
  }

  execute(Modal: ModalInteraction) {
    console.log(Modal);
  }
}
```

:::
::::
