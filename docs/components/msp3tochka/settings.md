---
title: Системные настройки
description: Ключи msp3Tochka, JWT, customerCode, песочница, срок ссылки и проверка webhook
---

# Системные настройки msp3Tochka

Установка и ключи: [Быстрый старт](quick-start).

Ключ в MODX: `msp3tochka_<имя>`. JWT и `customerCode` можно поместить в `msPayment.properties` (ключи `jwt_token`, `token`, `secret` или `secret_key`). Если свойства пусты, пакет читает системные настройки, затем устаревший `msptochka_jwt_token`. Та же цепочка используется в методе `send()`, во вкладке заказа и в `webhook.php`.

После изменения настроек очистите кеш MODX. Иначе запросы к API будут использовать старые значения.

Где взять JWT, `customerCode` и `merchantId`: [Быстрый старт](quick-start#откуда-брать-ключи).

| Ключ | Тип | По умолчанию | Назначение |
| --- | --- | --- | --- |
| `msp3tochka_jwt_token` | textarea | пусто | Bearer JWT |
| `msp3tochka_customer_code` | text | пусто | customerCode |
| `msp3tochka_merchant_id` | text | пусто | При нескольких торговых точках |
| `msp3tochka_test_mode` | bool | да | Да: sandbox. Нет: `/uapi` |
| `msp3tochka_api_base_url` | text | пусто | Переопределяет хост из `test_mode` |
| `msp3tochka_api_version` | text | `v1.0` | Версия acquiring |
| `msp3tochka_payment_modes` | textarea | `["card","sbp"]` | JSON‑массив способов на ссылке |
| `msp3tochka_ttl_minutes` | number | `0` | Срок ссылки в минутах. `0` означает отсутствие `ttl`. Диапазон 1‑44640 |
| `msp3tochka_create_data_extra` | textarea | пусто | JSON, сливается в тело `Data` |
| `msp3tochka_success_url` | text | пусто | Возврат после оплаты. Пусто: страница благодарности MS3 |
| `msp3tochka_fail_url` | text | пусто | Возврат после ошибки. Пусто: та же страница с `payment_fail=1` |
| `msp3tochka_webhook_verify_jwt` | bool | да | Проверять подпись уведомления банка. В боевом режиме оставьте Да |
| `msp3tochka_webhook_jwk_url` | text | ключ банка | `https://enter.tochka.com/doc/openapi/static/keys/public` |
| `msp3tochka_webhook_jwk_json` | textarea | пусто | JWK вручную, если URL недоступен |
| `msp3tochka_debug` | bool | нет | Отладочные строки в лог MODX. В боевом режиме отключите |

Хост при **`msp3tochka_test_mode`** = Да: `https://enter.tochka.com/sandbox/v2`. При значении Нет: `https://enter.tochka.com/uapi`.

## Отладка и JWK

При **`msp3tochka_debug`** = Да пакет записывает в лог MODX сообщения уровня DEBUG. В `error.log` эти строки не попадут, если уровень сайта выше.

| Где | Поля в контексте |
| --- | --- |
| Создание ссылки | `order_id`, `paymentLinkId`, `two_stage` |
| Успешный webhook | `attempt_id`, `status` |

Точка входа `webhook.php` устанавливает уровень логирования ERROR. Отладочные строки webhook при включённом debug не попадут в `core/cache/logs/error.log`.

Ключ с `msp3tochka_webhook_jwk_url` кешируется на сутки в `core/cache/msp3tochka/tochka_webhook_jwk.json`. После изменения ключа банка удалите файл или очистите кеш MODX. Значение `msp3tochka_webhook_jwk_json` не использует кеш.
