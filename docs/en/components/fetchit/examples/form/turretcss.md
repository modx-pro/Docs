# Form with turretcss

[turretcss](https://turretcss.com/) is similar to other frameworks; here is an example:

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

To set it up:

1. Add the `data-error="*"` to elements that will display error text.
2. For FormIt compatibility add placeholders for values and errors.
3. In turretcss the invalid state uses the class `error`, so set it in system setting `fetchit.frontend.input.invalid.class`.

::: info Important
Markup validators complain about an empty `action`, so set the page URL there.
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
