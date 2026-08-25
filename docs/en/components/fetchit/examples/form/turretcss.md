---
title: turretcss form
description: FetchIt markup for turretcss with error class and form messages
---

# turretcss form

Example for [turretcss](https://turretcss.com/):

```html
<form>
  <p class="field">
    <label>Name</label>
    <input type="text" name="name" value="" />
    <p class="form-message error"></p>
  </p>
  <p class="field">
    <label>Email</label>
    <input type="email" name="email" value="" />
    <p class="form-message error"></p>
  </p>
  <p class="field">
    <button type="submit" class="button">Submit</button>
    <button type="reset" class="button">Reset</button>
  </p>
</form>
```

Steps:

1. Add `data-error` for error text.
2. Add `[data-success]` and `[data-validation-error]` for AJAX.
3. Add FormIt placeholders.
4. Set `fetchit.frontend.input.invalid.class` to `error`.

::: info
Set `action` to the page URL.
:::

::: code-group

```modx
<form> // [!code --]
<form action="[[~[[*id]]]]" method="post"> // [!code ++]
  <p class="field">
    <label>Name</label>
    <input type="text" name="name" value="" /> // [!code --]
    <input type="text" name="name" value="[[+fi.name]]" /> // [!code ++]
    <p class="form-message error"></p> // [!code --]
    <p class="form-message error" data-error="name">[[+fi.error.name]]</p> // [!code ++]
  </p>
  <p class="field">
    <label>Email</label>
    <input type="email" name="email" value="" /> // [!code --]
    <input type="email" name="email" value="[[+fi.email]]" /> // [!code ++]
    <p class="form-message error"></p> // [!code --]
    <p class="form-message error" data-error="email">[[+fi.error.email]]</p> // [!code ++]
  </p>
  <div role="alert" data-success style="display: none;"></div> // [!code ++]
  <div role="alert" data-validation-error style="display: none;"></div> // [!code ++]
  <p class="field">
    <button type="submit" class="button">Submit</button>
    <button type="reset" class="button">Reset</button>
  </p>
</form>
```

```fenom
<form> // [!code --]
<form action="{$_modx->resource.id | url}" method="post"> // [!code ++]
  <p class="field">
    <label>Name</label>
    <input type="text" name="name" value="" /> // [!code --]
    <input type="text" name="name" value="{$_modx->getPlaceholder('fi.name')}" /> // [!code ++]
    <p class="form-message error"></p> // [!code --]
    <p class="form-message error" data-error="name">{$_modx->getPlaceholder('fi.error.name')}</p> // [!code ++]
  </p>
  <p class="field">
    <label>Email</label>
    <input type="email" name="email" value="" /> // [!code --]
    <input type="email" name="email" value="{$_modx->getPlaceholder('fi.email')}" /> // [!code ++]
    <p class="form-message error"></p> // [!code --]
    <p class="form-message error" data-error="email">{$_modx->getPlaceholder('fi.error.email')}</p> // [!code ++]
  </p>
  <div role="alert" data-success style="display: none;"></div> // [!code ++]
  <div role="alert" data-validation-error style="display: none;"></div> // [!code ++]
  <p class="field">
    <button type="submit" class="button">Submit</button>
    <button type="reset" class="button">Reset</button>
  </p>
</form>
```

:::
