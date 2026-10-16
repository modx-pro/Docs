---
title: События уведомлений
---
# События уведомлений

События системы уведомлений: отправка, модификация, регистрация каналов.

## Встроенные каналы

MiniShop3 включает два канала уведомлений из коробки:

| Канал | Класс | Описание |
| --- | --- | --- |
| `email` | `EmailChannel` | Отправка через MODX modMail |
| `telegram` | `TelegramChannel` | Отправка через Telegram Bot API |

### Email-канал

Использует стандартный MODX modMail. Шаблоны настраиваются через чанки.

### Telegram-канал

Отправляет сообщения через Telegram Bot API. Требует настройки:

- `ms3_telegram_bot_token` — токен бота
- `ms3_telegram_manager` — Chat ID менеджеров (через запятую)

::: warning Ограничение Telegram
Telegram-бот не может инициировать диалог. Покупатель должен сам написать боту первое сообщение. Поэтому Telegram-уведомления работают только для менеджеров, которые заранее настроили Chat ID.
:::

### Уведомления покупателям через Telegram

Понадобятся согласие покупателя на уведомления и его Chat ID, сохранённый в профиле магазина.

#### Шаг 1: Добавить поле для Chat ID

Создайте поле `telegram_chat_id` для класса `msCustomer` в утилите [«Свои поля»](/components/minishop3/interface/utilities/extra-fields).

::: warning Колонка, добавленная руками, в шаблоны не попадёт
`ALTER TABLE modx_ms3_customers ADD COLUMN telegram_chat_id …` выглядит коротким путём, но с 1.14.2-beta1 данные покупателя идут в чанки кабинета и в плейсхолдеры письма через `CustomerPublicDto`. К [публичному набору](#recipient) он добавляет только ключи активных дополнительных полей, поэтому колонки, созданной в обход утилиты, в `{$customer}` не окажется. Утилита создаёт колонку сама.
:::

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
        // Сохраняем Chat ID в профиле покупателя
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

#### Шаг 4: Плагин для отправки уведомлений покупателю

```php
<?php
/**

 * Плагин: Telegram-уведомления покупателям
 * События: msOnChangeOrderStatus

 */

switch ($modx->event->name) {
    case 'msOnChangeOrderStatus':
        $order = $scriptProperties['order'];
        $newStatus = $scriptProperties['status'];

        // Получаем покупателя
        $customer = $order->getOne('Customer');
        if (!$customer) {
            return;
        }

        $chatId = $customer->get('telegram_chat_id');
        if (empty($chatId)) {
            return; // Покупатель не привязал Telegram
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

Добавьте в шаблон профиля покупателя:

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
| --- | --- | --- |
| `notification` | `Notification` | Объект уведомления (абстрактный класс, конкретный подкласс — например `StatusChangedNotification`) |
| `recipient` | `array` | Данные получателя — см. структуру ниже |
| `recipientType` | `string` | Тип получателя: `customer` или `manager` |
| `channels` | `string[]` | Список каналов отправки (например, `['email', 'telegram']`) |

### Структура `recipient` {#recipient}

Для получателя типа `customer` (начиная с 1.12.0) `recipient` собирает `OrderStatusService::getCustomerRecipient()`. Приоритет источников:

1. **`msOrderAddress`** заказа — email и телефон из формы оформления **именно этого** заказа.
2. **`msCustomer`** — запасной вариант для email и телефона, а также источник `telegram_chat_id` и массива `customer`.
3. **`modUserProfile`** — последний запасной вариант для email, телефона и Telegram, когда первые два пусты.

Итоговые `email` и `phone` дублируются в `recipient['customer']['email']` и `['phone']` — для плагинов, которые читают контакт оттуда.

| Ключ | Тип | Источник | Описание |
| --- | --- | --- | --- |
| `type` | `string` | — | `customer` или `manager` (дублирует `recipientType`) |
| `email` | `string \| null` | адрес → покупатель → профиль | Итоговый email получателя |
| `phone` | `string \| null` | адрес → покупатель → профиль | Итоговый телефон |
| `telegram_chat_id` | `string \| null` | `customer.extended` → профиль | ID чата Telegram, если задан |
| `address` | `array` | `msOrderAddress->toArray()` | Полный адрес заказа (только у получателя `customer`) |
| `customer` | `array` | `CustomerPublicDto::fromCustomer()` | Публичные поля покупателя (только у получателя `customer`); `email` и `phone` в нём уже совпадают с итоговыми значениями |

::: warning Секретов покупателя в `customer` нет
С 1.14.2-beta1 массив собирает `CustomerPublicDto`, а не сырой `toArray()`. В него не попадают `password`, `token`, `user_id`, `customer_group_id`, счётчики попыток входа и IP-адрес, с которого принята политика. Публичный набор: `id`, `first_name`, `last_name`, `email`, `phone`, `email_verified_at`, `is_active`, `created_at`, `updated_at`, `last_login_at`, `orders_count`, `total_spent`, `last_order_at`, `privacy_accepted_at` плюс активные дополнительные поля покупателя.
:::

::: tip Зачем разделять адрес и покупателя
До 1.12.0 уведомления слались по контактам из `msCustomer`, которые могли отличаться от контактов конкретного заказа: если в одной сессии оформляли два заказа с разными email, оба уведомления уходили на email из `msCustomer`.
:::

### Прерывание операции

Отправку отменяет `return false`, `return 'cancel'` или `$modx->event->output(...)`. Событие идёт через `EventGate::invokeRaw()`, а не через `Utils::invokeEvent`.

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeSendNotification':
        $recipient = $scriptProperties['recipient'];

        $hour = (int) date('G');
        if ($hour >= 23 || $hour < 8) {
            return false;
        }

        if (!empty($recipient['email'])) {
            $domain = substr($recipient['email'], strpos($recipient['email'], '@') + 1);
            if (in_array($domain, ['tempmail.com', 'throwaway.com'], true)) {
                return 'cancel';
            }
        }
        break;
}
```

### Модификация через returnedValues

Менять `$recipient` и `$channels` можно и по ссылке, но явный контракт — ключи в `returnedValues`:

```php
<?php
switch ($modx->event->name) {
    case 'msOnBeforeSendNotification':
        $values = &$modx->event->returnedValues;

        $values['recipient'] = array_replace(
            $scriptProperties['recipient'],
            ['email' => 'ops@example.com']
        );

        // list заменяет список каналов целиком
        $values['channels'] = ['email'];
        break;
}
```

---

## msOnAfterSendNotification

Вызывается **после** обработки уведомления — суммарно по всем выбранным каналам.

### Параметры

| Параметр | Тип | Описание |
| --- | --- | --- |
| `notification` | `Notification` | Объект уведомления (абстрактный класс, конкретный подкласс — например `StatusChangedNotification`) |
| `recipient` | `array` | Данные получателя — см. [структуру `recipient`](#recipient) выше |
| `recipientType` | `string` | Тип получателя: `customer` или `manager` |
| `results` | `array<string,bool>` | Результат отправки по каналам, например `['email' => true, 'telegram' => false]` |

::: warning Событие приходит не всегда
`msOnAfterSendNotification` вызывается только тогда, когда дошло до перебора каналов. Если отправку отменил `msOnBeforeSendNotification` или список каналов оказался пуст, `NotificationManager::send()` выходит раньше, и события не будет вовсе. Для аналитики это разные случаи: «события не было» и «все каналы вернули `false`».
:::

::: warning `false` в `results` — не обязательно неудачная отправка
Это же значение попадает в массив, когда канал не зарегистрирован или его `isAvailable()` вернул `false`: попытки отправки в таких случаях не было. Отличить одно от другого внутри события нельзя — если нужна точная причина, проверяйте регистрацию и доступность канала сами.
:::

### Пример использования

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

### Повторная отправка при ошибке

```php
<?php
switch ($modx->event->name) {
    case 'msOnAfterSendNotification':
        $results = $scriptProperties['results'];

        if (in_array(false, $results, true)) {
            // Ваша очередь повторов — в пакете нет msNotificationQueue
            $modx->log(modX::LOG_LEVEL_WARN, '[Notification] Partial failure: ' . json_encode($results));
        }
        break;
}
```

---

## msOnRegisterNotificationChannels

Вызывается при регистрации каналов уведомлений. Позволяет добавить свои каналы.

### Параметры

| Параметр | Тип | Описание |
| --- | --- | --- |
| `manager` | `NotificationManager` | Менеджер уведомлений |

### Регистрация своего канала

`NotificationManager::registerChannel()` принимает объект `ChannelInterface`, не callback.

::: tip Для SMS есть готовая основа
В поставке лежит абстрактный `MiniShop3\Notifications\Channels\SmsChannel`: он уже отдаёт имя канала `sms`, достаёт телефон из получателя, покупателя или адреса и нормализует его. По умолчанию канал не зарегистрирован — наследуйте его и реализуйте один метод `sendSms(string $phone, SmsMessage $message): bool` под своего оператора, вместо того чтобы писать канал с нуля. Из коробки зарегистрированы только `EmailChannel` и `TelegramChannel`.
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

### Пример своего канала

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

        // Вызов вашего SMS API
        return true;
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
