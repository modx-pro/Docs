# Bulma

If your layout is implemented on the [Bulma](https://bulma.io/) framework, the markup most likely looks like this:

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

To prepare, you will need to do the following:

1. Add `data-error="*"` attributes for elements that will be displayed with the error text.
2. For FormIt compatibility, placeholders with values and errors must be specified.
3. In Bulma, invalid status is specified by the `is-danger` css class, so you need to specify it in the `fetchit.frontend.input.invalid.class` system setting.

<!--@include: ../../parts/action.info.md-->

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
