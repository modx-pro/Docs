---
title: Snippets
description: PageBuilder snippets overview for sections, sitemap, UTM, and table data
---

# PageBuilder snippets

The package ships six snippets. Chunk and section namespace: `pagebuilder`.

| Snippet | Purpose |
| --- | --- |
| [PageBuilder](PageBuilder) | HTML of published sections for the current or given resource |
| [PageBuilderResource](PageBuilderResource) | Sections from another resource (`resource_id` required) |
| [PageBuilderSitemap](PageBuilderSitemap) | XML sitemap for pages with published sections |
| [PageBuilderUtmSession](PageBuilderUtmSession) | UTM from query string into session for section visibility rules |
| [PageBuilderUtmUrl](PageBuilderUtmUrl) | Registry UTM appended to any URL |
| [PageBuilderTableRows](PageBuilderTableRows) | Resource data table rows (JSON or chunk) |

## Typical page order

1. **PageBuilderUtmSession** in the site layout when section UTM rules apply (once per request, before section render).
2. **PageBuilder** in the template or resource content field.
3. **PageBuilderTableRows** separately when a table is rendered outside the `data_table` section.

Use **PageBuilderResource** for a block from another page (hero from home, FAQ from a landing).

## MODX / Fenom reference

| Purpose | MODX | Fenom |
| --- | --- | --- |
| Page sections | `[[!PageBuilder]]` | `{'!PageBuilder' \| snippet}` |
| Section filter | `[[!PageBuilder? &section_types=`hero,cta`]]` | `{'!PageBuilder' \| snippet : ['section_types' => 'hero,cta']}` |
| Another resource | `[[!PageBuilderResource? &resource_id=`42`]]` | `{'!PageBuilderResource' \| snippet : ['resource_id' => 42]}` |
| JSON for SEO | `[[!PageBuilder? &return_values=`1`]]` | `{'!PageBuilder' \| snippet : ['return_values' => 1]}` |
| Sitemap | `[[!PageBuilderSitemap]]` | `{'!PageBuilderSitemap' \| snippet}` |
| UTM session | `[[!PageBuilderUtmSession]]` | `{'!PageBuilderUtmSession' \| snippet}` |
| URL with UTM | `[[!PageBuilderUtmUrl? &url=`/contacts/`]]` | `{'!PageBuilderUtmUrl' \| snippet : ['url' => '/contacts/']}` |
| Table rows | `[[!PageBuilderTableRows? &table_key=`prices`]]` | `{'!PageBuilderTableRows' \| snippet : ['table_key' => 'prices']}` |

## Caching

Call `PageBuilder` and `PageBuilderResource` uncached (`[[!...]]` or `{'!...' | snippet}`). Otherwise MODX may serve stale HTML after publish.

Call `PageBuilderUtmSession` uncached too: the session is filled in the same HTTP request as the UTM landing.

## See also

- [Frontend output](../frontend)
- [Design system](../design-system)
- [CMP → UTM](../cmp#utm)
- [Public API](../public-api)
