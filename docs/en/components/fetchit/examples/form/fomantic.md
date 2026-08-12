---
title: Fomantic-UI form
description: FetchIt with data-custom and error class on Fomantic-UI field wrapper
---

# Fomantic-UI form

In [Fomantic-UI](https://fomantic-ui.com/), the error class goes on the field wrapper, not the input. Use `fetchit.frontend.custom.invalid.class` and `[data-custom]`:

```html
<form class="ui form">
  <div class="field">
    <label>Name</label>
    <input type="text" name="name">
    <span class="ui error text"></span>
  </div>
  <div class="field">
    <label>Email</label>
    <input type="text" name="email">
    <span class="ui error text"></span>
  </div>
  <button class="ui button" type="submit">Submit</button>
  <button class="ui button" type="reset">Reset</button>
</form>
```

Steps:

1. Add `data-custom` on `.field` wrappers and set `fetchit.frontend.custom.invalid.class` to `error`.
2. Add `data-error` for error text.
3. Add `[data-success]` and `[data-validation-error]` for AJAX.
4. Add FormIt placeholders.

::: info
Set `action` to the page URL.
:::

::: code-group

```modx [Changes]
<form class="ui form"> // [!code --]
<form action="[[~[[*id]]]]" method="post" class="ui form"> // [!code ++]
  <div class="field"> // [!code --]
  <div class="field" data-custom="name"> // [!code ++]
    <label>Name</label>
    <input type="text" name="name"> // [!code --]
    <input type="text" name="name" value="[[+fi.name]]"> // [!code ++]
    <span class="ui error text"></span> // [!code --]
    <span data-error="name" class="ui error text">[[+fi.error.name]]</span> // [!code ++]
  </div>
  <div class="field"> // [!code --]
  <div class="field" data-custom="email"> // [!code ++]
    <label>Email</label>
    <input type="text" name="email"> // [!code --]
    <input type="text" name="email" value="[[+fi.email]]"> // [!code ++]
    <span class="ui error text"></span> // [!code --]
    <span data-error="email" class="ui error text">[[+fi.error.email]]</span> // [!code ++]
  </div>
  <div class="ui positive message" role="alert" data-success style="display: none;"></div> // [!code ++]
  <div class="ui negative message" role="alert" data-validation-error style="display: none;"></div> // [!code ++]
  <button class="ui button" type="submit">Submit</button>
  <button class="ui button" type="reset">Reset</button>
</form>
```

```fenom [Changes]
<form class="ui form"> // [!code --]
<form action="{$_modx->resource.id | url}" method="post" class="ui form"> // [!code ++]
  <div class="field"> // [!code --]
  <div class="field" data-custom="name"> // [!code ++]
    <label>Name</label>
    <input type="text" name="name"> // [!code --]
    <input type="text" name="name" value="{$_modx->getPlaceholder('fi.name')}"> // [!code ++]
    <span class="ui error text"></span> // [!code --]
    <span data-error="name" class="ui error text">{$_modx->getPlaceholder('fi.error.name')}</span> // [!code ++]
  </div>
  <div class="field"> // [!code --]
  <div class="field" data-custom="email"> // [!code ++]
    <label>Email</label>
    <input type="text" name="email"> // [!code --]
    <input type="text" name="email" value="{$_modx->getPlaceholder('fi.email')}"> // [!code ++]
    <span class="ui error text"></span> // [!code --]
    <span data-error="email" class="ui error text">{$_modx->getPlaceholder('fi.error.email')}</span> // [!code ++]
  </div>
  <div class="ui positive message" role="alert" data-success style="display: none;"></div> // [!code ++]
  <div class="ui negative message" role="alert" data-validation-error style="display: none;"></div> // [!code ++]
  <button class="ui button" type="submit">Submit</button>
  <button class="ui button" type="reset">Reset</button>
</form>
```

```modx [Final markup]
<form action="[[~[[*id]]]]" method="post" class="ui form">
  <div class="field" data-custom="name">
    <label>Name</label>
    <input type="text" name="name" value="[[+fi.name]]">
    <span data-error="name" class="ui error text">[[+fi.error.name]]</span>
  </div>
  <div class="field" data-custom="email">
    <label>Email</label>
    <input type="text" name="email" value="[[+fi.email]]">
    <span data-error="email" class="ui error text">[[+fi.error.email]]</span>
  </div>
  <div class="ui positive message" role="alert" data-success style="display: none;"></div>
  <div class="ui negative message" role="alert" data-validation-error style="display: none;"></div>
  <button class="ui button" type="submit">Submit</button>
  <button class="ui button" type="reset">Reset</button>
</form>
```

```fenom [Final markup]
<form action="{$_modx->resource.id | url}" method="post" class="ui form">
  <div class="field" data-custom="name">
    <label>Name</label>
    <input type="text" name="name" value="{$_modx->getPlaceholder('fi.name')}">
    <span data-error="name" class="ui error text">{$_modx->getPlaceholder('fi.error.name')}</span>
  </div>
  <div class="field" data-custom="email">
    <label>Email</label>
    <input type="text" name="email" value="{$_modx->getPlaceholder('fi.email')}">
    <span data-error="email" class="ui error text">{$_modx->getPlaceholder('fi.error.email')}</span>
  </div>
  <div class="ui positive message" role="alert" data-success style="display: none;"></div>
  <div class="ui negative message" role="alert" data-validation-error style="display: none;"></div>
  <button class="ui button" type="submit">Submit</button>
  <button class="ui button" type="reset">Reset</button>
</form>
```

:::
