---
title: Заявка в Telegram
description: Хук FormIt, который присылает заявки с форм FetchIt в чат Telegram
---

# Заявка в Telegram

Заявка приходит в Telegram сразу после отправки формы — быстрее, чем письмо, и её видит вся команда в общем чате. Ниже хук FormIt: он работает рядом с письмом и не требует менять JavaScript.

## Бот и чат

1. Создайте бота у [@BotFather](https://t.me/BotFather) командой `/newbot` и сохраните токен вида `123456789:AA…`.
2. Добавьте бота в чат, куда должны приходить заявки, и напишите в чат любое сообщение.
3. Откройте в браузере `https://api.telegram.org/bot<токен>/getUpdates` и найдите в ответе `"chat":{"id":…}`. У групп идентификатор отрицательный, например `-1001234567890`.

Токен и идентификатор чата сохраните в системных настройках MODX `telegram_bot_token` и `telegram_chat_id` — так они не попадут в шаблоны и чанки.

## Хук

Создайте сниппет `TelegramHook`:

```php
<?php
/** @var modX $modx */
/** @var fiHooks $hook */
/** @var array $scriptProperties */
$token = $modx->getOption('telegram_bot_token');
$chatId = $modx->getOption('telegram_chat_id');
if (!$token || !$chatId) {
    $modx->log(modX::LOG_LEVEL_ERROR, '[TelegramHook] Не заданы telegram_bot_token и telegram_chat_id');
    return true;
}

// Какие поля и под какими подписями попадут в сообщение
$labels = [
    'name' => 'Имя',
    'phone' => 'Телефон',
    'email' => 'E-mail',
    'message' => 'Сообщение',
];

$title = $modx->getOption('telegramTitle', $scriptProperties, 'Заявка с сайта');
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
    $modx->log(modX::LOG_LEVEL_ERROR, '[TelegramHook] Сообщение не отправлено: '
        . ($error ?: ($answer['description'] ?? 'нет ответа')));
}

// Заявка уже принята: сбой Telegram не должен её отклонять
return true;
```

- Значения полей экранируются: сообщение уходит с `parse_mode: HTML`, и без экранирования символы `<` и `&` из заявки сломали бы разметку.
- Хук всегда возвращает `true`. Если Telegram недоступен, заявка всё равно уйдёт письмом, а причина сбоя окажется в журнале ошибок MODX.
- Поля с файлами и массивами пропускаются: `is_scalar` оставляет только строки и числа.

## Вызов

Хук ставится рядом с `email` — заявка придёт и в почту, и в Telegram. Заголовок сообщения задаётся параметром `&telegramTitle`, чтобы заявки с разных форм было легко различить:

::: code-group

```modx
[[!FetchIt?
  &form=`callback.tpl`
  &hooks=`email,TelegramHook`
  &emailTpl=`callbackEmail.tpl`
  &emailTo=`sales@example.com`
  &emailSubject=`Обратный звонок`
  &telegramTitle=`Обратный звонок`
  &validate=`name:required,phone:required`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'form' => 'callback.tpl',
  'hooks' => 'email,TelegramHook',
  'emailTpl' => 'callbackEmail.tpl',
  'emailTo' => 'sales@example.com',
  'emailSubject' => 'Обратный звонок',
  'telegramTitle' => 'Обратный звонок',
  'validate' => 'name:required,phone:required',
]}
```

:::

Хуки FormIt выполняются по порядку и только после успешной валидации, так что заявки с ошибками в Telegram не попадут.

::: tip
Если сервер сайта находится в сети, где `api.telegram.org` недоступен, запрос будет ждать до таймаута в 10 секунд, и всё это время посетитель будет видеть отправку формы. Проверьте доступ с сервера заранее, например командой `curl https://api.telegram.org`.
:::
