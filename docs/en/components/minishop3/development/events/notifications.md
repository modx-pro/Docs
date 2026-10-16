---
title: Notification events
---
# Notification events

Events for the notification system: sending, modifying, registering channels.

## Built-in channels

MiniShop3 includes two notification channels out of the box:

| Channel | Class | Description |
| --- | --- | --- |
| `email` | `EmailChannel` | Sends via MODX modMail |
| `telegram` | `TelegramChannel` | Sends via Telegram Bot API |

### Email channel

Uses standard MODX modMail. Templates are configured via chunks.

### Telegram channel

Sends messages via Telegram Bot API. Requires settings:

- `ms3_telegram_bot_token` — bot token
- `ms3_telegram_manager` — recipient Chat ID

::: warning Telegram limitation
A Telegram bot cannot start a conversation. The customer must send the first message to the bot. So Telegram notifications only work for managers who have set their Chat ID in advance.
:::

### Telegram notifications for customers

You need the customer's consent for notifications and their Chat ID stored in the store profile.

#### Step 1: Add a field for Chat ID

Create a `telegram_chat_id` field for the `msCustomer` class in the [Extra fields](/en/components/minishop3/interface/utilities/extra-fields) utility.

::: warning A column added by hand will not reach templates
`ALTER TABLE modx_ms3_customers ADD COLUMN telegram_chat_id …` looks like a shortcut, but since 1.14.2-beta1 customer data reaches account chunks and email placeholders through `CustomerPublicDto`. It adds only the keys of active extra fields to the [public set](#recipient), so a column created outside the utility never shows up in `{$customer}`. The utility creates the column itself.
:::

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

Fired **before** sending a notification. Lets you modify the recipient, replace the channel list or cancel sending.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `notification` | `Notification` | The notification object (an abstract class; the concrete subclass is e.g. `StatusChangedNotification`) |
| `recipient` | `array` (by reference) | Recipient data — see the payload below |
| `recipientType` | `string` | `customer` or `manager` |
| `channels` | `string[]` (by reference) | Channel names, e.g. `['email', 'telegram']` |

### The `recipient` payload {#recipient}

For a `customer` recipient (since 1.12.0) `recipient` is assembled by `OrderStatusService::getCustomerRecipient()`. Source priority:

1. **`msOrderAddress`** of the order — the email and phone from the checkout form of **this particular** order.
2. **`msCustomer`** — a fallback for email and phone, and the source of `telegram_chat_id` and of the `customer` array.
3. **`modUserProfile`** — the last fallback for email, phone and Telegram when the first two are empty.

The resulting `email` and `phone` are also copied into `recipient['customer']['email']` and `['phone']` — for plugins that read the contact from there.

| Key | Type | Source | Description |
| --- | --- | --- | --- |
| `type` | `string` | — | `customer` or `manager` (duplicates `recipientType`) |
| `email` | `string \| null` | address → customer → profile | Resulting recipient email |
| `phone` | `string \| null` | address → customer → profile | Resulting phone number |
| `telegram_chat_id` | `string \| null` | `customer.extended` → profile | Telegram chat ID, when set |
| `address` | `array` | `msOrderAddress->toArray()` | The full order address (`customer` recipient only) |
| `customer` | `array` | `CustomerPublicDto::fromCustomer()` | The customer's public fields (`customer` recipient only); its `email` and `phone` already match the resulting values |

::: warning No customer secrets in `customer`
Since 1.14.2-beta1 the array is built by `CustomerPublicDto`, not by a raw `toArray()`. It leaves out `password`, `token`, `user_id`, `customer_group_id`, login attempt counters and the IP the privacy policy was accepted from. The public set is `id`, `first_name`, `last_name`, `email`, `phone`, `email_verified_at`, `is_active`, `created_at`, `updated_at`, `last_login_at`, `orders_count`, `total_spent`, `last_order_at`, `privacy_accepted_at` plus the customer's active extra fields.
:::

::: tip Why the address and the customer are kept apart
Before 1.12.0 notifications went to the contacts stored on `msCustomer`, which could differ from the contacts of the order at hand: if two orders were placed in one session with different emails, both notifications went to the `msCustomer` email.
:::

### Aborting the operation

Sending is cancelled by `return false`, `return 'cancel'` or `$modx->event->output(...)`. The event goes through `EventGate::invokeRaw()`, not `Utils::invokeEvent`.

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeSendNotification':
        $recipient = $scriptProperties['recipient'];

        // Disallow sending at night
        $hour = (int)date('G');
        if ($hour >= 23 || $hour < 8) {
            return false;
        }

        // Block temporary emails
        if (!empty($recipient['email'])) {
            $domain = substr($recipient['email'], strpos($recipient['email'], '@') + 1);
            if (in_array($domain, ['tempmail.com', 'throwaway.com'], true)) {
                return 'cancel';
            }
        }
        break;
}
```

### Modifying via returnedValues

You can also change `$recipient` and `$channels` by reference, but the explicit contract is the keys in `returnedValues`:

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeSendNotification':
        $values = &$modx->event->returnedValues;
        $values['recipient'] = array_replace(
            $scriptProperties['recipient'],
            ['email' => 'ops@example.com']
        );
        // the list replaces the channel set entirely
        $values['channels'] = ['email'];
        break;
}
```

---

## msOnAfterSendNotification

Fired **after** the notification has been processed — once for all the selected channels together.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `notification` | `Notification` | The notification object (an abstract class; the concrete subclass is e.g. `StatusChangedNotification`) |
| `recipient` | `array` | Recipient data — see [the `recipient` payload](#recipient) above |
| `recipientType` | `string` | `customer` or `manager` |
| `results` | `array<string,bool>` | The send result per channel, e.g. `['email' => true, 'telegram' => false]` |

::: warning The event does not always fire
`msOnAfterSendNotification` only fires once the channel loop has been reached. If `msOnBeforeSendNotification` cancelled the send, or the channel list came out empty, `NotificationManager::send()` returns earlier and no event happens at all. For analytics these are different cases: "no event" and "every channel returned `false`".
:::

::: warning `false` in `results` is not necessarily a failed send
The same value lands in the array when a channel is not registered or its `isAvailable()` returned `false` — no send was attempted in those cases. The event cannot tell them apart, so check channel registration and availability yourself if you need the exact reason.
:::

### Example

```php
<?php
switch ($modx->event->name) {
    case 'msOnAfterSendNotification':
        $notification = $scriptProperties['notification'];
        $recipient = $scriptProperties['recipient'];
        $results = $scriptProperties['results']; // ['email' => true, 'telegram' => false]

        foreach ($results as $channelName => $success) {
            $contact = $recipient['email'] ?? $recipient['phone'] ?? 'unknown';
            $level = $success ? modX::LOG_LEVEL_INFO : modX::LOG_LEVEL_ERROR;
            $modx->log($level, sprintf(
                '[Notification] %s → %s (%s): %s',
                $notification::class,
                $contact,
                $channelName,
                $success ? 'ok' : 'fail'
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
        $results = $scriptProperties['results'];

        if (in_array(false, $results, true)) {
            // Your own retry queue — the package has no msNotificationQueue
            $modx->log(modX::LOG_LEVEL_WARN, '[Notification] Partial failure: ' . json_encode($results));
        }
        break;
}
```

---

## msOnRegisterNotificationChannels

Fired when registering notification channels. Lets you add your own channels.

### Parameters

| Parameter | Type | Description |
| --- | --- | --- |
| `manager` | `NotificationManager` | Notification manager |

### Registering your own channel

`NotificationManager::registerChannel()` takes a `ChannelInterface` object, not a callback.

::: tip SMS already has a base class
The package ships an abstract `MiniShop3\Notifications\Channels\SmsChannel`: it already reports the channel name `sms`, pulls the phone number from the recipient, the customer or the address, and normalises it. The channel is not registered by default — extend it and implement the single `sendSms(string $phone, SmsMessage $message): bool` method for your provider instead of writing a channel from scratch. Only `EmailChannel` and `TelegramChannel` are registered out of the box.
:::

```php
<?php
switch ($modx->event->name) {
    case 'msOnRegisterNotificationChannels':
        /** @var \MiniShop3\Notifications\NotificationManager $manager */
        $manager = $scriptProperties['manager'];

        $manager->registerChannel(new MyComponent\Notifications\SmsChannel($modx));
        break;
}
```

### Example of your own channel

```php
<?php
namespace MyComponent\Notifications;

use MiniShop3\Model\msOrder;
use MiniShop3\Notifications\ChannelInterface;
use MiniShop3\Notifications\Notification;
use MODX\Revolution\modX;

class SmsChannel implements ChannelInterface
{
    public function __construct(protected modX $modx) {}

    public function getName(): string
    {
        return 'sms';
    }

    public function isAvailable(): bool
    {
        return (bool) $this->modx->getOption('my_sms_api_key');
    }

    public function getRequirements(): array
    {
        return ['my_sms_api_key'];
    }

    public function send(Notification $notification, array $recipient, msOrder $order): bool
    {
        $phone = $recipient['phone'] ?? null;
        if (!$phone) {
            return false;
        }

        // Call your SMS API
        return true;
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

        // Remember the start time to measure the duration
        $modx->eventData['notification_start'] = microtime(true);
        break;

    case 'msOnAfterSendNotification':
        $notification = $scriptProperties['notification'];
        $recipient = $scriptProperties['recipient'];
        $results = $scriptProperties['results'];

        $startTime = $modx->eventData['notification_start'] ?? microtime(true);
        $duration = round((microtime(true) - $startTime) * 1000, 2);

        foreach ($results as $channelName => $success) {
            $modx->log(
                $success ? modX::LOG_LEVEL_INFO : modX::LOG_LEVEL_ERROR,
                sprintf(
                    '[Notification] %s → %s (%s): %s in %sms',
                    $notification::class,
                    $recipient['email'] ?? $recipient['phone'] ?? 'unknown',
                    $channelName,
                    $success ? 'ok' : 'fail',
                    $duration
                )
            );
        }
        break;
}
```
