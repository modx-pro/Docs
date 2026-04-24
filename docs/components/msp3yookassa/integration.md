---
title: Интеграция msp3YooKassa
description: Webhook, одно- и двухстадийная оплата, процессор Capture, событие чека
---

# Интеграция msp3YooKassa

Нужны только шаги без разбора API — смотрите [Быстрый старт](quick-start).

Ниже сопоставлены шаги из [документации ЮKassa](https://yookassa.ru/developers/payment-acceptance/getting-started/quick-start) и реализация в **msp3YooKassa** (платёж, `return_url`, webhook, чеки) для **MiniShop3**.

## Шаги из API ЮKassa и код msp3YooKassa

| Шаг по [Quick start](https://yookassa.ru/developers/payment-acceptance/getting-started/quick-start) | Реализация в msp3YooKassa |
|--------------------------------------------------------------------------------------------------------|---------------------------|
| Создать платеж (`POST /v3/payments`), указать `amount`, `capture`, `confirmation.type = redirect`, `return_url` | `YooKassaPayment::send()` — `createPayment()` через SDK, `confirmation.return_url` из метода `getReturnUrl()` (настраиваемые [`success_url` / `fail_url`](/components/msp3yookassa/settings) или страница благодарности MS3) |
| [Ключ идемпотентности](https://yookassa.ru/developers/using-api/interaction-format#idempotence) | UUID заказа или уникальный префикс (`idempotenceKey`) |
| Редирект на `confirmation_url` | Ответ обработчика оплаты с `redirect` / `payment_link` и идентификаторами заказа (см. [ответ `send()`](#ответ-send-и-фронтенд)) |
| Дождаться `succeeded` / обработать отмену | В первую очередь [HTTP-уведомления](https://yookassa.ru/developers/using-api/webhooks) → `webhook.php` → `WebhookHandler` |

Как пользователь подтверждает оплату при **redirect**, разобрано в [«Процесс платежа»](https://yookassa.ru/developers/payment-acceptance/getting-started/payment-process#user-confirmation). [Одно- и двухстадийный](https://yookassa.ru/developers/payment-acceptance/getting-started/payment-process#capture-and-cancel) режим — это `capture`: `true` в `YooKassaPayment`, `false` в `YooKassaTwoStagePayment`.

## Настройка HTTP-уведомлений (webhook)

В кабинете ЮKassa: **Интеграция → HTTP-уведомления** (в интерфейсе формулировка может отличаться, см. [документацию по вебхукам](https://yookassa.ru/developers/using-api/webhooks)).

Укажите URL **вашего** сайта:

```text
https://ваш-домен.ru/assets/components/msp3yookassa/webhook.php
```

## Тестовый магазин и проверка оплаты

ЮKassa позволяет отладить интеграцию **без реальных списаний**: используйте [тестовый магазин и тестовые ключи](https://yookassa.ru/developers/payment-acceptance/testing-and-going-live/testing) (идентификатор и секретный ключ с префиксом `test_`). Подставьте их в настройки `msp3yookassa_shop_id` и `msp3yookassa_secret_key`.

Для оплаты картой в тесте — [номера тестовых карт](https://yookassa.ru/developers/using-api/testing#test-bank-card) (срок, CVC и 3‑D Secure — по справке ЮKassa). **В тестовом магазине нельзя платить обычной картой.**

После перехода в боевой режим замените ключи на **боевые** из профиля реального магазина, как описано в [«Быстром старте»](https://yookassa.ru/developers/payment-acceptance/getting-started/quick-start).

## Чеки 54-ФЗ

Если вы обязаны передавать данные для чека, включите [`msp3yookassa_payment_receipt`](settings) и задайте [`msp3yookassa_vat_code`](settings). В запрос создания платежа передаётся объект `receipt` (позиции из состава заказа, доставка при `delivery_cost > 0`, email покупателя). Основы формата — в [документации по чекам](https://yookassa.ru/developers/payment-acceptance/receipts/basics).

В кабинете тестового магазина можно включить **проверку чеков**: до ОФД данные не доходят, но по ответу ЮKassa видно, что структура запроса верная (подробнее — [тестирование](https://yookassa.ru/developers/payment-acceptance/testing-and-going-live/testing)).

В коде чека фиксирован **`tax_system_code`: 1** (общая СНО в терминах API). При необходимости другой системы налогообложения расширяйте логику через событие или форк `ReceiptBuilder`.

## Способы оплаты для покупателя

Карта, **СБП** или кошелёк покупатель выбирает уже **на стороне ЮKassa** после перехода по `confirmation_url`. Виджет на сайте не встраиваем — только **redirect**, как в [базовом примере](https://yookassa.ru/developers/payment-acceptance/getting-started/quick-start).

## Ответ `send()` и фронтенд {#ответ-send-и-фронтенд}

После успешного `createPayment` и **сохранения заказа** с `yookassa_payment_id` в `properties` успешный JSON от MS3 (и полезная нагрузка для кастомного фронтенда) включает в том числе:

| Поле | Смысл |
|------|--------|
| `redirect` / `payment_link` | URL страницы оплаты ЮKassa |
| `payment_id` | Идентификатор платежа в API ЮKassa |
| `order_id` | Числовой ID заказа MiniShop3 |
| `order_num` | Номер заказа (строка) |
| `msorder` | UUID заказа (как в `return_url` и ссылке «спасибо») |

Если сохранить заказ с `yookassa_payment_id` **не удалось**, возвращается ошибка с текстом вроде «Could not save order after payment creation» — повторяйте попытку или проверьте целостность заказа. Платёж в ЮKassa при этом уже мог быть создан (разбирайте в кабинете ЮKassa).

Штатные сообщения отладки в лог MODX (в т.ч. тело запроса к API с меткой `YooKassa createPayment request`) пишутся **только** при `msp3yookassa_debug` = «Да».

## Поток одностадийной оплаты

1. Покупатель оформляет заказ и выбирает способ **«Оплата через ЮKassa»**.
2. Обработчик `YooKassaPayment::send()` создаёт платеж в API ЮKassa (`capture: true`), сохраняет `yookassa_payment_id` в `properties` заказа и возвращает фронтенду `redirect` на страницу оплаты.
3. После оплаты ЮKassa шлёт **HTTP-уведомление** на `assets/components/msp3yookassa/webhook.php`.
4. `WebhookHandler` находит заказ по `metadata.order_id` / `order_num`, сверяет `order_hash`, при статусе **`succeeded`** выставляет заказу `status_id = ms3_status_paid`.
5. Возврат пользователя на сайт идёт на `success_url` или страницу благодарности MiniShop3.

Факт оплаты для магазина фиксируйте по **webhook**, а не по одному только возврату браузера на сайт.

## Webhook

- **URL:** `https://<домен>/assets/components/msp3yookassa/webhook.php`
- **Метод:** со стороны ЮKassa — **POST**, тело запроса — JSON события (`event`, `object` с `status`, `id`, `metadata`).
- Обрабатываются статусы:
  - **`succeeded`** — заказу ставится `ms3_status_paid`, в `properties` пишется `yookassa_payment_id`.
  - **`canceled`** — заказу ставится `ms3_status_canceled`.
- Другие статусы (например, промежуточные) логируются при включённом `msp3yookassa_debug` и не меняют заказ.
- Повторные уведомления обрабатываются идемпотентно: если заказ уже в `ms3_status_paid`, статус не дублируется.

### Безопасность

`order_hash` в `metadata` сверяется с `getOrderHash()` у обработчика — это защита от чужого JSON с подставным заказом. Про подпись и прочие проверки — в [справочнике по вебхукам](https://yookassa.ru/developers/using-api/webhooks). При появлении требований с вашей стороны правьте `webhook.php` под них.

## Двухстадийная оплата

Способ оплаты **«Оплата через ЮKassa (двухстадийная)»** (`YooKassaTwoStagePayment`) создаёт платеж с **`capture: false`**: средства блокируются до подтверждения (capture) или отмены.

### Поведение статусов в MODX

- После успешного «холда» ЮKassa может присылать статусы вроде **`waiting_for_capture`**. Текущая реализация webhook **не меняет** статус заказа в MODX на таких событиях — заказ остаётся в прежнем статусе до **`succeeded`** или **`canceled`**.
- **Подтверждение списания** выполняется вызовом API capture (см. ниже) — после успеха процессор выставляет заказу `ms3_status_paid`.
- **Отмена** холда в ЮKassa приводит к уведомлению **`canceled`** — заказ получает `ms3_status_canceled`.

Решите заранее, кто подтверждает списание: например, менеджер в MODX после просмотра заказа или ваш скрипт по событию.

## Процессор Capture (подтверждение холда)

Класс: `Msp3YooKassa\Processors\CaptureProcessor`.
Файл: `core/components/msp3yookassa/processors/capture.class.php`.

**Условия:**

- у заказа способ оплаты — именно `Msp3YooKassa\Payment\YooKassaTwoStagePayment`.
- в `properties` заказа есть `yookassa_payment_id`.
- в настройках заданы `msp3yookassa_shop_id` и `msp3yookassa_secret_key`.

Строка в лог MODX при неудачном capture пишется **только** при включённом `msp3yookassa_debug`. Текст ошибки по-прежнему возвращается в ответе процессора менеджеру.

**Параметр:** `order_id` — числовой ID заказа MiniShop3.

Пример вызова из PHP (консоль, сниппет, своё меню):

```php
$corePath = $modx->getOption('msp3yookassa_core_path', null, MODX_CORE_PATH . 'components/msp3yookassa/');
$response = $modx->runProcessor('capture', [
    'order_id' => 123,
], [
    'processors_path' => $corePath . 'processors/',
]);

if ($response->isError()) {
    $modx->log(modX::LOG_LEVEL_ERROR, $response->getMessage());
} else {
    // Списание подтверждено, заказ переведён в ms3_status_paid
}
```

Тексты ошибок процессора вынесены в лексикон `msp3yookassa` (например, неверный ID заказа, не двухстадийный способ оплаты, нет `yookassa_payment_id`).

## Событие для позиций чека

Перед добавлением позиции товара в чек вызывается системное событие MODX с именем **`mspYooKassaOnPreparePaymentReceiptItem`** (так оно задано в коде пакета — подключайте плагин на нём, если нужно менять позиции).

Передаваемые поля: `order`, `orderProduct`, `item` (массив позиции по контракту ЮKassa, изменяемый по ссылке).

Нужны свои `description`, `vat_code`, `payment_subject` / `payment_mode` — правьте `item` в плагине на этом событии.

## Ограничения и заметки

- Валюта платежа в коде зафиксирована как **RUB**.
- Минимальная сумма заказа для создания платежа — не менее **0.01** условных единиц.
- Ключ идемпотентности при `createPayment` — UUID заказа или уникальный префикс, чтобы повторное оформление не плодило дубли при сбоях.
- Для работы SDK в точках входа подключается `vendor/autoload.php` компонента. При сборке пакета зависимости Composer должны попадать в транспорт.

## Связанные разделы документации

- [Быстрый старт](quick-start)
- [Системные настройки](settings)
- [MiniShop3 — оформление заказа и оплаты](/components/minishop3/frontend/order)
