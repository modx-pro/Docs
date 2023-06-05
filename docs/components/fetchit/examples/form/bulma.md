# Форма на Bulma

Если ваша вёрстка реализована на фреймворке [Bulma](https://bulma.io/), то разметка скорее всего выглядит таким образом:

```html
<form>
  <div class="field">
    <label class="label">Username</label>
    <div class="control">
      <input class="input" type="text" name="name" value="">
    </div>
    <p class="help is-danger"></p>
  </div>

  <div class="field">
    <label class="label">Email</label>
    <div class="control">
      <input class="input" type="email" name="email" value="">
    </div>
    <p class="help is-danger"></p>
  </div>

  <div class="field is-grouped">
    <div class="control">
      <button type="submit" class="button is-link">Submit</button>
    </div>
    <div class="control">
      <button type="reset" class="button is-link is-light">Cancel</button>
    </div>
  </div>
</form>
```

Для подготовки вам необходимо сделать следующее:

1. Добавить атрибуты `data-error="*"` для элементов которые будут отображены с текстом ошибки.
2. Для совместимости работы с FormIt нужно указать плейсхолдеры со значениями и ошибками.
3. В Bulma невалидный статус указывается классом `is-danger`, поэтому вам необходимо в системной настройке `fetchit.frontend.input.invalid.class` указать её.

::: info Важно
Валидаторы разметки до сих пор ругаются на пустой атрибут `action`, поэтому в нём необходимо указывать ссылку на страницу.
:::

```modx
<form> // [!code --]
<form action="[[~[[*id]]]]" method="post"> // [!code ++]
  <div class="field">
    <label class="label">Username</label>
    <div class="control">
      <input class="input" type="text" name="name" value=""> // [!code --]
      <input class="input" type="text" name="name" value="[[+fi.name]]"> // [!code ++]
    </div>
    <p class="help is-danger"></p> // [!code --]
    <p class="help is-danger" data-error="name">[[+fi.error.name]]</p> // [!code ++]
  </div>

  <div class="field">
    <label class="label">Email</label>
    <div class="control">
      <input class="input" type="email" name="email" value=""> // [!code --]
      <input class="input" type="email" name="email" value="[[+fi.email]]"> // [!code ++]
    </div>
    <p class="help is-danger"></p> // [!code --]
    <p class="help is-danger" data-error="email">[[+fi.error.email]]</p> // [!code ++]
  </div>

  <div class="field is-grouped">
    <div class="control">
      <button type="submit" class="button is-link">Submit</button>
    </div>
    <div class="control">
      <button type="reset" class="button is-link is-light">Cancel</button>
    </div>
  </div>
</form>
```
