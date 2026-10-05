---
title: Form
description: "A FetchIt submission: a one-off contact_form or a form_builder schema from CMP Forms. Pro layer"
---

# Form

Result: the visitor sends a request. The email leaves in the same HTTP request. PageBuilder does not store submissions. Requires PageBuilder Pro and **FetchIt**.

## Before you start

1. The resource is published and the template contains `[[!PageBuilder]]`.
2. FetchIt is installed. Without it the section prints `pagebuilder_fe_form_unavailable`.
3. A schema reused across pages needs capability `forms`.

## Steps

A form that lives on one page:

1. Add a `contact_form` section.
2. Set **Form key**. If the page has several forms, do not reuse the key.
3. In the **Form fields** repeater add name, label, and type: `text`, `email`, `phone`, `textarea`, `select`, `radio`, `checkbox`, `date`. For select and radio write options one per line: `Label|value` or value only. Field name: `[a-z][a-z0-9_]*`.
4. A required checkbox stays empty until the value is `1`, `yes`, `true`, or `on`.
5. **Save** the resource. The recipient is `emailsender` or the site mail settings.

One schema on many pages:

1. In the CMP **Forms** tab create a schema with a key and fields. The same types, plus hidden and consent. For select and radio fill **Options**.
2. On the page add `form_builder`, pick the key, and set intro if you need it.
3. **Save** the resource. Submit goes to the `PageBuilderFormBuilder` snippet.

The server checks CSRF and the `nospam` honeypot. Form v1 does not accept a file. An invalid email does not create a submission. An empty `form_builder` schema prints `pagebuilder_fe_form_empty`.

## Example fields

Two forms on one page. Keys differ.

`contact_form`, key `callback`. Repeater rows:

| name | label | type | options |
| --- | --- | --- | --- |
| `name` | Name | `text` | |
| `email` | Email | `email` | |
| `topic` | Topic | `select` | `Delivery\|delivery` and `Payment\|payment`, one per line |

A second `contact_form` section uses key `callback_footer`. Same fields, different key.

`form_builder` on other pages reads the schema from the **Forms** tab, not from a section repeater. Fill intro when you need a paragraph above the fields. An empty schema prints `pagebuilder_fe_form_empty`.

## What to check

Submit with a valid email. The message goes to the `emailsender` recipient. The `nospam` honeypot returns a silent success and sends no mail. An invalid email does not create a submission.

## Rollback

Delete the section. Delete the CMP schema separately.

## See also

- [Contact form](../sections/contact_form)
- [Form builder](../sections/form_builder)
- [Control panel → Forms](../cmp#forms)
