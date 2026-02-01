# Selectors

This section describes the selectors used by **FetchIt**.

## `data-fetchit`

This attribute is added to the form element by the snippet. It lets the component handle only the forms you want without affecting other forms on the page.

:::info Tip
When loading the chunk, the snippet finds the form and, if this attribute is missing, adds it automatically.
:::

```html
<form action="#" method="post" data-fetchit="*">
  ...
</form>
```

## `data-error`

Set the value to the field name (the same as the `name` attribute) so the component can inject the error message for that field.

```html
<input type="text" name="username" />
<span data-error="username"></span>
```

## `data-custom`

By default **FetchIt** adds the CSS class from the `fetchit.frontend.input.invalid.class` system setting to input elements. For layouts where the invalid state should be applied to wrapper elements instead, use this attribute and the `fetchit.frontend.custom.invalid.class` system setting.

```html
<div class="input-parent" data-custom="password">
  <input type="password" name="password" />
</div>
```
