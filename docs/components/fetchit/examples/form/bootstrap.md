---
title: Форма на Bootstrap
description: Разметка FetchIt под Bootstrap с data-error и сообщениями формы
---

# Форма на Bootstrap

Пример разметки на [Bootstrap](https://getbootstrap.com/):

```html
<form class="row g-3">
  <div class="col-md-4">
    <label for="name" class="form-label">First name</label>
    <input type="text" class="form-control" id="name" value="">
    <div class="invalid-feedback"></div>
  </div>
  <div class="col-md-4">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" value="">
    <div class="invalid-feedback"></div>
  </div>
  <div class="col-12">
    <button class="btn btn-primary" type="submit">Submit form</button>
  </div>
</form>
```

Что сделать:

1. Добавить `data-error` для текста ошибки поля.
2. Добавить `[data-success]` и `[data-validation-error]` для сообщений формы при AJAX.
3. Проставить плейсхолдеры FormIt для значений и ошибок после обычного POST.
4. Класс `is-invalid` уже стоит в `fetchit.frontend.input.invalid.class` по умолчанию.

::: info
В `action` укажите URL страницы. Пустой `action` ругают валидаторы разметки.
:::

::: code-group

```modx
<form class="row g-3"> // [!code --]
<form action="[[~[[*id]]]]" method="post" class="row g-3"> // [!code ++]
  <div class="col-md-4">
    <label for="name" class="form-label">First name</label>
    <input type="text" class="form-control" id="name" name="name" value=""> // [!code --]
    <input type="text" class="form-control" id="name" name="name" value="[[+fi.name]]"> // [!code ++]
    <div class="invalid-feedback"></div> // [!code --]
    <div class="invalid-feedback" data-error="name">[[+fi.error.name]]</div> // [!code ++]
  </div>
  <div class="col-md-4">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" name="email" value=""> // [!code --]
    <input type="email" class="form-control" id="email" name="email" value="[[+fi.email]]"> // [!code ++]
    <div class="invalid-feedback"></div> // [!code --]
    <div class="invalid-feedback" data-error="email">[[+fi.error.email]]</div> // [!code ++]
  </div>
  <div class="col-12"> // [!code ++]
    <div class="alert alert-success" role="alert" data-success style="display: none;"></div> // [!code ++]
    <div class="alert alert-danger" role="alert" data-validation-error style="display: none;"></div> // [!code ++]
  </div> // [!code ++]
  <div class="col-12">
    <button class="btn btn-primary" type="submit">Submit form</button>
  </div>
</form>
```

```fenom
<form class="row g-3"> // [!code --]
<form action="{$_modx->resource.id | url}" method="post" class="row g-3"> // [!code ++]
  <div class="col-md-4">
    <label for="name" class="form-label">First name</label>
    <input type="text" class="form-control" id="name" name="name" value=""> // [!code --]
    <input type="text" class="form-control" id="name" name="name" value="{$_modx->getPlaceholder('fi.name')}"> // [!code ++]
    <div class="invalid-feedback"></div> // [!code --]
    <div class="invalid-feedback" data-error="name">{$_modx->getPlaceholder('fi.error.name')}</div> // [!code ++]
  </div>
  <div class="col-md-4">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" name="email" value=""> // [!code --]
    <input type="email" class="form-control" id="email" name="email" value="{$_modx->getPlaceholder('fi.email')}"> // [!code ++]
    <div class="invalid-feedback"></div> // [!code --]
    <div class="invalid-feedback" data-error="email">{$_modx->getPlaceholder('fi.error.email')}</div> // [!code ++]
  </div>
  <div class="col-12"> // [!code ++]
    <div class="alert alert-success" role="alert" data-success style="display: none;"></div> // [!code ++]
    <div class="alert alert-danger" role="alert" data-validation-error style="display: none;"></div> // [!code ++]
  </div> // [!code ++]
  <div class="col-12">
    <button class="btn btn-primary" type="submit">Submit form</button>
  </div>
</form>
```

:::
