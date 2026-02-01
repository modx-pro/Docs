# Introduction

Teleport is an extensible scripting tool for working with one or more local (non-cloud) MODX Revolution installations.

Teleport currently acts mainly as a packaging tool that extends the MODX Transport API and provides commands for extracting and injecting custom MODX site snapshots. It can easily be extended to perform many other MODX-related tasks.

## Installation

There are several ways to install Teleport. Choose one:

- [Phar][8] - The simplest way to get started is to download the [latest `teleport.phar`][11] and place it in a directory where you can run it. In this distribution, Teleport will create subdirectories `profile/` and `workspace/` to store generated **site profiles** and **extracted** transport packages. The phar distribution includes all dependencies required to use Teleport.
    ::: tip Note
    You cannot use the Teleport HTTP Server from the phar distribution; it is not included in the phar.
    :::

- [Releases][9] - You can download any Teleport release as zip or tar.gz, extract it to a directory (e.g. `~/teleport/`), and run `composer install` there to install dependencies. Project releases are [available here](https://github.com/modxcms/teleport/releases).

- [Git Clone][10] - Developers can clone the teleport repository from GitHub and run `composer install --dev` in the project directory to install dependencies, including those in the require-dev section of [`composer.json`](https://github.com/modxcms/teleport/blob/master/composer.json).

## Usage

### Commands

You interact with Teleport by running **commands** with optional arguments.

Teleport provides the following **commands**:

- [Profile][1] - **Generate a JSON profile** of a MODX site for use by other commands.

- [Extract][2] - **Extract** files, data, and/or other artifacts defined in an [extract template (extract tpl)](https://github.com/modxcms/teleport/blob/master/doc/use/extract/tpl.md) from a MODX site and pack them into a transport package that can later be injected into another MODX site.

- [Inject][3] - **Inject** a transport package produced by Teleport Extract into a MODX site using a given **profile**.

- [Push][4] - Send a file (source) to a destination.

- [UserCreate][5] - Create a user in a MODX site according to a given **profile**.

- [Packages/GC][6] - Remove outdated package versions from a MODX site according to a given **profile**.

- [Workspace/GC][7] - Clean the contents of the workspace/ directory in the Teleport working folder.

### CLI usage

The simplest way to use Teleport is to run its commands from a Bash shell. See the command documentation for required and optional parameters.

### Teleport HTTP Server

Teleport (except the phar build) includes a [custom HTTP server](https://github.com/modxcms/teleport/blob/master/doc/use/server.md) built on [ReactPHP](http://reactphp.org/) that can run on any port. This lets you run Teleport commands over HTTP, avoiding timeouts and other issues that can occur with long-running processes on typical web server setups.

## Extending Teleport

Teleport can be extended in several ways. For best results, create your own project that uses Teleport as a library and keep your custom extensions under version control.

The easiest way to start a custom Teleport project is Composer's create-project command using the modxcms/teleport-project boilerplate:

```shell
php composer.phar create-project --prefer-source --stability=dev modxcms/teleport-project teleport-opengeek/
```

See the [GitHub project](https://github.com/modxcms/teleport-project "Teleport boilerplate project") for more on using the boilerplate.

### Custom extract templates

The Teleport [Extract command](https://github.com/modxcms/teleport/blob/master/doc/use/extract.md) uses JSON [extract templates (extract tpl)](https://github.com/modxcms/teleport/blob/master/doc/use/extract/tpl.md) to define how a transport package is built from MODX site resources/objects. You can create your own templates for backups, custom packages, add-ons, or development workflows. See [Creating custom extract templates (Extract Tpls)](https://github.com/modxcms/teleport/blob/master/doc/extend/custom-extract-tpls.md) for details.

### Custom Teleport commands

In development

## Contribute

We welcome all contributions to the Teleport application and library. [Learn more][12] about the variety of ways you can contribute and how.

[1]: https://github.com/modxcms/teleport/blob/master/doc/use/profile.md
[2]: https://github.com/modxcms/teleport/blob/master/doc/use/extract.md
[3]: https://github.com/modxcms/teleport/blob/master/doc/use/inject.md
[4]: https://github.com/modxcms/teleport/blob/master/doc/use/push.md
[5]: https://github.com/modxcms/teleport/blob/master/doc/use/user-create.md
[6]: https://github.com/modxcms/teleport/blob/master/doc/use/packages/gc.md
[7]: https://github.com/modxcms/teleport/blob/master/doc/use/workspace/gc.md
[8]: https://github.com/modxcms/teleport/tree/master/doc/doc/install/phar.md
[9]: https://github.com/modxcms/teleport/tree/master/doc/install/releases.md
[10]: https://github.com/modxcms/teleport/tree/master/doc/install/git-clone.md
[11]: http://modx.s3.amazonaws.com/releases/teleport/teleport.phar
[12]: https://github.com/modxcms/teleport/blob/master/doc/contribute.md
