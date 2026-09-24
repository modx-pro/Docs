---
title: Интеграция и сценарии
description: Webhook Точка Банка, холд, вкладка заказа, переход с mspTochka и ограничения
---

# Интеграция msp3Tochka

Нужны только шаги установки? Откройте [Быстрый старт](quick-start).

## Webhook

В кабинете событие `acquiringInternetPayment`:

```text
https://ваш-домен.ru/assets/components/msp3tochka/webhook.php
```

HTTPS без Basic Auth и без 301. Тело: компактный JWT, `Content-Type: text/plain`. Ответ всегда HTTP 200 и JSON `{"success":…,"message":…}`.

Обработчик проверяет подпись, если `msp3tochka_webhook_verify_jwt` включён, берёт `operationId` из claims и вызывает `getPayment`. Сумма сверяется с попыткой (допуск 0.02 ₽). Статус для lifecycle читается из ответа `GET /payments/{operationId}`, не из claims JWT.

| status | Попытка |
| --- | --- |
| APPROVED | paid |
| AUTHORIZED | authorized |
| EXPIRED | cancelled |
| REFUNDED | refunded |
| CREATED | игнор |

После APPROVED lifecycle ставит `ms3_status_paid`. Неуспех и возврат: `ms3_payment_on_failed_status` и `ms3_payment_on_refunded_status`.

Старый `mspTochka` при AUTHORIZED сам вызывал capture. Здесь спишите холд кнопкой во вкладке. Второй webhook APPROVED тоже ставит paid.

## Как проходит оплата

```mermaid
flowchart LR
  Buyer[Покупатель]
  MS3[MiniShop3]
  Pkg[msp3Tochka]
  API[TochkaAPI]
  Buyer -->|оформление| MS3
  MS3 -->|send| Pkg
  Pkg -->|POST /payments| API
  API -->|paymentLink и operationId| Pkg
  Pkg -->|redirect| MS3
  Buyer -->|оплата| API
  API -->|webhook JWT RS256| Pkg
  Pkg -->|GET /payments/operationId| API
  Pkg -->|lifecycle| MS3
```

`payment_id` и `external_id` это `paymentLinkId` вида `{orderId}-{random}`. `paymentLinkId` не длиннее 45 символов. `purpose`: `Order #<num>`, не длиннее 210 символов.

`operationId` пакет кладёт в payload попытки через `initiate()`.

Двухстадийный способ передаёт `preAuthorization=true`. У Точки нет `reverse`. Холд истекает по `ttl` (EXPIRED).

Событие `msp3TochkaOnProviderEvent` несёт claims JWT или ответ `getPayment`. Вызов идёт через `EventGate`, если класс есть в MiniShop3. Иначе `invokeEvent`.

Строки лога начинаются с `[msp3Tochka]`. Ошибки API, webhook и процессоров пишутся в `core/cache/logs/error.log` всегда.

`send()` отклоняет заказ дешевле 0.01 ₽.

## Вкладка заказа

Плагин на `msOnManagerCustomCssJs` вешает вкладку через `MS3OrderTabsRegistry`.

| Действие | API | Нужно |
| --- | --- | --- |
| Синхронизировать | `GET /payments/{operationId}` | `operationId` в payload |
| Списать холд | `POST …/capture` | `operationId`, статус AUTHORIZED |
| Возврат | `POST …/refund` | `operationId`, сумма не больше поступления |
| Отменить холд | нет | Дождитесь EXPIRED или спишите capture |

Возврат из вкладки на попытке `pending` или `authorized` не уходит в API. Сначала нужен webhook APPROVED или capture.

## Переход со старого mspTochka {#переход-со-старого-msptochka}

Резолвер копирует непустые `msptochka_*` в `msp3tochka_*`, если новые пусты. Старый способ оплаты не удаляется. Выключите его вручную и смените URL webhook.

Ключи `two_stage` и `status_refunded` больше не нужны. Двухстадийка это отдельный способ. Статус заказа задаёт ядро.

`paymentLinkId` больше не равен `msOrder.uuid`. Поиск попытки идёт по `external_id`.

## Ограничения

- Песочница не проводит карту и не шлёт живой webhook оплаты.
- Возврат из вкладки на попытке `pending` или `authorized` не уходит в API.
- Per-product НДС и регистрация webhook из админки MODX в пакете нет.
