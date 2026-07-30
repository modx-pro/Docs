---
title: События MODX
description: События mspricetiersOn*, MiniShop3 и браузерные события
---

# События MODX

## События компонента

Вызываются из `PriceTierService` и процессоров CRUD.

### mspricetiersOnBeforeResolvePrice

Перед выбором порога и расчётом цены.

```php
$modx->invokeEvent('mspricetiersOnBeforeResolvePrice', [
    'product_id' => $productId,
    'quantity' => $quantity,
    'base_price' => $basePrice,
    'options' => $options,
    'tiers' => $tiers,
]);
```

Можно изменить массив `tiers` или отменить применение порога в коде плагина.

### mspricetiersOnResolvePrice

После расчёта.

```php
$modx->invokeEvent('mspricetiersOnResolvePrice', [
    'product_id' => $productId,
    'quantity' => $quantity,
    'resolved_price' => $resolvedPrice,
]);
```

### CRUD порогов (manager)

| Событие | Когда |
|---------|-------|
| `mspricetiersOnBeforeSaveTier` | Перед созданием/обновлением порога |
| `mspricetiersOnSaveTier` | После сохранения |
| `mspricetiersOnBeforeRemoveTier` | Перед удалением |
| `mspricetiersOnRemoveTier` | После удаления |

Подключите плагин на нужные события в **Элементы → Плагины**.

## События MiniShop3

Обрабатываются плагином **`mspricetiers_events`**.

| Событие | Назначение |
|---------|------------|
| `msOnGetProductPrice` | Подстановка цены по порогу (приоритет 15) |
| `msOnProductsLoad` | Подготовка списка товаров |
| `msOnProductPrepare` | Плейсхолдеры карточки |
| `msOnBeforeAddToCart` | Перед добавлением в корзину |
| `msOnAddToCart` | После добавления |
| `msOnBeforeChangeInCart` | Перед изменением количества |
| `msOnChangeInCart` | После изменения количества |
| `msOnBeforeGetCart` | Перед чтением корзины (сохранение цен по порогам) |
| `msOnGetCart` | При отдаче корзины (пороги по количеству и по сумме заказа) |

```mermaid
flowchart LR
  MS3[Событие MS3]
  P[mspricetiers_events]
  S[PriceTierService]
  MS3 --> P --> S
```

## События в браузере

| Событие | Источник | Назначение |
|---------|----------|------------|
| `ms3variants:selected` | [ms3Variants](/components/ms3variants/) | Пересчёт цены при смене варианта |
| `ms3:cart:updated` | MiniShop3 | Обновление блоков `[data-mspt-live]` |
| `mspricetiers:cart:updated` | mspricetiers.js | После обновления секций корзины |

Слушатели `ms3variants:selected` и `ms3:cart:updated` встроены в `mspricetiers.js` при включённых настройках.

## Пример плагина (логирование)

```php
<?php
switch ($modx->event->name) {
    case 'mspricetiersOnResolvePrice':
        $rp = $scriptProperties['resolved_price'] ?? null;
        if ($rp) {
            $modx->log(modX::LOG_LEVEL_INFO, '[msPT] product ' . $scriptProperties['product_id']
                . ' qty ' . $scriptProperties['quantity']
                . ' price ' . $rp->getPrice());
        }
        break;
}
```

## См. также

- [AJAX API и PHP](api)
- [Подключение на сайте](frontend#события-в-браузере)
