---
title: PHP API
description: Programmatic access to Sendex newsletters from MODX snippets and plugins
---
# PHP API

Sendex has no public REST API. Use xPDO models and `sx*` classes from MODX context (snippet, plugin, cron).

## Bootstrap

Cron and the connector load bootstrap automatically. In custom code:

```php
$corePath = $modx->getOption('sendex_core_path', null, MODX_CORE_PATH . 'components/sendex/');
require_once $corePath . 'bootstrap.php';
sendexBootstrap($modx);
```

## sxNewsletter

```php
/** @var sxNewsletter $newsletter */
$newsletter = $modx->getObject('sxNewsletter', 1);
if (!$newsletter) {
    return;
}
```

| Method | Description |
| --- | --- |
| `subscribe($userId, $email, $source)` | Subscribe; `$source`: `snippet`, `ajax`, `confirm`, `mgr`, `guest` |
| `unSubscribe($code, $source)` | Unsubscribe by `sxSubscriber.code` |
| `confirmEmail($hash)` | Confirm guest after link click |
| `isSubscribed($userId, $email)` | Subscriber ID or `0` |
| `addQueues()` | Build queue for all newsletter subscribers |
| `sendToSubscribers($options)` | `addQueues()` + `flush()` in one call |

### Subscribe a user from a plugin

```php
$newsletter = $modx->getObject('sxNewsletter', 1);
$result = $newsletter->subscribe($modx->user->id, '', 'mgr');
// true | false | string (error / Before event cancel message)
```

### Send a newsletter

```php
$newsletter = $modx->getObject('sxNewsletter', 1);
$result = $newsletter->sendToSubscribers([
    'stopOnError' => true,
]);
// ['success' => bool, 'message' => string, 'queued' => int, 'sent' => int, ...]
```

## sxQueueSender

Low-level queue delivery (cron uses the same class):

```php
require_once MODX_CORE_PATH . 'components/sendex/model/sendex/sxqueuesender.class.php';

$stats = sxQueueSender::flush($modx, [
    'limit'     => (int) $modx->getOption('sendex_queue_limit', null, 100),
    'logErrors' => true,
    'criteria'  => ['newsletter_id' => 1], // optional
]);
// ['sent' => int, 'skipped' => int, 'failed' => int, 'firstError' => string|null]
```

Single row:

```php
$queue = $modx->getObject('sxQueue', 42);
$result = sxQueueSender::sendOne($queue);
// true | false (skip) | string (mail error)
```

## What is not in the API

- `$queue->send()` on `sxQueue` — use `sxQueueSender::sendOne()`
- HTTP endpoint for subscription — only the `Sendex` snippet on the site
- Automatic table removal on uninstall

## Events

Every `subscribe`, `unSubscribe`, `addQueues`, `flush` call fires `sxOn*` events. See [Events](events).

## Related

- [Email queue](../interface/queue) — manager and cron
- [FAQ](../faq) — common send failures
- [Sendex snippet](../snippets/sendex) — front-end subscription
