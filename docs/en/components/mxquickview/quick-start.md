---
title: Quick start
---
# Quick start

Minimal setup to enable `mxQuickView` on a catalog page in 5–10 minutes.

## 1. Install the package

1. Install `mxQuickView` via **Extras → Installer**.
2. Clear MODX cache.
3. Check system settings in namespace `mxquickview`.

## 2. Load initialization in the template

::: code-group

```modx
[[!mxQuickView.initialize]]
```

```fenom
{'!mxQuickView.initialize'|snippet}
```

:::

## 3. Add quick view button

::: code-group

```modx
<button type="button"
  data-mxqv-click
  data-mxqv-mode="modal"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_product"
  data-mxqv-id="[[+id]]"
  data-mxqv-title="[[+pagetitle]]">
  Quick view
</button>
```

```fenom
<button type="button"
  data-mxqv-click
  data-mxqv-mode="modal"
  data-mxqv-action="chunk"
  data-mxqv-element="mxqv_product"
  data-mxqv-id="{$id}"
  data-mxqv-title="{$pagetitle}">
  Quick view
</button>
```

:::

## 4. Check whitelist

- `mxquickview_allowed_chunk` must include `mxqv_product` (or your chunk).
- For quick view of regular resources add `mxqv_resource`.
- For `snippet`/`template` fill `mxquickview_allowed_snippet` and `mxquickview_allowed_template` accordingly.

## 5. Verify

- Clicking the button opens quick view.
- Content is loaded from `assets/components/mxquickview/connector.php`.
- On error the JSON `message` is shown.

## Next steps

- [System settings](settings)
- [Site integration](integration)
- [Render types](types)
- [API and interfaces](api)
