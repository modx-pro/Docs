---
title: mxEditorJs
description: Блочный редактор Editor.js для MODX 3 — контент блоками вместо TinyMCE/CKEditor
author: Ibochkarev
logo: https://modstore.pro/assets/extras/mxeditorjs/logo.png
modstore: https://modstore.pro/packages/content/mxeditorjs
repository: https://github.com/Ibochkarev/mxEditorJs
dependencies: []
categories: content

compatibility:
  - modx3
  - php82
items: [
  { text: 'Начало работы', link: 'quick-start', items: [
    { text: 'Быстрый старт', link: 'quick-start' },
    { text: 'Системные настройки', link: 'settings' },
    { text: 'Руководство редактора', link: 'user-guide' },
  ]},
  { text: 'Интеграция', link: 'integration', items: [
    { text: 'TV, миграция, фронт', link: 'integration' },
    { text: 'FAQ', link: 'faq' },
  ]},
  { text: 'Для разработчика', link: 'api', items: [
    { text: 'API и интерфейсы', link: 'api' },
    { text: 'Потоки', link: 'flows' },
    { text: 'Архитектура', link: 'architecture' },
    { text: 'Решение проблем', link: 'troubleshooting' },
  ]},
]
---
# mxEditorJs

Блочный редактор для MODX 3 на базе [Editor.js](https://editorjs.io/). Вместо TinyMCE/CKEditor контент собирается блоками. На сайте выходит HTML.

## Быстрые ссылки

| Нужно | Документ |
| --- | --- |
| Включить редактор за 3 шага | [Быстрый старт](/components/mxeditorjs/quick-start) |
| Работа с блоками, медиа, embed | [Руководство редактора](/components/mxeditorjs/user-guide) |
| Настроить профили инструментов и медиа | [Системные настройки](/components/mxeditorjs/settings) |
| Connector API, PHP-классы, форматы данных | [API](/components/mxeditorjs/api) |
| TV, миграция HTML → Editor.js | [Интеграция](/components/mxeditorjs/integration) |
| Типовые вопросы редакторов | [FAQ](/components/mxeditorjs/faq) |
| Save flow, sidecar, connector | [Потоки](/components/mxeditorjs/flows) |

## Кому что читать

- **Редактору:** [Руководство редактора](/components/mxeditorjs/user-guide)
- **Администратору:** [Системные настройки](/components/mxeditorjs/settings), [FAQ](/components/mxeditorjs/faq)
- **Разработчику:** [API](/components/mxeditorjs/api), [Потоки](/components/mxeditorjs/flows), [Архитектура](/components/mxeditorjs/architecture), [Решение проблем](/components/mxeditorjs/troubleshooting)

[modstore.pro](https://modstore.pro/packages/content/mxeditorjs), [GitHub](https://github.com/Ibochkarev/mxEditorJs). Changelog: `core/components/mxeditorjs/docs/changelog.txt`.

## Возможности

- **15 типов блоков:** параграф, заголовок, список, чеклист, цитата, таблица, код, raw HTML, embed, изображение, **галерея**, **mxGallery**, вложение, разделитель, предупреждение. Toolbox `mxgallery` только если установлен пакет mxGallery.
- **TV**: основной контент и Template Variables типа `textarea` с richtext
- **Медиа**: drag-and-drop через Media Sources. Отдельные пути для изображений и вложений (Attaches)
- **Галерея**: несколько изображений, сортировка, сетка или слайдер, загрузка и «Обзор» через Media Source
- **Браузер файлов**: навигация по Media Source
- **Автодополнение ссылок**: поиск ресурсов MODX
- **Миграция HTML → Editor.js**
- **Профили**: default, minimal, blog, full и свои
- **Полноэкранный режим**, **Source Preview**, **Undo/Redo**, выравнивание
- **Локализация**: русский и английский, наследует локаль менеджера
- **CSS-пресеты**: классы для изображений и ссылок

## Используемые плагины Editor.js

Каталог инструментов: [Awesome Editor.js](https://github.com/editor-js/awesome-editorjs).

### Блоковые инструменты (Block Tools)

| Плагин | Описание | Ссылки |
| --- | --- | --- |
| **@editorjs/paragraph** | Базовый текстовый блок | [npm](https://www.npmjs.com/package/@editorjs/paragraph) · [awesome](https://github.com/editor-js/awesome-editorjs#text-and-typography) |
| **@editorjs/header** | Заголовки H2–H5 | [npm](https://www.npmjs.com/package/@editorjs/header) · [awesome](https://github.com/editor-js/awesome-editorjs#text-and-typography) |
| **@editorjs/list** | Маркированные и нумерованные списки | [npm](https://www.npmjs.com/package/@editorjs/list) · [awesome](https://github.com/editor-js/awesome-editorjs#lists) |
| **@editorjs/checklist** | Чеклист с галочками | [npm](https://www.npmjs.com/package/@editorjs/checklist) · [awesome](https://github.com/editor-js/awesome-editorjs#lists) |
| **@editorjs/quote** | Цитата | [npm](https://www.npmjs.com/package/@editorjs/quote) · [awesome](https://github.com/editor-js/awesome-editorjs#text-and-typography) |
| **@editorjs/table** | Таблица | [npm](https://www.npmjs.com/package/@editorjs/table) · [awesome](https://github.com/editor-js/awesome-editorjs#table) |
| **@editorjs/code** | Блок кода | [npm](https://www.npmjs.com/package/@editorjs/code) · [awesome](https://github.com/editor-js/awesome-editorjs#code) |
| **@editorjs/raw** | Сырой HTML | [npm](https://www.npmjs.com/package/@editorjs/raw) · [awesome](https://github.com/editor-js/awesome-editorjs#code) |
| **@editorjs/embed** | Встраиваемый контент (YouTube, Paste и т.д.) | [npm](https://www.npmjs.com/package/@editorjs/embed) · [awesome](https://github.com/editor-js/awesome-editorjs#media--embed) |
| **@editorjs/attaches** | Вложение файлов | [npm](https://www.npmjs.com/package/@editorjs/attaches) · [awesome](https://github.com/editor-js/awesome-editorjs#media--embed) |
| **@editorjs/delimiter** | Разделитель | [npm](https://www.npmjs.com/package/@editorjs/delimiter) · [awesome](https://github.com/editor-js/awesome-editorjs#text-and-typography) |
| **@editorjs/warning** | Блок предупреждения | [npm](https://www.npmjs.com/package/@editorjs/warning) · [awesome](https://github.com/editor-js/awesome-editorjs#text-and-typography) |
| **Image** | Изображение с загрузкой и браузером MODX Media Source | В составе mxEditorJs (`ImageTool.ts`), аналог [@editorjs/image](https://github.com/editor-js/awesome-editorjs#media--embed) |
| **Gallery** | Галерея на базе `@kiberpro/editorjs-gallery`: сортировка, режимы fit/slider | В составе mxEditorJs (`GalleryTool.ts`) |
| **mxGallery** | Блок пакета mxGallery: медиа по `ids` или коллекция | В составе mxEditorJs (`MxGalleryTool.ts`). Toolbox только если есть `core/components/mxgallery/` |

### Инлайновые инструменты (Inline Tools)

| Плагин | Описание | Ссылки |
| --- | --- | --- |
| **@editorjs/marker** | Выделение текста (маркер) | [npm](https://www.npmjs.com/package/@editorjs/marker) · [awesome](https://github.com/editor-js/awesome-editorjs#inline-tools) |
| **@editorjs/inline-code** | Моноширинный код в тексте | [npm](https://www.npmjs.com/package/@editorjs/inline-code) · [awesome](https://github.com/editor-js/awesome-editorjs#inline-tools) |
| **@editorjs/underline** | Подчёркивание | [npm](https://www.npmjs.com/package/@editorjs/underline) · [awesome](https://github.com/editor-js/awesome-editorjs#inline-tools) |

Ссылки и автодополнение по ресурсам MODX: инструмент **LinkAutocomplete** в составе mxEditorJs (по мотивам [@editorjs/link-autocomplete](https://github.com/editor-js/awesome-editorjs#inline-tools)).

### Блочный tune (Block Tune)

| Плагин | Описание | Ссылки |
| --- | --- | --- |
| **editorjs-text-alignment-blocktune** | Выравнивание текста в блоках (влево, по центру, вправо) | [npm](https://www.npmjs.com/package/editorjs-text-alignment-blocktune) · [GitHub](https://github.com/kaaaaaaaaaaai/editorjs-alignment-blocktune) · [awesome](https://github.com/editor-js/awesome-editorjs#block-tune-tools) |

### Плагины редактора

| Плагин | Описание | Ссылки |
| --- | --- | --- |
| **editorjs-undo** | Отмена и повтор действий (Undo/Redo) | [npm](https://www.npmjs.com/package/editorjs-undo) · [GitHub](https://github.com/kommitters/editorjs-undo) · [awesome](https://github.com/editor-js/awesome-editorjs#plugins) |

### Ядро

| Плагин | Ссылки |
| --- | --- |
| **@editorjs/editorjs** — ядро Editor.js | [npm](https://www.npmjs.com/package/@editorjs/editorjs) · [GitHub](https://github.com/codex-team/editor.js) · [документация](https://editorjs.io/) |

## Требования

| Зависимость | Версия |
| --- | --- |
| MODX Revolution | 3.0.3+ |
| PHP | 8.2+ |
| Node.js | 18+ (только для сборки фронтенда из исходников) |

## Установка

### Через менеджер пакетов

1. **Extras → Installer** (MODX 3: **Пакеты → Установщик**)
2. **Download Extras**, обновите список пакетов
3. Найдите **mxEditorJs** → **Download** → **Install**
4. **Управление → Очистить кэш** (MODX 3: **Настройки → Очистить кэш**)

Либо `mxeditorjs-*.transport.zip`: **Пакеты → Установщик** → **Загрузить пакет** → установить → очистить кэш.

### Из исходников (разработка)

```bash
cd /path/to/modx/Extras/
git clone https://github.com/Ibochkarev/mxEditorJs mxEditorJs
cd mxEditorJs
npm install
npm run build
php _build/build.php
```

## Быстрый старт (3 шага)

1. **Система → Системные настройки** → `which_editor` → **mxEditorJs**
2. `mxeditorjs.enabled` = **Да**
3. Откройте ресурс: в поле контента появится блочный редактор

Подробнее: [Быстрый старт](/components/mxeditorjs/quick-start).

## Системные настройки (кратко)

Все настройки в пространстве имён **mxeditorjs**.

| Ключ | По умолчанию | Назначение |
| --- | --- | --- |
| `mxeditorjs.enabled` | `true` | Включить/выключить редактор |
| `mxeditorjs.profile` | `default` | Активный профиль инструментов |
| `mxeditorjs.enabled_tools` | — | Переопределение профиля: список инструментов через запятую |
| `mxeditorjs.image_mediasource` | `1` | ID Media Source для изображений и галереи |
| `mxeditorjs.image_upload_path` | `images/resources/{resource_id}/` | Путь загрузки изображений (Image, Gallery) |
| `mxeditorjs.file_upload_path` | `files/resources/{resource_id}/` | Путь загрузки файлов-вложений (Attaches) |
| `mxeditorjs.gallery_max_count` | `0` | Макс. изображений в блоке Gallery (`0` = без лимита) |
| `mxeditorjs.max_upload_size` | `5242880` (5 МБ) | Макс. размер загружаемого файла (байты) |

Полный список: [Системные настройки](/components/mxeditorjs/settings).
