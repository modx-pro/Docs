---
title: Notification center
---
# Notification center

Order event notifications are managed via **Extras → MiniShop3 → Notifications**.

Here you configure which notifications to send, to whom, through which channels (email, Telegram, etc.), and with which template when an order is created or its status changes.

## Purpose

The notification center is a single place to manage the store notification chain:

- Email to the customer when an order is created.
- Email to the manager about a new order.
- Customer notification when the order moves to Paid, Shipped, Delivered, etc.
- Duplicate notification to a Telegram channel for managers.
- Any combination of "event → status → recipient → channel".

Each notification is a separate record. You can configure multiple notifications for one event (for example, email to the customer and Telegram to the manager at the same time).

## Notification fields

| Field | Type | Description |
|-------|------|-------------|
| `event` | string | Event type: order status change, order creation |
| `status_id` | int | Order status ID. Only for "status change" events. Empty = trigger on any status |
| `recipient_type` | string | Recipient: `customer` or `manager` |
| `channel` | string | Delivery channel: `email`, `telegram`, etc. |
| `enabled` | bool | Enabled / disabled |
| `subject` | string | Email subject (for email; supports Fenom) |
| `template` | string | Chunk name for the message body. Empty = channel default template |
| `delay` | int | Send delay in seconds. Requires Scheduler |
| `position` | int | Send order when multiple notifications exist for one event |

## Events

The current version supports:

| Event | ID | When it fires |
|-------|----|---------------|
| Order created | `order_created` | Customer places an order (frontend) or manager finalizes a draft |
| Order status changed | `order_status_changed` | Order moves from one status to another |

For "status change" you can additionally limit `status_id` — then the notification fires only when transitioning to that status. Leave empty to send on any status change.

## Recipients

- **Customer** (`customer`) — receives the notification at contacts from the order (email, phone, Telegram chat_id if set).
- **Manager** (`manager`) — receives the notification at contacts defined in channel system settings (for example, `ms3_email_managers` for email, Telegram bot chat ID for Telegram).

## Channels

### Email (built-in)

Default channel. Uses MODX SMTP settings.

System setting parameters:

- `ms3_email_from` — sender address.
- `ms3_email_managers` — manager addresses, comma-separated.

For the email body you can specify a chunk name in `template` — for example, `tpl.msEmail.order.new`. If empty, the channel default template is used.

The email subject (`subject`) supports Fenom syntax; you can use order placeholders:

```
Order #{$num} — status change
```

### Telegram

Channel for sending messages in Telegram (bot → customer by chat_id or bot → manager channel/chat).

Parameters (system settings):

- `ms3_telegram_bot_token` — bot token from `@BotFather`.
- `ms3_telegram_managers_chat_id` — manager chat/channel ID.

For customer notifications the order must include `telegram_chat_id` (via a custom field or Telegram bot authorization). Without it the channel cannot deliver to the customer.

### SMS and custom channels

An SMS channel skeleton exists in code. Any component can register its own channel — see the development section [Notification events](../development/events/notifications.md) and the `msOnRegisterNotificationChannels` event. Channels registered by third-party code appear automatically in the form dropdown.

## Message templates

The `template` field holds a MODX chunk name rendered through Fenom. Available placeholders:

- `{$order}` — order field array (`num`, `cost`, `status_id`, etc.).
- `{$customer}` — customer data.
- `{$products}` — order line items array.
- `{$status_name}`, `{$old_status_name}` — for status change events.
- `{$shop_name}` — store name from a system setting.

Minimal chunk example `tpl.msEmail.order.new`:

```
<h1>Thank you for order #{$order.num}</h1>
<p>Total: {$order.cost}</p>
<ul>
{foreach $products as $product}
    <li>{$product.name} × {$product.count}</li>
{/foreach}
</ul>
```

If the chunk is not specified or not found, the channel uses its default template.

## Send delay

The `delay` field (in seconds) defers sending. Useful for scenarios like "24 hours after payment — thank you for your order" or "7 days after delivery — request a review".

Delayed sending requires the **Scheduler** component installed and configured: the notification is queued as a deferred task and sent on schedule. Without Scheduler the parameter is ignored and the notification is sent immediately.

## Multiple notifications per event

You can configure any number of records for one event. The `position` field defines send order within one event: lower value sends earlier.

Typical setup for a new order:

| Position | Event | Status | Recipient | Channel | Subject / Template |
|----------|-------|--------|-----------|---------|-------------------|
| 1 | `order_created` | — | customer | email | "Thank you for order #{$num}" / `tpl.msEmail.order.thanks` |
| 2 | `order_created` | — | manager | email | "New order #{$num}" / `tpl.msEmail.order.new.manager` |
| 3 | `order_created` | — | manager | telegram | — / `tpl.msTelegram.order.new` |

## Grid filters

Three filters above the notification list:

- **Order status** — show only notifications for a specific status.
- **Channel** — filter by channel type (email / telegram / ...).
- **Recipient** — customer or manager.

Filters apply on **Apply** and reset on **Clear**.

## Actions

- **Add notification** — opens the create dialog.
- **Edit** (pencil icon) — edit dialog for the record.
- **Enable / disable** — checkbox in the first grid column toggles `enabled` without opening the editor.
- **Delete** (trash icon) — with confirmation.

## Related sections

- [System settings](../settings.md) — `ms3_email_from`, `ms3_email_managers`, `ms3_telegram_bot_token`, `ms3_telegram_managers_chat_id`, etc.
- Order status directory — defines available `status_id` values for binding. Configured in the manager (**MiniShop3 → Settings → Statuses**).
- [Notification events](../development/events/notifications.md) — plugin subscriptions, custom channel registration.

## FAQ

**Emails are not sent.**
Check: system setting `ms3_email_from`, MODX SMTP settings, MODX error log (channel send errors are logged with `[ms3] Notification error`), **Enabled** status on the record in the Notification center.

**Notification went to the customer's old email, not the one from the order form.**
Known behavior due to the current channel implementation. See issue [#218](https://github.com/modx-pro/MiniShop3/issues/218) and related architecture audit [#219](https://github.com/modx-pro/MiniShop3/issues/219).

**I want a custom delivery channel (for example, push to a mobile app).**
You need a plugin on `msOnRegisterNotificationChannels` that registers a channel class implementing `ChannelInterface`. See [notification events](../development/events/notifications.md).
