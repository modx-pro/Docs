---
title: Корзина Web API
description: "Мутации корзины и формат GET /cart/get (items + cart map)"
---

# Корзина

Все пути `/cart/*` с `TokenMiddleware` (auto-mint гостевого токена). Передавайте cookie или Bearer; query `ms3_token` не используйте.

## Мутации

| Метод | Путь | Тело (JSON) |
| --- | --- | --- |
| `POST` | `/cart/add` | `id`, опционально `count`, `options`, `render` |
| `POST` | `/cart/change` | ключ позиции + `count` |
| `POST` | `/cart/change-option` | ключ + опции |
| `POST` | `/cart/remove` | ключ позиции |
| `POST` | `/cart/clean` | |
| `GET` | `/cart/get` | query: `include_thumbs` 0\|1 (default 0) |

Точные имена полей позиции смотрите в ответе `cart/get` и в коде `CartController`. Опциональный `render`: токены сниппетов для HTML SSR (не Nuxt SSR).

## GET /cart/get

После нормализатора (`CartResponseNormalizer`):

```json
{
  "success": true,
  "message": "",
  "data": {
    "items": [
      {
        "product_key": "123_…",
        "product_id": 123,
        "name": "…",
        "count": 1,
        "price": 1500,
        "cost": 1500,
        "weight": 0.5,
        "options": {},
        "old_price": 0,
        "discount_price": 0,
        "discount_cost": 0
      }
    ],
    "cart": {
      "123_…": {}
    },
    "status": {
      "total_positions": 1,
      "total_count": 1,
      "total_cost": 1500,
      "total_weight": 0.5,
      "total_discount": 0
    }
  }
}
```

| Поле | Форма | Для кого |
| --- | --- | --- |
| `items` | всегда массив | Читать в новых клиентах |
| `cart` | map по `product_key` | Legacy. Пустая корзина → `{}`, не `[]` |
| `status` | totals | Только товары. Доставка / оплата / итог: `GET /order/cost` |

## Пример

```bash
curl -c jar.txt -b jar.txt -sS \
  'https://shop.example/assets/components/minishop3/api.php?route=/api/v1/customer/token/get'

curl -c jar.txt -b jar.txt -sS -X POST \
  'https://shop.example/assets/components/minishop3/api.php?route=/api/v1/cart/add' \
  -H 'Content-Type: application/json' \
  -d '{"id":123,"count":1}'
```

Полный сценарий: [Примеры](examples). Checkout: [Checkout](checkout).
