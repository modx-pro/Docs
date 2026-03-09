---
title: Frontend JavaScript
---
# Frontend JavaScript

Модульная архитектура JavaScript на стороне сайта.

## Обзор

MiniShop3 использует модульную архитектуру JavaScript без зависимости от jQuery. Все модули написаны на чистом ES6+ и работают в современных браузерах.

**Ключевые особенности:**

- Модульная структура (core, ui, modules)
- REST API клиент с httpOnly cookie токенизацией
- Система хуков для расширения
- Централизованные селекторы с переопределением
- Автоматический рендеринг корзины
- Promise-based диалоги подтверждения
- События для интеграции

## Структура модулей

```
assets/components/minishop3/js/web/
├── core/                    # Ядро системы
│   ├── ApiClient.js         # HTTP-клиент
│   ├── TokenManager.js      # Управление токенами
│   ├── Selectors.js         # Централизованные селекторы
│   ├── CartAPI.js           # API корзины
│   ├── OrderAPI.js          # API заказа
│   └── CustomerAPI.js       # API покупателя
├── ui/                      # UI-обработчики
│   ├── CartUI.js            # Интерфейс корзины
│   ├── OrderUI.js           # Интерфейс заказа
│   ├── CustomerUI.js        # Интерфейс покупателя (профиль, адреса, отмена заказов)
│   ├── AuthUI.js            # Формы авторизации и регистрации
│   ├── QuantityUI.js        # Кнопки +/- количества
│   └── ProductCardUI.js     # Карточка товара
├── modules/                 # Вспомогательные модули
│   ├── hooks.js             # Система хуков
│   ├── message.js           # Уведомления
│   └── confirm.js           # Promise-based диалог подтверждения
├── lib/                     # Библиотеки
│   └── izitoast/            # Уведомления iziToast
├── ms3.js                   # Главный модуль
└── order-addresses.js       # Выбор адреса в заказе
```

## Порядок подключения

### Системная настройка `ms3_frontend_assets`

Контролирует порядок загрузки CSS и JS файлов:

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

**Поддерживаемые плейсхолдеры:**

| Плейсхолдер | Значение |
|-------------|----------|
| `[[+cssUrl]]` | `assets/components/minishop3/css/` |
| `[[+jsUrl]]` | `assets/components/minishop3/js/` |

**Особенности загрузки:**

- CSS файлы подключаются в `<head>`
- JS файлы подключаются в конце HTML с атрибутом `defer`

### Изменение порядка

Для изменения или отключения файлов отредактируйте системную настройку `ms3_frontend_assets`.

**Пример: отключение iziToast (использование своих уведомлений):**

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

## Селекторы

### Модуль Selectors.js

Централизованные CSS/data-* селекторы для всех UI-компонентов. Селекторы используют data-атрибуты как приоритетные с fallback на CSS-классы для обратной совместимости.

```javascript
// Дефолтные селекторы
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

### Переопределение селекторов

Через `ms3Config.selectors` можно частично переопределить селекторы — они сливаются с дефолтными:

```javascript
window.ms3Config = {
  selectors: {
    orderCancel: '.my-custom-cancel-btn',
    form: '.my-form-class'
  }
}
```

### Использование в UI-классах

Все UI-классы получают селекторы из `ms3.selectors`:

```javascript
// Внутри UI-класса
const forms = document.querySelectorAll(this.selectors.form)
const cancelBtns = document.querySelectorAll(this.selectors.orderCancel)
```

## Главный объект ms3

### Инициализация

Главный объект `ms3` инициализируется автоматически при загрузке `ms3.js`:

```javascript
// assets/components/minishop3/js/web/ms3.js

const ms3 = {
  config: {},
  selectors: {},

  // Ядро
  tokenManager: null,
  apiClient: null,

  // API модули
  cartAPI: null,
  orderAPI: null,
  customerAPI: null,

  // UI модули
  cartUI: null,
  orderUI: null,
  customerUI: null,
  authUI: null,
  quantityUI: null,
  productCardUI: null,

  // Утилиты
  hooks: null,
  message: null,

  async init() {
    this.config = window.ms3Config || {}
    this.selectors = getSelectors(this.config)

    // Хуки и сообщения
    this.hooks = window.ms3Hooks
    this.message = window.ms3Message

    // Токены и API клиент
    this.tokenManager = new TokenManager(this.config)
    await this.tokenManager.ensureToken()
    this.apiClient = new ApiClient(this.config, this.tokenManager)

    // API модули
    this.cartAPI = new CartAPI(this.apiClient)
    this.orderAPI = new OrderAPI(this.apiClient)
    this.customerAPI = new CustomerAPI(this.apiClient)

    // UI модули
    this.cartUI = new CartUI(this.cartAPI, this.hooks, this.message, this.config)
    this.orderUI = new OrderUI(this.orderAPI, this.hooks, this.message, this.config)
    this.customerUI = new CustomerUI(this.customerAPI, this.hooks, this.message, this.config)
    this.authUI = new AuthUI(this.customerAPI, this.hooks, this.message, this.config)

    // Инициализация
    this.cartUI.init()
    this.orderUI.init()
    this.customerUI.init()
    this.authUI.init()

    this.initFormHandler()

    // Событие готовности
    document.dispatchEvent(new CustomEvent('ms3:ready'))
  }
}
```

### Конфигурация ms3Config

Передаётся с сервера через сниппеты:

```javascript
window.ms3Config = {
  apiUrl: '/assets/components/minishop3/api.php',
  tokenName: 'ms3_token',

  // Переопределение селекторов
  selectors: {
    orderCancel: '.my-cancel-button'
  },

  // Конфигурация рендеринга
  render: {
    cart: [
      { token: 'mini', selector: '#headerMiniCart' },
      { token: 'full', selector: '#cartContent' }
    ]
  }
}
```

### Событие готовности

```javascript
document.addEventListener('ms3:ready', () => {
  // ms3 полностью инициализирован
  console.log('ms3 ready', ms3.config)
})
```

## Ядро (Core)

### TokenManager

Управление токенами авторизации. Токен хранится в httpOnly cookie `ms3_token`, которая устанавливается сервером автоматически.

::: info httpOnly cookie
Начиная с версии 1.6, токен хранится в httpOnly cookie вместо localStorage. Это значительно повышает безопасность — токен недоступен из JavaScript и защищён от XSS-атак.

Cookie автоматически передаётся браузером при каждом запросе.
:::

```javascript
class TokenManager {
  constructor(config) {
    this.config = config
    this.tokenName = config.tokenName || 'ms3_token'
  }

  // Проверить наличие токена и получить при необходимости
  async ensureToken() {
    // Токен в httpOnly cookie — JS не видит его напрямую.
    // При отсутствии cookie запрашивает новый токен с сервера
    return this.fetchNewToken()
  }

  // Запросить новый токен (сервер установит httpOnly cookie)
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

HTTP-клиент. Токен передаётся автоматически через httpOnly cookie:

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
      credentials: 'same-origin'  // Включает httpOnly cookie
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

API для работы с корзиной:

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

**Примеры:**

```javascript
// Добавить товар в корзину
await ms3.cartAPI.add(123, 2, { color: 'red', size: 'L' })

// Изменить количество
await ms3.cartAPI.change('abc123', 5)

// Удалить товар
await ms3.cartAPI.remove('abc123')
```

### OrderAPI

API для работы с заказом:

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

API для работы с данными покупателя:

```javascript
class CustomerAPI {
  constructor(apiClient) {
    this.api = apiClient
  }

  // Добавить/обновить поле
  async add(key, value) {
    return this.api.post('/api/v1/customer/add', { key, value })
  }

  // Сменить адрес доставки
  async changeAddress(key, value) {
    return this.api.post('/api/v1/customer/changeAddress', { key, value })
  }

  // Обновить профиль
  async updateProfile(data) {
    return this.api.put('/api/v1/customer/profile', data)
  }

  // Создать адрес
  async createAddress(data) {
    return this.api.post('/api/v1/customer/addresses', data)
  }

  // Обновить адрес
  async updateAddress(id, data) {
    return this.api.put(`/api/v1/customer/addresses/${id}`, data)
  }

  // Удалить адрес
  async deleteAddress(id) {
    return this.api.delete(`/api/v1/customer/addresses/${id}`)
  }

  // Установить адрес по умолчанию
  async setDefaultAddress(id) {
    return this.api.put(`/api/v1/customer/addresses/${id}/set-default`)
  }

  // Авторизация
  async login(data) {
    return this.api.post('/api/v1/customer/login', data)
  }

  // Регистрация
  async register(data) {
    return this.api.post('/api/v1/customer/register', data)
  }

  // Отмена заказа
  async cancelOrder(orderId) {
    return this.api.post(`/api/v1/customer/orders/${orderId}/cancel`)
  }
}
```

## UI модули

### CartUI

Обработчик интерфейса корзины:

```javascript
class CartUI {
  constructor(cartAPI, hooks, message, config) {
    this.cart = cartAPI
    this.hooks = hooks
    this.message = message
    this.config = config
  }

  init() {
    this.initQuantityButtons()  // Кнопки +/-
    this.initQuantityInputs()   // Поля количества
    this.initOptionSelects()    // Селекты опций
  }

  // Добавление товара
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

  // Автоматический рендеринг
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

    // Переинициализация обработчиков
    setTimeout(() => this.init(), 100)
  }

  // Событие обновления корзины
  dispatchCartUpdated(data) {
    document.dispatchEvent(new CustomEvent('ms3:cart:updated', {
      detail: data
    }))
  }
}
```

### OrderUI

Обработчик интерфейса заказа:

```javascript
class OrderUI {
  init() {
    document.querySelectorAll(this.selectors.formOrder).forEach(form => {
      this.initForm(form)
    })
  }

  // Автосохранение полей
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

  // Оформление заказа
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

Обработчик интерфейса покупателя. Управляет профилем, адресами и отменой заказов:

```javascript
class CustomerUI {
  init() {
    document.querySelectorAll(this.selectors.formCustomer).forEach(form => {
      this.initForm(form)
    })
    this.initOrderCancel()
    this.initAddressManagement()
  }

  // Обновление профиля
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

  // Отмена заказа
  initOrderCancel() {
    document.querySelectorAll(this.selectors.orderCancel).forEach(btn => {
      btn.addEventListener('click', async () => {
        const orderId = btn.dataset.orderId
        const confirmMessage = btn.dataset.confirm

        // Диалог подтверждения с красной кнопкой
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

  // Управление адресами
  initAddressManagement() {
    // Установить по умолчанию
    document.querySelectorAll(this.selectors.addressSetDefault).forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.addressId
        const response = await this.customer.setDefaultAddress(id)
        if (response.success) window.location.reload()
      })
    })

    // Удалить адрес
    document.querySelectorAll(this.selectors.addressDelete).forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.addressId
        const confirmed = await ms3Confirm(/* сообщение из data-confirm */)
        if (!confirmed) return

        const response = await this.customer.deleteAddress(id)
        if (response.success) window.location.reload()
      })
    })
  }
}
```

### AuthUI

Обработчик форм авторизации и регистрации:

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

  // Авторизация
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
      // Редирект на страницу профиля или текущую
      window.location.href = response.data?.redirect_url || window.location.href
    } else {
      this.showFormErrors('login', response)
    }
  }

  // Регистрация
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

**Чанк авторизации:** `tpl.msCustomer.unauthorized` — содержит формы входа и регистрации с табами (Bootstrap). Инлайн-скрипт экспортирует лексиконы в `window.ms3Lexicon`:

```fenom
<script>
window.ms3Lexicon = window.ms3Lexicon || {};
window.ms3Lexicon.ms3_customer_err_login_required = '{'ms3_customer_err_login_required' | lexicon}';
window.ms3Lexicon.ms3_customer_login_success = '{'ms3_customer_login_success' | lexicon}';
{* ... и другие ключи *}
</script>
```

## Диалог подтверждения

### Модуль confirm.js

Promise-based диалог подтверждения с Bootstrap Modal и fallback на `window.confirm()`:

```javascript
// Глобальная функция
async function ms3Confirm(message, options = {}) → Promise<boolean>
```

**Параметры options:**

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `confirmText` | «Подтвердить» / «Confirm» | Текст кнопки подтверждения |
| `cancelText` | «Отмена» / «Cancel» | Текст кнопки отмены |
| `confirmClass` | `primary` | CSS-класс кнопки (primary, danger) |

**Пример использования:**

```javascript
// Простое подтверждение
const ok = await ms3Confirm('Вы уверены?')
if (!ok) return

// С красной кнопкой (для деструктивных действий)
const ok = await ms3Confirm('Удалить адрес?', {
  confirmClass: 'danger'
})
```

### Автоматическая привязка

i18n кнопок определяется по атрибуту `<html lang>`:

- `lang="ru"` → «Подтвердить» / «Отмена»
- Другие → «Confirm» / «Cancel»

Текст кнопок можно переопределить через `window.ms3Lexicon`:

```javascript
window.ms3Lexicon.ms3_confirm_ok = 'Да, удалить'
window.ms3Lexicon.ms3_confirm_cancel = 'Нет'
```

### Декларативная привязка

Атрибут `data-ms3-confirm` на любом элементе автоматически показывает диалог перед действием:

```html
<button data-ms3-confirm="Удалить этот адрес?"
        data-address-id="5"
        class="delete-address">
    Удалить
</button>
```

## Система хуков

### Регистрация хуков

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

### Доступные хуки

#### Корзина

| Хук | Описание |
|-----|----------|
| `beforeAddCart` | Перед добавлением товара |
| `afterAddCart` | После добавления товара |
| `beforeChangeCart` | Перед изменением количества |
| `afterChangeCart` | После изменения количества |
| `beforeRemoveCart` | Перед удалением товара |
| `afterRemoveCart` | После удаления товара |
| `beforeCleanCart` | Перед очисткой корзины |
| `afterCleanCart` | После очистки корзины |

#### Заказ

| Хук | Описание |
|-----|----------|
| `beforeAddOrder` | Перед сохранением поля |
| `afterAddOrder` | После сохранения поля |
| `beforeSubmitOrder` | Перед оформлением заказа |
| `afterSubmitOrder` | После оформления заказа |
| `beforeCleanOrder` | Перед очисткой заказа |
| `afterCleanOrder` | После очистки заказа |

#### Покупатель

| Хук | Описание |
|-----|----------|
| `beforeAddCustomer` | Перед сохранением данных |
| `afterAddCustomer` | После сохранения данных |
| `beforeUpdateProfile` | Перед обновлением профиля |
| `afterUpdateProfile` | После обновления профиля |
| `beforeCreateAddress` | Перед созданием адреса |
| `afterCreateAddress` | После создания адреса |
| `beforeUpdateAddress` | Перед обновлением адреса |
| `afterUpdateAddress` | После обновления адреса |
| `beforeChangeAddressCustomer` | Перед сменой адреса в заказе |
| `afterChangeAddressCustomer` | После смены адреса в заказе |
| `beforeSetDefaultAddress` | Перед установкой адреса по умолчанию |
| `afterSetDefaultAddress` | После установки адреса по умолчанию |
| `beforeDeleteAddress` | Перед удалением адреса |
| `afterDeleteAddress` | После удаления адреса |
| `beforeCancelOrder` | Перед отменой заказа |
| `afterCancelOrder` | После отмены заказа |

#### Авторизация

| Хук | Описание |
|-----|----------|
| `beforeLogin` | Перед авторизацией |
| `afterLogin` | После авторизации |
| `beforeRegister` | Перед регистрацией |
| `afterRegister` | После регистрации |

### Примеры использования

**Валидация перед добавлением в корзину:**

```javascript
ms3Hooks.addHook('beforeAddCart', async (data) => {
  if (data.count < 1) {
    ms3.message.error('Минимальное количество: 1')
    data.cancel = true
    return
  }

  if (!data.options.size) {
    ms3.message.warning('Выберите размер')
    data.cancel = true
    return
  }
})
```

**Отслеживание добавления товара:**

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

**Дополнительная логика после отмены заказа:**

```javascript
ms3Hooks.addHook('afterCancelOrder', async (data) => {
  if (data.response.success) {
    ym(COUNTER_ID, 'reachGoal', 'order_cancelled')
  }
})
```

**Дополнительная логика после регистрации:**

```javascript
ms3Hooks.addHook('afterRegister', async (data) => {
  if (data.response.success) {
    gtag('event', 'sign_up', { method: 'email' })
  }
})
```

## Система уведомлений

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

### Кастомизация уведомлений

**Замена на свою библиотеку:**

```javascript
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

## События DOM

### Подписка на события

```javascript
// ms3 инициализирован
document.addEventListener('ms3:ready', () => {
  console.log('ms3 готов к работе')
})

// Обновление корзины
document.addEventListener('ms3:cart:updated', (e) => {
  console.log('Корзина обновлена:', e.detail)

  const counter = document.querySelector('.cart-counter')
  if (counter) {
    counter.textContent = e.detail.total_count || 0
  }
})
```

## Формы и обработчики

### Автоматическая обработка форм

MiniShop3 автоматически обрабатывает формы с классом `.ms3_form` (или `[data-ms3-form]`). Роутинг определяется по полю `ms3_action`:

```html
<!-- Добавление в корзину -->
<form class="ms3_form" data-ms3-entity="cart" data-ms3-method="add">
  <input type="hidden" name="id" value="123">
  <input type="number" name="count" value="1">
  <button type="submit">В корзину</button>
</form>

<!-- Оформление заказа -->
<form class="ms3_form" data-ms3-entity="order" data-ms3-method="submit">
  <button type="submit">Оформить заказ</button>
</form>
```

## Расширение и кастомизация

### Замена API модуля

```javascript
class CustomCartAPI extends CartAPI {
  async add(id, count, options, renderTokens) {
    console.log('Adding product:', id)
    const result = await super.add(id, count, options, renderTokens)
    console.log('Product added:', result)
    return result
  }
}

document.addEventListener('ms3:ready', () => {
  ms3.cartAPI = new CustomCartAPI(ms3.apiClient)
  ms3.cartUI.cart = ms3.cartAPI
})
```

### Замена UI модуля

```javascript
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

### Добавление нового модуля

```javascript
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

document.addEventListener('ms3:ready', () => {
  ms3.favoritesAPI = new FavoritesAPI(ms3.apiClient)
})
```

## Лексиконы на фронтенде

### Глобальный объект ms3Lexicon

```javascript
window.ms3Lexicon = {
  'ms3_frontend_currency': 'руб.',
  'ms3_frontend_add_to_cart': 'Добавить в корзину',
  'ms3_customer_login_success': 'Вы успешно вошли',
  'ms3_confirm_ok': 'Подтвердить',
  'ms3_confirm_cancel': 'Отмена',
  // ...
}
```

### Дополнительные модули

### order-addresses.js

Выбор сохранённого адреса при оформлении заказа:

```html
<select id="saved_address_id">
  <option value="">Новый адрес</option>
  <option value="1" data-address='{"city":"Москва","street":"Тверская"}'>
    Москва, Тверская
  </option>
</select>
```

Модуль автоматически заполняет поля формы при выборе адреса.

## Совместимость

### Требования

- Современные браузеры (ES6+)
- Без jQuery зависимости
- Поддержка `fetch`, `Promise`, `async/await`

## Связанные страницы

- [REST API](api) — описание API endpoints
- [События](events) — PHP события компонента
- [Сниппеты](../snippets/) — вывод данных на сайте
