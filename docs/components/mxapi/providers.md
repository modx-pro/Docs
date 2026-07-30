---
title: Свой эндпоинт в mxApi — пошагово
description: Как добавить собственный эндпоинт в mxApi — от решения о scope и правах до провайдера, регистрации плагином, прав в политике и проверки вызовом.
outline: [2, 3]
lastUpdated: true
---

# Свой эндпоинт: пошагово

Ядро mxApi не знает ни про предметную область сайта, ни про установленные на нём пакеты. Эндпоинты поставляют **провайдеры** — так пакет или код сайта добавляет свои маршруты, не правя mxApi.

Пройдём весь путь на сквозном примере: пакет `myreviews` с отзывами о товарах, у которого нужно открыть наружу список отзывов и статистику. К концу страницы получится рабочий API `/mxapi/v1/reviews`.

Полный справочник по ключам описания и типам параметров — [Справочник эндпоинта](endpoint-reference).

## Шаг 0. Что решить до кода

Пять решений, которые определяют весь остальной код. Принимать их лучше сразу: переделывать потом дороже, а `scope` и путь — это публичный контракт, который у интегратора уже прописан в настройках.

| Решение | Для примера | Как выбирать |
| --- | --- | --- |
| **Путь** | `/reviews`, `/reviews/stats` | Относительно префикса (`mxapi.route_prefix`), сам префикс в пути **не пишется** |
| **scope** | `reviews.read`, `reviews.write` | Группа «домен + операция», **не** один scope на эндпоинт: API из двух десятков маршрутов обычно укладывается в три-пять scope (чтение, запись, удаление, справочники) |
| **Право MODX** | `mxapi_reviews_read`, `mxapi_reviews_write` | Живёт в namespace `mxapi` (его проверяет ядро mxApi), поэтому и префикс `mxapi_` |
| **Контекст MODX** | `mgr` | Где обязан выполняться эндпоинт: права процессоров принадлежат политике контекста |
| **Поверх процессора или своя логика** | оба | Есть процессор — берите `ProcessorEndpoint`. Своя логика — только когда процессора нет |

::: tip Почему «поверх процессора» — предпочтительный путь
Процессоры MODX уже проверяют права, валидируют поля, бросают события и инвалидируют кэш. Прямая запись в базу в обход процессора всё это теряет молча — данные лягут, а события не сработают.
:::

Файлы примера разложим так:

```
core/components/myreviews/
├── src/
│   ├── Endpoint/
│   │   ├── ReviewsListEndpoint.php     ← шаг 1
│   │   └── ReviewsStatsEndpoint.php    ← шаг 2
│   ├── Provider.php                    ← шаг 3
│   └── bootstrap.php                   ← шаг 4
├── elements/plugins/plugin.myreviewsapi.php   ← шаг 4
└── processors/mgr/review/getlist.class.php    (уже есть в пакете; в MODX 3 — src/Processors/Mgr/Review/GetList.php)
```

## Шаг 1. Эндпоинт поверх процессора

Самый частый случай: процессор в пакете уже есть, нужно выставить его наружу.

```php
<?php

namespace MyReviews\Api\Endpoint;

use MxApi\Core\Endpoint\ProcessorEndpoint;

class ReviewsListEndpoint extends ProcessorEndpoint
{
    protected function describe()
    {
        return [
            'id' => 'reviews.list',              // ключ реестра, он же id в каталоге
            'title' => 'Список отзывов',
            'description' => 'Отзывы о товарах с фильтром по товару и статусу.',
            'path' => '/reviews',                // без префикса /mxapi/v1
            'methods' => ['GET'],
            'provider' => 'myreviews',           // видно в каталоге: чей эндпоинт

            // Доступ
            'scope' => 'reviews.read',
            'permission' => 'mxapi_reviews_read',
            'modx_context' => 'mgr',

            // Реализация — наружу не отдаётся
            'processor' => 'mgr/review/getlist',
            'processors_path' => MODX_CORE_PATH . 'components/myreviews/processors/',
            'field_map' => ['product' => 'product_id'],
            'properties' => ['combo' => false],

            'parameters' => [
                [
                    'name' => 'limit',
                    'type' => 'integer',
                    'default' => 20,
                    'description' => 'Сколько отзывов вернуть за раз; потолок — настройка mxapi.max_limit.',
                ],
                [
                    'name' => 'offset',
                    'type' => 'integer',
                    'default' => 0,
                    'description' => 'Смещение от начала выборки.',
                ],
                [
                    'name' => 'product',
                    'type' => 'integer',
                    'description' => 'ID товара: вернуть отзывы только о нём.',
                    'example' => 42,
                ],
                [
                    'name' => 'status',
                    'type' => 'string',
                    'enum' => ['new', 'approved', 'rejected'],
                    'description' => 'Состояние модерации: new — не проверен, approved — опубликован, rejected — отклонён.',
                ],
            ],
        ];
    }
}
```

### Что мы объявили

`describe()` — это **паспорт эндпоинта**: один и тот же массив обслуживает роутер, проверку доступа, валидацию входа, каталог в админке и генерацию OpenAPI. Поэтому «продублировать где-нибудь ещё» ничего не нужно, но и забытый ключ отзовётся сразу в нескольких местах.

Разберём объявленное по группам.

#### Кто это и где живёт

| Ключ | Что задаёт |
| --- | --- |
| `id` | Идентификатор `reviews.list` — ключ в реестре эндпоинтов. Должен быть уникален на сайте; по нему эндпоинт виден в журнале вызовов и на него ссылаются алиасы исторических маршрутов |
| `title`, `description` | Название и пояснение для каталога в админке и для OpenAPI. Это то, что читает интегратор |
| `path` | Путь **относительно** `mxapi.route_prefix`: объявлено `/reviews` — снаружи вызывается `/mxapi/v1/reviews`. Префикс сюда писать нельзя, иначе маршрут задвоится и не найдётся |
| `methods` | HTTP-методы. Если путь совпал, а метод нет, клиент получит `method_not_allowed`, а не 404 — по этой ошибке видно, что эндпоинт найден |
| `provider` | Метка источника: в каталоге напротив эндпоинта будет `myreviews`. Помогает понять, чей это маршрут, когда на сайте несколько интеграций |

#### Кого пускать

| Ключ | Что задаёт |
| --- | --- |
| `scope` | Что клиент обязан иметь в токене. Его же он просит при выпуске: `"scope": "reviews.read"` |
| `permission` | Право MODX в namespace `mxapi`, которое проверяется у пользователя перед вызовом. Пара «scope + permission» и есть модель доступа: scope сужает токен, право отвечает за самого пользователя |
| `modx_context` | Контекст MODX, в котором эндпоинт обязан выполняться. Ядро переключится в него **до** проверки права: политики прав принадлежат контексту, и проверять в одном, а выполнять в другом нельзя |

#### Чем реализован

Эти ключи в публичный каталог и OpenAPI не попадают: клиенту незачем знать внутреннее устройство.

| Ключ | Что задаёт |
| --- | --- |
| `processor` | Путь процессора относительно `processors_path` — то, что обычно передают в `$modx->runProcessor()` |
| `processors_path` | Каталог процессоров вашего пакета. Без него MODX ищет процессор в ядре и не находит — типичная причина `processor_error` с пустым сообщением |
| `field_map` | Переименование параметров на границе API: `['product' => 'product_id']` значит «снаружи параметр называется `product`, в процессор он уйдёт как `product_id`». Нужен, чтобы публичный контракт не наследовал имена полей вашей схемы: переименуете колонку — поправите одну строку в карте, а у интегратора ничего не сломается |
| `properties` | Фиксированные свойства процессора, которые клиент задать не может. Добавляются **последними**, поэтому перебить их запросом нельзя. Сюда кладут то, что должно быть постоянным: в примере `combo => false`, чтобы процессор не переключался в режим выпадающего списка |

#### Что принимаем на вход

| Ключ | Что задаёт |
| --- | --- |
| `parameters` | Декларация входа — одновременно **allow-list**, правила приведения типов и документация. Всё, что не объявлено здесь, отбрасывается и до процессора не доходит: клиент не сможет дослать произвольное свойство и изменить поведение процессора. Каждый элемент — `name`, `type`, плюс необязательные `required`, `default`, `enum`, `min`/`max`, `in`, `description`, `example` |

Полный список ключей со значениями по умолчанию — [Справочник эндпоинта](endpoint-reference).

::: tip Описания параметров — не украшение
Из них строятся карточка эндпоинта в админке и спецификация OpenAPI, которую вы отдадите интегратору: это единственный текст, по которому он поймёт, что означает `status=new` и в чём измеряется `limit`. Правило простое: если по имени параметра нельзя догадаться о допустимых значениях и единицах — пишите `description`, а для нетривиальных значений добавляйте `example`.
:::

### Что вы получаете даром

Больше ничего писать не нужно — `handle()` реализован в базовом классе. Что он делает за вас:

- **ограничивает вход**: в процессор уходят только объявленные параметры и фиксированные `properties`. Клиент не дошлёт `combo=1` и не изменит поведение процессора;
- **приводит типы** по декларации и отвечает `invalid_parameter` на мусор, `missing_parameter` — на пропущенный обязательный;
- **переименовывает** `offset` → `start` (публичный контракт против соглашения процессоров MODX) и удерживает `limit` в границах `mxapi.max_limit`. Пагинация включается самим фактом объявления параметра `limit`;
- **переименовывает поля** по `field_map`: наружу `product`, в процессор `product_id`;
- разворачивает списочный ответ в `data` + `meta.total`;
- превращает ошибку процессора в `processor_error` с полевыми ошибками в `details.errors`.

::: warning Ошибка списочного процессора умеет притворяться успехом
`isError()` у ответа процессора проверяет ключ `success` только когда тело — массив, а списочные процессоры отдают JSON-строку. mxApi поэтому судит по декодированному `success` и лишь при его отсутствии полагается на `isError()`. Если поверх процессоров пишете что-то своё — учтите это же. Поведение одинаково в обеих линиях (`modProcessorResponse` в MODX 2, `MODX\Revolution\Processors\ProcessorResponse` в MODX 3).
:::

## Шаг 2. Эндпоинт со своей логикой

Процессора нет — например, нужна агрегатная статистика. Тогда наследуемся от `AbstractEndpoint` и пишем `handle()` сами.

Паспорт объявляется тот же, только без группы «чем реализован»: `processor`, `processors_path`, `field_map` и `properties` относятся к обёртке над процессором и здесь бессмысленны. Зато появляется `response_description` — что именно возвращает эндпоинт, раз структуру ответа вы определяете сами.

```php
<?php

namespace MyReviews\Api\Endpoint;

use MxApi\Core\Endpoint\AbstractEndpoint;
use MxApi\Core\Endpoint\EndpointContext;
use MxApi\Core\Http\Request;
use MxApi\Core\Http\Response;

class ReviewsStatsEndpoint extends AbstractEndpoint
{
    protected function describe()
    {
        return [
            'id' => 'reviews.stats',
            'title' => 'Статистика отзывов',
            'path' => '/reviews/stats',
            'methods' => ['GET'],
            'provider' => 'myreviews',
            'scope' => 'reviews.read',
            'permission' => 'mxapi_reviews_read',
            'modx_context' => 'mgr',
            'parameters' => [
                [
                    'name' => 'product',
                    'in' => 'query',
                    'type' => 'integer',
                    'required' => true,
                    'description' => 'ID товара, по которому считается статистика.',
                    'example' => 42,
                ],
            ],
            'response_description' => 'count — число одобренных отзывов, rating — средняя оценка.',
        ];
    }

    public function handle(Request $request, EndpointContext $context)
    {
        // Только объявленные параметры, уже приведённые к типам.
        $params = $this->readParams($request);

        /** @var \MxApi\Platform\Modx2\Modx2Platform $platform */
        $platform = $context->getPlatform();
        $modx = $platform->getModx();

        $query = $modx->newQuery('myReviewsReview');
        $query->where(['product_id' => $params['product'], 'status' => 'approved']);
        $query->select(['COUNT(*) AS count', 'AVG(rating) AS rating']);

        $row = [];
        if ($query->prepare() && $query->stmt->execute()) {
            $row = $query->stmt->fetch(\PDO::FETCH_ASSOC) ?: [];
        }

        return Response::success([
            'count' => (int)($row['count'] ?? 0),
            'rating' => round((float)($row['rating'] ?? 0), 2),
        ]);
    }
}
```

Что здесь важно:

- **`readParams()` — единственный правильный способ читать вход.** Он отдаёт только объявленные параметры, приведённые к типам, и сам бросает `missing_parameter`/`invalid_parameter`. Читать `$_GET` или `$request->getParam()` напрямую — значит потерять валидацию и пустить в код то, чего в паспорте эндпоинта нет.
- **`getModx()` — платформенно-зависимый вызов.** Ядро mxApi про `modX` не знает намеренно (это позволяет тому же коду работать на MODX 3), но эндпоинт **вашего** пакета вправе знать свою платформу. Просто помните: код с `getModx()` при переносе на MODX 3 придётся править, а `ProcessorEndpoint` — нет.
- **Ответ собирается через `Response::success($data, $meta)`** — конверт `success`/`data`/`meta` формирует ядро, руками его собирать не надо. Для ошибок бросайте `ApiException` с готовым кодом, а не возвращайте `success: false`.
- Постраничная выборка своими силами — `readPaging($params, $context->getConfig())`: вернёт `limit` и `offset` уже с учётом `default_limit` и `max_limit`.

## Шаг 3. Провайдер

Провайдер — список эндпоинтов и ответ на вопрос «применим ли я на этом сайте».

```php
<?php

namespace MyReviews\Api;

use MyReviews\Api\Endpoint\ReviewsListEndpoint;
use MyReviews\Api\Endpoint\ReviewsStatsEndpoint;
use MxApi\Core\Config;
use MxApi\Core\Platform\PlatformInterface;
use MxApi\Core\Provider\ProviderInterface;

class Provider implements ProviderInterface
{
    public function getId()
    {
        // Показывается в каталоге и в поле provider эндпоинтов.
        return 'myreviews';
    }

    public function isAvailable(PlatformInterface $platform)
    {
        // Провайдер сам решает, применим ли он здесь: своих эндпоинтов не должно
        // быть на сайте, где пакет не установлен или отключён.
        return class_exists('myReviews');
    }

    public function getEndpoints(PlatformInterface $platform, Config $config)
    {
        return [
            new ReviewsListEndpoint(),
            new ReviewsStatsEndpoint(),
        ];
    }
}
```

Исключение внутри провайдера **не роняет API**: mxApi пишет ошибку в журнал и продолжает с остальными эндпоинтами. Это касается и `getEndpoints()` — сломанный сторонний пакет не должен гасить чужие интеграции.

## Шаг 4. Регистрация

Способ зависит от того, чей это код.

### Пакет — плагин на `mxApiOnRegisterEndpoints`

Плагин ставит и снимает сам пакет, поэтому владение списком однозначно, а отключить провайдера можно, отключив плагин в админке.

MODX 2 не автозагружает классы пакета, поэтому файлы подключает отдельный загрузчик — `src/bootstrap.php`:

```php
<?php
/**
 * Вызывается из плагина на mxApiOnRegisterEndpoints: к этому моменту
 * автозагрузка mxApi уже подключена, значит классы MxApi\* доступны.
 */

$dir = __DIR__ . '/';

require_once $dir . 'Endpoint/ReviewsListEndpoint.php';
require_once $dir . 'Endpoint/ReviewsStatsEndpoint.php';
require_once $dir . 'Provider.php';

return 'MyReviews\\Api\\Provider';
```

:::info Версия для MODX 3
В тройке классы пакета обычно уже автозагружаются composer'ом — из `bootstrap.php` компонента, который MODX подключает по namespace. Тогда отдельный загрузчик не нужен, и плагин сразу возвращает имя класса провайдера строкой.

Возвращать **строку, а не объект**, нужно в обеих линиях: `modSystemEvent::output()` склеивает значения обработчиков в строку, и объект туда передать нельзя.
:::

Сам плагин (`elements/plugins/plugin.myreviewsapi.php`, событие `mxApiOnRegisterEndpoints`):

```php
<?php
/** @var modX $modx */

if ($modx->event->name !== 'mxApiOnRegisterEndpoints') {
    return;
}

$corePath = $modx->getOption(
    'myreviews.core_path',
    null,
    $modx->getOption('core_path') . 'components/myreviews/'
);

$bootstrap = $corePath . 'src/bootstrap.php';
if (!is_readable($bootstrap)) {
    $modx->log(modX::LOG_LEVEL_ERROR, '[myreviews] Не найден загрузчик провайдера: ' . $bootstrap);

    return;
}

$modx->event->output(include $bootstrap);
```

::: danger Возвращайте имя класса строкой, а не объект
`modSystemEvent::output()` **склеивает** значения обработчиков в строку. Объект провайдера туда передавать нельзя — он превратится в мусор (в лучшем случае — в фатальную ошибку конвертации в строку). Ядро mxApi принимает и имя класса, и готовый объект — но из плагина всегда уходит строка с полным именем класса, включая namespace.
:::

### Код сайта — `core/config/mxapi.php`

Если эндпоинты принадлежат не пакету, а конкретному сайту, провайдер объявляется в конфиге проекта — файл лежит в репозитории, значит состав API едет вместе с кодом:

```php
return [
    'providers' => [
        'MyReviews\\Api\\Provider',
    ],

    // Либо отдельные эндпоинты без провайдера; класс вне автозагрузки — укажите file.
    'endpoints' => [
        ['class' => 'MyReviews\\Api\\Endpoint\\ReviewsStatsEndpoint',
         'file' => MODX_CORE_PATH . 'components/myreviews/src/Endpoint/ReviewsStatsEndpoint.php'],
    ],
];
```

Системных настроек `mxapi.providers` и `mxapi.middleware` **нет намеренно**: имя класса в базе означало бы, что состав API зависит от дампа БД и молча разъезжается с кодом при переносе между стендом и продом, а правка настройки в админке начинала бы влиять на то, какие классы инстанцирует ядро.

## Шаг 5. Права в политике

Права эндпоинтов живут в namespace `mxapi`, потому что проверяет их ядро mxApi. Значит, ваши `mxapi_reviews_*` добавляются в **чужой** шаблон политики — `mxapiTemplate`, созданный пакетом mxApi.

Пропустить этот шаг нельзя: mxApi считает незаведённое право отсутствующим (fail-closed) и ответит `insufficient_permission` даже при корректно выданном доступе.

Резолвер пакета (`_build` / `modxbuilder`):

```php
<?php
/** @var xPDOTransport $transport */

if ($transport->xpdo) {
    /** @var modX $modx */
    $modx =& $transport->xpdo;

    $permissions = [
        'mxapi_reviews_read' => 'myReviews: чтение отзывов',
        'mxapi_reviews_write' => 'myReviews: модерация отзывов',
    ];

    switch ($options[xPDOTransport::PACKAGE_ACTION]) {
        case xPDOTransport::ACTION_INSTALL:
        case xPDOTransport::ACTION_UPGRADE:
            $template = $modx->getObject('modAccessPolicyTemplate', ['name' => 'mxapiTemplate']);
            if (!$template) {
                // Шаблон создаёт mxApi. Нет шаблона — mxApi не установлен.
                $modx->log(modX::LOG_LEVEL_ERROR,
                    '[myreviews] Шаблон mxapiTemplate не найден — сначала установите mxApi.');

                return true;
            }

            foreach ($permissions as $name => $description) {
                $exists = $modx->getObject('modAccessPermission', [
                    'template' => (int)$template->get('id'),
                    'name' => $name,
                ]);
                if ($exists) {
                    continue;
                }

                $permission = $modx->newObject('modAccessPermission');
                $permission->fromArray([
                    'template' => (int)$template->get('id'),
                    'name' => $name,
                    'description' => $description,
                    'value' => true,
                ]);
                $permission->save();
            }
            break;
    }
}

return true;
```

Дальше права надо **добавить в политику** `mxapiDefault` (или свою на базе шаблона) и убедиться, что она выдана нужной группе через **Access Controls → Namespace Access**. Пакет никому ничего не назначает — [Права доступа](permissions).

Без резолвера то же самое делается руками: **Управление правами → Шаблоны политик → mxapiTemplate** → добавить права, затем **Политики доступа → mxapiDefault** → включить их.

## Шаг 6. Проверка

1. **Эндпоинт появился в реестре.** Откройте **Компоненты → mxApi**: в каталоге должны быть `reviews.list` и `reviews.stats` с источником `myreviews`. Нет — смотрите «Частые ошибки» ниже.
2. **Право видно в политике.** Управление правами → `mxapiTemplate` → `mxapi_reviews_read` на месте, политика выдана группе пользователя интеграции.
3. **Токен со свежим scope:**

   ```bash
   curl -X POST 'https://site.ru/mxapi/v1/auth/token' \
     -H 'Content-Type: application/json' \
     -d '{"grant_type":"password","username":"api_user","password":"…","scope":"reviews.read"}'
   ```

   Ответ `invalid_scope` означает, что эндпоинт с таким scope в реестре не появился — то есть провайдер не зарегистрировался (шаг 4). `insufficient_permission` — что право не заведено или не выдано (шаг 5).

4. **Вызов:**

   ```bash
   curl 'https://site.ru/mxapi/v1/reviews?limit=5&status=approved' \
     -H 'Authorization: Bearer <token>'

   curl 'https://site.ru/mxapi/v1/reviews/stats?product=42' \
     -H 'Authorization: Bearer <token>'
   ```

5. **Контракт для интегратора:** `GET /meta/openapi` — ваши эндпоинты должны быть в спецификации со всеми параметрами. Если их там нет, а в админке они видны — проверьте `mxapi.catalog_filter` и не помечен ли эндпоинт служебным ([Каталог](catalog)).

## Частые ошибки

| Симптом | Причина |
| --- | --- |
| Эндпоинтов нет в каталоге, в логе MODX тихо | Плагин не сработал: он **не подхватывается, пока не сброшен кэш** `eventMap`. Очистите кэш сайта после установки плагина |
| В логе «Провайдер не найден: …» | Класс не подключён (bootstrap не вызван или путь неверен) либо опечатка в namespace |
| В логе «Класс не реализует ProviderInterface» | Плагин вернул объект вместо строки (`modSystemEvent::output()` склеил его в строку) или класс не имплементирует интерфейс |
| `invalid_scope` при выпуске токена | Ни один эндпоинт в реестре не объявляет такой scope — провайдер не зарегистрировался или scope написан с опечаткой |
| `insufficient_permission` у non-sudo | Право не заведено в `mxapiTemplate`, не включено в политику, политика не выдана группе, либо в политике нет обязательного права `load` |
| `route_not_found` при видимом в каталоге эндпоинте | В `path` попал префикс (`/mxapi/v1/reviews` вместо `/reviews`) |
| `method_not_allowed` | Путь совпал, метод — нет: проверьте `methods` в описании |
| `processor_error` с пустым сообщением | Процессор не найден по `processors_path` либо упал до валидации |
| Параметр «не доезжает» до процессора | Он не объявлен в `parameters` — незаявленный вход отбрасывается намеренно |

## Дальше

- [Справочник эндпоинта](endpoint-reference) — все ключи описания, типы параметров, хуки, события, middleware.
- [Права доступа](permissions) — политики, `load`, контексты MODX.
- [Каталог и OpenAPI](catalog) — видимость эндпоинта и служебные маршруты.
