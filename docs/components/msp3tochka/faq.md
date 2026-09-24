---
title: FAQ
description: "Частые сбои msp3Tochka: TLS, operationId, webhook, 403, кеш настроек"
---

# FAQ

## Payment provider HTTP error / TLS

Сертификат `enter.tochka.com` выдан НУЦ Минцифры. Mozilla `cacert.pem` этот УЦ не содержит. Пакет подмешивает `certs/russian_trusted.pem` в SSL-контекст `file_get_contents`. Если PHP ходит мимо пакета, добавьте эти корни в `openssl.cafile`.

## Нет operationId

После `send()` id должен лежать в payload. Если пакет старый, переустановите 1.0.0-pl. Sync, capture и refund без `operationId` не ходят в API.

## Webhook unmatched

В песочнице `getPayment` часто без `paymentLinkId`. Пакет тогда читает его из JWT. Если `msp3tochka_webhook_verify_jwt` = Да, а тело не JWT, обработчик отклонит запрос.

Webhook `apply` в песочнице проходит, только если сумма заказа 100 ₽: фикстура `getPayment` отдаёт APPROVED на эту сумму.

## 403 Forbidden by consent

У JWT нет права на эту пару `customerCode` и `merchantId`. Перевыпустите токен с `MakeAcquiringOperation` и `ReadAcquiringData`.

## Настройки в админке есть, API их не видит

Кеш системных настроек. **Управление → Очистить весь кеш**.
