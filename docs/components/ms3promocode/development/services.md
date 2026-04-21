# Сервисы

Доменная логика разделена на несколько сервисов, зарегистрированных в DI-контейнере MODX. Все сервисы доступны через `$modx->services->get('ms3promocode_*')`.

## Список сервисов

| DI-ключ                              | Класс                                                       | Назначение                                                  |
|--------------------------------------|-------------------------------------------------------------|-------------------------------------------------------------|
| `ms3promocode_promo_code_service`    | `ms3PromoCode\Services\PromoCodeService`                    | CRUD + поиск по коду + инкремент/декремент счётчика         |
| `ms3promocode_validation_service`    | `ms3PromoCode\Services\ValidationService`                   | Lifecycle (disabled/scheduled/expired/exhausted) + min_order |
| `ms3promocode_discount_calculator`   | `ms3PromoCode\Services\DiscountCalculator`                  | Расчёт скидки + пропорциональное распределение              |
| `ms3promocode_rule_engine`           | `ms3PromoCode\Services\RuleEngine`                          | Matching по правилам (для scope=matching)                   |
| `ms3promocode_code_generator`        | `ms3PromoCode\Services\CodeGenerator`                       | Генерация кодов по маске                                    |
| `ms3promocode_application_service`   | `ms3PromoCode\Services\ApplicationService`                  | Фасад: apply / remove / sync / validate                     |
| `ms3promocode_usage_tracker`         | `ms3PromoCode\Services\UsageTracker`                        | Запись / отмена / восстановление применений в БД            |

## ApplicationService — главный фасад

Большинство интеграций должны использовать только этот сервис.

```php
/** @var \ms3PromoCode\Services\ApplicationService $svc */
$svc = $modx->services->get('ms3promocode_application_service');
```

### Методы

#### `apply(msOrder $order, string $code): array`

Применить код к корзине / заказу.

```php
$result = $svc->apply($order, 'SALE10');

if ($result['success']) {
    // $result['code']     - "SALE10"
    // $result['discount'] - сумма
    // $result['breakdown'] - per-position breakdown
} else {
    // $result['error']['code']    - "expired" / "exhausted" / etc.
    // $result['error']['message'] - локализованное сообщение
}
```

#### `validate(msOrder $order, string $code): array`

Проверить без записи. Возвращает `['valid' => bool, 'preview' => [...]]` или `['valid' => false, 'reason' => ..., 'message' => ...]`.

#### `validateCodeOnly(string $code): array`

Только lifecycle-проверка кода — без расчёта скидки. Используется когда корзина пуста.

#### `remove(msOrder $order): void`

Снять применённый код. Идемпотентен — если кода нет, ничего не делает.

#### `getCurrent(msOrder $order): ?array`

Получить снимок применённого кода из `msOrder.properties.promo_code` (или `null`).

```php
$current = $svc->getCurrent($order);
// ['id' => int, 'code' => string, 'discount_amount' => float, 'breakdown' => [...], 'applied_at' => string]
```

#### `syncAfterCartChange(msOrder $order): array`

Пересчитать применение после изменения состава корзины. Внутри: `apply` с текущим кодом, fallback на `remove` если новый состав не подходит.

```php
$result = $svc->syncAfterCartChange($order);
// ['changed' => bool, 'reason' => string, 'message' => string]
```

## PromoCodeService

```php
/** @var \ms3PromoCode\Services\PromoCodeService $svc */
$svc = $modx->services->get('ms3promocode_promo_code_service');
```

### Методы

| Метод                                                  | Описание                                       |
|--------------------------------------------------------|------------------------------------------------|
| `getByCode(string $code): ?msPromoCode`                | Поиск по коду (case-insensitive)               |
| `get(int $id): ?msPromoCode`                           | Поиск по ID                                    |
| `incrementUsage(msPromoCode $code): void`              | `used_count++`                                 |
| `decrementUsage(msPromoCode $code): void`              | `used_count--` (не ниже 0)                     |
| `create(array $data): msPromoCode`                     | Создание                                       |
| `update(msPromoCode $code, array $data): bool`         | Обновление                                     |
| `remove(msPromoCode $code): bool`                      | Удаление                                       |

## ValidationService

```php
/** @var \ms3PromoCode\Services\ValidationService $svc */
$svc = $modx->services->get('ms3promocode_validation_service');
```

### Методы

| Метод                                                            | Описание                                       |
|------------------------------------------------------------------|------------------------------------------------|
| `validateCode(?msPromoCode $code): array`                        | Lifecycle-проверка                             |
| `validateForOrder(msPromoCode $code, msOrder $order): array`     | Проверка по корзине (min_order_amount)         |

Возвращает `['valid' => bool, 'reason' => string, 'message' => string]`.

### Константы

```php
ValidationService::ERROR_NOT_FOUND        // 'not_found'
ValidationService::ERROR_DISABLED         // 'disabled'
ValidationService::ERROR_SCHEDULED        // 'scheduled'
ValidationService::ERROR_EXPIRED          // 'expired'
ValidationService::ERROR_EXHAUSTED        // 'exhausted'
ValidationService::ERROR_MIN_ORDER        // 'min_order'
ValidationService::ERROR_NOT_APPLICABLE   // 'not_applicable'
```

## DiscountCalculator

Чистая логика — без MODX-зависимостей, тестируется изолированно.

```php
/** @var \ms3PromoCode\Services\DiscountCalculator $svc */
$svc = $modx->services->get('ms3promocode_discount_calculator');

$result = $svc->calculate($promoCode, $matchingItems);
// $result['discount']  — float
// $result['breakdown'] — [product_key => discount, ...]
```

`$matchingItems` — массив `[product_key => ['price' => float, 'count' => int|float, 'cost' => float]]`.

Логика:
1. `base = sum(matching costs)`
2. `raw = base * percent / 100` или `value` (для fixed)
3. `discount = min(raw, base)` — не больше базы
4. `breakdown` — пропорционально `cost / base * discount` с компенсацией копеек

## RuleEngine

```php
/** @var \ms3PromoCode\Services\RuleEngine $svc */
$svc = $modx->services->get('ms3promocode_rule_engine');

$matches = $svc->match($product, $rules);
// true/false — подходит ли товар под все секции правил
```

Подробнее: [Правила (Rules)](rules).

## CodeGenerator

```php
/** @var \ms3PromoCode\Services\CodeGenerator $svc */
$svc = $modx->services->get('ms3promocode_code_generator');

// Один уникальный код по маске
$code = $svc->generateUnique('WINTER-####-??');
// "WINTER-4729-KM"

// Превью без сохранения
$examples = $svc->previewExamples('SALE-####', 3);
// ["SALE-4729", "SALE-2814", "SALE-9356"]

// Пакетная генерация
$codes = $svc->generateBatch('FRIDAY-???-##', 100);
// массив из 100 уникальных кодов
```

## UsageTracker

```php
/** @var \ms3PromoCode\Services\UsageTracker $svc */
$svc = $modx->services->get('ms3promocode_usage_tracker');

// Записать применение (вызывается плагином на msOnCreateOrder)
$svc->recordApplication([
    'promo_code_id'   => 12,
    'order_id'        => 1234,
    'customer_id'     => 56,
    'user_id'         => 78,
    'order_cost'      => 4500.00,
    'discount_amount' => 500.00,
    'breakdown'       => ['ms-prod-1' => 300, 'ms-prod-2' => 200],
]);

// Отменить применение по order_id
$svc->cancelApplication($orderId);

// Восстановить ранее отменённое применение
$svc->reinstateApplication($orderId);
```

## Использование сервисов из своего кода

### Пример: программно применить код к существующему заказу

```php
$order = $modx->getObject(\MiniShop3\Model\msOrder::class, $orderId);

/** @var \ms3PromoCode\Services\ApplicationService $svc */
$svc = $modx->services->get('ms3promocode_application_service');

$result = $svc->apply($order, 'WELCOME10');

if ($result['success']) {
    $modx->log(\MODX\Revolution\modX::LOG_LEVEL_INFO,
        'Promo code applied: ' . $result['code'] . ', discount: ' . $result['discount']);
}
```

### Пример: автоматически выдать персональный промо-код после регистрации

```php
// В плагине на событие OnUserCreated
/** @var \ms3PromoCode\Services\PromoCodeService $svc */
$svc = $modx->services->get('ms3promocode_promo_code_service');

/** @var \ms3PromoCode\Services\CodeGenerator $gen */
$gen = $modx->services->get('ms3promocode_code_generator');

$code = $gen->generateUnique('WELCOME-????');

$svc->create([
    'code'           => $code,
    'discount_type'  => 'percent',
    'discount_value' => 10,
    'discount_scope' => 'all',
    'max_uses'       => 1,
    'date_end'       => date('Y-m-d H:i:s', strtotime('+30 days')),
    'active'         => 1,
    'description'    => 'Welcome bonus for user #' . $user->get('id'),
]);

// Отправить $code пользователю на email
```
