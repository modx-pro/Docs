# Fomantic-UI

The example with the CSS framework [Fomantic-UI](https://fomantic-ui.com/) is more interesting, because the CSS invalid class should be added to the parent element, not the input field. There is a `frontend.custom.invalid.class` setting just for such cases:

```html
<form class="ui form">
  <div class="field"> // [!code warning]
    <label>Name</label>
    <input type="text" name="name">
    <span class="ui error text"></span>
  </div>
  <div class="field"> // [!code warning]
    <label>Email</label>
    <input type="text" name="email">
    <span class="ui error text"></span>
  </div>
  <button class="ui button" type="submit">Submit</button>
  <button class="ui button" type="reset">Reset</button>
</form>
```

To prepare, you will need to do the following:

1. Add `data-custom="*"` attributes for parent elements and specifying the `error` value in the `fetchit.frontend.custom.invalid.class` system setting.
2. Add `data-error="*"` attributes for elements that will be displayed with the error text.
3. For FormIt compatibility, placeholders with values and errors must be specified.

<!--@include: ../../parts/action.info.md-->

::: code-group

```modx [Changes]
<form class="ui form"> // [!code --]
<form action="[[~[[*id]]]]" class="ui form"> // [!code ++]
  <div class="field"> // [!code --]
  <div class="field" data-custom="name"> // [!code ++]
    <label>Name</label>
    <input type="text" name="name"> // [!code --]
    <input type="text" name="name" value="[[+fi.name]]"> // [!code ++]
    <span class="ui error text"></span> // [!code --]
    <span data-error="name" class="ui error text">[[+fi.error.name]]</span> // [!code ++]
  </div>
  <div class="field"> // [!code --]
  <div class="field" data-custom="email"> // [!code ++]
    <label>Email</label>
    <input type="text" name="email"> // [!code --]
    <input type="text" name="email" value="[[+fi.email]]"> // [!code ++]
    <span class="ui error text"></span> // [!code --]
    <span data-error="email" class="ui error text">[[+fi.error.email]]</span> // [!code ++]
  </div>
  <button class="ui button" type="submit">Submit</button>
  <button class="ui button" type="reset">Reset</button>
</form>
```

```modx [Finished markup]
<form action="[[~[[*id]]]]" class="ui form">
  <div class="field" data-custom="name">
    <label>Name</label>
    <input type="text" name="name" value="[[+fi.name]]">
    <span data-error="name" class="ui error text">[[+fi.error.name]]</span>
  </div>
  <div class="field" data-custom="email">
    <label>Email</label>
    <input type="text" name="email" value="[[+fi.email]]">
    <span data-error="email" class="ui error text">[[+fi.error.email]]</span>
  </div>
  <button class="ui button" type="submit">Submit</button>
  <button class="ui button" type="reset">Reset</button>
</form>
```

:::
