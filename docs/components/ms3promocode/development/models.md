# Модели и БД

ms3PromoCode хранит данные в двух собственных таблицах. Структура управляется Phinx-миграциями и применяется автоматически при установке/обновлении пакета.

## Таблицы

### `ms3_promo_codes`

Сами промо-коды.

| Поле                | Тип               | Описание                                                       |
|---------------------|-------------------|----------------------------------------------------------------|
| `id`                | INT, PK           | Идентификатор                                                  |
| `code`              | VARCHAR(64)       | Сам код (uppercase, unique)                                    |
| `description`       | TEXT              | Произвольное описание для менеджера                            |
| `discount_type`     | ENUM              | `percent` / `fixed`                                            |
| `discount_value`    | DECIMAL(10,2)     | Размер скидки                                                  |
| `discount_scope`    | ENUM              | `all` / `matching`                                             |
| `date_start`        | DATETIME, nullable| Начало действия (или null — без ограничения)                   |
| `date_end`          | DATETIME, nullable| Окончание действия                                             |
| `max_uses`          | INT               | Лимит применений (0 = без лимита)                              |
| `used_count`        | INT               | Денормализованный счётчик использований                        |
| `min_order_amount`  | DECIMAL(10,2), nullable | Минимальная сумма заказа                                 |
| `rules`             | TEXT (JSON)       | JSON конфигурации правил (см. [Правила](rules))                |
| `active`            | TINYINT(1)        | 1 = включён, 0 = отключён                                      |
| `createdon`         | DATETIME          |                                                                |
| `updatedon`         | DATETIME          |                                                                |

### `ms3_promo_code_usages`

Журнал применений.

| Поле               | Тип                | Описание                                                       |
|--------------------|--------------------|----------------------------------------------------------------|
| `id`               | INT, PK            |                                                                |
| `promo_code_id`    | INT, FK            | → `ms3_promo_codes.id`                                         |
| `order_id`         | INT, FK            | → `ms3_orders.id`                                              |
| `customer_id`      | INT, nullable      | → `ms3_customers.id`                                           |
| `user_id`          | INT, nullable      | → `modx_users.id`                                              |
| `order_cost`       | DECIMAL(10,2)      | Стоимость заказа со скидкой (на момент применения)             |
| `discount_amount`  | DECIMAL(10,2)      | Применённая сумма скидки                                       |
| `breakdown`        | TEXT (JSON)        | `{"product_key": discount_amount, ...}` — разбивка по позициям |
| `applied_at`       | DATETIME           |                                                                |
| `cancelled_at`     | DATETIME, nullable | Если установлена — применение откачено                         |

## xPDO модели

| Класс                                           | Описание                                                |
|-------------------------------------------------|---------------------------------------------------------|
| `ms3PromoCode\Model\msPromoCode`                | Сам код                                                 |
| `ms3PromoCode\Model\msPromoCodeUsage`           | Запись применения                                       |

### msPromoCode

```php
$code = $modx->getObject(\ms3PromoCode\Model\msPromoCode::class, ['code' => 'SALE10']);

// Все стандартные геттеры
$code->get('discount_type');        // 'percent'
$code->get('discount_value');       // 10.00
$code->get('used_count');           // 42
$code->get('rules');                // массив (поле phptype="json")

// Связь "к Usages" (multi)
$usages = $code->getMany('Usages');

// Helper: вычислить статус
$status = $code->getStatus();
// Возвращает одну из констант:
// msPromoCode::STATUS_ACTIVE
// msPromoCode::STATUS_SCHEDULED
// msPromoCode::STATUS_EXPIRED
// msPromoCode::STATUS_EXHAUSTED
// msPromoCode::STATUS_DISABLED

// Helper: получить rules как массив (всегда массив, даже если в БД пусто)
$rules = $code->getRules();
```

### msPromoCodeUsage

```php
$usage = $modx->getObject(\ms3PromoCode\Model\msPromoCodeUsage::class, ['order_id' => 1234]);

$usage->get('discount_amount');     // 500.00
$usage->get('breakdown');           // массив
$usage->get('cancelled_at');        // null или datetime

// Связи
$promo = $usage->getOne('Promo');           // → msPromoCode
$order = $usage->getOne('Order');           // → MiniShop3\Model\msOrder
$customer = $usage->getOne('Customer');     // → MiniShop3\Model\msCustomer (если есть)
```

## Снимки в properties

Применённый к корзине код хранится **дважды**:

1. **`msOrder.properties.promo_code`** — снимок на уровне всего заказа.
2. **`msOrderProduct.properties.ms3promocode`** — снимок per-position (только на тех позициях, что получили часть скидки).

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
- **Снимок в `msOrder`** нужен для UI (показать «применён код X со скидкой Y»), для аналитики и как источник правды для re-apply при изменениях.
- **Снимки в `msOrderProduct`** нужны, чтобы можно было восстановить оригинальные цены при снятии кода. Без них пришлось бы ходить в каталог и доставать `Product.price` (что неверно, если цена в каталоге могла измениться после оформления заказа).
:::

## Связи (xPDO relations)

```
msPromoCode 1 ─── ∞ msPromoCodeUsage
                              │
                              ├── ∞ ─── 1 msOrder
                              ├── ∞ ─── 1 msCustomer (nullable)
                              └── ∞ ─── 1 modUser    (nullable)
```

## Миграции

Файлы миграций живут в `core/components/ms3promocode/migrations/` и управляются через Phinx.

| Миграция                                        | Что делает                                          |
|-------------------------------------------------|-----------------------------------------------------|
| `20260101000000_create_ms3_promo_codes.php`     | Создание таблицы `ms3_promo_codes`                  |
| `20260101000001_create_ms3_promo_code_usages.php` | Создание таблицы `ms3_promo_code_usages`           |

При установке пакета миграции применяются автоматически через [resolver_02_migrations.php](https://github.com/biz87/ms3PromoCode/blob/main/_build/resolvers/resolver_02_migrations.php).

При **удалении пакета** таблицы НЕ удаляются — это сделано намеренно, чтобы сохранить историю применений для возможного повторного использования компонента или ручного экспорта данных.

Если вы точно не вернётесь к компоненту — удалите таблицы вручную:

```sql
DROP TABLE IF EXISTS modx_ms3_promo_code_usages;
DROP TABLE IF EXISTS modx_ms3_promo_codes;
```

::: warning Префикс таблиц
В примерах SQL используется стандартный префикс `modx_`. Подставьте свой, если он отличается.
:::

## Производительность

- На таблице `ms3_promo_codes` стоит уникальный индекс на `code` — поиск по коду быстрый.
- На таблице `ms3_promo_code_usages` — индексы на `promo_code_id`, `order_id`, `applied_at`, `cancelled_at`.
- Для очень больших объёмов истории (>1 млн строк) рекомендуется добавить partition по `applied_at` (по годам/месяцам) — но это не входит в стандартную конфигурацию.
