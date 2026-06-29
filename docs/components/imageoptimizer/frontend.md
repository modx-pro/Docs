---
title: Авто-inject и picture
---

# Авто-inject и picture

При `imageoptimizer_inject_frontend=1` плагин на `OnWebPagePrerender` парсит HTML и для подходящих `<img>`:

1. Находит media source и путь к файлу на диске
2. Проверяет готовые варианты (статус `done` в очереди)
3. Оборачивает в `<picture>` с `<source type="image/webp">` / AVIF и fallback `<img>`
4. Добавляет `srcset`, `sizes`, при необходимости `loading` и `decoding`

Inject не выполняется в контексте `mgr`, для AJAX (`X-Requested-With`) и для non-HTML content types.

## Пример результата

Исходник:

```html
<img src="assets/images/hero.jpg" alt="Hero">
```

После обработки (варианты 480/768/1024 и full WebP на диске):

```html
<picture>
  <source type="image/webp"
    srcset="assets/images/hero.480.webp 480w,
            assets/images/hero.768.webp 768w,
            assets/images/hero.1024.webp 1024w,
            assets/images/hero.jpg.webp 1920w"
    sizes="(min-width: 1280px) 50vw, 100vw">
  <img src="assets/images/hero.jpg" alt="Hero"
    loading="lazy" decoding="async"
    srcset="..." sizes="...">
</picture>
```

Точная разметка зависит от `imageoptimizer_breakpoints`, `imageoptimizer_formats` и `imageoptimizer_variant_pattern`.

## Условия пропуска

| Условие | Настройка / атрибут |
| --- | --- |
| Компонент выключен | `imageoptimizer_enabled=0` |
| Inject выключен | `imageoptimizer_inject_frontend=0` |
| Уже внутри `<picture>` | `imageoptimizer_respect_existing_picture=1` |
| Уже есть `srcset` | `imageoptimizer_respect_existing_srcset=1` (только lazy/decoding) |
| CSS-класс | `imageoptimizer_skip_classes` (по умолчанию `lazy`, `swiper-lazy`, `no-optim`) |
| Подстрока в URL | `imageoptimizer_skip_src_pattern` (по умолчанию `thumb3x`) |
| Явный skip | `data-imageoptimizer-skip` на `<img>` |
| Внешний URL | не резолвится в локальный media source |
| Нет вариантов на диске | очередь не обработана или skip при конвертации |
| HTML слишком большой | `imageoptimizer_max_html_size` (1 МБ по умолчанию) |

URL с `thumb3x` пропускаются, чтобы не дублировать on-the-fly thumbs Thumb3x. См. [Совместимость](compatibility#thumb3x).

## Lazy loading и LCP

На обработанных img по умолчанию добавляются `loading="lazy"` и `decoding="async"`, если:

- `imageoptimizer_respect_existing_loading=0` или атрибут `loading` ещё не задан
- img не входит в первые N на странице (`imageoptimizer_skip_lazy_first_images`)

Для LCP-изображения (первый экран):

```html
<img src="assets/hero.jpg" alt="" data-imageoptimizer-fetchpriority="high">
```

Или задайте `imageoptimizer_skip_lazy_first_images=1` (или больше).

## Атрибут sizes

Приоритет:

1. Атрибут `sizes` на `<img>`
2. `data-imageoptimizer-sizes`
3. `imageoptimizer_default_sizes`

Для карточки товара:

```
(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw
```

## Кэш HTML

При `imageoptimizer_html_cache=1` результат inject сохраняется в `core/cache/imageoptimizer/html/`.

Ключ кэша привязан к ресурсу и generation-счётчику: он растёт при каждом успешном `done` в очереди. Новые WebP попадают на фронт без смены `editedon` ресурса.

Сброс:

- **Управление → Очистить кэш** MODX
- События `OnSiteRefresh` / `OnCacheUpdate`
- **Очистить варианты** в админке (очищает и HTML-кэш ImageOptimizer)
- Смена настроек inject

Если после конвертации `<picture>` не появился, очистите кэш MODX и HTML-кэш ImageOptimizer.

## Ручной вывод в шаблонах

Варианты лежат рядом с оригиналом в media source:

| Тип | Пример пути |
| --- | --- |
| Full WebP | `image.jpg.webp` |
| Width 768 WebP | `image.768.webp` |
| AVIF | `image.768.avif` |

Шаблон имени: `imageoptimizer_variant_pattern` (плейсхолдеры `{basename}`, `{width}`, `{ext}`).

::: code-group

```modx
<picture>
  <source type="image/webp"
    srcset="[[++assets_url]]images/photo.480.webp 480w,
            [[++assets_url]]images/photo.768.webp 768w,
            [[++assets_url]]images/photo.jpg.webp 1200w"
    sizes="(max-width: 768px) 100vw, 50vw">
  <img src="[[++assets_url]]images/photo.jpg" alt="..." width="1200" height="800">
</picture>
```

```fenom
<picture>
  <source type="image/webp"
    srcset="{$_modx->config.assets_url}images/photo.480.webp 480w,
            {$_modx->config.assets_url}images/photo.768.webp 768w,
            {$_modx->config.assets_url}images/photo.jpg.webp 1200w"
    sizes="(max-width: 768px) 100vw, 50vw">
  <img src="{$_modx->config.assets_url}images/photo.jpg" alt="..." width="1200" height="800">
</picture>
```

:::

Отключите авто-inject для таких блоков: `data-imageoptimizer-skip` или класс из `imageoptimizer_skip_classes`.

## MiniShop3 и произвольные чанки

При включённом inject достаточно обычного `<img src="assets/...">` в чанке товара. Плагин обрабатывает итоговый HTML страницы. Чанки MS3 править не нужно.

## Связанные разделы

- [Системные настройки](settings) — все ключи inject
- [Совместимость](compatibility) — Thumb3x, MS3
- [Решение проблем](troubleshooting) — если inject не срабатывает
