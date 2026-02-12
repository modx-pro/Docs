# addComparison

Snippet for adding a product to the comparison list.

## Parameters

| Name | Default | Description |
|------|---------|-------------|
| **&list** | `default` | Comparison config name. Use different configs for different product types. |
| **&list_id** | `0` | Resource ID where [CompareList](comparelist) is called with this **&list**. If the user has enough products to compare, they see a link to this resource. **Required.** |
| **&tpl** | `tpl.Comparison.add` | Chunk with the links for the comparison list. Contains internal placeholders; avoid changing them. |
| **&minItems** | `2` | Minimum products to compare. |
| **&maxItems** | `10` | Maximum products to compare. |
| **&id** | `[[*id]]` | Product ID to add. Default: current resource. |

## Page call

Single snippet on a product page:

```modx
[[!addComparison?
  &list_id=`15`
]]
```

Or multiple when listing products, e.g. in chunk **tpl.msProducts.row**:

```modx
[[!addComparison?
  &list_id=`15`
  &id=`[[+id]]`
]]
```

For different product types (e.g. fridges vs phones), use **&list** so they are not mixed:

```modx
[[!addComparison?
  &list_id=`15`
  &list=`mobile`
  &id=`[[+id]]`
]]
```

The same **&list** must be configured in the [CompareList](comparelist) call.

## Output comparison count in a separate block

To show the comparison count in the header or a floating block, call the snippet uncached:

```modx
[[!addComparison?
  &list_id=`your_compare_page_id`
  &tpl=`tpl.Comparison.num`
]]
```

In chunk tpl.Comparison.num keep only the wrapper:

```modx
<div data-id="[[+id]]" data-list="[[+list]]"></div>
```

and the link with the placeholder and **comparison-total** class:

```modx
<a class="comparison-total">[[+total]]</a>
```

## How it works

Clicking the link adds the product ID to the comparison list stored in the user session.

When the list has enough items (more than one by default), a link to the comparison page (**&list_id**) is shown.

On that page, [CompareList](comparelist) receives **&list**, loads the config for it, and outputs the comparison table.

You control what can be compared with what by setting **&list** in both addComparison and CompareList.
