---
title: JavaScript API
description: Headless JavaScript API для программной работы с корзиной, заказом и покупателем
---
# JavaScript API

Headless API для программного взаимодействия с MiniShop3 без привязки к DOM.

## Архитектура

MiniShop3 использует двухуровневую архитектуру:

```
┌─────────────────────────────────────────────────┐
│                    ms3.js                        │  ← Точка входа, автоинициализация
├─────────────────────────────────────────────────┤
│                  UI Layer                        │  ← DOM-привязки для SSR
│     CartUI.js │ OrderUI.js │ CustomerUI.js      │
├─────────────────────────────────────────────────┤
│                 API Core                         │  ← Headless ядро
│  ApiClient.js │ TokenManager.js │ hooks.js      │
│  CartAPI.js │ OrderAPI.js │ CustomerAPI.js      │
└─────────────────────────────────────────────────┘
```

### API Core (Headless)

Независимое ядро без привязки к DOM:

- **ApiClient.js** — HTTP-клиент для запросов к серверу
- **TokenManager.js** — управление токенами авторизации
- **CartAPI.js** — методы работы с корзиной
- **OrderAPI.js** — методы работы с заказом
- **CustomerAPI.js** — методы работы с покупателем
- **hooks.js** — система хуков для расширения

### UI Layer (SSR)

DOM-привязки для работы с серверной разметкой:

- **CartUI.js** — обработчики форм корзины, рендеринг
- **OrderUI.js** — обработчики форм заказа
- **CustomerUI.js** — обработчики форм покупателя
- **ProductCardUI.js** — переключение состояний карточек товаров

## Подключение

### Полное (по умолчанию)

Плагин MiniShop3 автоматически подключает все скрипты. Управление через системную настройку `ms3_frontend_assets`.

### Минимальное (только Headless)

Для SPA-приложений (Vue, React, Svelte) подключите только ядро:

```html
<script src="/assets/components/minishop3/js/web/modules/hooks.js"></script>
<script src="/assets/components/minishop3/js/web/core/TokenManager.js"></script>
<script src="/assets/components/minishop3/js/web/core/ApiClient.js"></script>
<script src="/assets/components/minishop3/js/web/core/CartAPI.js"></script>
<script src="/assets/components/minishop3/js/web/core/OrderAPI.js"></script>
<script src="/assets/components/minishop3/js/web/core/CustomerAPI.js"></script>
```

### Инициализация вручную

```javascript
// Конфигурация
const config = {
  apiUrl: '/assets/components/minishop3/api.php',
  tokenName: 'ms3_token'
}

// Инициализация ядра
const tokenManager = new TokenManager(config)
const apiClient = new ApiClient({ baseUrl: config.apiUrl, tokenManager })
tokenManager.setApiClient(apiClient)

// Получение токена
await tokenManager.ensureToken()

// API модули
const cart = new CartAPI(apiClient)
const order = new OrderAPI(apiClient)
const customer = new CustomerAPI(apiClient)

// Готово к использованию
const response = await cart.add(123, 2, { color: 'red' })
```

## Глобальные объекты

При стандартном подключении доступны:

| Объект | Описание |
|--------|----------|
| `window.ms3` | Главный объект со всеми модулями |
| `window.ms3Hooks` | Система хуков |
| `window.ms3Message` | Уведомления (если подключён UI) |
| `window.ms3Config` | Конфигурация с сервера |

```javascript
// Использование через глобальный объект
await ms3.cartAPI.add(123, 1)
await ms3.orderAPI.submit()
await ms3.customerAPI.updateProfile({ email: 'new@example.com' })
```

## CartAPI

API для работы с корзиной.

### Методы

#### get()

Получить содержимое корзины.

```javascript
const response = await cart.get()

// response.data:
{
  cart: [
    {
      product_key: "ms5d41d8cd98f00b204e9800998ecf8427e",
      product_id: 123,
      count: 2,
      price: 1500,
      old_price: 2000,
      cost: 3000,
      options: { color: "red", size: "L" },
      // ... данные товара
    }
  ],
  status: {
    total_count: 2,
    total_cost: 3000,
    total_discount: 1000
  }
}
```

#### add(id, count, options, render)

Добавить товар в корзину.

| Параметр | Тип | Описание |
|----------|-----|----------|
| `id` | number | ID товара (обязательный) |
| `count` | number | Количество (по умолчанию 1) |
| `options` | object | Опции товара (цвет, размер и т.д.) |
| `render` | array | Токены для серверного рендеринга |

```javascript
// Простое добавление
await cart.add(123)

// С количеством
await cart.add(123, 3)

// С опциями
await cart.add(123, 1, { color: 'red', size: 'L' })

// С запросом HTML для обновления
await cart.add(123, 1, {}, ['mini', 'full'])
```

**Формат ответа:**

```javascript
{
  success: true,
  message: "Товар добавлен в корзину",
  data: {
    cart: [...],           // Обновлённая корзина
    status: {...},         // Итоги
    render: {              // HTML (если запрошен)
      mini: "<div>...</div>",
      full: "<div>...</div>"
    }
  }
}
```

#### change(productKey, count, render)

Изменить количество товара.

| Параметр | Тип | Описание |
|----------|-----|----------|
| `productKey` | string | Уникальный ключ товара в корзине |
| `count` | number | Новое количество |
| `render` | array | Токены для рендеринга |

```javascript
await cart.change('ms5d41d8cd98f00b204e9800998ecf8427e', 5)
```

:::tip product_key
Каждый товар в корзине имеет уникальный `product_key`. Один товар с разными опциями — разные ключи.
:::

#### remove(productKey, render)

Удалить товар из корзины.

```javascript
await cart.remove('ms5d41d8cd98f00b204e9800998ecf8427e')
```

#### clean(render)

Очистить корзину.

```javascript
await cart.clean()
```

## OrderAPI

API для работы с заказом.

### Методы

#### get()

Получить текущий заказ (данные из сессии).

```javascript
const response = await order.get()

// response.data:
{
  receiver: "Иван Иванов",
  email: "ivan@example.com",
  phone: "+79991234567",
  delivery: 1,
  payment: 2,
  comment: "Позвонить перед доставкой"
}
```

#### add(key, value)

Сохранить поле заказа.

```javascript
await order.add('receiver', 'Иван Иванов')
await order.add('email', 'ivan@example.com')
await order.add('phone', '+79991234567')
await order.add('delivery', 1)
await order.add('payment', 2)
await order.add('comment', 'Позвонить перед доставкой')
```

:::info Автосохранение
Каждый вызов `add()` сохраняет значение на сервере. Данные не теряются при перезагрузке страницы.
:::

#### remove(key)

Удалить поле заказа.

```javascript
await order.remove('comment')
```

#### clean()

Очистить все данные заказа.

```javascript
await order.clean()
```

#### submit()

Оформить заказ.

```javascript
const response = await order.submit()

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
    message: "Заполните обязательные поля",
    data: {
      errors: ["receiver", "email", "phone"]
    }
  }
}
```

#### getCost()

Получить расчёт стоимости заказа.

```javascript
const response = await order.getCost()

// response.data:
{
  cart_cost: 5000,
  delivery_cost: 300,
  discount: 500,
  total_cost: 4800
}
```

## CustomerAPI

API для работы с данными покупателя.

### Методы

#### add(key, value)

Сохранить данные покупателя в сессию (для гостей и авторизованных).

```javascript
await customer.add('email', 'user@example.com')
await customer.add('phone', '+79991234567')
await customer.add('fullname', 'Иван Иванов')
```

#### changeAddress(key, value)

Выбрать сохранённый адрес доставки.

```javascript
await customer.changeAddress('address_hash', 'addr_abc123')
```

#### updateProfile(data)

Обновить профиль авторизованного пользователя.

```javascript
await customer.updateProfile({
  first_name: 'Иван',
  last_name: 'Иванов',
  email: 'ivan@example.com',
  phone: '+79991234567'
})
```

#### createAddress(data)

Создать новый адрес.

```javascript
await customer.createAddress({
  name: 'Домашний',
  city: 'Москва',
  street: 'Тверская',
  building: '1',
  room: '10',
  index: '123456'
})
```

#### updateAddress(id, data)

Обновить существующий адрес.

```javascript
await customer.updateAddress(5, {
  city: 'Санкт-Петербург',
  street: 'Невский проспект'
})
```

#### deleteAddress(id)

Удалить адрес.

```javascript
await customer.deleteAddress(5)
```

## Система хуков

Хуки позволяют расширять поведение без изменения исходного кода.

### Регистрация хука

```javascript
ms3Hooks.addHook('hookName', async (context) => {
  // context — данные операции
  // context.cancel = true — отменить операцию
})
```

### Доступные хуки

#### Корзина

| Хук | Контекст | Описание |
|-----|----------|----------|
| `beforeAddCart` | `{ id, count, options }` | Перед добавлением товара |
| `afterAddCart` | `{ id, count, options, response }` | После добавления товара |
| `beforeChangeCart` | `{ productKey, count }` | Перед изменением количества |
| `afterChangeCart` | `{ productKey, count, response }` | После изменения количества |
| `beforeRemoveCart` | `{ productKey }` | Перед удалением товара |
| `afterRemoveCart` | `{ productKey, response }` | После удаления товара |
| `beforeCleanCart` | `{}` | Перед очисткой корзины |
| `afterCleanCart` | `{ response }` | После очистки корзины |

#### Заказ

| Хук | Контекст | Описание |
|-----|----------|----------|
| `beforeAddOrder` | `{ key, value }` | Перед сохранением поля |
| `afterAddOrder` | `{ key, value, response }` | После сохранения поля |
| `beforeSubmitOrder` | `{}` | Перед оформлением |
| `afterSubmitOrder` | `{ response }` | После оформления |
| `beforeCleanOrder` | `{}` | Перед очисткой |
| `afterCleanOrder` | `{ response }` | После очистки |

#### Покупатель

| Хук | Контекст | Описание |
|-----|----------|----------|
| `beforeAddCustomer` | `{ key, value }` | Перед сохранением данных |
| `afterAddCustomer` | `{ key, value, response }` | После сохранения данных |
| `beforeUpdateProfile` | `{ data }` | Перед обновлением профиля |
| `afterUpdateProfile` | `{ data, response }` | После обновления профиля |
| `beforeCreateAddress` | `{ data }` | Перед созданием адреса |
| `afterCreateAddress` | `{ data, response }` | После создания адреса |

### Примеры хуков

**Валидация перед добавлением:**

```javascript
ms3Hooks.addHook('beforeAddCart', async (ctx) => {
  if (!ctx.options.size) {
    alert('Выберите размер!')
    ctx.cancel = true
  }
})
```

**Аналитика:**

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

**Подтверждение очистки:**

```javascript
ms3Hooks.addHook('beforeCleanCart', async (ctx) => {
  if (!confirm('Очистить корзину?')) {
    ctx.cancel = true
  }
})
```

## События DOM

### Список событий

| Событие | Описание | detail |
|---------|----------|--------|
| `ms3:ready` | ms3 инициализирован | — |
| `ms3:cart:updated` | Корзина обновлена | `{ cart, status }` |

### Подписка

```javascript
document.addEventListener('ms3:ready', () => {
  console.log('MiniShop3 готов')
})

document.addEventListener('ms3:cart:updated', (e) => {
  const { cart, status } = e.detail

  // Обновить счётчик в шапке
  document.querySelector('.cart-count').textContent = status.total_count
  document.querySelector('.cart-total').textContent = status.total_cost + ' руб.'
})
```

## Использование в SPA

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

    // Подписка на внешние обновления
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

**Использование в компоненте:**

```vue
<script setup>
import { useCart } from '@/composables/useCart'

const { cart, status, loading, addToCart, removeFromCart } = useCart()
</script>

<template>
  <div class="cart">
    <div v-if="loading">Загрузка...</div>

    <div v-for="item in cart" :key="item.product_key" class="cart-item">
      <span>{{ item.pagetitle }}</span>
      <span>{{ item.count }} x {{ item.price }} руб.</span>
      <button @click="removeFromCart(item.product_key)">Удалить</button>
    </div>

    <div class="cart-total">
      Итого: {{ status.total_cost }} руб.
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

// Использование
const cartManager = new CartManager()
await cartManager.init()

cartManager.subscribe((cart, status) => {
  document.querySelector('.cart-count').textContent = status.total_count
})

document.querySelector('.add-to-cart').addEventListener('click', () => {
  cartManager.add(123, 1, { size: 'L' })
})
```

## Формат ответов

Все методы возвращают Promise с объектом:

```javascript
{
  success: true,           // Успех операции
  message: "Текст",        // Сообщение (опционально)
  data: {                  // Данные (при success: true)
    cart: [...],
    status: {...},
    render: {...}
  }
}
```

**При ошибке:**

```javascript
{
  success: false,
  message: "Описание ошибки",
  data: {
    errors: ["field1", "field2"]  // Поля с ошибками
  }
}
```

## Токены и авторизация

MiniShop3 использует токены для идентификации сессии корзины.

### Как работает

1. При первом запросе `TokenManager` получает токен с сервера
2. Токен сохраняется в `localStorage` с временем жизни
3. Токен автоматически добавляется ко всем запросам
4. При истечении токен обновляется автоматически

### Ручное управление

```javascript
// Получить текущий токен
const token = ms3.tokenManager.getToken()

// Принудительно обновить
await ms3.tokenManager.fetchNewToken()

// Удалить токен
ms3.tokenManager.removeToken()
```

## Связанные страницы

- [Frontend JavaScript](frontend-js) — полная документация включая UI
- [REST API](api) — описание серверных endpoints
- [События](events) — PHP события компонента
