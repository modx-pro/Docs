# Форма на Bootstrap

Допустим ваша вёрстка реализована на [Bootstrap](https://getbootstrap.com/) и у вас форма выглядит следующим образом:

```html
<form class="row g-3">
  <div class="col-md-4">
    <label for="name" class="form-label">First name</label>
    <input type="text" class="form-control" id="name" value="">
    <div class="invalid-feedback"></div>
  </div>
  <div class="col-md-4">
    <label for="email" class="form-label">Last name</label>
    <input type="email" class="form-control" id="email" value="">
    <div class="invalid-feedback"></div>
  </div>
  <div class="col-12">
    <button class="btn btn-primary" type="submit">Submit form</button>
  </div>
</form>
```

Для подготовки вам необходимо сделать следующее:

1. Добавить атрибуты `data-error="*"` для элементов которые будут отображены с текстом ошибки.
2. Для совместимости работы с FormIt нужно указать плейсхолдеры со значениями и ошибками.
3. Т.к. в Bootstrap при невалидным статусе нужно добавлять класс `is-invalid`, вам необходимо в системной настройке `fetchit.frontend.input.invalid.class` указать `is-invalid`, но в данном случае это значение является значением по умолчанию.

::: info Важно
Валидаторы разметки до сих пор ругаются на пустой атрибут `action`, поэтому в нём необходимо указывать ссылку на страницу.
:::

```modx
<form class="row g-3"> // [!code --]
<form action="[[~[[*id]]]]" class="row g-3"> // [!code ++]
  <div class="col-md-4">
    <label for="name" class="form-label">First name</label>
    <input type="text" class="form-control" id="name" name="name" value=""> // [!code --]
    <input type="text" class="form-control" id="name" name="name" value="[[+fi.name]]"> // [!code ++]
    <div class="invalid-feedback"></div> // [!code --]
    <div class="invalid-feedback" data-error="name">[[+fi.error.name]]</div> // [!code ++]
  </div>
  <div class="col-md-4">
    <label for="email" class="form-label">Last name</label>
    <input type="email" class="form-control" id="email" name="email" value=""> // [!code --]
    <input type="email" class="form-control" id="email" name="email" value="[[+fi.email]]"> // [!code ++]
    <div class="invalid-feedback"></div> // [!code --]
    <div class="invalid-feedback" data-error="email">[[+fi.error.email]]</div> // [!code ++]
  </div>
  <div class="col-12">
    <button class="btn btn-primary" type="submit">Submit form</button>
  </div>
</form>
```
