---
title: API и интерфейсы
---
# API и интерфейсы

## Коннектор `assets/components/mxeditorjs/connector.php`

Все запросы к коннектору выполняются с авторизацией в менеджере MODX. Ответы — JSON. Операции записи требуют права `save_document`.

### Аутентификация

Неавторизованные запросы возвращают:

```json
{ "success": false, "message": "Permission denied" }
```

---

### content/get

Получить JSON-контент ресурса или TV.

| Параметр | Тип | Обязательный | Описание |
| --- | --- | :---: | --- |
| `action` | string | ✓ | `content/get` |
| `resource_id` | int | ✓ | ID ресурса MODX |
| `tmplvar_id` | int | — | ID TV (если не указан — основной контент) |

**Ответ (контент найден):**

```json
{
  "success": true,
  "data": {
    "content_json": { "time": 1709827200000, "blocks": [...], "version": "2.31.0" },
    "content_version": 3
  }
}
```

**Ответ (контент не найден):** `{ "success": true, "data": null }`

---

### content/save

Сохранить JSON-контент с валидацией и генерацией HTML-снимка.

| Параметр | Тип | Обязательный | Описание |
| --- | --- | :---: | --- |
| `action` | string | ✓ | `content/save` |
| `resource_id` | int | ✓ | ID ресурса |
| `tmplvar_id` | int | — | ID TV (если не указан — основной контент) |
| `content_json` | string/object | ✓ | Editor.js OutputData |

**Ответ (успех):**

```json
{
  "success": true,
  "data": { "html": "<h2>Заголовок</h2>\n<p>Текст</p>" }
}
```

**Логика:** JSON валидируется (`ContentValidator`), `HtmlRenderer` генерирует HTML. Для основного контента JSON в sidecar, HTML в `modResource.content`. Для TV — в `mxeditorjs_tv_content`.

---

### media/upload

Загрузить изображение (multipart/form-data).

| Параметр | Тип | Обязательный | Описание |
| --- | --- | :---: | --- |
| `action` | string | ✓ | `media/upload` |
| `resource_id` | int | ✓ | ID ресурса |
| `image` | file | ✓ | Файл изображения |

**Ответ (успех):**

```json
{
  "success": 1,
  "file": {
    "url": "/assets/images/resources/42/photo.jpg",
    "name": "photo.jpg",
    "size": 245760
  }
}
```

Валидация: расширение из `mxeditorjs.allowed_image_types`, MIME image/*, размер ≤ `mxeditorjs.max_upload_size`. Используется блоками **Image** и **Gallery** (загрузка через `media/upload`).

---

### media/uploadFile

Загрузить файл-вложение (инструмент Attaches). Параметры: `action=media/uploadFile`, `resource_id`, `file`. Файл сохраняется по шаблону **mxeditorjs.file_upload_path** (независимо от пути изображений). Формат ответа как у `media/upload`.

---

### media/browse

Просмотр файлов в Media Source.

| Параметр | Тип | Обязательный | Описание |
| --- | --- | :---: | --- |
| `action` | string | ✓ | `media/browse` |
| `resource_id` | int | ✓ | ID ресурса |
| `type` | string | — | `image` (по умолчанию) или `file` |
| `path` | string | — | Путь относительно корня Media Source; `__root__` или `/` — корень |

Для `type=image` используется Media Source изображений, для `type=file` — Media Source вложений. Блок **Gallery** использует `type=image` (тот же обзор, что и Image).

**Ответ:** объект с полями `files`, `folders`, `path`, `parentPath`.

---

### link/search

Поиск ресурсов MODX для автодополнения ссылок.

| Параметр | Тип | Обязательный | Описание |
| --- | --- | :---: | --- |
| `action` | string | ✓ | `link/search` |
| `query` | string | ✓ | Поисковый запрос (минимум 2 символа) |
| `limit` | int | — | Макс. результатов (по умолчанию 10, макс. 30) |

Поиск по `pagetitle`, `longtitle`, точное совпадение по `id`. Удалённые ресурсы исключаются.

---

### content/migrate

Миграция HTML-контента ресурса в формат Editor.js.

| Параметр | Тип | Обязательный | Описание |
| --- | --- | :---: | --- |
| `action` | string | ✓ | `content/migrate` |
| `resource_id` | int | ✓ | ID ресурса |
| `dry_run` | bool | — | Предпросмотр без сохранения |
| `confirmed` | bool | — | Подтверждение перезаписи |
| `force` | bool | — | Принудительная перезапись существующих данных |

Ответы: при `dry_run` — preview и `blocks_count`. При перезаписи может потребоваться `confirmed=true`. При успехе — `migrated`, `blocks_count`, `overwritten`.

---

## PHP-классы

### MxEditorJs\Renderer\HtmlRenderer

Рендерит Editor.js OutputData в HTML.

| Метод | Описание |
| --- | --- |
| `render(array $editorJsData): string` | Рендерит все блоки в HTML-строку (включая `gallery`) |
| `registerBlockRenderer(string $type, callable $renderer): void` | Регистрирует кастомный рендерер для типа блока. Сигнатура callable: `function(array $data, array $block): string` |

### MxEditorJs\Validator\ContentValidator

Валидация структуры Editor.js.

| Метод | Описание |
| --- | --- |
| `validate(array $data): bool` | Проверяет структуру, возвращает `true` если валидно |
| `getErrors(): array` | Массив строк с описаниями ошибок |
| `getFirstError(): ?string` | Первая ошибка или `null` |

### MxEditorJs\Repository\ContentRepository

Работа с основным контентом ресурса (JSON sidecar + HTML в `modResource.content`).

| Метод | Описание |
| --- | --- |
| `findByResourceId(int $resourceId): ?array` | Запись по ID ресурса или `null` |
| `save(int $resourceId, array $jsonData, int $userId = 0): bool` | Создание/обновление. Пропуск при неизменном хеше |
| `deleteByResourceId(int $resourceId): bool` | Удаление записи |

### MxEditorJs\Repository\TvContentRepository

Работа с контентом TV (таблица sidecar для TV).

| Метод | Описание |
| --- | --- |
| `findByResourceAndTv(int $resourceId, int $tmplvarId): ?array` | Поиск по (resource_id, tmplvar_id) |
| `save(int $resourceId, int $tmplvarId, array $jsonData, int $userId = 0): bool` | Создание/обновление |
| `deleteByResourceAndTv(int $resourceId, int $tmplvarId): bool` | Удаление одной TV-записи |
| `deleteByResourceId(int $resourceId): bool` | Удаление всех TV-записей ресурса |

### MxEditorJs\Service\MediaUploader

Загрузка и просмотр медиа.

| Метод | Описание |
| --- | --- |
| `upload(array $file, int $resourceId): array` | Загрузка изображения. Путь из `mxeditorjs.image_upload_path` |
| `uploadFile(array $file, int $resourceId): array` | Загрузка файла-вложения. Путь из `mxeditorjs.file_upload_path` |
| `browse(int $resourceId, string $type = 'image', string $subPath = ''): array` | Возвращает `{files, folders, path, parentPath}` |

### MxEditorJs\Service\HtmlMigrator

Конвертация HTML в Editor.js OutputData.

| Метод | Описание |
| --- | --- |
| `convert(string $html): array` | Принимает HTML, возвращает `{time, blocks, version}` |

Поддерживаются элементы: `p`, `h1`–`h6`, `ul`/`ol`, `blockquote`, `hr`, `pre`/`code`, `figure`/`img`, `img`, `table`, `div`/`section`/`article` (как paragraph).

---

## JavaScript API

### window.mxEditorJsConfig

Конфигурация, доступная после `OnDocFormPrerender`:

- `connectorUrl` — URL коннектора
- `resourceId` — ID текущего ресурса
- `assetsUrl` — URL директории ассетов
- `profile` — имя профиля
- `enabledTools` — массив включённых инструментов
- `galleryMaxCount` — лимит изображений в блоке Gallery (`0` = без лимита)
- `presets` — imageClass, linkClass, linkTarget, linkRel
- `locale` — код языка
- `i18n`, `editorJsI18n` — переводы UI

### MODx.loadRTE / MODx.unloadRTE

mxEditorJs перехватывает стандартные хуки MODX для инициализации RTE. Аргумент `elements` нормализуется (строка, массив ID или объект с полем `id`) — это устраняет ошибку `TypeError: e.split is not a function` при открытии статических ресурсов.

```javascript
// Вызывается MODX при появлении textarea
window.MODx.loadRTE(textareaId);

// Вызывается при удалении textarea
window.MODx.unloadRTE(textareaId);
```

---

## Форматы данных

### Editor.js OutputData

```json
{
  "time": 1709827200000,
  "version": "2.31.0",
  "blocks": [
    {
      "id": "abc123",
      "type": "paragraph",
      "data": { "text": "Hello world" },
      "tunes": { "alignmentTune": { "alignment": "left" } }
    }
  ]
}
```

### Структура блока Gallery

```json
{
  "type": "gallery",
  "data": {
    "files": [
      { "url": "/assets/images/resources/42/photo1.jpg", "name": "photo1.jpg" },
      { "url": "/assets/images/resources/42/photo2.jpg", "name": "photo2.jpg" }
    ],
    "style": "fit",
    "caption": "Подпись галереи"
  }
}
```

Поле `style`: `fit` (сетка) или `slider` (горизонтальный скролл). HTML-снимок: `<figure class="mxeditorjs-gallery mxeditorjs-gallery--{style}">` с изображениями в `.mxeditorjs-gallery__track`.

### Ответ API

Успех: `{ "success": true, "data": { ... } }`
Ошибка: `{ "success": false, "message": "..." }`
