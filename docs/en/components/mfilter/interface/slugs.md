# Slugs

Slugs are SEO-friendly aliases for filter values.

## Purpose

Slugs turn filter values into URL-friendly strings:

| Original | Slug |
|----------|------|
| Apple Inc. | apple-inc |
| Red | red |
| 16 GB | 16-gb |

## Auto-generation

When a filter value first appears, the system creates a slug:

1. Transliteration (Cyrillic → Latin)
2. Lowercase
3. Spaces and special chars → hyphens
4. Collapse repeated hyphens

## Slugs table

| Column | Description |
|---------|----------|
| **Key** | Filter key (vendor, color, size) |
| **Value** | Original value |
| **Slug** | SEO alias |
| **Created** | When it was created |

## Editing

### Changing a slug

1. Find the row
2. Double-click the **Slug** field
3. Enter the new value
4. Press Enter or click outside

### Slug rules

- Latin letters, digits, hyphens only
- No spaces or special characters
- Unique per filter key
- Must not start or end with a hyphen

## Search and filter

### Search

Type in the search box to filter by:

- Key
- Value
- Slug

### Filter by key

Select a filter key in the dropdown to show only its values.

## Bulk actions

### Regenerate slugs

Recreates slugs for selected rows using transliteration:

1. Select rows
2. Click **Regenerate**

### Delete

1. Select rows
2. Click **Delete**

When a slug is deleted:

- The value stays in the system
- A new slug will be created on the next request

## Import/Export

### Export

```
Actions → Export to CSV
```

CSV format:

```csv
key,value,slug
vendor,"Apple Inc.",apple-inc
color,"Red",red
```

### Import

```
Actions → Import from CSV
```

Upload a file with columns `key`, `value`, `slug`.

## Use in URL

### Default URL format

```
/catalog/vendor_apple/color_red/
```

### Custom format via patterns

```
/catalog/apple/red/
```

## Programmatic access

```php
$mfilter = $modx->services->get('mfilter');
$slugManager = $mfilter->getSlugManager();

// Get slug
$slug = $slugManager->getOrCreate('vendor', 'Apple Inc.');
// 'apple-inc'

// Get value by slug
$value = $slugManager->getValue('vendor', 'apple-inc');
// 'Apple Inc.'

// Check existence
$exists = $slugManager->hasSlug('vendor', 'apple-inc');
```

## Tips

1. **Edit carefully** — changing a slug changes the URL and affects SEO
2. **Use redirects** — when changing a slug, set up a 301 redirect
3. **Check uniqueness** — duplicate slugs for different values cause conflicts
