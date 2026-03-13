# Upload existing users to RetailCRM

## Purpose

When you connect RetailCRM to an existing store, there are usually registered users and orders already. Uploading this data lets RetailCRM compute more accurate analytics and at least show how many purchases each customer has made.

## Step-by-step

1. By this point modRetailCRM should be purchased, connected to the store, and configured (API key, site code, CRM URL). If not done yet, go back to the component presetup.

2. If you have relatively few users (e.g. under a hundred), you can run the following in the MODX Console component in the manager:

```php
if (!$modRetailCrm = $modx->getService(
  'modretailcrm',
  'modRetailCrm',
  MODX_CORE_PATH . 'components/modretailcrm/model/modretailcrm/',
  array($modx)
)) {
  $modx->log(modX::LOG_LEVEL_ERROR, '[modRetailCrm] - Not found class modRetailCrm');
  return;
}

$q = $modx->newQuery('modUser');
$limit = 50;
$offset = 0;
$q->limit($limit, $offset);
$users = $modx->getIterator('modUser', $q);
// Upload one by one
foreach($users as $user) {
  $modRetailCrm->OnUserSave($user, 'new');
}
```

That is all. For large databases it is more efficient to put this code in a separate PHP file and run it from the server console. Do not forget to bootstrap MODX at the start. If you are not sure how, see [this](https://modx.pro/development/3163).

## Possible errors

If something goes wrong and the upload fails, first check that modRetailCRM system settings are filled, then debug the RetailCRM response. To do that, enable system setting **modretailcrm_log** after the RetailCRM request line.
