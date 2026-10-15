---
title: Frontend JavaScript
---
# Frontend JavaScript

JavaScript на стороне сайта: модули без jQuery, ES6+, современные браузеры.

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

Задаёт порядок загрузки CSS и JS:

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
    "[[+jsUrl]]web/ui/QuantityUI.js",
    "[[+jsUrl]]web/ui/ProductCardUI.js",
    "[[+jsUrl]]web/ui/AuthUI.js",
    "[[+jsUrl]]web/ms3.js"
]

```

**Плейсхолдеры:**

| Плейсхолдер | Значение |
| --- | --- |
| `[[+cssUrl]]` | `assets/components/minishop3/css/` |
| `[[+jsUrl]]` | `assets/components/minishop3/js/` |

**Куда попадает файл:**

- CSS файлы подключаются в `<head>`
- JS файлы подключаются в конце HTML с атрибутом `defer`

### Изменение порядка

Чтобы отключить или переставить файлы, измените `ms3_frontend_assets`.

**Пример: без iziToast, со своими уведомлениями:**

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

Селекторы UI собраны в одном месте. Сначала data-атрибуты, затем CSS-классы для обратной совместимости.

```javascript
// Стандартные селекторы
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

Через `ms3Config.selectors` можно подменить часть селекторов. Они сливаются со стандартными:

```javascript
window.ms3Config = {
  selectors: {
    orderCancel: '.my-custom-cancel-btn',
    form: '.my-form-class'
  }
}

```

### Использование в UI-классах

UI-классы берут селекторы из `ms3.selectors`:

```javascript
// Внутри UI-класса
const forms = document.querySelectorAll(this.selectors.form)
const cancelBtns = document.querySelectorAll(this.selectors.orderCancel)

```

## Главный объект ms3

### Инициализация

Объект `ms3` создаётся сам при загрузке `ms3.js`. Селекторы собираются из `getSelectors()` и `ms3Config.selectors`.

```javascript
async init() {
  this.config = window.ms3Config || {}
  this.hooks = window.ms3Hooks
  this.message = window.ms3Message

  this.tokenManager = new TokenManager({
    tokenName: this.config.tokenName || 'ms3_token',
  })
  this.apiClient = new ApiClient({
    baseUrl: this.config.actionUrl || '/assets/components/minishop3/api.php',
    tokenManager: this.tokenManager,
    ctx: this.config.ctx,
  })
  this.tokenManager.setApiClient(this.apiClient)
  await this.tokenManager.ensureToken()

  this.cartAPI = new CartAPI(this.apiClient)
  this.orderAPI = new OrderAPI(this.apiClient)
  this.customerAPI = new CustomerAPI(this.apiClient)

  this.cartUI = new CartUI(this.cartAPI, this.hooks, this.message, this.config)
  this.orderUI = new OrderUI(this.orderAPI, this.hooks, this.message, this.config)
  this.customerUI = new CustomerUI(this.customerAPI, this.hooks, this.message, this.config)
  this.authUI = new AuthUI(this.customerAPI, this.hooks, this.message, this.config)
  this.quantityUI = new QuantityUI(this.cartAPI, this.hooks, this.message, this.config)
  this.productCardUI = new ProductCardUI(this.cartAPI, this.hooks, this.message, this.config)

  this.cartUI.init()
  this.orderUI.init()
  this.customerUI.init()
  this.authUI.init()
  this.quantityUI.init()
  await this.productCardUI.init()

  document.dispatchEvent(new Event('ms3:ready'))
}
```

### Конфигурация ms3Config

Сервер кладёт конфиг через сниппеты:

```javascript
window.ms3Config = {
  actionUrl: '/assets/components/minishop3/api.php',
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

### Публичный refresh API (с 1.11.0)

`window.ms3.refresh()` заново привязывает UI MiniShop3 к разметке каталога. Вызовите его после того, как сторонний AJAX (mFilter, mSearch2, свой код, бесконечный скролл) заменил DOM. Метод вызывает `ProductCardUI.updateAllCards()` и `QuantityUI.reinit()`.

```javascript
// Универсальный паттерн для любого AJAX-компонента:
fetch('/catalog/page/2')
  .then(/* ... заменить DOM каталога ... */)
  .then(() => window.ms3?.refresh?.())  // optional chaining safe на странице без MS3

// mFilter:
document.addEventListener('mfilter:contentLoaded', () => {
  window.ms3?.refresh?.()
})

// mSearch2:
document.addEventListener('mse2_load.response', () => {
  window.ms3?.refresh?.()
})

```

Тот же вызов через DOM: `document.dispatchEvent(new CustomEvent('ms3:refresh'))`. Слушатель зарегистрирован один раз на уровне модуля. Повторные `init()` его не дублируют.

MS3 **не** слушает события сторонних компонентов (`mfilter:contentLoaded`, `mse2_load.response` и подобные). Связь односторонняя: сторонний компонент вызывает MS3. Так MiniShop3 не зависит от каждого совместимого компонента.

Аргумент `detail` зарезервирован для будущего scoped-refresh (`ms3.refresh({ scope: container })`). Сейчас не используется, но уже есть в сигнатуре, чтобы не ломать API позже.

## Ядро (Core)

### TokenManager

Токен лежит в httpOnly cookie `ms3_token`. Сервер ставит её сам.

::: info httpOnly cookie
С версии 1.6 токен хранится в httpOnly cookie, а не в localStorage. JavaScript его не видит, XSS до cookie не достаёт.

Браузер передаёт cookie сам при каждом запросе.
:::

`ensureToken()` не читает cookie: JavaScript её не видит. Метод запрашивает `GET /api/v1/customer/token/get` с `credentials: 'same-origin'`, и сервер ставит cookie сам. Перед вызовом `init()` передаёт клиент через `setApiClient()`.

### ApiClient

HTTP-клиент. Токен уходит сам через httpOnly cookie.

`buildUrl()` кладёт путь в query `route` и контекст в `ctx`. `request()` шлёт JSON с `credentials: 'same-origin'`. Методы: `get(route)`, `post(route, data)`, `put(route, data)`, `patch(route, data)`, `delete(route)`.

### CartAPI

Методы корзины:

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

  async change(productKey, count, render = null) {
    const data = { product_key: productKey, count }
    if (render) data.render = JSON.stringify(render)
    return this.api.post('/api/v1/cart/change', data)
  }

  async remove(productKey, render = null) {
    const data = { product_key: productKey }
    if (render) data.render = JSON.stringify(render)
    return this.api.post('/api/v1/cart/remove', data)
  }

  async clean(render = null) {
    const data = {}
    if (render) data.render = JSON.stringify(render)
    return this.api.post('/api/v1/cart/clean', data)
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

Методы заказа:

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

Методы покупателя:

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
  async login(email, password) {
    return this.api.post('/api/v1/customer/login', { email, password })
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

Обработчик интерфейса корзины.

`handleAdd` и `handleClean` гоняют хуки, затем API. При успехе `renderCart` подставляет HTML по `token` из `config.render.cart` и шлётся `ms3:cart:updated`.

```javascript
async handleAdd(id, count = 1, options = {}) {
  const hookData = { id, count, options }
  await this.hooks.runHooks('beforeAddCart', hookData)
  if (hookData.cancel) return

  const response = await this.cart.add(id, count, options, this.getRenderTokens())
  await this.hooks.runHooks('afterAddCart', { id, count, options, response })
  if (response.success && response.data?.render) this.renderCart(response.data.render)
  if (response.success) this.dispatchCartUpdated(response.data)
}

async handleClean() {
  const hookData = {}
  await this.hooks.runHooks('beforeCleanCart', hookData)
  if (hookData.cancel) return

  const response = await this.cart.clean(this.getRenderTokens())
  await this.hooks.runHooks('afterCleanCart', { response })
  if (response.success && response.data?.render) this.renderCart(response.data.render)
  if (response.success) this.dispatchCartUpdated(response.data)
}
```

::: tip Очистка корзины из внешнего скрипта
Вызов `cartAPI.clean()` напрямую шлёт только API-запрос. Отрисовки и события `ms3:cart:updated` нет. Чтобы обновить мини-корзину, счётчики и карточки, вызывайте `cartUI.handleClean()`:

```javascript
// ❌ Неправильно — API-вызов без обновления UI
await ms3.cartAPI.clean()

// ✅ Правильно — полный цикл: API + рендеринг + событие
await ms3.cartUI.handleClean()

```

**Пример: очистка корзины после успешной отправки формы (FetchIt):**

```javascript
document.addEventListener('fetchit:success', async (e) => {
    const { form, response } = e.detail
    if (!form || form.id !== 'cart-modal-form') return
    if (!response?.success || !ms3) return

    try {
        await ms3.cartUI.handleClean()
    } catch (err) {
        console.error('Cart clean error:', err)
    }
})
```

:::

### OrderUI

Обработчик интерфейса заказа.

Смена поля вызывает `handleAdd(name, value)` с хуками `beforeAddOrder` / `afterAddOrder`. Отправка:

```javascript
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
```

### CustomerUI

Профиль, адреса и отмена заказов.

Поле `ms3_action` в профиль не уходит. Контекст хука профиля: `{ data }`, после ответа ещё `response`. Отмена заказа: `{ orderId }`. Адреса: `setDefaultAddress(id)` и `deleteAddress(id)` с хуками `beforeSetDefaultAddress` / `beforeDeleteAddress`.

```javascript
async handleProfileUpdate(formData) {
  const data = {}
  for (const [key, value] of formData.entries()) {
    if (key === 'ms3_action') continue
    data[key] = value
  }
  const hookData = { data }
  await this.hooks.runHooks('beforeUpdateProfile', hookData)
  if (hookData.cancel) return { success: false }

  const response = await this.customer.updateProfile(data)
  await this.hooks.runHooks('afterUpdateProfile', { data, response })
  return response
}
```

### AuthUI

Формы входа и регистрации.

`beforeLogin` и `beforeRegister` получают `{ email }`. `login` вызывается двумя аргументами. В `register` уходят `email`, `password`, `first_name`, `last_name`, `phone` и `privacy_accepted` (`'1'` или `'0'`). `password_confirm` сверяется в форме и на сервер не отправляется. Если в ответе есть `redirect_url`, страница уходит туда, иначе перезагружается.

```javascript
const hookData = { email: data.email }
await this.hooks.runHooks('beforeLogin', hookData)
if (hookData.cancel) return

const response = await this.customer.login(data.email, data.password)
await this.hooks.runHooks('afterLogin', { email: data.email, response })
```

**Чанк авторизации:** `tpl.msCustomer.unauthorized` содержит формы входа и регистрации с табами (Bootstrap). Инлайн-скрипт пишет лексиконы в `window.ms3Lexicon`:

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

Диалог подтверждения на Bootstrap Modal. Если модалки нет, запасной вариант: `window.confirm()`:

```javascript
// Глобальная функция
async function ms3Confirm(message, options = {}) → Promise<boolean>

```

**Параметры options:**

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
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

Язык кнопок берётся из `<html lang>`:

- `lang="ru"` → «Подтвердить» / «Отмена»
- Другие → «Confirm» / «Cancel»

Текст кнопок можно переопределить через `window.ms3Lexicon`:

```javascript
window.ms3Lexicon.ms3_confirm_ok = 'Да, удалить'
window.ms3Lexicon.ms3_confirm_cancel = 'Нет'

```

### Декларативная привязка

Атрибут `data-ms3-confirm` на элементе показывает диалог перед действием:

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
  items: {},

  addHook(name, fn) {
    if (!this.items[name]) this.items[name] = []
    this.items[name].push(fn)
  },

  async runHooks(name, context) {
    if (!this.items[name]) return

    for (const fn of this.items[name]) {
      if (context.cancel) return false

      try {
        await fn(context)
      } catch (error) {
        console.error(`Error executing hook "${name}":`, error)
      }
    }
  },
}

```

### Доступные хуки

#### Корзина

| Хук | Описание |
| --- | --- |
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
| --- | --- |
| `beforeAddOrder` | Перед сохранением поля |
| `afterAddOrder` | После сохранения поля |
| `beforeSubmitOrder` | Перед оформлением заказа |
| `afterSubmitOrder` | После оформления заказа |
| `beforeCleanOrder` | Перед очисткой заказа |
| `afterCleanOrder` | После очистки заказа |

#### Покупатель

| Хук | Описание |
| --- | --- |
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
| --- | --- |
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

### Свои уведомления

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
  // detail приходит не всегда — очистка заказа шлёт событие пустым
  const status = e.detail && e.detail.status
  if (!status) {
    return
  }

  const counter = document.querySelector('.cart-counter')
  if (counter) {
    counter.textContent = status.total_count
  }
})

```

## Формы и обработчики

### Автоматическая обработка форм

MiniShop3 сам обрабатывает формы с классом `.ms3_form` или `[data-ms3-form]`. Маршрут берётся из поля `ms3_action`:

```html
<!-- Добавление в корзину -->
<form class="ms3_form">
  <input type="hidden" name="ms3_action" value="cart/add">
  <input type="hidden" name="id" value="123">
  <input type="number" name="count" value="1">
  <button type="submit">В корзину</button>
</form>

<!-- Оформление заказа -->
<form class="ms3_form">
  <input type="hidden" name="ms3_action" value="order/submit">
  <button type="submit">Оформить заказ</button>
</form>

```

## Расширение

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

Выбор сохранённого адреса при оформлении заказа. Модуль **не** входит в JSON `ms3_frontend_assets`. Его подключает сниппет `msOrder` через `regClientStartupScript`.

```html
<select id="saved_address_id">
  <option value="">Новый адрес</option>
  <option value="1" data-address='{"city":"Москва","street":"Тверская"}'>
    Москва, Тверская
  </option>
</select>

```

Модуль автоматически заполняет поля формы при выборе адреса. Подробнее: [Оформление заказа](/components/minishop3/frontend/order).

### Встроенный хук afterSendRequest

В `hooks.js` зарегистрирован `afterSendRequest`: после любого API-запроса через ~100 ms вызывается `cartUI.init()`, чтобы повесить обработчики на новый DOM. Учитывайте это при своих частичных обновлениях корзины.

### change-option

Смена опций позиции: `CartAPI.changeOption()` → `POST /api/v1/cart/change-option`. Хуки `beforeChangeOptionCart` и `afterChangeOptionCart` вызывает штатный `CartUI.js`.

## Совместимость

Нужны современные браузеры (ES6+), `fetch`, `Promise`, `async/await`. jQuery не требуется.

## Связанные страницы

- [REST API](api) — описание API endpoints
- [События](events) — PHP события компонента
- [Сниппеты](../snippets/) — вывод данных на сайте
