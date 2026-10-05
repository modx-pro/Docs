---
title: "Contact form"
description: "Form with configurable fields via FetchIt. Pro layer."
---

# Contact form

You build the field set in the inspector (text, email, phone, textarea, select, radio, checkbox, date), set **Form key** and success text. Submission goes through **FetchIt** and the `PageBuilderContactForm` snippet. Do not call the handler from the template.

![Contact form](/components/pagebuilder/screenshots/sections/contact_form.jpg)

::: info
Requires PageBuilder Pro and **FetchIt**.
:::

## What the form gives you in PageBuilder

- Field set in a repeater, not in form code
- Stable POST id via `form_key` (`pb_form_key`)
- Success message and redirect configured in the inspector
- Personal data is not written to `published_json`

## Typical placements

- Lead capture on a landing page
- Feedback on a contact page
- Lead magnet: download PDF after email

## Example pages

- Landing: [Hero](hero) → [Features](features) → [Contact form](contact_form)
- Contacts: [Contact with map](contact_map) → [Contact form](contact_form)

## form_key and fields

**Form key** (`form_key`) must be unique on the page if you have several forms. Repeater **Form fields**: name, label, type (`text`, `email`, `phone`, `textarea`, `select`, `radio`, `checkbox`, `date`), required. For select and radio, write options one per line (`Label|value` or value only). Field name: `[a-z][a-z0-9_]*`. A required checkbox stays empty until the value is `1`, `yes`, `true`, or `on`.

Email recipient: `emailsender` or site mail settings (same as handler). Without **FetchIt** the section shows a form unavailability message.

## Similar sections

- [Quiz](quiz) for multi-step collection
- [CTA](cta) with a single link instead of fields
- [Contact](contact) for tel:/mailto: without form submit

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `contact_form` |
| Layer | Pro |
| Category | conversion (`conversion`) |
| Chunk | `pagebuilderpro_contact_form` |
| Requirements | pro, FetchIt |

## Editor fields

Fill fields in the section inspector on the resource. Field type descriptions: [type reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#section-data-output). Optional.

### Intro (`intro`)

Type [textarea](../fields/textarea#section-data-output). Optional.

### Form key (`form_key`)

Type [text](../fields/text#section-data-output). Required.

### Form fields (`fields`)

Type [repeater](../fields/repeater#section-data-output). Required. Repeating rows. **Add** button in inspector.

Each row:

| Field | Type | Label | Required |
| --- | --- | --- | --- |
| `name` | [text](../fields/text#section-data-output) | Field name (name) | yes |
| `label` | [text](../fields/text#section-data-output) | Label | yes |
| `type` | [select](../fields/select#section-data-output) | Field type | yes |
| `required` | [yesno](../fields/yesno#section-data-output) | Required | no |

### Submit button text (`submit_label`)

Type [text](../fields/text#section-data-output). Optional.

### Success message (`success_message`)

Type [textarea](../fields/textarea#section-data-output). Optional.

### Redirect URL after submit (`redirect_url`)

Type [url](../fields/url#section-data-output). Optional.

## What the visitor sees

Section `pb-contact-form`. AJAX via FetchIt → [PageBuilderContactForm](../snippets/PageBuilderContactForm). Honeypot `nospam`: silent success without email.

## Section data {#section-data-output}

Example JSON after section save (field schema, not visitor responses):

```json
{
  "title": "Leave a request",
  "intro": "We will reply during business hours.",
  "form_key": "contact",
  "fields": [
    {
      "_rowId": "00000000-0000-4000-8000-000000000001",
      "name": "name",
      "label": "Name",
      "type": "text",
      "required": true
    },
    {
      "_rowId": "00000000-0000-4000-8000-000000000002",
      "name": "email",
      "label": "Email",
      "type": "email",
      "required": true
    }
  ],
  "submit_label": "Send",
  "success_message": "Thank you! We will contact you soon.",
  "redirect_url": "https://example.com/thanks"
}
```

## Chunk template

Fenom chunk `pagebuilderpro_contact_form`:

```fenom
{set $formKey = $form_key|default:'contact'}
<section class="pb-section pb-section--contact-form pb-contact-form{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="contact_form"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-contact-form__inner">
    {if $title}
      <h2 class="pb-heading pb-contact-form__title">{$title|escape}</h2>
    {/if}
    {if $intro}
      <p class="pb-contact-form__intro">{$intro|escape}</p>
    {/if}

    {if !$fetchit_available}
      <p class="pb-contact-form__fallback" role="status">{$lex_form_unavailable|escape}</p>
    {else}
      {'!PageBuilderFetchIt' | snippet : [
        'snippet' => 'PageBuilderContactForm',
        'form' => 'pagebuilderpro_contact_form_fields',
        'form_key' => $formKey,
        'resource_id' => $resource_id|default:0,
        'successMessage' => ($success_message ?: $lex_success_default),
        'validationErrorMessage' => $lex_validation_error,
        'clearFieldsOnSuccess' => 1,
        'fields' => $fields,
        'form_csrf' => $form_csrf,
        'submit_label' => $submit_label,
        'lex_submit' => $lex_submit,
        'lex_field_required' => $lex_field_required,
        'lex_field_email' => $lex_field_email,
        'cssClass' => $cssClass,
        'id' => $id,
      ]}
    {/if}
  </div>
</section>
```

Fenom chunk `pagebuilderpro_contact_form_fields`:

```fenom
{set $formKey = $form_key|default:'contact'}
{set $submitText = $submit_label|default:$lex_submit}

<form class="pb-contact-form__form fetchit-form" method="post" novalidate>
  <input type="hidden" name="pb_form_key" value="{$formKey|escape}" />
  <input type="hidden" name="pb_csrf" value="{$form_csrf|escape}" />
  <input type="hidden" name="nospam" value="" tabindex="-1" autocomplete="off" aria-hidden="true" class="pb-contact-form__honeypot" />

  <div class="pb-contact-form__message pb-contact-form__message--success" data-success role="status"></div>
  <div class="pb-contact-form__message pb-contact-form__message--error" data-validation-error role="alert"></div>

  <div class="pb-contact-form__fields">
    {foreach $fields as $field}
      {set $fname = $field.name|default:''}
      {if $fname == ''}{continue}{/if}
      {set $flabel = $field.label|default:$fname}
      {set $ftype = $field.type|default:'text'}
      {set $frequired = $field.required|default:0}
      {set $options = $field.options_list|default:($field.options|default:[])}
      {set $fid = "pb-{$formKey|escape}-{$fname|escape}"}

      <div class="pb-contact-form__field" data-custom="{$fname|escape}">
        {if $ftype == 'checkbox'}
          <label class="pb-contact-form__check" for="{$fid}">
            <input type="checkbox" id="{$fid}" name="{$fname|escape}" value="1" {if $frequired}required aria-required="true"{/if} />
            <span>{$flabel|escape}{if $frequired}<span class="pb-contact-form__required" aria-hidden="true">*</span>{/if}</span>
          </label>
        {elseif $ftype == 'textarea'}
          <label class="pb-contact-form__label" for="{$fid}">
            {$flabel|escape}{if $frequired}<span class="pb-contact-form__required" aria-hidden="true">*</span>{/if}
          </label>
          <textarea class="pb-contact-form__control" id="{$fid}" name="{$fname|escape}" rows="4" {if $frequired}required aria-required="true"{/if}></textarea>
        {elseif $ftype == 'select'}
          <label class="pb-contact-form__label" for="{$fid}">
            {$flabel|escape}{if $frequired}<span class="pb-contact-form__required" aria-hidden="true">*</span>{/if}
          </label>
          <select class="pb-contact-form__control" id="{$fid}" name="{$fname|escape}" {if $frequired}required aria-required="true"{/if}>
            <option value="">—</option>
            {foreach $options as $option}
              {set $ovalue = $option.value|default:$option}
              {set $olabel = $option.label|default:$ovalue}
              <option value="{$ovalue|escape}">{$olabel|escape}</option>
            {/foreach}
          </select>
        {elseif $ftype == 'radio'}
          <fieldset class="pb-contact-form__fieldset">
            <legend>{$flabel|escape}{if $frequired}<span class="pb-contact-form__required" aria-hidden="true">*</span>{/if}</legend>
            {foreach $options as $option}
              {set $ovalue = $option.value|default:$option}
              {set $olabel = $option.label|default:$ovalue}
              <label class="pb-contact-form__check">
                <input type="radio" name="{$fname|escape}" value="{$ovalue|escape}" {if $frequired}required aria-required="true"{/if} />
                <span>{$olabel|escape}</span>
              </label>
            {/foreach}
          </fieldset>
        {else}
          <label class="pb-contact-form__label" for="{$fid}">
            {$flabel|escape}{if $frequired}<span class="pb-contact-form__required" aria-hidden="true">*</span>{/if}
          </label>
          <input
            class="pb-contact-form__control"
            id="{$fid}"
            type="{if $ftype == 'email'}email{elseif $ftype == 'phone'}tel{elseif $ftype == 'date'}date{else}text{/if}"
            name="{$fname|escape}"
            {if $ftype == 'email'}autocomplete="email"{elseif $ftype == 'phone'}autocomplete="tel" inputmode="tel"{elseif $fname == 'name'}autocomplete="name"{/if}
            {if $frequired}required aria-required="true"{/if}
          />
        {/if}
        <span class="pb-contact-form__error" data-error="{$fname|escape}"></span>
      </div>
    {/foreach}
  </div>

  <button class="pb-button pb-contact-form__submit" type="submit">{$submitText|escape}</button>
</form>
```

Without FetchIt the chunk prints lexicon `pagebuilder_fe_form_unavailable`.

## Related pages

- [Quiz](quiz)
- [PageBuilderContactForm snippet](../snippets/PageBuilderContactForm)
- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
