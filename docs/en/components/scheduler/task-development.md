# Task development

Developing a scheduler task is as simple as creating a PHP file or MODX snippet. Add it to Scheduler when you need it. This document covers a few things that may be familiar if you develop for MODX.

## File, snippet or processor? {#task-type}

First decide whether your task will be file-based, snippet-based, or reuse a processor. File tasks can live in version control; snippets are easier to edit in the Manager and can be reused on the frontend; processors are class-based and suit more complex logic. In all cases the task can do the same thing and the code you write is similar.

## Passing data to the task {#task-data}

The component API lets you pass a `$data` array for run-time data that will be passed to the file or snippet. In the file or snippet these are available in `$scriptProperties`; we recommend using `$modx->getOption` to read them.

## Logging errors in Scheduler {#errors}

If something goes wrong in your file/snippet (e.g. a required variable is missing), you can log errors back to the scheduler. Adding an error also marks the run as failed. Example:

```php
$run->addError('random_error', array(
    'random_number' => rand(0, 99999)
));
```

This logs an error in the scheduler of type "random_error" with the random number as extra data, and marks the run as failed.

## Returning a result {#return}

Return a string (e.g. JSON or plain HTML if you prefer); it will be stored in the component. Echo or print are not captured, so do not use them.

## Processor tasks {#getprops}

When your task runs a processor, you can access data via `$this->getProperty()` in the class-based processor. The same applies to the `run` and `task` objects:

```php
<?php
$task = $this->getProperty('task');
$run = $this->getProperty('run');

```
