---
title: "Contact form"
description: "Form with custom fields, form key, and success message (Pro)"
---

# Contact form

Build fields in the inspector (text, email, tel, etc.), set a **Form key** for your handler, and configure the success message.

<!-- ![Contact form](/components/pagebuilder/screenshots/sections/contact_form.png) -->

::: info
Requires PageBuilder Pro.
:::

## Why this section

- Field set in a repeater, not hard-coded HTML
- `form_key` ties the block to your handler (AjaxForm, snippet)
- Success message and redirect live in the inspector

## When to use

- **Lead form** on a landing page
- **Feedback** on contacts
- **Lead magnet** — email gate for a PDF

## Page examples

- Landing: [Hero](hero) → [Features](features) → [Contact form](contact_form)
- Contacts: [Contact with map](contact_map) → [Contact form](contact_form)

## Inspector tips

**Form key** must match your site handler (snippet, AjaxForm). **Fields** repeater sets name, type, required per row.

## Similar sections

- [CTA](cta) with a single link instead of fields
- [Contact](contact) for tel:/mailto: without submit

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `contact_form` |
| Layer | Pro |
| Category | conversion (`conversion`) |
| Chunk | `pagebuilderpro_contact_form` |
| Requires | pro |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Optional.

### Intro (`intro`)

Type [textarea](../fields/textarea#output-in-section-data). Optional.

### Form key (`form_key`)

Type [text](../fields/text#output-in-section-data). Required.

### Fields (`fields`)

Type [repeater](../fields/repeater#output-in-section-data). Required. Repeatable rows. "Add" button in the inspector.

Each row:

| Field | Type | Label | Required |
| --- | --- | --- | --- |
| `name` | [text](../fields/text#output-in-section-data) | Field name | yes |
| `label` | [text](../fields/text#output-in-section-data) | Label | yes |
| `type` | [select](../fields/select#output-in-section-data) | Type | yes |
| `required` | [yesno](../fields/yesno#output-in-section-data) | Required | no |

### Submit label (`submit_label`)

Type [text](../fields/text#output-in-section-data). Optional.

### Success message (`success_message`)

Type [textarea](../fields/textarea#output-in-section-data). Optional.

### Redirect URL (`redirect_url`)

Type [url](../fields/url#output-in-section-data). Optional.

## Site output

`pb-contact-form`. Submit via `pbForm` / `pbFetch` on the front end.

## Output in section.data

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Заголовок секции",
  "intro": "Краткое вступление перед основным содержимым.",
  "form_key": "contact",
  "fields": [
    {
      "_rowId": "00000000-0000-4000-8000-000000000001",
      "name": "Иван Петров",
      "label": "Довольных клиентов",
      "type": "text",
      "required": true
    }
  ],
  "submit_label": "Отправить",
  "success_message": "Спасибо! Мы свяжемся с вами в ближайшее время.",
  "redirect_url": "https://example.com/thanks"
}
```

## Chunk template

Fenom chunk `pagebuilderpro_contact_form`:

```fenom
{var $formKey = $form_key|default:'contact'}
{var $status = $form_status|default:'idle'}
<section class="pb-section pb-section--contact-form pb-contact-form{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="contact_form"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-contact-form__inner">
    {if $title}
      <h2 class="pb-heading pb-contact-form__title">{$title|escape}</h2>
    {/if}
    {if $intro}
      <p class="pb-contact-form__intro">{$intro|escape}</p>
    {/if}

    {if !$formit_available}
      <p class="pb-contact-form__fallback" role="status">Форма временно недоступна. Установите FormIt или ajaxForm.</p>
    {elseif $status == 'success'}
      <div class="pb-contact-form__success" role="status">
        <p>{$success_message|default:'Спасибо! Мы свяжемся с вами в ближайшее время.'|escape}</p>
      </div>
    {else}
      {if $status == 'error'}
        <div class="pb-contact-form__summary" role="alert">
          <p>Проверьте обязательные поля и попробуйте снова.</p>
        </div>
      {/if}
      <form class="pb-contact-form__form" method="post" action="">
        <input type="hidden" name="pb_form_key" value="{$formKey|escape}" />
        <input type="hidden" name="nospam" value="" tabindex="-1" autocomplete="off" aria-hidden="true" class="pb-contact-form__honeypot" />
        <div class="pb-contact-form__fields">
          {foreach $fields as $field}
            {var $fname = $field.name|default:''}
            {var $flabel = $field.label|default:$fname}
            {var $ftype = $field.type|default:'text'}
            {var $frequired = $field.required|default:0}
            {var $fvalue = $form_values[$fname]|default:''}
            {var $ferror = $form_errors[$fname]|default:''}
            <div class="pb-contact-form__field{if $ferror} pb-contact-form__field--error{/if}">
              <label class="pb-contact-form__label" for="pb-{$formKey|escape}-{$fname|escape}">
                {$flabel|escape}{if $frequired}<span class="pb-contact-form__required" aria-hidden="true">*</span>{/if}
              </label>
              {if $ftype == 'textarea'}
                <textarea
                  class="pb-contact-form__control"
                  id="pb-{$formKey|escape}-{$fname|escape}"
                  name="{$fname|escape}"
                  rows="4"
                  {if $frequired}required aria-required="true"{/if}
                  {if $ferror}aria-invalid="true"{/if}
                >{$fvalue|escape}</textarea>
              {else}
                <input
                  class="pb-contact-form__control"
                  id="pb-{$formKey|escape}-{$fname|escape}"
                  type="{if $ftype == 'email'}email{elseif $ftype == 'phone'}tel{else}text{/if}"
                  name="{$fname|escape}"
                  value="{$fvalue|escape}"
                  {if $frequired}required aria-required="true"{/if}
                  {if $ferror}aria-invalid="true"{/if}
                />
              {/if}
              {if $ferror}
                <p class="pb-contact-form__error" id="pb-{$formKey|escape}-{$fname|escape}-error">
                  {if $ferror == 'email'}Введите корректный email.{else}Поле обязательно.{/if}
                </p>
              {/if}
            </div>
          {/foreach}
        </div>
        <button class="pb-button pb-contact-form__submit" type="submit">
          {$submit_label|default:'Отправить'|escape}
        </button>
      </form>
    {/if}
  </div>
</section>
```

## JSON definition

`PageBuilderPro/core/components/pagebuilderpro/sections/contact_form.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
