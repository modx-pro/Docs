---
title: Web API cart
description: "Cart mutations and GET /cart/get format (items + cart map)"
---

# Cart

All `/cart/*` paths use `TokenMiddleware` (guest token auto-mint). Send cookie or Bearer; do not use query `ms3_token`.

## Mutations

| Method | Path | Body (JSON) |
| --- | --- | --- |
| `POST` | `/cart/add` | `id`, optional `count`, `options`, `render` |
| `POST` | `/cart/change` | line key + `count` |
| `POST` | `/cart/change-option` | key + options |
| `POST` | `/cart/remove` | line key |
| `POST` | `/cart/clean` | |
| `GET` | `/cart/get` | query: `include_thumbs` 0\|1 (default 0) |

Exact line field names: see `cart/get` response and `CartController` code. Optional `render`: snippet tokens for HTML SSR (not Nuxt SSR).

## GET /cart/get

After the normalizer (`CartResponseNormalizer`):

```json
{
  "success": true,
  "message": "Cart data retrieved",
  "data": {
    "items": [
      {
        "product_key": "msfed12817960fa4b48dca19facff2b61b",
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
      "msfed12817960fa4b48dca19facff2b61b": {}
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

| Field | Shape | For |
| --- | --- | --- |
| `items` | always array | Read in new clients |
| `cart` | map by `product_key` | Legacy. Empty cart → `{}`, not `[]` |
| `status` | totals | Products only. Delivery / payment / total: `GET /order/cost` |

The line key is `ms` followed by 32 md5 hex characters. Which fields go into the key is set by `ms3_cart_product_key_fields` (`id,options` by default). Money and weight arrive as JSON numbers rounded to two and three decimals, so a round price reads `7451`, not `7451.00`. Empty `options` arrive as `{}`.

## Example

```bash
curl -c jar.txt -b jar.txt -sS \
  'https://shop.example/assets/components/minishop3/api.php?route=/api/v1/customer/token/get'

curl -c jar.txt -b jar.txt -sS -X POST \
  'https://shop.example/assets/components/minishop3/api.php?route=/api/v1/cart/add' \
  -H 'Content-Type: application/json' \
  -d '{"id":123,"count":1}'
```

Full flow: [Examples](examples). Checkout: [Checkout](checkout).
