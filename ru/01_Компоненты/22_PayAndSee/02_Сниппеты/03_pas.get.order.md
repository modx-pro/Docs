# pas.order

Сниппет вывода оформленного заказа `pas.order`

Используется на странице оформления заказа.

## Параметры

| Параметр          | По умолчанию  | Описание                                                                                                                                                                                     |
| ----------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **tpl**           | pas.get.order | Чанк оформления                                                                                                                                                                              |
| **includeTVs**    |               | Список ТВ параметров для выборки, через запятую. Например: "action,time" дадут плейсхолдеры [[+action]] и [[+time]].                                                                         |
| **includeThumbs** |               | Список размеров превьюшек для выборки, через запятую. Например: "120x90,360x240" дадут плейслолдеры [[+120x90]] и [[+360x240]]. Картинки должны быть заранее сгенерированы в галерее товара. |

*Можно использовать и другие [общие параметры pdoTools][0104]*

## Оформление

Сниппет рассчитывает на работу с [чанком Fenom][010103] и передаёт в него 7 переменных:

- `order` - массив с данными заказа из объекта `msOrder`
- `products` - массив заказанных товаров со всеми их свойствами
- `user` - массив данных из объектов `modUser` и `modUserProfile` со всеми свойствами покупателя
- `address` - массив данных из объекта `msAddress` со указанными данными для доставки
- `delivery` - массив со свойствами выбранной доставки из объекта `msDelivery`
- `payment` - массив со свойствами выбранной оплаты из объекта `msPayment`
- `total` - массив с итоговыми данными заказа:
  - `cost` - общая стоимость заказа
  - `cart_cost` - отдельная стоимость заказанных товаров
  - `delivery_cost` - отдельная стоимость доставки
  - `cart_count` - количество заказанных товаров

*Так же могут присутствовать и данные, переданные при вызове сниппета.
Например, в чанке оформления новых писем может быть переменная `payment_link`*

### Плейсхолдеры

Вы можете увидеть все доступные плейсхолдеры заказа просто указав пустой чанк:

```php
<pre>
{'!pas.get.order'|snippet:[
'tpl'=>''
]}
</pre>
```

## Создание заказа

Данный сниппет рекомендуется вызывать в связке с другими на странице оформления заказа:

```php
{'!pas.order'|snippet} <!-- Форма оформления заказа, скрывается после его создания -->
{'!pas.get.order'|snippet} <!-- Вывод информации о заказе, показывается после его создания -->
```

## Оформление писем

Для оформления почтовых уведомлений покупателям используется сниппет [msGetOrder][01020205], если вы включили их отправку в [настройках статусов][01020104].

По умолчанию все письма расширяют один базовый почтовый шаблон `tpl.msEmail` и меняют заданные в нём блоки:

- `logo` - логотип магазина со ссылкой на главную страницу
- `title` - заголовок письма
- `products` - таблица заказанные товаров
- `footer` - ссылка на сайте в подвале письма

Идентифицировать заказы контента можно по полю `context` заказа, и если нужно оформить данные заказы по своему.
Например, заменим переменную `products` из сниппета msGetOrder на `products` из сниппета pas.get.order

```php
{var $pas = $order.context == 'pas'}
{if $pas}
    {var $tmp = '!pas.get.order'|snippet:[
    'msorder' => $order.id,
    'return' => 'data'
    ]}
    {set $products = $tmp.products}
{/if}
```

Как видите, мы запустили на обработку сниппет `pas.get.order` и заменили значение переменной  `products`.
В зависимости от функционала сайта, вы можете переопределить шаблон `tpl.msEmail` например так

```php
{var $pas = $order.context == 'pas'}
{if $pas}
    {var $tmp = '!pas.get.order'|snippet:[
    'msorder' => $order.id,
    'return' => 'data'
    ]}
    {set $products = $tmp.products}
{/if}

{var $style = [
'logo' => 'display:block;margin: auto;',
'a' => 'color:#348eda;',
'p' => 'font-family: Arial;color: #666666;font-size: 12px;',
'h' => 'font-family:Arial;color: #111111;font-weight: 200;line-height: 1.2em;margin: 40px 20px;',
'h1' => 'font-size: 36px;',
'h2' => 'font-size: 28px;',
'h3' => 'font-size: 22px;',
'th' => 'font-family: Arial;text-align: left;color: #111111;',
'td' => 'font-family: Arial;text-align: left;color: #111111;',
]}

{var $site_url = ('site_url' | option) | preg_replace : '#/$#' : ''}
{var $assets_url = 'assets_url' | option}
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>{'site_name' | option}</title>
</head>
<body style="margin:0;padding:0;background:#f6f6f6;">
<div style="height:100%;padding-top:20px;background:#f6f6f6;">
    {block 'logo'}
        {if !$pas}
            <a href="{$site_url}">
                <img style="{$style.logo}"
                     src="{$site_url}{$assets_url}components/minishop2/img/web/ms2_small@2x.png"
                     alt="{$site_url}"
                     width="120" height="90"/>
            </a>
        {/if}
    {/block}
    <!-- body -->
    <table class="body-wrap" style="padding:0 20px 20px 20px;width: 100%;background:#f6f6f6;margin-top:10px;">
        <tr>
            <td></td>
            <td class="container" style="border:1px solid #f0f0f0;background:#ffffff;width:800px;margin:auto;">
                <div class="content">
                    <table style="width:100%;">
                        <tr>
                            <td>
                                <h3 style="{$style.h}{$style.h3}">
                                    {block 'title'}
                                        {if !$pas}
                                            miniShop2
                                        {else}
                                            PayAndSee
                                        {/if}
                                    {/block}
                                </h3>

                                {block 'products'}
                                    {if !$pas}
                                        <table style="width:90%;margin:auto;">
                                            <thead>
                                            <tr>
                                                <th>&nbsp;</th>
                                                <th style="{$style.th}">{'ms2_cart_title' | lexicon}</th>
                                                <th style="{$style.th}">{'ms2_cart_count' | lexicon}</th>
                                                <th style="{$style.th}">{'ms2_cart_weight' | lexicon}</th>
                                                <th style="{$style.th}">{'ms2_cart_cost' | lexicon}</th>
                                            </tr>
                                            </thead>
                                            {foreach $products as $product}
                                                <tr>
                                                    <td style="{$style.th}">
                                                        {if $product.thumb?}
                                                            <img src="{$site_url}{$product.thumb}"
                                                                 alt="{$product.pagetitle}"
                                                                 title="{$product.pagetitle}"
                                                                 width="120" height="90"/>
                                                        {else}
                                                            <img src="{$site_url}{$assets_url}components/minishop2/img/web/ms2_small@2x.png"
                                                                 alt="{$product.pagetitle}"
                                                                 title="{$product.pagetitle}"
                                                                 width="120" height="90"/>
                                                        {/if}
                                                    </td>
                                                    <td style="{$style.th}">
                                                        {if $product.id?}
                                                            <a href="{$product.id | url : ['scheme' => 'full']}"
                                                               style="{$style.a}">
                                                                {$product.name}
                                                            </a>
                                                        {else}
                                                            {$product.name}
                                                        {/if}
                                                        {if $product.options?}
                                                            <div class="small">
                                                                {$product.options | join : '; '}
                                                            </div>
                                                        {/if}
                                                    </td>
                                                    <td style="{$style.th}">{$product.count} {'ms2_frontend_count_unit' | lexicon}</td>
                                                    <td style="{$style.th}">{$product.weight} {'ms2_frontend_weight_unit' | lexicon}</td>
                                                    <td style="{$style.th}">{$product.price} {'ms2_frontend_currency' | lexicon}</td>
                                                </tr>
                                            {/foreach}
                                            <tfoot>
                                            <tr>
                                                <th colspan="2"></th>
                                                <th style="{$style.th}">
                                                    {$total.cart_count} {'ms2_frontend_count_unit' | lexicon}
                                                </th>
                                                <th style="{$style.th}">
                                                    {$total.cart_weight} {'ms2_frontend_weight_unit' | lexicon}
                                                </th>
                                                <th style="{$style.th}">
                                                    {$total.cart_cost} {'ms2_frontend_currency' | lexicon}
                                                </th>
                                            </tr>
                                            </tfoot>
                                        </table>
                                        <h3 style="{$style.h}{$style.h3}">
                                            {'ms2_frontend_order_cost' | lexicon}:
                                            {if $total.delivery_cost}
                                                {$total.cart_cost} {'ms2_frontend_currency' | lexicon} + {$total.delivery_cost}
                                                {'ms2_frontend_currency' | lexicon} =
                                            {/if}
                                            <strong>{$total.cost}</strong> {'ms2_frontend_currency' | lexicon}
                                        </h3>
                                    {else}
                                        <table style="width:90%;margin:auto;">
                                            <thead>
                                            <tr>
                                                <th style="{$style.th}">{'payandsee_content' | lexicon}</th>
                                                <th style="{$style.th}">{'payandsee_term' | lexicon}</th>
                                                <th style="{$style.th}">{'payandsee_cost' | lexicon}</th>
                                            </tr>
                                            </thead>
                                            {foreach $products as $row}
                                                <tr>
                                                    <td style="{$style.th}">
                                                        <h4><a href="{$row.content_resource | url: ['scheme' => 'full']}" style="{$style.a}">{$row.content_name}</a></h4>
                                                        {if $row.content_description}
                                                            <div class="small">
                                                                <small>{$row.content_description}</small>
                                                            </div>
                                                        {/if}
                                                    </td>
                                                    <td style="{$style.th}">
                                                        {if $row.term_value?}
                                                            <div class="small">
                                                                {$row.term_value} - {$row.term_value | decl : (('payandsee_decl_date_' ~ $row.term_unit) | lexicon)}
                                                            </div>
                                                        {/if}
                                                    </td>
                                                    <td style="{$style.th}">
                                                        {$row.cost} {'payandsee_unit_cost' | lexicon}
                                                    </td>
                                                </tr>
                                            {/foreach}
                                            <tfoot>
                                            </tfoot>
                                        </table>
                                        <h3 style="{$style.h}{$style.h3}">
                                            {'payandsee_order_cost' | lexicon}:
                                            {if $total.delivery_cost}
                                                {$total.cart_cost} {'payandsee_unit_cost' | lexicon} + {$total.delivery_cost}
                                                {'payandsee_unit_cost' | lexicon} =
                                            {/if}
                                            <strong>{$total.cost}</strong> {'payandsee_unit_cost' | lexicon}
                                        </h3>
                                    {/if}

                                {/block}
                            </td>
                        </tr>
                    </table>
                </div>
                <!-- /content -->
            </td>
            <td></td>
        </tr>
    </table>
    <!-- /body -->
    <!-- footer -->
    <table style="clear:both !important;width: 100%;">
        <tr>
            <td></td>
            <td class="container">
                <!-- content -->
                <div class="content">
                    <table style="width:100%;text-align: center;">
                        <tr>
                            <td align="center">
                                <p style="{$style.p}">
                                    {block 'footer'}
                                        <a href="{$site_url}" style="color: #999999;">
                                            {'site_name' | option}
                                        </a>
                                    {/block}
                                </p>
                            </td>
                        </tr>
                    </table>
                </div>
                <!-- /content -->
            </td>
            <td></td>
        </tr>
    </table>
    <!-- /footer -->
</div>
</body>
</html>
```

Проверяется поле `context` заказа и если это заказ магазина вы получите вывод товаров, иначе вывод подписки на контент.

Подробнее о расширении шаблонов вы можете прочитать в [документации Fenom][001].

[0104]: /ru/01_Компоненты/01_pdoTools/04_Общие_параметры.md
[0101]: /ru/01_Компоненты/01_pdoTools/
[010103]: /ru/01_Компоненты/01_pdoTools/03_Парсер.md
[010101]: /ru/01_Компоненты/01_pdoTools/01_Сниппеты/01_pdoResources.md
[01020205]: /ru/01_Компоненты/02_miniShop2/02_Сниппеты/05_msGetOrder.md
[01020104]: /ru/01_Компоненты/02_miniShop2/01_Интерфейс/04_Настройки.md
[001]: https://github.com/fenom-template/fenom/blob/master/docs/ru/tags/extends.md
