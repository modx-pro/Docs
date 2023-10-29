# Форма на turretcss

[turretcss](https://turretcss.com/) мало чем отличается от многих фреймворков, но всё же, давайте разберем пример:

```html
<form>
  <p class="field">
    <label>Name</label>
    <input type="text" name="name" value="" />
    <p class="form-message error"></p>
  </p>
  <p class="field">
    <label>Email</label>
    <input type="email" name="email" value="" />
    <p class="form-message error">[[+fi.error.email]]</p>
  </p>
  <p class="field">
    <button type="submit" class="button">Submit</button>
    <button type="reset" class="button">Reset</button>
  </p>
</form>
```

Для подготовки нам всего лишь необходимо сделать следующее:

1. Добавить атрибуты `data-error="*"` для элементов которые будут отображены с текстом ошибки.
2. Для совместимости работы с FormIt нужно указать плейсхолдеры со значениями и ошибками.
3. В turretcss невалидный статус указывается классом `error`, так что указываем его в системной настройке `fetchit.frontend.input.invalid.class`.

::: info Важно
Валидаторы разметки до сих пор ругаются на пустой атрибут `action`, поэтому в нём необходимо указывать ссылку на страницу.
:::

```modx
<form> // [!code --]
<form action="[[~[[*id]]]]" method="post"> // [!code ++]
  <p class="field">
    <label>Name</label>
    <input type="text" name="name" value="" /> // [!code --]
    <input type="text" name="name" value="[[+fi.name]]" /> // [!code ++]
    <p class="form-message error"></p> // [!code --]
    <p class="form-message error" data-error="name">[[+fi.error.name]]</p> // [!code ++]
  </p>
  <p class="field">
    <label>Email</label>
    <input type="email" name="email" value="" /> // [!code --]
    <input type="email" name="email" value="[[+fi.email]]" /> // [!code ++]
    <p class="form-message error"></p> // [!code --]
    <p class="form-message error" data-error="email">[[+fi.error.email]]</p> // [!code ++]
  </p>
  <p class="field">
    <button type="submit" class="button">Submit</button>
    <button type="reset" class="button">Reset</button>
  </p>
</form>
```
