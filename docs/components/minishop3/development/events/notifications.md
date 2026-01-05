---
title: События уведомлений
---
# События уведомлений

События системы уведомлений: отправка, модификация, регистрация каналов.

## msOnBeforeSendNotification

Вызывается **перед** отправкой уведомления. Позволяет модифицировать данные или отменить отправку.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `notification` | `NotificationInterface` | Объект уведомления |
| `channel` | `ChannelInterface` | Канал отправки |
| `recipient` | `array` | Данные получателя |

### Прерывание операции

Если плагин возвращает непустой вывод, отправка будет отменена:

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeSendNotification':
        $notification = $scriptProperties['notification'];
        $recipient = $scriptProperties['recipient'];
        $channel = $scriptProperties['channel'];

        // Запретить отправку ночью
        $hour = (int)date('G');
        if ($hour >= 23 || $hour < 8) {
            $modx->event->output('Отправка уведомлений приостановлена');
            return;
        }

        // Запретить отправку на временные email
        if (isset($recipient['email'])) {
            $blockedDomains = ['tempmail.com', 'throwaway.com'];
            $domain = substr($recipient['email'], strpos($recipient['email'], '@') + 1);
            if (in_array($domain, $blockedDomains)) {
                $modx->event->output('Заблокированный домен email');
                return;
            }
        }
        break;
}
```

### Модификация данных

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeSendNotification':
        $notification = $scriptProperties['notification'];
        $recipient = $scriptProperties['recipient'];

        // Добавить данные к уведомлению
        $context = $notification->getContext();
        $context['custom_field'] = 'value';
        $context['sent_at'] = date('Y-m-d H:i:s');

        // Изменить получателя
        if ($recipient['type'] === 'manager' && empty($recipient['email'])) {
            $recipient['email'] = 'default-manager@example.com';
        }
        break;
}
```

---

## msOnAfterSendNotification

Вызывается **после** отправки уведомления (успешной или неуспешной).

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `notification` | `NotificationInterface` | Объект уведомления |
| `channel` | `ChannelInterface` | Канал отправки |
| `recipient` | `array` | Данные получателя |
| `success` | `bool` | Результат отправки |
| `error` | `string\|null` | Сообщение об ошибке (если есть) |

### Пример использования

```php
<?php
switch ($modx->event->name) {
    case 'msOnAfterSendNotification':
        $notification = $scriptProperties['notification'];
        $channel = $scriptProperties['channel'];
        $recipient = $scriptProperties['recipient'];
        $success = $scriptProperties['success'];
        $error = $scriptProperties['error'];

        // Логирование
        if ($success) {
            $modx->log(modX::LOG_LEVEL_INFO, sprintf(
                '[Notification] Отправлено: %s → %s (%s)',
                get_class($notification),
                $recipient['email'] ?? $recipient['phone'] ?? 'unknown',
                get_class($channel)
            ));
        } else {
            $modx->log(modX::LOG_LEVEL_ERROR, sprintf(
                '[Notification] Ошибка: %s → %s: %s',
                get_class($notification),
                $recipient['email'] ?? $recipient['phone'] ?? 'unknown',
                $error
            ));
        }
        break;
}
```

### Повторная отправка при ошибке

```php
<?php
switch ($modx->event->name) {
    case 'msOnAfterSendNotification':
        $success = $scriptProperties['success'];

        if (!$success) {
            $notification = $scriptProperties['notification'];
            $recipient = $scriptProperties['recipient'];

            // Добавить в очередь для повторной отправки
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

Вызывается при регистрации каналов уведомлений. Позволяет добавить кастомные каналы.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `manager` | `NotificationManager` | Менеджер уведомлений |

### Регистрация кастомного канала

```php
<?php
switch ($modx->event->name) {
    case 'msOnRegisterNotificationChannels':
        /** @var \MiniShop3\Notifications\NotificationManager $manager */
        $manager = $scriptProperties['manager'];

        // Регистрация Telegram канала
        $manager->registerChannel('telegram', function($modx) {
            return new MyTelegramChannel($modx);
        });

        // Регистрация Push канала
        $manager->registerChannel('push', function($modx) {
            return new MyPushChannel($modx);
        });
        break;
}
```

### Пример кастомного канала

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
        if (!$chatId) {
            return false;
        }

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

## Полный пример: аналитика уведомлений

```php
<?php
/**
 * Плагин: Аналитика уведомлений
 * События: msOnBeforeSendNotification, msOnAfterSendNotification
 */

switch ($modx->event->name) {

    case 'msOnBeforeSendNotification':
        $notification = $scriptProperties['notification'];

        // Сохраняем время начала для расчёта длительности
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

        // Сохраняем статистику
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

        // Алерт при большом количестве ошибок
        if (!$success) {
            $errorCount = $modx->getCount('msNotificationStats', [
                'success' => 0,
                'createdon:>=' => date('Y-m-d H:i:s', strtotime('-1 hour')),
            ]);

            if ($errorCount > 10) {
                $modx->log(modX::LOG_LEVEL_ERROR,
                    "[Notifications] ALERT: {$errorCount} ошибок за последний час!"
                );
            }
        }
        break;
}
```
