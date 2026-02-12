# Product filtration example

[miniShop2][1] works with any columns of the product properties table, and [mSearch2][2] can fetch any columns and build filters from them.

Combining these, we can add a stock filter and learn how to add custom product fields and custom filters.

## Extending product: new field availability

First read about [extending miniShop2 products][3].

Then add a new column **availability** INT(10) to the msProductData table.

![](https://file.modx.pro/files/5/0/b/50b2b7853493cc3e400ffc7719ce7a72.png)
![](https://file.modx.pro/files/6/2/6/6262c3163e205ef7f7bccce915014492.png)

Add the new field to the product model at `/core/components/minishop2/plugins/availability/model/`:

::: code-group

```php [msproductdata.map.inc.php]
<?php

return array(
  'fields' => array(
    'availability' => 0
  ),
  'fieldMeta' => array(
    'availability' => array(
      'dbtype' => 'integer',
      'precision' => '10',
      'phptype' => 'integer',
      'null' => true,
      'default' => 0
    )
  )
);
```

:::

Add ExtJS widgets for this field in the manager at `/assets/components/minishop2/plugins/availability/`:

::: code-group

```js [msproductdata.js]
miniShop2.plugin.pluginname = {
  getFields: function (config) {
    return {
      availability: { xtype: 'numberfield', description: _('ms2_product_availability_help') }
    }
  },
  getColumns: function () {
    return {
      availability: {width:50, sortable:true, editor: {xtype:'numberfield'}}
    }
  }
};
```

:::

Register the plugin with an index file at `/core/components/minishop2/plugins/availability/`:

::: code-group

```php [index.php]
<?php
//
return array(
  'xpdo_meta_map' => array(
    'msProductData' => require_once dirname(__FILE__) .'/model/msproductdata.map.inc.php'
  ),
  'manager' => array(
    'msProductData' => MODX_ASSETS_URL . 'components/minishop2/plugins/availability/msproductdata.js'
  )
);
```

:::

Add a lexicon entry, clear cache, and enable the new field in settings.

If it does not work, repeat the steps. When it works you will see the new column in the product grid.

## Adding a filter for the new field

**availability** is now a native product field like price and weight. Enable it simply:

```modx
[[!mFilter?
  &filters=`ms|availability:availability`
]]
```

This will show checkboxes with numeric availability values (0, 5, 10, etc.). A price slider does not fit here; radio buttons do:

```modx
[[!mFilter?
  &filters=`ms|availability:availability`
  &suggestionsRadio=`ms|availability`
  &tplFilter.row.ms|availability=`tpl.mFilter2.filter.radio`
]]
```

Add the lexicon entry in mSearch2, clear cache, and refresh. Set availability on products and you will see the filter column.

We need a custom filter method that outputs: in stock / out of stock.

## Extending the filter class

Standard mSearch2 filters are in `/core/components/msearch2/model/msearch2/filters.class.php`. Extend it and set the new class in system settings.

Create `/core/components/msearch2/custom/filters/custom.class.php`:

```php
<?php
class myCustomFilter extends mse2FiltersHandler {}
```

Set it in **mse2_filters_handler_class**. From then on mSearch2 uses your filter class; you can add or override methods.

Data is fetched with get**MethodName**Values(), filters are built with build**MethodName**Filter(), and filtering is done with filter**MethodName**. See filters.class.php for examples.

## Adding the availability filter

We need buildAvailabilityFilter and filterAvailability to split products into "in stock" (availability > 0) and "out of stock" (availability <= 0).

```php
<?php
class myCustomFilter extends mse2FiltersHandler {

  // Based on buildBooleanFilter
  public function buildAvailabilityFilter(array $values) {
    if (count($values) < 2 && empty($this->config['showEmptyFilters'])) {
      return array();
    }

    $results = array();
    foreach ($values as $value => $ids) {
      $title = ($value <= 0)
        ? $this->modx->lexicon('mse2_filter_availability_no')
        : $this->modx->lexicon('mse2_filter_availability_yes');

      $value = $value <= 0 ? '0' : '1';

      if (!isset($results[$value])) {
        $results[$value] = array(
          'title' => $title
          ,'value' => $value
          ,'type' => 'availability'
          ,'resource' => array()
        );
      }

      foreach ($ids as $id) {
        $results[$value]['resources'][] = $id;
      }
    }

    ksort($results);
    return $results;
  }


  // Filtering logic, based on filterNumber
  public function filterAvailability(array $requested, array $values, array $ids) {
    $matched = array();

    $value = $requested[0];
    $tmp = array_flip($ids);
    foreach ($values as $number => $resources) {
      if ($value && $number > 0) {
        foreach ($resources as $id) {
          if (isset($tmp[$id])) {
            $matched[] = $id;
          }
        }
      }
      elseif (!$value && $number <= 0) {
        foreach ($resources as $id) {
          if (isset($tmp[$id])) {
            $matched[] = $id;
          }
        }
      }
    }

    return $matched;
  }
}
```

Add lexicon keys **mse2_filter_availability_no** and **mse2_filter_availability_yes** and you get the desired filter. You can keep it as checkboxes, change texts, etc.; the idea stays the same.

[1]: /en/components/minishop2/
[2]: /en/components/msearch2/
[3]: /en/components/minishop2/development/product-plugins
