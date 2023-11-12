# Pico.css

With the [Pico.css](https://picocss.com/) framework everything is much simpler, because the `aria-invalid` attribute controls the invalid state, and our extra adds it automatically. Let's look at a small example.

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

To prepare, you will need to do the following:

1. Add text elements with attributes `data-error="*"` to be displayed with the error text.
2. For FormIt compatibility, placeholders with values and errors must be specified.

<!--@include: ../../parts/action.info.md-->

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
