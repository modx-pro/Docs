# Системные настройки

Все настройки имеют префикс `mfilter.` и находятся в пространстве имён `mfilter`.

## Пути

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `mfilter.core_path` | `{core_path}components/mfilter/` | Путь к ядру компонента |
| `mfilter.assets_path` | `{assets_path}components/mfilter/` | Путь к ассетам |
| `mfilter.assets_url` | `{assets_url}components/mfilter/` | URL ассетов |

## URL и SEO

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `mfilter.seo_urls_enabled` | `true` | Включить SEO-friendly URL |
| `mfilter.url_separator` | `_` | Разделитель ключа и значения в URL (`brand_apple`) |
| `mfilter.values_separator` | `-or-` | Разделитель множественных значений (`red-or-blue`) |
| `mfilter.trailing_slash` | `true` | Добавлять слеш в конце URL |

### Примеры URL

С настройками по умолчанию:
```
/catalog/brand_apple/color_red-or-blue/price_1000-5000/
```

С `url_separator` = `-` и `values_separator` = `,`:
```
/catalog/brand-apple/color-red,blue/price-1000-5000/
```

## Фильтрация

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `mfilter.default_limit` | `20` | Количество элементов на странице по умолчанию |
| `mfilter.max_limit` | `100` | Максимальное количество элементов на странице |
| `mfilter.default_sort` | `pagetitle` | Поле сортировки по умолчанию |
| `mfilter.default_sortdir` | `ASC` | Направление сортировки по умолчанию |

## SEO оптимизация

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `mfilter.seo_noindex_filtered` | `false` | Добавлять noindex для всех отфильтрованных страниц |
| `mfilter.seo_noindex_multiple` | `true` | Добавлять noindex при выборе нескольких значений одного фильтра |
| `mfilter.seo_canonical_base` | `true` | Canonical указывает на базовую страницу категории |
| `mfilter.seo_max_filters` | `3` | Максимум активных фильтров для индексации |

### Логика noindex

```
seo_noindex_filtered = true     → noindex для любой фильтрации
seo_noindex_multiple = true     → noindex для color_red-or-blue (множественный выбор)
seo_max_filters = 3             → noindex если активно больше 3 фильтров
```

## Кэширование

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `mfilter.cache_enabled` | `true` | Включить кэширование |
| `mfilter.cache_lifetime` | `3600` | Время жизни кэша результатов (секунды) |
| `mfilter.cache_router_lifetime` | `86400` | Время жизни кэша роутера URL (секунды) |

### Очистка кэша

Кэш автоматически очищается при:
- Сохранении ресурса с настроенными фильтрами
- Очистке кэша MODX
- Изменении набора фильтров в админке

Ручная очистка: **mFilter → Обслуживание → Очистить кэш**

## Словоформы

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `mfilter.morpher_api_key` | `` | API ключ сервиса Morpher для автогенерации словоформ |
| `mfilter.wordforms_auto_generate` | `true` | Автоматически генерировать словоформы |

### Morpher API

Для автоматического склонения слов можно использовать [Morpher API](https://morpher.ru/):

1. Зарегистрируйтесь на сайте
2. Получите API ключ
3. Укажите его в настройке `mfilter.morpher_api_key`

Бесплатный лимит: 1000 запросов в день.

## Слаги

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `mfilter.slugs_auto_generate` | `true` | Автоматически генерировать слаги для значений |
| `mfilter.slugs_transliterate` | `true` | Транслитерировать кириллицу в латиницу |

### Примеры слагов

| Значение | slugs_transliterate | Слаг |
|----------|---------------------|------|
| Красный | true | `krasnyj` |
| Красный | false | `красный` |
| Apple iPhone | true | `apple-iphone` |

## Отладка

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `mfilter.debug_profiler` | `false` | Включить профайлер для отладки производительности |

При включении профайлера в ответ AJAX добавляется секция `profiler`:

```json
{
  "success": true,
  "data": { ... },
  "profiler": {
    "total_time": 0.045,
    "queries": 12,
    "memory": "2.5 MB"
  }
}
```

## Фронтенд

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `mfilter.register_frontend` | `true` | Автоматически подключать CSS/JS на фронтенде |
| `mfilter.auto_submit` | `true` | Автоматическая отправка формы при изменении фильтров |
| `mfilter.auto_submit_delay` | `300` | Задержка автоотправки (мс) |

### Список фронтенд-ассетов

| Настройка | Описание |
|-----------|----------|
| `mfilter.frontend_assets` | JSON массив CSS/JS файлов для подключения |

По умолчанию:
```json
[
    "[[+cssUrl]]web/mfilter.css",
    "[[+jsUrl]]web/core/ApiClient.js",
    "[[+jsUrl]]web/core/FilterAPI.js",
    "[[+jsUrl]]web/modules/hooks.js",
    "[[+jsUrl]]web/mfilter.headless.js",
    "[[+jsUrl]]web/ui/FilterUI.js",
    "[[+jsUrl]]web/mfilter.slider.js",
    "[[+jsUrl]]web/mfilter.js"
]
```

### Отключение автоподключения

Если нужно подключить скрипты вручную:

1. Установите `mfilter.register_frontend` = `false`
2. Подключите нужные файлы в шаблоне:

```html
<link rel="stylesheet" href="/assets/components/mfilter/css/web/mfilter.css">
<script src="/assets/components/mfilter/js/web/mfilter.headless.js"></script>
<script src="/assets/components/mfilter/js/web/ui/FilterUI.js"></script>
<script src="/assets/components/mfilter/js/web/mfilter.js"></script>
```

## Пример конфигурации

### Минимальная SEO-конфигурация

```
mfilter.seo_urls_enabled = true
mfilter.seo_noindex_multiple = true
mfilter.seo_max_filters = 2
mfilter.seo_canonical_base = true
```

### Высоконагруженный сайт

```
mfilter.cache_enabled = true
mfilter.cache_lifetime = 7200
mfilter.cache_router_lifetime = 86400
mfilter.default_limit = 24
mfilter.max_limit = 48
```

### Без SEO URL (только AJAX)

```
mfilter.seo_urls_enabled = false
mfilter.auto_submit = true
mfilter.auto_submit_delay = 500
```
