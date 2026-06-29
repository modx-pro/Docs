---
title: События плагинов
---

# События плагинов

При установке пакета создаются системные события. Подключите плагин и обработайте нужные case в `switch ($modx->event->name)`.

## OnImpexBeforeResourceExport

Перед экспортом поля ресурса.

Переменные:

```text
$config_name — имя файла конфигурации
$id          — ID ресурса
$field       — имя поля
$type        — тип поля
$value       — значение
```

Пример: добавить ID к заголовку при экспорте.

```php
<?php
switch ($modx->event->name) {
    case 'OnImpexBeforeResourceExport':
        if ($field == 'pagetitle') {
            $value = $value . '-' . $id;
        }
        $modx->event->returnedValues['value'] = $value;
        break;
}
```

## OnImpexBeforeResourceImport

Перед импортом ресурса.

Переменные:

```text
$config_name — имя файла конфигурации
$config       — массив полей из конфигурации
$data         — массив данных ресурса из файла
```

Пример: добавить TV, которого нет в конфиге и файле.

```php
<?php
switch ($modx->event->name) {
    case 'OnImpexBeforeResourceImport':
        if ($data[1] == 'Продукт1') {
            $config[] = ['Вес без упаковки', 3, 'tv'];
            $data[] = '125';
        }
        $modx->event->returnedValues['output'] = [
            'config' => $config,
            'data' => $data,
        ];
        break;
}
```

## OnImpexBeforeSetParentProduct

Перед определением родительской категории.

Переменные:

```text
$config_name       — имя файла конфигурации
$category           — строка категорий из файла
$category_id_field  — значение category_id_field из конфига
```

Плагин возвращает цепочку категорий через `||`:

```php
<?php
switch ($modx->event->name) {
    case 'OnImpexBeforeSetParentProduct':
        if ($category_id_field != '') {
            $categories = 'Категория1||Категория2||Категория3';
            $modx->event->returnedValues['categories'] = $categories;
        }
        break;
}
```

## OnImpexBeforeFieldImport

Перед импортом одного поля. Те же переменные, что при экспорте: `$config_name`, `$id`, `$field`, `$type`, `$value`.

## OnImpexAfterResourceImport

После импорта ресурса.

Переменные:

```text
$config_name — имя файла конфигурации
$id          — ID импортированного ресурса
$data        — поля и значения из файла
```

Пример: задать alias по ID.

```php
<?php
switch ($modx->event->name) {
    case 'OnImpexAfterResourceImport':
        if ($resource = $modx->getObject('modResource', $id)) {
            $resource->set('alias', 'resource-' . $id);
            $resource->save();
        }
        break;
}
```

## OnImpexAterAllImport

После импорта всех ресурсов (опечатка в имени события сохранена в коде пакета).

Переменные:

```text
$config_name — имя файла конфигурации
$ids         — массив ID импортированных ресурсов
```

Пример: опубликовать все импортированные ресурсы.

```php
<?php
switch ($modx->event->name) {
    case 'OnImpexAterAllImport':
        foreach ($ids as $id) {
            if ($resource = $modx->getObject('modResource', $id)) {
                $resource->set('published', 1);
                $resource->save();
            }
        }
        break;
}
```
