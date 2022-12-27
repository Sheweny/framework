# Usage

## Informations

The command line interface has several prefixes which are `sheweny` and `shw`, so for the following commands, you can use one of the 2 prefixes.
The help command is also at your disposal if you are too lazy to come to the guide.

```sh
sheweny --help
```

## `Create` command

To create a project, you just need to run the following command.

```sh
sheweny create [project_name]
```

Then you will have a series of questions that will allow you to refine the result of your project creation and to have a bot start that meets your expectations.
Depending on what you have answered, you will have access from the start, the creation of the project has commands, events, or interactions.

For more information, you can run the help command: `sheweny --help create`

## `Add` command

To add a template in your project with the sheweny framework, you just need to run the following command.

```sh
sheweny add
```

You have several types of template addition depending on what you want to add

- command
- event
- button
- selectmenu
- inhibitor

After choosing the type of addition, you can answer the questions that are offered to once again refine the result of adding a template.

For more information, you can run the help command: `sheweny --help add`.

## `Init` command

This command is used to initialize the Command Line Interface (CLI) with **an existing project** .

## `Version` command

This command return the version of the CLI (not the framework).

---

After having done all this, you can of course edit the project code as you wish with an editor, using the rest of the Guide or with the Documentation.

## Common errors

### Execution Policy

If you have an error :

```sh
File cannot be loaded because the execution of scripts is disabled on this system. Please see "get-help about_signing" for more details
```

Changed script execution parameter. On an administrator powershell, you can do this by running the following command:

```sh
Set-ExecutionPolicy Unrestricted
```
