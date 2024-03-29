# Файловые элементы

pdoTools умеет загружать и использовать элементы из файлов, используя методы `getChunk` и `runSnippet` с биндингом `@FILE`.

Можно делать это через API:

```php
if ($pdoTools = $modx->getService('pdoTools')) {
  $chunk = $pdoTools->getChunk('@FILE chunks/my_chunk.tpl', array('placeholder' => 'value'));

  $snippet = $pdoTools->runSnippet('@FILE snippets/my_snippet.php', array('param' => 'value'));
}
```

Все элементы загружаются из директории, указанной в системной настройке **pdotools_elements_path**.

Вы можете указать и произвольную директорию прямо при вызове метода:

```php
$chunk = $pdoTools->getChunk('@FILE chunks/my_chunk.tpl', array(
  'placeholder' => 'value',
  'elementsPath' => MODX_ASSETS_PATH . 'mydir/',
));
```

Загрузка элементов разрешена только из файлов с расширением `.tpl`, `.html` и `.php`.

## Работа с Fenom

Для загрузки чанков и сниппетов в Fenom вы можете использовать такой синтаксис для чанков:

```fenom
{$_modx->getChunk('@FILE chunks/my_chunk.tpl', [
  'placeholder' => 'value',
  'elementsPath' => MODX_ASSETS_PATH . 'mydir/',
])}

// или

{'@FILE chunks/my_chunk.tpl' | chunk : [
  'placeholder' => 'value',
  'elementsPath' => MODX_ASSETS_PATH . 'mydir/',
]}
```

и для сниппетов:

```fenom
{$_modx->runSnippet('@FILE snippets/my_snippet.php', [
  'param' => 'value',
  'elementsPath' => MODX_ASSETS_PATH . 'mydir/',
])}

// или

{'@FILE snippets/my_snippet.php' | snippet : [
  'param' => 'value',
  'elementsPath' => MODX_ASSETS_PATH . 'mydir/',
]}
```

### Кэширование

Файловые сниппеты не кэшируются, но можно включить кэширование скомпилированных шаблонов Fenom, используя настройку **pdotools_fenom_cache**.

При включение этой настройки все скомпилированные чанки, загруженные через `@FILE` будут сохраняться в кэш MODX.
По умолчанию, это директория `MODX_CORE_PATH . 'cache/default/pdotools'`.
При очистке кэша всего сайта эта директория также очищается.

Стоит отметить, что процедура кэширования чанков через биндинг `@FILE` в системе MODX является несколько избыточной, учитывая, что Fenom изначально рассчитан на работу с шаблонами из файлов.
Для того, чтобы в полной мере использовать это преимущество (и родной файловый кэш Fenom) вам нужно загружать элементы через источник `file` и синтаксис Fenom.

Простая загрузка шаблона:

```fenom
{include 'file:chunks/my_chunk.tpl'}
```

Расширение шаблона:

```fenom
{extends 'file:chunks/my_chunk.tpl'}

{block 'myblock'}
  Hello world!
{/block}
```

Есть еще источник `template`, который создаёт чанки из объектов `modTemplate` системы:

```fenom
{include 'template:MyTemplate'}

// или по id

{include 'template:1'}
```

Если же не указывать никакой источник, то будет загружен обычный чанк из БД

```fenom
{include 'myChunk'}

// или по id

{include '10'}
```

Кэширование отключено по умолчанию.

Также можно кэшировать только файлы, не кэшируя обычные чанки из БД.
Для этого вам нужно отключить pdotools_fenom_cache и указать параметры напрямую Fenom через настройку **pdotools_fenom_options**:

```json
{
  "force_compile": false,
  "disable_cache": false,
  "force_include": false,
  "auto_reload": true
}
```

Все параметры Fenom можно найти [в его документации](https://github.com/fenom-template/fenom/blob/master/docs/ru/configuration.md).

### Примеры

Каким же образом можно вынести оформление сайта в файлы, используя pdoTools и Fenom?

Для полной функциональности вам обязательно нужно включить системную настройку **pdotools_fenom_parser**.

#### Шаблоны

Создайте нужное количество шаблонов в системе и укажите их ресурсам. В самих шаблонах нужно написать просто

```fenom
{include 'file:templates/my_template1.tpl'}
```

После этого ваш шаблон будет загружаться с диска и обновляться без очистки кэша.

К сожалению, полностью отказаться от создания шаблонов в БД, даже с одной строкой нельзя, так как они назначаются ресурсам по `id`.

#### Чанки

А вот чанки использовать гораздо проще. Их можно спокойно вызывать и расширять из любого места.

Например, мы можем прописать в нашем шаблоне `templates/my_template1.tpl` вот такие строки:

```fenom
{include 'file:chunks/head.tpl'}
{include 'file:chunks/body.tpl'}
{include 'file:chunks/footer.tpl'}
```

и весь шаблон будет загружен из этих чанков-файлов.

#### Сниппеты

Тоже самое и со сниппетами. Ничего кроме файлов создавать не нужно. Так как это PHP код, нужно использовать метод pdoTools:

```fenom
{$_modx->runSnippet('@FILE snippets/my_snippet.php')}
```

При возврате данных из сниппета нужно использовать `return`;

#### Плагины

А вот плагины, как и шаблоны, нужно сначала создать в БД, чтобы **назначить им события**, на которые они будут реагировать.

После этого просто вызывайте свой файловый сниппет из этого плагина через API:

```php
<?php

if ($pdoTools = $modx->getService('pdoTools')) {
  $pdoTools->runSnippet('@FILE plugins/my_plugin.php', $scriptProperties);
}

```

Он будет проверять и обрабатывать события. Например:

```php
<?php

switch ($modx->event->name) {
  case 'OnLoadWebDocument':
    echo '<pre>'; print_r($modx->resource->toArray()); die;
    break;
}
```

*Этому плагину нужно назначить событие **OnLoadWebDocument**.*

### Заключение

Таким образом вы можете вынести свои шаблоны, чанки, плагины и сниппеты в файлы.

Это позволит подключить систему управления версиями и более удобно разрабатывать сайт из любимого редактора.
