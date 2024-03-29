# Установка и настройка

Настройка компонента происходит в 2 этапа.

## Вывод формы на странице товара

Загружаем в стандартную галерею miniShop2 одно изображение (текстуру) для товара. Оно будет доступно из свойства `$_modx->resource.image`.

В чанке `msProduct.content` вызываем сниппет `mswp.form`:

```fenom
{'!mswp.form' | snippet : [
  'id' => $_modx->resource.id,
  'image' => $_modx->resource.image,
  'cart_id' => 7,
]}
```

Ресурс корзины имеет ID = 7.

## Вывод превью и выбранных значений в корзине

Теперь нужно отобразить выбранный кусок обоев и указанные в форме данные при выводе товаров в корзине.
Для этого редактируем чанк `tpl.msCart`.

### Превью выбранного куска

Заменяем:

```fenom
<td class="image">
  {if $product.thumb?}
    <img src="{$product.thumb}" alt="{$product.pagetitle}" title="{$product.pagetitle}"/>
  {else}
    <img src="{'assets_url' | option}components/minishop2/img/web/ms2_small.png"
        srcset="{'assets_url' | option}components/minishop2/img/web/ms2_small@2x.png 2x"
        alt="{$product.pagetitle}" title="{$product.pagetitle}"/>
  {/if}
</td>
```

на:

```fenom
<td class="image">
  {if $product.options.mswp}
    {var $preview_params = ([
      ('h=200'),
      ('width=' ~ $product.options.width),
      ('height=' ~ $product.options.height),
      ('position=' ~ $product.options.position),
      ('flip=' ~ $product.options.flip),
      ('grayscale=' ~ $product.options.grayscale),
      ('image=' ~ $product.options.image),
    ] | join : '&')}
    <img style="max-width: 120px; max-height: 90px;" alt="{$product.pagetitle}" title="{$product.pagetitle}"
        src="/assets/components/mswallpapers/preview.php?{$preview_params}">
    {unset $preview_params}
  {else}
    {if $product.thumb?}
      <img src="{$product.thumb}" alt="{$product.pagetitle}" title="{$product.pagetitle}"/>
    {else}
      <img src="{'assets_url' | option}components/minishop2/img/web/ms2_small.png"
          srcset="{'assets_url' | option}components/minishop2/img/web/ms2_small@2x.png 2x"
          alt="{$product.pagetitle}" title="{$product.pagetitle}"/>
    {/if}
  {/if}
</td>
```

### Вывод выбранных значений

Заменяем:

```fenom
{if $product.options?}
  <div class="small">
    {$product.options | join : '; '}
  </div>
{/if}
```

на:

```fenom
{if $product.options.mswp}
  {var $unit = ($product.options.unit | replace : ['mm','cm','m'] : ['мм','см','м'])}
  <div>
    <b>Размер</b>:
    {$product.options.width} {$unit}
    x
    {$product.options.height} {$unit}
    =
    {$product.options.size} м<sup>2</sup>
  </div>

  {if $product.options.comment}
    <div>
      <b>Комментарий</b>: {$product.options.comment}
    </div>
  {/if}
{else}
  {if $product.options?}
    <div class="small">
      {$product.options | join : '; '}
    </div>
  {/if}
{/if}
```

### Вывод превью и выбранных значений в письме

Таким же образом можно вывести превью и указанные в форме данные в письме, отсылаемом при оформлении заказа и смене статусов.
Для этого редактируем чанк `tpl.msEmail`.

#### Превью выбранного куска

Заменяем:

```fenom
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
```

на:

```fenom
<td style="{$style.th}">
  {if $product.options.mswp}
    {var $preview_params = ([
      ('h=200'),
      ('width=' ~ $product.options.width),
      ('height=' ~ $product.options.height),
      ('position=' ~ $product.options.position),
      ('flip=' ~ $product.options.flip),
      ('grayscale=' ~ $product.options.grayscale),
      ('image=' ~ $product.options.image),
    ] | join : '&')}
    <img style="max-width: 120px; max-height: 90px;" alt="{$product.pagetitle}" title="{$product.pagetitle}"
        src="{$site_url}{$assets_url}components/mswallpapers/preview.php?{$preview_params}">
    {unset $preview_params}
  {else}
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
  {/if}
</td>
```

#### Вывод выбранных значений

Заменяем:

```fenom
{if $product.options?}
  <div class="small">
    {$product.options | join : '; '}
  </div>
{/if}
```

на:

```fenom
{if $product.options.mswp}
  {var $unit = ($product.options.unit | replace : ['mm','cm','m'] : ['мм','см','м'])}
  <div>
    <b>Размер</b>:
    {$product.options.width} {$unit}
    x
    {$product.options.height} {$unit}
    =
    {$product.options.size} м<sup>2</sup>
  </div>

  {if $product.options.comment}
    <div>
      <b>Комментарий</b>: {$product.options.comment}
    </div>
  {/if}
{else}
  {if $product.options?}
    <div class="small">
      {$product.options | join : '; '}
    </div>
  {/if}
{/if}
```
