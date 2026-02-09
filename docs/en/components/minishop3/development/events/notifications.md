---
title: Notification events
---
# Notification events

Events for the notification system: sending, modifying, registering channels.

## msOnBeforeSendNotification

Fired **before** sending a notification. Lets you modify data or cancel sending.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `notification` | `NotificationInterface` | Notification object |
| `channel` | `ChannelInterface` | Send channel |
| `recipient` | `array` | Recipient data |

### Aborting the operation

If the plugin returns non-empty output, sending is cancelled:

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeSendNotification':
        $notification = $scriptProperties['notification'];
        $recipient = $scriptProperties['recipient'];
        $channel = $scriptProperties['channel'];

        // Disallow sending at night
        $hour = (int)date('G');
        if ($hour >= 23 || $hour < 8) {
            $modx->event->output('Notification sending is paused');
            return;
        }

        // Block temporary emails
        if (isset($recipient['email'])) {
            $blockedDomains = ['tempmail.com', 'throwaway.com'];
            $domain = substr($recipient['email'], strpos($recipient['email'], '@') + 1);
            if (in_array($domain, $blockedDomains)) {
                $modx->event->output('Blocked email domain');
                return;
            }
        }
        break;
}
```

### Modifying data

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeSendNotification':
        $notification = $scriptProperties['notification'];
        $recipient = $scriptProperties['recipient'];

        // Add data to notification
        $context = $notification->getContext();
        $context['custom_field'] = 'value';
        $context['sent_at'] = date('Y-m-d H:i:s');

        // Change recipient
        if ($recipient['type'] === 'manager' && empty($recipient['email'])) {
            $recipient['email'] = 'default-manager@example.com';
        }
        break;
}
```

---

## msOnAfterSendNotification

Fired **after** sending a notification (success or failure).

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `notification` | `NotificationInterface` | Notification object |
| `channel` | `ChannelInterface` | Channel |
| `recipient` | `array` | Recipient data |
| `success` | `bool` | Send result |
| `error` | `string\|null` | Error message (if any) |

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnAfterSendNotification':
        $notification = $scriptProperties['notification'];
        $channel = $scriptProperties['channel'];
        $recipient = $scriptProperties['recipient'];
        $success = $scriptProperties['success'];
        $error = $scriptProperties['error'];

        // Log
        if ($success) {
            $modx->log(modX::LOG_LEVEL_INFO, sprintf(
                '[Notification] Sent: %s → %s (%s)',
                get_class($notification),
                $recipient['email'] ?? $recipient['phone'] ?? 'unknown',
                get_class($channel)
            ));
        } else {
            $modx->log(modX::LOG_LEVEL_ERROR, sprintf(
                '[Notification] Error: %s → %s: %s',
                get_class($notification),
                $recipient['email'] ?? $recipient['phone'] ?? 'unknown',
                $error
            ));
        }
        break;
}
```

---

## msOnRegisterNotificationChannels

Fired when registering notification channels. Lets you add custom channels.

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `manager` | `NotificationManager` | Notification manager |

### Registering a custom channel

```php
<?php
switch ($modx->event->name) {
    case 'msOnRegisterNotificationChannels':
        /** @var \MiniShop3\Notifications\NotificationManager $manager */
        $manager = $scriptProperties['manager'];

        // Register Telegram channel
        $manager->registerChannel('telegram', function($modx) {
            return new MyTelegramChannel($modx);
        });

        // Register Push channel
        $manager->registerChannel('push', function($modx) {
            return new MyPushChannel($modx);
        });
        break;
}
```
