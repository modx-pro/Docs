---
title: Устранение неисправностей
description: Типовые коды ошибок YCP и Pay webhook
---

# Устранение неисправностей

Примеры тел ошибок:

```json
{"error":{"code":"UNAUTHORIZED","message":"Missing Bearer token","details":{}}}
```

```json
{"reasonCode":"FORBIDDEN"}
```

| Симптом | Что проверить |
|---------|----------------|
| `503 MS2_UNAVAILABLE` | miniShop2 установлен, `$modx->getService('miniShop2')` работает |
| `503 DISABLED` | `msyandexcommerce_enabled` = да |
| `503` + `UNAUTHORIZED` | Пустой `msyandexcommerce_api_token` в настройках |
| `401` / `SESSION_REQUIRED` | Bearer = `msyandexcommerce_api_token`; для placed/cancel нужен `session_id` |
| `400 INVALID_CART` / `INVALID_JSON` | Тело JSON; в `basket/check` — непустой `items` |
| `403 BUTTON_DISABLED` | Кнопка express выключена в настройках |
| `413` / `PAYLOAD_TOO_LARGE` | Тело больше `max_request_bytes`. На `/v1/webhook` ответ `403` + `reasonCode: FORBIDDEN` |
| `422 EMPTY_CART` | Сессия без товаров |
| `422 BASKET_CHECK_FAILED` | Товар опубликован, не удалён, хватает остатка минус soft-reserve. Откуда читается остаток: [stock](stock) |
| `502 ORDER_CREATE_FAILED` | Логи `msyandexcommerce.log`, события `msOnBeforeCreateOrder` / `msOnCreateOrder` |
| Пустой diagnostics `tables` | Переустановить пакет / resolver schema |
| Нет кнопки «Обновить склады через YCP» в MODX | Кнопка в кабинете Яндекса при способе YCP/API. [configuration](configuration#где-кнопка-обновить-склады-через-ycp). Проверка: `GET …/api/v1/warehouses` + Bearer |
| `422 NO_DELIVERY` | Активный `msDelivery`, id в `delivery_*_id`, плагин не вернул пустой список без `id`. [delivery](delivery) |
| Плагин доставки не срабатывает | Событие `ms2ycpOnDeliveryOptions` отмечено у плагина. Пакет обновлён (resolver_04). Возврат через `$modx->event->returnedValues['options']` |
| Цена доставки в кабинете в сто раз меньше | Плагин пишет `price` в рублях. Нужны копейки. [plugins](plugins) |
| Pay webhook `403 FORBIDDEN` | `yapay_webhook_enabled`, `yapay_merchant_id` = UUID из ЛК, HTTPS |
| Pay webhook `403 UNAUTHORIZED` / `TOKEN_EXPIRED` | JWT / JWKS / время сервера. Лог `msyandexcommerce.log` |
| Pay webhook `404 ORDER_NOT_FOUND` | `order.orderId` = `ycp_external_order_id` или numeric `msOrder.id`. Сессия placed? [payment](payment) |
| CAPTURED, статус MS2 не сменился | `status_paid_id` или `ms2_status_paid` > 0 |

`GET …/api.php/health` — без токена. `POST …/api.php/v1/webhook` — без Bearer.
