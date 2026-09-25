---
title: FAQ
description: "Ограничения msp3BePaid: возврат до оплаты, отмена ссылки и страница return"
---

# FAQ

## Возврат не уходит

Пока попытка в `pending`, вкладка не отправляет возврат. Дождитесь webhook со статусом `successful`. Возврат идёт по UID транзакции на `https://gateway.bepaid.by/transactions/refunds`.

## Нельзя отменить ссылку на оплату

У bePaid нет запроса, который отменяет токен checkout. Во вкладке заказа кнопка отмены есть. Она всегда отвечает, что отмена через API недоступна.

Покупатель может не платить. Когда срок ссылки кончится, bePaid может прислать уведомление об истечении токена. Попытка при этом остаётся `pending`. В `failed` она перейдёт, только если в webhook придёт `transaction.status` из списка `expired`, `failed`, `error`, `declined`.

## Покупатель вернулся на сайт, а заказ не оплачен

`return.php` сверяет токен и при успешном checkout может догнать статус в MiniShop3, если webhook опоздал. Обычно «оплачен» ставит webhook на `assets/components/msp3bepaid/webhook.php`.

Проверьте адрес в кабинете bePaid и доставку по HTTPS без 301. Убедитесь, что в токене checkout уходит `notification_url` на `webhook.php` и что запросы доходят.
