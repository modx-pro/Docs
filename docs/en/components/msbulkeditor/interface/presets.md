---
title: Presets
description: Save and rerun JSON operations
---

# Presets

Save bulk operation parameters under a name for reuse.

![Presets tab](/components/msbulkeditor/screenshots/presets-tab.png)

![Preset JSON form](/components/msbulkeditor/screenshots/presets-form.png)

---

## Presets tab

An InfoBanner at the top explains: after save, use **Apply** or the toolbar menu.

| Element | Action |
| --- | --- |
| **Name** | Unique preset name |
| **Preset JSON** | Payload as in `products/preview` / `apply` |
| **Save** | Create or update by name |
| **New** | Clear the form |
| **Edit** / **Load** | Put JSON and name into the form |
| **Apply** | Open the operation dialog on Products |
| **Delete** | Confirm → toast |

![Confirm: delete preset](/components/msbulkeditor/screenshots/confirm-preset-delete.png)

Empty list: empty state “No presets yet”.

Permission: **`msbulkeditor_presets`**. Without it the tab is hidden. Global presets (`is_global`) show a badge; only editable rows can be deleted.

### Rename

1. **Load** the preset into the form.
2. Change **Name** (not the JSON).
3. **Save** — UI creates the new name and deletes the old (`presets/delete` after save).

Form banner: “Renaming preset … After save the old name will be removed”.

---

## JSON format

Minimal example (10% discount):

```json
{
  "fieldType": "price",
  "parameters": {
    "field": "price",
    "mode": "percent",
    "sign": "-",
    "value": 10,
    "rounding": "integer",
    "transferToOldPrice": true,
    "variantScope": "product_only"
  }
}
```

Structure matches the preview/apply body **without selection**: launch uses the current Products selection.

How to build JSON:

1. Start from the example above or a list payload (`<pre>`).
2. Set `fieldType` and `parameters` from the [fieldType reference](flows#fieldtype-reference) / [API](../events).
3. The operation dialog has no “Copy JSON” button.

Invalid JSON on save or apply → error toast.

---

## Quick launch from toolbar

On **Products** → **Presets** menu (PresetMenu):

| Menu state | Behavior |
| --- | --- |
| Loading | “Loading…” item |
| Empty list | “No presets” item |
| Has runnable | Preset names; click → operation dialog |

Requires selected products or expert mode (otherwise the menu button is disabled).

![Presets menu on toolbar](/components/msbulkeditor/screenshots/preset-menu.png)

---

## Workflow

1. Configure the operation on Products, verify preview.
2. Build preset JSON.
3. Save as “Discount −10% + old_price”.
4. Later: filter → select → **Apply** in the list or from the toolbar menu.

A TV/option preset runs through the [binding wizard](binding-wizard).

---

## Storage

Table **`msbe_presets`**, site-wide (not per-user). CRUD requires the presets permission.

---

## See also

- [Quick actions](quick-actions)
- [Preview and apply](preview-and-apply)
