# Scheduling a task

You can use the component to schedule when a task runs, but the scheduler is mainly intended as a developer tool: a simple message queue for processing work asynchronously.

Scheduling a task to run at a specific time is straightforward—just a few lines. Example:

```php
<?php
// Load the Scheduler service class
$path = $modx->getOption('scheduler.core_path', null, $modx->getOption('core_path') . 'components/scheduler/');
$scheduler = $modx->getService('scheduler', 'Scheduler', $path . 'model/scheduler/');
if (!($scheduler instanceof Scheduler)) {
    return 'Oops, could not get Scheduler service.';
}

/**
 * Get the task with reference "dosomething" in the "mycmp" namespace.
 * This task should have been added earlier via a build or the component.
 */
$task = $scheduler->getTask('mycmp', 'dosomething');
if ($task instanceof sTask) {
    // Schedule a run in 10 minutes from now
    // We're passing along an array of data; in this case a client ID.
    $task->schedule('+10 minutes', array(
        'client' => 15
    ));
}
```

To schedule a task you only need to pass the time (either a UNIX timestamp or a relative time like `+10 minutes` or `+14 days`) and an optional data array. This creates an `sTaskRun` object that the scheduler cron job will execute when the time comes. From Scheduler 1.1, `$task->schedule()` returns the new run object.

Creating the `sTask` object may require a bit more code, but you only do that once, preferably in a build or bootstrap script. The task object describes what to run (file, snippet or processor), namespace and reference.
