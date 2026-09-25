---
title: Интеграция и сценарии
description: Webhook WEBPAY, типы оплаты, ERIP, холд и Operations API
---

# Интеграция msp3WebPay

Шаги установки: [Быстрый старт](quick-start).

## Как проходит оплата

| Способ | Запрос | Что делает |
| --- | --- | --- |
| Оплата через WebPay (карта) | `POST /api/v1/payment_standard` | Списание сразу |
| Оплата через WebPay (ERIP) | `POST /api/v1/payment_Erip` | Префикс `WP-` у номера заказа, если `uuid` начинается с `0` |
| Оплата через WebPay (двухстадийная) | тот же платёжный API | Холд. Уведомление `payment_type=4` ставит `authorized` |

`send()` отдаёт ссылку на оплату, номер платежа `wt` и номер заказа `wsb_order_num`. В попытке сохраняются `wt` и `webpay_order_num`. После webhook добавляется `transaction_id`.

Если JSON-адрес создания платежа отвечает **404** или приходит ответ **не JSON**, пакет сохраняет заявку в кэш и отправляет покупателя на `assets/components/msp3webpay/pay.php?sid=…`. Сессия формы живёт **1800** с. `pay.php` шлёт POST на корень хоста из **`paymentApiBaseUrl()`**, в том числе при своём `msp3webpay_payment_api_url`. Адрес `/api/v1/payment` пакет не использует. Туда WEBPAY ждёт зашифрованные данные карты.

```mermaid
flowchart LR
  Buyer[Покупатель]
  MS3[MiniShop3]
  Pkg[msp3WebPay]
  Bank[WEBPAY]
  Buyer -->|оформление| MS3
  MS3 -->|send| Pkg
  Pkg -->|payment_standard| Bank
  Pkg -->|redirect| MS3
  Buyer -->|оплата| Bank
  Bank -->|webhook| Pkg
  Pkg -->|статус заказа| MS3
```

## Webhook

Один адрес в кабинете:

```text
https://ваш-домен.ru/assets/components/msp3webpay/webhook.php
```

Уведомление приходит формой. Пакет считает подпись `wsb_signature` по [правилам WEBPAY](https://docs.webpay.by/paymentIntegration/cardIntegration/paymentNotification/) (MD5) и пробует вариант с полем карты и без него.

Секрет для проверки: properties способа, иначе **`msp3webpay_secret_key`**.

Неизвестный `payment_type` пакет игнорирует с ответом `200`, но вызывает событие MODX **`msp3WebPayOnProviderEvent`** с телом уведомления.

| `payment_type` | Обычная оплата и ERIP | Холд |
| --- | --- | --- |
| 1, Completed | paid | paid |
| 4, Authorized | paid | authorized |
| 2 и 8, отказ | failed | failed |
| 5 и 9, возврат | refunded | refunded |
| 7 и 11, отмена | cancelled | cancelled |

Статус заказа после этого ставят `ms3_status_paid`, `ms3_payment_on_failed_status` и `ms3_payment_on_refunded_status`.

Публичного запроса статуса у WEBPAY для этого пакета нет. Кнопка **Синхронизировать** не ходит в API WEBPAY. Она отдаёт попытки, уже записанные на сайте. Если нет **`store_id`** и **`secret_key`**, ответ всё равно успешный, во вкладке текст «не настроен» (`msp3webpay.err_not_configured`).

Вкладка заказа вызывает `assets/components/msp3webpay/connector.php`: **`mgr/getlist`**, **`mgr/sync`**, **`mgr/capture`**, **`mgr/cancel`**, **`mgr/refund`**. Плагин **`msp3webpay_bootstrap`** подключает автозагрузку и скрипты вкладки.

## Возврат покупателя

`return.php` перенаправляет браузер на **`msp3webpay_success_url`** или **`msp3webpay_fail_url`**, если URL задан и хост совпадает с сайтом. Иначе браузер уходит на ресурс **`ms3_order_redirect_thanks_id`** MiniShop3. При ошибке добавляется `payment_fail=1`. Статус заказа эта страница не ставит. Оплату подтверждает только webhook.

## Списание, отмена и возврат

Пакет входит в кабинет: `POST /api/login`, в ответе токен. Тестовый хост `https://sandbox.webpay.by`. Боевой `https://billing.webpay.by`. Нужны **`msp3webpay_api_username`** и **`msp3webpay_api_password`**.

| Действие | Запрос | Что дальше |
| --- | --- | --- |
| Списать холд | `POST /api/v1/transactions/complete` | Заказ отмечается оплаченным |
| Отменить холд | `POST /api/v1/transactions/cancel` | Попытка отменяется |
| Вернуть после оплаты | `POST /api/v1/transactions/cancel` | Попытка помечается возвратом |

Пока попытка в `authorized`, возврат не уходит. Сначала спишите холд.
