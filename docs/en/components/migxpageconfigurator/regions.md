# Region-specific content

## Multi-region example

Example of multi-region setup using the cityFields component. Create a TV `city_id`. Possible values:

```sql
@SELECT `name`,`id` FROM `[[++table_prefix]]cf_cities` ORDER BY `active` ASC
```

Suppose there is a "Delivery" resource and delivery terms depend on the city. Create child resources under "Delivery":

* Delivery in Moscow;
* Delivery in Maikop.

For each, select the city in `city_id` and save. The save plugin will create the needed placeholder.

```php
<?php
$hidemenu = $resource->get('hidemenu');
$published = $resource->get('published');
$parent = $resource->get('parent');
$city_id = $resource->getTVValue('city_id');

// EVENTS
switch ($modx->event->name) {
  case 'OnDocFormDelete':
    if ($hidemenu && !$published && !in_array($parent, array(0, 2, 9, 40, 41, 42))) {
      $modx->addPackage('cityfields', MODX_CORE_PATH . 'components/cityfields/model/');
      if ($parentResource = $modx->getObject('modResource', $parent)) {
        $alias = $parentResource->get('alias');
        if ($field = $modx->getObject('cfField', array('placeholder' => $alias))) {
          $field->remove();
        }
      }
    }
    break;

  case 'OnResourceUndelete':
  case 'OnDocFormSave':
    if ($hidemenu && !$published && !in_array($parent, array(0, 2, 9, 40, 41, 42))) {
      $modx->addPackage('cityfields', MODX_CORE_PATH . 'components/cityfields/model/');
      if ($parentResource = $modx->getObject('modResource', $parent)) {
        $alias = $parentResource->get('alias');
        if (!$modx->getCount('cfField', array('placeholder' => $alias, 'city_id' => $city_id))) {
          $field = $modx->newObject('cfField');
          $field->fromArray(array(
            'city_id' => $city_id,
            'placeholder' => $alias,
            'value' => $id
          ), '', true);
          $field->save();
        }
      }
    }
    break;
}
?>
```

Then update the main template to:

```fenom
{extends 'file:elements/pages/wrapper.tpl'}
{block 'content'}
  {set $plsName = 'cf.' ~ $_modx->resource.alias}
  {set $path = '!getParsedConfigPath' | snippet: ['rid' => $_modx->getPlaceholder($plsName)]}
  {include $path}
{/block}
```
