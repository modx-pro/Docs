---
title: Системные настройки
description: Ключи msp3Tochka, JWT, customerCode, песочница, срок ссылки и проверка webhook
---

# Системные настройки msp3Tochka

Установка и ключи: [Быстрый старт](quick-start).

Ключ в MODX: `msp3tochka_<имя>`. JWT и `customerCode` можно положить в `msPayment.properties` (`jwt_token`, `token` или `secret`). Если properties пусты, пакет читает системные настройки.

После смены настроек очистите кеш MODX. Иначе запросы к API идут со старыми значениями.

Где взять JWT, `customerCode` и `merchantId`: [Быстрый старт](quick-start#откуда-брать-ключи).

| Ключ | Тип | По умолчанию | Назначение |
| --- | --- | --- | --- |
| `msp3tochka_jwt_token` | textarea | пусто | Bearer JWT |
| `msp3tochka_customer_code` | text | пусто | customerCode |
| `msp3tochka_merchant_id` | text | пусто | Если несколько торговых точек |
| `msp3tochka_test_mode` | bool | да | Да: sandbox. Нет: `/uapi` |
| `msp3tochka_api_base_url` | text | пусто | Перекрывает хост из `test_mode` |
| `msp3tochka_api_version` | text | `v1.0` | Версия acquiring |
| `msp3tochka_payment_modes` | textarea | `["card","sbp"]` | JSON-массив способов на ссылке |
| `msp3tochka_ttl_minutes` | number | `0` | Срок ссылки в минутах. `0` значит без `ttl`. Диапазон 1-44640 |
| `msp3tochka_create_data_extra` | textarea | пусто | JSON, сливается в тело `Data` |
| `msp3tochka_success_url` | text | пусто | Возврат после оплаты. Пусто: страница благодарности MS3 |
| `msp3tochka_fail_url` | text | пусто | Возврат после ошибки. Пусто: та же страница с `payment_fail=1` |
| `msp3tochka_webhook_verify_jwt` | bool | да | Проверять подпись уведомления банка. На бою оставьте Да |
| `msp3tochka_webhook_jwk_url` | text | ключ банка | `https://enter.tochka.com/doc/openapi/static/keys/public` |
| `msp3tochka_webhook_jwk_json` | textarea | пусто | JWK вручную, если URL недоступен |
| `msp3tochka_debug` | bool | нет | Тело create и успешный webhook в лог MODX. На бою выключите |

Хост при **`msp3tochka_test_mode`** = Да: `https://enter.tochka.com/sandbox/v2`. При значении Нет: `https://enter.tochka.com/uapi`.
