# Bootstrap form

Suppose your layout is built with [Bootstrap](https://getbootstrap.com/) and your form looks like this:

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

To set it up:

1. Add the `data-error="*"` to elements that will display error text.
2. For FormIt compatibility add placeholders for values and errors.
3. Because Bootstrap uses the `is-invalid` class for invalid state, set system setting `fetchit.frontend.input.invalid.class` to `is-invalid` (this is the default).

::: info Important
Markup validators complain about an empty `action`, so set the page URL there.
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
