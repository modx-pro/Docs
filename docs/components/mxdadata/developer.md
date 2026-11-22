---
title: Для разработчиков
---

# Для разработчиков

Плейсхолдеры выставляет `mxdadata_set_web_context_placeholders()`. В шаблонах и Fenom используйте **`[[+имя]]`**. Системные подстановки **`[[++…]]`** к ним не относятся.

## Плейсхолдеры веб-контекста (OnWebPageInit)

| Плейсхолдер | Содержимое |
|-------------|------------|
| **`mxdadataConnectorWeb`** | Полный URL `…/assets/components/mxdadata/connector-web.php` |
| **`mxdadataEnabledOn`** | `1` или `0` — флаг `mxdadata_enabled` |
| **`mxdadataDebugOn`** | `1` или `0` — флаг `mxdadata_debug_mode` |
| **`cartPageId`** | ID страницы корзины MS3 |
| **`orderPageId`** | ID страницы оформления заказа MS3 |

Исходник: `core/components/mxdadata/include/web_context_placeholders.php`.

Чанк **`chunk.mxdadata.fenomWebDefaults`** в поставке — заготовка Fenom с типовыми подстановками коннектора и флагов (см. `elements/chunks/chunk.mxdadata.fenomWebDefaults.tpl`).

## События MODX / MiniShop3

- **Свои плагины** на `msOnBeforeCreateOrder` / `msOnSubmitOrder` выполняются **вместе** с mxDadata. Приоритет задаёт порядок плагинов в БД. mxDadata нормализует адрес в объекте `Address` **до** сохранения, если валидация прошла.
- Для реакции на **витрине** после подсказки используйте событие DOM **`mxdadata:order-address-updated`** (см. [Интеграция](/components/mxdadata/integration#событие-для-других-скриптов)).

## Коннекторы

| Файл | Назначение |
|------|------------|
| **`connector-web.php`** | Витрина: Suggest/Party/Geolocate и т.д., ограничение частоты, кэш. CORS **`Access-Control-Allow-Origin: *`**, методы `POST, OPTIONS`. `action` сверяется с белым списком из 8 действий. При ошибке процессора JSON **`{ success: false, message: 'Processor error' }`** без текста исключения |
| **`connector.php`** | Менеджер: все процессоры пакета — `Dashboard/*`, `Settings/*`, `Cache/*`, `Logs/*`, `Clean/*`, `Suggest/*`, `Party/*`, `Geolocate/*`, `Tools/Version`. `action` не фильтруется, проверок прав нет. При **`mxdadata_debug_mode`** ответ может содержать сообщение исключения |

Оба коннектора принимают параметры и в `$_REQUEST`, и в JSON-теле (`Content-Type: application/json`). Админка отправляет `FormData`.

## Соответствие функций пакета и API DaData

| Возможность пакета | API DaData (сеть) |
|--------------------|-------------------|
| Подсказки (адрес, org, name, email, bank) | `suggestions.dadata.ru` — `suggest/*` (Token) |
| Геолокация адреса | `geolocate/address` (Token) |
| Party по ИНН | `findById/party` (Secret) |
| Версия/статус справочников Suggest | GET `…/suggestions/api/4_1/rs/status` (Token) |
| Clean: телефон, email, адрес, ФИО | `cleaner.dadata.ru/api/v1/clean/…` (Secret) |
| Баланс (вкладка Обзор) | `dadata.ru/api/v2/profile/balance` (Secret) |

## Ключи в браузере {#ключи-в-браузере}

`mxdadata_api_secret` **попадает в браузер**. Процессор `Settings/Get` (`src/Processors/Mgr/Settings/Get.php`) читает из системных настроек все 18 ключей, включая `api_secret`, и возвращает их в JSON без маскирования. `connector.php` отдаёт этот JSON как есть, а менеджерский фронтенд кладёт ответ в состояние компонента при монтировании (`DashboardRoot.vue`, `loadSettings()`).

Чем это ограничено:

- аутентификация менеджера в `connector.php` (`connectors/index.php`), без проверки прав компонента;
- видимость пункта меню **Extras → mxDadata** по праву `mxdadata_view`.

Других проверок в процессорах пакета нет. Практический вывод: не открывайте раздел пользователям, которым Secret не нужен, и не считайте `mxdadata_logs`, `mxdadata_edit`, `mxdadata_cache_clear` защитой: код их не читает. Плагин заказа и процессы с витрины Secret в браузер не отдают.

Проверка наличия ключей в `DadataClient::hasCredentials()` смотрит **только Token**. Сообщение `mxdadata_err_api_credentials_unset` («Не заданы токен и секрет API DaData») выводится при пустом Token, хотя Secret там не проверяется.

**HTTP-повторы:** **`mxdadata_api_retry`** — число попыток. По умолчанию `1`. Повтор только при ошибке curl, не при HTTP 4xx/5xx.

## Регистрация namespace

`core/components/mxdadata/bootstrap.php` регистрирует пакет и автозагрузчик:

```php
$corePath = $modx->getOption('mxdadata_core_path', null, $modx->getOption('core_path') . 'components/mxdadata/');
$modx->addPackage('mxdadata', $corePath . 'src/', null, 'mxdadata\\');
```

Классы лежат в `src/` и грузятся по PSR-подобному правилу `mxdadata\X\Y` → `src/X/Y.php`. Принимается и альтернативный префикс `MxDadata\`. Из своего кода вызывайте классы пакета напрямую:

```php
require_once $modx->getOption('core_path') . 'components/mxdadata/bootstrap.php';

$client = new \mxdadata\Services\DadataClient($modx);
$result = $client->suggest('address', ['query' => 'москва', 'count' => 1]);
```

Системная настройка `mxdadata_core_path` переопределяет путь к `core/components/mxdadata/`, если компонент лежит не в стандартном месте.

### Хелперы

| Функция | Назначение |
|---------|------------|
| `mxdadata_set_web_context_placeholders(modX $modx)` | Выставляет плейсхолдеры в контекст запроса |
| `mxdadata_get_web_context_placeholders(modX $modx)` | Возвращает тот же набор ключей без вывода |
| `mxdadata_web_asset_url(modX $modx, string $relativeUnderComponent)` | URL публичной статики с `?v=<mtime>` |
| `mxdadata_register_web_suggest_styles(modX $modx)` | Однократно подключает `css/web/suggest.css` |

## Классы пакета

| Класс | Публичные методы |
|-------|------------------|
| `\mxdadata\Services\DadataClient` | `__construct(modX)`; `suggest(string $method, array $params): array`; `geolocateAddress(array $body): array`; `getSuggestionsVersion(): array`; `clean(string $method, array $params): array`; `getBalance(): array`; `findById(string $method, string $id): array`; `hasCredentials(): bool` |
| `\mxdadata\Services\SuggestService` | `suggestAddress(string $query, int $count = 10, array $extra = []): array`; `suggestByMethod(string $method, array $params): array` |
| `\mxdadata\Services\CleanService` | `cleanAddress`, `cleanPhone`, `cleanEmail`, `cleanName` — каждый `clean*(string $source): array` |
| `\mxdadata\Services\PartyService` | `suggestParty(string $query, int $count = 10): array`; `findById(string $inn): array` |
| `\mxdadata\Infrastructure\CacheService` | `get(string $key): ?string`; `set(string $key, string $value): bool`; `getByHash(string $type, array $params): ?array`; `setByHash(string $type, array $params, array $data): bool`; `clear(): bool` |
| `\mxdadata\Infrastructure\LoggerService` | `log(string $type, ?string $method, ?string $request, ?string $response, ?int $status, ?float $executionTime): void`; `debug(string $message): void` |
| `\mxdadata\Infrastructure\RateLimiter` | `allow(): bool` |
| `\mxdadata\Integration\AddressMapper` | `fromDaDataSuggestion(array $suggestion, ?string $value = null): array`; `fromDaDataClean(array $cleanResult): array`; `applyToOrder(array $orderData, array $mapped): array` |
| `\mxdadata\Integration\OrderValidator` | `validate(array $orderData): array` — возвращает `['valid' => bool, 'errors' => string[], 'normalized' => array]` |

Детали реализации:

- **`DadataClient`** читает Token, Secret, таймаут и число повторов из настроек в конструкторе. Secret уходит в заголовке `X-Secret` только для `Clean`, `findById` и баланса; Suggest, геолокация и статус справочников идут с одним Token.
- **`SuggestService`, `CleanService`, `PartyService`** принимают в конструкторе `DadataClient`, `CacheService`, `RateLimiter`, `LoggerService`. Кеш проверяется **до** `RateLimiter`: попадание в кэш не тарифицируется.
- **`CacheService`** хранит ответы только в своей таблице `mxdadata_cache`. Ключ для `getByHash` / `setByHash` — `type_` + `sha256(type + json(params))` после `ksort($params)`. `clear()` удаляет все строки таблицы, счётчик `RateLimiter` в `cacheManager` не трогает.
- **`RateLimiter`** хранит счётчик в `cacheManager` под ключом `mxdadata_throttle<YYYY-MM-DD-HH-mm>` со сроком 120 с. При `mxdadata_throttle_rpm` ≤ 0 ограничение выключено.
- **`LoggerService`** обрезает `method` до 64 символов, `request` и `response` до 65535. При уровне `debug` пишет всё, иначе записи со статусом 200 не пишутся: `error` и `warning` в коде дают одинаковый результат.
- **`AddressMapper`** сопоставляет поля ответа **Clean** с полями адреса MS3, кастомные правила берёт из `mxdadata_field_mapping`. `fromDaDataSuggestion()` предназначен для разбора ответа Suggest (`data.*`) и в рантайме пакета не вызывается: остаётся только в smoke-тестах.
- **`OrderValidator`** нормализует поля из `msOrder.Address`: телефон, email, адрес. `lat` и `lon` в объект адреса не пишутся. Коды ошибок: `phone_invalid`, `phone_quality`, `email_invalid`, `fias_required`, `index_required`. Зависимость `PartyService` в конструкторе есть, но в `validate()` не используется.

## Таблицы БД

| Таблица | Назначение |
|---------|------------|
| `mxdadata_cache` | Ответы DaData (Suggest, Clean, Party, Geolocate). TTL **`mxdadata_cache_ttl`**. Очистка с вкладки **Обзор** — только эта таблица. **`RateLimiter`** хранит счётчик в **`cacheManager`** |
| `mxdadata_log` | Журнал запросов, ротация по **`mxdadata_log_retention_days`** (процессор **`Logs/Rotate`**, задача Scheduler **`mxdadata_rotate_logs`**) |

При обновлении с ранних сборок резолвер переименовывает legacy-таблицы `msdadata2_cache` и `msdadata2_log` в `mxdadata_*`. При удалении пакета таблицы сохраняются.

## Связанные разделы документации

- [Интеграция и сценарии](/components/mxdadata/integration) — плагин, кэш, mermaid-схемы
- [Системные настройки](/components/mxdadata/settings) — полный список ключей
- [Подключение на сайте](/components/mxdadata/frontend) — поля формы и коннектор
- [Админка в MODX](/components/mxdadata/admin-ui) — права и вкладки Vue
