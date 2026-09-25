---
title: "Newsletter"
description: "HTML subscribe form to an external action_url. Not FetchIt. Pro layer."
---

# Newsletter

Section `newsletter` renders an HTML form. Submit goes to an external `action_url`, not through FetchIt. Chunk: `pagebuilderpro_newsletter`. Requires PageBuilder Pro.

![Newsletter](/components/pagebuilder/screenshots/sections/newsletter.jpg)

`action_url` is required. `email_name` sets the email field name in POST. `note` is the privacy text.

## Where it fits

- Mailchimp, Unisender, or your own endpoint
- A block in the landing footer
- Collecting email without a MODX mail

## Fields

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `title` | text | no | Title |
| `text` | textarea | no | Text |
| `action_url` | url | yes | Form handler URL |
| `email_name` | text | no | Email field name |
| `placeholder` | text | no | Placeholder |
| `submit_label` | text | no | Button label |
| `note` | textarea | no | Privacy note |

## Render

The form uses `method="post"` and posts to `action_url`. FetchIt is not involved. Empty fields take chunk defaults: field name `email`, button `Subscribe`, placeholder `you@example.com`. `note` and `text` print only when set. There is no empty state: publish fails without `action_url` because the field is required.

## Section data {#output-in-section-data}

```json
{
  "title": "Newsletter",
  "text": "Once a month",
  "action_url": "https://example.com/subscribe",
  "email_name": "email",
  "placeholder": "you@example.com",
  "submit_label": "Subscribe",
  "note": "Unsubscribe from the email"
}
```

## Chunk template

Fenom chunk `pagebuilderpro_newsletter`:

```fenom
{set $emailField = $email_name|default:'email'}
{set $submitText = $submit_label|default:'Subscribe'}
{set $ph = $placeholder|default:'you@example.com'}
<section class="pb-section pb-section--newsletter pb-newsletter{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="newsletter"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner">
    {if $title}<h2 class="pb-heading">{$title|escape}</h2>{/if}
    {if $text}<p class="pb-newsletter__text">{$text|escape}</p>{/if}
    <form class="pb-newsletter__form" method="post" action="{$action_url|escape}">
      <label class="pb-newsletter__label" for="pb-newsletter-{$id|escape}">
        <span class="pb-sr-only">Email</span>
        <input
          class="pb-newsletter__input"
          id="pb-newsletter-{$id|escape}"
          type="email"
          name="{$emailField|escape}"
          placeholder="{$ph|escape}"
          required
          autocomplete="email"
        />
      </label>
      <button class="pb-button" type="submit">{$submitText|escape}</button>
    </form>
    {if $note}<p class="pb-newsletter__note">{$note|escape}</p>{/if}
  </div>
</section>
```

## Similar sections

- [Form builder](form_builder) for email and webhook through FetchIt
- [Contact form](contact_form) for a request to `emailsender`

## Related pages

- [Section catalog](index)
