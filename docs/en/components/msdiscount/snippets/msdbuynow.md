# msdBuyNow

Snippet for a “Buy now” block that shows time left until the promotion ends.

It selects the needed product IDs and passes them to msProducts. So **it accepts all msProducts parameters** in addition to its own.

## Parameters

| Name            | Default                         | Description                                                    |
|-----------------|----------------------------------|----------------------------------------------------------------|
| **&sale**       |                                  | Comma-separated promotion IDs. If empty, all are used.         |
| **&tpl**        | `tpl.msProducts.discount.row`   | Chunk for each result.                                         |
| **&frontend_css**| `[[+assetsUrl]]css/web/main.css` | Frontend CSS file.                                             |
| **&frontend_js** | `[[+assetsUrl]]js/web/default.js`| Frontend JS file.                                              |
| **&force_date** | `1`                              | Show only products from time-limited promotions.              |

By default the snippet shows all products from time-limited promotions. Promotions without a date are shown only when `&force_date` is empty.

Useful for showing all discounted products, e.g. in [mFilter2][1]:

```modx
[[!mFilter2?
  &parents=`0`
  &element=`msdBuyNow`
  &force_date=`0`
  ...
]]
```

### Countdown

A bundled JS file runs a countdown to the end of the promotion. It takes remaining seconds and shows a counter:

```html
<span class="msd_remains" data-remain="1473652">
  <span class="days">17</span>
  <span class="hours">01</span>
  <span class="minutes">20</span>
  <span class="seconds">52</span>
</span>
```

Style the counter with `.msd_remains span {}`, `.msd_remains .days {}`, etc.

## Examples

The snippet outputs seconds until the promotion ends, so **call it uncached**.

Basic call for time-limited promotions:

```modx
[[!msdBuyNow]]
```

With pagination:

```modx
[[!pdoPage?
  &element=`msdBuyNow`
]]
[[!+page.nav]]
```

With msProducts parameters:

```modx
[[!pdoPage?
  &element=`msdBuyNow`
  &sale=`1,2,3,4,5`
  &includeTVs=`type`
  &sortby=`type`
  &includeThumbs=`120x90`
]]
[[!+page.nav]]
```

[1]: /en/components/msearch2/snippets/mfilter2
