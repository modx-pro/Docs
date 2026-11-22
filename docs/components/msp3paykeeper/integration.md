---
title: Интеграция и сценарии
description: Webhook PayKeeper, поток оплаты, вкладка заказа и чеки 54-ФЗ
---

# Интеграция msp3PayKeeper

Шаги установки: [Быстрый старт](quick-start).

## API и код

| Метод PayKeeper | Назначение |
| --- | --- |
| `POST /change/invoice/preview/` | Счёт. Ответ содержит `invoice_url` и `invoice_id` |
| `GET /info/settings/token/` | Проверка Basic Auth. В ответе поле `token` |
| `GET /info/invoice/byid/` | Статус счёта (sync на вкладке) |
| `GET /info/payments/byid/` | Статус платежа (sync на вкладке) |
| `POST /change/payment/reverse/` | Возврат по id платежа из поля `id` уведомления |
| `POST /change/payment/capture/` | Списание холда (двухстадийная схема) |
| `POST /change/invoice/revoke/` | Отмена неоплаченного счёта |
| form POST на `webhook.php` | Уведомление об оплате, подпись md5 |

Одностадийный класс: `Msp3PayKeeper\Payment\PayKeeperPayment`. Двухстадийный: `PayKeeperTwoStagePayment`.

## Webhook

### События пакета

* **`msp3PayKeeperOnPrepareReceiptItem`** – позволяет изменить объект счета (`$params['item']`) перед отправкой в PayKeeper.
* **`msp3PayKeeperOnProviderEvent`** – вызывается, когда получен webhook‑событие неизвестного типа (после успешной проверки подписи). В `payload` передаётся массив данных события, что даёт возможность разработчику обработать кастомные события PayKeeper.

<!-- MEDIA: скриншот поля URL POST-оповещений в кабинете PayKeeper -->

В кабинете PayKeeper один URL уведомлений:

```text
https://ваш-домен.ru/assets/components/msp3paykeeper/webhook.php
```

Требования: HTTPS, без Basic Auth и редиректов. PayKeeper шлёт form POST. Ядро MiniShop3 на `/api/v1/payment/webhook/{id}` ждёт JSON, этот маршрут для PayKeeper не подходит.

Подпись:

```text
key = md5(id + sum + clientid + orderid + secret_word)
```

Ответ: слово `OK`, пробел и `md5(id + secret_word)`. `Content-Type: text/plain`.

Кабинет шлёт `id` платежа, не `invoice_id`. Пакет находит попытку по `orderid`. Поле `invoice_id` в POST не обязательно.

Секрет для проверки подписи на `webhook.php`: сначала `secret_word` в properties активного способа, иначе **`msp3paykeeper_secret_word`**. Это не пароль API.

Неизвестный тип события после валидной подписи: пакет отвечает `OK`. Пакет не меняет статус заказа в ядре MiniShop3. Вызывается событие **`msp3PayKeeperOnProviderEvent`** с полем `payload`.

## Как проходит оплата

```mermaid
flowchart LR
  Buyer[Покупатель]
  MS3[MiniShop3]
  Pkg[msp3PayKeeper]
  PK[PayKeeper]
  Buyer -->|оформление| MS3
  MS3 -->|send| Pkg
  Pkg -->|invoice/preview| PK
  PK -->|invoice_url и invoice_id| Pkg
  Pkg -->|redirect| MS3
  Buyer -->|оплата на форме| PK
  PK -->|form POST и md5| Pkg
  Pkg -->|ответ OK и md5| PK
  Pkg -->|lifecycle| MS3
```

`payment_id` и `external_id` это `invoice_id`. Валюта `RUB`.

Для capture в payload нужен `id` платежа из webhook. Двухстадийный заказ не станет оплаченным, пока не спишете холд (`markPaid`).

В кабинете PayKeeper для холда включите двухэтапный режим и выберите способ **Оплата через PayKeeper (двухстадийная)**. Непустое поле `batch_date` в POST ставит попытку `authorized`.

## Вкладка заказа

### Ограничения Refund

| Статус попытки | Возможность возврата | Сообщение lexicon |
| --- | --- | --- |
| `PENDING` | ❌ | `msp3paykeeper.err_refund_pending` |
| `AUTHORIZED` (холд) | ❌ | `msp3paykeeper.err_refund_hold` |
| `REFUNDED` | ❌ | `msp3paykeeper.err_refund_done` |
| `PAID` | ✅ | — |
| `PARTIALLY_REFUNDED` | ✅ | — |

### Поведение Sync без полной конфигурации

Если любые из настроек `server_url`, `api_login` или `api_password` пустые, кнопка **Sync** в вкладке заказа возвращает `success` со списком локальных попыток и нотой `msp3paykeeper.err_not_configured`. Платёжные запросы к PayKeeper не отправляются.

## Чеки 54-ФЗ

<!-- MEDIA: скриншот вкладки PayKeeper в карточке заказа MiniShop3 -->

Плагин **`msp3paykeeper_bootstrap`**: `OnMODXInit` подключает autoload, `msOnManagerCustomCssJs` регистрирует вкладку на странице заказа MiniShop3.

Запросы вкладки идут в `assets/components/msp3paykeeper/connector.php` с параметром `action`:

| `action` | Назначение |
| --- | --- |
| `mgr/getlist` | Список попыток оплаты |
| `mgr/refund` | Возврат <!-- MEDIA: скриншот формы возврата во вкладке заказа --> |
| `mgr/cancel` | Отмена счёта |
| `mgr/capture` | Списание холда <!-- MEDIA: скриншот кнопки списания холда во вкладке заказа --> |
| `mgr/sync` | Синхронизация с PayKeeper |

Попытки лежат в `ms3_payment_attempts`. Sync вызывает `GET /info/invoice/byid/` и `GET /info/payments/byid/`. Если `Settings::isConfigured()` ложно (пустые `server_url`, логин или пароль API), sync отвечает success: текущие попытки и `note` из лексикона `msp3paykeeper.err_not_configured`.

Пока попытка `pending` или `authorized`, вкладка не вызывает `reverse`. Сначала нужен webhook или capture. Возврат идёт по `id` из уведомления. `invoice_id` для reverse не подходит.

## Чеки 54-ФЗ

<!-- MEDIA: скриншот примера чека в личном кабинете PayKeeper -->

При включённом `msp3paykeeper_payment_receipt` и непустом email покупателя `service_name` уходит JSON с `cart`. Без email счёт создаётся, `cart` не добавляется. Код НДС задаёт `msp3paykeeper_vat_code` (список 1-10).

Событие `msp3PayKeeperOnPrepareReceiptItem` правит строку чека до отправки счёта.
