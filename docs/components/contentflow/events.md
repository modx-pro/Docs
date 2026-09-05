# Системные события

## OnContentFlowResourcePublished

Событие вызывается после того, как ContentFlow впервые публикует полностью
заполненный ресурс и очищает кэш MODX.

Событие не вызывается:

- при сохранении неопубликованного черновика;
- при повторе Publisher для уже опубликованного ресурса;
- при обычном сохранении ресурса пользователем MODX.

Параметры:

| Параметр | Описание |
|---|---|
| `resource` | объект `MODX\Revolution\modResource` |
| `id` | ID созданного ресурса |
| `task_id` | ID задачи ContentFlow |
| `context_key` | ключ контекста ресурса |

## Пример плагина

Создайте обычный плагин MODX и включите для него событие
`OnContentFlowResourcePublished`. В обработчике доступны сам ресурс и сведения о
задаче ContentFlow.

```php
<?php

use MODX\Revolution\modContext;
use MODX\Revolution\modResource;
use MODX\Revolution\modX;

if ($modx->event->name !== 'OnContentFlowResourcePublished') {
    return;
}

if (!isset($resource)
    || !$resource instanceof modResource
    || !$resource->get('published')
) {
    return;
}

$contextKey = (string) ($resource->get('context_key') ?: 'web');
$context = $modx->getContext($contextKey);
if (!$context instanceof modContext) {
    return;
}

$url = $context->makeUrl(
    (int) $resource->get('id'),
    '',
    'https'
);

$modx->log(
    modX::LOG_LEVEL_INFO,
    '[ContentFlow] Published: ' . $url
);
```

Для формирования URL в CLI используйте объект нужного контекста. Вызов
`$modx->makeUrl()` при переключении контекста может применить схему и настройки
исходного контекста, тогда как `$context->makeUrl()` работает непосредственно с
контекстом опубликованного ресурса.
