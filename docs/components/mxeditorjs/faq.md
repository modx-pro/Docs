---
title: FAQ
---
# FAQ

## Редактор не появляется в контенте ресурса

1. `which_editor` = **mxEditorJs**
2. `mxeditorjs.enabled` = **Да**
3. `use_editor` = **Да**
4. **Настройки → Очистить кэш**

## Редактор не появляется в TV

1. TV: тип **Textarea**, опция **Rich Text** = **Да**
2. Откройте вкладку **Дополнительные поля** на ресурсе
3. Редактор инициализируется, когда поле появляется на странице

## Не добавляется видео

Вставьте ссылку (YouTube, RuTube и т.д.) в **пустой** блок через Ctrl+V. Кнопки Embed в меню нет.

## Картинка или галерея не загружаются

Проверьте у администратора:

- `mxeditorjs.image_mediasource` и права на папку
- `mxeditorjs.image_upload_path` (шаблон с `{resource_id}`)
- размер файла ≤ `mxeditorjs.max_upload_size` (по умолчанию 5 МБ)
- расширение из `mxeditorjs.allowed_image_types`

## После сохранения на сайте «ломается» вёрстка

На фронте выводится HTML-снимок из `modResource.content`. Блок **Raw HTML** и часть embed попадают в разметку как есть. Проверьте CSS темы для классов `mxeditorjs-gallery`, таблиц и iframe.

## Миграция перезаписала контент

Повторная миграция с `force` и `confirmed` перезаписывает sidecar. Перед массовой миграцией сделайте бэкап БД. Предпросмотр: connector `content/migrate` с `dry_run=1`.

## TypeError при открытии статического ресурса

В v1.0.1+ плагин нормализует аргумент `MODx.loadRTE(elements)`. Обновите пакет до актуальной версии.

## Где хранится JSON

| Контекст | Таблица |
| --- | --- |
| Основной контент | `mxeditorjs_content` |
| TV | `mxeditorjs_tv_content` |

HTML для витрины — в `modResource.content` или значении TV (textarea).
