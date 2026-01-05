---
title: События покупателя
---
# События покупателя

События для управления данными покупателя: добавление полей, валидация, создание покупателя, управление адресами.

## msOnBeforeGetOrderCustomer

Вызывается **перед** получением покупателя для заказа.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `\MiniShop3\Controllers\Order\Order` | Контроллер заказа |
| `msCustomer` | `msCustomer\|null` | Объект покупателя (может быть null) |

### Прерывание операции

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeGetOrderCustomer':
        // Запретить оформление для неавторизованных
        if (!$modx->user->isAuthenticated()) {
            $modx->event->output('Для оформления заказа необходимо авторизоваться');
            return;
        }
        break;
}
```

---

## msOnGetOrderCustomer

Вызывается **после** получения покупателя для заказа.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `controller` | `\MiniShop3\Controllers\Order\Order` | Контроллер заказа |
| `msCustomer` | `msCustomer\|null` | Объект покупателя |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnGetOrderCustomer':
        /** @var \MiniShop3\Model\msCustomer $customer */
        $customer = $scriptProperties['msCustomer'];

        if ($customer) {
            // Обновить статистику посещений
            $visits = $customer->get('visits') ?? 0;
            $customer->set('visits', $visits + 1);
            $customer->set('last_visit', date('Y-m-d H:i:s'));
            $customer->save();
        }
        break;
}
```

---

## msOnBeforeAddToCustomer

Вызывается **перед** добавлением или изменением поля покупателя.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `customer` | `\MiniShop3\Controllers\Customer\Customer` | Контроллер покупателя |
| `key` | `string` | Ключ поля |
| `value` | `mixed` | Значение поля |

### Прерывание операции

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddToCustomer':
        $key = $scriptProperties['key'];
        $value = $scriptProperties['value'];

        // Запретить определённые домены email
        if ($key === 'email') {
            $blockedDomains = ['tempmail.com', 'throwaway.com'];
            $domain = substr($value, strpos($value, '@') + 1);

            if (in_array($domain, $blockedDomains)) {
                $modx->event->output('Временные email адреса не принимаются');
                return;
            }
        }
        break;
}
```

### Модификация данных

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddToCustomer':
        $key = $scriptProperties['key'];
        $value = $scriptProperties['value'];

        $values = &$modx->event->returnedValues;

        // Форматирование телефона
        if ($key === 'phone') {
            $values['value'] = '+7' . preg_replace('/\D/', '', $value);
        }

        // Капитализация имени
        if ($key === 'first_name' || $key === 'last_name') {
            $values['value'] = mb_convert_case($value, MB_CASE_TITLE, 'UTF-8');
        }
        break;
}
```

---

## msOnAddToCustomer

Вызывается **после** добавления поля покупателю.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `customer` | `\MiniShop3\Controllers\Customer\Customer` | Контроллер покупателя |
| `key` | `string` | Ключ поля |
| `value` | `mixed` | Сохранённое значение |
| `msCustomer` | `msCustomer` | Объект покупателя |
| `isNew` | `bool` | Новый ли покупатель |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnAddToCustomer':
        $key = $scriptProperties['key'];
        $value = $scriptProperties['value'];
        $customer = $scriptProperties['msCustomer'];
        $isNew = $scriptProperties['isNew'];

        // Логирование новых покупателей
        if ($isNew) {
            $modx->log(modX::LOG_LEVEL_INFO, sprintf(
                '[Customer] Создан покупатель #%d: %s = %s',
                $customer->get('id'),
                $key,
                $value
            ));
        }
        break;
}
```

---

## msOnBeforeValidateCustomerValue

Вызывается **перед** валидацией значения поля покупателя.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `customer` | `\MiniShop3\Controllers\Customer\Customer` | Контроллер покупателя |
| `key` | `string` | Ключ поля |
| `value` | `mixed` | Значение для валидации |

### Модификация данных

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeValidateCustomerValue':
        $key = $scriptProperties['key'];
        $value = $scriptProperties['value'];

        $values = &$modx->event->returnedValues;

        // Нормализация email перед валидацией
        if ($key === 'email') {
            $values['value'] = strtolower(trim($value));
        }
        break;
}
```

---

## msOnValidateCustomerValue

Вызывается **после** успешной валидации значения поля.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `customer` | `\MiniShop3\Controllers\Customer\Customer` | Контроллер покупателя |
| `key` | `string` | Ключ поля |
| `value` | `mixed` | Валидированное значение |

### Модификация данных

```php
<?php
switch ($modx->event->name) {
    case 'msOnValidateCustomerValue':
        $key = $scriptProperties['key'];
        $value = $scriptProperties['value'];

        $values = &$modx->event->returnedValues;

        // Постобработка телефона
        if ($key === 'phone') {
            // Форматирование для отображения
            $values['value'] = preg_replace(
                '/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/',
                '+$1 ($2) $3-$4-$5',
                preg_replace('/\D/', '', $value)
            );
        }
        break;
}
```

---

## msOnErrorValidateCustomerValue

Вызывается при **ошибке** валидации поля покупателя.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `customer` | `\MiniShop3\Controllers\Customer\Customer` | Контроллер покупателя |
| `key` | `string` | Ключ поля |
| `value` | `mixed` | Невалидное значение |
| `errors` | `array` | Массив ошибок |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnErrorValidateCustomerValue':
        $key = $scriptProperties['key'];
        $errors = $scriptProperties['errors'];

        // Кастомизация сообщений об ошибках
        $modx->log(modX::LOG_LEVEL_WARN, sprintf(
            '[Customer] Ошибка валидации %s: %s',
            $key,
            json_encode($errors)
        ));
        break;
}
```

---

## msOnBeforeCreateCustomer

Вызывается **перед** созданием нового покупателя.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `customer` | `\MiniShop3\Controllers\Customer\Customer` | Контроллер покупателя |
| `customerData` | `array` | Данные для создания |

### Прерывание операции

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeCreateCustomer':
        $data = $scriptProperties['customerData'];

        // Проверка на дублирование
        $existing = $modx->getObject(\MiniShop3\Model\msCustomer::class, [
            'email' => $data['email'],
        ]);

        if ($existing) {
            $modx->event->output('Покупатель с таким email уже существует');
            return;
        }
        break;
}
```

### Модификация данных

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeCreateCustomer':
        $data = $scriptProperties['customerData'];

        $values = &$modx->event->returnedValues;

        // Добавить дополнительные поля
        $data['createdon'] = date('Y-m-d H:i:s');
        $data['source'] = $_SERVER['HTTP_REFERER'] ?? 'direct';
        $data['ip'] = $_SERVER['REMOTE_ADDR'] ?? '';

        $values['customerData'] = $data;
        break;
}
```

---

## msOnCreateCustomer

Вызывается **после** создания нового покупателя.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `customer` | `\MiniShop3\Controllers\Customer\Customer` | Контроллер покупателя |
| `customerData` | `array` | Данные покупателя |
| `msCustomer` | `msCustomer` | Созданный объект покупателя |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnCreateCustomer':
        /** @var \MiniShop3\Model\msCustomer $customer */
        $customer = $scriptProperties['msCustomer'];

        // Логирование
        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Customer] Создан покупатель #%d: %s %s (%s)',
            $customer->get('id'),
            $customer->get('first_name'),
            $customer->get('last_name'),
            $customer->get('email')
        ));

        // Отправка в CRM
        // $crm->createContact($customer->toArray());

        // Подписка на рассылку
        // $mailService->subscribe($customer->get('email'));
        break;
}
```

---

## msOnBeforeAddCustomerAddress

Вызывается **перед** добавлением адреса покупателю.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `customer` | `\MiniShop3\Controllers\Customer\Customer` | Контроллер покупателя |
| `addressData` | `array` | Данные адреса |

### Прерывание операции

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddCustomerAddress':
        $data = $scriptProperties['addressData'];

        // Ограничение количества адресов
        $count = $modx->getCount(\MiniShop3\Model\msCustomerAddress::class, [
            'customer_id' => $data['customer_id'],
        ]);

        if ($count >= 5) {
            $modx->event->output('Максимум 5 адресов на покупателя');
            return;
        }
        break;
}
```

### Модификация данных

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeAddCustomerAddress':
        $data = $scriptProperties['addressData'];

        $values = &$modx->event->returnedValues;

        // Геокодирование адреса
        $fullAddress = implode(', ', array_filter([
            $data['city'],
            $data['street'],
            $data['building'],
        ]));

        // $coordinates = $geocoder->geocode($fullAddress);
        // $data['lat'] = $coordinates['lat'];
        // $data['lng'] = $coordinates['lng'];

        $values['addressData'] = $data;
        break;
}
```

---

## msOnAddCustomerAddress

Вызывается **после** добавления адреса покупателю.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `customer` | `\MiniShop3\Controllers\Customer\Customer` | Контроллер покупателя |
| `addressData` | `array` | Данные адреса |
| `msCustomerAddress` | `msCustomerAddress` | Созданный объект адреса |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnAddCustomerAddress':
        $address = $scriptProperties['msCustomerAddress'];

        $modx->log(modX::LOG_LEVEL_INFO, sprintf(
            '[Customer] Добавлен адрес #%d для покупателя #%d: %s',
            $address->get('id'),
            $address->get('customer_id'),
            $address->get('name')
        ));
        break;
}
```

---

## Полный пример: верификация покупателя

```php
<?php
/**
 * Плагин: Верификация покупателя
 * События: msOnBeforeCreateCustomer, msOnCreateCustomer
 */

switch ($modx->event->name) {

    case 'msOnBeforeCreateCustomer':
        $data = $scriptProperties['customerData'];

        // Проверка email на существование
        $existing = $modx->getObject(\MiniShop3\Model\msCustomer::class, [
            'email' => $data['email'],
        ]);

        if ($existing) {
            // Обновляем токен существующего покупателя
            $existing->set('token', $data['token']);
            $existing->save();
            $modx->event->output('Покупатель найден по email');
            return;
        }

        // Проверка телефона
        if (!empty($data['phone'])) {
            $existingByPhone = $modx->getObject(\MiniShop3\Model\msCustomer::class, [
                'phone' => $data['phone'],
            ]);

            if ($existingByPhone) {
                $existingByPhone->set('token', $data['token']);
                $existingByPhone->save();
                $modx->event->output('Покупатель найден по телефону');
                return;
            }
        }

        // Добавляем метаданные
        $values = &$modx->event->returnedValues;
        $data['verified'] = false;
        $data['verification_code'] = substr(md5(uniqid()), 0, 6);
        $data['createdon'] = date('Y-m-d H:i:s');
        $values['customerData'] = $data;
        break;

    case 'msOnCreateCustomer':
        $customer = $scriptProperties['msCustomer'];
        $data = $scriptProperties['customerData'];

        // Отправка кода верификации
        if (!empty($data['verification_code']) && !empty($customer->get('email'))) {
            // Отправка email с кодом
            // $mailer->send($customer->get('email'), 'Код верификации: ' . $data['verification_code']);

            $modx->log(modX::LOG_LEVEL_INFO, sprintf(
                '[Verification] Код %s отправлен на %s',
                $data['verification_code'],
                $customer->get('email')
            ));
        }
        break;
}
```
