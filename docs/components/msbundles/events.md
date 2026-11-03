---
title: События
description: Системные события msOnBundle* для плагинов msBundles
---

# События

Для плагинов: запретить добавление, изменить цену, защитить от удаления.

Пакет регистрирует события в группе **msBundles**. Имена — в `MsBundles\Events\BundleEventNames`.

## События корзины

| Имя | Когда |
| --- | --- |
| `msOnBeforeBundleAdd` | До записи в корзину |
| `msOnBundleAdded` | После добавления |
| `msOnBeforeBundleRemove` | До удаления по `bundle_hash` |
| `msOnBundleRemoved` | После удаления |
| `msOnBeforeBundleChange` | До синхронизации qty |
| `msOnBundleChanged` | После синхронизации qty |
| `msOnBundlePriceCalculate` | После расчёта цены |
| `msOnBundleStockCheck` | После проверки остатков |

Отмена before: вернуть строку или `$modx->event->output('Причина')`.

## События менеджера

| Имя | Когда |
| --- | --- |
| `msOnBeforeBundleSave` | До create/update |
| `msOnBundleSaved` | После сохранения |
| `msOnBeforeBundleDelete` | До удаления из БД |
| `msOnBundleDeleted` | После удаления |

В админке — `msOnBeforeBundleDelete`, из корзины — `msOnBeforeBundleRemove`.

## Параметры

### msOnBeforeBundleAdd / msOnBundleAdded

`bundle`, `quantity`, `price`, `stock` / `bundle_hash`, `source` = `api`.

### msOnBeforeBundleRemove / msOnBundleRemoved

`bundle_hash`, `source` = `api` | `cart_sync`. Для `cart_sync`: `product_key`.

### msOnBeforeBundleChange / msOnBundleChanged

`bundle_hash`, `product_key`, `old_quantity`, `new_quantity`, `count`, `source` = `cart_sync`.

Подмена: `returnedValues['new_quantity']` — целое ≥ 1.

### msOnBundlePriceCalculate / msOnBundleStockCheck

`bundle`, `quantity`, `result`. Подмена: `returnedValues['result']` → DTO.

### msOnBeforeBundleSave / msOnBundleSaved

`id`, `is_new`, `bundle`, `payload`, `products`. После: `id`, `is_new`, `bundle` (detail).

### msOnBeforeBundleDelete / msOnBundleDeleted

`id`, `bundle` (массив).

## События miniShop3

Плагин msBundles подписан на:

| Событие MS3 | Назначение |
| --- | --- |
| `msOnBeforeChangeInCart` | Синхронизация qty |
| `msOnBeforeRemoveFromCart` | Каскад удаления |
| `msOnGetCart` | Legacy-строки: `is_lead` / `line_index` |

Ошибка или cancel: `$modx->event->output($message)` блокирует операцию.

## Примеры

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

Запрет удаления:

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
