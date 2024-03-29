# Быстрый старт

## Статусы заказов

Если у вас были изменены основные статусы заказов, то необходимо зайти в системные настройки компонента и указать значимые для работы статусы: `mspc2_order_status_paid`, `mspc2_order_status_cancel`.

## Вывод формы промо-кода

Просто вызываем сниппет `msPromoCode2` в нужном месте:

```fenom
{'!msPromoCode2' | snippet}
```

### Обновление цен в корзине

Для обновления цен в корзине необходимо в чанке корзины в цикле вывода товаров:

1. Добавить аттрибут `data-mspc2-id` со значением `{$product | mspc2CartKey}` к обрамляющему тегу с `id="{$product.key}"`.
2. Обернуть **общий блок** с актуальной и старой ценами, тегом с классом `.js-mspc2-cart-product-prices`.
3. Обернуть **общий блок** со стоимостью товаров, тегом с классом `.js-mspc2-cart-product-prices`.

### Пример кода для корзины

Чанк корзины `tpl.msCart` или его копия:

```fenom
<div id="msCart">
  ...
  {foreach $products as $product}
    <tr id="{$product.key}" data-mspc2-id="{$product | mspc2CartKey}">
      <td class="title">
        ...
      </td>
      <td class="count">
        ...
      </td>
      <td class="price [ js-mspc2-cart-product-prices ]">
        <span class="mr-2 text-nowrap">{$product.price} {'ms2_frontend_currency' | lexicon}</span>
        {if $product.old_price?}
          <span class="old_price text-nowrap">{$product.old_price} {'ms2_frontend_currency' | lexicon}</span>
        {/if}
      </td>
      <td class="cost [ js-mspc2-cart-product-prices ]">
        <span class="mr-2 text-nowrap"><span class="ms2_cost">{$product.cost}</span> {'ms2_frontend_currency' | lexicon}</span>
      </td>
    </tr>
  {/foreach}
  ...
</div>
```

## Обновление цен в каталоге и на странице товара

Если вы выводите форму промо-кода на страницах каталога или на странице товара, то после применения промо-кода, хорошо бы, чтобы цены обновлялись на лету.
Сделать это не так уж и трудно, для этого нужно:

1. Обернуть блок товара тегом с классом `.js-mspc2-product` и атрибутом `data-id` равным id текущего товара.
2. Обернуть число цены товара, находящуюся в этом блоке, тегом с классом `.js-mspc2-product-price`.
3. Обернуть число старой цены товара, находящуюся в этом блоке, тегом с классом `.js-mspc2-product-old-price`.

### Пример кода для товара в каталоге

Предположим, что это происходит в чанке `tpl.msProducts.row`:

```fenom
<div class="ms2_product [ js-mspc2-product ]" data-id="{$id}">
  ...
  <span class="price">
    <span class="[ js-mspc2-product-price ]">
      {$price}
    </span>
    {'ms2_frontend_currency' | lexicon}
  </span>

  <span class="discount" style="display: none;">
    Скидка:
    <span class="[ js-mspc2-product-discount-amount ]">
      0
    </span>
    {'ms2_frontend_currency' | lexicon}
  </span>

  {if $old_price?}
    <span class="old_price">
      <span class="[ js-mspc2-product-old-price ]">
        {$old_price}
      </span>
      {'ms2_frontend_currency' | lexicon}
    </span>
  {/if}
  ...
</div>
```

### Пример кода для страницы товара

Предположим, что мы это делаем в чанке `msProduct.content`:

```modx
...
<div id="msProduct" class="[ js-mspc2-product ]" data-id="{$_modx->resource['id']}">
  ...
  <span class="[ js-mspc2-product-price ]">
    [[+price]]
  </span>
  [[%ms2_frontend_currency]]

  [[+old_price:gt=`0`:then=`
    <span class="old_price ml-2">
      <span class="[ js-mspc2-product-old-price ]">
        [[+old_price]]
      </span>
      [[%ms2_frontend_currency]]
    </span>
  `:else=``]]

  <div class="discount ml-md-3" style="display: none;">
    Скидка:
    <span class="[ js-mspc2-product-discount-amount ]">
      0
    </span>
    [[%ms2_frontend_currency]]
  </div>
</div>
```

### Вывод размера скидки рядом с ценой

В том же блоке товара с классом `.js-mspc2-product` добавить подобный код:

```fenom
<div style="display: none;">
  Скидка:
  <span class="[ js-mspc2-product-discount-amount ]">0</span>
  {'ms2_frontend_currency' | lexicon}
</div>
```

Обратите внимание на тег с классом `.js-mspc2-product-discount-amount`. Он обязателен для обновления на лету.
