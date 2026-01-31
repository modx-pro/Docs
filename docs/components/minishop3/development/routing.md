---
title: API Router
---
# API Router

MiniShop3 использует библиотеку [FastRoute](https://github.com/nikic/FastRoute) для маршрутизации API запросов. Компонент предоставляет два отдельных API с различными механизмами авторизации.

## Архитектура

### Два типа API

| Параметр | Manager API | Web API |
|----------|-------------|---------|
| **Префикс** | `/api/mgr/*` | `/api/v1/*` |
| **Назначение** | Административная панель MODX | Фронтенд магазина |
| **Entry point** | `connector.php` | `assets/.../api.php` |
| **Авторизация** | MODX сессии + HTTP_MODAUTH | Токены MS3TOKEN |
| **Middleware** | AuthMiddleware, PermissionMiddleware | TokenMiddleware, CorsMiddleware, RateLimitMiddleware |
| **Файл роутов** | `config/routes/manager.php` | `config/routes/web.php` |

### Структура файлов

```
core/components/minishop3/
├── config/
│   ├── routes/
│   │   ├── manager.php                    # Системные роуты Manager API
│   │   └── web.php                        # Системные роуты Web API
│   └── routes_manager.custom.example.php  # Пример кастомных роутов

core/config/
├── ms3_routes_manager.custom.php          # Кастомные Manager роуты
└── ms3_routes_web.custom.php              # Кастомные Web роуты
```

## Базовое использование

### Определение роутов

```php
use MiniShop3\Router\Response;

// Простой GET роут
$router->get('/api/mgr/my-endpoint', function($params) use ($modx) {
    return Response::success(['data' => 'value']);
});

// POST роут
$router->post('/api/mgr/items', function($params) use ($modx) {
    $data = json_decode(file_get_contents('php://input'), true);
    return Response::success(['created' => true]);
});

// PUT роут
$router->put('/api/mgr/items/{id}', function($params) use ($modx) {
    $id = $params['id'];
    return Response::success(['updated' => $id]);
});

// DELETE роут
$router->delete('/api/mgr/items/{id}', function($params) use ($modx) {
    return Response::success(['deleted' => true]);
});
```

### Параметры URL

```php
// Один параметр
$router->get('/api/mgr/products/{id}', function($params) use ($modx) {
    $id = $params['id'];  // Значение из URL
    return Response::success(['product_id' => $id]);
});

// Несколько параметров
$router->get('/api/mgr/orders/{order_id}/products/{product_id}', function($params) use ($modx) {
    $orderId = $params['order_id'];
    $productId = $params['product_id'];
    return Response::success([
        'order_id' => $orderId,
        'product_id' => $productId
    ]);
});
```

### Группировка роутов

```php
use MiniShop3\Router\Middleware\AuthMiddleware;
use MiniShop3\Router\Middleware\PermissionMiddleware;

$router->group('/api/mgr/catalog', function($router) use ($modx) {

    // GET /api/mgr/catalog/products
    $router->get('/products', function($params) use ($modx) {
        return Response::success(['products' => []]);
    });

    // GET /api/mgr/catalog/categories
    $router->get('/categories', function($params) use ($modx) {
        return Response::success(['categories' => []]);
    });

    // POST /api/mgr/catalog/products
    $router->post('/products', function($params) use ($modx) {
        return Response::success(['created' => true]);
    });

}, [
    // Middleware для всей группы
    new AuthMiddleware($modx, 'mgr'),
    new PermissionMiddleware($modx, 'msproduct_save')
]);
```

### Контроллеры

Для сложной логики рекомендуется использовать контроллеры:

```php
$router->group('/api/mgr/orders', function($router) use ($modx) {

    $router->get('', function($params) use ($modx) {
        $controller = new \MiniShop3\Controllers\Api\Manager\OrdersController($modx);
        return $controller->getList($params);
    });

    $router->get('/{id}', function($params) use ($modx) {
        $controller = new \MiniShop3\Controllers\Api\Manager\OrdersController($modx);
        return $controller->get($params);
    });

    $router->put('/{id}', function($params) use ($modx) {
        $body = json_decode(file_get_contents('php://input'), true) ?: [];
        $allParams = array_merge($params, $body);

        $controller = new \MiniShop3\Controllers\Api\Manager\OrdersController($modx);
        return $controller->update($allParams);
    });

});
```

## Response

Все API endpoints возвращают JSON ответы через класс `MiniShop3\Router\Response`:

```php
use MiniShop3\Router\Response;

// Успешный ответ
Response::success($data, $message, $statusCode);

// Ответ с ошибкой
Response::error($message, $statusCode, $errors);
```

### Формат ответа

**Успешный ответ:**

```json
{
  "success": true,
  "message": "Operation completed",
  "data": {
    "id": 123,
    "name": "Product"
  }
}
```

**Ответ с ошибкой:**

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "name": "Field is required"
  }
}
```

### HTTP коды ответов

| Код | Описание | Использование |
|-----|----------|---------------|
| 200 | OK | Успешный запрос |
| 400 | Bad Request | Ошибка валидации |
| 401 | Unauthorized | Не авторизован |
| 403 | Forbidden | Нет прав доступа |
| 404 | Not Found | Роут или ресурс не найден |
| 405 | Method Not Allowed | Метод не разрешён |
| 429 | Too Many Requests | Превышен лимит запросов |
| 500 | Internal Server Error | Внутренняя ошибка |

## Middleware

Middleware выполняются последовательно перед обработчиком роута. Если middleware возвращает `Response`, выполнение прерывается.

### Интерфейс

```php
namespace MiniShop3\Router\Middleware;

interface MiddlewareInterface
{
    /**
     * @param array $params URL параметры
     * @return Response|null Response для прерывания, null для продолжения
     */
    public function handle(array $params);
}
```

### Встроенные middleware

#### AuthMiddleware

Проверяет авторизацию пользователя MODX. Для контекста `mgr` дополнительно проверяет токен `HTTP_MODAUTH`.

```php
use MiniShop3\Router\Middleware\AuthMiddleware;

// Проверка авторизации в админке
$router->get('/api/mgr/secure', function($params) use ($modx) {
    return Response::success(['user' => $modx->user->get('username')]);
}, [
    new AuthMiddleware($modx, 'mgr')  // 'mgr' или 'web'
]);
```

**Проверки:**

- Наличие авторизованного пользователя `$modx->user`
- Для `mgr`: валидность токена `HTTP_MODAUTH`

#### PermissionMiddleware

Проверяет права доступа пользователя через `$modx->hasPermission()`.

```php
use MiniShop3\Router\Middleware\PermissionMiddleware;

$router->post('/api/mgr/products', function($params) use ($modx) {
    // Создание товара
}, [
    new PermissionMiddleware($modx, 'msproduct_save')
]);
```

**Основные права MiniShop3:**

- `msproduct_save` — создание/редактирование товаров
- `mssetting_save` — управление настройками
- `msorder_list` — просмотр заказов
- `msorder_save` — редактирование заказов

#### TokenMiddleware

Проверяет токен авторизации для Web API. Токен передаётся в заголовке `MS3TOKEN`.

```php
use MiniShop3\Middleware\TokenMiddleware;

$tokenMiddleware = new TokenMiddleware($modx);

$router->group('/api/v1/cart', function($router) use ($modx) {
    // Роуты корзины
}, [$tokenMiddleware]);
```

**Публичные роуты** (не требуют токен):

- `/api/v1/cart/get`
- `/api/v1/product/get`
- `/api/v1/product/list`
- `/api/v1/customer/token/get`
- `/api/v1/health`

#### CorsMiddleware

Настраивает CORS заголовки для кросс-доменных запросов.

```php
use MiniShop3\Middleware\CorsMiddleware;

$corsMiddleware = new CorsMiddleware([
    'allowed_origins' => ['https://shop.example.com', 'https://admin.example.com'],
    'allowed_methods' => ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    'allowed_headers' => ['Content-Type', 'Authorization', 'MS3TOKEN'],
    'allow_credentials' => true,
    'max_age' => 86400  // Кеш preflight запросов (24 часа)
]);
```

**Системная настройка:** `ms3_cors_allowed_origins` — список разрешённых доменов.

#### RateLimitMiddleware

Ограничивает количество запросов для защиты от злоупотреблений.

```php
use MiniShop3\Middleware\RateLimitMiddleware;

$rateLimitMiddleware = new RateLimitMiddleware(
    60,   // Максимум 60 запросов
    60    // За 60 секунд
);
```

**Системные настройки:**

- `ms3_rate_limit_max_attempts` — максимум запросов (по умолчанию: 60)
- `ms3_rate_limit_decay_seconds` — период в секундах (по умолчанию: 60)

**Заголовки ответа:**

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 45
X-RateLimit-Reset: 1703001234
```

### Создание своего middleware

```php
<?php
namespace MyComponent\Middleware;

use MiniShop3\Router\Middleware\MiddlewareInterface;
use MiniShop3\Router\Response;
use MODX\Revolution\modX;

class LoggingMiddleware implements MiddlewareInterface
{
    private modX $modx;

    public function __construct(modX $modx)
    {
        $this->modx = $modx;
    }

    public function handle(array $params)
    {
        // Логирование запроса
        $this->modx->log(
            modX::LOG_LEVEL_INFO,
            sprintf(
                '[API] %s %s from %s',
                $_SERVER['REQUEST_METHOD'],
                $_SERVER['REQUEST_URI'],
                $_SERVER['REMOTE_ADDR']
            )
        );

        // null = продолжить выполнение
        return null;
    }
}
```

Использование:

```php
use MyComponent\Middleware\LoggingMiddleware;

$router->get('/api/mgr/logged-endpoint', function($params) use ($modx) {
    return Response::success(['logged' => true]);
}, [
    new LoggingMiddleware($modx),
    new AuthMiddleware($modx, 'mgr')
]);
```

### Порядок выполнения middleware

Middleware выполняются в порядке указания:

```php
$router->get('/api/mgr/endpoint', $handler, [
    new CorsMiddleware(),        // 1. Сначала CORS
    new RateLimitMiddleware(),   // 2. Проверка лимита
    new AuthMiddleware($modx),   // 3. Авторизация
    new PermissionMiddleware(),  // 4. Права доступа
]);
```

При возврате `Response` из middleware, остальные middleware и обработчик **не выполняются**.

## Карта роутов

### Manager API (`/api/mgr/*`)

#### Общие

| Метод | Роут | Описание |
|-------|------|----------|
| GET | `/health` | Проверка работоспособности API |
| GET | `/user/info` | Информация о текущем пользователе |

#### Конфигурация (`/config`)

| Метод | Роут | Описание |
|-------|------|----------|
| GET | `/page-fields/{page_key}` | Получить поля страницы |
| GET | `/page-fields/{page_key}/all` | Все поля страницы |
| PUT | `/page-fields/{page_key}` | Обновить поля |
| DELETE | `/page-fields/{page_key}/{field_name}` | Удалить переопределение поля |
| GET | `/sections/{page_key}` | Получить секции |
| PUT | `/sections/{page_key}` | Обновить секции |

#### Заказы (`/orders`)

| Метод | Роут | Описание | Право |
|-------|------|----------|-------|
| GET | `` | Список заказов | `msorder_list` |
| POST | `` | Создать заказ | `msorder_list` |
| GET | `/filters` | Конфигурация фильтров | `msorder_list` |
| GET | `/{id}` | Получить заказ | `msorder_list` |
| PUT | `/{id}` | Обновить заказ | `msorder_list` |
| DELETE | `/{id}` | Удалить заказ | `msorder_list` |
| GET | `/{id}/products` | Товары заказа | `msorder_list` |
| POST | `/{id}/products` | Добавить товар | `msorder_list` |
| PUT | `/{id}/products/{product_id}` | Обновить товар | `msorder_list` |
| DELETE | `/{id}/products/{product_id}` | Удалить товар | `msorder_list` |
| GET | `/{id}/logs` | История изменений | `msorder_list` |
| DELETE | `/bulk` | Массовое удаление | `msorder_list` |

#### Покупатели (`/customers`)

| Метод | Роут | Описание | Право |
|-------|------|----------|-------|
| GET | `` | Список покупателей | `view_document` |
| GET | `/{id}` | Получить покупателя | `view_document` |
| PUT | `/{id}` | Обновить покупателя | `view_document` |
| DELETE | `/{id}` | Удалить покупателя | `view_document` |
| GET | `/{id}/addresses` | Адреса покупателя | `view_document` |
| POST | `/{id}/addresses` | Добавить адрес | `view_document` |
| PUT | `/{id}/addresses/{address_id}` | Обновить адрес | `view_document` |
| DELETE | `/{id}/addresses/{address_id}` | Удалить адрес | `view_document` |

#### Настройки магазина

**Доставки (`/deliveries`)**, **Оплаты (`/payments`)**, **Производители (`/vendors`)**, **Статусы (`/statuses`)**, **Связи (`/links`)** — CRUD операции с правом `mssetting_save`.

#### Уведомления (`/notifications`)

| Метод | Роут | Описание | Право |
|-------|------|----------|-------|
| GET | `/references` | Справочники для форм | `mssetting_save` |
| GET | `` | Список уведомлений | `mssetting_save` |
| GET | `/{id}` | Получить уведомление | `mssetting_save` |
| POST | `` | Создать уведомление | `mssetting_save` |
| PUT | `/{id}` | Обновить | `mssetting_save` |
| DELETE | `/{id}` | Удалить | `mssetting_save` |

#### Импорт (`/import`)

| Метод | Роут | Описание | Право |
|-------|------|----------|-------|
| GET | `/fields` | Поля для маппинга | `msproduct_save` |
| POST | `/upload` | Загрузка CSV | `msproduct_save` |
| POST | `/preview` | Предпросмотр | `msproduct_save` |
| POST | `/start` | Запуск импорта | `msproduct_save` |
| GET | `/progress/{import_id}` | Прогресс импорта | `msproduct_save` |

### Web API (`/api/v1/*`)

#### Корзина (`/cart`)

| Метод | Роут | Описание | Токен |
|-------|------|----------|-------|
| GET | `/get` | Получить корзину | Опционально |
| POST | `/add` | Добавить товар | Обязательно |
| POST | `/change` | Изменить количество | Обязательно |
| POST | `/remove` | Удалить товар | Обязательно |
| POST | `/clean` | Очистить корзину | Обязательно |

#### Заказ (`/order`)

| Метод | Роут | Описание | Токен |
|-------|------|----------|-------|
| GET | `/get` | Получить заказ | Обязательно |
| POST | `/add` | Добавить данные | Обязательно |
| POST | `/set` | Установить поля | Обязательно |
| POST | `/submit` | Оформить заказ | Обязательно |
| GET | `/cost` | Полная стоимость | Обязательно |
| GET | `/cost/cart` | Стоимость товаров | Обязательно |
| GET | `/cost/delivery` | Стоимость доставки | Обязательно |
| POST | `/address/set` | Установить адрес | Обязательно |

#### Покупатель (`/customer`)

| Метод | Роут | Описание | Токен |
|-------|------|----------|-------|
| POST | `/login` | Авторизация | Нет |
| POST | `/register` | Регистрация | Нет |
| GET | `/token/get` | Получить токен | Нет |
| PUT | `/profile` | Обновить профиль | Обязательно |
| GET | `/addresses` | Список адресов | Обязательно |
| POST | `/addresses` | Добавить адрес | Обязательно |
| PUT | `/addresses/{id}` | Обновить адрес | Обязательно |
| DELETE | `/addresses/{id}` | Удалить адрес | Обязательно |

#### Общие

| Метод | Роут | Описание |
|-------|------|----------|
| GET | `/health` | Проверка работоспособности |

## Кастомизация роутов

### Добавление своих роутов

Создайте файл `core/config/ms3_routes_manager.custom.php`:

```php
<?php
use MiniShop3\Router\Middleware\AuthMiddleware;
use MiniShop3\Router\Middleware\PermissionMiddleware;
use MiniShop3\Router\Response;

// Простой роут
$router->get('/api/mgr/my-custom-endpoint', function() use ($modx) {
    return Response::success(['custom' => true]);
}, [
    new AuthMiddleware($modx, 'mgr')
]);

// Группа роутов
$router->group('/api/mgr/my-module', function($router) use ($modx) {

    $router->get('/dashboard', function() use ($modx) {
        return Response::success([
            'stats' => ['orders' => 100, 'revenue' => 50000]
        ]);
    });

    $router->post('/action', function($params) use ($modx) {
        $data = json_decode(file_get_contents('php://input'), true);
        // Обработка...
        return Response::success(['processed' => true]);
    });

}, [
    new AuthMiddleware($modx, 'mgr'),
    new PermissionMiddleware($modx, 'my_module_permission')
]);
```

Для Web API создайте `core/config/ms3_routes_web.custom.php`.

### Переопределение системных роутов

Кастомные роуты загружаются **после** системных и переопределяют их:

```php
<?php
// core/config/ms3_routes_manager.custom.php

use MiniShop3\Router\Response;

// Переопределение системного роута /api/mgr/health
$router->get('/api/mgr/health', function() use ($modx) {
    return Response::success([
        'status' => 'custom_ok',
        'version' => '1.0.0-custom',
        'timestamp' => time()
    ]);
});
```

### Интеграция со сторонними компонентами

Сторонний компонент может добавлять свои роуты через файл конфигурации:

```php
<?php
// core/config/ms3_routes_manager.custom.php

use MiniShop3\Router\Response;
use MiniShop3\Router\Middleware\AuthMiddleware;

// Роуты для компонента msPromoCode
$router->group('/api/mgr/promocodes', function($router) use ($modx) {

    $router->get('', function($params) use ($modx) {
        $codes = $modx->getCollection('msPromoCode');
        $result = [];
        foreach ($codes as $code) {
            $result[] = $code->toArray();
        }
        return Response::success(['codes' => $result]);
    });

    $router->post('', function($params) use ($modx) {
        $data = json_decode(file_get_contents('php://input'), true);

        $code = $modx->newObject('msPromoCode');
        $code->fromArray($data);

        if ($code->save()) {
            return Response::success(['id' => $code->get('id')]);
        }
        return Response::error('Failed to create promo code', 400);
    });

    $router->delete('/{id}', function($params) use ($modx) {
        $code = $modx->getObject('msPromoCode', $params['id']);
        if ($code && $code->remove()) {
            return Response::success(['deleted' => true]);
        }
        return Response::error('Not found', 404);
    });

}, [
    new AuthMiddleware($modx, 'mgr')
]);
```

## Системные настройки

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `ms3_cors_allowed_origins` | `["*"]` | Разрешённые домены для CORS |
| `ms3_rate_limit_max_attempts` | `60` | Лимит запросов |
| `ms3_rate_limit_decay_seconds` | `60` | Период сброса лимита (сек) |

## Отладка

### Логирование запросов

```php
$router->get('/api/mgr/debug', function($params) use ($modx) {
    $modx->log(
        \MODX\Revolution\modX::LOG_LEVEL_INFO,
        '[API Debug] ' . json_encode([
            'method' => $_SERVER['REQUEST_METHOD'],
            'uri' => $_SERVER['REQUEST_URI'],
            'params' => $params,
            'body' => file_get_contents('php://input')
        ])
    );

    return Response::success(['debug' => true]);
});
```

### Типичные ошибки

**401 Unauthorized:**

- Не авторизован в MODX
- Отсутствует или невалидный `HTTP_MODAUTH` токен
- Для Web API: отсутствует или истёк `MS3TOKEN`

**403 Forbidden:**

- Нет права доступа (проверьте ACL пользователя)

**404 Not Found:**

- Роут не зарегистрирован
- Опечатка в URL

**405 Method Not Allowed:**

- Используется неправильный HTTP метод (GET вместо POST и т.д.)

**429 Too Many Requests:**

- Превышен лимит запросов, подождите `Retry-After` секунд
