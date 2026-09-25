---
title: Обработка своим сниппетом
description: Кастомный сниппет вместо FormIt, JSON-ответ success/message/data и FetchIt::service()
---

# Обработка своим сниппетом

Вместо FormIt можно указать свой сниппет в параметре `snippet`. Он получает поля формы и должен вернуть JSON с ключами:

| Ключ | Тип | Описание |
| --- | --- | --- |
| `success` | `bool` | Успех или ошибка |
| `message` | `string` | Текст для уведомления и блоков `[data-success]` / `[data-validation-error]` |
| `data` | `object` | При ошибке: имя поля → текст ошибки (для `[data-error]` и классов invalid) |

Собрать такой ответ помогают методы `error()` и `success()` сервиса. Сам сервис возьмите через `FetchIt::service()` — он работает и на MODX 2, и на MODX 3:

```php
<?php
/** @var modX $modx */
/** @var array $fields */
$FetchIt = FetchIt::service($modx);

if (empty($fields)) {
    // Вывод формы, а не отправка: сниппет вызывается и при каждом выводе.
    return '';
}

$name = trim((string) ($fields['name'] ?? ''));
if ($name === '') {
    return $FetchIt->error('Ошибки в форме', [
        'name' => 'Вы не заполнили имя',
    ]);
}

// ... сохранить, отправить письмо
return $FetchIt->success('Форма прошла проверку');
```

::: warning
Проверка `empty($fields)` обязательна: сниппет вызывается и при каждом выводе формы, с пустым `$fields`. Без неё он, например, отправит пустое письмо на каждый просмотр страницы.
:::

Можно вернуть и массив вручную с теми же ключами.

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

В `$scriptProperties` попадают сохранённые параметры вызова FetchIt и ключ `fields` — ассоциативный массив отправленных полей:

- при отправке через FetchIt это `$_POST`, файлы лежат в `$_FILES`;
- при обычной отправке формы без JavaScript — только `$_POST`.

Служебные поля [защиты](/components/fetchit/protection) из `fields` убраны. GET-параметров и cookies в `fields` нет: до FetchIt 4 сниппет получал `$_REQUEST`.

Не кладите в параметры вызова объекты PHP: перед записью в сессию или кеш они отбрасываются.

Контекст страницы формы клиент передаёт как `pageId` в FormData.

## Отправка без JavaScript

Ответ сниппета при обычной отправке не выводится: сообщение на странице покажется, только если сниппет сам поставит плейсхолдеры.

## Прежние способы получить сервис

Работают и они — возвращают тот же объект:

```php
// FetchIt 1.x, на MODX 2 и MODX 3
$FetchIt = $modx->getService('fetchit', 'FetchIt', MODX_CORE_PATH . 'components/fetchit/model/');

// FetchIt 3.x, только на MODX 3
$FetchIt = $modx->services->get('FetchIt');
```

Подробнее: [Переход на FetchIt 4](/components/fetchit/upgrade).
