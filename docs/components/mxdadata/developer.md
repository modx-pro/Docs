---
title: Для разработчиков
---

# Для разработчиков

Структура пакета, плейсхолдеры, отладка кода, соответствие вызовов API DaData и сценариев сопровождения.

## Структура каталогов (исходники)

| Путь | Назначение |
|------|------------|
| `core/components/mxdadata/src/` | PHP: `Services\` (DadataClient, Clean, Party, Suggest), `Integration\` (OrderValidator, AddressMapper), `Infrastructure\` (Cache, Logger, RateLimiter), `Processors\` |
| `core/components/mxdadata/elements/plugins/mxdadata.php` | Плагин: `OnWebPageInit`, `msOnBeforeCreateOrder`, `msOnSubmitOrder` |
| `core/components/mxdadata/include/web_context_placeholders.php` | Плейсхолдеры веб-контекста |
| `assets/components/mxdadata/` | `connector-web.php`, `connector.php`, JS/CSS витрины, сборка `js/mgr/vue-dist/` |
| `core/components/mxdadata/controllers/` | `home.class.php` — контроллер раздела менеджера |
| `_build/` | Сборка транспортного пакета (`build.php`) |
| `tools/smoke-tests.php` | Локальные smoke-тесты (без MODX) |

## Плейсхолдеры веб-контекста (OnWebPageInit)

Задаются через `mxdadata_set_web_context_placeholders()`; в шаблонах и Fenom доступны как `[[+имя]]` / `[[++…]]` не используются — это **плейсхолдеры страницы**:

| Плейсхолдер | Содержимое |
|-------------|------------|
| **`mxdadataConnectorWeb`** | Полный URL `…/assets/components/mxdadata/connector-web.php` |
| **`mxdadataEnabledOn`** | `1` или `0` — флаг `mxdadata_enabled` |
| **`mxdadataDebugOn`** | `1` или `0` — флаг `mxdadata_debug_mode` |
| **`cartPageId`** | ID страницы корзины MS3 (или MS2 fallback) |
| **`orderPageId`** | ID страницы оформления заказа MS3 (или MS2 fallback) |

Исходник: `core/components/mxdadata/include/web_context_placeholders.php`.

## События MODX / MiniShop3

- **Свои плагины** на `msOnBeforeCreateOrder` / `msOnSubmitOrder` выполняются **вместе** с mxDadata; приоритет задаётся порядком плагинов в БД. mxDadata нормализует адрес в объекте `Address` **до** сохранения, если валидация прошла.
- Для реакции на **фронте** после подсказки используйте событие DOM **`mxdadata:order-address-updated`** (см. [Интеграция](integration#событие-для-других-скриптов)).

## Соответствие функций пакета и API DaData

| Возможность пакета | API DaData (сеть) |
|--------------------|-------------------|
| Подсказки (адрес, org, name, email, bank) | `suggestions.dadata.ru` — `suggest/*` (Token) |
| Геолокация адреса | `geolocate/address` (Token) |
| Party по ИНН | `findById/party` (Secret) |
| Версия/статус справочников Suggest | GET `…/suggestions/api/4_1/rs/status` (Token) |
| Clean: телефон, email, адрес, ФИО | `cleaner.dadata.ru/api/v1/clean/…` (Secret) |
| Баланс (дашборд) | `dadata.ru/api/v2/profile/balance` (Secret) |

**Секрет в браузер не отдаётся:** `mxdadata_api_secret` используется только в серверных запросах (плагин, менеджерские процессоры, `connector-web.php` для действий, требующих Secret). Публичные подсказки с витрины идут через `connector-web.php` с ограничением **RateLimiter** и кэшем.

## Сборка интерфейса менеджера (Vue)

Из корня репозитория пакета (где `package.json`):

```bash
npm ci
npm run build:mgr
```

Артефакты: `assets/components/mxdadata/js/mgr/vue-dist/`. Режим watch: `npm run dev`.

## Smoke-тесты

Без полного MODX, проверка маппинга и граничных кейсов:

```bash
php tools/smoke-tests.php
```

из корня пакета; в `package.json` задано как `npm run test:smoke` / `npm test`.

## Таблицы БД

| Таблица | Назначение |
|---------|------------|
| `mxdadata_cache` | Кэш ответов DaData, TTL `mxdadata_cache_ttl` |
| `mxdadata_log` | Журнал запросов, ротация по `mxdadata_log_retention_days` |

Переустановка пакета: следуйте стандартной процедуре MODX; при смене схемы смотрите резолверы в `_build/resolvers/`.

## Связанные разделы документации

- [Интеграция и сценарии](integration) — плагин, кэш, mermaid-схемы
- [Системные настройки](settings) — полный список ключей
- [Подключение на сайте](frontend) — поля формы и коннектор
