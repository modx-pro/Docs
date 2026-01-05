---
title: msGetOrder
---
# msGetOrder

Сниппет для вывода информации о заказе. Используется на странице «Спасибо за заказ» или в личном кабинете.

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| **tpl** | `tpl.msGetOrder` | Чанк оформления заказа |
| **includeTVs** | | TV-параметры товаров через запятую |
| **includeThumbs** | | Превью изображений через запятую |
| **toPlaceholder** | | Сохранить результат в плейсхолдер |
| **showLog** | `false` | Показать лог выполнения |

## Определение заказа

Сниппет определяет заказ в следующем порядке:

1. GET-параметр `msorder` (например, `?msorder=15`)
2. Последний созданный заказ в сессии пользователя
3. Ничего не выводится, если заказ не найден

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

### В плейсхолдер

```fenom
{'msGetOrder' | snippet : [
    'toPlaceholder' => 'order'
]}

{if $_modx->getPlaceholder('order')}
    {$_modx->getPlaceholder('order')}
{else}
    <p>Заказ не найден</p>
{/if}
```

## Плейсхолдеры в чанке

### Данные заказа

- `{$id}` — Номер заказа
- `{$num}` — Форматированный номер (например, `MS-00015`)
- `{$status_id}` — ID статуса
- `{$status_name}` — Название статуса
- `{$status_color}` — Цвет статуса
- `{$createdon}` — Дата создания
- `{$updatedon}` — Дата обновления

### Стоимость

- `{$cost}` — Стоимость товаров
- `{$cart_cost}` — Стоимость корзины
- `{$delivery_cost}` — Стоимость доставки
- `{$weight}` — Общий вес

### Покупатель

- `{$user_id}` — ID пользователя
- `{$receiver}` — ФИО получателя
- `{$email}` — Email
- `{$phone}` — Телефон

### Доставка и оплата

- `{$delivery_id}` — ID способа доставки
- `{$delivery_name}` — Название доставки
- `{$payment_id}` — ID способа оплаты
- `{$payment_name}` — Название оплаты
- `{$address}` — Адрес доставки

### Товары заказа

```fenom
{foreach $products as $product}
    {$product.name} — {$product.count} шт. × {$product.price} руб.
{/foreach}
```

Для каждого товара:

- `{$product.product_id}` — ID товара
- `{$product.name}` — Название
- `{$product.count}` — Количество
- `{$product.price}` — Цена
- `{$product.weight}` — Вес
- `{$product.cost}` — Сумма (цена × количество)
- `{$product.options}` — Опции товара
- `{$product.thumb}` — Превью (если includeThumbs)

## Пример чанка

```fenom
{* tpl.msGetOrder *}
<div class="order-details">
    <h2>Заказ {$num}</h2>

    <div class="order-status" style="color: {$status_color}">
        Статус: {$status_name}
    </div>

    <div class="order-info">
        <p>Дата: {$createdon | date : 'd.m.Y H:i'}</p>
        <p>Получатель: {$receiver}</p>
        <p>Email: {$email}</p>
        <p>Телефон: {$phone}</p>
        <p>Адрес: {$address}</p>
    </div>

    <h3>Товары</h3>
    <table class="order-products">
        <thead>
            <tr>
                <th>Товар</th>
                <th>Цена</th>
                <th>Кол-во</th>
                <th>Сумма</th>
            </tr>
        </thead>
        <tbody>
            {foreach $products as $product}
                <tr>
                    <td>
                        {if $product.thumb?}
                            <img src="{$product.thumb}" alt="" width="50">
                        {/if}
                        {$product.name}
                        {if $product.options?}
                            <small>
                                {foreach $product.options as $key => $value}
                                    {$key}: {$value}<br>
                                {/foreach}
                            </small>
                        {/if}
                    </td>
                    <td>{$product.price} руб.</td>
                    <td>{$product.count}</td>
                    <td>{$product.cost} руб.</td>
                </tr>
            {/foreach}
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3">Товары:</td>
                <td>{$cart_cost} руб.</td>
            </tr>
            <tr>
                <td colspan="3">Доставка ({$delivery_name}):</td>
                <td>{$delivery_cost} руб.</td>
            </tr>
            <tr>
                <td colspan="3"><strong>Итого:</strong></td>
                <td><strong>{$cost} руб.</strong></td>
            </tr>
        </tfoot>
    </table>

    <div class="order-payment">
        <p>Способ оплаты: {$payment_name}</p>
    </div>
</div>
```

## Страница благодарности

Типичное использование на странице после оформления заказа:

```fenom
<h1>Спасибо за заказ!</h1>

{'msGetOrder' | snippet : [
    'includeThumbs' => 'small'
]}

<p>
    Мы свяжемся с вами в ближайшее время для подтверждения заказа.
</p>

<a href="/" class="btn">На главную</a>
```
