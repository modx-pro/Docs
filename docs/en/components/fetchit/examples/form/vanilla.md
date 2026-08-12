---
title: Vanilla form
description: FetchIt markup for Vanilla Framework with data-custom and is-error
---

# Vanilla form

In [Vanilla Framework](https://vanillaframework.io/), like [Fomantic UI](/en/components/fetchit/examples/form/fomantic), the error class goes on the field wrapper. Use `[data-custom]` for that. Vanilla expects inputs inside an element with class `p-form-validation`:

```html
<form>
  <div class="p-form-validation">
    <label>Name</label>
    <input class="p-form-validation__input" type="text" name="name" value="">
    <p class="p-form-validation__message"></p>
  </div>
  <div class="p-form-validation" data-custom="email">
    <label>Email</label>
    <input class="p-form-validation__input" type="email" name="email" value="">
    <p class="p-form-validation__message"></p>
  </div>
  <button type="submit" class="p-button--positive">Submit</button>
  <button type="reset" class="p-button">Reset</button>
</form>
```

Steps:

1. Add `data-custom` on field wrappers and set `fetchit.frontend.custom.invalid.class` to `is-error`.
2. Add `data-error` for field error text.
3. Add `[data-success]` and `[data-validation-error]` for AJAX form messages.
4. Add FormIt placeholders.

::: info
Markup validators flag an empty `action`. Set it to the page URL.
:::

::: code-group

```modx
<form> // [!code --]
<form action="[[~[[*id]]]]" method="post"> // [!code ++]
  <div class="p-form-validation"> // [!code --]
  <div class="p-form-validation" data-custom="name"> // [!code ++]
    <label>Name</label>
    <input class="p-form-validation__input" type="text" name="name" value=""> // [!code --]
    <input class="p-form-validation__input" type="text" name="name" value="[[+fi.name]]"> // [!code ++]
    <p class="p-form-validation__message"></p> // [!code --]
    <p class="p-form-validation__message" data-error="name">[[+fi.error.name]]</p> // [!code ++]
  </div>
  <div class="p-form-validation"> // [!code --]
  <div class="p-form-validation" data-custom="email"> // [!code ++]
    <label>Email</label>
    <input class="p-form-validation__input" type="email" name="email" value=""> // [!code --]
    <input class="p-form-validation__input" type="email" name="email" value="[[+fi.email]]"> // [!code ++]
    <p class="p-form-validation__message"></p> // [!code --]
    <p class="p-form-validation__message" data-error="email">[[+fi.error.email]]</p> // [!code ++]
  </div>
  <div role="alert" data-success style="display: none;"></div> // [!code ++]
  <div role="alert" data-validation-error style="display: none;"></div> // [!code ++]
  <button type="submit" class="p-button--positive">Submit</button>
  <button type="reset" class="p-button">Reset</button>
</form>
```

```fenom
<form> // [!code --]
<form action="{$_modx->resource.id | url}" method="post"> // [!code ++]
  <div class="p-form-validation"> // [!code --]
  <div class="p-form-validation" data-custom="name"> // [!code ++]
    <label>Name</label>
    <input class="p-form-validation__input" type="text" name="name" value=""> // [!code --]
    <input class="p-form-validation__input" type="text" name="name" value="{$_modx->getPlaceholder('fi.name')}"> // [!code ++]
    <p class="p-form-validation__message"></p> // [!code --]
    <p class="p-form-validation__message" data-error="name">{$_modx->getPlaceholder('fi.error.name')}</p> // [!code ++]
  </div>
  <div class="p-form-validation"> // [!code --]
  <div class="p-form-validation" data-custom="email"> // [!code ++]
    <label>Email</label>
    <input class="p-form-validation__input" type="email" name="email" value=""> // [!code --]
    <input class="p-form-validation__input" type="email" name="email" value="{$_modx->getPlaceholder('fi.email')}"> // [!code ++]
    <p class="p-form-validation__message"></p> // [!code --]
    <p class="p-form-validation__message" data-error="email">{$_modx->getPlaceholder('fi.error.email')}</p> // [!code ++]
  </div>
  <div role="alert" data-success style="display: none;"></div> // [!code ++]
  <div role="alert" data-validation-error style="display: none;"></div> // [!code ++]
  <button type="submit" class="p-button--positive">Submit</button>
  <button type="reset" class="p-button">Reset</button>
</form>
```

:::
