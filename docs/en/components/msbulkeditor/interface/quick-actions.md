---
title: Quick actions
description: Quick bulk operations menu on the Products toolbar
---

# Quick actions

**Quick actions** — dropdown on the Products toolbar with preset bulk operation types. The toolbar button is icon-only (bolt); the label appears in a tooltip.

In code the component is `ComboMenu` (config `comboMenuModel.js`); in the manager UI the label is **Quick actions**.

![Quick actions button and menu items](/components/msbulkeditor/screenshots/combo-menu.png)

---

## How to use

1. Select products **or** enable [expert mode](products-grid#expert-mode).
2. Click **Quick actions** (bolt icon).
3. Pick an item — opens the operation dialog with **pre-filled type** (field type locked).
4. Fill parameters → **Preview** → **Apply**.

The menu is **disabled** when there is no selection and expert mode is off.

**Soft delete**, **clear cache**, and **regenerate URI** show a confirm dialog before apply.

![Confirm: soft delete](/components/msbulkeditor/screenshots/confirm-soft-delete.png)

![Confirm: clear cache](/components/msbulkeditor/screenshots/confirm-clear-cache.png)

![Confirm: regenerate URI](/components/msbulkeditor/screenshots/confirm-regenerate-uri.png)

---

## Menu items

Most-used items appear first:

| Item | `fieldType` | Parameters (brief) |
| --- | --- | --- |
| Change template | `template` | Template ID |
| Change parent | `category` | `mode: change_parent`, parent ID |
| Change vendor | `vendor` | Vendor ID |
| Set text | `text_set` | defaults to field `pagetitle`; changeable in the form |
| Regenerate gallery thumbnails | `gallery_regenerate` | — |
| Clear resource cache | `resource_utility` | `action: clear_cache` |
| Regenerate URI | `resource_utility` | `action: regenerate_uri` |
| Soft delete | `soft_delete` | — |
| Change file source | `source` | Source ID |
| Change content type | `content_type` | Type ID |
| Assign resource group | `resource_group` | Group ID |
| Change dates | `dates` | date field, mode set / clear / offset |
| Change user | `user` | field (createdby, …), user ID |

Order and config: `assets/.../config/comboMenuModel.js`.

### Item screenshots

![Change parent](/components/msbulkeditor/screenshots/combo-change-parent.png)

![Change vendor](/components/msbulkeditor/screenshots/combo-vendor.png)

![Set text](/components/msbulkeditor/screenshots/combo-set-text.png)

![Regenerate gallery thumbnails](/components/msbulkeditor/screenshots/combo-gallery-regenerate.png)

![Clear resource cache](/components/msbulkeditor/screenshots/combo-clear-cache.png)

![Regenerate URI](/components/msbulkeditor/screenshots/combo-regenerate-uri.png)

![Soft delete](/components/msbulkeditor/screenshots/combo-soft-delete.png)

![Change file source](/components/msbulkeditor/screenshots/combo-source.png)

![Change content type](/components/msbulkeditor/screenshots/combo-content-type.png)

![Assign resource group](/components/msbulkeditor/screenshots/combo-resource-group.png)

![Change dates](/components/msbulkeditor/screenshots/combo-dates.png)

![Change user](/components/msbulkeditor/screenshots/combo-user.png)

---

## vs “Run operation”

| | Quick actions | Run operation |
| --- | --- | --- |
| Type selection | Fixed by menu item | Any from Select list |
| Use case | Frequent same-type edits | Arbitrary operation (price, TV, option, …) |

For **price**, **stock**, **TV**, **options** use **Run operation** or a [preset](presets).

---

## Example: change template for a selection

1. Filter products in one category.
2. Expert mode → check the “By filter” count.
3. **Quick actions** → **Change template**.
4. Set the new template ID.
5. Preview → apply.

![Template dialog after quick action](/components/msbulkeditor/screenshots/combo-template-dialog.png)

---

## See also

- [Product and prices](product-and-prices)
- [Presets](presets) — save operation parameters for reuse
