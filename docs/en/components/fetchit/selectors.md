# Selectors

Attributes the client script uses to find the form, fields, and message blocks.

## `data-fetchit`

The snippet looks for a `<form>` in the chunk and, if the attribute is missing, adds `data-fetchit` itself. Only forms with this marker are handled.

```html
<form action="[[~[[*id]]]]" method="post" data-fetchit="…">
  …
</form>
```

The attribute value is internal (action id). Do not change it by hand.

The snippet also forces `method="post"`.

## `data-error`

Container for field error text. The value matches the field `name`.

```html
<input type="text" name="username">
<span data-error="username"></span>
```

For names like `name[]`, both `data-error="name"` and `data-error="name[]"` work. The script looks for both.

Error text goes into `textContent` after HTML is stripped. Empty and whitespace-only messages are ignored.

## `data-custom`

The class from `fetchit.frontend.custom.invalid.class` is applied not to the input, but to an element with `data-custom="field_name"` (often a wrapper).

```html
<div class="input-parent" data-custom="password">
  <input type="password" name="password">
</div>
```

## `data-success` and `data-validation-error`

Form-level messages (not field errors). From **1.1.3**, AJAX fills them via `setFormMessage()`:

| Attribute | When it shows |
| --- | --- |
| `data-success` | response with `success: true`, text from `message` |
| `data-validation-error` | response with `success: false`, text from `message` |

FormIt placeholders like `[[+fi.successMessage]]` work on a normal POST with reload. For AJAX you need these attributes, or form-level success/error text will not appear on the client.

Example from the package chunk:

::: code-group

```modx
<div role="alert" data-success
      style="display: [[+fi.success:is=`1`:then=``:else=`none`]];">
  [[+fi.successMessage]]
</div>
<div role="alert" data-validation-error
      style="display: [[+fi.validation_error:is=`1`:then=``:else=`none`]];">
  [[+fi.validation_error_message]]
</div>
```

```fenom
<div role="alert" data-success
      style="display: {if $_modx->getPlaceholder('fi.success') == 1}{else}none{/if};">
  {$_modx->getPlaceholder('fi.successMessage')}
</div>
<div role="alert" data-validation-error
      style="display: {if $_modx->getPlaceholder('fi.validation_error') == 1}{else}none{/if};">
  {$_modx->getPlaceholder('fi.validation_error_message')}
</div>
```

:::

Both blocks clear before a new submit. With `clearFieldsOnSuccess` and form `reset`, success messages can be kept (the script sets a flag for the duration of reset).
