# Форма на Fomantic-UI

Пример с CSS фреймворком [Fomantic-UI](https://fomantic-ui.com/) интереснее, потому что CSS класс невалидности нужно добавлять родительскому элементу, а не полю ввода. Именно для таких случаев есть настройка `frontend.custom.invalid.class`:

```html
<form class="ui form">
  <div class="field"> // [!code warning]
    <label>Name</label>
    <input type="text" name="name">
    <span class="ui error text"></span>
  </div>
  <div class="field"> // [!code warning]
    <label>Email</label>
    <input type="text" name="email">
    <span class="ui error text"></span>
  </div>
  <button class="ui button" type="submit">Submit</button>
  <button class="ui button" type="reset">Reset</button>
</form>
```

Для подготовки вам необходимо сделать следующее:

1. Добавить атрибуты `data-custom="*"` для родительских элементов и указав в системной настройке `fetchit.frontend.custom.invalid.class` значение `error`.
2. Добавить атрибуты `data-error="*"` для элементов которые будут отображены с текстом ошибки.
3. Для совместимости работы с FormIt нужно указать плейсхолдеры со значениями и ошибками.

::: info Важно
Валидаторы разметки до сих пор ругаются на пустой атрибут `action`, поэтому в нём необходимо указывать ссылку на страницу.
:::

::: code-group
```modx [Изменения]
<form class="ui form"> // [!code --]
<form action="[[~[[*id]]]]" class="ui form"> // [!code ++]
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
  <button class="ui button" type="submit">Submit</button>
  <button class="ui button" type="reset">Reset</button>
</form>
```
```modx [Готовая разметка]
<form action="[[~[[*id]]]]" class="ui form">
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
  <button class="ui button" type="submit">Submit</button>
  <button class="ui button" type="reset">Reset</button>
</form>
```
:::
