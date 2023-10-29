# Форма на Pico.css

С фреймворком [Pico.css](https://picocss.com/) всё намного проще, т.к. состоянием невалидности управляет атрибут `aria-invalid`, а наш компонент его добавляет автоматически. Разберём небольшой пример.

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

Для подготовки нам всего лишь необходимо сделать следующее:

1. Добавить текстовые элементы с атрибутами `data-error="*"` которые будут отображены с текстом ошибки.
2. Для совместимости работы с FormIt нужно указать плейсхолдеры со значениями и ошибками.

::: info Важно
Валидаторы разметки до сих пор ругаются на пустой атрибут `action`, поэтому в нём необходимо указывать ссылку на страницу.
:::

```modx
<form> // [!code --]
<form action="[[~[[*id]]]]"> // [!code ++]
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
  <button type="submit">Submit</button>
</form>
```
