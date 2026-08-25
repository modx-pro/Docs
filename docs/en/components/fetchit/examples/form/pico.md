---
title: Pico.css form
description: FetchIt and Pico.css with aria-invalid, data-error, and form messages
---

# Pico.css form

[Pico.css](https://picocss.com/) styles invalid fields via `aria-invalid`. FetchIt sets this attribute automatically. You usually do not need an invalid class in settings for Pico.

```html
<form>
  <label>
    Name
    <input type="text" name="name">
  </label>
  <label>
    Email
    <input type="email" name="email">
  </label>
  <button type="submit">Submit</button>
</form>
```

Steps:

1. Add elements with `data-error` for error text.
2. Add `[data-success]` and `[data-validation-error]` for AJAX.
3. Add FormIt placeholders.

::: info
Set `action` to the page URL.
:::

::: code-group

```modx
<form> // [!code --]
<form action="[[~[[*id]]]]" method="post"> // [!code ++]
  <label>
    Name
    <input type="text" name="name"> // [!code --]
    <input type="text" name="name" value="[[+fi.name]]"> // [!code ++]
    <small data-error="name">[[+fi.error.name]]</small> // [!code ++]
  </label>
  <label>
    Email
    <input type="email" name="email"> // [!code --]
    <input type="email" name="email" value="[[+fi.email]]"> // [!code ++]
    <small data-error="email">[[+fi.error.email]]</small> // [!code ++]
  </label>
  <div role="alert" data-success style="display: none;"></div> // [!code ++]
  <div role="alert" data-validation-error style="display: none;"></div> // [!code ++]
  <button type="submit">Submit</button>
</form>
```

```fenom
<form> // [!code --]
<form action="{$_modx->resource.id | url}" method="post"> // [!code ++]
  <label>
    Name
    <input type="text" name="name"> // [!code --]
    <input type="text" name="name" value="{$_modx->getPlaceholder('fi.name')}"> // [!code ++]
    <small data-error="name">{$_modx->getPlaceholder('fi.error.name')}</small> // [!code ++]
  </label>
  <label>
    Email
    <input type="email" name="email"> // [!code --]
    <input type="email" name="email" value="{$_modx->getPlaceholder('fi.email')}"> // [!code ++]
    <small data-error="email">{$_modx->getPlaceholder('fi.error.email')}</small> // [!code ++]
  </label>
  <div role="alert" data-success style="display: none;"></div> // [!code ++]
  <div role="alert" data-validation-error style="display: none;"></div> // [!code ++]
  <button type="submit">Submit</button>
</form>
```

:::
