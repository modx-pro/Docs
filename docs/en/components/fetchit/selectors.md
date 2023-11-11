# Selectors

This section contains information about the selectors that the **FetchIt** interacts with.

## `data-fetchit`

This selector is added to a form element by a snippet. It allows **FetchIt** to process only necessary forms without disturbing the behaviour of other forms on the page.

::: info TIP
The snippet at the time of loading the chunk looks for the form and if this attribute is not present, sets it on its own.
:::

```html
<form action="#" method="post" data-fetchit="*">
  ...
</form>
```

## `data-error`

By specifying the name of the field in the value of this attribute, i.e. the same value as in the `name` attribute, you tell **FetchIt** to load the error text of a particular field.

```html
<input type="text" name="username" />
<span data-error="username"></span>
```

## `data-custom`

By default **FetchIt** adds CSS classes from the `fetchit.frontend.input.invalid.class` system setting to input field elements, but there are cases when due to layout peculiarities it is necessary to add them to other elements, for example wrapper elements, and for such cases there is this selector and `fetchit.frontend.custom.invalid.class` system setting.

```html
<div class="input-parent" data-custom="password">
  <input type="password" name="password" />
</div>
```
