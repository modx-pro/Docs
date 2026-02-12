# Quick start

Because many products are created, "quick" is relative, but the setup is kept as simple as possible.

## Installation and setup

Best to import on a fresh empty site, since the import creates the catalog structure from the first service used.

1. Install miniShop2, msOptionsPrice2, and allGifts.

2. Create a category template and set `ms2_template_category_default`.

3. Create a product template and set `ms2_template_product_default` and `msoptionsprice_working_templates`.

4. Enable `ms2_product_id_as_alias` if possible.

5. Set system settings:
   - `msoptionsprice_allow_zero_count` = Yes
   - `msoptionsprice_allow_zero_mass` = Yes

6. Create the miniShop2 options needed for import and set their keys in allGifts system settings under "Fields" — <https://prnt.sc/pfgu08>. For a quick setup you can [run the script](#script-for-quick-option-creation) via the Console component.

7. If you added a field for stock, put its key (without `options-`) in `msoptionsprice_exclude_modification_options`. **Optional from 1.3.7.**

8. In the component system settings, set API credentials for the import services.

Setup is done; next step is running the import.

### Script for quick option creation

Make sure your existing options do not conflict with the script list!

```php
<?php
$modx->setLogLevel(xPDO::LOG_LEVEL_FATAL);
$ms2 = $modx->getService('miniShop2');
$categories = [];
$q = $modx->newQuery('msCategory', ['class_key' => 'msCategory'])->select('id');
if ($q->prepare()->execute()) {
  $categories = @$q->stmt->fetchAll(PDO::FETCH_COLUMN)?:[];
}
foreach ([
  'size' => null,
  'color' => null,
  'stocks' => [
    'caption' => 'Warehouses',
    'type' => 'combo-options',
  ],
  'gender' => [
    'caption' => 'Gender',
    'type' => 'combo-options',
  ],
  'brand' => [
    'caption' => 'Brand',
    'type' => 'combo-options',
  ],
  'material' => [
    'caption' => 'Material',
    'type' => 'combo-options',
  ],
  'product_size' => [
    'caption' => 'Product sizes',
    'type' => 'combo-options',
  ],
  'density' => [
    'caption' => 'Density',
    'type' => 'combo-options',
  ],
  'branding' => [
    'caption' => 'Print type',
    'type' => 'combo-options',
  ],
  'memory' => [
    'caption' => 'Memory size',
    'type' => 'combo-options',
  ],
  'dating' => [
    'caption' => 'Dating',
    'type' => 'combo-options',
  ],
  'calendars' => [
    'caption' => 'Calendars',
    'type' => 'combo-options',
  ],
  'type_caps' => [
    'caption' => 'Cap type',
    'type' => 'combo-options',
  ],
  'migalki' => [
    'caption' => 'Blinkers',
    'type' => 'combo-options',
  ],
  'packing' => [
    'caption' => 'Packaging',
    'type' => 'combo-options',
  ],
  'group' => [
    'caption' => 'Product group',
    'type' => 'textfield',
  ],
  'main_product' => [
    'caption' => 'Main product in group',
    'type' => 'combo-boolean',
  ],
  'source' => [
    'key' => 'service',
    'caption' => 'Source',
    'type' => 'textfield',
  ],
  'count' => [
    'key' => 'instock',
    'caption' => 'Stock quantity',
    'type' => 'numberfield',
  ],
  'reserves' => [
    'caption' => 'Reserved',
    'type' => 'numberfield',
  ],
] as $key => $field) {
  if (!empty($field)) {
    if (!isset($field['key'])) {
      $field = array_merge(['key' => $key], $field);
    }
    if ($option = $modx->getObject('msOption', ['key' => $field['key']])) {
      $field['id'] = $option->get('id');
      print_r('Option ' . $field['key'] . ' already exists.' . PHP_EOL);
    } else {
      $modx->error->reset();
      $response = $ms2->runProcessor('mgr/settings/option/create', array_merge([
        'category' => 0,
      ], $field));
      $response = $response->getObject();
      if (!empty($response['id'])) {
        $field['id'] = $response['id'];
        print_r('Option ' . $field['key'] . ' created.' . PHP_EOL);
      } else {
        print_r('Stopped! Failed to create option ' . $field['key'] . '. Error: ' . print_r(@$modx->error->errors[0]['msg'], 1));
        continue;
      }
    }
    if (!empty($field['id'])) {
      foreach ($categories as $category_id) {
        if (!$modx->getCount('msCategoryOption', [
          'option_id' => $field['id'],
          'category_id' => $category_id,
          'active' => true,
        ])) {
          $modx->error->reset();
          $ms2->runProcessor('mgr/settings/option/assign', [
            'option_id' => $field['id'],
            'category_id' => $category_id,
            'value' => '',
          ]);
        }
      }
    }
    if ($modx->getCount('msOption', ['key' => $field['key']])) {
      if ($setting = $modx->getObject('modSystemSetting', ['key' => 'ag_field_' . $key])) {
        $setting->set('value', 'options-' . $field['key']);
        $setting->save();
      }
    }
  } else {
    if ($setting = $modx->getObject('modSystemSetting', ['key' => 'ag_field_' . $key])) {
      $setting->set('value', $key);
      $setting->save();
    }
  }
}
```

## Running

::: warning
**Run the script as the user that runs the site!**

If you run as root or another user, cache directories may get wrong permissions and MODX will report errors when trying to delete cache files.

If you are logged in as root or via sudo, prefix the command with `sudo -u{user}`:

```bash
sudo -u{user} php script.php
```

where `{user}` is the system user that runs the site; otherwise omit `sudo -u{user}`.
:::

First run a categories-only import to create the catalog structure (e.g. from Gifts.ru). In the terminal:

```bash
php /path_to_site/core/components/allgifts/cron/import/run.php --service=giftsru --categories=1
```

A full product import can take 5–10 hours. Wait for it to finish.

When the first import with catalog structure is done, add a cron job, e.g.:

```shell
0 2 * * * sudo -u{user} php /path_to_site/core/components/allgifts/cron/import/run.php --log=0 --service=giftsru
```

Replace `{user}` with the user that runs the site.
