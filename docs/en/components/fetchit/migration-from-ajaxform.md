# Migration from AjaxForm

This section describes how to migrate from **AjaxForm** to **FetchIt**.

## Styles

**FetchIt** does not register any styles. Your layout should already define styles for invalid field state and add them to the system settings [`fetchit.frontend.input.invalid.class`](/en/components/fetchit/settings#fetchitfrontendinputinvalidclass) and [`fetchit.frontend.custom.invalid.class`](/en/components/fetchit/settings#fetchitfrontendcustominvalidclass).

## Notifications

Unlike **AjaxForm**, which bundles **jGrowl**, FetchIt lets you add any notification library or your own with a few lines of code.

This documentation has a section on integrating popular (and other) libraries.

[Notification examples](/en/components/fetchit/examples/notifications/).

## Snippet call

The **FetchIt** snippet keeps the main parameters the same; some have been moved to [system settings](/en/components/fetchit/settings).

:::code-group

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
{'!FetchIt' | snippet: [
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

The form structure is the same; only the [selectors](/en/components/fetchit/selectors) changed. Below is the form chunk that ships with **AjaxForm** and the required changes:

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

  <div class="form-group">
    <div class="controls">
      <button type="reset" class="btn btn-default">Reset</button>
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  </div>
</form>
```

## Client-side validation

If you had client-side validation like this:

```js
$(document).on('submit', '.ajax_form', function() {
  // Validation code
  afValidated = false;
});
```

Rewrite it as:

```js
document.addEventListener('fetchit:before', (e) => {
  const { form, fetchit } = e.detail; // Get form and FetchIt instance

  // Validation code

  // If validation failed
  fetchit.setError('field_name', 'Error message'); // Optional
  e.preventDefault();

  // If passed, we can do nothing
});
```

<!--@include: ./parts/validation.warning.md-->

## Event `af_complete`

**AjaxForm** has one event that fires after the server response. The equivalent is [`fetchit:after`](/en/components/fetchit/frontend/events#fetchitafter).

::: info Remember
[`fetchit:after`](/en/components/fetchit/frontend/events#fetchitafter) fires in all cases after the server response, regardless of status.

To run code based on status, use [`fetchit:success`](/en/components/fetchit/frontend/events#fetchitsuccess) and [`fetchit:error`](/en/components/fetchit/frontend/events#fetchiterror).
:::

Before:

```js
$(document).on('af_complete', function(event, response) {
  var form = response.form;
  // If form has a specific id
  if (form.attr('id') == 'my_form_3') {
    // Hide it!
    form.hide();
  }
  // Otherwise log the response
  else {
    console.log(response)
  }
});
```

After:

```js
document.addEventListener('fetchit:after', (e) => {
  const { form, response } = e.detail;
  // If form has a specific id
  if (form.getAttribute('id') === 'my_form_3') {
    // Hide it!
    form.style.display = 'none';
  }
  // Otherwise log the response
  else {
    console.log(response);
  }
});
```

:::warning Note
**FetchIt** events do not use **jQuery** objects, so **form** does not have **attr()** or **hide()**. Use native DOM APIs.
:::
