---
title: AjaxForm
description: Submit forms via Ajax. Uses FormIt, but you can specify your own snippet
logo: https://modstore.pro/assets/extras/ajaxform/logo-lg.jpg
author: modx-pro
modstore: https://modstore.pro/packages/utilities/ajaxform
modx: https://modx.com/extras/package/ajaxform
repository: https://github.com/modx-pro/AjaxForm
---
# AjaxForm

::: warning
On June 13, 2023, the [MODX RSC](https://github.com/modx-pro) team discontinued support for **AjaxForm**. It will remain available on [modstore.pro](https://modstore.pro/packages/utilities/ajaxform) and [extras.modx.com](https://modx.com/extras/package/ajaxform), but we recommend using [FetchIt](/en/components/fetchit/) instead.
:::

Snippet for submitting any form via ajax. By default it works with [FormIt](https://docs.modx.com/current/en/extras/formit), but you can use your own snippet.

- Registers the required frontend scripts: [jQuery.Form](http://malsup.com/jquery/form/) and [jQuery.jGrowl](http://plugins.jquery.com/jgrowl/).
- Saves `$scriptProperties` to the session when the snippet is called.
- Outputs the specified form, adding the **ajax_form** class and a hidden input for `$scriptProperties`.
- Attaches a handler so the form is submitted via ajax.
- On submit, runs the specified snippet for processing and returns its response.
- Outputs a success message or errors if any.

## Snippet parameters

| Name | Default | Description |
|------|---------|-------------|
| **&form** | `tpl.AjaxForm.example` | Chunk for the form to process. |
| **&snippet** | `FormIt` | Snippet that processes the form. |
| **&frontend_css** | `[[+assetsUrl]]css/default.css` | Styles for the form and error fields. |
| **&frontend_js** | `[[+assetsUrl]]js/default.js` | JavaScript for submitting the form via ajax. |
| **&actionUrl** | `[[+assetsUrl]]action.php` | Connector URL the form is submitted to. |

Everything you pass to AjaxForm is forwarded to the snippet being called.

## Using your own snippet

You can use your own snippet instead of [FormIt](https://docs.modx.com/current/en/extras/formit) to do whatever you need (e.g. create pages on the site). The only requirement is that it must return a JSON object with these keys:

- **status** — 1 or 0 (success or error).
- **message** — message from the snippet, shown when status = 0.
- **data** — object of field names to error messages for validation errors.

For convenience, the snippet receives a `$AjaxForm` variable (the component class) so you can call its **error** and **success** methods when returning a response.

Minimal custom snippet example:

```php
<?php
if (empty($_POST['name'])) {
  return $AjaxForm->error('Form errors', array(
    'name' => 'Name is required'
  ));
}
else {
  return $AjaxForm->success('Validation passed');
}
```

Call it like this:

```modx
[[!AjaxForm?
  &snippet=`MySnippet`
  &form=`tpl.AjaxForm.example`
]]
```

This snippet only returns the result of validating the name field.

## Form validation

The server can return a form submission error and an object of fields that failed validation. Those fields get the CSS class `error` automatically; it is removed on the next submit.

You can also block submission using the JavaScript variable **afValidated**: if it is set and equals `false`, the form will not be submitted.

Note that **all** client-side checks can be bypassed, so use this variable only for UX, not for real validation.

```modx
<script type="text/javascript">
$(document).on('submit', '.ajax_form', function() {
  // Your validation code here
  console.log(this);

  // Set the global variable
  afValidated = false; // or true if validation passed
});
</script>

[[!AjaxForm]]
```

## af_complete event

When the server responds, the **af_complete** event is fired. You can use it to update the page or run other JavaScript.

Your handler receives the event and the server response object (which also includes the form that was submitted).

```js
$(document).on('af_complete', function (event, response) {
  var form = response.form;
  if (form.attr('id') === 'my_form_3') {
    form.hide();
  }
  else {
    console.log(response)
  }
});
```

### Redirect after successful submit?

Add an id to the form if needed, then in your JS:

```js
$(document).on('af_complete', function (event, response) {
  var form = response.form;
  if (form.attr('id') === 'your_form_id') {
    window.location.href = "[[~page_id]]"
  }
});
```

You can wrap the code above in `<script>...</script>` and include it in the template with the form, near the closing `</body>`.

## Popup messages

By default AjaxForm shows success or error messages. You can trigger them yourself:

```js
AjaxForm.Message.success('Green popup');
AjaxForm.Message.error('Red popup', 1);
AjaxForm.Message.info('Black popup');
```

The second parameter enables a "sticky" popup that must be closed manually (useful for serious errors).

![Error examples](https://file.modx.pro/files/3/a/7/3a7b381f65837b330aaadf73b8b6282c.png)

So by simply calling the snippet on a page, you get [jQuery.jGrowl](http://plugins.jquery.com/jgrowl/) and can show popup notifications from JavaScript.

## Examples

Sending email with FormIt and validating some fields:

```modx
[[!AjaxForm?
  &snippet=`FormIt`
  &form=`tpl.AjaxForm.example`
  &hooks=`email`
  &emailSubject=`Test message`
  &emailTo=`info@domain.com`
  &validate=`name:required,email:required,message:required`
  &validationErrorMessage=`The form contains errors!`
  &successMessage=`Message sent successfully`
]]
```

## Debugging

If something goes wrong, first check whether the form works **without** AjaxForm. Remember that AjaxForm is a wrapper: it does not send email or validate the form; your snippet or FormIt does.

Also check the browser console for JavaScript errors. If the server returns 500 on submit, check the **register_globals** setting in PHP — it should be off.
