---
title: Webhooks
---
# Webhooks

Reactions отправляет HTTP POST с JSON-телом на настроенный URL после каждого изменения реакции.

## Включение

1. **Система → Настройки системы → Reactions**
2. `reactions_webhooks_enabled` → **Да**
3. `reactions_webhook_url` → URL endpoint

## Формат payload

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

## Значения event

| event | Когда |
| --- | --- |
| `reaction.added` | Новая реакция |
| `reaction.removed` | Реакция снята |
| `reaction.changed` | Тип заменён (updown / exclusive) |

## Заголовки запроса

```text
Content-Type: application/json
```

Таймаут: 3 секунды (connect: 2 с). Ошибки логируются в `error.log` с префиксом `[Reactions] Webhook:`.

## Telegram

Создайте бота через [@BotFather](https://t.me/BotFather), получите `chat_id`. Промежуточный сервис преобразует JSON Reactions в формат Telegram:

```php
// webhook-relay.php на вашем сервере
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

Укажите URL `webhook-relay.php` в `reactions_webhook_url`.

## Discord

Discord Incoming Webhook ожидает другой формат. Relay:

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
// POST $body на Discord webhook URL
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

Slack Incoming Webhook принимает поле `text` напрямую. Для нативного формата Reactions нужен relay, как для Telegram.

## Проверка доставки

Временно укажите URL [webhook.site](https://webhook.site) и поставьте реакцию на странице. Убедитесь, что POST приходит с корректным JSON.

```bash
# Тест relay локально
curl -X POST http://localhost/webhook-relay.php \
  -H "Content-Type: application/json" \
  -d '{"event":"reaction.added","class_key":"modResource","object_id":1,"context":"web","type":"like","result":{"action":"added","counts":{"like":1},"total":1,"user_reaction":["like"],"type":"like"},"timestamp":1710000000}'
```

## Ограничения

- Webhook отправляется синхронно в том же запросе, что и реакция пользователя. Медленный endpoint увеличит время ответа API.
- Повторная доставка при сбое не выполняется.
- Секрет подписи (HMAC) в текущей версии не поддерживается. Для проверки подлинности используйте relay с авторизацией на своей стороне.

## Webhooks vs события MODX

| Механизм | Когда использовать |
| --- | --- |
| Webhooks | Внешние сервисы (Telegram, Discord, Slack, Zapier) |
| События MODX | Логика внутри MODX: кэш, права, кастомные уведомления |

Оба механизма могут работать одновременно. Подробнее о событиях — в [events.md](events).

## Уведомление авторов

Отдельная настройка `reactions_notify_authors` отправляет `modUserMessage` автору ресурса при новой реакции. Работает только для `modResource` и только при `action = added`. Не заменяет webhooks.
