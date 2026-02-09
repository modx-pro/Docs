# mSearchForm

Snippet for the search form with autocomplete.

Because it works via Ajax, call it uncached.

## Parameters

| Name | Default | Description |
|------|---------|-------------|
| **&pageId** | | Page ID for form action. Default: current page. |
| **&tplForm** | `tpl.mSearch2.form` | Chunk with the HTML form. Form must have `class="msearch2"`. |
| **&tpl** | `tpl.mSearch2.ac` | Chunk for each autocomplete result. |
| **&element** | `mSearch2` | Snippet used to output results. Default: [mSearch2][1]. |
| **&limit** | `5` | Max results. |
| **&autocomplete** | `results` | Autocomplete mode: "results" — search site (snippet in **&element** outputs results), "queries" — search query history, "0" — off. |
| **&queryVar** | `query` | Request variable for search query. |
| **&minQuery** | `3` | Minimum query length. |
| **&fields** | | Indexed fields and weights, e.g. `pagetitle:5,content:3,comment:1`. Default: `mse2_index_fields`. |
| **&onlyIndex** | `false` | Search only by word index; disable LIKE fallback. |

## Autocomplete

The snippet adds autocomplete for the typed query. Two modes:

### results

Search uses the standard algorithm (word index). IDs of found pages are passed to the snippet in **&element**, which outputs them.

You can pass any parameters to that snippet to limit results (e.g. by container, category).

So search returns all matching pages and you control what the snippet shows. This mode does not "complete" the query but shows ready results. Choosing an item goes to that page.

[![](https://file.modx.pro/files/0/2/d/02d12e8588b9920752fddecef35ba99cs.jpg)](https://file.modx.pro/files/0/2/d/02d12e8588b9920752fddecef35ba99c.png)

### queries

This mode completes queries. It searches the [query history][4] from the manager.

It shows queries that other users ran and that returned results. Zero-result queries are not shown.

Choosing a query fills the form and submits it.

[![](https://file.modx.pro/files/1/b/3/1b3240ec2c205bae779d771826bb789ds.jpg)](https://file.modx.pro/files/1/b/3/1b3240ec2c205bae779d771826bb789d.png)

## Scripts and styles

The snippet uses paths from system settings:

- **mse2_frontend_js** — default `/assets/components/msearch2/js/web/default.js`
- **mse2_frontend_css** — default `/assets/components/msearch2/css/web/default.css`

Scripts need the snippet call parameters, so **&minQuery**, **&queryVar**, **&autocomplete** are passed to the page.

To change default files, copy them, rename, and set new paths in settings so updates do not overwrite your changes.

[jQueryUI.autocomplete][3] is used for autocomplete. If it is not loaded, mSearchForm loads it. Autocomplete is applied to all forms on the page with `class="msearch2"`.

## Examples

Basic call:

```modx
[[!mSearchForm]]
```

mSearchForm passes all its parameters to the snippet in **&element**, so you can use:

```modx
[[!mSearchForm?
  &element=`pdoResources`
  &includeTVs=`image,file`
]]

[[!mSearchForm?
  &element=`msProducts`
  &includeThumbs=`120x90`
  &where=`{"Data.price:>":0}`
]]
```

[1]: /en/components/msearch2/snippets/msearch2
[3]: http://jqueryui.com/autocomplete/
[4]: /en/components/msearch2/interface/queries
