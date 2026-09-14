---
title: "Quiz"
description: "Multi-step quiz with lead, pricing, and survey modes. FetchIt. Pro layer."
---

# Quiz

Multi-step quiz: answers, contacts, optional price calculation, email notification. Do not call `PageBuilderQuiz` from the template: FetchIt invokes it from the section chunk.

<!-- ![Quiz](/components/pagebuilder/screenshots/sections/quiz.png) -->

::: info
Requires PageBuilder Pro and **FetchIt**.
:::

## Why a quiz

- Collect leads step by step without a separate quiz builder
- `pricing` mode with live total and `price_delta` on options
- `survey` mode without contact step by default

## Prerequisites

1. **pagebuilderpro** transport and capability `pro`.
2. **FetchIt** extra. Without it the section shows "Form temporarily unavailable. Install FetchIt."
3. Recipient: **Notify email** on the section or system setting `emailsender`.

## Add the section

1. Resource → **Sections** tab → **Add section**.
2. In the catalog open **Quiz** (category conversion).
3. Or **Examples** tab → preset **Quiz: kitchen estimate** (`quiz-kitchen`): mode `pricing`, three steps, contacts, `quiz_key` = `kitchen`.

After inserting a preset you can edit fields. **Examples** tab is visible when `pagebuilder_catalog_examples_enabled` is on.

## Typical pages

- Kitchen landing: [Hero](hero) → [Features](features) → [Quiz](quiz) → [FAQ](faq)
- Services: [Pricing](pricing_table) → [Quiz](quiz) → [Contact form](contact_form)

## Similar sections

- [Contact form](contact_form) for a single form without steps
- [CTA](cta) with a link instead of collecting answers

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `quiz` |
| Layer | Pro |
| Category | conversion (`conversion`) |
| Chunk | `pagebuilderpro_quiz` |
| Requirements | pro, FetchIt |

## Editor fields

### Mode (`mode`)

Type [select](../fields/select#section-data-output). `lead`: steps and contact. `pricing`: same plus total. `survey`: steps, contact off by default. Unknown value is treated as `lead` by the handler.

### Cover

| Field | Type | Purpose |
| --- | --- | --- |
| `title`, `intro` | text / textarea | Cover |
| `cover_image` | image | Optional |
| `start_as_panel` | yesno | Cover as first wizard panel with Start button |
| `start_label` | text | Start button text on cover |
| `base_price`, `currency_suffix` | number / text | Only when `mode = pricing` |

### Steps (`steps`)

Type [repeater](../fields/repeater#section-data-output). Required.

| Field | Rule |
| --- | --- |
| `title` | Required |
| `type` | `single` (radio), `multi` (checkbox), `text`, `info` |
| `required` | Empty required step blocks Next and submit. Ignored for `info` |
| `options` | For `single` / `multi`: `label`, `image`, `price_delta` (counts toward total only in `pricing`) |

POST: `answer[stepIndex]` or `answer[stepIndex][]`. Option indices go in POST. Labels appear in the email.

### Contact

| Field | Rule |
| --- | --- |
| `contact_enabled` | If unset: on for `lead`/`pricing`, off for `survey` |
| `contact_fields` | Same as `contact_form`: `name`, `label`, `type`, `required`. Field name: `[a-z][a-z0-9_]*` |
| `consent_text` | Consent paragraph under fields (no checkbox) |
| `success_message`, `redirect_url` | After success. Redirect after 800 ms |
| `quiz_key` | Required. POST `pb_quiz_key`. Keys unique on the page |
| `notify_email` | Recipient. Empty → `emailsender` |

Visitor answers are not written to `published_json`. Section JSON holds schema only.

### Labels

`submit_label`, `prev_label`, `next_label`, `contact_title`, `total_label` override lexicon `pagebuilder:frontend`.

## Save and test

1. **Save** MODX resource publishes `published_json`. Handler reads published when `publishedRevision > 0`, otherwise draft.
2. Template should already have `[[!PageBuilder]]`.
3. On frontend: steps, progress, live total in `pricing`, contact and **Submit**.

## What the visitor sees

Section `pb-quiz` with wizard panels. AJAX via FetchIt → [PageBuilderQuiz](../snippets/PageBuilderQuiz).

## Email

Subject: `PageBuilder quiz ({quiz_key})`. Body: key, mode, pagetitle, answers, in `pricing` an Estimate line, contacts. Total: `base_price` + `price_delta` of selected options.

## Fallback

| State | UI |
| --- | --- |
| FetchIt not installed | Form unavailability message |
| Honeypot | Silent success without email |
| Validation error | FetchIt error + jump to panel with error |
| No section with `quiz_key` | `pagebuilder_fe_quiz_not_found` |

## JSON definition

`PageBuilderPro/core/components/pagebuilderpro/sections/quiz.json`

Preset: `.../sections/presets/quiz-kitchen.json`

## Related pages

- [Contact form](contact_form)
- [PageBuilderQuiz snippet](../snippets/PageBuilderQuiz)
- [Section catalog](index)
- [PageBuilder Pro](../pro)
