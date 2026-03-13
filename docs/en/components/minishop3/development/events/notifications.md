---
title: Notification events
---
# Notification events

Events for the notification system: sending, modifying, registering channels.

## Built-in channels

MiniShop3 includes two notification channels out of the box:

| Channel | Class | Description |
|---------|-------|-------------|
| `email` | `EmailChannel` | Sends via MODX modMail |
| `telegram` | `TelegramChannel` | Sends via Telegram Bot API |

### Email channel

Uses standard MODX modMail. Templates are configured via chunks.

### Telegram channel

Sends messages via Telegram Bot API. Requires settings:
- `ms3_telegram_bot_token` — bot token
- `ms3_telegram_manager_chat_id` — recipient Chat ID

::: warning Telegram limitation
A Telegram bot cannot start a conversation with a user. The user must send the first message to the bot. So Telegram notifications only work for managers who have set their Chat ID in advance.
:::

### Sending Telegram notifications to customers

To send Telegram notifications to customers you need to:
1. Get customer consent for notifications
2. Link the customer’s Telegram account to their store profile
3. Store the customer’s Chat ID

#### Step 1: Add a field for Chat ID

Add a field to msCustomer to store Chat ID:

```sql
ALTER TABLE modx_ms3_customers ADD COLUMN telegram_chat_id VARCHAR(50) NULL;
```

Or use Extra Fields in MiniShop3 settings.

#### Step 2: Create a bot with Deep Linking

Use [Telegram Deep Linking](https://core.telegram.org/bots/features#deep-linking) to link the account:

```php
<?php
// Generate unique link for linking
$customerId = $msCustomer->get('id');
$token = hash('sha256', $customerId . $modx->getOption('ms3_snippet_token_secret'));
$linkCode = base64_encode($customerId . ':' . substr($token, 0, 16));

$botUsername = 'YourShopBot';
$telegramLink = "https://t.me/{$botUsername}?start={$linkCode}";
```

#### Step 3: Handle /start on the bot side

The bot must handle the `start` parameter and save the Chat ID:

```php
<?php
// Bot webhook handler (simplified)
$update = json_decode(file_get_contents('php://input'), true);
$message = $update['message'] ?? null;

if ($message && str_starts_with($message['text'], '/start ')) {
    $linkCode = substr($message['text'], 7);
    $decoded = base64_decode($linkCode);
    [$customerId, $tokenPart] = explode(':', $decoded);

    $expectedToken = hash('sha256', $customerId . $modx->getOption('ms3_snippet_token_secret'));
    if (substr($expectedToken, 0, 16) === $tokenPart) {
        $customer = $modx->getObject(\MiniShop3\Model\msCustomer::class, $customerId);
        if ($customer) {
            $customer->set('telegram_chat_id', $message['chat']['id']);
            $customer->save();
            // Send confirmation
            sendTelegramMessage($message['chat']['id'], 'Notifications enabled');
        }
    }
}
```

#### Step 4: Plugin to send notifications to the customer

```php
<?php
/**
 * Plugin: Telegram notifications to customers
 * Events: msOnChangeOrderStatus
 */

switch ($modx->event->name) {
    case 'msOnChangeOrderStatus':
        $order = $scriptProperties['order'];
        $newStatus = $scriptProperties['status'];

        $customer = $order->getOne('Customer');
        if (!$customer) return;

        $chatId = $customer->get('telegram_chat_id');
        if (empty($chatId)) return;

        $statusName = $modx->lexicon($newStatus->get('name'));
        $orderNum = $order->get('num');
        $message = "Order #{$orderNum}\nStatus: {$statusName}";

        $botToken = $modx->getOption('ms3_telegram_bot_token');
        $url = "https://api.telegram.org/bot{$botToken}/sendMessage";
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => ['chat_id' => $chatId, 'text' => $message, 'parse_mode' => 'HTML'],
            CURLOPT_RETURNTRANSFER => true,
        ]);
        curl_exec($ch);
        curl_close($ch);
        break;
}
```

#### Step 5: Link button in customer account

Add to the customer profile template:

```fenom
{if $customer.telegram_chat_id}
    <div class="alert alert-success">
        Telegram notifications enabled
    </div>
{else}
    <a href="{$telegramLink}" class="btn btn-primary" target="_blank">
        Enable Telegram notifications
    </a>
{/if}
```

::: tip Alternative
Instead of your own bot, you can use third-party services (SendPulse, Unisender, etc.) that provide Telegram API and handle subscriptions.
:::

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

### Retry on failure

```php
<?php
switch ($modx->event->name) {
    case 'msOnAfterSendNotification':
        $success = $scriptProperties['success'];

        if (!$success) {
            $notification = $scriptProperties['notification'];
            $recipient = $scriptProperties['recipient'];

            // Add to retry queue
            $queue = $modx->newObject('msNotificationQueue', [
                'notification_class' => get_class($notification),
                'notification_data' => json_encode($notification->getContext()),
                'recipient' => json_encode($recipient),
                'retry_count' => 0,
                'scheduled_at' => date('Y-m-d H:i:s', strtotime('+5 minutes')),
            ]);
            $queue->save();
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

### Custom channel example

```php
<?php
namespace MyComponent\Notifications;

use MiniShop3\Notifications\Channels\ChannelInterface;
use MiniShop3\Notifications\NotificationInterface;
use MODX\Revolution\modX;

class TelegramChannel implements ChannelInterface
{
    protected modX $modx;
    protected string $botToken;

    public function __construct(modX $modx)
    {
        $this->modx = $modx;
        $this->botToken = $modx->getOption('my_telegram_bot_token');
    }

    public function send(NotificationInterface $notification, array $recipient): bool
    {
        $chatId = $recipient['telegram_id'] ?? null;
        if (!$chatId) return false;

        $message = $notification->toTelegram($recipient);
        $url = "https://api.telegram.org/bot{$this->botToken}/sendMessage";
        $data = [
            'chat_id' => $chatId,
            'text' => $message,
            'parse_mode' => 'HTML',
        ];

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($ch);
        curl_close($ch);

        return json_decode($result, true)['ok'] ?? false;
    }
}
```

---

## Full example: notification analytics

```php
<?php
/**
 * Plugin: Notification analytics
 * Events: msOnBeforeSendNotification, msOnAfterSendNotification
 */

switch ($modx->event->name) {

    case 'msOnBeforeSendNotification':
        $notification = $scriptProperties['notification'];
        $modx->eventData['notification_start'] = microtime(true);
        break;

    case 'msOnAfterSendNotification':
        $notification = $scriptProperties['notification'];
        $channel = $scriptProperties['channel'];
        $recipient = $scriptProperties['recipient'];
        $success = $scriptProperties['success'];
        $error = $scriptProperties['error'];

        $startTime = $modx->eventData['notification_start'] ?? microtime(true);
        $duration = round((microtime(true) - $startTime) * 1000, 2);

        $stats = $modx->newObject('msNotificationStats', [
            'notification_type' => get_class($notification),
            'channel' => get_class($channel),
            'recipient_type' => $recipient['type'] ?? 'unknown',
            'success' => $success ? 1 : 0,
            'error' => $error,
            'duration_ms' => $duration,
            'createdon' => date('Y-m-d H:i:s'),
        ]);
        $stats->save();

        if (!$success) {
            $errorCount = $modx->getCount('msNotificationStats', [
                'success' => 0,
                'createdon:>=' => date('Y-m-d H:i:s', strtotime('-1 hour')),
            ]);
            if ($errorCount > 10) {
                $modx->log(modX::LOG_LEVEL_ERROR,
                    "[Notifications] ALERT: {$errorCount} errors in the last hour!"
                );
            }
        }
        break;
}
```
