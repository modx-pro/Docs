---
title: "Form builder"
description: "Form from a CMP Forms schema through FetchIt. Capability forms. Pro layer."
---

# Form builder

Section `form_builder` loads a schema from the CMP **Forms** tab. Chunk: `pagebuilderpro_form_builder`. Requires PageBuilder Pro, capability `forms`, and **FetchIt**.

![Form builder](/components/pagebuilder/screenshots/sections/form_builder.jpg)

1. In the CMP create a schema with a key and fields.
2. On the page add the section and pick the key in `form`.
3. On the site [PageBuilderFetchIt](../snippets/PageBuilderFetchIt) posts to [PageBuilderFormBuilder](../snippets/PageBuilderFormBuilder).

Schema fields: text, email, tel, textarea, select, radio, checkbox, date, hidden, consent. For select and radio the **Forms** tab has an **Options** field: one per line, `Label|value` or value only. Form v1 does not accept a file.

The server checks CSRF and the `nospam` honeypot. The outbox is written in a transaction. Email and webhook leave synchronously after commit, in the same HTTP request. Submissions are not stored. An invalid email does not create a submission.

The section is part of the page context so the HTML cache does not freeze the form. `PageBuilderFetchIt` renders the form through Fenom.

## Section fields

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `title` | text | no | Title |
| `intro` | textarea | no | Text under the title |
| `form` | form | yes | Schema key from CMP Forms |

## Render

Without FetchIt the chunk prints lexicon `pagebuilder_fe_form_unavailable`. An empty schema prints `pagebuilder_fe_form_empty`. Otherwise [PageBuilderFetchIt](../snippets/PageBuilderFetchIt) renders chunk `pagebuilderpro_form_builder_fields` and passes handler `PageBuilderFormBuilder`.

## Section data {#output-in-section-data}

```json
{
  "title": "Request",
  "intro": "We reply during business hours.",
  "form": "contact"
}
```

## Chunk template

Fenom chunk `pagebuilderpro_form_builder`:

```fenom
{set $formKey = $form_key|default:$form|default:'form'}
<section class="pb-section pb-section--form pb-form-builder" data-pb-section="form_builder"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-form-builder__inner">
    {if $title}
      <h2 class="pb-heading pb-form-builder__title">{$title|escape}</h2>
    {/if}
    {if $intro}
      <p class="pb-form-builder__intro">{$intro|escape}</p>
    {/if}

    {if !$fetchit_available}
      <p class="pb-form-builder__fallback" role="status">{$lex_form_unavailable|escape}</p>
    {elseif $form_fields|count == 0}
      <p class="pb-form-builder__fallback" role="status">{$lex_form_empty|escape}</p>
    {else}
      {'!PageBuilderFetchIt' | snippet : [
        'snippet' => 'PageBuilderFormBuilder',
        'form' => 'pagebuilderpro_form_builder_fields',
        'form_key' => $formKey,
        'resource_id' => $resource_id|default:0,
        'successMessage' => ($success_message ?: $lex_success_default),
        'validationErrorMessage' => $lex_validation_error,
        'clearFieldsOnSuccess' => 1,
        'form_fields' => $form_fields,
        'form_csrf' => $form_csrf,
        'lex_submit' => $lex_submit,
        'lex_field_required' => $lex_field_required,
        'lex_field_email' => $lex_field_email,
        'lex_select_placeholder' => $lex_select_placeholder,
        'id' => $id,
      ]}
    {/if}
  </div>
</section>
```

Fenom chunk `pagebuilderpro_form_builder_fields`:

```fenom
{set $formKey = $form_key|default:'form'}
{set $fields = $form_fields|default:[]}
{set $submitText = $lex_submit|default:'Submit'}
{set $selectPlaceholder = $lex_select_placeholder|default:'—'}

<form class="pb-form-builder__form fetchit-form" method="post" novalidate>
  <input type="hidden" name="pb_form_key" value="{$formKey|escape}" />
  <input type="hidden" name="pb_csrf" value="{$form_csrf|escape}" />
  <input type="text" name="nospam" value="" tabindex="-1" autocomplete="off" class="pb-form-builder__honeypot" />

  <div class="pb-form-builder__message pb-form-builder__message--success" data-success role="status"></div>
  <div class="pb-form-builder__message pb-form-builder__message--error" data-validation-error role="alert"></div>

  <div class="pb-form-builder__fields">
    {foreach $fields as $field}
      {set $fname = $field.name|default:''}
      {if $fname == ''}{continue}{/if}
      {set $flabel = $field.label|default:$fname}
      {set $ftype = $field.type|default:'text'}
      {set $frequired = $field.required|default:0}
      {set $options = $field.options|default:[]}
      {set $fid = "pb-{$formKey|escape}-{$fname|escape}"}
      {set $ferr = "pb-{$formKey|escape}-{$fname|escape}-error"}
      {if $ftype == 'hidden'}
        <input type="hidden" name="{$fname|escape}" value="{$field.value|default:''|escape}" />
        {continue}
      {/if}
      <div class="pb-form-builder__field" data-custom="{$fname|escape}">
        {if $ftype == 'consent' || $ftype == 'checkbox'}
          <label class="pb-form-builder__check" for="{$fid}">
            <input type="checkbox" id="{$fid}" name="{$fname|escape}" value="1" aria-describedby="{$ferr}" {if $frequired}required aria-required="true"{/if} />
            <span>{$flabel|escape}{if $frequired} <span class="pb-form-builder__required" aria-hidden="true">*</span>{/if}</span>
          </label>
        {elseif $ftype == 'textarea'}
          <label class="pb-form-builder__label" for="{$fid}">
            {$flabel|escape}{if $frequired} <span class="pb-form-builder__required" aria-hidden="true">*</span>{/if}
          </label>
          <textarea class="pb-form-builder__control" id="{$fid}" name="{$fname|escape}" rows="4" aria-describedby="{$ferr}" {if $frequired}required aria-required="true"{/if}></textarea>
        {elseif $ftype == 'select'}
          <label class="pb-form-builder__label" for="{$fid}">
            {$flabel|escape}{if $frequired} <span class="pb-form-builder__required" aria-hidden="true">*</span>{/if}
          </label>
          <select class="pb-form-builder__control" id="{$fid}" name="{$fname|escape}" aria-describedby="{$ferr}" {if $frequired}required aria-required="true"{/if}>
            <option value="">{$selectPlaceholder|escape}</option>
            {foreach $options as $option}
              {set $ovalue = $option.value|default:$option}
              {set $olabel = $option.label|default:$ovalue}
              <option value="{$ovalue|escape}">{$olabel|escape}</option>
            {/foreach}
          </select>
        {elseif $ftype == 'radio'}
          <fieldset class="pb-form-builder__fieldset">
            <legend>{$flabel|escape}{if $frequired} <span class="pb-form-builder__required" aria-hidden="true">*</span>{/if}</legend>
            {foreach $options as $option}
              {set $ovalue = $option.value|default:$option}
              {set $olabel = $option.label|default:$ovalue}
              <label class="pb-form-builder__check">
                <input type="radio" name="{$fname|escape}" value="{$ovalue|escape}" aria-describedby="{$ferr}" {if $frequired}required aria-required="true"{/if} />
                <span>{$olabel|escape}</span>
              </label>
            {/foreach}
          </fieldset>
        {else}
          {set $inputType = 'text'}
          {if $ftype == 'email'}{set $inputType = 'email'}
          {elseif $ftype == 'tel'}{set $inputType = 'tel'}
          {elseif $ftype == 'date'}{set $inputType = 'date'}
          {/if}
          <label class="pb-form-builder__label" for="{$fid}">
            {$flabel|escape}{if $frequired} <span class="pb-form-builder__required" aria-hidden="true">*</span>{/if}
          </label>
          <input
            class="pb-form-builder__control"
            id="{$fid}"
            type="{$inputType}"
            name="{$fname|escape}"
            aria-describedby="{$ferr}"
            {if $ftype == 'email'}autocomplete="email"{elseif $ftype == 'tel'}autocomplete="tel" inputmode="tel"{elseif $fname == 'name'}autocomplete="name"{elseif $fname == 'phone'}autocomplete="tel" inputmode="tel"{/if}
            {if $frequired}required aria-required="true"{/if}
          />
        {/if}
        <span class="pb-form-builder__error" id="{$ferr}" data-error="{$fname|escape}"></span>
      </div>
    {/foreach}
  </div>

  <button class="pb-button pb-form-builder__submit" type="submit">{$submitText|escape}</button>
</form>
```

## Similar sections

- [Contact form](contact_form): fields are built in the section inspector, not in the CMP
- [Quiz](quiz) for a stepped flow
- [Newsletter](newsletter): HTML form to an external `action_url`, not FetchIt

## Related pages

- [Control panel](../cmp#forms)
- [Section catalog](index)
