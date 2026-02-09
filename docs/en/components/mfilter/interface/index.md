# Manager interface

The mFilter admin interface is under **Extras → mFilter**.

## Tabs

| Tab | Description |
|---------|----------|
| [Filter sets](filter-sets) | Create and configure filter sets |
| [Slugs](slugs) | SEO aliases for filter values |
| [URL patterns](patterns) | URL recognition rules |
| [SEO templates](seo-templates) | Templates for metadata generation |
| [Word forms](word-forms) | Word declension for SEO text |
| [Maintenance](maintenance) | Reindexing, cache clearing |

## Layout

```
┌─────────────────────────────────────────────────────────────┐
│  mFilter                                                     │
├─────────────────────────────────────────────────────────────┤
│  Filter sets │ Slugs │ Patterns │ SEO │ Word forms │ ⚙  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ Data table                                            │   │
│  │ - Sortable columns                                    │   │
│  │ - Search                                              │   │
│  │ - Pagination                                          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Quick start

### 1. Create a filter set

1. Open the **Filter sets** tab
2. Click **Create**
3. Enter a name and add filters
4. Bind to catalog categories

### 2. Configure slugs (optional)

1. Open the **Slugs** tab
2. Review auto-generated slugs
3. Edit if needed

### 3. Create SEO templates (optional)

1. Open the **SEO templates** tab
2. Create templates for different filter combinations
3. Set application conditions

## Tech stack

The interface is built with:

- **Vue 3** — reactive framework
- **PrimeVue** — UI components
- **VueTools** — MODX integration
