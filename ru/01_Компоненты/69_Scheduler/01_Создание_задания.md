# Создание задания

Прежде чем вы сможете запланировать задачу, вам необходимо добавить ее в базу данных планировщика. Вы можете сделать это через компонент, или вы можете поместить его в скрипт сборки, пакет или просто временный фрагмент, например:

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

## Типы заданий

Scheduler  поддерживает запуск сниппетов, процессоров и файлов. Каждый из этих методов имеет свое собственное расширение класса sTask

- `sFileTask` Запускает PHP файл, где в поле content задан абсолютный путь расположения файла, либо путь относительно пространства имен, либо относительно корня MODX, либо относительно ядра MODX (в указанном порядке). Переменные  `$modx`, `$task`, `$run` и `$scriptProperties` доступны в файловой задаче
- `sSnippetTask` Запускает сниппет, где в поле content задан ID или имя сниппета. $task и $run доступны в сниппете внутри `$scriptProperties`
- `sProcessorTask` Запускает процессор, путь для которого задан в поле content. Чтобы получить объекты $task и $run, используйте `$this->getProperty('task')` и `$this->getProperty('run')`.

Какой из типов задач вам подходит, зависит от вашего варианта использования. Файловые задачи очень просты, в некоторых случаях вы можете повторно использовать фрагмент как во внешнем интерфейсе, так и в задаче планировщика, а процессоры имеют преимущество в том, что они основаны на классах, что упрощает выполнение более сложных задач.
