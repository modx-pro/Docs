# Category filtration

Ready-made solution for filtering product categories by their products. Filters show product parameters; results show categories that contain those products.

mFilter2 logic:

- The filter uses one snippet (in &element) for both fetching and output. For products that is usually msProducts.
- That snippet is called twice: first to get matching product IDs, then to output them.
- The two calls are distinguished by the **returnIds** parameter.

Do not change how product IDs are obtained — the filter needs them to build filters. Only change the output so that categories are shown instead of products.

Create a new snippet **msProductsCategories**:

```php
<?php
// Only when outputting products, not when returning IDs
if (empty($returnIds)) {
  // Join categories
  if (empty($innerJoin) || !$where = $modx->fromJSON($innerJoin)) {
    $innerJoin = array();
  }
  $innerJoin['Category'] = array(
    'class' => 'msCategory',
  );
  $scriptProperties['innerJoin'] = $modx->toJSON($innerJoin);
  $scriptProperties['groupby'] = 'Category.id';
  $scriptProperties['select'] = $modx->toJSON(array(
    'Category' => '*',
  ));
}

return $modx->runSnippet('msProducts', $scriptProperties);
```

Everything uses standard pdoTools parameters. Then use this snippet in mFilter2:

```modx
[[!mFilter2?
  &class=`msProduct`
  &element=`msProductsCategories`
  &parents=`0`
  &filters=`
    ms|price:number,
    msoption|tags,
    ms|vendor:vendors,
    ms|old_price:boolean,
  `
  &tpl=`@INLINE <p>
    <a href="{$uri}">
      <img src="{$thumb ?: '/assets/components/minishop2/img/web/ms2_small.png'}">
      {$pagetitle}
    </a>
  </p>`
  &tplFilter.outer.ms|price=`tpl.mFilter2.filter.slider`
  &tplFilter.row.ms|price=`tpl.mFilter2.filter.number`
]]
```

This solution does not modify component source, so updates are safe.
