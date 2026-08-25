---
title: Решение проблем
---
# Решение проблем

Типовые сбои в manager и при разработке пакета. FAQ для редакторов: [FAQ](faq).

## Редактор не загружается

1. `which_editor` = **mxEditorJs**, `use_editor` = **Да**, `mxeditorjs.enabled` = **Да**
2. Очистите кэш MODX
3. Консоль (F12): ошибки JS, загрузка `mxeditorjs.js?v=...`
4. Плагин **mxEditorJs** включён

При ошибке инициализации Editor.js показывается fallback на textarea.

Console:

```javascript
console.log(window.mxEditorJsConfig);
```

Ожидаются: `connectorUrl`, `resourceId`, `enabledTools`, `galleryMaxCount`, `locale`.

## Ошибки загрузки медиа

| Симптом | Проверка |
| --- | --- |
| 403 / Permission denied | Права `save_document`, сессия manager |
| Файл слишком большой | `mxeditorjs.max_upload_size`, `upload_max_filesize` в PHP |
| Неверный тип | `mxeditorjs.allowed_image_types`, MIME через `finfo_file` |
| Папка недоступна | Media Source ID, запись в `image_upload_path` / `file_upload_path` |

## Attaches не открывает диалог файла

Патч `patch-package` для `@editorjs/attaches` не применился. В каталоге пакета:

```bash
npm install
npm run build
```

Скопируйте `mxeditorjs.js` в `assets/components/mxeditorjs/js/`. После `npm update @editorjs/attaches` пересоберите patch: `npx patch-package @editorjs/attaches`.

## Connector возвращает ошибку

URL: `assets/components/mxeditorjs/connector.php`. В Network смотрите `action`, тело `{ success, message }`. HTTP-код при ошибке auth — **200**, не 403.

Типовые `message`: validation errors от `ContentValidator`.

## HTML на сайте ≠ Source Preview

Два рендерера: клиент `renderPreviewHtml` (форма) и сервер `HtmlRenderer` (`content/save`). Сверьте логику блока в обоих. См. [Архитектура](architecture).

## Gallery нет в toolbar после upgrade

Resolver добавляет `gallery` в `available_tools` и профили. Проверьте JSON `mxeditorjs.profiles`, если редактировали вручную. Очистите кэш.

## Две копии файлов при разработке

MODX читает не `Extras/`, а:

- `core/components/mxeditorjs/`
- `assets/components/mxeditorjs/`

Синхронизация:

```bash
cp -r Extras/mxEditorJs/core/components/mxeditorjs/ core/components/mxeditorjs/
cp -r Extras/mxEditorJs/assets/components/mxeditorjs/ assets/components/mxeditorjs/
```

Или rsync:

```bash
rsync -av --delete Extras/mxEditorJs/core/components/mxeditorjs/ core/components/mxeditorjs/
rsync -av --delete --exclude='node_modules' Extras/mxEditorJs/assets/components/mxeditorjs/ assets/components/mxeditorjs/
```

### Static plugin

```sql
SELECT id, name, static, static_file FROM modx_site_plugins WHERE name = 'mxEditorJs';
```

При `static = 1` правьте `Extras/.../mxeditorjs.plugin.php` без пересохранения элемента в manager.

## Очистка кэша (CLI)

```bash
rm -rf core/cache/mgr/ core/cache/includes/ core/cache/scripts/
```

Или **Настройки → Очистить кэш**.

## Отладка save flow

1. **Network** — POST формы ресурса: поля `mxeditorjs_json`, `mxeditorjs_tv_{id}_json`
2. **Console** — `[mxEditorJs]` ошибки `syncToTextarea` / `renderPreviewHtml`
3. БД — строка в `mxeditorjs_content`, поле `content_hash`

## PHP-лог

```bash
grep '\[mxEditorJs\]' core/cache/logs/error.log
```

## Типичные симптомы (разработчик)

| Симптом | Решение |
| --- | --- |
| Редактор не грузится | `npm run build`, скопировать `mxeditorjs.js` |
| MutationObserver error | Пересобрать и скопировать JS |
| TV не инициализируется | Textarea + Rich Text = Да |
| Attaches без диалога | `npm install`, patch-package |
| Gallery нет в toolbar | Проверить `available_tools`, профиль, кэш |
