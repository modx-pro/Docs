---
title: PageBuilderFetchIt
description: "FetchIt wrapper that renders the form through Fenom. Do not call from a template"
---

# Snippet PageBuilderFetchIt

Wrapper around FetchIt for Pro forms. Chunks `pagebuilderpro_quiz`, `pagebuilderpro_contact_form`, and `pagebuilderpro_form_builder` call it uncached. Do not call this snippet from the resource template.

Upstream FetchIt checks `class_exists('pdoTools')`. On MODX 3 the class is `ModxPro\PdoTools\Fetch`, the check fails, and the form stays raw Fenom. `PageBuilderFetchIt` renders the form chunk through pdoTools and sets `method="post"` plus `data-fetchit`.

## Parameters

| Parameter | Purpose |
| --- | --- |
| `form` | Chunk name with the `<form>` markup. An empty value returns lexicon `pagebuilder_fe_form_unavailable` |
| `snippet` | Handler FetchIt calls on submit: `PageBuilderQuiz`, `PageBuilderContactForm`, or `PageBuilderFormBuilder` |

The section chunk passes the remaining properties into the form and the handler. If FetchIt is not installed, the snippet returns the same lexicon string.

## Dependencies

| Package | Why |
| --- | --- |
| pagebuilderpro | Snippet and form chunks |
| FetchIt | AJAX submit |
| pdoTools | Fenom render |

## See also

- [PageBuilderFormBuilder](PageBuilderFormBuilder)
- [PageBuilderQuiz](PageBuilderQuiz)
- [PageBuilderContactForm](PageBuilderContactForm)
