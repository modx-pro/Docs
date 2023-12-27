# UIkit

In this example, we will prepare a typical form on [UIkit](https://getuikit.com/):

```html
<form>
  <fieldset class="uk-fieldset">
    <legend class="uk-legend">Legend</legend>
    <div class="uk-margin">
      <label class="uk-form-label" for="name">Name</label>
      <div class="uk-form-controls">
        <input class="uk-input" id="name" name="name" type="text">
      </div>
    </div>
    <div class="uk-margin">
      <label class="uk-form-label" for="email">Email</label>
      <div class="uk-form-controls">
        <input class="uk-input" id="email" name="email" type="text">
      </div>
    </div>
    <div class="uk-margin">
      <label class="uk-form-label" for="message">Message</label>
      <div class="uk-form-controls">
        <textarea class="uk-textarea" id="message" name="message" rows="5"></textarea>
      </div>
    </div>
    <div class="uk-margin">
      <button class="uk-button uk-button-primary">Submit</button>
    </div>
  </fieldset>
</form>
```

To prepare, you will need to do the following:

1. Add `data-error="*"` attributes for elements that will be displayed with the error text.
2. For FormIt compatibility, placeholders with values and errors must be specified.
3. In UIkit, invalid status is specified by the `uk-form-danger` class, so you need to specify it in the `fetchit.frontend.input.invalid.class` system setting.

<!--@include: ../../parts/action.info.md-->

```modx
<form> // [!code --]
<form action="[[~[[*id]]]]" method="post"> // [!code ++]
  <fieldset class="uk-fieldset">
    <legend class="uk-legend">Form legend</legend>
    <div class="uk-margin">
      <label class="uk-form-label" for="name">Name</label>
      <div class="uk-form-controls">
        <input class="uk-input" id="name" name="name" type="text"> // [!code --]
        <input class="uk-input" id="name" name="name" type="text" value="[[+fi.name]]"> // [!code ++]
        <span class="uk-text-danger" data-error="name">[[+fi.error.name]]</span> // [!code ++]
      </div>
    </div>
    <div class="uk-margin">
      <label class="uk-form-label" for="email">Email</label>
      <div class="uk-form-controls">
        <input class="uk-input" id="email" name="email" type="text"> // [!code --]
        <input class="uk-input" id="email" name="email" type="text" value="[[+fi.email]]"> // [!code ++]
        <span class="uk-text-danger" data-error="email">[[+fi.error.name]]</span> // [!code ++]
      </div>
    </div>
    <div class="uk-margin">
      <label class="uk-form-label" for="message">Message</label>
      <div class="uk-form-controls">
        <textarea class="uk-textarea" id="message" name="message" rows="5"></textarea> // [!code --]
        <textarea class="uk-textarea" id="message" name="message" rows="5">[[+fi.message]]</textarea> // [!code ++]
        <span class="uk-text-danger" data-error="message">[[+fi.error.message]]</span> // [!code ++]
      </div>
    </div>
    <div class="uk-margin">
      <button class="uk-button uk-button-primary">Submit</button>
    </div>
  </fieldset>
</form>
```
