---
title: Обработка своим сниппетом
description: Кастомный сниппет вместо FormIt, JSON-ответ success/message/data и getService
---

# Обработка своим сниппетом

Вместо FormIt можно указать свой сниппет в параметре `snippet`. Он получает поля формы и должен вернуть JSON с ключами:

| Ключ | Тип | Описание |
| --- | --- | --- |
| `success` | `bool` | Успех или ошибка |
| `message` | `string` | Текст для уведомления и блоков `[data-success]` / `[data-validation-error]` |
| `data` | `object` | При ошибке: имя поля → текст ошибки (для `[data-error]` и классов invalid) |

С версии **1.1.3** объект FetchIt **не** передаётся в `$scriptProperties` (сериализация PDO-сессии). Получите сервис сами:

```php
<?php
/** @var modX $modx */
$FetchIt = $modx->getService(
    'fetchit',
    'FetchIt',
    MODX_CORE_PATH . 'components/fetchit/model/'
);

if (!$FetchIt) {
    return json_encode([
        'success' => false,
        'message' => 'FetchIt is not available',
        'data' => [],
    ], JSON_UNESCAPED_UNICODE);
}

$name = trim((string) ($_POST['name'] ?? ''));
if ($name === '') {
    return $FetchIt->error('Ошибки в форме', [
        'name' => 'Вы не заполнили имя',
    ]);
}

return $FetchIt->success('Форма прошла проверку');
```

Методы `error()` / `success()` собирают тот же JSON. Можно вернуть массив вручную с теми же ключами.

## Вызов

::: code-group

```modx
[[!FetchIt?
  &snippet=`MySnippet`
  &form=`tpl.FetchIt.example`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'snippet' => 'MySnippet',
  'form' => 'tpl.FetchIt.example',
]}
```

:::

## Что приходит в сниппет

В `$scriptProperties` попадают сохранённые параметры вызова FetchIt и ключ `fields`: ассоциативный массив полей из POST. Те же значения доступны в `$_POST`. Файлы: в `$_FILES`.

Не кладите в параметры вызова объекты PHP: перед записью в сессию или cache они отбрасываются.

Контекст страницы формы клиент передаёт как `pageId` в FormData.
