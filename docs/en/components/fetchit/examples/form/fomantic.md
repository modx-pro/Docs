# Form with Fomantic-UI

Example with the CSS framework [Fomantic-UI](https://fomantic-ui.com/) is more involved because the invalid-state class must be applied to the parent element, not the input field. For such cases use the setting `frontend.custom.invalid.class`:

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

To set it up:

1. Add the `data-custom="*"` to parent elements and set system setting `fetchit.frontend.custom.invalid.class` to `error`.
2. Add the `data-error="*"` to elements that will display error text.
3. For FormIt compatibility add placeholders for values and errors.

::: info Important
Markup validators complain about an empty `action`, so set the page URL there.
:::

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

```modx [Final markup]
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
