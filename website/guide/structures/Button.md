# Button listener

With sheweny each button must be a class which extends from the [Button](../../docs/structures/Button.md) class.
Please see [buttons manager](../managers/buttons) for setup the manager.

## Import Button

Import the [Button](../../docs/structures/Button.md) class :

::: code-group

```js [Javascript CJS]
const { Button } = require('sheweny');
```

```ts [Typescript ESM]
import { Button } from 'sheweny';
```

:::

## Create the button listner

::: code-group

```js [Javascript CJS]
const { Button } = require('sheweny');

module.exports = class Btns extends Button {
  constructor(client) {
    super(client, ['btnId1', 'btnId2']);
  }

  execute(button) {
    console.log(button);
  }
};
```

```ts [Typescript ESM]
import { Button } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import type { ButtonInteraction } from 'discord.js';

export class Btns extends Button {
  constructor(client: ShewenyClient) {
    super(client, ['btnId1', 'btnId2']);
  }

  execute(button: ButtonInteraction) {
    console.log(button);
  }
}
```

:::

## Use regular expressions with buttons

You can put regular expressions in the button id's to match the button id's.

::: code-group

```js [Javascript CJS]
const { Button } = require('sheweny');

module.exports = class RegexButton extends Button {
  constructor(client) {
    super(client, [/btn-[0-9]+/]); // Regular expression
  }

  execute(button) {
    console.log(button);
  }
};
```

```ts [Typescript ESM]
import { Button } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import type { ButtonInteraction } from 'discord.js';

export class RegexButton extends Button {
  constructor(client: ShewenyClient) {
    super(client, [/btn-[0-9]+/]); // Regular expression
  }

  execute(button: ButtonInteraction) {
    console.log(button);
  }
}
```

:::

## Use "before" method on buttons

It is possible to add a `before` function to execute code before checks like inhibitors etc.

::: code-group

```js [Javascript CJS]
const { Button } = require('sheweny');

module.exports = class Btns extends Button {
  constructor(client) {
    super(client, ['btnId1', 'btnId2']);
  }

  before(button) {
    console.log('Before function');
  }

  execute(button) {
    console.log(button);
  }
};
```

```ts [Typescript ESM]
import { Button } from 'sheweny';
import type { ShewenyClient } from 'sheweny';
import type { ButtonInteraction } from 'discord.js';

export class Btns extends Button {
  constructor(client: ShewenyClient) {
    super(client, ['btnId1', 'btnId2']);
  }

  before(button: ButtonInteraction) {
    console.log('Before function');
  }

  execute(button: ButtonInteraction) {
    console.log(button);
  }
}
```

:::
