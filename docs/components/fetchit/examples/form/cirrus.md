# Форма на Cirrus CSS

В [Cirrus CSS](https://cirrus-ui.netlify.app/) невалидное состояние нужно указывать двумя классами: `input-error` и `text-danger`, FetchIt учитывает и такие случаи.

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

Для подготовки нам всего лишь необходимо сделать следущее:

1. Добавить атрибуты `data-error="*"` для элементов которые будут отображены с текстом ошибки.
2. Для совместимости работы с FormIt нужно указать плейсхолдеры со значениями и ошибками.
3. В Cirrus CSS невалидный статус указывается двумя классами `input-error` и `text-danger`, так что указываем их в системной настройке `fetchit.frontend.input.invalid.class` разделяя их пробелом.

::: info Важно
Валидаторы разметки до сих пор ругаются на пустой атрибут `action`, поэтому в нём необходимо указывать ссылку на страницу.
:::

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
  <div class="row">
    <div class="col-12">
      <input type="submit" class="btn-primary">
      <input type="reset" class="btn-default">
    </div>
  </div>
</form>
```
