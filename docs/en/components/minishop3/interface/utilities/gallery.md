---
title: Gallery
---
# Utilities: Gallery

Tool for bulk regeneration of product image thumbnails.

## Purpose

When images are uploaded to a product gallery, MiniShop3 creates thumbnails (previews) in various sizes. If thumbnail settings change later or you need to refresh all thumbnails, use this utility.

## When to use

- After changing thumbnail sizes in [system settings](../settings)
- After migrating the site to a new server
- After bulk image updates via FTP
- When thumbnails are missing or corrupted
- After updating MiniShop3 when image handling has changed

## Interface

### Info panel

Shows current gallery state:

- **Media source** — file source name and ID
- **Products with images** — number of products that have a gallery
- **Total files** — total images in galleries

### Thumbnail settings

A collapsible section shows current thumbnail configuration:

```
small:  120x90
medium: 360x270
large:  720x540
```

::: tip Changing sizes
Thumbnail sizes are set in MODX system settings:

- `ms3_product_thumbnail_size` — thumbnail sizes
:::

### Processing parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| Products per step | Products processed per iteration | 10 |

::: warning Recommendations

- For weak servers reduce to 5
- For powerful servers you can increase to 20-30
- Large values may cause timeouts
:::

## Process

1. **Preparation**
   - Check thumbnail settings in system settings
   - Ensure enough disk space
   - Prefer running during low load

2. **Start**
   - Click **"Regenerate thumbnails"**
   - Processing runs in batches

3. **Progress**
   - Indicator shows completion percentage
   - Current iteration of total is shown
   - You can stop by closing the page

4. **Completion**
   - A message shows how many products were processed
   - Click **"Reset"** to prepare for another run

## Technical details

### API Endpoint

```
POST /api/mgr/utilities/gallery/update
```

**Parameters:**

- `limit` — products per iteration
- `offset` — offset (for pagination)

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

### Processing flow

For each product the utility:

1. Gets the image list from the gallery
2. For each image:
   - Reads the original file
   - Generates thumbnails per settings
   - Saves previews to the right directories
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

**Symptom:** Processing stops at a certain percentage.

**Solutions:**

- Reduce products per step
- Increase `max_execution_time` in PHP
- Check server error logs

### Thumbnails not created

**Symptom:** No previews after completion.

**Check:**

- Write permissions for `assets/images/`
- GD or ImageMagick on the server
- Thumbnail settings in system settings

### "No products" error

**Symptom:** Message that there are no products to process.

**Causes:**

- No products with images in the catalog
- Media source misconfigured
- Gallery table is empty
