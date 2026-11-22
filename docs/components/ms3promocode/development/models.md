# Модели и БД

Две таблицы под управлением Phinx-миграций — применяются автоматически при установке и обновлении пакета.

## Таблицы

### `ms3_promo_codes`

Промо-коды. `InnoDB`, `utf8mb4_unicode_ci`.

| Поле                | Тип                | Default              | Описание                                                       |
|---------------------|--------------------|----------------------|----------------------------------------------------------------|
| `id`                | INT UNSIGNED, PK   | AUTO_INCREMENT       | Идентификатор                                                  |
| `code`              | VARCHAR(64)        | —                    | Сам код (uppercase, unique)                                    |
| `name`              | VARCHAR(255), NOT NULL | —                | Отображаемое название для админки                              |
| `description`       | TEXT, nullable     | NULL                 | Произвольное описание для менеджера                            |
| `discount_type`     | ENUM('percent','fixed') | —               | Тип скидки. Константы: `msPromoCode::TYPE_PERCENT`, `TYPE_FIXED` |
| `discount_value`    | DECIMAL(12,2)      | 0.00                 | Размер скидки                                                  |
| `discount_scope`    | ENUM('all','matching') | `'all'`          | Область применения. Константы: `msPromoCode::SCOPE_ALL`, `SCOPE_MATCHING` |
| `rules`             | JSON, nullable     | NULL                 | Конфигурация правил (см. [Правила](rules))                     |
| `start_date`        | DATETIME, nullable | NULL                 | Начало действия (NULL — без ограничения)                       |
| `end_date`          | DATETIME, nullable | NULL                 | Окончание действия (NULL — без ограничения)                    |
| `max_uses`          | INT UNSIGNED       | 0                    | Лимит применений (0 — без лимита)                              |
| `used_count`        | INT UNSIGNED       | 0                    | Денормализованный счётчик (инкрементируется при создании Usage, уменьшается при отмене) |
| `min_order_amount`  | DECIMAL(12,2), nullable | NULL            | Минимальная сумма заказа                                       |
| `active`            | TINYINT(1)         | 1                    | 1 — включён, 0 — отключён                                      |
| `created_at`        | DATETIME           | CURRENT_TIMESTAMP    | Проставляется автоматически                                    |
| `updated_at`        | DATETIME           | CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP | Обновляется автоматически при любой записи |

Индексы:

- `uniq_code` — UNIQUE на `code`.
- `idx_active` — на `active`.
- `idx_dates` — композитный на `(start_date, end_date)`.
- `idx_created` — на `created_at`.

### `ms3_promo_code_usages`

Журнал применений. `InnoDB`, `utf8mb4_unicode_ci`.

| Поле               | Тип                        | Default              | Описание                                                       |
|--------------------|----------------------------|----------------------|----------------------------------------------------------------|
| `id`               | INT UNSIGNED, PK           | AUTO_INCREMENT       |                                                                |
| `promo_code_id`    | INT UNSIGNED               | —                    | Ссылка на `ms3_promo_codes.id` (логическая, см. ниже)          |
| `order_id`         | INT UNSIGNED               | —                    | Ссылка на `ms3_orders.id`                                      |
| `customer_id`      | INT UNSIGNED, nullable     | NULL                 | Ссылка на `ms3_customers.id`                                   |
| `user_id`          | INT UNSIGNED, nullable     | NULL                 | Ссылка на `modx_users.id`                                      |
| `order_cost`       | DECIMAL(12,2)              | 0.00                 | Стоимость заказа со скидкой (на момент применения)             |
| `discount_amount`  | DECIMAL(12,2)              | 0.00                 | Применённая сумма скидки                                       |
| `breakdown`        | JSON, NOT NULL             | —                    | `{"product_key": discount_amount, ...}` — разбивка по позициям |
| `applied_at`       | DATETIME                   | CURRENT_TIMESTAMP    |                                                                |
| `cancelled_at`     | DATETIME, nullable         | NULL                 | Если установлена — применение отменено                         |

::: warning Про ссылки, помеченные выше
Ссылки логические: `FOREIGN KEY` на уровне схемы не создаётся, целостность поддерживает код компонента (`UsageTracker`). В метаданных xPDO объявлена одна связь — `aggregates.PromoCode`; `Order` / `Customer` / `User` там нет (см. [BACKLOG](https://github.com/biz87/ms3PromoCode/blob/main/BACKLOG.md)).
:::

Индексы:

- `idx_promo_code` — на `promo_code_id`.
- `idx_order` — на `order_id`.
- `idx_customer` — на `customer_id`.
- `idx_applied` — на `applied_at`.
- `idx_active_usages` — композитный на `(promo_code_id, cancelled_at)`.

## xPDO модели

| Класс                                           | Описание                                                |
|-------------------------------------------------|---------------------------------------------------------|
| `ms3PromoCode\Model\msPromoCode`                | Сам код                                                 |
| `ms3PromoCode\Model\msPromoCodeUsage`           | Запись применения                                       |

### msPromoCode

```php
$code = $modx->getObject(\ms3PromoCode\Model\msPromoCode::class, ['code' => 'SALE10']);

// Стандартные геттеры
$code->get('name');                 // 'Весенняя распродажа'
$code->get('discount_type');        // 'percent'
$code->get('discount_value');       // 10.00
$code->get('used_count');           // 42
$code->get('rules');                // массив (поле phptype="json")

// Связь «к Usages» (composite, cardinality='many')
// При удалении msPromoCode xPDO удаляет и связанные Usages
$usages = $code->getMany('Usages');

// Вычислить статус
$status = $code->getStatus();
// Возможные значения — константы msPromoCode:
// STATUS_ACTIVE, STATUS_SCHEDULED, STATUS_EXPIRED, STATUS_EXHAUSTED, STATUS_DISABLED

// rules как массив (всегда массив, даже если в БД пусто)
$rules = $code->getRules();

// toArray() всегда добавляет вычисляемое поле 'status' рядом с 'active'
$data = $code->toArray();
// [..., 'active' => 1, 'status' => 'active', ...]
```

#### Сигнатура `getStatus`

```php
getStatus(?int $now = null): string
```

Приоритет проверок: `disabled` → `scheduled` → `expired` → `exhausted` → `active`. У отключённого кода статус всегда `disabled`, даже если срок истёк. Параметр `$now` — timestamp для подстановки времени (удобно в тестах); по умолчанию берётся текущее.

#### Константы `msPromoCode`

```php
// Типы скидки
msPromoCode::TYPE_PERCENT       // 'percent'
msPromoCode::TYPE_FIXED         // 'fixed'

// Область применения
msPromoCode::SCOPE_ALL          // 'all'
msPromoCode::SCOPE_MATCHING     // 'matching'

// Статусы жизненного цикла
msPromoCode::STATUS_ACTIVE
msPromoCode::STATUS_SCHEDULED
msPromoCode::STATUS_EXPIRED
msPromoCode::STATUS_EXHAUSTED
msPromoCode::STATUS_DISABLED
```

### msPromoCodeUsage

```php
$usage = $modx->getObject(\ms3PromoCode\Model\msPromoCodeUsage::class, ['order_id' => 1234]);

$usage->get('discount_amount');       // 500.00
$usage->get('breakdown');             // массив
$usage->get('cancelled_at');          // null или datetime

// Единственная связь xPDO
$promo = $usage->getOne('PromoCode'); // → msPromoCode

// Связанные msOrder / msCustomer / modUser достаются вручную по id:
$order    = $modx->getObject(\MiniShop3\Model\msOrder::class,    $usage->get('order_id'));
$customer = $modx->getObject(\MiniShop3\Model\msCustomer::class, $usage->get('customer_id'));
$user     = $modx->getObject(\MODX\Revolution\modUser::class,    $usage->get('user_id'));
```

#### Вспомогательные методы

```php
// Отменено ли применение
$usage->isCancelled();                // bool — по заполненности cancelled_at

// Распределение скидки по позициям как массив
$usage->getBreakdown();               // ['product_key' => float, ...]
```

## Снимки в properties

Применённый к корзине код хранится дважды:

1. `msOrder.properties.promo_code` — снимок на уровне заказа.
2. `msOrderProduct.properties.ms3promocode` — снимок на уровне позиции (только для позиций, получивших часть скидки).

### `msOrder.properties.promo_code`

```json
{
    "id": 12,
    "code": "SALE10",
    "discount_type": "percent",
    "discount_value": 10,
    "discount_amount": 500.00,
    "breakdown": {
        "ms-prod-key-1": 300.00,
        "ms-prod-key-2": 200.00
    },
    "original_cart_cost": 5000.00,
    "applied_at": "2026-04-21T12:34:56+00:00"
}
```

### `msOrderProduct.properties.ms3promocode`

```json
{
    "original_price": 1500.00,
    "discount_amount": 300.00,
    "promo_code_id": 12
}
```

::: tip Зачем дублировать
- Снимок в `msOrder` — для UI («применён код X со скидкой Y»), для аналитики и как источник правды при повторном применении.
- Снимки в `msOrderProduct` позволяют восстановить исходные цены при снятии кода. Иначе пришлось бы брать `Product.price` из каталога — а цена могла измениться после оформления заказа.
:::

## Связи (xPDO relations)

```
msPromoCode 1 ─── ∞ msPromoCodeUsage
     (composite Usages ↔ aggregate PromoCode)
```

Связей с `msOrder` / `msCustomer` / `modUser` в xPDO нет: поля `order_id` / `customer_id` / `user_id` работают как логические ссылки, объект достаётся через `$modx->getObject(...)`.

## Миграции

Файлы — в `core/components/ms3promocode/migrations/`, запускаются через Phinx.

| Миграция                                               | Что делает                                   |
|--------------------------------------------------------|----------------------------------------------|
| `20260418000001_create_promo_codes_table.php`          | Создание таблицы `ms3_promo_codes`           |
| `20260418000002_create_promo_code_usages_table.php`    | Создание таблицы `ms3_promo_code_usages`     |

При установке миграции запускаются автоматически через [resolver_02_migrations.php](https://github.com/biz87/ms3PromoCode/blob/main/_build/resolvers/resolver_02_migrations.php).

При удалении пакета таблицы остаются — чтобы сохранить историю применений на случай переустановки или ручного экспорта. Если компонент больше не нужен, удалите таблицы вручную:

```sql
DROP TABLE IF EXISTS modx_ms3_promo_code_usages;
DROP TABLE IF EXISTS modx_ms3_promo_codes;
```

::: warning Префикс таблиц
В примерах SQL используется стандартный префикс `modx_`. Подставьте свой, если он отличается.
:::

## Производительность

Все нужные индексы перечислены в описаниях таблиц выше. При истории от миллиона строк имеет смысл добавить партиционирование по `applied_at` (по годам или месяцам) — вручную, в стандартную конфигурацию не входит.

```sql
ALTER TABLE modx_ms3_promo_code_usages
PARTITION BY RANGE (YEAR(applied_at)) (
    PARTITION p2026 VALUES LESS THAN (2027),
    PARTITION p2027 VALUES LESS THAN (2028),
    PARTITION p2028 VALUES LESS THAN (2029),
    -- pmax принимает всё, что не попало в именованные диапазоны
    PARTITION pmax  VALUES LESS THAN MAXVALUE
);
```

