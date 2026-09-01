---
title: Design system
description: CSS variables, BEM, partial chunks, and Fenom section shell for PageBuilder on the front
---

# Design system (front)

Section styles on the site are separate from PrimeVue in the manager. Chunks render markup with the `pb-` prefix, and `pagebuilder-sections.css` sets layout, typography, and tokens inside `.pb-page`.

## Loading CSS and JS

The [PageBuilder](snippets/PageBuilder) snippet calls `pbRegisterFrontendAssets()` when `pagebuilder_load_frontend_css = 1` (or `&load_css=`1``). Files are registered via `regClientCSS` with a `?v=` asset version query.

| Parameter / setting | Default | Effect |
| --- | --- | --- |
| `pagebuilder_load_frontend_css` | `1` | Enables snippet CSS globally |
| `load_css` | from setting | Overrides loading on a single call |
| `wrap_page` | same as `load_css` | Wraps HTML in `<div class="pb-page">` |

Disable styles on one page: `[[!PageBuilder? &load_css=`0`]]`. Keep the wrapper with `&wrap_page=`1`` and `load_css=0` if you set tokens yourself.

`pagebuilder-sections.js` loads with CSS when the file is shipped with the extra. It initializes carousels (`data-pb-carousel`) and tabs (`data-pb-tabs`) inside `.pb-page`.

See [Frontend output](frontend) and [PageBuilder → Parameters](snippets/PageBuilder#parameters).

## Stylesheets

Path from the site root: `assets/components/pagebuilder/css/`.

| File | When it loads |
| --- | --- |
| `pagebuilder-sections.css` | Always when `load_css=1` |
| `pagebuilder-sections-pro.css` | With capability `pro` |
| `pagebuilder-commerce.css` | With capability `pro` (product-card, spotlight, promo) |

Pro and commerce CSS are not loaded on a Free build, even if the section chunk lives in the theme.

## `.pb-page` wrapper

Tokens are set on **`.pb-page`**, not `:root`. The global site theme stays untouched; sections get their own vertical rhythm.

Direct siblings inside `.pb-page` are spaced with:

```css
.pb-page > * + * {
  margin-top: var(--pb-section-gap);
}
```

The inner container is `.pb-section__inner` with `max-width: var(--pb-content-max)` and horizontal padding `var(--pb-space-inline)`.

## CSS tokens

Defaults from `pagebuilder-sections.css`. Override them in your theme on the same `.pb-page` selector.

| Token | Default | Purpose |
| --- | --- | --- |
| `--pb-section-gap` | `4rem` | Gap between sections |
| `--pb-content-max` | `72rem` | Inner max-width |
| `--pb-space-sm` | `1rem` | Spacer `--sm` |
| `--pb-space-md` | `2rem` | Spacer `--md` |
| `--pb-space-lg` | `4rem` | Spacer `--lg` |
| `--pb-space-xl` | `6rem` | Spacer `--xl` |
| `--pb-space-inline` | `var(--pb-space-sm)` | `.pb-section__inner` padding |
| `--pb-radius` | `0.5rem` | Border radius |
| `--pb-color-text` | `inherit` | Body text |
| `--pb-color-muted` | `color-mix(...)` | Secondary text |
| `--pb-color-accent` | `#2563eb` | Accent, prose links |
| `--pb-color-surface` | `#fff` | Card background |
| `--pb-color-ink` | `#0f172a` | Dark text on light |
| `--pb-color-border` | `color-mix(...)` | Borders |
| `--pb-color-on-accent` | `#fff` | Text on accent |
| `--pb-color-danger` | `#dc2626` | Form errors |
| `--pb-color-danger-bg` | `#fef2f2` | Error background |
| `--pb-color-danger-text` | `#991b1b` | Error text |
| `--pb-color-success-bg` | `#ecfdf5` | Success background |
| `--pb-color-success-text` | `#065f46` | Success text |
| `--pb-shadow-card` | two-layer shadow | Cards, `.pb-surface` |
| `--pb-button-bg` | `var(--pb-color-accent)` | CTA background |
| `--pb-button-color` | `var(--pb-color-on-accent)` | CTA text |
| `--pb-grid-gap` | `1.5rem` | cards, gallery, stats grids |
| `--pb-gallery-columns` | `3` | Gallery columns on wide screens |
| `--pb-stats-columns` | `4` | Stats columns |
| `--pb-hero-overlay` | `rgb(0 0 0 / 45%)` | Hero overlay |
| `--pb-avatar-size` | `3rem` | Testimonial avatars |
| `--pb-prose-link` | `var(--pb-color-accent)` | Richtext links |
| `--pb-video-ratio` | `16 / 9` (Pro CSS) | Video embed |

`--pb-hero-bg` is set inline on the section (background URL), not on `.pb-page`.

### Theme example

```css
.pb-page {
  --pb-color-accent: #059669;
  --pb-content-max: 60rem;
  --pb-section-gap: 2.5rem;
  --pb-space-inline: 1.25rem;
}
```

## BEM

Block prefix: `pb-`. Block name matches the section key (`hero` → `pb-hero`).

| Level | Pattern | Example |
| --- | --- | --- |
| Block | `pb-{key}` | `pb-hero`, `pb-faq` |
| Section shell | `pb-section`, `pb-section--{key}` | `pb-section--cta` |
| Element | `pb-{block}__*` | `pb-hero__title`, `pb-section__inner` |
| Modifier | `pb-{block}--*` | `pb-hero--center`, `pb-spacer--md` |

On the section root:

- `class="pb-section pb-section--hero pb-hero …"`
- `data-pb-section="hero"` for debugging and styles
- `id="pb-{id}"` when the document section has an id

Shared primitives from base CSS:

| Class | Purpose |
| --- | --- |
| `pb-button`, `pb-button--sm` | CTA and link buttons |
| `pb-heading` | Section title |
| `pb-grid`, `pb-grid--cards` | CSS Grid |
| `pb-surface` | Card with shadow |
| `pb-spacer`, `pb-spacer--md` | Vertical gap inside a section |
| `pb-listing`, `pb-listing__grid` | Catalog wrappers (Pro commerce) |
| `pb-carousel`, `pb-tabs` | Interactive (Pro + JS) |

Spacer: two classes `pb-spacer pb-spacer--md`, not `pb-spacer-md`.

Hero button: `pb-hero__button pb-button`. Hero background: CSS var `--pb-hero-bg`, not a bare inline `background-image` without the variable.

## Fenom section shell

Stock hero chunk (simplified):

```fenom
{var $heroBg = is_array($background) ? ($background.url ?: '') : ($background ?: '')}
<section class="pb-section pb-section--hero pb-hero{if $alignment == 'center'} pb-hero--center{/if}{if $cssClass} {$cssClass|escape}{/if}"
  data-pb-section="hero"{if $id} id="pb-{$id|escape}"{/if}{if $heroBg} style="--pb-hero-bg: url('{$heroBg|escape}')"{/if}>
  <div class="pb-section__inner pb-hero__inner">
    <h1 class="pb-hero__title">{$title|escape}</h1>
    ...
  </div>
</section>
```

Chunk variables:

- `$cssClass` from `data.cssClass` (event `pbOnBeforeRenderSection`)
- `$id` is the section id in the document JSON
- section fields by `name` from JSON (`$title`, `$background`, …)

Build custom sections the same way. Checklist: [Developer → Section definition](developer#section-definition).

## Partial `pagebuilder_partial_image`

Shared chunk for `<img>` in gallery, testimonials, image, and Pro sections:

```fenom
{include 'pagebuilder_partial_image' image=$item.image alt=$item.alt class='pb-gallery__media'}
```

| Parameter | Description |
| --- | --- |
| `image` | URL string or image field array (`url`) |
| `alt` | Alt text |
| `class` | CSS class on `<img>` |
| `loading` | Default `lazy` |

The partial renders nothing when the URL is empty.

## Escape and links

| Field type | Fenom |
| --- | --- |
| text, textarea | `\|escape` |
| url in href | `\|pb_href\|escape` (MODX link normalization) |
| richtext, editorjs | Editor HTML with no front-end sanitize |

Output rich text only if you trust editors who can save the resource. Escape everything else.

## Extra class via event

In `pbOnBeforeRenderSection` you can append `data.cssClass` before the chunk runs:

```php
case 'pbOnBeforeRenderSection':
    $pipeline = $scriptProperties['pipeline'] ?? null;
    if ($pipeline instanceof \PageBuilder\Section\SectionRenderPipeline) {
        $sections = $pipeline->sections();
        if (isset($sections[0])) {
            $sections[0]['data']['cssClass'] = trim(($sections[0]['data']['cssClass'] ?? '') . ' is-promo');
            $pipeline->replaceSection(0, $sections[0]);
        }
    }
    break;
```

The event runs only on HTML cache miss (`use_cache=0` for debugging). See [Manager and events](integration).

## Front-end interactivity

Dependency-free `pagebuilder-sections.js`:

| Marker | Behavior |
| --- | --- |
| `[data-pb-carousel]` | Scroll `.pb-carousel__track`, dots, autoplay with `data-pb-autoplay="1"` |
| `[data-pb-tabs]` | Panel switch, URL hash via `data-pb-anchor` |

Respects `prefers-reduced-motion: reduce` (autoplay and smooth scroll off).

## Commerce styles (Pro)

`pagebuilder-commerce.css` styles product cards and storefront blocks: `.pb-product-card`, `.pb-product-spotlight`, promo banners. Listing sections often add `pb-listing` next to the block (`pb-products-grid pb-listing`).

Same tokens as `.pb-page`. Recolor commerce via `--pb-color-accent`, `--pb-color-surface`, `--pb-shadow-card`.

## Anchors and sticky header

Sections with `id="pb-…"` and listing product cards use `scroll-margin-top: 5.5rem` so a sticky site header does not cover the anchor target.

## Spacer migration

Class `pb-spacer-md` was replaced with `pb-spacer--md`. After upgrade, check custom theme CSS and your own chunks.

## Related pages

- [Frontend output](frontend)
- [PageBuilder snippet](snippets/PageBuilder)
- [Developer](developer#section-definition)
- [Section catalog](sections/)
