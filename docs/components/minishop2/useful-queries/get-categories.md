# Вывод всех категорий товара

Сниппет выбирает и выводит все категории, к которым принадлежит товар — его можно использовать как своеобразные теги.

```php
<?php
if (empty($rid)) {$rid = $modx->resource->id;}
if (empty($pid)) {$pid = $modx->resource->parent;}
if (empty($delimeter)) {$delimeter = ' , ';}
$scheme = $modx->getOption('link_tag_scheme', null, 'full', true);

$q = $modx->newQuery('msCategory');
$q->leftJoin('msCategoryMember', 'msCategoryMember', array(
  '`msCategory`.`id` = `msCategoryMember`.`category_id`'
));
$q->sortby('pagetitle','ASC');
$q->groupby('id');
$q->select(array('id','pagetitle'));
$q->where('`msCategoryMember`.`product_id` = ' . $rid . ' OR `id` = ' . $pid);

$result = array();
if ($q->prepare() && $q->stmt->execute()) {
  while ($row = $q->stmt->fetch(PDO::FETCH_ASSOC)) {
    $url = $modx->makeUrl($row['id'], '', '', $scheme);
    $result[] = '<a href="' . $url . '">' . $row['pagetitle'] . '</a>';
  }
}
return implode($delimeter, $result);
```
