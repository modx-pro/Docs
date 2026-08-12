---
title: Форма на Cirrus CSS
description: FetchIt под Cirrus с input-error text-danger и сообщениями формы
---

# Форма на Cirrus CSS

В [Cirrus CSS](https://cirrus-ui.netlify.app/) невалидному полю нужны два класса: `input-error` и `text-danger`. В `fetchit.frontend.input.invalid.class` укажите оба через пробел.

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

Что сделать:

1. Добавить `data-error` для текста ошибки.
2. Добавить `[data-success]` и `[data-validation-error]` для AJAX.
3. Проставить плейсхолдеры FormIt.
4. В `fetchit.frontend.input.invalid.class` указать `input-error text-danger`.

::: info
В `action` укажите URL страницы.
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
