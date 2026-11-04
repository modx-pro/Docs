# Unsubscribe page

The `{{ unsubscribe }}` link takes the recipient to a confirmation page. The Unsubscribe button adds the address to the blacklist, and later campaigns skip it.

## Site and language

The top of the tab selects a site and language. Each pair has its own texts. PostCraft builds the language list this way:

- with Localizator, from its active languages: `cultureKey` sets the language, `http_host` the address;
- without Localizator, from MODX contexts, as in Babel: `cultureKey` sets the language, `site_url` the address.

The language whose address matches the site root opens without a prefix, the others with one: `/en/unsubscribe/{token}`.

PostCraft ships ready Russian and English texts. Other languages get an English draft, and a "Draft" notice sits above the fields. Translate the texts and save the page to clear the notice. Until you save, visitors see the English version. PostCraft renders the Arabic page right to left.

HTML fields open in the editor from the `which_editor` setting: CKEditor or TinyMCE RTE. Without an editor you get a plain HTML field.

On the right is a live preview, same idea as Templates: pick which screen to show (confirm, unsubscribed, public form, after subscribe, invalid link) and phone or desktop width. Placeholders in the preview get sample values.

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
