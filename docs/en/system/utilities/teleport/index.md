# Teleport

Teleport is an extensible scripting tool for working with one or more local (non-cloud) MODX Revolution installations.

Teleport currently acts mainly as a packaging tool that extends MODX's Transport API and provides commands to extract and inject custom MODX site snapshots. It can be extended to perform many other MODX-related tasks.

## Requirements

To use Teleport, your environment must meet at least:

- PHP >= 5.4
- MODX Revolution >= 2.1 (MySQL)

You must be able to run PHP via the CLI SAPI.

::: tip Note
Currently, all Teleport extract templates support only MySQL MODX Revolution installations.
:::

On Linux with the PHP POSIX extension you can use advanced user-switching features.

Teleport aims to be cross-platform and works on Linux and OS X. Windows support is currently unknown; Windows developers are welcome to contribute.

## Installation

There are several ways to install Teleport. The simplest is the PHAR distribution.

::: warning
With any installation method, run Teleport as the same user that runs PHP for the web server. Otherwise your MODX site can be damaged by injected and/or cached files with wrong ownership.
:::

### Download and install Phar

Create a working directory for Teleport and go to it:

```shell
mkdir ~/teleport/ && cd ~/teleport/
```

Download the latest [teleport.phar][1] into your Teleport directory.

Create a MODX site **Profile**:

```shell
php teleport.phar --action=Profile --name="MyMODXSite" --code=mymodxsite --core_path=/path/to/mysite/modx/core/ --config_key=config
```

**Extract a snapshot** of the MODX site you just _profiled_:

```shell
php teleport.phar --action=Extract --profile=profile/mymodxsite.profile.json --tpl=phar://teleport.phar/tpl/develop.tpl.json
```

### Other installation methods

You can install Teleport from source using [Composer][9]. See [git clone][7] or [release archive][8] for more.

::: warning
If you want to use the Teleport HTTP Server you cannot use the Phar distribution. You must use one of the other installation methods.
:::

### Teleport in your PATH

With any installation you can create an executable symlink named **teleport** pointing to bin/teleport or to teleport.phar. Then you can run `teleport` instead of `bin/teleport` or `php teleport.phar`.

## Basic usage

Use the command that matches your installation (e.g. `bin/teleport` from source, or `teleport` if you use a symlink). The examples below assume the teleport.phar distribution.

::: warning
**Before** using Teleport on a MODX site you must **create a Teleport Profile** from that site.
:::

### Creating a MODX site profile

Create a Teleport Profile for any existing MODX site with:

```shell
php teleport.phar --action=Profile --name="MySite" --code=mysite --core_path=/path/to/mysite/modx/core/ --config_key=config
```

The resulting file will be at `profile/mysite.profile.json` and can be used for Extract or Inject on another site.

See [Teleport Profiles][2] for details.

### Extracting a MODX site snapshot

Extract a Teleport snapshot from a MODX site with:

```shell
php teleport.phar --action=Extract --profile=profile/mysite.profile.json --tpl=phar://teleport.phar/tpl/develop.tpl.json
```

On success the snapshot will be in `workspace/`.

You can also extract and push to a destination with:

```shell
php teleport.phar --action=Extract --profile=profile/mysite.profile.json --tpl=phar://teleport.phar/tpl/develop.tpl.json --target=s3://mybucket/snapshots/ --push
```

In both cases the absolute path to the snapshot is printed; you can use it as the source for Inject.

::: warning
The workspace copy is removed after push unless you pass `--preserveWorkspace` to the CLI command.
:::

See [Teleport Extract][3] for details.

### Injecting a snapshot into a MODX site

Inject a Teleport snapshot from any valid source into a MODX site with:

```shell
php teleport.phar --action=Inject --profile=profile/mysite.profile.json --source=workspace/mysite_develop-120315.1106.30-2.2.1-dev.transport.zip
```

::: warning
If the source is not in `workspace/` a copy will be pulled there and then removed after the inject unless you pass `--preserveWorkspace`.
:::

See [Teleport Inject][5] for details.

### Creating a user

Create a user on the profiled MODX site with:

```shell
php teleport.phar --action=UserCreate --profile=profile/mysite.profile.json --username=superuser --password=password --sudo --active --fullname="Test User" --email=testuser@example.com
```

::: warning
This uses the site's `security/user/create` processor from the given profile and accepts all parameters that processor accepts.
:::

See [Teleport UserCreate][4] for details.

## Getting started

Read more on [how to use Teleport][6].

## License

Teleport is Copyright (c) MODX, LLC

See the "LICENSE" file distributed with this code for full copyright and license information.

[1]: http://modx.s3.amazonaws.com/releases/teleport/teleport.phar
[2]: https://github.com/modxcms/teleport/blob/master/doc/use/profile.md
[3]: https://github.com/modxcms/teleport/blob/master/doc/use/extract.md
[4]: https://github.com/modxcms/teleport/blob/master/doc/use/user-create.md
[5]: https://github.com/modxcms/teleport/blob/master/doc/use/inject.md
[6]: /en/system/utilities/teleport/usage
[7]: https://github.com/modxcms/teleport/blob/master/doc/doc/install/git-clone.md
[8]: https://github.com/modxcms/teleport/blob/master/doc/doc/install/releases.md
[9]: http://getcomposer.org/
