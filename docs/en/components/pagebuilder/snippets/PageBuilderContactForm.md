---
title: PageBuilderContactForm
description: "FetchIt handler for contact_form section. Do not call from template"
---

# PageBuilderContactForm snippet

AJAX submit handler for Pro [contact_form](../sections/contact_form) section. The section chunk calls it via **FetchIt**. Do not call this snippet from the resource template.

## Purpose

Validates fields, sends mail through `modMail`, returns FetchIt JSON (success / field errors / redirect).

## Where it is called

Chunk `pagebuilderpro_contact_form` calls [PageBuilderFetchIt](PageBuilderFetchIt) with `snippet` = `PageBuilderContactForm` and `form` = `pagebuilderpro_contact_form_fields`.

## Parameters

There are no properties for a template call. Form POST:

| Field | Purpose |
| --- | --- |
| `pb_form_key` | Form key from the section. An empty key is a validation error |
| `pb_csrf` | Token from the chunk hidden field. A bad or empty token returns `pagebuilder_fe_form_validation_error` |
| repeater fields | Names and rules from the section |
| `nospam` | Honeypot. A filled field returns success before the CSRF check and does not send mail |
| `pageId` | Optional resource id from the form page |

Where to look for the section:

| Source | Priority |
| --- | --- |
| POST `pageId` | 1 |
| `resource_id` on the FetchIt action | 2 |
| current MODX resource | 3 |

The chunk passes action keys `form_key`, `form_csrf`, `successMessage`, and `validationErrorMessage`. `form_csrf` on the action wins over the session token.

### Errors

| Situation | Response |
| --- | --- |
| Missing section | `pagebuilder_fe_form_not_found` |
| Direct call without FetchIt | `pagebuilder_fe_fetchit_unavailable` |
| `modMail` did not send mail | `pagebuilder_fe_form_send_error`, mail is not treated as sent |

## Dependencies

| Package | Why |
| --- | --- |
| pagebuilderpro | `contact_form` section |
| FetchIt | AJAX and inline errors |

## See also

- [Contact form section](../sections/contact_form)
- [PageBuilderQuiz](PageBuilderQuiz)
- [Snippets overview](index)
