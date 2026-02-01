# Installation and setup

Component setup is done in 2 steps.

## Form output on product page

Upload one image (texture) to the standard miniShop2 gallery for the product. It will be available as `$_modx->resource.image`.

Call snippet `mswp.form` in chunk `msProduct.content`:

```fenom
{'!mswp.form' | snippet: [
  'id' => $_modx->resource.id,
  'image' => $_modx->resource.image,
  'cart_id' => 7,
]}
```

Cart resource has ID = 7.

## Preview and selected values in cart

Display the selected wallpaper piece and form data when outputting cart products.
Edit chunk `tpl.msCart`.

### Selected piece preview

Replace:

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

with:

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

### Selected values output

Replace:

```fenom
{if $product.options?}
  <div class="small">
    {$product.options | join : '; '}
  </div>
{/if}
```

with:

```fenom
{if $product.options.mswp}
  {var $unit = ($product.options.unit | replace : ['mm','cm','m'] : ['mm','cm','m'])}
  <div>
    <b>Size</b>:
    {$product.options.width} {$unit}
    x
    {$product.options.height} {$unit}
    =
    {$product.options.size} m<sup>2</sup>
  </div>

  {if $product.options.comment}
    <div>
      <b>Comment</b>: {$product.options.comment}
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

### Preview and selected values in email

You can output preview and form data in order and status change emails the same way.
Edit chunk `tpl.msEmail`.

#### Selected piece preview

Replace:

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

with:

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

#### Selected values output

Replace:

```fenom
{if $product.options?}
  <div class="small">
    {$product.options | join : '; '}
  </div>
{/if}
```

with:

```fenom
{if $product.options.mswp}
  {var $unit = ($product.options.unit | replace : ['mm','cm','m'] : ['mm','cm','m'])}
  <div>
    <b>Size</b>:
    {$product.options.width} {$unit}
    x
    {$product.options.height} {$unit}
    =
    {$product.options.size} m<sup>2</sup>
  </div>

  {if $product.options.comment}
    <div>
      <b>Comment</b>: {$product.options.comment}
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
