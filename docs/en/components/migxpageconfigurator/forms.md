# Working with forms

## Adding a form

Create a preset for the snippet call. In folder `core/elements/presets` create `ajaxformitlogin.inc.php`:

```php
<?php

return [
  'callback_form' => [
    'validate' => 'name:required,phone:required,email:email,message:required',
    'name.vTextRequired' => 'Enter your name',
    'phone.vTextRequired' => 'Enter phone',
    'message.vTextRequired' => 'Enter your message',
    'aliases' => 'name==,phone==,email==,message==',
    'hooks' => 'FormItSaveForm,email',
    'successMessage' => 'Form sent successfully.',
    'validationErrorMessage' => 'Fix form errors!',
    'emailTpl' => '@FILE chunks/emails/letter.tpl',
  ],
];
```

Then mark up the form in the markup so it can be extracted to a chunk. Use these attributes:

- `data-mpc-chunk` — path to the form chunk.
- `data-mpc-copy` — set to `1` when calling the same form twice with different params and markup is taken from the first form on the page.
- `data-mpc-ssf` — set to `1` when calling the same form twice and params come from preset; only when run from terminal.
- `data-mpc-form` — marks the chunk as a form to be replaced by AjaxFormItLogin call; value `1` parses the form immediately (usually not needed in templates, except wrapper with modal forms).
- `data-mpc-preset` — key in the preset array.
- `data-mpc-name` — human-readable form name.

```html
<form id="contact-form" method="post" class="form-validate form-horizontal" data-mpc-chunk="forms/callback_form.tpl" data-mpc-form=""
      data-mpc-preset="callback_form" data-mpc-name="Contact form">
  <!-- form fields -->
</form>
```

After that the Contacts resource will list the new form with the preset; parameters can be overridden or extended in the admin. Admin-set parameters always override file parameters.

## Auto-filling emailTo and emailFrom

**emailTo** priority:

1. Value in the form list (admin)
2. If not set in admin but the contacts TV has an email linked to the form — use that
3. Else system setting `mpc_email`
4. Else `ms2_email_manager`
5. Else fallback `info@your_domain`

**emailFrom** priority:

1. Value in the form list (admin)
2. If not set — fallback `noreply@your_domain`
3. If using SMTP — `mail_smtp_user`; if invalid (no `@`), missing part is built from first value in `mail_smtp_hosts`
