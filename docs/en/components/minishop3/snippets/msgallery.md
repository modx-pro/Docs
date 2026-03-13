---
title: msGallery
---
# msGallery

Snippet for outputting a product image gallery.

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| **product** | current resource | Product ID |
| **tpl** | `tpl.msGallery` | Gallery layout chunk |
| **limit** | `0` | Number of images (0 = all) |
| **offset** | `0` | Skip count |
| **sortby** | `position` | Sort field |
| **sortdir** | `ASC` | Sort direction |
| **where** | | JSON extra conditions |
| **filetype** | | File type filter (comma-separated) |
| **thumbnails** | | Thumbnail size filter (comma-separated) |
| **showInactive** | `false` | Show inactive files |
| **toPlaceholder** | | Save result to placeholder |
| **showLog** | `false` | Show execution log |
| **return** | `data` | Format: `data`, `tpl`, `json`, `sql` |

## Examples

### Basic output

```fenom
{'msGallery' | snippet: [
    'return' => 'tpl'
]}
```

### For specific product

```fenom
{'msGallery' | snippet: [
    'product' => 15,
    'return' => 'tpl'
]}
```

### First 5 images

```fenom
{'msGallery' | snippet: [
    'limit' => 5,
    'return' => 'tpl'
]}
```

### Images only (no video/docs)

```fenom
{'msGallery' | snippet: [
    'filetype' => 'image',
    'return' => 'tpl'
]}
```

### Specific thumbnails

```fenom
{'msGallery' | snippet: [
    'thumbnails' => 'small,medium',
    'return' => 'tpl'
]}
```

### Sort by name

```fenom
{'msGallery' | snippet: [
    'sortby' => 'name',
    'sortdir' => 'ASC',
    'return' => 'tpl'
]}
```

### Get data for processing

```fenom
{set $files = 'msGallery' | snippet}

{foreach $files as $file}
    <img src="{$file['url']}" alt="{$file['name']}">
{/foreach}
```

::: info return=data default
By default the snippet returns a data array (`return=data`). Use `return=tpl` for chunk output.
:::

## Chunk placeholders

Passed to the chunk:

| Placeholder | Description |
|-------------|-------------|
| `{$files}` | Gallery file array |
| `{$scriptProperties}` | Snippet call parameters |

### File fields

| Field | Description |
|-------|-------------|
| `{$file['id']}` | File ID |
| `{$file['product_id']}` | Product ID |
| `{$file['name']}` | File name |
| `{$file['description']}` | Description |
| `{$file['url']}` | Original URL |
| `{$file['path']}` | File path |
| `{$file['file']}` | Filename on disk |
| `{$file['type']}` | File type (image, video, document, etc.) |
| `{$file['createdon']}` | Created date |
| `{$file['createdby']}` | User ID |
| `{$file['position']}` | Position in gallery |
| `{$file['active']}` | Active (1/0) |
| `{$file['hash']}` | File hash |

### Image thumbnails

Thumbnails are added as extra fields named by folder:

| Field | Description |
|-------|-------------|
| `{$file['small']}` | Small thumbnail URL |
| `{$file['medium']}` | Medium thumbnail URL |
| `{$file['large']}` | Large thumbnail URL |

::: info Thumbnail names
Thumbnail names depend on product media source settings. Default: `small`, `medium`, `large`.
:::

### Loop variables

In Fenom:

```fenom
{foreach $files as $file}
    {$file@index}     {* Index from 0 *}
    {$file@iteration} {* Number from 1 *}
    {$file@first}     {* true for first *}
    {$file@last}      {* true for last *}
{/foreach}
```

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
    {if $file['type'] == 'video'}
        <video controls>
            <source src="{$file['url']}" type="video/{$file['file'] | pathinfo: 'extension'}">
        </video>
    {else}
        <img src="{$file['medium'] ?: $file['url']}" alt="{$file['name']}">
    {/if}
{/foreach}
```

## Filter by type

```fenom
{* Images only *}
{'msGallery' | snippet: ['filetype' => 'image']}

{* Video only *}
{'msGallery' | snippet: ['filetype' => 'video']}

{* Images and video *}
{'msGallery' | snippet: ['filetype' => 'image,video']}
```
