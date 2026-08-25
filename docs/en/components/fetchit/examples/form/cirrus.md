---
title: Cirrus CSS form
description: FetchIt for Cirrus with input-error text-danger and form messages
---

# Cirrus CSS form

In [Cirrus CSS](https://cirrus-ui.netlify.app/), invalid fields need two classes: `input-error` and `text-danger`. Set both in `fetchit.frontend.input.invalid.class`, separated by a space.

```html
<form>
  <div class="row">
    <div class="col-12">
      <label>Name</label>
      <input type="text" name="name" value="">
      <small class="text-danger"></small>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <label>Email</label>
      <input type="email" name="email" value="">
      <small class="text-danger"></small>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <input type="submit" class="btn-primary">
      <input type="reset" class="btn-default">
    </div>
  </div>
</form>
```

Steps:

1. Add `data-error` for error text.
2. Add `[data-success]` and `[data-validation-error]` for AJAX.
3. Add FormIt placeholders.
4. Set `fetchit.frontend.input.invalid.class` to `input-error text-danger`.

::: info
Set `action` to the page URL.
:::

::: code-group

```modx
<form> // [!code --]
<form action="[[~[[*id]]]]" method="post"> // [!code ++]
  <div class="row">
    <div class="col-12">
      <label>Name</label>
      <input type="text" name="name" value=""> // [!code --]
      <input type="text" name="name" value="[[+fi.name]]"> // [!code ++]
      <small class="text-danger"></small> // [!code --]
      <small class="text-danger" data-error="name">[[+fi.error.name]]</small> // [!code ++]
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <label>Email</label>
      <input type="email" name="email" value=""> // [!code --]
      <input type="email" name="email" value="[[+fi.email]]"> // [!code ++]
      <small class="text-danger"></small> // [!code --]
      <small class="text-danger" data-error="email">[[+fi.error.email]]</small> // [!code ++]
    </div>
  </div>
  <div class="row"> // [!code ++]
    <div class="col-12"> // [!code ++]
      <div class="toast toast--success" role="alert" data-success style="display: none;"></div> // [!code ++]
      <div class="toast toast--error" role="alert" data-validation-error style="display: none;"></div> // [!code ++]
    </div> // [!code ++]
  </div> // [!code ++]
  <div class="row">
    <div class="col-12">
      <input type="submit" class="btn-primary">
      <input type="reset" class="btn-default">
    </div>
  </div>
</form>
```

```fenom
<form> // [!code --]
<form action="{$_modx->resource.id | url}" method="post"> // [!code ++]
  <div class="row">
    <div class="col-12">
      <label>Name</label>
      <input type="text" name="name" value=""> // [!code --]
      <input type="text" name="name" value="{$_modx->getPlaceholder('fi.name')}"> // [!code ++]
      <small class="text-danger"></small> // [!code --]
      <small class="text-danger" data-error="name">{$_modx->getPlaceholder('fi.error.name')}</small> // [!code ++]
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <label>Email</label>
      <input type="email" name="email" value=""> // [!code --]
      <input type="email" name="email" value="{$_modx->getPlaceholder('fi.email')}"> // [!code ++]
      <small class="text-danger"></small> // [!code --]
      <small class="text-danger" data-error="email">{$_modx->getPlaceholder('fi.error.email')}</small> // [!code ++]
    </div>
  </div>
  <div class="row"> // [!code ++]
    <div class="col-12"> // [!code ++]
      <div class="toast toast--success" role="alert" data-success style="display: none;"></div> // [!code ++]
      <div class="toast toast--error" role="alert" data-validation-error style="display: none;"></div> // [!code ++]
    </div> // [!code ++]
  </div> // [!code ++]
  <div class="row">
    <div class="col-12">
      <input type="submit" class="btn-primary">
      <input type="reset" class="btn-default">
    </div>
  </div>
</form>
```

:::
