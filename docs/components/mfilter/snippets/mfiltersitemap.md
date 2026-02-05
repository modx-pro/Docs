# mFilterSitemap

Сниппет для генерации XML sitemap фильтрованных страниц.

## Описание

mFilterSitemap создаёт XML карту сайта для виртуальных страниц фильтров (SEO URL). Работает по принципу sitemap index — генерирует только URL фильтров, которые можно добавить к основной карте сайта.

**Особенности:**
- Автоматическое определение страниц с фильтрами
- Ограничение комбинаций для предотвращения "комбинаторного взрыва"
- Кэширование результатов
- Поддержка одиночных и комбинированных фильтров
- Интеграция с MODX Scheduler для автоматической генерации

## Параметры

### Источник данных

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `parents` | авто | ID ресурсов (через запятую). Пусто = все страницы с наборами фильтров |
| `filterKeys` | все | Ключи фильтров для включения (через запятую) |

### Ограничения

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `maxFilters` | `1` | Максимум фильтров в одном URL (1 = только одиночные) |
| `maxValues` | `1` | Максимум значений на фильтр |

### SEO параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `priority` | `0.7` | Приоритет URL (0.0-1.0) |
| `changefreq` | `weekly` | Частота обновления (always, hourly, daily, weekly, monthly, yearly, never) |

### Шаблоны

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `tpl` | встроенный | Шаблон одного URL |
| `tplWrapper` | встроенный | Обёртка urlset |
| `sitemapSchema` | http://www.sitemaps.org/schemas/sitemap/0.9 | XML Schema |

### Вывод

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `forceXML` | `true` | Вывести XML заголовок и завершить выполнение |
| `return` | `chunks` | Тип возврата: `chunks` (HTML) или `data` (массив) |

### Кэширование

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `cache` | `true` | Включить кэширование |
| `cacheTime` | `3600` | Время жизни кэша (секунды) |

### Отладка

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `debug` | `false` | Включить отладочные логи |

## Плейсхолдеры в шаблонах

### tpl (для каждого URL)

| Плейсхолдер | Описание |
|-------------|----------|
| `{$url}` | Полный URL страницы |
| `{$lastmod}` | Дата последнего изменения (ISO 8601) |
| `{$changefreq}` | Частота обновления |
| `{$priority}` | Приоритет |
| `{$filterKey}` | Ключ фильтра |
| `{$value}` | Значение фильтра |
| `{$resourceId}` | ID базового ресурса |

### tplWrapper

| Плейсхолдер | Описание |
|-------------|----------|
| `{$output}` | Все URL элементы |
| `{$schema}` | XML Schema |
| `{$charset}` | Кодировка |
| `{$total}` | Общее количество URL |

## Примеры

### Базовый вызов (отдельная страница sitemap)

Создайте ресурс `/sitemap-filters.xml` с шаблоном:

```fenom
{'!mFilterSitemap' | snippet}
```

### Только определённые фильтры

```fenom
{'!mFilterSitemap' | snippet : [
    'filterKeys' => 'color,size,brand'
]}
```

### Комбинации из двух фильтров

```fenom
{'!mFilterSitemap' | snippet : [
    'maxFilters' => 2,
    'priority' => '0.6'
]}
```

**Внимание:** При большом количестве значений это может создать огромное количество URL!

### Для конкретной категории

```fenom
{'!mFilterSitemap' | snippet : [
    'parents' => '5,10,15',
    'filterKeys' => 'color,brand'
]}
```

### Без авто-вывода XML

```fenom
{set $sitemapXml = '!mFilterSitemap' | snippet : [
    'forceXML' => false
]}

{* Можно обработать или сохранить *}
{$sitemapXml}
```

### Получение данных массивом

```fenom
{set $urls = '!mFilterSitemap' | snippet : [
    'return' => 'data',
    'forceXML' => false
]}

{* urls — массив с данными *}
Всего URL: {$urls | count}
```

### Кастомный шаблон URL

```fenom
{'!mFilterSitemap' | snippet : [
    'tpl' => '@INLINE <url>
    <loc>{$url}</loc>
    <lastmod>{$lastmod}</lastmod>
    <changefreq>{$changefreq}</changefreq>
    <priority>{$priority}</priority>
    <xhtml:link rel="alternate" hreflang="ru" href="{$url}"/>
</url>'
]}
```

## Scheduler задача

mFilter включает задачу для автоматической генерации sitemap через MODX Scheduler.

### Настройка

1. Убедитесь, что Scheduler установлен
2. Задача `mfl_generate_sitemap` создаётся автоматически
3. Настройте расписание в админке Scheduler

### Параметры задачи

```json
{
    "parents": "",
    "filterKeys": "",
    "maxFilters": 1,
    "priority": "0.7",
    "changefreq": "weekly",
    "outputFile": "assets/sitemap-filters.xml"
}
```

### Запуск вручную

```php
$scheduler = $modx->services->get('scheduler');
$task = $scheduler->getTask('mfilter', 'mfl_generate_sitemap');
$task->schedule('+0 seconds');
```

## Интеграция с robots.txt

```
Sitemap: https://example.com/sitemap.xml
Sitemap: https://example.com/sitemap-filters.xml
```

## Интеграция с pdoSitemap

Если используете pdoSitemap для основной карты сайта, создайте отдельный ресурс для фильтров:

```
/sitemap.xml          — pdoSitemap (основные страницы)
/sitemap-filters.xml  — mFilterSitemap (фильтры)
/sitemap-index.xml    — индексный файл
```

### sitemap-index.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
        <loc>https://example.com/sitemap.xml</loc>
    </sitemap>
    <sitemap>
        <loc>https://example.com/sitemap-filters.xml</loc>
    </sitemap>
</sitemapindex>
```

## Рекомендации

### Количество URL

Google рекомендует не более 50,000 URL на один sitemap файл. При большом каталоге:

- Ограничьте `maxFilters` значением 1
- Разделите по категориям (используйте `parents`)
- Исключите редкие фильтры

### Приоритет

Рекомендуемые значения:
- Главная: 1.0
- Категории: 0.8
- Товары: 0.6
- **Фильтры: 0.5-0.7**

### Частота обновления

Для фильтров обычно подходит `weekly` или `monthly`, так как структура меняется нечасто.
