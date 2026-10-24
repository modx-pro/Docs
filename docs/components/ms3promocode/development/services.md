# Сервисы

Доменная логика разложена по сервисам в DI-контейнере MODX. Доступ — через `$modx->services->get('ms3promocode_*')`.

## Список сервисов

| DI-ключ                              | Класс                                                       | Назначение                                                  |
|--------------------------------------|-------------------------------------------------------------|-------------------------------------------------------------|
| `ms3promocode_service`               | `ms3PromoCode\Services\PromoCodeService`                    | CRUD, поиск по коду, инкремент и декремент счётчика         |
| `ms3promocode_validation_service`    | `ms3PromoCode\Services\ValidationService`                   | Жизненный цикл (`disabled` / `scheduled` / `expired` / `exhausted`) и `min_order` |
| `ms3promocode_discount_calculator`   | `ms3PromoCode\Services\DiscountCalculator`                  | Расчёт скидки и пропорциональное распределение              |
| `ms3promocode_rule_engine`           | `ms3PromoCode\Services\RuleEngine`                          | Подбор по правилам (для `scope=matching`)                   |
| `ms3promocode_code_generator`        | `ms3PromoCode\Services\CodeGenerator`                       | Генерация кодов по маске                                    |
| `ms3promocode_application_service`   | `ms3PromoCode\Services\ApplicationService`                  | Фасад: `apply` / `remove` / `sync` / `validate`             |
| `ms3promocode_usage_tracker`         | `ms3PromoCode\Services\UsageTracker`                        | Запись, отмена и восстановление применений в БД             |

::: tip
Ключ `ms3promocode` — экземпляр самого класса `ms3PromoCode\ms3PromoCode`. Используется внутренней админкой компонента; сторонние расширения работают через сервисы из таблицы.
:::

## ApplicationService — главный фасад

Публичная точка интеграции: внешним плагинам достаточно этого сервиса.

```php
/** @var \ms3PromoCode\Services\ApplicationService $svc */
$svc = $modx->services->get('ms3promocode_application_service');
```

### Методы

#### `apply(msOrder $order, string $code): array`

Применяет код к заказу или корзине.

```php
$result = $svc->apply($order, 'SALE10');

if ($result['success']) {
    // $result['code']      - "SALE10"
    // $result['discount']  - сумма скидки
    // $result['breakdown'] - распределение по позициям
} else {
    // $result['error']['code']    - "expired" / "exhausted" и т.д.
    // $result['error']['message'] - локализованное сообщение
}
```

#### `validate(msOrder $order, string $code): array`

Проверяет код без записи. Возвращает `['valid' => true, 'preview' => [...]]` или `['valid' => false, 'reason' => ..., 'message' => ...]`.

#### `validateCodeOnly(string $code): array`

Только жизненный цикл, без расчёта скидки — для пустой корзины.

#### `remove(msOrder $order): void`

Снимает применённый код. Идемпотентен: без применённого кода ничего не меняет.

#### `getCurrent(msOrder $order): ?array`

Возвращает снимок применённого кода из `msOrder.properties.promo_code` или `null`.

```php
$current = $svc->getCurrent($order);
// [
//   'id'                 => int,
//   'code'               => string,
//   'discount_type'      => 'percent' | 'fixed',
//   'discount_value'     => float,
//   'discount_amount'    => float,          // фактически применённая сумма
//   'breakdown'          => [product_key => float, ...],
//   'original_cart_cost' => float,          // сумма позиций до скидки на момент применения
//   'applied_at'         => string,         // ISO 8601
// ]
```

#### `syncAfterCartChange(msOrder $order): array`

Пересчитывает применение после изменения состава корзины: повторный `apply` с текущим кодом, а если состав больше не подходит — `remove`.

```php
$result = $svc->syncAfterCartChange($order);

// 1. В заказе нет применённого кода:
//    ['changed' => false]

// 2. Код пересчитан к новому составу:
//    ['changed' => true]

// 3. Код автоматически снят (состав не подходит):
//    ['changed' => true, 'reason' => string, 'message' => string]
//    reason — одна из констант ValidationService::ERROR_*
```

Поля `reason` и `message` присутствуют только в третьем варианте.

### Снимок цены позиции

`apply` сохраняет снимок для каждой уценённой позиции в `msOrderProduct.properties.ms3promocode`:

```php
// Форма позиционного снимка:
[
    'original_price'  => float,  // цена ДО уценки (за единицу)
    'discount_amount' => float,  // применённая скидка на позицию
    'promo_code_id'   => int,
]
```

По снимку пересчёт и снятие восстанавливают исходную цену. С 1.0.1-beta1 действует инвариант целостности:

```
live_price + (discount_amount / count) ≈ original_price   (допуск ≤ 0.01)
```

Если инвариант нарушен — например, внешний плагин или менеджер переписал `price` после `apply` — снимок считается устаревшим: `apply` берёт за исходную цену текущую `price`, `remove` просто удаляет снимок без восстановления прежней. Это ожидаемое поведение, когда `price` делят с другими плагинами (например, `ms3AddOptions` при смене опции).

### Константы и ключи

- `ApplicationService::KEY_PROMO` (`'promo_code'`) — ключ в `msOrder.properties`.
- `ApplicationService::KEY_POSITION` (`'ms3promocode'`) — ключ в `msOrderProduct.properties`.

Сторонние плагины читают снимки по этим ключам напрямую, без обращения к сервису.

### Компенсация копеек

`apply` держит инвариант: `sum(breakdown)` в ответе равна `discount` до копейки. При `count > 1` округление `new_price = target_cost / count` теряет или прибавляет копейку. Остаток переносится на позицию с `count = 1`; если таких нет — на позицию с наибольшей уже применённой скидкой. Поэтому `breakdown` в ответе может отличаться на копейки от математического распределения из `DiscountCalculator`.

## PromoCodeService

```php
/** @var \ms3PromoCode\Services\PromoCodeService $svc */
$svc = $modx->services->get('ms3promocode_service');
```

### Методы

| Метод                                                                                              | Описание                                                                                        |
|----------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------|
| `getByCode(string $code): ?msPromoCode`                                                            | Поиск по коду (case-insensitive)                                                                |
| `get(int $id): ?msPromoCode`                                                                       | Поиск по ID                                                                                     |
| `getList(array $filters = [], array $sort = [], int $limit = 20, int $offset = 0): array`          | Постраничный список `['results' => msPromoCode[], 'total' => int]`. Фильтры: `query`, `active`, `created_from`, `created_to` |
| `getStatus(msPromoCode $code): string`                                                             | Текущий статус жизненного цикла (`active` / `disabled` / `scheduled` / `expired` / `exhausted`) |
| `create(array $data): msPromoCode`                                                                 | Создаёт запись                                                                                  |
| `update(int $id, array $data): msPromoCode`                                                        | Обновляет по ID, возвращает обновлённый объект                                                  |
| `delete(int $id): bool`                                                                            | Удаляет по ID                                                                                   |
| `incrementUsage(msPromoCode $code, int $by = 1): void`                                             | `used_count` += `$by`                                                                           |
| `decrementUsage(msPromoCode $code, int $by = 1): void`                                             | `used_count` -= `$by`, не ниже 0                                                                |

## ValidationService

```php
/** @var \ms3PromoCode\Services\ValidationService $svc */
$svc = $modx->services->get('ms3promocode_validation_service');
```

### Методы

| Метод                                                            | Описание                                       |
|------------------------------------------------------------------|------------------------------------------------|
| `validateCode(?msPromoCode $code): array`                        | Проверка жизненного цикла                      |
| `validateForOrder(msPromoCode $code, msOrder $order): array`     | Проверка по корзине (`min_order_amount`)       |

Оба метода возвращают `['valid' => bool, 'reason' => string, 'message' => string]`.

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

Чистая логика без MODX-зависимостей, тестируется изолированно.

```php
/** @var \ms3PromoCode\Services\DiscountCalculator $svc */
$svc = $modx->services->get('ms3promocode_discount_calculator');

$result = $svc->calculate($promoCode, $matchingItems);
// $result['discount']  — float
// $result['breakdown'] — [product_key => discount, ...]
```

`$matchingItems` — `[product_key => ['price' => float, 'count' => int|float, 'cost' => float?]]`. Поле `cost` опционально (без него берётся `price * count`); `ApplicationService` всегда его передаёт.

Логика расчёта:

1. `base = sum(matching costs)`
2. `raw = base * percent / 100` или `value` для `fixed`
3. `discount = min(raw, base)` — не больше базы
4. `breakdown` — пропорционально `cost / base * discount`; последняя позиция получает математический остаток, чтобы `sum(breakdown) == discount` до копейки.

Денежную компенсацию копеек на уровне `msOrderProduct.price` / `cost` выполняет `ApplicationService` — см. «Компенсация копеек» выше.

## RuleEngine

```php
/** @var \ms3PromoCode\Services\RuleEngine $svc */
$svc = $modx->services->get('ms3promocode_rule_engine');

$matches = $svc->match($product, $rules);
// true/false — проходит ли товар все секции правил

$filtered = $svc->filter($products, $rules);
// массив товаров, прошедших все секции
```

По умолчанию подключается семь стратегий: `ProductIds`, `ExcludeProductIds`, `ParentIds`, `ExcludeParentIds`, `VendorIds`, `ProductData`, `ProductOption`. Без аргумента (или с `null`) движок получает именно этот набор. Расширить его можно через конструктор:

```php
$engine = new \ms3PromoCode\Services\RuleEngine([
    new MyCustomRule(),
    // ...прочие стратегии
]);
```

Подробнее — [Правила (Rules)](rules).

## CodeGenerator

```php
/** @var \ms3PromoCode\Services\CodeGenerator $svc */
$svc = $modx->services->get('ms3promocode_code_generator');

// Один код по маске без проверки уникальности
$code = $svc->generate('WINTER-####-??');
// "WINTER-4729-KM"

// Уникальный код с проверкой коллизии по БД;
// при исчерпании попыток бросает RuntimeException
$code = $svc->generateUnique('WINTER-####-??');

// Второй параметр — предел попыток (по умолчанию MAX_ATTEMPTS = 10)
$code = $svc->generateUnique('AA-##', 50);

// Предпросмотр без сохранения
$examples = $svc->previewExamples('SALE-####', 3);
// ["SALE-4729", "SALE-2814", "SALE-9356"]

// Пакетная генерация
$codes = $svc->generateBatch('FRIDAY-???-##', 100);
// массив из 100 уникальных кодов
```

Константы:

- `CodeGenerator::DEFAULT_MASK` — `'##-????'`. Используется, если параметр `mask` не задан.
- `CodeGenerator::MAX_ATTEMPTS` — `10`. Предел попыток `generateUnique` до `RuntimeException`.

## UsageTracker

```php
/** @var \ms3PromoCode\Services\UsageTracker $svc */
$svc = $modx->services->get('ms3promocode_usage_tracker');

// recordApplication(array $data): msPromoCodeUsage
// Пишется из плагина на msOnCreateOrder; возвращает созданную запись.
$usage = $svc->recordApplication([
    'promo_code_id'   => 12,
    'order_id'        => 1234,
    'customer_id'     => 56,
    'user_id'         => 78,
    'order_cost'      => 4500.00,
    'discount_amount' => 500.00,
    'breakdown'       => ['ms-prod-1' => 300, 'ms-prod-2' => 200],
]);

// cancelApplication(int $orderId): bool
// Идемпотентно: true — активная запись отменена, false — отменять нечего.
$ok = $svc->cancelApplication($orderId);

// reinstateApplication(int $orderId): bool
// true — отменённая запись восстановлена, false — восстанавливать нечего.
$ok = $svc->reinstateApplication($orderId);
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
$svc = $modx->services->get('ms3promocode_service');

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
