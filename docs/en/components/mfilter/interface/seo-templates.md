# SEO templates

SEO templates generate unique metadata for filter pages.

## Purpose

For each filter combination you can set:

- Page title
- H1 heading
- Meta description
- SEO text
- Canonical URL
- Indexing (noindex)

## Templates table

| Column | Description |
|---------|----------|
| **Name** | Template identifier |
| **Title** | Title tag template |
| **H1** | Heading template |
| **Conditions** | When to apply |
| **Active** | On/off |
| **Order** | Priority |

## Creating a template

### Main fields

| Field | Description |
|------|----------|
| **Name** | For identification in admin |
| **Title** | `<title>` template |
| **H1** | `<h1>` template |
| **Description** | Meta description template |
| **Text** | SEO text for the page |
| **Conditions** | JSON with application rules |
| **Active** | Whether to use the template |
| **Order** | Priority (lower = higher) |

### Application conditions

Conditions define when a template is used:

```json
{
    "filters": {
        "vendor": ["apple"],
        "color": ["*"]
    },
    "resources": [5, 10]
}
```

#### Condition syntax

| Condition | Description |
|---------|----------|
| `["value1", "value2"]` | Exact value match |
| `["*"]` | Any value for that filter |
| `[]` or missing | Filter not selected |

#### Example: Apple only

```json
{
    "filters": {
        "vendor": ["apple"]
    }
}
```

#### Example: Apple + any color

```json
{
    "filters": {
        "vendor": ["apple"],
        "color": ["*"]
    }
}
```

#### Example: category + any filter

```json
{
    "filters": {
        "vendor": ["*"]
    },
    "resources": [5]
}
```

## Placeholders

### Filters

| Placeholder | Description |
|-------------|----------|
| `{$filters.vendor}` | Selected vendor |
| `{$filters.color}` | Selected color |
| `{$filters.price.min}` | Min price |
| `{$filters.price.max}` | Max price |

### Resource

| Placeholder | Description |
|-------------|----------|
| `{$resource.pagetitle}` | Page title |
| `{$resource.longtitle}` | Long title |
| `{$resource.description}` | Description |
| `{$resource.id}` | Resource ID |

### Results

| Placeholder | Description |
|-------------|----------|
| `{$total}` | Found items count |
| `{$page}` | Current page |

### Word forms

| Placeholder | Description |
|-------------|----------|
| `{$filters.vendor|genitive}` | Genitive |
| `{$filters.vendor|dative}` | Dative |
| `{$filters.vendor|accusative}` | Accusative |
| `{$filters.vendor|instrumental}` | Instrumental |
| `{$filters.vendor|prepositional}` | Prepositional |
| `{$filters.vendor|plural}` | Plural |

## Template examples

### Vendor

**Conditions:**

```json
{"filters": {"vendor": ["*"]}}
```

**Title:**

```
{$filters.vendor} — buy | {$resource.pagetitle}
```

**H1:**

```
{$filters.vendor}
```

**Description:**

```
Buy {$filters.vendor|accusative} online. {$total} items in stock. Delivery.
```

### Vendor + color

**Conditions:**

```json
{"filters": {"vendor": ["*"], "color": ["*"]}}
```

**Title:**

```
{$filters.vendor} {$filters.color} — buy | {$resource.pagetitle}
```

**H1:**

```
{$filters.vendor} {$filters.color|nominative}
```

### Price range

**Conditions:**

```json
{"filters": {"price": ["*"]}}
```

**Title:**

```
{$resource.pagetitle} from {$filters.price.min} to {$filters.price.max}
```

### Specific brand (Apple)

**Conditions:**

```json
{"filters": {"vendor": ["apple"]}}
```

**Title:**

```
Apple products — buy
```

**Text:**

```
<p>Full range of Apple products: iPhone, iPad, MacBook and accessories.</p>
<p>Official reseller with manufacturer warranty.</p>
```

## Template priority

1. Templates are checked in **Order**
2. First matching template is applied
3. More specific templates should have a lower order number

**Suggested order:**

1. Specific combinations (vendor=apple + color=black) — 1–10
2. Single filter (vendor=apple) — 11–50
3. Any value (vendor=*) — 51–100
4. General template — 100+

## Indexing settings

### Noindex for combinations

Add `noindex: true` to conditions:

```json
{
    "filters": {
        "vendor": ["*"],
        "color": ["*"],
        "size": ["*"]
    },
    "noindex": true
}
```

### Canonical

By default canonical points to the page without filters. You can override in the template.

## Programmatic access

```php
$mfilter = $modx->services->get('mfilter');
$seoBuilder = $mfilter->getSeoBuilder();

$seoData = $seoBuilder->build($resourceId, $filters);
// [
//     'title' => 'Apple — buy',
//     'h1' => 'Apple',
//     'description' => 'Buy Apple online...',
//     'text' => '<p>SEO text...</p>',
//     'canonical' => '/catalog/',
//     'noindex' => false
// ]
```

## Output on frontend

```html
{if $mfilter.seo.title}
    <title>{$mfilter.seo.title}</title>
{/if}

{if $mfilter.seo.h1}
    <h1>{$mfilter.seo.h1}</h1>
{/if}

{if $mfilter.seo.description}
    <meta name="description" content="{$mfilter.seo.description}">
{/if}

{if $mfilter.seo.noindex}
    <meta name="robots" content="noindex, follow">
{/if}

{if $mfilter.seo.text}
    <div class="seo-text">{$mfilter.seo.text}</div>
{/if}
```
