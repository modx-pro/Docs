# Console

Run commands from an SSH console with `php core/scheduler/artisan`.

## Executable

By default you can run commands from the console with:

```shell
php core/scheduler/artisan list
```

To run from the site root after SSH, create or use:

```shell
php artisan list
```

Create the `artisan` file (or copy it: `cp core/scheduler/artisan.example artisan`):

```shell
cat > artisan << 'EOF'
#!/usr/bin/env php
<?php
define('MODX_CRONTAB_MODE', true);
require_once __DIR__.'/core/scheduler/index.php'; // Check the path to core
$Artisan = new \Webnitros\CronTabManager\Artisan\Builder($scheduler, $argv);
$Artisan->run();
EOF
```

## Commands

#### List all commands

```shell
php artisan list
# Available commands:
#   completion               Dump the shell completion script
#   demo                     Controller demo
#   help                     Display help for a command
#   list                     List commands
#   command
#   command:create           Create a new controller.
#   schedule
#   schedule:list            List scheduled tasks
#   schedule:run             Run current tasks
#   schedule:work            Run scheduled tasks
#   support
#   support:clearlogmanager  Clear manager logs older than 2 months
```

#### Creating a command

Create an example controller with argument `arg_name`:

```shell
# --name name of the new command
php artisan command:create --name=MySuperTask

# Creates controller: CrontabControllerMySuperTask [command: php artisan mysupertask --arg_name=water]
# Controller path: /var/www/html/core/scheduler/Controllers/MySuperTask.php
```

#### Running a command

Using the example above:

```shell
php artisan mysupertask --arg_name=water

# [INFO] Hello: water <----- Our argument
```

### Command controller content

```php
<?php

/**
 * New command "php artisan mysupertask --arg_name=water"
 */
class CrontabControllerMySuperTask extends modCrontabController
{
    protected $signature = 'mysupertask {--arg_name}'; // optional arguments

    public function process()
    {
        $name = $this->getArgument('arg_name', 'world');
        $this->info('Hello: '.$name);
    }
}
```

You can change the controller `signature` to **my-super-task** so the command is available under that name:

```shell
php artisan my-super-task --arg_name=water

# [INFO] Hello: water
```

## Crontab

Cron jobs run from the commands you create; all scheduled tasks are stored in the database.

#### Adding a command to Cron

```shell
php artisan crontab:add --command=mysupertask
```

#### List of Cron jobs

See the [crontab](crontab) page.

#### Running current Cron jobs

Jobs that match the current time will run.

```shell
php artisan schedule:run
```

### Crontab time settings

In the Manager you can configure crontab timing:
[manager](http://127.0.0.1:9001/manager/?a=home&namespace=crontabmanager)
