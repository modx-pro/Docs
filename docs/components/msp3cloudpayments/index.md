---
title: msp3CloudPayments
description: "Приём оплаты через CloudPayments для MiniShop3: счёт, шесть уведомлений, одно- и двухстадийная схема"
author: Ibochkarev
dependencies: miniShop3
categories: payment

compatibility:
  - modx3
  - php82
  - minishop3
items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Системные настройки', link: 'settings' },
  { text: 'Интеграция и сценарии', link: 'integration' },
  { text: 'FAQ', link: 'faq' },
]
---

# msp3CloudPayments

**msp3CloudPayments** подключает [CloudPayments](https://developers.cloudpayments.ru/) к [MiniShop3](/components/minishop3/) в MODX Revolution 3. Пакет создаёт счёт, покупатель переходит по ссылке. Статус «оплачен» выставляет MiniShop3. Пакет сам статус заказа не меняет.

Сумма уходит с двумя знаками после запятой. Валюта по умолчанию RUB.

Уведомление подписано секретом API. Проверку подписи выключить нельзя. Чек 54-ФЗ, если он включён, уходит вместе со счётом. Для чека в адресе заказа нужен email или телефон.

Старый пакет `mspCloudPayments` при установке не удаляется.

- [Документация API](https://developers.cloudpayments.ru/)
- [Кабинет](https://merchant.cloudpayments.ru/)

## Возможности

- Обычная оплата, деньги списываются сразу: способ **Оплата через CloudPayments**.
- Холд, деньги сначала блокируются: способ **Оплата через CloudPayments (двухстадийная)**. Заказ станет оплаченным после списания или уведомления Confirm.
- Шесть адресов уведомлений: оплата, проверка, отказ, подтверждение, возврат, отмена.
- Проверка перед оплатой статус заказа не меняет. Она ищет попытку по `ms3_ref` и сверяет сумму с суммой попытки.
- Во вкладке заказа: списание холда, отмена холда, возврат, отмена неоплаченного счёта, запрос статуса у CloudPayments.
- Номер счёта пакет сохраняет сам. Отмена неоплаченного счёта webhook не ждёт.

Тестовый Public ID виджета `test_api_00000000000000000000001` для счетов не подходит.

## Системные требования

| Требование | Версия |
| --- | --- |
| MODX Revolution | 3.0+ |
| MiniShop3 | 1.14.0-beta1 и новее |
| PHP | 8.2+ |
| pdoTools | 3.0.0 и новее |
| Доступ | Public ID и API Secret сайта |
| Чек 54-ФЗ | email или телефон в адресе заказа |
| Сайт | HTTPS на webhook без редиректа 301 |

### Зависимости

- [MiniShop3](/components/minishop3/): заказы и способы оплаты.
- pdoTools: зависимость транспорта пакета при установке через **Управление пакетами**.

## Установка

1. Установите **MiniShop3**.
2. Добавьте провайдер **modstore.pro** (**Система → Управление пакетами → Провайдеры**).
   URL: `https://modstore.pro/extras/`. Email и API-ключ из личного кабинета modstore.
3. Установите пакет **msp3CloudPayments** через **Управление пакетами** (в **Show Details** выберите провайдер **modstore.pro**).
4. **Очистите кэш** MODX.

Резолвер создаёт два активных способа:

| Название | Класс |
| --- | --- |
| Оплата через CloudPayments | `Msp3CloudPayments\Payment\CloudPaymentsPayment` |
| Оплата через CloudPayments (двухстадийная) | `Msp3CloudPayments\Payment\CloudPaymentsTwoStagePayment` |

Пространство имён настроек: **`msp3cloudpayments`**.

Счёт и вкладка заказа берут ключи по цепочке:

1. Непустые `msPayment.properties`: `public_id` или `login`, `api_secret`, `secret`, `webhook_secret`, `secret_key`.
2. `msp3cloudpayments_*`.
3. `mspcloudpayments_*`.

Кеш не подставляет ключи.

`webhook.php` считает HMAC по той же цепочке. Секрет только в `properties` активного способа достаточен.

Откуда брать Public ID и секрет: [Быстрый старт](quick-start#откуда-брать-ключи).

## Быстрая настройка уведомлений

Файл уведомлений: `assets/components/msp3cloudpayments/webhook.php`. В кабинете CloudPayments укажите шесть адресов. Общий вид:

```text
https://ваш-домен.ru/assets/components/msp3cloudpayments/webhook.php?event=pay
```

Вместо `pay` подставьте `check`, `fail`, `confirm`, `refund`, `cancel`. Полный список: [Быстрый старт](quick-start#шаг-3-шесть-адресов-уведомлений).

JSON-маршрут ядра MiniShop3 для этих уведомлений не подходит. CloudPayments шлёт обычную форму.

## Архитектура

```mermaid
flowchart LR
  Buyer[Покупатель]
  MS3[MiniShop3]
  Pkg[msp3CloudPayments]
  Bank[CloudPayments]
  Buyer -->|оформление| MS3
  MS3 -->|send| Pkg
  Pkg -->|orders/create| Bank
  Bank -->|ссылка| Pkg
  Pkg -->|redirect| MS3
  Buyer -->|оплата| Bank
  Bank -->|Check и Pay| Pkg
  Pkg -->|статус заказа| MS3
```

## Быстрые ссылки

| Нужно | Документ |
| --- | --- |
| Установить и принять первый платёж | [Быстрый старт](quick-start) |
| Все ключи `msp3cloudpayments_*` | [Системные настройки](settings) |
| Уведомления, холд, чек, старый пакет | [Интеграция](integration) |
| Код 13, код 12, холд | [FAQ](faq) |
| Оформление заказа MS3 | [MiniShop3: заказ](/components/minishop3/frontend/order) |
