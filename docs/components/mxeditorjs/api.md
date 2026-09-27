---
title: API и интерфейсы
---
# API и интерфейсы

## Коннектор `assets/components/mxeditorjs/connector.php`

Запросы требуют авторизации в менеджере MODX. Ответы: JSON, `Content-Type: application/json`.

Обычное сохранение ресурса идёт через POST формы и `OnBeforeDocFormSave`, не через connector. `content/save` нужен для AJAX и интеграций.

### Права по action

| Action | `save_document` |
| --- | --- |
| `content/get` | Нет |
| `content/save` | Да |
| `content/fromHtml` | Нет (достаточно сессии менеджера) |
| `content/migrate` (без `dry_run`) | Да |
| `content/migrate` (`dry_run=1`) | Нет |
| `media/upload`, `media/uploadFile` | Да |
| `media/browse` | Нет |
| `link/search` | Нет |

### Аутентификация

Неавторизованный запрос: HTTP **200**, тело JSON (текст из лексикона, ru/en):

```json
{ "success": false, "message": "Доступ запрещён." }
```

---

### content/get

JSON-контент ресурса или TV.

| Параметр | Тип | Обязательный | Описание |
| --- | --- | :---: | --- |
| `action` | string | ✓ | `content/get` |
| `resource_id` | int | ✓ | ID ресурса MODX |
| `tmplvar_id` | int | — | ID TV (если не указан: основной контент) |

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

Сохраняет JSON с проверкой и собирает HTML-снимок.

| Параметр | Тип | Обязательный | Описание |
| --- | --- | :---: | --- |
| `action` | string | ✓ | `content/save` |
| `resource_id` | int | ✓ | ID ресурса |
| `tmplvar_id` | int | — | ID TV (если не указан: основной контент) |
| `content_json` | string/object | ✓ | Editor.js OutputData |

**Ответ (успех):**

```json
{
  "success": true,
  "data": { "html": "<h2>Заголовок</h2>\n<p>Текст</p>" }
}
```

`ContentValidator` проверяет JSON. `HtmlRenderer` собирает HTML. Основной контент: JSON в sidecar, HTML в `modResource.content`. TV: таблица `mxeditorjs_tv_content`.

---

### media/upload

Загрузка изображения (multipart/form-data).

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

Проверка файла:

- расширение из `mxeditorjs.allowed_image_types`
- MIME из `ALLOWED_IMAGE_MIME`: `image/jpeg`, `image/png`, `image/gif`, `image/webp`, `image/svg+xml`
- размер ≤ `mxeditorjs.max_upload_size`

Блоки **Image** и **Gallery** вызывают этот action.

---

### media/uploadFile

Загрузка файла-вложения (Attaches). Параметры: `action=media/uploadFile`, `resource_id`, `file`. Путь: **mxeditorjs.file_upload_path**, не путь изображений. Формат ответа как у `media/upload`.

---

### media/browse

Просмотр файлов в Media Source.

| Параметр | Тип | Обязательный | Описание |
| --- | --- | :---: | --- |
| `action` | string | ✓ | `media/browse` |
| `resource_id` | int | ✓ | ID ресурса |
| `type` | string | — | `image` (по умолчанию) или `file` |
| `path` | string | — | Путь относительно корня Media Source; `__root__` или `/` — корень |

`type=image` — Media Source изображений. `type=file` — вложений. Блок **Gallery** вызывает `type=image` (тот же обзор, что у Image).

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

### content/fromHtml

Конвертация HTML в OutputData без записи sidecar. Параметр `html`. Ответ: `{time, blocks, version}`. Клиент вызывает это при `storageMode === 'inline'` (поля MIGX и аналоги).

---

### content/migrate

Миграция HTML ресурса в формат Editor.js.

| Параметр | Тип | Обязательный | Описание |
| --- | --- | :---: | --- |
| `action` | string | ✓ | `content/migrate` |
| `resource_id` | int | ✓ | ID ресурса |
| `dry_run` | bool | — | Предпросмотр без сохранения |
| `confirmed` | bool | — | Подтверждение перезаписи |
| `force` | bool | — | Принудительная перезапись существующих данных |

При `dry_run` в ответе: preview и `blocks_count`. Перезапись может потребовать `confirmed=true`. После `confirmed` пишутся sidecar и HTML в `modResource.content`. Успех: `migrated`, `blocks_count`, `overwritten`, `html`.

---

## PHP-классы

### MxEditorJs\Renderer\HtmlRenderer

Собирает HTML из Editor.js OutputData.

| Метод | Описание |
| --- | --- |
| `render(array $editorJsData): string` | Собирает HTML всех блоков |
| `registerBlockRenderer(string $type, callable $renderer): void` | Регистрирует свой обработчик типа блока. Сигнатура: `function(array $data, array $block): string` |

### MxEditorJs\Validator\ContentValidator

Проверка структуры Editor.js.

| Метод | Описание |
| --- | --- |
| `validate(array $data): bool` | Проверяет структуру, возвращает `true` если данные верны |
| `getErrors(): array` | Массив строк с описаниями ошибок |
| `getFirstError(): ?string` | Первая ошибка или `null` |

### MxEditorJs\Repository\ContentRepository

Sidecar `mxeditorjs_content`. HTML в `modResource.content` пишет connector `content/save` или клиент формы, не этот класс.

| Метод | Описание |
| --- | --- |
| `findByResourceId(int $resourceId): ?array` | Запись по ID ресурса или `null` |
| `save(int $resourceId, array $jsonData, int $userId = 0): bool` | Создание/обновление. Пропуск при неизменном хеше |
| `deleteByResourceId(int $resourceId): bool` | Удаление записи |

### MxEditorJs\Repository\TvContentRepository

Sidecar TV: таблица `mxeditorjs_tv_content`.

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

Конфигурация после `OnDocFormPrerender`:

- `connectorUrl`: URL коннектора
- `resourceId`: ID текущего ресурса
- `assetsUrl`: URL директории ассетов
- `profile`: имя профиля
- `enabledTools`: массив включённых инструментов
- `galleryMaxCount`: лимит изображений в блоке Gallery (`0` = без лимита)
- `tmplvarId`: необязательный ID TV у экземпляра (из имени `tv[N]` / `tvN`)
- `mxGallery`: `{enabled, connectorUrl, pickerUrl, authToken}`. `enabled` = есть каталог `core/components/mxgallery/`
- `presets`: imageClass, linkClass, linkTarget, linkRel
- `locale`: код языка
- `i18n`, `editorJsI18n`: переводы UI

### MODx.loadRTE / MODx.unloadRTE

mxEditorJs перехватывает хуки MODX для инициализации RTE. Аргумент `elements` нормализуется: строка, массив ID или объект с полем `id`. Так снимается `TypeError: e.split is not a function` на статических ресурсах.

```javascript
// Вызывается MODX при появлении textarea
window.MODx.loadRTE(textareaId);

// Вызывается при удалении textarea
window.MODx.unloadRTE(textareaId);
```

`window.MxEditorJsFlush()` сбрасывает HTML в textarea перед submit окна MIGX (`onBeforeSubmit` в `migxmxeditorjs.tpl`).

Режимы хранения: `main` (`#ta`, sidecar ресурса), `tv` (`tv[N]`, sidecar TV), `inline` (не `#ta` и не TV: без скрытого JSON, загрузка через `content/fromHtml`).

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

### Структура блока mxGallery

```json
{
  "type": "mxgallery",
  "data": {
    "mode": "ids",
    "ids": [12, 34],
    "collectionId": null
  }
}
```

`mode`: `ids` или `collection`. `HtmlRenderer` выводит сниппет `[[!mxGallery]]`. Коллекция: параметр `collection` и `picture=1`. Одно id: `id`. Несколько: `ids` и `sort=selection`. Toolbox блока только если установлен mxGallery.

### Ответ API

Успех: `{ "success": true, "data": { ... } }`
Ошибка: `{ "success": false, "message": "..." }`
