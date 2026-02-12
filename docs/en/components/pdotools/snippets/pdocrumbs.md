# pdoCrumbs

Snippet for building breadcrumb navigation.

Replaces [BreadCrumb][1] well, works with documents from any contexts and allows specifying various conditions for resource selection.

Snippet has high performance by selecting all needed elements from the database in a single query.

## Parameters

Accepts all [pdoTools][2] parameters and some of its own:

| Parameter             | Default | Description                                                                                                                                                 |
|----------------------|--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| **&showLog**         | `0`          | Show extra snippet debug info. Only for users logged in to the "mgr" context.                                                      |
| **&from**            | `0`          | Resource id from which to build breadcrumbs. Usually the site root, i.e. «0».                                                                    |
| **&to**              |              | Resource id for which breadcrumbs are built. Default is current page id.                                                                   |
| **&exclude**         |              | List of resource IDs to exclude from selection.                                                                                                  |
| **&toPlaceholder**   |              | If set, the snippet stores all data in a placeholder with this name instead of outputting.                                                          |
| **&outputSeparator** | `\n`         | Separator between crumbs                                                                                                                               |
| **&tpl**             |              | Name chunk for displaying resource. If not set, resource fields will be printed to screen.                                                |
| **&tplCurrent**      |              | Chunk for formatting current document in navigation.                                                                                                          |
| **&tplMax**          |              | Chunk added at the start of results if there are more than **&limit**.                                                                           |
| **&tplHome**         |              | Chunk for formatting link to home page.                                                                                                              |
| **&tplWrapper**      |              | Wrapper chunk for all results. Accepts one placeholder: `[[+output]]`. Does not work with the parameter **&toSeparatePlaceholders**. |
| **&wrapIfEmpty**     |              | Enables wrapper chunk output **&tplWrapper** even when no results.                                                                                  |
| **&showCurrent**     | `1`          | Output current document in navigation.                                                                                                                   |
| **&showHome**        | `0`          | Output link to home at start of navigation.                                                                                                           |
| **&showAtHome**      | `1`          | Show breadcrumbs on the site home page.                                                                                                     |
| **&hideSingle**      | `0`          | Don't output result if it is the only one.                                                                                                        |
| **&direction**       | `ltr`        | Navigation direction: left to right «ltr» or right to left «rtl», e.g. for Arabic.                                                        |

### Templates

| Template          | Default                                              |
|-----------------|-----------------------------------------------------------|
| **&tpl**        | `@INLINE <li><a href="[[+link]]">[[+menutitle]]</a></li>` |
| **&tplCurrent** | `@INLINE <li class="active">[[+menutitle]]</li>`          |
| **&tplMax**     | `@INLINE <li class="disabled">&nbsp;...&nbsp;</li>`       |
| **&tplHome**    |                                                           |
| **&tplWrapper** | `@INLINE <ul class="breadcrumb">[[+output]]</ul>`         |

## Examples

Generate breadcrumbs for current page:

```modx
[[pdoCrumbs]]
```

Generate with limit on number of items:

```modx
[[pdoCrumbs?
  &limit=`2`
]]
```

Snippet works well when called from pdoResources. For example, this chunk:

```modx
<h3>[[+pagetitle]]</h3>
<p>[[+introtext]]</p>
[[pdoCrumbs?
  &to=`[[+id]]`
  &showCurrent=`0`
]]
```

Generate [Schema.org](http://Schema.org) microdata in JSON-LD format

```fenom
{'!pdoCrumbs' | snippet: [
  'showHome' => 1,
  'tplWrapper' => '@INLINE
    <script type="application/ld+json">
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [ {$output} ]
      }
    </script>
  ',
  'tplHome' => '@INLINE
    {
      "@type": "ListItem",
      "position": {$idx},
      "item": {
        "@id": "{$link}",
        "name": "{$menutitle}"
      }
    },
  ',
  'tplCurrent' => '@INLINE
    {
      "@type": "ListItem",
      "position": {$idx},
      "item": {
        "@id": "{$link}",
        "name": "{$menutitle}"
      }
    }
  ',
  'tpl' => '@INLINE
    {
      "@type": "ListItem",
      "position": {$idx},
      "item": {
        "@id": "{$link}",
        "name": "{$menutitle}"
      }
    },
  ',
]}
```

## Demo

Working example of [breadcrumb generation in search results][3] mSearch2.

![Demo](https://file.modx.pro/files/a/f/4/af4033fffb71ad040e3ff2f6c01d9bf5.png)

[1]: http://rtfm.modx.com/extras/revo/breadcrumb
[2]: /en/components/pdotools/general-properties
[3]: https://modx.pro/search?query=pdotools
