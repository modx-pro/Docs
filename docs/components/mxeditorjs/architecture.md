---
title: Архитектура
---
# Архитектура

Обзор компонента для разработчиков. API connector: [API](api). Потоки сохранения: [Потоки](flows).

## Компоненты

| Слой | Путь | Роль |
| --- | --- | --- |
| Плагин | `core/.../elements/plugins/mxeditorjs.plugin.php` | RTE-хуки MODX |
| Connector | `assets/components/mxeditorjs/connector.php` | JSON API manager |
| Frontend | `assets/components/mxeditorjs/js/mxeditorjs.js` | Editor.js, `MxEditorJsApp` |
| PHP | `core/components/mxeditorjs/src/` | Renderer, Validator, Repository, MediaUploader, HtmlMigrator |
| Config | `src/Config/EditorTools.php` | Профили и whitelist инструментов |

Сниппетов и MODX processors в пакете нет.

## Два рендерера HTML

| Путь | Когда | Где |
| --- | --- | --- |
| Клиент `renderPreviewHtml()` | Сохранение формы ресурса | `mxeditorjs.ts` |
| Сервер `HtmlRenderer` | `content/save`, миграция | PHP |

Логику нового блока дублируйте в обоих местах, иначе preview в manager и HTML на сайте разойдутся.

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

14 типов блоков. Выравнивание через `tunes.alignmentTune.alignment` для paragraph, header, list, quote.

| Тип | HTML |
| --- | --- |
| `paragraph` | `<p>` |
| `header` | `<h1>`–`<h6>` |
| `list` | `<ul>` / `<ol>` |
| `checklist` | `<ul class="mxeditorjs-checklist">` |
| `image` | `<figure class="mxeditorjs-image"><img>` |
| `gallery` | `<figure class="mxeditorjs-gallery mxeditorjs-gallery--{fit\|slider}">` |
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

- `DEFAULT_AVAILABLE` — CSV всех block tools
- `PACKAGE_PROFILES` — эталон default, minimal, blog, full
- `resolve()` — итоговый список с учётом whitelist и upgrade
- `migrateProfiles()` / `migrateAvailableTools()` — добавление `gallery` при обновлении

Приоритет: `enabled_tools` → `profiles[profile].tools ∩ available_tools` (+ merge при upgrade) → `available_tools`.

## ContentValidator

Whitelist типов: `paragraph`, `header`, `list`, `checklist`, `quote`, `table`, `code`, `raw`, `embed`, `image`, `gallery`, `attaches`, `delimiter`, `warning`.

## Клиент (TypeScript)

Исходники: `assets/components/mxeditorjs/js/src/`.

| Модуль | Назначение |
| --- | --- |
| `mxeditorjs.ts` | `MxEditorJsApp`, RTE hooks, syncToTextarea, renderPreviewHtml |
| `tools/ImageTool.ts` | Image + Media Browser |
| `tools/GalleryTool.ts` | Gallery на `@kiberpro/editorjs-gallery` |
| `tools/AttachesTool.ts` | Attaches + patch-package |
| `tools/LinkAutocomplete.ts` | Поиск ресурсов MODX |
| `tools/MediaBrowser.ts` | Общий браузер для Image/Gallery |
| `tools/ParagraphTool.ts`, `HeaderTool.ts`, `ChecklistTool.ts` | Обёртки с validate |

**Block tools** (профиль): paragraph, header, list, checklist, quote, table, code, raw, embed, image, gallery, attaches, delimiter, warning.

**Всегда включены:** inline marker, inlineCode, underline, linkAutocomplete. Tunes: alignmentTune. Plugin: editorjs-undo.

### Embed

Инструмент `@editorjs/embed` без кнопки в toolbox — только Paste API. В `buildTools()` заданы `services`, включая RuTube (`embedUrl` для `rutube.ru/video/...`). Новый сервис добавляют в `mxeditorjs.ts`, не через системные настройки.

### RTE integration

- `MODx.loadRTE` / `unloadRTE` — основной контент и TV
- `MutationObserver` — `textarea.modx-richtext` (кроме `#ta`)
- Toolbar: Source (Ctrl+U), Fullscreen (F11)
- Cache-bust: `?v={filemtime}` на CSS/JS

## Сборка фронтенда

```bash
npm install    # postinstall → patch-package (@editorjs/attaches)
npm run build  # IIFE → assets/.../js/mxeditorjs.js
npm run dev    # watch + sourcemap
```

Entry: `assets/.../src/mxeditorjs.ts`. Target ES2020, format IIFE, global `MxEditorJs`.

Патч `patches/@editorjs+attaches+1.3.2.patch` заменяет `appendCallback` на `rendered`, иначе диалог Attaches не откроется.

## Добавление нового block tool

1. `npm install @editorjs/new-tool`
2. Импорт и регистрация в `buildTools()` (`mxeditorjs.ts`)
3. Тип в `ContentValidator::ALLOWED_BLOCK_TYPES`
4. Рендер в `HtmlRenderer` и `renderPreviewHtml()`
5. ID в `mxeditorjs.available_tools` и профили
6. `npm run build`, синхронизация в установленный MODX

## Transport и upgrade

```bash
php _build/build.php
# → core/packages/mxeditorjs-*.transport.zip
```

При upgrade настройки из transport **не перезаписываются** (`settings => false`). Новые ключи добавляют resolvers (`resolve.settings.php` для gallery).

Resolver `resolver_06_metrics.php` отправляет анонимную статистику установки на `https://metrics.modx.pro/`.

## Стили на сайте

`gallery-front.css` подключает только manager. На витрине подключите CSS вручную — см. [Интеграция](integration).

## Требования

| | Версия |
| --- | --- |
| MODX | 3.0.3+ |
| PHP | 8.2+ |
| Node.js | 18+ (только сборка фронта) |
