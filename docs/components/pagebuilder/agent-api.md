---
title: Agent API
description: Snapshot и apply секций PageBuilder Pro для скриптов и агентов
---

# Agent API (Pro)

HTTP-слой для скриптов, агентов и мини-конструкторов: добавьте или замените секции без ручной сборки полного JSON `document` и без прямых правок таблиц MODX.

Нужен **PageBuilder Pro** (capability `api`). Тот же `connector.php` и сессия менеджера, что у Vue-редактора.

Read-only JSON для витрины: [Public API](public-api). Agent API работает с черновиками, схемами полей и записью.

```text
/assets/components/pagebuilder/connector.php
```

Контекст: `mgr` (connector выставляет `ctx=mgr`). Метод: **POST**.

## Что использовать

| Задача | Инструмент |
| --- | --- |
| Прочитать опубликованную страницу для headless | [Public API](public-api) `web/page/get` |
| Черновик, revision, схемы полей | `mgr/api/page/snapshot` |
| Добавить или заменить блоки без полного document | `mgr/api/page/apply` |
| Полный контроль над document и trash | `mgr/page/save` (Vue-редактор) |

## Без Agent API

1. Читать `modResource`, шаблоны, TV.
2. Угадывать форму JSON секции.
3. POST всего черновика через `mgr/page/save` с блокировкой revision.

## С Agent API

1. `mgr/api/page/snapshot` возвращает revision, черновик, типы секций и их поля.
2. `mgr/api/page/apply` пишет блоки `{ type, data }`.
3. Передайте `publish=1`, если страница должна сразу выйти на сайт.

## Права

| Требование | Значение |
| --- | --- |
| HTTP | `POST` на `assets/components/pagebuilder/connector.php` |
| Контекст | `ctx=mgr` |
| Сессия | Вход в менеджер (cookie с `/manager/`) |
| Токен | Заголовок `modAuth` = `MODx.siteId` (как в редакторе) |
| Чтение | `pagebuilder_view` или `save_document` + policy **view** на ресурс |
| Запись | `pagebuilder_save` или `save_document` + policy **save** на ресурс |
| Pro | Установлен `pagebuilderpro`, capability `api` в `PageBuilderConfig` |

### Получить `modAuth`

В консоли браузера на странице менеджера (вкладка Секции или любая mgr-страница):

```js
MODx.siteId
```

Для curl войдите в менеджер, сохраните cookies и отправьте токен:

```bash
# после POST /manager/ с -c cookies.txt
MODX_MODAUTH="значение из MODx.siteId"

curl -sS -X POST "${CONNECTOR}" \
  -b cookies.txt \
  -H "modAuth: ${MODX_MODAUTH}" \
  ...
```

Без валидной сессии и `modAuth` connector вернёт ошибку авторизации MODX.

## Формат ответа

Тот же envelope, что у других processors PageBuilder:

```json
{ "success": true, "message": "", "object": {} }
```

При ошибке: `success: false`. Детали в `message` (строка или код ошибки).

| Пример `message` | Когда |
| --- | --- |
| `revision_conflict` | `revision` в apply не совпал с сервером |
| `Resource id is required.` | Нет или неверный `resource_id` |
| `Resource not found.` | Ресурс не существует |
| `Access denied.` | Нет policy view/save на ресурс |
| `Save permission denied.` | Нет `pagebuilder_save` / `save_document` |
| `Permission denied.` | Нет права на чтение (snapshot) |
| `PageBuilder Pro API is required.` | Нет Pro или capability `api` |
| `Sections payload must be a JSON array.` | `sections` не массив |
| `Unknown section type: …` | Типа нет в каталоге |
| `Section type is hidden: …` | Тип скрыт в UI |
| `Section type is not available for this resource: …` | Ограничение template/parent/context |
| `Section type requirements not satisfied: …` | Не выполнен `requires` (`pro`, `minishop3`) |
| `Unsupported mode: …` | Неверный `mode` |
| `Section type is required.` | Пустой `type` в элементе секции |

При `revision_conflict` снова вызовите `snapshot`, возьмите новый `revision` и повторите `apply`. Не увеличивайте revision вручную.

По HTTP конфликт только в JSON. В PHP `PageBuilderApiService::apply()` может бросить `\PageBuilder\Exception\RevisionConflictException`.

## `mgr/api/page/snapshot`

Снимок одного ресурса: черновик, revision, краткий список секций, типы каталога с учётом `resourceContext` (template, parent, context).

| Параметр | Обязателен | Описание |
| --- | --- | --- |
| `resource_id` | да | ID ресурса MODX |
| `include_schemas` | нет | `1` (по умолчанию): `fields` у каждого типа. `0`: только метаданные |

Пример `object`:

```json
{
  "resourceId": 42,
  "revision": 3,
  "publishedRevision": 2,
  "resourceContext": {
    "template": 1,
    "parent": 0,
    "resource": 42,
    "context": "web"
  },
  "draft": { "schemaVersion": 1, "sections": [], "trash": [] },
  "published": { "schemaVersion": 1, "sections": [], "trash": [] },
  "availableTypes": [
    {
      "key": "hero",
      "label": "Hero",
      "category": "hero",
      "version": 1,
      "chunk": "pagebuilder_hero",
      "requires": [],
      "fields": [
        { "name": "title", "type": "text", "required": true },
        { "name": "description", "type": "textarea", "required": false },
        { "name": "button_label", "type": "text", "required": false },
        { "name": "button_url", "type": "url", "required": false }
      ]
    }
  ],
  "sectionsSummary": [
    { "id": "a1b2c3d4e5f6789012345678abcdef01", "type": "hero", "enabled": true }
  ]
}
```

`availableTypes[].fields` это схема для `data` в `apply`. Используйте `sectionsSummary[].id` для `mode=upsert`. Полный `data` лежит в `draft.sections`.

## `mgr/api/page/apply`

Запись секций без сборки полного документа редактора.

| Параметр | Обязателен | Описание |
| --- | --- | --- |
| `resource_id` | да | Целевой ресурс |
| `sections` | да | JSON-массив (строка или распарсенный) |
| `mode` | нет | `append` (по умолчанию), `prepend`, `replace`, `upsert` |
| `revision` | нет | Ожидаемый revision черновика. `-1` или пропуск: текущий на сервере |
| `publish` | нет | `1`, `true` или `yes` публикует после save |

Элемент массива `sections`:

```json
{
  "type": "hero",
  "data": {
    "title": "Добро пожаловать",
    "description": "Собрано агентом",
    "button_label": "Контакты",
    "button_url": "/contacts/"
  },
  "settings": {},
  "enabled": true,
  "typeVersion": 1,
  "id": "optional-32-hex-id-for-upsert"
}
```

| Поле | Назначение |
| --- | --- |
| `type` | Ключ из `availableTypes[].key` |
| `data` | Накладывается на defaults из схемы типа |
| `settings` | Настройки секции (видимость, UTM, Pro `conditions`) |
| `enabled` | По умолчанию `true` |
| `typeVersion` | По умолчанию: `version` типа из каталога |
| `id` | 32 hex-символа для `upsert`. Пусто: генерируется новый id |

Неизвестный тип, скрытый тип или невыполненный `requires` (`pro`, `minishop3`) дают ошибку. В Free-секции `richtext` поле называется `content`, не `body`.

| `mode` | Поведение |
| --- | --- |
| `append` | Новые секции в конец черновика |
| `prepend` | Новые секции в начало |
| `replace` | Секции черновика заменяются целиком (`trash` не меняется) |
| `upsert` | Обновление по `id` или добавление новой. Без `id`: как `append` |

Пример `object` после apply (без publish):

```json
{
  "resourceId": 42,
  "revision": 4,
  "publishedRevision": 2,
  "draft": { "schemaVersion": 1, "sections": [], "trash": [] },
  "addedSectionIds": ["a1b2c3d4e5f6789012345678abcdef01"],
  "published": false
}
```

## Примеры

`MODX_MODAUTH` это `MODx.siteId` из сессии менеджера (DevTools → Network → любой POST к `connector.php` → заголовок `modAuth`).

### cURL: snapshot

```bash
curl -sS -X POST 'https://example.com/assets/components/pagebuilder/connector.php' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H "modAuth: ${MODX_MODAUTH}" \
  -b cookies.txt \
  --data 'action=mgr/api/page/snapshot&resource_id=42&include_schemas=1'
```

Меньший payload без схем полей:

```bash
curl -sS -X POST 'https://example.com/assets/components/pagebuilder/connector.php' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H "modAuth: ${MODX_MODAUTH}" \
  -b cookies.txt \
  --data 'action=mgr/api/page/snapshot&resource_id=42&include_schemas=0'
```

### cURL: лендинг (replace + publish)

```bash
SECTIONS='[
  {
    "type": "hero",
    "data": {
      "title": "Доставка по городу за 2 часа",
      "description": "Склад рядом, отслеживание в приложении.",
      "button_label": "Рассчитать",
      "button_url": "/calc/",
      "alignment": "center"
    }
  },
  {
    "type": "faq",
    "data": {
      "title": "Частые вопросы",
      "items": [
        {
          "question": "Как оформить заказ?",
          "answer": "<p>Добавьте товар в корзину и перейдите к оформлению.</p>"
        }
      ]
    }
  },
  {
    "type": "cta",
    "data": {
      "title": "Готовы начать?",
      "text": "Оставьте заявку, перезвоним за 15 минут.",
      "button_label": "Оставить заявку",
      "button_url": "/contacts/"
    }
  }
]'

curl -sS -X POST 'https://example.com/assets/components/pagebuilder/connector.php' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H "modAuth: ${MODX_MODAUTH}" \
  -b cookies.txt \
  --data-urlencode "action=mgr/api/page/apply" \
  --data "resource_id=42&mode=replace&publish=1&revision=3" \
  --data-urlencode "sections=${SECTIONS}"
```

`revision=3` возьмите из предыдущего `snapshot`. Без `revision` (или с `-1`) сервис подставляет текущий revision на сервере.

### cURL: append, prepend, upsert

Append:

```bash
SECTIONS='[{"type":"richtext","data":{"content":"<p>Дополнительный блок.</p>"}}]'

curl -sS -X POST 'https://example.com/assets/components/pagebuilder/connector.php' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H "modAuth: ${MODX_MODAUTH}" \
  -b cookies.txt \
  --data-urlencode "action=mgr/api/page/apply" \
  --data "resource_id=42&mode=append" \
  --data-urlencode "sections=${SECTIONS}"
```

Upsert по id из `sectionsSummary`:

```bash
SECTIONS='[{
  "id": "a1b2c3d4e5f6789012345678abcdef01",
  "type": "hero",
  "data": {
    "title": "Обновлённый заголовок",
    "description": "После upsert",
    "button_label": "Купить",
    "button_url": "/buy/"
  }
}]'

curl -sS -X POST 'https://example.com/assets/components/pagebuilder/connector.php' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H "modAuth: ${MODX_MODAUTH}" \
  -b cookies.txt \
  --data-urlencode "action=mgr/api/page/apply" \
  --data "resource_id=42&mode=upsert" \
  --data-urlencode "sections=${SECTIONS}"
```

### PHP: replace + publish

```php
/** @var \MODX\Revolution\modX $modx */
$api = $modx->services->get(\PageBuilderPro\PageBuilderApiService::class);
$userId = (int) $modx->user->get('id');
$resourceId = 42;

$snapshot = $api->snapshot($resourceId);
$result = $api->apply(
    resourceId: $resourceId,
    sectionsInput: [
        [
            'type' => 'hero',
            'data' => [
                'title' => 'Добро пожаловать',
                'description' => 'Собрано из PHP',
                'button_label' => 'Контакты',
                'button_url' => '/contacts/',
            ],
        ],
        [
            'type' => 'richtext',
            'data' => ['content' => '<p>Текст страницы.</p>'],
        ],
    ],
    mode: 'replace',
    expectedRevision: $snapshot['revision'],
    userId: $userId,
    publish: true,
);
```

Класс `PageBuilderPro\PageBuilderApiService` регистрируется в bootstrap `pagebuilderpro`.

### PHP: append с повтором при конфликте

```php
/** @var \PageBuilderPro\PageBuilderApiService $api */
$resourceId = 42;
$userId = (int) $modx->user->get('id');
$sections = [
    [
        'type' => 'cta',
        'data' => [
            'title' => 'Подписка',
            'text' => 'Новости раз в неделю.',
            'button_label' => 'Подписаться',
            'button_url' => '/subscribe/',
        ],
    ],
];

for ($attempt = 0; $attempt < 3; $attempt++) {
    $snapshot = $api->snapshot($resourceId, includeSchemas: false);
    try {
        $api->apply(
            resourceId: $resourceId,
            sectionsInput: $sections,
            mode: 'append',
            expectedRevision: $snapshot['revision'],
            userId: $userId,
            publish: false,
        );
        break;
    } catch (\PageBuilder\Exception\RevisionConflictException $e) {
        continue;
    }
}
```

### JavaScript: PageBuilderApi

```js
const api = new PageBuilderApi({
  baseUrl: '/assets/components/pagebuilder/connector.php',
  modAuth: MODx.siteId,
})

const snap = await api.post('mgr/api/page/snapshot', {
  resource_id: 42,
  include_schemas: 1,
})
if (!snap.success) throw new Error(snap.message)

const apply = await api.post('mgr/api/page/apply', {
  resource_id: 42,
  revision: snap.object.revision,
  mode: 'append',
  sections: JSON.stringify([
    {
      type: 'cta',
      data: {
        title: 'Подписаться',
        text: 'Новости раз в неделю',
        button_label: 'OK',
        button_url: '/subscribe/',
      },
    },
  ]),
})

if (apply.message === 'revision_conflict') {
  // снова snapshot и retry
}
```

`sections` передавайте JSON-строкой в POST, как в curl с `--data-urlencode`.

Обёртка: `assets/components/pagebuilder/js/pagebuilder-api.js`. Лёгкий POST: `pb-fetch-lite.js` (`pbFetch(action, payload, options)`).

## Сценарий для агента

1. `snapshot` по целевому ресурсу. Возьмите `revision`, `availableTypes[].fields`, `sectionsSummary` и `draft.sections`, если нужен текущий `data`.
2. Сопоставьте исходный контент с `{ type, data }` по именам полей из `availableTypes`, а не по догадкам.
3. `apply` с `mode=replace` (полная пересборка), `append` или `upsert`. Передайте `revision` из шага 1.
4. При `revision_conflict` вернитесь к шагу 1.
5. Публикация через `publish=1` в apply или отдельно `mgr/page/publish`.
6. Проверка на сайте, в preview менеджера или через [Public API](public-api) `web/page/get`, если API включён.

Free-процессор `mgr/catalog/list` отдаёт типы без схем полей. Agent API добавляет схемы и запись одним вызовом.

## События

Apply использует `PageService::saveDraft` / `publishDraft`, как редактор:

| Событие | Когда |
| --- | --- |
| `pbOnBeforeSave` / `pbOnAfterSave` | Запись черновика |
| `pbOnBeforePublish` / `pbOnAfterPublish` | При `publish=1` |

## Agent API vs `mgr/page/save`

| | `mgr/api/page/apply` | `mgr/page/save` |
| --- | --- | --- |
| Тело | Массив `{ type, data }` | Полный JSON `PageDocument` |
| Trash | Не меняется | Полный контроль |
| Схемы типов | В `snapshot` | Отдельно `mgr/catalog/list`, без fields |
| Блокировка revision | да | да |

Apply удобен для сгенерированных лендингов из шаблонов секций. Save или редактор нужны для reorder, trash и тонкой настройки `settings`.

## Связанные страницы

- [PageBuilder Pro](pro)
- [Public API](public-api)
- [Модель данных](developer#model-dannyh)
- [События](integration#sobytiya)
