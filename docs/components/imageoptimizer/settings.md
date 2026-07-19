---
title: Системные настройки
---

# Системные настройки

Ключи в namespace `imageoptimizer`. В БД: `imageoptimizer_{name}`.

**Где изменить:** **Компоненты → ImageOptimizer → Настройки** или **Система → Системные настройки** (фильтр `imageoptimizer`).

## Общие

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `imageoptimizer_enabled` | boolean | `1` | Глобальный выключатель: очередь, конвертация, inject |
| `imageoptimizer_cleanup_on_uninstall` | boolean | `0` | При uninstall удалить варианты на диске, таблицу очереди, HTML-кэш |
| `imageoptimizer_disk_warn_gb` | number | `10` | Предупреждение в админке, если свободно меньше N ГБ |

## Конвертация и форматы

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `imageoptimizer_convert_on_upload` | boolean | `1` | Постановка в очередь при загрузке в File Manager |
| `imageoptimizer_convert_on_upload_sync_timeout` | number | `5` | Секунд синхронной конвертации сразу после upload |
| `imageoptimizer_formats` | text | `webp` | Форматы через запятую: `webp`, `avif` |
| `imageoptimizer_avif_enabled` | boolean | `0` | Отдельный флаг AVIF (дополнительно к `formats`) |
| `imageoptimizer_quality` | number | `82` | Fallback качества (1–100) |
| `imageoptimizer_quality_jpeg` | number | `82` | Качество для JPEG-источников |
| `imageoptimizer_quality_png` | number | `90` | Качество для PNG-источников |
| `imageoptimizer_method_priority` | text | `cwebp,gd,imagick` | Порядок энкодеров; для AVIF также `avifenc` |
| `imageoptimizer_reencode_if_unchanged` | boolean | `0` | Повторно ставить done-задачи при том же исходнике |
| `imageoptimizer_preserve_exif` | boolean | `0` | Сохранять EXIF в выходных файлах |
| `imageoptimizer_preserve_icc` | boolean | `1` | Встраивать ICC-профиль |
| `imageoptimizer_max_memory_limit` | text | `512M` | Временное повышение `memory_limit` при конвертации |

## Responsive и варианты

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `imageoptimizer_breakpoints` | text | `480,768,1024,1440,1920` | Ширины вариантов (px), CSV; пусто = только full-size |
| `imageoptimizer_variant_pattern` | text | `{basename}.{width}.{ext}` | Имя файла; width=0 → `image.jpg.webp` |
| `imageoptimizer_upscale` | boolean | `0` | Варианты шире оригинала; при `0` такие задачи получают `skipped` |
| `imageoptimizer_responsive_min_width` | number | `320` | Брейкпоинты уже этой ширины не генерируются |

## Очередь и cron

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `imageoptimizer_cron_limit` | number | `200` | Задач за один запуск `cron/convert.php` или кнопки **Обработать очередь** |
| `imageoptimizer_stuck_minutes` | number | `30` | Сброс `processing` → `pending`, если дольше N минут |
| `imageoptimizer_retention_days` | number | `30` | `cron/prune.php` удаляет `done` старше N дней; `0` = не чистить |

## Фронтенд (инъекция HTML)

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `imageoptimizer_inject_frontend` | boolean | `1` | Обработка HTML на `OnWebPagePrerender` |
| `imageoptimizer_inject_email` | boolean | `0` | Зарезервировано; **в текущей версии логика не реализована** |
| `imageoptimizer_html_cache` | boolean | `1` | Кэш результата в `core/cache/imageoptimizer/html/` |
| `imageoptimizer_max_html_size` | number | `1048576` | Не обрабатывать HTML больше N байт (1 МБ) |
| `imageoptimizer_default_sizes` | textarea | `(min-width: 1280px) 50vw, 100vw` | Атрибут `sizes`, если не задан на `<img>` |
| `imageoptimizer_skip_classes` | text | `lazy,swiper-lazy,no-optim` | CSS-классы на `<img>` через запятую: пропуск |
| `imageoptimizer_skip_src_pattern` | text | `thumb3x` | Подстрока в `src`: пропуск (URL Thumb3x) |
| `imageoptimizer_respect_existing_srcset` | boolean | `1` | Не оборачивать `<img>` с уже заданным `srcset` |
| `imageoptimizer_respect_existing_picture` | boolean | `1` | Не трогать `<img>` внутри `<picture>` |
| `imageoptimizer_respect_existing_loading` | boolean | `1` | Не перезаписывать атрибут `loading` |
| `imageoptimizer_skip_lazy_first_images` | number | `0` | Первые N `<img>` на странице получают `loading=eager` |

::: warning imageoptimizer_inject_email
Настройка есть в transport и lexicon, но код inject для писем не вызывает. Не включайте, ожидая `<picture>` в email.
:::

## Рекомендуемые пресеты

### Каталог MiniShop3

```
imageoptimizer_enabled = 1
imageoptimizer_inject_frontend = 1
imageoptimizer_convert_on_upload = 1
imageoptimizer_formats = webp
imageoptimizer_breakpoints = 480,768,1024,1440
imageoptimizer_default_sizes = (max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw
imageoptimizer_skip_classes = lazy,swiper-lazy,no-optim,logo-icon
```

### Блог с AVIF

```
imageoptimizer_formats = webp,avif
imageoptimizer_avif_enabled = 1
imageoptimizer_breakpoints = 768,1024,1920
imageoptimizer_default_sizes = (max-width: 768px) 100vw, 800px
```

### Только bulk, без авто-HTML

```
imageoptimizer_inject_frontend = 0
imageoptimizer_convert_on_upload = 0
```

Конвертация через [CLI и cron](cli); в шаблонах — ручной `<picture>` ([Авто-inject](frontend#ручной-вывод-в-шаблонах)).

### Большой каталог, щадящий cron

```
imageoptimizer_cron_limit = 50
imageoptimizer_html_cache = 1
```

## Пропуски в разметке

```html
<img src="assets/banner.jpg" data-imageoptimizer-skip alt="">
<img src="assets/logo.svg" class="no-optim" alt="">
```

Кастомизация без skip:

- `data-imageoptimizer-sizes` — override `sizes` для этого img
- `data-imageoptimizer-fetchpriority` — `high` или `low` для LCP

Подробнее: [Авто-inject и picture](frontend).
