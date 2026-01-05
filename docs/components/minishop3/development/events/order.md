---
title: События заказа
---
# События заказа

События для управления полями заказа: добавление, валидация, удаление полей, оформление заказа.

## msOnBeforeAddToOrder

Вызывается **перед** добавлением или изменением поля заказа.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `\MiniShop3\Controllers\Order\Order` | Контроллер заказа |
| `key` | `string` | Ключ поля |
| `value` | `mixed` | Значение поля |

### Прерывание операции

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddToOrder':
        $key = $scriptProperties['key'];
        $value = $scriptProperties['value'];

        // Запретить выбор определённого способа доставки
        if ($key === 'delivery_id' && $value == 5) {
            $modx->event->output('Доставка временно недоступна');
            return;
        }
        break;
}
```

### Модификация данных

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddToOrder':
        $key = $scriptProperties['key'];
        $value = $scriptProperties['value'];

        $values = &$modx->event->returnedValues;

        // Форматирование телефона
        if ($key === 'phone') {
            $values['value'] = preg_replace('/\D/', '', $value);
        }

        // Приведение email к нижнему регистру
        if ($key === 'email') {
            $values['value'] = strtolower(trim($value));
        }
        break;
}
```

---

## msOnAddToOrder

Вызывается **после** добавления поля в заказ (после успешной валидации).

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `\MiniShop3\Controllers\Order\Order` | Контроллер заказа |
| `key` | `string` | Ключ поля |
| `value` | `mixed` | Валидированное значение |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnAddToOrder':
        $key = $scriptProperties['key'];
        $value = $scriptProperties['value'];

        // Логирование изменений
        $modx->log(modX::LOG_LEVEL_INFO,
            "[Order] Поле {$key} установлено: {$value}"
        );

        // При выборе доставки — автовыбор первого способа оплаты
        if ($key === 'delivery_id' && !empty($value)) {
            $controller = $scriptProperties['controller'];
            // Логика автовыбора оплаты...
        }
        break;
}
```

---

## msOnBeforeValidateOrderValue

Вызывается **перед** валидацией значения поля.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `\MiniShop3\Controllers\Order\Order` | Контроллер заказа |
| `key` | `string` | Ключ поля |
| `value` | `mixed` | Значение для валидации |

### Модификация данных

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeValidateOrderValue':
        $key = $scriptProperties['key'];
        $value = $scriptProperties['value'];

        $values = &$modx->event->returnedValues;

        // Предобработка перед валидацией
        if ($key === 'index') {
            // Удалить пробелы из индекса
            $values['value'] = str_replace(' ', '', $value);
        }
        break;
}
```

---

## msOnValidateOrderValue

Вызывается **после** успешной валидации значения поля.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `\MiniShop3\Controllers\Order\Order` | Контроллер заказа |
| `key` | `string` | Ключ поля |
| `value` | `mixed` | Валидированное значение |

### Модификация данных

```php
<?php
switch ($modx->event->name) {
    case 'msOnValidateOrderValue':
        $key = $scriptProperties['key'];
        $value = $scriptProperties['value'];

        $values = &$modx->event->returnedValues;

        // Постобработка после валидации
        if ($key === 'city') {
            // Добавить регион к городу
            $values['value'] = $value . ', Московская область';
        }
        break;
}
```

---

## msOnErrorValidateOrderValue

Вызывается при **ошибке** валидации поля. Позволяет изменить сообщение об ошибке или отменить ошибку.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `\MiniShop3\Controllers\Order\Order` | Контроллер заказа |
| `key` | `string` | Ключ поля |
| `value` | `mixed` | Невалидное значение |
| `error` | `array` | Массив ошибок `['field' => 'сообщение']` |

### Модификация сообщения об ошибке

```php
<?php
switch ($modx->event->name) {
    case 'msOnErrorValidateOrderValue':
        $key = $scriptProperties['key'];
        $error = $scriptProperties['error'];

        $values = &$modx->event->returnedValues;

        // Кастомизация сообщений об ошибках
        if ($key === 'email') {
            $values['error'] = [$key => 'Введите корректный email для получения чека'];
        }

        if ($key === 'phone') {
            $values['error'] = [$key => 'Телефон нужен для связи курьера'];
        }
        break;
}
```

### Отмена ошибки

```php
<?php
switch ($modx->event->name) {
    case 'msOnErrorValidateOrderValue':
        $key = $scriptProperties['key'];
        $value = $scriptProperties['value'];

        // Для определённых полей — игнорировать ошибку
        if ($key === 'comment') {
            $values = &$modx->event->returnedValues;
            $values['error'] = []; // Пустой массив = нет ошибки
        }
        break;
}
```

---

## msOnBeforeRemoveFromOrder

Вызывается **перед** удалением поля из заказа.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `\MiniShop3\Controllers\Order\Order` | Контроллер заказа |
| `key` | `string` | Ключ удаляемого поля |

### Прерывание операции

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeRemoveFromOrder':
        $key = $scriptProperties['key'];

        // Запретить удаление обязательных полей
        $required = ['delivery_id', 'payment_id', 'email'];
        if (in_array($key, $required)) {
            $modx->event->output('Это поле нельзя удалить');
            return;
        }
        break;
}
```

---

## msOnRemoveFromOrder

Вызывается **после** удаления поля из заказа.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `\MiniShop3\Controllers\Order\Order` | Контроллер заказа |
| `key` | `string` | Ключ удалённого поля |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnRemoveFromOrder':
        $key = $scriptProperties['key'];

        // При удалении способа доставки — сбросить способ оплаты
        if ($key === 'delivery_id') {
            $controller = $scriptProperties['controller'];
            // Сброс оплаты...
        }
        break;
}
```

---

## msOnSubmitOrder

Вызывается при **отправке** заказа (нажатие кнопки "Оформить"). Позволяет проверить данные и добавить дополнительную информацию.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `\MiniShop3\Controllers\Order\Order` | Контроллер заказа |
| `data` | `array` | Дополнительные данные из формы |

### Прерывание операции

```php
<?php
switch ($modx->event->name) {
    case 'msOnSubmitOrder':
        $controller = $scriptProperties['controller'];
        $data = $scriptProperties['data'];

        // Проверка минимальной суммы заказа
        $response = $controller->getCost();
        if ($response['success'] && $response['data']['cart_cost'] < 1000) {
            $modx->event->output('Минимальная сумма заказа — 1000 ₽');
            return;
        }

        // Проверка рабочего времени
        $hour = (int)date('G');
        if ($hour < 9 || $hour > 21) {
            $modx->event->output('Заказы принимаются с 9:00 до 21:00');
            return;
        }
        break;
}
```

### Модификация данных

```php
<?php
switch ($modx->event->name) {
    case 'msOnSubmitOrder':
        $data = $scriptProperties['data'];

        $values = &$modx->event->returnedValues;

        // Добавить UTM-метки из сессии
        if (!empty($_SESSION['utm'])) {
            $data['properties']['utm'] = $_SESSION['utm'];
            $values['data'] = $data;
        }

        // Добавить источник заказа
        $data['properties']['source'] = $_SERVER['HTTP_REFERER'] ?? 'direct';
        $values['data'] = $data;
        break;
}
```

---

## msOnBeforeCreateOrder

Вызывается **перед** финальным созданием заказа (присвоением статуса "Новый").

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `\MiniShop3\Controllers\Order\Order` | Контроллер заказа |
| `msOrder` | `msOrder` | Объект заказа |

### Прерывание операции

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeCreateOrder':
        /** @var \MiniShop3\Model\msOrder $order */
        $order = $scriptProperties['msOrder'];

        // Проверка наличия товаров на складе
        foreach ($order->getMany('Products') as $product) {
            $msProduct = $product->getOne('Product');
            $remains = $msProduct->get('remains') ?? 0;
            if ($product->get('count') > $remains) {
                $modx->event->output(sprintf(
                    'Товар "%s" недоступен в нужном количестве',
                    $msProduct->get('pagetitle')
                ));
                return;
            }
        }
        break;
}
```

### Модификация заказа

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeCreateOrder':
        $order = $scriptProperties['msOrder'];

        // Добавить комментарий менеджеру
        $properties = $order->get('properties') ?? [];
        $properties['manager_note'] = 'Заказ создан ' . date('d.m.Y H:i');
        $order->set('properties', $properties);
        break;
}
```

---

## msOnCreateOrder

Вызывается **после** успешного создания заказа.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `\MiniShop3\Controllers\Order\Order` | Контроллер заказа |
| `msOrder` | `msOrder` | Созданный заказ |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnCreateOrder':
        /** @var \MiniShop3\Model\msOrder $order */
        $order = $scriptProperties['msOrder'];

        // Логирование
        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Order] Создан заказ #%s, сумма: %s',
            $order->get('num'),
            $order->get('cost')
        ));

        // Отправка в CRM
        // $crm->createOrder($order->toArray());

        // Уменьшение остатков на складе
        foreach ($order->getMany('Products') as $product) {
            $msProduct = $product->getOne('Product');
            $remains = $msProduct->get('remains') ?? 0;
            $msProduct->set('remains', max(0, $remains - $product->get('count')));
            $msProduct->save();
        }

        // Начисление бонусов покупателю
        if ($customer = $order->getOne('Customer')) {
            $bonus = floor($order->get('cost') / 100);
            $currentBonus = $customer->get('bonus') ?? 0;
            $customer->set('bonus', $currentBonus + $bonus);
            $customer->save();
        }
        break;
}
```

### Интеграция с внешними сервисами

```php
<?php
switch ($modx->event->name) {
    case 'msOnCreateOrder':
        $order = $scriptProperties['msOrder'];
        $address = $order->getOne('Address');

        // Отправка в службу доставки
        $deliveryData = [
            'order_id' => $order->get('num'),
            'recipient' => [
                'name' => $address->get('first_name') . ' ' . $address->get('last_name'),
                'phone' => $address->get('phone'),
                'email' => $address->get('email'),
            ],
            'address' => [
                'city' => $address->get('city'),
                'street' => $address->get('street'),
                'building' => $address->get('building'),
            ],
            'items' => [],
        ];

        foreach ($order->getMany('Products') as $product) {
            $deliveryData['items'][] = [
                'name' => $product->get('name'),
                'count' => $product->get('count'),
                'price' => $product->get('price'),
            ];
        }

        // $deliveryApi->createShipment($deliveryData);
        break;
}
```
