---
title: События сниппета msProducts
---
# События сниппета msProducts

События для интеграции внешних пакетов (ms3Variants, msBrands и др.) в сниппет msProducts без модификации кода ядра MiniShop3.

::: tip Параметр usePackages
Для активации загрузки данных внешнего пакета укажите его имя в параметре сниппета:
```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'usePackages' => 'ms3Variants,msBrands'
]}
```
Плагины проверяют наличие своего пакета в этом параметре и загружают данные только при необходимости.
:::

## msOnProductsLoad

Вызывается после загрузки списка товаров из БД, до их обработки. Предназначен для **bulk-загрузки** дополнительных данных одним запросом — это позволяет избежать проблемы N+1.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `rows` | `array` (ссылка) | Массив товаров, можно модифицировать |
| `productIds` | `array` | Массив ID товаров `[1, 2, 3, ...]` |
| `usePackages` | `array` | Список запрошенных пакетов `['ms3Variants', 'msBrands']` |
| `scriptProperties` | `array` | Все параметры вызова сниппета |

### Базовый пример

```php
<?php
switch ($modx->event->name) {
    case 'msOnProductsLoad':
        // Проверяем, запрошен ли наш пакет
        $usePackages = $scriptProperties['usePackages'] ?? [];
        if (!in_array('myPackage', $usePackages)) {
            return;
        }

        // Загружаем данные для ВСЕХ товаров одним запросом
        $productIds = $scriptProperties['productIds'];

        // Ваша логика загрузки данных
        $myData = loadDataForProducts($productIds);

        // Сохраняем в eventData для использования в msOnProductPrepare
        $modx->eventData['myPackage'] = [
            'dataMap' => $myData,
        ];
        break;
}
```

### Пример: загрузка вариантов товаров (ms3Variants)

```php
<?php
switch ($modx->event->name) {
    case 'msOnProductsLoad':
        // Проверяем, запрошен ли наш пакет
        $usePackages = $scriptProperties['usePackages'] ?? [];
        if (!in_array('ms3Variants', $usePackages)) {
            return;
        }

        // Проверяем, установлен ли пакет
        if (!$modx->services->has('ms3variants')) {
            return;
        }

        // Загружаем варианты для ВСЕХ товаров одним запросом
        $productIds = $scriptProperties['productIds'];
        $variantService = $modx->services->get('ms3variants_variant_service');

        // Сохраняем в eventData для msOnProductPrepare
        $modx->eventData['ms3variants'] = [
            'variantsMap' => $variantService->getVariantsForProducts($productIds, ['active' => true]),
        ];
        break;
}
```

---

## msOnProductPrepare

Вызывается при подготовке каждого товара к рендерингу. Используется для присоединения данных, загруженных в `msOnProductsLoad`, к конкретному товару.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `row` | `array` (ссылка) | Данные товара, можно модифицировать |
| `productId` | `int` | ID товара |
| `idx` | `int` | Порядковый номер товара в выборке |

### Базовый пример

```php
<?php
switch ($modx->event->name) {
    case 'msOnProductPrepare':
        // Если данных нет — пакет не был запрошен или не установлен
        $myData = $modx->eventData['myPackage']['dataMap'] ?? null;
        if ($myData === null) {
            return;
        }

        $productId = $scriptProperties['productId'];
        $row = &$scriptProperties['row'];

        // Присоединяем данные к товару
        if (isset($myData[$productId])) {
            $row['my_field'] = $myData[$productId];
        }
        break;
}
```

### Пример: присоединение вариантов (ms3Variants)

```php
<?php
switch ($modx->event->name) {
    case 'msOnProductPrepare':
        // Если данных нет — пакет не был запрошен
        $variantsMap = $modx->eventData['ms3variants']['variantsMap'] ?? null;
        if ($variantsMap === null) {
            return;
        }

        $productId = $scriptProperties['productId'];
        $row = &$scriptProperties['row'];

        if (isset($variantsMap[$productId])) {
            $row['variants'] = $variantsMap[$productId];
            $row['variants_count'] = count($variantsMap[$productId]);
            $row['variants_json'] = json_encode($variantsMap[$productId]);
            $row['has_variants'] = true;
        } else {
            $row['variants'] = [];
            $row['variants_count'] = 0;
            $row['variants_json'] = '[]';
            $row['has_variants'] = false;
        }
        break;
}
```

---

## Полный пример плагина интеграции

Пример плагина, добавляющего бейджи "Новинка" к товарам, созданным за последние 7 дней.

```php
<?php
/**
 * Плагин: Бейджи товаров
 * События: msOnProductsLoad, msOnProductPrepare
 */

switch ($modx->event->name) {

    case 'msOnProductsLoad':
        // Проверяем параметр
        $usePackages = $scriptProperties['usePackages'] ?? [];
        if (!in_array('msBadges', $usePackages)) {
            return;
        }

        $rows = $scriptProperties['rows'];
        $weekAgo = strtotime('-7 days');

        // Определяем новинки (созданы за последние 7 дней)
        $newProducts = [];
        foreach ($rows as $row) {
            if (strtotime($row['createdon']) > $weekAgo) {
                $newProducts[$row['id']] = true;
            }
        }

        // Сохраняем для msOnProductPrepare
        $modx->eventData['msBadges'] = [
            'newProducts' => $newProducts,
        ];
        break;

    case 'msOnProductPrepare':
        $badgesData = $modx->eventData['msBadges'] ?? null;
        if ($badgesData === null) {
            return;
        }

        $productId = $scriptProperties['productId'];
        $row = &$scriptProperties['row'];

        $badges = [];

        // Бейдж "Новинка"
        if (!empty($badgesData['newProducts'][$productId])) {
            $badges[] = [
                'type' => 'new',
                'label' => 'Новинка',
                'color' => '#28a745',
            ];
        }

        // Бейдж "Скидка" (если есть старая цена)
        if (!empty($row['old_price']) && $row['old_price'] > $row['price']) {
            $discount = round((($row['old_price'] - $row['price']) / $row['old_price']) * 100);
            $badges[] = [
                'type' => 'sale',
                'label' => "-{$discount}%",
                'color' => '#dc3545',
            ];
        }

        $row['badges'] = $badges;
        $row['badges_json'] = json_encode($badges);
        $row['has_badges'] = !empty($badges);
        break;
}
```

### Использование в шаблоне

```fenom
{'msProducts' | snippet : [
    'parents' => 0,
    'usePackages' => 'msBadges',
    'tpl' => 'tpl.msProducts.badges'
]}
```

**Чанк tpl.msProducts.badges:**

```fenom
<div class="product-card">
    {if $has_badges}
        <div class="product-badges">
            {foreach $badges as $badge}
                <span class="badge" style="background: {$badge.color}">
                    {$badge.label}
                </span>
            {/foreach}
        </div>
    {/if}

    <h3>{$pagetitle}</h3>
    <div class="price">{$price} руб.</div>
</div>
```

---

## Передача данных между событиями

Используйте `$modx->eventData` для передачи данных между событиями:

```php
// В msOnProductsLoad — сохраняем
$modx->eventData['myPackage'] = [
    'dataMap' => $loadedData,
    'settings' => $mySettings,
];

// В msOnProductPrepare — читаем
$dataMap = $modx->eventData['myPackage']['dataMap'] ?? null;
$settings = $modx->eventData['myPackage']['settings'] ?? [];
```

::: warning Изоляция данных
Используйте имя вашего пакета как ключ в `eventData`, чтобы избежать конфликтов с другими плагинами.
:::

---

## Производительность

События спроектированы для оптимальной производительности:

1. **msOnProductsLoad** — вызывается **один раз** для загрузки данных всех товаров
2. **msOnProductPrepare** — вызывается для каждого товара, но только присоединяет уже загруженные данные

Это позволяет избежать проблемы N+1 запросов:

```
❌ Без bulk-загрузки: 1 запрос на список + N запросов на варианты = O(N+1)
✅ С bulk-загрузкой:  1 запрос на список + 1 запрос на все варианты = O(2)
```
