---
title: Render types
---
# mxQuickView render types

## General rules

1. Always pass a valid `data-mxqv-id` (the resource must exist and be viewable).
2. `data-mxqv-action` defines what to render: `chunk`, `snippet`, or `template`.
3. `data-mxqv-mode` defines where to output: `modal` or `selector`.
4. The connector accepts only `POST` and only `action=render`.

## Choice matrix

| Task | `data-mxqv-action` | `data-mxqv-mode` |
| --- | --- | --- |
| Product card | `chunk` | `modal` |
| Cart / mini-cart | `snippet` | `modal` |
| Quick view in a custom block | `chunk` or `snippet` | `selector` |
| Resource template render | `template` | `modal` or `selector` |

## 1. `chunk`

### For manager

The basic, safest case: a dedicated card chunk (e.g. `mxqv_product`).

### For developer

- Checked against `mxquickview_allowed_chunk`.
- Render: `$modx->getChunk($name, $props)`.
- `$props` includes resource fields, `msProductData`, `variants_*` (`has_variants=true|false`, `variants_html`, `variants_json`).

### Example

::: code-group

```modx
<button data-mxqv-click data-mxqv-mode="modal"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_product"
  data-mxqv-id="[[+id]]"
  data-mxqv-title="[[+pagetitle]]">
  mxQuickView
</button>
```

```fenom
<button data-mxqv-click data-mxqv-mode="modal"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_product"
  data-mxqv-id="{$id}"
  data-mxqv-title="{$pagetitle}">
  mxQuickView
</button>
```

:::

## 2. `snippet`

### For manager

Use for elements already built by a snippet (e.g. `msCart`).

### For developer

- Checked against `mxquickview_allowed_snippet`.
- Render: `$modx->runSnippet($name, $props)`.
- Resource fields are passed as snippet parameters; for `msCart`, `id` is removed and `resource_id` is set.
- The snippet name in `data-mxqv-element` may start with `!` (stripped in the processor).
- POST fields `mode`, `output`, `modal_library` apply only to `msCart` render (cart selector), not `template`.

### Example

::: code-group

```modx
<button data-mxqv-click data-mxqv-mode="modal"
  data-mxqv-action="snippet"
  data-mxqv-element="msCart"
  data-mxqv-id="[[+id]]"
  data-mxqv-title="[[+pagetitle]]">
  Cart
</button>
```

```fenom
<button data-mxqv-click data-mxqv-mode="modal"
  data-mxqv-action="snippet"
  data-mxqv-element="msCart"
  data-mxqv-id="{$id}"
  data-mxqv-title="{$pagetitle}">
  Cart
</button>
```

:::

## 3. `template`

### For manager

Used less often: when the resource should be rendered with a full template.

### For developer

- Always checked against `mxquickview_allowed_template`.
- Empty `mxquickview_allowed_template` means `template` render is disabled.
- `element` accepts a template ID or `templatename`.
- Render: the resource `template` is swapped temporarily, then `$resource->process()` runs with the template from `data-mxqv-element` (not necessarily the resource’s default template in the manager).

### Example

::: code-group

```modx
<button data-mxqv-click data-mxqv-mode="modal"
  data-mxqv-action="template"
  data-mxqv-element="12"
  data-mxqv-id="[[+id]]"
  data-mxqv-title="[[+pagetitle]]">
  Template
</button>
```

```fenom
<button data-mxqv-click data-mxqv-mode="modal"
  data-mxqv-action="template"
  data-mxqv-element="12"
  data-mxqv-id="{$id}"
  data-mxqv-title="{$pagetitle}">
  Template
</button>
```

:::

## Output modes

### `modal`

- Uses the mode from `modalLibrary` (`native`, `bootstrap`, `fancybox`) in `mxQuickView.initialize`.
- Supports a title (`data-mxqv-title`).
- Prev/next buttons and ←/→ keys work only with `modalLibrary` `native` or `bootstrap`. Fancybox has no loop navigation.

### `selector`

- Inserts the response into the container from `data-mxqv-output`.
- Use this when the site already has its own modal or a dedicated output area.
