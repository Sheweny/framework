# @Sheweny/markdown

This module provides utilities functions for manipulate markdown with discord.

## Getting started

### Installation

With npm :

```shell-session
npm install @discord-util/markdown
```

With yarn :

```shell-session
yarn add @discord-util/markdown
```

### Import module

CommonJS syntax :

```js
const {
  MarkdownBuild,
  MarkdownParser,
  MarkdownEscaper,
} = require("@discord-util/markdown");
```

Module ES syntax :

```js
import {
  MarkdownBuild,
  MarkdownParser,
  MarkdownEscaper,
} from "@discord-util/markdown";
```

## [static] MarkdownBuild#bold(text)

Return text formatted with bold

Params :

- text : The text to formatted (string)

Return :

The text formatted (string)

```js
console.log(MarkdownBuild.bold("Hello world"));
```

## [static] MarkdownBuild#italic(text)

Return text formatted with italic

Params :

- text : The text to formatted (string)

Return :

The text formatted (string)

```js
console.log(MarkdownBuild.italic("Hello world"));
```

## [static] MarkdownBuild#underline(text)

Return text formatted with underline

Params :

- text : The text to formatted (string)

Return :

The text formatted (string)

```js
console.log(MarkdownBuild.underline("Hello world"));
```

## [static] MarkdownBuild#strikethrough(text)

Return text formatted with strikethrough

Params :

- text : The text to formatted (string)

Return :

The text formatted (string)

```js
console.log(MarkdownBuild.strikethrough("Hello world"));
```

## [static] MarkdownBuild#code(text)

Return text formatted with code

Params :

- text : The text to formatted (string)

Return :

The text formatted (string)

```js
console.log(MarkdownBuild.code("Hello world"));
```

## [static] MarkdownBuild#codeBlock(text, lang)

Return text formatted with codeBlock

Params :

- text : The text to formatted (string)

- lang : The language/syntax namz, default: "" 

Return :

The text formatted (string)

```js
console.log(MarkdownBuild.codeBlock("console.log('Hello world')", "js");
```

## [static] MarkdownBuild#quote(text)

Return text formatted with quote

Params :

- text : The text to formatted (string)

Return :

The text formatted (string)

```js
console.log(MarkdownBuild.quote("Hello world"));
```

## [static] MarkdownBuild#quoteBlock(text)

Return text formatted with quoteBlock

Params :

- text : The text to formatted (string)

Return :

The text formatted (string)

```js
console.log(MarkdownBuild.quoteBlock("Hello world"));
```

## [static] MarkdownBuild#spoiler(text)

Return text formatted with codeBlock

Params :

- text : The text to formatted (string)

Return :

The text formatted (string)

```js
console.log(MarkdownBuild.spoiler("Hello world"));
```

## [static] MarkdownEscaper#bold(text)

Return text with bold escaped.

Params :

- text : The text to escaped (string)

Return :

The text escaped (string)

```js
console.log(MarkdownEscaper.bold("Hello world"));
```

## [static] MarkdownEscaper#italic(text)

Return text with italic escaped.

Params :

- text : The text to escaped (string)

Return :

The text escaped (string)

```js
console.log(MarkdownEscaper.italic("Hello world"));
```

## [static] MarkdownEscaper#underline(text)

Return text with underline escaped.

Params :

- text : The text to escaped (string)

Return :

The text escaped (string)

```js
console.log(MarkdownEscaper.underline("Hello world"));
```

## [static] MarkdownEscaper#spoiler(text)

Return text with spoiler escaped.

Params :

- text : The text to escaped (string)

Return :

The text escaped (string)

```js
console.log(MarkdownEscaper.spoiler("Hello world"));
```

## [static] MarkdownEscaper#codeBlock(text)

Return text with code block escaped.

Params :

- text : The text to escaped (string)

Return :

The text escaped (string)

```js
console.log(MarkdownEscaper.codeBlock("Hello world"));
```

## [static] MarkdownEscaper#inlineCode(text)

Return text with inline code escaped.

Params :

- text : The text to escaped (string)

Return :

The text escaped (string)

```js
console.log(MarkdownEscaper.inlineCode("Hello world"));
```

## [static] MarkdownEscaper#strikethrough(text)

Return text with bold escaped.

Params :

- text : The text to strikethrough (string)

Return :

The text escaped (string)

```js
console.log(MarkdownEscaper.strikethrough("Hello world"));
```

## [static] MarkdownParser#emoji(text)

Return id of emojis.

Params :

- text : The text to parsed (string)

Return :

An object with name and if of emoji and if is animated

```js
console.log(MarkdownParser.emoji("Hello world <a:name:0000>"));
```

## [static] MarkdownParser#channel(text)

Return id of channels.

Params :

- text : The text to parsed (string)

Return :

An array of id of channels (Array\<string>)

```js
console.log(MarkdownParser.channel("Hello world <#0000000>"));
```

## [static] MarkdownParser#role(text)

Return id of roles.

Params :

- text : The text to parsed (string)

Return :

An array of id of roles (Array\<string>)

```js
console.log(MarkdownParser.role("Hello world <@&000000>"));
```

## [static] MarkdownParser#guildEmoji(text)

Return id of emojis.

Params :

- text : The text to parsed (string)

Return :

An array of id of emojis (Array\<string>)

```js
console.log(MarkdownParser.guildEmoji("Hello world <a:name:0000>"));
```

## [static] MarkdownParser#user(text)

Return id of users.

Params :

- text : The text to parsed (string)

Return :

An array of id of users (Array\<string>)

```js
console.log(MarkdownParser.user("Hello world <@0000000>"));
```

## [static] MarkdownParser#userNickname(text)

Return id of users.

Params :

- text : The text to parsed (string)

Return :

An array of id of users (Array\<string>)

```js
console.log(MarkdownParser.user("Hello world <@0000000>"));
```
