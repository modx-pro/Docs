---
title: Интеграция
---
# Интеграция

## Включение в менеджере

1. **Настройки → Системные настройки** → **which_editor** → **mxEditorJs**.
2. **mxeditorjs.enabled** = **Да** (пространство имён `mxeditorjs`).
3. Откройте ресурс: в поле контента блочный редактор.

Плагин подключает редактор на `OnDocFormPrerender` и запускает его, когда появляется поле контента или TV с richtext.

**Сохранение через форму ресурса** (основной путь):

1. Editor.js отдаёт JSON и HTML (клиент `renderPreviewHtml`) в textarea и hidden fields
2. MODX сохраняет HTML в `modResource.content` / TV
3. Плагин на `OnBeforeDocFormSave` пишет JSON в sidecar

Форма **не вызывает** connector `content/save`. Он нужен для AJAX и своих интеграций. Подробнее: [Потоки](/components/mxeditorjs/flows).

## Использование в Template Variables

1. Создайте TV типа **Текст (многострочный)** (textarea).
2. В настройках TV включите **Использовать визуальный редактор** (richtext).
3. При `which_editor` = **mxEditorJs** в этом TV будет тот же блочный редактор.

Контент TV хранится в sidecar-таблице `mxeditorjs_tv_content` в формате Editor.js. При выводе на сайте используется собранный HTML (как и для основного контента).

## Вывод на сайте

Контент ресурса после сохранения существует в двух видах:

- **JSON**: в sidecar для редактора (при следующем открытии формы подставляется в Editor.js).
- **HTML**: в `modResource.content` (вывод на фронте).

В шаблоне:

::: code-group

```modx
[[*content]]
```

```fenom
{$_modx->resource.content}
```

:::

TV с Editor.js выводятся через плейсхолдеры TV (`[[*my_richtext_tv]]` или Fenom). HTML попадает в textarea TV при сохранении. На фронте всегда готовый HTML.

## Миграция HTML → Editor.js

Конвертация HTML в поле контента в формат Editor.js:

1. Connector: действие **content/migrate**, параметры `resource_id`, при необходимости `dry_run=1` (предпросмотр), затем `confirmed=1` для перезаписи.
2. При `dry_run` в ответе: `preview` (блоки) и `blocks_count`. При успехе: `migrated`, `blocks_count`, `overwritten`.

После миграции менеджер открывает блоки из sidecar. `[[*content]]` на сайте остаётся старым HTML, пока не сохранят форму или не вызовут `content/save` ([#5](https://github.com/Ibochkarev/mxEditorJs/issues/5)).

## Профили и инструменты

Набор блоков задаёт **mxeditorjs.profile** или **mxeditorjs.enabled_tools**. См. [Системные настройки](/components/mxeditorjs/settings).

## Медиа и пресеты

- Загрузка **изображений** и блока **Gallery**: Media Source **mxeditorjs.image_mediasource**, путь **mxeditorjs.image_upload_path** (шаблон с `{resource_id}`).
- Загрузка **файлов-вложений** (Attaches): **mxeditorjs.file_mediasource** и путь **mxeditorjs.file_upload_path**.
- Лимит картинок в одном блоке Gallery: **mxeditorjs.gallery_max_count** (`0` = без лимита).
- CSS-классы: **mxeditorjs.image_class_presets**, **mxeditorjs.link_class_presets** и др. Пресеты Image в UI редактора **не добавляют** класс к `<img>` в HTML-снимке. См. [Системные настройки](/components/mxeditorjs/settings).

## Галерея на фронте

HTML-снимок блока Gallery собирается при сохранении (клиент `renderPreviewHtml` или сервер `HtmlRenderer` при `content/save`). Разметка:

- `<figure class="mxeditorjs-gallery mxeditorjs-gallery--fit">`: сетка (режим **Fit**)
- `<figure class="mxeditorjs-gallery mxeditorjs-gallery--slider">`: горизонтальный скролл (режим **Slider**)

Файл `gallery-front.css` подключает **только manager** (превью в форме ресурса). На витрине CSS **не грузится** автоматически.

Подключите стили в шаблоне или теме:

```html
<link rel="stylesheet" href="/assets/components/mxeditorjs/css/gallery-front.css">
```

Либо скопируйте правила из `assets/components/mxeditorjs/css/gallery-front.css` в CSS темы.

## Embed на фронте

Блок embed выводит `<div class="mxeditorjs-embed"><iframe ...></iframe></div>`. RuTube и другие сервисы `@editorjs/embed` настраиваются в `mxeditorjs.ts` (секция `services`). Отдельной системной настройки нет. Свой сервис добавляет разработчик в исходниках. См. [Архитектура](/components/mxeditorjs/architecture).

## Что дальше

- [Руководство редактора](/components/mxeditorjs/user-guide): блоки, embed, TV
- [Потоки](/components/mxeditorjs/flows): save flow, sidecar, connector
- [API](/components/mxeditorjs/api): эндпоинты коннектора, PHP-классы
- [Системные настройки](/components/mxeditorjs/settings): профили, медиа, пресеты
- [FAQ](/components/mxeditorjs/faq): типовые вопросы
