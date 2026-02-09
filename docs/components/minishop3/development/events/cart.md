---
title: События корзины
---
# События корзины

События для управления корзиной покупок: добавление, изменение, удаление товаров.

## msOnBeforeGetCart

Вызывается **перед** получением содержимого корзины.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Контроллер корзины |
| `draft` | `msOrder` | Черновик заказа (корзина) |

### Прерывание операции

Можно отменить получение корзины:

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeGetCart':
        /** @var \MiniShop3\Controllers\Cart\Cart $controller */
        $controller = $scriptProperties['controller'];
        $draft = $scriptProperties['draft'];

        // Например, запретить получение корзины для определённых пользователей
        if ($modx->user->get('id') == 123) {
            $modx->event->output('Доступ запрещён');
            return;
        }
        break;
}
```

---

## msOnGetCart

Вызывается **после** получения содержимого корзины. Позволяет модифицировать данные перед возвратом.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Контроллер корзины |
| `draft` | `msOrder` | Черновик заказа (корзина) |
| `data` | `array` | Массив товаров корзины |

### Модификация данных

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetCart':
        $controller = $scriptProperties['controller'];
        $data = $scriptProperties['data'];

        // Добавляем дополнительные данные к каждому товару
        foreach ($data as $key => &$item) {
            $product = $modx->getObject(\MiniShop3\Model\msProduct::class, $item['product_id']);
            if ($product) {
                $item['sku'] = $product->get('article');
                $item['thumb'] = $product->get('thumb');
            }
        }

        // Возвращаем изменённые данные
        $values = &$modx->event->returnedValues;
        $values['data'] = $data;
        break;
}
```

---

## msOnBeforeAddToCart

Вызывается **перед** добавлением товара в корзину. Позволяет проверить или модифицировать параметры добавления.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Контроллер корзины |
| `msProduct` | `msProduct` | Объект товара |
| `count` | `int` | Количество |
| `options` | `array` | Опции товара |

### Прерывание операции

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddToCart':
        /** @var \MiniShop3\Model\msProduct $product */
        $product = $scriptProperties['msProduct'];
        $count = $scriptProperties['count'];

        // Запретить добавление товаров с нулевой ценой
        if ($product->get('price') <= 0) {
            $modx->event->output('Товар недоступен для заказа');
            return;
        }

        // Запретить добавление более 10 единиц
        if ($count > 10) {
            $modx->event->output('Максимум 10 единиц товара');
            return;
        }
        break;
}
```

### Модификация данных

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddToCart':
        $product = $scriptProperties['msProduct'];
        $count = $scriptProperties['count'];
        $options = $scriptProperties['options'] ?? [];

        $values = &$modx->event->returnedValues;

        // Минимальное количество — 2 штуки
        if ($count < 2) {
            $values['count'] = 2;
        }

        // Добавить метку источника в опции
        $options['source'] = 'promo_landing';
        $values['options'] = $options;
        break;
}
```

---

## msOnAddToCart

Вызывается **после** успешного добавления товара в корзину.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Контроллер корзины |
| `msProduct` | `msProduct` | Объект товара |
| `count` | `int` | Добавленное количество |
| `options` | `array` | Опции товара |
| `product_key` | `string` | Уникальный ключ товара в корзине |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnAddToCart':
        $product = $scriptProperties['msProduct'];
        $count = $scriptProperties['count'];
        $productKey = $scriptProperties['product_key'];

        // Логирование добавления
        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Cart] Товар добавлен: %s (ID: %d), кол-во: %d, ключ: %s',
            $product->get('pagetitle'),
            $product->get('id'),
            $count,
            $productKey
        ));

        // Отправка события в аналитику
        // analytics()->track('add_to_cart', [...]);
        break;
}
```

---

## msOnBeforeChangeInCart

Вызывается **перед** изменением количества товара в корзине.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Контроллер корзины |
| `product_key` | `string` | Уникальный ключ товара в корзине |
| `count` | `int` | Новое количество |

### Прерывание операции

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeChangeInCart':
        $productKey = $scriptProperties['product_key'];
        $count = $scriptProperties['count'];

        // Запретить изменение определённых товаров
        if (strpos($productKey, 'promo') !== false) {
            $modx->event->output('Количество промо-товаров нельзя изменить');
            return;
        }
        break;
}
```

### Модификация данных

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeChangeInCart':
        $count = $scriptProperties['count'];

        // Ограничение максимума
        $values = &$modx->event->returnedValues;
        if ($count > 50) {
            $values['count'] = 50;
        }
        break;
}
```

---

## msOnChangeInCart

Вызывается **после** изменения количества товара в корзине.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Контроллер корзины |
| `product_key` | `string` | Уникальный ключ товара |
| `count` | `int` | Новое количество |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnChangeInCart':
        $productKey = $scriptProperties['product_key'];
        $count = $scriptProperties['count'];

        $modx->log(modX::LOG_LEVEL_INFO,
            "Количество изменено: {$productKey} => {$count}"
        );
        break;
}
```

---

## msOnBeforeChangeOptionsInCart

Вызывается **перед** изменением опций товара в корзине.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Контроллер корзины |
| `product_key` | `string` | Уникальный ключ товара |
| `options` | `array` | Новые опции |

### Прерывание операции

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeChangeOptionsInCart':
        $options = $scriptProperties['options'];

        // Запретить смену цвета на "gold" (эксклюзивный)
        if (isset($options['color']) && $options['color'] === 'gold') {
            $modx->event->output('Цвет Gold недоступен');
            return;
        }
        break;
}
```

---

## msOnChangeOptionInCart

Вызывается **после** изменения опций товара в корзине.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Контроллер корзины |
| `old_product_key` | `string` | Старый ключ товара |
| `product_key` | `string` | Новый ключ товара (может измениться) |
| `options` | `array` | Новые опции |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnChangeOptionInCart':
        $oldKey = $scriptProperties['old_product_key'];
        $newKey = $scriptProperties['product_key'];
        $options = $scriptProperties['options'];

        if ($oldKey !== $newKey) {
            $modx->log(modX::LOG_LEVEL_INFO,
                "Ключ товара изменён: {$oldKey} => {$newKey}"
            );
        }
        break;
}
```

---

## msOnBeforeRemoveFromCart

Вызывается **перед** удалением товара из корзины.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Контроллер корзины |
| `product_key` | `string` | Уникальный ключ товара |

### Прерывание операции

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeRemoveFromCart':
        $productKey = $scriptProperties['product_key'];

        // Запретить удаление обязательного товара
        // (например, услуги доставки, добавленной автоматически)
        if ($productKey === 'ms_delivery_service') {
            $modx->event->output('Этот товар нельзя удалить');
            return;
        }
        break;
}
```

---

## msOnRemoveFromCart

Вызывается **после** удаления товара из корзины.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Контроллер корзины |
| `product_key` | `string` | Ключ удалённого товара |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnRemoveFromCart':
        $productKey = $scriptProperties['product_key'];

        $modx->log(modX::LOG_LEVEL_INFO,
            "Товар удалён из корзины: {$productKey}"
        );

        // Уведомление в аналитику
        // analytics()->track('remove_from_cart', [...]);
        break;
}
```

---

## msOnBeforeEmptyCart

Вызывается **перед** полной очисткой корзины.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Контроллер корзины |

### Прерывание операции

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeEmptyCart':
        // Запретить очистку корзины в определённое время
        $hour = (int)date('G');
        if ($hour >= 23 || $hour < 6) {
            $modx->event->output('Очистка корзины недоступна в ночное время');
            return;
        }
        break;
}
```

---

## msOnEmptyCart

Вызывается **после** полной очистки корзины.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Контроллер корзины |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnEmptyCart':
        $modx->log(modX::LOG_LEVEL_INFO, 'Корзина очищена');

        // Сбросить промокод в сессии
        unset($_SESSION['ms3']['promocode']);
        break;
}
```

---

## msOnGetStatusCart

Вызывается при расчёте статуса (итогов) корзины. Позволяет модифицировать итоговые значения.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `\MiniShop3\Controllers\Cart\Cart` | Контроллер корзины |
| `status` | `array` | Массив итогов корзины |

### Структура status

```php
$status = [
    'total_count' => 5,        // Общее количество товаров
    'total_cost' => 15000,     // Общая стоимость
    'total_weight' => 2500,    // Общий вес (граммы)
    'total_discount' => 1500,  // Общая скидка
    'total_positions' => 3,    // Количество позиций
];
```

### Модификация данных

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetStatusCart':
        $status = $scriptProperties['status'];

        // Добавить бонусные баллы
        $status['bonus_points'] = floor($status['total_cost'] / 100);

        // Добавить информацию о бесплатной доставке
        $status['free_delivery'] = $status['total_cost'] >= 5000;
        $status['free_delivery_diff'] = max(0, 5000 - $status['total_cost']);

        $values = &$modx->event->returnedValues;
        $values['status'] = $status;
        break;
}
```

### Вывод дополнительной информации

После модификации статуса данные доступны на фронтенде:

```fenom
{* В чанке корзины *}
{if $status.free_delivery}
    <div class="free-delivery">Бесплатная доставка!</div>
{else}
    <div class="delivery-info">
        До бесплатной доставки: {$status.free_delivery_diff | number_format : 0 : '' : ' '} ₽
    </div>
{/if}

{if $status.bonus_points > 0}
    <div class="bonus">Вы получите {$status.bonus_points} бонусных баллов</div>
{/if}
```
