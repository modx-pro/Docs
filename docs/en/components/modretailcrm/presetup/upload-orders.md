# Upload existing orders to RetailCRM

## Purpose

When you connect RetailCRM to an existing store, there are usually orders already in the system. Uploading this data lets RetailCRM compute more accurate analytics and at least show how many purchases each customer has made.

## Step-by-step

1. By this point modRetailCRM should be purchased, connected to the store, and configured. By configuration we mean API key, site code, and CRM URL, since we use the component here. If not done yet, go back to the component presetup.

2. If you have relatively few orders (e.g. under a hundred), you can run the following in the MODX Console component in the manager:

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
// How many orders to send per batch
$limit = 50;
// How many to skip from the start
$offset = 0;
$q->limit($limit, $offset);
$orders = $modx->getIterator('msOrder', $q);
// Upload one by one
foreach($orders as $msOrder) {
  $modRetailCrm->msOnCreateOrder($msOrder);
}
```

That is all. For large databases it is more efficient to put this code in a separate PHP file and run it from the server console. Do not forget to bootstrap MODX at the start of the file. If you are not sure how, see [this](https://modx.pro/development/3163).

## Possible errors

If something goes wrong and the upload fails, first check that modRetailCRM system settings are filled. Then try uploading fewer orders (e.g. set `$limit` to 1). If it still fails, enable error logging with system setting **modretailcrm_log**, run again and check the MODX error log.

RetailCRM usually describes errors clearly, so that is often enough to see what is missing or what went wrong.
