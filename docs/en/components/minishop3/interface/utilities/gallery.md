---
title: Gallery
---
# Utilities: Gallery

Tool for bulk regeneration of thumbnails for all product images.

## Purpose

When images are uploaded to a product gallery, MiniShop3 automatically creates thumbnails of various sizes. If preview settings change afterward or you need to refresh all thumbnails, use this utility.

## When to use

- After changing preview sizes in [system settings](../settings)
- After migrating the site to a new server
- After bulk image updates via FTP
- When thumbnails are missing or corrupted
- After a MiniShop3 update with image processing changes

## Interface

### Info panel

Shows current gallery state:

- **Media source** — file source name and ID
- **Products with images** — count of products that have a gallery
- **Total files** — total images in galleries

### Preview settings

Collapsible section shows current thumbnail configuration:

```
small:  120x90
medium: 360x270
large:  720x540
```

::: tip Changing sizes
Size settings are defined in MODX system settings:

- `ms3_product_thumbnail_size` — thumbnail sizes
:::

### Processing parameters

| Parameter | Description | Default |
| --- | --- | --- |
| Products per step | Products processed per iteration | 10 |

::: warning Recommendations

- On weak servers reduce to 5
- On powerful servers you can increase to 20–30
- Large values may cause timeouts
:::

## Workflow

1. **Prepare**
   - Check preview settings in system settings
   - Ensure enough disk space
   - Run during low traffic if possible

2. **Start**
   - Click **Regenerate previews**
   - Processing runs in batches

3. **Track progress**
   - Indicator shows completion percent
   - Current iteration vs total is shown
   - You can stop by closing the page

4. **Finish**
   - On completion a message shows how many products were processed
   - Click **Reset** to prepare for another run

## Technical details

### Processor

The utility calls `MiniShop3\Processors\Utilities\Gallery\Update` (via manager API or `$modx->runProcessor()` with the full class name).

### API endpoint

```
POST /api/mgr/utilities/gallery/update
```

**Parameters:**

- `limit` — products per iteration
- `offset` — offset (pagination)

**Response:**

```json
{
  "success": true,
  "object": {
    "updated": 10,
    "total": 150,
    "offset": 10,
    "done": false
  }
}
```

### Processing steps

For each product the utility:

1. Gets the image list from the gallery
2. For each image:
   - Reads the original file
   - Generates thumbnails per settings
   - Saves previews to the corresponding directories
3. Updates metadata in the database

### File storage

```
assets/images/products/
├── {product_id}/
│   ├── original.jpg       # Original
│   ├── small/             # Small previews
│   │   └── original.jpg
│   ├── medium/            # Medium previews
│   │   └── original.jpg
│   └── large/             # Large previews
│       └── original.jpg
```

## Troubleshooting

### Process stops

**Symptom:** Processing stops at a certain percent.

**Fixes:**

- Reduce products per step
- Increase PHP `max_execution_time`
- Check server error logs

### Thumbnails not created

**Symptom:** After completion previews are missing.

**Check:**

- Write permissions on `assets/images/`
- GD or ImageMagick on the server
- Preview settings in system settings

### "No products" error

**Symptom:** Message that there are no products to process.

**Causes:**

- No products with images in the catalog
- Media source misconfigured
- Gallery table is empty
