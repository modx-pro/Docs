# Расширения

Доступны следующие расширения:

## Клиент `client`

- `getPls` - получить данные клиента
- `getClientEmails` - получить почту клиента
- `getManagerEmails` - получить почту менеджера клиента
- `getClientLang` - получить язык клиента
- `changeStatus` - сменить статус клиента
- `changeSubscription` - сменить подписку клиента

## Контент `content`

- `getPls` - получить данные контента
- `getClientEmails` - получить почту контента
- `getManagerEmails` - получить почту менеджера контента
- `changeStatus` - сменить статус контента
- `getRate` - получить тариф контента
- `getRates` - получить тарифы контента

## Подписка `subscription`

- `getPls` - получить данные подписки
- `getClientEmails` - получить почту подписки
- `getManagerEmails` - получить почту менеджера подписки
- `changeStatus` - сменить статус подписки
- `changeTerm` - сменить срок подписки

## Доступ `access`

- `getContentId` - получить идентификатор контента
- `getContentAccess` - получить доступ к контенту
- `getResourceAccess` - получить доступ к ресурсу

### Примеры

Необходимо создать **vip** клиента, который будет иметь доступ сразу ко всему контенту.

- создадим статус **vip** для клиента
- изменим метод `getResourceAccess` для проверки доступа к ресурсу. Для этого создадим плагин на событие `OnMODXInit`

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
          // получаем клиента и если статус == 4 vip сразу разрешаем доступ независимо от контента ресурса
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
```
