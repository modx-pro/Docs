---
title: API заказа
description: Программное создание, оформление заказов, управление статусами, стоимостью, адресами и логированием
---

# API заказа

Программный интерфейс для работы с заказами MiniShop3 из PHP-кода.

Заказ в MiniShop3 состоит из нескольких моделей:

- **msOrder** — основная модель заказа (стоимость, статус, доставка, оплата)
- **msOrderAddress** — адрес и контактные данные заказа
- **msOrderProduct** — позиции (товары) в заказе
- **msOrderLog** — журнал изменений заказа

Жизненный цикл заказа: **черновик** (draft) → **оформление** (submit) → **смена статусов**.

## Контроллер Order (фасад)

Основной способ работы с заказами из PHP — контроллер-фасад `Order`. Он делегирует логику в специализированные сервисы, но предоставляет единый интерфейс.

```php
$ms3 = $modx->services->get('ms3');

// Получить данные текущего заказа
$data = $ms3->order->get();

// Добавить поле
$result = $ms3->order->add('email', 'user@example.com');

// Установить несколько полей
$result = $ms3->order->set([
    'email' => 'user@example.com',
    'phone' => '+79991234567',
    'delivery' => 1,
    'payment' => 1,
]);

// Оформить заказ
$result = $ms3->order->submit();
// ['success' => true, 'data' => ['order_id' => 15, 'order_num' => '26/02-15', ...]]

// Очистить черновик
$ms3->order->clean();
```

::: info Инициализация
Перед использованием контроллера необходима инициализация с токеном клиента:
```php
$ms3->order->initialize($token);
$ms3->order->initDraft();
```
В контексте REST API и сниппетов это происходит автоматически.
:::

### Методы контроллера

| Метод | Описание |
|-------|----------|
| `initialize($token, $config)` | Инициализация с токеном клиента |
| `initDraft()` | Загрузка существующего черновика |
| `get()` | Данные заказа (поля + адрес) |
| `add($key, $value)` | Добавить/обновить поле |
| `set($fields)` | Установить несколько полей |
| `remove($key)` | Удалить поле (сбросить в null) |
| `validate($key, $value)` | Валидация значения поля |
| `submit($data)` | Оформить заказ |
| `clean()` | Очистить черновик |
| `getCost($onlyCost)` | Полная стоимость (корзина + доставка + оплата) |
| `getCartCost()` | Стоимость корзины |
| `getDeliveryCost()` | Стоимость доставки |
| `getPaymentCost()` | Комиссия оплаты |
| `setCustomerAddress($hash)` | Применить сохранённый адрес клиента |
| `cleanCustomerAddress()` | Очистить адресные поля |
| `getDeliveryValidationRules($deliveryId)` | Правила валидации доставки |
| `getDeliveryRequiresFields($deliveryId)` | Обязательные поля доставки |
| `getDraft()` | Получить объект черновика msOrder |

## Черновики (OrderDraftManager)

Черновик — это объект `msOrder` со статусом draft. Он создаётся при первом взаимодействии клиента с корзиной и хранит данные до оформления.

```php
$draftManager = $modx->services->get('ms3_order_draft_manager');

// Получить или создать черновик
$draft = $draftManager->getOrCreateDraft($token, 'web');

// Получить существующий черновик (без создания)
$draft = $draftManager->getDraft($token, 'web');

// Получить черновик по ID клиента (для восстановления после логина)
$draft = $draftManager->getDraftByCustomer($customerId, 'web');

// Данные черновика как массив (заказ + адрес)
$data = $draftManager->toArray($draft);
// Адресные поля возвращаются с префиксом address_:
// ['email' => '...', 'address_city' => 'Москва', 'address_street' => '...']

// Обновить одно поле
$draftManager->updateField($draft, 'order_comment', 'Позвоните перед доставкой');

// Привязать клиента к черновику
$draftManager->attachCustomer($draft, $customerId);

// Пересчитать стоимость
$draftManager->recalculate($draft);

// Установить стоимость доставки
$draftManager->setDeliveryCost($draft, 350.00);

// Проверить, пуста ли корзина
if ($draftManager->isEmpty($draft)) {
    // Нет товаров
}

// Очистить все поля
$draftManager->clean($draft);

// Удалить черновик полностью (с товарами и адресом)
$draftManager->deleteDraft($draft);
```

## Поля и валидация (OrderFieldManager)

Сервис управляет полями заказа, их валидацией и вызывает системные события при изменениях.

```php
$fieldManager = $modx->services->get('ms3_order_field_manager');

// Добавить поле (с валидацией и событиями)
$result = $fieldManager->add($draft, $orderData, 'email', 'user@example.com');
// ['success' => true, 'data' => [...]]

// Удалить поле
$fieldManager->remove($draft, $orderData, 'email');

// Валидация без сохранения
$result = $fieldManager->validate($orderData, 'phone', '+79991234567');
// ['success' => true] или ['success' => false, 'message' => 'Ошибка']
```

### Правила валидации

По умолчанию валидируются `delivery_id` и `payment_id` как `required|numeric`. Дополнительные правила загружаются из настроек доставки.

```php
// Получить правила валидации для доставки
$rules = $fieldManager->getDeliveryValidationRules($deliveryId);
// ['city' => 'required|min:2', 'street' => 'required', ...]

// Получить список обязательных полей
$required = $fieldManager->getDeliveryRequiredFields($deliveryId);
// ['city', 'street', 'building', 'phone']

// Добавить свои правила
$fieldManager->setValidationRules([
    'company_name' => 'required|min:3',
]);
```

## Расчёт стоимости (OrderCostCalculator)

```php
$calculator = $modx->services->get('ms3_order_cost_calculator');

// Стоимость корзины
$result = $calculator->getCartCost($draft, $token);
// ['cost' => 5000.00]

// Стоимость доставки
$result = $calculator->getDeliveryCost($draft, $orderData, $token);
// ['cost' => 300.00]

// Комиссия оплаты
$result = $calculator->getPaymentCost($draft, $orderData, $token);
// ['cost' => 150.00]

// Полная стоимость
$result = $calculator->getTotalCost($draft, $orderData, $token);
// ['cost' => 5450.00, 'cart_cost' => 5000.00, 'delivery_cost' => 300.00, 'payment_cost' => 150.00]
```

Каждый метод вызывает пару событий `msOnBefore...` / `msOn...`, позволяющих плагинам модифицировать стоимость.

## Оформление заказа (OrderSubmitHandler)

`OrderSubmitHandler` выполняет полный цикл оформления: валидация → создание клиента → расчёт стоимости → генерация номера → смена статуса → вызов оплаты.

```php
$submitHandler = $modx->services->get('ms3_order_submit_handler');

$result = $submitHandler->submit($draft, $orderData, $token);
// Успех:
// [
//     'success' => true,
//     'data' => [
//         'order_id' => 15,
//         'order_num' => '26/02-15',
//         'redirect_url' => '/thank-you?msorder=15',
//     ],
//     'message' => 'Заказ успешно оформлен'
// ]
```

### Порядок действий при оформлении

1. Событие `msOnSubmitOrder`
2. Проверка: корзина не пуста
3. Валидация `delivery_id`, `payment_id` и обязательных полей доставки
4. Поиск/создание клиента (`msCustomer`)
5. Опционально: создание пользователя MODX (настройка `ms3_order_register_user_on_submit`)
6. Расчёт стоимости (корзина + доставка + оплата)
7. Генерация номера заказа
8. Сохранение адреса клиента
9. События `msOnBeforeCreateOrder` / `msOnCreateOrder`
10. Смена статуса на `ms3_status_new` (по умолчанию: 2)
11. Вызов `$msPayment->send()` — редирект на оплату
12. Возврат URL страницы «Спасибо»

### Генерация номера заказа

```php
$num = $submitHandler->getNewOrderNum();
// "26/02-15" — формат настраивается:
// ms3_order_format_num — формат даты (по умолчанию 'ym')
// ms3_order_format_num_separator — разделитель (по умолчанию '/')
```

## Управление статусами (OrderStatusService)

```php
$statusService = $modx->services->get('ms3_order_status');

// Сменить статус заказа
$result = $statusService->change($orderId, $newStatusId);
// true — успех
// string — текст ошибки из лексикона

// Сменить статус без уведомлений
$result = $statusService->change($orderId, $newStatusId, true);
```

### Ограничения статусов

| Свойство статуса | Поведение |
|------------------|-----------|
| `final = true` | Нельзя сменить на другой статус |
| `fixed = true` | Можно переключить только на статус с большей `position` |

### Уведомления

При смене статуса автоматически отправляются уведомления через `NotificationManager`:

- **Клиенту** — email, телефон из `msCustomer` или `modUserProfile`
- **Менеджерам** — из настроек `ms3_email_manager`, `ms3_phone_manager`, `ms3_telegram_manager`

## Позиции заказа (msOrderProduct)

Товары в заказе хранятся в модели `msOrderProduct` (таблица `ms3_order_products`).

### Поля msOrderProduct

| Поле | Тип | Описание |
|------|-----|----------|
| `product_id` | integer | ID товара (msProduct) |
| `order_id` | integer | ID заказа |
| `product_key` | string | Уникальный ключ позиции (напр. `123_a1b2c3d4`) |
| `name` | string | Название товара |
| `count` | integer | Количество |
| `price` | float | Цена за единицу |
| `weight` | float | Вес за единицу |
| `cost` | float | Стоимость позиции (price × count) |
| `options` | json | Выбранные опции |
| `properties` | json | Дополнительные свойства |

### Программная работа с позициями

```php
use MiniShop3\Model\msOrder;
use MiniShop3\Model\msOrderProduct;

$order = $modx->getObject(msOrder::class, $orderId);

// Получить все позиции заказа
$products = $order->getMany('Products');
foreach ($products as $product) {
    echo $product->get('name') . ': ' . $product->get('count') . ' × ' . $product->get('price');
}

// Добавить позицию
$item = $modx->newObject(msOrderProduct::class);
$item->set('order_id', $orderId);
$item->set('product_id', $productId);
$item->set('product_key', $productId . '_' . md5(json_encode($options)));
$item->set('name', 'Товар');
$item->set('count', 2);
$item->set('price', 1500.00);
$item->set('cost', 3000.00);
$item->set('weight', 0.5);
$item->set('options', $options);
$item->save();

// Пересчитать итоги заказа после изменения позиций
$order->updateProducts();
```

::: warning Пересчёт итогов
После добавления, удаления или изменения позиций вызывайте `$order->updateProducts()`. Метод пересчитывает `cart_cost`, `weight` и `cost` на основе всех `msOrderProduct`.
:::

## Адрес заказа (msOrderAddress)

Каждый заказ имеет один связанный объект `msOrderAddress` (таблица `ms3_order_addresses`).

### Поля msOrderAddress

| Поле | Тип | Описание |
|------|-----|----------|
| `order_id` | integer | ID заказа |
| `first_name` | string | Имя |
| `last_name` | string | Фамилия |
| `phone` | string | Телефон |
| `email` | string | Email |
| `country` | string | Страна |
| `index` | string | Почтовый индекс |
| `region` | string | Регион |
| `city` | string | Город |
| `metro` | string | Станция метро |
| `street` | string | Улица |
| `building` | string | Дом |
| `entrance` | string | Подъезд |
| `floor` | string | Этаж |
| `room` | string | Квартира/офис |
| `comment` | string | Комментарий к адресу |
| `text_address` | string | Полный адрес одной строкой |
| `properties` | json | Дополнительные свойства |

### Программная работа

```php
use MiniShop3\Model\msOrder;

$order = $modx->getObject(msOrder::class, $orderId);
$address = $order->getOne('Address');

// Чтение
echo $address->get('city');       // "Москва"
echo $address->get('street');     // "Ленина"

// Обновление
$address->set('city', 'Санкт-Петербург');
$address->save();
```

### OrderAddressManager

Сервис для работы с адресами в контексте черновика:

```php
$addressManager = $modx->services->get('ms3_order_address_manager');

// Применить сохранённый адрес клиента к черновику
$result = $addressManager->setCustomerAddress($draft, $orderData, $addressHash);

// Очистить все адресные поля
$result = $addressManager->cleanCustomerAddress($draft, $orderData);

// Сохранить адрес заказа в адреса клиента
$savedAddress = $addressManager->saveToCustomerAddresses($customerId, $orderData);
```

## Журнал заказа (OrderLogService)

Журнал фиксирует все изменения заказа: смену статуса, изменение полей, работу с позициями.

```php
$logService = $modx->services->get('ms3_order_log');

// Добавить запись в журнал
$logService->addEntry($orderId, 'status', [
    'old' => 1,
    'new' => 2,
]);

// Добавить запись о произвольном действии
$logService->addEntry($orderId, 'field', [
    'key' => 'delivery_id',
    'old_value' => 1,
    'new_value' => 2,
], true);  // visible = true (видна клиенту)

// Получить записи журнала
$entries = $logService->getEntries($orderId);
// Только видимые клиенту
$entries = $logService->getEntries($orderId, true);
// С лимитом
$entries = $logService->getEntries($orderId, false, 50);

// Проверить, логируется ли действие (настройка ms3_order_log_actions)
if ($logService->shouldLog('status')) {
    // ...
}
```

### Типы действий

| Константа | Значение | Описание |
|-----------|----------|----------|
| `msOrderLog::ACTION_STATUS` | `status` | Смена статуса |
| `msOrderLog::ACTION_PAYMENT` | `payment` | Изменение оплаты |
| `msOrderLog::ACTION_PRODUCTS` | `products` | Изменение позиций |
| `msOrderLog::ACTION_ADDRESS` | `address` | Изменение адреса |
| `msOrderLog::ACTION_FIELD` | `field` | Изменение поля заказа |

Настройка `ms3_order_log_actions` определяет, какие действия логируются (по умолчанию: `status,products,field,address`; значение `*` для логирования всех действий).

## Финализация из менеджера (OrderFinalizeService)

`OrderFinalizeService` используется для оформления заказов, созданных менеджером в админке.

```php
$finalizeService = $modx->services->get('ms3_order_finalize');

$result = $finalizeService->finalize($orderId, [
    'skip_validation' => false,      // Пропустить валидацию полей
    'skip_notifications' => false,   // Пропустить уведомления
    'skip_payment' => true,          // Пропустить вызов оплаты
    'create_customer' => true,       // Создать msCustomer
    'force_create_customer' => false, // Создать даже при дубликате
]);
```

Финализация выполняет те же шаги, что и `submit`, но адаптирована для контекста менеджера: позволяет пропускать отдельные этапы и работает с уже существующим заказом (не черновиком).

## Разрешение пользователей (OrderUserResolver)

Сервис создаёт или находит пользователя MODX по данным заказа.

```php
$userResolver = $modx->services->get('ms3_order_user_resolver');

// Получить или создать MODX user_id
$userId = $userResolver->getUserId($orderData);

// Проверить существование пользователя
$user = $userResolver->checkUserExists([
    'email' => 'user@example.com',
    'phone' => '+79991234567',
]);

// Создать пользователя
$user = $userResolver->createUser([
    'email' => 'user@example.com',
    'first_name' => 'Иван',
    'last_name' => 'Иванов',
    'phone' => '+79991234567',
]);
```

Настройка `ms3_order_user_groups` определяет группы для новых пользователей (формат: `group_id:role_id`, через запятую).

## Поля msOrder

| Поле | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `user_id` | integer | 0 | ID пользователя MODX |
| `customer_id` | integer | 0 | ID клиента (msCustomer) |
| `token` | string | — | Токен сессии клиента |
| `uuid` | string | — | Уникальный UUID заказа |
| `createdon` | datetime | null | Дата создания |
| `updatedon` | datetime | null | Дата обновления |
| `num` | string | '' | Номер заказа |
| `cost` | float | 0.0 | Итоговая стоимость |
| `cart_cost` | float | 0.0 | Стоимость товаров |
| `delivery_cost` | float | 0.0 | Стоимость доставки |
| `weight` | float | 0.0 | Общий вес |
| `status_id` | integer | 0 | ID текущего статуса |
| `delivery_id` | integer | 0 | ID способа доставки |
| `payment_id` | integer | 0 | ID способа оплаты |
| `context` | string | 'web' | Контекст MODX |
| `order_comment` | string | null | Комментарий к заказу |
| `properties` | json | null | Дополнительные свойства |

### Связи msOrder

| Связь | Модель | Тип | Описание |
|-------|--------|-----|----------|
| `Address` | msOrderAddress | composite (one) | Адрес заказа |
| `Products` | msOrderProduct | composite (many) | Позиции заказа |
| `Log` | msOrderLog | composite (many) | Журнал изменений |
| `Customer` | msCustomer | aggregate | Клиент |
| `Status` | msOrderStatus | aggregate | Статус |
| `Delivery` | msDelivery | aggregate | Способ доставки |
| `Payment` | msPayment | aggregate | Способ оплаты |
| `User` | modUser | aggregate | Пользователь MODX |

::: info Composite vs Aggregate
Composite-связи удаляются каскадно при удалении заказа (адрес, позиции, журнал). Aggregate-связи — только ссылки, связанные объекты не удаляются.
:::

## События

| Событие | Когда вызывается |
|---------|-----------------|
| `msOnBeforeSaveOrder` / `msOnSaveOrder` | Сохранение заказа |
| `msOnBeforeRemoveOrder` / `msOnRemoveOrder` | Удаление заказа |
| `msOnBeforeGetCartCost` / `msOnGetCartCost` | Расчёт стоимости корзины |
| `msOnBeforeGetDeliveryCost` / `msOnGetDeliveryCost` | Расчёт стоимости доставки |
| `msOnBeforeGetPaymentCost` / `msOnGetPaymentCost` | Расчёт комиссии оплаты |
| `msOnBeforeAddToOrder` / `msOnAddToOrder` | Добавление/изменение поля |
| `msOnBeforeRemoveFromOrder` / `msOnRemoveFromOrder` | Удаление поля |
| `msOnBeforeValidateOrderValue` / `msOnValidateOrderValue` | Валидация значения |
| `msOnErrorValidateOrderValue` | Ошибка валидации |
| `msOnSubmitOrder` | Начало оформления |
| `msOnBeforeCreateOrder` / `msOnCreateOrder` | Создание заказа |
| `msOnBeforeChangeOrderStatus` / `msOnChangeOrderStatus` | Смена статуса |
| `msOnBeforeGetOrderUser` / `msOnGetOrderUser` | Поиск/создание пользователя |
| `msOnBeforeFinalizeOrder` / `msOnFinalizeOrder` | Финализация из менеджера |

Подробное описание параметров событий — в разделе [События](../events/).
