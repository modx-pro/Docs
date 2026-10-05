---
title: Системные настройки
---
# Системные настройки

Префикс `mxeditorjs.`, пространство имён **mxeditorjs**.

**Где изменить:** **Настройки → Системные настройки**, фильтр по `mxeditorjs`.

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

При `false` `OnDocFormPrerender` не подключает CSS/JS. Хук `OnBeforeDocFormSave` всё равно пишет sidecar, если в POST есть `mxeditorjs_json`.

| | |
| --- | --- |
| **Тип** | combo-boolean |
| **По умолчанию** | `true` |

### mxeditorjs.profile

Имя активного профиля. Профили задаются в `mxeditorjs.profiles`.

| | |
| --- | --- |
| **Тип** | textfield |
| **По умолчанию** | `default` |

**Предустановленные профили:**

| Профиль | Инструменты |
| --- | --- |
| `default` | paragraph, header, list, checklist, quote, table, code, raw, embed, image, gallery, mxgallery, attaches, delimiter, warning |
| `minimal` | paragraph, header, list, image |
| `blog` | paragraph, header, list, quote, image, gallery, mxgallery, embed, delimiter |
| `full` | Как default, включая `gallery` и `mxgallery` |

### mxeditorjs.enabled_tools

Если задано, используется этот список через запятую. Профиль игнорируется.

**Пример:** `paragraph,header,list,embed,image`

### mxeditorjs.profiles

JSON-объект профилей. Каждый профиль: объект с массивом `tools`.

```json
{
  "default": {
    "tools": ["paragraph", "header", "list", "checklist", "quote", "table",
              "code", "raw", "embed", "image", "gallery", "mxgallery", "attaches", "delimiter", "warning"]
  },
  "blog": {
    "tools": ["paragraph", "header", "list", "quote", "image", "gallery", "mxgallery", "embed", "delimiter"]
  }
}
```

Чтобы добавить профиль: допишите ключ в JSON и поставьте `mxeditorjs.profile` на его имя.

### mxeditorjs.available_tools

Список допустимых block tools пакета. Запасной вариант, если у профиля пустой `tools` и `enabled_tools` не задан. **Не включает блоки напрямую**, если профиль уже задан. Приоритет: ниже.

По умолчанию: `paragraph,header,list,checklist,quote,table,code,raw,embed,image,gallery,mxgallery,attaches,delimiter,warning`

| ID | Описание |
| --- | --- |
| `paragraph` | Параграф |
| `header` | Заголовок H2–H5 |
| `list` | Маркированный или нумерованный список |
| `checklist` | Чеклист |
| `quote` | Цитата |
| `table` | Таблица |
| `code` | Блок кода |
| `raw` | Сырой HTML |
| `embed` | Embed (Paste API, без кнопки в меню) |
| `image` | Изображение (ImageTool пакета) |
| `gallery` | Галерея (fit/slider) |
| `mxgallery` | Блок mxGallery (toolbox только при установленном mxGallery) |
| `attaches` | Файл-вложение |
| `delimiter` | Разделитель |
| `warning` | Предупреждение |

Inline-инструменты (marker, inline-code, underline, linkAutocomplete) и tunes (alignment, undo) включены всегда. Через профили их не настраивают.

## Область: медиа (mxeditorjs_media)

### mxeditorjs.image_mediasource / mxeditorjs.file_mediasource

ID Media Source для изображений и для файлов-вложений (Attaches). По умолчанию `1`.

### mxeditorjs.image_upload_path

Шаблон пути внутри Media Source для **изображений** (Image и Gallery). Плейсхолдер `{resource_id}` заменяется на ID ресурса.

Примеры: `images/resources/{resource_id}/`, `uploads/images/`, `content/{resource_id}/img/`

### mxeditorjs.file_upload_path

Шаблон пути для **файлов-вложений** (Attaches). Не зависит от `image_upload_path`.

Примеры: `files/resources/{resource_id}/`, `uploads/files/`, `content/{resource_id}/attachments/`

### mxeditorjs.gallery_max_count

Максимум изображений в одном блоке **Gallery**. `0`: без ограничения. Загрузка и «Обзор» идут в тот же Media Source и путь, что у Image (`mxeditorjs.image_mediasource`, `mxeditorjs.image_upload_path`).

### mxeditorjs.allowed_image_types

Допустимые расширения через запятую: `jpg,jpeg,png,gif,webp,svg`

### mxeditorjs.max_upload_size

Максимальный размер файла в байтах. Примеры: 1048576 (1 МБ), 5242880 (5 МБ), 10485760 (10 МБ).

## Область: пресеты (mxeditorjs_presets)

### mxeditorjs.image_class_presets

JSON: CSS-классы для изображений. Пользователь выбирает стиль в настройках блока Image в manager.

Формат: `{"display_name": "css-class"}`

```json
{
  "default": "",
  "full-width": "img-fluid w-100",
  "thumbnail": "img-thumbnail",
  "rounded": "rounded"
}
```

::: warning
Серверный `HtmlRenderer` и клиентский `renderPreviewHtml` **не добавляют** выбранный пресет к тегу `<img>`. Пресет хранится в JSON блока. Для фронта подключите свою логику или свой обработчик блока `image`.
:::

### mxeditorjs.link_class_presets

```json
{
  "default": "",
  "button-primary": "btn btn-primary",
  "external": "external-link"
}
```

### mxeditorjs.link_target_options / mxeditorjs.link_rel_options

JSON-варианты `target` и `rel` для диалога ссылки. Класс из `link_class_presets` попадает в HTML ссылки при сборке HTML.

## Связанные настройки MODX

| Настройка | Значение для mxEditorJs | Описание |
| --- | --- | --- |
| `which_editor` | `mxEditorJs` | Выбор RTE в менеджере (обязательно для активации) |
| `use_editor` | `true` | Глобальное включение визуального редактора |
| `which_element_editor` | _(любое)_ | Редактор кода элементов. **Не влияет** на mxEditorJs |
| `cultureKey` | `en` / `ru` | Язык интерфейса. mxEditorJs наследует его для локализации |

## Приоритет набора инструментов

Логику задаёт `MxEditorJs\Config\EditorTools`:

1. **mxeditorjs.enabled_tools** (если не пусто): высший приоритет
2. Иначе **mxeditorjs.profiles**[**mxeditorjs.profile**].tools, пересечение с **mxeditorjs.available_tools**, плюс инструменты из эталонных профилей пакета при обновлении (например `gallery`, `mxgallery`)
3. Иначе **mxeditorjs.available_tools**: запасной вариант

При обновлении с версий до 1.1.0 resolver `resolve.settings.php` добавляет `gallery` и `mxgallery` в `available_tools` и профили `default`, `full`, `blog`, если их там не было. После обновления проверьте JSON в `mxeditorjs.profiles` и очистите кэш.

## Пути пакета (не в transport)

`mxeditorjs.core_path` и `mxeditorjs.assets_url` читают plugin, `bootstrap.php` и connector. В `_build/elements/settings.php` их нет. Пустые значения заменяются на `core_path`/`assets_url` + `components/mxeditorjs/`.
