# Scheduling a task

The `schedule()` method of a task object queues a run. The task (`sTask`) itself is created once — by a build script, a package installer or in the manager: [Creating a task](create-a-task).

```php
<?php
$path = $modx->getOption('scheduler.core_path', null, $modx->getOption('core_path') . 'components/scheduler/');
$scheduler = $modx->getService('scheduler', 'Scheduler', $path . 'model/scheduler/');
if (!($scheduler instanceof Scheduler)) {
    return 'Could not get the Scheduler service.';
}

// Namespace "mycmp", task reference "dosomething"
$task = $scheduler->getTask('mycmp', 'dosomething');

if ($task instanceof sTask) {
    $run = $task->schedule('+10 minutes', [
        'client' => 15,
    ]);
}
```

`getTask()` looks the task up by the namespace and reference pair, or by a numeric id, and returns `null` when there is none. That is why the `instanceof` check in the example is not a formality: without it the `schedule()` call would hit `null`.

**Two ways to get the service.** `getService()` works on both MODX 2 and MODX 3 — the simplest option for either platform. On MODX 3 the service is already registered when the namespace loads, so there you take it from the container: `$modx->services->get('scheduler')`. The component itself picks the way by platform version:

```php
if ((int) $modx->version['version'] === 2) {
    $path = $modx->getOption('core_path') . 'components/scheduler/model/scheduler/';
    $scheduler = $modx->getService('scheduler', 'Scheduler', $path);
} else {
    $scheduler = $modx->services->get('scheduler');
}
```

## schedule() arguments

```php
$task->schedule($when, array $data = [], string $task_key = '');
```

| Argument | Purpose |
| --- | --- |
| `$when` | When to run: a UNIX timestamp or a string for `strtotime()` — `+10 minutes`, `+14 days`, `2026-12-31 23:00` |
| `$data` | An array the task receives as `$scriptProperties` |
| `$task_key` | An arbitrary run label, up to 128 characters. It drives no logic: you use it to find the run on the Scheduled Runs tab in the manager, and it carries over into retries |

The method creates an `sTaskRun` object and returns it — or `false` if the run could not be saved.

```php
$run = $task->schedule('+1 hour', ['order' => 42], 'order-42-reminder');

if ($run === false) {
    $modx->log(modX::LOG_LEVEL_ERROR, 'Could not queue the run');
}
```

## What happens to the run next

A run waits for its time with the Scheduled status. A cron pass moves it to Executing, and on completion to Success or Failure. The task itself decides the outcome: see [Task development](task-development). The run is not necessarily picked up by the first pass after its due time: a pass takes no more runs than `scheduler.tasks_per_run` allows, so with a long queue it waits.

What makes a task recurring is its own `recurring` field. For such a task the next run is queued after a successful one, using `interval` — the same kind of `strtotime()` string as `$when`. After a failed run the cycle stops unless `scheduler.recurring_on_failure` is enabled ([System settings](installation#settings)); with it the next run is queued after the same interval.

Retries are a different mechanism, and the recurrence setting does not govern them. If the task has `max_retries`, a failed run is repeated: a **new** run with the same data is queued `retry_delay` seconds later, and so on until the attempts run out. A successful attempt counts as a successful run, so the cycle of a recurring task resumes from it. The task fields are described in [Creating a task](create-a-task).

<!-- MEDIA: diagram | must | Run lifecycle: Scheduled → Executing → Success or Failure; after a success the next run of a recurring task is queued after `interval`, after a failure only if `scheduler.recurring_on_failure` is enabled; retries with `max_retries` set do not depend on that setting | Draw from the text of this section, only its states and transitions, without status constants and without cron-pass internals; state labels in both languages; full description in media-todo.md -->
