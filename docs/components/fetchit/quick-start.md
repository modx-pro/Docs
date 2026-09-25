---
title: Быстрый старт
description: Первый вызов FetchIt с FormIt, чанком формы и сообщениями об ошибках
---

# Быстрый старт

Вызовите некэшированный сниппет **FetchIt** и укажите чанк формы в `form`. По умолчанию работает FormIt: параметры `hooks`, `validate`, `emailTo` и остальные уходят в него как есть.

::: warning
Перед именем сниппета нужен `!`, иначе чанк и action попадут в кэш страницы.
:::

::: code-group

```modx
[[!FetchIt?
  &snippet=`FormIt`
  &form=`myForm.tpl`
  &hooks=`email`
  &emailSubject=`Тема письма`
  &emailTo=`info@domain.com`
  &validate=`name:required,email:required`
  &validationErrorMessage=`В форме содержатся ошибки!`
  &successMessage=`Сообщение успешно отправлено`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'snippet' => 'FormIt',
  'form' => 'myForm.tpl',
  'hooks' => 'email',
  'emailSubject' => 'Тема письма',
  'emailTo' => 'info@domain.com',
  'validate' => 'name:required,email:required',
  'validationErrorMessage' => 'В форме содержатся ошибки!',
  'successMessage' => 'Сообщение успешно отправлено',
]}
```

:::

`successMessage` уходит в AJAX-ответ при успехе FormIt и показывается в `[data-success]` и через `FetchIt.Message`.

## Чанк формы

Минимум: `data-error` у контейнеров ошибок полей (значение = `name` поля) и плейсхолдеры FormIt для значений после обычного POST.

Для AJAX добавьте блоки `[data-success]` и `[data-validation-error]`. Без них текст успеха или ошибки формы на клиенте не появится. Подробнее: [Селекторы](/components/fetchit/selectors).

::: code-group

```modx [myForm.tpl]
<form action="[[~[[*id]]]]" method="post">
  <label>
    Ваше имя
    <input type="text" name="name" value="[[+fi.name]]">
    <span data-error="name">[[+fi.error.name]]</span>
  </label>

  <label>
    E-mail
    <input type="email" name="email" value="[[+fi.email]]">
    <span data-error="email">[[+fi.error.email]]</span>
  </label>

  <button type="submit">Отправить</button>

  <div role="alert" data-success
        style="display: [[+fi.success:is=`1`:then=``:else=`none`]];">
    [[+fi.successMessage]]
  </div>
  <div role="alert" data-validation-error
        style="display: [[+fi.validation_error:is=`1`:then=``:else=`none`]];">
    [[+fi.validation_error_message]]
  </div>
</form>
```

```fenom [myForm.tpl]
<form action="{$_modx->resource.id | url}" method="post">
  <label>
    Ваше имя
    <input type="text" name="name" value="{$_modx->getPlaceholder('fi.name')}">
    <span data-error="name">{$_modx->getPlaceholder('fi.error.name')}</span>
  </label>

  <label>
    E-mail
    <input type="email" name="email" value="{$_modx->getPlaceholder('fi.email')}">
    <span data-error="email">{$_modx->getPlaceholder('fi.error.email')}</span>
  </label>

  <button type="submit">Отправить</button>

  <div role="alert" data-success
       style="display: {if $_modx->getPlaceholder('fi.success') == 1}{else}none{/if};">
    {$_modx->getPlaceholder('fi.successMessage')}
  </div>
  <div role="alert" data-validation-error
       style="display: {if $_modx->getPlaceholder('fi.validation_error') == 1}{else}none{/if};">
    {$_modx->getPlaceholder('fi.validation_error_message')}
  </div>
</form>
```

:::

Сниппет сам допишет `data-fetchit` и `method="post"`, если их нет.

Класс невалидного поля по умолчанию: `is-invalid` (настройка `fetchit.frontend.input.invalid.class`). Подстройте под свою вёрстку.

## Уведомления

Пока `fetchit.frontend.default.notifier` выключен, уведомления не показываются: видны только блоки в форме и ошибки полей. Включите настройку, чтобы показывать ответы [встроенными уведомлениями](/components/fetchit/examples/notifications/#vstroennye-uvedomleniya), или подключите свою библиотеку: [Всплывающие сообщения](/components/fetchit/examples/notifications/).

После успеха поля очищаются, если `clearFieldsOnSuccess` не отключён (`1` по умолчанию).

## Защита от спама

Форма закрыта от ботов сразу: одноразовый токен, минимальное время заполнения (3 секунды), скрытое поле-ловушка и лимит отправок. Настраивать ничего не нужно, служебные поля в письма не попадают.

Что об этом стоит знать:

- на сайте для разработки и в автотестах поставьте `fetchit.protection.min_time` и `fetchit.protection.rate_limit` в `0`;
- страницы с формами лучше исключить из кеша всей страницы на стороне сервера или CDN;
- если спам всё равно проходит, включите proof-of-work или капчу.

Подробно: [Защита от спама](/components/fetchit/protection).
