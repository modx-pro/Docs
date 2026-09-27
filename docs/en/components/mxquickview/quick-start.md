---
title: Quick start
---
# Quick start

Enable `mxQuickView` on a catalog page.

## 1. Install the package

1. Install `mxQuickView` via **Extras → Installer**.
2. Clear the MODX cache.
3. Check system settings in namespace `mxquickview` (whitelist; for Fenom chunks — pdoTools 3.x).

## 2. Load initialization in the template

::: code-group

```modx
[[!mxQuickView.initialize]]
```

```fenom
{'!mxQuickView.initialize'|snippet}
```

:::

## 3. Add a quick view button

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

## 4. Check the whitelist

- `mxquickview_allowed_chunk` must include `mxqv_product` (or your chunk).
- For regular resources add `mxqv_resource`.
- For `snippet`/`template` fill `mxquickview_allowed_snippet` and `mxquickview_allowed_template`.

## 5. Verify

- Clicking the button opens quick view.
- Content is loaded from `assets/components/mxquickview/connector.php`.
- On error the JSON `message` is shown.

## Next steps

- [System settings](/en/components/mxquickview/settings)
- [Site integration](/en/components/mxquickview/integration)
- [Render types](/en/components/mxquickview/types)
- [API and interfaces](/en/components/mxquickview/api)
