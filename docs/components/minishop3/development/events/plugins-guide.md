---
title: Работа с плагинами
---
# Работа с плагинами

Руководство по созданию плагинов для событий MiniShop3: получение параметров, возврат данных, прерывание операций, передача данных между плагинами.

## Базовая структура плагина

```php
<?php
/**
 * Плагин MiniShop3
 * События: msOnBeforeAddToCart, msOnAddToCart
 */

switch ($modx->event->name) {
    case 'msOnBeforeAddToCart':
        // Код для события "перед добавлением"
        break;

    case 'msOnAddToCart':
        // Код для события "после добавления"
        break;
}
```

## Получение входящих параметров

### Способ 1: Массив $scriptProperties

Все параметры события доступны в массиве `$scriptProperties`:

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddToCart':
        // Получение конкретных параметров
        $product = $scriptProperties['msProduct'];
        $count = $scriptProperties['count'];
        $options = $scriptProperties['options'];
        $controller = $scriptProperties['controller'];
        break;
}
```

### Способ 2: Функция extract()

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddToCart':
        extract($scriptProperties);
        // Теперь доступны переменные: $msProduct, $count, $options, $controller
        break;
}
```

### Отладка: вывод всех параметров

```php
<?php
// Вывести список всех доступных параметров
$modx->log(modX::LOG_LEVEL_ERROR, '[' . $modx->event->name . '] Параметры: ' . print_r(array_keys($scriptProperties), true));

// Вывести параметры с их значениями
$modx->log(modX::LOG_LEVEL_ERROR, '[' . $modx->event->name . '] ' . print_r($scriptProperties, true));
```

## Параметр controller

::: info Важно
Во всех событиях контроллеров MiniShop3 автоматически передаётся параметр `controller` — экземпляр текущего контроллера (Cart, Order, Customer).
:::

Через контроллер можно получить доступ к:

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddToCart':
        /** @var \MiniShop3\Controllers\Cart\Cart $controller */
        $controller = $scriptProperties['controller'];

        // Доступ к MiniShop3
        $ms3 = $controller->ms3;

        // Доступ к MODX
        $modx = $controller->modx;

        // Доступ к текущей корзине (внутренние данные)
        // Используйте публичные методы контроллера
        break;
}
```

## Прерывание операции

Для событий с префиксом `Before` можно остановить выполнение операции, вернув сообщение об ошибке:

### Метод $modx->event->output()

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddToCart':
        $product = $scriptProperties['msProduct'];

        // Запретить добавление товаров с нулевой ценой
        if ($product->get('price') <= 0) {
            $modx->event->output('Товар недоступен для заказа');
            return; // Важно: выйти из switch
        }

        // Запретить добавление более 10 единиц
        if ($scriptProperties['count'] > 10) {
            $modx->event->output('Максимум 10 единиц товара');
            return;
        }
        break;
}
```

### Как это работает

1. Метод `invokeEvent()` MiniShop3 собирает все выводы плагинов
2. Если есть хотя бы один непустой вывод, операция прерывается
3. Сообщение возвращается пользователю (на фронтенде или в ответе API)

### События, поддерживающие прерывание

- `msOnBeforeGetCart`
- `msOnBeforeAddToCart`
- `msOnBeforeChangeInCart`
- `msOnBeforeChangeOptionsInCart`
- `msOnBeforeRemoveFromCart`
- `msOnBeforeEmptyCart`
- `msOnBeforeAddToOrder`
- `msOnBeforeRemoveFromOrder`
- `msOnSubmitOrder`
- `msOnBeforeCreateOrder`
- `msOnBeforeChangeOrderStatus`
- И другие события с префиксом `Before`

## Модификация данных

### Метод returnedValues

Для изменения параметров, которые будут использованы дальше:

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddToCart':
        // Получаем ссылку на returnedValues
        $values = &$modx->event->returnedValues;

        // Изменить количество (минимум 2 штуки)
        if ($scriptProperties['count'] < 2) {
            $values['count'] = 2;
        }

        // Добавить метку источника в опции
        $options = $scriptProperties['options'] ?? [];
        $options['source'] = 'promo_landing';
        $values['options'] = $options;
        break;
}
```

### Важно: используйте ссылку (&)

```php
// Правильно - изменения применятся
$values = &$modx->event->returnedValues;
$values['count'] = 5;

// Неправильно - изменения потеряются
$values = $modx->event->returnedValues;
$values['count'] = 5;
```

## Передача данных между плагинами

Используйте `$modx->eventData` для передачи данных между плагинами одного события или между разными событиями в рамках одного запроса.

### Пример: модификация цены

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetProductPrice':
        // Получаем текущую цену (может быть уже изменена другим плагином)
        $price = $modx->eventData['msOnGetProductPrice']['price']
            ?? $scriptProperties['price'];

        $data = $scriptProperties['data'];

        // Скидка 15% для категории 5
        if ($data['parent'] == 5) {
            $price = $price * 0.85;
        }

        // Сохраняем изменённую цену для следующих плагинов
        $modx->eventData['msOnGetProductPrice']['price'] = $price;
        break;
}
```

### Пример: передача данных между событиями

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddToCart':
        // Сохраняем информацию для использования в msOnAddToCart
        $modx->eventData['myPlugin']['original_count'] = $scriptProperties['count'];
        $modx->eventData['myPlugin']['added_at'] = time();
        break;

    case 'msOnAddToCart':
        // Получаем данные, сохранённые в предыдущем событии
        $originalCount = $modx->eventData['myPlugin']['original_count'] ?? null;
        $addedAt = $modx->eventData['myPlugin']['added_at'] ?? null;

        if ($originalCount) {
            $modx->log(modX::LOG_LEVEL_INFO,
                "Товар добавлен. Исходное количество: {$originalCount}, время: {$addedAt}"
            );
        }
        break;
}
```

### Структура eventData

```php
$modx->eventData = [
    'msOnGetProductPrice' => [
        'price' => 1500.00,
    ],
    'msOnGetProductFields' => [
        'data' => [...],
    ],
    'myPlugin' => [
        'custom_key' => 'custom_value',
    ],
];
```

::: warning Важно
`$modx->eventData` очищается после завершения запроса. Для сохранения данных между запросами используйте `$_SESSION` или базу данных.
:::

## Показ сообщений в админке

Для событий админки можно показывать сообщения пользователю:

### JavaScript alert через addHtml

```php
<?php
switch ($modx->event->name) {
    case 'msOnManagerCustomCssJs':
        $page = $scriptProperties['page'];

        if ($page === 'product_update') {
            $controller = $scriptProperties['controller'];

            // Показать уведомление
            $controller->addHtml('<script>
                Ext.onReady(function() {
                    MODx.msg.alert("Внимание", "Не забудьте проверить цены!");
                });
            </script>');
        }
        break;
}
```

### Toast-уведомления

```php
<?php
switch ($modx->event->name) {
    case 'msOnManagerCustomCssJs':
        $page = $scriptProperties['page'];
        $controller = $scriptProperties['controller'];

        if ($page === 'orders') {
            // Показать toast-уведомление
            $controller->addHtml('<script>
                Ext.onReady(function() {
                    Ext.Msg.notify("MiniShop3", "Есть новые заказы!");
                });
            </script>');
        }
        break;
}
```

## Приоритет плагинов

Порядок выполнения плагинов определяется полем **priority** в настройках плагина:

- Меньшее значение = раньше выполняется
- По умолчанию: 0
- Диапазон: любое целое число

### Когда важен приоритет

1. **Модификация цены** — плагины применяют скидки последовательно
2. **Валидация** — один плагин может зависеть от результата другого
3. **Передача данных** — плагин-источник должен выполниться раньше плагина-получателя

## Отладка плагинов

### Логирование

```php
<?php
// Уровни логирования
$modx->log(modX::LOG_LEVEL_ERROR, 'Ошибка');     // Всегда видно
$modx->log(modX::LOG_LEVEL_WARN, 'Внимание');   // Важные предупреждения
$modx->log(modX::LOG_LEVEL_INFO, 'Информация'); // Информационные сообщения
$modx->log(modX::LOG_LEVEL_DEBUG, 'Отладка');   // Детальная отладка

// Формат с контекстом
$modx->log(modX::LOG_LEVEL_ERROR,
    '[MyPlugin::' . $modx->event->name . '] ' . $message
);
```

### Проверка, вызывается ли плагин

```php
<?php
// В начале плагина
$modx->log(modX::LOG_LEVEL_ERROR, '=== PLUGIN START: ' . $modx->event->name . ' ===');

switch ($modx->event->name) {
    case 'msOnBeforeAddToCart':
        $modx->log(modX::LOG_LEVEL_ERROR, 'msOnBeforeAddToCart triggered');
        // ...
        break;
}

$modx->log(modX::LOG_LEVEL_ERROR, '=== PLUGIN END ===');
```

### Проверка наличия события

```php
<?php
// Получить все плагины, подписанные на событие
$plugins = $modx->getCollection('modPluginEvent', [
    'event' => 'msOnBeforeAddToCart'
]);

foreach ($plugins as $pluginEvent) {
    $plugin = $pluginEvent->getOne('Plugin');
    $modx->log(modX::LOG_LEVEL_INFO,
        'Plugin: ' . $plugin->get('name') . ', priority: ' . $pluginEvent->get('priority')
    );
}
```

## Типичные ошибки

### 1. Забыли return после output()

```php
// Неправильно — код продолжит выполняться
if ($error) {
    $modx->event->output('Ошибка');
}
// Этот код выполнится даже при ошибке
doSomething();

// Правильно
if ($error) {
    $modx->event->output('Ошибка');
    return;
}
```

### 2. Не используют ссылку для returnedValues

```php
// Неправильно
$values = $modx->event->returnedValues;
$values['count'] = 10; // Изменения потеряются

// Правильно
$values = &$modx->event->returnedValues;
$values['count'] = 10;
```

### 3. Неправильный тип события для прерывания

```php
// msOnAddToCart — событие ПОСЛЕ добавления
// Прерывание здесь не остановит добавление (товар уже добавлен)
case 'msOnAddToCart':
    $modx->event->output('Ошибка'); // Бесполезно
    break;

// msOnBeforeAddToCart — событие ДО добавления
case 'msOnBeforeAddToCart':
    $modx->event->output('Ошибка'); // Остановит добавление
    break;
```

### 4. Забыли break в switch

```php
switch ($modx->event->name) {
    case 'msOnBeforeAddToCart':
        // код
        // Забыли break — выполнится следующий case!

    case 'msOnAddToCart':
        // Этот код тоже выполнится для msOnBeforeAddToCart
        break;
}
```

## Полный пример плагина

```php
<?php
/**
 * Плагин: Контроль добавления в корзину
 *
 * События: msOnBeforeAddToCart, msOnAddToCart
 *
 * Функционал:
 * - Запрет добавления товаров без цены
 * - Ограничение максимального количества
 * - Логирование добавлений
 */

switch ($modx->event->name) {

    case 'msOnBeforeAddToCart':
        /** @var \MiniShop3\Model\msProduct $product */
        $product = $scriptProperties['msProduct'];
        $count = $scriptProperties['count'];
        $options = $scriptProperties['options'] ?? [];

        // Проверка: товар должен иметь цену
        if ($product->get('price') <= 0) {
            $modx->event->output($modx->lexicon('ms3_cart_product_not_available'));
            return;
        }

        // Проверка: максимум 99 единиц
        $maxCount = 99;
        if ($count > $maxCount) {
            $values = &$modx->event->returnedValues;
            $values['count'] = $maxCount;

            // Сохраняем для уведомления в msOnAddToCart
            $modx->eventData['cartControl']['count_limited'] = true;
            $modx->eventData['cartControl']['original_count'] = $count;
        }

        // Добавляем метку времени в опции
        $values = &$modx->event->returnedValues;
        $options['added_timestamp'] = time();
        $values['options'] = $options;
        break;

    case 'msOnAddToCart':
        $product = $scriptProperties['msProduct'];
        $count = $scriptProperties['count'];
        $productKey = $scriptProperties['product_key'];

        // Логируем добавление
        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[CartControl] Товар добавлен: %s (ID: %d), количество: %d, ключ: %s',
            $product->get('pagetitle'),
            $product->get('id'),
            $count,
            $productKey
        ));

        // Проверяем, было ли ограничено количество
        if (!empty($modx->eventData['cartControl']['count_limited'])) {
            $original = $modx->eventData['cartControl']['original_count'];
            $modx->log(modX::LOG_LEVEL_WARN, sprintf(
                '[CartControl] Количество ограничено: запрошено %d, добавлено %d',
                $original,
                $count
            ));
        }
        break;
}
```
