---
title: Форма на Bulma
description: Разметка FetchIt под Bulma с is-danger и сообщениями формы
---

# Форма на Bulma

Пример на [Bulma](https://bulma.io/):

```html
<form>
  <div class="field">
    <label class="label">Username</label>
    <div class="control">
      <input class="input" type="text" name="name" value="">
    </div>
    <p class="help is-danger"></p>
  </div>

  <div class="field">
    <label class="label">Email</label>
    <div class="control">
      <input class="input" type="email" name="email" value="">
    </div>
    <p class="help is-danger"></p>
  </div>

  <div class="field is-grouped">
    <div class="control">
      <button type="submit" class="button is-link">Submit</button>
    </div>
    <div class="control">
      <button type="reset" class="button is-link is-light">Cancel</button>
    </div>
  </div>
</form>
```

Что сделать:

1. Добавить `data-error` для текста ошибки поля.
2. Добавить `[data-success]` и `[data-validation-error]` для AJAX-сообщений формы.
3. Проставить плейсхолдеры FormIt.
4. В `fetchit.frontend.input.invalid.class` указать `is-danger`.

::: info
В `action` укажите URL страницы.
:::

::: code-group

```modx
<form> // [!code --]
<form action="[[~[[*id]]]]" method="post"> // [!code ++]
  <div class="field">
    <label class="label">Username</label>
    <div class="control">
      <input class="input" type="text" name="name" value=""> // [!code --]
      <input class="input" type="text" name="name" value="[[+fi.name]]"> // [!code ++]
    </div>
    <p class="help is-danger"></p> // [!code --]
    <p class="help is-danger" data-error="name">[[+fi.error.name]]</p> // [!code ++]
  </div>

  <div class="field">
    <label class="label">Email</label>
    <div class="control">
      <input class="input" type="email" name="email" value=""> // [!code --]
      <input class="input" type="email" name="email" value="[[+fi.email]]"> // [!code ++]
    </div>
    <p class="help is-danger"></p> // [!code --]
    <p class="help is-danger" data-error="email">[[+fi.error.email]]</p> // [!code ++]
  </div>

  <div class="notification is-success" role="alert" data-success style="display: none;"></div> // [!code ++]
  <div class="notification is-danger" role="alert" data-validation-error style="display: none;"></div> // [!code ++]

  <div class="field is-grouped">
    <div class="control">
      <button type="submit" class="button is-link">Submit</button>
    </div>
    <div class="control">
      <button type="reset" class="button is-link is-light">Cancel</button>
    </div>
  </div>
</form>
```

```fenom
<form> // [!code --]
<form action="{$_modx->resource.id | url}" method="post"> // [!code ++]
  <div class="field">
    <label class="label">Username</label>
    <div class="control">
      <input class="input" type="text" name="name" value=""> // [!code --]
      <input class="input" type="text" name="name" value="{$_modx->getPlaceholder('fi.name')}"> // [!code ++]
    </div>
    <p class="help is-danger"></p> // [!code --]
    <p class="help is-danger" data-error="name">{$_modx->getPlaceholder('fi.error.name')}</p> // [!code ++]
  </div>

  <div class="field">
    <label class="label">Email</label>
    <div class="control">
      <input class="input" type="email" name="email" value=""> // [!code --]
      <input class="input" type="email" name="email" value="{$_modx->getPlaceholder('fi.email')}"> // [!code ++]
    </div>
    <p class="help is-danger"></p> // [!code --]
    <p class="help is-danger" data-error="email">{$_modx->getPlaceholder('fi.error.email')}</p> // [!code ++]
  </div>

  <div class="notification is-success" role="alert" data-success style="display: none;"></div> // [!code ++]
  <div class="notification is-danger" role="alert" data-validation-error style="display: none;"></div> // [!code ++]

  <div class="field is-grouped">
    <div class="control">
      <button type="submit" class="button is-link">Submit</button>
    </div>
    <div class="control">
      <button type="reset" class="button is-link is-light">Cancel</button>
    </div>
  </div>
</form>
```

:::
