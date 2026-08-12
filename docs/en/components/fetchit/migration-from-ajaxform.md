---
title: Migration from AjaxForm
description: "Moving from AjaxForm to FetchIt: selectors, JSON success, events without jQuery"
---

# Migration from AjaxForm

Checklist for replacing AjaxForm with FetchIt: styles, toasts, snippet call, markup, custom handler, and JS events.

## Styles

FetchIt does not load CSS. Set invalid-field classes in [`fetchit.frontend.input.invalid.class`](/en/components/fetchit/settings#fetchitfrontendinputinvalidclass) and, if needed, [`fetchit.frontend.custom.invalid.class`](/en/components/fetchit/settings#fetchitfrontendcustominvalidclass). Keep the styles in your site theme.

## Notifications

AjaxForm ships jGrowl. In FetchIt toasts are optional: enable Notyf (`fetchit.frontend.default.notifier`) or plug in your own library.

[Examples](/en/components/fetchit/examples/notifications/).

## Snippet call

Main parameters (`form`, `snippet`, `actionUrl`, `clearFieldsOnSuccess`) stay the same. The JS path and class name moved to [system settings](/en/components/fetchit/settings). Parameters `frontend_css` and `formSelector` are gone.

::: code-group

```modx
[[!FetchIt?
  &form=`chunk name`
  &snippet=`FormIt`
  &actionUrl=`[[+assetsUrl]]action.php`
  &clearFieldsOnSuccess=`1`
  &frontend_js=`` // [!code warning] System setting: fetchit.frontend.js
  &objectName=`` // [!code warning] System setting: fetchit.frontend.js.classname
  &frontend_css=`` // [!code --]
  &formSelector=`` // [!code --]
]]
```

```fenom
{'!FetchIt' | snippet : [
  'form' => 'chunk name',
  'snippet' => 'FormIt',
  'actionUrl' => '[[+assetsUrl]]action.php',
  'clearFieldsOnSuccess' => true,
  'frontend_js' => '', // [!code warning] System setting: fetchit.frontend.js
  'objectName' => '', // [!code warning] System setting: fetchit.frontend.js.classname
  'frontend_css' => '', // [!code --]
  'formSelector' => '', // [!code --]
]}
```

:::

## Form markup

Error selectors: use `[data-error="name"]` instead of `.error_name`. The `ajax_form` class is not needed: the snippet adds `data-fetchit`.

From **1.1.3**, for AJAX add `[data-success]` and `[data-validation-error]` (see [selectors](/en/components/fetchit/selectors)). With AjaxForm, `[[+fi.successMessage]]` after a reload was often enough.

AjaxForm chunk → FetchIt:

::: code-group

```modx
<form action="[[~[[*id]]]]" method="post" class="ajax_form"> // [!code --]
<form action="[[~[[*id]]]]" method="post"> // [!code ++]

  <div class="form-group">
    <label class="control-label">Name</label>
    <div class="controls">
      <input type="text" name="name" value="[[+fi.name]]" class="form-control"/>
      <span class="error_name">[[+fi.error.name]]</span> // [!code --]
      <span data-error="name">[[+fi.error.name]]</span> // [!code ++]
    </div>
  </div>

  <div class="form-group">
    <label class="control-label">Email</label>
    <div class="controls">
      <input type="email" name="email" value="[[+fi.email]]" class="form-control"/>
      <span class="error_email">[[+fi.error.email]]</span> // [!code --]
      <span data-error="email">[[+fi.error.email]]</span> // [!code ++]
    </div>
  </div>

  <div class="form-group">
    <label class="control-label">Message</label>
    <div class="controls">
      <textarea name="message" class="form-control" rows="5">[[+fi.message]]</textarea>
      <span class="error_message">[[+fi.error.message]]</span> // [!code --]
      <span data-error="message">[[+fi.error.message]]</span> // [!code ++]
    </div>
  </div>

  <div role="alert" data-success style="display: none;"></div> // [!code ++]
  <div role="alert" data-validation-error style="display: none;"></div> // [!code ++]

  <div class="form-group">
    <div class="controls">
      <button type="reset" class="btn btn-default">Reset</button>
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </div>
</form>
```

```fenom
<form action="{$_modx->resource.id | url}" method="post" class="ajax_form"> // [!code --]
<form action="{$_modx->resource.id | url}" method="post"> // [!code ++]

  <div class="form-group">
    <label class="control-label">Name</label>
    <div class="controls">
      <input type="text" name="name" value="{$_modx->getPlaceholder('fi.name')}" class="form-control"/>
      <span class="error_name">{$_modx->getPlaceholder('fi.error.name')}</span> // [!code --]
      <span data-error="name">{$_modx->getPlaceholder('fi.error.name')}</span> // [!code ++]
    </div>
  </div>

  <div class="form-group">
    <label class="control-label">Email</label>
    <div class="controls">
      <input type="email" name="email" value="{$_modx->getPlaceholder('fi.email')}" class="form-control"/>
      <span class="error_email">{$_modx->getPlaceholder('fi.error.email')}</span> // [!code --]
      <span data-error="email">{$_modx->getPlaceholder('fi.error.email')}</span> // [!code ++]
    </div>
  </div>

  <div class="form-group">
    <label class="control-label">Message</label>
    <div class="controls">
      <textarea name="message" class="form-control" rows="5">{$_modx->getPlaceholder('fi.message')}</textarea>
      <span class="error_message">{$_modx->getPlaceholder('fi.error.message')}</span> // [!code --]
      <span data-error="message">{$_modx->getPlaceholder('fi.error.message')}</span> // [!code ++]
    </div>
  </div>

  <div role="alert" data-success style="display: none;"></div> // [!code ++]
  <div role="alert" data-validation-error style="display: none;"></div> // [!code ++]

  <div class="form-group">
    <div class="controls">
      <button type="reset" class="btn btn-default">Reset</button>
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </div>
</form>
```

:::

## Custom snippet instead of FormIt

AjaxForm expected JSON with key `status` (0/1). FetchIt expects `success` (bool). From 1.1.3 the component object is not passed in `$scriptProperties`: get it via `getService`. Example: [custom snippet](/en/components/fetchit/snippets/custom).

## Client-side validation

Before (jQuery + AjaxForm):

```js
$(document).on('submit', '.ajax_form', function() {
  // Validation code
  afValidated = false;
});
```

After:

```js
document.addEventListener('fetchit:before', (e) => {
  const { form, fetchit } = e.detail

  // Validation code

  // If validation failed
  fetchit.setError('field_name', 'Error message') // optional
  e.preventDefault()
})
```

<!--@include: ./parts/validation.warning.md-->

## Event `af_complete`

AjaxForm has one event after the server response. Equivalent: [`fetchit:after`](/en/components/fetchit/frontend/events#fetchitafter). It fires on both success and error. For branching use [`fetchit:success`](/en/components/fetchit/frontend/events#fetchitsuccess) and [`fetchit:error`](/en/components/fetchit/frontend/events#fetchiterror).

Before:

```js
$(document).on('af_complete', function(event, response) {
  var form = response.form
  if (form.attr('id') == 'my_form_3') {
    form.hide()
  } else {
    console.log(response)
  }
})
```

After:

```js
document.addEventListener('fetchit:after', (e) => {
  const { form, response } = e.detail
  if (form.getAttribute('id') === 'my_form_3') {
    form.style.display = 'none'
  } else {
    console.log(response)
  }
})
```

::: warning
`detail.form` is a native `HTMLFormElement`, not a jQuery object. It has no `attr()` or `hide()` methods.
:::
