---
title: Системные настройки
description: Ключи msp3Prodamus, URL payform, секрет, sys, валюта, чеки и URL возврата
---

# Системные настройки msp3Prodamus

Ключ в MODX: `msp3prodamus_<имя>`. Установка и ключи: [Быстрый старт](quick-start).

Секрет и URL для ссылки можно положить в `msPayment.properties`: `secret`, `secret_key`, `payform_url`. Для старых интеграций: `form_url`, `webhook_secret`. Непустые properties перекрывают системные настройки для ссылки и `webhook.php`.

Способ считается настроенным, когда непусты URL payform и секрет.

**Webhook** сверяет подпись с секретом из properties, иначе с **`msp3prodamus_secret_key`**.

Где взять URL, секрет и `sys`: [Быстрый старт](quick-start#откуда-брать-ключи).

| Ключ | Тип | По умолчанию | Назначение |
| --- | --- | --- | --- |
| `msp3prodamus_payform_url` | text | пусто | Адрес страницы, например `https://shop.payform.ru/` |
| `msp3prodamus_secret_key` | password | пусто | Секрет со страницы настроек |
| `msp3prodamus_sys` | text | пусто | Код интеграции. Без него Prodamus не примет `urlNotification` из запроса |
| `msp3prodamus_test_mode` | bool | да | В ссылку уходит `demo_mode=1` |
| `msp3prodamus_currency` | list | `rub` | `rub`, `usd`, `eur`, `kzt` |
| `msp3prodamus_available_payment_methods` | text | пусто | Коды через вертикальную черту, например `AC` и `SBP` |
| `msp3prodamus_payform_payment_method` | text | пусто | Один код, если метод выбираете на стороне магазина |
| `msp3prodamus_payment_receipt` | bool | нет | В `products` уходят поля чека |
| `msp3prodamus_vat_type` | list | `none` | НДС позиции |
| `msp3prodamus_payment_method` | list | `full_payment` | Признак расчёта для чека |
| `msp3prodamus_payment_object_delivery` | number | `4` | Предмет расчёта для строки доставки |
| `msp3prodamus_success_url` | text | пусто | `urlSuccess`. Пусто: страница благодарности MS3 (`ms3_order_redirect_thanks_id`) с `msorder` |
| `msp3prodamus_fail_url` | text | пусто | `urlReturn`. Пусто: та же страница с `payment_fail=1` |
| `msp3prodamus_debug` | bool | нет | В лог: `order_id`, `external_id` при создании ссылки. При webhook: `attempt_id`, `status`. На бою выключите |

`vat_type`: `none`, `vat0`, `vat5`, `vat7`, `vat10`, `vat20`, `vat22`, `vat105`, `vat107`, `vat110`, `vat120`, `vat122`.

`payment_method`: `full_payment`, `full_prepayment`, `partial_payment`, `credit`, `credit_payment`.

Телефон и email пакет читает из адреса заказа, затем из `msOrder.properties`, затем из `msCustomer`.

Телефон в payform уходит, только если после нормализации ровно 11 цифр и первая цифра `7` или `8` (номер РФ). Иначе пакет не отправляет `customer_phone`. В запросе к payform к номеру добавляют префикс `+`.
