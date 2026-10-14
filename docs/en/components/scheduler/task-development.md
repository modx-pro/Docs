# Task development

A task's code is an ordinary PHP file, a snippet or a processor. What is available inside each type is covered in [Creating a task](create-a-task#tasktypes).

## Passing data {#task-data}

The data from the second argument of `schedule()` reaches the task as `$scriptProperties`. Read it through `getOption()` — it falls back to a default when the key is missing:

```php
$clientId = $modx->getOption('client', $scriptProperties, 0);
```

In a snippet `$scriptProperties` also holds `task` and `run` — the task and run objects. In a processor you get them through `$this->getProperty('task')` and `$this->getProperty('run')`.

## Returning a result {#return}

Return a string from the task — it is stored in the run's `message` field and shown in the manager. Return JSON when the structure matters:

```php
return json_encode(['processed' => $count], JSON_UNESCAPED_UNICODE);
```

`echo` and `print` are not captured: whatever you print goes to the cron output rather than to the run, so they are no good for reporting the work done. The result is visible in the manager, on the Historic Runs tab.

A processor task assembles its result differently: `message` receives the message from the processor's response, and you do not return a string yourself.

## Errors {#errors}

A run counts as failed when it holds at least one error record. `addError()` adds one: the first argument is the error type, the second an array of details. Returning `false` does not affect the status. A processor task takes a different road: the field errors from the processor's response are carried over into the run, one record per field.

```php
if (empty($scriptProperties['client'])) {
    $run->addError('missing_client', [
        'data' => $scriptProperties,
    ]);

    return 'No client id was passed';
}
```

**Scheduler catches exceptions itself.** An uncaught `Exception` or `Error` gives the run an error whose type is the exception's class name. The details hold the keys `exception` (the message), `code`, `file`, `line` and `trace`. The cron pass is not interrupted and picks up the next run. There is no need to wrap a whole task in `try/catch` — only when you want to handle the failure your own way.

A killed process, however, is not tracked: if a PHP timeout, an out-of-memory or an `exit` takes the task down, the run stays in the Executing status — it will neither finish nor fail. Nothing resets such runs automatically; in the manager they show up in the Executing counter.

## Run statuses and fields

A run has four statuses. The current one lives in the `status` field, as a number:

| Status | Constant | Value | When |
| --- | --- | --- | --- |
| Scheduled | `sTaskRun::STATUS_SCHEDULED` | `0` | The run is queued and waiting for its time |
| Executing | `sTaskRun::STATUS_EXECUTING` | `1` | A cron pass has picked the run up |
| Success | `sTaskRun::STATUS_SUCCESS` | `2` | The task finished and added no errors |
| Failure | `sTaskRun::STATUS_FAILURE` | `3` | The run holds an error record |

What else a run carries:

| Field | Contents |
| --- | --- |
| `task` | Id of the task the run belongs to |
| `timing` | When to run — the timestamp from the first argument of `schedule()`, rounded to the minute |
| `data` | The array passed to `schedule()` — the same as `$scriptProperties` |
| `message` | The value the task returned. A non-string is cast to a string; return nothing and it stays empty |
| `errors` | The array of error records. Each holds `type`, `timestamp` and the details you passed, laid out next to them rather than nested |
| `executedon` | Timestamp of the execution. Empty for a run that has not executed yet |
| `processing_time` | Duration in seconds |
| `retry_count` | The retry number, `0` for the first run |
| `task_key` | The label from the third argument of `schedule()` |

<!-- MEDIA: screenshot-admin | nice | The Historic Runs tab in the manager: two finished runs of one task, one with status Success and a message, the other with status Failure and an error record; shows which columns hold the status, message, errors, execution time and duration | Test site, Extras → Scheduler → Historic Runs: the file task from the examples on this page, one run with the client data and one without it; run both through run.php; full description in media-todo.md -->

## Reading the result from code

A task has no method returning its last run — runs are read with a query. In the example `$task` is the task object: inside the task itself it is already there, and from the outside you fetch it with `getTask()`, as in [Scheduling a task](job-scheduling).

```php
$c = $modx->newQuery('sTaskRun');
$c->where(['task' => $task->get('id')]);
$c->sortby('executedon', 'DESC');
$c->limit(1);

/** @var sTaskRun|null $lastRun */
$lastRun = $modx->getObject('sTaskRun', $c);

if ($lastRun && $lastRun->hasErrors()) {
    print_r($lastRun->get('errors'));
}
```

<!-- MEDIA: output | must | Output of `print_r($lastRun->get('errors'))` for a run with two error records: one from `addError('missing_client', …)`, the other from an uncaught exception; shows the record keys (`type`, `timestamp`, details) and the keys of the exception details | Test site: the file task from the examples on this page, throwing an exception after `addError()`; run it through run.php and print `errors` with the code from this section; take the structure from the real output, replace paths and trace with synthetic ones; full description in media-todo.md -->
