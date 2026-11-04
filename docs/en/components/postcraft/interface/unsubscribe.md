# Unsubscribe page

The `{{ unsubscribe }}` link takes the recipient to a confirmation page. The Unsubscribe button adds the address to the blacklist, and later campaigns skip it.

## Site and language

The top of the tab selects a site and language. Each pair has its own texts. Languages come from MODX contexts: `cultureKey` sets the language, `site_url` the address. The language whose `site_url` matches the site root opens without a prefix, the others with one: `/en/unsubscribe/{token}`.

Ready texts exist for English, Russian, Spanish, Portuguese, French and Arabic. The Arabic page renders right to left.

## Page states

| Field | Shown when |
|---|---|
| Confirmation | the recipient comes from a letter. The unsubscribe button belongs here |
| Public form | `/unsubscribe` without a token: email field and Subscribe and Unsubscribe buttons |
| After unsubscribe | the address is unsubscribed |
| After subscribe | the address left the blacklist through the public form |
| Invalid link | the token is unknown |

Each field holds the full HTML and CSS, without a PostCraft frame.

## Placeholders

| Placeholder | Value |
|---|---|
| `{{ unsubscribe }}` | in the confirmation: the unsubscribe button. In the public form: the email field and buttons |
| `{{ email }}` | recipient address |
| `{{ home }}` | site URL |

You can style your own button as a link: `<a class="btn" href="{{ unsubscribe }}">Unsubscribe</a>`. PostCraft keeps the class and markup.

## Unsubscribe reason

To ask for a reason, put your own form into the confirmation:

```html
<form action="{{ unsubscribe }}" method="post">
  <textarea name="reason" placeholder="Why are you leaving?"></textarea>
  <button type="submit">Unsubscribe</button>
</form>
```

The markup stays yours. The `reason` text shows up in the campaign stats, in the Unsubscribe reasons block.

## One-click unsubscribe

Each letter carries the `List-Unsubscribe` and `List-Unsubscribe-Post` headers. Gmail and other mail apps use them to show their own Unsubscribe button, which works without a visit to the site.
