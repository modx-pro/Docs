---
title: Быстрый старт
---
# Быстрый старт

За 2 минуты: защитить контактную форму от ботов.

## Шаг 1: Откройте страницу с формой

В редакторе MODX откройте страницу с формой на FormIt.

## Шаг 2: Добавьте preHook в вызов FormIt

В параметр **preHooks** добавьте `crawlerDetectBlock`.

::: code-group

```modx
[[!FormIt?
  &preHooks=`crawlerDetectBlock`
  &hooks=`email,redirect`
  &validate=`name:required,email:required:email`
  &redirectTo=`[[*id]]`
  &emailTo=`[[++emailsender]]`
  &emailSubject=`Обратная связь`
]]
[[+fi.validation_error_message]]
<form action="[[~[[*id]]]]" method="post">
  <input type="text" name="name" value="[[+fi.name]]" />
  <input type="email" name="email" value="[[+fi.email]]" />
  <button type="submit" name="submit">Отправить</button>
</form>
```

```fenom
{$modx->runSnippet('FormIt', [
  'preHooks' => 'crawlerDetectBlock',
  'hooks' => 'email,redirect',
  'validate' => 'name:required,email:required:email',
  'redirectTo' => $modx->resource->id,
  'emailTo' => $modx->getOption('emailsender'),
  'emailSubject' => 'Обратная связь'
])}
{$modx->getPlaceholder('fi.validation_error_message')}
<form action="{$modx->makeUrl($modx->resource->id)}" method="post">
  <input type="text" name="name" value="{$modx->getPlaceholder('fi.name')}" />
  <input type="email" name="email" value="{$modx->getPlaceholder('fi.email')}" />
  <button type="submit" name="submit">Отправить</button>
</form>
```

:::

Сообщение при блокировке ботом выводится через `[[+fi.validation_error_message]]` (MODX) или `{$modx->getPlaceholder('fi.validation_error_message')}` (Fenom). Текст задаётся в [системных настройках](settings).

## Шаг 3: Сохраните страницу

Форма защищена от ботов.

## Что дальше

- [Системные настройки](settings): текст сообщения, логирование
- [Сниппеты](snippets/): `isCrawler` и `crawlerDetectBlock`
- [Интеграция](integration): формы, скрытие контента, сценарии
- [Решение проблем](troubleshooting): форма не блокируется, сообщение не видно
