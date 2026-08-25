---
title: Форма на Fomantic-UI
description: FetchIt с data-custom и классом error на обёртке поля Fomantic-UI
---

# Форма на Fomantic-UI

В [Fomantic-UI](https://fomantic-ui.com/) класс ошибки вешают на родителя поля, не на input. Для этого есть `fetchit.frontend.custom.invalid.class` и `[data-custom]`:

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

Что сделать:

1. Повесить `data-custom` на обёртки `.field` и в `fetchit.frontend.custom.invalid.class` указать `error`.
2. Добавить `data-error` для текста ошибки.
3. Добавить `[data-success]` и `[data-validation-error]` для AJAX.
4. Проставить плейсхолдеры FormIt.

::: info
В `action` укажите URL страницы.
:::

::: code-group

```modx [Изменения]
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

```fenom [Изменения]
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

```modx [Готовая разметка]
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

```fenom [Готовая разметка]
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
