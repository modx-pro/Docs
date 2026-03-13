# Working with forms

## Adding a form

You need to write a preset for the snippet call. In folder `core/elements/presets` create `ajaxformitlogin.inc.php`. Example:

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

Then mark up the form in the markup so it can be cut into a chunk. Use these attributes:

- `data-mpc-chunk` — path to the form chunk.
- `data-mpc-copy` — set to `1` when you need to use the same form twice with different params and markup is taken from the first form on the page.
- `data-mpc-ssf` — set to `1` when you need to use the same form twice with different params taken from the preset; only when run from terminal.
- `data-mpc-form` — marks this chunk as a form to be replaced by an AjaxFormItLogin call; value `1` parses the form immediately (usually not needed in templates, except the wrapper template that contains modal forms).
- `data-mpc-preset` — key in the preset array.
- `data-mpc-name` — human-readable form name.

```html
<form id="contact-form" method="post" class="form-validate form-horizontal" data-mpc-chunk="forms/callback_form.tpl" data-mpc-form=""
      data-mpc-preset="callback_form" data-mpc-name="Contact form">
  <div class="row-fluid">
    <div class="control-group col-lg-6 col-md-6 col-xs-12 col-sm-12">
      <div class="contact-label">
        <label id="jform_contact_name-lbl" for="jform_contact_name" class="hasTooltip required" title="">
            Your name<span class="star">&nbsp;*</span>
        </label>
        <input type="text" name="name" id="jform_contact_name" value=""
                class="required input-block-level" size="30"
                aria-required="true" aria-invalid="true">
      </div>

      <div class="contact-label">
        <label id="jform_contact_emailmsg-lbl" for="jform_contact_emailmsg"
                class="hasTooltip required" title="">
            Phone<span class="star">&nbsp;*</span>
        </label>
        <input type="text" name="phone" id="jform_contact_emailmsg" value=""
                class="required input-block-level" size="60"
                aria-required="true">
      </div>

      <div class="contact-label">
        <label id="jform_contact_email-lbl" for="jform_contact_email"
                class="hasTooltip required" title="">
            Email<span class="star">&nbsp;</span>
        </label>
        <input type="email" name="email" class="validate-email input-block-level"
                id="jform_contact_email" value="" size="30" autocomplete="email">
      </div>
    </div>

      <div class="control-group col-lg-6 col-md-6 col-xs-12 col-sm-12">
        <div class="contact-message">
          <label id="jform_contact_message-lbl" for="jform_contact_message"
                  class="hasTooltip required" title="">
              Message<span class="star">&nbsp;*</span>
          </label>
          <textarea name="message" id="jform_contact_message" cols="50" rows="10"
                    class="required input-block-level" aria-required="true"
                    style="height:160px;"></textarea>
        </div>
        <div class="contact-form-submit">
          <button id="button" style="margin-top:25px;"
                class="btn center-block btn-primary btn-large validate sp-rounded"
                type="submit"><i class="fa fa-envelope"></i>&nbsp;Send
          </button>
        </div>
      </div>
  </div>
</form>
```

After that the Contacts resource will show the new form in the form list with the preset and the list of parameters that can be overridden or extended in the admin. Parameters set in the admin always take priority over those in the file.

## Auto-filling emailTo and emailFrom

**emailTo** is filled as follows:

1. Highest priority: value of this parameter in the form list (admin).
2. If not set in the admin but the contacts TV (default: `contacts`) has at least one email linked to the form — that value is used.
3. If there are no linked emails in the contacts list — system setting `mpc_email` is used.
4. If `mpc_email` is empty — system setting `ms2_email_manager` is used.
5. If `ms2_email_manager` is empty — fallback `info@your_domain` is used.

**emailFrom** is filled as follows:

1. Highest priority: value of this parameter in the form list (admin).
2. If not set in the admin — fallback `noreply@your_domain` is used.
3. If you use SMTP — system setting `mail_smtp_user` is used; if it is not a valid email (no `@`), the missing part is built from the first value in system setting `mail_smtp_hosts`.
