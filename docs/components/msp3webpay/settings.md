---
title: Системные настройки
description: Номер магазина WEBPAY, секрет, логин кабинета, валюта и адреса API
---

# Системные настройки msp3WebPay

Краткая последовательность шагов: [Быстрый старт](quick-start).

Ключ в MODX: `msp3webpay_<имя>`. Номер магазина, секрет, логин и пароль можно положить в `msPayment.properties` (`store_id`, `secret_key`, `api_username`, `api_password`). Если properties пусты, пакет читает системные настройки.

После смены настроек очистите кеш MODX.

Где взять номер магазина и секрет: [Быстрый старт](quick-start#откуда-брать-ключи).

Типы и значения по умолчанию в README пакета не перечислены. Ниже то, что там названо.

Свой адрес API пакет примет только для хостов `securesandbox.webpay.by`, `payment.webpay.by`, `sandbox.webpay.by`, `billing.webpay.by`.

| Ключ | Назначение |
| --- | --- |
| `msp3webpay_store_id` | Номер магазина, поле `wsb_storeid` |
| `msp3webpay_secret_key` | Секрет. Подпись заказа и проверка уведомления |
| `msp3webpay_api_username` | Логин для списания, отмены холда и возврата |
| `msp3webpay_api_password` | Пароль для тех же действий |
| `msp3webpay_currency` | Валюта: BYN, USD, EUR или RUB |
| `msp3webpay_test` | Песочница. Страница оплаты `securesandbox.webpay.by` |
| `msp3webpay_language_id` | Язык формы: `russian` или `english` |
| `msp3webpay_store_name` | Название магазина на форме, поле `wsb_store` |
| `msp3webpay_payment_api_url` | Свой адрес создания платежа. Только хосты из списка выше |
| `msp3webpay_operations_api_url` | Свой адрес списания и отмены. Только те же хосты |
| `msp3webpay_success_url` | Куда `return.php` отправит покупателя после оплаты |
| `msp3webpay_fail_url` | Куда отправит после ошибки |
| `msp3webpay_debug` | Подробный лог. На бою выключите |
