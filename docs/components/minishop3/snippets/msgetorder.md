---
title: msGetOrder
---
# msGetOrder

Сниппет для вывода информации о заказе. Используется на странице «Спасибо за заказ» или в личном кабинете.

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| **id** | | ID или UUID заказа (приоритетнее GET) |
| **tpl** | `tpl.msGetOrder` | Чанк оформления заказа |
| **includeThumbs** | | Превью изображений товаров через запятую |
| **includeContent** | `false` | Включить поле content товаров |
| **payStatus** | `1` | Статусы для показа ссылки оплаты (через запятую) |
| **toPlaceholder** | | Сохранить результат в плейсхолдер |
| **showLog** | `false` | Показать лог выполнения |

## Определение заказа

Сниппет определяет заказ в следующем порядке:

1. Параметр сниппета `id` (ID или UUID)
2. GET-параметр `msorder` (например, `?msorder=15` или `?msorder=uuid`)
3. Пустой результат, если заказ не найден

::: tip UUID доступ
Можно передать UUID заказа (36 символов) вместо числового ID. Это полезно для публичных ссылок без авторизации.
:::

## Проверка доступа

Заказ будет показан если выполняется любое из условий:

- Заказ находится в сессии пользователя (`$_SESSION['ms3']['orders']`)
- `user_id` заказа совпадает с текущим пользователем
- `customer_id` заказа совпадает с текущим customer (по токену)
- Пользователь авторизован в админке (mgr context)
- Доступ по UUID заказа

## Примеры

### Базовый вывод

```fenom
{'msGetOrder' | snippet}
```

### С превью товаров

```fenom
{'msGetOrder' | snippet : [
    'includeThumbs' => 'small'
]}
```

### Конкретный заказ по ID

```fenom
{'msGetOrder' | snippet : [
    'id' => 15,
    'includeThumbs' => 'small,medium'
]}
```

### Заказ по UUID

```fenom
{'msGetOrder' | snippet : [
    'id' => 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
]}
```

### В плейсхолдер

```fenom
{'msGetOrder' | snippet : [
    'toPlaceholder' => 'orderHtml'
]}

{if 'orderHtml' | placeholder}
    {'orderHtml' | placeholder}
{else}
    <p>Заказ не найден</p>
{/if}
```

## Структура данных в чанке

В чанк передаются следующие объекты:

| Плейсхолдер | Тип | Описание |
|-------------|-----|----------|
| `{$order}` | array | Данные заказа |
| `{$products}` | array | Массив товаров заказа |
| `{$address}` | array | Адрес доставки |
| `{$delivery}` | array | Способ доставки |
| `{$payment}` | array | Способ оплаты |
| `{$total}` | array | Итоги заказа |
| `{$payment_link}` | string | Ссылка на оплату (если доступна) |

### Объект order

| Поле | Описание |
|------|----------|
| `{$order.id}` | ID заказа |
| `{$order.num}` | Форматированный номер (MS-00015) |
| `{$order.uuid}` | UUID заказа |
| `{$order.status_id}` | ID статуса |
| `{$order.status_name}` | Название статуса |
| `{$order.status_color}` | Цвет статуса |
| `{$order.cost}` | Общая стоимость |
| `{$order.cart_cost}` | Стоимость товаров |
| `{$order.delivery_cost}` | Стоимость доставки |
| `{$order.weight}` | Общий вес |
| `{$order.createdon}` | Дата создания |
| `{$order.updatedon}` | Дата обновления |
| `{$order.comment}` | Комментарий к заказу |
| `{$order.user_id}` | ID пользователя MODX |
| `{$order.customer_id}` | ID покупателя |

### Объект address

| Поле | Описание |
|------|----------|
| `{$address.receiver}` | ФИО получателя |
| `{$address.phone}` | Телефон |
| `{$address.email}` | Email |
| `{$address.index}` | Почтовый индекс |
| `{$address.country}` | Страна |
| `{$address.region}` | Регион/область |
| `{$address.city}` | Город |
| `{$address.street}` | Улица |
| `{$address.building}` | Дом |
| `{$address.room}` | Квартира/офис |

### Объект delivery

| Поле | Описание |
|------|----------|
| `{$delivery.id}` | ID доставки |
| `{$delivery.name}` | Название |
| `{$delivery.description}` | Описание |
| `{$delivery.price}` | Стоимость |
| `{$delivery.logo}` | Логотип |

### Объект payment

| Поле | Описание |
|------|----------|
| `{$payment.id}` | ID оплаты |
| `{$payment.name}` | Название |
| `{$payment.description}` | Описание |
| `{$payment.logo}` | Логотип |

### Объект total

| Поле | Описание |
|------|----------|
| `{$total.cost}` | Общая стоимость (форматировано) |
| `{$total.cart_cost}` | Стоимость товаров (форматировано) |
| `{$total.delivery_cost}` | Стоимость доставки (форматировано) |
| `{$total.weight}` | Общий вес (форматировано) |
| `{$total.cart_count}` | Количество товаров |
| `{$total.cart_discount}` | Сумма скидки |

### Массив products

```fenom
{foreach $products as $product}
    {$product.name} — {$product.count} шт. × {$product.price}
{/foreach}
```

Для каждого товара:

| Поле | Описание |
|------|----------|
| `{$product.id}` | ID ресурса товара |
| `{$product.product_id}` | ID товара |
| `{$product.order_product_id}` | ID записи в заказе |
| `{$product.name}` | Название |
| `{$product.pagetitle}` | Заголовок ресурса |
| `{$product.article}` | Артикул |
| `{$product.count}` | Количество |
| `{$product.price}` | Цена (форматировано) |
| `{$product.old_price}` | Старая цена (форматировано) |
| `{$product.cost}` | Сумма (форматировано) |
| `{$product.weight}` | Вес (форматировано) |
| `{$product.discount_price}` | Скидка на единицу |
| `{$product.discount_cost}` | Скидка на позицию |
| `{$product.options}` | Опции товара (массив) |
| `{$product.thumb}` | Превью (если includeThumbs) |
| `{$product.small}` | Превью small (если includeThumbs) |

## Чанк по умолчанию

Стандартный чанк `tpl.msGetOrder` использует Bootstrap 5:

```fenom
{* tpl.msGetOrder *}
<div class="card shadow-sm mb-4">
    <div class="card-header bg-primary text-white">
        <div class="d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Заказ №{$order.num}</h5>
            <span class="badge bg-light text-dark">{$order.status_name ?: 'Новый'}</span>
        </div>
    </div>
    <div class="card-body">
        {if $order.createdon}
            <p class="text-muted mb-2">
                <small>Дата оформления: {$order.createdon | date_format:'%d.%m.%Y %H:%M'}</small>
            </p>
        {/if}

        {* Таблица товаров *}
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Товар</th>
                    <th class="text-center">Кол-во</th>
                    <th class="text-end">Цена</th>
                    <th class="text-end">Сумма</th>
                </tr>
            </thead>
            <tbody>
                {foreach $products as $product}
                    <tr>
                        <td>
                            <div class="d-flex align-items-center gap-3">
                                {if $product.thumb?}
                                    <img src="{$product.thumb}" alt="" class="img-thumbnail" width="50">
                                {/if}
                                <div>
                                    {if $product.id?}
                                        <a href="{$product.id | url}">{$product.pagetitle}</a>
                                    {else}
                                        {$product.name}
                                    {/if}
                                    {if $product.options?}
                                        <div class="small text-muted">{$product.options | join : '; '}</div>
                                    {/if}
                                </div>
                            </div>
                        </td>
                        <td class="text-center">{$product.count}</td>
                        <td class="text-end">{$product.price}</td>
                        <td class="text-end fw-bold">{$product.cost}</td>
                    </tr>
                {/foreach}
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="3" class="text-end">Товары:</td>
                    <td class="text-end fw-bold">{$total.cart_cost}</td>
                </tr>
                {if $total.delivery_cost}
                    <tr>
                        <td colspan="3" class="text-end">Доставка:</td>
                        <td class="text-end">{$total.delivery_cost}</td>
                    </tr>
                {/if}
                <tr class="table-primary">
                    <td colspan="3" class="text-end fw-bold fs-5">Итого:</td>
                    <td class="text-end fw-bold fs-5">{$total.cost}</td>
                </tr>
            </tfoot>
        </table>
    </div>
</div>

{* Доставка и оплата *}
<div class="row g-4 mb-4">
    {if $delivery.name?}
        <div class="col-md-6">
            <div class="card h-100 bg-light">
                <div class="card-body">
                    <h6>Способ доставки</h6>
                    <p class="fw-semibold mb-0">{$delivery.name}</p>
                </div>
            </div>
        </div>
    {/if}
    {if $payment.name?}
        <div class="col-md-6">
            <div class="card h-100 bg-light">
                <div class="card-body">
                    <h6>Способ оплаты</h6>
                    <p class="fw-semibold mb-1">{$payment.name}</p>
                    {if $payment_link?}
                        <a href="{$payment_link}" class="btn btn-success btn-sm mt-2">
                            Оплатить заказ
                        </a>
                    {/if}
                </div>
            </div>
        </div>
    {/if}
</div>

{* Контактные данные *}
{if $address.receiver || $address.phone}
    <div class="card bg-light">
        <div class="card-body">
            <h6>Контактные данные</h6>
            <div class="row g-3">
                {if $address.receiver?}
                    <div class="col-md-6">
                        <small class="text-muted">Получатель</small>
                        <div class="fw-semibold">{$address.receiver}</div>
                    </div>
                {/if}
                {if $address.phone?}
                    <div class="col-md-6">
                        <small class="text-muted">Телефон</small>
                        <div class="fw-semibold">{$address.phone}</div>
                    </div>
                {/if}
                {if $address.email?}
                    <div class="col-md-6">
                        <small class="text-muted">Email</small>
                        <div class="fw-semibold">{$address.email}</div>
                    </div>
                {/if}
                {if $address.street?}
                    <div class="col-12">
                        <small class="text-muted">Адрес доставки</small>
                        <div class="fw-semibold">
                            {if $address.city?}{$address.city}, {/if}
                            {$address.street}
                            {if $address.building?}, д. {$address.building}{/if}
                            {if $address.room?}, кв. {$address.room}{/if}
                        </div>
                    </div>
                {/if}
                {if $order.comment?}
                    <div class="col-12">
                        <small class="text-muted">Комментарий</small>
                        <div>{$order.comment}</div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}
```

## Ссылка на оплату

Ссылка на оплату `{$payment_link}` появляется если:

1. У способа оплаты указан класс обработчика (`class`)
2. Статус заказа входит в список `payStatus` (по умолчанию `1`)
3. Обработчик возвращает ссылку через метод `getPaymentLink()`

```fenom
{'msGetOrder' | snippet : [
    'payStatus' => '1,2,3'  {* Показывать ссылку для статусов 1, 2, 3 *}
]}
```

## Страница благодарности

Типичное использование на странице после оформления заказа:

```fenom
<div class="container py-5">
    <div class="text-center mb-5">
        <h1>Спасибо за заказ!</h1>
        <p class="lead">Мы свяжемся с вами в ближайшее время.</p>
    </div>

    {'msGetOrder' | snippet : [
        'includeThumbs' => 'small'
    ]}

    <div class="text-center mt-4">
        <a href="/" class="btn btn-primary">На главную</a>
    </div>
</div>
```
