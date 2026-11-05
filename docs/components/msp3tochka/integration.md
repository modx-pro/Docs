---
title: Интеграция и сценарии
description: Webhook Точка Банка, холд, вкладка заказа, переход с mspTochka и ограничения
---

# Интеграция msp3Tochka

Шаги установки: [Быстрый старт](quick-start).

## Webhook

В кабинете укажите событие `acquiringInternetPayment`:

```text
https://ваш-домен.ru/assets/components/msp3tochka/webhook.php
```

HTTPS без Basic Auth и без 301. Тело – компактный JWT, `Content-Type: text/plain`.

| Ответ | Когда |
| --- | --- |
| HTTP 200, JSON `{"success":…,"message":…}` | обычно |
| HTTP 500, текст `Config not found` | нет `config.core.php` |
| HTTP 500, `"Lifecycle unavailable"` | MiniShop3 не зарегистрировал `ms3_payment_lifecycle` |

Обработчик проверяет подпись, если включена настройка `msp3tochka_webhook_verify_jwt`. Затем берёт номер операции из токена и запрашивает платёж у банка (`GET /payments/{operationId}`). Сумма сверяется с попыткой (допуск 0.02 ₽). Статус заказа пакет получает из этого ответа, а не из текста уведомления.

| status | Попытка | Заказ |
| --- | --- | --- |
| APPROVED | paid | `ms3_status_paid` |
| AUTHORIZED | authorized | |
| EXPIRED | cancelled | cancelled и ключ `ms3_payment_on_cancelled_status` |
| REFUNDED | refunded | `ms3_payment_on_refunded_status` |
| CREATED | игнор | |
| ON-REFUND | игнор, как CREATED | |

Пакет не устанавливает статус failed. Ключ `ms3_payment_on_failed_status` для webhook Точки не используется.

Старый `mspTochka` при AUTHORIZED самостоятельно вызывал capture. Здесь холд списывается кнопкой во вкладке заказа. Второй webhook APPROVED также устанавливает paid.

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

`payment_id` и `external_id` равны `paymentLinkId` вида `{orderId}-{random}`. `paymentLinkId` ограничен 45 символами. `purpose`: `Order #<num>`, не длиннее 210 символов.

Номер операции банка сохраняется у попытки оплаты. Без него кнопки вкладки заказа в банк не работают.

Двухстадийный способ просит банк заблокировать деньги, а не списать сразу (`preAuthorization=true`). Отмены холда у Точки нет. Блокировка снимается автоматически при истечении срока ссылки (статус EXPIRED).

Событие `msp3TochkaOnProviderEvent` получает данные уведомления или ответ банка о платеже. Если в MiniShop3 есть класс `EventGate`, пакет вызывает событие через него. Иначе вызывает напрямую.

Строки лога начинаются с `[msp3Tochka]`. Ошибки API, webhook и процессоров записываются в `core/cache/logs/error.log` всегда.

Пакет не отправляет оплату, если сумма заказа меньше 1 копейки.

## Вкладка заказа

Плагин `msp3tochka_bootstrap` на хуке `OnMODXInit` подключает автозагрузку. На `msOnManagerCustomCssJs` добавляет вкладку через `MS3OrderTabsRegistry`. Запросы вкладки направляются в `assets/components/msp3tochka/connector.php`.

| action | Процессор |
| --- | --- |
| `mgr/getlist` | список попыток оплаты |
| `mgr/sync` | статус в банке |
| `mgr/capture` | списание холда |
| `mgr/refund` | возврат |
| `mgr/cancel` | подсказка про EXPIRED |

| Действие | API | Необходимо |
| --- | --- | --- |
| Синхронизировать | `GET /payments/{operationId}` | JWT в настройках, `operationId` у попытки |
| Списать холд | `POST …/capture` | JWT и `customerCode`, статус AUTHORIZED |
| Возврат | `POST …/refund` | JWT и `customerCode`, попытка `paid` или `partially_refunded` |
| Отменить холд | нет | Дождитесь EXPIRED или спишите capture |

**Синхронизировать** без JWT в настройках в банк не работает. Connector вернёт список попыток и сообщение «не настроено». Для оплаты (`send`) и webhook требуются и JWT, и `customerCode`.

Возврат из вкладки на попытке `pending` или `authorized` не отправляется в API. Сначала требуется webhook APPROVED или capture. Повторный частичный возврат с попыткой `partially_refunded` разрешён.

## Переход со старого mspTochka {#переход-со-старого-msptochka}

Резолвер копирует непустые `msptochka_*` в `msp3tochka_*`, если новые пусты. Старый способ оплаты не удаляется. Отключите его вручную и измените URL webhook.

Ключи `two_stage` и `status_refunded` больше не требуются. Двухстадийная оплата реализуется отдельным способом. Статус заказа устанавливает MiniShop3.

`paymentLinkId` больше не равен `msOrder.uuid`. Поиск попытки осуществляется по `external_id`.

## Ограничения

- Песочница не проводит оплату картой и не отправляет настоящий webhook.
- Возврат из вкладки на попытке `pending` или `authorized` не отправляется в API. При статусе `partially_refunded` частичный возврат можно повторить.
- Пакет не задаёт отдельный НДС на каждый товар. Зарегистрировать уведомление из админки MODX также невозможно.
