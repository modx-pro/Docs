---
title: Связи товаров
---
# Связи товаров

Откройте **Пакеты → MiniShop3 → Настройки → Связи товаров**.

## Назначение

Типы отношений между товарами:

- **Похожие товары** — альтернативы текущему товару
- **Сопутствующие товары** — дополнения к покупке
- **Комплекты** — товары, продаваемые вместе
- **Апсейл** — более дорогие альтернативы
- **Кросс-сейл** — товары для допродажи

## Поля типа связи

| Поле | Тип | Описание |
| --- | --- | --- |
| `name` | string | Название типа связи (например «Похожие», «С этим покупают») |
| `type` | string | Кратность: `one_to_one`, `one_to_many`, `many_to_one`, `many_to_many` |
| `description` | text | Описание типа связи |

Готовых ключей вроде `similar` или `upsell` в пакете нет. Смысл связи задаёте полем `name`, поведение — полем `type`.

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
    'link' => 1,           // ID типа связи (msLink)
    'master' => 10,        // ID основного товара
    'slave' => 20,         // ID связанного товара
]);
$link->save();
```

## Вывод связанных товаров

Связанные товары выводит сниппет `msProducts` с параметром `link`:

```fenom
{* Похожие товары для текущего товара *}
{$_modx->runSnippet('msProducts', [
    'link' => 1,                  // ID типа связи
    'master' => $_modx->resource.id,
    'tpl' => 'tpl.msProducts.row',
    'limit' => 4
])}
```

## Двусторонние связи

Поведение зависит от `type` записи в `msLink`:

| `type` | Что пишется в `ms3_product_links` |
| --- | --- |
| `one_to_many` | Одна строка: master → slave |
| `many_to_one` | Одна строка с переставленными master/slave |
| `one_to_one`, `many_to_many` | Две строки: A→B и B→A (создаёт `ProductLinkService`) |

Для `many_to_many` вторая строка создаётся автоматически: сервис синхронизирует обе строки, поэтому пару master/slave задавать не нужно. Правка одной из строк перезаписывается сервисом.

## Использование в корзине

Тип связи для предложений «с этим товаром» в корзине:

```fenom
{* В чанке корзины *}
{var $cartProductIds = []}
{foreach $products as $product}
    {$cartProductIds[] = $product.id}
{/foreach}

{* Товары для допродажи: параметр `master` принимает только один id, для нескольких id
  задаём джойн и условие сами
*}
{'msProducts' | snippet : [
    'innerJoin' => ['Link' => ['class' => 'msProductLink', 'alias' => 'Link', 'on' => '`msProduct`.`id` = `Link`.`slave` AND `Link`.`link` = 4']],
    'where' => ['Link.master:IN' => $cartProductIds],
    'tpl' => 'tpl.msCrosssell.row',
    'limit' => 3
]}
```

## Массовое управление связями

События сохранения товара в пакете нет — используйте ядерное `OnDocFormSave` и проверяйте, что сохраняется именно `msProduct`:

```php
<?php
// Плагин на событие OnDocFormSave (события: OnDocFormSave)
if ($modx->event->name !== 'OnDocFormSave') {
    return;
}
// $mode = 'create' при создании, 'cmp_update' при сохранении карточки
if ($mode === 'cmp_update' || $resource->class_key !== 'msProduct') {
    return;
}
$product = $resource;

// Автоматическое создание связей для товаров той же категории
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
        'link' => 1,
        'master' => $product->get('id'),
        'slave' => $sibling->get('id'),
    ]);

    if (!$existing) {
        $link = $modx->newObject(\MiniShop3\Model\msProductLink::class);
        $link->fromArray([
            'link' => 1,
            'master' => $product->get('id'),
            'slave' => $sibling->get('id'),
        ]);
        $link->save();
    }
}
```
