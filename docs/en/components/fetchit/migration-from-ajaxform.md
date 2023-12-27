# Migration from AjaxForm

This section provides information about migrating from **AjaxForm** to **FetchIt**.

## Styles

**FetchIt** does not register any styles. Therefore, your layout should already have styles for invalid fields and should add [`fetchit.frontend.input.invalid.class`](/en/components/fetchit/settings#fetchitfrontendinputinvalidclass) and [`fetchit.frontend.custom.invalid.class`](/en/components/fetchit/settings#fetchitfrontendcustominvalidclass) to the system settings.

## Notifications

Unlike **AjaxForm** which has a **jGrowl** dependency in the box, we provide the ability to add any library or your own with a few lines of code.

This documentation has a whole section with all the popular and not-so-popular libraries plugged in.

[Examples](/en/components/fetchit/examples/notifications/).

## Snippet call

The **FetchIt** snippet kept the basic parameters intact, but we moved some of them to [system settings](/en/components/fetchit/settings).

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

## Layout

The form markup itself hasn't changed, just the [selectors](/en/components/fetchit/selectors). Let's take a look at the form chunk that comes with **AjaxForm** and visualise the changes:

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

## Validation

If you had a validation like this:

```js
$(document).on('submit', '.ajax_form', function() {
  // Validation code
  afValidated = false;
});
```

Then you need to rewrite your code like this:

```js
document.addEventListener('fetchit:before', (e) => {
  const { form, fetchit } = e.detail; // Get form and an instance of FetchIt class

  // Validation code

  // If validation fails
  fetchit.setError('field_name', 'Error message'); // Optional
  e.preventDefault();

  // If the validation is successful, we can do nothing
});
```

<!--@include: ./parts/validation.warning.md-->

## `af_complete` event

The **AjaxForm** has one event, and it fires after the server response. The similar event is [`fetchit:after`](/en/components/fetchit/frontend/events#fetchitafter).

::: info Remember
The [`fetchit:after`](/en/components/fetchit/frontend/events#fetchitafter) event fires anyway after the server response, regardless of its status.

If you need to implement status-dependent functionality, use the [`fetchit:success`](/en/components/fetchit/frontend/events#fetchitsuccess) and [`fetchit:error`](/en/components/fetchit/frontend/events#fetchiterror) events.
:::

Before:

```js
$(document).on('af_complete', function(event, response) {
  var form = response.form;
  // If the form has a specific id
  if (form.attr('id') == 'my_form_3') {
    // Hide it!
    form.hide();
  }
  // Otherwise, we print the entire response to the console
  else {
    console.log(response)
  }
});
```

After:

```js
document.addEventListener('fetchit:after', (e) => {
  const { form, response } = e.detail;
  // If the form has a specific id
  if (form.getAttribute('id') === 'my_form_3') {
    // Hide it!
    form.style.display = 'none';
  }
  // Otherwise, we print the entire response to the console
  else {
    console.log(response);
  }
});
```

::: warning WARNING
The **FetchIt** events do not return a **jQuery Object** and have nothing to do with **jQuery** and therefore **form** will naturally have no **attr()** or **hide()** methods.
:::
