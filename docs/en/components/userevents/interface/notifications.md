# Notifications

Not implemented yet.

If `submitAction` is set to `order`, the **minishop** notification mechanism is used.

If `submitAction` is set to `event`, the event is created directly without a **minishop** order. In that case you must implement notifications yourself.

Example: email notification for event `UserEventsOnChangeStatus`

```php
<?php
/** @var modX $modx */
/** @var array $scriptProperties */

switch ($modx->event->name) {

    // notification on event status change
  case "UserEventsOnChangeStatus":
    /** @var UserEvent $event */
    /** @var msOrder $order */
    /** @var modUser $user */
    $event = $modx->getOption("instance", $scriptProperties);
    $order = $modx->getOption("order", $scriptProperties);
    if (!$event OR !$status = $event->getOne("Status") OR !$user = $event->getOne("User") OR !$profile = $event->getOne("UserProfile")) {
      return;
    }
    $pls = array_merge($event->toArray(), array(
      "status"  => $status->toArray(),
      "user"    => $user->toArray(),
      "profile" => $profile->toArray(),
    ));
    // get event options
    $options = $modx->getOption("options", $pls);
    $action = $modx->getOption("action", $options);

    /** @var UserEvents $UserEvents */
    if (!$UserEvents = $modx->getService("userevents")) {
      return;
    }
    /** @var pdoTools $pdoTools */
    if (!$pdoTools = $modx->getService("pdoTools")) {
      return;
    }

    // if event was created with minishop order do nothing
    if (!empty($order)) {
      return;
    }

    $status = $modx->getOption("status", $scriptProperties);
    switch ($status) {
      // active, cancelled
      case 2:
      case 4:
        $subject = $pdoTools->getChunk('@INLINE [[++site_name]]', $pls);
        $body = $pdoTools->getChunk('@INLINE [[%userevents_event]] - {$status.name}', $pls);

        $UserEvents->sendEmail($profile->get("email"), $subject, $body, true);
        break;
    }

    break;
}
```
