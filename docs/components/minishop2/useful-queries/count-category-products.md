# Вывод количества товаров в категории

Сниппет получает сумму всех товаров в категории, с учетом мультикатегорий MS2. Можно указать нужную категорию параметром `$parent`.

```php
<?php
if (empty($parent)) {$parent = $modx->resource->id;}
$pids = array_merge(array($parent), $modx->getChildIds($parent));
$ids = array();

$q = $modx->newQuery('msProduct');
$q->where(array('class_key' => 'msProduct','parent:IN' => $pids,'published' => 1,'deleted' => 0));
$q->select('`msProduct`.`id`');
if ($q->prepare() && $q->stmt->execute()) {
  $ids = $q->stmt->fetchAll(PDO::FETCH_COLUMN);
}

$q = $modx->newQuery('msProduct');
$q->leftJoin('msCategoryMember', 'Member', '`Member`.`product_id` = `msProduct`.`id`');
$q->where(array('class_key' => 'msProduct','Member.category_id:IN' => $pids,'published' => 1,'deleted' => 0));
$q->select('`msProduct`.`id`');
if ($q->prepare() && $q->stmt->execute()) {
  $ids2 = $q->stmt->fetchAll(PDO::FETCH_COLUMN);
  if (!empty($ids2)) {
    $ids = array_unique(array_merge($ids, $ids2));
  }
}

return count($ids);
```
