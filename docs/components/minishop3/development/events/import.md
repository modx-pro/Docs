---
title: События импорта
---
# События импорта

События для управления импортом товаров из CSV-файлов.

::: info Контекст
Эти события вызываются при импорте товаров через утилиту импорта в админке. Позволяют модифицировать данные, пропускать строки или выполнять дополнительные действия.
:::

## msOnBeforeImport

Вызывается **перед** началом импорта файла. Позволяет проверить параметры или отменить импорт.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `file` | `string` | Путь к файлу импорта |
| `params` | `array` (по ссылке) | Параметры импорта |

**Структура params:**
```php
[
    'file' => 'путь/к/файлу.csv',
    'fields' => 'pagetitle,price,parent', // или mapping
    'mapping' => [0 => 'pagetitle', 1 => 'price', ...],
    'update' => true,           // разрешить обновление
    'key' => 'article',         // поле для поиска дубликатов
    'skip_header' => true,      // пропустить заголовок
    'is_debug' => false,        // режим отладки
    'delimiter' => ';',         // разделитель
    'keys' => ['pagetitle', 'price', ...], // финальный список полей
    'tv_enabled' => false,      // есть TV поля
    'option_enabled' => false,  // есть опции
]
```

### Прерывание операции

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeImport':
        $file = $scriptProperties['file'];
        $params = &$scriptProperties['params'];

        // Проверка размера файла
        if (filesize($file) > 10 * 1024 * 1024) { // 10MB
            $modx->event->output('Файл слишком большой');
            return 'cancel';
        }

        // Проверка рабочего времени
        $hour = (int)date('G');
        if ($hour >= 10 && $hour < 18) {
            $modx->event->output('Импорт запрещён в рабочее время');
            return 'cancel';
        }
        break;
}
```

### Модификация параметров

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeImport':
        $params = &$scriptProperties['params'];

        // Добавить дефолтное значение для поля
        $params['default_vendor'] = 1;

        // Изменить ключ поиска дубликатов
        if (empty($params['key'])) {
            $params['key'] = 'article';
        }

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Import] Начало импорта: %s, полей: %d',
            basename($params['file']),
            count($params['keys'])
        ));
        break;
}
```

---

## msOnAfterImport

Вызывается **после** завершения импорта. Позволяет выполнить пост-обработку или отправить уведомления.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `stats` | `array` | Статистика импорта |

**Структура stats:**
```php
[
    'total' => 150,    // всего строк
    'created' => 120,  // создано товаров
    'updated' => 25,   // обновлено товаров
    'errors' => 3,     // ошибок
    'skipped' => 2,    // пропущено
]
```

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnAfterImport':
        $stats = $scriptProperties['stats'];

        // Логирование результатов
        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Import] Завершено: всего %d, создано %d, обновлено %d, ошибок %d',
            $stats['total'],
            $stats['created'],
            $stats['updated'],
            $stats['errors']
        ));

        // Отправка уведомления администратору
        if ($stats['errors'] > 0) {
            $message = "Импорт завершён с ошибками!\n\n";
            $message .= "Создано: {$stats['created']}\n";
            $message .= "Обновлено: {$stats['updated']}\n";
            $message .= "Ошибок: {$stats['errors']}\n";

            // mail($adminEmail, 'Отчёт импорта', $message);
        }
        break;
}
```

### Пост-обработка

```php
<?php
switch ($modx->event->name) {
    case 'msOnAfterImport':
        $stats = $scriptProperties['stats'];

        // Очистка кэша
        $modx->cacheManager->refresh();

        // Обновление поиска
        // $modx->runProcessor('MySearch\\Processors\\Reindex');

        // Генерация sitemap
        // $modx->runProcessor('pdoSitemap\\Processors\\Generate');

        // Синхронизация с 1С
        if ($stats['created'] > 0 || $stats['updated'] > 0) {
            // $onec->syncProducts();
        }
        break;
}
```

---

## msOnImportRow

Вызывается при обработке **каждой строки** CSV-файла. Позволяет модифицировать данные или пропустить строку.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `row` | `int` | Номер текущей строки |
| `csv` | `array` | Сырые данные строки CSV |
| `data` | `array` (по ссылке) | Данные для создания/обновления ресурса |
| `tvData` | `array` (по ссылке) | Данные для TV-полей |
| `optionData` | `array` (по ссылке) | Данные для опций товара |
| `gallery` | `array` (по ссылке) | Пути к изображениям галереи |

### Прерывание строки (пропуск)

```php
<?php
switch ($modx->event->name) {
    case 'msOnImportRow':
        $data = &$scriptProperties['data'];
        $row = $scriptProperties['row'];

        // Пропуск товаров без цены
        if (empty($data['price']) || $data['price'] <= 0) {
            $modx->log(modX::LOG_LEVEL_WARN, sprintf(
                '[Import] Строка %d пропущена: нет цены',
                $row
            ));
            return 'cancel';
        }

        // Пропуск товаров определённых категорий
        $excludedParents = [10, 15, 20];
        if (in_array($data['parent'], $excludedParents)) {
            return 'cancel';
        }
        break;
}
```

### Модификация данных

```php
<?php
switch ($modx->event->name) {
    case 'msOnImportRow':
        $data = &$scriptProperties['data'];
        $csv = $scriptProperties['csv'];
        $tvData = &$scriptProperties['tvData'];
        $optionData = &$scriptProperties['optionData'];

        // Генерация alias из названия
        if (empty($data['alias'])) {
            $data['alias'] = $modx->filterPathSegment($data['pagetitle']);
        }

        // Установка дефолтных значений
        if (empty($data['template'])) {
            $data['template'] = 5; // шаблон товара
        }

        // Автоматическое вычисление старой цены
        if (!empty($data['price']) && empty($data['old_price'])) {
            $data['old_price'] = round($data['price'] * 1.2, 2);
        }

        // Добавление TV-полей на основе данных
        if (!empty($data['brand'])) {
            $tvData['product_brand'] = $data['brand'];
            unset($data['brand']); // убираем из основных данных
        }

        // Добавление опций
        if (!empty($csv[10])) { // 10-я колонка = цвет
            $optionData['color'] = $csv[10];
        }
        break;
}
```

### Обработка галереи

```php
<?php
switch ($modx->event->name) {
    case 'msOnImportRow':
        $data = &$scriptProperties['data'];
        $gallery = &$scriptProperties['gallery'];

        // Добавление изображений из внешнего источника
        if (!empty($data['external_images'])) {
            $images = explode(',', $data['external_images']);
            foreach ($images as $imageUrl) {
                // Скачиваем изображение
                $localPath = $this->downloadImage(trim($imageUrl));
                if ($localPath) {
                    $gallery[] = $localPath;
                }
            }
            unset($data['external_images']);
        }

        // Автоматическое главное фото из SKU
        if (!empty($data['article']) && empty($gallery)) {
            $imagePath = "assets/images/products/{$data['article']}.jpg";
            if (file_exists(MODX_BASE_PATH . $imagePath)) {
                $gallery[] = $imagePath;
            }
        }
        break;
}
```

### Валидация и очистка данных

```php
<?php
switch ($modx->event->name) {
    case 'msOnImportRow':
        $data = &$scriptProperties['data'];
        $row = $scriptProperties['row'];

        // Очистка и валидация цены
        if (!empty($data['price'])) {
            // Удаляем пробелы и заменяем запятую на точку
            $data['price'] = preg_replace('/[^\d.,]/', '', $data['price']);
            $data['price'] = str_replace(',', '.', $data['price']);
            $data['price'] = (float)$data['price'];
        }

        // Валидация артикула
        if (!empty($data['article'])) {
            // Приводим к верхнему регистру
            $data['article'] = mb_strtoupper(trim($data['article']));

            // Проверка формата артикула
            if (!preg_match('/^[A-Z0-9\-]+$/', $data['article'])) {
                $modx->log(modX::LOG_LEVEL_ERROR, sprintf(
                    '[Import] Строка %d: некорректный артикул "%s"',
                    $row,
                    $data['article']
                ));
                return 'cancel';
            }
        }

        // Очистка HTML из названия
        $data['pagetitle'] = strip_tags($data['pagetitle']);
        $data['pagetitle'] = html_entity_decode($data['pagetitle'], ENT_QUOTES, 'UTF-8');

        // Ограничение длины описания
        if (!empty($data['description']) && mb_strlen($data['description']) > 500) {
            $data['description'] = mb_substr($data['description'], 0, 497) . '...';
        }
        break;
}
```

---

## Полный пример: расширенный импорт

```php
<?php
/**
 * Плагин: Расширенный импорт товаров
 * События: msOnBeforeImport, msOnImportRow, msOnAfterImport
 */

switch ($modx->event->name) {

    case 'msOnBeforeImport':
        $params = &$scriptProperties['params'];

        // Сохраняем время начала для статистики
        $modx->eventData['import_start'] = microtime(true);
        $modx->eventData['import_log'] = [];

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Import] Начало импорта: %s',
            basename($params['file'])
        ));
        break;

    case 'msOnImportRow':
        $data = &$scriptProperties['data'];
        $tvData = &$scriptProperties['tvData'];
        $optionData = &$scriptProperties['optionData'];
        $gallery = &$scriptProperties['gallery'];
        $row = $scriptProperties['row'];

        // 1. Генерация alias
        if (empty($data['alias'])) {
            $data['alias'] = $modx->filterPathSegment($data['pagetitle']);
            // Добавляем артикул для уникальности
            if (!empty($data['article'])) {
                $data['alias'] .= '-' . mb_strtolower($data['article']);
            }
        }

        // 2. Обработка цен
        foreach (['price', 'old_price', 'wholesale_price'] as $priceField) {
            if (isset($data[$priceField])) {
                $data[$priceField] = (float)str_replace([' ', ','], ['', '.'], $data[$priceField]);
            }
        }

        // 3. Расчёт скидки
        if ($data['price'] > 0 && $data['old_price'] > $data['price']) {
            $discount = round((($data['old_price'] - $data['price']) / $data['old_price']) * 100);
            $tvData['discount_percent'] = $discount;
        }

        // 4. Автоматическое определение остатков
        if (isset($data['remains'])) {
            $remains = (int)$data['remains'];
            $data['remains'] = $remains;

            // Статус публикации по остаткам
            if ($remains <= 0) {
                $data['published'] = 0;
            }
        }

        // 5. Обработка характеристик из CSV
        if (!empty($data['specifications'])) {
            // Формат: "Цвет:Красный;Размер:XL;Материал:Хлопок"
            $specs = explode(';', $data['specifications']);
            foreach ($specs as $spec) {
                $parts = explode(':', $spec, 2);
                if (count($parts) === 2) {
                    $key = mb_strtolower(trim($parts[0]));
                    $key = preg_replace('/[^a-zа-яё0-9_]/u', '_', $key);
                    $optionData[$key] = trim($parts[1]);
                }
            }
            unset($data['specifications']);
        }

        // 6. Логирование
        $modx->eventData['import_log'][] = sprintf(
            'Row %d: %s (price: %s)',
            $row,
            $data['pagetitle'],
            $data['price'] ?? 'N/A'
        );
        break;

    case 'msOnAfterImport':
        $stats = $scriptProperties['stats'];
        $startTime = $modx->eventData['import_start'] ?? microtime(true);
        $duration = round(microtime(true) - $startTime, 2);

        // Формирование отчёта
        $report = [
            'duration' => $duration . ' сек',
            'total' => $stats['total'],
            'created' => $stats['created'],
            'updated' => $stats['updated'],
            'errors' => $stats['errors'],
            'skipped' => $stats['skipped'],
        ];

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Import] Завершено за %s сек. Создано: %d, обновлено: %d, ошибок: %d',
            $duration,
            $stats['created'],
            $stats['updated'],
            $stats['errors']
        ));

        // Сохранение отчёта
        $reportFile = MODX_CORE_PATH . 'cache/import_reports/' . date('Y-m-d_H-i-s') . '.json';
        if (!is_dir(dirname($reportFile))) {
            mkdir(dirname($reportFile), 0755, true);
        }
        file_put_contents($reportFile, json_encode($report, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

        // Очистка кэша после импорта
        $modx->cacheManager->refresh();

        // Отправка отчёта
        if ($stats['errors'] > 0) {
            $adminEmail = $modx->getOption('emailsender');
            // mail($adminEmail, 'Import completed with errors', json_encode($report));
        }
        break;
}
```
