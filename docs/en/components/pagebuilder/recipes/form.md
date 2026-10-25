---
title: Form
description: "A FetchIt submission: a one-off contact_form or a form_builder schema from CMP Forms. Pro layer"
---

# Form

Result: the visitor sends a request. The mail leaves in the same request. PageBuilder does not store submissions. Requires PageBuilder Pro and **FetchIt**.

## Before you start

1. The resource is published and the template contains `[[!PageBuilder]]`.
2. FetchIt is installed. Without it the section prints `pagebuilder_fe_form_unavailable`.
3. A schema reused across pages needs capability `forms`.

## Steps

A form that lives on one page:

1. Add a `contact_form` section.
2. Set **Form key**. If the page has several forms, do not reuse the key.
3. In the **Form fields** repeater add name, label, and type: `text`, `email`, `phone`, `textarea`, `select`, `radio`, `checkbox`, `date`. For select and radio write one value per line. The line becomes both the label and the value. Field name: `[a-z][a-z0-9_]*`, case-insensitive.
4. A required checkbox stays empty until the value is `1`, `yes`, `true`, or `on`.
5. **Save** the resource. The recipient is the system setting `emailsender`. An empty value means the message is not sent and the visitor sees a send error.

One schema on many pages:

1. In the CMP **Forms** tab create a schema with a key and fields. Types: `text`, `email`, `tel`, `textarea`, `select`, `radio`, `checkbox`, `date`, plus `hidden` and `consent`. For select and radio fill **Options**.
2. The schema **Email** field sets the recipient. An empty field sends the mail to `emailsender`.
3. **Webhook** sends a POST when the URL starts with `https://`. The header is `X-PageBuilder-Signature`. A webhook does not replace the mail.
4. On the page add `form_builder`, pick the key, and set intro if you need it.
5. **Save** the resource. The `PageBuilderFormBuilder` snippet handles the submit.

The server checks CSRF and the `nospam` honeypot.

- Form v1 does not accept a file.
- An invalid email in a visitor field does not create a submission.
- An empty `form_builder` schema prints `pagebuilder_fe_form_empty`.
- Repeated submits of one schema return the text `Too many requests.` `contact_form` has no such limit.

## Example fields

Two forms on one page.

`contact_form`, key `callback`. Repeater rows:

| name | label | type | options |
| --- | --- | --- | --- |
| `name` | Name | `text` | |
| `email` | Email | `email` | |
| `topic` | Topic | `select` | `Delivery` and `Payment`, one value per line |

A second `contact_form` section uses key `callback_footer`. Same fields, different key.

`form_builder` on other pages reads the schema from the **Forms** tab, not from a section repeater. Fill intro when you need a paragraph above the fields.

## What to check

`contact_form`: the mail goes to `emailsender`. An empty value does not send, and the visitor sees an error.

`form_builder`: the mail goes to the schema Email. An empty Email sends to `emailsender`. An invalid address and a mail failure are written to the log and do not change success.

The `nospam` honeypot returns a silent success and sends no mail.

## Rollback

Delete the section. Delete the CMP schema separately.

## See also

- [Contact form](../sections/contact_form)
- [Form builder](../sections/form_builder)
- [Control panel → Forms](../cmp#forms)
