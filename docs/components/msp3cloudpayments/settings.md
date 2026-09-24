---
title: Системные настройки
description: Public ID и API Secret CloudPayments, чек 54-ФЗ, валюта и URL возврата
---

# Системные настройки msp3CloudPayments

Краткая последовательность шагов: [Быстрый старт](quick-start).

Ключ в MODX: `msp3cloudpayments_<имя>`. Public ID и секрет можно положить в `msPayment.properties` (`public_id`, `api_secret`, `secret`, `webhook_secret`). Если properties пусты, пакет читает системные настройки.

После смены настроек очистите кеш MODX.

Где взять ключи: [Быстрый старт](quick-start#откуда-брать-ключи).

| Ключ | Тип | По умолчанию | Назначение |
| --- | --- | --- | --- |
| `msp3cloudpayments_public_id` | text | пусто | Public ID сайта |
| `msp3cloudpayments_api_secret` | password | пусто | API Secret. Им же считается подпись уведомления |
| `msp3cloudpayments_currency` | text | `RUB` | Валюта счёта |
| `msp3cloudpayments_api_base_url` | text | пусто | Свой адрес API. Пусто: `https://api.cloudpayments.ru` |
| `msp3cloudpayments_payment_receipt` | bool | нет | Чек 54-ФЗ уходит вместе со счётом |
| `msp3cloudpayments_taxation_system` | number | `0` | Система налогообложения, значения 0-5 |
| `msp3cloudpayments_vat` | list | `none` | НДС |
| `msp3cloudpayments_payment_method` | number | `4` | Признак способа расчёта |
| `msp3cloudpayments_payment_object` | number | `1` | Предмет расчёта товара |
| `msp3cloudpayments_payment_object_delivery` | number | `4` | Предмет расчёта доставки |
| `msp3cloudpayments_json_data_extra` | textarea | пусто | Дополнительный JSON. Пакет сливает его с номером попытки и чеком |
| `msp3cloudpayments_success_url` | text | пусто | Куда вернуть покупателя после оплаты |
| `msp3cloudpayments_fail_url` | text | пусто | Куда вернуть после ошибки |
| `msp3cloudpayments_debug` | bool | нет | Подробный лог. На бою выключите |
