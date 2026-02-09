# Filter sets

The central mFilter entity — defines which filters are available on catalog pages.

## Creating a set

1. Click **Create**
2. Fill in:
   - **Name** — for identification in the admin
   - **Description** — optional
   - **Active** — enable/disable

## Set tabs

### Filters

List of filters in the set. For each filter:

| Field | Description |
|------|----------|
| **Key** | Unique identifier (vendor, color, price) |
| **Type** | Filter type (default, number, boolean, vendors...) |
| **Source** | Data source (option, tv, field, resource) |
| **Field** | Field/option name (for source=option, tv, field) |
| **Label** | Display name |
| **Active** | Whether filter is enabled |
| **Order** | Sort order in the form |

### Filter types

| Type | Description | UI |
|-----|----------|-----|
| `default` | Standard | Checkboxes |
| `number` | Numeric range | Slider + inputs |
| `boolean` | Yes/No | Toggle |
| `vendors` | MS3 vendors | Checkboxes |
| `parents` | Parent categories | Checkboxes |
| `colors` | Colors (with HEX) | Color swatches |
| `date` | Date range | Date picker |
| `year` | By year | Checkboxes |
| `month` | By month | Checkboxes |

### Data sources

| Source | Description | Field |
|----------|----------|------|
| `option` | MiniShop3 options | Option name (color, size) |
| `tv` | Template Variables | TV name |
| `field` | Resource fields | Field name (pagetitle, template) |
| `resource` | msProduct/msCategory fields | Data field (price, weight) |
| `ms3` | Special MS3 fields | vendor, category |

### Bindings

Defines which pages the filter set applies to.

**Resource tree:**

- Select catalog categories
- Check the resources you need

**Options:**

- **Include children** — set will apply to child pages as well

### Settings

Extra set options:

| Setting | Description |
|-----------|----------|
| **Default sort** | Result sort field |
| **Sort direction** | ASC or DESC |
| **Default limit** | Items per page |
| **Show empty** | Show filters with no values |

## Configuration examples

### MS3 product catalog

```json
{
    "vendor": {
        "type": "vendors",
        "source": "ms3",
        "label": "Vendor"
    },
    "color": {
        "type": "colors",
        "source": "option",
        "field": "color",
        "label": "Color"
    },
    "size": {
        "type": "default",
        "source": "option",
        "field": "size",
        "label": "Size"
    },
    "price": {
        "type": "number",
        "source": "resource",
        "field": "Data.price",
        "label": "Price"
    },
    "new": {
        "type": "boolean",
        "source": "resource",
        "field": "Data.new",
        "label": "New"
    }
}
```

### Catalog with TV

```json
{
    "brand": {
        "type": "default",
        "source": "tv",
        "field": "product_brand",
        "label": "Brand"
    },
    "material": {
        "type": "default",
        "source": "tv",
        "field": "product_material",
        "label": "Material"
    },
    "year": {
        "type": "year",
        "source": "tv",
        "field": "product_year",
        "label": "Year"
    }
}
```

### Article catalog

```json
{
    "category": {
        "type": "parents",
        "source": "resource",
        "label": "Category"
    },
    "author": {
        "type": "default",
        "source": "field",
        "field": "createdby",
        "label": "Author"
    },
    "date": {
        "type": "month",
        "source": "field",
        "field": "publishedon",
        "label": "Publish date"
    }
}
```

## Deleting a set

When a set is deleted:

- All resource bindings are removed
- Slugs and SEO templates are kept
