# Дерево ресурсов

Сниппет, который строит дерево ресурсов глубиной в 2 уровня, от указанного родителя.

```php
<?php
$parent = 3;
$exclude_parents = array(100500,123456);
$template = 4;

$ids = $modx->getChildIds($parent));
$q = $modx->newQuery('modResource', array('parent:IN' => $ids, 'OR:id:IN' => $ids));
$q->andCondition(array('id:NOT IN' => $exclude_parents, 'template' => $template));
$q->select('id,pagetitle,parent');
$resources = array();
if ($q->prepare() && $q->stmt->execute()) {
  while ($row = $q->stmt->fetch(PDO::FETCH_ASSOC)) {
    if ($row['parent'] == $parent) {
      if (isset($resources[$row['id']])) {
        $resources[$row['id']] = array_merge($resources[$row['id']], $row);
      }
      else {
        $resources[$row['id']] = $row;
        $resources[$row['id']]['children'] = array();
      }
    }
    else {
      $resources[$row['parent']]['children'][$row['id']] = $row;
    }
  }
}
echo'<pre>';
print_r($resources);
die;
```
