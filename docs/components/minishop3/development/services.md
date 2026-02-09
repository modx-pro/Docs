---
title: Сервисный слой
---
# Сервисный слой

MiniShop3 использует сервисный слой для отделения бизнес-логики от ORM моделей. Это архитектурное решение улучшает тестируемость, переиспользуемость и расширяемость кода.

## Архитектурный паттерн

### Принцип разделения

В классическом подходе (который использовался в miniShop2) бизнес-логика размещалась непосредственно в моделях:

```php
// miniShop2 - "толстые" модели
class msProduct extends modResource
{
    public function duplicate($options = []) { /* 200+ строк логики */ }
    public function getPrice() { /* логика расчёта цены */ }
    public function updateImages() { /* работа с изображениями */ }
}
```

В MiniShop3 модели отвечают только за работу с базой данных (xPDO ORM), а вся бизнес-логика вынесена в сервисы:

```php
// MiniShop3 - "тонкие" модели + сервисы
class msProduct extends modResource
{
    // Только xPDO связи и базовые операции с БД
}

class ProductService
{
    public function duplicate($product, $options) { /* логика */ }
    public function processForDisplay($product) { /* логика */ }
}
```

### Преимущества

| Аспект | Толстые модели | Сервисный слой |
|--------|---------------|----------------|
| Тестирование | Сложно мокать | Легко изолировать |
| Переиспользование | Привязано к ORM | Независимые сервисы |
| Расширение | Наследование | Замена через DI |
| Размер файлов | 1000+ строк | 100-300 строк |

::: info Компромисс с архитектурой MODX
Архитектура MODX повсеместно использует бизнес-логику в моделях (`modResource`, `modUser` и др.). Поскольку некоторые модели MiniShop3 расширяют классы MODX (`msProduct extends modResource`), они обязаны следовать аналогичным паттернам.

Поэтому модели MiniShop3 содержат ссылки на сервисы для вызова методов бизнес-логики — это прагматичный компромисс для совместимости с экосистемой MODX.
:::

## DI Container

MiniShop3 использует встроенный DI-контейнер MODX (`$modx->services`) для регистрации и получения сервисов.

### Регистрация сервисов

Все сервисы регистрируются через `ServiceRegistry` при инициализации компонента:

```php
// bootstrap.php
$serviceRegistry = new \MiniShop3\ServiceRegistry($modx);
$serviceRegistry->register();
```

### Получение сервисов

```php
// Через DI контейнер (рекомендуется)
$orderService = $modx->services->get('ms3_order_service');
$authManager = $modx->services->get('ms3_auth_manager');
$cart = $modx->services->get('ms3_cart');

// Через главный класс MiniShop3
$ms3 = $modx->services->get('ms3');
$ms3->cart->add($productId, 1);
$ms3->order->submit();
```

### Ленивая загрузка

Сервисы создаются только при первом обращении:

```php
// Сервис ещё не создан
$modx->services->add('ms3_order_service', function() use ($modx) {
    // Эта функция выполнится только при первом get()
    return new \MiniShop3\Services\Order\OrderService($modx);
});

// Первое обращение - создание объекта
$service1 = $modx->services->get('ms3_order_service');

// Повторное обращение - тот же объект (singleton)
$service2 = $modx->services->get('ms3_order_service');
// $service1 === $service2
```

### Конвенция именования

Все сервисы MiniShop3 используют префикс `ms3_`:

```php
'ms3_order_service'      // OrderService
'ms3_auth_manager'       // AuthManager
'ms3_cart'               // Cart controller
'ms3_product_image'      // ProductImageService
```

Это предотвращает конфликты с другими компонентами MODX.

## Карта сервисов

### Контроллеры (Controllers)

Контроллеры — это высокоуровневые сервисы, управляющие основными сущностями магазина.

| Ключ | Класс | Назначение |
|------|-------|------------|
| `ms3_cart` | `Controllers\Cart\Cart` | Управление корзиной |
| `ms3_order` | `Controllers\Order\Order` | Оформление заказа |
| `ms3_customer` | `Controllers\Customer\Customer` | Работа с покупателем |

```php
// Пример использования
$ms3 = $modx->services->get('ms3');

// Добавление в корзину
$result = $ms3->cart->add($productId, 2, ['color' => 'red']);

// Оформление заказа
$result = $ms3->order->submit();

// Получение данных покупателя
$customer = $ms3->customer->getFields();
```

### Сервисы товаров (Product)

| Ключ | Класс | Назначение |
|------|-------|------------|
| `ms3_product_data_service` | `Services\Product\ProductDataService` | Работа с данными товара |
| `ms3_product_image` | `Services\Product\ProductImageService` | Обработка изображений товара |

```php
$productService = $modx->services->get('ms3_product_data_service');
$imageService = $modx->services->get('ms3_product_image');
```

### Сервисы покупателя (Customer)

| Ключ | Класс | Назначение |
|------|-------|------------|
| `ms3_auth_manager` | `Services\Customer\AuthManager` | Аутентификация |
| `ms3_register_service` | `Services\Customer\RegisterService` | Регистрация |
| `ms3_email_verification_service` | `Services\Customer\EmailVerificationService` | Верификация email |
| `ms3_sms_verification_service` | `Services\Customer\SmsVerificationService` | Верификация по SMS |
| `ms3_rate_limiter` | `Services\Customer\RateLimiter` | Ограничение частоты запросов |
| `ms3_customer_address_manager` | `Services\Customer\CustomerAddressManager` | Управление адресами покупателя |
| `ms3_customer_duplicate_checker` | `Services\CustomerDuplicateChecker` | Проверка дубликатов |
| `ms3_customer_factory` | `Services\CustomerFactory` | Фабрика покупателей |

```php
// Аутентификация
$authManager = $modx->services->get('ms3_auth_manager');
$customer = $authManager->authenticate([
    'email' => 'user@example.com',
    'password' => 'secret123'
]);

// Создание токена
$token = $authManager->createToken($customer, 'api', 86400);

// Регистрация провайдера аутентификации
$authManager->registerProvider(new SmsAuthProvider($modx));
```

### Сервисы заказа (Order)

::: info Архитектура фасада
Контроллер `Order.php` является **фасадом** — он сохраняет все публичные методы для обратной совместимости, но делегирует логику в специализированные сервисы. Это позволяет переопределять отдельные части логики без модификации всего контроллера.
:::

| Ключ | Класс | Назначение |
|------|-------|------------|
| `ms3_order_service` | `Services\Order\OrderService` | Общая бизнес-логика заказов |
| `ms3_order_draft_manager` | `Services\Order\OrderDraftManager` | CRUD черновиков заказов |
| `ms3_order_cost_calculator` | `Services\Order\OrderCostCalculator` | Расчёт стоимости |
| `ms3_order_field_manager` | `Services\Order\OrderFieldManager` | CRUD полей + валидация |
| `ms3_order_address_manager` | `Services\Order\OrderAddressManager` | Работа с адресами клиентов |
| `ms3_order_user_resolver` | `Services\Order\OrderUserResolver` | Резолвинг MODX пользователей |
| `ms3_order_submit_handler` | `Services\Order\OrderSubmitHandler` | Оформление заказа |
| `ms3_order_log` | `Services\Order\OrderLogService` | Логирование изменений заказа |
| `ms3_order_status` | `Services\Order\OrderStatusService` | Смена статуса + уведомления |
| `ms3_order_finalize` | `Services\Order\OrderFinalizeService` | Финализация заказа (валидация, создание клиента) |

```php
// Получение сервисов напрямую
$draftManager = $modx->services->get('ms3_order_draft_manager');
$costCalculator = $modx->services->get('ms3_order_cost_calculator');
$submitHandler = $modx->services->get('ms3_order_submit_handler');

// Работа с черновиком
$draft = $draftManager->getOrCreateDraft($token, 'web');
$draftManager->attachCustomer($draft, $customerId);

// Расчёт стоимости
$cost = $costCalculator->calculate($order);

// Логирование
$logService = $modx->services->get('ms3_order_log');
$logService->addEntry($order, 'status_changed', ['old' => 1, 'new' => 2]);
```

### Сервисы корзины (Cart)

::: info Архитектура фасада
Контроллер `Cart.php` также является **фасадом**. Он использует `OrderDraftManager` для общих операций с черновиками (корзина и заказ используют одну модель `msOrder`).
:::

| Ключ | Класс | Назначение |
|------|-------|------------|
| `ms3_cart_item_manager` | `Services\Cart\CartItemManager` | CRUD товаров в корзине, валидация, расчёт итогов |

```php
$itemManager = $modx->services->get('ms3_cart_item_manager');

// Добавление товара
$result = $itemManager->addItem($draft, $productId, $count, $options);

// Изменение количества
$itemManager->updateItemCount($draft, $key, $newCount);

// Расчёт итогов корзины
$status = $itemManager->calculateStatus($draft);
```

**Разделение ответственности Cart и Order:**

```
OrderDraftManager    — жизненный цикл черновика (общий для Cart и Order)
CartItemManager      — операции с позициями корзины (Cart-specific)
OrderCostCalculator  — расчёт стоимости заказа (Order-specific)
OrderFieldManager    — поля заказа (Order-specific)
```

### Сервисы доставки и оплаты

| Ключ | Класс | Назначение |
|------|-------|------------|
| `ms3_delivery_service` | `Services\Delivery\DeliveryService` | Способы доставки |
| `ms3_payment_service` | `Services\Payment\PaymentService` | Способы оплаты |

### Сервисы категорий (Category)

| Ключ | Класс | Назначение |
|------|-------|------------|
| `ms3_category_service` | `Services\Category\CategoryService` | Работа с категориями |
| `ms3_category_option_service` | `Services\Category\CategoryOptionService` | Опции категорий |

### Сервисы опций (Option)

| Ключ | Класс | Назначение |
|------|-------|------------|
| `ms3_option_service` | `Services\Option\OptionService` | EAV система опций |

### Сервисы конфигурации

| Ключ | Класс | Назначение |
|------|-------|------------|
| `ms3_config_manager` | `Services\ConfigManager` | Управление конфигурацией |
| `ms3_field_config_manager` | `Services\FieldConfigManager` | Конфигурация полей |
| `ms3_config_service` | `Services\ConfigService` | Фасад над менеджерами |
| `ms3_grid_config` | `Services\GridConfigService` | Конфигурация гридов |

### Сервисы уведомлений

| Ключ | Класс | Назначение |
|------|-------|------------|
| `ms3_notifications` | `Notifications\NotificationManager` | Центр уведомлений |
| `ms3_notification_config` | `Services\Notification\NotificationConfigService` | Конфигурация уведомлений |

### Утилиты

| Ключ | Класс | Назначение |
|------|-------|------------|
| `ms3_token_service` | `Services\TokenService` | Операции с токенами |
| `ms3_image` | `Services\ImageService` | Обработка изображений (Intervention Image) |
| `ms3_vendor_service` | `Services\Vendor\VendorService` | Работа с производителями |

## Замена сервисов

MiniShop3 позволяет заменять стандартные сервисы своими реализациями через конфигурационные файлы.

### Приоритет загрузки

1. **Встроенные классы** — базовые реализации компонента
2. **Основной конфиг** — `core/config/ms3.services.php`
3. **Конфиги компонентов** — `core/config/ms3.services.d/*.php` (в алфавитном порядке)

Каждый следующий уровень переопределяет предыдущий.

### Создание конфигурации

Скопируйте пример конфигурации:

```bash
cp core/components/minishop3/config/ms3.services.example.php \
   core/config/ms3.services.php
```

### Пример переопределения

```php
<?php
// core/config/ms3.services.php

return [
    // Кастомная корзина с промокодами
    'ms3_cart' => [
        'class' => \MyProject\Controllers\PromoCart::class,
        'interface' => null,
    ],

    // Кастомный обработчик оформления заказа (интеграция с CRM)
    'ms3_order_submit_handler' => [
        'class' => \MyProject\Services\CRMOrderSubmitHandler::class,
        'interface' => null,
    ],

    // Кастомный сервис доставки (СДЭК)
    'ms3_delivery_service' => [
        'class' => \MyProject\Services\CdekDeliveryService::class,
        'interface' => null,
    ],
];
```

**Пример кастомного OrderSubmitHandler с интеграцией CRM:**

```php
<?php
namespace MyProject\Services;

use MiniShop3\Services\Order\OrderSubmitHandler;

class CRMOrderSubmitHandler extends OrderSubmitHandler
{
    public function submit(
        \MiniShop3\Model\msOrder $draft,
        array $orderData,
        ?\MiniShop3\Model\msCustomer $customer
    ): array {
        // Своя логика ДО оформления
        $this->validateWithCRM($orderData);

        // Вызов родительского метода
        $result = parent::submit($draft, $orderData, $customer);

        // Своя логика ПОСЛЕ успешного оформления
        if ($result['success']) {
            $this->syncOrderToCRM($result['data']['order_id']);
        }

        return $result;
    }

    protected function syncOrderToCRM(int $orderId): void
    {
        // Отправка в CRM
    }
}
```

### Требования к кастомным классам

Кастомный класс **должен**:

1. **Существовать** и быть доступным через автозагрузчик
2. **Наследовать** базовый класс MiniShop3

```php
<?php
namespace MyProject\Controllers;

use MiniShop3\Controllers\Cart\Cart;

class PromoCart extends Cart
{
    public function add(int $id, int $count = 1, array $options = []): array
    {
        // Проверка промокода
        $promoCode = $_SESSION['promo_code'] ?? null;
        if ($promoCode) {
            $options['promo_code'] = $promoCode;
        }

        // Вызов родительского метода
        return parent::add($id, $count, $options);
    }

    public function applyPromoCode(string $code): array
    {
        // Кастомная логика промокодов
        $_SESSION['promo_code'] = $code;
        return $this->success('Промокод применён');
    }
}
```

### Валидация классов

ServiceRegistry автоматически проверяет:

- **Существование класса** — `class_exists()`
- **Наследование** — `is_subclass_of($className, $baseClass)`
- **Интерфейсы** — `class_implements()` (если указано)

При ошибке валидации используется стандартный класс + запись в лог:

```
[MiniShop3 ServiceRegistry] Class 'MyProject\Cart' must extend MiniShop3\Controllers\Cart\Cart, using fallback
```

## Расширение сторонними компонентами

Если вы разрабатываете компонент, расширяющий MiniShop3, используйте директорию `ms3.services.d/` для бесконфликтной интеграции.

### Структура

```
core/config/ms3.services.d/
├── 01-base.php           # Базовые переопределения (приоритет 01)
├── 50-mypromocode.php    # Компонент промокодов (приоритет 50)
├── 50-cdekdelivery.php   # Компонент доставки СДЭК (приоритет 50)
└── 99-override.php       # Финальные переопределения (приоритет 99)
```

### Преимущества

- **Нет конфликтов** — каждый компонент в своём файле
- **Управление приоритетом** — через имена файлов (алфавитный порядок)
- **Независимая установка** — компоненты не перезаписывают конфиги друг друга

### Пример конфига компонента

```php
<?php
// core/config/ms3.services.d/50-mypromocode.php

return [
    'ms3_cart' => [
        'class' => \MyPromoCode\Controllers\PromoCart::class,
    ],
];
```

### Логирование

ServiceRegistry логирует все загруженные конфиги:

```
[MiniShop3 ServiceRegistry] Loaded 1 service(s) from addon: 50-mypromocode.php
[MiniShop3 ServiceRegistry] Using custom class: MyPromoCode\Controllers\PromoCart
```

## Примеры использования

### Кастомный расчёт стоимости доставки

```php
<?php
namespace MyProject\Services;

use MiniShop3\Services\Delivery\DeliveryService;
use MiniShop3\Model\msOrder;

class CustomDeliveryService extends DeliveryService
{
    public function calculateCost(msOrder $order): float
    {
        $baseCost = parent::calculateCost($order);

        // Бесплатная доставка от 5000 руб
        if ($order->get('cart_cost') >= 5000) {
            return 0;
        }

        // Наценка для тяжёлых заказов
        if ($order->get('weight') > 10000) {
            $baseCost *= 1.5;
        }

        return $baseCost;
    }
}
```

### Интеграция с внешней CRM

```php
<?php
namespace MyProject\Services;

use MiniShop3\Services\Order\OrderService;
use MiniShop3\Model\msOrder;

class CRMOrderService extends OrderService
{
    public function handleOrderSave(msOrder $order, ?bool $cacheFlag = null): bool
    {
        $result = parent::handleOrderSave($order, $cacheFlag);

        // Отправка в CRM при смене статуса
        if ($order->isDirty('status_id')) {
            $this->syncToCRM($order);
        }

        return $result;
    }

    protected function syncToCRM(msOrder $order): void
    {
        $client = new \GuzzleHttp\Client();
        $client->post('https://crm.example.com/api/orders', [
            'json' => [
                'order_id' => $order->get('id'),
                'status' => $order->get('status_id'),
                'total' => $order->get('cost'),
            ]
        ]);
    }
}
```

### Кастомный провайдер аутентификации

```php
<?php
namespace MyProject\Auth;

use MiniShop3\Controllers\Auth\AuthProviderInterface;
use MiniShop3\Model\msCustomer;
use MODX\Revolution\modX;

class TelegramAuthProvider implements AuthProviderInterface
{
    protected modX $modx;

    public function __construct(modX $modx)
    {
        $this->modx = $modx;
    }

    public function getName(): string
    {
        return 'telegram';
    }

    public function supports(array $credentials): bool
    {
        return isset($credentials['telegram_hash'])
            && isset($credentials['telegram_id']);
    }

    public function authenticate(array $credentials): ?msCustomer
    {
        // Проверка подписи Telegram
        if (!$this->verifyTelegramHash($credentials)) {
            return null;
        }

        // Поиск или создание покупателя
        return $this->modx->getObject(msCustomer::class, [
            'telegram_id' => $credentials['telegram_id']
        ]);
    }

    protected function verifyTelegramHash(array $data): bool
    {
        // Логика проверки подписи Telegram
        return true;
    }
}
```

Регистрация провайдера:

```php
$authManager = $modx->services->get('ms3_auth_manager');
$authManager->registerProvider(new TelegramAuthProvider($modx));
```

## Системные настройки

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `ms3_services_config` | `core/config/ms3.services.php` | Путь к основному конфигу |
| `ms3_services_addons_dir` | `core/config/ms3.services.d/` | Директория конфигов компонентов |

## Устранение проблем

### Сервис не найден

```
Service 'ms3_my_service' not found
```

**Решения:**

1. Убедитесь, что `ServiceRegistry::register()` вызывается при инициализации
2. Проверьте правильность ключа сервиса (с префиксом `ms3_`)
3. Проверьте, что класс существует и доступен автозагрузчику

### Кастомный класс не применяется

```
[MiniShop3 ServiceRegistry] Class 'MyClass' must extend BaseClass, using fallback
```

**Решения:**

1. Убедитесь, что кастомный класс наследует базовый класс MiniShop3
2. Проверьте namespace и use-директивы
3. Очистите кеш MODX

### Конфликт компонентов

Если два компонента переопределяют один сервис, применится тот, чей файл загружается последним (по алфавиту).

**Решение:** Используйте числовые префиксы для управления порядком:

- `10-base-component.php` — загрузится первым
- `90-override-component.php` — загрузится последним и победит
