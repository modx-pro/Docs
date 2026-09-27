---
title: Для разработчиков
---

# Для разработчиков

Плейсхолдеры страницы, коннекторы и соответствие вызовов API DaData.

## Плейсхолдеры веб-контекста (OnWebPageInit)

Плейсхолдеры выставляет вызов `mxdadata_set_web_context_placeholders()`. В шаблонах и Fenom используйте **`[[+имя]]`**. Системные подстановки **`[[++…]]`** к ним не относятся. Это **плейсхолдеры страницы**:

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

- **Свои плагины** на `msOnBeforeCreateOrder` / `msOnSubmitOrder` выполняются **вместе** с mxDadata (приоритет — порядок плагинов в БД). mxDadata нормализует адрес в объекте `Address` **до** сохранения, если валидация прошла.
- Для реакции на **витрине** после подсказки используйте событие DOM **`mxdadata:order-address-updated`** (см. [Интеграция](integration#событие-для-других-скриптов)).

## Коннекторы

| Файл | Назначение |
|------|------------|
| **`connector-web.php`** | Витрина: Suggest/Party/Geolocate и т.д., ограничение частоты, кэш. CORS **`Access-Control-Allow-Origin: *`**. При ошибке процессора JSON **`{ success: false, message: 'Processor error' }`** без текста исключения |
| **`connector.php`** | Менеджер: Dashboard, логи, Clean-процессоры **`Clean/Phone`**, **`Clean/Email`**, **`Clean/Address`**, **`Clean/Name`**, Party, кэш. При **`mxdadata_debug_mode`** ответ может содержать сообщение исключения |

## Соответствие функций пакета и API DaData

| Возможность пакета | API DaData (сеть) |
|--------------------|-------------------|
| Подсказки (адрес, org, name, email, bank) | `suggestions.dadata.ru` — `suggest/*` (Token) |
| Геолокация адреса | `geolocate/address` (Token) |
| Party по ИНН | `findById/party` (Secret) |
| Версия/статус справочников Suggest | GET `…/suggestions/api/4_1/rs/status` (Token) |
| Clean: телефон, email, адрес, ФИО | `cleaner.dadata.ru/api/v1/clean/…` (Secret) |
| Баланс (дашборд) | `dadata.ru/api/v2/profile/balance` (Secret) |

**Secret в браузер не отдаётся.** `mxdadata_api_secret` используется только в серверных запросах: плагин, менеджерские процессоры и действия `connector-web.php`, где нужен Secret. Публичные подсказки с витрины идут через `connector-web.php` с ограничением **`RateLimiter`** и кэшем.

**HTTP-повторы:** настройка **`mxdadata_api_retry`** читается в клиенте, но **`exchange()`** повторов не делает ([issue #1](https://github.com/Ibochkarev/mxDadata/issues/1)).

## Таблицы БД

| Таблица | Назначение |
|---------|------------|
| `mxdadata_cache` | Создаётся при установке. **Кэш ответов в рантайме здесь не хранится** ([issue #3](https://github.com/Ibochkarev/mxDadata/issues/3)). Актуальный кэш — **`cacheManager`**, префикс `mxdadata_`, TTL **`mxdadata_cache_ttl`** |
| `mxdadata_log` | Журнал запросов, ротация по **`mxdadata_log_retention_days`** (процессор **`Logs/Rotate`**, задача Scheduler **`mxdadata_rotate_logs`**) |

## Связанные разделы документации

- [Интеграция и сценарии](integration) — плагин, кэш, mermaid-схемы
- [Системные настройки](settings) — полный список ключей
- [Подключение на сайте](frontend) — поля формы и коннектор
- [Админка в MODX](admin-ui) — права и вкладки Vue
