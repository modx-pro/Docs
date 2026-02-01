---
title: Product gallery
---
# Product gallery

Product image management system in MiniShop3.

## Overview

The product gallery allows you to:

- Upload images via a modern drag-and-drop interface
- Automatically generate thumbnails in various sizes
- Edit images before upload
- Support modern formats (WebP, AVIF)
- Sort images by dragging

## Image processing technology

### Intervention Image

MiniShop3 uses [Intervention Image](https://image.intervention.io/) v3 — a modern PHP image processing library.

**Advantages over legacy phpThumb:**

| Feature | phpThumb | Intervention Image |
|---------|----------|---------------------|
| Generation speed | 800ms | **250ms** (3× faster) |
| Memory usage | 45MB | **28MB** (-38%) |
| WebP support | Partial | **Full** |
| AVIF support | No | **Yes** (with Imagick) |
| Modern algorithms | No | **Yes** |

**Requirements:**

- PHP 8.1+
- Imagick (recommended) or GD extension
- For AVIF: Imagick with libheif required

### Supported formats

| Format | Read | Write | Note |
|--------|------|-------|------|
| JPEG | ✅ | ✅ | Primary format |
| PNG | ✅ | ✅ | With transparency |
| GIF | ✅ | ✅ | Animation (first frame only) |
| WebP | ✅ | ✅ | ~30% smaller than JPEG |
| AVIF | ✅ | ✅ | ~50% smaller (requires Imagick) |
| HEIC | ✅ | ❌ | Converted on upload |

## Image uploader

### Uppy technology

The image uploader is built on [Uppy](https://uppy.io/) — a modern file upload library.

**Features:**

- **Drag & Drop** — drag files into the upload area
- **Multiple upload** — several files at once
- **Preview** — thumbnails before upload
- **Built-in editor** — crop, rotate, scale
- **Progress** — upload progress display
- **Validation** — file type and size checks

### Uploader parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `maxFileSize` | 10 MB | Maximum file size |
| `maxWidth` | 1920 px | Maximum width |
| `maxHeight` | 1080 px | Maximum height |
| `allowedFileTypes` | JPEG, PNG, GIF, WebP, AVIF, HEIC | Allowed types |

### Image editor

Before upload you can edit the image:

- **Crop** — select the desired area
- **Rotate** — 90° in any direction
- **Flip** — horizontal/vertical
- **Scale** — resize

## Thumbnail configuration

### Where to configure

Thumbnail configuration is stored in **Media Source**:

1. Go to **Media → File sources**
2. Open the product source (default: `MS3 Images`)
3. Find the `thumbnails` property
4. Enter JSON configuration

### Configuration format

```json
{
  "small": {
    "width": 150,
    "height": 150,
    "quality": 85,
    "mode": "cover",
    "format": "webp"
  },
  "medium": {
    "width": 400,
    "height": 400,
    "quality": 88,
    "mode": "cover",
    "format": "webp"
  },
  "large": {
    "width": 800,
    "height": 800,
    "quality": 90,
    "mode": "max",
    "format": "jpg"
  }
}
```

### Thumbnail parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `width` | int | Width in pixels |
| `height` | int | Height in pixels |
| `quality` | int | Compression quality (0-100) |
| `mode` | string | Scaling mode |
| `format` | string | File format |
| `position` | string | Crop position |
| `background` | string | Background color (hex) |

### Scaling modes (mode)

#### cover — Fill with crop

Image is scaled and cropped to fill the size exactly.

```json
{
  "mode": "cover",
  "width": 300,
  "height": 300,
  "position": "center"
}
```

**Use case:** Product cards, grids, thumbnails — when a fixed size is needed.

#### contain — Fit with background

Image fits entirely; empty space is filled with background.

```json
{
  "mode": "contain",
  "width": 300,
  "height": 300,
  "background": "#ffffff"
}
```

**Use case:** Products on white background, vendor logos.

#### max — Fit without upscale

Image is reduced to the given size but not enlarged.

```json
{
  "mode": "max",
  "width": 800,
  "height": 800
}
```

**Use case:** Product gallery, zoom — when quality matters.

#### fit — Scale with aspect ratio

Image is scaled preserving aspect ratio; may be smaller than the given size.

```json
{
  "mode": "fit",
  "width": 1200,
  "height": 800
}
```

**Use case:** Responsive galleries with different aspect ratios.

### Crop positions (position)

For `cover` and `crop` modes:

| Position | Description |
|----------|-------------|
| `center` | Center (default) |
| `top` | Top |
| `bottom` | Bottom |
| `left` | Left |
| `right` | Right |
| `top-left` | Top-left corner |
| `top-right` | Top-right corner |
| `bottom-left` | Bottom-left corner |
| `bottom-right` | Bottom-right corner |

## Ready configurations

### Basic (minimal)

For small shops with limited disk space.

```json
{
  "thumb": {
    "width": 150,
    "height": 150,
    "quality": 80,
    "mode": "cover",
    "format": "webp"
  },
  "medium": {
    "width": 600,
    "height": 600,
    "quality": 85,
    "mode": "cover",
    "format": "webp"
  },
  "large": {
    "width": 1200,
    "height": 1200,
    "quality": 85,
    "mode": "max",
    "format": "jpg"
  }
}
```

**Result:** ~256 KB per image, 12-20 files per product.

### Optimal (recommended)

Balance of quality and performance with support for all browsers.

```json
{
  "thumb_webp": {
    "width": 150,
    "height": 150,
    "quality": 80,
    "mode": "cover",
    "format": "webp"
  },
  "thumb_jpg": {
    "width": 150,
    "height": 150,
    "quality": 85,
    "mode": "cover",
    "format": "jpg"
  },
  "card_webp": {
    "width": 300,
    "height": 300,
    "quality": 82,
    "mode": "cover",
    "format": "webp"
  },
  "card_jpg": {
    "width": 300,
    "height": 300,
    "quality": 85,
    "mode": "cover",
    "format": "jpg"
  },
  "gallery_webp": {
    "width": 800,
    "height": 800,
    "quality": 85,
    "mode": "max",
    "format": "webp"
  },
  "gallery_jpg": {
    "width": 800,
    "height": 800,
    "quality": 88,
    "mode": "max",
    "format": "jpg"
  },
  "zoom": {
    "width": 1500,
    "height": 1500,
    "quality": 90,
    "mode": "max",
    "format": "jpg"
  }
}
```

**HTML with fallback:**

```html
<picture>
  <source srcset="[[+card_webp]]" type="image/webp">
  <img src="[[+card_jpg]]" alt="[[+pagetitle]]">
</picture>
```

### Premium (with Retina)

Maximum quality for large stores.

```json
{
  "card_webp": {
    "width": 350,
    "height": 350,
    "quality": 82,
    "mode": "cover",
    "format": "webp"
  },
  "card_webp_2x": {
    "width": 700,
    "height": 700,
    "quality": 78,
    "mode": "cover",
    "format": "webp"
  },
  "card_jpg": {
    "width": 350,
    "height": 350,
    "quality": 85,
    "mode": "cover",
    "format": "jpg"
  }
}
```

**HTML with Retina:**

```html
<picture>
  <source
    srcset="[[+card_webp]] 1x, [[+card_webp_2x]] 2x"
    type="image/webp">
  <img src="[[+card_jpg]]" alt="[[+pagetitle]]">
</picture>
```

## Additional features

### Watermarks

```json
{
  "watermarked": {
    "width": 800,
    "height": 600,
    "quality": 85,
    "mode": "cover",
    "format": "jpg",
    "watermark": {
      "enabled": true,
      "path": "assets/watermark.png",
      "position": "bottom-right",
      "offset_x": 10,
      "offset_y": 10,
      "opacity": 50
    }
  }
}
```

### Processing effects

| Parameter | Description | Values |
|-----------|-------------|--------|
| `sharpen` | Sharpness | 0-100 |
| `blur` | Blur | 0-100 |
| `brightness` | Brightness | -100 to +100 |
| `contrast` | Contrast | -100 to +100 |
| `greyscale` | Grayscale | true/false |

**Example:**

```json
{
  "thumbnail_bw": {
    "width": 200,
    "height": 200,
    "mode": "cover",
    "quality": 85,
    "greyscale": true,
    "contrast": 10,
    "sharpen": 15
  }
}
```

### Optimization

```json
{
  "optimized": {
    "width": 600,
    "height": 400,
    "quality": 80,
    "mode": "cover",
    "format": "jpg",
    "progressive": true,
    "strip_exif": true
  }
}
```

| Parameter | Description |
|-----------|-------------|
| `progressive` | Progressive JPEG (faster perceived load) |
| `strip_exif` | Remove EXIF data (saves 20-50 KB) |

## Quality recommendations

| Image type | WebP | JPEG | Comment |
|------------|------|------|---------|
| Thumbnails (≤200px) | 75-80% | 85% | Artifacts not visible |
| Cards (200-400px) | 80-85% | 85-88% | Optimal balance |
| Gallery (400-1000px) | 85% | 88-90% | Details matter |
| Zoom (>1000px) | — | 90-92% | Maximum quality |

::: tip Rule
WebP can use 3-5% lower quality than JPEG for the same visual result.
:::

## File structure

```
assets/images/products/
└── {product_id}/
    ├── photo.jpg           # Original
    ├── thumb_webp/
    │   └── photo.webp      # WebP thumbnail
    ├── thumb_jpg/
    │   └── photo.jpg       # JPEG thumbnail
    ├── card_webp/
    │   └── photo.webp
    ├── card_jpg/
    │   └── photo.jpg
    └── ...
```

## Related pages

- [Utilities: Gallery](utilities/gallery) — bulk thumbnail regeneration
- [msGallery](../snippets/msgallery) — gallery output snippet on the site

## Developer API

### ImageService

Service for programmatic image handling:

```php
// Get service
$imageService = $modx->services->get('ms3_image');

// Generate thumbnail
$thumbnailData = $imageService->makeThumbnail($sourceInfo, [
    'width' => 300,
    'height' => 200,
    'quality' => 85,
    'mode' => 'cover',
    'format' => 'webp'
]);

// Save to Media Source
$path = $imageService->saveThumbnailToSource(
    $thumbnailData,
    'products/123/',
    'photo_thumb.webp',
    $mediaSource
);

// Driver info
$driverInfo = $imageService->getDriverInfo();
// ['driver' => 'Imagick', 'version' => '7.1.0', 'formats' => ['jpeg', 'png', 'webp', 'avif']]
```

### Events

Gallery operations fire these events:

- `msOnBeforeFileUpload` — before file upload
- `msOnFileUpload` — after file upload
- `msOnBeforeThumbnailGenerate` — before thumbnail generation
- `msOnThumbnailGenerate` — after thumbnail generation

## Troubleshooting

### Thumbnails not created

**Check:**

1. Imagick or GD: `php -m | grep -E "(imagick|gd)"`
2. Write permissions for `assets/images/products/`
3. Valid JSON in Media Source settings
4. MODX logs in `core/cache/logs/error.log`

### WebP not generated

**Requirements:**

- Imagick with WebP support, or
- GD compiled with `--enable-webp`

**Check:**

```php
$imageService = $modx->services->get('ms3_image');
$info = $imageService->getDriverInfo();
var_dump(in_array('webp', $info['formats']));
```

### AVIF not generated

AVIF requires Imagick with libheif. GD does not support AVIF.

**Check:**

```bash
convert -list format | grep AVIF
```

### Images upload but don't display

**Check:**

- Media Source URL in settings
- File accessibility at the given path
- `.htaccess` for static files
