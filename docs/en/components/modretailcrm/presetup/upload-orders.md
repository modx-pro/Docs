# Upload existing orders to RetailCRM

## Purpose

When connecting RetailCRM to an existing store, you already have orders. Uploading them improves RetailCRM analytics and shows purchase history per customer.

## Steps

1. modRetailCRM must be installed and configured (API key, site code, CRM URL). See presetup in the main docs.

2. If you have few orders (e.g. under a hundred), run this in the MODX Console component:

```php
<?php
if (!$modRetailCrm = $modx->getService(
  'modretailcrm',
  'modRetailCrm',
  MODX_CORE_PATH . 'components/modretailcrm/model/modretailcrm/',
  array($modx)
)) {
  $modx->log(modX::LOG_LEVEL_ERROR, '[modRetailCrm] - Not found class modRetailCrm');
  return;
}

$q = $modx->newQuery('msOrder');
$limit = 50;
$offset = 0;
$q->limit($limit, $offset);
$orders = $modx->getIterator('msOrder', $q);
foreach($orders as $msOrder) {
  $modRetailCrm->msOnCreateOrder($msOrder);
}
```

For large databases, move this into a PHP script and run from the server console. Bootstrap MODX at the start of the script. See [MODX bootstrap](https://modx.pro/development/3163).

## Troubleshooting

- Check modRetailCRM system settings.
- Try a smaller batch (e.g. `$limit = 1`).
- Enable **modretailcrm_log** and check MODX and RetailCRM responses.
