---
title: Quick start
---
# Quick start

Minimal steps to enable mxEditorJs in MODX 3 in about 5 minutes.

## Requirements

| Requirement | Version |
| --- | --- |
| MODX Revolution | 3.0.3+ |
| PHP | 8.2+ |

## Step 1: Installation

1. Install **mxEditorJs** via **Packages → Installer** (upload transport package or use repository).
2. Clear MODX cache.
3. In **Settings → System settings**, confirm settings with prefix `mxeditorjs` exist.

## Step 2: Choose editor

1. **Settings → System settings**
2. Find **which_editor** (or filter by "editor").
3. Set value to **mxEditorJs**.
4. Save.

## Step 3: Enable component

1. In system settings, filter by namespace **mxeditorjs**.
2. Ensure **mxeditorjs.enabled** = **Yes** (on by default).
3. Optionally set **mxeditorjs.profile** (`default`, `minimal`, `blog`, `full`).

## Step 4: Verify

1. Open any resource in the manager (create or edit).
2. The content field should show the Editor.js block editor instead of TinyMCE/CKEditor.
3. Add a block (heading, paragraph, image), save — content is stored in Editor.js format and rendered as HTML on the frontend.

## Step 5: Template Variables (optional)

To use mxEditorJs in a TV:

1. Create or edit a TV of type **Text (multiline)**.
2. In the TV options, enable **Use visual editor** (richtext).
3. With `which_editor` set to **mxEditorJs**, this TV will also use the block editor.

## Next steps

- [System settings](settings) — tool profiles, media, CSS presets
- [Integration](integration) — HTML → Editor.js migration, frontend output
- [API](api) — Connector, PHP classes, data formats
