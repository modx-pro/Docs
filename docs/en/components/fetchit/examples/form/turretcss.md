# turretcss

[turretcss](https://turretcss.com/) is not much different from many frameworks, but still, let's break down an example:

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

To prepare, you will need to do the following:

1. Add `data-error="*"` attributes for elements that will be displayed with the error text.
2. For FormIt compatibility, placeholders with values and errors must be specified.
3. In turretcss, invalid status is specified by the `error` class, so we specify it in the `fetchit.frontend.input.invalid.class` system setting.

<!--@include: ../../parts/action.info.md-->

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
