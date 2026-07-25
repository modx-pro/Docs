---
title: PHP API
description: Программный доступ к рассылкам Sendex из сниппетов и плагинов MODX
---
# PHP API

Публичного REST API у Sendex нет. Работа идёт через xPDO-модели и классы `sx*` из контекста MODX (сниппет, плагин, cron).

## Инициализация

Cron и connector подключают bootstrap автоматически. В своём коде:

```php
$corePath = $modx->getOption('sendex_core_path', null, MODX_CORE_PATH . 'components/sendex/');
require_once $corePath . 'bootstrap.php';
sendexBootstrap($modx);
```

## sxNewsletter

```php
/** @var sxNewsletter $newsletter */
$newsletter = $modx->getObject('sxNewsletter', 1);
if (!$newsletter) {
    return;
}
```

| Метод | Описание |
| --- | --- |
| `subscribe($userId, $email, $source)` | Подписка; `$source`: `snippet`, `ajax`, `confirm`, `mgr`, `guest` |
| `unSubscribe($code, $source)` | Отписка по `sxSubscriber.code` |
| `confirmEmail($hash)` | Подтверждение guest после перехода по ссылке |
| `isSubscribed($userId, $email)` | ID подписчика или `0` |
| `addQueues()` | Сформировать очередь для всех подписчиков рассылки |
| `sendToSubscribers($options)` | `addQueues()` + `flush()` одним вызовом |

### Подписка пользователя из плагина

```php
$newsletter = $modx->getObject('sxNewsletter', 1);
$result = $newsletter->subscribe($modx->user->id, '', 'mgr');
// true | false | string (сообщение об ошибке / отмена Before-события)
```

### Отправка рассылки

```php
$newsletter = $modx->getObject('sxNewsletter', 1);
$result = $newsletter->sendToSubscribers([
    'stopOnError' => true,
]);
// ['success' => bool, 'message' => string, 'queued' => int, 'sent' => int, ...]
```

## sxQueueSender

Низкоуровневая отправка очереди (cron использует тот же класс):

```php
require_once MODX_CORE_PATH . 'components/sendex/model/sendex/sxqueuesender.class.php';

$stats = sxQueueSender::flush($modx, [
    'limit'     => (int) $modx->getOption('sendex_queue_limit', null, 100),
    'logErrors' => true,
    'criteria'  => ['newsletter_id' => 1], // опционально
]);
// ['sent' => int, 'skipped' => int, 'failed' => int, 'firstError' => string|null]
```

Одна строка:

```php
$queue = $modx->getObject('sxQueue', 42);
$result = sxQueueSender::sendOne($queue);
// true | false (skip) | string (ошибка mail)
```

## Чего нет в API

- Метода `$queue->send()` у `sxQueue` — используйте `sxQueueSender::sendOne()`
- HTTP-эндпоинта для подписки — только сниппет `Sendex` на сайте
- Автоматического удаления таблиц при uninstall

## События

Любой вызов `subscribe`, `unSubscribe`, `addQueues`, `flush` проходит через события `sxOn*`. Подробнее: [События](events).

## Связанные разделы

- [Очередь писем](../interface/queue) — менеджер и cron
- [FAQ](../faq) — типичные ошибки при отправке
- [Сниппет Sendex](../snippets/sendex) — frontend-подписка
