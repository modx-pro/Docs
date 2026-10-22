---
title: Корзина Web API
description: "Методы корзины и формат GET /cart/get (items + cart map)"
---

# Корзина

Все пути `/cart/*` проходят `TokenMiddleware` с auto-mint гостевого токена. Передавайте cookie или Bearer, а query-параметр `ms3_token` не используйте.

## Методы корзины

| Метод | Путь | Тело (JSON) или query |
| --- | --- | --- |
| `POST` | `/cart/add` | `id`, необязательно `count`, `options`, `render` |
| `POST` | `/cart/change` | Ключ позиции и `count` |
| `POST` | `/cart/change-option` | Ключ позиции и новые опции |
| `POST` | `/cart/remove` | Ключ позиции |
| `POST` | `/cart/clean` | — |
| `GET` | `/cart/get` | Query `include_thumbs` 0\|1 (по умолчанию 0). При 1 в позицию добавляется `thumb` |

Точные имена полей позиции смотрите в ответе `cart/get` и в коде `CartController`. Необязательный `render` принимает токены сниппетов для HTML SSR — не для Nuxt SSR.

## GET /cart/get

Форму ответа задаёт `CartResponseNormalizer`:

```json
{
  "success": true,
  "message": "Данные корзины получены",
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

| Поле | Форма | Примечание |
| --- | --- | --- |
| `items` | Всегда массив | Основной источник для новых клиентов |
| `cart` | Map по `product_key` | Для устаревших клиентов. Пустая корзина — `{}`, не `[]` |
| `status` | Итоги | Только товары. Доставка, оплата и общий итог — `GET /order/cost` |

Ключ позиции — `ms` и 32 шестнадцатеричных символа md5. Состав ключа задаёт настройка `ms3_cart_product_key_fields` (по умолчанию `id,options`). Деньги и вес приходят числами: деньги округлены до двух знаков, вес — до трёх, поэтому целая цена выглядит как `7451`, а не `7451.00`. Пустые `options` приходят объектом `{}`.

## Пример

```bash
curl -c jar.txt -b jar.txt -sS \
  'https://shop.example/assets/components/minishop3/api.php?route=/api/v1/customer/token/get'

curl -c jar.txt -b jar.txt -sS -X POST \
  'https://shop.example/assets/components/minishop3/api.php?route=/api/v1/cart/add' \
  -H 'Content-Type: application/json' \
  -d '{"id":123,"count":1}'
```

Полный сценарий покупки — [Примеры](examples), оформление заказа — [Checkout](checkout).
