---
title: JavaScript API
description: Headless JavaScript API for cart, order and customer
---
# JavaScript API

Headless API for programmatic interaction with MiniShop3 without DOM binding.

## Architecture

MiniShop3 uses a two-layer architecture:

```
┌─────────────────────────────────────────────────┐
│                    ms3.js                        │  ← Entry point, auto-init
├─────────────────────────────────────────────────┤
│                  UI Layer                        │  ← DOM bindings for SSR
│     CartUI.js │ OrderUI.js │ CustomerUI.js      │
├─────────────────────────────────────────────────┤
│                 API Core                         │  ← Headless core
│  ApiClient.js │ TokenManager.js │ hooks.js      │
│  CartAPI.js │ OrderAPI.js │ CustomerAPI.js      │
└─────────────────────────────────────────────────┘
```

### API Core (Headless)

Standalone core without DOM binding:

- **ApiClient.js** — HTTP client for server requests
- **TokenManager.js** — authorization token management
- **CartAPI.js** — cart methods
- **OrderAPI.js** — order methods
- **CustomerAPI.js** — customer methods
- **hooks.js** — hook system for extension

### UI Layer (SSR)

DOM bindings for server-rendered markup:

- **CartUI.js** — cart form handlers, rendering
- **OrderUI.js** — order form handlers
- **CustomerUI.js** — customer form handlers
- **ProductCardUI.js** — product card state toggles

## Loading

### Full (default)

MiniShop3 plugin loads all scripts automatically. Controlled via system setting `ms3_frontend_assets`.

### Minimal (Headless only)

For SPA apps (Vue, React, Svelte) load only the core:

```html
<script src="/assets/components/minishop3/js/web/modules/hooks.js"></script>
<script src="/assets/components/minishop3/js/web/core/TokenManager.js"></script>
<script src="/assets/components/minishop3/js/web/core/ApiClient.js"></script>
<script src="/assets/components/minishop3/js/web/core/CartAPI.js"></script>
<script src="/assets/components/minishop3/js/web/core/OrderAPI.js"></script>
<script src="/assets/components/minishop3/js/web/core/CustomerAPI.js"></script>
```

### Manual initialization

```javascript
// Config
const config = {
  apiUrl: '/assets/components/minishop3/api.php',
  tokenName: 'ms3_token'
}

// Core init
const tokenManager = new TokenManager(config)
const apiClient = new ApiClient({ baseUrl: config.apiUrl, tokenManager })
tokenManager.setApiClient(apiClient)

// Getting the token
await tokenManager.ensureToken()

// API modules
const cart = new CartAPI(apiClient)
const order = new OrderAPI(apiClient)
const customer = new CustomerAPI(apiClient)

// Ready to use
const response = await ms3.cartAPI.add(123, 2, { color: 'red' })
```

## Global objects

With standard loading the following are available:

| Object | Description |
|--------|----------|
| `window.ms3` | Main object with all modules |
| `window.ms3Hooks` | Hook system |
| `window.ms3Message` | Notifications (if UI loaded) |
| `window.ms3Config` | Server config |

```javascript
// Using the global object
await ms3.cartAPI.add(123, 1)
await ms3.orderAPI.submit()
await ms3.customerAPI.updateProfile({ email: 'new@example.com' })
```

## CartAPI

API for working with the cart.

### Methods

#### get()

Get cart contents.

```javascript
const response = await ms3.cartAPI.get()

// response:
{
  success: true,
  message: "ms3_cart_get_success",
  data: {
    cart: {
      // Object where key is product_key
      "ms43ce202fd27c84c28230cc771328e37f": {
        id: 10,
        product_id: 152248,
        order_id: 7,
        product_key: "ms43ce202fd27c84c28230cc771328e37f",
        name: "Product name",
        count: 2,
        price: 148343,
        weight: 2.508,
        cost: 296686,
        options: [],
        properties: {
          old_price: 0,
          discount_price: 0,
          discount_cost: 0
        }
      }
    },
    status: {
      total_count: 9,
      total_cost: 1094850,
      total_weight: 35.62,
      total_discount: 19241,
      total_positions: 3
    }
  }
}
```

#### add(id, count, options, render)

Add product to cart.

| Parameter | Type | Description |
|----------|------|-------------|
| `id` | number | Product ID (required) |
| `count` | number | Quantity (default 1) |
| `options` | object | Product options (color, size, etc.) |
| `render` | array | Tokens for SSR (see below) |

```javascript
// Simple add
await ms3.cartAPI.add(123)

// With quantity
await ms3.cartAPI.add(123, 3)

// With options
await ms3.cartAPI.add(123, 1, { color: 'red', size: 'L' })
```

:::tip SSR (Server-Side Rendering)
The `render` parameter lets you get ready HTML from the server. Tokens must be registered on the server via `TokenService`. If tokens are set, HTML is returned in `response.data.render`. This is an advanced optimization — usually not needed.
:::

**Response format:**

```javascript
{
  success: true,
  message: "Product added to cart",
  data: {
    cart: [...],           // Updated cart
    status: {...},         // Totals
    render: {              // HTML (if requested)
      mini: "<div>...</div>",
      full: "<div>...</div>"
    }
  }
}
```

#### change(productKey, count, render)

Change product quantity.

| Parameter | Type | Description |
|----------|------|-------------|
| `productKey` | string | Unique product key in cart |
| `count` | number | New quantity |
| `render` | array | Tokens for rendering |

```javascript
await ms3.cartAPI.change('ms5d41d8cd98f00b204e9800998ecf8427e', 5)
```

:::tip product_key
Each product in the cart has a unique `product_key`. Same product with different options — different keys.
:::

#### remove(productKey, render)

Remove product from cart.

```javascript
await ms3.cartAPI.remove('ms5d41d8cd98f00b204e9800998ecf8427e')
```

#### clean(render)

Clear cart.

```javascript
await ms3.cartAPI.clean()
```

## OrderAPI

API for working with the order.

### Methods

#### get()

Get current order (session data).

```javascript
const response = await ms3.orderAPI.get()

// response.data:
{
  receiver: "John Doe",
  email: "ivan@example.com",
  phone: "+79991234567",
  delivery: 1,
  payment: 2,
  comment: "Call before delivery"
}
```

#### add(key, value)

Save order field.

```javascript
await ms3.orderAPI.add('receiver', 'John Doe')
await ms3.orderAPI.add('email', 'ivan@example.com')
await ms3.orderAPI.add('phone', '+79991234567')
await ms3.orderAPI.add('delivery', 1)
await ms3.orderAPI.add('payment', 2)
await ms3.orderAPI.add('comment', 'Call before delivery')
```

:::info Auto-save
Each `add()` call saves the value on the server. Data is not lost on page reload.
:::

#### remove(key)

Remove order field.

```javascript
await ms3.orderAPI.remove('comment')
```

#### clean()

Clear all order data.

```javascript
await ms3.orderAPI.clean()
```

#### submit()

Checkout.

```javascript
const response = await ms3.orderAPI.submit()

if (response.success) {
  // response.data:
  {
    order_id: 42,
    redirect: "/shop/order-success?msorder=42"
  }

  window.location.href = response.data.redirect
} else {
  // response:
  {
    success: false,
    message: "Fill required fields",
    data: {
      errors: ["receiver", "email", "phone"]
    }
  }
}
```

#### getCost()

Get order cost calculation.

```javascript
const response = await ms3.orderAPI.getCost()

// response:
{
  success: true,
  message: "Cost calculated",
  data: {
    cost: 0,
    cart_cost: 0,
    delivery_cost: 0,
    payment_cost: 0,
    total_count: 0,
    total_cost: 0,
    total_weight: 0,
    total_discount: 0,
    total_positions: 0
  }
}
```

## CustomerAPI

API for working with authenticated customer data.

:::warning Authorization required
All CustomerAPI methods are only available for authenticated users. For guests use `OrderAPI.add()` to save order data.
:::

### Methods

#### updateProfile(data)

Update authenticated user profile.

```javascript
await ms3.customerAPI.updateProfile({
  first_name: 'John',
  last_name: 'Doe',
  email: 'ivan@example.com',
  phone: '+79991234567'
})
```

#### createAddress(data)

Create new address.

```javascript
await ms3.customerAPI.createAddress({
  name: 'Home',
  city: 'Moscow',
  street: 'Main St',
  building: '1',
  room: '10',
  index: '123456'
})
```

#### updateAddress(id, data)

Update existing address.

```javascript
await ms3.customerAPI.updateAddress(5, {
  city: 'Saint Petersburg',
  street: 'Nevsky Prospect'
})
```

#### deleteAddress(id)

Remove address.

```javascript
await ms3.customerAPI.deleteAddress(5)
```

## Hook system

Hooks let you extend behavior without changing source code.

### Registering a hook

```javascript
ms3Hooks.addHook('hookName', async (context) => {
  // context — operation data
  // context.cancel = true — cancel the operation
})
```

### Available hooks

#### Cart

| Hook | Context | Description |
|-----|----------|----------|
| `beforeAddCart` | `{ id, count, options }` | Before adding product |
| `afterAddCart` | `{ id, count, options, response }` | After adding product |
| `beforeChangeCart` | `{ productKey, count }` | Before changing quantity |
| `afterChangeCart` | `{ productKey, count, response }` | After changing quantity |
| `beforeRemoveCart` | `{ productKey }` | Before removing product |
| `afterRemoveCart` | `{ productKey, response }` | After removing product |
| `beforeCleanCart` | `{}` | Before clearing cart |
| `afterCleanCart` | `{ response }` | After clearing cart |

#### Order

| Hook | Context | Description |
|------|---------|-------------|
| `beforeAddOrder` | `{ key, value }` | Before saving field |
| `afterAddOrder` | `{ key, value, response }` | After saving field |
| `beforeSubmitOrder` | `{}` | Before submit |
| `afterSubmitOrder` | `{ response }` | After submit |
| `beforeCleanOrder` | `{}` | Before clear |
| `afterCleanOrder` | `{ response }` | After clear |

#### Customer

| Hook | Context | Description |
|------|---------|-------------|
| `beforeAddCustomer` | `{ key, value }` | Before saving data |
| `afterAddCustomer` | `{ key, value, response }` | After saving data |
| `beforeUpdateProfile` | `{ data }` | Before updating profile |
| `afterUpdateProfile` | `{ data, response }` | After updating profile |
| `beforeCreateAddress` | `{ data }` | Before creating address |
| `afterCreateAddress` | `{ data, response }` | After creating address |

### Hook examples

**Validation before add:**

```javascript
ms3Hooks.addHook('beforeAddCart', async (ctx) => {
  if (!ctx.options.size) {
    alert('Select size!')
    ctx.cancel = true
  }
})
```

**Analytics:**

```javascript
ms3Hooks.addHook('afterAddCart', async (ctx) => {
  if (!ctx.response.success) return

  gtag('event', 'add_to_cart', {
    currency: 'RUB',
    value: ctx.response.data.status.total_cost,
    items: [{ item_id: ctx.id, quantity: ctx.count }]
  })
})

ms3Hooks.addHook('afterSubmitOrder', async (ctx) => {
  if (!ctx.response.success) return

  gtag('event', 'purchase', {
    transaction_id: ctx.response.data.order_id,
    value: ctx.response.data.total_cost
  })
})
```

**Clear confirmation:**

```javascript
ms3Hooks.addHook('beforeCleanCart', async (ctx) => {
  if (!confirm('Clear cart?')) {
    ctx.cancel = true
  }
})
```

## DOM events

### Event list

| Event | Description | detail |
|-------|-------------|--------|
| `ms3:ready` | ms3 initialized | — |
| `ms3:cart:updated` | Cart updated | `{ cart, status }` |

### Subscribing

```javascript
document.addEventListener('ms3:ready', () => {
  console.log('MiniShop3 ready')
})

document.addEventListener('ms3:cart:updated', (e) => {
  const { cart, status } = e.detail

  // Update header counter
  document.querySelector('.cart-count').textContent = status.total_count
  document.querySelector('.cart-total').textContent = status.total_cost
})
```

## Usage in SPA

### Vue 3

```javascript
// composables/useCart.js
import { ref, onMounted } from 'vue'

export function useCart() {
  const cart = ref([])
  const status = ref({ total_count: 0, total_cost: 0 })
  const loading = ref(false)

  async function loadCart() {
    loading.value = true
    const response = await ms3.cartAPI.get()
    if (response.success) {
      cart.value = response.data.cart
      status.value = response.data.status
    }
    loading.value = false
  }

  async function addToCart(id, count = 1, options = {}) {
    loading.value = true
    const response = await ms3.cartAPI.add(id, count, options)
    if (response.success) {
      cart.value = response.data.cart
      status.value = response.data.status
    }
    loading.value = false
    return response
  }

  async function removeFromCart(productKey) {
    const response = await ms3.cartAPI.remove(productKey)
    if (response.success) {
      cart.value = response.data.cart
      status.value = response.data.status
    }
    return response
  }

  async function changeQuantity(productKey, count) {
    const response = await ms3.cartAPI.change(productKey, count)
    if (response.success) {
      cart.value = response.data.cart
      status.value = response.data.status
    }
    return response
  }

  async function clearCart() {
    const response = await ms3.cartAPI.clean()
    if (response.success) {
      cart.value = []
      status.value = { total_count: 0, total_cost: 0 }
    }
    return response
  }

  onMounted(() => {
    loadCart()

    // Subscribe to external updates
    document.addEventListener('ms3:cart:updated', (e) => {
      cart.value = e.detail.cart
      status.value = e.detail.status
    })
  })

  return {
    cart,
    status,
    loading,
    addToCart,
    removeFromCart,
    changeQuantity,
    clearCart,
    loadCart
  }
}
```

**Usage in component:**

```vue
<script setup>
import { useCart } from '@/composables/useCart'

const { cart, status, loading, addToCart, removeFromCart } = useCart()
</script>

<template>
  <div class="cart">
    <div v-if="loading">Loading...</div>

    <div v-for="item in cart" :key="item.product_key" class="cart-item">
      <span>{{ item.pagetitle }}</span>
      <span>{{ item.count }} x {{ item.price }}</span>
      <button @click="removeFromCart(item.product_key)">Remove</button>
    </div>

    <div class="cart-total">
      Total: {{ status.total_cost }}
    </div>
  </div>
</template>
```

### React

```javascript
// hooks/useCart.js
import { useState, useEffect, useCallback } from 'react'

export function useCart() {
  const [cart, setCart] = useState([])
  const [status, setStatus] = useState({ total_count: 0, total_cost: 0 })
  const [loading, setLoading] = useState(false)

  const loadCart = useCallback(async () => {
    setLoading(true)
    const response = await window.ms3.cartAPI.get()
    if (response.success) {
      setCart(response.data.cart)
      setStatus(response.data.status)
    }
    setLoading(false)
  }, [])

  const addToCart = useCallback(async (id, count = 1, options = {}) => {
    setLoading(true)
    const response = await window.ms3.cartAPI.add(id, count, options)
    if (response.success) {
      setCart(response.data.cart)
      setStatus(response.data.status)
    }
    setLoading(false)
    return response
  }, [])

  const removeFromCart = useCallback(async (productKey) => {
    const response = await window.ms3.cartAPI.remove(productKey)
    if (response.success) {
      setCart(response.data.cart)
      setStatus(response.data.status)
    }
    return response
  }, [])

  useEffect(() => {
    loadCart()

    const handleCartUpdate = (e) => {
      setCart(e.detail.cart)
      setStatus(e.detail.status)
    }

    document.addEventListener('ms3:cart:updated', handleCartUpdate)
    return () => document.removeEventListener('ms3:cart:updated', handleCartUpdate)
  }, [loadCart])

  return { cart, status, loading, addToCart, removeFromCart, loadCart }
}
```

### Vanilla JavaScript

```javascript
class CartManager {
  constructor() {
    this.cart = []
    this.status = { total_count: 0, total_cost: 0 }
    this.listeners = []
  }

  async init() {
    await this.load()

    document.addEventListener('ms3:cart:updated', (e) => {
      this.cart = e.detail.cart
      this.status = e.detail.status
      this.notify()
    })
  }

  async load() {
    const response = await ms3.cartAPI.get()
    if (response.success) {
      this.cart = response.data.cart
      this.status = response.data.status
      this.notify()
    }
  }

  async add(id, count = 1, options = {}) {
    const response = await ms3.cartAPI.add(id, count, options)
    if (response.success) {
      this.cart = response.data.cart
      this.status = response.data.status
      this.notify()
    }
    return response
  }

  subscribe(callback) {
    this.listeners.push(callback)
    return () => {
      this.listeners = this.listeners.filter(l => l !== callback)
    }
  }

  notify() {
    this.listeners.forEach(cb => cb(this.cart, this.status))
  }
}

// Usage
const cartManager = new CartManager()
await cartManager.init()

cartManager.subscribe((cart, status) => {
  document.querySelector('.cart-count').textContent = status.total_count
})

document.querySelector('.add-to-cart').addEventListener('click', () => {
  cartManager.add(123, 1, { size: 'L' })
})
```

## Response format

All methods return a Promise with an object:

```javascript
{
  success: true,           // Operation success
  message: "Text",         // Message (optional)
  data: {                  // Data (when success: true)
    cart: [...],
    status: {...},
    render: {...}
  }
}
```

**On error:**

```javascript
{
  success: false,
  message: "Error description",
  data: {
    errors: ["field1", "field2"]  // Error fields
  }
}
```

## Tokens and authorization

MiniShop3 uses tokens to identify the cart session.

### How it works

1. On first request `TokenManager` gets a token from the server
2. Token is stored in `localStorage` with TTL
3. Token is added to all requests automatically
4. When expired the token is refreshed automatically

### Manual control

```javascript
// Get current token
const token = ms3.tokenManager.getToken()

// Force refresh
await ms3.tokenManager.fetchNewToken()

// Remove token
ms3.tokenManager.removeToken()
```

## Related pages

- [Frontend JavaScript](frontend-js) — full documentation including UI
- [REST API](api) — server endpoints
- [Events](events) — component PHP events
