---
title: "How it works"
description: "Steps with title, text, and icon. Pro layer."
---

# How it works

Section `how_it_works` lists steps from a repeater. Chunk: `pagebuilderpro_how_it_works`. Requires PageBuilder Pro.

## Where it fits

- Order or onboarding flow
- Three or four steps under the hero
- A service explanation without dates

## Fields

| Field | Type | Required | Purpose |
| --- | --- | --- | --- |
| `title` | text | no | Section title |
| `intro` | textarea | no | Intro |
| `steps` | repeater | yes | Steps |
| `steps.title` | text | yes | Step title |
| `steps.text` | textarea | no | Text |
| `steps.icon` | image | no | Icon |

## Render

Steps sit in an `<ol>`. The number is the row index plus 1, with `aria-hidden="true"`. Field `icon` is type `image`, not [icon](../fields/icon). The picture goes through `pagebuilder_partial_image`. An empty repeater leaves an empty list. `intro` prints only when set.

## Section data {#output-in-section-data}

```json
{
  "title": "How to order",
  "intro": "Three steps",
  "steps": [
    {
      "title": "Pick",
      "text": "Add a product",
      "icon": { "url": "assets/images/step.png" }
    }
  ]
}
```

## Similar sections

- [Timeline](timeline) when steps have dates
- [Features](features) for items without order

## Related pages

- [Section catalog](index)
