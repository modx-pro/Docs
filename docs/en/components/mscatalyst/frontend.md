# Frontend

## Chunks

Copy a chunk under a new name and set it in the property before editing. A package update overwrites the msCatalyst chunks.

### msCatalyst.outer

The whole block. Placeholders:

- `[[+groups]]`, `[[+results]]`, `[[+chips]]`, `[[+pagination]]`, `[[+more]]`, `[[+empty]]`: ready HTML of the parts;
- `[[+total]]` (the text "Found: N"), `[[+totalNum]]`, `[[+applyText]]`, `[[+badge]]`, `[[+badgeHidden]]`;
- `[[+sortOptions]]`, `[[+sortHidden]]`, `[[+limitOptions]]`, `[[+limitHidden]]`;
- `[[+q]]`, `[[+searchParam]]`, `[[+searchHidden]]`;
- `[[+viewCls]]`, `[[+gridPressed]]`, `[[+listPressed]]`, `[[+viewHidden]]`;
- service placeholders `[[+uid]]`, `[[+hash]]`, `[[+base]]`, `[[+uri]]`, `[[+hidden]]` (hidden form fields for sites without friendly URLs, where a category URL looks like `index.php?id=5`), `[[+limit]]`, `[[+sort]]`, `[[+breakpoint]]`, `[[+rowsClass]]`;
- lexicon labels `[[+l_filters]]`, `[[+l_close]]`, `[[+l_search]]`, `[[+l_search_ph]]`, `[[+l_apply]]`, `[[+l_sort]]`, `[[+l_limit]]`, `[[+l_view]]`, `[[+l_view_grid]]`, `[[+l_view_list]]`, `[[+l_results]]`.

The script looks for these elements in the markup: `.msc[data-msc]` with `data-*` attributes, `.msc-form`, `.msc-panel`, `.msc-overlay`, `.msc-open`, `.msc-close`, `.msc-total`, `.msc-badge`, `.msc-apply-js`, `.msc-chips`, `.msc-rows`, `.msc-empty-wrap`, `.msc-more`, `.msc-pages`. If you change the markup, keep them.

### msCatalyst.group

`[[+key]]`, `[[+uid]]`, `[[+title]]`, `[[+expanded]]`, `[[+bodyHidden]]`, `[[+reset]]`, `[[+resetHidden]]`, `[[+rows]]`, `[[+find]]` (search inside a long group), `[[+more]]` (the "Show all" button).

### msCatalyst.option

`[[+key]]`, `[[+value]]`, `[[+label]]`, `[[+count]]`, `[[+cls]]`, `[[+checked]]`, `[[+disabled]]`, `[[+uid]]`. The field name must be `[[+key]][]`.

### msCatalyst.range

The same group placeholders, plus:

- `[[+min]]`, `[[+max]]`: slider bounds;
- `[[+availMin]]`, `[[+availMax]]`: what is available under the current filters;
- `[[+from]]`, `[[+to]]`: the selected range;
- `[[+step]]`, `[[+l_from]]`, `[[+l_to]]`.

The input fields are named `[[+key]]_min` and `[[+key]]_max`.

### msCatalyst.empty

`[[+title]]`, `[[+text]]`, `[[+query]]`, `[[+reset]]`, `[[+resetUrl]]`.

## Page placeholders

After the snippet call, the page has:

| Placeholder | Value |
|---|---|
| `[[!+mscatalyst.total]]` | How many products were found. |
| `[[!+mscatalyst.page]]`, `[[!+mscatalyst.pages]]` | Current page and number of pages. |
| `[[!+mscatalyst.active]]` | How many filters are selected. |
| `[[!+mscatalyst.query]]` | Query string of the current state. |
| `[[!+mscatalyst.title]]`, `[[!+mscatalyst.h1]]`, `[[!+mscatalyst.description]]` | Title, H1 and description from the `mscatalyst_seo_*` setting templates. With no filters selected, this is the page title. |
| `[[!+mscatalyst.canonical]]` | Page URL with the current filters. |

A template example:

```modx
<title>[[!+mscatalyst.title]][[!+mscatalyst.page:gt=`1`:then=` (page [[!+mscatalyst.page]])`]]</title>
<meta name="description" content="[[!+mscatalyst.description]]">

<h1 data-msc-h1>[[!+mscatalyst.h1]]</h1>
```

A search bot gets these values right away, without JavaScript. After an AJAX update the script changes `<title>`, description and the H1 with the `data-msc-h1` attribute by itself. Other placeholders outside the filter block, for example `mscatalyst.total`, get new values on the next full page load.

If a placeholder above the snippet call stays empty, call the snippet at the top of the template with `` &toPlaceholder=`mscatalyst` `` and output `[[!+mscatalyst]]` where the filter should be.

## Styling

The styles use CSS variables. You can change colors and sizes without touching the file:

```css
.msc {
    --msc-accent: #16a34a;
    --msc-radius: 4px;
    --msc-panel: 300px;
}
```

Variables: `--msc-accent`, `--msc-accent-contrast`, `--msc-accent-soft`, `--msc-accent-line`, `--msc-text`, `--msc-muted`, `--msc-line`, `--msc-line-strong`, `--msc-surface`, `--msc-soft`, `--msc-radius`, `--msc-radius-sm`, `--msc-panel`, `--msc-gap`, `--msc-shadow`, `--msc-shadow-float`.

The sidebar column turns on when the block width reaches 720px (container query). Below 992px the panel slides out from the "Filters" button. If you change `&breakpoint`, change the media query in the CSS too. For RTL, put `dir="rtl"` on `<html>`.

To style the filter entirely with your own CSS, clear the `mscatalyst_frontend_css` setting. If your styles were written for msFacets, turn on `mscatalyst_legacy_markup`: the markup also gets the old `msf-*` classes.

## History and the "Back" button

Every AJAX change of filters, sorting, page numbers and "Show more" calls `history.pushState`. "Back" restores the state over AJAX: page 3, then 2, then 1. The visitor stays on the site and does not land on the previous history entry.

## JavaScript

The script has no dependencies, is ES5 and supports several filters on one page. Events bubble from the `.msc` root:

| Event | When | `event.detail` |
|---|---|---|
| `mscatalyst:ready` | The filter is initialized. | `{instance}` |
| `mscatalyst:load` | A request was sent. | `{instance, query}` |
| `mscatalyst:updated` | Results were inserted. | `{instance, data, append}` |
| `mscatalyst:seo` | After AJAX, on `document`. | `{seo, data}` |

`data` contains `total`, `page`, `pages`, `ids` (IDs of products on the page), `query` and the HTML of the parts.

```js
document.addEventListener('mscatalyst:updated', function (e) {
    // reinitialize card sliders, send an analytics event
    console.log('Found', e.detail.data.total, e.detail.data.ids);
});
```

API:

- `msCatalyst.init(element)`: initialize the filters inside an element, for example after inserting HTML over AJAX;
- `msCatalyst.instances`: the list of instances;
- `instance.reload()`: request the results again with the current filters.

If a request fails, the script opens the regular page with the same filters. The visitor still sees the result.

## REST

The connector returns JSON for headless storefronts:

```
/assets/components/mscatalyst/connector.php?action=schema&resource=5
```

Actions: `schema` (catalog facets and values), `apply` (results for the filters), `suggest` (search suggestions).
