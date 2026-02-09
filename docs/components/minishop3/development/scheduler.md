---
title: Scheduler
---
# Интеграция с Scheduler

MiniShop3 интегрируется с компонентом [Scheduler](https://modstore.pro/packages/utilities/scheduler) для выполнения фоновых задач. Scheduler позволяет откладывать ресурсоёмкие операции и выполнять их асинхронно.

## Требования

- **Scheduler 1.8.0+** — для поддержки повторяющихся задач
- Более ранние версии поддерживаются, но без автоматического перезапуска задач

## Включение интеграции

По умолчанию интеграция отключена. Для включения:

1. Установите компонент Scheduler
2. Настройте cron-задание для Scheduler (см. документацию Scheduler)
3. Включите настройку `ms3_use_scheduler`:

```php
$modx->setOption('ms3_use_scheduler', true);
```

Или через админку: **System → System Settings → minishop3 → ms3_use_scheduler**

## Встроенные задачи

MiniShop3 регистрирует следующие задачи при установке:

### ms3_cleanup_tokens

Очистка истёкших токенов авторизации клиентов.

| Параметр | Значение |
|----------|----------|
| **Тип** | Повторяющаяся |
| **Интервал** | 1 неделя |
| **Файл** | `elements/tasks/cleanupTokens.php` |

Удаляет записи из таблицы `ms3_customer_tokens`, у которых истёк срок действия. Это предотвращает накопление устаревших данных в базе.

### ms3_cleanup_drafts

Очистка старых черновиков заказов.

| Параметр | Значение |
|----------|----------|
| **Тип** | Повторяющаяся |
| **Интервал** | 1 день |
| **Файл** | `elements/tasks/cleanupDrafts.php` |

Удаляет заказы со статусом «Черновик», созданные раньше периода, указанного в настройке `ms3_delete_drafts_after`.

**Настройка периода:**

```php
// Удалять черновики старше 2 недель
$modx->setOption('ms3_delete_drafts_after', '-2 weeks');

// Удалять черновики старше 1 месяца
$modx->setOption('ms3_delete_drafts_after', '-1 month');

// Отключить автоудаление (пустое значение)
$modx->setOption('ms3_delete_drafts_after', '');
```

::: tip Формат значения
Настройка принимает любое значение, понятное функции PHP `strtotime()`: `-1 day`, `-2 weeks`, `-1 month`, `-1 year` и т.д.
:::

### ms3_csv_import

Фоновый импорт товаров из CSV.

| Параметр | Значение |
|----------|----------|
| **Тип** | Одноразовая |
| **Интервал** | — |
| **Файл** | `elements/tasks/csvImport.php` |

Используется для импорта больших CSV-файлов. При превышении лимита синхронного импорта (`ms3_import_sync_limit`) задача автоматически ставится в очередь Scheduler.

**Передаваемые параметры:**

```php
$scriptProperties = [
    'file' => 'path/to/file.csv',  // Путь к CSV файлу
    'mapping' => [...],             // Маппинг колонок
    'options' => [...],             // Опции импорта
];
```

### ms3_send_notification

Отложенная отправка уведомлений.

| Параметр | Значение |
|----------|----------|
| **Тип** | Одноразовая |
| **Интервал** | — |
| **Файл** | `elements/tasks/sendNotification.php` |

Отправляет уведомления асинхронно, не блокируя основной поток выполнения. Особенно полезно для медленных каналов доставки (Telegram, SMS).

**Передаваемые параметры:**

```php
$scriptProperties = [
    'notification_class' => 'MiniShop3\Notifications\Order\StatusChangedNotification',
    'order_id' => 123,
    'channel' => 'telegram',
    'recipient_type' => 'manager',  // customer или manager
    'recipient' => [...],
    'notification_data' => [...],
];
```

## Мониторинг задач

### Через админку

Перейдите в **Extras → Scheduler** для просмотра:

- Зарегистрированных задач (Tasks)
- Запланированных запусков (Runs)
- Истории выполнения

### Через API

```php
/** @var \Scheduler $scheduler */
$scheduler = $modx->services->get('scheduler');

// Получить задачу
$task = $scheduler->getTask('minishop3', 'ms3_cleanup_tokens');

// Получить последний запуск
$lastRun = $task->getLastRun();
if ($lastRun) {
    echo "Статус: " . $lastRun->get('status');
    echo "Завершено: " . $lastRun->get('completed');
}
```

## Ручной запуск задач

### Через админку

1. Перейдите в **Extras → Scheduler → Tasks**
2. Найдите нужную задачу (namespace: minishop3)
3. Нажмите **Schedule Run**

### Через PHP

```php
/** @var \Scheduler $scheduler */
$scheduler = $modx->services->get('scheduler');

// Получить задачу
$task = $scheduler->getTask('minishop3', 'ms3_cleanup_tokens');

// Запланировать выполнение
$task->schedule('+1 minute');

// Или выполнить немедленно (синхронно)
$task->runNow();
```

## Создание собственных задач

### Регистрация задачи

```php
/** @var \Scheduler $scheduler */
$scheduler = $modx->services->get('scheduler');

// Создать задачу
$task = $modx->newObject('sTask');
$task->fromArray([
    'class_key' => 'sFileTask',
    'namespace' => 'mypackage',
    'reference' => 'my_custom_task',
    'content' => 'elements/tasks/myTask.php',  // Относительно core/components/mypackage/
    'description' => 'My custom MiniShop3 task',
    'recurring' => true,
    'interval' => '+1 hour',
]);
$task->save();

// Запланировать первый запуск
$task->schedule('+1 minute');
```

### Файл задачи

```php
<?php
/**
 * @var modX $modx
 * @var sFileTask $task
 * @var sTaskRun $run
 * @var array $scriptProperties
 */

// Получение сервиса MiniShop3
$ms3 = $modx->services->get('ms3');

// Ваша логика
try {
    // ... выполнение задачи ...

    $modx->log(modX::LOG_LEVEL_INFO, "[myTask] Completed successfully");
    return true;
} catch (\Exception $e) {
    $run->addError($e->getMessage());
    return false;
}
```

## Связанные настройки

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `ms3_use_scheduler` | `false` | Включить интеграцию с Scheduler |
| `ms3_delete_drafts_after` | | Период хранения черновиков (strtotime формат) |
| `ms3_import_sync_limit` | `300` | Лимит строк для синхронного импорта |

## Устранение проблем

### Задачи не выполняются

1. **Проверьте cron**: Scheduler требует настроенного cron для работы
2. **Проверьте права**: Файлы задач должны быть читаемы веб-сервером
3. **Проверьте логи**: Scheduler логирует в MODX Error Log

### Повторяющиеся задачи не перезапускаются

- Требуется Scheduler версии 1.8.0 или выше
- Проверьте поле `recurring` в настройках задачи

### Ошибки в задачах

Логи задач доступны в:

- MODX Error Log (`core/cache/logs/error.log`)
- Scheduler → Task Runs → выберите запуск → View Errors
