# Выбор товаров по опциям

Указываете имя опции и родителя, откуда искать.

```php
<?php
$key = 'tags'; // имя опции товара
$category = 0; // фильтрация по категории
$param1 = 'имя тега';

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
