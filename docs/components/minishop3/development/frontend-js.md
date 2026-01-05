---
title: Frontend JavaScript
---
# Frontend JavaScript

Модульная архитектура JavaScript на стороне сайта.

## Обзор

MiniShop3 использует модульную архитектуру JavaScript без зависимости от jQuery. Все модули написаны на чистом ES6+ и работают в современных браузерах.

**Ключевые особенности:**

- Модульная структура (core, ui, modules)
- REST API клиент с токенизацией
- Система хуков для расширения
- Автоматический рендеринг корзины
- События для интеграции

## Структура модулей

```
assets/components/minishop3/js/web/
├── core/                    # Ядро системы
│   ├── ApiClient.js         # HTTP-клиент
│   ├── TokenManager.js      # Управление токенами
│   ├── CartAPI.js           # API корзины
│   ├── OrderAPI.js          # API заказа
│   └── CustomerAPI.js       # API покупателя
├── ui/                      # UI-обработчики
│   ├── CartUI.js            # Интерфейс корзины
│   ├── OrderUI.js           # Интерфейс заказа
│   └── CustomerUI.js        # Интерфейс покупателя
├── modules/                 # Вспомогательные модули
│   ├── hooks.js             # Система хуков
│   ├── message.js           # Уведомления
│   ├── auth-forms.js        # Формы авторизации
│   └── customer-addresses.js # Управление адресами
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
    "[[+jsUrl]]web/core/ApiClient.js",
    "[[+jsUrl]]web/core/TokenManager.js",
    "[[+jsUrl]]web/core/CartAPI.js",
    "[[+jsUrl]]web/core/OrderAPI.js",
    "[[+jsUrl]]web/core/CustomerAPI.js",
    "[[+jsUrl]]web/ui/CartUI.js",
    "[[+jsUrl]]web/ui/OrderUI.js",
    "[[+jsUrl]]web/ui/CustomerUI.js",
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
    "[[+jsUrl]]web/core/ApiClient.js",
    ...
]
```

## Главный объект ms3

### Инициализация

Главный объект `ms3` инициализируется автоматически:

```javascript
// assets/components/minishop3/js/web/ms3.js

const ms3 = {
  // Конфигурация (передаётся с сервера)
  config: {},

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

  // Утилиты
  hooks: null,
  message: null,

  // Инициализация
  async init() {
    this.config = window.ms3Config || {}

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

    // Инициализация UI
    this.cartUI.init()
    this.orderUI.init()
    this.customerUI.init()

    // Обработчики форм
    this.initFormHandler()
  }
}
```

### Конфигурация ms3Config

Передаётся с сервера через сниппеты:

```javascript
window.ms3Config = {
  apiUrl: '/assets/components/minishop3/api.php',
  token: 'abc123...',
  tokenName: 'ms3_token',

  // Конфигурация рендеринга
  render: {
    cart: [
      { token: 'mini', selector: '#headerMiniCart' },
      { token: 'full', selector: '#cartContent' }
    ]
  }
}
```

## Ядро (Core)

### TokenManager

Управление токенами авторизации с хранением в localStorage:

```javascript
class TokenManager {
  constructor(config) {
    this.config = config
    this.tokenName = config.tokenName || 'ms3_token'
  }

  // Получить токен
  getToken() {
    const data = localStorage.getItem(this.tokenName)
    if (!data) return null

    const { token, expires } = JSON.parse(data)
    if (Date.now() > expires) {
      this.removeToken()
      return null
    }
    return token
  }

  // Сохранить токен
  setToken(token, ttl = 86400) {
    const data = {
      token,
      expires: Date.now() + (ttl * 1000)
    }
    localStorage.setItem(this.tokenName, JSON.stringify(data))
  }

  // Удалить токен
  removeToken() {
    localStorage.removeItem(this.tokenName)
  }

  // Проверить и получить токен
  async ensureToken() {
    let token = this.getToken()
    if (!token) {
      token = await this.fetchNewToken()
    }
    return token
  }

  // Запросить новый токен
  async fetchNewToken() {
    const response = await fetch(`${this.config.apiUrl}?route=/api/v1/token`)
    const data = await response.json()
    if (data.success && data.object?.token) {
      this.setToken(data.object.token, data.object.ttl || 86400)
      return data.object.token
    }
    return null
  }
}
```

**Использование:**

```javascript
// Получить текущий токен
const token = ms3.tokenManager.getToken()

// Принудительно обновить
await ms3.tokenManager.fetchNewToken()
```

### ApiClient

HTTP-клиент с автоматической подстановкой токена:

```javascript
class ApiClient {
  constructor(config, tokenManager) {
    this.baseUrl = config.apiUrl || '/assets/components/minishop3/api.php'
    this.tokenManager = tokenManager
  }

  async request(method, route, data = null) {
    const url = new URL(this.baseUrl, window.location.origin)
    url.searchParams.set('route', route)

    const token = this.tokenManager.getToken()

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`
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

  // Получить корзину
  async get() {
    return this.api.get('/api/v1/cart/get')
  }

  // Добавить товар
  async add(id, count = 1, options = {}, renderTokens = null) {
    return this.api.post('/api/v1/cart/add', {
      id, count, options, render: renderTokens
    })
  }

  // Изменить количество
  async change(key, count, renderTokens = null) {
    return this.api.post('/api/v1/cart/change', {
      key, count, render: renderTokens
    })
  }

  // Удалить товар
  async remove(key, renderTokens = null) {
    return this.api.post('/api/v1/cart/remove', {
      key, render: renderTokens
    })
  }

  // Очистить корзину
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

  // Добавить/обновить поле
  async add(key, value) {
    return this.api.post('/api/v1/order/add', { key, value })
  }

  // Удалить поле
  async remove(key) {
    return this.api.post('/api/v1/order/remove', { key })
  }

  // Очистить заказ
  async clean() {
    return this.api.post('/api/v1/order/clean')
  }

  // Оформить заказ
  async submit() {
    return this.api.post('/api/v1/order/submit')
  }

  // Получить текущий заказ
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
    document.querySelectorAll('.ms3_order_form').forEach(form => {
      this.initForm(form)
    })
  }

  // Автосохранение полей
  initRegularInput(input) {
    input.addEventListener('change', async () => {
      const response = await this.handleAdd(input.name, input.value)

      if (response.success) {
        // Обновить значение из ответа
        if (response.data?.[input.name] !== undefined) {
          input.value = response.data[input.name]
        }
      } else {
        // Показать ошибку валидации
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

Обработчик интерфейса покупателя:

```javascript
class CustomerUI {
  init() {
    document.querySelectorAll('.ms3_customer_form').forEach(form => {
      this.initForm(form)
    })
  }

  // Обновление профиля
  async handleProfileUpdate(formData) {
    const data = {}
    for (const [key, value] of formData.entries()) {
      if (key === 'ms3_action') continue
      data[key] = value
    }

    const response = await this.customer.updateProfile(data)

    if (response.success) {
      this.message.success('Профиль обновлён')
      setTimeout(() => window.location.reload(), 1000)
    }

    return response
  }

  // Создание адреса
  async handleAddressCreate(formData) {
    // Аналогичная логика
  }
}
```

## Система хуков

### Регистрация хуков

```javascript
// window.ms3Hooks

const ms3Hooks = {
  hooks: {},

  // Добавить хук
  addHook(name, callback, priority = 10) {
    if (!this.hooks[name]) {
      this.hooks[name] = []
    }
    this.hooks[name].push({ callback, priority })
    this.hooks[name].sort((a, b) => a.priority - b.priority)
  },

  // Выполнить хуки
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
| `beforeChangeAddressCustomer` | Перед сменой адреса |
| `afterChangeAddressCustomer` | После смены адреса |

### Примеры использования

**Валидация перед добавлением в корзину:**

```javascript
ms3Hooks.addHook('beforeAddCart', async (data) => {
  // Проверка минимального количества
  if (data.count < 1) {
    ms3.message.error('Минимальное количество: 1')
    data.cancel = true
    return
  }

  // Проверка обязательных опций
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
  // Отправка в Google Analytics
  gtag('event', 'add_to_cart', {
    currency: 'RUB',
    items: [{
      item_id: data.id,
      quantity: data.count
    }]
  })

  // Яндекс.Метрика
  ym(COUNTER_ID, 'reachGoal', 'add_to_cart')
})
```

**Подтверждение очистки корзины:**

```javascript
ms3Hooks.addHook('beforeCleanCart', async (data) => {
  if (!confirm('Очистить корзину?')) {
    data.cancel = true
  }
})
```

**Обработка ошибок заказа:**

```javascript
ms3Hooks.addHook('afterSubmitOrder', async (data) => {
  if (!data.response.success) {
    // Подсветить поля с ошибками
    data.response.errors?.forEach(field => {
      const input = document.querySelector(`[name="${field}"]`)
      if (input) {
        input.classList.add('is-invalid')
      }
    })
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
// Переопределение после загрузки ms3
window.ms3Message = {
  show(type, message) {
    // Ваша реализация
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
// Обновление корзины
document.addEventListener('ms3:cart:updated', (e) => {
  console.log('Корзина обновлена:', e.detail)

  // Обновить счётчик в шапке
  const counter = document.querySelector('.cart-counter')
  if (counter) {
    counter.textContent = e.detail.total_count || 0
  }
})
```

## Формы и обработчики

### Автоматическая обработка форм

MiniShop3 автоматически обрабатывает формы с классом `.ms3_form` и атрибутами `data-ms3-entity` и `data-ms3-method`:

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

### Маршрутизация

```javascript
// Из ms3.js

initFormHandler() {
  document.querySelectorAll('.ms3_form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault()

      const entity = form.dataset.ms3Entity
      const method = form.dataset.ms3Method
      const formData = new FormData(form)

      // Роутинг по entity/method
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

## Расширение и кастомизация

### Замена API модуля

```javascript
// Кастомный CartAPI с дополнительной логикой
class CustomCartAPI extends CartAPI {
  async add(id, count, options, renderTokens) {
    // Дополнительная логика перед добавлением
    console.log('Adding product:', id)

    const result = await super.add(id, count, options, renderTokens)

    // Дополнительная логика после
    console.log('Product added:', result)

    return result
  }
}

// Замена после инициализации
document.addEventListener('DOMContentLoaded', () => {
  ms3.cartAPI = new CustomCartAPI(ms3.apiClient)
  ms3.cartUI.cart = ms3.cartAPI
})
```

### Замена UI модуля

```javascript
// Кастомный CartUI
class CustomCartUI extends CartUI {
  async handleAdd(id, count, options) {
    // Своя анимация перед добавлением
    document.body.classList.add('loading')

    await super.handleAdd(id, count, options)

    document.body.classList.remove('loading')
  }

  // Переопределение рендеринга
  renderCart(renderData) {
    super.renderCart(renderData)

    // Дополнительные действия после рендеринга
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
// Модуль избранного
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

// Подключение
document.addEventListener('DOMContentLoaded', () => {
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
  // ...
}
```

### Использование в коде

```javascript
// В модуле AuthForms
getLexicon(key) {
  if (window.ms3Lexicon?.[key]) {
    return window.ms3Lexicon[key]
  }

  // Fallback значения
  const fallbacks = {
    'ms3_customer_err_login_required': 'Введите email и пароль',
    'ms3_customer_login_success': 'Вы успешно вошли'
  }

  return fallbacks[key] || key
}
```

## Дополнительные модули

### AuthForms

Обработка форм авторизации и регистрации:

```javascript
const authForms = new AuthForms({
  apiUrl: '/assets/components/minishop3/api.php',
  loginRoute: '/api/v1/customer/login',
  registerRoute: '/api/v1/customer/register',
  loginFormId: 'ms3-login-form',
  registerFormId: 'ms3-register-form'
})

authForms.init()
```

### CustomerAddresses

Управление адресами в личном кабинете:

```javascript
const customerAddresses = new CustomerAddresses({
  apiUrl: '/assets/components/minishop3/api.php',
  setDefaultSelector: '.set-default-address',
  deleteSelector: '.delete-address'
})

customerAddresses.init()
```

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

### Полифиллы

Для поддержки старых браузеров подключите полифиллы:

```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=fetch,Promise"></script>
```

## Связанные страницы

- [REST API](api) — описание API endpoints
- [События](events) — PHP события компонента
- [Сниппеты](../snippets/) — вывод данных на сайте
