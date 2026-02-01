# miniShop2 gallery

Product file upload panel — a simplified version of the paid add-on [ms2Gallery][4].
Mainly for images, but can store other file types allowed by the media source.

Shown only when editing a product.

[![](https://file.modx.pro/files/5/c/b/5cb7350a4826a7c3253265279d615a43s.jpg)](https://file.modx.pro/files/5/c/b/5cb7350a4826a7c3253265279d615a43.png)

Main difference: **thumbnails are generated on upload** and *phpthumbof* and similar output filters are not used.
This keeps output fast (direct links to ready images) and allows storing product files on external CDN (Amazon S3, Selectel Cloud Storage).

[![](https://file.modx.pro/files/a/4/b/a4b89af1ea440c0581e16d0f3aed5930s.jpg)](https://file.modx.pro/files/a/4/b/a4b89af1ea440c0581e16d0f3aed5930.png)

Files can be reordered by drag-and-drop; context menu and multi-select with [[Ctrl]] [[⌘ Cmd]] and [[Shift]] are available.

The first image is the main product image and is shown on the "Document" tab.
Its URL and thumbnail are stored in product properties `image` and `thumb` for catalog output without extra queries.

Each product has its own media source for upload settings. Main properties:

- **basePath** — path to product files. Default: `assets/images/products/`
- **basePathRelative** — basePath relative to site root when enabled.
- **baseUrl**, **baseUrlRelative** — URL and relative option.
- **allowedFileTypes** — allowed file types. Default: `jpg,jpeg,png,gif`.
- **imageExtensions** — which types are images. Default: `jpg,jpeg,png,gif`
- **thumbnailType** — thumbnail format: JPG or PNG.
- **thumbnailQuality** — 0–100 (100 = best).
- **skipFiles** — file types to hide.
- **thumbnails** — thumbnail config as JSON. Any [phpThumb][5] parameters.
- **maxUploadWidth**, **maxUploadHeight** — max dimensions; larger images are resized in the browser before upload.
- **maxUploadSize** — max file size (bytes).
- **imageNameType** — file naming: hash or friendly name algorithm.

Changing the product media source does not copy already uploaded files — you must handle that yourself.

## phpThumb main parameters

- **w** — thumbnail width (px)
- **h** — thumbnail height (px)
- **zc** — zoom and crop to fit **h** and **w**
- **bg** — background color (hex, e.g. ffffff)
- **far** — fit to **h** and **w** without crop; requires **bg**
- **q** — quality 0–100
- **ar** — auto-rotate from EXIF

Use only **h** or **w** when constraining by one dimension.

```json
[{"w":120,"q":90,"zc":"1","bg":"000000"},{"h":270,"q":90,"far":"1","bg":"ffffff"}]
```

See [phpThumb docs][5] for more parameters.

## Regenerating thumbnails

When media source settings change, regenerate all thumbnails.

If you have few products, do it manually: select images and update via context menu.

[![](https://file.modx.pro/files/1/8/2/182e6f257fcf683235327edb160c4566s.jpg)](https://file.modx.pro/files/1/8/2/182e6f257fcf683235327edb160c4566.png)

Or regenerate **all images** with a script:

```php
<?php

$step = 5;
$offset = isset($_SESSION['galgenoffset']) && $_SESSION['galgenoffset'] ? $_SESSION['galgenoffset'] : 0;
$miniShop2 = $modx->getService('minishop2');
$modx->setLogLevel(MODX_LOG_LEVEL_ERROR);
$q = $modx->newQuery('msProductFile', array('parent' => 0));
$total = $modx->getCount('msProductFile', $q);
$q->sortby('product_id', 'ASC');
$q->sortby('rank', 'DESC');
$q->limit($step,$offset);
$resources = $modx->getCollection('msProductFile', $q);
foreach ($resources as $resource) {
  $modx->runProcessor('mgr/gallery/generate', array('id' => $resource->id),
    array('processors_path' => $modx->getOption('core_path').'components/minishop2/processors/'));
}

$_SESSION['galgenoffset'] = $offset + $step;
if ($_SESSION['galgenoffset'] >= $total) {
  $success = 100;
  $_SESSION['Console']['completed'] = true;
  unset($_SESSION['galgenoffset']);
} else {
  $success = round($_SESSION['galgenoffset'] / $total, 2) * 100;
  $_SESSION['Console']['completed'] = false;
}
for ($i=0; $i<=100; $i++) {
  if ($i <= $success) {
    print '=';
  } else {
    print '_';
  }
}
$current = $_SESSION['galgenoffset'] ?
           $_SESSION['galgenoffset'] :
           ($success == 100 ? $total : 0);
print "\n";
print $success . '% (' . $current . ')' . "\n\n";
```

Run this script from the server console, as thumbnail generation can take a long time.

[4]: /en/components/ms2gallery/
[5]: http://phpthumb.sourceforge.net/demo/docs/phpthumb.readme.txt
