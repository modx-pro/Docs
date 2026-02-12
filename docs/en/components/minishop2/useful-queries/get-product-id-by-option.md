# Get product IDs by MS2 option

The snippet selects all values of a given option (tags, colors) and prints an array of product IDs that have it.

```php
<?php
$key = 'tags'; // product option name
$category = 0; // filter by category

$q = $modx->newQuery('msProductOption');
$q->innerJoin('msProduct', 'msProduct', 'msProduct.id=msProductOption.product_id');
$q->sortby('msProductOption.value','ASC');
$q->select('DISTINCT(msProductOption.value), msProduct.id');
$q->where(array('msProductOption.key' => $key));
if (!empty($category)) {
  $ids = $modx->getChildIds($category);
  $ids[] = $category;
  $q->innerJoin('msCategory', 'msCategory', 'msCategory.id=msProduct.parent');
  $q->where(array('msCategory.id:IN' => $ids));
}
$result = array();
if ($q->prepare() && $q->stmt->execute()) {
  while ($row = $q->stmt->fetch(PDO::FETCH_ASSOC)) {
    $result[$row['value']][] = $row['id'];
  }
}
echo '<pre>';
print_r($result);
die;
```
