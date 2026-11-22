---
title: JavaScript API
description: Headless JavaScript API для программной работы с корзиной, заказом и покупателем
---
# JavaScript API

Headless API для работы с корзиной, заказом и покупателем без привязки к DOM.

## Архитектура

Два слоя: UI для серверной разметки и headless-ядро.

```mermaid
flowchart TB
  ms3["ms3.js — точка входа, автоинициализация"]

  subgraph ui ["UI Layer — DOM-привязки для SSR"]
    CartUI[CartUI.js]
    OrderUI[OrderUI.js]
    CustomerUI[CustomerUI.js]
  end

  subgraph core ["API Core — headless ядро"]
    ApiClient[ApiClient.js]
    TokenManager[TokenManager.js]
    Hooks[hooks.js]
    CartAPI[CartAPI.js]
    OrderAPI[OrderAPI.js]
    CustomerAPI[CustomerAPI.js]
  end

  ms3 --> ui
  ui --> core
```

### API Core (Headless)

Ядро без DOM: `ApiClient.js`, `TokenManager.js`, `CartAPI.js`, `OrderAPI.js`, `CustomerAPI.js`, `hooks.js`.

### UI Layer (SSR)

Привязки к серверной разметке: `CartUI.js` (формы корзины и отрисовка), `OrderUI.js`, `CustomerUI.js`, `ProductCardUI.js`.

## Подключение

### Полное (по умолчанию)

Плагин MiniShop3 сам подключает все скрипты. Список файлов задаёт настройка `ms3_frontend_assets`.

### Минимальное (только Headless)

Для SPA (Vue, React, Svelte) подключите только ядро:

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
  actionUrl: '/assets/components/minishop3/api.php',
  tokenName: 'ms3_token'
}

// Инициализация ядра
const tokenManager = new TokenManager(config)
const apiClient = new ApiClient({ baseUrl: config.actionUrl, tokenManager })
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

При стандартном подключении:

| Объект | Описание |
| --- | --- |
| `window.ms3` | Главный объект со всеми модулями |
| `window.ms3Hooks` | Система хуков |
| `window.ms3Message` | Уведомления (если подключён UI) |
| `window.ms3Config` | Конфигурация с сервера |

::: warning `ms3Config` можно отключить настройкой
При `ms3_register_global_config = false` объект на страницу не выводится. А сниппеты `msCart` и `msOrderTotal` в любом случае печатают строку `ms3Config.render.cart.push(…)` — она регистрирует токен отрисовки и обращается к объекту без проверки. В консоли появится `ReferenceError: ms3Config is not defined`. Перерисовка корзины и виджета итогов перестанет работать.

По умолчанию настройка включена. Выключайте её, только если конфиг выводится своим кодом.
:::

```javascript
// Использование через глобальный объект
await ms3.cartAPI.add(123, 1)
await ms3.orderAPI.submit()
await ms3.customerAPI.updateProfile({ email: 'new@example.com' })
```

## CartAPI

Методы корзины.

### Методы

#### get(params)

Получить содержимое корзины. Единственный параметр — `include_thumbs`: с ним в каждой позиции появляется поле `thumb`.

```javascript
const response = await ms3.cartAPI.get()
const withThumbs = await ms3.cartAPI.get({ include_thumbs: 1 })

// response:
{
  success: true,
  message: "Данные корзины получены",
  data: {
    cart: {
      // Объект, где ключ — product_key
      "ms43ce202fd27c84c28230cc771328e37f": {
        id: 10,
        product_id: 152248,
        order_id: 7,
        product_key: "ms43ce202fd27c84c28230cc771328e37f",
        name: "Название товара",
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
    items: [
      // Тот же состав массивом, с плоскими old_price, discount_price и discount_cost
      {
        product_key: "ms43ce202fd27c84c28230cc771328e37f",
        product_id: 152248,
        name: "Название товара",
        count: 2,
        price: 148343,
        cost: 296686,
        weight: 2.508,
        options: {},
        old_price: 0,
        discount_price: 0,
        discount_cost: 0
      }
    ],
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

Новый код читает `items`: это массив, порядок позиций в нём предсказуем, а пустые `options` приходят объектом. Ключ `cart` остался для совместимости со старыми скриптами.

#### add(id, count, options, render)

Добавить товар в корзину.

| Параметр | Тип | Описание |
| --- | --- | --- |
| `id` | number | ID товара (обязательный) |
| `count` | number | Количество (по умолчанию 1) |
| `options` | object | Опции товара (цвет, размер и т.д.) |
| `render` | array | Токены для SSR (см. ниже) |

```javascript
// Простое добавление
await ms3.cartAPI.add(123)

// С количеством
await ms3.cartAPI.add(123, 3)

// С опциями
await ms3.cartAPI.add(123, 1, { color: 'red', size: 'L' })
```

:::tip Готовая разметка с сервера (SSR)
Параметр `render` возвращает готовый HTML. Токены для него регистрируют через `TokenService`; если они настроены, разметка приходит в `response.data.render`. Большинству магазинов это не нужно.
:::

**Формат ответа:**

```javascript
{
  success: true,
  message: "Товар успешно добавлен в корзину: 2",
  data: {
    cart: {...},           // Позиции корзины, ключ — product_key
    status: {...},         // Итоги
    render: {              // HTML (если запрошен)
      "ms3_a1b2c3...": "<div>...</div>"   // ключ — токен вызова сниппета
    }
  }
}
```

#### change(productKey, count, render)

Изменить количество товара.

| Параметр | Тип | Описание |
| --- | --- | --- |
| `productKey` | string | Уникальный ключ товара в корзине |
| `count` | number | Новое количество |
| `render` | array | Токены для рендеринга |

```javascript
await ms3.cartAPI.change('ms43ce202fd27c84c28230cc771328e37f', 5)
```

:::tip product_key
У каждой позиции в корзине свой `product_key`. Один товар с разными опциями даёт разные ключи.
:::

#### changeOption(productKey, options, render)

Изменить опции позиции. Новый набор опций меняет ключ позиции: сервер возвращает его в `data.last_key`. Старый ключ клиенту не возвращается — он и так известен вызывающему коду, это первый аргумент `changeOption()`.

```javascript
await ms3.cartAPI.changeOption('ms43ce202fd27c84c28230cc771328e37f', { color: 'Розовый' })
```

#### remove(productKey, render)

Удалить товар из корзины.

```javascript
await ms3.cartAPI.remove('ms43ce202fd27c84c28230cc771328e37f')
```

#### clean(render)

Очистить корзину.

```javascript
await ms3.cartAPI.clean()
```

::: warning Только API-вызов
`cartAPI.clean()` только отправляет запрос к серверу. Мини-корзина, счётчики и карточки товаров **не обновятся** сами. Для полного обновления UI вызывайте `ms3.cartUI.handleClean()`: он вызовет API, отрисует HTML и отправит событие `ms3:cart:updated`. Подробнее: [Frontend JavaScript](frontend-js#cartui).
:::

### Что возвращают методы корзины

| Метод | `data` в ответе |
| --- | --- |
| `get` | `cart`, `status`, `items` |
| `add`, `change`, `changeOption`, `remove` | `last_key`, `cart`, `status`, `items` |
| `clean` | `cart`, `status`, `items` — без `last_key` |

`last_key` — ключ позиции, которой коснулась операция; у `changeOption` это новый ключ. Старый ключ в ответе не приходит: он доступен только PHP-плагину на `msOnChangeOptionInCart`, где лежит в `old_product_key`. Когда в запросе передан `render`, к ключам ответа добавляется `render` с готовой разметкой.

## OrderAPI

Методы заказа.

### Методы

#### get()

Текущий заказ (данные из сессии).

```javascript
const response = await ms3.orderAPI.get()

// response.data.order (фрагмент):
{
  delivery_id: 1,
  payment_id: 2,
  order_comment: "Позвонить перед доставкой",
  address_first_name: "Иван",
  address_last_name: "Иванов",
  address_email: "ivan@example.com",
  address_phone: "+79991234567",
  address_comment: ""
}
```

#### add(key, value)

Сохранить поле заказа.

```javascript
await ms3.orderAPI.add('first_name', 'Иван')
await ms3.orderAPI.add('email', 'ivan@example.com')
await ms3.orderAPI.add('phone', '+79991234567')
await ms3.orderAPI.add('delivery_id', 1)
await ms3.orderAPI.add('payment_id', 2)
await ms3.orderAPI.add('order_comment', 'Позвонить перед доставкой')
// комментарий к адресу: await ms3.orderAPI.add('comment', '…')
```

:::info Автосохранение
Каждый вызов `add()` сохраняет значение на сервере. После перезагрузки страницы данные на месте.
:::

#### remove(key)

Удалить поле заказа.

```javascript
await ms3.orderAPI.remove('order_comment')
```

#### clean()

Очистить все данные заказа.

```javascript
await ms3.orderAPI.clean()
```

#### submit()

Оформить заказ.

```javascript
const response = await ms3.orderAPI.submit()

if (response.success) {
  // Штатная оплата DefaultPayment кладёт payment_link (msorder = номер),
  // order_id и order_num. Если в ответе оплаты нет data.redirect,
  // submit дописывает redirect с msorder = uuid заказа.
  // response.data:
  {
    payment_link: "https://shop.example/thanks?msorder=251015-1",
    order_id: 42,
    order_num: "251015-1",
    redirect: "/shop/order-success?msorder=8f3c-uuid"
  }

  window.location.href = response.data.redirect
} else {
  // Обязательные поля: data — массив имён, лексикон ms3_order_err_requires
  {
    success: false,
    message: "Не заполнены обязательные поля",
    data: ["first_name", "email", "phone"]
  }
}
```

#### getCost()

Получить расчёт стоимости заказа.

```javascript
const response = await ms3.orderAPI.getCost()

// response:
{
  success: true,
  message: "Стоимость рассчитана",
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

### Что возвращают методы заказа

| Метод | `data` в ответе |
| --- | --- |
| `get` | `order` — черновик целиком |
| `add` | только записанное поле: `{ "first_name": "Иван" }` |
| `remove` | `removed` — имя удалённого ключа |
| `clean` | пусто |
| `submit` | `order_id`, `order_num`, `redirect`, у штатной оплаты ещё `payment_link` |
| `getCost` | суммы заказа вместе с итогами корзины |

У `add` поле `message` приходит пустым: подтверждения записи нет, судите по `success`.

## CustomerAPI

Методы авторизованного покупателя.

:::warning Требуется авторизация
Большинство методов CustomerAPI требует авторизации. Исключения в этом классе: `login` и `register`. Сброса пароля в `CustomerAPI` нет: `AuthUI` показывает, что на сайте это действие недоступно. Серверные маршруты при этом есть: `POST /api/v1/customer/forgot-password` и `POST /api/v1/customer/reset-password`. Данные заказа гостя сохраняются через `OrderAPI.add()`.
:::

### Методы

#### updateProfile(data)

Обновить профиль авторизованного пользователя.

```javascript
await ms3.customerAPI.updateProfile({
  first_name: 'Иван',
  last_name: 'Иванов',
  email: 'ivan@example.com',
  phone: '+79991234567'
})
```

#### createAddress(data)

Создать новый адрес.

```javascript
await ms3.customerAPI.createAddress({
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
await ms3.customerAPI.updateAddress(5, {
  city: 'Санкт-Петербург',
  street: 'Невский проспект'
})
```

#### deleteAddress(id)

Удалить адрес.

```javascript
await ms3.customerAPI.deleteAddress(5)
```

#### add(key, value)

Записать одно поле покупателя. `POST /api/v1/customer/add`.

```javascript
await ms3.customerAPI.add('phone', '+7 900 123-45-67')
```

#### changeAddress(key, value)

Сменить адрес в форме заказа. Контекст хуков: `{ key, value }`, после ответа ещё `response`.

```javascript
await ms3.customerAPI.changeAddress('address_hash', 'addr_123')
```

#### login(email, password)

`POST /api/v1/customer/login`. Два аргумента, не объект.

```javascript
await ms3.customerAPI.login('ivan@example.com', 'secret')
```

#### register(data)

`POST /api/v1/customer/register`.

#### setDefaultAddress(id)

`PUT /api/v1/customer/addresses/{id}/set-default`.

#### getOrders(params)

`GET /api/v1/customer/orders`. Параметры запроса: `limit`, `offset`, `status`.

#### getOrder(orderId)

`GET /api/v1/customer/orders/{orderId}`.

#### cancelOrder(orderId)

`POST /api/v1/customer/orders/{orderId}/cancel`.

#### resendVerificationEmail()

`POST /api/v1/customer/email/resend-verification`.

## Система хуков {#hooks}

Хуки расширяют поведение, не трогая исходный код.

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
| --- | --- | --- |
| `beforeAddCart` | `{ id, count, options }` | Перед добавлением товара |
| `afterAddCart` | `{ id, count, options, response }` | После добавления товара |
| `beforeChangeCart` | `{ productKey, count }` | Перед изменением количества |
| `afterChangeCart` | `{ productKey, count, response }` | После изменения количества |
| `beforeRemoveCart` | `{ productKey }` | Перед удалением товара |
| `afterRemoveCart` | `{ productKey, response }` | После удаления товара |
| `beforeCleanCart` | `{}` | Перед очисткой корзины |
| `afterCleanCart` | `{ response }` | После очистки корзины |
| `beforeChangeOptionCart` | `{ productKey, options }` | Перед сменой опции позиции |
| `afterChangeOptionCart` | `{ productKey, options, response }` | После смены опции |
| `beforeQuantityChange` | `{ productKey, count, form }` | Перед изменением количества кнопками «+» и «−». Единственный хук корзины, у которого правка контекста влияет на запрос: `count` читается обратно, так что обработчик может не только отменить операцию через `cancel`, но и подменить количество |
| `afterQuantityChange` | `{ productKey, count, response, form }` | После изменения количества |

#### Заказ

| Хук | Контекст | Описание |
| --- | --- | --- |
| `beforeAddOrder` | `{ key, value }` | Перед сохранением поля |
| `afterAddOrder` | `{ key, value, response }` | После сохранения поля |
| `beforeSubmitOrder` | `{}` | Перед оформлением |
| `afterSubmitOrder` | `{ response }` | После оформления |
| `beforeCleanOrder` | `{}` | Перед очисткой |
| `afterCleanOrder` | `{ response }` | После очистки |
| `afterUpdateOrderCosts` | `{ cost, cart_cost, delivery_cost }` | После пересчёта стоимости заказа |

#### Покупатель

| Хук | Контекст | Описание |
| --- | --- | --- |
| `beforeAddCustomer` | `{ key, value }` | Перед сохранением данных |
| `afterAddCustomer` | `{ key, value, response }` | После сохранения данных |
| `beforeUpdateProfile` | `{ data }` | Перед обновлением профиля |
| `afterUpdateProfile` | `{ data, response }` | После обновления профиля |
| `beforeCreateAddress` | `{ data }` | Перед созданием адреса |
| `afterCreateAddress` | `{ data, response }` | После создания адреса |
| `beforeUpdateAddress` | `{ addressId, data }` | Перед правкой адреса |
| `afterUpdateAddress` | `{ addressId, data, response }` | После правки адреса |
| `beforeDeleteAddress` | `{ addressId }` | Перед удалением адреса |
| `afterDeleteAddress` | `{ addressId, response }` | После удаления адреса |
| `beforeSetDefaultAddress` | `{ addressId }` | Перед выбором адреса по умолчанию |
| `afterSetDefaultAddress` | `{ addressId, response }` | После выбора адреса по умолчанию |
| `beforeChangeAddressCustomer` | `{ key, value }` | Перед сменой адреса в форме заказа |
| `afterChangeAddressCustomer` | `{ key, value, response }` | После смены адреса в форме заказа |
| `beforeCancelOrder` | `{ orderId }` | Перед отменой заказа покупателем |
| `afterCancelOrder` | `{ orderId, response }` | После отмены заказа |
| `beforeResendVerificationEmail` | `{ button }` | Перед повторной отправкой письма с подтверждением |
| `afterResendVerificationEmail` | `{ button, response }` | После отправки письма |

#### Вход и регистрация

| Хук | Контекст | Описание |
| --- | --- | --- |
| `beforeLogin` | `{ email }` | Перед входом |
| `afterLogin` | `{ email, response }` | После входа |
| `beforeRegister` | `{ email }` | Перед регистрацией |
| `afterRegister` | `{ email, response }` | После регистрации |

#### Любая форма

| Хук | Контекст | Описание |
| --- | --- | --- |
| `beforeFormSubmit` | `{ entity, method, formData }` | Перед отправкой любой формы MiniShop3 |
| `afterFormSubmit` | `{ entity, method, formData }` | После отправки |

Эта пара срабатывает на все формы (корзина, заказ, покупатель) и получает `formData` целиком. Если нужны введённые значения, подписывайтесь сюда. Специализированные хуки вроде `beforeSubmitOrder` данных формы не получают.

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
| --- | --- | --- |
| `ms3:ready` | ms3 инициализирован | — |
| `ms3:cart:updated` | Корзина обновлена | `{ cart, items, status }`, при перерисовке добавляется `render`. Иногда приходит пустым, см. ниже |

### Подписка

```javascript
document.addEventListener('ms3:ready', () => {
  console.log('MiniShop3 готов')
})

document.addEventListener('ms3:cart:updated', (e) => {
  const { cart, items, status } = e.detail ?? {}
  if (!status) {
    return
  }

  // Обновить счётчик в шапке
  document.querySelector('.cart-count').textContent = status.total_count
  document.querySelector('.cart-total').textContent = status.total_cost + ' руб.'
})
```

::: warning Событие приходит и без данных
Очистка формы заказа шлёт его пустым: `detail` будет `null`. Форма очистки есть в поставляемом чанке `ms3_order.tpl`, так что случай не теоретический. Обработчик, который сразу читает поля, упадёт с `TypeError` ([разбор](https://github.com/modx-pro/MiniShop3/issues/802)).

Проверяйте `detail` перед обращением к полям. Во всех примерах ниже это сделано.
:::

## Использование в SPA

### Vue 3

```javascript
// composables/useCart.js
import { ref, onMounted } from 'vue'

export function useCart() {
  const cart = ref([])
  const status = ref({ total_count: 0, total_cost: 0 })
  const loading = ref(false)

  // Общий приём: вызвать метод cartAPI и переложить ответ в cart и status
  function apply(response) {
    if (response.success) {
      cart.value = response.data.cart
      status.value = response.data.status
    }
    return response
  }

  async function loadCart() {
    loading.value = true
    apply(await ms3.cartAPI.get())
    loading.value = false
  }

  async function addToCart(id, count = 1, options = {}) {
    loading.value = true
    const response = apply(await ms3.cartAPI.add(id, count, options))
    loading.value = false
    return response
  }

  // removeFromCart(productKey) → cartAPI.remove()
  // changeQuantity(productKey, count) → cartAPI.change()
  // clearCart() → cartAPI.clean(); ответ несёт пустую корзину, items: [] и
  // обнулённый status — обрабатывается тем же apply(response), что и остальные

  onMounted(() => {
    loadCart()

    // Подписка на внешние обновления
    document.addEventListener('ms3:cart:updated', (e) => {
      if (!e.detail) {
        return
      }
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
      <span>{{ item.name }}</span>
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
      if (!e.detail) {
        return
      }
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
      if (!e.detail) {
        return
      }
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

Все методы возвращают Promise:

```javascript
{
  success: true,           // Успех операции
  message: "Текст",        // Сообщение (опционально)
  data: {                  // Данные (при success: true)
    cart: {...},
    status: {...},
    render: {...}
  }
}
```

**При ошибке** ключи `code`, `errors` и `error_code` есть всегда, даже когда `errors` пустой:

```javascript
{
  success: false,
  message: "Описание ошибки",
  code: 400,
  errors: null,
  error_code: "bad_request"
}
```

Форм ошибки три, и различаются они тем, где лежит разбор по полям.

| Когда | Как выглядит |
| --- | --- |
| Битый запрос, нет авторизации, не найдено | `errors: null`, `data` нет |
| Валидация с разбором по полям | `code: 422`, `error_code: validation_failed`, `errors` — карта «поле → сообщение»; в `data` приходит текущий черновик |
| Правило магазина | `code: 400`, `error_code: business_rule`, в `data` массив имён полей, например `["delivery_id"]` |

То есть `errors` — это всегда карта или `null`, а массив имён полей приходит в `data`, не в `errors`.

## Токены и авторизация

```mermaid
flowchart LR
  first[Первый запрос] --> get["token/get или корзина"]
  get --> cookie["httpOnly cookie ms3_token"]
  cookie --> next["Запросы с credentials same-origin"]
  next --> rotate["Ротация на login и token/refresh"]
```

Токен идентифицирует сессию корзины.

### Как работает

1. При первом запросе клиент получает токен: `GET /api/v1/customer/token/get` либо первое обращение к корзине.
2. С 1.6 в браузере токен живёт в httpOnly cookie `ms3_token`, а не в `localStorage`.
3. Клиент шлёт запросы с `credentials: 'same-origin'`, и cookie уходит сама. Для обращений с другого домена есть `Authorization: Bearer`.
4. При входе и на `token/refresh` токен меняется.

Подробнее: [Авторизация Web API](/components/minishop3/development/web-api/auth), [Frontend JavaScript](/components/minishop3/development/frontend-js).

### Ручное управление

```javascript
// Получить токен с сервера, если его ещё нет
await ms3.tokenManager.ensureToken()

// Запросить новый принудительно
await ms3.tokenManager.fetchNewToken()
```

Оба метода обращаются к `/api/v1/customer/token/get`. Сервер ставит cookie в ответе.

::: warning Прочитать токен из браузера нельзя
`getToken()` и `getTokenData()` всегда возвращают `null`, а `setToken()` ничего не делает. Это не ошибка: с версии 1.6 токен хранится в httpOnly cookie, и JavaScript к ней доступа не имеет. В этом смысл такой куки.

`removeToken()` тоже не удаляет текущий токен: он лишь подчищает остатки в `localStorage` от прежних версий. Сбросить сессию корзины из браузера нельзя, это делает сервер.
:::

## Связанные страницы

- [Frontend JavaScript](frontend-js) — UI-слой
- [REST API](api) — серверные адреса и форматы ответов
- [События](events) — PHP события компонента
