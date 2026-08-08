---
title: События
description: Системные события msOnBundle* для плагинов msBundles
---

# События

Нужны, если вы пишете плагин: запретить добавление комплекта, поменять цену, не дать удалить системный набор в менеджере.

При установке пакет регистрирует события в группе **msBundles**. Имена удобно брать из `MsBundles\Events\BundleEventNames`.

## События корзины

| Имя | Когда |
| --- | --- |
| `msOnBeforeBundleAdd` | До записи строк в корзину |
| `msOnBundleAdded` | После успешного добавления |
| `msOnBeforeBundleRemove` | До удаления по `bundle_hash` (API или каскад) |
| `msOnBundleRemoved` | После удаления |
| `msOnBeforeBundleChange` | До синхронизации qty группы в корзине |
| `msOnBundleChanged` | После синхронизации qty |
| `msOnBundlePriceCalculate` | После расчёта цены |
| `msOnBundleStockCheck` | После проверки остатков |

Отмена before-событий: вернуть непустую строку из плагина или `$modx->event->output('Причина')`.

## События менеджера (CRUD)

| Имя | Когда |
| --- | --- |
| `msOnBeforeBundleSave` | До create/update комплекта |
| `msOnBundleSaved` | После успешного сохранения |
| `msOnBeforeBundleDelete` | До удаления комплекта из БД |
| `msOnBundleDeleted` | После удаления из БД |

`msOnBeforeBundleRemove` срабатывает при удалении из корзины. Удаление комплекта в админке это `msOnBeforeBundleDelete`.

## Ключевые параметры

### msOnBeforeBundleAdd / msOnBundleAdded

`bundle`, `quantity`, `price`, `stock` / `bundle_hash` (после add), `source` = `api`.

### msOnBeforeBundleRemove / msOnBundleRemoved

`bundle_hash`, `source` = `api` \| `cart_sync`. Для `cart_sync` также `product_key`.

### msOnBeforeBundleChange / msOnBundleChanged

`bundle_hash`, `product_key`, `old_quantity`, `new_quantity`, `count`, `source` = `cart_sync`.

Подмена qty: `returnedValues['new_quantity']` — целое ≥ 1.

### msOnBundlePriceCalculate / msOnBundleStockCheck

`bundle`, `quantity`, `result`. Подмена: `returnedValues['result']` → DTO цены или остатков.

### msOnBeforeBundleSave / msOnBundleSaved

Save: `id`, `is_new`, `bundle`, `payload`, `products`. После save: `id`, `is_new`, `bundle` (detail-массив).

### msOnBeforeBundleDelete / msOnBundleDeleted

`id`, `bundle` (публичный массив до удаления).

## События miniShop3 (плагин msBundles)

Плагин подписан на существующие события MS3:

| Событие MS3 | Назначение |
| --- | --- |
| `msOnBeforeChangeInCart` | Синхронизация qty группы → `msOnBeforeBundleChange` / `msOnBundleChanged` |
| `msOnBeforeRemoveFromCart` | Каскад удаления → `msOnBeforeBundleRemove` / `msOnBundleRemoved` |
| `msOnGetCart` | Legacy-строки: `is_lead` / `line_index` в памяти для рендера |

При ошибке синхронизации или cancel: `$modx->event->output($message)` блокирует операцию корзины.

## Примеры плагинов

Отмена добавления:

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeBundleAdd':
        $bundle = $modx->event->params['bundle'] ?? null;
        if ($bundle && $bundle->id === 99) {
            $modx->event->output('Этот комплект временно недоступен.');
        }
        break;
}
```

Запрет удаления в менеджере:

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeBundleDelete':
        $id = (int) ($modx->event->params['id'] ?? 0);
        if ($id === 1) {
            $modx->event->output('Системный комплект нельзя удалить.');
        }
        break;
}
```

Изменение цены:

```php
<?php
use MsBundles\Domain\Dto\PriceResultDto;

switch ($modx->event->name) {
    case 'msOnBundlePriceCalculate':
        /** @var PriceResultDto $result */
        $result = $modx->event->params['result'];
        $modx->event->returnedValues = [
            'result' => new PriceResultDto(
                total: $result->total * 0.95,
                originalTotal: $result->originalTotal,
                savings: $result->originalTotal - ($result->total * 0.95),
                lines: $result->lines,
            ),
        ];
        break;
}
```
