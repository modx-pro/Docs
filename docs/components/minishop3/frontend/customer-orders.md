---
title: История заказов
---
# История заказов

Страница истории заказов покупателя. Отображает список всех заказов с фильтрацией по статусу и пагинацией, а также детальную информацию о конкретном заказе.

## Структура страницы

| Компонент | Файл | Назначение |
|-----------|------|------------|
| Базовый layout | `tpl.msCustomer.base` | Общая обёртка с sidebar |
| Боковая панель | `tpl.msCustomer.sidebar` | Навигация ЛК |
| Список заказов | `tpl.msCustomer.orders` | Таблица заказов |
| Строка заказа | `tpl.msCustomer.order.row` | Один заказ в списке |
| Детали заказа | `tpl.msCustomer.order.details` | Полная информация |

## Вызов сниппета

```fenom
{'!msCustomer' | snippet : [
    'service' => 'orders',
    'limit' => 20
]}
```

### Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| **service** | | Тип сервиса (`orders`) |
| **tpl** | `tpl.msCustomer.orders` | Чанк списка заказов |
| **orderTpl** | `tpl.msCustomer.order.row` | Чанк строки заказа |
| **detailTpl** | `tpl.msCustomer.order.details` | Чанк деталей заказа |
| **limit** | `20` | Заказов на странице |
| **unauthorizedTpl** | `tpl.msCustomer.unauthorized` | Чанк для гостей |
| **return** | `tpl` | Формат: `tpl` или `data` |

## Режимы работы

| URL | Режим | Описание |
|-----|-------|----------|
| `/cabinet/orders/` | Список | Таблица заказов |
| `/cabinet/orders/?order_id=15` | Детали | Информация о заказе #15 |
| `/cabinet/orders/?status=2` | Фильтр | Заказы со статусом 2 |
| `/cabinet/orders/?offset=20` | Пагинация | Вторая страница |

## Плейсхолдеры списка заказов

### В чанке tpl.msCustomer.orders

| Плейсхолдер | Тип | Описание |
|-------------|-----|----------|
| `{$orders}` | string | Отрендеренные строки заказов (HTML) |
| `{$orders_count}` | int | Заказов на странице |
| `{$total}` | int | Всего заказов |
| `{$statuses}` | array | Статусы для фильтра |
| `{$pagination}` | array | Данные пагинации |
| `{$customer}` | array | Данные покупателя |

### В чанке tpl.msCustomer.order.row

| Плейсхолдер | Тип | Описание |
|-------------|-----|----------|
| `{$id}` | int | ID заказа |
| `{$num}` | string | Номер заказа (MS-00015) |
| `{$createdon_formatted}` | string | Дата создания |
| `{$cost_formatted}` | string | Сумма заказа |
| `{$status_id}` | int | ID статуса |
| `{$status_name}` | string | Название статуса |
| `{$status_color}` | string | Цвет статуса (HEX без #) |

## Чанк списка заказов

```fenom
{* tpl.msCustomer.orders *}
{extends 'tpl.msCustomer.base'}

{block 'content'}
<div class="ms3-customer-orders">
    <div class="card shadow-sm">
        <div class="card-header bg-primary text-white">
            <h5 class="mb-0">{'ms3_customer_orders_title' | lexicon}</h5>
        </div>
        <div class="card-body">
            {* Фильтр по статусу *}
            {if $statuses}
            <form class="mb-4" method="get" action="">
                <div class="row align-items-end">
                    <div class="col-md-4">
                        <label for="status-filter" class="form-label">
                            {'ms3_customer_orders_filter_by_status' | lexicon}
                        </label>
                        <select class="form-select" id="status-filter" name="status"
                                onchange="this.form.submit()">
                            <option value="">
                                {'ms3_customer_orders_all_statuses' | lexicon}
                            </option>
                            {foreach $statuses as $status}
                            <option value="{$status.id}" {if $status.selected}selected{/if}>
                                {$status.name}
                            </option>
                            {/foreach}
                        </select>
                    </div>
                    <div class="col-md-2">
                        <button type="button" class="btn btn-secondary"
                                onclick="location.href='?'">
                            {'ms3_customer_orders_reset_filter' | lexicon}
                        </button>
                    </div>
                </div>
            </form>
            {/if}

            {* Список заказов *}
            {if $orders_count > 0}
            <div class="table-responsive">
                <table class="table table-hover align-middle ms3-order-table">
                    <thead class="table-light">
                        <tr>
                            <th>{'ms3_customer_order_num' | lexicon}</th>
                            <th>{'ms3_customer_order_date' | lexicon}</th>
                            <th>{'ms3_customer_order_status' | lexicon}</th>
                            <th class="text-end">{'ms3_customer_order_total' | lexicon}</th>
                            <th class="col-actions"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {$orders}
                    </tbody>
                </table>
            </div>

            {* Пагинация *}
            {if $pagination.total_pages > 1}
            <nav aria-label="{'ms3_customer_orders_pagination' | lexicon}">
                <ul class="pagination justify-content-center">
                    {if $pagination.has_prev}
                    <li class="page-item">
                        <a class="page-link" href="?offset={$pagination.prev_offset}">
                            {'ms3_customer_orders_prev' | lexicon}
                        </a>
                    </li>
                    {/if}

                    {foreach $pagination.pages as $page}
                    <li class="page-item {if $page.active}active{/if}">
                        <a class="page-link" href="?offset={$page.offset}">
                            {$page.num}
                        </a>
                    </li>
                    {/foreach}

                    {if $pagination.has_next}
                    <li class="page-item">
                        <a class="page-link" href="?offset={$pagination.next_offset}">
                            {'ms3_customer_orders_next' | lexicon}
                        </a>
                    </li>
                    {/if}
                </ul>
            </nav>
            {/if}

            <div class="text-muted small mt-3">
                {'ms3_customer_orders_total' | lexicon}: {$total}
            </div>
            {else}
            <div class="alert alert-info" role="alert">
                {'ms3_customer_orders_empty' | lexicon}
            </div>
            {/if}
        </div>
    </div>
</div>
{/block}
```

## Чанк строки заказа

```fenom
{* tpl.msCustomer.order.row *}
<tr>
    <td>
        <a href="?order_id={$id}" class="fw-semibold text-decoration-none">
            №{$num}
        </a>
    </td>
    <td class="text-nowrap">
        {$createdon_formatted}
    </td>
    <td>
        <span class="badge" style="background-color: #{$status_color};">
            {$status_name}
        </span>
    </td>
    <td class="text-end text-nowrap fw-bold">
        {$cost_formatted} {'ms3_frontend_currency' | lexicon}
    </td>
    <td class="text-end">
        <a href="?order_id={$id}" class="btn btn-sm btn-outline-primary">
            {'ms3_customer_order_view' | lexicon}
        </a>
    </td>
</tr>
```

## Плейсхолдеры деталей заказа

### В чанке tpl.msCustomer.order.details

| Плейсхолдер | Тип | Описание |
|-------------|-----|----------|
| `{$order}` | array | Данные заказа |
| `{$order.id}` | int | ID заказа |
| `{$order.num}` | string | Номер заказа |
| `{$order.status_name}` | string | Название статуса |
| `{$order.status_color}` | string | Цвет статуса |
| `{$order.createdon_formatted}` | string | Дата создания |
| `{$order.comment}` | string | Комментарий к заказу |
| `{$products}` | array | Товары заказа |
| `{$delivery}` | array | Способ доставки |
| `{$payment}` | array | Способ оплаты |
| `{$address}` | array | Адрес доставки |
| `{$total}` | array | Итоги заказа |
| `{$customer}` | array | Данные покупателя |

### Товар в заказе ({$products})

| Поле | Описание |
|------|----------|
| `{$product.product_id}` | ID товара |
| `{$product.pagetitle}` | Название |
| `{$product.article}` | Артикул |
| `{$product.count}` | Количество |
| `{$product.price}` | Цена (форматировано) |
| `{$product.old_price}` | Старая цена |
| `{$product.cost}` | Сумма (форматировано) |
| `{$product.weight}` | Вес |
| `{$product.options}` | Опции товара (массив) |

### Итоги ({$total})

| Поле | Описание |
|------|----------|
| `{$total.cost}` | Итого к оплате |
| `{$total.cart_cost}` | Стоимость товаров |
| `{$total.delivery_cost}` | Стоимость доставки |
| `{$total.weight}` | Общий вес |

## Чанк деталей заказа

```fenom
{* tpl.msCustomer.order.details *}
<div class="ms3-customer-order-details">
    {* Навигация назад *}
    <div class="mb-3">
        <a href="?" class="btn btn-sm btn-outline-secondary">
            ← {'ms3_customer_orders_back' | lexicon}
        </a>
    </div>

    {* Информация о заказе *}
    <div class="card shadow-sm mb-4">
        <div class="card-header bg-primary text-white">
            <div class="d-flex justify-content-between align-items-center">
                <h5 class="mb-0">
                    {'ms3_customer_order_title' | lexicon} №{$order.num}
                </h5>
                <span class="badge bg-light text-dark"
                      style="color: #{$order.status_color} !important;">
                    {$order.status_name}
                </span>
            </div>
        </div>
        <div class="card-body">
            <p class="text-muted mb-2">
                <small>
                    {'ms3_customer_order_created' | lexicon}: {$order.createdon_formatted}
                </small>
            </p>

            {* Таблица товаров *}
            <div class="table-responsive">
                <table class="table table-hover align-middle">
                    <thead class="table-light">
                        <tr>
                            <th>{'ms3_cart_title' | lexicon}</th>
                            <th class="text-center">{'ms3_cart_count' | lexicon}</th>
                            <th class="text-end">{'ms3_cart_price' | lexicon}</th>
                            <th class="text-end">{'ms3_cart_cost' | lexicon}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foreach $products as $product}
                        <tr>
                            <td>
                                <div class="fw-semibold">{$product.pagetitle}</div>
                                {if $product.article}
                                <div class="small text-muted">
                                    {'ms3_frontend_article' | lexicon}: {$product.article}
                                </div>
                                {/if}
                                {if $product.options && count($product.options) > 0}
                                <div class="small text-muted mt-1">
                                    {foreach $product.options as $option => $value}
                                    {$option}: {$value}{if !$value@last}; {/if}
                                    {/foreach}
                                </div>
                                {/if}
                            </td>
                            <td class="text-center">
                                <span class="badge bg-secondary">
                                    {$product.count} {'ms3_frontend_count_unit' | lexicon}
                                </span>
                            </td>
                            <td class="text-end">
                                {if $product.old_price && $product.old_price > $product.price}
                                <div class="text-decoration-line-through text-muted small">
                                    {$product.old_price}
                                </div>
                                {/if}
                                <div class="fw-semibold">{$product.price}</div>
                            </td>
                            <td class="text-end fw-bold">
                                {$product.cost} {'ms3_frontend_currency' | lexicon}
                            </td>
                        </tr>
                        {/foreach}
                    </tbody>
                    <tfoot class="table-light">
                        <tr>
                            <td colspan="3" class="text-end fw-bold">
                                {'ms3_frontend_cart_total' | lexicon}:
                            </td>
                            <td class="text-end fw-bold">
                                {$total.cart_cost} {'ms3_frontend_currency' | lexicon}
                            </td>
                        </tr>
                        {if $total.delivery_cost}
                        <tr>
                            <td colspan="3" class="text-end">
                                {'ms3_frontend_delivery' | lexicon}:
                            </td>
                            <td class="text-end">
                                {$total.delivery_cost} {'ms3_frontend_currency' | lexicon}
                            </td>
                        </tr>
                        {/if}
                        <tr class="fw-bold">
                            <td colspan="3" class="text-end fs-5">
                                {'ms3_frontend_total' | lexicon}:
                            </td>
                            <td class="text-end fs-5">
                                {$total.cost} {'ms3_frontend_currency' | lexicon}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>

    {* Адрес доставки *}
    {if $address && count($address) > 0}
    <div class="card shadow-sm mb-4">
        <div class="card-header bg-light">
            <h6 class="mb-0">{'ms3_frontend_delivery_address' | lexicon}</h6>
        </div>
        <div class="card-body">
            <p class="mb-0">
                {if $address.index}{$address.index}, {/if}
                {$address.city}
                {if $address.region}, {$address.region}{/if}
                {if $address.country}, {$address.country}{/if}
                <br>
                {$address.street}
                {if $address.building}, д. {$address.building}{/if}
                {if $address.room}, кв. {$address.room}{/if}
            </p>
        </div>
    </div>
    {/if}

    {* Доставка и оплата *}
    <div class="row">
        {if $delivery && count($delivery) > 0}
        <div class="col-md-6">
            <div class="card shadow-sm mb-4">
                <div class="card-header bg-light">
                    <h6 class="mb-0">{'ms3_frontend_delivery_method' | lexicon}</h6>
                </div>
                <div class="card-body">
                    <p class="mb-0">{$delivery.name}</p>
                    {if $delivery.description}
                    <small class="text-muted">{$delivery.description}</small>
                    {/if}
                </div>
            </div>
        </div>
        {/if}

        {if $payment && count($payment) > 0}
        <div class="col-md-6">
            <div class="card shadow-sm mb-4">
                <div class="card-header bg-light">
                    <h6 class="mb-0">{'ms3_frontend_payment_method' | lexicon}</h6>
                </div>
                <div class="card-body">
                    <p class="mb-0">{$payment.name}</p>
                    {if $payment.description}
                    <small class="text-muted">{$payment.description}</small>
                    {/if}
                </div>
            </div>
        </div>
        {/if}
    </div>

    {* Комментарий *}
    {if $order.comment}
    <div class="card shadow-sm mb-4">
        <div class="card-header bg-light">
            <h6 class="mb-0">{'ms3_frontend_comment' | lexicon}</h6>
        </div>
        <div class="card-body">
            <p class="mb-0">{$order.comment}</p>
        </div>
    </div>
    {/if}
</div>
```

## Структура пагинации

```php
[
    'total' => 50,           // Всего заказов
    'total_pages' => 3,      // Всего страниц
    'current_page' => 1,     // Текущая страница
    'limit' => 20,           // На странице
    'offset' => 0,           // Смещение
    'pages' => [             // Список страниц
        ['num' => 1, 'offset' => 0, 'active' => true],
        ['num' => 2, 'offset' => 20, 'active' => false],
        ['num' => 3, 'offset' => 40, 'active' => false],
    ],
    'has_prev' => false,     // Есть предыдущая
    'has_next' => true,      // Есть следующая
    'prev_offset' => 0,      // Смещение предыдущей
    'next_offset' => 20,     // Смещение следующей
]
```

## Структура статусов

```php
[
    ['id' => 2, 'name' => 'Оплачен', 'color' => '008000', 'selected' => false],
    ['id' => 3, 'name' => 'Отправлен', 'color' => '0000FF', 'selected' => true],
    ['id' => 4, 'name' => 'Доставлен', 'color' => '28a745', 'selected' => false],
]
```

::: tip Цвет статуса
Цвет хранится в БД без символа `#`. При использовании в CSS добавляйте `#`:

```fenom
style="background-color: #{$status_color};"
```

:::

## Системные настройки

| Настройка | Описание |
|-----------|----------|
| `ms3_customer_orders_page_id` | ID страницы заказов |

## CSS-классы

| Класс | Элемент |
|-------|---------|
| `.ms3-customer-orders` | Контейнер списка заказов |
| `.ms3-customer-order-details` | Контейнер деталей |
| `.ms3-order-table` | Таблица заказов |
