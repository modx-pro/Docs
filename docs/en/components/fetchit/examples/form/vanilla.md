# Form with Vanilla

With the framework [Vanilla](https://vanillaframework.io/) as with [Fomantic UI](/en/components/fetchit/examples/form/fomantic) the invalid class must be applied to the parent element; use the `data-custom="*"` selectors. Note that framework rules require validated inputs to be wrapped in an element with class `p-form-validation`:

```html
<form>
  <div class="p-form-validation">
    <label>Name</label>
    <input class="p-form-validation__input" type="text" name="name" value="">
    <p class="p-form-validation__message"></p>
  </div>
  <div class="p-form-validation" data-custom="email">
    <label>Email</label>
    <input class="p-form-validation__input" type="email" name="email" value="">
    <p class="p-form-validation__message"></p>
  </div>
  <button type="submit" class="p-button--positive">Submit</button>
  <button type="reset" class="p-button">Reset</button>
</form>
```

To set it up:

1. Add the `data-custom="*"` to parent elements and set system setting `fetchit.frontend.custom.invalid.class` to `is-error`.
2. Add the `data-error="*"` to elements that will display error text.
3. For FormIt compatibility add placeholders for values and errors.

::: info Important
Markup validators complain about an empty `action`, so set the page URL there.
:::

```modx
<form> // [!code --]
<form action="[[~[[*id]]]]" method="post"> // [!code ++]
  <div class="p-form-validation"> // [!code --]
  <div class="p-form-validation" data-custom="name"> // [!code ++]
    <label>Name</label>
    <input class="p-form-validation__input" type="text" name="name" value=""> // [!code --]
    <input class="p-form-validation__input" type="text" name="name" value="[[+fi.name]]"> // [!code ++]
    <p class="p-form-validation__message"></p> // [!code --]
    <p class="p-form-validation__message" data-error="name">[[+fi.error.name]]</p> // [!code ++]
  </div>
  <div class="p-form-validation"> // [!code --]
  <div class="p-form-validation" data-custom="email"> // [!code ++]
    <label>Email</label>
    <input class="p-form-validation__input" type="email" name="email" value=""> // [!code --]
    <input class="p-form-validation__input" type="email" name="email" value="[[+fi.email]]"> // [!code ++]
    <p class="p-form-validation__message"></p> // [!code --]
    <p class="p-form-validation__message" data-error="email">[[+fi.error.email]]</p> // [!code ++]
  </div>
  <button type="submit" class="p-button--positive">Submit</button>
  <button type="reset" class="p-button">Reset</button>
</form>
```
