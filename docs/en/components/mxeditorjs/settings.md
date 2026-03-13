---
title: System settings
---
# System settings

All settings use the prefix `mxeditorjs.` and are in the **mxeditorjs** namespace.

**Where to change:** **Settings → System settings** — filter by namespace `mxeditorjs`.

## Quick reference

| Setting | Purpose | Default |
| --- | --- | --- |
| `mxeditorjs.enabled` | Enable/disable editor | Yes |
| `mxeditorjs.profile` | Tool profile: `default`, `minimal`, `blog`, `full` | default |
| `mxeditorjs.enabled_tools` | Custom tool list (overrides profile) | — |
| `mxeditorjs.image_mediasource` | Media Source ID for image uploads | 1 |
| `mxeditorjs.file_mediasource` | Media Source ID for file attachments (Attaches) | 1 |
| `mxeditorjs.max_upload_size` | Max file size in bytes (5 MB = 5242880) | 5242880 |
| `mxeditorjs.allowed_image_types` | Allowed image extensions | jpg,jpeg,png,gif,webp,svg |
| `mxeditorjs.image_upload_path` | Image upload path template | images/resources/{resource_id}/ |

## Area: main (mxeditorjs)

### mxeditorjs.enabled

Turns the editor on or off. When `false`, the plugin does not load assets or handle save.

| | |
| --- | --- |
| **Type** | combo-boolean |
| **Default** | `true` |

### mxeditorjs.profile

Active tool profile name. Profiles are defined in `mxeditorjs.profiles`.

| | |
| --- | --- |
| **Type** | textfield |
| **Default** | `default` |

**Built-in profiles:**

| Profile | Tools |
| --- | --- |
| `default` | paragraph, header, list, checklist, quote, table, code, raw, embed, image, attaches, delimiter, warning |
| `minimal` | paragraph, header, list, image |
| `blog` | paragraph, header, list, quote, image, embed, delimiter |
| `full` | All tools (same as default) |

### mxeditorjs.enabled_tools

Overrides the profile. If set, this comma-separated list is used and the profile is ignored.

**Example:** `paragraph,header,list,embed,image`

### mxeditorjs.profiles

JSON object with profile definitions. Each profile is an object with a `tools` array. Edited in system settings (textarea).

### mxeditorjs.available_tools

Full list of available block tools. Fallback when profile is empty and `enabled_tools` is not set.

## Area: media (mxeditorjs_media)

### mxeditorjs.image_mediasource / mxeditorjs.file_mediasource

Media Source ID for images and for file attachments (Attaches). Default `1` (default files source).

### mxeditorjs.image_upload_path

Path template inside the Media Source. Placeholder `{resource_id}` is replaced with the resource ID.

Examples: `images/resources/{resource_id}/`, `uploads/images/`, `content/{resource_id}/img/`

### mxeditorjs.allowed_image_types

Allowed image extensions, comma-separated: `jpg,jpeg,png,gif,webp,svg`

### mxeditorjs.max_upload_size

Max upload file size in bytes. Examples: 1048576 (1 MB), 5242880 (5 MB), 10485760 (10 MB).

## Area: presets (mxeditorjs_presets)

### mxeditorjs.image_class_presets

JSON: CSS classes for images. User selects a style in the Image block settings. Format: `{"display_name": "css-class"}`.

### mxeditorjs.link_class_presets / mxeditorjs.link_target_options / mxeditorjs.link_rel_options

JSON settings for link styles and `target` / `rel` attributes.

## Related MODX settings

| Setting | Value for mxEditorJs | Description |
| --- | --- | --- |
| `which_editor` | `mxEditorJs` | RTE choice in manager (required to activate) |
| `use_editor` | `true` | Global visual editor on/off |
| `cultureKey` | `en` / `ru` | UI language; mxEditorJs uses it for localization |

## Tool set priority

1. **mxeditorjs.enabled_tools** (if not empty) — highest priority  
2. Otherwise — tools from **mxeditorjs.profiles**[**mxeditorjs.profile**].tools  
3. Otherwise — **mxeditorjs.available_tools** (fallback)
