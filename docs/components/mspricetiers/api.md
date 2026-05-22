---
title: AJAX API и PHP
description: Web connector, сервис mspricetiers, расчёт цены для разработчиков
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

Вывод HTML-секций (если включено в сборке) — для динамических блоков на витрине. Параметры зависят от конфигурации `FrontendSectionRenderer`.

### Безопасность

- Проверка `mspricetiers_allowed_origins` для cross-origin.
- Rate limiting и валидация входных данных на стороне процессора.

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
| `msOnGetProductPrice` | Цена товара с учётом qty |
| `msOnProductsLoad` | Массовая подготовка каталога |
| `msOnProductPrepare` | Плейсхолдеры товара |
| `msOnBeforeAddToCart` / `msOnAddToCart` | Цена при добавлении |
| `msOnBeforeChangeInCart` / `msOnChangeInCart` | Изменение qty в корзине |
| `msOnGetStatusCart` | Итоги корзины |

Приоритет `msOnGetProductPrice` = **15** (после ms3Variants).

## Manager connector

Админка: `assets/components/mspricetiers/js/mgr/connector.php` — CRUD порогов, категорий, шаблонов (`mgr/tier/*`, `mgr/categorytier/*`, `mgr/template/*`). Требуются права MS3 и CSRF менеджера.

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
  Repository\      TierRepository, CategoryTierRepository, TierTemplateRepository
  Service\         PriceTierService
  Cart\            CartItemPriceUpdater
  Integration\     Ms3VariantsBridge
```

## См. также

- [События MODX](events)
- [Системные настройки](settings)
- [Подключение на сайте](frontend)
