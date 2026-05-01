---
title: События уведомлений
---
# События уведомлений

События системы уведомлений: отправка, модификация, регистрация каналов.

## Встроенные каналы

MiniShop3 включает два канала уведомлений из коробки:

| Канал | Класс | Описание |
|-------|-------|----------|
| `email` | `EmailChannel` | Отправка через MODX modMail |
| `telegram` | `TelegramChannel` | Отправка через Telegram Bot API |

### Email канал

Использует стандартный MODX modMail. Шаблоны настраиваются через чанки.

### Telegram канал

Отправляет сообщения через Telegram Bot API. Требует настройки:
- `ms3_telegram_bot_token` — токен бота
- `ms3_telegram_manager_chat_id` — Chat ID получателя

::: warning Ограничение Telegram
Telegram-бот не может инициировать диалог с пользователем. Клиент должен сам написать боту первое сообщение. Поэтому Telegram-уведомления работают только для менеджеров, которые заранее настроили Chat ID.
:::

### Реализация уведомлений клиентам через Telegram

Для отправки Telegram-уведомлений клиентам необходимо:
1. Получить согласие клиента на получение уведомлений
2. Привязать Telegram-аккаунт клиента к его профилю в магазине
3. Сохранить Chat ID клиента

#### Шаг 1: Добавить поле для Chat ID

Создайте дополнительное поле в msCustomer для хранения Chat ID:

```sql
ALTER TABLE modx_ms3_customers ADD COLUMN telegram_chat_id VARCHAR(50) NULL;
```

Или используйте Extra Fields в настройках MiniShop3.

#### Шаг 2: Создать бота с Deep Linking

Используйте [Telegram Deep Linking](https://core.telegram.org/bots/features#deep-linking) для привязки аккаунта:

```php
<?php
// Генерация уникальной ссылки для привязки
$customerId = $msCustomer->get('id');
$token = hash('sha256', $customerId . $modx->getOption('ms3_snippet_token_secret'));
$linkCode = base64_encode($customerId . ':' . substr($token, 0, 16));

$botUsername = 'YourShopBot'; // Имя вашего бота
$telegramLink = "https://t.me/{$botUsername}?start={$linkCode}";
```

#### Шаг 3: Обработка команды /start на стороне бота

Бот должен обрабатывать параметр `start` и сохранять Chat ID:

```php
<?php
// Webhook обработчик бота (упрощённый пример)
$update = json_decode(file_get_contents('php://input'), true);
$message = $update['message'] ?? null;

if ($message && str_starts_with($message['text'], '/start ')) {
    $linkCode = substr($message['text'], 7);
    $decoded = base64_decode($linkCode);
    [$customerId, $tokenPart] = explode(':', $decoded);

    // Проверка токена
    $expectedToken = hash('sha256', $customerId . $modx->getOption('ms3_snippet_token_secret'));
    if (substr($expectedToken, 0, 16) === $tokenPart) {
        // Сохраняем Chat ID в профиле клиента
        $customer = $modx->getObject(\MiniShop3\Model\msCustomer::class, $customerId);
        if ($customer) {
            $customer->set('telegram_chat_id', $message['chat']['id']);
            $customer->save();

            // Отправляем подтверждение
            sendTelegramMessage($message['chat']['id'], '✅ Уведомления подключены!');
        }
    }
}
```

#### Шаг 4: Плагин для отправки уведомлений клиенту

```php
<?php
/**
 * Плагин: Telegram уведомления клиентам
 * События: msOnChangeOrderStatus
 */

switch ($modx->event->name) {
    case 'msOnChangeOrderStatus':
        $order = $scriptProperties['order'];
        $newStatus = $scriptProperties['status'];

        // Получаем клиента
        $customer = $order->getOne('Customer');
        if (!$customer) {
            return;
        }

        $chatId = $customer->get('telegram_chat_id');
        if (empty($chatId)) {
            return; // Клиент не привязал Telegram
        }

        // Формируем сообщение
        $statusName = $modx->lexicon($newStatus->get('name'));
        $orderNum = $order->get('num');

        $message = "📦 Заказ #{$orderNum}\n";
        $message .= "Статус изменён на: {$statusName}";

        // Отправляем через Telegram API
        $botToken = $modx->getOption('ms3_telegram_bot_token');
        $url = "https://api.telegram.org/bot{$botToken}/sendMessage";

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => [
                'chat_id' => $chatId,
                'text' => $message,
                'parse_mode' => 'HTML',
            ],
            CURLOPT_RETURNTRANSFER => true,
        ]);
        curl_exec($ch);
        curl_close($ch);
        break;
}
```

#### Шаг 5: Кнопка привязки в личном кабинете

Добавьте в шаблон профиля клиента:

```fenom
{if $customer.telegram_chat_id}
    <div class="alert alert-success">
        <i class="bi bi-telegram"></i> Telegram уведомления подключены
    </div>
{else}
    <a href="{$telegramLink}" class="btn btn-primary" target="_blank">
        <i class="bi bi-telegram"></i> Подключить Telegram уведомления
    </a>
{/if}
```

::: tip Альтернативный подход
Вместо собственного бота можно интегрироваться с существующими сервисами рассылок (SendPulse, Unisender и др.), которые предоставляют API для Telegram и берут на себя работу с подписками.
:::

## msOnBeforeSendNotification

Вызывается **перед** отправкой уведомления. Позволяет модифицировать получателя, подменить список каналов или отменить отправку.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `notification` | `NotificationInterface` | Объект уведомления |
| `recipient` | `array` | Данные получателя |
| `recipientType` | `string` | Тип получателя: `customer` или `manager` |
| `channels` | `string[]` | Список каналов отправки (например, `['email', 'telegram']`) |

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

Вызывается **после** обработки уведомления — суммарно по всем выбранным каналам.

### Параметры

| Параметр | Тип | Описание |
|----------|-----|----------|
| `notification` | `NotificationInterface` | Объект уведомления |
| `recipient` | `array` | Данные получателя |
| `recipientType` | `string` | Тип получателя: `customer` или `manager` |
| `results` | `array<string,bool>` | Результат отправки по каналам, например `['email' => true, 'telegram' => false]` |

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
