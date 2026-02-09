# Upload existing users to RetailCRM

## Purpose

When connecting RetailCRM to an existing store, you already have registered users and orders. Uploading users improves RetailCRM analytics and shows purchase counts per customer.

## Steps

1. modRetailCRM must be installed and configured (API key, site code, CRM URL). See presetup in the main docs.

2. If you have few users (e.g. under a hundred), run this in the MODX Console component:

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
foreach($users as $user) {
  $modRetailCrm->OnUserSave($user, 'new');
}
```

For large databases, run from a PHP script with MODX bootstrapped. See [MODX bootstrap](https://modx.pro/development/3163).

## Troubleshooting

Check modRetailCRM system settings and enable **modretailcrm_log** to debug RetailCRM responses.
