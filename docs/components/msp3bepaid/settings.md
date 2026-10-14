---
title: Системные настройки
description: Shop ID, секрет и публичный ключ bePaid, валюта, ERIP и адреса возврата
---

# Системные настройки msp3BePaid

Ключ в MODX: `msp3bepaid_<имя>`. Те же значения можно положить в `msPayment.properties`. Непустые properties перекрывают системные настройки.

Установка и ключи: [Быстрый старт](quick-start).

| Ключ property | Системная настройка | Примечание |
| --- | --- | --- |
| `store_id` | `msp3bepaid_store_id` | Shop ID |
| `secret_key`, `secret`, `webhook_secret` | `msp3bepaid_secret_key` | Секрет. Алиасы читаются по порядку |
| `public_key` | `msp3bepaid_public_key` | Подпись `Content-Signature`. Пустой ключ пропускает проверку |
| `checkout_url` | `msp3bepaid_checkout_url` | URL создания checkout |
| `currency` | `msp3bepaid_currency` | Валюта запроса |
| `test` | `msp3bepaid_test` | `"test": true` в checkout |

Пакет считает способ **настроенным**, когда непустые Shop ID и секрет (`Settings::isConfigured()`). Публичный ключ для этого не нужен.

После смены настроек очистите кэш MODX.

Где взять Shop ID и секрет: [Быстрый старт](quick-start#откуда-брать-ключи).

## Поля из поставки пакета

Типы полей заданы в `_build/elements/settings.php`.

| Ключ | Тип поля | По умолчанию | Назначение |
| --- | --- | --- | --- |
| `msp3bepaid_store_id` | textfield | пусто | Shop ID. Логин Basic Auth для API и webhook |
| `msp3bepaid_secret_key` | text-password | пусто | Секретный ключ магазина |
| `msp3bepaid_public_key` | textarea | пусто | Публичный ключ для `Content-Signature` |
| `msp3bepaid_checkout_url` | textfield | `https://checkout.bepaid.by/ctp/api/checkouts` | API checkout. Разрешены только `checkout.bepaid.by` и `checkout.begateway.com` |
| `msp3bepaid_currency` | textfield | `BYN` | Валюта в запросе ссылки |
| `msp3bepaid_test` | combo-boolean | `true` | Тестовый checkout. Для боевых платежей выключите |
| `msp3bepaid_language` | textfield | `ru` | Язык страницы оплаты (`settings.language`) |
| `msp3bepaid_country` | textfield | `BY` | Страна покупателя, если в заказе не указана |
| `msp3bepaid_payment_types` | textfield | `credit_card` | Типы через запятую: `credit_card`, `erip` и другие из API |
| `msp3bepaid_erip_service_id` | textfield | `99999999` | Номер услуги ERIP (`service_no`) |
| `msp3bepaid_readonly_fields` | textfield | `email` | Поля только для чтения на checkout (`customer_fields.read_only`) |
| `msp3bepaid_visible_fields` | textfield | пусто | Видимые поля (`customer_fields.visible`) |
| `msp3bepaid_attempts` | numberfield | `3` | Число попыток оплаты по одной ссылке |
| `msp3bepaid_token_ttl_hours` | numberfield | `24` | Срок жизни ссылки в часах (`expired_at`) |
| `msp3bepaid_duplicate_check` | combo-boolean | `false` | Проверка дубликата при создании checkout |
| `msp3bepaid_success_url` | textfield | пусто | Запасной URL после успеха с `return.php`. Тот же хост, что у сайта |
| `msp3bepaid_fail_url` | textfield | пусто | Запасной URL после ошибки с `return.php`. Тот же хост, что у сайта |
| `msp3bepaid_debug` | combo-boolean | `false` | Подробный лог пакета в MODX |

## Какие ключи пакет не читает

При установке `resolver_01_settings.php` может создать системные настройки, которые **`Settings` не читает**. На checkout и webhook они не влияют. Shop ID по-прежнему только `msp3bepaid_store_id` или `store_id` в properties. Ключ `msp3bepaid_login` секрет не заменяет.

| Ключ | Назначение в админке |
| --- | --- |
| `msp3bepaid_login` | Не используется пакетом |
| `msp3bepaid_test_secret_key` | Не используется пакетом |
| `msp3bepaid_test_mode` | Не используется. Режим задаёт `msp3bepaid_test` |
| `msp3bepaid_payment_receipt` | Не используется пакетом |
| `msp3bepaid_vat_type` | Не используется пакетом |
| `msp3bepaid_payment_method` | Не используется пакетом |
| `msp3bepaid_payment_object_delivery` | Не используется пакетом |

Их можно оставить пустыми или удалить из списка настроек MODX.
