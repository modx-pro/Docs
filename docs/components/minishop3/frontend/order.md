---
title: Оформление заказа
---
# Оформление заказа

Страница оформления заказа — завершающий этап покупки. MiniShop3 предоставляет готовый шаблон и чанк формы заказа с контактными данными, выбором доставки и оплаты.

## Структура страницы

| Компонент | Файл | Назначение |
|-----------|------|------------|
| Шаблон страницы | `elements/templates/order.tpl` | Разметка страницы, вызов msOrder |
| Чанк формы | `elements/chunks/ms3_order.tpl` | Форма оформления заказа |

## Шаблон страницы заказа

**Путь:** `core/components/minishop3/elements/templates/order.tpl`

Шаблон наследуется от базового и содержит:

```fenom
{extends 'file:templates/base.tpl'}
{block 'pagecontent'}
    <div class="container py-4">
        {* Хлебные крошки *}
        <nav aria-label="breadcrumb" class="mb-4">
            <ol class="breadcrumb">
                <li class="breadcrumb-item">
                    <a href="/">{'site_name' | option}</a>
                </li>
                <li class="breadcrumb-item active" aria-current="page">
                    {$_modx->resource.pagetitle}
                </li>
            </ol>
        </nav>

        <main>
            <h1 class="mb-4">{$_modx->resource.pagetitle}</h1>

            {* Форма заказа *}
            {'!msOrder' | snippet : [
                'tpl' => 'tpl.msOrder'
            ]}
        </main>
    </div>
{/block}
```

::: warning Кэширование
Сниппет msOrder должен вызываться **некэшированно** (`!msOrder`), так как работает с сессией пользователя.
:::

## Форма заказа

**Путь:** `core/components/minishop3/elements/chunks/ms3_order.tpl`

**Имя чанка в БД:** `tpl.msOrder`

Форма содержит следующие секции:

### Секции формы

| Секция | Описание |
|--------|----------|
| Пустая корзина | Сообщение и ссылка на каталог |
| Контактные данные | Имя, фамилия, email, телефон |
| Способы доставки | Радиокнопки с ценой и описанием |
| Способы оплаты | Радиокнопки с описанием |
| Адрес доставки | Город, улица, дом, квартира |
| Сохранённые адреса | Выбор из ранее использованных адресов (для авторизованных) |
| Комментарий | Textarea для примечаний к заказу |
| Итоги | Стоимость товаров, доставки, скидка, итого |

### Проверка корзины

В начале формы проверяется наличие товаров:

```fenom
{if $isCartEmpty}
    <div class="alert alert-info">
        <p>Ваша корзина пуста.</p>
        <a href="/" class="btn btn-primary">Вернуться в каталог</a>
    </div>
{else}
    {* Форма заказа *}
{/if}
```

### Контактные данные

```fenom
<fieldset class="mb-4">
    <legend class="h5 mb-3">Контактные данные</legend>

    <div class="row g-3">
        <div class="col-md-6">
            <label class="form-label">Имя *</label>
            <input type="text"
                   class="form-control"
                   name="first_name"
                   value="{$form.first_name}"
                   required>
        </div>

        <div class="col-md-6">
            <label class="form-label">Фамилия</label>
            <input type="text"
                   class="form-control"
                   name="last_name"
                   value="{$form.last_name}">
        </div>

        <div class="col-md-6">
            <label class="form-label">Email *</label>
            <input type="email"
                   class="form-control"
                   name="email"
                   value="{$form.email}"
                   required>
        </div>

        <div class="col-md-6">
            <label class="form-label">Телефон *</label>
            <input type="tel"
                   class="form-control"
                   name="phone"
                   value="{$form.phone}"
                   required>
        </div>
    </div>
</fieldset>
```

### Способы доставки

Доставки выводятся из массива `$deliveries`:

```fenom
<fieldset class="mb-4">
    <legend class="h5 mb-3">Способ доставки</legend>

    {foreach $deliveries as $delivery}
        <div class="form-check mb-2">
            <input class="form-check-input"
                   type="radio"
                   name="delivery_id"
                   id="delivery_{$delivery.id}"
                   value="{$delivery.id}"
                   {if $order.delivery_id == $delivery.id}checked{/if}>
            <label class="form-check-label" for="delivery_{$delivery.id}">
                {if $delivery.logo}
                    <img src="{$delivery.logo}" alt="" class="me-2" style="height: 24px;">
                {/if}
                <strong>{$delivery.name}</strong>
                {if $delivery.price > 0}
                    <span class="text-muted ms-2">+{$delivery.price} руб.</span>
                {else}
                    <span class="text-success ms-2">Бесплатно</span>
                {/if}
                {if $delivery.description}
                    <small class="d-block text-muted">{$delivery.description}</small>
                {/if}
            </label>
        </div>
    {/foreach}
</fieldset>
```

### Способы оплаты

Оплаты фильтруются по выбранной доставке через JavaScript:

```fenom
<fieldset class="mb-4">
    <legend class="h5 mb-3">Способ оплаты</legend>

    {foreach $payments as $payment}
        <div class="form-check mb-2">
            <input class="form-check-input"
                   type="radio"
                   name="payment_id"
                   id="payment_{$payment.id}"
                   value="{$payment.id}"
                   {if $order.payment_id == $payment.id}checked{/if}>
            <label class="form-check-label" for="payment_{$payment.id}">
                {if $payment.logo}
                    <img src="{$payment.logo}" alt="" class="me-2" style="height: 24px;">
                {/if}
                <strong>{$payment.name}</strong>
                {if $payment.description}
                    <small class="d-block text-muted">{$payment.description}</small>
                {/if}
            </label>
        </div>
    {/foreach}
</fieldset>
```

### Адрес доставки

```fenom
<fieldset class="mb-4">
    <legend class="h5 mb-3">Адрес доставки</legend>

    <div class="row g-3">
        <div class="col-12">
            <label class="form-label">Город</label>
            <input type="text"
                   class="form-control"
                   name="city"
                   value="{$form.city}">
        </div>

        <div class="col-12">
            <label class="form-label">Улица</label>
            <input type="text"
                   class="form-control"
                   name="street"
                   value="{$form.street}">
        </div>

        <div class="col-md-6">
            <label class="form-label">Дом</label>
            <input type="text"
                   class="form-control"
                   name="building"
                   value="{$form.building}">
        </div>

        <div class="col-md-6">
            <label class="form-label">Квартира / офис</label>
            <input type="text"
                   class="form-control"
                   name="room"
                   value="{$form.room}">
        </div>
    </div>
</fieldset>
```

### Сохранённые адреса

Для авторизованных покупателей отображается список ранее использованных адресов:

```fenom
{if $isCustomerAuth && $addresses}
    <fieldset class="mb-4">
        <legend class="h5 mb-3">Сохранённые адреса</legend>

        <div class="list-group">
            {foreach $addresses as $address}
                <button type="button"
                        class="list-group-item list-group-item-action"
                        data-address-id="{$address.id}"
                        data-city="{$address.city}"
                        data-street="{$address.street}"
                        data-building="{$address.building}"
                        data-room="{$address.room}">
                    {$address.city}, {$address.street}, д. {$address.building}
                    {if $address.room}, кв. {$address.room}{/if}
                </button>
            {/foreach}
        </div>
    </fieldset>
{/if}
```

При клике на адрес JavaScript заполняет поля формы соответствующими данными.

### Панель итогов

Правая колонка с итогами заказа:

```fenom
<div class="card">
    <div class="card-header">
        <h5 class="mb-0">Ваш заказ</h5>
    </div>
    <div class="card-body">
        <dl class="row mb-0">
            <dt class="col-7">Товары:</dt>
            <dd class="col-5 text-end">{$order.cart_cost}</dd>

            <dt class="col-7">Доставка:</dt>
            <dd class="col-5 text-end">{$order.delivery_cost}</dd>

            {if $order.discount_cost != '0 ₽'}
                <dt class="col-7 text-success">Скидка:</dt>
                <dd class="col-5 text-end text-success">−{$order.discount_cost}</dd>
            {/if}
        </dl>

        <hr>

        <div class="d-flex justify-content-between align-items-center">
            <strong class="fs-5">Итого:</strong>
            <strong class="fs-4">{$order.cost}</strong>
        </div>
    </div>

    <div class="card-footer">
        <button type="submit" class="btn btn-primary btn-lg w-100">
            Оформить заказ
        </button>
    </div>
</div>
```

## JavaScript взаимодействие

### Объект ms3.order

MiniShop3 предоставляет JavaScript API для работы с заказом:

```javascript
// Оформить заказ
ms3.order.submit();

// Обновить способ доставки
ms3.order.setDelivery(deliveryId);

// Обновить способ оплаты
ms3.order.setPayment(paymentId);

// Обновить поле формы
ms3.order.setField('city', 'Москва');
```

### Обработка событий

```javascript
// Перед отправкой заказа
document.addEventListener('ms3:order:before-submit', (e) => {
    console.log('Данные заказа:', e.detail);
    // Можно отменить отправку: e.preventDefault()
});

// После успешного оформления
document.addEventListener('ms3:order:success', (e) => {
    console.log('Заказ создан:', e.detail.order_id);
    // Автоматический редирект на страницу успеха
    window.location.href = e.detail.redirect;
});

// При ошибке оформления
document.addEventListener('ms3:order:error', (e) => {
    console.error('Ошибки:', e.detail.errors);
});

// При изменении способа доставки
document.addEventListener('ms3:order:delivery-changed', (e) => {
    console.log('Выбрана доставка:', e.detail.delivery_id);
});

// При изменении способа оплаты
document.addEventListener('ms3:order:payment-changed', (e) => {
    console.log('Выбрана оплата:', e.detail.payment_id);
});
```

### Автозаполнение адреса

Пример обработки клика по сохранённому адресу:

```javascript
document.querySelectorAll('[data-address-id]').forEach(btn => {
    btn.addEventListener('click', function() {
        // Заполнить поля формы
        document.querySelector('[name="city"]').value = this.dataset.city;
        document.querySelector('[name="street"]').value = this.dataset.street;
        document.querySelector('[name="building"]').value = this.dataset.building;
        document.querySelector('[name="room"]').value = this.dataset.room;

        // Обновить данные на сервере
        ms3.order.setField('city', this.dataset.city);
        ms3.order.setField('street', this.dataset.street);
        ms3.order.setField('building', this.dataset.building);
        ms3.order.setField('room', this.dataset.room);
    });
});
```

## Валидация формы

### Обязательные поля

По умолчанию обязательны:
- `first_name` — Имя
- `email` — Email
- `phone` — Телефон

### Отображение ошибок

Массив `$errors` содержит имена полей с ошибками:

```fenom
<input type="text"
       name="email"
       class="form-control {if 'email'|in:$errors}is-invalid{/if}"
       value="{$form.email}">
{if 'email'|in:$errors}
    <div class="invalid-feedback">Укажите корректный email</div>
{/if}
```

## Связь доставки и оплаты

Каждая доставка содержит массив `payments` с ID доступных способов оплаты:

```fenom
{foreach $deliveries as $delivery}
    <input type="radio"
           name="delivery_id"
           value="{$delivery.id}"
           data-payments="{$delivery.payments|json_encode}">
{/foreach}
```

JavaScript использует эти данные для фильтрации оплат при смене доставки.

## Кастомизация

### Изменение шаблона страницы

1. Скопируйте `order.tpl` в свою тему
2. Измените разметку и параметры вызова msOrder
3. Назначьте шаблон странице оформления заказа

### Изменение формы заказа

1. Создайте свой чанк, например `tpl.myOrder`
2. Укажите его в вызове: `'tpl' => 'tpl.myOrder'`
3. Используйте доступные плейсхолдеры из [документации msOrder](/components/minishop3/snippets/msorder)

### Добавление полей

Для добавления кастомных полей:

1. Добавьте поле в чанк формы
2. Обработайте его в плагине на событие `msOnBeforeOrderCreate`
3. Сохраните в свойствах заказа или профиле пользователя

```php
// Плагин для сохранения кастомного поля
switch ($modx->event->name) {
    case 'msOnBeforeOrderCreate':
        $properties = $order->get('properties') ?: [];
        $properties['custom_field'] = $_POST['custom_field'] ?? '';
        $order->set('properties', $properties);
        break;
}
```

## Адаптивная вёрстка

Форма использует Bootstrap 5 Grid с адаптивными колонками:

| Экран | Форма | Итоги |
|-------|-------|-------|
| < 992px | 12 колонок (100%) | 12 колонок (100%) |
| ≥ 992px | 8 колонок (~66%) | 4 колонки (~33%) |

```html
<div class="row">
    <div class="col-lg-8">
        {* Форма заказа *}
    </div>
    <div class="col-lg-4">
        {* Панель итогов *}
    </div>
</div>
```
