# CompareList

Snippet for outputting a comparison table.

## Parameters

| Name           | Default                                                        | Description                                                                                                                                                                                      |
|----------------|----------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **&fields**        | `{"default": ["price", "article", "vendor.name", "color", "size"]}` | JSON string with comparison list configuration array. Key is the parameter name set in **&list** of snippet [addComparison]; values are the array of product fields to compare. |
| **&tplRow**        | `tpl.Comparison.row`                                                | Chunk for one row of the product comparison table. Placeholders `[[+cells]]` and `[[+same]]`.                                                                                                      |
| **&tplParam**      | `tpl.Comparison.param`                                              | Chunk for the product parameter name. Placeholders `[[+param]]` and `[[+row_idx]]`.                                                                                                                |
| **&tplCell**       | `tpl.Comparison.cell`                                               | Cell of the comparison table with one product parameter value. Placeholders: tpl.Comparison.cell, `[[+classes]]` and `[[+cell_idx]]`.                                                             |
| **&tplHead**       | `tpl.Comparison.head`                                               | Product header cell in the comparison table. All product placeholders are available here.                                                                                                         |
| **&tplCorner**     | `tpl.Comparison.corner`                                             | Corner cell of the table, with links to switch comparison parameters. No placeholders.                                                                                                            |
| **&tplOuter**      | `tpl.Comparison.outer`                                              | Wrapper chunk for the comparison table. Placeholders `[[+head]]` and `[[+rows]]`.                                                                                                                  |
| **&minItems**      | `2`                                                                 | Minimum number of products to compare.                                                                                                                                                            |
| **&maxItems**      | `10`                                                                | Maximum number of products to compare.                                                                                                                                                            |
| **&formatSnippet** |                                                                     | Custom snippet for formatting a product parameter value. Receives field name "$field" and value "$value". Must return a formatted string "$value".                                                |
| **&showLog**       | `false`                                                             | Output detailed snippet execution log for the administrator.                                                                                                                                      |

The snippet selects and formats products using pdoTools. You can use [general parameters of this library][2].

If [miniShop2][3] is installed, the snippet will select products with their extra tables, including gallery images.

## Comparison configuration

Your site may have different product types; to avoid creating many comparison pages, you can define configuration for all of them in a single **&fields** parameter.

This is a JSON string with an array: arbitrary list name and array of fields to compare.
If you set **&list** in snippet [addComparison], you must also set the corresponding fields array when calling CompareList.

```modx
[[!addComparison?
  &list_id=`15`
  &list=`mobile`
]]

[[!CompareList?
  &fields=`{"mobile":["price","article","year","vendor.name","option.memory","option.cpu","country"]}`
]]
```

If you do not set **&list**, the **default** configuration is used.

### Prefixes

In comparison field settings you can use resource fields, TV parameters, and [miniShop2][3] product parameters.

- **option.** - prefix for product options from miniShop2.2
- **vendor.** - prefix for product vendor fields
- TV parameters are treated as resource fields and are specified without a prefix
- **msProductData** fields (price, weight, country, etc.) are also treated as resource fields

## Styling

The comparison table is built from 6 chunks listed in the snippet parameters.

Note that chunk **&tplHead** has access to all product placeholders, including the fields selected for comparison.

### Parameter names (product fields)

All parameter names are output via the system lexicon. For example, for field `price` there is an entry `comparison_field_price`, for weight - `comparison_field_weight`, etc.

If you use parameters that have no lexicon entries, add them yourself.
For example, if you compare by TV parameter `date`, add `comparison_field_date` to the lexicons.

### Parameter values

To style parameter values (price, weight, article, etc.) you can specify a custom **&formatSnippet**.
It should accept the field name, the value from the database, and return a formatted string.

Example of such a snippet:

```php
<?php
// Arrays must be converted to string, otherwise you will get "Array" instead of the value
if (is_array($value)) {
  natsort($value);
  $value = implode(',', $value);
}

// Format price and weight for miniShop2 products
if ($miniShop2 = $modx->getService('minishop2')) {
  switch ($field) {
    case 'price':
      $value = $miniShop2->formatPrice($value) . ' ' . $modx->lexicon('ms2_frontend_currency');
      break;
    case 'weight':
      $value = $miniShop2->formatWeight($value) . ' ' . $modx->lexicon('ms2_frontend_weight_unit');
      break;
  }
}

// Return the value
return $value;
?>
```

For **&tplCell** a CSS class is also added with the parameter name and prefix `field-`.
For example, for price the class `field-price` is added, which is bold by default.

### Replacing the image

If you use the component with miniShop2 and need a thumbnail other than the default, you can join data from the msProductFile table.

Add to the CompareList call:

```modx
[[!CompareList?
  &leftJoin=`{
    "200x200": {
      "class": "msProductFile",
      "on": "`200x200`.`product_id` = `msProduct`.`id` AND `200x200`.`rank` = 0 AND `200x200`.`path` LIKE '%/200x200/%'"
    }
  }`
  &select=`{
    "200x200" : "`200x200`.`url` as `200x200`"
  }`
]]
```

Where "200x200" is the desired thumbnail size. The placeholder `[[+200x200]]` will be added with the thumbnail.

If you use the component without miniShop2 or cannot join the required table, you can use the **prepareSnippet** data preparation snippet - a standard pdoTools feature.

Let's take the image from a TV parameter with id = 10. Create a data preparation snippet **addThumb**:

```php
<?php
$tv_id = 10; // TV parameter ID with the image
$empty = '/assets/img/no_image.jpg'; // Path to image to output when TV is empty

if (empty($row) || !is_array($row)) {return $row;}
$q = $modx->newQuery('modTemplateVarResource', array('tmplvarid' => $tv_id, 'contentid' => $row['id']));
$q->select('value');
if ($q->prepare() && $q->stmt->execute()) {
  $row['thumb'] = $q->stmt->fetchColumn();
}
if (empty($row['thumb'])) {
  $row['thumb'] = $empty;
}

return json_encode($row);
?>
```

And specify it in the snippet call:

```modx
[[!CompareList?
  &fields=`{"mobile":["price","article","year","vendor.name","option.memory","option.cpu","country"]}`
  &prepareSnippet=`addThumb`
]]
```

The placeholder `[[+thumb]]` will be added with the image from the TV parameter or the default image when the TV is empty.

[addComparison]: /en/components/comparison/addcomparison
[2]: /en/components/pdotools/general-properties
[3]: /en/components/minishop2/
