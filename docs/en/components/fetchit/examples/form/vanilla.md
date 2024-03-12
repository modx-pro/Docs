# Vanilla

In the [Vanilla](https://vanillaframework.io/) framework as well as in [Fomantic UI](/en/components/fetchit/examples/form/fomantic) we need to add the invalidation class to the parent element, but this is not a problem, we can use the `data-custom="*"` selectors and add them. Another thing to consider is that as part of the framework rules, validatable input fields must be wrapped in an element with the `p-form-validation` class:

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

To prepare, you will need to do the following:

1. Add `data-custom="*"` attributes for parent elements and specifying the `is-error` value in the `fetchit.frontend.custom.invalid.class` system setting.
2. Add `data-error="*"` attributes for elements that will be displayed with the error text.
3. For FormIt compatibility, placeholders with values and errors must be specified.

<!--@include: ../../parts/action.info.md-->

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
