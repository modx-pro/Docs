---
title: События товаров в заказе
---
# События товаров в заказе

События для позиций заказа: добавление, обновление, удаление строки.

::: info Контекст
С 1.12 позиции в админке меняет **Manager API** (`OrdersController`: `POST/PUT/DELETE …/orders/{id}/products/…`), не legacy-процессоры. Параметры включают `msOrder` и `msOrderProduct`.

Для корзины на витрине см. [События корзины](cart).
:::

::: info Второй источник msOnBeforeCreateOrderProduct / msOnCreateOrderProduct
Помимо Manager API, эта пара событий вызывается ещё и из `OrderDraftManager` — при программном создании заказа без сессии (`ProgrammaticOrderService`, sessionless API для интеграций/cron). В этом канале в параметрах события есть **дополнительный ключ `origin`** (значение `'integration'` по умолчанию), которого нет у вызова из Manager API.
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
| `object` | `msOrderProduct` | Та же строка, что и `msOrderProduct` (MS2-style алиас) |
| `msOrder` | `msOrder` | Родительский заказ |
| `mode` | `string` | `modSystemEvent::MODE_NEW` (значение `'new'`) |

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
            $stock = $msProduct->get('stock') ?? 0;
            if ($count > $stock) {
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
| `object` | `msOrderProduct` | Та же строка, что и `msOrderProduct` (MS2-style алиас) |
| `msOrder` | `msOrder` | Заказ |
| `mode` | `string` | `modSystemEvent::MODE_NEW` (значение `'new'`) |

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
            $stock = $msProduct->get('stock') ?? 0;
            $msProduct->set('stock', max(0, $stock - $count));
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
| `msOrderProduct` | `msOrderProduct` | Строка с новыми значениями полей (объект уже мутирован — старых значений в параметрах события нет) |
| `object` | `msOrderProduct` | Та же строка, что и `msOrderProduct` (MS2-style алиас) |
| `msOrder` | `msOrder` | Заказ |
| `mode` | `string` | `modSystemEvent::MODE_UPD` (значение `'upd'`) |

### Прерывание операции

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeUpdateOrderProduct':
        $orderProduct = $scriptProperties['msOrderProduct'];

        // Объект уже несёт НОВОЕ значение count — старое значение среди
        // параметров события недоступно (в БД ещё не сохранено).
        $newCount = $orderProduct->get('count');
        $productId = $orderProduct->get('product_id');

        // Проверяем, хватает ли остатка на итоговое количество
        $msProduct = $modx->getObject(\MiniShop3\Model\msProduct::class, $productId);
        if ($msProduct) {
            $stock = $msProduct->get('stock') ?? 0;
            if ($newCount > $stock) {
                $modx->event->output('Недостаточно товара для указанного количества');
                return;
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
| `object` | `msOrderProduct` | Та же строка, что и `msOrderProduct` (MS2-style алиас) |
| `msOrder` | `msOrder` | Заказ |
| `mode` | `string` | `modSystemEvent::MODE_UPD` (значение `'upd'`) |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnUpdateOrderProduct':
        $orderProduct = $scriptProperties['msOrderProduct'];

        // Событие не передаёт значение count "до" изменения (снимка старой
        // строки в параметрах нет) — синхронизируем внешнюю систему
        // с ТЕКУЩИМ (уже сохранённым) состоянием строки.
        $productId = $orderProduct->get('product_id');
        $count = $orderProduct->get('count');

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[OrderProduct] Товар #%d в заказе, текущее количество: %d',
            $productId,
            $count
        ));
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
| `object` | `msOrderProduct` | Та же строка, что и `msOrderProduct` (MS2-style алиас) |
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
| `object` | `msOrderProduct` | Та же строка, что и `msOrderProduct` (MS2-style алиас) |
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
            $stock = $msProduct->get('stock') ?? 0;
            $msProduct->set('stock', $stock + $count);
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
        // Событие не передаёт count "до" изменения — инкрементальный расчёт
        // остатка тут невозможен, только create/remove меняют резерв напрямую.
        $orderProduct = $scriptProperties['msOrderProduct'];
        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Stock] Изменена строка заказа, товар #%d, текущее количество: %d',
            $orderProduct->get('product_id'),
            $orderProduct->get('count')
        ));
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
        $stock = $msProduct->get('stock') ?? 0;
        $newStock = max(0, $stock + $delta);
        $msProduct->set('stock', $newStock);
        $msProduct->save();

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Stock] Товар #%d: %d %s %d = %d',
            $productId,
            $stock,
            $delta >= 0 ? '+' : '-',
            abs($delta),
            $newStock
        ));
    }
}
```
