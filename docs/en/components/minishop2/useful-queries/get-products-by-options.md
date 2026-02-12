# Get products by options

Specify the option name and parent to search from.

```php
<?php
$key = 'tags'; // product option name
$category = 0; // filter by category
$param1 = 'tag name';

$q = $modx->newQuery('msProductOption');
$q->innerJoin('msProduct', 'msProduct', 'msProduct.id=msProductOption.product_id');
$q->where(array('msProductOption.key' => $key, 'msProductOption.value'=> $param1));
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
    $res['id'][] = $row['id'];
  }
  $result = implode(",", array_unique($res['id'])) ;
}
print_r($result);
```
