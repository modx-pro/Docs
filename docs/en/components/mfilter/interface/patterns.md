# URL patterns

Patterns define how filters are recognized in SEO URLs.

## Purpose

Patterns let you:

- Build clean URLs without filter keys
- Parse complex formats (price ranges, dates)
- Control parsing rule priority

## URL examples

| Type | URL | Pattern |
|-----|-----|---------|
| Standard | `/catalog/vendor_apple/` | `{key}_{value}` |
| No key | `/catalog/apple/` | Custom pattern |
| Range | `/catalog/price_1000-5000/` | `price_(\d+)-(\d+)` |
| Multiple | `/catalog/color_red,blue/` | `{key}_{value}(,{value})*` |

## Patterns table

| Column | Description |
|---------|----------|
| **Pattern** | Regular expression |
| **Filter key** | Which filter it belongs to |
| **Description** | Notes |
| **Active** | On/off |
| **Order** | Application priority |

## Creating a pattern

### 1. Basic fields

| Field | Description |
|------|----------|
| **Pattern** | Regex for URL segment |
| **Filter key** | Key from the filter set |
| **Description** | What the pattern is for |
| **Active** | Whether to use it |

### 2. Pattern syntax

Uses PHP PCRE regex syntax.

#### Capturing values

```regex
# Single value
vendor_([a-z0-9-]+)

# Range
price_(\d+)-(\d+)

# Multiple values
color_([a-z0-9-]+(?:,[a-z0-9-]+)*)
```

#### Capture groups

- Group 1 — first value (or min for range)
- Group 2 — second value (or max for range)

## Built-in patterns

### Standard format

```regex
{key}_([a-z0-9-]+)
```

Matches: `vendor_apple`, `color_red`

### Numeric range

```regex
{key}_(\d+)-(\d+)
```

Matches: `price_1000-5000`, `weight_100-500`

### Multiple selection

```regex
{key}_([a-z0-9-]+(?:,[a-z0-9-]+)*)
```

Matches: `color_red,blue,green`

## Priority

Patterns are applied in **Order** (rank):

1. Lower number first
2. First match wins for that segment
3. Others are skipped for that segment

## Examples

### Price pattern

```
Pattern: price_(\d+)-(\d+)
Key: price
Description: Price range
```

URL `/catalog/price_10000-50000/` → `price: {min: 10000, max: 50000}`

### Date pattern

```
Pattern: date_(\d{4})-(\d{2})-(\d{2})_to_(\d{4})-(\d{2})-(\d{2})
Key: date
Description: Date range
```

URL `/catalog/date_2024-01-01_to_2024-12-31/` → date range

### No-key pattern (value only)

```
Pattern: ^(apple|samsung|xiaomi)$
Key: vendor
Description: Vendors directly
```

URL `/catalog/apple/` → `vendor: apple`

## Programmatic access

```php
$mfilter = $modx->services->get('mfilter');
$urlRouter = $mfilter->getUrlRouter();

// Parse URL
$parsed = $urlRouter->parse('/catalog/vendor_apple/price_1000-5000/');
// [
//     'filters' => ['vendor' => ['apple'], 'price' => ['min' => 1000, 'max' => 5000]],
//     'tech' => ['sort' => 'price', 'page' => 1]
// ]
```

## Debugging

Enable `mfilter.debug` to log:

- Which patterns are checked
- Which pattern matched
- Parse result

## Tips

1. **Test patterns** — bad regex can break routing
2. **Use priority** — specific patterns should have a lower order number
3. **Keep it simple** — standard `key_value` format works for most cases
