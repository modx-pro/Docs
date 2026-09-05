---
title: События MODX
description: Плагины msbeOn* — apply, поля, расширение экспорта
---

# События MODX

При apply msBulkEditor вызывает системные события. Регистрируйте их в плагине.

| Событие | Когда | Полезные свойства |
| --- | --- | --- |
| `msbeOnBulkOperationStarted` | Старт apply | `operationId`, … |
| `msbeOnBulkOperationCompleted` | Успешное завершение | `operationId`, `success`, `skipped`, `error` |
| `msbeOnBulkOperationFailed` | Исключение при apply | `operationId`, сообщение ошибки |
| `msbeOnFieldApplied` | После успешного apply поля | `operationId`, `productId`, `field`, `oldValue`, `newValue`, `status` |
| `msbeOnExportColumns` | Перед записью заголовка экспорта | `columns`, `format`, `selection` |
| `msbeOnExportBuildRow` | Перед записью каждой строки | `productId`, `row`, `columns`, `format`, `selection` |

Пример: после `msbeOnBulkOperationCompleted` сбросить кэш Fenom или отправить уведомление.

## Расширение экспорта плагином

Плагин может добавить колонку и заполнить её для каждой строки. Верните обновлённые `columns` / `row` через `$modx->event->returnedValues`.

```php
<?php
/** @var modX $modx */
switch ($modx->event->name) {
    case 'msbeOnExportColumns':
        $columns = $modx->event->params['columns'] ?? [];
        if (!is_array($columns)) {
            $columns = [];
        }
        $columns[] = 'plugin:warehouse_code';
        $modx->event->returnedValues = ['columns' => array_values(array_unique($columns))];
        break;

    case 'msbeOnExportBuildRow':
        $row = $modx->event->params['row'] ?? [];
        if (!is_array($row)) {
            $row = [];
        }
        $productId = (int) ($modx->event->params['productId'] ?? 0);
        $row['plugin:warehouse_code'] = 'WH-' . $productId;
        $modx->event->returnedValues = ['row' => $row];
        break;
}
```

Ключи колонок должны совпадать с каталогом полей (`tv:name`, `option:key`, `msbe:option:key`) или использовать префикс `plugin:` для виртуальных колонок. Без плагинов экспорт работает как раньше.

## Реакция на изменение одного поля

После apply для каждой позиции со статусом `applied` вызывается `msbeOnFieldApplied`. Событие срабатывает и для inline-edit (один товар), и для массовых операций.

```php
<?php
/** @var modX $modx */
if ($modx->event->name !== 'msbeOnFieldApplied') {
    return;
}

$productId = (int) ($modx->event->params['productId'] ?? 0);
$field = (string) ($modx->event->params['field'] ?? '');

if ($field === 'pagetitle' && $productId > 0) {
    $modx->cacheManager->refreshResource($productId);
}
```

## Connector

Базовый URL: `{site}/assets/components/msbulkeditor/connector.php`.

Аутентификация: сессия менеджера (`mgr`) + заголовок `HTTP_MODAUTH` = `user->getUserToken('mgr')` + право на route.

Основные actions: `mgr/products/list`, `preview`, `apply`, `rollback`, `mgr/history/*`, `mgr/export/run`, `mgr/import/parse`, `mgr/import/run`, `mgr/bindings/check`, `mgr/bindings/apply`.

Формат ответа:

```json
{
  "success": true,
  "message": "",
  "object": { }
}
```

Ошибки: `"success": false`, `"message": "msbulkeditor_*"` — ключ лексикона.

Токен modAuth берите из открытой страницы msBulkEditor (`window.msBulkEditorConfig.modAuth`). Не храните токен в публичных скриптах.

## База данных

| Таблица | Назначение |
| --- | --- |
| `msbe_operations` | Заголовок операции (тип, статус, счётчики) |
| `msbe_operation_items` | Снимки по товарам для отката |
| `msbe_presets` | Сохранённые пресеты |

См. также: [Системные настройки](settings), [История](interface/history).
