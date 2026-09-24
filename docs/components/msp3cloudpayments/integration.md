---
title: Интеграция и сценарии
description: Уведомления CloudPayments, холд, чек 54-ФЗ и переход со старого пакета
---

# Интеграция msp3CloudPayments

Шаги установки: [Быстрый старт](quick-start).

## Запросы к CloudPayments

| Действие | Запрос | Когда |
| --- | --- | --- |
| Создать счёт | `POST /orders/create` | Оформление заказа. Покупатель уходит на ссылку из ответа |
| Узнать статус | `v2/payments/find` | Кнопка синхронизации во вкладке |
| Списать холд | `payments/confirm` | После блокировки. Затем заказ отмечается оплаченным |
| Отменить холд | `payments/void` | До списания |
| Вернуть деньги | `payments/refund` | Нужен `TransactionId` из уведомления Pay |
| Отменить неоплаченный счёт | `orders/cancel` | По номеру счёта. Webhook не ждёт |

В запросах логин это Public ID, пароль это API Secret.

Обычный способ создаёт счёт без подтверждения. Двухстадийный способ передаёт `RequireConfirmation=true`.

## Уведомления

CloudPayments шлёт форму в UTF-8. Подпись в заголовке `X-Content-HMAC`: Base64 от HMAC-SHA256 сырого тела. Ключ подписи это API Secret. Выключить проверку нельзя. Неверная подпись отвечает кодом `13`.

| Тип | URL |
| --- | --- |
| Pay | `webhook.php?event=pay` |
| Check | `webhook.php?event=check` |
| Fail | `webhook.php?event=fail` |
| Confirm | `webhook.php?event=confirm` |
| Refund | `webhook.php?event=refund` |
| Cancel | `webhook.php?event=cancel` |

Полный адрес: `https://ваш-домен.ru/assets/components/msp3cloudpayments/webhook.php?event=pay`. JSON-маршрут ядра MiniShop3 не подходит.

Check статус заказа не меняет. Он ищет попытку по `ms3_ref` и сверяет сумму.

| Ответ Check | Значение |
| --- | --- |
| `{"code":0}` | Сумма совпала, попытка найдена |
| `10` | Попытка не найдена. Пустое тело Check тоже отвечает `10` |
| `12` | Сумма не совпала с суммой заказа |
| `13` | Неверная подпись, пустое тело Pay или редирект 301 |

| Событие | Попытка оплаты |
| --- | --- |
| pay и статус Completed | paid |
| pay и статус Authorized | authorized |
| confirm | paid |
| fail | failed |
| cancel | cancelled |
| refund | refunded |

## Как проходит оплата

```mermaid
flowchart LR
  Buyer[Покупатель]
  MS3[MiniShop3]
  Pkg[msp3CloudPayments]
  Bank[CloudPayments]
  Buyer -->|оформление| MS3
  MS3 -->|send| Pkg
  Pkg -->|orders/create| Bank
  Bank -->|ссылка и номер| Pkg
  Pkg -->|redirect| MS3
  Buyer -->|оплата| Bank
  Bank -->|Check и Pay| Pkg
  Pkg -->|code| Bank
  Pkg -->|статус заказа| MS3
```

Номер попытки `ms3_ref` имеет вид `{номер заказа}-{случайная строка}`. Тот же номер пакет кладёт в данные счёта. В API это поле `JsonData`. `InvoiceId` это номер заказа MiniShop3.

Для возврата в данных попытки нужен `TransactionId` из уведомления Pay.

## Вкладка заказа

После Pay со статусом Authorized заказ ещё не оплачен. Спишите холд (`payments/confirm`) или дождитесь Confirm. Оба пути отмечают оплату.

Пока попытка ждёт оплату или деньги только заблокированы, вкладка возврат не вызывает `payments/refund`. Сначала нужно уведомление или списание.

Отмена холда: `payments/void`. Неоплаченный счёт: `orders/cancel` по номеру счёта CloudPayments.

## Чек 54-ФЗ

Включите **`msp3cloudpayments_payment_receipt`**. Тогда вместе со счётом уходит чек. В данных счёта это блок `CloudPayments.CustomerReceipt` внутри `JsonData`. В заказе нужен email.

Строку чека можно поправить событием `msp3CloudPaymentsOnPrepareReceiptItem`.

Система налогообложения: 0-5. НДС по умолчанию `none`. Признак способа расчёта по умолчанию `4`. Предмет товара `1`, предмет доставки `4`.

## Переход со старого mspCloudPayments {#переход-со-старого-mspcloudpayments}

Резолвер копирует непустые `mspcloudpayments_public_id`, `api_secret`, `currency`, `success_url`, `fail_url`, `json_data_extra`, `debug` в ключи `msp3cloudpayments_*`, если новые пусты. Старый способ не удаляется. Выключите его и пропишите шесть новых адресов уведомлений.
