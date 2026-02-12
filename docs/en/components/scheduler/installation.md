# Installation and cron setup

Scheduler can be installed via the modmore.com or modstore.pro package provider, or from Github. After installing the package, configure a single cron job so the scheduler runs and can execute the tasks you add.

## Installation via modstore.pro {#modstore}

- [Connect our repository](https://modstore.pro/info/connection)
- Select the component provider, find Scheduler and install it

## Installation via modMore {#modmore}

- [Connect the modmore.com repository](https://modmore.com/about/package-provider/), following the [instructions](https://modmore.com/extras/scheduler/download/)
- Select the component provider, find Scheduler and install it

## Configure a cron job {#cron}

To run scheduled tasks you need one cron job. How often it runs depends on what you schedule and how frequently. If you only run a task a few times a week, running every 5 minutes may be enough. If you use it for background email or near-real-time processing, you may want it to run every minute.
Cron cannot run more than once per minute. You can also trigger the URL manually.
By default the scheduler runs only one task per run. You can change how many tasks run per execution with the system setting `scheduler.tasks_per_run` if you have many tasks. For long-running tasks, increase the cron frequency rather than the number of tasks per run.
Cron setup depends on your server; add a command like:

```shell
php7.4 /home/server/user/path/to/assets/components/scheduler/run.php
```

Example for running every minute in MODHOST cron:

```console
**** * php7.4 ~/www/assets/components/scheduler/run.php
```

## Running via HTTP {#run-over-http}

If you need to run a task immediately without waiting, or use external triggers, call (including the ctx parameter): `https://yoursite.com/assets/components/scheduler/run.php?ctx=web`.

Running the scheduler via HTTP is not recommended. The web server handles the request and usually has memory and execution time limits, which can cause long or heavy tasks to fail.

These limits do not apply when the scheduler is run by a real server cron job.
