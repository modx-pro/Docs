# Вывод производителей товаров MS2

Сниппет получает всех производителей, у которых есть хоть один активный товар и выводит в виде селектбокса.

```php
<?php
$q = $modx->newQuery('msVendor');
$q->innerJoin('msProductData', 'msProductData', '`msProductData`.`vendor` = `msVendor`.`id`');
$q->innerJoin('msProduct', 'msProduct', array(
  '`msProductData`.`id` = `msProduct`.`id`',
  'msProduct.deleted' => 0,
  'msProduct.published' => 1
));
$q->groupby('msVendor.id');
$q->sortby('name','ASC');
$q->select(array('msVendor.id', 'name'));
$options = '<option value="0">Нет</option>';
if ($q->prepare() && $q->stmt->execute()) {
  while ($row = $q->stmt->fetch(PDO::FETCH_ASSOC)) {
    $options .= '<option value="'.$row['id'].'">'.$row['name'].'</option>';
  }
}
return '<select name="vendors">'.$options.'</select>';
```
