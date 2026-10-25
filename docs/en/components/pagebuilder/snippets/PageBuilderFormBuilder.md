---
title: PageBuilderFormBuilder
description: "FetchIt handler for the form_builder section. Do not call from a template"
---

# PageBuilderFormBuilder snippet

AJAX submit handler for the Pro [form_builder](../sections/form_builder) section. The chunk calls it through [PageBuilderFetchIt](PageBuilderFetchIt). Do not call this snippet from the resource template.

## Purpose

1. Finds the `form_builder` section with the same schema key. Uses the published document when `publishedRevision > 0`, otherwise the draft.
2. Checks CSRF and the honeypot.
3. Writes the outbox in a transaction.

Mail is always queued. The recipient is the schema `email`. An empty field sends to `emailsender`.

A webhook is queued only when `webhook` is not empty. It is sent only to an `https://` URL.

A delivery error after commit does not change the success JSON.

Submissions are not stored. Capability `forms` is required.

## Where it is called

Chunk `pagebuilderpro_form_builder` passes `snippet` = `PageBuilderFormBuilder` and `form` = `pagebuilderpro_form_builder_fields` into `PageBuilderFetchIt`.

## Parameters

There are no properties for a template call. Form POST:

| Field | Purpose |
| --- | --- |
| `pb_form_key` | Schema key. An empty key is a validation error |
| `pb_csrf` | Token. A bad token returns `CSRF token is invalid.` |
| `nospam` | Honeypot. A filled field returns success and does not send mail |

Where to look for the section, same order as [PageBuilderContactForm](PageBuilderContactForm):

| Source | Priority |
| --- | --- |
| POST `pageId` | 1 |
| `resource_id` on the FetchIt action | 2 |
| current MODX resource | 3 |

The chunk also passes action keys `form_key`, `form_csrf`, `successMessage`, and `validationErrorMessage`. `form_csrf` on the action wins over the session token.

### Errors

| Situation | Response |
| --- | --- |
| Missing section or schema | `pagebuilder_fe_form_not_found` |
| No capability `forms` | `pagebuilder_fe_form_unavailable` |
| Too many requests | `Too many requests.` |

## Dependencies

| Package | Why |
| --- | --- |
| pagebuilderpro | `form_builder` section, capability `forms` |
| FetchIt | AJAX and inline errors |

## See also

- [form_builder section](../sections/form_builder)
- [PageBuilderFetchIt](PageBuilderFetchIt)
- [Control panel, Forms](../cmp#forms)
