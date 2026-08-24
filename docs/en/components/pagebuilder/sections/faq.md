---
title: "FAQ"
description: "Question and answer pairs for an on-page FAQ block"
---

# FAQ

A frequently asked questions block. Each row is a question title and answer text. Answers may include richtext HTML.

<!-- ![FAQ](/components/pagebuilder/screenshots/sections/faq.png) -->

## Why this section

- Questions edit as a repeater list, reorder by drag
- Answers can be richtext with links and lists
- One block handles common objections on a landing page

## When to use

- **Support** or knowledge base page
- **Landing page** — objections before the form
- **Product page** — shipping, warranty, care

## Page examples

- Landing: [Hero](hero) → [Features](features) → [FAQ](faq) → [Contact form](contact_form)
- Product: [Rich text](richtext) → [FAQ](faq) → [Related products](related_products)

## Inspector tips

**Questions** repeater: **Question** and **Answer** per row. Row order matches front-end order.

## Similar sections

- [Tabs](tabs) for long copy split into panels
- [Rich text](richtext) for unstructured body text

## Block parameters

| Parameter | Value |
| --- | --- |
| key | `faq` |
| Layer | Free |
| Category | content (`content`) |
| Chunk | `pagebuilder_faq` |
| Requires | — |

## Inspector fields

Fill these fields in the section inspector. Field types are documented in the [field types reference](../fields/types).

### Title (`title`)

Type [text](../fields/text#output-in-section-data). Optional.

### Questions (`items`)

Type [repeater](../fields/repeater#output-in-section-data). Required. Repeatable rows. "Add" button in the inspector.

Each row:

| Field | Type | Label | Required |
| --- | --- | --- | --- |
| `question` | [text](../fields/text#output-in-section-data) | Question | yes |
| `answer` | [richtext](../fields/richtext#output-in-section-data) | Answer | yes |

## Site output

`pb-faq` with a question list. Markup supports accordion via `pagebuilder-sections.js` or a static list in your theme.

## Output in section.data

Example payload after save. Media, video, and map values may be enriched on output:

```json
{
  "title": "Заголовок секции",
  "items": [
    {
      "_rowId": "00000000-0000-4000-8000-000000000001",
      "question": "Как оформить заказ?",
      "answer": "<p>Добавьте товар в корзину и перейдите к оформлению.</p>"
    }
  ]
}
```

## Chunk template

Fenom chunk `pagebuilder_faq`:

```fenom
<section class="pb-section pb-section--faq pb-faq{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="faq"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-faq__inner">
    {if $title}
      <h2 class="pb-heading pb-faq__title">{$title|escape}</h2>
    {/if}
    <div class="pb-faq__list">
      {foreach $items as $item}
        <details class="pb-faq__item">
          <summary class="pb-faq__question">{$item.question|escape}</summary>
          <div class="pb-faq__answer pb-richtext__content">{$item.answer}</div>
        </details>
      {/foreach}
    </div>
  </div>
</section>
```

## JSON definition

`core/components/pagebuilder/sections/faq.json`

## See also

- [Section catalog](index)
- [Fields overview](../fields/overview)
- [Frontend output](../frontend)
