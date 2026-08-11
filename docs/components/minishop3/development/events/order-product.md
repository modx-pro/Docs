---
title: События товаров в заказе
---
# События товаров в заказе

События для позиций заказа: добавление, обновление, удаление строки.

::: info Контекст
С 1.12 позиции в админке меняет **Manager API** (`OrdersController`: `POST/PUT/DELETE …/orders/{id}/products/…`), не legacy-процессоры. Параметры включают `msOrder` и `msOrderProduct`.

Для корзины на витрине см. [События корзины](cart).
:::

::: warning After-хуки не откатывают БД
`msOnCreateOrderProduct`, `msOnUpdateOrderProduct`, `msOnRemoveOrderProduct` вызываются **после** `save()` / `remove()`. Если after-плагин вернёт `output`, ядро только пишет предупреждение в лог — клиент Vue по-прежнему получит успех. Проверки и veto — в парных `msOnBefore*`.
:::

## msOnBeforeCreateOrderProduct

Вызывается **перед** сохранением новой позиции в заказе (Manager API).

### Параметры

| Параметр | Тип | Описание |
| --- | --- | --- |
| `msOrderProduct` | `msOrderProduct` | Новая строка (ещё не в БД) |
| `msOrder` | `msOrder` | Родительский заказ |
| `mode` | `int` | `modSystemEvent::MODE_NEW` |

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

Вызывается **после** успешного `save()` позиции. Ошибка плагина не откатывает строку в БД (см. предупреждение выше).

### Параметры

| Параметр | Тип | Описание |
| --- | --- | --- |
| `msOrderProduct` | `msOrderProduct` | Сохранённая строка |
| `msOrder` | `msOrder` | Заказ |
| `mode` | `int` | `modSystemEvent::MODE_NEW` |

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

Вызывается **перед** `save()` изменённой позиции.

### Параметры

| Параметр | Тип | Описание |
| --- | --- | --- |
| `msOrderProduct` | `msOrderProduct` | Строка с новыми значениями полей |
| `msOrder` | `msOrder` | Заказ |
| `mode` | `int` | `modSystemEvent::MODE_UPD` |

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

Вызывается **после** успешного `save()`. Ошибка плагина не откатывает изменения в БД.

### Параметры

| Параметр | Тип | Описание |
| --- | --- | --- |
| `msOrderProduct` | `msOrderProduct` | Обновлённая строка |
| `msOrder` | `msOrder` | Заказ |
| `mode` | `int` | `modSystemEvent::MODE_UPD` |

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

Вызывается **перед** `remove()` позиции. Последнюю строку заказа API не даёт удалить (HTTP 400 до события).

### Параметры

| Параметр | Тип | Описание |
| --- | --- | --- |
| `msOrderProduct` | `msOrderProduct` | Строка для удаления |
| `msOrder` | `msOrder` | Заказ |
| `id` | `int` | ID строки `msOrderProduct` |

### Прерывание операции

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeRemoveOrderProduct':
        $orderProduct = $scriptProperties['msOrderProduct'];
        /** @var \MiniShop3\Model\msOrder $order */
        $order = $scriptProperties['msOrder'];

        // Запретить удаление из заказов в финальном статусе (пример)
        if ($order && (int) $order->get('status_id') === 2) {
            $modx->event->output('Нельзя удалять товары из оплаченного заказа');
            return;
        }
        break;
}
```

---

## msOnRemoveOrderProduct

Вызывается **после** успешного `remove()`. Ошибка плагина не восстанавливает строку.

### Параметры

| Параметр | Тип | Описание |
| --- | --- | --- |
| `msOrderProduct` | `msOrderProduct` | Удалённый объект (ещё в памяти xPDO) |
| `msOrder` | `msOrder` | Заказ |
| `id` | `int` | ID удалённой строки |

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
