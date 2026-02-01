# Form with Pico.css

With the framework [Pico.css](https://picocss.com/) it is simpler because the invalid state is controlled by the attribute `aria-invalid`, and our component adds it automatically. Here is a short example.

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

To set it up:

1. Add text elements with the `data-error="*"` that will display error text.
2. For FormIt compatibility add placeholders for values and errors.

::: info Important
Markup validators complain about an empty `action`, so set the page URL there.
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
