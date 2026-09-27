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
| Баланс (Dashboard) | `dadata.ru/api/v2/profile/balance` (Secret) |

**Secret в браузер не отдаётся.** `mxdadata_api_secret` используется только в серверных запросах: плагин, менеджерские процессоры и действия `connector-web.php`, где нужен Secret. Публичные подсказки с витрины идут через `connector-web.php` с ограничением **`RateLimiter`** и кэшем.

**HTTP-повторы:** **`mxdadata_api_retry`** — число попыток. По умолчанию `1`. Повтор только при ошибке curl, не при HTTP 4xx/5xx.

## Таблицы БД

| Таблица | Назначение |
|---------|------------|
| `mxdadata_cache` | Ответы DaData (Suggest, Clean, Party, Geolocate). TTL **`mxdadata_cache_ttl`**. Очистка с Dashboard — только эта таблица. **`RateLimiter`** хранит счётчик в **`cacheManager`** |
| `mxdadata_log` | Журнал запросов, ротация по **`mxdadata_log_retention_days`** (процессор **`Logs/Rotate`**, задача Scheduler **`mxdadata_rotate_logs`**) |

## Связанные разделы документации

- [Интеграция и сценарии](/components/mxdadata/integration) — плагин, кэш, mermaid-схемы
- [Системные настройки](/components/mxdadata/settings) — полный список ключей
- [Подключение на сайте](/components/mxdadata/frontend) — поля формы и коннектор
- [Админка в MODX](/components/mxdadata/admin-ui) — права и вкладки Vue
