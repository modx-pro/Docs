---
title: FAQ
description: Common msBulkEditor questions — install, permissions, operations, import
---

# FAQ

## General

### Which products does the panel edit?

**MiniShop3** products (`msProduct`) in the **MODX 3** manager. Regular MODX resources (non-products) are not edited here.

## Install and access

### Panel will not open / VueTools warning

1. Install **[VueTools](https://modstore.pro/)** (`modxpro-vue-core`) from ModStore.
2. Clear the MODX cache and hard-reload the manager (Cmd+Shift+R).

### “Presets” or “Import” tabs are missing

You need `msbulkeditor_presets` and `msbulkeditor_import_export`. Without the permission the tab is hidden; a direct URL goes to **Products**.

### `msbulkeditor_auth_permission_denied`

Ask an admin for the required permission (`view` / `edit` / `rollback` / …). See [Settings](settings#permissions).

### `msbulkeditor_auth_modauth_invalid` / `session_required`

Reload the manager page. Sign in again if the session expired.

## Operations

### `msbulkeditor_apply_no_changes`

Preview reported 0 changes. Check operation parameters and selection: values may already match the target.

### `msbulkeditor_expert_limit_exceeded`

Narrow filters or raise `msbulkeditor_expert_limit` (mind RAM and PHP timeout).

### Expert mode is missing

An admin disabled `msbulkeditor_expert_mode`. Enable it in system settings area `msbulkeditor`.

### Inline will not edit a multi-value option / list TV

That is by design. Change those fields with a bulk operation. See [Inline editing](interface/inline-editing).

### Binding wizard opened

Some products lack a TV/option binding to template or category. Complete the wizard or narrow the selection. → [Binding wizard](interface/binding-wizard)

## Import and export

### `msbulkeditor_export_xlsx_unavailable`

OpenSpout is unavailable on the server (package vendor). Export CSV or reinstall the package.

### `msbulkeditor_import_mapping_invalid`

Map an ID column and at least one target field (price, stock, or article).

### Why does import not write TVs and options?

The import tab updates only price, stock, and article. Use a bulk operation on **Products** for TV/option.

## History

### No “Rollback” button

You need `msbulkeditor_rollback`. Rollback works for completed operations. For `failed`, only already applied items roll back.

### History is not cleaned

Enable Scheduler and `msbulkeditor_scheduler_enabled`, or clean tables manually. See [Settings](settings#scheduler).

## Limits

- `msProduct` (MiniShop3) only
- no inline for multi-value options or TV list/checkbox/file
- option `valueKind` in bulk is chosen manually (no auto-detect)
