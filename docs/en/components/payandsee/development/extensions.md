# Extensions

The following extensions are available:

## Client `client`

- `getPls` — get client data
- `getClientEmails` — get client email
- `getManagerEmails` — get client manager email
- `getClientLang` — get client language
- `changeStatus` — change client status
- `changeSubscription` — change client subscription

## Content `content`

- `getPls` — get content data
- `getClientEmails` — get content email
- `getManagerEmails` — get content manager email
- `changeStatus` — change content status
- `getRate` — get content rate
- `getRates` — get content rates

## Subscription `subscription`

- `getPls` — get subscription data
- `getClientEmails` — get subscription email
- `getManagerEmails` — get subscription manager email
- `changeStatus` — change subscription status
- `changeTerm` — change subscription term

## Access `access`

- `getContentId` — get content ID
- `getContentAccess` — get content access
- `getResourceAccess` — get resource access

### Examples

Create a **vip** client that has access to all content:

- create a **vip** status for client
- override the `getResourceAccess` method to check resource access. Add a plugin for the `OnMODXInit` event:

```php
<?php

switch ($modx->event->name) {

  case 'OnMODXInit':
    /** @var PayAndSee $PayAndSee */
    $corePath = $modx->getOption('payandsee_core_path', null,
        $modx->getOption('core_path', null, MODX_CORE_PATH) . 'components/payandsee/');
    $PayAndSee = $modx->getService('payandsee', 'PayAndSee', $corePath . 'model/payandsee/',
        array('core_path' => $corePath));
    if (!$PayAndSee) {
      return;
    }

    $PayAndSee->addExtension('access', 'getResourceAccess', function ($rid = null, $uid = null, $cache = true) use (&$modx, &$PayAndSee) {
      $rid = (int)$rid;
      $uid = (int)$uid;
      $key = "rid_{$rid}|uid_{$uid}";
      if (!$cache OR ($access = $PayAndSee->getStore('access', $key)) === false) {
          // get client and if status == 4 vip allow access regardless of resource content
        if ($client = $modx->user->getOne('PasClient') AND $client->get('status') == 4) {
          $access = true;
        } else {
          $cid = $PayAndSee->getContentId($rid, 10, $cache);
          $access = $PayAndSee->getContentAccess($cid, $uid, $cache);
        }
        $PayAndSee->addStore('access', $key, $access);
      }

      return $access;
    });

    break;
}
?>
```
