---
title: Форма на UIkit
description: Разметка FetchIt под UIkit с uk-form-danger и сообщениями формы
---

# Форма на UIkit

Типовая форма на [UIkit](https://getuikit.com/):

```html
<form>
  <fieldset class="uk-fieldset">
    <legend class="uk-legend">Legend</legend>
    <div class="uk-margin">
      <label class="uk-form-label" for="name">Name</label>
      <div class="uk-form-controls">
        <input class="uk-input" id="name" name="name" type="text">
      </div>
    </div>
    <div class="uk-margin">
      <label class="uk-form-label" for="email">Email</label>
      <div class="uk-form-controls">
        <input class="uk-input" id="email" name="email" type="text">
      </div>
    </div>
    <div class="uk-margin">
      <label class="uk-form-label" for="message">Message</label>
      <div class="uk-form-controls">
        <textarea class="uk-textarea" id="message" name="message" rows="5"></textarea>
      </div>
    </div>
    <div class="uk-margin">
      <button class="uk-button uk-button-primary">Submit</button>
    </div>
  </fieldset>
</form>
```

Что сделать:

1. Добавить `data-error` для текста ошибки поля.
2. Добавить `[data-success]` и `[data-validation-error]` для AJAX-сообщений формы.
3. Проставить плейсхолдеры FormIt.
4. В `fetchit.frontend.input.invalid.class` указать `uk-form-danger`.

::: info
В `action` укажите URL страницы.
:::

::: code-group

```modx
<form> // [!code --]
<form action="[[~[[*id]]]]" method="post"> // [!code ++]
  <fieldset class="uk-fieldset">
    <legend class="uk-legend">Form legend</legend>
    <div class="uk-margin">
      <label class="uk-form-label" for="name">Name</label>
      <div class="uk-form-controls">
        <input class="uk-input" id="name" name="name" type="text"> // [!code --]
        <input class="uk-input" id="name" name="name" type="text" value="[[+fi.name]]"> // [!code ++]
        <span class="uk-text-danger" data-error="name">[[+fi.error.name]]</span> // [!code ++]
      </div>
    </div>
    <div class="uk-margin">
      <label class="uk-form-label" for="email">Email</label>
      <div class="uk-form-controls">
        <input class="uk-input" id="email" name="email" type="text"> // [!code --]
        <input class="uk-input" id="email" name="email" type="text" value="[[+fi.email]]"> // [!code ++]
        <span class="uk-text-danger" data-error="email">[[+fi.error.email]]</span> // [!code ++]
      </div>
    </div>
    <div class="uk-margin">
      <label class="uk-form-label" for="message">Message</label>
      <div class="uk-form-controls">
        <textarea class="uk-textarea" id="message" name="message" rows="5"></textarea> // [!code --]
        <textarea class="uk-textarea" id="message" name="message" rows="5">[[+fi.message]]</textarea> // [!code ++]
        <span class="uk-text-danger" data-error="message">[[+fi.error.message]]</span> // [!code ++]
      </div>
    </div>
    <div class="uk-alert-success" role="alert" data-success style="display: none;"></div> // [!code ++]
    <div class="uk-alert-danger" role="alert" data-validation-error style="display: none;"></div> // [!code ++]
    <div class="uk-margin">
      <button class="uk-button uk-button-primary" type="submit">Submit</button>
    </div>
  </fieldset>
</form>
```

```fenom
<form> // [!code --]
<form action="{$_modx->resource.id | url}" method="post"> // [!code ++]
  <fieldset class="uk-fieldset">
    <legend class="uk-legend">Form legend</legend>
    <div class="uk-margin">
      <label class="uk-form-label" for="name">Name</label>
      <div class="uk-form-controls">
        <input class="uk-input" id="name" name="name" type="text"> // [!code --]
        <input class="uk-input" id="name" name="name" type="text" value="{$_modx->getPlaceholder('fi.name')}"> // [!code ++]
        <span class="uk-text-danger" data-error="name">{$_modx->getPlaceholder('fi.error.name')}</span> // [!code ++]
      </div>
    </div>
    <div class="uk-margin">
      <label class="uk-form-label" for="email">Email</label>
      <div class="uk-form-controls">
        <input class="uk-input" id="email" name="email" type="text"> // [!code --]
        <input class="uk-input" id="email" name="email" type="text" value="{$_modx->getPlaceholder('fi.email')}"> // [!code ++]
        <span class="uk-text-danger" data-error="email">{$_modx->getPlaceholder('fi.error.email')}</span> // [!code ++]
      </div>
    </div>
    <div class="uk-margin">
      <label class="uk-form-label" for="message">Message</label>
      <div class="uk-form-controls">
        <textarea class="uk-textarea" id="message" name="message" rows="5"></textarea> // [!code --]
        <textarea class="uk-textarea" id="message" name="message" rows="5">{$_modx->getPlaceholder('fi.message')}</textarea> // [!code ++]
        <span class="uk-text-danger" data-error="message">{$_modx->getPlaceholder('fi.error.message')}</span> // [!code ++]
      </div>
    </div>
    <div class="uk-alert-success" role="alert" data-success style="display: none;"></div> // [!code ++]
    <div class="uk-alert-danger" role="alert" data-validation-error style="display: none;"></div> // [!code ++]
    <div class="uk-margin">
      <button class="uk-button uk-button-primary" type="submit">Submit</button>
    </div>
  </fieldset>
</form>
```

:::
