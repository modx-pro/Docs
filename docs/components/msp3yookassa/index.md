---
title: msp3YooKassa
description: Приём оплаты через ЮKassa для MiniShop3 — одно- и двухстадийные платежи, webhook, чеки 54-ФЗ
author: ibochkarev
dependencies: miniShop3
categories: minishop3

items: [
  { text: 'Быстрый старт', link: 'quick-start' },
  { text: 'Системные настройки', link: 'settings' },
  { text: 'Интеграция и сценарии', link: 'integration' },
]
---

# msp3YooKassa

**msp3YooKassa** подключает **[ЮKassa](https://yookassa.ru/)** к [MiniShop3](/components/minishop3/) в MODX Revolution 3.x: [REST API](https://yookassa.ru/developers/api), сценарий **redirect** на оплату, [входящие уведомления](https://yookassa.ru/developers/using-api/webhooks) и по желанию [чек по 54-ФЗ](https://yookassa.ru/developers/payment-acceptance/receipts/basics) в одном запросе с созданием платежа.

**msp3YooKassa** ориентирован на **MiniShop3** в MODX 3: классы оплаты, пространство имён `msp3yookassa`, для HTTP-уведомлений — путь `…/assets/components/msp3yookassa/webhook.php`.

С чего начать: [Быстрый старт](quick-start).

## Возможности

- **Одностадийная оплата** — списание сразу после успешной оплаты (`capture: true`).
- **Двухстадийная оплата** — холдирование средств до подтверждения (capture) или отмены в кабинете ЮKassa / через API.
- **Webhook** — обновление статуса заказа в MODX по уведомлениям ЮKassa (проверка `order_hash`, идемпотентная обработка).
- **Чеки 54-ФЗ** — передача чека в запросе создания платежа (при включённой настройке и наличии email покупателя).
- **Процессор Capture** — подтверждение двухстадийного платежа из кода или админки (см. [Интеграция](integration)).

## Системные требования

| Требование | Версия |
|------------|--------|
| MODX Revolution | 3.0+ |
| PHP | 8.2+ |
| MiniShop3 | актуальная ветка под MODX 3 |
| pdoTools | 3.x |

### Зависимости

- [MiniShop3](/components/minishop3/) — заказы, способы оплаты, статусы (`ms3_status_paid`, `ms3_status_canceled` и т.д.).

## Регистрация в ЮKassa и ключи API

Чтобы принимать оплату, нужен магазин в [личном кабинете ЮKassa](https://yookassa.ru/my). После подключения в разделе настроек магазина возьмите:

- **Идентификатор магазина** (`shopId`) — в дополнении: настройка [`msp3yookassa_shop_id`](settings).
- **Секретный ключ** — в дополнении: [`msp3yookassa_secret_key`](settings). В старых текстах про API магазина ключ иногда называют «пароль магазина». В актуальном API ЮKassa используется пара **Shop ID + Secret Key** (см. [формат взаимодействия с API](https://yookassa.ru/developers/using-api/interaction-format)).

Запросы к API выполняются **с вашего сервера**. Компонент использует официальный PHP SDK (`yoomoney/yookassa-sdk-php`), см. [SDK ЮKassa](https://yookassa.ru/developers/using-api/using-sdks).

У ЮKassa это же описано в [коротком руководстве](https://yookassa.ru/developers/payment-acceptance/getting-started/quick-start): создание платежа, `confirmation.type = redirect`, затем `succeeded`. У msp3YooKassa тот же порядок, детали — в [интеграции](integration).

## Установка

1. Установите пакет через **Управление пакетами**.
2. Убедитесь, что установлен **MiniShop3**.
3. В **Системные настройки → пространство имён `msp3yookassa`** задайте [параметры магазина](settings) (`msp3yookassa_shop_id`, `msp3yookassa_secret_key`).
4. **Очистите кэш** сайта.

После установки резолвер создаёт два способа оплаты в MiniShop3 (если их ещё нет):

| Название | Класс | Поведение |
|----------|--------|-----------|
| Оплата через ЮKassa | `Msp3YooKassa\Payment\YooKassaPayment` | одностадийная |
| Оплата через ЮKassa (двухстадийная) | `Msp3YooKassa\Payment\YooKassaTwoStagePayment` | холд, затем capture |

Активируйте нужный способ в **MiniShop3 → Настройки → Оплаты** и привяжите к сценарию оформления заказа.

## Быстрая настройка webhook

В личном кабинете ЮKassa: **Настройки → HTTP-уведомления** укажите URL:

```text
https://ваш-домен.ru/assets/components/msp3yookassa/webhook.php
```

Если URL в кабинете неверный или сервер обрывает POST, в MODX заказ может остаться неоплаченным, хотя в ЮKassa платёж уже прошёл. Подробнее: [интеграция](integration).

## Документация по разделам

- [Быстрый старт](quick-start) — установка, ключи, webhook, способ оплаты, тест, чеки.
- [Системные настройки](settings) — `msp3yookassa_shop_id`, `msp3yookassa_secret_key`, чеки, URL возврата, `msp3yookassa_debug`.
- [Интеграция и сценарии](integration) — поток оплаты, двухстадийный режим, вызов Capture, событие для позиций чека, ограничения.

Лицензия: GPLv2 и новее.
