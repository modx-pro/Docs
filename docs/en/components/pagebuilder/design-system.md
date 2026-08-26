---
title: Design system
description: CSS variables, BEM, and Fenom section shell for PageBuilder on the front
---

# Design system (front)

Section styles on the site are separate from PrimeVue in the manager.

## Stylesheets

| File | Purpose |
| --- | --- |
| `pagebuilder-sections.css` | Free sections and primitives |
| `pagebuilder-sections-pro.css` | Pro sections (with capability `pro`) |
| `pagebuilder-commerce.css` | product-card, spotlight, promo |
| `pagebuilder-qa.css` | QA field-matrix (with `&qa_css=1` or `_qa_field_matrix` sections) |

Loaded via snippet when `pagebuilder_load_frontend_css = 1`. Pro and commerce CSS load only with Pro.

## Scope and tokens

Tokens are set on **`.pb-page`**, not `:root`. Override in your theme:

```css
.pb-page {
  --pb-color-accent: #059669;
  --pb-content-max: 60rem;
  --pb-section-gap: 2.5rem;
}
```

| Token | Purpose |
| --- | --- |
| `--pb-section-gap` | Gap between sections |
| `--pb-content-max` | Inner max-width |
| `--pb-space-sm/md/lg/xl` | Spacer rhythm |
| `--pb-radius` | Border radius |
| `--pb-color-text` / `--pb-color-muted` | Text |
| `--pb-color-accent` | Accent, links |
| `--pb-color-surface` | Card background |
| `--pb-color-border` | Borders |
| `--pb-button-bg` / `--pb-button-color` | CTA |
| `--pb-grid-gap` | cards/gallery grids |
| `--pb-video-ratio` | Video embed aspect ratio |
| `--pb-hero-bg` / `--pb-hero-overlay` | Hero background |

## BEM

| Pattern | Example |
| --- | --- |
| Block | `pb-hero`, `pb-faq` |
| Section shell | `pb-section`, `pb-section--hero` |
| Element | `pb-hero__title`, `pb-section__inner` |
| Modifier | `pb-spacer--md`, `pb-hero--center` |
| Common classes | `pb-button`, `pb-heading`, `pb-grid`, `pb-surface` |

Rules:

- Spacer: `pb-spacer pb-spacer--md`.
- Hero background: CSS var `--pb-hero-bg`.
- Button: `pb-hero__button pb-button`.
- Images: partial chunk `pagebuilder_partial_image`.

## Fenom shell

```fenom
<section class="pb-section pb-section--hero pb-hero{if $cssClass} {$cssClass|escape}{/if}"
  data-pb-section="hero"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-hero__inner">
    ...
  </div>
</section>
```

`$cssClass` from `data.cssClass` (event `pbOnBeforeRenderSection`). `$id` is the section id in the document.

Escape text fields with `|escape`. Output HTML from richtext only if you trust editors.

## Related pages

- [Frontend output](frontend)
- [Developer](developer#section-definition)
- [Section catalog](sections/)
