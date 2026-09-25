---
title: Requests to Telegram
description: A FormIt hook that sends requests from FetchIt forms to a Telegram chat
---

# Requests to Telegram

The request arrives in Telegram right after the form is sent — faster than an e-mail, and the whole team sees it in a shared chat. Below is a FormIt hook: it works alongside the e-mail and needs no change to the JavaScript.

## Bot and chat

1. Create a bot with [@BotFather](https://t.me/BotFather) using the `/newbot` command and save the token, which looks like `123456789:AA…`.
2. Add the bot to the chat where the requests should arrive, and write any message in the chat.
3. Open `https://api.telegram.org/bot<token>/getUpdates` in the browser and find `"chat":{"id":…}` in the answer. Groups have a negative identifier, for example `-1001234567890`.

Save the token and the chat identifier in the MODX system settings `telegram_bot_token` and `telegram_chat_id` — that way they do not end up in templates and chunks.

## Hook

Create a `TelegramHook` snippet:

```php
<?php
/** @var modX $modx */
/** @var fiHooks $hook */
/** @var array $scriptProperties */
$token = $modx->getOption('telegram_bot_token');
$chatId = $modx->getOption('telegram_chat_id');
if (!$token || !$chatId) {
    $modx->log(modX::LOG_LEVEL_ERROR, '[TelegramHook] telegram_bot_token and telegram_chat_id are not set');
    return true;
}

// Which fields go into the message, and under which labels
$labels = [
    'name' => 'Name',
    'phone' => 'Phone',
    'email' => 'Email',
    'message' => 'Message',
];

$title = $modx->getOption('telegramTitle', $scriptProperties, 'Request from the site');
$lines = ['<b>' . htmlspecialchars($title, ENT_QUOTES, 'UTF-8') . '</b>', ''];
foreach ($labels as $key => $label) {
    $value = $hook->getValue($key);
    if (is_scalar($value) && trim((string) $value) !== '') {
        $lines[] = '<b>' . $label . ':</b> ' . htmlspecialchars(trim((string) $value), ENT_QUOTES, 'UTF-8');
    }
}

$curl = curl_init('https://api.telegram.org/bot' . $token . '/sendMessage');
curl_setopt_array($curl, [
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => [
        'chat_id' => $chatId,
        'text' => implode("\n", $lines),
        'parse_mode' => 'HTML',
    ],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
]);
$answer = json_decode((string) curl_exec($curl), true);
$error = curl_error($curl);
curl_close($curl);

if (empty($answer['ok'])) {
    $modx->log(modX::LOG_LEVEL_ERROR, '[TelegramHook] The message was not sent: '
        . ($error ?: ($answer['description'] ?? 'no answer')));
}

// The request is already accepted: a Telegram failure must not refuse it
return true;
```

- The field values are escaped: the message goes with `parse_mode: HTML`, and without escaping the `<` and `&` characters from the request would break the markup.
- The hook always returns `true`. If Telegram is unavailable, the request still goes by e-mail, and the reason for the failure ends up in the MODX error log.
- Fields with files and arrays are skipped: `is_scalar` keeps only strings and numbers.

## Call

The hook goes next to `email` — the request arrives both by e-mail and in Telegram. The message title is set with the `&telegramTitle` property, so that requests from different forms are easy to tell apart:

::: code-group

```modx
[[!FetchIt?
  &form=`callback.tpl`
  &hooks=`email,TelegramHook`
  &emailTpl=`callbackEmail.tpl`
  &emailTo=`sales@example.com`
  &emailSubject=`Callback request`
  &telegramTitle=`Callback request`
  &validate=`name:required,phone:required`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'form' => 'callback.tpl',
  'hooks' => 'email,TelegramHook',
  'emailTpl' => 'callbackEmail.tpl',
  'emailTo' => 'sales@example.com',
  'emailSubject' => 'Callback request',
  'telegramTitle' => 'Callback request',
  'validate' => 'name:required,phone:required',
]}
```

:::

FormIt hooks run in order and only after a successful validation, so requests with errors do not reach Telegram.

::: tip
If the site server is on a network where `api.telegram.org` is unreachable, the request waits until the 10-second timeout, and all that time the visitor sees the form being sent. Check the access from the server in advance, for example with `curl https://api.telegram.org`.
:::
