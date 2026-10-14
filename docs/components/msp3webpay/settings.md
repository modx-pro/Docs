---
title: Системные настройки
description: Номер магазина WEBPAY, секрет, логин кабинета, валюта и адреса API
---

# Системные настройки msp3WebPay

Установка и ключи: [Быстрый старт](quick-start).

Ключ в MODX: `msp3webpay_<имя>`. Номер магазина, секрет, логин и пароль можно положить в `msPayment.properties`. Непустые properties перекрывают системные настройки в **`send()`**, webhook, списании, отмене и возврате.

После смены настроек очистите кэш MODX.

Где взять номер магазина и секрет: [Быстрый старт](quick-start#откуда-брать-ключи).

Типы полей в описании пакета не заданы.

Свой адрес API пакет примет только для хостов `securesandbox.webpay.by`, `payment.webpay.by`, `sandbox.webpay.by`, `billing.webpay.by`.

## Properties способа оплаты

| Ключ | Назначение |
| --- | --- |
| `store_id` | Номер магазина |
| `secret_key` | Секрет |
| `secret` | То же, что `secret_key` |
| `api_username` | Логин кабинета |
| `api_password` | Пароль кабинета |
| `currency` | Валюта заявки |
| `test` | Тестовый хост страницы оплаты (`1` / `true` / `yes`) |

Остальные параметры (язык, URL возврата, отладка) только в системных настройках.

## Актуальные ключи

| Ключ | По умолчанию | Назначение |
| --- | --- | --- |
| `msp3webpay_store_id` | пусто | Номер магазина, поле `wsb_storeid` |
| `msp3webpay_secret_key` | пусто | Секрет. Подпись заявки и проверка webhook |
| `msp3webpay_api_username` | пусто | Логин для списания, отмены холда и возврата |
| `msp3webpay_api_password` | пусто | Пароль для тех же действий |
| `msp3webpay_currency` | `BYN` | Валюта. Пакет не проверяет список WEBPAY |
| `msp3webpay_test` | `true` | Тестовый хост: `securesandbox.webpay.by` вместо `payment.webpay.by` |
| `msp3webpay_language_id` | `russian` | Язык формы. Пакет не проверяет список WEBPAY |
| `msp3webpay_store_name` | пусто | Название магазина на форме, поле `wsb_store` |
| `msp3webpay_payment_api_url` | пусто | Свой адрес создания платежа. Только хосты из списка выше |
| `msp3webpay_operations_api_url` | пусто | Свой адрес списания и отмены. Только те же хосты |
| `msp3webpay_success_url` | пусто | Куда `return.php` отправит покупателя после оплаты |
| `msp3webpay_fail_url` | пусто | Куда отправит после ошибки |
| `msp3webpay_debug` | `false` | Подробный лог. На бою выключите |

Пакет считает настройку полной, если заполнены **`msp3webpay_store_id`** и **`msp3webpay_secret_key`**, либо те же значения стоят в properties способа для операций оплаты.

## Ключи резолвера, которые код не читает

При установке резолвер может создать дополнительные ключи. **`Settings`** их не использует. Менять их в админке смысла нет.

| Ключ | Примечание |
| --- | --- |
| `msp3webpay_login` | не используется |
| `msp3webpay_test_secret_key` | не используется |
| `msp3webpay_test_mode` | не используется. Песочницу не включает. Рабочая настройка: **`msp3webpay_test`** |
| `msp3webpay_payment_receipt` | не используется |
| `msp3webpay_vat_type` | не используется |
| `msp3webpay_payment_method` | не используется |
| `msp3webpay_payment_object_delivery` | не используется |
