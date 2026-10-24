# Creating a task

A task describes what to run and is created once — in the manager, by a package build script or by a throwaway snippet. A run can only be queued for a task that already exists: [Scheduling a task](job-scheduling).

```php
<?php
$task = $modx->newObject('sFileTask');
$task->fromArray([
    'class_key' => 'sFileTask',
    'namespace' => 'my_namespace',
    'reference' => 'name_of_my_task',
    'content' => 'elements/tasks/name_of_my_task.php',
    'description' => 'Collects daily statistics',
]);

if (!$task->save()) {
    return 'Could not save the task';
}
```

The namespace and reference pair (`namespace` + `reference`) is the task's address: `$scheduler->getTask()` finds the task by it and also accepts a numeric id. The component does not enforce uniqueness of the pair — keep an eye on it yourself.

## Task fields

| Field | In the form | Default | Purpose |
| --- | --- | --- | --- |
| `class_key` | Type | `sSnippetTask` | Which kind of code to run. In code set it explicitly: `newObject('sFileTask')` only sets the object's class, the field stays at its default, and the task would go looking for a snippet. The form preselects `sFileTask` |
| `namespace` | Namespace | `core` | MODX namespace. For file tasks the relative path is resolved against it as well |
| `reference` | Reference | `Untitled Task` | The second half of the task's address |
| `content` | File path, snippet picker or processor name | empty | What to run. In the form these are three separate fields, and the one matching the selected type is shown |
| `description` | Description | empty | Description for the task list in the manager |
| `recurring` | Recurring | off | Recurring task: the next run is queued after a successful one |
| `interval` | Interval | empty | Cycle interval, a string for `strtotime()` — `+30 minutes`, `+1 hour`, `+1 day`. Required when `recurring` is on; in the form the field only appears once the box is ticked |
| `max_retries` | Max retries | `0` | How many times to repeat a failed run. `0` — do not repeat |
| `retry_delay` | Retry delay (seconds) | `60` | Pause before a retry, in seconds |

`task_key` is absent from this table: it belongs to a run rather than to a task, and the form labels it Task key — do not confuse it with Reference.

## Task types {#tasktypes}

The type is set by the `class_key` field; it decides what goes into `content`.

| Type | In `content` | What is available inside |
| --- | --- | --- |
| `sFileTask` | path to a PHP file | `$modx`, `$task`, `$run`, `$scriptProperties` |
| `sSnippetTask` | snippet name or id | `$scriptProperties`, with `task` and `run` inside it |
| `sProcessorTask` | processor name | `$this->getProperty('task')` and `$this->getProperty('run')` |

A file task is convenient to keep under version control, a snippet can be used on the site as well; a processor is a class, the usual choice for complex logic.

### File

The path from `content` is resolved in order, and the first file found is executed:

1. as an absolute path;
2. relative to the namespace core path;
3. relative to the MODX root;
4. relative to the MODX core.

### Snippet

If `content` is numeric, the snippet is looked up by id, otherwise by name. The snippet runs uncached, its output becomes the result of the run. A snippet that cannot be found is a `snippet_not_found` error and the run fails.

### Processor

What to put in `content` depends on the processor's style:

- **with a namespace** (`MyPackage\Processors\Tasks\Nightly`) — no path needed, the autoloader finds the processor;
- **without one** (the old MODX 2 style, `tasks/nightly`) — the component supplies the path. When the task's `namespace` is not `core`, it looks inside the package: `src/Processors/` if such a directory exists, otherwise `processors/`. When it is `core`, it looks in the core: `src/Revolution/Processors/` on MODX 3 and `model/modx/processors/` on MODX 2. The `namespace` field defaults to `core`, so a task created without it goes looking in the core.

Field errors from the processor are carried over into the run, and the message from its response becomes the result.

<!-- MEDIA: snippet-code | must | A minimal processor task in full: a namespaced processor class (`MyPackage\Processors\Tasks\Nightly`), the `content` value for it and the processor response that becomes the run result; the code shows where `task` and `run` come from and how an error response differs from a successful one | Write it from the sProcessorTask class and the MODX 3 processor pattern; check on the test site: create a processor based task, queue a run, execute it through run.php and confirm the message lands in the run result; full description in media-todo.md -->

## Recurring tasks and retries

These are independent mechanisms. `recurring` with `interval` queues the next run after a successful one, and on a failure the cycle stops — the `scheduler.recurring_on_failure` setting keeps it going ([System settings](installation#settings)). `max_retries` repeats a failed run and does not depend on that setting. What happens to a run next is covered in [Scheduling a task](job-scheduling).

The cycle stops silently when `interval` will not do: `strtotime()` cannot parse it, or it resolves to a time that is not in the future (`-1 day`, `now`). The error log gets `[Scheduler] Invalid interval '<value>' for task '<reference>'` and no next run is queued. An empty `interval` with `recurring` on produces a warning instead: `Recurring task '<reference>' has no interval set`.

The manager form rejects such an interval on save, so only a task created from code can be caught by this.

## Creating a task in the manager

**Extras → Scheduler → Tasks → Create new task**. The form has the same fields as the table above. One-off and housekeeping tasks are easier to create here; tasks that ship with a package are created by a build script.

<!-- MEDIA: screenshot-admin | nice | The Create new task window in the English manager: the type "File based task", the Reference, Namespace, Relative file path and Description fields filled in, the Recurring checkbox ticked and the Interval field visible and filled in; every field label is legible so it can be matched to a row of the fields table | Test site, Extras → Scheduler → Tasks → Create new task: values from this page's example (namespace my_namespace, path elements/tasks/name_of_my_task.php), interval +1 day; close the window without saving; full description in media-todo.md -->
