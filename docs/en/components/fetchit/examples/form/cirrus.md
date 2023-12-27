# Cirrus CSS

In [Cirrus CSS](https://cirrus-ui.netlify.app/) invalid state should be specified with two classes: `input-error` and `text-danger`, FetchIt takes such cases into account as well.

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

To prepare, you will need to do the following:

1. Add `data-error="*"` attributes for elements that will be displayed with the error text.
2. For FormIt compatibility, placeholders with values and errors must be specified.
3. In Cirrus CSS, invalid status is specified by two classes `input-error` and `text-danger`, so specify them in the `fetchit.frontend.input.invalid.class` system setting separated by a space.

<!--@include: ../../parts/action.info.md-->

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
