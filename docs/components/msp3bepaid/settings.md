---
title: Системные настройки
description: Shop ID, секрет и публичный ключ bePaid, валюта, ERIP и адреса возврата
---

# Системные настройки msp3BePaid

Краткая последовательность шагов: [Быстрый старт](quick-start).

Ключ в MODX: `msp3bepaid_<имя>`. Shop ID, секрет и публичный ключ можно положить в `msPayment.properties` (`store_id`, `secret_key`, `public_key`, `webhook_secret`). Если properties пусты, пакет читает системные настройки.

После смены настроек очистите кеш MODX.

Где взять Shop ID и секрет: [Быстрый старт](quick-start#откуда-брать-ключи).

Типы и значения по умолчанию в README пакета не перечислены. Ниже то, что там названо. Валюта по умолчанию BYN. Поле `test` добавляет в запрос ссылки `"test": true`.

| Ключ | Назначение |
| --- | --- |
| `msp3bepaid_store_id` | Shop ID. Логин для запросов к bePaid и для уведомления |
| `msp3bepaid_secret_key` | Секретный ключ магазина. Пароль для тех же запросов |
| `msp3bepaid_public_key` | Публичный ключ. Им пакет проверяет подпись уведомления |
| `msp3bepaid_checkout_url` | Адрес API, где создаётся ссылка на оплату. Свой URL пакет принимает только с разрешённых хостов |
| `msp3bepaid_currency` | Валюта. По умолчанию BYN |
| `msp3bepaid_test` | Тестовая ссылка: в запрос уходит `"test": true` |
| `msp3bepaid_payment_types` | Типы оплаты: `credit_card`, `erip` и другие из списка |
| `msp3bepaid_erip_service_id` | Номер услуги ERIP (`service_no`) |
| `msp3bepaid_attempts` | Параметр ссылки на оплату |
| `msp3bepaid_token_ttl_hours` | Сколько часов живёт ссылка |
| `msp3bepaid_duplicate_check` | Проверка повтора при создании ссылки |
| `msp3bepaid_success_url` | Куда вернуть покупателя после оплаты. Тот же хост, что у сайта |
| `msp3bepaid_fail_url` | Куда вернуть после ошибки. Тот же хост, что у сайта |
