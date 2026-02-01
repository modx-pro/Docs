# Get links to product extra categories

Select extra categories and output links to them.

```php
<?php
if (empty($id)) {$id = $modx->resource->id;}
if (empty($tpl)) {$tpl = '@INLINE <a href="[[~[[+id]]]]">[[+pagetitle]]</a>';}
$pdo = $modx->getService('pdoFetch');

$conditions = array('product_id' => $id);
$options = array(
  'innerJoin' => array(
    'msCategory' => array('on' => 'msCategoryMember.category_id = msCategory.id')
  ),
  'select' => array('msCategory' => 'all'),
  'sortby' => 'msCategory.id'
);
$rows = $pdo->getCollection('msCategoryMember', $conditions, $options);

$output = '';
foreach ($rows as $row) {
  $output .= $pdo->getChunk($tpl, $row);
}

return $output;
```
