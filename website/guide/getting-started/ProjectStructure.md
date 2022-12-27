# Project structure

Create a directory in which the bot will be.

Install dependencies and create configuration file (usually called `config.json`)

Create a folder with the code of the bot (usualy called `src`)

In source directory create `index.js` file in which will be the client's declaration.

## Commands

Create directory for the commands (usually called `commands`).

## Events

Create directory for the events (usually called `events` or `listeners`).

## Interactions

Create directory for the buttons and select-menus (usually called `interactions`).

### Buttons

Create directory for the buttons (usually called `buttons`).

### Select-menus

Create directory for the select-menus (usually called `select-menus`).

---

::: tip
Folders can contain as many sub-folders as desired
:::

## Final structure

The final structure of the bot :

```text
bot
   │   config.json
   │   package-lock.json
   │   package.json
   │
   ├───node_modules
   └───src
       │   index.js
       │
       ├───commands
       ├───events
       └───interactions
           ├───buttons
           └───select-menus
```
