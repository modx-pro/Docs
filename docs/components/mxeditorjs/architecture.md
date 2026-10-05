---
title: Архитектура
---
# Архитектура

Слои пакета и точки расширения. API connector: [API](/components/mxeditorjs/api). Потоки сохранения: [Потоки](/components/mxeditorjs/flows).

## Компоненты

| Слой | Путь | Роль |
| --- | --- | --- |
| Плагин | `core/.../elements/plugins/mxeditorjs.plugin.php` | RTE-хуки MODX |
| Connector | `assets/components/mxeditorjs/connector.php` | JSON API менеджера |
| Клиент | `assets/components/mxeditorjs/js/mxeditorjs.js` | Editor.js, `MxEditorJsApp` |
| PHP | `core/components/mxeditorjs/src/` | Renderer, Validator, Repository, MediaUploader, HtmlMigrator |
| Config | `src/Config/EditorTools.php` | Профили и список допустимых инструментов |

Сниппетов и MODX processors в пакете нет.

## Два сборщика HTML

| Путь | Когда | Где |
| --- | --- | --- |
| Клиент `renderPreviewHtml()` | Сохранение формы ресурса | `mxeditorjs.ts` |
| Сервер `HtmlRenderer` | `content/save` и `content/migrate` (не `dry_run`) | PHP |

Логику нового блока дублируйте в обоих местах. Иначе предпросмотр в менеджере и HTML на сайте разойдутся.

## Таблицы БД

Схема: `core/components/mxeditorjs/model/schema/mxeditorjs.mysql.schema.xml`

### `mxeditorjs_content`

| Поле | Назначение |
| --- | --- |
| `resource_id` | UNIQUE, ID ресурса |
| `content_json` | Editor.js OutputData |
| `content_version` | Счётчик версий |
| `content_hash` | SHA-256 JSON |
| `schema_version` | Версия Editor.js из JSON |
| `created_at`, `updated_at`, `created_by`, `updated_by` | Аудит |

### `mxeditorjs_tv_content`

Те же поля + `tmplvar_id`, UNIQUE `(resource_id, tmplvar_id)`.

## HtmlRenderer

15 типов блоков, включая `mxgallery`. Выравнивание через `tunes.alignmentTune.alignment` для paragraph, header, list, quote.

| Тип | HTML |
| --- | --- |
| `paragraph` | `<p>` |
| `header` | `<h1>`–`<h6>` |
| `list` | `<ul>` / `<ol>` |
| `checklist` | `<ul class="mxeditorjs-checklist">` |
| `image` | `<figure class="mxeditorjs-image"><img>` |
| `gallery` | `<figure class="mxeditorjs-gallery mxeditorjs-gallery--{fit\|slider}">` |
| `mxgallery` | блок mxGallery (HTML зависит от сниппета mxGallery) |
| `attaches` | `<p><a download>` |
| `embed` | `<div class="mxeditorjs-embed"><iframe>` |
| `delimiter` | `<hr>` |
| `quote` | `<blockquote>` + `<cite>` |
| `code` | `<pre><code>` |
| `raw` | сырой HTML |
| `table` | `<table>` |
| `warning` | `<div class="mxeditorjs-warning">` |

Расширение:

```php
$renderer->registerBlockRenderer('myBlock', function (array $data, array $block): string {
    return '<div>...</div>';
});
```

## EditorTools

Класс `MxEditorJs\Config\EditorTools`:

- `DEFAULT_AVAILABLE`: CSV всех block tools
- `PACKAGE_PROFILES`: эталон default, minimal, blog, full
- `resolve()`: итоговый список с учётом допустимых инструментов и обновления
- `migrateProfiles()` / `migrateAvailableTools()`: добавление `gallery` и `mxgallery` при обновлении
- `parseList()`: разбор CSV списка инструментов

Приоритет: `enabled_tools` → `profiles[profile].tools ∩ available_tools` (+ слияние при обновлении) → `available_tools`.

## ContentValidator

Допустимые типы: `paragraph`, `header`, `list`, `checklist`, `quote`, `table`, `code`, `raw`, `embed`, `image`, `gallery`, `mxgallery`, `attaches`, `delimiter`, `warning`.

## Клиент (TypeScript)

Исходники: `assets/components/mxeditorjs/js/src/`.

| Модуль | Назначение |
| --- | --- |
| `mxeditorjs.ts` | `MxEditorJsApp`, RTE hooks, syncToTextarea, renderPreviewHtml |
| `tools/ImageTool.ts` | Image + Media Browser |
| `tools/GalleryTool.ts` | Gallery на `@kiberpro/editorjs-gallery` |
| `tools/MxGalleryTool.ts` | Блок mxGallery (`ids` / коллекция) |
| `tools/AttachesTool.ts` | Attaches + patch-package |
| `tools/LinkAutocomplete.ts` | Поиск ресурсов MODX |
| `tools/MediaBrowser.ts` | Общий браузер для Image/Gallery |
| `tools/ParagraphTool.ts`, `HeaderTool.ts`, `ChecklistTool.ts` | Обёртки с validate |

**Block tools** (профиль): paragraph, header, list, checklist, quote, table, code, raw, embed, image, gallery, mxgallery, attaches, delimiter, warning.

**Всегда включены:** inline marker, inlineCode, underline, linkAutocomplete. Tunes: alignmentTune. Plugin: editorjs-undo.

### Embed

Инструмент `@editorjs/embed` без кнопки в toolbox: только Paste API. В `buildTools()` заданы `services`, включая RuTube (`embedUrl` для `rutube.ru/video/...`). Новый сервис добавляют в `mxeditorjs.ts`, не через системные настройки.

### Интеграция RTE

- `MODx.loadRTE` / `unloadRTE`: основной контент и TV
- `MutationObserver`: `textarea.modx-richtext` (кроме `#ta`)
- Toolbar: Source (Ctrl+U), Fullscreen (F11)
- Версия в URL: `?v={filemtime}` у CSS/JS

## Сборка клиента

```bash
npm install    # postinstall → patch-package (@editorjs/attaches)
npm run build  # IIFE → assets/.../js/mxeditorjs.js
npm run dev    # watch + sourcemap
```

Точка входа: `assets/.../src/mxeditorjs.ts`. Цель ES2020, формат IIFE, глобальный объект `MxEditorJs`.

Патч `patches/@editorjs+attaches+1.3.2.patch` заменяет `appendCallback` на `rendered`. Иначе диалог Attaches не откроется.

## Добавление нового block tool

1. `npm install @editorjs/new-tool`
2. Импорт и регистрация в `buildTools()` (`mxeditorjs.ts`)
3. Тип в `ContentValidator::ALLOWED_BLOCK_TYPES`
4. Сборка HTML в `HtmlRenderer` и `renderPreviewHtml()`
5. ID в `mxeditorjs.available_tools` и профили
6. `npm run build`, синхронизация в установленный MODX

## Transport и обновление

```bash
php _build/build.php
# → core/packages/mxeditorjs-*.transport.zip
```

При обновлении настройки из transport **не перезаписываются** (`settings => false`). Resolvers дописывают `gallery` и `mxgallery` в `available_tools` и профили `default` / `full` / `blog`.

Resolver `resolver_06_metrics.php` отправляет анонимную статистику установки на `https://metrics.modx.pro/`.

## Стили на сайте

`gallery-front.css` подключается только в менеджере. На сайте подключите CSS вручную. См. [Интеграция](/components/mxeditorjs/integration).

## Требования

| | Версия |
| --- | --- |
| MODX | 3.0.3+ |
| PHP | 8.2+ |
| Node.js | 18+ (только сборка клиента) |
