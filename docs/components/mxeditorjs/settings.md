---
title: Системные настройки
---
# Системные настройки

Все настройки имеют префикс `mxeditorjs.` и находятся в пространстве имён **mxeditorjs**.

**Где изменить:** **Настройки → Системные настройки** — фильтр по пространству имён `mxeditorjs`.

## Краткая справка

| Настройка | Назначение | По умолчанию |
| --- | --- | --- |
| `mxeditorjs.enabled` | Включить/выключить редактор | Да |
| `mxeditorjs.profile` | Профиль инструментов: `default`, `minimal`, `blog`, `full` | default |
| `mxeditorjs.enabled_tools` | Свой список инструментов (переопределяет профиль) | — |
| `mxeditorjs.image_mediasource` | ID Media Source для загрузки изображений и галереи | 1 |
| `mxeditorjs.file_mediasource` | ID Media Source для файлов-вложений (Attaches) | 1 |
| `mxeditorjs.image_upload_path` | Шаблон пути загрузки изображений (Image, Gallery) | images/resources/{resource_id}/ |
| `mxeditorjs.file_upload_path` | Шаблон пути загрузки файлов (Attaches) | files/resources/{resource_id}/ |
| `mxeditorjs.gallery_max_count` | Макс. число изображений в блоке Gallery (`0` = без лимита) | 0 |
| `mxeditorjs.max_upload_size` | Макс. размер файла в байтах (5 МБ = 5242880) | 5242880 |
| `mxeditorjs.allowed_image_types` | Допустимые расширения изображений | jpg,jpeg,png,gif,webp,svg |

## Область: основные (mxeditorjs)

### mxeditorjs.enabled

Включает или выключает редактор. При `false` плагин не подключает ассеты и не обрабатывает сохранение.

| | |
| --- | --- |
| **Тип** | combo-boolean |
| **По умолчанию** | `true` |

### mxeditorjs.profile

Имя активного профиля инструментов. Профили задаются в `mxeditorjs.profiles`.

| | |
| --- | --- |
| **Тип** | textfield |
| **По умолчанию** | `default` |

**Предустановленные профили:**

| Профиль | Инструменты |
| --- | --- |
| `default` | paragraph, header, list, checklist, quote, table, code, raw, embed, image, gallery, attaches, delimiter, warning |
| `minimal` | paragraph, header, list, image |
| `blog` | paragraph, header, list, quote, image, gallery, embed, delimiter |
| `full` | Все инструменты (как default, включая gallery) |

### mxeditorjs.enabled_tools

Переопределение профиля. Если задано — используется этот список (через запятую), профиль игнорируется.

**Пример:** `paragraph,header,list,embed,image`

### mxeditorjs.profiles

JSON-объект с определениями профилей. Каждый профиль — объект с массивом `tools`. Редактируется в системных настройках (textarea).

### mxeditorjs.available_tools

Полный список доступных блок-инструментов. Fallback, когда профиль пуст и `enabled_tools` не задан.

По умолчанию: `paragraph,header,list,checklist,quote,table,code,raw,embed,image,gallery,attaches,delimiter,warning`

| ID | Описание |
| --- | --- |
| `gallery` | Галерея изображений: сетка или слайдер, загрузка и «Обзор» как у блока Image |

Inline-инструменты (marker, inline-code, underline, link) и tunes (выравнивание, undo) подключены всегда и не настраиваются через профили.

## Область: медиа (mxeditorjs_media)

### mxeditorjs.image_mediasource / mxeditorjs.file_mediasource

ID Media Source для изображений и для файлов-вложений (инструмент Attaches). По умолчанию `1` (стандартный файловый источник).

### mxeditorjs.image_upload_path

Шаблон пути внутри Media Source для **изображений** (блоки Image и Gallery). Плейсхолдер `{resource_id}` подставляется ID ресурса.

Примеры: `images/resources/{resource_id}/`, `uploads/images/`, `content/{resource_id}/img/`

### mxeditorjs.file_upload_path

Шаблон пути внутри Media Source для **файлов-вложений** (блок Attaches). Независим от `image_upload_path`.

Примеры: `files/resources/{resource_id}/`, `uploads/files/`, `content/{resource_id}/attachments/`

### mxeditorjs.gallery_max_count

Максимальное количество изображений в одном блоке **Gallery**. Значение `0` — без ограничения. Загрузка и выбор через «Обзор» используют те же Media Source и путь, что и блок Image (`mxeditorjs.image_mediasource`, `mxeditorjs.image_upload_path`).

### mxeditorjs.allowed_image_types

Допустимые расширения изображений через запятую: `jpg,jpeg,png,gif,webp,svg`

### mxeditorjs.max_upload_size

Максимальный размер загружаемого файла в байтах. Примеры: 1048576 (1 МБ), 5242880 (5 МБ), 10485760 (10 МБ).

## Область: пресеты (mxeditorjs_presets)

### mxeditorjs.image_class_presets

JSON: CSS-классы для изображений. Пользователь выбирает стиль в настройках блока Image. Формат: `{"display_name": "css-class"}`.

### mxeditorjs.link_class_presets / mxeditorjs.link_target_options / mxeditorjs.link_rel_options

JSON-настройки для стилей ссылок, атрибутов `target` и `rel`.

## Связанные настройки MODX

| Настройка | Значение для mxEditorJs | Описание |
| --- | --- | --- |
| `which_editor` | `mxEditorJs` | Выбор RTE в менеджере (обязательно для активации) |
| `use_editor` | `true` | Глобальное включение визуального редактора |
| `cultureKey` | `en` / `ru` | Язык интерфейса. mxEditorJs наследует для локализации |

## Приоритет набора инструментов

1. **mxeditorjs.enabled_tools** (если не пусто) — высший приоритет
2. Иначе — инструменты из **mxeditorjs.profiles**[**mxeditorjs.profile**].tools
3. Иначе — **mxeditorjs.available_tools** (fallback)
