# mFilter2

The snippet implements the second half of the component—filtering of search results.

It has a large number of settings and works using its own filtration class that you can extend.
With basic PHP knowledge and some creativity, you can set up filtering for any fields.

![mFilter2](https://file.modx.pro/files/3/a/5/3a53929e0b22f4c3849b9ab6dca71b20.png)

## Parameters

| Name                     | Default                   | Description                                                                                                                                                                                                                                                                                                                             |
|------------------------------|--------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **&paginator**               | `pdoPage`                      | Snippet for pagination; by default [pdoPage][1]. You can pass a parameter set for it: **&paginator=`pdoPage@myParams`**.                                                                                                                                                                                       |
| **&element**                 | `mSearch2`                     | Snippet that will be called to output results; by default [mSearch2][2]. You can pass a parameter set for it: **&element=`mSearch2@myParams`**.                                                                                                                                                        |
| **&sort**                    |                                | List of resource fields for sorting. Format: «table\|field:direction». Multiple fields via comma, e.g.: «resource\|publishedon:desc,ms\|price:asc».                                                                                                                                         |
| **&filters**                 | `resource\|parent:parents`     | List of resource filters, comma-separated. Format: «table\|field:method».                                                                                                                                                                                                                                                |
| **&aliases**                 |                                | List of filter aliases for use in the filter URL, comma-separated. Format: "table\|field==alias". Example: "resource\|parent==category".                                                                                                                                                  |
| **&showEmptyFilters**        | `true`                         | Show filters that have only one value.                                                                                                                                                                                                                                                                                          |
| **&resources**               |                                | List of resources to output, comma-separated. This list is processed by other parameters such as **&parents**, **&showDeleted**, **&showHidden** and **&showUnpublished**.                                                                                                                                                       |
| **&parents**                 |                                | List of categories, comma-separated, to limit results.                                                                                                                                                                                                                                                                 |
| **&depth**                   | `10`                           | Search depth from each parent.                                                                                                                                                                                                                                                                                         |
| **&tplOuter**                | `tpl.mFilter2.outer`           | Chunk for the whole filter and results block.                                                                                                                                                                                                                                                                                  |
| **&tplFilter.outer.default** | `tpl.mFilter2.filter.outer`    | Default chunk for one filter group.                                                                                                                                                                                                                                                                                   |
| **&tplFilter.row.default**   | `tpl.mFilter2.filter.checkbox` | Default chunk for one filter in a group. Rendered as checkbox by default.                                                                                                                                                                                                                                            |
| **&showHidden**              | `true`                         | Show resources hidden from the menu.                                                                                                                                                                                                                                                                                                  |
| **&showDeleted**             | `false`                        | Show deleted resources.                                                                                                                                                                                                                                                                                                        |
| **&showUnpublished**         | `false`                        | Show unpublished products.                                                                                                                                                                                                                                                                                                  |
| **&hideContainers**          | `false`                        | Hide container resources.                                                                                                                                                                                                                                                                                                         |
| **&showLog**                 | `false`                        | Show extra snippet debug info. Only for users logged in to the "mgr" context.                                                                                                                                                                                                                                 |
| **&suggestions**             | `1`                            | Enables suggested result counts shown next to each filter. Disable if filtration speed is unsatisfactory.                                                                                                                                                                     |
| **&suggestionsMaxFilters**   | `200`                          | Maximum number of filtration operations (not filters) for which suggestions work. If more operations are needed—**suggestions** are disabled.                                                                                                                                                       |
| **&suggestionsMaxResults**   | `1000`                         | Maximum number of resources for which suggestions work. If there are more resources—**suggestions** are disabled.                                                                                                                                                                                          |
| **&suggestionsRadio**        |                                | Comma-separated list of filters that allow only one value (e.g. radio and select). Suggestions for these filter groups are not summed. Example: «resource\|class_key,ms\|new»                                                                                                            |
| **&suggestionsSliders**      | `true`                         | Enables suggestions for sliders, increasing the total number of filtrations.                                                                                                                                                                                                                      |
| **&toPlaceholders**          |                                | If not empty, mFilter2 saves all data to placeholders: `[[+filters]]`, `[[+results]]` and `[[+total]]` with the prefix from this parameter. E.g. **&toPlaceholders=\`my.\`** gives: `[[+my.filters]]`, `[[+my.results]]`, `[[+my.total]]`.                                                        |
| **&toSeparatePlaceholders**  |                                | Same as **&toPlaceholders**, but **filters** go into separate placeholders. E.g. **&toSeparatePlaceholders=\`my.\`** and **&filters=\`tv\|test,resource\|pagetitle\`** give placeholders `[[+my.results]]`, `[[+my.total]]`, `[[+my.tv\|test]]`, `[[+my.resource\|pagetitle]]`. |
| **&filter_delimeter**        | \|                             | Delimiter between table and field name in the filter key.                                                                                                                                                                                                                                                                                   |
| **&method_delimeter**        | :                              | Delimiter between filter name and its handler method.                                                                                                                                                                                                                                                                            |
| **&values_delimeter**        | ,                              | Delimiter for filter values in the site URL.                                                                                                                                                                                                                                                                               |
| **&tpls**                    |                                | List of chunks for row output, comma-separated. Switch via $_REQUEST **&tpl**. 0 = default chunk, then in order. E.g. **&tpls=\`default,chunk1,chunk2\`**; to output with "chunk1", send `$_REQUEST[tpl] = 1`.                              |
| **&forceSearch**             | `false`                        | Search required to return results. If there is no search query, nothing is output.                                                                                                                                                                                                                                        |
| **&fields**                  |                                | List of indexed resource fields, comma-separated, to search in. You can set weight per field: **&fields=`pagetitle:5,content:3,comment:1`**. Default: system setting `mse2_index_fields`.                                                                       |
| **&onlyIndex**               | `false`                        | Enable word-index-only search and disable extra results from simple LIKE search.                                                                                                                                                                                                           |
| **&showSearchLog**           | `false`                        | Show detailed search score info for resources when **&showLog** is on.                                                                                                                                                                                                                                     |
| **&sortAliases**             |                                | JSON array of sort class aliases. See below.                                                                                                                                                                                                                                                                 |
| **&filterOptions**           |                                | JSON string of variables for the filter JavaScript. See below.                                                                                                                                                                                                                                                                  |
| **&ajaxMode**                | `default`                      | AJAX pagination mode: `default`, `scroll` or `button`. Works like [pdoPage][1], but without **&ajaxHistory**.                                                                                                                                                                                                     |

## How it works

On first run the snippet gets the resources needed for filtering. You can specify them in two ways:

- Pass parameters directly: **&parents**, **&resources**, **&showHidden**, etc. They are passed to the snippet in **&element**, which returns the needed IDs.
- Search via mSearch2 when `$_REQUEST[&queryVar]` has a value. Found IDs are also validated against these parameters.

Then the snippet reads filter settings and builds data for them, saves settings to the session (for AJAX), and outputs the chunks.

When the user changes filters, the script detects changes, sends a request to the server and updates the page. Everything is automated; you only need to set the right parameters and chunks.

## Scripts and styles

mFilter2 registers scripts and styles from system settings:

- **mse2_frontend_js** — default JavaScript, by default `/assets/components/msearch2/js/web/default.js`
- **mse2_frontend_css** — default CSS, by default `/assets/components/msearch2/css/web/default.css`

To customize these files, rename them and set the new paths in system settings, or they will be overwritten on update.

You can override filter variables by passing a JSON string in **&filterOptions**:

```modx
[[!mFilter2?
  &parents=`0`
  ...
  &filterOptions=`{
    "pagination": "#mse2_pagination",
    "selected_values_delimeter": ", "
  }`
]]
```

These replace variables on the `mSearch2.options` object in the frontend script.

Example: disable auto-submit on filter change:

```modx
&filterOptions=`{"autoLoad":0}`
```

Then the default form will show a "Submit" button and the user must click it.

### Notes

- All filter elements must be inside one block with `#mse2_mfilter`, as in the default chunk **tpl.mFilter2.outer**.
- The script uses Ajax and keeps URL parameters via HistoryAPI, so filter state is always linkable.
- For numeric sliders the script uses [jQueryUI.slider][3], loaded automatically when needed.
- Default layout targets [Bootstrap 3][4].
- Default setup works with a minimal `[[!mFilter2]]` call and Bootstrap 3 installed.

If something breaks after editing a chunk, check what you changed.

![Notes](https://file.modx.pro/files/5/6/8/568f372891fb70d76941280929399efd.png)

## Chunks and layout

mFilter2 has one main chunk for all output, with placeholders: `[[+filters]]` and `[[+results]]`.

Results are produced by two snippets: by default [pdoPage][1] runs [mSearch2][2] to output document rows.
You can use other snippets, e.g. getPage and msProducts:

```modx
[[!mFilter2?
  &paginator=`getPage`
  &element=`mSearch2`
]]
```

For each filter you can set 2 custom chunks:

- **&tplFilter.outer.table\|field**=`tpl.mFilter2.filter.outer` — wrapper chunk for filter rows (placeholder `[[+rows]]`).
- **&tplFilter.row.table\|field**=`tpl.mFilter2.filter.checkbox` — chunk for one filter option; default is checkbox. A number chunk is also included and must be set manually.

Example, **slider** for product price:

```modx
[[!mFilter2?
  &class=`msProduct`
  &element=`msProducts`
  &parents=`0`
  &filters=`
    ms|price:number
  `
  &tplFilter.outer.ms|price=`tpl.mFilter2.filter.slider`
  &tplFilter.row.ms|price=`tpl.mFilter2.filter.number`
]]
```

**Select** for document parents:

```modx
[[!mFilter2?
  &parents=`0`
  &filters=`
    resource|parent:parents
  `
  &tplFilter.outer.resource|parent=`tpl.mFilter2.filter.select`
  &tplFilter.row.resource|parent=`tpl.mFilter2.filter.option`
  &suggestionsRadio=`resource|parent`
]]
```

Adding the select field to **&suggestionsRadio** makes suggestions work correctly with this filter (only one value, so no plus signs next to other options).

You can set custom chunks per filter; otherwise defaults are used.

## Filters

Filters are defined in **&filters** in the format `table\|field:filter`. Multiple filters comma-separated.

Table key to real table:

- **resource** (modResource) — resource fields: `pagetitle`, `longtitle`, etc.
- **tv** (modTemplateVar) — TV parameters.
- **ms** (msProductData) — miniShop2 product fields: `price`, `article`, `weight`, etc.
- **msoption** (msProductOption) — miniShop2 product options: `size`, `color`, `tags`, etc.
- **msvendor** (msVendor) — vendor fields: `title`, `country`, `phone`, etc.

If you omit the table key, **resource** is used. If you omit the filter method, **default** is used.

You can use several filters for one field (e.g. separate year and month).

Example:

```modx
[[!mFilter2?
  &filters=`
    parent:grandparents,
    createdon:year,
    createdon:month,
    tv|radio:boolean,
    createdby:fullname
  `
]]
```

![Filters](https://file.modx.pro/files/9/6/3/963d4bc1be1657cdfd657d8fe0ce1e9a.png)

mFilter2 includes several built-in filter methods.

### default

Standard filter for checkboxes. Used for all fields without a specific filter.

### number

Filter for numeric min–max. Use with slider chunks for a slider UI.

```modx
[[!mFilter2?
  &filters=`
    template:number
  `
  &tplFilter.outer.resource|template=`tpl.mFilter2.filter.slider`
  &tplFilter.row.resource|template=`tpl.mFilter2.filter.number`
]]
```

![number](https://file.modx.pro/files/5/7/5/57553cb66b79e1c93391a0ec58bc5f74.png)

### boolean

Yes/no filter (e.g. published, hid from menu, searchable). Without `boolean` you get 0 and 1; with it you get "yes" and "no".

```modx
[[!mFilter2?
  &filters=`
    isfolder:boolean
  `
]]
```

![boolean](https://file.modx.pro/files/b/c/0/bc022499933ae06b101e290e9b784a16.png)

### parents, categories and grandparents

These three apply only to the resource *parent* field.

Parents outputs two parent names with a delimiter. It is the default.

```modx
[[!mFilter2?
  &filters=`
    parent:parents
  `
]]
```

![parents, categories and grandparents](https://file.modx.pro/files/5/b/3/5b39cd5c3019e80fa4d66819f9a2d252.png)

Categories outputs the immediate parent name.

```modx
[[!mFilter2?
  &filters=`
    parent:categories
  `
]]
```

![Categories](https://file.modx.pro/files/3/9/0/3907a5749b8d5dd5d7b38965eacd9326.png)

Grandparents outputs grandparent names for large catalogs. If there is no grandparent, the immediate parent is shown.

```modx
[[!mFilter2?
  &filters=`
    parent:grandparents
  `
]]
```

![Grandparents](https://file.modx.pro/files/5/5/e/55e5e69063b9580d534b50a03c1acb4f.png)

### vendors

Outputs miniShop2 vendor names. Only for `vendor` field in table `ms`.

```modx
[[!mFilter2?
  &where=`{"class_key":"msProduct"}`
  &filters=`
    ms|vendor:vendors
  `
]]
```

![vendors](https://file.modx.pro/files/8/5/3/85333575318f1fb2e7fe2881eb25559a.png)

### fullname

Outputs full user name. Can be used for any field that stores a user id.

```modx
[[!mFilter2?
  &filters=`
    createdby:fullname
  `
]]
```

![fullname](https://file.modx.pro/files/f/c/a/fca1f4f3dc12e0bb19ae0d4388f03e4d.png)

### year

For date fields; outputs the year. E.g. filter news by creation year.

```modx
[[!mFilter2?
  &filters=`
    createdon:year
  `
]]
```

![year](https://file.modx.pro/files/c/1/3/c13c234629cde60be2122e85ee18483a.png)

### month

For date fields; outputs the month name from the component lexicon.

### day

For date fields; outputs the day.

## Filter aliases

Recent versions add aliases so filter URLs are shorter and clearer.

You can map long filter names to short aliases. Example:

```modx
[[!mFilter2?
  &parents=`0`
  &element=`msProducts`
  &aliases=`
    ms|price==price,
    resource|parent==parent,
  `
  &filters=`
    ms|price:number,
    parent:parents,
    parent:categories,
  `
  &class=`msProduct`
  &tplFilter.outer.price=`tpl.mFilter2.filter.slider`
  &tplFilter.row.price=`tpl.mFilter2.filter.number`
]]
```

Resulting URLs:
> site.com/mfilter2?**price**=102,750&**parent**=10,12,15

Aliases also affect chunk parameter names: for `ms|price` with an alias use `&tplFilter.row.price`, not `&tplFilter.row.ms|price`.

```modx
&filters=`
  resource|parent:categories,
  resource|parent:grandparents,
`
```

If a field appears two or more times, the key becomes field-filter, e.g. `parent-categories` and `parent-grandparents`. Set aliases like:

```modx
&aliases=`
  resource|parent-categories==categories,
  resource|parent-grandparents==grandparents,
`
```

And chunks by alias:

```modx
&tplFilter.row.categories=`tpl.mFilter2.filter.checkbox1`
&tplFilter.row.grandparents=`tpl.mFilter2.filter.checkbox2`
```

## Suggestions

Suggestions are the small numbers next to each filter showing how many results you get if you click it.

![Suggestions](https://file.modx.pro/files/6/3/9/639c9da527e3b25fa8c9b00ae64c59c0.png)

On each click the value is recalculated for **all filters** from the current state. The script iterates each option and counts results if it were active.

That can mean many extra filtrations. Benefits:

- The user sees what each click will show.
- Combinations that return no results can be hidden, so the user never sees "No results".

This feature is useful but costly. It depends on result set size and filter count, so it cannot be fast in all cases.

It is auto-disabled for large catalogs via **&suggestionsMaxFilters** and **&suggestionsMaxResults**. You can turn it off with:

```modx
&suggestions=`0`
```

You get maximum speed but no numbers next to filters.

## Sorting results

mFilter2 can sort by multiple table fields.

**&sort** format is similar to **&filters**:

```modx
&sort=`
  resource|publishedon:asc,
  resource|createdby:desc
`
```

Database table aliases depend on the results snippet: e.g. mSearch2 uses **modResource**, msProducts uses **msProduct**. So with [msProducts][5] use:

```modx
&sort=`
  ms_product|publishedon:asc,
  ms_product|createdby:desc,
  ms|price:asc,
  ms_vendor|name:desc
`
```

The filter class method **getSortFields()** handles this; see [filtration class][6]. Default table alias mapping:

- **ms** &rarr; Data
- **ms_product** &rarr; msProduct
- **ms_vendor** &rarr; Vendor
- **tv** &rarr; TV
- **resource** &rarr; modResource

From the example above the snippet produces:

```sql
`msProduct`.`publishedon` ASC, `msProduct`.`createdby` DESC, `Data`.`price` ASC, `Vendor`.`name` DESC
```

So **&sort** depends on the snippet and its JOINs. On sort errors check the log and system log.

Add custom aliases with **&sortAliases**. Example for tickets:

```modx
[[!mFilter2?
  &parents=`0`
  &class=`Ticket`
  &element=`getTickets`
  &sortAliases=`{"ticket":"Ticket"}`
  &sort=`ticket|createdon:desc,ticket|pagetitle:asc`
  &showLog=`1`
]]
```

Sort by miniShop2 product option:

```modx
[[!mFilter2?
  &parents=`0`
  &element=`msProducts`
  &leftJoin=`{
    "Test1": {
      "class": "msProductOption",
      "on": "Test1.key = 'test1' and Test1.product_id = msProduct.id"
    }
  }`
  &sortAliases=`{"test1":"Test1"}`
  &aliases=`test1|value==test1`
  &sort=`test1:desc`
]]
```

Join option **test1**, add alias, sort by the joined option value.

In chunk `tpl.mFilter2.outer` the sort link can look like:

```modx
<a href="#" class="sort [[+mse2_sort:is=``:then=`active`]]"
  data-sort="test1"
  data-dir="[[+mse2_sort:is=``:then=`desc`]]"
  data-default="desc">Test1 <span></span></a>
```

Using an alias in **&aliases** lets you sort by `test1` instead of `test1|value`. For multiple options, join each under a unique alias and add the right links.

## Javascript

Filter behavior is in the default.js script (path in system setting **mse2_frontend_js**). To customize, rename the file and set the new path so updates do not overwrite it.

All methods are on the **mSearch2** object. Submit the form:

```js
mSearch2.submit();
```

Reset values:

```js
mSearch2.reset();
```

When filters update, the **mse2_load** event fires:

```js
$(document).on('mse2_load', function (e, data) {
  console.log(e, data);
});
```

Use this event for custom filter handling.

Example: reduce product card opacity during filtering and restore after load:

```fenom
{$_modx->regClientScript('
  <script>
    mSearch2.defaultBeforeLoad = mSearch2.beforeLoad;
    mSearch2.defaultAfterLoad = mSearch2.afterLoad;

    mSearch2.beforeLoad = function () {
      mSearch2.defaultBeforeLoad();
      this.filters.css({
        opacity: .5,
        pointerEvents: "none",
      });
    };

    mSearch2.afterLoad = function () {
      mSearch2.defaultAfterLoad();
      this.filters.css({
        opacity: 1,
        pointerEvents: "auto",
      });
    };
  </script>
', true)}
```

## Lexicons

Filter labels come from the component lexicon. If a new filter shows a long English key, add a translation to the mSearch2 lexicon.

![Lexicons - 1](https://file.modx.pro/files/5/5/2/552180f6bee53f13c033fb188c622f04.png)

![Lexicons - 2](https://file.modx.pro/files/e/b/b/ebbc79941c98e61692f47d1e8046c721.png)

[1]: /en/components/pdotools/snippets/pdopage
[2]: /en/components/msearch2/snippets/msearch2
[3]: http://jqueryui.com/slider/
[4]: http://getbootstrap.com/
[5]: /en/components/minishop2/snippets/msproducts
[6]: /en/components/msearch2/extension/filtration-methods
