---
title: msCustomer
---
# msCustomer

Выводит личный кабинет покупателя. Параметр `service` выбирает раздел: `profile`, `addresses` или `orders`.

::: warning Страница кабинета не должна кэшироваться
Снимите у ресурса галочку «Кэшировать» в админке. Сниппет выводит данные конкретного покупателя; на кэшируемой странице они сохранятся в кэше и достанутся следующему посетителю.

Префикса `!` для этого недостаточно. В MODX `[[!msCustomer]]` откладывает исполнение до некэшируемого прохода, а в Fenom `{'!msCustomer'|snippet}` сниппет выполняется там же, где встретился. Префикс лишь отключает кэш элемента в pdoTools: ставить его стоит, но полагаться — только на настройку ресурса.
:::

## Принцип работы

```mermaid
flowchart TB
  call[msCustomer]
  auth{Покупатель авторизован?}
  unauth[unauthorizedTpl / return data]
  svc{service}
  profile[profile]
  addresses[addresses]
  orders[orders]
  outTpl[Чанк service]
  outData[return=data массив]
  call --> auth
  auth -->|Нет| unauth
  auth -->|Да| svc
  svc --> profile
  svc --> addresses
  svc --> orders
  profile --> outTpl
  addresses --> outTpl
  orders --> outTpl
  profile --> outData
  addresses --> outData
  orders --> outData
```

## Вызов и параметры

### Общие параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| **service** | `profile` | Раздел: `profile`, `addresses`, `orders` |
| **return** | `tpl` | Формат: `tpl` (HTML), `data` (массив) |
| **unauthorizedTpl** | `tpl.msCustomer.unauthorized` | Чанк для неавторизованных |

::: tip Свойств сниппета в админке нет
У msCustomer не объявлено ни одного свойства, поэтому в сетке свойств сниппета пусто: все параметры задаются только в вызове. Так же обстоит дело с `selector` у msCart и msOrderTotal ([#805](https://github.com/modx-pro/MiniShop3/issues/805)).
:::

### Профиль покупателя (`service=profile`)

Правка личных данных: имя, email, телефон и статусы их подтверждения.

```fenom
{'!msCustomer' | snippet : [
    'service' => 'profile'
]}
```

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| **tpl** | `tpl.msCustomer.profile` | Чанк профиля |

Подробнее: [Профиль покупателя](/components/minishop3/frontend/customer-profile)

### Адреса доставки (`service=addresses`)

Сохранённые адреса доставки: создание, правка, удаление, выбор адреса по умолчанию.

```fenom
{'!msCustomer' | snippet : [
    'service' => 'addresses'
]}
```

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| **tpl** | `tpl.msCustomer.addresses` | Чанк списка адресов |
| **addressTpl** | `tpl.msCustomer.address.row` | Чанк строки адреса |
| **formTpl** | `tpl.msCustomer.address.form` | Чанк формы адреса |

Подробнее: [Адреса доставки](/components/minishop3/frontend/customer-addresses)

### История заказов (`service=orders`)

Заказы покупателя: фильтр по статусу, пагинация, детали заказа. Черновики (статус с id=1) не попадают ни в список, ни в фильтр статусов.

```fenom
{'!msCustomer' | snippet : [
    'service' => 'orders',
    'limit' => 10
]}
```

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| **tpl** | `tpl.msCustomer.orders` | Чанк списка заказов |
| **orderTpl** | `tpl.msCustomer.order.row` | Чанк строки заказа |
| **detailTpl** | `tpl.msCustomer.order.details` | Чанк деталей заказа |
| **limit** | `20` | Заказов на странице |

Подробнее: [История заказов](/components/minishop3/frontend/customer-orders)

## Получение данных в массиве (`return=data`)

```fenom
{set $profile = '!msCustomer' | snippet : [
    'service' => 'profile',
    'return' => 'data'
]}

{if $profile.authorized}
    Привет, {$profile.customer.first_name}!
{else}
    <a href="{$profile.login_url}">Войти</a>
{/if}
```

## GET-параметры

| Параметр | Сервис | Описание |
| --- | --- | --- |
| `action=logout` | любой | Выход из кабинета |
| `order` | `orders` | UUID заказа (36 символов) — показать детали |
| `status` | `orders` | Фильтр по ID статуса |
| `offset` | `orders` | Смещение для пагинации |
| `mode` | `addresses` | Режим: `list`, `edit`, `create` |
| `id` | `addresses` | ID адреса для `mode=edit` |

```text
/cabinet/?action=logout                               — выход из кабинета
/cabinet/?order=0f9e8d7c-1a2b-3c4d-5e6f-7a8b9c0d1e2f  — детали заказа
/cabinet/?status=2                                    — заказы со статусом 2
/cabinet/?offset=20                                   — вторая страница
/cabinet/addresses/                                   — список адресов
/cabinet/addresses/?mode=create                       — создание адреса
/cabinet/addresses/?mode=edit&id=5                    — правка адреса #5
```

## Структура данных

### Профиль (`service=profile`)

```php
[
    'authorized' => true,
    'service' => 'profile',
    'customer' => [
        'id' => 1,
        'email' => 'user@example.com',
        'first_name' => 'Иван',
        'last_name' => 'Иванов',
        'phone' => '+7 999 123-45-67',
        // ... другие поля msCustomer
    ],
    'email_verified' => true,
    'email_verified_at' => '15.01.2024 12:30',
    'phone_verified' => false,      // всегда false, см. #138
    'phone_verified_at' => null,
    'errors' => [],
    'success' => false,
]
```

### Список заказов (`service=orders`)

```php
[
    'authorized' => true,
    'service' => 'orders',
    'orders' => [
        [
            'id' => 15,
            'num' => '2610/5',
            'createdon' => '2024-01-15 10:30:00',
            'createdon_formatted' => '15.01.2024 10:30',
            'cost' => 7500,
            'cost_formatted' => '7 500',
            'status_id' => 2,
            'status_name' => 'Оплачен',
            'status_color' => '008000',
            'can_cancel' => false,
            // ... другие поля msOrder
        ],
        // ...
    ],
    'orders_count' => 5,
    'total' => 12,
    'statuses' => [
        ['id' => 2, 'name' => 'Оплачен', 'color' => '008000', 'selected' => false],
        ['id' => 3, 'name' => 'Отправлен', 'color' => '0000FF', 'selected' => false],
    ],
    'pagination' => [
        'total' => 12,
        'total_pages' => 2,
        'current_page' => 1,
        'limit' => 10,
        'offset' => 0,
        'pages' => [...],
        'has_prev' => false,
        'has_next' => true,
        'prev_offset' => 0,
        'next_offset' => 10,
    ],
    'customer' => [...],
    'page_url' => 'https://example.com/cabinet/',
]
```

### Детали заказа (`service=orders`)

При наличии GET-параметра `order`:

```php
[
    'authorized' => true,
    'service' => 'orders',
    'order' => [
        'id' => 15,
        'num' => '2610/5',
        'status_name' => 'Оплачен',
        'status_color' => '008000',
        'createdon_formatted' => '15.01.2024 10:30',
        'can_cancel' => false,
        'order_comment' => 'Позвонить перед доставкой',
        // ... другие поля msOrder
    ],
    'products' => [
        [
            'product_id' => 10,
            'pagetitle' => 'Товар 1',
            'article' => 'ART-001',
            'count' => 2,
            'price' => '3 500',
            'old_price' => '4 000',
            'cost' => '7 000',
            'weight' => '500',
            'weight_formatted' => '500 г',
            'options' => ['color' => 'Красный', 'size' => 'M'],
        ],
        // ...
    ],
    'delivery' => [
        'id' => 1,
        'name' => 'Курьерская доставка',
        'description' => 'Доставка в течение 1-2 дней',
    ],
    'payment' => [
        'id' => 2,
        'name' => 'Банковская карта',
    ],
    'address' => [
        'city' => 'Москва',
        'street' => 'ул. Примерная',
        'building' => '15',
        'room' => '42',
        // ... другие поля адреса
    ],
    'total' => [
        'cost' => '7 800',
        'cart_cost' => '7 500',
        'delivery_cost' => '300',
        'weight' => '1',
        'weight_formatted' => '1 кг',
    ],
    'customer' => [...],
    'api_url' => '/api/v1/',
    'assets_url' => '/assets/components/minishop3/',
]
```

Если заказ не найден или принадлежит другому покупателю:

```php
[
    'error' => 'Заказ не найден',
    'customer' => [...],
]
```

### Неавторизованный пользователь

```php
[
    'authorized' => false,
    'login_url' => '/login/',       // пусто, пока не задан ms3_customer_login_page_id
    'register_url' => '/register/', // пусто, пока не задан ms3_customer_register_page_id
]
```

## Архитектура чанков

Чанки разделов расширяют базовый чанк и заполняют в нём блок `content`:

```text
tpl.msCustomer.base          — базовый layout (sidebar + content)
├── tpl.msCustomer.profile   — extends base, блок профиля
├── tpl.msCustomer.orders    — extends base, блок списка заказов
└── tpl.msCustomer.addresses — extends base, блок адресов
```


```fenom
{* tpl.msCustomer.base *}
<div class="ms3-customer-account">
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-4 mb-4">
                {include 'tpl.msCustomer.sidebar'}
            </div>
            <div class="col-lg-9 col-md-8">
                {block 'content'}{/block}
            </div>
        </div>
    </div>
</div>
```

Штатные чанки разделов целиком — на страницах [Профиль покупателя](/components/minishop3/frontend/customer-profile), [Адреса доставки](/components/minishop3/frontend/customer-addresses) и [История заказов](/components/minishop3/frontend/customer-orders). Обязательная разметка формы — в разделе [Обработка форм](#forms).

## Плейсхолдеры в чанках

### tpl.msCustomer.profile

| Плейсхолдер | Описание |
| --- | --- |
| `{$customer}` | Данные покупателя (массив) |
| `{$customer.id}` | ID покупателя |
| `{$customer.email}` | Email |
| `{$customer.first_name}` | Имя |
| `{$customer.last_name}` | Фамилия |
| `{$customer.phone}` | Телефон |
| `{$email_verified}` | Email подтверждён (bool) |
| `{$email_verified_at}` | Дата подтверждения email |
| `{$phone_verified}` | Всегда `false` — подтверждение телефона запланировано ([#138](https://github.com/modx-pro/MiniShop3/issues/138)) |
| `{$phone_verified_at}` | Всегда пусто, по той же причине |
| `{$errors}` | Ошибки валидации (массив) |
| `{$success}` | Успешное сохранение (bool) |

### tpl.msCustomer.order.row

| Плейсхолдер | Описание |
| --- | --- |
| `{$id}` | ID заказа |
| `{$num}` | Номер заказа. Дата по `ms3_order_format_num` плюс разделитель и счётчик — например, `2610/5` |
| `{$createdon_formatted}` | Дата создания |
| `{$cost_formatted}` | Сумма заказа |
| `{$status_name}` | Название статуса |
| `{$status_color}` | Цвет статуса |

Плейсхолдеры остальных чанков, с типами значений: [История заказов](/components/minishop3/frontend/customer-orders) — `tpl.msCustomer.orders` и `tpl.msCustomer.order.details`; [Адреса доставки](/components/minishop3/frontend/customer-addresses) — список и форма адреса.

## Системные настройки

| Настройка | Описание |
| --- | --- |
| `ms3_customer_login_page_id` | ID страницы входа |
| `ms3_customer_register_page_id` | ID страницы регистрации |
| `ms3_customer_profile_page_id` | ID страницы профиля |
| `ms3_customer_orders_page_id` | ID страницы истории заказов |
| `ms3_customer_addresses_page_id` | ID страницы адресов |
| `ms3_customer_cancel_allowed_statuses` | ID статусов, из которых покупатель может отменить заказ, через запятую |

::: warning Страницы кабинета нужно указать в настройках
В поставке `ms3_customer_login_page_id`, `ms3_customer_register_page_id`, `ms3_customer_profile_page_id`, `ms3_customer_addresses_page_id` и `ms3_customer_orders_page_id` равны нулю. MODX на нулевой идентификатор возвращает пустую ссылку и пишет ошибку в журнал.

Пока настройки не заполнены, в кабинете пустые ссылки «Войти» и «Зарегистрироваться». Выход ведёт в никуда, не работают переходы между разделами и ссылка на детали заказа.
:::

::: tip Чем управляет `ms3_customer_cancel_allowed_statuses`
От неё зависит `{$can_cancel}` в строке заказа. В поставке стоит `2,3`.

Если настройку очистить, отмена не запретится: код подставит статусы из `ms3_status_new` и `ms3_status_paid`. Чтобы запретить отмену совсем, поставьте `0`.
:::

## Обработка форм {#forms}

Формы профиля и адресов отправляются POST-запросом, действие задаёт скрытое поле `ms3_action`:

| `ms3_action` | Действие |
| --- | --- |
| `customer/update-profile` | Обновление профиля |
| `customer/address-create` | Создание адреса |
| `customer/address-update` | Обновление адреса |

```html
<form method="post" data-ms3-form="customer">
    <input type="hidden" name="ms3_action" value="customer/update-profile">
    <div>
        <input type="text" name="first_name" value="{$customer.first_name}">
        <div class="invalid-feedback"></div>
    </div>
</form>
```

::: warning Две пометки, и обе обязательные
`data-ms3-form="customer"` (или класс `ms3_customer_form`) включает автосохранение: значение каждого поля уходит на сервер сразу после изменения. Без этой пометки форма молча ведёт себя как обычная HTML-форма — перезагружает страницу, и ничего не сохраняется.

Обёртка `<div>` вокруг поля тоже обязательна: обработчик ищет ближайший родительский `div` и без него прекращает работу, не дойдя до сохранения. В тот же `div` кладите `.invalid-feedback` — туда подставляется текст ошибки поля.
:::

### Действия без `ms3_action`

JS перехватывает клик по селектору:

| Селектор | Действие |
| --- | --- |
| `.delete-address` | Удаление адреса |
| `.set-default-address` | Выбор адреса по умолчанию |
| `.ms3-order-cancel` | Отмена заказа |
| `#resend-verification-email` | Повторная отправка письма с подтверждением |

Первые два стоят в штатном чанке строки адреса — `tpl.msCustomer.address.row`, файл `ms3_customer_address_row.tpl`.

### Форма адреса: действие зависит от режима

Поле `ms3_action` одно, значение меняется по режиму — штатный чанк подставляет его сам:

```fenom
<input type="hidden" name="ms3_action"
       value="customer/{if $mode == 'edit'}address-update{else}address-create{/if}">
```

Свой чанк должен делать то же: с `address-create` в режиме редактирования появится второй адрес вместо правки существующего.

## CSS-классы

| Класс | Элемент |
| --- | --- |
| `.ms3-customer-account` | Контейнер личного кабинета |
| `.ms3-customer-profile` | Блок профиля |
| `.ms3-customer-orders` | Блок заказов |
| `.ms3-customer-addresses` | Блок адресов |
| `.ms3-customer-order-details` | Детали заказа |
| `.ms3_form` | Форма MiniShop3 |
| `.ms3_link` | Кнопка отправки формы |
