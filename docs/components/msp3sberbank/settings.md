---
title: Системные настройки msp3Sberbank
description: Ключи API Сбербанка, callback, чеки 54-ФЗ, URL возврата, статусы и отладка
---

# Системные настройки msp3Sberbank

Краткая последовательность шагов: [Быстрый старт](quick-start).

Все настройки в пространстве имён **`msp3sberbank`**. Ключ в `modSystemSetting` и в `getOption()` пишется с подчёркиванием: `msp3sberbank_api_login`, `msp3sberbank_api_password` и т.д.

## Обязательные

| Ключ | Тип | Описание |
| --- | --- | --- |
| `msp3sberbank_api_url` | текст | URL API шлюза (со слэшем в конце). Тест: `https://ecomtest.sberbank.ru/ecomm/gw/partner/api/v1/`. Бой: `https://ecommerce.sberbank.ru/ecomm/gw/partner/api/v1/` |
| `msp3sberbank_api_login` | текст | Логин API (`userName`), суффикс **`-api`**. |
| `msp3sberbank_api_password` | пароль | Пароль API (секрет). |

Без пары login + password шлюз отклонит `register.do` (часто **errorCode 5**).

## Режим и API

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `msp3sberbank_debug` | да/нет | Нет | Подробные логи компонента в MODX. Password в лог маскируется. |
| `msp3sberbank_session_timeout_secs` | число | `1200` | TTL сессии шлюза (20 мин). Порог reuse `form_url` и параметр `sessionTimeoutSecs` в register. |
| `msp3sberbank_send_customer` | да/нет | Да | Передавать email и телефон покупателя в `register.do`. |
| `msp3sberbank_ssl_ca_file` | текст | '' | PEM с корнями НУЦ, если curl error 60. Пусто: bundled `certs/russian-trusted-chain.pem`. |

Переключение тест/бой: меняйте **`msp3sberbank_api_url`** и учётку `-api` под контур. Отдельной настройки test_mode нет.

## Возврат покупателя

| Ключ | Тип | Описание |
| --- | --- | --- |
| `msp3sberbank_return_url` | URL | Куда направить покупателя после оплаты. Плейсхолдеры `{order_id}`, `{order_num}`. Пусто: страница благодарности MS3 (`ms3_order_redirect_thanks_id`). |

## Статусы заказа

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `msp3sberbank_paid_status_id` | число | `2` | ID статуса «Оплачен». При `0` используется `ms3_status_paid`. |
| `msp3sberbank_authorized_status_id` | число | `0` | ID статуса после холда (pre-auth). `0`: не менять. |
| `msp3sberbank_reverse_status_id` | число | `0` | ID статуса после отмены холда (`reverse`). `0`: не менять. |
| `msp3sberbank_refund_status_id` | число | `0` | ID статуса после возврата. `0`: `ms3_status_refunded` или не менять. |

## Callback и безопасность

| Ключ | Тип | Описание |
| --- | --- | --- |
| `msp3sberbank_callback_secret` | пароль | Симметричный ключ HMAC-SHA256 из ЛК Сбербанка. |
| `msp3sberbank_callback_public_key` | textarea | PEM публичного ключа для проверки checksum (SHA512withRSA). |

URL callback задаётся **только в ЛК банка**:

```text
https://ваш-домен.ru/assets/components/msp3sberbank/callback.php
```

Если задан секрет или публичный ключ, callback без верного `checksum` отвечает **400**. Без ключей endpoint принимает запрос при валидном `orderId`/`mdOrder`, но статус всё равно перепроверяется через `getOrderStatusExtended.do`.

Алгоритм checksum: [Интеграция, callback](integration#callback).

## Чеки 54-ФЗ {#чеки-54-фз}

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `msp3sberbank_send_order_bundle` | да/нет | Нет | Передавать корзину в Сбербанк (`orderBundle`). |
| `msp3sberbank_ffd_version` | список | `1.2` | Версия ФФД: `1.05` или `1.2`. |
| `msp3sberbank_tax_type` | число | `0` | Код НДС в позиции чека (`tax.taxType`). Одна ставка на все позиции. |

При включённом `send_order_bundle` компонент добавляет **orderBundle** в **register.do** и в **deposit.do** для двухстадийной схемы.

Чек собирается из данных заказа MiniShop3:

- товары из `msOrder->getMany('Products')`
- доставка отдельной позицией, если `delivery_cost > 0`
- сумма позиций сверяется с `order.cost` (допуск ±1 коп.)
- email или телефон из адреса заказа, профиля или customer

Без email и телефона `send()` вернёт `msp3sberbank.error_fiscal_contact`. При расхождении сумм: `msp3sberbank.error_bundle_amount_mismatch`.

### Коды НДС (`msp3sberbank_tax_type`)

Сверяйте с [OpenAPI ecomtest](https://ecomtest.sberbank.ru/doc):

| Код | Смысл (часто) |
| --- | --- |
| `0` | Без НДС |
| `1` | НДС 0% |
| `2` | НДС 10% |
| `4` | НДС 10/110 |
| `6` | НДС 20% |
| `7` | НДС 20/120 |

## Способы оплаты MiniShop3

После установки в **MiniShop3 → Оплаты**:

| Название | Класс | Сценарий |
| --- | --- | --- |
| Оплата через Сбербанк | `Msp3Sberbank\Payment\SberbankPayment` | `register.do` |
| Оплата через Сбербанк (двухстадийная) | `Msp3Sberbank\Payment\SberbankPreAuthPayment` | `registerPreAuth.do` + Deposit |

## Связанные настройки MiniShop3

| Ключ MS3 | Роль |
| --- | --- |
| `ms3_status_paid` | Статус «оплачен», если `paid_status_id = 0`. |
| `ms3_status_refunded` | Статус возврата, если `refund_status_id = 0`. |
| `ms3_order_redirect_thanks_id` | Ресурс «Спасибо за заказ», если `return_url` пуст. |

Проверьте значения в **Системные настройки → minishop3** или в админке MiniShop3.

## TLS и сертификаты НУЦ

Шлюз на сертификатах НУЦ Минцифры. Без них PHP/curl даёт error **60** или **35**.

В пакете: `core/components/msp3sberbank/certs/russian-trusted-chain.pem`. `CurlHttpClient` подставляет его автоматически.

Альтернатива: путь в `msp3sberbank_ssl_ca_file`.

На Linux:

```bash
sudo apt install ca-certificates
sudo wget -O /usr/local/share/ca-certificates/russian-trusted-root.crt \
  https://gu-st.ru/content/lending/russian_trusted_root_ca_pem.crt
sudo wget -O /usr/local/share/ca-certificates/russian-trusted-sub.crt \
  https://gu-st.ru/content/lending/russian_trusted_sub_ca_pem.crt
sudo update-ca-certificates
```

## Логирование

| Ситуация | Куда |
| --- | --- |
| Ошибки register, callback, deposit | `core/cache/logs/error.log` |
| Запросы и ответы API | только при **`msp3sberbank_debug = 1`**, уровень DEBUG |

Строки начинаются с `[msp3Sberbank]`. В логах маскируются `password` и `userName`.

## Что дальше

- [Интеграция и сценарии](integration): callback, deposit/reverse/refund, оплата из ЛК
- [FAQ](faq): errorCode 5, checksum, curl 60
