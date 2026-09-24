---
title: Системные настройки
description: Логин и секреты CDEK Pay, тестовый режим, чек, время ссылки и QR
---

# Системные настройки msp3CDEKPay

Краткая последовательность шагов: [Быстрый старт](quick-start).

Ключ в MODX: `msp3cdekpay_<имя>`. Логин и секреты пакет читает отсюда. В свойства способа оплаты их класть не нужно.

После смены настроек очистите кеш MODX.

Где взять логин и секреты: [Быстрый старт](quick-start#откуда-брать-ключи).

| Ключ | Тип | По умолчанию | Назначение |
| --- | --- | --- | --- |
| `msp3cdekpay_login` | text | пусто | Логин магазина |
| `msp3cdekpay_secret_key` | password | пусто | Боевой секрет. Уведомления с валютой `RUR` |
| `msp3cdekpay_test_secret_key` | password | пусто | Тестовый секрет. Тестовый режим и уведомления с `TST` |
| `msp3cdekpay_test_mode` | bool | да | Да: тестовый API и валюта `TST`. Нет: бой и `RUR` |
| `msp3cdekpay_payment_receipt` | bool | нет | Чек в заказе на оплату. Нужны email покупателя и касса |
| `msp3cdekpay_vat_type` | list | `none` | НДС позиции чека |
| `msp3cdekpay_payment_method` | list | `full_payment` | Признак способа расчёта |
| `msp3cdekpay_payment_object_delivery` | number | `4` | Предмет расчёта для строки доставки |
| `msp3cdekpay_link_life_time` | number | `0` | Минуты жизни ссылки. `0` значит без таймера |
| `msp3cdekpay_qr_life_time` | number | `15` | Минуты жизни QR СБП. Минимум 2 |
| `msp3cdekpay_success_url` | text | пусто | Куда вернуть после оплаты. Пусто: страница благодарности MS3 |
| `msp3cdekpay_fail_url` | text | пусто | Куда вернуть после ошибки. Пусто: та же страница с `payment_fail=1` |
| `msp3cdekpay_debug` | bool | нет | Тело заказа на оплату и успешный webhook в лог. На бою выключите |

`vat_type`: `none`, `vat0`, `vat5`, `vat7`, `vat10`, `vat20`, `vat22`, `vat105`, `vat107`, `vat110`, `vat120`, `vat122`.

`payment_method`: `full_payment`, `full_prepayment`, `partial_payment`, `credit`, `credit_payment`.

Телефон уходит в CDEK Pay только если после нормализации получается 11 цифр и номер начинается с `7` или `8`. Номер `8xxxxxxxxxx` пакет заменяет на `7xxxxxxxxxx`. Email и телефон читаются из адреса заказа.
