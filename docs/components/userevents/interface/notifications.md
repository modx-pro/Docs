# Оповещения

Не реализованы.

Если `submitAction` указан как `order` сработает механизм оповещений **minishop**.

Если `submitAction` указан как `event` событие будет создано напрямую без заказа **minishop**.
В этом случае оповещения необходимо написать самостоятельно.

Пример оповещения с помощью email на событие `UserEventsOnChangeStatus`

```php
<?php
/** @var modX $modx */
/** @var array $scriptProperties */

switch ($modx->event->name) {

    // оповещение на смену статуса события
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
    // получаем опции события
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

    // если событие создано с заказом minishop ничего не делаем
    if (!empty($order)) {
      return;
    }

    $status = $modx->getOption("status", $scriptProperties);
    switch ($status) {
      // активно, отменено
      case 2:
      case 4:
        $subject = $pdoTools->getChunk('@INLINE {"site_name"|option} {do 1}', $pls);
        $body = $pdoTools->getChunk('@INLINE {"userevents_event"|lexicon} - {$status.name}', $pls);

        $UserEvents->sendEmail($profile->get("email"), $subject, $body, true);
        break;
    }

    break;
}
```
