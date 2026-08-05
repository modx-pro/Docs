---
title: Интеграция
---
# Интеграция

Как включить mxEditorJs в MODX, использовать в TV и выводить контент на сайте.

## Включение в менеджере

1. **Настройки → Системные настройки** → найдите **which_editor** → выберите **mxEditorJs**.
2. Убедитесь, что **mxeditorjs.enabled** = **Да** (пространство имён `mxeditorjs`).
3. Откройте ресурс — в поле контента отображается блочный редактор.

Редактор подключается плагином на `OnDocFormPrerender` и инициализируется при появлении поля контента (или TV с richtext).

**Сохранение через форму ресурса** (основной путь):

1. Editor.js отдаёт JSON и HTML (клиент `renderPreviewHtml`) в textarea и hidden fields
2. MODX сохраняет HTML в `modResource.content` / TV
3. Плагин на `OnBeforeDocFormSave` пишет JSON в sidecar

Connector `content/save` форма **не вызывает**. Он нужен для AJAX и кастомных интеграций. Подробнее: [Потоки](flows).

## Использование в Template Variables

1. Создайте TV типа **Текст (многострочный)** (textarea).
2. В настройках TV включите **Использовать визуальный редактор** (richtext).
3. При `which_editor` = **mxEditorJs** в этом TV будет тот же блочный редактор.

Контент TV хранится в sidecar-таблице `mxeditorjs_tv_content` в формате Editor.js. При выводе на сайте используется сгенерированный HTML (как и для основного контента).

## Вывод на сайте

Контент ресурса (основное поле `content`) после сохранения в mxEditorJs хранится в двух видах:

- **JSON** — в sidecar для редактора (при следующем открытии формы подставляется в Editor.js).
- **HTML** — в `modResource.content` (используется при выводе на фронте).

В шаблоне выводите контент как обычно:

::: code-group

```modx
[[*content]]
```

```fenom
{$_modx->resource.content}
```

:::

Дополнительные TV с Editor.js выводятся через плейсхолдеры TV (например `[[*my_richtext_tv]]` или через Fenom). HTML попадает в textarea TV при сохранении. На фронте всегда готовый HTML.

## Миграция HTML → Editor.js

Если у вас уже есть ресурсы с HTML в поле контента, можно конвертировать их в формат Editor.js.

1. Через Connector: действие **content/migrate** с параметрами `resource_id`, при необходимости `dry_run=1` (предпросмотр), затем `confirmed=1` для перезаписи.
2. В ответе при `dry_run` приходит `preview` (блоки) и `blocks_count`. При успешной миграции — `migrated`, `blocks_count`, `overwritten`.

После миграции при открытии ресурса в менеджере контент отображается в блочном редакторе. На сайте по-прежнему выводится HTML из `modResource.content`, обновлённый при миграции.

## Профили и инструменты

Набор блоков (параграф, заголовок, список, картинка и т.д.) задаётся профилем (**mxeditorjs.profile**) или списком **mxeditorjs.enabled_tools**. См. [Системные настройки](settings).

## Медиа и пресеты

- Загрузка **изображений** и блока **Gallery** — Media Source **mxeditorjs.image_mediasource**, путь **mxeditorjs.image_upload_path** (шаблон с `{resource_id}`).
- Загрузка **файлов-вложений** (Attaches) — **mxeditorjs.file_mediasource** и отдельный путь **mxeditorjs.file_upload_path**.
- Лимит числа картинок в одном блоке Gallery — **mxeditorjs.gallery_max_count** (`0` = без лимита).
- CSS-классы для изображений и ссылок задаются в пресетах (**mxeditorjs.image_class_presets**, **mxeditorjs.link_class_presets** и др.). Пресеты Image в UI редактора **не добавляют** класс к `<img>` в HTML-снимке — см. [Системные настройки](settings).

## Галерея на фронте

HTML-снимок блока Gallery генерируется при сохранении (клиент `renderPreviewHtml` или сервер `HtmlRenderer` при `content/save`). Разметка:

- `<figure class="mxeditorjs-gallery mxeditorjs-gallery--fit">` — сетка (режим **Fit**)
- `<figure class="mxeditorjs-gallery mxeditorjs-gallery--slider">` — горизонтальный скролл (режим **Slider**)

Файл `gallery-front.css` подключает **только manager** (превью в форме ресурса). На витрине CSS **не грузится** автоматически.

Подключите стили в шаблоне или теме:

```html
<link rel="stylesheet" href="/assets/components/mxeditorjs/css/gallery-front.css">
```

Либо скопируйте правила из `assets/components/mxeditorjs/css/gallery-front.css` в CSS темы.

## Embed на фронте

Блок embed выводит `<div class="mxeditorjs-embed"><iframe ...></iframe></div>`. RuTube и другие сервисы `@editorjs/embed` настраиваются в `mxeditorjs.ts` (секция `services`), отдельной системной настройки нет. Кастомный сервис добавляет разработчик в исходниках — см. [Архитектура](architecture).

## Что дальше

- [Руководство редактора](user-guide) — блоки, embed, TV
- [Потоки](flows) — save flow, sidecar, connector
- [API](api) — эндпоинты коннектора, PHP-классы
- [Системные настройки](settings) — профили, медиа, пресеты
- [FAQ](faq) — типовые вопросы
