---
title: msCustomer
---
# msCustomer

Сниппет для вывода личного кабинета покупателя.

::: warning Кэширование
Сниппет работает с сессией пользователя и должен вызываться **некэшированно** (`!msCustomer`).
:::

## Принцип работы

Основа сниппета — параметр **`service`**. Меняя этот параметр, вы получаете совершенно разные страницы личного кабинета с разными данными и функциональностью.

### profile — Профиль покупателя

Редактирование личных данных: имя, email, телефон. Показывает статус верификации email и телефона.

```fenom
{'!msCustomer' | snippet : [
    'service' => 'profile'
]}
```

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| **tpl** | `tpl.msCustomer.profile` | Чанк профиля |

Подробнее: [Профиль покупателя](/components/minishop3/frontend/customer-profile)

---

### addresses — Управление адресами

Список сохранённых адресов доставки с возможностью создания, редактирования, удаления и выбора адреса по умолчанию.

```fenom
{'!msCustomer' | snippet : [
    'service' => 'addresses'
]}
```

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| **tpl** | `tpl.msCustomer.addresses` | Чанк списка адресов |
| **addressTpl** | `tpl.msCustomer.address.row` | Чанк строки адреса |
| **formTpl** | `tpl.msCustomer.address.form` | Чанк формы адреса |

Подробнее: [Адреса доставки](/components/minishop3/frontend/customer-addresses)

---

### orders — История заказов

Список всех заказов покупателя с фильтрацией по статусу и пагинацией. При клике на заказ — детальная информация.

```fenom
{'!msCustomer' | snippet : [
    'service' => 'orders',
    'limit' => 10
]}
```

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| **tpl** | `tpl.msCustomer.orders` | Чанк списка заказов |
| **orderTpl** | `tpl.msCustomer.order.row` | Чанк строки заказа |
| **detailTpl** | `tpl.msCustomer.order.details` | Чанк деталей заказа |
| **limit** | `20` | Заказов на странице |

Подробнее: [История заказов](/components/minishop3/frontend/customer-orders)

---

## Общие параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| **service** | `profile` | Сервис: `profile`, `addresses`, `orders` |
| **return** | `tpl` | Формат: `tpl` (HTML), `data` (массив) |
| **unauthorizedTpl** | `tpl.msCustomer.unauthorized` | Чанк для неавторизованных |

## Получение данных без рендеринга

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

### Для service=orders

| Параметр | Описание |
|----------|----------|
| `order_id` | ID заказа для просмотра деталей |
| `status` | Фильтр по ID статуса |
| `offset` | Смещение для пагинации |

```
/cabinet/?order_id=15      — детали заказа #15
/cabinet/?status=2         — заказы со статусом 2
/cabinet/?offset=20        — вторая страница
```

### Для service=addresses

| Параметр | Описание |
|----------|----------|
| `mode` | Режим: `list`, `edit`, `create` |
| `id` | ID адреса для редактирования |

```
/cabinet/addresses/              — список адресов
/cabinet/addresses/?mode=create  — создание адреса
/cabinet/addresses/?mode=edit&id=5  — редактирование адреса #5
```

### Выход из аккаунта

```
/cabinet/?action=logout
```

## Структура данных

### service=profile (return=data)

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
    'phone_verified' => false,
    'phone_verified_at' => null,
    'errors' => [],
    'success' => false,
]
```

### service=orders (return=data) — список

```php
[
    'authorized' => true,
    'service' => 'orders',
    'orders' => [
        [
            'id' => 15,
            'num' => 'MS-00015',
            'createdon' => '2024-01-15 10:30:00',
            'createdon_formatted' => '15.01.2024 10:30',
            'cost' => 7500,
            'cost_formatted' => '7 500',
            'status_id' => 2,
            'status_name' => 'Оплачен',
            'status_color' => '008000',
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
]
```

### service=orders (return=data) — детали заказа

При наличии GET-параметра `order_id`:

```php
[
    'authorized' => true,
    'service' => 'orders',
    'order' => [
        'id' => 15,
        'num' => 'MS-00015',
        'status_name' => 'Оплачен',
        'status_color' => '008000',
        'createdon_formatted' => '15.01.2024 10:30',
        'comment' => 'Позвонить перед доставкой',
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
            'weight' => '500 г',
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
        'weight' => '1 кг',
    ],
    'customer' => [...],
]
```

### Неавторизованный пользователь

```php
[
    'authorized' => false,
    'login_url' => '/login/',
    'register_url' => '/register/',
]
```

## Архитектура чанков

Чанки личного кабинета используют **наследование** через базовый layout:

```
tpl.msCustomer.base          — базовый layout (sidebar + content)
├── tpl.msCustomer.profile   — extends base, блок профиля
├── tpl.msCustomer.orders    — extends base, блок списка заказов
└── tpl.msCustomer.addresses — extends base, блок адресов
```

### Базовый layout

Чанк `tpl.msCustomer.base` содержит:
- Боковую панель (`tpl.msCustomer.sidebar`)
- Область контента через `{block 'content'}`

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

### Пример чанка профиля

```fenom
{* tpl.msCustomer.profile *}
{extends 'tpl.msCustomer.base'}

{block 'content'}
<div class="ms3-customer-profile">
    <div class="card shadow-sm">
        <div class="card-header bg-primary text-white">
            <h5 class="mb-0">{'ms3_customer_profile_title' | lexicon}</h5>
        </div>
        <div class="card-body">
            {if $success?}
            <div class="alert alert-success">
                {'ms3_customer_profile_updated' | lexicon}
            </div>
            {/if}

            <form class="ms3_form ms3-customer-profile-form" method="post">
                <input type="hidden" name="ms3_action" value="customer/update-profile">

                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="first_name" class="form-label">
                            {'ms3_customer_first_name' | lexicon}
                        </label>
                        <input type="text"
                               class="form-control {if $errors.first_name?}is-invalid{/if}"
                               name="first_name"
                               value="{$customer.first_name}"
                               required>
                        {if $errors.first_name?}
                        <div class="invalid-feedback">{$errors.first_name}</div>
                        {/if}
                    </div>

                    <div class="col-md-6 mb-3">
                        <label for="last_name" class="form-label">
                            {'ms3_customer_last_name' | lexicon}
                        </label>
                        <input type="text"
                               class="form-control"
                               name="last_name"
                               value="{$customer.last_name}"
                               required>
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label">{'ms3_customer_email' | lexicon}</label>
                    <div class="input-group">
                        <input type="email" class="form-control"
                               name="email" value="{$customer.email}" required>
                        {if $email_verified}
                        <span class="input-group-text bg-success text-white">
                            {'ms3_customer_email_verified' | lexicon}
                        </span>
                        {/if}
                    </div>
                </div>

                <div class="mb-3">
                    <label class="form-label">{'ms3_customer_phone' | lexicon}</label>
                    <input type="tel" class="form-control"
                           name="phone" value="{$customer.phone}" required>
                </div>

                <button type="submit" class="btn btn-primary ms3_link">
                    {'ms3_customer_profile_save' | lexicon}
                </button>
            </form>
        </div>
    </div>
</div>
{/block}
```

## Плейсхолдеры в чанках

### tpl.msCustomer.profile

| Плейсхолдер | Описание |
|-------------|----------|
| `{$customer}` | Данные покупателя (массив) |
| `{$customer.id}` | ID покупателя |
| `{$customer.email}` | Email |
| `{$customer.first_name}` | Имя |
| `{$customer.last_name}` | Фамилия |
| `{$customer.phone}` | Телефон |
| `{$email_verified}` | Email подтверждён (bool) |
| `{$email_verified_at}` | Дата подтверждения email |
| `{$phone_verified}` | Телефон подтверждён (bool) |
| `{$phone_verified_at}` | Дата подтверждения телефона |
| `{$errors}` | Ошибки валидации (массив) |
| `{$success}` | Успешное сохранение (bool) |

### tpl.msCustomer.orders

| Плейсхолдер | Описание |
|-------------|----------|
| `{$orders}` | Отрендеренные строки заказов (HTML) |
| `{$orders_count}` | Количество заказов на странице |
| `{$total}` | Общее количество заказов |
| `{$statuses}` | Список статусов для фильтра |
| `{$pagination}` | Данные пагинации |
| `{$customer}` | Данные покупателя |

### tpl.msCustomer.order.row

| Плейсхолдер | Описание |
|-------------|----------|
| `{$id}` | ID заказа |
| `{$num}` | Номер заказа (MS-00015) |
| `{$createdon_formatted}` | Дата создания |
| `{$cost_formatted}` | Сумма заказа |
| `{$status_name}` | Название статуса |
| `{$status_color}` | Цвет статуса |

### tpl.msCustomer.order.details

| Плейсхолдер | Описание |
|-------------|----------|
| `{$order}` | Данные заказа |
| `{$products}` | Массив товаров заказа |
| `{$delivery}` | Способ доставки |
| `{$payment}` | Способ оплаты |
| `{$address}` | Адрес доставки |
| `{$total}` | Итоги (cost, cart_cost, delivery_cost, weight) |
| `{$customer}` | Данные покупателя |

## Системные настройки

| Настройка | Описание |
|-----------|----------|
| `ms3_customer_login_page_id` | ID страницы входа |
| `ms3_customer_register_page_id` | ID страницы регистрации |

## Пример страницы личного кабинета

Создайте три ресурса с одним шаблоном, но разными вызовами сниппета:

### Профиль (/cabinet/profile/)

```fenom
{'!msCustomer' | snippet : ['service' => 'profile']}
```

### Заказы (/cabinet/orders/)

```fenom
{'!msCustomer' | snippet : ['service' => 'orders']}
```

### Адреса (/cabinet/addresses/)

```fenom
{'!msCustomer' | snippet : ['service' => 'addresses']}
```

## Обработка форм

Формы профиля и адресов отправляются через POST с `ms3_action`:

```html
<form method="post">
    <input type="hidden" name="ms3_action" value="customer/update-profile">
    <!-- поля формы -->
</form>
```

Доступные действия:

| Действие | Описание |
|----------|----------|
| `customer/update-profile` | Обновление профиля |
| `customer/create-address` | Создание адреса |
| `customer/update-address` | Обновление адреса |
| `customer/delete-address` | Удаление адреса |
| `customer/set-default-address` | Установка адреса по умолчанию |

## CSS-классы

Основные классы для стилизации:

| Класс | Элемент |
|-------|---------|
| `.ms3-customer-account` | Контейнер личного кабинета |
| `.ms3-customer-profile` | Блок профиля |
| `.ms3-customer-orders` | Блок заказов |
| `.ms3-customer-addresses` | Блок адресов |
| `.ms3-customer-order-details` | Детали заказа |
| `.ms3_form` | Форма MiniShop3 |
| `.ms3_link` | Кнопка отправки формы |
