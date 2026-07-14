---
title: События MODX
---
# События MODX

Reactions вызывает системные события при изменении реакций. Через плагины можно логировать, блокировать выборочные объекты, чистить кэш, слать уведомления.

Исходящие HTTP-колбэки после успеха — отдельно: [webhooks.md](webhooks). Встроенные сообщения автору — настройка `reactions_notify_authors`.

## Список событий

| Событие | Когда | Можно отменить |
| --- | --- | --- |
| `OnBeforeReaction` | После валидации запроса, **до** записи в БД | да (`cancel`) |
| `OnAfterReaction` | После успешной транзакции (любой `action`) | нет |
| `OnReactionRemoved` | Дополнительно, если `action = removed` | нет |
| `OnReactionChanged` | Дополнительно, если `action = changed` | нет |

`OnAfterReaction` всегда вызывается при успехе. Для снятия и смены типа следом идёт специализированное событие с теми же параметрами.

Регистрация: **Элементы → Плагины → вкладка «Системные события»**. События создаются при установке пакета.

---

## Порядок выполнения на сервере

Типичный путь `POST`/`DELETE` `action=react`:

```text
1. Origin + CSRF + nonce (API layer)
2. IdentityResolver (fingerprint / user_id)
3. BotDetector + ReactionBan + RateLimiter
4. Существование объекта (короткий class_key → FQCN/STI + object_id)
5. Тип активен. Тип ∈ набор (set). Для set=full — reactions_full_types
6. OnBeforeReaction  ← можно cancel
7. Транзакция БД (insert / update / delete)
8. OnAfterReaction
9. OnReactionRemoved  или  OnReactionChanged  (по action)
10. AggregateService::recount
11. WebhookDispatcher (если включён)
12. NotificationService (только для react/POST-ветви, не для чистого unreact-пути уведомлений — см. код)
```

Важно:

- На шаге 8–9 **агрегат ещё не пересчитан**. Читать `ReactionAggregate` из плагина `OnAfter*` для «свежих» чисел нельзя — либо пересчитайте сами, либо ориентируйтесь на поля `request` / `action`, либо подпишитесь на webhook (он уходит уже после recount в текущем flow сервиса — webhook получает `ReactionResult` с уже новыми counts).
- `OnBeforeReaction` срабатывает **после** rate limit и проверки объекта. Отмена не возвращает «слот» rate limit за этот запрос (лимит уже учтён).

---

## Параметры

Параметры передаются в `$scriptProperties` плагина и также доступны как локальные переменные в области видимости плагина (MODX `invokeEvent` + `compact`).

### Объекты DTO

`Reactions\Dto\ReactionRequest` (readonly):

| Свойство | Тип | Описание |
| --- | --- | --- |
| `classKey` | `string` | Например `modResource` |
| `objectId` | `int` | ID объекта |
| `typeName` | `string` | Имя типа (`like`, `fire`…) |
| `context` | `string` | Контекст MODX |
| `setKey` | `string` | Ключ набора. Может быть пустым до резолва default |
| `allowMultiple` | `bool` | Флаг из настройки на момент запроса |

`Reactions\Dto\VisitorIdentity` (readonly):

| Свойство | Тип | Описание |
| --- | --- | --- |
| `fingerprint` | `string` | Стабильный отпечаток для уникальности реакции |
| `userId` | `?int` | ID пользователя, если авторизован |
| `ipHash` | `?string` | Хеш IP (зависит от стратегии) |
| `sessionId` | `?string` | ID сессии (стратегия `session`) |

Модели xPDO:

- `Reactions\Model\ReactionType` — тип (`name`, `emoji`, `active`…)
- `Reactions\Model\ReactionSet` — набор (`key`, `exclusive`, `active`…)

### OnBeforeReaction

| Ключ | Тип | Описание |
| --- | --- | --- |
| `request` | `ReactionRequest` | Запрос |
| `identity` | `VisitorIdentity` | Кто ставит |
| `type` | `ReactionType` | Тип из БД |
| `set` | `ReactionSet` | Набор из БД |

Отмена:

```php
$modx->event->returnedValues['cancel'] = true;
```

Сервис бросает `ReactionNotAllowed` → API отвечает `403` / `code: forbidden` с лексиконом `reactions_err_forbidden`.

### OnAfterReaction, OnReactionRemoved, OnReactionChanged

| Ключ | Тип | Описание |
| --- | --- | --- |
| `request` | `ReactionRequest` | Запрос |
| `identity` | `VisitorIdentity` | Посетитель |
| `type` | `ReactionType` | Тип |
| `action` | `string` | `added` \| `removed` \| `changed` |

Значения `action` совпадают с полем `data.action` в ответе API и с событиями webhook (`reaction.added` и т.д.).

---

## Значения action

| `action` | Типичный сценарий |
| --- | --- |
| `added` | Первая реакция этого типа (или новая после снятия) |
| `removed` | Toggle снял реакцию или явный DELETE |
| `changed` | Exclusive: был `dislike`, стал `like` без отдельного remove в ответе клиенту |

Для `changed` срабатывают `OnAfterReaction` + `OnReactionChanged` (не `OnReactionRemoved`).

---

## Примеры плагинов

### Логирование

Событие: `OnAfterReaction`.

```php
<?php
/** @var \MODX\Revolution\modX $modx */
/** @var \Reactions\Dto\ReactionRequest $request */
/** @var \Reactions\Dto\VisitorIdentity $identity */
/** @var string $action */

$modx->log(
    \MODX\Revolution\modX::LOG_LEVEL_INFO,
    sprintf(
        '[Reactions] %s %s on %s#%d ctx=%s fp=%s user=%s',
        $action,
        $request->typeName,
        $request->classKey,
        $request->objectId,
        $request->context,
        $identity->fingerprint,
        $identity->userId ?? '-'
    )
);
```

### Запрет реакций на неопубликованные ресурсы

Событие: `OnBeforeReaction`.

```php
<?php
/** @var \MODX\Revolution\modX $modx */
/** @var \Reactions\Dto\ReactionRequest $request */

if ($request->classKey !== 'modResource'
    && $request->classKey !== 'MODX\\Revolution\\modResource'
) {
    return;
}

$resource = $modx->getObject(\MODX\Revolution\modResource::class, $request->objectId);
if (!$resource) {
    return;
}

if (!(bool) $resource->get('published') || (bool) $resource->get('deleted')) {
    $modx->event->returnedValues['cancel'] = true;
}
```

### Только определённые типы на комментариях

```php
<?php
/** @var \Reactions\Dto\ReactionRequest $request */

if ($request->classKey !== 'TicketComment') {
    return;
}

$allowed = ['like', 'dislike', 'funny'];
if (!in_array($request->typeName, $allowed, true)) {
    $modx->event->returnedValues['cancel'] = true;
}
```

### Инвалидация кэша ресурса (Fenom / pdoTools)

Событие: `OnAfterReaction`.

```php
<?php
/** @var \MODX\Revolution\modX $modx */
/** @var \Reactions\Dto\ReactionRequest $request */

if ($request->classKey === 'modResource' || str_contains($request->classKey, 'modResource')) {
    $modx->cacheManager->refresh([
        'resource' => ['contexts' => [$request->context]],
    ]);
    // Или точечно, если у вас ключи вида resource/{id}:
    // $modx->cacheManager->delete('resource/' . $request->objectId);
}
```

Точные ключи зависят от конфигурации кэша сайта.

### Уведомление в Telegram (быстрый прототип)

Событие: `OnAfterReaction`. Только `added`:

```php
<?php
/** @var \MODX\Revolution\modX $modx */
/** @var string $action */
/** @var \Reactions\Dto\ReactionRequest $request */

if ($action !== 'added') {
    return;
}

$token = $modx->getOption('telegram_bot_token');
$chatId = $modx->getOption('telegram_chat_id');
if (!$token || !$chatId) {
    return;
}

$text = sprintf(
    'Реакция %s на %s #%d (%s)',
    $request->typeName,
    $request->classKey,
    $request->objectId,
    $request->context
);

$url = sprintf(
    'https://api.telegram.org/bot%s/sendMessage?chat_id=%s&text=%s',
    rawurlencode($token),
    rawurlencode((string) $chatId),
    rawurlencode($text)
);

@file_get_contents($url);
```

На проде лучше [webhooks](webhooks) или очередь: плагин блокирует ответ API на время HTTP.

### Счётчик «только likes» во TV

```php
<?php
/** @var \MODX\Revolution\modX $modx */
/** @var string $action */
/** @var \Reactions\Dto\ReactionRequest $request */

if ($request->classKey !== 'modResource' || $request->typeName !== 'like') {
    return;
}

$resource = $modx->getObject(\MODX\Revolution\modResource::class, $request->objectId);
if (!$resource) {
    return;
}

$tv = (int) $resource->getTVValue('likes_mirror');
if ($action === 'added') {
    $tv++;
} elseif ($action === 'removed') {
    $tv = max(0, $tv - 1);
} else {
    return;
}

$resource->setTVValue('likes_mirror', $tv);
```

Учтите гонки при высокой нагрузке — надёжнее читать агрегат после recount (отложенный bus / cron).

---

## Связь с API и webhooks

| Слой | Что происходит |
| --- | --- |
| Плагин `OnBeforeReaction` + `cancel` | HTTP `403`, реакция не пишется, webhook не уходит |
| Успешный `react` | События → recount → webhook `reaction.*` → опционально message автору |
| Widget | Не видит события напрямую. Видит JSON `data.action` / `counts` |

Подпись webhook payload: см. [webhooks.md](webhooks). Имена событий там с префиксом `reaction.` (`reaction.added`), в MODX — без префикса (`OnAfterReaction` + `action=added`).

---

## Отладка

1. Включите уровень лога **INFO** / **ERROR** в системных настройках MODX.
2. Смотрите `core/cache/logs/error.log` (префиксы `[Reactions]`, ваш плагин).
3. Проверьте, что плагин **включён** и событие отмечено галочкой.
4. Тест отмены: неопубликованный ресурс + плагин выше → ответ API:

   ```json
   {
     "success": false,
     "error": "…",
     "code": "forbidden"
   }
   ```

5. Для отладки порядка повесьте временный лог на все четыре события и один `curl` на `POST react`.

---

## Чеклист плагина

- Не бросайте необработанные исключения из after-хуков: они могут превратиться в `500` после уже закоммиченной транзакции.
- Не делайте долгий HTTP/email синхронно в after — используйте webhook или очередь.
- Не полагайтесь на «multiselect» по имени набора: multi только при `!exclusive` **и** `reactions_allow_multiple`.
- Для фильтров UI (`&types=`) помните: API режет только `reactions_full_types` для `set=full`. Точечный запрет других типов — через `OnBeforeReaction`.
