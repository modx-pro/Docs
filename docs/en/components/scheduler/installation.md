# Installation and run setup

Scheduler installs from the modstore.pro or modmore.com repository, or can be built from source — [modx-pro/Scheduler](https://github.com/modx-pro/Scheduler). After installing the package one required step remains — the cron job: it is what runs the deferred tasks.

Requirements: MODX 2 or MODX 3, PHP 7.4 or newer.

## Installing the package {#install}

1. Connect a repository: [modstore.pro](https://modstore.pro/info/connection) or [modmore.com](https://modmore.com/about/package-provider/) — the latter has [its own instructions](https://modmore.com/extras/scheduler/download/).
2. Open the package installer, pick the connected provider, find Scheduler and install it.

For a long time the component had two lines of development: the modmore original and a fork carrying the MODX 3 fixes. Version 1.9.0 merged them, and the modstore.pro build is maintained in [modx-pro/Scheduler](https://github.com/modx-pro/Scheduler).

## The cron job {#cron}

The file to run is always the same; how you register the job depends on your server:

```shell
php /home/server/user/path/to/assets/components/scheduler/run.php
```

Replace `php` with the version the site runs on: hosts usually expose separate commands such as `php8.2`, or a full path to the interpreter.

An entry that runs every minute — five schedule fields, then the command:

```console
* * * * * php8.2 ~/www/assets/components/scheduler/run.php
```

### How often to run it {#frequency}

- A few tasks a week — every 5 minutes is enough.
- Background email or near-real-time processing — every minute.

Cron does not run more often than once a minute. To avoid waiting for the next pass, call `run.php` yourself — see [Running over HTTP](#run-over-http).

A single pass picks up the runs whose time has already come, and no more of them than `scheduler.tasks_per_run` allows — one by default. With an empty queue a pass does nothing: calling `run.php` will not start a task whose time has not arrived yet.

Long tasks — those that take longer than the interval between passes — are better spread over more frequent passes than over more runs per pass. Concurrent passes do not collide: a run is claimed atomically, and the pass that lost the race simply takes the next one.

Tasks started from cron execute in the `mgr` context: `run.php` includes the core connector, and without a `ctx` parameter that is the context it boots. Scheduler never switches contexts, so a task that needs site links and resources has to call `$modx->switchContext('web')` itself.

## System settings {#settings}

The settings live in the MODX system settings, under the `scheduler` namespace.

| Setting | Default | Description |
| --- | --- | --- |
| `scheduler.tasks_per_run` | `1` | How many runs a single cron pass picks up |
| `scheduler.recurring_on_failure` | off | Schedule the next run of a recurring task even after a failed one. While it is off, the cycle stops at the first error — retries, however, run regardless of this setting |
| `scheduler.delete_tasks_after` | empty | Remove finished runs older than the given cut-off. A string for `strtotime()`, for example `-1 year`. Empty — nothing is removed |
| `scheduler.email_failure` | empty | Comma-separated addresses for failure emails. Empty — no emails are sent |
| `scheduler.email_failure_subject` | empty | Email subject. Empty — the built-in one: `Error running <namespace> :: <reference>` |
| `scheduler.email_failure_tpl` | empty | Name of the chunk for the email body. Empty — the built-in template |

History cleanup does not happen on every pass: `run.php` takes it on when the minute of the run divides by 30. It follows that with a schedule which never lands on minute 0 or 30 — every 7 minutes, or hourly at :15 — the cleanup never happens at all. Both successful and failed runs are removed.

The email is sent as HTML, with the system `emailsender` as the sender. These placeholders are available in the subject and in the chunk:

| Placeholder | What is inside |
| --- | --- |
| `task_namespace`, `task_reference` | The namespace and the reference of the task — same as its fields |
| `task_description` | The task description |
| `run_id` | Id of the failed run |
| `run_message` | The value the task returned |
| `run_errors` | The array of error records as it is stored on the run |
| `run_errors_formatted` | The same array passed through `print_r()` — a string ready for the email |
| `run_retry_count` | The retry number; `0` means the first run |
| `site_name`, `site_url` | Site system settings |
| `executed_on` | Run time in `Y-m-d H:i:s` format |

The built-in template is not a chunk — the email is assembled in the task's code, so a custom chunk is easier to write from scratch, using the table above.

## Running over HTTP {#run-over-http}

```text
https://yoursite.com/assets/components/scheduler/run.php?ctx=web
```

Use this URL when a task has to run immediately, without waiting for the next cron pass, or when an external service triggers the run.

The `ctx` parameter picks the context MODX boots into: `run.php` includes the core connector, and without the parameter that connector initialises the `mgr` context. Tasks that work with site resources and links need `ctx=web`.

The URL carries no protection: `run.php` has no key and no permission check. Anyone who knows it can trigger a pass. All it can execute is what is already queued, but it can still create load — close the URL at the web server level if that is a concern.

::: warning Do not use HTTP as the regular trigger
The web server handles the request and almost always has memory and execution time limits — a long or heavy task will fail. Those limits do not apply to a real cron job on the server.
:::
