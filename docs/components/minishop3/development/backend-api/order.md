---
title: API заказа
description: Программное создание, оформление заказов, управление статусами, стоимостью, адресами и логированием
---

# API заказа

Заказ собирается из четырёх моделей:

- **msOrder**: стоимость, статус, доставка, оплата
- **msOrderAddress**: адрес и контакты
- **msOrderProduct**: позиции
- **msOrderLog**: журнал изменений

Жизненный цикл: **черновик** (draft) → **оформление** (submit) → **смена статусов**.

## Контроллер Order (фасад)

Контроллер `Order` (`$ms3->order`) — точка входа к сервисам заказа из PHP.

```mermaid
flowchart LR
  draft[Черновик] --> init[initialize или initDraft]
  init --> fields["add или set"]
  fields --> submit[submit]
  submit --> status[ms3_status_new]
  status --> svc[OrderStatusService]
```

::: warning Результат приходит в конверте
Методы контроллера, которые возвращают `array`, отдают конверт `['success' => bool, 'message' => string, 'data' => array]`. Это тот же `Utils::success()` / `Utils::error()`, что и в Web API. Нужные значения лежат в `data`. У `get()` поля заказа вложены ещё на уровень: `data['order']`.

Значение напрямую отдают только: `initialize()`, `initDraft()`, `remove()` и `hasPayment()` (`bool`); `getDraft()` (объект `msOrder` или `null`); `getUserId()` (`int`); `getNewOrderNum()` (`string`).

Особый случай — `restrictDraft()`: он объявлен как `void`. Метод пересчитывает черновик (`OrderDraftManager::recalculate()`), и об успехе судят не по возвращаемому значению, а по состоянию заказа.
:::

```php
$ms3 = $modx->services->get('ms3');

// Получить данные текущего заказа
$response = $ms3->order->get();
$order = $response['data']['order'];

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
// Ответ оплаты. У DefaultPayment в data есть order_id, order_num, payment_link.
// Ключ редиректа — redirect, в query msorder лежит uuid заказа.

// Очистить черновик
$ms3->order->clean();

```

::: info Инициализация
До первого вызова контроллеру нужен токен покупателя:

```php
$ms3->order->initialize($token);
$ms3->order->initDraft();

```

В REST API и сниппетах это происходит автоматически.
:::

### Методы контроллера

| Метод | Описание |
| --- | --- |
| `initialize($token, $config)` | Инициализация с токеном покупателя |
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
| `setCustomerAddress($hash)` | Применить сохранённый адрес покупателя |
| `cleanCustomerAddress()` | Очистить адресные поля |
| `getDeliveryValidationRules($deliveryId)` | Правила валидации доставки |
| `getDeliveryRequiresFields($deliveryId)` | Обязательные поля доставки. Имя не опечатка: у контроллера и Web API метод называется `Requires`, а у `OrderFieldManager` — `getDeliveryRequiredFields()` |
| `getDraft()` | Объект черновика `msOrder` |
| `hasPayment($deliveryId, $paymentId)` | Допустима ли пара «доставка и оплата» |
| `getUserId()` | ID пользователя MODX для текущего заказа. Если его нет, регистрирует |
| `getNewOrderNum()` | Устарел. Показывает следующий номер, не занимая его; при оформлении номер выдаёт `OrderNumberGenerator::runWithNextNumber()` |
| `restrictDraft($draft)` | Пересчитать стоимость черновика через `OrderDraftManager::recalculate()` |

## Черновики (OrderDraftManager)

Черновик: объект `msOrder` в статусе `draft`. Появляется при первом обращении покупателя к корзине и хранит данные до оформления.

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
// С 1.14.2-beta1 ключ пишется только в одну таблицу: заказ приоритетнее
// адреса. Для общих колонок (id, createdon, updatedon, properties) адрес
// больше не обновляется — properties адреса ставьте напрямую:
// $draft->Address->set('properties', [...]); $draft->Address->save();

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

Остальные публичные методы:

| Метод | Описание |
| --- | --- |
| `findDraftByToken($token, $ctx)` | Черновик по токену, без создания |
| `createDraft($token, $ctx)` | Новый черновик |
| `ensureAddress($draft)` | Адрес черновика, создаёт запись, если её нет |
| `syncToken($draft, $newToken)` | Записать новый токен в черновик |
| `getSessionCustomerId()` | ID покупателя из сессии |
| `bindDraftToCustomer($token, $customerId, $ctx)` | Привязать черновик токена к покупателю |
| `transferDraftToToken($fromToken, $toToken, $customerId, $ctx)` | Перенести черновик на новый токен после смены сессии |
| `fillAddressFromArray($order, $addressData)` | Заполнить адрес из массива |
| `addProductFromSnapshot($order, $snapshot, $origin)` | Добавить позицию из снимка, без ресурса товара |

## Поля и валидация (OrderFieldManager)

`OrderFieldManager` пишет поля черновика и вызывает события при изменении.

::: warning Служебные поля через `add()` не записать
С 1.14.2-beta1 `add()` и `remove()` отклоняют служебные колонки черновика — те же, что закрыты для Web API (см. [оформление заказа](/components/minishop3/development/web-api/checkout#protected-fields)). Запрет статический: он не зависит от того, пришёл вызов по HTTP или из дополнения. Срабатывает он до события `msOnBeforeAddToOrder`, поэтому плагин, который раньше перехватывал запись в `status_id` или `customer_id`, до события не доедет.

Служебные поля из PHP пишутся напрямую: `OrderDraftManager::updateField()`, `attachCustomer()`, `setDeliveryCost()` — они через фильтр не идут.
:::

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

По умолчанию `delivery_id` и `payment_id` проверяет правило `required|numeric`. Остальные правила приходят из настроек доставки.

```php
// Получить правила валидации для доставки
$rules = $fieldManager->getDeliveryValidationRules($deliveryId);
// $rules['data']['validation_rules'] — ['city' => 'required|min:2', ...]

// Обязательные поля: ключи ассоциативного массива «поле → правила»
$required = $fieldManager->getDeliveryRequiredFields($deliveryId);
// array_keys($required['data']['requires'])

// Добавить свои правила
$fieldManager->setValidationRules([
    'company_name' => 'required|min:3',
]);

```

## Расчёт стоимости (OrderCostCalculator)

```php
$calculator = $modx->services->get('ms3_order_cost_calculator');

// Стоимость корзины. Сумма в $result['data']['cost']
$result = $calculator->getCartCost($draft, $token);

// Стоимость доставки
$result = $calculator->getDeliveryCost($draft, $orderData, $token);

// Комиссия оплаты
$result = $calculator->getPaymentCost($draft, $orderData, $token);

// Полный итог. В data: cost, cart_cost, delivery_cost, payment_cost
// и поля статуса корзины. С аргументом onlyCost остаётся только cost.
$result = $calculator->getTotalCost($draft, $orderData, $token);

```

Каждый метод вызывает пару событий `msOnBefore...` / `msOn...`. Через них плагин меняет стоимость.

### Пересчёт стоимости в админке — `POST /api/mgr/orders/{id}/recalculate-cost`

С 1.11.0 `ManagerOrderCostRecalculator` пересчитывает `cart_cost`, `weight`, `delivery_cost` и итоговый `cost` по сохранённым позициям и текущим `delivery_id` / `payment_id`. Другие поля заказа он не трогает.

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
| `auto` (по умолчанию) | Пересчитывает только для `DefaultDelivery` / `DefaultPayment` (поля `price`, `weight_price`, `free_delivery_amount` и проценты). Для своих обработчиков возвращает `delivery_manual_required` / `payment_manual_required`, оставляет прежнюю `delivery_cost` и комиссию 0. Внешние API не вызывает. |
| `manual` | Берёт переданный `manual_delivery_cost`. Комиссию оплаты считает автоматически, по полю. |
| `force_provider` | Явно вызывает `loadController()` → `getCost()` и `loadHandler()` → `getCost()` в `try/catch`. Сбой доставки оставляет прежнюю `delivery_cost` и пишет `delivery_provider_error`. Сбой оплаты ставит комиссию 0, пересобирает `cost` и пишет `payment_provider_error` ([#897](https://github.com/modx-pro/MiniShop3/issues/897)) |

Ответ повторяет данные заказа из `GET /api/mgr/orders/{id}` и добавляет:

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

Итог проходит через `OrderService::clampComputedTotal()`. Ниже нуля он не уйдёт. Скидки и наценки доставки и оплаты (отрицательные `price`, см. 1.11.0) считает `MiniShop3\Utils\PriceAdjustment`.

Вызов из JS (карточка заказа в админке):

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

Через HTTP (Manager API):

```bash
curl -X POST 'https://example.com/api/mgr/orders/42/recalculate-cost' \
  -H 'Content-Type: application/json' \
  -H 'Cookie: …' \
  -d '{"mode":"auto"}'
```

См. также [API Router](/components/minishop3/development/routing).

## Оформление заказа (OrderSubmitHandler)

`OrderSubmitHandler` проводит полный цикл оформления — от валидации до вызова оплаты.

```mermaid
flowchart TB
  a["1. msOnSubmitOrder"] --> b["2. Корзина не пуста"]
  b --> c["3-6. Доставка, оплата, допустимость пары, обязательные поля"]
  c --> d["7. msCustomer, необязательно"]
  d --> e["8. Пользователь MODX по настройке"]
  e --> f["9. Расчёт стоимости"]
  f --> g["10. assertOrderAvailable"]
  g --> h["11. runWithNextNumber: номер выдан"]
  h --> i["12. Адрес при save_address"]
  i --> j["13. msOnBeforeCreateOrder и msOnCreateOrder"]
  j --> k["14. Проверка остатка и статус ms3_status_new"]
  k --> l["15. msPayment send"]
  l --> m["16. redirect, если его не было"]
  j -->|сбой| r["Номер снимается, если включён складской учёт"]
  k -->|сбой| r
  l -->|сбой| s["Номер остаётся, снимается только резерв склада"]
```

```php
$submitHandler = $modx->services->get('ms3_order_submit_handler');

$result = $submitHandler->submit($draft, $orderData, $token);
// Успех — массив, который вернул $msPayment->send().
// У DefaultPayment message = ms3_payment_link_created, в data:
// payment_link (URL страницы успеха, msorder = номер заказа),
// order_id, order_num.
// Если в data нет redirect, обработчик дописывает его:
// страница ms3_order_redirect_thanks_id, query msorder = uuid заказа.

```

### Порядок действий при оформлении

1. Событие `msOnSubmitOrder`. Поля, которые плагин вернул в `data['data']`, дописываются через `OrderFieldManager::add()`, поэтому служебные колонки отбрасываются и здесь — см. [Какие поля фронтенд менять не вправе](/components/minishop3/development/web-api/checkout#protected-fields)
2. Проверка: корзина не пуста (`ms3_order_err_empty`)
3. Заданы `delivery_id` и `payment_id`
4. Способ оплаты существует и активен (`ms3_order_err_payment_not_found`)
5. Выбранная пара «доставка + оплата» допустима (`DeliveryService::getDeliveryPaymentPairError()`)
6. Обязательные поля выбранной доставки заполнены. Поле считается заполненным, если пришло само значение, значение с префиксом `address_` или ключ уже лежит в `properties['_validated']`
7. Поиск или создание покупателя (`msCustomer`) — необязательный шаг: без email и телефона покупатель не создаётся, а оформление продолжается с данными только в `msOrderAddress`
8. Опционально: создание пользователя MODX (настройка `ms3_order_register_user_on_submit`). В отличие от шага 7, неудача здесь прерывает оформление ошибкой `ms3_err_user_nf`
9. Расчёт стоимости (корзина + доставка + оплата)
10. Проверка остатка `inventory()->assertOrderAvailable()` до выдачи номера
11. Номер и суммы пишет `OrderNumberGenerator::runWithNextNumber()` — выдача номера и сохранение идут под блокировкой
12. Адрес покупателя сохраняется в адресную книгу, только если в `properties` есть `save_address` и у заказа есть `customer_id`
13. События `msOnBeforeCreateOrder` / `msOnCreateOrder`
14. Остаток проверяется ещё раз, и статус меняется на `ms3_status_new` (по умолчанию: 2)
15. Вызов `$msPayment->send()`
16. Если в ответе оплаты нет `data.redirect`, обработчик дописывает URL страницы «Спасибо» с uuid заказа

С шага 11 заказ держит номер. Что будет с номером при сбое:

| Где сбой | Номер заказа |
| --- | --- |
| Шаги 13–14, включая повторную проверку остатка перед сменой статуса | Снимается через `revertAllocatedNumber()`, но только при включённом складском учёте |
| Шаги 15–16 — вызов оплаты и редирект | Остаётся за заказом. Обработчик снимает лишь складской резерв (`abortInventoryHold()`) и отдаёт ошибку |

### Генерация номера заказа

::: warning `getNewOrderNum()` устарел
Метод помечен `@deprecated` и на каждый вызов пишет предупреждение в журнал MODX. Он только подсматривает следующий номер и **не занимает его**. Между чтением номера и сохранением заказа тот же номер может уйти другому заказу. Выдавать номер нужно через `OrderNumberGenerator::runWithNextNumber()`, где выдача и сохранение идут под одной блокировкой.

Метод оставлен для совместимости со старыми плагинами. Для показа «какой номер будет у следующего заказа» он годится, для записи — нет.
:::

```php
$num = $submitHandler->getNewOrderNum();
// Формат номера задают две настройки:
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

Поверх этих двух правил работает список разрешённых переходов: системная настройка `ms3_order_status_transitions`. Пока она пуста, действуют только `final` и `fixed`. Если список задан, переход должен быть в нём и не нарушать `final` и `fixed`.

Формат: пары «из статуса : в статус», через запятую или массивом JSON:

```text
2:3,3:4,2:5
```

```json
[[2,3],[3,4]]
```

Если значение настройки разобрать не удалось, блокируется **любая** смена статуса с ошибкой `ms3_err_status_transitions_invalid`. Опечатка в списке не игнорируется: она останавливает обработку заказов.

### Уведомления

При смене статуса `NotificationManager` сам рассылает уведомления:

- **Покупателю**: email, телефон из `msCustomer` или `modUserProfile`
- **Менеджерам**: из настроек `ms3_email_manager`, `ms3_phone_manager`, `ms3_telegram_manager`

## Позиции заказа (msOrderProduct)

Позиции лежат в таблице `ms3_order_products`.

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
После добавления, удаления или изменения позиций вызывайте `$order->updateProducts()`. Метод пересчитывает `cart_cost`, `weight` и `cost` по всем `msOrderProduct` заказа.
:::

## Адрес заказа (msOrderAddress)

У заказа один объект `msOrderAddress` (таблица `ms3_order_addresses`).

### Поля msOrderAddress

| Поле | Тип | Описание |
| --- | --- | --- |
| `order_id` | integer | ID заказа |
| `createdon` | datetime | Дата создания |
| `updatedon` | datetime | Дата обновления |
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

Сервис пишет адреса черновика.

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

Журнал пишет смену статуса, правку полей и работу с позициями.

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

// Прежний метод: add($orderId, $entry, $action, $visible = true)
$logService->add($orderId, ['old' => 1, 'new' => 2], 'status');

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

Настройка `ms3_order_log_actions` задаёт, какие действия попадают в журнал. По умолчанию: `status,products,field,address`. Значение `*` записывает все действия.

## Финализация из админки (OrderFinalizeService)

`OrderFinalizeService` оформляет заказы, которые менеджер создал в админке.

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

Финализация работает с уже созданным черновиком. Платёжный сервис здесь не вызывается, в отличие от `submit` на фронтенде.

Параметр `origin` (`OrderOrigin`): `manager` (по умолчанию), `storefront`, `integration`. При `manager` дополнительно вызываются `msOnBeforeMgrCreateOrder` / `msOnMgrCreateOrder`. Ключ `from_manager` в событиях равен `true` только при `origin=manager`.

## Программное создание заказа (ProgrammaticOrderService)

API без HTTP-сессии: для дополнений, cron и интеграций. Это **не** Web API. В `routes/web.php` отдельного эндпоинта нет.

| | |
| --- | --- |
| Ключ | `ms3_programmatic_order` |
| Класс | `MiniShop3\Services\Order\ProgrammaticOrderService` |
| Черновик | `OrderDraftManager::createSessionlessDraft()` (без PHP-сессии и токена корзины) |
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

Это не `POST /api/mgr/orders`: менеджер там создаёт пустой или частичный заказ в админке. И не `POST /api/v1/order/submit` на фронтенде: нужны токен и корзина.

## Разрешение пользователей (OrderUserResolver)

Сервис находит или создаёт пользователя MODX по данным заказа.

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

Настройка `ms3_order_user_groups` задаёт группы для новых пользователей. Формат: `group_id:role_id`, через запятую.

## Поля msOrder

| Поле | Тип | По умолчанию | Описание |
| --- | --- | --- | --- |
| `user_id` | integer | 0 | ID пользователя MODX |
| `customer_id` | integer | 0 | ID покупателя (msCustomer) |
| `token` | string | — | Токен сессии покупателя |
| `uuid` | string | — | Уникальный UUID заказа |
| `createdon` | datetime | null | Дата создания |
| `updatedon` | datetime | null | Дата обновления |
| `num` | string | null | Номер заказа. У черновика из админки тоже `null` |
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
| `msCustomer` | msCustomer | aggregate | Покупатель. Алиас именно такой, `getOne('Customer')` вернёт `null` |
| `Status` | msOrderStatus | aggregate | Статус |
| `Delivery` | msDelivery | aggregate | Способ доставки |
| `Payment` | msPayment | aggregate | Способ оплаты |
| `User` | modUser | aggregate | Пользователь MODX |

::: info Composite vs Aggregate
Composite-связи удаляются каскадно при удалении заказа (адрес, позиции, журнал). Aggregate-связи только ссылаются на объекты и не удаляют их.
:::

## События

| Событие | Когда вызывается | Кто вызывает |
| --- | --- | --- |
| `msOnBeforeSaveOrder` / `msOnSaveOrder` | Сохранение заказа — любое, включая сохранение черновика | `msOrder` (модель) |
| `msOnBeforeRemoveOrder` / `msOnRemoveOrder` | Удаление заказа | `msOrder` (модель) |
| `msOnBeforeGetOrderCost` / `msOnGetOrderCost` | Сборка итога заказа | `OrderCostCalculator` |
| `msOnBeforeGetCartCost` / `msOnGetCartCost` | Расчёт стоимости корзины | `OrderCostCalculator` |
| `msOnBeforeGetDeliveryCost` / `msOnGetDeliveryCost` | Расчёт стоимости доставки | `OrderCostCalculator` |
| `msOnBeforeGetPaymentCost` / `msOnGetPaymentCost` | Расчёт комиссии оплаты | `OrderCostCalculator` |
| `msOnBeforeAddToOrder` / `msOnAddToOrder` | Добавление/изменение поля | `OrderFieldManager` |
| `msOnBeforeRemoveFromOrder` / `msOnRemoveFromOrder` | Удаление поля | `OrderFieldManager` |
| `msOnBeforeValidateOrderValue` / `msOnValidateOrderValue` | Валидация значения | `OrderFieldManager` |
| `msOnErrorValidateOrderValue` | Ошибка валидации | `OrderFieldManager` |
| `msOnSubmitOrder` | Начало оформления | `OrderSubmitHandler` |
| `msOnBeforeCreateOrder` / `msOnCreateOrder` | Создание заказа — все три источника, см. примечание ниже | `OrderSubmitHandler`, `OrderFinalizeService` |
| `msOnBeforeCreateOrderProduct` / `msOnCreateOrderProduct` | Добавление позиции в заказ | `ManagerOrderProductsService` (админка), `OrderDraftManager` (программное создание) |
| `msOnBeforeUpdateOrderProduct` / `msOnUpdateOrderProduct` | Изменение позиции — только в админке | `ManagerOrderProductsService` |
| `msOnBeforeRemoveOrderProduct` / `msOnRemoveOrderProduct` | Удаление позиции — только в админке | `ManagerOrderProductsService` |
| `msOnBeforeEmptyOrder` / `msOnEmptyOrder` | Очистка заказа | `OrderDraftManager` |
| `msOnBeforeChangeOrderStatus` / `msOnChangeOrderStatus` | Смена статуса | `OrderStatusService` |
| `msOnBeforeGetOrderUser` / `msOnGetOrderUser` | Поиск/создание пользователя | `OrderUserResolver` |
| `msOnBeforeMgrCreateOrder` / `msOnMgrCreateOrder` | Финализация из админки (только `origin=manager`) | `OrderFinalizeService` |

Покупатель работает с корзиной, а не с позициями заказа. Поэтому ни одно из шести событий позиции на фронтенде не возникает — даже при добавлении товара в корзину, хотя физически там создаётся `msOrderProduct` (`CartItemManager`). Изменения корзины ловят её собственные события: `msOnBeforeAddToCart`, `msOnBeforeChangeInCart`, `msOnBeforeRemoveFromCart` (см. [События корзины](../events/cart)).

Вызов из `OrderDraftManager` — это `addProductFromSnapshot()`, и приходит он только из `ProgrammaticOrderService` (sessionless создание заказа для интеграций и cron). В параметрах такого вызова есть дополнительный ключ `origin`, которого нет у вызова из админки. Подробный разбор параметров — на странице [событий позиций](../events/order-product).

### Параметры msOnBeforeCreateOrder и msOnCreateOrder {#create-order-event-params}

Заказ создают два разных сервиса, и набор параметров у них не совпадает. Плагин, рассчитывающий на один источник, на другом получит `null` вместо ожидаемого объекта.

| Источник | Параметры |
| --- | --- |
| Оформление на фронтенде (`OrderSubmitHandler`) | `handler` — сам обработчик, `msOrder` — черновик, `customFields` — свои поля из `properties['_validated']` |
| Финализация из админки и программное создание (`OrderFinalizeService`) | `service` — сам сервис, `msOrder` — заказ, `origin` — `manager` или `integration`, `from_manager` — `true` только при `origin=manager` |

Разбирать оба случая удобно по наличию ключа:

```php
$order = $params['msOrder'] ?? null;
$origin = $params['origin'] ?? 'storefront'; // ключа нет — значит оформление с фронтенда
```

Возврат ошибки из любого из двух событий отменяет создание: заказ остаётся черновиком, а в ответе приходит сообщение плагина. Номер к этому моменту уже выдан. При оформлении с фронтенда он снимается обратно (`revertAllocatedNumber()`), но только при включённом складском учёте — без учёта номер остаётся за черновиком. При финализации из админки номер не откатывается никогда.

## Manager REST API

Эндпоинты Vue-интерфейса заказов. Нужна сессия mgr. См. [API Router](../routing).

| Метод | Путь | Описание |
| --- | --- | --- |
| `GET` | `/api/mgr/orders` | Список заказов |
| `GET` | `/api/mgr/orders/filters` | Значения фильтров грида |
| `GET` | `/api/mgr/orders/stats` | Агрегаты для фильтров и дашборда |
| `GET` | `/api/mgr/orders/{id}` | Карточка заказа |
| `PUT` | `/api/mgr/orders/{id}` | Обновление заказа |
| `DELETE` | `/api/mgr/orders/{id}` | Удаление заказа |
| `DELETE` | `/api/mgr/orders/bulk` | Массовое удаление |
| `POST` | `/api/mgr/orders` | Создание заказа из админки |
| `POST` | `/api/mgr/orders/{id}/finalize` | Финализация черновика |
| `POST` | `/api/mgr/orders/{id}/recalculate-cost` | Пересчёт через `ManagerOrderCostRecalculator` |
| `GET` | `/api/mgr/orders/{id}/logs` | Журнал заказа |
| `GET` | `/api/mgr/orders/{id}/products` | Позиции заказа |
| `POST` | `/api/mgr/orders/{id}/products` | Добавить позицию |
| `PUT` | `/api/mgr/orders/{id}/products/{product_id}` | Изменить позицию |
| `DELETE` | `/api/mgr/orders/{id}/products/{product_id}` | Удалить позицию |
| `GET` | `/api/mgr/orders/{id}/shipment` | Отгрузка заказа |
| `PUT` | `/api/mgr/orders/{id}/shipment` | Обновить отгрузку |

Чтение списка, карточки, фильтров, статистики, позиций, журнала и отгрузки требует `msorder_list`. Запись, включая оба `DELETE`, требует `msorder_save`. Отдельного `msorder_remove` на этих маршрутах нет.

`POST /api/mgr/orders` создаёт черновик (`ms3_status_draft`, запасной id 1) и события `msOnBeforeMgrCreateOrder` / `msOnMgrCreateOrder` не вызывает. Эти события вызывает `POST /api/mgr/orders/{id}/finalize`, когда `OrderFinalizeService` работает с `origin=manager`.

Параметры событий: [События](../events).
