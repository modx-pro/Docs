---
title: REST API
---
# REST API

MiniShop3 предоставляет REST API для интеграции с фронтендом и внешними системами.

## Точки входа

| Назначение | URL | Авторизация |
|------------|-----|-------------|
| Web API (фронтенд) | `/assets/components/minishop3/api.php` | Токен MS3TOKEN |
| Manager API (админка) | `/assets/components/minishop3/connector.php` | Сессия MODX |

Эта документация описывает **Web API** для фронтенда.

## Базовый URL

```
/assets/components/minishop3/api.php?route=/api/v1/{endpoint}
```

Все запросы передают маршрут через параметр `route`.

## Авторизация

### Получение токена

Перед работой с корзиной и заказами необходимо получить токен клиента:

```http
GET /api/v1/customer/token/get
```

**Ответ:**

```json
{
  "success": true,
  "data": {
    "token": "abc123def456..."
  },
  "message": ""
}
```

### Использование токена

Токен передаётся в каждом запросе через параметр `ms3_token`:

```http
POST /api/v1/cart/add?ms3_token=abc123def456...
Content-Type: application/json

{
  "id": 123,
  "count": 1
}
```

Или через cookie `MS3TOKEN` (автоматически устанавливается JavaScript библиотекой).

## Формат ответов

Все ответы имеют единый формат:

**Успех:**
```json
{
  "success": true,
  "data": { ... },
  "message": "Сообщение об успехе"
}
```

**Ошибка:**
```json
{
  "success": false,
  "message": "Описание ошибки",
  "code": 400
}
```

## Корзина

### Добавить товар

```http
POST /api/v1/cart/add
```

**Параметры:**

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `id` | int | Да | ID товара |
| `count` | int | Нет | Количество (по умолчанию 1) |
| `options` | object | Нет | Опции товара (цвет, размер и т.д.) |
| `render` | array | Нет | Токены сниппетов для SSR |

**Пример запроса:**

```javascript
fetch('/assets/components/minishop3/api.php?route=/api/v1/cart/add&ms3_token=' + token, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        id: 123,
        count: 2,
        options: {
            color: 'Красный',
            size: 'XL'
        }
    })
})
```

**Ответ:**

```json
{
  "success": true,
  "data": {
    "last_key": "123_a1b2c3d4",
    "cart": [
      {
        "key": "123_a1b2c3d4",
        "id": 123,
        "count": 2,
        "price": 1500,
        "cost": 3000,
        "weight": 0.5,
        "options": {"color": "Красный", "size": "XL"},
        "name": "Товар",
        "thumb": "/assets/images/product.jpg"
      }
    ],
    "status": {
      "total_count": 2,
      "total_cost": 3000,
      "total_weight": 1.0,
      "total_positions": 1
    }
  },
  "message": "Товар добавлен в корзину"
}
```

### Изменить количество

```http
POST /api/v1/cart/change
```

**Параметры:**

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `product_key` | string | Да | Уникальный ключ товара в корзине |
| `count` | int | Да | Новое количество |

**Пример:**

```json
{
  "product_key": "123_a1b2c3d4",
  "count": 5
}
```

### Удалить товар

```http
POST /api/v1/cart/remove
```

**Параметры:**

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `product_key` | string | Да | Уникальный ключ товара |

### Получить корзину

```http
GET /api/v1/cart/get
```

**Ответ:**

```json
{
  "success": true,
  "data": {
    "cart": [...],
    "status": {
      "total_count": 5,
      "total_cost": 7500,
      "total_weight": 2.5,
      "total_positions": 3
    }
  }
}
```

### Очистить корзину

```http
POST /api/v1/cart/clean
```

## Заказ

### Получить черновик заказа

```http
GET /api/v1/order/get
```

**Ответ:**

```json
{
  "success": true,
  "data": {
    "order": {
      "email": "user@example.com",
      "phone": "+7 999 123-45-67",
      "first_name": "Иван",
      "delivery": 1,
      "payment": 1,
      "address_city": "Москва",
      "address_street": "Ленина",
      "comment": ""
    },
    "deliveries": [...],
    "payments": [...]
  }
}
```

### Добавить/обновить поле

```http
POST /api/v1/order/add
```

**Параметры:**

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `key` | string | Да | Имя поля |
| `value` | mixed | Да | Значение |

**Доступные поля:**

| Поле | Описание |
|------|----------|
| `email` | Email клиента |
| `phone` | Телефон |
| `first_name` | Имя |
| `last_name` | Фамилия |
| `delivery` | ID способа доставки |
| `payment` | ID способа оплаты |
| `comment` | Комментарий к заказу |
| `city` | Город |
| `street` | Улица |
| `building` | Дом |
| `room` | Квартира/офис |
| `index` | Индекс |
| `address_hash` | Хеш сохранённого адреса |

**Пример:**

```json
{
  "key": "email",
  "value": "user@example.com"
}
```

### Установить несколько полей

```http
POST /api/v1/order/set
```

**Параметры:**

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `fields` | object | Да | Объект с полями |

**Пример:**

```json
{
  "fields": {
    "email": "user@example.com",
    "phone": "+79991234567",
    "first_name": "Иван",
    "delivery": 1
  }
}
```

### Удалить поле

```http
POST /api/v1/order/remove
```

**Параметры:**

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `key` | string | Да | Имя поля |

### Оформить заказ

```http
POST /api/v1/order/submit
```

**Ответ (успех):**

```json
{
  "success": true,
  "data": {
    "order_id": 15,
    "order_num": "24/12-15",
    "redirect_url": "/thank-you?msorder=15"
  },
  "message": "Заказ успешно оформлен"
}
```

**Ответ (ошибка валидации):**

```json
{
  "success": false,
  "message": "Заполните обязательные поля",
  "data": {
    "errors": {
      "email": "Укажите email",
      "phone": "Укажите телефон"
    }
  },
  "code": 400
}
```

### Очистить заказ

```http
POST /api/v1/order/clean
```

## Стоимость

### Полная стоимость

```http
GET /api/v1/order/cost
```

**Ответ:**

```json
{
  "success": true,
  "data": {
    "cart_cost": 5000,
    "delivery_cost": 300,
    "payment_cost": 0,
    "total_cost": 5300,
    "discount": 0
  }
}
```

### Стоимость корзины

```http
GET /api/v1/order/cost/cart
```

### Стоимость доставки

```http
GET /api/v1/order/cost/delivery
```

### Комиссия оплаты

```http
GET /api/v1/order/cost/payment
```

## Адреса доставки

### Установить сохранённый адрес

```http
POST /api/v1/order/address/set
```

**Параметры:**

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `address_hash` | string | Да | MD5 хеш адреса |

### Очистить адрес

```http
POST /api/v1/order/address/clean
```

## Валидация доставки

### Правила валидации

```http
GET /api/v1/order/delivery/validation-rules
```

**Ответ:**

```json
{
  "success": true,
  "data": {
    "city": {"required": true, "min": 2},
    "street": {"required": true},
    "building": {"required": true},
    "phone": {"required": true, "pattern": "^\\+?[0-9]+$"}
  }
}
```

### Обязательные поля

```http
GET /api/v1/order/delivery/required-fields
```

**Ответ:**

```json
{
  "success": true,
  "data": ["city", "street", "building", "phone"]
}
```

## Клиент

### Регистрация

```http
POST /api/v1/customer/register
```

**Параметры:**

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `email` | string | Да | Email |
| `password` | string | Да | Пароль |
| `first_name` | string | Нет | Имя |
| `last_name` | string | Нет | Фамилия |
| `phone` | string | Нет | Телефон |
| `privacy_accepted` | bool | Зависит от настроек | Согласие на обработку данных |

**Ответ:**

```json
{
  "success": true,
  "data": {
    "customer_id": 5,
    "token": "new_token_abc123"
  },
  "message": "Регистрация успешна"
}
```

### Авторизация

```http
POST /api/v1/customer/login
```

**Параметры:**

| Параметр | Тип | Обязательный | Описание |
|----------|-----|--------------|----------|
| `email` | string | Да | Email |
| `password` | string | Да | Пароль |

**Ответ:**

```json
{
  "success": true,
  "data": {
    "customer_id": 5,
    "token": "session_token_xyz789",
    "customer": {
      "id": 5,
      "email": "user@example.com",
      "first_name": "Иван"
    }
  }
}
```

### Обновить профиль

```http
PUT /api/v1/customer/profile
```

**Требует авторизации** (токен авторизованного клиента)

**Параметры:**

| Параметр | Тип | Описание |
|----------|-----|----------|
| `first_name` | string | Имя |
| `last_name` | string | Фамилия |
| `phone` | string | Телефон |

### Верификация email

```http
GET /api/v1/customer/email/verify?token=verification_token
```

### Повторная отправка верификации

```http
POST /api/v1/customer/email/resend-verification
```

**Требует авторизации**

## Адреса клиента

Все endpoints требуют авторизации.

### Список адресов

```http
GET /api/v1/customer/addresses
```

**Ответ:**

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "hash": "abc123...",
      "city": "Москва",
      "street": "Ленина",
      "building": "10",
      "room": "5",
      "is_default": true
    }
  ]
}
```

### Получить адрес

```http
GET /api/v1/customer/addresses/{id}
```

### Создать адрес

```http
POST /api/v1/customer/addresses
```

**Параметры:**

| Параметр | Тип | Описание |
|----------|-----|----------|
| `city` | string | Город |
| `street` | string | Улица |
| `building` | string | Дом |
| `room` | string | Квартира/офис |
| `index` | string | Индекс |
| `country` | string | Страна |
| `region` | string | Регион |
| `is_default` | bool | Адрес по умолчанию |

### Обновить адрес

```http
PUT /api/v1/customer/addresses/{id}
```

### Удалить адрес

```http
DELETE /api/v1/customer/addresses/{id}
```

### Установить адрес по умолчанию

```http
PUT /api/v1/customer/addresses/{id}/set-default
```

## Health Check

```http
GET /api/v1/health
```

**Ответ:**

```json
{
  "success": true,
  "data": {
    "status": "ok",
    "version": "1.0.0",
    "timestamp": 1703952000,
    "api": "web"
  }
}
```

## Middleware

### CORS

Настраивается через системную настройку `ms3_cors_allowed_origins`:
- `*` — разрешить все домены
- `https://example.com,https://shop.example.com` — список доменов

### Rate Limiting

Защита от DDoS через системные настройки:
- `ms3_rate_limit_max_attempts` — максимум запросов (по умолчанию 60)
- `ms3_rate_limit_decay_seconds` — период в секундах (по умолчанию 60)

При превышении лимита возвращается:

```json
{
  "success": false,
  "message": "Too many requests",
  "code": 429
}
```

## SSR (Server-Side Rendering)

API поддерживает серверный рендеринг HTML для обновления частей страницы.

### Использование

Передайте массив токенов сниппетов в параметре `render`:

```javascript
fetch('/api/v1/cart/add?ms3_token=' + token, {
    method: 'POST',
    body: JSON.stringify({
        id: 123,
        render: ['ms3_abc123...', 'ms3_def456...']
    })
})
```

**Ответ включает HTML:**

```json
{
  "success": true,
  "data": {
    "cart": [...],
    "status": {...},
    "render": {
      "ms3_abc123...": "<div class=\"cart\">...</div>",
      "ms3_def456...": "<span class=\"count\">5</span>"
    }
  }
}
```

### Регистрация сниппетов

Токены генерируются автоматически при вызове сниппетов с параметром `selector`:

```fenom
{'msCart' | snippet : [
    'tpl' => 'tpl.msCart',
    'selector' => '#cart-container'
]}
```

## Кастомные роуты

Для добавления собственных endpoints создайте файл:

```
core/config/ms3_routes_web.custom.php
```

**Пример:**

```php
<?php
use MiniShop3\Router\Response;

$router->group('/api/v1', function($router) use ($modx) {

    $router->get('/custom/endpoint', function($params) use ($modx) {
        return Response::success(['custom' => 'data']);
    });

});
```

Кастомные роуты загружаются после системных и могут их переопределять.

## JavaScript клиент

MiniShop3 предоставляет JavaScript библиотеку для работы с API:

```javascript
// Добавить в корзину
ms3.cart.add(123, 2, {color: 'red'});

// Оформить заказ
ms3.order.submit();

// Обработка ответов через hooks
ms3.hooks.add('afterAddToCart', ({response}) => {
    console.log('Товар добавлен', response.data);
});
```

Подробнее в разделе [Скрипты и стили](scripts-and-styles).

## Коды ошибок

| Код | Описание |
|-----|----------|
| 400 | Неверный запрос (отсутствуют параметры, ошибка валидации) |
| 401 | Требуется токен авторизации |
| 403 | Доступ запрещён |
| 404 | Ресурс не найден |
| 429 | Превышен лимит запросов |
| 500 | Внутренняя ошибка сервера |

## Отладка

Включите режим отладки через настройку `ms3_api_debug`:

```json
{
  "success": false,
  "message": "Internal server error",
  "code": 500,
  "debug": {
    "exception": "Exception",
    "message": "Detailed error message",
    "file": "/path/to/file.php",
    "line": 123
  }
}
```

::: warning Безопасность
Не включайте режим отладки на продакшене — он раскрывает внутреннюю структуру приложения.
:::
