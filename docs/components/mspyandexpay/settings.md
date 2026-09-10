---
title: Системные настройки mspYandexPay
description: Merchant ID, API Key, среда, Split, URL возврата, QR и отладка
---

# Системные настройки mspYandexPay

Краткая последовательность шагов: [Быстрый старт](quick-start).

Все настройки в пространстве имён **`mspyandexpay`**. Ключ в `modSystemSetting` и в `getOption()` пишется с подчёркиванием: `mspyandexpay_merchant_id`, `mspyandexpay_api_key` и т.д.

## Обязательные

| Ключ | Тип | Описание |
| --- | --- | --- |
| `mspyandexpay_merchant_id` | текст | **Merchant ID** из кабинета Яндекс Пэй. |
| `mspyandexpay_api_key` | пароль | **Api-Key** Merchant API. В sandbox = Merchant ID. В production — выпущенный ключ. |

Без пары Merchant ID + API Key создание заказа в API завершится ошибкой конфигурации.

Пустой `api_key` компонент может подставить из Merchant ID. Этого хватает только для sandbox.

## Среда и отладка

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `mspyandexpay_environment` | список | `sandbox` | `sandbox` или `production`. Любое значение, кроме `production`, остаётся sandbox. |
| `mspyandexpay_debug` | да/нет | Нет | Подробные логи с префиксом `[mspYandexPay]`. API key в лог не попадает. |

| Среда | Base URL API | JWKS |
| --- | --- | --- |
| sandbox | `https://sandbox.pay.yandex.ru/api/merchant/v1` (refund — v2) | `https://sandbox.pay.yandex.ru/api/jwks` |
| production | `https://pay.yandex.ru/api/merchant/v1` (refund — v2) | `https://pay.yandex.ru/api/jwks` |

## Возврат покупателя

| Ключ | Тип | Описание |
| --- | --- | --- |
| `mspyandexpay_success_url` | URL | Куда направить покупателя после **успешной** оплаты. Пусто — страница благодарности MiniShop3. |
| `mspyandexpay_fail_url` | URL | Страница при **ошибке** оплаты. |

На production указывайте HTTPS-адреса боевого домена.

## Методы оплаты и Split

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `mspyandexpay_payment_methods` | текст | `CARD` | CSV для createOrder: `CARD`, `SPLIT` или `CARD,SPLIT`. |
| `mspyandexpay_preferred_payment_method` | текст | `FULLPAYMENT` | Предпочтительный метод API (например `SPLIT`). Значение `FULLPAYMENT` в payload не передаётся. |
| `mspyandexpay_is_prepayment` | да/нет | Нет | Флаг `isPrepayment` в createOrder. Для Split «при получении» обычно `Нет`. |

Способ **«Яндекс Пэй + Сплит»** сам задаёт методы `CARD`+`SPLIT` и preferred `SPLIT`, независимо от глобального preferred.

## Возвраты

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `mspyandexpay_refunded_status_id` | число | `0` | ID статуса заказа после **полного** `REFUNDED`. При `0` используется `ms3_status_canceled`. |

Частичный возврат (`PARTIALLY_REFUNDED`) статус заказа в MS3 не меняет.

## QR

| Ключ | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `mspyandexpay_qr_enabled` | да/нет | Нет | Разрешить способ **«Яндекс Пэй QR»**. Без флага класс QR отклонит оплату. |

После включения активируйте `msPayment` «Яндекс Пэй QR» в MiniShop3 и привяжите к доставкам.

## Связанные настройки MiniShop3

| Ключ MS3 | Роль |
| --- | --- |
| `ms3_status_paid` | Статус «оплачен». Webhook выставляет при `CAPTURED` / `CONFIRMED`. |
| `ms3_status_canceled` | Статус отмены. Webhook при `FAILED` / `VOIDED` и при полном `REFUNDED`, если `mspyandexpay_refunded_status_id` = `0`. |
| `ms3_order_redirect_thanks_id` | Ресурс «Спасибо за заказ», если не заданы `mspyandexpay_success_url` / `mspyandexpay_fail_url`. |

Проверьте значения в **Системные настройки → minishop3** или в админке MiniShop3.

## Что дальше

- [Интеграция и сценарии](integration): webhook, двухстадийная оплата, connector, сниппет
- [FAQ](faq): типовые ошибки конфигурации
