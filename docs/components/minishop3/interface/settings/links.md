---
title: Связи товаров
---
# Связи товаров

Управление типами связей между товарами доступно через **Extras → MiniShop3 → Настройки → Связи**.

## Назначение

Связи позволяют устанавливать отношения между товарами:

- **Похожие товары** — альтернативы текущему товару
- **Сопутствующие товары** — дополнения к покупке
- **Комплекты** — товары, продаваемые вместе
- **Апсейл** — более дорогие альтернативы
- **Кросс-сейл** — товары для допродажи

## Поля типа связи

| Поле | Тип | Описание |
|------|-----|----------|
| `name` | string | Название типа связи |
| `type` | string | Системный ключ (уникальный) |
| `description` | text | Описание типа связи |

## Встроенные типы связей

| type | Название | Применение |
|------|----------|------------|
| `similar` | Похожие товары | Альтернативы для сравнения |
| `related` | Сопутствующие | Аксессуары, расходники |
| `upsell` | Апсейл | Премиум-версии |
| `crosssell` | Кросс-сейл | Допродажи в корзине |

## Создание связей между товарами

### Через интерфейс

1. Откройте карточку товара
2. Перейдите на вкладку **Связи**
3. Выберите тип связи
4. Добавьте связанные товары через поиск

### Через API

```php
// Создание связи
$link = $modx->newObject(\MiniShop3\Model\msProductLink::class);
$link->fromArray([
    'link_id' => 1,        // ID типа связи (например, "similar")
    'master' => 10,        // ID основного товара
    'slave' => 20,         // ID связанного товара
]);
$link->save();
```

## Вывод связанных товаров

### Сниппет msProducts с параметром link

```fenom
{* Похожие товары для текущего товара *}
{$_modx->runSnippet('msProducts', [
    'link' => 1,                  // ID типа связи
    'master' => $_modx->resource.id,
    'tpl' => 'tpl.msProducts.row',
    'limit' => 4
])}
```

### Вывод в карточке товара

```fenom
{* Сопутствующие товары *}
<div class="related-products">
    <h3>С этим товаром покупают</h3>
    {'msProducts' | snippet : [
        'link' => 2,
        'master' => $id,
        'tpl' => 'tpl.msRelated.row',
        'limit' => 6
    ]}
</div>

{* Похожие товары *}
<div class="similar-products">
    <h3>Похожие товары</h3>
    {'msProducts' | snippet : [
        'link' => 1,
        'master' => $id,
        'tpl' => 'tpl.msSimilar.row',
        'limit' => 4
    ]}
</div>
```

## Двусторонние связи

По умолчанию связь односторонняя: товар A связан с товаром B, но не наоборот.

Для двусторонних связей создавайте обратную связь программно:

```php
// Создание двусторонней связи
$linkTypeId = 1; // ID типа связи
$productA = 10;
$productB = 20;

// Прямая связь: A → B
$link1 = $modx->newObject(\MiniShop3\Model\msProductLink::class);
$link1->fromArray([
    'link_id' => $linkTypeId,
    'master' => $productA,
    'slave' => $productB,
]);
$link1->save();

// Обратная связь: B → A
$link2 = $modx->newObject(\MiniShop3\Model\msProductLink::class);
$link2->fromArray([
    'link_id' => $linkTypeId,
    'master' => $productB,
    'slave' => $productA,
]);
$link2->save();
```

## Использование в корзине

Связи типа `crosssell` удобно показывать в корзине:

```fenom
{* В чанке корзины *}
{var $cartProductIds = []}
{foreach $products as $product}
    {$cartProductIds[] = $product.id}
{/foreach}

{* Товары для допродажи *}
<div class="cart-crosssell">
    <h4>Рекомендуем добавить</h4>
    {'msProducts' | snippet : [
        'link' => 4,
        'master' => $cartProductIds | join : ',',
        'tpl' => 'tpl.msCrosssell.row',
        'limit' => 3
    ]}
</div>
```

## Массовое управление связями

### Через плагин при сохранении товара

```php
<?php
// Плагин на событие msOnProductSave
switch ($modx->event->name) {
    case 'msOnProductSave':
        // Автоматическое создание связей для товаров той же категории
        $product = $modx->getOption('product', $scriptProperties);
        $categoryId = $product->get('parent');

        // Получаем товары из той же категории
        $siblings = $modx->getCollection(\MiniShop3\Model\msProduct::class, [
            'parent' => $categoryId,
            'id:!=' => $product->get('id'),
            'published' => 1,
        ]);

        foreach ($siblings as $sibling) {
            // Проверяем, нет ли уже связи
            $existing = $modx->getObject(\MiniShop3\Model\msProductLink::class, [
                'link_id' => 1,
                'master' => $product->get('id'),
                'slave' => $sibling->get('id'),
            ]);

            if (!$existing) {
                $link = $modx->newObject(\MiniShop3\Model\msProductLink::class);
                $link->fromArray([
                    'link_id' => 1,
                    'master' => $product->get('id'),
                    'slave' => $sibling->get('id'),
                ]);
                $link->save();
            }
        }
        break;
}
```
