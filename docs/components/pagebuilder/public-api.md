---
title: Public API
description: Read-only JSON API для headless-фронта. Опубликованные секции без черновика
---

# Public API (Headless)

Read-only JSON для внешнего фронта (Next.js, Nuxt, React и т.п.). Отдаёт **только опубликованный** контент PageBuilder. Черновики и запись: [Agent API](agent-api) (Pro) или вкладка **Секции** на форме ресурса в менеджере.

Точка входа:

```text
/assets/components/pagebuilder/api.php
```

Контекст MODX: `web`. Методы: **GET** и **OPTIONS** (CORS preflight).

## Включение

Системные настройки, namespace `pagebuilder`:

| Ключ | По умолчанию | Описание |
| --- | --- | --- |
| `pagebuilder_public_api_enabled` | `0` | Включить API |
| `pagebuilder_public_api_key` | пусто | API-ключ. Пусто: без ключа (только dev) |
| `pagebuilder_public_api_cors_origins` | `*` | Разрешённые origins для браузера |

После смены ключей очистите кэш сайта, если MODX не подхватил настройки сразу.

Подробнее: [Системные настройки → Public API](settings#public-api).

Пример переменных на фронте:

```bash
PAGEBUILDER_API_URL=https://cms.example.com/assets/components/pagebuilder/api.php
PAGEBUILDER_API_KEY=your-secret-key
```

## Авторизация

Если задан `pagebuilder_public_api_key`, передайте ключ так:

- заголовок `X-PageBuilder-Api-Key: <key>` (предпочтительно: ключ не попадает в access-логи)
- query `api_key=<key>`

MODX дополнительно проверяет:

- ресурс опубликован и не удалён
- policy **view** на ресурс для гостя web
- у PageBuilder есть опубликованный snapshot (`publishedRevision > 0`)

Если API выключен, защищённые endpoints отвечают 404. `web/health/ping` всё равно работает и возвращает `publicApiEnabled`.

## Формат ответа

Тот же envelope, что у connector менеджера:

```json
{
  "success": true,
  "message": "",
  "object": {}
}
```

| HTTP | Пример `message` | Когда |
| --- | --- | --- |
| 401 | `Invalid API key.` | Неверный или отсутствующий ключ |
| 403 | `Access denied.` | Нет policy view |
| 404 | `Resource not found.` | Неизвестный ресурс или API выключен |
| 404 | `Page has no published content.` | Ресурс есть, PageBuilder ни разу не публиковали |
| 400 | `resource_id or alias is required.` | Нет идентификатора |
| 400 | `Invalid action.` | Неизвестный `action=` |

## Endpoints

### `web/health/ping`

Проверка доступности. Работает при выключенном API (в ответе поле `publicApiEnabled`).

```bash
curl -s "https://example.com/assets/components/pagebuilder/api.php?action=web/health/ping"
```

```json
{ "success": true, "object": { "ok": true, "publicApiEnabled": true } }
```

### `web/page/get`

Опубликованная страница одного ресурса.

| Параметр | Обязателен | Описание |
| --- | --- | --- |
| `resource_id` | * | ID ресурса MODX |
| `alias` | * | Alias ресурса, если нет `resource_id` |
| `context_key` | нет | Контекст для `alias`, по умолчанию `web` |
| `include` | нет | Список через запятую: `document`, `values`, `html`, `sections`. По умолчанию `document,values` |
| `section_types` | нет | Фильтр типов: `hero,cta` |
| `api_key` | если задан ключ | API-ключ в query |

Нужен `resource_id` **или** `alias`.

#### `include`

| Значение | В `object` |
| --- | --- |
| `document` | Полный опубликованный JSON: `sections`, `trash`, `schemaVersion`, `typeVersion`, `settings`, сырой `data` |
| `values` | Видимые секции и `plainText` (как `[[!PageBuilder? &return_values=1]]`) |
| `html` | Одна HTML-строка, как сниппет на сайте |
| `sections` | Каждая видимая секция со своим `html` из Fenom-чанков |

`values` пропускает секции, скрытые UTM, контекстом или Pro `conditions`. `document` отдаёт сохранённый JSON как в `published_json`.

#### Пример запроса

```bash
BASE="https://example.com/assets/components/pagebuilder/api.php"

curl -s -H "X-PageBuilder-Api-Key: ${KEY}" \
  "${BASE}?action=web/page/get&alias=about&include=document,values"
```

#### Фрагмент ответа `object`

```json
{
  "resourceId": 42,
  "publishedRevision": 3,
  "resource": {
    "id": 42,
    "pagetitle": "About",
    "alias": "about",
    "uri": "about.html",
    "context": "web",
    "template": 5
  },
  "document": {
    "schemaVersion": 1,
    "sections": [
      {
        "id": "a1b2c3d4",
        "type": "hero",
        "typeVersion": 1,
        "enabled": true,
        "data": { "title": "Hello" },
        "settings": {}
      }
    ],
    "trash": []
  },
  "values": {
    "plainText": "Hello",
    "sections": [{ "id": "a1b2c3d4", "type": "hero", "enabled": true, "data": { "title": "Hello" } }]
  }
}
```

При `include=sections`:

```json
{
  "id": "a1b2c3d4",
  "type": "hero",
  "enabled": true,
  "data": { "title": "Hello" },
  "settings": {},
  "html": "<section class=\"pb-section pb-hero\">…</section>",
  "renderFailed": false
}
```

`renderFailed: true` значит, что рендер чанка не удался (неизвестный тип, ошибка Fenom). Пропустите блок или покажите fallback в приложении.

#### JavaScript (fetch)

```javascript
async function getPage(alias) {
  const url = new URL(process.env.PAGEBUILDER_API_URL)
  url.searchParams.set('action', 'web/page/get')
  url.searchParams.set('alias', alias)
  url.searchParams.set('include', 'document,values')

  const res = await fetch(url, {
    headers: { 'X-PageBuilder-Api-Key': process.env.PAGEBUILDER_API_KEY },
    next: { revalidate: 60 },
  })
  const body = await res.json()
  if (!body.success) throw new Error(body.message)
  return body.object
}
```

#### PHP (тот же сайт MODX)

```php
/** @var \MODX\Revolution\modX $modx */
$api = $modx->services->get(\PageBuilder\PublicApi\PageBuilderPublicApiService::class);
$api->assertEnabled();
$api->assertApiKey($_SERVER['HTTP_X_PAGEBUILDER_API_KEY'] ?? null);

$page = $api->getPage(
    $api->resolveResourceId(0, 'about', 'web'),
    ['include' => 'document,values'],
);
```

Класс `PageBuilder\PublicApi\PageBuilderPublicApiService` регистрируется в `ServiceRegistry`.

Сравнивайте `publishedRevision` после публикации в менеджере, чтобы решить, когда сбрасывать кэш фронта.

### `web/catalog/list`

Метаданные типов секций для маппинга `section.type` на ваши компоненты.

| Параметр | Описание |
| --- | --- |
| `context_key` | Контекст каталога, по умолчанию `web` |

```bash
curl -s "${BASE}?action=web/catalog/list&context_key=web&api_key=${KEY}"
```

```json
{
  "success": true,
  "object": {
    "items": [
      {
        "key": "hero",
        "version": 1,
        "label": "Hero",
        "category": "hero",
        "fields": [
          { "name": "title", "type": "text", "label": "Title", "required": true }
        ],
        "thumbnail": ""
      }
    ]
  }
}
```

Кэшируйте список на час или до деплоя. Он меняется, когда добавляете JSON-типы или UI-типы в панели управления.

## CORS

В `pagebuilder_public_api_cors_origins` укажите один origin или список через запятую:

```text
https://app.example.com,https://staging.example.com
```

Preflight:

```bash
curl -s -D - -o /dev/null -X OPTIONS \
  "${BASE}?action=web/page/get" \
  -H "Origin: https://app.example.com" \
  -H "Access-Control-Request-Method: GET"
```

Ожидайте `Access-Control-Allow-Origin` и `Access-Control-Allow-Headers: Content-Type, X-PageBuilder-Api-Key`.

## Выбор `include`

| Задача | `include` |
| --- | --- |
| SPA со своими компонентами | `document` или `values` |
| Оставить MODX-чанки без переписывания вёрстки | `html` или `sections` |
| SEO meta плюс блоки | `values` (`plainText`, поля ресурса) |
| Один блок на лендинге | `section_types=hero&include=document` |

## Headless flow

1. Включите API и задайте ключ в production.
2. Один раз вызовите `web/catalog/list` и сохраните схемы полей в кэше (или сгенерируйте TS-типы из `fields`).
3. На каждом маршруте вызовите `web/page/get` по `alias` или `resource_id`.
4. Выводите `object.document.sections` своими компонентами или используйте `object.sections[].html` / `object.html` для SSR-гибрида.
5. После публикации в менеджере обновляйте кэш, когда меняется `publishedRevision`.

## События

| Событие | Когда |
| --- | --- |
| `pbOnGetValues` | `include` содержит `values` |
| `pbOnBeforeGetList` | `web/catalog/list` |

Плагины могут править `plainText` или скрывать типы так же, как на публичном сайте.

## Public API vs Agent API

| | Public API | Agent API (Pro) |
| --- | --- | --- |
| URL | `api.php` | `connector.php` |
| Контекст | `web` | `mgr` |
| Авторизация | API-ключ (опционально) | Сессия менеджера + `modAuth` |
| Данные | только published | черновик, схемы, published snapshot |
| Запись | нет | `mgr/api/page/apply` |

## Free vs Pro

| Возможность | Free | Pro |
| --- | --- | --- |
| Public API read (published) | да | да |
| Agent API write | нет | да |
| Pro-only типы секций в output | да, если опубликованы на странице | да |

## Связанные страницы

- [Agent API (Pro)](agent-api)
- [Сниппет PageBuilder](snippets/PageBuilder)
- [События](integration#sobytiya)
- [Разработчик](developer)
