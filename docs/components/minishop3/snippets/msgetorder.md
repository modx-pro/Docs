---
title: msGetOrder
---
# msGetOrder

Сниппет выводит информацию о заказе: страница «Спасибо за заказ» или личный кабинет.

::: warning Страница заказа не должна кэшироваться
Снимите у ресурса галочку «Кэшировать» в админке. Сниппет выводит данные конкретного заказа — имя, телефон, адрес, состав; если страница кэшируемая, этот HTML сохранится в кэше и достанется следующему посетителю.

Префикса `!` в вызове для этого недостаточно. В MODX `[[!snippet]]` откладывает исполнение до некэшируемого прохода, а в Fenom `{'!msGetOrder'|snippet}` сниппет выполняется там же, где встретился: `!` лишь отключает кэш самого элемента в pdoTools. Ставить его стоит, но полагаться — только на настройку ресурса.
:::

## Параметры

| Параметр | По умолчанию | Описание |
| --- | --- | --- |
| **id** | | ID или UUID заказа (в приоритете над GET-параметром) |
| **tpl** | `tpl.msGetOrder` | Чанк оформления заказа |
| **includeThumbs** | | Превью изображений товаров через запятую |
| **includeContent** | `false` | Включить поле content товаров |
| **includeTVs** | | TV товаров через запятую (pdoTools, `joinTVsTo` = `msProduct`) |
| **payStatus** | `1` | CSV ID статусов, для которых показывать `payment_link`. По умолчанию `1` (черновик): после оформления заказ обычно в `ms3_status_new` (часто `2`), поэтому укажите нужные ID явно |
| **toPlaceholder** | | Сохранить результат в плейсхолдер |
| **showLog** | `false` | Показать журнал выполнения. Виден только пользователю, вошедшему в админку |

Сниппет **не** поддерживает `return`: на выходе HTML чанка или плейсхолдер через `toPlaceholder`.

Остальные переданные параметры уходят в запрос товаров pdoFetch поверх умолчаний сниппета — так работают `where`, `leftJoin`, `select` и прочие его настройки. Принимается и массив, и строка JSON.

## Определение заказа

Сниппет определяет заказ в следующем порядке:

1. Параметр сниппета `id` (ID или UUID)
2. GET-параметр `msorder` (например, `?msorder=15` или `?msorder=uuid`)
3. Если заказ не найден, вернётся текст лексиконы `ms3_err_order_nf`. Пустая строка означает, что идентификатор не передан или у посетителя нет прав доступа

Значение длиной ровно 36 символов считается UUID, всё остальное приводится к числу и ищется по `id`.

::: warning Ссылка из письма об оплате ведёт не на тот заказ
Штатный обработчик оплаты кладёт в `payment_link` ссылку с **номером** заказа: `?msorder=2610/5` (`DefaultPayment`). Сниппет такой формат не понимает — он не длиной 36 символов, поэтому приводится к числу: от `2610/5` остаётся `2610`. Посетитель увидит либо «заказ не найден», либо посторонний заказ с таким id.

Поиска по номеру в сниппете нет. Если ссылку из письма нужно обрабатывать, подставляйте в неё UUID или ID заказа — например, переопределив шаблон письма или обработчик оплаты.
:::

::: tip UUID доступ
UUID заказа (36 символов) вместо числового ID удобен для публичных ссылок. При обращении по UUID проверка прав **не выполняется** — заказ виден любому, у кого есть ссылка. Для личного кабинета используйте числовой ID или авторизацию покупателя.
:::

## Проверка доступа

Сниппет выведет заказ, если выполнено любое из условий:

- Заказ находится в сессии пользователя (`$_SESSION['ms3']['orders']`)
- `user_id` заказа совпадает с текущим пользователем MODX
- `customer_id` заказа совпадает со значением `customer` текущего покупателя (по токену)
- Пользователь авторизован в контексте `mgr`
- Запрос по UUID (36 символов): **без проверки владельца**

## Примеры

### Базовый вывод

```fenom
{'!msGetOrder' | snippet}
```

### С превью товаров

```fenom
{'!msGetOrder' | snippet : [
    'includeThumbs' => 'small'
]}
```

### Конкретный заказ по ID

```fenom
{'!msGetOrder' | snippet : [
    'id' => 15,
    'includeThumbs' => 'small,medium'
]}
```

### Заказ по UUID

```fenom
{'!msGetOrder' | snippet : [
    'id' => 'a1b2c3d4-e5f6-7890-abcd-ef1234567890'
]}
```

### В плейсхолдер

```fenom
{'!msGetOrder' | snippet : [
    'toPlaceholder' => 'orderHtml'
]}

{if 'orderHtml' | placeholder}
    {'orderHtml' | placeholder}
{else}
    <p>Заказ не найден</p>
{/if}
```

## Структура данных в чанке

| Плейсхолдер | Тип | Описание |
| --- | --- | --- |
| `{$order}` | array | Данные заказа |
| `{$products}` | array | Массив товаров заказа |
| `{$address}` | array | Адрес доставки |
| `{$delivery}` | array | Способ доставки |
| `{$payment}` | array | Способ оплаты |
| `{$total}` | array | Итоги заказа |
| `{$payment_link}` | string | Ссылка на оплату (если доступна) |

### Объект order

| Поле | Описание |
| --- | --- |
| `{$order.id}` | ID заказа |
| `{$order.num}` | Номер заказа. Формируется как дата по `ms3_order_format_num` (по умолчанию `ym`) плюс разделитель и счётчик — например, `2610/5` |
| `{$order.uuid}` | UUID заказа |
| `{$order.status_id}` | ID статуса |
| `{$order.cost}` | Общая стоимость |
| `{$order.cart_cost}` | Стоимость товаров |
| `{$order.delivery_cost}` | Стоимость доставки |
| `{$order.weight}` | Общий вес |
| `{$order.createdon}` | Дата создания |
| `{$order.updatedon}` | Дата обновления |
| `{$order.order_comment}` | Комментарий к заказу |
| `{$order.user_id}` | ID пользователя MODX |
| `{$order.customer_id}` | ID покупателя |

`msGetOrder` отдаёт `$msOrder->toArray()`: полей `status_name` и `status_color` в объекте нет, в отличие от `msCustomer`. Название статуса берите из связи Status или отдельным запросом.

Кроме перечисленных, в объекте есть `delivery_id`, `payment_id`, `context` и `properties` — таблица показывает только то, что обычно выводят на странице.

### Объект address

| Поле | Описание |
| --- | --- |
| `{$address.first_name}` | Имя |
| `{$address.last_name}` | Фамилия |
| `{$address.phone}` | Телефон |
| `{$address.email}` | Email |
| `{$address.comment}` | Комментарий к адресу |
| `{$address.index}` | Почтовый индекс |
| `{$address.country}` | Страна |
| `{$address.region}` | Регион/область |
| `{$address.city}` | Город |
| `{$address.street}` | Улица |
| `{$address.building}` | Дом |
| `{$address.room}` | Квартира/офис |

Есть и остальные колонки адреса: `metro`, `entrance`, `floor`, `text_address` (адрес одной строкой), `properties`, а также служебные `order_id`, `createdon`, `updatedon`.

### Объект delivery

| Поле | Описание |
| --- | --- |
| `{$delivery.id}` | ID доставки |
| `{$delivery.name}` | Название |
| `{$delivery.description}` | Описание |
| `{$delivery.price}` | Надбавка за доставку, а не её стоимость. Может быть процентом (`10%`) — тогда считается от стоимости товаров. Итоговую сумму берите из `{$total.delivery_cost_formatted}` |
| `{$delivery.logo}` | Логотип |

### Объект payment

| Поле | Описание |
| --- | --- |
| `{$payment.id}` | ID оплаты |
| `{$payment.name}` | Название |
| `{$payment.description}` | Описание |
| `{$payment.price}` | Наценка (число или процент) |
| `{$payment.logo}` | Логотип |

### Массив shipments

`{$shipments}` — отправления заказа. Пустой массив, если служба отправлений не настроена или отправлений нет.

У каждого элемента: `id`, `order_id`, `delivery_id`, `status`, `tracking_number`, `carrier`, `shipped_at`, `delivered_at`.

### Объект total

| Поле | Описание |
| --- | --- |
| `{$total.cost}` | Итого к оплате (число) |
| `{$total.cost_formatted}` | Итого с валютой |
| `{$total.cart_cost}` | Стоимость товаров (число) |
| `{$total.cart_cost_formatted}` | Стоимость товаров с валютой |
| `{$total.delivery_cost}` | Стоимость доставки (число) |
| `{$total.delivery_cost_formatted}` | Доставка с валютой |
| `{$total.weight}` / `{$total.cart_weight}` | Общий вес (число) |
| `{$total.weight_formatted}` / `{$total.cart_weight_formatted}` | Вес с единицей |
| `{$total.cart_count}` | Количество товаров |
| `{$total.cart_discount}` | Сумма скидки (число) |

### Массив products

```fenom
{foreach $products as $product}
    {$product.name} — {$product.count} шт. × {$product.price}
{/foreach}
```

| Поле | Описание |
| --- | --- |
| `{$product.id}` | ID ресурса товара |
| `{$product.product_id}` | ID товара |
| `{$product.order_product_id}` | ID записи в заказе |
| `{$product.name}` | Название |
| `{$product.pagetitle}` | Заголовок ресурса |
| `{$product.article}` | Артикул |
| `{$product.count}` | Количество |
| `{$product.price}` | Цена за единицу (число) |
| `{$product.old_price}` | Старая цена (число) |
| `{$product.cost}` | Сумма по строке (число) |
| `{$product.weight}` | Вес (число) |
| `{$product.discount_price}` | Скидка на единицу (число) |
| `{$product.discount_cost}` | Скидка на позицию (число) |
| `{$product.price_formatted}`, `{$product.cost_formatted}`, `{$product.weight_formatted}` и др. | Форматированный вывод с валютой/единицей |
| `{$product.options}` | Опции позиции заказа (массив) |
| `{$product.option.color}` | Значение опции как отдельное поле (`option.{ключ}`) |
| `{$product.product_key}` | Ключ позиции: у одного товара с разными опциями ключи разные |
| `{$product.original_price}` | Текущая цена товара в каталоге — может отличаться от цены в заказе |
| `{$product.thumb}` | Превью товара из его данных. Размеры, запрошенные через `includeThumbs`, приходят полями по имени размера: при `includeThumbs => 'small'` это `{$product.small}` |

## Чанк по умолчанию

Ниже рекомендуемая разметка карточки заказа на Bootstrap 5. Точной копией поставляемого чанка `tpl.msGetOrder` она не является:

```fenom
{* tpl.msGetOrder *}
<div class="card shadow-sm mb-4">
    <div class="card-header bg-primary text-white">
        <div class="d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Заказ №{$order.num}</h5>
            <span class="badge bg-light text-dark">{$order.status_id}</span>
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
{if $address.first_name || $address.phone}
    <div class="card bg-light">
        <div class="card-body">
            <h6>Контактные данные</h6>
            <div class="row g-3">
                {if $address.first_name?}
                    <div class="col-md-6">
                        <small class="text-muted">Получатель</small>
                        <div class="fw-semibold">{$address.first_name} {$address.last_name}</div>
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
                {if $order.order_comment?}
                    <div class="col-12">
                        <small class="text-muted">Комментарий</small>
                        <div>{$order.order_comment}</div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
{/if}
```

## Ссылка на оплату

Ссылка на оплату `{$payment_link}` появляется, если:

1. У способа оплаты указан класс обработчика (`class`) с методом, возвращающим URL
2. Статус заказа входит в CSV-список `payStatus` (по умолчанию `1`, черновик)
3. Заказ не финальный и не в статусе «оплачен»

::: tip `ms3_payment_link_statuses` — не системная настройка
Такого ключа нет ни в поставке, ни в лексиконах: в админке он не появится. Код читает его через `getOption()` в одном месте — `PaymentLinkResolver`, — поэтому значение можно задать только вручную, создав настройку самому. На этот сниппет оно не влияет: здесь список статусов задаётся параметром `payStatus`.
:::

```fenom
{'!msGetOrder' | snippet : [
    'payStatus' => '2,3'  {* обычно после submit статус = ms3_status_new (2) *}
]}
```

## Страница благодарности

Заказ определяется по GET-параметру `?msorder=...`, который подставляет редирект после оформления. Там лежит UUID заказа. Оформление страницы — ваше:

```fenom
{'!msGetOrder' | snippet : [
    'includeThumbs' => 'small'
]}
```

Какая это страница, задаёт настройка `ms3_order_redirect_thanks_id` — по умолчанию `1`. Отдельно есть `ms3_order_success_page_id` (по умолчанию `0`, то есть стартовая страница сайта): её использует обработчик оплаты для ссылки `payment_link`.

::: tip msOrder и msGetOrder уживаются на одной странице
При наличии `?msorder` в адресе сниппет формы заказа возвращает пустую строку. Поэтому оба вызова можно держать в одном шаблоне: до оформления покупатель видит форму, после редиректа — данные заказа. Разводить их по разным ресурсам не нужно.
:::
