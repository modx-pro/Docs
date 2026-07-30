---
title: AJAX API и PHP
description: Web connector, action sections, сервис mspricetiers, manager API
---

# AJAX API и PHP

## Web connector

**URL:** `assets/components/mspricetiers/js/web/connector.php`
**Метод:** только `POST`.

### action: price

Расчёт цены с учётом порогов.

| Параметр | Обязательный | Описание |
|----------|--------------|----------|
| `action` | да | `price` |
| `product_id` | да | ID товара |
| `quantity` | да | Количество |
| `variant_id` | нет | ID варианта ms3Variants |

**Пример ответа:**

```json
{
  "success": true,
  "object": {
    "price": 900,
    "price_formatted": "900.00 ₽",
    "old_price": 1000,
    "old_price_formatted": "1000.00 ₽",
    "tier_id": 5,
    "has_tier": true,
    "quantity": 10,
    "product_id": 123
  }
}
```

Используется из `msPriceTiers.fetchPrice()` — см. [Подключение на сайте](frontend#javascript-api).

### action: sections

HTML-секции для обновления блоков без перезагрузки страницы.

| Параметр | Обязательный | Описание |
|----------|--------------|----------|
| `action` | да | `sections` |
| `product_id` | да | ID товара (контекст рендера) |
| `quantity` | нет | Количество (по умолчанию 1) |
| `variant_id` | нет | ID варианта |
| `cart_items` / `cartItems` | нет | JSON позиций `[{product_id, quantity}, …]` |
| `cart_subtotal` / `subtotal` | нет | Сумма корзины для прогресса по сумме заказа |
| `current_time` / `currentTime` | нет | Симуляция времени (QA) |

**Ключи `object.sections`:**

| Ключ | Содержимое |
|------|------------|
| `table` | `msPriceTiers` + `mspricetiers.table` |
| `detailed` | Расширенная таблица |
| `badge` | Бейдж «Оптовые цены» |
| `placeholder` | Заглушка |
| `progress_product` | Прогресс на странице товара |
| `progress_popup` | Компактный прогресс |
| `progress_cart` | Прогресс по количеству в корзине |
| `progress_cart_sum` | Прогресс по сумме корзины |
| `theme_badge` / `theme_progress` | Демо-варианты темы |

Ответ также содержит `quantity_dependent_keys` — список ключей, зависящих от количества.

### Безопасность

- Проверка `mspricetiers_allowed_origins` для cross-origin.
- Rate limiting (`WebRateLimiter`) на `price` и `sections`.

## Сервис MODX

```php
if ($modx->services->has('mspricetiers')) {
    $service = $modx->services->get('mspricetiers');
}
```

### resolveForProduct

```php
$resolved = $service->resolveForProduct(
    productIdentifier: 123,
    quantity: 10,
    options: ['variant_id' => 5],
    incomingPrice: 1000.0
);

$resolved->getPrice();
$resolved->getOldPrice();
$resolved->getTierIdentifier();
```

### Списки порогов

```php
$tiers = $service->getTiersForProduct(123);
$effective = $service->getEffectiveTiersForProduct(123); // товар → категория
$byProducts = $service->getTiersForMultipleProducts([123, 456]);
```

### Кэш

```php
$service->invalidateCache(123);
$service->invalidateAllCache();
```

Теги: `mspricetiers`, `product_{id}`.

## Интеграция с MiniShop3

Плагин **`mspricetiers_events`** обрабатывает:

| Событие | Назначение |
|---------|------------|
| `msOnGetProductPrice` | Цена товара с учётом количества (приоритет 15) |
| `msOnProductsLoad` | Массовая подготовка каталога |
| `msOnProductPrepare` | Плейсхолдеры товара |
| `msOnBeforeAddToCart` / `msOnAddToCart` | Цена при добавлении |
| `msOnBeforeChangeInCart` / `msOnChangeInCart` | Изменение количества в корзине |
| `msOnBeforeGetCart` / `msOnGetCart` | Пересчёт корзины: пороги по количеству, затем по сумме заказа |

Приоритет `msOnGetProductPrice` = **15** (после ms3Variants).

## Manager connector

**URL:** `assets/components/mspricetiers/js/mgr/connector.php`

| Namespace | Назначение |
|-----------|------------|
| `mgr/tier/*` | CRUD порогов товара |
| `mgr/categorytier/*` | Пороги категории |
| `mgr/carttier/*` | Пороги по сумме корзины (админка) |
| `mgr/template/*` | Шаблоны, apply |
| `mgr/tier/bulk/*` | Массовые операции: импорт CSV, копирование, поиск и замена |

Требуются права MS3 и CSRF менеджера.

### mgr/template/apply

| Параметр | Описание |
|----------|----------|
| `template_id` | ID шаблона |
| `target_type` | `product` или `category` |
| `target_id` | ID товара или категории |
| `apply_mode` | `merge` или `replace` |

## Архитектура (слои)

```
MsPriceTiers\
  Domain\          TierResolver, ResolvedPrice
  Repository\      TierRepository, CategoryTierRepository, CartTierRepository
  Service\         PriceTierService, CartSumTierService
  Cart\            CartItemPriceUpdater
  Integration\     Ms3VariantsBridge
```

## См. также

- [События MODX](events)
- [Системные настройки](settings)
- [Подключение на сайте](frontend)
