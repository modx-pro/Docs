---
title: PageBuilderQuiz
description: "FetchIt handler for quiz section. Do not call from template"
---

# PageBuilderQuiz snippet

AJAX submit handler for Pro [quiz](../sections/quiz) section. The section chunk calls it via **FetchIt**. Do not call this snippet from the resource template.

## Purpose

Validates answers and contacts, server-side total in `pricing` mode, email via `modMail`, FetchIt JSON response.

## Where it is called

Chunk `pagebuilderpro_quiz` → `{'!FetchIt' | snippet}` with form `pagebuilderpro_quiz_form` and snippet `PageBuilderQuiz`.

## Parameters

FetchIt sets parameters from the form (POST): `pb_quiz_key`, `answer[...]`, contact fields, honeypot `nospam`. There are no separate snippet properties for template calls.

## Dependencies

| Package | Why |
| --- | --- |
| pagebuilderpro | `quiz` section |
| FetchIt | AJAX and inline errors |

## See also

- [Quiz section](../sections/quiz)
- [PageBuilderContactForm](PageBuilderContactForm)
- [Snippets overview](index)
