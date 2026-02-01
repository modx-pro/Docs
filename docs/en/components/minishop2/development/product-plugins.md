# Product plugins

As you know, the MODX resource table has a fixed set of fields: `pagetitle`, `longtitle`, `content`, etc.
If you need something extra, TV parameters are the "default mechanism" for that.
They are very flexible and advanced, but have some drawbacks:

- All fields in the DB are of type text. That means slow search and sorting.
- TVs are bound to a template; you cannot work with them without a template.
- They run @EVAL and @SELECT bindings, which can execute unsafe code.
- Extra queries are needed when fetching resources.

Since any product must have a required set of properties (price, sku, weight, etc.), miniShop2 uses an additional table for them.

In it, all fields have the right type, indexes and relations to other tables are set.
In MODX it is represented by the **msProductData** object, which is tightly bound to **msProduct**.

For example, you can do:

```php
if ($data = $modx->getObject('msProductData', 15)) {
  $vendor = $product->getOne('Vendor'); // Product vendor object linked to the product
  $options = $product->getMany('Options'); // Array of product option objects
  $files = $product->getMany('Files'); // Array of product image objects
  $product = $data->getOne('Product'); // Resource the object is linked to
}
```

Moreover, the **msProduct** object effectively forwards requests to **msProductData**.
So we can get product properties directly from it:

```php
if ($product = $modx->getObject('msProduct', 15)) {
  echo $product->get('price');
  $product->set('price', 500);
  $product->save();
}
```

This extra table is very convenient. But the number of fields in it is also limited.
What if we need to add or change 10 fields?

The first option is obvious — use TV parameters. Nobody is taking that away; you can use it as you like.
But we are more interested in the second option — the product plugin system.

## How it works

First, note that miniShop2 plugins/extensions and MODX plugins are two fundamentally different things.
What is the difference?

In MODX, plugins are created in the element tree in advance and react to events fired by scripts.
No event — no plugin work; it's that simple.

miniShop2 plugins are special files placed in the right locations. They are always loaded when the ms2 class starts, and that class starts when MODX starts.
So **the MS2 plugin runs all the time**, and what it does does not need to be enabled or activated separately.

miniShop2 plugins can add data to the `modX::map` object map and to the `miniShop2.plugin` javascript object.

The object map is for PHP logic (getting and saving data to the DB), and javascript is for adding/changing fields in the manager.

So the plugin controller must return an array with two keys:

- **map** - array of miniShop2 objects with files to load the changes.
- **manager** - array of file paths to load in the manager.

In general, the plugin controller looks like this:

```php
<?php

return array(
  'map' => array(
    'msProductData' => require_once 'msproductdata.inc.php',
  ),
  'manager' => array(
    'msProductData' => MODX_ASSETS_URL . 'components/msplcolor/msproductdata.js',
  ),
);
```

Our plugin's goal is to change the standard **color** field in the product model.
In the original, this field is meant for a list of possible colors, which not everyone needs, so we turn the native **json** type into **string**.

## Extending the model

Everything needed to change the model is loaded from `msproductdata.inc.php`:

```php
<?php

return array(
  'fields' => array(
    'color' => null,
  ),
  'fieldMeta' => array(
    'color' => array(
      'dbtype' => 'varchar',
      'precision' => '255',
      'phptype' => 'string',
      'null' => true,
      'default' => null,
    ),
  ),
  'indexes' => array(
    'color' => array(
      'alias' => 'color',
      'primary' => false,
      'unique' => false,
      'type' => 'BTREE',
      'columns' => array(
        'color' => array(
          'length' => '',
          'collation' => 'A',
          'null' => false,
        ),
      ),
    ),
  ),
);
```

So we extend the product model **without changing the schema/model in the source**, on the fly. If the plugin is enabled, the product has one set of properties; if disabled — another.
ms2 updates do not touch these plugins, and you can implement your own logic.

To change the product model you only need to specify the parameter array. See MODX and ms2 **.map** files for detailed examples.

Changing the MODX model does not affect the physical DB, so you need to change the column type there too, e.g. via SQL:

```sql
ALTER TABLE `modx_ms2_products` CHANGE `color` `color` VARCHAR(255) NULL DEFAULT NULL;
```

Since our plugin defines an index on the changed field — add it as well:

```sql
ALTER TABLE `modx_ms2_products` ADD INDEX (`color`);
```

## Extending the manager

We load the manager changes from `msproductdata.js`.
In this file we add a new object with two methods to `miniShop2.plugin`:

```js
miniShop2.plugin.color = {
  // Changing fields for the product panel
  getFields: function () {
    return {
      color: {
        xtype: 'minishop2-combo-autocomplete',
        description: '<b>[[+color]]</b><br />' + _('ms2_product_color_help')
      }
    }
  },
  // Changing product table columns in the category
  getColumns: function () {
    return {
      color: {
        width: 50,
        sortable: false,
        editor: {
          xtype: 'minishop2-combo-autocomplete',
          name: 'color'
        }
      }
    }
  }
};
```

You can use any standard xtype, or declare your own in the same file; you are not restricted.
The example uses the **autocomplete** type from ms2, which suggests matches from the **color** field of other products as you type.

When manager pages load, ms2 scripts call methods from this object and apply your changes.
Browsers cache javascript, so remember to clear the cache.

## Connecting plugins

To connect plugins, the system only needs the path to your controller.
There are two ways to do it.

The old, **not recommended** way — put your controller in `MODX_CORE_PATH . 'components/minishop2/plugins/pluginname/'`.
It must return paths for connecting the model and manager changes; you are free to put those files anywhere.

The new, recommended and convenient way for third-party add-ons — use the API methods.
Plugin registration:

```php
if ($miniShop2 = $modx->getService('miniShop2')) {
  $miniShop2->addPlugin('msplColor', '{core_path}components/msplcolor/index.php');
}
```

You need to specify the name and path to the controller. You can use placeholders in the path: `{base_path}`, `{core_path}` and `{assets_path}`.

Removing a plugin

```php
if ($miniShop2 = $modx->getService('miniShop2')) {
  $miniShop2->removePlugin('msplColor');
}
```

All changes to DB tables must be done by you when registering and removing plugins.

## Example

The miniShop2 plugin system allows shipping ready-made components for easy install/removal of new product properties.

I published the source of such a component that changes the product color field [as an example on GitHub][1].
You can [download the built package there as well][2].
If you are developing plugins, pay attention to [resolvers][3]: one updates lexicon entries, the other the DB table.

::: danger
Installing the component clears the `color` field on products! Do not experiment on a live project!
:::

[1]: https://github.com/bezumkin/msplColor
[2]: https://github.com/bezumkin/msplColor/releases/download/1.0.0-pl/msplcolor-1.0.0-pl.transport.zip
[3]: https://github.com/bezumkin/msplColor/tree/1.0.0-pl/_build/resolvers
