---
title: Системные настройки
---

# Системные настройки mxDadata

Все ключи в пространстве имён **`mxdadata`**, в БД: префикс `mxdadata_` (например `mxdadata_api_token`).

**Где менять:** **Настройки → Системные настройки** (фильтр `mxdadata`) либо **Extras → mxDadata** (вкладки API, miniShop3, Кеш, Общие).

## API

| Ключ | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `mxdadata_api_token` | текст | — | API Token DaData. Обязателен для Suggest, Clean, Party |
| `mxdadata_api_secret` | текст | — | Secret. Для Clean и Party |
| `mxdadata_api_timeout` | число | `2` | Таймаут HTTP к DaData, сек. |
| `mxdadata_api_retry` | число | `1` | Повторы при ошибке запроса |

## Кэш

| Ключ | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `mxdadata_cache_ttl` | число | `86400` | TTL кэша ответов, сек. (86400 = 24 ч.) |

Кэш в таблице `mxdadata_cache`. Очистка: вкладка **Кеш** в **Extras → mxDadata** или процессор `Cache/Clear`.

## Основные

| Ключ | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `mxdadata_enabled` | да/нет | Да | Включить компонент. При «Нет» плагин и публичный коннектор не обрабатывают логику |
| `mxdadata_throttle_rpm` | число | `60` | Лимит запросов в минуту (защита квоты DaData) |
| `mxdadata_log_level` | список | `warning` | Уровни: `error`, `warning`, `debug` |
| `mxdadata_debug_mode` | да/нет | Нет | Режим разработки: детальнее в лог и на витрине (в т.ч. детали ошибок в connector) |
| `mxdadata_log_retention_days` | число | `90` | Хранение записей логов (дней), используется при ротации |

## MiniShop3 {#minishop3}

| Ключ | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `mxdadata_strict_validation` | да/нет | Нет | Строгая валидация: невалидный телефон или email — заказ не создаётся |
| `mxdadata_block_order_on_error` | да/нет | Да | Блокировать заказ при любой ошибке валидации |
| `mxdadata_validate_phone` | да/нет | Да | Нормализация телефона через Clean |
| `mxdadata_validate_email` | да/нет | Да | Проверка email через Clean |
| `mxdadata_auto_normalize_address` | да/нет | Да | Нормализация адреса через Clean Address при создании заказа |
| `mxdadata_required_fias` | да/нет | Нет | Требовать выбор адреса из подсказок (FIAS) |
| `mxdadata_required_index` | да/нет | Нет | Требовать почтовый индекс |
| `mxdadata_field_mapping` | многостр. текст | — | JSON: переопределение сопоставления полей DaData → поля адреса MS3. Пример: `{"city": "city_with_type"}` |

По умолчанию маппинг включает `address`, `city`, `region`, `index`, `street`, `building`, `room`, `lat`, `lon`, `fias_id` и др. — см. исходник `AddressMapper` в пакете.

## Получение в коде

```php
$modx->getOption('mxdadata_api_token', null, '');
$modx->getOption('mxdadata_cache_ttl', null, 86400);
```

## Связанные настройки MiniShop3

Имена полей формы заказа должны соответствовать ожиданиям MS3 и сниппетов — см. [Подключение на сайте](frontend) и [Интеграцию](integration).
