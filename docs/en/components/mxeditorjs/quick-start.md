---
title: Quick start
---
# Quick start

How to enable mxEditorJs in MODX 3.

## Requirements

| Requirement | Version |
| --- | --- |
| MODX Revolution | 3.0.3+ |
| PHP | 8.2+ |

## Step 1: Installation

1. Install **mxEditorJs** via **Packages → Installer** (upload a transport package or use the repository).
2. Clear MODX cache.
3. In **Settings → System settings**, confirm settings with prefix `mxeditorjs` exist.

## Step 2: Choose editor

1. **Settings → System settings**
2. Find **which_editor** (or filter by "editor").
3. Set the value to **mxEditorJs**.
4. Save.

## Step 3: Enable component

1. Filter system settings by namespace **mxeditorjs**.
2. **mxeditorjs.enabled** = **Yes** (on by default).
3. Optionally set **mxeditorjs.profile** (`default`, `minimal`, `blog`, `full`).

## Step 4: Verify

1. Open any resource in the manager.
2. The content field should show the Editor.js block editor instead of TinyMCE/CKEditor.
3. Add a block (heading, paragraph, image, or **gallery**) and save. JSON goes to the sidecar, HTML to the site.

## Step 5: Template Variables (optional)

1. Create or edit a TV of type **Text (multiline)**.
2. Enable **Use visual editor** (richtext).
3. With `which_editor` set to **mxEditorJs**, this TV also uses the block editor.

MIGX field: Form Tabs `"inputTVtype": "richtext"`. Handler `migxmxeditorjs` (`OnTVInputRenderList`). The cell has no sidecar.

## Next steps

- [Editor guide](/en/components/mxeditorjs/user-guide): blocks, gallery, embed, shortcuts
- [System settings](/en/components/mxeditorjs/settings): tool profiles, media, CSS presets
- [Integration](/en/components/mxeditorjs/integration): HTML → Editor.js migration, frontend output
- [FAQ](/en/components/mxeditorjs/faq): common questions
