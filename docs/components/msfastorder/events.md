---
title: События JavaScript
description: EventBus и DOM-события msfo:* с примерами
---

# События JavaScript

Компонент использует внутренний **EventBus** (`msfo.js`) и дублирует каждое событие в DOM как `CustomEvent` с префиксом `msfo:`.

```javascript
// detail совпадает с аргументом EventBus
document.addEventListener('msfo:order:success', function (e) {
  console.log(e.detail);
});

// или через API
msFastOrder.on('order:success', function (data) {
  console.log(data);
});
```

Полный контекст фронтенда: [Подключение на сайте](/components/msfastorder/frontend).

## Порядок при успешном заказе

```mermaid
flowchart TB
  A[modal:beforeLoad] --> B[modal:beforeOpen]
  B --> C[modal:open]
  C --> D[modal:loaded]
  D --> E[form:submit]
  E --> F{order/create}
  F -->|success| G[order:success]
  F -->|error| H[order:error]
  G --> I[renderSuccess]
  I --> J{successRedirect?}
  J -->|да + payment_link| K[редирект на оплату ~2 с]
  J -->|да, без payment_link| L[редирект successRedirect]
  J -->|нет| M[остаться на экране успеха]
  G --> O[ms3:cart:updated]
  C --> N[modal:close]
```

После `order:success` в режиме MS вызывается `MiniShop3Integration.reinitCart()` и событие `ms3:cart:updated`.

## Справочник событий

| EventBus | DOM | Когда |
|----------|-----|-------|
| `modal:beforeLoad` | `msfo:modal:beforeLoad` | Начало `openOrderModal`, до `product/get` |
| `modal:beforeOpen` | `msfo:modal:beforeOpen` | Перед вставкой контента в модалку |
| `modal:open` | `msfo:modal:open` | Модалка открыта |
| `modal:loaded` | `msfo:modal:loaded` | Форма в DOM, `FormHandler` создан |
| `form:submit` | `msfo:form:submit` | Валидация пройдена, перед `order/create` |
| `order:success` | `msfo:order:success` | `success: true` от connector |
| `order:error` | `msfo:order:error` | Ошибка валидации или создания |
| `modal:beforeClose` | `msfo:modal:beforeClose` | Перед закрытием |
| `modal:close` | `msfo:modal:close` | После закрытия |

## Payload по событиям

### `modal:beforeLoad`

```javascript
{ productId: 123 }
```

### `modal:beforeOpen` / `modal:open`

```javascript
{
  content: '<form class="msfo-form">...</form>',
  options: { title: 'Быстрый заказ' }
}
```

### `modal:loaded`

```javascript
{
  productId: 123,
  product: {
    id: 123,
    pagetitle: '...',
    price: 40461,
    thumb: '...',
    variants: []
  },
  form: document.querySelector('.msfo-form') // или null, если форма не нашлась за ~3 с
}
```

Типичное использование — доработка формы после загрузки:

```javascript
document.addEventListener('msfo:modal:loaded', function (e) {
  const form = document.querySelector('.msfo-form');
  if (!form) return;
  const city = form.querySelector('[name="city"]');
  if (city) city.value = 'Москва';
});
```

### `form:submit`

```javascript
{
  data: {
    product_id: '123',
    count: '2',
    options: '{"variant_id":42}',
    receiver: 'Иван',
    phone: '+7 (999) 123-45-67',
    email: '',
    city: '',
    comment: ''
  }
}
```

Можно дописать поля до отправки (UTM, метки):

```javascript
document.addEventListener('msfo:form:submit', function (e) {
  e.detail.data.utm_source = new URLSearchParams(location.search).get('utm_source') || '';
});
```

Изменения в `e.detail.data` после этого события уходят в `order/create`: объект передаётся в `sendRequest`.

### `order:success`

Тело ответа connector (как в [AJAX API](/components/msfastorder/api)):

```javascript
{
  success: true,
  message: '...',
  data: {
    order_id: 15,
    order_num: '00015',
    method: 'MS',
    total: 80922,
    payment_link: 'https://...'
  }
}
```

`payment_link` — из MS3 (`msfastorder_payment_id`). ЮKassa: [Интеграция](/components/msfastorder/integration#оплата-через-юkassa-msp3yookassa).

Редирект на оплату встроен в `msfo.js` только если **`successRedirect` непустой** и есть `payment_link`:

```javascript
// Дублирует логику компонента при необходимости своего тайминга:
document.addEventListener('msfo:order:success', function (e) {
  const link = e.detail.data && e.detail.data.payment_link;
  const redirect = window.msfoConfig && window.msfoConfig.successRedirect;
  if (link && redirect) {
    window.location.href = link;
  }
});
```

### `order:error`

```javascript
{
  success: false,
  message: 'Validation failed',
  errors: {
    receiver: 'Поле "ФИО" обязательно для заполнения',
    phone: '...'
  },
  status: 429  // опционально, при rate limit
}
```

## Редирект после заказа

Встроенно (`msfastorder_success_redirect` → `msfoConfig.successRedirect`):

- `successRedirect` **задан** и есть `payment_link` → через ~2 с переход на оплату;
- `successRedirect` **задан**, `payment_link` пуст → переход на `successRedirect`;
- `successRedirect` **пуст** → остаётесь на экране успеха в модалке (кнопка «Оплатить» при непустом `payment_link`).

Свой сценарий:

```javascript
document.addEventListener('msfo:order:success', function (e) {
  if (!e.detail.success) return;
  setTimeout(function () {
    window.location.href = '/thank-you/';
  }, 1500);
});
```

## Аналитика

### Facebook Pixel

```javascript
document.addEventListener('msfo:order:success', function (e) {
  if (typeof fbq !== 'undefined' && e.detail.data) {
    fbq('track', 'Purchase', {
      value: e.detail.data.total,
      currency: 'RUB'
    });
  }
});
```

### Яндекс.Метрика / цели

```javascript
document.addEventListener('msfo:order:success', function (e) {
  if (typeof ym !== 'undefined' && e.detail.data) {
    ym(XXXXXX, 'reachGoal', 'fast_order', { order_id: e.detail.data.order_id });
  }
});
```

### VK Pixel

```javascript
document.addEventListener('msfo:order:success', function (e) {
  if (typeof VK !== 'undefined' && e.detail.data) {
    VK.Goal('purchase', { value: e.detail.data.total });
  }
});
```
