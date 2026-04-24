---
title: Для разработчиков
---

# Для разработчиков

Плейсхолдеры, отладка кода, соответствие вызовов API DaData и сценариев сопровождения.

## Плейсхолдеры веб-контекста (OnWebPageInit)

Плейсхолдеры выставляет вызов `mxdadata_set_web_context_placeholders()`. В шаблонах и Fenom используйте **`[[+имя]]`** (системные подстановки **`[[++…]]`** к ним не относятся) — это **плейсхолдеры страницы**:

| Плейсхолдер | Содержимое |
|-------------|------------|
| **`mxdadataConnectorWeb`** | Полный URL `…/assets/components/mxdadata/connector-web.php` |
| **`mxdadataEnabledOn`** | `1` или `0` — флаг `mxdadata_enabled` |
| **`mxdadataDebugOn`** | `1` или `0` — флаг `mxdadata_debug_mode` |
| **`cartPageId`** | ID страницы корзины MS3 |
| **`orderPageId`** | ID страницы оформления заказа MS3 |

Исходник: `core/components/mxdadata/include/web_context_placeholders.php`.

## События MODX / MiniShop3

- **Свои плагины** на `msOnBeforeCreateOrder` / `msOnSubmitOrder` выполняются **вместе** с mxDadata (приоритет — порядок плагинов в БД). mxDadata нормализует адрес в объекте `Address` **до** сохранения, если валидация прошла.
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

## Таблицы БД

| Таблица | Назначение |
|---------|------------|
| `mxdadata_cache` | Кэш ответов DaData, TTL `mxdadata_cache_ttl` |
| `mxdadata_log` | Журнал запросов, ротация по `mxdadata_log_retention_days` |

## Связанные разделы документации

- [Интеграция и сценарии](integration) — плагин, кэш, mermaid-схемы
- [Системные настройки](settings) — полный список ключей
- [Подключение на сайте](frontend) — поля формы и коннектор
