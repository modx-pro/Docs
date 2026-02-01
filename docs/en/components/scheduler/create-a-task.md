# Creating a task

Before you can schedule a task, you need to add it to the scheduler database. You can do this via the component, or put it in a build script, package, or a temporary snippet, for example:

```php
<?php
/** @var Scheduler $scheduler */
$path = $modx->getOption('scheduler.core_path', null, $modx->getOption('core_path') . 'components/scheduler/');
$scheduler = $modx->getService('scheduler', 'Scheduler', $path . 'model/scheduler/');

$task = $modx->newObject('sFileTask');
$task->fromArray(array(
    'class_key' => 'sFileTask',
    'content' => 'elements/tasks/name_of_my_task.php',
    'namespace' => 'my_namespace',
    'reference' => 'name_of_my_task',
    'description' => 'Does something really cool.'
));
if (!$task->save()) {
    return 'Error saving Task';
}
```

## Task types {#tasktypes}

Scheduler supports running snippets, processors and files. Each of these has its own sTask subclass:

- `sFileTask` Runs a PHP file; the `content` field holds the absolute path to the file, or a path relative to the namespace, MODX root, or MODX core (in that order). Variables `$modx`, `$task`, `$run` and `$scriptProperties` are available in the file task.
- `sSnippetTask` Runs a snippet; the `content` field holds the snippet ID or name. `$task` and `$run` are available in the snippet inside `$scriptProperties`.
- `sProcessorTask` Runs a processor; the path is set in the `content` field. To get the `$task` and `$run` objects, use `$this->getProperty('task')` and `$this->getProperty('run')`.

Which type to use depends on your use case. File tasks are straightforward and can be kept in version control; snippets are easier to edit in the Manager and can be reused on the frontend; processors are class-based and suit more complex logic.
