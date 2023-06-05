# Форма на Vanilla

В фреймворке [Vanilla](https://vanillaframework.io/) также как и в [Fomantic UI](/components/fetchit/examples/form/fomantic) нужно добавлять класс невалидности родительскому элементу, но это не проблема, мы можем воспользоваться селекторами `data-custom="*"` и добавим их. Еще нужно учитывать, что в рамках правил фреймворка, валидируемые поля ввода должны быть обёрнуты в элемент с классом `p-form-validation`:

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

Для подготовки нам всего лишь необходимо сделать следущее:

1. Добавить атрибуты `data-custom="*"` для родительских элементов и указав в системной настройке `fetchit.frontend.custom.invalid.class` значение `is-error`.
2. Добавить атрибуты `data-error="*"` для элементов которые будут отображены с текстом ошибки.
3. Для совместимости работы с FormIt нужно указать плейсхолдеры со значениями и ошибками.

::: info Важно
Валидаторы разметки до сих пор ругаются на пустой атрибут `action`, поэтому в нём необходимо указывать ссылку на страницу.
:::

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
  <button type="submit" class="p-button--positive">Submit</button>
  <button type="reset" class="p-button">Reset</button>
</form>
```
