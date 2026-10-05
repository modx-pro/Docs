# Quick start

## Requirements

| Requirement | Version |
| --- | --- |
| PHP | 8.1+ |
| MODX Revolution | 3.0+ |
| VueTools | 1.2.0+ |
| pdoTools | 3.x |
| MiniShop3 | required for products, categories, options, and the price index |
| Manager browser | Chrome 89+, Firefox 108+, Safari 16.4+, Edge 89+ |

Without MiniShop3, document templates and TVs still work. Catalog fields and the catalog indexing tab are unavailable in that case.

The panel theme comes from the `vuetools.theme` system setting. Set it to `modx` to match the MODX manager.

## Installation

The **Extras → Installer** provider list must include modstore.pro.

1. Install **VueTools** 1.2.0 or newer.
2. Install **pdoTools** 3.x.
3. Install **MiniShop3** if you use the catalog.
4. Install **SeoData**.
5. Clear the MODX cache.
6. Open **Extras → SeoData**.

::: warning
Without VueTools and pdoTools the SeoData installer stops on the dependencies.
:::

If the menu item is missing, create it in **Settings → Menus**:

| Field | Value |
| --- | --- |
| Text | `seodata` |
| Parent | `components` |
| Namespace | `seodata` |
| Action | `home` |

On the site the item is shown as SeoData.

A reinstall updates the menu, plugin, snippet, and events. System settings are left as they are.

## How a page gets its text

The SeoData plugin on `OnLoadWebDocument` looks up a rule and writes the result into the resource:

1. The active personal template of this resource.
2. If there is none — the matching common template with the highest priority.

An empty condition on a common rule means “any”. If both the parent and the MODX template are filled in, both must match. The “Including children” flag extends the rule to nested resources.

You can turn the plugin off and read the fields from the snippet.

## Snippet

```fenom
{set $seodata = '!SeoData' | snippet}
<title>{$seodata['title']}</title>
<h1>{$seodata['pagetitle']}</h1>
<p>{$seodata['description']}</p>
```

Array keys: `title`, `pagetitle`, `description`, `content`, `image`.

`image` comes from the `{$image}` placeholder and fits `og:image`. The snippet does not write fields into the resource. The plugin does that.

When the snippet is called from the base template, the `$seodata` array is available in nested Fenom templates and chunks.
