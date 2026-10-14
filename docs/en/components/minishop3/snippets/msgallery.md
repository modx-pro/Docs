---
title: msGallery
---
# msGallery

Snippet for outputting a product image gallery.

## Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| **product** | current resource | Product ID |
| **tpl** | `tpl.msGallery` | Gallery layout chunk |
| **limit** | `0` | Number of images (0 = all) |
| **offset** | `0` | Skip count. Works only together with `limit > 0` |
| **sortby** | `position` | Sort field |
| **sortdir** | `ASC` | Sort direction |
| **where** | | JSON extra conditions |
| **filetype** | | Type filter: `image`, or file extensions comma-separated |
| **thumbnails** \* | | Thumbnail filter by names, comma-separated ([#805](https://github.com/modx-pro/MiniShop3/issues/805)) |
| **showInactive** \* | `false` | Show inactive files |
| **extensionsDir** \* | `components/minishop3/img/mgr/extensions/` | Path to file type icons (from `assets/`) for non-images |
| **toPlaceholder** | | Save result to placeholder |
| **showLog** | `false` | Show the execution log. Visible only to a user signed in to the admin |
| **return** | `tpl` | Format: `tpl`, `data`, `json`, `sql`. `json` returns the query rows without merged thumbnails and the `thumbnail` field, while `sql` returns the text of the SQL query without running it |

\* Not declared in the snippet properties.

## Examples

```fenom
{* Gallery of the current product *}
{'msGallery' | snippet}

{* Gallery of a specific product *}
{'msGallery' | snippet : ['product' => 15]}

{* First 5 images *}
{'msGallery' | snippet : ['limit' => 5]}

{* Only the small and medium thumbnails *}
{'msGallery' | snippet : ['thumbnails' => 'small,medium']}

{* Sort by file name *}
{'msGallery' | snippet : ['sortby' => 'name', 'sortdir' => 'ASC']}

{* Images only *}
{'msGallery' | snippet : ['filetype' => 'image']}

{* Video only — list the extensions *}
{'msGallery' | snippet : ['filetype' => 'mp4,webm,mov']}

{* Images and video *}
{'msGallery' | snippet : ['filetype' => 'image,mp4,webm']}
```

### An array instead of HTML

```fenom
{set $files = 'msGallery' | snippet : ['return' => 'data']}

{foreach $files as $file}
    <img src="{$file['url']}" alt="{$file['name']}">
{/foreach}
```

::: info The default value of `return`
After installation the snippet has `return=tpl` — output through the `tpl.msGallery` chunk. The fallback in the code is different, `data`: it only kicks in when the property is empty ([#823](https://github.com/modx-pro/MiniShop3/issues/823)). So ask for an array with an explicit `return=data`.
:::

## Chunk placeholders

Passed to the chunk:

| Placeholder | Description |
| --- | --- |
| `{$files}` | Gallery file array |
| `{$scriptProperties}` | Snippet call parameters |

### File fields

| Field | Description |
| --- | --- |
| `{$file['id']}` | File ID |
| `{$file['product_id']}` | Product ID |
| `{$file['name']}` | File name |
| `{$file['description']}` | Description |
| `{$file['url']}` | Original URL |
| `{$file['path']}` | Folder inside the media source: `{product_id}/` for the original, `{product_id}/{size}/` for a thumbnail. The file name sits separately, in `file` |
| `{$file['file']}` | Filename on disk |
| `{$file['type']}` | `image` for pictures, the file extension for everything else (`mp4`, `pdf`, `zip`) |
| `{$file['thumbnail']}` | Type icon URL (non-image files, from `extensionsDir`) |
| `{$file['createdon']}` | Created date |
| `{$file['createdby']}` | User ID |
| `{$file['position']}` | Position in gallery |
| `{$file['active']}` | Active (1/0) |
| `{$file['hash']}` | File hash |

### Image thumbnails

Thumbnails are added as extra fields named by folder:

| Field | Description |
| --- | --- |
| `{$file['thumb']}` | 150 × 150, WebP |
| `{$file['small']}` | 300 × 300, WebP |
| `{$file['medium']}` | 600 × 600, WebP |
| `{$file['large']}` | 1200 × 1200, JPEG |

::: info Names and sizes come from the media source
These are the values of the source the installer creates. Change the `thumbnails` property of the source and the field names follow it — a field is named after its size.

Clear that property entirely and a single `small` 120 × 120 thumbnail remains: that is the fallback set in the code.
:::

::: warning `thumb` here and `thumb` on a product are different things
In the gallery `thumb` is a thumbnail name from the media source. But `{$product.thumb}` in the catalogue and the cart is a separate column of the product table, unrelated to gallery thumbnails. The names coincide, the sources do not.
:::

### Loop variables

In Fenom, iteration variables are available:

```fenom
{foreach $files as $file}
    {$file@index}     {* Index from 0 *}
    {$file@index + 1}  {* number from 1 *}
    {$file@first}     {* true for first *}
    {$file@last}      {* true for last *}
{/foreach}
```

## Edge cases

| What happens | What is rendered |
| --- | --- |
| The product has no images | With `return=tpl` the chunk is still rendered with an empty `$files`; the default chunk shows a placeholder. With `return=data` — an empty array |
| `product` points at something that is not a product | An empty string, and `[msGallery] Resource is not msProduct` goes to the MODX log |
| The product is closed by resource group permissions | An empty string. The check only applies when `product` differs from the current resource |

::: warning Product publication is not checked
The gallery of an unpublished product is rendered if you address it through `&product` directly. Resource group permissions are respected, the published flag is not.
:::

::: tip Viewing a page creates a folder in the media source
The snippet initializes the media source on every call, and initialization creates the `{product id}/` folder even when there are no images and nothing to upload. On the storefront this means folders appear from ordinary catalogue views.
:::

::: warning File URLs are written to the database on upload
The `url` field is filled once, at upload time. Change the base URL of the media source afterwards and the stored addresses stay as they are — the gallery keeps the old links. The same goes for thumbnails.
:::

## Default chunk

The default chunk `tpl.msGallery` uses Splide.js for the slider and GLightbox for full-size view:

```fenom
{* tpl.msGallery *}
{if $files?}
    {* Splide Slider + GLightbox CSS/JS *}
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css">
    <script src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox@3.3.0/dist/css/glightbox.min.css">
    <script src="https://cdn.jsdelivr.net/npm/glightbox@3.3.0/dist/js/glightbox.min.js"></script>

    <div class="ms3-gallery">
        {* Main slider *}
        <div class="splide ms3-gallery-main" id="ms3-gallery-main">
            <div class="splide__track">
                <ul class="splide__list">
                    {foreach $files as $file}
                        <li class="splide__slide">
                            <a href="{$file['url']}"
                               class="glightbox"
                               data-gallery="ms3-product-gallery"
                               data-title="{$file['name']}"
                               data-description="{$file['description']}">
                                <img src="{$file['medium'] ?: $file['url']}"
                                     alt="{$file['description'] ?: $file['name']}"
                                     loading="{$file@first ? 'eager' : 'lazy'}">
                            </a>
                        </li>
                    {/foreach}
                </ul>
            </div>
        </div>

        {* Thumbnail slider *}
        {if ($files | length) > 1}
            <div class="splide ms3-gallery-thumbs" id="ms3-gallery-thumbs">
                <div class="splide__track">
                    <ul class="splide__list">
                        {foreach $files as $file}
                            <li class="splide__slide">
                                <img src="{$file['small'] ?: $file['medium'] ?: $file['url']}"
                                     alt="{$file['description'] ?: $file['name']}">
                            </li>
                        {/foreach}
                    </ul>
                </div>
            </div>
        {/if}
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            var main = new Splide('#ms3-gallery-main', {
                type: 'fade',
                rewind: true,
                pagination: false,
                arrows: true,
            });

            var thumbsEl = document.getElementById('ms3-gallery-thumbs');
            if (thumbsEl) {
                var thumbs = new Splide('#ms3-gallery-thumbs', {
                    fixedWidth: 100,
                    fixedHeight: 80,
                    gap: 10,
                    rewind: true,
                    pagination: false,
                    arrows: false,
                    isNavigation: true,
                    focus: 'center',
                });
                main.sync(thumbs);
                main.mount();
                thumbs.mount();
            } else {
                main.mount();
            }

            GLightbox({ selector: '.glightbox', loop: true });
        });
    </script>
{else}
    <div class="ms3-gallery ms3-gallery-empty">
        <img src="{'assets_url' | option}components/minishop3/img/web/ms3_medium.png" alt="">
    </div>
{/if}
```

## Simple chunk

Minimal example without external libraries:

```fenom
{* tpl.msGallery.simple *}
{if $files?}
    <div class="product-gallery">
        {foreach $files as $file}
            <a href="{$file['url']}" target="_blank">
                <img src="{$file['medium'] ?: $file['url']}"
                     alt="{$file['name']}"
                     loading="{$file@first ? 'eager' : 'lazy'}">
            </a>
        {/foreach}
    </div>
{/if}
```

## Working with video

When the gallery contains video:

```fenom
{set $files = 'msGallery' | snippet}

{foreach $files as $file}
    {if $file['type'] != 'image'}
        <video controls>
            <source src="{$file['url']}" type="video/{$file['type']}">
        </video>
    {else}
        <img src="{$file['medium'] ?: $file['url']}" alt="{$file['name']}">
    {/if}
{/foreach}
```
