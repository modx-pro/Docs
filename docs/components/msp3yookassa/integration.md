---
title: Интеграция msp3YooKassa
description: Webhook, одно- и двухстадийная оплата, процессор Capture, событие чека
---

# Интеграция msp3YooKassa

Первичное подключение без деталей API: [Быстрый старт](quick-start).

Ниже — привязка к официальной документации ЮKassa и к коду **msp3YooKassa** (создание платежа, `return_url`, webhook, чеки). Общая модель совпадает с [описанием сценария на ModStore для mspYooKassa](https://modstore.pro/packages/payment-system/mspyookassa), но пути файлов, настройки и классы относятся к **MiniShop3**.

## Соответствие документации API ЮKassa

| Шаг по [Quick start](https://yookassa.ru/developers/payment-acceptance/getting-started/quick-start) | Реализация в msp3YooKassa |
|--------------------------------------------------------------------------------------------------------|---------------------------|
| Создать платеж (`POST /v3/payments`), указать `amount`, `capture`, `confirmation.type = redirect`, `return_url` | `YooKassaPayment::send()` — `createPayment()` через SDK, `confirmation.return_url` из метода `getReturnUrl()` (настраиваемые [`success_url` / `fail_url`](/components/msp3yookassa/settings) или страница благодарности MS3) |
| [Ключ идемпотентности](https://yookassa.ru/developers/using-api/interaction-format#idempotence) | UUID заказа или уникальный префикс (`idempotenceKey`) |
| Редирект на `confirmation_url` | Ответ обработчика оплаты с `redirect` / `payment_link` для фронтенда MS3 |
| Дождаться `succeeded` / обработать отмену | В первую очередь [HTTP-уведомления](https://yookassa.ru/developers/using-api/webhooks) → `webhook.php` → `WebhookHandler` |

Подтверждение оплаты пользователем на стороне ЮKassa для сценария **redirect** описано в разделе [«Процесс платежа»](https://yookassa.ru/developers/payment-acceptance/getting-started/payment-process#user-confirmation). [Одностадийные и двухстадийные платежи](https://yookassa.ru/developers/payment-acceptance/getting-started/payment-process#capture-and-cancel) в API задаются параметром `capture` (`true` в `YooKassaPayment`, `false` в `YooKassaTwoStagePayment`).

## Настройка HTTP-уведомлений (webhook)

В кабинете ЮKassa: **Интеграция → HTTP-уведомления** (формулировка может отличаться в интерфейсе; актуальный раздел см. в [документации по вебхукам](https://yookassa.ru/developers/using-api/webhooks)).

Укажите URL **вашего** сайта:

```text
https://ваш-домен.ru/assets/components/msp3yookassa/webhook.php
```

Обработчик принимает JSON-тело уведомления, разбирает объект платежа и обновляет заказ в MODX. Имеет смысл подписаться на события, связанные с изменением платежа (в т.ч. переход в `succeeded` / `canceled`), в соответствии с рекомендациями кабинета. Дополнительно изучите разделы о [проверке уведомлений](https://yookassa.ru/developers/using-api/webhooks) — при необходимости доработайте `webhook.php` под вашу политику безопасности.

## Тестовый магазин и проверка оплаты

ЮKassa позволяет отладить интеграцию **без реальных списаний**: используйте [тестовый магазин и тестовые ключи](https://yookassa.ru/developers/payment-acceptance/testing-and-going-live/testing) (идентификатор и секретный ключ с префиксом `test_`). Подставьте их в настройки `msp3yookassa.shop_id` и `msp3yookassa.secret_key`.

Для оплаты картой в тесте используйте [тестовые банковские карты](https://yookassa.ru/developers/payment-acceptance/testing-and-going-live/testing#test-bank-card) из документации (срок действия — любая будущая дата, CVC и 3-D Secure — по указаниям в справке). **Реальные карты в тестовом магазине использовать нельзя.**

После перехода в боевой режим замените ключи на **боевые** из профиля реального магазина, как описано в [«Быстром старте»](https://yookassa.ru/developers/payment-acceptance/getting-started/quick-start).

## Чеки 54-ФЗ

Если вы обязаны передавать данные для чека, включите [`msp3yookassa.payment_receipt`](settings) и задайте [`msp3yookassa.vat_code`](settings). В запрос создания платежа передаётся объект `receipt` (позиции из состава заказа, доставка при `delivery_cost > 0`, email покупателя). Основы формата — в [документации по чекам](https://yookassa.ru/developers/payment-acceptance/receipts/basics).

В тестовом магазине можно включить **режим проверки чеков** в настройках онлайн-кассы в кабинете: ЮKassa имитирует взаимодействие с ОФД без реальной фискализации — удобно проверить, что дополнение передаёт корректную структуру (см. разделы о тестировании в [документации по приёму платежей](https://yookassa.ru/developers/payment-acceptance/testing-and-going-live/testing)).

В коде чека фиксирован **`tax_system_code`: 1** (общая СНО в терминах API). При необходимости другой системы налогообложения расширяйте логику через событие или форк `ReceiptBuilder`.

## Способы оплаты для покупателя

Конкретный набор (карты, **СБП**, кошелёк и т.д.) пользователь выбирает **на стороне ЮKassa** после перехода по `confirmation_url`. Дополнение не внедряет виджет или отдельную форму ввода карты на сайте — используется сценарий **redirect**, как в [примере Quick start](https://yookassa.ru/developers/payment-acceptance/getting-started/quick-start).

## Поток одностадийной оплаты

1. Покупатель оформляет заказ и выбирает способ **«Оплата через ЮKassa»**.
2. Обработчик `YooKassaPayment::send()` создаёт платеж в API ЮKassa (`capture: true`), сохраняет `yookassa_payment_id` в `properties` заказа и возвращает фронтенду `redirect` на страницу оплаты.
3. После оплаты ЮKassa шлёт **HTTP-уведомление** на `assets/components/msp3yookassa/webhook.php`.
4. `WebhookHandler` находит заказ по `metadata.order_id` / `order_num`, сверяет `order_hash`, при статусе **`succeeded`** выставляет заказу `status_id = ms3_status_paid`.
5. Возврат пользователя на сайт идёт на `success_url` или страницу благодарности MiniShop3.

Источник истины по факту оплаты — **webhook**, а не только редирект браузера.

## Webhook

- **URL:** `https://<домен>/assets/components/msp3yookassa/webhook.php`
- Тело запроса — JSON события ЮKassa (`event`, `object` с `status`, `id`, `metadata`).
- Обрабатываются статусы:
  - **`succeeded`** — заказ переводится в статус оплачен (`ms3_status_paid`), в `properties` обновляется `yookassa_payment_id`.
  - **`canceled`** — заказ переводится в статус отмены (`ms3_status_canceled`).
- Другие статусы (например, промежуточные) логируются при включённом `msp3yookassa.debug` и не меняют заказ.
- Повторные уведомления обрабатываются идемпотентно: если заказ уже в `ms3_status_paid`, статус не дублируется.

### Безопасность

Сверка `order_hash` в metadata с `getOrderHash()` активного платёжного класса ЮKassa снижает риск подмены уведомления. Рекомендуется настроить в кабинете ЮKassa проверку подлинности уведомлений по [документации ЮKassa](https://yookassa.ru/developers/using-api/webhooks) (при необходимости доработать точку входа `webhook.php` под проверку подписи, если вы её включаете).

## Двухстадийная оплата

Способ оплаты **«Оплата через ЮKassa (двухстадийная)»** (`YooKassaTwoStagePayment`) создаёт платеж с **`capture: false`**: средства блокируются до подтверждения (capture) или отмены.

### Поведение статусов в MODX

- После успешного «холда» ЮKassa может присылать статусы вроде **`waiting_for_capture`**. Текущая реализация webhook **не меняет** статус заказа в MODX на таких событиях — заказ остаётся в прежнем статусе до **`succeeded`** или **`canceled`**.
- **Подтверждение списания** выполняется вызовом API capture (см. ниже) — после успеха процессор выставляет заказу `ms3_status_paid`.
- **Отмена** холда в ЮKassa приводит к уведомлению **`canceled`** — заказ получает `ms3_status_canceled`.

Спланируйте бизнес-процесс: например, ручное подтверждение менеджером после проверки заказа.

## Процессор Capture (подтверждение холда)

Класс: `Msp3YooKassa\Processors\CaptureProcessor`.
Файл: `core/components/msp3yookassa/processors/capture.class.php`.

**Условия:**

- у заказа способ оплаты — именно `Msp3YooKassa\Payment\YooKassaTwoStagePayment`;
- в `properties` заказа есть `yookassa_payment_id`;
- в настройках заданы `shop_id` и `secret_key`.

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

Перед добавлением позиции товара в чек вызывается системное событие:

- **`mspYooKassaOnPreparePaymentReceiptItem`**

Передаваемые поля: `order`, `orderProduct`, `item` (массив позиции по контракту ЮKassa; можно изменять по ссылке).

Используйте для уточнения `description`, `vat_code`, `payment_subject` / `payment_mode` под вашу учётную политику.

## Ограничения и заметки

- Валюта платежа в коде зафиксирована как **RUB**.
- Минимальная сумма заказа для создания платежа — не менее **0.01** условных единиц.
- Ключ идемпотентности при `createPayment` — UUID заказа или уникальный префикс, чтобы повторное оформление не плодило дубли при сбоях.
- Для работы SDK в точках входа подключается `vendor/autoload.php` компонента; при сборке пакета зависимости Composer должны попадать в транспорт.

## Связанные разделы документации

- [Быстрый старт](quick-start)
- [Системные настройки](settings)
- [MiniShop3 — оформление заказа и оплаты](/components/minishop3/frontend/order)
