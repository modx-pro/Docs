---
title: Форма на Vanilla
description: Разметка FetchIt под Vanilla Framework с data-custom и is-error
---

# Форма на Vanilla

В [Vanilla Framework](https://vanillaframework.io/), как и в [Fomantic UI](/components/fetchit/examples/form/fomantic), класс ошибки вешают на родителя. Для этого есть `[data-custom]`. Поля ввода по правилам Vanilla оборачивают в элемент с классом `p-form-validation`:

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

Что сделать:

1. Повесить `data-custom` на обёртки полей и в `fetchit.frontend.custom.invalid.class` указать `is-error`.
2. Добавить `data-error` для текста ошибки поля.
3. Добавить `[data-success]` и `[data-validation-error]` для AJAX-сообщений формы.
4. Проставить плейсхолдеры FormIt.

::: info
Валидаторы разметки ругаются на пустой `action`. Укажите ссылку на страницу.
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
