---
title: PageBuilderFormBuilder
description: "FetchIt handler for the form_builder section. Do not call from a template"
---

# Snippet PageBuilderFormBuilder

AJAX submit handler for the Pro [form_builder](../sections/form_builder) section. The chunk calls it through [PageBuilderFetchIt](PageBuilderFetchIt). Do not call this snippet from the resource template.

## Purpose

Finds the published `form_builder` section with the same schema key, checks CSRF and the honeypot, writes the outbox in a transaction, and sends mail and the webhook after commit. Submissions are not stored. Capability `forms` is required.

## Where it is called

Chunk `pagebuilderpro_form_builder` passes `snippet` = `PageBuilderFormBuilder` and `form` = `pagebuilderpro_form_builder_fields` into `PageBuilderFetchIt`.

## Parameters

There are no properties for a template call. Form POST:

| Field | Purpose |
| --- | --- |
| `pb_form_key` | Schema key. An empty key is a validation error |
| `pb_csrf` | Token. A bad token returns `CSRF token is invalid.` |
| `nospam` | Honeypot. A filled field returns success and does not send mail |

`resource_id` comes from the chunk properties or the current resource. A missing section or schema returns `pagebuilder_fe_form_not_found`. Without capability `forms` the response is `pagebuilder_fe_form_unavailable`. Too many requests return `Too many requests.`

## Dependencies

| Package | Why |
| --- | --- |
| pagebuilderpro | `form_builder` section, capability `forms` |
| FetchIt | AJAX and inline errors |

## See also

- [form_builder section](../sections/form_builder)
- [PageBuilderFetchIt](PageBuilderFetchIt)
- [Control panel, Forms](../cmp#forms)
