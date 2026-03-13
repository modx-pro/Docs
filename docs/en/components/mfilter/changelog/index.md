# Changelog

## Versions

| Version | Date | Description |
|---------|------|-------------|
| [1.1.0](1.1.0) | 2024 | New snippets, SEO improvements, refactoring |
| 1.0.0-beta1 | 2024 | First public release |

## mFilter 1.1.0

Major update with new features:

**New snippets:**
- [mFilterCrumbs](/en/components/mfilter/snippets/mfiltercrumbs) — breadcrumbs with filters
- [mFilterSelected](/en/components/mfilter/snippets/mfilterselected) — selected filters
- [mFilterNav](/en/components/mfilter/snippets/mfilternav) — SEO navigation
- [mFilterSitemap](/en/components/mfilter/snippets/mfiltersitemap) — sitemap

**SEO:**
- Schema.org Microdata and JSON-LD in breadcrumbs
- Improved canonical URL logic
- Human-readable labels for parent and vendor_id

**Architecture:**
- Switch to FilterSetManager (MflPageConfig removed)
- Settings renamed: `mfl_*` → `mfilter.*`
- PHPStan static analysis

[More about 1.1.0 →](1.1.0)

## mFilter 1.0.0-beta1

First public release:

- SEO-friendly URLs for filtered pages
- Filter types: default, number, boolean, parents, date, vendors, colors
- Russian word forms via morpher.ru API
- Vue 3 admin with PrimeVue
- AJAX filtering with History API
- Mobile layout
- Multi-zone content update
- Configurable URL patterns
- Auto slug generation
- SEO templates with placeholders and declensions
- Cache management
- MODX Scheduler integration
