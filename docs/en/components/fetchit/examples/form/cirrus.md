# Form with Cirrus CSS

In [Cirrus CSS](https://cirrus-ui.netlify.app/) the invalid state uses two classes: `input-error` and `text-danger`. FetchIt supports this.

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

To set it up:

1. Add the `data-error="*"` to elements that will display error text.
2. For FormIt compatibility add placeholders for values and errors.
3. In Cirrus CSS the invalid state uses two classes `input-error` and `text-danger`, so set them in system setting `fetchit.frontend.input.invalid.class` separated by a space.

::: info Important
Markup validators complain about an empty `action`, so set the page URL there.
:::

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
