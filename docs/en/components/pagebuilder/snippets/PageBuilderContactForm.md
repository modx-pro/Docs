---
title: PageBuilderContactForm
description: "FetchIt handler for contact_form section. Do not call from template"
---

# PageBuilderContactForm snippet

AJAX submit handler for Pro [contact_form](../sections/contact_form) section. The section chunk calls it via **FetchIt**. Do not call this snippet from the resource template.

## Purpose

Validates fields, email via `modMail`, FetchIt JSON response (success / field errors / redirect).

## Where it is called

Chunk `pagebuilderpro_contact_form` → `{'!FetchIt' | snippet}` with form `pagebuilderpro_contact_form_fields` and snippet `PageBuilderContactForm`.

## Parameters

FetchIt sets parameters from the form (POST): `pb_form_key`, fields from section repeater, honeypot `nospam`. There are no separate snippet properties for template calls.

## Dependencies

| Package | Why |
| --- | --- |
| pagebuilderpro | `contact_form` section |
| FetchIt | AJAX and inline errors |

## See also

- [Contact form section](../sections/contact_form)
- [PageBuilderQuiz](PageBuilderQuiz)
- [Snippets overview](index)
