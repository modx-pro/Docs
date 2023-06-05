# Форма на UIkit

В данном примере будем разбирать типовую форму на [UIkit](https://getuikit.com/):

```html
<form>
  <fieldset class="uk-fieldset">
    <legend class="uk-legend">Legend</legend>
    <div class="uk-margin">
      <label class="uk-form-label" for="name">Name</label>
      <div class="uk-form-controls">
        <input class="uk-input" id="name" name="name" type="text">
      </div>
    </div>
    <div class="uk-margin">
      <label class="uk-form-label" for="email">Email</label>
      <div class="uk-form-controls">
        <input class="uk-input" id="email" name="email" type="text">
      </div>
    </div>
    <div class="uk-margin">
      <label class="uk-form-label" for="message">Message</label>
      <div class="uk-form-controls">
        <textarea class="uk-textarea" id="message" name="message" rows="5"></textarea>
      </div>
    </div>
    <div class="uk-margin">
      <button class="uk-button uk-button-primary">Submit</button>
    </div>
  </fieldset>
</form>
```

Для подготовки вам необходимо сделать следующее:

1. Добавить атрибуты `data-error="*"` для элементов которые будут отображены с текстом ошибки.
2. Для совместимости работы с FormIt нужно указать плейсхолдеры со значениями и ошибками.
3. В UIkit невалидный статус указывается классом `uk-form-danger`, поэтому вам необходимо в системной настройке `fetchit.frontend.input.invalid.class` указать её.

::: info Важно
Валидаторы разметки до сих пор ругаются на пустой атрибут `action`, поэтому в нём необходимо указывать ссылку на страницу.
:::

```modx
<form> // [!code --]
<form action="[[~[[*id]]]]" method="post"> // [!code ++]
  <fieldset class="uk-fieldset">
    <legend class="uk-legend">Form legend</legend>
    <div class="uk-margin">
      <label class="uk-form-label" for="name">Name</label>
      <div class="uk-form-controls">
        <input class="uk-input" id="name" name="name" type="text"> // [!code --]
        <input class="uk-input" id="name" name="name" type="text" value="[[+fi.name]]"> // [!code ++]
        <span class="uk-text-danger" data-error="name">[[+fi.error.name]]</span> // [!code ++]
      </div>
    </div>
    <div class="uk-margin">
      <label class="uk-form-label" for="email">Email</label>
      <div class="uk-form-controls">
        <input class="uk-input" id="email" name="email" type="text"> // [!code --]
        <input class="uk-input" id="email" name="email" type="text" value="[[+fi.email]]"> // [!code ++]
        <span class="uk-text-danger" data-error="email">[[+fi.error.name]]</span> // [!code ++]
      </div>
    </div>
    <div class="uk-margin">
      <label class="uk-form-label" for="message">Message</label>
      <div class="uk-form-controls">
        <textarea class="uk-textarea" id="message" name="message" rows="5"></textarea> // [!code --]
        <textarea class="uk-textarea" id="message" name="message" rows="5">[[+fi.message]]</textarea> // [!code ++]
        <span class="uk-text-danger" data-error="message">[[+fi.error.message]]</span> // [!code ++]
      </div>
    </div>
    <div class="uk-margin">
      <button class="uk-button uk-button-primary">Submit</button>
    </div>
  </fieldset>
</form>
```
