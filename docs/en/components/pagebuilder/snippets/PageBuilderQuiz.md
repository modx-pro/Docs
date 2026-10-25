---
title: PageBuilderQuiz
description: "FetchIt handler for quiz section. Do not call from template"
---

# PageBuilderQuiz snippet

AJAX submit handler for Pro [quiz](../sections/quiz) section. The section chunk calls it via **FetchIt**. Do not call this snippet from the resource template.

## Purpose

Validates answers and contacts, calculates the total on the server in `pricing` mode, sends mail through `modMail`, and returns FetchIt JSON. A success payload can include `total`, `currency_suffix` (default `₽`), and `redirect_url`.

## Where it is called

Chunk `pagebuilderpro_quiz` calls [PageBuilderFetchIt](PageBuilderFetchIt) with `snippet` = `PageBuilderQuiz` and `form` = `pagebuilderpro_quiz_form`.

## Parameters

There are no properties for a template call. Form POST:

| Field | Purpose |
| --- | --- |
| `pb_quiz_key` | Quiz key |
| `answer[...]` | Answers |
| contact fields | Contacts |
| `nospam` | Honeypot. A filled field returns success and does not send mail |
| `pageId` | Optional resource id |

Where to look for the section:

| Source | Priority |
| --- | --- |
| POST `pageId` | 1 |
| `resource_id` on the FetchIt action | 2 |
| current MODX resource | 3 |

The chunk passes action keys `quiz_key`, `successMessage`, and `validationErrorMessage`.

### Errors

| Situation | Response |
| --- | --- |
| Missing section | `pagebuilder_fe_quiz_not_found` |
| Direct call without FetchIt | `pagebuilder_fe_fetchit_unavailable` |
| `modMail` did not send mail | `pagebuilder_fe_form_send_error`, mail is not treated as sent |

## Dependencies

| Package | Why |
| --- | --- |
| pagebuilderpro | `quiz` section |
| FetchIt | AJAX and inline errors |

## See also

- [Quiz section](../sections/quiz)
- [PageBuilderContactForm](PageBuilderContactForm)
- [Snippets overview](index)
