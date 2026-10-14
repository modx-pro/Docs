---
title: Scheduler
description: Scheduling deferred tasks on MODX 2 and MODX 3
categories: utilities
logo: https://modstore.pro/assets/extras/scheduler/logo.png
author: modx-pro
modstore: https://modstore.pro/packages/utilities/scheduler
compatibility:
  - modx2
  - modx3

items: [
  { text: 'Installation', link: 'installation' },
  { text: 'Creating a task', link: 'create-a-task' },
  { text: 'Scheduling a task', link: 'job-scheduling' },
  { text: 'Task development', link: 'task-development' },
]
---
# Scheduler

Scheduler is a deferred task manager: it runs in the background the work that does not need to happen right away — imports and exports, sending emails, notifications.

Package: **1.9.0-pl**, by Mark Hamstra and Bert Oost (modmore). Component page: [modstore.pro](https://modstore.pro/packages/utilities/scheduler).

## Features

- **Three task types:** a PHP file (`sFileTask`), a snippet (`sSnippetTask`), a processor (`sProcessorTask`)
- **Queueing a run from code** for any time `strtotime()` understands, with data passed into the task
- **Recurring tasks:** the `recurring` and `interval` fields — the next run is scheduled after a successful one, while a failure stops the cycle unless `scheduler.recurring_on_failure` is enabled
- **Retries on failure:** the `max_retries` and `retry_delay` fields
- **Failure emails** to the addresses in `scheduler.email_failure`, with your own subject and chunk
- **History cleanup** via `scheduler.delete_tasks_after` — how long finished runs are kept, unlimited by default
- **Triggering from cron or over HTTP**
- **Its own section in the manager:** tasks, the run queue and the execution history
- **MODX 2 and MODX 3 support**

A task (`sTask`) describes what to run and with what. A run (`sTaskRun`) is a single queueing of that task for a specific time, with its own data and result. One task can have any number of runs.

One package for two platforms — hence the classes without a namespace and the two ways of obtaining the `scheduler` service: on MODX 2 through `$modx->getService()`, on MODX 3 either that or the `$modx->services` container.

<!-- MEDIA: screenshot-admin | nice | The Scheduler page in the MODX manager: the Tasks tab with three demo tasks of different types, one of them with an interval in the Recurring column; the Scheduled Runs and Historic Runs tabs next to it and the run counters at the bottom | Test site, Extras → Scheduler: synthetic tasks with future run times, a few runs executed through run.php, the Type column enabled in the column menu; full description in media-todo.md -->

## Quick links

| Section | Description |
| --- | --- |
| [Installation and run setup](installation) | The package, the cron job, running over HTTP |
| [Creating a task](create-a-task) | Task types, fields, recurring runs and retries |
| [Scheduling a task](job-scheduling) | Queueing a run from code |
| [Task development](task-development) | Passing data, errors, returning a result |
