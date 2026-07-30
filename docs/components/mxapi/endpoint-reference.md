---
title: Справочник эндпоинта mxApi
description: Все ключи описания эндпоинта mxApi, типы и приведение параметров, базовые классы и хуки, ответы и ошибки, системные события и промежуточные обработчики.
outline: [2, 3]
lastUpdated: true
---

# Справочник эндпоинта

Полный перечень того, что можно объявить в `describe()` и чем пользоваться внутри `handle()`. Как это собирается в рабочий эндпоинт — [пошаговое руководство](providers).

## Ключи описания

Метод `describe()` возвращает массив. Ниже — все ключи и значения по умолчанию.

### Идентификация и маршрут

| Ключ | По умолчанию | Смысл |
| --- | --- | --- |
| `id` | `''` | Идентификатор вида `reviews.list` — он же ключ реестра и цель для `route_aliases`. Обязателен и должен быть уникален на сайте |
| `title` | `''` | Название для каталога; если пусто, показывается `id` |
| `description` | `''` | Описание для каталога и OpenAPI |
| `path` | `'/'` | Путь **относительно** `mxapi.route_prefix`. Сам префикс сюда не пишется |
| `methods` | `['GET']` | HTTP-методы; приводятся к верхнему регистру |
| `provider` | `'mxapi.core'` | Источник эндпоинта, виден в каталоге |
| `deprecated` | `false` | Пометка «устаревший» для каталога и OpenAPI |

Путь разбирает FastRoute, поэтому доступны его шаблоны: `/reviews/{id:\d+}`, необязательные части `/reviews[/{id}]`. Наружу — в каталог и OpenAPI — путь отдаётся **без** шаблонов: `/reviews/{id}`.

Параметры пути попадают во входные данные наравне с query и body, объявлять их нужно с `'in' => 'path'`.

### Доступ

| Ключ | По умолчанию | Смысл |
| --- | --- | --- |
| `scope` | `''` | Scope, который клиент обязан иметь в токене. Пусто — scope не проверяется |
| `permission` | `''` | Право MODX в namespace `mxapi`. Пусто — право не проверяется |
| `auth` | `'bearer'` | `bearer` — нужен токен; `none` — эндпоинт публичный (так объявлен только выпуск токена) |
| `modx_context` | `''` | Контекст MODX: конкретный ключ (`mgr`, `web`), `'request'` — из заголовка `X-MxApi-Context`, пусто — безразличен |
| `context` | `'public'` | `public` — часть контракта; `internal` — служебный, в каталог и OpenAPI не попадает **никогда** |
| `write` | `false` | Изменяющий эндпоинт: пишется в журнал всегда и участвует в идемпотентности |

Константы вместо строк: `EndpointMetadata::AUTH_NONE`, `AUTH_BEARER`, `CONTEXT_PUBLIC`, `CONTEXT_INTERNAL`, `MODX_CONTEXT_FROM_REQUEST`.

::: warning `write` — не косметика
От него зависят три вещи: попадёт ли вызов в журнал при выключенном `mxapi.log_reads`, будет ли работать `Idempotency-Key` (только для `write`) и сохранится ли тело ответа для повтора. Изменяющий эндпоинт без `write => true` теряет и аудит, и защиту от двойного выполнения.
:::

### Документация

| Ключ | По умолчанию | Смысл |
| --- | --- | --- |
| `parameters` | `[]` | Декларация входа — см. ниже |
| `request_example` | `null` | Пример запроса для каталога |
| `response_example` | `null` | Пример ответа для каталога |
| `response_description` | `''` | Что возвращается — текстом |

### Ключи реализации (наружу не отдаются)

Используются `ProcessorEndpoint`; видны в админке, но вырезаны из `/meta/endpoints` и OpenAPI.

| Ключ | Смысл |
| --- | --- |
| `processor` | Путь процессора, например `mgr/review/getlist` |
| `processors_path` | Каталог процессоров пакета |
| `field_map` | Переименование параметров: `['product' => 'product_id']` — наружу первое, в процессор второе |
| `properties` | Фиксированные свойства процессора; добавляются **последними**, клиент их не перебьёт |

Свой ключ тоже можно положить в описание и прочитать через `$this->getMetadata()->getExtra('ключ', $default)` — но он попадёт в публичный каталог, если его нет в списке выше.

## Параметры

Одна декларация обслуживает три задачи: валидацию входа, каталог в админке и OpenAPI.

| Поле | По умолчанию | Смысл |
| --- | --- | --- |
| `name` | `''` | Имя параметра |
| `in` | `'query'` | `query`, `path` или `body` |
| `type` | `'string'` | См. таблицу приведения |
| `required` | `false` | Нет значения → `missing_parameter` |
| `default` | `null` | Подставляется, если параметр не передан |
| `enum` | `[]` | Белый список значений; иначе `invalid_parameter` |
| `min` / `max` | `null` | Границы для числовых значений |
| `description` | `''` | Текст для каталога и OpenAPI |
| `example` | `null` | Пример значения |

Константы: `ParameterMetadata::IN_QUERY`, `IN_PATH`, `IN_BODY`, `TYPE_STRING`, `TYPE_INTEGER`, `TYPE_NUMBER`, `TYPE_BOOLEAN`, `TYPE_ARRAY`, `TYPE_OBJECT`, `TYPE_DATE`.

### Приведение типов

| Тип | Что принимается | Что вернётся |
| --- | --- | --- |
| `string` | скаляр | строка |
| `integer` | число или числовая строка, иначе `invalid_parameter` | `int` |
| `number` | то же | `float` |
| `boolean` | `1`, `true`, `yes`, `on` (регистр не важен) — истина; **всё остальное — ложь**, ошибки нет | `bool` |
| `array` | массив, JSON-массив или строка через запятую | массив |
| `object` | массив или JSON-объект, иначе `invalid_parameter` | массив |
| `date` | всё, что понимает `strtotime()`, иначе `invalid_parameter` | исходная строка |

::: tip Пустая строка = «параметр не передан»
`?status=` равнозначно отсутствию параметра: подставится `default`, а для обязательного будет `missing_parameter`. Если пустая строка для вас осмысленное значение — не полагайтесь на неё, заведите отдельное значение в `enum`.
:::

## Базовые классы

### `AbstractEndpoint`

Реализует `getMetadata()` из `describe()` и даёт два помощника.

| Метод | Что делает |
| --- | --- |
| `readParams(Request $request)` | Возвращает **только объявленные** параметры, приведённые к типам. Всё лишнее отбрасывается, ошибки валидации бросаются сами |
| `readPaging(array $params, Config $config)` | Возвращает `[limit, offset]` с учётом `mxapi.default_limit` и `mxapi.max_limit` |

Наследник обязан реализовать `describe()` и `handle(Request $request, EndpointContext $context): Response`.

### `ProcessorEndpoint`

`handle()` уже реализован: собирает свойства, запускает процессор, разворачивает ответ. Точки расширения:

| Хук | Когда вызывается |
| --- | --- |
| `beforeRun(array &$properties, EndpointContext $context)` | после сборки свойств, до запуска процессора: лексиконы, рантайм-настройки, доп. свойства |
| `transformPayload(array $payload, EndpointContext $context)` | после процессора, до сборки конверта: доменная нормализация ответа |
| `extraMeta(array $payload)` | для списочного ответа: агрегаты по всей выборке уходят в `meta`, не смешиваясь с `data` |

Поведение, которое стоит помнить:

- **пагинация включается объявлением параметра `limit`.** Есть `limit` — `offset` переименуется в `start`, а в `meta` попадут `total`, `limit`, `offset`;
- фиксированные `properties` применяются после пользовательских — клиент их не перебьёт;
- ошибка процессора превращается в `processor_error` (HTTP 400) с полевыми ошибками в `details.errors`.

## Контекст выполнения

`EndpointContext`, приходящий в `handle()`:

| Метод | Что даёт |
| --- | --- |
| `getPlatform()` | Платформа: `runProcessor()`, `getOption()`, `log()`, `now()`, `cacheGet/cacheSet()`, `findUserById()`, `checkPermission()`, `invokeEvent()`, репозитории токенов/клиентов/журнала |
| `getConfig()` | Конфигурация mxApi: `get()`, `getInt()`, `getBool()`, `getList()` |
| `getAuth()` | `AuthContext` или `null` для эндпоинта с `auth => none` |
| `getMetadata()` | Собственный паспорт эндпоинта |

`AuthContext`: `getUser()`, `getToken()`, `getClient()`, `getClientId()`, `getActor()` (значение заголовка `X-MxApi-Actor`).

Доступ к самому `modX` — через платформенный адаптер: `$context->getPlatform()->getModx()`. Метода нет в `PlatformInterface` намеренно: ядро о MODX не знает, а код, который им пользуется, при переносе на MODX 3 придётся править.

## Ответы и ошибки

| Вызов | Что делает |
| --- | --- |
| `Response::success($data, array $meta = [], $status = 200)` | конверт `success` / `data` / `meta` |
| `Response::error($code, $message, $status = 400, array $details = [])` | обычно не нужен — бросайте `ApiException` |
| `Response::stream(callable $streamer, $status = 200)` | ответ без конверта: колбэк сам печатает тело (так отдаётся OpenAPI) |
| `$response->withHeader($name, $value)` | иммутабельно: возвращает копию с заголовком |

Ошибку правильнее бросать исключением — ядро само превратит её в ответ и запишет код в журнал:

```php
throw ApiException::missingParameter('product');
throw ApiException::invalidParameter('status', 'ожидается new|approved');
throw ApiException::notFound('review');
throw ApiException::insufficientPermission('mxapi_reviews_write');
```

Именованные конструкторы покрывают весь публичный контракт кодов — [таблица кодов](auth#kody-oshibok). Свободную строку кода придумывать не нужно: клиенты завязаны именно на этот словарь. Если своего кода действительно не хватает, создавайте исключение напрямую — `new ApiException('my_code', 'Сообщение', 409)`.

Необработанное исключение любого другого типа превращается в `internal_error` (HTTP 500): подробности уходят в лог MODX, наружу — нейтральное сообщение, и только при `mxapi.debug` текст ошибки попадает в ответ.

## Системные события

| Событие | Когда | Что можно |
| --- | --- | --- |
| `mxApiOnRegisterEndpoints` | сборка реестра | вернуть провайдера — **имя класса строкой** |
| `mxApiOnBeforeRequest` | запрос принят, до маршрутизации | логирование, метрики |
| `mxApiOnBeforeEndpointRun` | эндпоинт найден, токен проверен, контекст переключён | аудит, подготовка окружения |
| `mxApiOnAfterEndpointRun` | сразу после вызова | пост-обработка, метрики |
| `mxApiOnResponse` | перед отправкой ответа | наблюдение за статусом |

## Промежуточные обработчики

```php
use MxApi\Core\Endpoint\EndpointContext;
use MxApi\Core\Http\Request;
use MxApi\Core\Middleware\MiddlewareInterface;

class SignatureCheck implements MiddlewareInterface
{
    public function process(Request $request, EndpointContext $context, callable $next)
    {
        // до эндпоинта
        $response = $next($request);
        // после эндпоинта
        return $response->withHeader('X-Checked', '1');
    }
}
```

Подключаются ключом `middleware` в `core/config/mxapi.php`. Встроенные — лимит частоты и идемпотентность — подключены всегда и идут первыми: лимит отсекает лавину до любой работы с базой, и только потом проверяется повтор по ключу идемпотентности.
