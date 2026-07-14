---
title: Webhooks
description: Outbound HTTP webhooks after reaction changes — payload, Telegram, Discord, Slack
---
# Webhooks

Reactions sends an HTTP POST with a JSON body to the configured URL after every reaction change.

## Enable

1. **System → System Settings → Reactions**
2. `reactions_webhooks_enabled` → **Yes**
3. `reactions_webhook_url` → endpoint URL

## Payload format

```json
{
  "event": "reaction.added",
  "class_key": "modResource",
  "object_id": 42,
  "context": "web",
  "type": "like",
  "result": {
    "action": "added",
    "counts": {
      "like": 43,
      "dislike": 3
    },
    "total": 46,
    "user_reaction": ["like"],
    "type": "like"
  },
  "timestamp": 1710000000
}
```

## Event values

| event | When |
| --- | --- |
| `reaction.added` | New reaction |
| `reaction.removed` | Reaction removed |
| `reaction.changed` | Type replaced (updown / exclusive) |

## Request headers

```text
Content-Type: application/json
```

Timeout: 3 seconds (connect: 2 s). Errors go to `error.log` with the `[Reactions] Webhook:` prefix.

## Telegram

Create a bot via [@BotFather](https://t.me/BotFather) and get a `chat_id`. An intermediate service maps Reactions JSON to Telegram format:

```php
// webhook-relay.php on your server
$payload = json_decode(file_get_contents('php://input'), true);
$text = sprintf(
    "%s: %s на %s#%d (всего: %d)",
    $payload['event'],
    $payload['type'],
    $payload['class_key'],
    $payload['object_id'],
    $payload['result']['total']
);
file_get_contents('https://api.telegram.org/bot<TOKEN>/sendMessage?' . http_build_query([
    'chat_id' => '<CHAT_ID>',
    'text' => $text,
]));
```

Set the `webhook-relay.php` URL in `reactions_webhook_url`.

## Discord

Discord Incoming Webhook expects a different format. Relay:

```php
$payload = json_decode(file_get_contents('php://input'), true);
$body = json_encode([
    'content' => sprintf(
        '**%s** %s → %s#%d',
        $payload['event'],
        $payload['type'],
        $payload['class_key'],
        $payload['object_id']
    ),
]);
// POST $body to the Discord webhook URL
```

## Slack

```php
$payload = json_decode(file_get_contents('php://input'), true);
$body = json_encode([
    'text' => sprintf(
        '%s: %s on %s#%d',
        $payload['event'],
        $payload['type'],
        $payload['class_key'],
        $payload['object_id']
    ),
]);
```

Slack Incoming Webhook accepts a `text` field directly. For the native Reactions format you need a relay, as with Telegram.

## Delivery check

Temporarily set a [webhook.site](https://webhook.site) URL and leave a reaction on a page. Confirm the POST arrives with valid JSON.

```bash
# Test the relay locally
curl -X POST http://localhost/webhook-relay.php \
  -H "Content-Type: application/json" \
  -d '{"event":"reaction.added","class_key":"modResource","object_id":1,"context":"web","type":"like","result":{"action":"added","counts":{"like":1},"total":1,"user_reaction":["like"],"type":"like"},"timestamp":1710000000}'
```

## Limits

- The webhook runs synchronously in the same request as the user reaction. A slow endpoint increases API response time.
- Failed deliveries are not retried.
- HMAC signing secrets are not supported in the current version. Authenticate on your side via a relay.

## Webhooks vs MODX events

| Mechanism | When to use |
| --- | --- |
| Webhooks | External services (Telegram, Discord, Slack, Zapier) |
| MODX events | Logic inside MODX: cache, permissions, custom notifications |

Both can run at once. More on events: [Events](events).

## Author notifications

The separate `reactions_notify_authors` setting sends a `modUserMessage` to the resource author on a new reaction. It works only for `modResource` and only when `action = added`. It does not replace webhooks.
