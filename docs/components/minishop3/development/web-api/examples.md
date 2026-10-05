---
title: Примеры Web API
description: "curl и TypeScript/$fetch: каталог, токен, корзина, login, checkout"
---

# Примеры

База во всех примерах:

```text
https://shop.example/assets/components/minishop3/api.php
```

Путь уходит в `?route=/api/v1/...`. Cookie-jar (`-c` / `-b`) или `credentials: 'include'` / `Authorization: Bearer`. Query `ms3_token` не используйте.

Читайте ответы через `data`. Корзина: в новых клиентах `data.items` (массив), legacy `data.cart` (map).

## Каталог (публичный, без токена)

```bash
API='https://shop.example/assets/components/minishop3/api.php'

# Список товаров категории
curl -sS "${API}?route=/api/v1/product/list&parents=10&limit=20&page=1"

# Товар по ID
curl -sS "${API}?route=/api/v1/product/get/123&include_images=1"

# Resolve по alias
curl -sS "${API}?route=/api/v1/product/get&alias=red-shirt&context=web"

# Фасеты PLP
curl -sS "${API}?route=/api/v1/product/filters&parents=10&include_vendors=1"

# Дерево категорий
curl -sS "${API}?route=/api/v1/category/tree"

# Галерея
curl -sS "${API}?route=/api/v1/product/123/images"
```

TypeScript:

```ts
const api = '/assets/components/minishop3/api.php'

const list = await $fetch(`${api}?route=/api/v1/product/list`, {
  query: { parents: '10', limit: 20, page: 1 },
})

const product = await $fetch(`${api}?route=/api/v1/product/get/123`, {
  query: { include_images: 1 },
})
```

Параметры list: [Каталог](catalog).

## Guest token + корзина (curl)

```bash
API='https://shop.example/assets/components/minishop3/api.php'

curl -c jar.txt -b jar.txt -sS \
  "${API}?route=/api/v1/customer/token/get"
# data.token + data.lifetime (мс); cookie ms3_token

curl -c jar.txt -b jar.txt -sS -X POST \
  "${API}?route=/api/v1/cart/add" \
  -H 'Content-Type: application/json' \
  -d '{"id":123,"count":2,"options":{"color":"red","size":"XL"}}'

curl -c jar.txt -b jar.txt -sS \
  "${API}?route=/api/v1/cart/get&include_thumbs=0"

# product_key из data.items[].product_key
curl -c jar.txt -b jar.txt -sS -X POST \
  "${API}?route=/api/v1/cart/change" \
  -H 'Content-Type: application/json' \
  -d '{"product_key":"123_a1b2c3d4","count":3}'

curl -c jar.txt -b jar.txt -sS -X POST \
  "${API}?route=/api/v1/cart/change-option" \
  -H 'Content-Type: application/json' \
  -d '{"product_key":"123_a1b2c3d4","options":{"color":"blue"}}'

curl -c jar.txt -b jar.txt -sS -X POST \
  "${API}?route=/api/v1/cart/remove" \
  -H 'Content-Type: application/json' \
  -d '{"product_key":"123_a1b2c3d4"}'

curl -c jar.txt -b jar.txt -sS -X POST \
  "${API}?route=/api/v1/cart/clean"
```

Можно вызвать `cart/add` с пустым jar без предварительного `token/get`: сервер создаст гостевой токен и cookie (auto-mint).

## Same-site браузер (cookie)

```ts
const api = '/assets/components/minishop3/api.php'

await $fetch(`${api}?route=/api/v1/customer/token/get`, {
  credentials: 'include',
})

await $fetch(`${api}?route=/api/v1/cart/add`, {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: { id: 123, count: 1 },
})

const cart = await $fetch(`${api}?route=/api/v1/cart/get`, {
  credentials: 'include',
})
// cart.data.items
```

## Bearer (BFF / Nuxt server)

```ts
const api = '/assets/components/minishop3/api.php'

type TokenGet = {
  success: boolean
  data: { token: string, lifetime: number }
}

const tokenRes = await $fetch<TokenGet>(
  `${api}?route=/api/v1/customer/token/get`,
)
const token = tokenRes.data.token

const headers = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
}

await $fetch(`${api}?route=/api/v1/cart/add`, {
  method: 'POST',
  headers,
  body: { id: 123, count: 1 },
})

const cart = await $fetch(`${api}?route=/api/v1/cart/get`, { headers })
```

Для cookie с другого origin нужны явные CORS origins: [CORS](cors).

## Login, me, refresh

```bash
API='https://shop.example/assets/components/minishop3/api.php'

# Гостевая корзина уже в jar.txt
curl -c jar.txt -b jar.txt -sS -X POST \
  "${API}?route=/api/v1/customer/login" \
  -H 'Content-Type: application/json' \
  -d '{"email":"user@example.com","password":"secret"}'
# сервер ротирует токен и переносит корзину

curl -c jar.txt -b jar.txt -sS \
  "${API}?route=/api/v1/customer/me"

curl -c jar.txt -b jar.txt -sS -X POST \
  "${API}?route=/api/v1/customer/token/refresh"
```

```ts
await $fetch(`${api}?route=/api/v1/customer/login`, {
  method: 'POST',
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
  body: { email: 'user@example.com', password: 'secret' },
})

const me = await $fetch(`${api}?route=/api/v1/customer/me`, {
  credentials: 'include',
})
```

## Checkout (curl)

```bash
API='https://shop.example/assets/components/minishop3/api.php'

curl -sS "${API}?route=/api/v1/delivery/list"
curl -sS "${API}?route=/api/v1/payment/list"

curl -c jar.txt -b jar.txt -sS \
  "${API}?route=/api/v1/order/delivery/required-fields&delivery_id=1"

curl -c jar.txt -b jar.txt -sS -X POST \
  "${API}?route=/api/v1/order/set" \
  -H 'Content-Type: application/json' \
  -d '{
    "delivery_id": 1,
    "payment_id": 1,
    "email": "user@example.com",
    "first_name": "Ivan",
    "phone": "+79001234567"
  }'

curl -c jar.txt -b jar.txt -sS \
  "${API}?route=/api/v1/order/cost"

curl -c jar.txt -b jar.txt -sS -X POST \
  "${API}?route=/api/v1/order/submit"
```

Поля адреса зависят от правил доставки. Черновик: `GET /order/get`.

## Checkout (TypeScript)

```ts
async function checkout(api: string, token: string) {
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  }

  const deliveries = await $fetch(`${api}?route=/api/v1/delivery/list`)
  const payments = await $fetch(`${api}?route=/api/v1/payment/list`)

  const required = await $fetch(
    `${api}?route=/api/v1/order/delivery/required-fields&delivery_id=1`,
    { headers },
  )

  await $fetch(`${api}?route=/api/v1/order/set`, {
    method: 'POST',
    headers,
    body: {
      delivery_id: 1,
      payment_id: 1,
      email: 'user@example.com',
      first_name: 'Ivan',
    },
  })

  const cost = await $fetch(`${api}?route=/api/v1/order/cost`, { headers })
  const submitted = await $fetch(`${api}?route=/api/v1/order/submit`, {
    method: 'POST',
    headers,
  })

  return { deliveries, payments, required, cost, submitted }
}
```

## Адреса и заказы ЛК

```bash
# после login
curl -c jar.txt -b jar.txt -sS -X POST \
  "${API}?route=/api/v1/customer/addresses" \
  -H 'Content-Type: application/json' \
  -d '{"city":"Москва","street":"Тверская","building":"1"}'

curl -c jar.txt -b jar.txt -sS \
  "${API}?route=/api/v1/customer/addresses"

curl -c jar.txt -b jar.txt -sS \
  "${API}?route=/api/v1/customer/orders"

curl -c jar.txt -b jar.txt -sS -X POST \
  "${API}?route=/api/v1/customer/orders/42/cancel"
```

## Health и обработка ошибок

```bash
curl -sS "${API}?route=/api/v1/health"
```

```ts
type Ms3Success<T> = { success: true, message: string, data: T }
type Ms3Error = {
  success: false
  message: string
  code: number
  errors: Record<string, string> | null
  error_code?: string
  data?: unknown
}
type Ms3Response<T> = Ms3Success<T> | Ms3Error

async function ms3Fetch<T>(
  url: string,
  init?: RequestInit,
): Promise<Ms3Success<T>> {
  const res = await $fetch<Ms3Response<T>>(url, init)
  if (!res.success) {
    throw Object.assign(new Error(res.message), {
      code: res.code,
      error_code: res.error_code,
      errors: res.errors,
    })
  }
  return res
}
```

Подробнее про envelope: [Ошибки](errors).

## См. также

- [Авторизация](auth)
- [Каталог](catalog)
- [Корзина](cart)
- [Checkout](checkout)
- [Клиент](customer)
- [Ошибки](errors)
