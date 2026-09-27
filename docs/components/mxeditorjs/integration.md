---
title: Интеграция
---
# Интеграция

## Включение в менеджере

1. **Настройки → Системные настройки** → **which_editor** → **mxEditorJs**.
2. **mxeditorjs.enabled** = **Да** (пространство имён `mxeditorjs`).
3. Откройте ресурс: в поле контента блочный редактор.

Плагин на `OnDocFormPrerender` запускает редактор, когда на странице появляется поле контента или TV с richtext.

**Сохранение через форму ресурса** (основной путь):

1. Editor.js отдаёт JSON и HTML (клиент `renderPreviewHtml`) в textarea и скрытые поля
2. MODX сохраняет HTML в `modResource.content` / TV
3. Плагин на `OnBeforeDocFormSave` пишет JSON в sidecar

Форма **не вызывает** connector `content/save`. Он нужен для AJAX и своих интеграций. Подробнее: [Потоки](/components/mxeditorjs/flows).

## Использование в Template Variables

1. Создайте TV типа **Текст (многострочный)** (textarea).
2. В настройках TV включите **Использовать визуальный редактор** (richtext).
3. При `which_editor` = **mxEditorJs** в этом TV будет тот же блочный редактор.

JSON TV хранится в `mxeditorjs_tv_content`. HTML попадает в textarea TV при сохранении.

## Вывод на сайте

После сохранения контент ресурса существует в двух видах:

- **JSON**: sidecar для редактора (подставляется при следующем открытии формы)
- **HTML**: `modResource.content` (вывод на сайте)

В шаблоне:

::: code-group

```modx
[[*content]]
```

```fenom
{$_modx->resource.content}
```

:::

TV с Editor.js: плейсхолдер `[[*my_richtext_tv]]` или Fenom. На сайте всегда готовый HTML.

## Миграция HTML → Editor.js

Конвертация HTML в поле контента в формат Editor.js:

1. Connector: действие **content/migrate**, параметры `resource_id`, при необходимости `dry_run=1` (предпросмотр), затем `confirmed=1` для перезаписи.
2. При `dry_run` в ответе: `preview` (блоки) и `blocks_count`. При успехе: `migrated`, `blocks_count`, `overwritten`, `html`.

После `confirmed` миграция пишет sidecar **и** HTML-снимок в `modResource.content` (`HtmlRenderer`, как `content/save`). `[[*content]]` на сайте обновляется без повторного сохранения формы.

## MIGX

В Form Tabs у колонки `"inputTVtype": "richtext"`. MIGX сопоставляет тип с `migx` + `which_editor` → `migxmxeditorjs`. Значение — HTML в JSON строки. Sidecar нет. Перед закрытием окна вызовите `MxEditorJsFlush`.

## Профили и инструменты

Набор блоков задаёт **mxeditorjs.profile** или **mxeditorjs.enabled_tools**. См. [Системные настройки](/components/mxeditorjs/settings).

## Медиа и пресеты

- Загрузка **изображений** и блока **Gallery**: Media Source **mxeditorjs.image_mediasource**, путь **mxeditorjs.image_upload_path** (шаблон с `{resource_id}`).
- Загрузка **файлов-вложений** (Attaches): **mxeditorjs.file_mediasource** и путь **mxeditorjs.file_upload_path**.
- Лимит картинок в одном блоке Gallery: **mxeditorjs.gallery_max_count** (`0` = без лимита).
- CSS-классы: **mxeditorjs.image_class_presets**, **mxeditorjs.link_class_presets** и др. Пресеты Image в редакторе **не добавляют** класс к `<img>` в HTML-снимке. См. [Системные настройки](/components/mxeditorjs/settings).

## Галерея на сайте

HTML-снимок Gallery собирается при сохранении: клиент `renderPreviewHtml` или сервер `HtmlRenderer` (`content/save`, `content/migrate`). Разметка:

- `<figure class="mxeditorjs-gallery mxeditorjs-gallery--fit">`: сетка (режим **Fit**)
- `<figure class="mxeditorjs-gallery mxeditorjs-gallery--slider">`: горизонтальный скролл (режим **Slider**)

`gallery-front.css` подключается только в менеджере (предпросмотр в форме). На сайте CSS сам не грузится.

Подключите стили в шаблоне или теме:

```html
<link rel="stylesheet" href="/assets/components/mxeditorjs/css/gallery-front.css">
```

Либо скопируйте правила из `assets/components/mxeditorjs/css/gallery-front.css` в CSS темы.

## Embed на сайте

Блок embed выводит `<div class="mxeditorjs-embed"><iframe ...></iframe></div>`. Сервисы `@editorjs/embed` заданы в `mxeditorjs.ts` (секция `services`). Системной настройки нет. Свой сервис добавляют в исходниках. См. [Архитектура](/components/mxeditorjs/architecture).

## Что дальше

- [Руководство редактора](/components/mxeditorjs/user-guide): блоки, embed, TV
- [Потоки](/components/mxeditorjs/flows): сохранение, sidecar, connector
- [API](/components/mxeditorjs/api): действия коннектора, PHP-классы
- [Системные настройки](/components/mxeditorjs/settings): профили, медиа, пресеты
- [FAQ](/components/mxeditorjs/faq): типовые вопросы
