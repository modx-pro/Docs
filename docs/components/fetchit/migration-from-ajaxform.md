---
title: Миграция с AjaxForm
description: Переход с AjaxForm на FetchIt: селекторы, JSON success, события без jQuery
---

# Миграция с AjaxForm

Чеклист замены AjaxForm на FetchIt: стили, тосты, вызов сниппета, разметка, свой обработчик и JS-события.

## Стили

FetchIt не подключает CSS. Классы невалидных полей задайте в [`fetchit.frontend.input.invalid.class`](/components/fetchit/settings#fetchitfrontendinputinvalidclass) и при необходимости в [`fetchit.frontend.custom.invalid.class`](/components/fetchit/settings#fetchitfrontendcustominvalidclass), а сами стили держите в теме сайта.

## Всплывающие сообщения

В AjaxForm из коробки идёт jGrowl. В FetchIt тосты опциональны: включите Notyf (`fetchit.frontend.default.notifier`) или подключите свою библиотеку.

[Примеры](/components/fetchit/examples/notifications/).

## Вызов сниппета

Основные параметры (`form`, `snippet`, `actionUrl`, `clearFieldsOnSuccess`) те же. Путь к JS и имя класса ушли в [системные настройки](/components/fetchit/settings). Параметры `frontend_css` и `formSelector` убраны.

::: code-group

```modx
[[!FetchIt?
  &form=`название чанка`
  &snippet=`FormIt`
  &actionUrl=`[[+assetsUrl]]action.php`
  &clearFieldsOnSuccess=`1`
  &frontend_js=`` // [!code warning] Системная настройка: fetchit.frontend.js
  &objectName=`` // [!code warning] Системная настройка: fetchit.frontend.js.classname
  &frontend_css=`` // [!code --]
  &formSelector=`` // [!code --]
]]
```

```fenom
{'!FetchIt' | snippet : [
  'form' => 'название чанка',
  'snippet' => 'FormIt',
  'actionUrl' => '[[+assetsUrl]]action.php',
  'clearFieldsOnSuccess' => true,
  'frontend_js' => '', // [!code warning] Системная настройка: fetchit.frontend.js
  'objectName' => '', // [!code warning] Системная настройка: fetchit.frontend.js.classname
  'frontend_css' => '', // [!code --]
  'formSelector' => '', // [!code --]
]}
```

:::

## Разметка формы

Селекторы ошибок: вместо `.error_name` используйте `[data-error="name"]`. Класс `ajax_form` не нужен: сниппет ставит `data-fetchit`.

С **1.1.3** для AJAX добавьте `[data-success]` и `[data-validation-error]` (см. [селекторы](/components/fetchit/selectors)). В AjaxForm часто хватало только `[[+fi.successMessage]]` после перезагрузки.

Чанк AjaxForm → FetchIt:

::: code-group

```modx
<form action="[[~[[*id]]]]" method="post" class="ajax_form"> // [!code --]
<form action="[[~[[*id]]]]" method="post"> // [!code ++]

  <div class="form-group">
    <label class="control-label">Имя</label>
    <div class="controls">
      <input type="text" name="name" value="[[+fi.name]]" class="form-control"/>
      <span class="error_name">[[+fi.error.name]]</span> // [!code --]
      <span data-error="name">[[+fi.error.name]]</span> // [!code ++]
    </div>
  </div>

  <div class="form-group">
    <label class="control-label">Email</label>
    <div class="controls">
      <input type="email" name="email" value="[[+fi.email]]" class="form-control"/>
      <span class="error_email">[[+fi.error.email]]</span> // [!code --]
      <span data-error="email">[[+fi.error.email]]</span> // [!code ++]
    </div>
  </div>

  <div class="form-group">
    <label class="control-label">Сообщение</label>
    <div class="controls">
      <textarea name="message" class="form-control" rows="5">[[+fi.message]]</textarea>
      <span class="error_message">[[+fi.error.message]]</span> // [!code --]
      <span data-error="message">[[+fi.error.message]]</span> // [!code ++]
    </div>
  </div>

  <div role="alert" data-success style="display: none;"></div> // [!code ++]
  <div role="alert" data-validation-error style="display: none;"></div> // [!code ++]

  <div class="form-group">
    <div class="controls">
      <button type="reset" class="btn btn-default">Сбросить</button>
      <button type="submit" class="btn btn-primary">Отправить</button>
    </div>
  </div>
</form>
```

```fenom
<form action="{$_modx->resource.id | url}" method="post" class="ajax_form"> // [!code --]
<form action="{$_modx->resource.id | url}" method="post"> // [!code ++]

  <div class="form-group">
    <label class="control-label">Имя</label>
    <div class="controls">
      <input type="text" name="name" value="{$_modx->getPlaceholder('fi.name')}" class="form-control"/>
      <span class="error_name">{$_modx->getPlaceholder('fi.error.name')}</span> // [!code --]
      <span data-error="name">{$_modx->getPlaceholder('fi.error.name')}</span> // [!code ++]
    </div>
  </div>

  <div class="form-group">
    <label class="control-label">Email</label>
    <div class="controls">
      <input type="email" name="email" value="{$_modx->getPlaceholder('fi.email')}" class="form-control"/>
      <span class="error_email">{$_modx->getPlaceholder('fi.error.email')}</span> // [!code --]
      <span data-error="email">{$_modx->getPlaceholder('fi.error.email')}</span> // [!code ++]
    </div>
  </div>

  <div class="form-group">
    <label class="control-label">Сообщение</label>
    <div class="controls">
      <textarea name="message" class="form-control" rows="5">{$_modx->getPlaceholder('fi.message')}</textarea>
      <span class="error_message">{$_modx->getPlaceholder('fi.error.message')}</span> // [!code --]
      <span data-error="message">{$_modx->getPlaceholder('fi.error.message')}</span> // [!code ++]
    </div>
  </div>

  <div role="alert" data-success style="display: none;"></div> // [!code ++]
  <div role="alert" data-validation-error style="display: none;"></div> // [!code ++]

  <div class="form-group">
    <div class="controls">
      <button type="reset" class="btn btn-default">Сбросить</button>
      <button type="submit" class="btn btn-primary">Отправить</button>
    </div>
  </div>
</form>
```

:::

## Свой сниппет вместо FormIt

AjaxForm ждал JSON с ключом `status` (0/1). FetchIt ждёт `success` (bool). Объект компонента в `$scriptProperties` с 1.1.3 не передаётся: берите через `getService`. Пример: [свой сниппет](/components/fetchit/snippets/custom).

## Валидация на стороне клиента

Было (jQuery + AjaxForm):

```js
$(document).on('submit', '.ajax_form', function() {
  // Код валидации
  afValidated = false;
});
```

Стало:

```js
document.addEventListener('fetchit:before', (e) => {
  const { form, fetchit } = e.detail

  // Код валидации

  // Если не прошла валидация
  fetchit.setError('название_поля', 'Выводимое сообщение') // необязательно
  e.preventDefault()
})
```

<!--@include: ./parts/validation.warning.md-->

## Событие `af_complete`

У AjaxForm одно событие после ответа сервера. Аналог: [`fetchit:after`](/components/fetchit/frontend/events#fetchitafter). Оно срабатывает и при успехе, и при ошибке. Для ветвления используйте [`fetchit:success`](/components/fetchit/frontend/events#fetchitsuccess) и [`fetchit:error`](/components/fetchit/frontend/events#fetchiterror).

Было:

```js
$(document).on('af_complete', function(event, response) {
  var form = response.form
  if (form.attr('id') == 'my_form_3') {
    form.hide()
  } else {
    console.log(response)
  }
})
```

Стало:

```js
document.addEventListener('fetchit:after', (e) => {
  const { form, response } = e.detail
  if (form.getAttribute('id') === 'my_form_3') {
    form.style.display = 'none'
  } else {
    console.log(response)
  }
})
```

::: warning
В `detail.form` лежит нативный `HTMLFormElement`, не jQuery-объект. Методов `attr()` и `hide()` у него нет.
:::
