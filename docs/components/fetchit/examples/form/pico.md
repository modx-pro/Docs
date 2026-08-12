---
title: Форма на Pico.css
description: FetchIt и Pico.css: aria-invalid, data-error и сообщения формы
---

# Форма на Pico.css

[Pico.css](https://picocss.com/) стилизует невалидное поле по `aria-invalid`. FetchIt ставит этот атрибут сам. Класс invalid в настройке для Pico обычно не нужен.

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

Что сделать:

1. Добавить элементы с `data-error` для текста ошибки.
2. Добавить `[data-success]` и `[data-validation-error]` для AJAX.
3. Проставить плейсхолдеры FormIt.

::: info
В `action` укажите URL страницы.
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
