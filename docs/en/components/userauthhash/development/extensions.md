# Extensions

Use in other components:

## Create auth hash

```php
$options = [
  'user' => 'test@gmail.com',
  'lifeTime' => '1m' // hash lifetime 1 month
];
/** @var UserAuthHash $UserAuthHash */
if ($UserAuthHash = $modx->getService('userauthhash.UserAuthHash', '', MODX_CORE_PATH.'components/userauthhash/model/')) {
  $hash = $UserAuthHash->getAuthHash($options);
}
```

## Remove auth hash

```php
$options = [
  'user' => 'test@gmail.com',
];
/** @var UserAuthHash $UserAuthHash */
if ($UserAuthHash = $modx->getService('userauthhash.UserAuthHash', '', MODX_CORE_PATH.'components/userauthhash/model/')) {
  $hash = $UserAuthHash->removeAuthHash($options);
}
```
