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

The default chunk `tpl.msGallery` uses Splide.js for the slider and GLightbox for full-size view. See the component templates for markup.
