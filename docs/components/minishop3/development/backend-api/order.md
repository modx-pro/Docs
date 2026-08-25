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
    'first_name' => 'Иван',
    'delivery_id' => 1,
    'payment_id' => 1,
    'order_comment' => 'Позвоните перед доставкой',
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
| --- | --- |
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

### Пересчёт стоимости в админке — `POST /api/mgr/orders/{id}/recalculate-cost`

Появился в 1.11.0. Сервис `ManagerOrderCostRecalculator` пересчитывает `cart_cost`, `weight`, `delivery_cost`, итоговый `cost` по сохранённым позициям заказа и текущим `delivery_id` / `payment_id` без побочных эффектов на других полях.

Тело запроса:

```json
{
  "mode": "auto",
  "manual_delivery_cost": 500.0
}

```

Режимы (`mode`):

| Режим | Поведение |
| --- | --- |
| `auto` (по умолчанию) | Пересчитывает только для `DefaultDelivery` / `DefaultPayment` (по полям `price`, `weight_price`, `free_delivery_amount`, проценты). Для кастомных handler'ов возвращает warning `delivery_manual_required` / `payment_manual_required` и сохраняет прежнюю `delivery_cost` / комиссию 0 — не дёргает внешние API. |
| `manual` | Использует переданный `manual_delivery_cost`. Комиссия оплаты считается по полю автоматом. |
| `force_provider` | Явно вызывает `loadController()` → `getCost()` и `loadHandler()` → `getCost()` в `try/catch`. При сбое — warning `delivery_provider_error` / `payment_provider_error`, прежние значения сохраняются. |

Ответ содержит данные заказа (как `GET /api/mgr/orders/{id}`) плюс:

```json
{
  "breakdown": {
    "cart_cost": 5000.0,
    "weight": 1.5,
    "delivery_cost": 300.0,
    "payment_cost": 150.0,
    "cost": 5450.0
  },
  "warnings": ["delivery_manual_required"]
}

```

Применяет общий guard `OrderService::clampComputedTotal()` — итог не может уйти ниже нуля. Скидки/наценки доставки и оплаты (отрицательные `price`, см. 1.11.0) обрабатываются через `MiniShop3\Utils\PriceAdjustment`.

Пример вызова из JS (карточка заказа в mgr):

```javascript
const response = await fetch(`/api/mgr/orders/${orderId}/recalculate-cost`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'modAuth': MODx.modxConfig.auth, // или актуальный mgr-auth заголовок
  },
  body: JSON.stringify({
    mode: 'manual',
    manual_delivery_cost: 500,
  }),
})
const json = await response.json()
// json.data.breakdown — cart_cost / delivery_cost / payment_cost / cost
// json.data.warnings — например delivery_manual_required
```

Через HTTP (REST mgr API):

```bash
curl -X POST 'https://example.com/api/mgr/orders/42/recalculate-cost' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: …' \
  -d '{"mode":"auto"}'
```

См. также [routing](/components/minishop3/development/routing).

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
| --- | --- |
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
| --- | --- | --- |
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
| --- | --- | --- |
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
| --- | --- | --- |
| `msOrderLog::ACTION_STATUS` | `status` | Смена статуса |
| `msOrderLog::ACTION_PAYMENT` | `payment` | Изменение оплаты |
| `msOrderLog::ACTION_PRODUCTS` | `products` | Изменение позиций |
| `msOrderLog::ACTION_ADDRESS` | `address` | Изменение адреса |
| `msOrderLog::ACTION_FIELD` | `field` | Изменение поля заказа |

Настройка `ms3_order_log_actions` определяет, какие действия логируются (по умолчанию: `status,products,field,address`; значение `*` для логирования всех действий).

## Финализация из менеджера (OrderFinalizeService)

`OrderFinalizeService` используется для оформления заказов, созданных менеджером в админке.

```php
use MiniShop3\Services\Order\OrderOrigin;

$finalizeService = $modx->services->get('ms3_order_finalize');

$result = $finalizeService->finalize($orderId, [
    'skip_validation' => false,
    'skip_notifications' => false,
    'create_customer' => true,
    'force_create_customer' => false,
    'origin' => OrderOrigin::MANAGER, // по умолчанию; для CRM — OrderOrigin::INTEGRATION
]);
```

Финализация допускает `skip_*` и работает с уже существующим черновиком. Вызова платёжного gateway здесь нет (в отличие от storefront `submit`).

Параметр `origin` (`OrderOrigin`): `manager` (по умолчанию), `storefront`, `integration`. При `manager` дополнительно вызываются `msOnBeforeMgrCreateOrder` / `msOnMgrCreateOrder`. Ключ `from_manager` в событиях = `true` только для `origin=manager`.

## Программное создание заказа (ProgrammaticOrderService)

API без HTTP-сессии для extras, cron и интеграций. Это **не** Web API: в `routes/web.php` отдельного эндпоинта нет.

| | |
| --- | --- |
| DI | `ms3_programmatic_order` |
| Класс | `MiniShop3\Services\Order\ProgrammaticOrderService` |
| Черновик | `OrderDraftManager::createSessionlessDraft()` (без PHP-сессии и cart token) |
| Финализация | `OrderFinalizeService::finalize(..., origin=integration)` |
| Идемпотентность | колонка `ms3_orders.idempotency_key` (unique, nullable) |

```php
use MiniShop3\Services\Order\OrderOrigin;

$orders = $modx->services->get('ms3_programmatic_order');

$result = $orders->create([
    'idempotency_key' => 'crm-invoice-10042', // обязательно
    'products' => [
        ['product_id' => 15, 'count' => 2],
        // или снимок без ресурса:
        // ['name' => 'Услуга', 'price' => 500, 'count' => 1, 'weight' => 0, 'options' => []],
    ],
    'customer_id' => 0,
    'delivery_id' => 1,
    'payment_id' => 1,
    'address' => [
        'first_name' => 'Иван',
        'email' => 'user@example.com',
        'phone' => '+79991234567',
    ],
    'order_comment' => 'Из CRM',
    'context' => 'web',
    'origin' => OrderOrigin::INTEGRATION,
    // 'delivery_cost' => 300, // → cost_mode=manual при finalize
    // 'skip_notifications' => true,
    // 'skip_validation' => false,
    // 'properties' => ['source' => 'crm'],
]);

if (!$result['success']) {
    // Частые message:
    // ms3_order_err_idempotency_key_required
    // ms3_order_err_products_required
    // ms3_order_err_programmatic_create
    // либо ошибки finalize / валидации
    return $result;
}

// Успех: data = { order_id, uuid, num, status_id }
// Повтор того же idempotency_key:
//   уже оформленный заказ → success + ms3_order_programmatic_idempotent
//   черновик со статусом draft → повторная финализация
```

События: `msOnBeforeCreateOrder` / `msOnCreateOrder` с `origin=integration` и **без** `from_manager`. События `msOnBeforeMgrCreateOrder` / `msOnMgrCreateOrder` **не** вызываются.

Отличие от `POST /api/mgr/orders` (менеджер создаёт пустой/частичный заказ в UI) и от storefront `POST /api/v1/order/submit` (нужны токен и корзина).

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
| --- | --- | --- | --- |
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
| `idempotency_key` | string | null | Ключ идемпотентности (программные заказы, unique) |
| `properties` | json | null | Дополнительные свойства (в т.ч. `origin` для интеграций) |

### Связи msOrder

| Связь | Модель | Тип | Описание |
| --- | --- | --- | --- |
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
| --- | --- |
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
| `msOnBeforeMgrCreateOrder` / `msOnMgrCreateOrder` | Финализация из менеджера (только `origin=manager`) |

## Manager REST API

Эндпоинты для Vue-интерфейса заказов (сессия mgr, см. [routing](../routing)):

| Метод | Путь | Описание |
| --- | --- | --- |
| GET | `/api/mgr/orders/stats` | Агрегаты для фильтров и дашборда |
| POST | `/api/mgr/orders` | Создание заказа из менеджера |
| POST | `/api/mgr/orders/{id}/finalize` | Финализация черновика |
| POST | `/api/mgr/orders/{id}/recalculate-cost` | Пересчёт через `ManagerOrderCostRecalculator` |

Создание и финализация из mgr проходят через `OrderFinalizeService` и события `msOnBeforeMgrCreateOrder` / `msOnMgrCreateOrder`.

Подробное описание параметров событий — в разделе [События](../events).
