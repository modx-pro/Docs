---
title: Agent API
description: Snapshot и apply секций PageBuilder Pro для скриптов и агентов
---

# Agent API (Pro)

HTTP-слой для скриптов, агентов и мини-конструкторов: соберите страницу из секций без ручной сборки полного `document` и без прямых правок таблиц MODX.

Нужен **PageBuilder Pro** (capability `api`). Используется тот же `connector.php` и сессия менеджера, что у Vue-редактора.

## Зачем

Без Agent API типичный сценарий:

1. Читать `modResource`, шаблоны, TV.
2. Угадывать форму JSON секции.
3. Отправлять весь черновик через `mgr/page/save` с проверкой revision.

С Agent API:

1. `mgr/api/page/snapshot` возвращает revision, черновик, типы секций и их поля.
2. `mgr/api/page/apply` добавляет или заменяет секции по `{ type, data }`.
3. По желанию передайте `publish=1`.

## Права

| Требование | Значение |
| --- | --- |
| Transport | `POST` на `assets/components/pagebuilder/connector.php` |
| Контекст | `ctx=mgr` |
| Токен | Заголовок `modAuth` = `MODx.siteId` (как в редакторе) |
| Чтение | `pagebuilder_view` или `save_document` + policy **view** на ресурс |
| Запись | `pagebuilder_save` или `save_document` + policy **save** на ресурс |
| Pro | Установлен `pagebuilderpro`, в capabilities есть `api` |

## `mgr/api/page/snapshot`

Снимок страницы: черновик, revision, краткий список секций, схемы типов из каталога.

| Параметр | Обязателен | Описание |
| --- | --- | --- |
| `resource_id` | да | ID ресурса MODX |
| `include_schemas` | нет | `1` (по умолчанию): поле `fields` у каждого типа. `0`: только метаданные |

Пример `object` в ответе:

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

`availableTypes[].fields` это схема для сборки `data` в `apply`. `sectionsSummary[].id` нужен для `mode=upsert`.

## `mgr/api/page/apply`

Запись секций без полной сборки документа редактора.

| Параметр | Обязателен | Описание |
| --- | --- | --- |
| `resource_id` | да | Целевой ресурс |
| `sections` | да | JSON-массив (строка или распарсенный) |
| `mode` | нет | `append` (по умолчанию), `prepend`, `replace`, `upsert` |
| `revision` | нет | Ожидаемый revision черновика. `-1` или пропуск: берётся текущий |
| `publish` | нет | `1`: опубликовать после сохранения |

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

`data` накладывается поверх defaults из схемы типа. Неизвестный тип, скрытый тип или невыполненный `requires` (`pro`, `minishop3`) дают ошибку. Поле richtext в Free-секции `richtext` называется `content`, не `body`.

| Режим `mode` | Поведение |
| --- | --- |
| `append` | Новые секции в конец черновика |
| `prepend` | Новые секции в начало |
| `replace` | Секции черновика заменяются целиком (`trash` не трогаем) |
| `upsert` | По `id`: обновить существующую или добавить новую |

Пример `object` после `apply` (без `publish`):

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

При расхождении revision ответ `{ "success": false, "message": "revision_conflict" }`. Снова вызовите `snapshot` и повторите `apply` с актуальным `revision`.

## Примеры

Ниже `MODX_MODAUTH` это значение `MODx.siteId` из сессии менеджера. В DevTools откройте Network, любой POST к `connector.php`, заголовок `modAuth`.

### cURL: snapshot

```bash
curl -sS -X POST 'https://example.com/assets/components/pagebuilder/connector.php' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H "modAuth: ${MODX_MODAUTH}" \
  --data 'action=mgr/api/page/snapshot&resource_id=42&include_schemas=1'
```

Без схем полей (меньше payload):

```bash
curl -sS -X POST 'https://example.com/assets/components/pagebuilder/connector.php' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H "modAuth: ${MODX_MODAUTH}" \
  --data 'action=mgr/api/page/snapshot&resource_id=42&include_schemas=0'
```

### cURL: лендинг (replace + publish)

Пересобирает черновик из hero, FAQ и CTA и сразу публикует его:

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
        },
        {
          "question": "Есть ли самовывоз?",
          "answer": "<p>Да, пункты выдачи на карте на странице доставки.</p>"
        }
      ]
    }
  },
  {
    "type": "cta",
    "data": {
      "title": "Готовы начать?",
      "text": "Оставьте заявку — перезвоним за 15 минут.",
      "button_label": "Оставить заявку",
      "button_url": "/contacts/"
    }
  }
]'

curl -sS -X POST 'https://example.com/assets/components/pagebuilder/connector.php' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H "modAuth: ${MODX_MODAUTH}" \
  --data-urlencode "action=mgr/api/page/apply" \
  --data "resource_id=42&mode=replace&publish=1&revision=3" \
  --data-urlencode "sections=${SECTIONS}"
```

`revision=3` возьмите из предыдущего `snapshot`. Без `revision` (или с `-1`) сервис подставляет текущий revision сам.

### cURL: append (добавить в конец)

```bash
SECTIONS='[
  {
    "type": "richtext",
    "data": {
      "content": "<p>Дополнительный блок под основным контентом.</p>"
    }
  }
]'

curl -sS -X POST 'https://example.com/assets/components/pagebuilder/connector.php' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H "modAuth: ${MODX_MODAUTH}" \
  --data-urlencode "action=mgr/api/page/apply" \
  --data "resource_id=42&mode=append" \
  --data-urlencode "sections=${SECTIONS}"
```

### cURL: prepend (в начало)

```bash
SECTIONS='[{"type":"cta","data":{"title":"Акция до пятницы","text":"−15% на первый заказ","button_label":"В каталог","button_url":"/catalog/"}}]'

curl -sS -X POST 'https://example.com/assets/components/pagebuilder/connector.php' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H "modAuth: ${MODX_MODAUTH}" \
  --data-urlencode "action=mgr/api/page/apply" \
  --data "resource_id=42&mode=prepend" \
  --data-urlencode "sections=${SECTIONS}"
```

### cURL: upsert (обновить секцию по id)

`id` берёте из `sectionsSummary` ответа `snapshot`:

```bash
SECTIONS='[
  {
    "id": "a1b2c3d4e5f6789012345678abcdef01",
    "type": "hero",
    "data": {
      "title": "Обновлённый заголовок",
      "description": "Текст после upsert",
      "button_label": "Купить",
      "button_url": "/buy/"
    }
  }
]'

curl -sS -X POST 'https://example.com/assets/components/pagebuilder/connector.php' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -H "modAuth: ${MODX_MODAUTH}" \
  --data-urlencode "action=mgr/api/page/apply" \
  --data "resource_id=42&mode=upsert" \
  --data-urlencode "sections=${SECTIONS}"
```

Без `id` в элементе секция добавляется как новая (как при `append`).

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
            'data' => [
                'content' => '<p>Текст страницы.</p>',
            ],
        ],
    ],
    mode: 'replace',
    expectedRevision: $snapshot['revision'],
    userId: $userId,
    publish: true,
);

// $result['revision'], $result['addedSectionIds'], $result['published']
```

Класс `PageBuilderPro\PageBuilderApiService` регистрируется в bootstrap `pagebuilderpro`.

### PHP: append с повтором при revision_conflict

```php
/** @var \PageBuilderPro\PageBuilderApiService $api */
$resourceId = 42;
$userId = (int) $modx->user->get('id');
$sections = [
    [
        'type' => 'cta',
        'data' => [
            'title' => 'Подписка',
            'text' => 'Раз в неделю — новости и акции.',
            'button_label' => 'Подписаться',
            'button_url' => '/subscribe/',
        ],
    ],
];

$attempts = 0;
while ($attempts < 3) {
    $attempts++;
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
        // другой редактор сохранил черновик — снова snapshot
        continue;
    }
}
```

Через HTTP connector при конфликте приходит ответ `{ "success": false, "message": "revision_conflict" }` без PHP-exception.

### JavaScript: append (сессия менеджера)

```js
const api = new PageBuilderApi({
  baseUrl: '/assets/components/pagebuilder/connector.php',
  modAuth: MODx.siteId,
})

const snap = await api.post('mgr/api/page/snapshot', {
  resource_id: 42,
  include_schemas: 1,
})

await api.post('mgr/api/page/apply', {
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
```

### JavaScript: upsert по id из snapshot

```js
const snap = await api.post('mgr/api/page/snapshot', {
  resource_id: 42,
  include_schemas: 0,
})
const hero = (snap.object.sectionsSummary || []).find((s) => s.type === 'hero')
if (!hero) {
  throw new Error('No hero section on the page')
}

await api.post('mgr/api/page/apply', {
  resource_id: 42,
  revision: snap.object.revision,
  mode: 'upsert',
  sections: JSON.stringify([
    {
      id: hero.id,
      type: 'hero',
      data: {
        title: 'Новый заголовок',
        description: 'Обновлено скриптом',
        button_label: 'Каталог',
        button_url: '/catalog/',
      },
    },
  ]),
})
```

### JavaScript: pb-fetch-lite

Без Vue-обёртки, только POST:

```js
import { pbFetch } from '/assets/components/pagebuilder/js/pb-fetch-lite.js'

const connector = '/assets/components/pagebuilder/connector.php'
const auth = { baseUrl: connector, modAuth: MODx.siteId }

const snap = await pbFetch('mgr/api/page/snapshot', { resource_id: 42 }, auth)

await pbFetch(
  'mgr/api/page/apply',
  {
    resource_id: 42,
    revision: snap.object.revision,
    mode: 'append',
    sections: JSON.stringify([
      { type: 'spacer', data: { size: 'md' } },
    ]),
  },
  auth,
)
```

Обёртка `PageBuilderApi`: `assets/components/pagebuilder/js/pagebuilder-api.js`. Лёгкий POST: `pb-fetch-lite.js` (`pbFetch(action, payload, options)`).

## Сценарий для агента

1. `snapshot` по целевому ресурсу. Возьмите `revision`, `availableTypes[].fields`, `sectionsSummary`.
2. Сопоставьте исходный контент с блоками `{ type, data }` по схемам из `availableTypes`.
3. Вызовите `apply` с `mode=replace` (полная пересборка) или `append` / `upsert` (точечные правки). Передайте `revision` из шага 1.
4. При `revision_conflict` снова вызовите `snapshot` и повторите `apply`.
5. Опубликуйте через `publish=1` в `apply` или отдельно `mgr/page/publish`.

Free-процессор `mgr/catalog/list` по-прежнему отдаёт список типов. Agent API добавляет схемы полей и запись секций одним вызовом.

## Связанные страницы

- [PageBuilder Pro](pro)
- [Модель данных](developer#model-dannyh)
- [События](integration#sobytiya): `pbOnBeforeSave`, `pbOnAfterSave` при apply
