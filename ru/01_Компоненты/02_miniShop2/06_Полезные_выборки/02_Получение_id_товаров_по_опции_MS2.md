# Получение id товаров по опции MS2

Сниппет выбирает все значения указанной опции (теги, цвета) и печатает массив id товаров, у которых оно есть.

```php
<?php
$key = 'tags'; // имя опции товара
$category = 0; // фильтрация по категории

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
echo '<pre>';print_r($result); die;
```
