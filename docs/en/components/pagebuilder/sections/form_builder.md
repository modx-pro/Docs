---
title: "Form builder"
description: "Form from a CMP Forms schema through FetchIt. Capability forms. Pro layer."
---

# Form builder

Section `form_builder` loads a schema from the CMP **Forms** tab. Chunk: `pagebuilderpro_form_builder`. Requires PageBuilder Pro, capability `forms`, and **FetchIt**.

1. In the CMP create a schema with a key and fields.
2. On the page add the section and pick the key in `form`.
3. On the site [PageBuilderFetchIt](../snippets/PageBuilderFetchIt) posts to [PageBuilderFormBuilder](../snippets/PageBuilderFormBuilder).

Schema fields: text, email, tel, textarea, select, radio, checkbox, date, hidden, consent. Form v1 does not accept a file.

The server checks CSRF and the `nospam` honeypot. The outbox is written in a transaction. Email and webhook leave synchronously after commit, in the same HTTP request. Submissions are not stored. An invalid email does not create a submission.

The section is part of the page context so the HTML cache does not freeze the form. `PageBuilderFetchIt` renders the form through Fenom.

## Section fields

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `title` | text | no | Title |
| `form` | form | yes | Schema key from CMP Forms |

## Render

Without FetchIt, or with an empty schema, the chunk shows lexicon `pagebuilder_fe_form_unavailable` in `p.pb-form-builder__fallback`. Otherwise [PageBuilderFetchIt](../snippets/PageBuilderFetchIt) renders chunk `pagebuilderpro_form_builder_fields` and passes handler `PageBuilderFormBuilder`.

## Section data {#output-in-section-data}

```json
{
  "title": "Request",
  "form": "contact"
}
```

## Similar sections

- [Contact form](contact_form): fields are built in the section inspector, not in the CMP
- [Quiz](quiz) for a stepped flow
- [Newsletter](newsletter): HTML form to an external `action_url`, not FetchIt

## Related pages

- [Control panel](../cmp#forms)
- [Section catalog](index)
