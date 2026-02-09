# Form with Bulma

If your layout uses the framework [Bulma](https://bulma.io/), the markup likely looks like this:

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

To set it up:

1. Add the `data-error="*"` to elements that will display error text.
2. For FormIt compatibility add placeholders for values and errors.
3. In Bulma the invalid state uses the class `is-danger`, so set system setting `fetchit.frontend.input.invalid.class` to it.

::: info Important
Markup validators complain about an empty `action`, so set the page URL there.
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
