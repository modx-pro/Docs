# Component usage examples

## Output only products with stock

To output only products that have stock for at least one property combination, call the `msProducts` snippet like this:

::: code-group

```modx
[[!msProducts?
  &leftJoin=`{
    "Remains": {
      "class": "msprRemains",
      "on": "msProduct.id = Remains.product_id AND Remains.remains > 0"
    }
  }`
  &groupby=`msProduct.id`
  &select=`{
    "msProduct": "*",
    "Remains": "SUM(Remains.remains) as remains"
  }`
  &where=`{
    "Remains.remains:>": "0"
  }`
]]
```

```fenom
{'!msProducts' | snippet: [
  'leftJoin' => [
    'Remains' => [
      'class' => 'msprRemains',
      'on' => 'msProduct.id = Remains.product_id AND Remains.remains >= 0',
    ],
  ],
  'groupby' => 'msProduct.id',
  'select' => [
    'msProduct' => '*',
    'Remains' => 'SUM(Remains.remains) as remains',
  ],
  'where' => [
    'Remains.remains:>' => 0,
  ],
]}
```

:::

The `[[+remains]]` placeholder will contain the total number of remaining units (same as `getRemains` snippet called without specifying properties).

## Connecting remains when calling mFilter2

To filter products by stock in the catalog, add these parameters to the `mFilter2` call:

:::code-group

```modx
&loadModels=`msProductRemains`
&leftJoin=`{
  "Remains": {
    "class": "msprRemains",
    "on": "msProduct.id = Remains.product_id AND Remains.remains >= 0"
  }
}`
&groupby=`msProduct.id`
&select=`{
  "msProduct": "*",
  "Remains": "SUM(Remains.remains) as remains"
}`
```

```fenom
'loadModels' => 'msProductRemains',
'leftJoin' => [
  'Remains' => [
    'class' => 'msprRemains',
    'on' => 'msProduct.id = Remains.product_id AND Remains.remains >= 0',
  ],
],
'groupby' => 'msProduct.id',
'select' => [
  'msProduct' => '*',
  'Remains' => 'SUM(Remains.remains) as remains',
],
```

:::

To add an "In stock" filter, also add these parameters to the `mFilter2` call:

:::code-group

```modx
&filters=`mspr|remains:availability`
&suggestionsRadio=`mspr|remains`
&tplFilter.row.mspr|value=`tpl.mFilter2.filter.checkbox`
```

```fenom
'filters' => 'mspr|remains:availability',
'suggestionsRadio' => 'mspr|remains',
'tplFilter.row.mspr|value' => 'tpl.mFilter2.filter.checkbox',
```

:::

And in the `mse2_filters_handler_class` setting of the `mSearch2` component specify the filter handler class `msprRemainsFilter`.
