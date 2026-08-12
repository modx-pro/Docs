---
title: Bulma form
description: FetchIt markup for Bulma with is-danger and form messages
---

# Bulma form

Example for [Bulma](https://bulma.io/):

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

Steps:

1. Add `data-error` for field error text.
2. Add `[data-success]` and `[data-validation-error]` for AJAX form messages.
3. Add FormIt placeholders.
4. Set `fetchit.frontend.input.invalid.class` to `is-danger`.

::: info
Set `action` to the page URL.
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
