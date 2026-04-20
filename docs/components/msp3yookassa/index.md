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

Дополнение подключает платёжный шлюз **[ЮKassa](https://yookassa.ru/)** к [MiniShop3](/components/minishop3/) на MODX Revolution 3.x: создание платежа через [REST API](https://yookassa.ru/developers/api), редирект покупателя на оплату (сценарий **redirect**), приём [HTTP-уведомлений](https://yookassa.ru/developers/using-api/webhooks) и опциональная передача данных [чека по 54-ФЗ](https://yookassa.ru/developers/payment-acceptance/receipts/basics).

По смыслу близко к дополнению **[mspYooKassa для miniShop2](https://modstore.pro/packages/payment-system/mspyookassa)** на ModStore, но **msp3YooKassa** рассчитан на **MiniShop3 / MODX 3**: другие классы оплаты, настройки в пространстве имён `msp3yookassa` и **другой URL для уведомлений** (`…/msp3yookassa/webhook.php`, а не `…/mspyookassa/notification.php`).

**Пошаговая инструкция:** [Быстрый старт](quick-start).

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

### Зависимости

- **[MiniShop3](/components/minishop3/)** — заказы, способы оплаты, статусы (`ms3_status_paid`, `ms3_status_canceled` и др.).

## Регистрация в ЮKassa и ключи API

Чтобы принимать оплату, нужен магазин в [личном кабинете ЮKassa](https://yookassa.ru/my). После подключения в разделе настроек магазина возьмите:

- **Идентификатор магазина** (`shopId`) — в дополнении: настройка [`msp3yookassa.shop_id`](settings).
- **Секретный ключ** — в дополнении: [`msp3yookassa.secret_key`](settings) (в старой документации к [mspYooKassa для MS2](https://modstore.pro/packages/payment-system/mspyookassa) он мог фигурировать как «пароль магазина»; в API ЮKassa используется пара **Shop ID + Secret Key**, см. [формат взаимодействия с API](https://yookassa.ru/developers/using-api/interaction-format)).

Запросы к API выполняются **с вашего сервера**; компонент использует официальный PHP SDK (`yoomoney/yookassa-sdk-php`), см. [SDK ЮKassa](https://yookassa.ru/developers/using-api/using-sdks).

Быстрый обзор жизненного цикла платежа — в [руководстве «Быстрый старт»](https://yookassa.ru/developers/payment-acceptance/getting-started/quick-start): создание платежа, `confirmation.type = redirect`, ожидание статуса `succeeded`. Логика msp3YooKassa этому соответствует (см. [интеграцию](integration)).

## Установка

1. Установите пакет через **Управление пакетами** или загрузите транспорт в `core/packages/` и выполните установку.
2. Убедитесь, что установлен **MiniShop3**.
3. В **Системные настройки → пространство имён `msp3yookassa`** задайте [параметры магазина](settings) (`shop_id`, `secret_key`).
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

Без корректного webhook статусы заказов в MODX не будут синхронизироваться с фактом оплаты или отмены в ЮKassa.

Подробнее: [Интеграция и сценарии](integration).

## Документация по разделам

- [Быстрый старт](quick-start) — установка, ключи, webhook, способ оплаты, тест, чеки.
- [Системные настройки](settings) — `shop_id`, ключ, чеки, URL возврата, отладка.
- [Интеграция и сценарии](integration) — поток оплаты, двухстадийный режим, вызов Capture, событие для позиций чека, ограничения.

## Сборка транспорта (для разработчиков)

Из корня репозитория дополнения:

```bash
php _build/build.php
```

Скачать готовый пакет: открыть в браузере `_build/build.php?download=1` (при работающем сайте в окружении сборки).

Лицензия пакета: GPL v2 or later.
