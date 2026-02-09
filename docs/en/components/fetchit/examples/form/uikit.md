# Form with UIkit

This example uses a typical form with [UIkit](https://getuikit.com/):

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

To set it up:

1. Add the `data-error="*"` to elements that will display error text.
2. For FormIt compatibility add placeholders for values and errors.
3. In UIkit the invalid state uses the class `uk-form-danger`, so set system setting `fetchit.frontend.input.invalid.class` to it.

::: info Important
Markup validators complain about an empty `action`, so set the page URL there.
:::

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
