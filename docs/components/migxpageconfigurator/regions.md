# Разная информация по регионам

## Пример реализации мультирегиональности

Рассмотрим реализацию мультирегиональности на примере взаимодействия с компонентом cityFields. Создаём TV `city_id`. Возможные значения

```sql
@SELECT `name`,`id` FROM `[[++table_prefix]]cf_cities` ORDER BY `active` ASC
```

Дальше предположим, что есть ресурс `Доставка`, условия доставки отличаются в зависимости от города. Поэтому создаем дочерние ресурсы по отношению к ресурсу `Доставка`:

* Доставка в Москве;
* Доставка в Майкопе.
  У каждого выбираем соответствующий город в `city_id`. Сохраняем. Плагин на сохранение создаст необходимый плейсхолдер.

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
```

А потом просто меняем код основного шаблона на этот

```fenom
{extends 'file:elements/pages/wrapper.tpl'}
{block 'content'}
  {set $plsName = 'cf.' ~ $_modx->resource.alias}
  {set $path = '!getParsedConfigPath' | snippet : ['rid' => $_modx->getPlaceholder($plsName)]}
  {include $path}
{/block}
```
