---
title: Frontend JavaScript
description: Modular JavaScript architecture for the store frontend
---
# Frontend JavaScript

Modular JavaScript architecture for the store frontend.

## Overview

MiniShop3 uses a modular JavaScript architecture without jQuery. All modules are plain ES6+ and target modern browsers.

**Features:**

- Modular structure (core, ui, modules)
- REST API client with httpOnly cookie tokenization
- Hook system for extension
- Centralized selectors with override
- Automatic cart rendering
- Promise-based confirmation dialogs
- Events for integration

## Module structure

```
assets/components/minishop3/js/web/
├── core/                    # Core
│   ├── ApiClient.js         # HTTP client
│   ├── TokenManager.js      # Token management
│   ├── Selectors.js         # Centralized selectors
│   ├── CartAPI.js           # Cart API
│   ├── OrderAPI.js          # Order API
│   └── CustomerAPI.js       # Customer API
├── ui/                      # UI handlers
│   ├── CartUI.js            # Cart UI
│   ├── OrderUI.js           # Order UI
│   ├── CustomerUI.js        # Customer UI (profile, addresses, order cancellation)
│   ├── AuthUI.js            # Login and registration forms
│   ├── QuantityUI.js        # Quantity +/- buttons
│   └── ProductCardUI.js     # Product card
├── modules/                 # Helper modules
│   ├── hooks.js             # Hook system
│   ├── message.js           # Notifications
│   └── confirm.js           # Promise-based confirmation dialog
├── lib/                     # Libraries
│   └── izitoast/            # iziToast notifications
├── ms3.js                   # Main module
└── order-addresses.js       # Order address selection
```

## Load order

### System setting `ms3_frontend_assets`

Controls the order of CSS and JS assets:

```json
[
    "[[+cssUrl]]web/lib/izitoast/iziToast.min.css",
    "[[+jsUrl]]web/lib/izitoast/iziToast.js",
    "[[+jsUrl]]web/modules/hooks.js",
    "[[+jsUrl]]web/modules/message.js",
    "[[+jsUrl]]web/modules/confirm.js",
    "[[+jsUrl]]web/core/Selectors.js",
    "[[+jsUrl]]web/core/ApiClient.js",
    "[[+jsUrl]]web/core/TokenManager.js",
    "[[+jsUrl]]web/core/CartAPI.js",
    "[[+jsUrl]]web/core/OrderAPI.js",
    "[[+jsUrl]]web/core/CustomerAPI.js",
    "[[+jsUrl]]web/ui/CartUI.js",
    "[[+jsUrl]]web/ui/OrderUI.js",
    "[[+jsUrl]]web/ui/CustomerUI.js",
    "[[+jsUrl]]web/ui/AuthUI.js",
    "[[+jsUrl]]web/ui/QuantityUI.js",
    "[[+jsUrl]]web/ui/ProductCardUI.js",
    "[[+jsUrl]]web/ms3.js"
]
```

**Placeholders:**

| Placeholder | Value |
|-------------|--------|
| `[[+cssUrl]]` | `assets/components/minishop3/css/` |
| `[[+jsUrl]]` | `assets/components/minishop3/js/` |

**Loading:**

- CSS in `<head>`
- JS at end of HTML with `defer`

### Changing order

Edit system setting `ms3_frontend_assets` to change or disable files.

**Example: disable iziToast (use your own notifications):**

```json
[
    "[[+jsUrl]]web/modules/hooks.js",
    "[[+jsUrl]]web/modules/message.js",
    "[[+jsUrl]]web/modules/confirm.js",
    "[[+jsUrl]]web/core/Selectors.js",
    "[[+jsUrl]]web/core/ApiClient.js",
    ...
]
```

## Selectors

### Selectors.js module

Centralized CSS/data-* selectors for all UI components. Selectors use data-attributes as primary with fallback to CSS classes for backward compatibility.

```javascript
// Default selectors
{
  form: '[data-ms3-form], .ms3_form',
  formOrder: '[data-ms3-form="order"], .ms3_order_form',
  formCustomer: '[data-ms3-form="customer"], .ms3_customer_form',
  cartOptions: '[data-ms3-cart-options], .ms3_cart_options',
  qtyInput: '[data-ms3-qty="input"], .qty-input',
  qtyInc: '[data-ms3-qty="inc"], .inc-qty',
  qtyDec: '[data-ms3-qty="dec"], .dec-qty',
  productCard: '[data-ms3-product-card], .ms3-product-card',
  fieldError: '[data-ms3-error], .ms3_field_error',
  orderCost: '#ms3_order_cost',
  orderCartCost: '#ms3_order_cart_cost',
  orderDeliveryCost: '#ms3_order_delivery_cost',
  link: '.ms3_link',
  orderCancel: '.ms3-order-cancel',
  addressSetDefault: '.set-default-address',
  addressDelete: '.delete-address',
  authLoginForm: '#ms3-login-form',
  authRegisterForm: '#ms3-register-form',
  authForgotPassword: '#forgot-password-link'
}
```

### Overriding selectors

Use `ms3Config.selectors` to override selectors — they are merged with defaults:

```javascript
window.ms3Config = {
  selectors: {
    orderCancel: '.my-custom-cancel-btn',
    form: '.my-form-class'
  }
}
```

### Use in UI classes

All UI classes get selectors from `ms3.selectors`:

```javascript
// Inside a UI class
const forms = document.querySelectorAll(this.selectors.form)
const cancelBtns = document.querySelectorAll(this.selectors.orderCancel)
```

## Main object ms3

### Initialization

The main `ms3` object is initialized automatically when `ms3.js` loads:

```javascript
// assets/components/minishop3/js/web/ms3.js

const ms3 = {
  config: {},
  selectors: {},

  // Core
  tokenManager: null,
  apiClient: null,

  // API modules
  cartAPI: null,
  orderAPI: null,
  customerAPI: null,

  // UI modules
  cartUI: null,
  orderUI: null,
  customerUI: null,
  authUI: null,
  quantityUI: null,
  productCardUI: null,

  // Utilities
  hooks: null,
  message: null,

  async init() {
    this.config = window.ms3Config || {}
    this.selectors = getSelectors(this.config)

    // Hooks and messages
    this.hooks = window.ms3Hooks
    this.message = window.ms3Message

    // Tokens and API client
    this.tokenManager = new TokenManager(this.config)
    await this.tokenManager.ensureToken()
    this.apiClient = new ApiClient(this.config, this.tokenManager)

    // API modules
    this.cartAPI = new CartAPI(this.apiClient)
    this.orderAPI = new OrderAPI(this.apiClient)
    this.customerAPI = new CustomerAPI(this.apiClient)

    // UI modules
    this.cartUI = new CartUI(this.cartAPI, this.hooks, this.message, this.config)
    this.orderUI = new OrderUI(this.orderAPI, this.hooks, this.message, this.config)
    this.customerUI = new CustomerUI(this.customerAPI, this.hooks, this.message, this.config)
    this.authUI = new AuthUI(this.customerAPI, this.hooks, this.message, this.config)

    // Init
    this.cartUI.init()
    this.orderUI.init()
    this.customerUI.init()
    this.authUI.init()

    this.initFormHandler()

    // Ready event
    document.dispatchEvent(new CustomEvent('ms3:ready'))
  }
}
```

### ms3Config

Passed from the server via snippets:

```javascript
window.ms3Config = {
  apiUrl: '/assets/components/minishop3/api.php',
  tokenName: 'ms3_token',

  // Selector overrides
  selectors: {
    orderCancel: '.my-cancel-button'
  },

  // Render config
  render: {
    cart: [
      { token: 'mini', selector: '#headerMiniCart' },
      { token: 'full', selector: '#cartContent' }
    ]
  }
}
```

### Ready event

```javascript
document.addEventListener('ms3:ready', () => {
  // ms3 is fully initialized
  console.log('ms3 ready', ms3.config)
})
```

## Core

### TokenManager

Auth token management. The token is stored in the httpOnly cookie `ms3_token`, set by the server automatically.

::: info httpOnly cookie
As of version 1.6, the token is stored in an httpOnly cookie instead of localStorage. This improves security — the token is not accessible from JavaScript and is protected against XSS.

The cookie is sent automatically by the browser with every request.
:::

```javascript
class TokenManager {
  constructor(config) {
    this.config = config
    this.tokenName = config.tokenName || 'ms3_token'
  }

  async ensureToken() {
    // Token is in httpOnly cookie — JS cannot read it directly.
    // If cookie is missing, requests a new token from the server
    return this.fetchNewToken()
  }

  async fetchNewToken() {
    const response = await fetch(
      `${this.config.apiUrl}?route=/api/v1/customer/token/get`
    )
    const data = await response.json()
    return data.success ? data.data?.token : null
  }
}
```

### ApiClient

HTTP client. The token is sent automatically via the httpOnly cookie:

```javascript
class ApiClient {
  constructor(config, tokenManager) {
    this.baseUrl = config.apiUrl || '/assets/components/minishop3/api.php'
    this.tokenManager = tokenManager
  }

  async request(method, route, data = null) {
    const url = new URL(this.baseUrl, window.location.origin)
    url.searchParams.set('route', route)

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      credentials: 'same-origin'  // Sends httpOnly cookie
    }

    if (data && method !== 'GET') {
      options.body = JSON.stringify(data)
    }

    const response = await fetch(url.toString(), options)
    return response.json()
  }

  get(route) { return this.request('GET', route) }
  post(route, data) { return this.request('POST', route, data) }
  put(route, data) { return this.request('PUT', route, data) }
  patch(route, data) { return this.request('PATCH', route, data) }
  delete(route) { return this.request('DELETE', route) }
}
```

### CartAPI

Cart API:

```javascript
class CartAPI {
  constructor(apiClient) {
    this.api = apiClient
  }

  async get() {
    return this.api.get('/api/v1/cart/get')
  }

  async add(id, count = 1, options = {}, renderTokens = null) {
    return this.api.post('/api/v1/cart/add', {
      id, count, options, render: renderTokens
    })
  }

  async change(key, count, renderTokens = null) {
    return this.api.post('/api/v1/cart/change', {
      key, count, render: renderTokens
    })
  }

  async remove(key, renderTokens = null) {
    return this.api.post('/api/v1/cart/remove', {
      key, render: renderTokens
    })
  }

  async clean(renderTokens = null) {
    return this.api.post('/api/v1/cart/clean', {
      render: renderTokens
    })
  }
}
```

**Examples:**

```javascript
// Add to cart
await ms3.cartAPI.add(123, 2, { color: 'red', size: 'L' })

// Change quantity
await ms3.cartAPI.change('abc123', 5)

// Remove item
await ms3.cartAPI.remove('abc123')
```

### OrderAPI

Order API:

```javascript
class OrderAPI {
  constructor(apiClient) {
    this.api = apiClient
  }

  async add(key, value) {
    return this.api.post('/api/v1/order/add', { key, value })
  }

  async remove(key) {
    return this.api.post('/api/v1/order/remove', { key })
  }

  async clean() {
    return this.api.post('/api/v1/order/clean')
  }

  async submit() {
    return this.api.post('/api/v1/order/submit')
  }

  async get() {
    return this.api.get('/api/v1/order/get')
  }
}
```

### CustomerAPI

Customer API:

```javascript
class CustomerAPI {
  constructor(apiClient) {
    this.api = apiClient
  }

  async add(key, value) {
    return this.api.post('/api/v1/customer/add', { key, value })
  }

  async changeAddress(key, value) {
    return this.api.post('/api/v1/customer/changeAddress', { key, value })
  }

  async updateProfile(data) {
    return this.api.put('/api/v1/customer/profile', data)
  }

  async createAddress(data) {
    return this.api.post('/api/v1/customer/addresses', data)
  }

  async updateAddress(id, data) {
    return this.api.put(`/api/v1/customer/addresses/${id}`, data)
  }

  async deleteAddress(id) {
    return this.api.delete(`/api/v1/customer/addresses/${id}`)
  }
}
```

## UI modules

### CartUI

Cart UI handler:

```javascript
class CartUI {
  constructor(cartAPI, hooks, message, config) {
    this.cart = cartAPI
    this.hooks = hooks
    this.message = message
    this.config = config
  }

  init() {
    this.initQuantityButtons()  // +/- buttons
    this.initQuantityInputs()    // Quantity inputs
    this.initOptionSelects()    // Option selects
  }

  async handleAdd(id, count = 1, options = {}) {
    const hookData = { id, count, options }
    await this.hooks.runHooks('beforeAddCart', hookData)

    if (hookData.cancel) return

    const renderTokens = this.getRenderTokens()
    const response = await this.cart.add(id, count, options, renderTokens)

    await this.hooks.runHooks('afterAddCart', { id, count, options, response })

    if (response.success) {
      if (response.data?.render) {
        this.renderCart(response.data.render)
      }
      this.dispatchCartUpdated(response.data)
      if (response.message) {
        this.message.success(response.message)
      }
    } else {
      if (response.message) {
        this.message.error(response.message)
      }
    }
  }

  renderCart(renderData) {
    const cartRenderConfig = this.config.render?.cart

    for (const token in renderData) {
      const html = renderData[token]
      const config = cartRenderConfig.find(item => item.token === token)

      if (config?.selector) {
        const element = document.querySelector(config.selector)
        if (element) {
          element.innerHTML = html
        }
      }
    }

    // Re-init handlers
    setTimeout(() => this.init(), 100)
  }

  dispatchCartUpdated(data) {
    document.dispatchEvent(new CustomEvent('ms3:cart:updated', {
      detail: data
    }))
  }
}
```

### OrderUI

Order form handler:

```javascript
class OrderUI {
  init() {
    document.querySelectorAll('.ms3_order_form').forEach(form => {
      this.initForm(form)
    })
  }

  initRegularInput(input) {
    input.addEventListener('change', async () => {
      const response = await this.handleAdd(input.name, input.value)

      if (response.success) {
        if (response.data?.[input.name] !== undefined) {
          input.value = response.data[input.name]
        }
      } else {
        input.classList.add('is-invalid')
      }
    })
  }

  async handleSubmit() {
    const hookData = {}
    await this.hooks.runHooks('beforeSubmitOrder', hookData)

    if (hookData.cancel) return { success: false }

    const response = await this.order.submit()

    await this.hooks.runHooks('afterSubmitOrder', { response })

    if (response.success && response.data?.redirect) {
      window.location.href = response.data.redirect
    }

    return response
  }
}
```

### CustomerUI

Customer form handler: profile, addresses and order cancellation:

```javascript
class CustomerUI {
  init() {
    document.querySelectorAll(this.selectors.formCustomer).forEach(form => {
      this.initForm(form)
    })
    this.initOrderCancel()
    this.initAddressManagement()
  }

  // Profile update
  async handleProfileUpdate(formData) {
    const hookData = { formData }
    await this.hooks.runHooks('beforeUpdateProfile', hookData)
    if (hookData.cancel) return

    const data = {}
    for (const [key, value] of formData.entries()) {
      if (key === 'ms3_action') continue
      data[key] = value
    }

    const response = await this.customer.updateProfile(data)

    await this.hooks.runHooks('afterUpdateProfile', { response })

    if (response.success) {
      this.message.success(response.message)
      setTimeout(() => window.location.reload(), 1000)
    }

    return response
  }

  // Order cancellation
  initOrderCancel() {
    document.querySelectorAll(this.selectors.orderCancel).forEach(btn => {
      btn.addEventListener('click', async () => {
        const orderId = btn.dataset.orderId
        const confirmMessage = btn.dataset.confirm

        const confirmed = await ms3Confirm(confirmMessage, {
          confirmClass: 'danger'
        })
        if (!confirmed) return

        const hookData = { orderId }
        await this.hooks.runHooks('beforeCancelOrder', hookData)
        if (hookData.cancel) return

        const response = await this.customer.cancelOrder(orderId)

        await this.hooks.runHooks('afterCancelOrder', { orderId, response })

        if (response.success) {
          this.message.success(response.message)
          window.location.reload()
        } else {
          this.message.error(response.message)
        }
      })
    })
  }

  // Address management
  initAddressManagement() {
    // Set default
    document.querySelectorAll(this.selectors.addressSetDefault).forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.addressId
        const response = await this.customer.setDefaultAddress(id)
        if (response.success) window.location.reload()
      })
    })

    // Delete address
    document.querySelectorAll(this.selectors.addressDelete).forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.addressId
        const confirmed = await ms3Confirm(btn.dataset.confirm)
        if (!confirmed) return

        const response = await this.customer.deleteAddress(id)
        if (response.success) window.location.reload()
      })
    })
  }
}
```

### AuthUI

Login and registration form handler:

```javascript
class AuthUI {
  constructor(customerAPI, hooks, message, config) {
    this.customer = customerAPI
    this.hooks = hooks
    this.message = message
    this.config = config
  }

  init() {
    this.initLoginForm()
    this.initRegisterForm()
  }

  async handleLogin(formData) {
    const hookData = { formData }
    await this.hooks.runHooks('beforeLogin', hookData)
    if (hookData.cancel) return

    const response = await this.customer.login({
      email: formData.get('email'),
      password: formData.get('password')
    })

    await this.hooks.runHooks('afterLogin', { response })

    if (response.success) {
      this.message.success(response.message)
      window.location.href = response.data?.redirect_url || window.location.href
    } else {
      this.showFormErrors('login', response)
    }
  }

  async handleRegister(formData) {
    const hookData = { formData }
    await this.hooks.runHooks('beforeRegister', hookData)
    if (hookData.cancel) return

    const response = await this.customer.register({
      email: formData.get('email'),
      password: formData.get('password'),
      password_confirm: formData.get('password_confirm'),
      first_name: formData.get('first_name'),
      last_name: formData.get('last_name'),
      phone: formData.get('phone'),
      privacy_accepted: formData.get('privacy_accepted') ? true : false
    })

    await this.hooks.runHooks('afterRegister', { response })

    if (response.success) {
      this.message.success(response.message)
      window.location.href = response.data?.redirect_url || window.location.href
    } else {
      this.showFormErrors('register', response)
    }
  }
}
```

**Auth chunk:** `tpl.msCustomer.unauthorized` contains login and registration forms with tabs (Bootstrap). An inline script exports lexicon keys into `window.ms3Lexicon`:

```fenom
<script>
window.ms3Lexicon = window.ms3Lexicon || {};
window.ms3Lexicon.ms3_customer_err_login_required = '{'ms3_customer_err_login_required' | lexicon}';
window.ms3Lexicon.ms3_customer_login_success = '{'ms3_customer_login_success' | lexicon}';
{* ... and other keys *}
</script>
```

## Confirmation dialog

### confirm.js module

Promise-based confirmation dialog using Bootstrap Modal with fallback to `window.confirm()`:

```javascript
// Global function
async function ms3Confirm(message, options = {}) → Promise<boolean>
```

**options:**

| Parameter | Default | Description |
|-----------|---------|-------------|
| `confirmText` | "Confirm" / "Подтвердить" | Confirm button text |
| `cancelText` | "Cancel" / "Отмена" | Cancel button text |
| `confirmClass` | `primary` | Button CSS class (primary, danger) |

**Example:**

```javascript
// Simple confirmation
const ok = await ms3Confirm('Are you sure?')
if (!ok) return

// Red button (destructive action)
const ok = await ms3Confirm('Delete this address?', {
  confirmClass: 'danger'
})
```

### i18n

Button labels are chosen from `<html lang>`:

- `lang="ru"` → "Подтвердить" / "Отмена"
- Other → "Confirm" / "Cancel"

Override via `window.ms3Lexicon`:

```javascript
window.ms3Lexicon.ms3_confirm_ok = 'Yes, delete'
window.ms3Lexicon.ms3_confirm_cancel = 'No'
```

### Declarative binding

`data-ms3-confirm` on any element shows the dialog before the default action:

```html
<button data-ms3-confirm="Delete this address?"
        data-address-id="5"
        class="delete-address">
    Delete
</button>
```

## Hook system

### Registering hooks

```javascript
// window.ms3Hooks

const ms3Hooks = {
  hooks: {},

  addHook(name, callback, priority = 10) {
    if (!this.hooks[name]) {
      this.hooks[name] = []
    }
    this.hooks[name].push({ callback, priority })
    this.hooks[name].sort((a, b) => a.priority - b.priority)
  },

  async runHooks(name, data = {}) {
    if (!this.hooks[name]) return data

    for (const hook of this.hooks[name]) {
      await hook.callback(data)
      if (data.cancel) break
    }

    return data
  }
}
```

### Available hooks

#### Cart

| Hook | Description |
|-----|-------------|
| `beforeAddCart` | Before adding product |
| `afterAddCart` | After adding product |
| `beforeChangeCart` | Before changing quantity |
| `afterChangeCart` | After changing quantity |
| `beforeRemoveCart` | Before removing product |
| `afterRemoveCart` | After removing product |
| `beforeCleanCart` | Before clearing cart |
| `afterCleanCart` | After clearing cart |

#### Order

| Hook | Description |
|-----|-------------|
| `beforeAddOrder` | Before saving field |
| `afterAddOrder` | After saving field |
| `beforeSubmitOrder` | Before submit |
| `afterSubmitOrder` | After submit |
| `beforeCleanOrder` | Before clear |
| `afterCleanOrder` | After clear |

#### Customer

| Hook | Description |
|-----|-------------|
| `beforeAddCustomer` | Before saving data |
| `afterAddCustomer` | After saving data |
| `beforeUpdateProfile` | Before profile update |
| `afterUpdateProfile` | After profile update |
| `beforeCreateAddress` | Before creating address |
| `afterCreateAddress` | After creating address |
| `beforeUpdateAddress` | Before updating address |
| `afterUpdateAddress` | After updating address |
| `beforeChangeAddressCustomer` | Before changing address in order |
| `afterChangeAddressCustomer` | After changing address in order |
| `beforeSetDefaultAddress` | Before setting default address |
| `afterSetDefaultAddress` | After setting default address |
| `beforeDeleteAddress` | Before deleting address |
| `afterDeleteAddress` | After deleting address |
| `beforeCancelOrder` | Before cancelling order |
| `afterCancelOrder` | After cancelling order |

#### Authorization

| Hook | Description |
|-----|-------------|
| `beforeLogin` | Before login |
| `afterLogin` | After login |
| `beforeRegister` | Before registration |
| `afterRegister` | After registration |

### Examples

**Validation before add:**

```javascript
ms3Hooks.addHook('beforeAddCart', async (data) => {
  if (data.count < 1) {
    ms3.message.error('Minimum quantity: 1')
    data.cancel = true
    return
  }

  if (!data.options.size) {
    ms3.message.warning('Select size')
    data.cancel = true
    return
  }
})
```

**Analytics:**

```javascript
ms3Hooks.addHook('afterAddCart', async (data) => {
  gtag('event', 'add_to_cart', {
    currency: 'RUB',
    items: [{
      item_id: data.id,
      quantity: data.count
    }]
  })

  ym(COUNTER_ID, 'reachGoal', 'add_to_cart')
})
```

**After cancel order:**

```javascript
ms3Hooks.addHook('afterCancelOrder', async (data) => {
  if (data.response.success) {
    ym(COUNTER_ID, 'reachGoal', 'order_cancelled')
  }
})
```

**After registration:**

```javascript
ms3Hooks.addHook('afterRegister', async (data) => {
  if (data.response.success) {
    gtag('event', 'sign_up', { method: 'email' })
  }
})
```

## Notifications

### ms3Message

```javascript
// window.ms3Message

const ms3Message = {
  show(type, message) {
    if (typeof iziToast !== 'undefined') {
      iziToast[type]({
        message,
        position: 'topRight',
        timeout: 3000
      })
    } else {
      alert(message)
    }
  },

  success(message) { this.show('success', message) },
  error(message) { this.show('error', message) },
  info(message) { this.show('info', message) },
  warning(message) { this.show('warning', message) }
}
```

### Custom notifications

**Replace with your library:**

```javascript
// Override after ms3 loads
window.ms3Message = {
  show(type, message) {
    Toastify({
      text: message,
      className: type,
      duration: 3000
    }).showToast()
  },
  success(message) { this.show('success', message) },
  error(message) { this.show('error', message) },
  info(message) { this.show('info', message) },
  warning(message) { this.show('warning', message) }
}
```

## DOM events

### Subscribing

```javascript
// Cart update
document.addEventListener('ms3:cart:updated', (e) => {
  console.log('Cart updated:', e.detail)

  const counter = document.querySelector('.cart-counter')
  if (counter) {
    counter.textContent = e.detail.total_count || 0
  }
})
```

## Forms and handlers

### Automatic form handling

MiniShop3 automatically handles forms with class `.ms3_form` (or `[data-ms3-form]`). Routing is determined by the `ms3_action` field:

```html
<!-- Add to cart -->
<form class="ms3_form">
  <input type="hidden" name="ms3_action" value="cart/add">
  <input type="hidden" name="id" value="123">
  <input type="number" name="count" value="1">
  <button type="submit">Add to cart</button>
</form>

<!-- Submit order -->
<form class="ms3_form">
  <input type="hidden" name="ms3_action" value="order/submit">
  <button type="submit">Checkout</button>
</form>
```

### Routing

```javascript
// From ms3.js

initFormHandler() {
  document.querySelectorAll('.ms3_form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault()

      const entity = form.dataset.ms3Entity
      const method = form.dataset.ms3Method
      const formData = new FormData(form)

      switch (`${entity}/${method}`) {
        case 'cart/add':
          await this.cartUI.handleAdd(
            formData.get('id'),
            formData.get('count'),
            this.extractOptions(formData)
          )
          break

        case 'order/submit':
          await this.orderUI.handleSubmit()
          break

        case 'customer/profile':
          await this.customerUI.handleProfileUpdate(formData)
          break

        // ...
      }
    })
  })
}
```

## Extension and customization

### Replacing API module

```javascript
// Custom CartAPI
class CustomCartAPI extends CartAPI {
  async add(id, count, options, renderTokens) {
    console.log('Adding product:', id)
    const result = await super.add(id, count, options, renderTokens)
    console.log('Product added:', result)
    return result
  }
}

// Replace after init
document.addEventListener('DOMContentLoaded', () => {
  ms3.cartAPI = new CustomCartAPI(ms3.apiClient)
  ms3.cartUI.cart = ms3.cartAPI
})
```

### Replacing UI module

```javascript
// Custom CartUI
class CustomCartUI extends CartUI {
  async handleAdd(id, count, options) {
    document.body.classList.add('loading')
    await super.handleAdd(id, count, options)
    document.body.classList.remove('loading')
  }

  renderCart(renderData) {
    super.renderCart(renderData)
    this.animateCartUpdate()
  }

  animateCartUpdate() {
    const cart = document.querySelector('.cart-icon')
    cart?.classList.add('bounce')
    setTimeout(() => cart?.classList.remove('bounce'), 500)
  }
}
```

### Adding a module

```javascript
// Favorites module
class FavoritesAPI {
  constructor(apiClient) {
    this.api = apiClient
  }

  async add(productId) {
    return this.api.post('/api/v1/favorites/add', { id: productId })
  }

  async remove(productId) {
    return this.api.post('/api/v1/favorites/remove', { id: productId })
  }

  async get() {
    return this.api.get('/api/v1/favorites/get')
  }
}

// Attach
document.addEventListener('DOMContentLoaded', () => {
  ms3.favoritesAPI = new FavoritesAPI(ms3.apiClient)
})
```

## Frontend lexicons

### ms3Lexicon

```javascript
window.ms3Lexicon = {
  'ms3_frontend_currency': 'USD',
  'ms3_frontend_add_to_cart': 'Add to cart',
  'ms3_customer_login_success': 'You are logged in',
  'ms3_confirm_ok': 'Confirm',
  'ms3_confirm_cancel': 'Cancel',
  // ...
}
```

### Usage in code

```javascript
// In UI modules (e.g. AuthUI, confirm.js)
getLexicon(key) {
  if (window.ms3Lexicon?.[key]) {
    return window.ms3Lexicon[key]
  }

  const fallbacks = {
    'ms3_customer_err_login_required': 'Enter email and password',
    'ms3_customer_login_success': 'You are logged in'
  }

  return fallbacks[key] || key
}
```

### Additional modules

### order-addresses.js

Saved address selection on checkout:

```html
<select id="saved_address_id">
  <option value="">New address</option>
  <option value="1" data-address='{"city":"New York","street":"5th Ave"}'>
    New York, 5th Ave
  </option>
</select>
```

The module fills the form fields when an address is selected.

## Compatibility

### Requirements

- Modern browsers (ES6+)
- No jQuery dependency
- `fetch`, `Promise`, `async/await` support

## Related pages

- [REST API](api) — API endpoints
- [Events](events) — Component PHP events
- [Snippets](../snippets/) — Output on the site
