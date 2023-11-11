# Bootstrap

Suppose your form looks like this:

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

To prepare, you will need to do the following:

1. Add `data-error="*"` attributes for elements that will be displayed with the error text.
2. For FormIt compatibility, placeholders with values and errors must be specified.
3. Since Bootstrap needs to add `is-invalid` class when invalid status, you need to specify `is-invalid` in the `fetchit.frontend.input.invalid.class` system setting, but in this case this value is the default.

<!--@include: ../../parts/action.info.md-->

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
