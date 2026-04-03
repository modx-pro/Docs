---
title: mxEditorJs
description: Блочный редактор Editor.js для MODX 3 — контент блоками вместо TinyMCE/CKEditor
author: ibochkarev
logo: https://modstore.pro/assets/extras/mxeditorjs/logo.png
dependencies: []

items: [
  { text: 'Начало работы', link: 'quick-start', items: [
    { text: 'Быстрый старт', link: 'quick-start' },
    { text: 'Системные настройки', link: 'settings' },
  ]},
  { text: 'Интеграция', link: 'integration', items: [
    { text: 'Включение и использование', link: 'integration' },
  ]},
  { text: 'Для разработчика', link: 'api', items: [
    { text: 'API и интерфейсы', link: 'api' },
  ]},
]
---
# mxEditorJs

Блочный редактор контента для MODX 3 на базе [Editor.js](https://editorjs.io/). Работает вместо стандартного TinyMCE/CKEditor: контент создаётся блоками (заголовок, текст, картинка, видео), на сайте отображается корректный HTML.

## Быстрые ссылки

| Нужно | Документ |
| --- | --- |
| Включить редактор за 3 шага | [Быстрый старт](quick-start) |
| Настроить профили инструментов и медиа | [Системные настройки](settings) |
| Connector API, PHP-классы, форматы данных | [API](api) |
| Работа с TV и миграция HTML → Editor.js | [Интеграция](integration) |

## Кому что читать

- **Редактору контента:** [Быстрый старт](quick-start) → работа в интерфейсе (блоки, картинки, ссылки) — см. руководство в репозитории компонента.
- **Администратору:** [Системные настройки](settings) → профили, медиа, пресеты.
- **Разработчику:** [API](api) → Connector, PHP, JS; [Интеграция](integration) → TV, миграция.

## Возможности

- **Блочный редактор** — 13 типов блоков: параграф, заголовок, список, чеклист, цитата, таблица, код, raw HTML, embed, изображение, вложение, разделитель, предупреждение
- **Поддержка TV** — редактор в основном контенте ресурса и в Template Variables типа `textarea` с опцией richtext
- **Загрузка медиа** — drag-and-drop изображений и файлов через MODX Media Sources
- **Браузер файлов** — навигация по директориям Media Source
- **Автодополнение ссылок** — поиск ресурсов MODX при вставке ссылок
- **Миграция HTML → Editor.js** — конвертация существующего HTML-контента
- **Профили инструментов** — предустановки (default, minimal, blog, full) и пользовательские
- **Полноэкранный режим**, **Source Preview**, **Undo/Redo**, выравнивание текста
- **Локализация** — русский и английский, наследование локали менеджера
- **CSS-пресеты** — настраиваемые классы для изображений и ссылок

## Используемые плагины Editor.js

mxEditorJs собирает редактор из следующих блоковых и инлайновых инструментов, блочного tune и плагина. Полный каталог инструментов и интеграций: [Awesome Editor.js](https://github.com/editor-js/awesome-editorjs).

### Блоковые инструменты (Block Tools)

| Плагин | Описание | Ссылки |
| --- | --- | --- |
| **@editorjs/paragraph** | Базовый текстовый блок | [npm](https://www.npmjs.com/package/@editorjs/paragraph) · [awesome](https://github.com/editor-js/awesome-editorjs#text-and-typography) |
| **@editorjs/header** | Заголовки H1–H6 | [npm](https://www.npmjs.com/package/@editorjs/header) · [awesome](https://github.com/editor-js/awesome-editorjs#text-and-typography) |
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
| **Image** (кастомный) | Изображение с загрузкой и браузером MODX Media Source | В составе mxEditorJs (`ImageTool.ts`), аналог [@editorjs/image](https://github.com/editor-js/awesome-editorjs#media--embed) |

### Инлайновые инструменты (Inline Tools)

| Плагин | Описание | Ссылки |
| --- | --- | --- |
| **@editorjs/marker** | Выделение текста (маркер) | [npm](https://www.npmjs.com/package/@editorjs/marker) · [awesome](https://github.com/editor-js/awesome-editorjs#inline-tools) |
| **@editorjs/inline-code** | Моноширинный код в тексте | [npm](https://www.npmjs.com/package/@editorjs/inline-code) · [awesome](https://github.com/editor-js/awesome-editorjs#inline-tools) |
| **@editorjs/underline** | Подчёркивание | [npm](https://www.npmjs.com/package/@editorjs/underline) · [awesome](https://github.com/editor-js/awesome-editorjs#inline-tools) |

Ссылки в тексте и автодополнение по ресурсам MODX реализованы кастомным инструментом **LinkAutocomplete** в составе mxEditorJs (по мотивам [@editorjs/link-autocomplete](https://github.com/editor-js/awesome-editorjs#inline-tools)).

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
| **@editorjs/editorjs** | Ядро Editor.js | [npm](https://www.npmjs.com/package/@editorjs/editorjs) · [GitHub](https://github.com/codex-team/editor.js) · [документация](https://editorjs.io/) |

## Требования

| Зависимость | Версия |
| --- | --- |
| MODX Revolution | 3.0.3+ |
| PHP | 8.2+ |
| Node.js | 18+ (только для сборки фронтенда из исходников) |

## Установка

### Через менеджер пакетов

1. Перейдите в **Extras → Installer** (в MODX 3: **Пакеты → Установщик**)
2. Нажмите **Download Extras** и обновите список пакетов
3. Найдите **mxEditorJs** в списке, нажмите **Download**, затем **Install**
4. **Управление → Очистить кэш** (в MODX 3: **Настройки → Очистить кэш**)

Либо загрузите транспортный пакет вручную: скачайте `mxeditorjs-*.transport.zip`, в **Пакеты → Установщик** нажмите **Загрузить пакет**, выберите файл и установите, затем очистите кэш.

### Из исходников (разработка)

```bash
cd /path/to/modx/Extras/
git clone <repo-url> mxEditorJs
cd mxEditorJs
npm install
npm run build
php _build/build.php
```

## Быстрый старт (3 шага)

1. **Система → Системные настройки** → найдите `which_editor` → выберите **mxEditorJs**
2. Убедитесь, что `mxeditorjs.enabled` = **Да**
3. Откройте любой ресурс — в поле контента появится блочный редактор

Подробнее: [Быстрый старт](quick-start).

## Системные настройки (кратко)

Все настройки в пространстве имён **mxeditorjs**.

| Ключ | По умолчанию | Назначение |
| --- | --- | --- |
| `mxeditorjs.enabled` | `true` | Включить/выключить редактор |
| `mxeditorjs.profile` | `default` | Активный профиль инструментов |
| `mxeditorjs.enabled_tools` | — | Переопределение профиля: список инструментов через запятую |
| `mxeditorjs.image_mediasource` | `1` | ID Media Source для изображений |
| `mxeditorjs.max_upload_size` | `5242880` (5 МБ) | Макс. размер загружаемого файла (байты) |

Полный список: [Системные настройки](settings).
