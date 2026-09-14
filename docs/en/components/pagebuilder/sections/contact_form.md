---
title: "Contact form"
description: "Form with configurable fields via FetchIt. Pro layer."
---

# Contact form

You build the field set in the inspector (text, email, phone, textarea), set **Form key** and success text. Submission goes through **FetchIt** and the `PageBuilderContactForm` snippet. Do not call the handler from the template.

<!-- ![Contact form](/components/pagebuilder/screenshots/sections/contact_form.png) -->

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

**Form key** (`form_key`) must be unique on the page if you have several forms. Repeater **Form fields**: name, label, type (`text` / `email` / `phone` / `textarea`), required. Field name: `[a-z][a-z0-9_]*`.

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

Fenom chunk `pagebuilderpro_contact_form` renders the cover and when FetchIt is present calls:

```fenom
{'!FetchIt' | snippet : [
  'snippet' => 'PageBuilderContactForm',
  'form' => 'pagebuilderpro_contact_form_fields',
]}
```

See the exact call in the package file. Without FetchIt: lexicon `pagebuilder_fe_form_unavailable`.

## JSON definition

`PageBuilderPro/core/components/pagebuilderpro/sections/contact_form.json`

## Related pages

- [Quiz](quiz)
- [PageBuilderContactForm snippet](../snippets/PageBuilderContactForm)
- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
