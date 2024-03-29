# ue.get.order

Сниппет вывода оформленного заказа/ забронированного события `ue.get.order`

Используется на странице оформления заказа.

![ue.get.order](https://file.modx.pro/files/4/6/e/46ee6d9290e87e7009197747d8f07be8.jpg)

## Параметры

| Параметр | По умолчанию   | Описание        |
| -------- | -------------- | --------------- |
| **tpl**  | `ue.get.order` | Чанк оформления |

::: tip
Можно использовать и другие [общие параметры pdoTools][0104]
:::

## Оформление

Сниппет рассчитывает на работу с [чанком Fenom][010103] и передаёт в него 7 переменных:

- `order` - массив с данными заказа из объекта `msOrder`
- `events` - массив событий со всеми их свойствами
- `user` - массив данных из объектов `modUser` и `modUserProfile` со всеми свойствами покупателя
- `delivery` - массив со свойствами выбранной доставки из объекта `msDelivery`
- `payment` - массив со свойствами выбранной оплаты из объекта `msPayment`
- `total` - массив с итоговыми данными заказа:
  - `cost` - общая стоимость заказа
  - `cart_cost` - отдельная стоимость заказанных товаров
  - `delivery_cost` - отдельная стоимость доставки
  - `cart_count` - количество заказанных товаров

*Так же могут присутствовать и данные, переданные при вызове сниппета.
Например, в чанке оформления новых писем может быть переменная `payment_link`*

## Плейсхолдеры

Вы можете увидеть все доступные плейсхолдеры заказа просто указав пустой чанк:

```fenom
<pre>
{'!ue.get.order' | snippet : [
  'tpl' => '',
]}
</pre>
```

## Создание заказа

Данный сниппет рекомендуется вызывать в связке с другими на странице оформления заказа:

```fenom
{'!ue.order' | snippet} <!-- Форма оформления заказа, скрывается после его создания -->
{'!ue.get.order' | snippet} <!-- Вывод информации о заказе, показывается после его создания -->
```

## Оформление писем

Для оформления почтовых уведомлений покупателям используется сниппет [msGetOrder][01020205], если вы включили их отправку в [настройках статусов][01020104].

По умолчанию все письма расширяют один базовый почтовый шаблон `tpl.msEmail` и меняют заданные в нём блоки:

- `logo` - логотип магазина со ссылкой на главную страницу
- `title` - заголовок письма
- `products` - таблица заказанные товаров
- `footer` - ссылка на сайте в подвале письма

Идентифицировать заказы событий можно по полю `context` заказа, и если нужно оформить данные заказы по своему.
Например, заменим переменную `products` из сниппета msGetOrder на `events` из сниппета ue.get.order

```fenom
{var $ue = $order.context == 'userevents'}
{if $ue}
  {var $tmp = '!ue.get.order' | snippet : [
    'msorder' => $order.id,
    'return' => 'data',
  ]}
  {set $products = $tmp.events}
{/if}
```

Как видите, мы запустили на обработку сниппет `ue.get.order` и заменили значение переменной  `products`.
В зависимости от функционала сайта, вы можете переопределить шаблон `tpl.msEmail` например так

```fenom
{var $ue = $order.context == 'userevents'}
{if $ue}
  {var $tmp = '!ue.get.order' | snippet : [
    'msorder' => $order.id,
    'return' => 'data',
  ]}
  {set $products = $tmp.events}
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
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
                      {if !$ue}
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
                              <th style="{$style.th}"></th>
                              <th style="{$style.th}">{'userevents_startdate'|lexicon}</th>
                              <th style="{$style.th}">{'userevents_startdate'|lexicon}</th>
                              <th style="{$style.th}">{'userevents_cost'|lexicon}</th>
                            </tr>
                          </thead>
                          {foreach $products as $row}
                            <tr>
                              <td class="name">
                                <h4>
                                  <a href="{$row.resource.id|url}">{$row.resource.pagetitle}</a>
                                </h4>
                                {if $row.description}
                                  <p>
                                    <small>
                                      {$row.description}
                                    </small>
                                  </p>
                                {/if}
                                {if $row.options}
                                  <p>
                                    <small>
                                      {foreach $row.options as $key => $option}
                                        {if $key in ['cost']}{continue}{/if}

                                        {set $caption = ('userevents_' ~ $key)|lexicon}
                                        {if $option is array}
                                          {$caption} - {$option | join : '; '}
                                        {else}
                                          {$caption} - {$option}
                                        {/if}
                                        <br>
                                      {/foreach}
                                    </small>
                                  </p>
                                {/if}
                              </td>
                              <td class="startdate">
                                {$row.startdate|date_format:"%Y-%m-%d %H:%M"}
                              </td>
                              <td class="stopdate">
                                {$row.enddate|date_format:"%Y-%m-%d %H:%M"}
                              </td>
                              <td class="cost">
                                {$row.options.cost|number:0:'.':' '} {'userevents_unit_cost'|lexicon}
                              </td>
                            </tr>
                          {/foreach}
                          <tfoot></tfoot>
                        </table>
                        <h3 style="{$style.h}{$style.h3}">
                          {'userevents_order_cost'|lexicon}:
                          <strong>{$total.cost}</strong> {'userevents_unit_cost'|lexicon}
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

Проверяется поле `context` заказа и если это заказ магазина вы получите вывод товаров, иначе вывод событий.

Подробнее о расширении шаблонов вы можете прочитать в [документации Fenom][001].

[0104]: /components/pdotools/general-properties
[010103]: /components/pdotools/parser
[01020205]: /components/minishop2/snippets/msgetorder
[01020104]: /components/minishop2/interface/settings
[001]: https://github.com/fenom-template/fenom/blob/master/docs/ru/tags/extends.md
