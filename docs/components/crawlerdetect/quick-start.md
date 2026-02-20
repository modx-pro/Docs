---
title: Быстрый старт
---
# Быстрый старт

За 2 минуты: защитить контактную форму от ботов.

## Шаг 1: Откройте страницу с формой

Откройте в редакторе MODX страницу, на которой выводится форма обратной связи (или другая форма на FormIt).

## Шаг 2: Добавьте preHook в вызов FormIt

Найдите вызов FormIt и добавьте в него `crawlerDetectBlock` в параметр **preHooks**.

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
{if $modx->getPlaceholder('fi.validation_error_message')}
  <div class="error">{$modx->getPlaceholder('fi.validation_error_message')}</div>
{/if}
<form action="{$modx->makeUrl($modx->resource->id)}" method="post">
  <input type="text" name="name" value="{$modx->getPlaceholder('fi.name')}" />
  <input type="email" name="email" value="{$modx->getPlaceholder('fi.email')}" />
  <button type="submit" name="submit">Отправить</button>
</form>
```

:::

Сообщение при блокировке ботом выводится через плейсхолдер `[[+fi.validation_error_message]]` (MODX) или `{$modx->getPlaceholder('fi.validation_error_message')}` (Fenom). Текст сообщения настраивается в [системных настройках](settings).

## Шаг 3: Сохраните страницу

Форма защищена от ботов.

## Что дальше

- [Системные настройки](settings) — текст сообщения при блокировке, логирование
- [Сниппеты](snippets/) — isCrawler и crawlerDetectBlock, параметры
- [Интеграция](integration) — защита форм, скрытие контента, типовые сценарии
- [Решение проблем](troubleshooting) — если форма не блокируется или сообщение не показывается
