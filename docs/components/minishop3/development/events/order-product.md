---
title: События товаров в заказе
---
# События товаров в заказе

События для управления товарами внутри заказа: добавление, обновление, удаление.

::: info Контекст
Эти события вызываются при операциях с товарами через процессоры админки, а не через контроллер корзины. Для событий добавления в корзину см. [События корзины](cart).
:::

## msOnBeforeCreateOrderProduct

Вызывается **перед** добавлением товара в заказ (через админку).

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `msOrderProduct` | `msOrderProduct` | Объект товара заказа |
| `mode` | `string` | Режим: `new` |

### Прерывание операции

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeCreateOrderProduct':
        /** @var \MiniShop3\Model\msOrderProduct $orderProduct */
        $orderProduct = $scriptProperties['msOrderProduct'];

        // Проверка наличия на складе
        $productId = $orderProduct->get('product_id');
        $count = $orderProduct->get('count');

        $msProduct = $modx->getObject(\MiniShop3\Model\msProduct::class, $productId);
        if ($msProduct) {
            $remains = $msProduct->get('remains') ?? 0;
            if ($count > $remains) {
                $modx->event->output('Недостаточно товара на складе');
                return;
            }
        }
        break;
}
```

---

## msOnCreateOrderProduct

Вызывается **после** добавления товара в заказ.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `msOrderProduct` | `msOrderProduct` | Созданный объект товара |
| `mode` | `string` | Режим: `new` |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnCreateOrderProduct':
        $orderProduct = $scriptProperties['msOrderProduct'];

        // Резервирование товара
        $productId = $orderProduct->get('product_id');
        $count = $orderProduct->get('count');

        $msProduct = $modx->getObject(\MiniShop3\Model\msProduct::class, $productId);
        if ($msProduct) {
            $remains = $msProduct->get('remains') ?? 0;
            $msProduct->set('remains', max(0, $remains - $count));
            $msProduct->save();
        }

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[OrderProduct] Добавлен товар #%d в заказ, кол-во: %d',
            $productId,
            $count
        ));
        break;
}
```

---

## msOnBeforeUpdateOrderProduct

Вызывается **перед** обновлением товара в заказе.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `msOrderProduct` | `msOrderProduct` | Объект товара заказа |
| `mode` | `string` | Режим: `upd` |

### Прерывание операции

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeUpdateOrderProduct':
        $orderProduct = $scriptProperties['msOrderProduct'];

        $newCount = $orderProduct->get('count');
        $oldCount = $orderProduct->getPrevious('count');

        // Если увеличиваем количество — проверяем остатки
        if ($newCount > $oldCount) {
            $diff = $newCount - $oldCount;
            $productId = $orderProduct->get('product_id');

            $msProduct = $modx->getObject(\MiniShop3\Model\msProduct::class, $productId);
            if ($msProduct) {
                $remains = $msProduct->get('remains') ?? 0;
                if ($diff > $remains) {
                    $modx->event->output('Недостаточно товара для увеличения количества');
                    return;
                }
            }
        }
        break;
}
```

---

## msOnUpdateOrderProduct

Вызывается **после** обновления товара в заказе.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `msOrderProduct` | `msOrderProduct` | Обновлённый объект товара |
| `mode` | `string` | Режим: `upd` |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnUpdateOrderProduct':
        $orderProduct = $scriptProperties['msOrderProduct'];

        $newCount = $orderProduct->get('count');
        $oldCount = $orderProduct->getPrevious('count');

        if ($newCount != $oldCount) {
            $diff = $newCount - $oldCount;
            $productId = $orderProduct->get('product_id');

            $msProduct = $modx->getObject(\MiniShop3\Model\msProduct::class, $productId);
            if ($msProduct) {
                $remains = $msProduct->get('remains') ?? 0;
                $msProduct->set('remains', $remains - $diff);
                $msProduct->save();

                $modx->log(modX::LOG_LEVEL_INFO, sprintf(
                    '[OrderProduct] Изменено кол-во товара #%d: %d → %d',
                    $productId,
                    $oldCount,
                    $newCount
                ));
            }
        }
        break;
}
```

---

## msOnBeforeRemoveOrderProduct

Вызывается **перед** удалением товара из заказа.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `msOrderProduct` | `msOrderProduct` | Объект товара для удаления |

### Прерывание операции

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeRemoveOrderProduct':
        $orderProduct = $scriptProperties['msOrderProduct'];
        $order = $orderProduct->getOne('Order');

        // Запретить удаление товаров из оплаченных заказов
        if ($order && $order->get('payment_status') === 'paid') {
            $modx->event->output('Нельзя удалять товары из оплаченного заказа');
            return;
        }
        break;
}
```

---

## msOnRemoveOrderProduct

Вызывается **после** удаления товара из заказа.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `msOrderProduct` | `msOrderProduct` | Удалённый объект товара |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnRemoveOrderProduct':
        $orderProduct = $scriptProperties['msOrderProduct'];

        // Возврат товара на склад
        $productId = $orderProduct->get('product_id');
        $count = $orderProduct->get('count');

        $msProduct = $modx->getObject(\MiniShop3\Model\msProduct::class, $productId);
        if ($msProduct) {
            $remains = $msProduct->get('remains') ?? 0;
            $msProduct->set('remains', $remains + $count);
            $msProduct->save();
        }

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[OrderProduct] Удалён товар #%d из заказа, возвращено: %d шт',
            $productId,
            $count
        ));
        break;
}
```

---

## Полный пример: управление остатками

```php
<?php
/**
 * Плагин: Управление остатками товаров
 * События: msOnCreateOrderProduct, msOnUpdateOrderProduct, msOnRemoveOrderProduct
 */

switch ($modx->event->name) {

    case 'msOnCreateOrderProduct':
        $orderProduct = $scriptProperties['msOrderProduct'];
        updateStock($modx, $orderProduct->get('product_id'), -$orderProduct->get('count'));
        break;

    case 'msOnUpdateOrderProduct':
        $orderProduct = $scriptProperties['msOrderProduct'];
        $diff = $orderProduct->get('count') - ($orderProduct->getPrevious('count') ?? 0);
        if ($diff != 0) {
            updateStock($modx, $orderProduct->get('product_id'), -$diff);
        }
        break;

    case 'msOnRemoveOrderProduct':
        $orderProduct = $scriptProperties['msOrderProduct'];
        updateStock($modx, $orderProduct->get('product_id'), $orderProduct->get('count'));
        break;
}

/**
 * Обновление остатков товара
 */
function updateStock($modx, $productId, $delta) {
    $msProduct = $modx->getObject(\MiniShop3\Model\msProduct::class, $productId);
    if ($msProduct) {
        $remains = $msProduct->get('remains') ?? 0;
        $newRemains = max(0, $remains + $delta);
        $msProduct->set('remains', $newRemains);
        $msProduct->save();

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Stock] Товар #%d: %d %s %d = %d',
            $productId,
            $remains,
            $delta >= 0 ? '+' : '-',
            abs($delta),
            $newRemains
        ));
    }
}
```
