---
title: System settings
---
# System settings

Prefix `mxeditorjs.`, namespace **mxeditorjs**.

**Where to change:** **Settings → System settings**, filter by `mxeditorjs`.

## Quick reference

| Setting | Purpose | Default |
| --- | --- | --- |
| `mxeditorjs.enabled` | Enable/disable editor | Yes |
| `mxeditorjs.profile` | Tool profile: `default`, `minimal`, `blog`, `full` | default |
| `mxeditorjs.enabled_tools` | Custom tool list (overrides profile) | — |
| `mxeditorjs.image_mediasource` | Media Source ID for images and gallery | 1 |
| `mxeditorjs.file_mediasource` | Media Source ID for attachments (Attaches) | 1 |
| `mxeditorjs.image_upload_path` | Image upload path (Image, Gallery) | images/resources/{resource_id}/ |
| `mxeditorjs.file_upload_path` | Attachment upload path (Attaches) | files/resources/{resource_id}/ |
| `mxeditorjs.gallery_max_count` | Max images in Gallery block (`0` = no limit) | 0 |
| `mxeditorjs.max_upload_size` | Max file size in bytes (5 MB = 5242880) | 5242880 |
| `mxeditorjs.allowed_image_types` | Allowed image extensions | jpg,jpeg,png,gif,webp,svg |

## Area: main (mxeditorjs)

### mxeditorjs.enabled

When `false`, `OnDocFormPrerender` does not load CSS/JS. `OnBeforeDocFormSave` still writes the sidecar if POST contains `mxeditorjs_json`.

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
| `default` | paragraph, header, list, checklist, quote, table, code, raw, embed, image, gallery, mxgallery, attaches, delimiter, warning |
| `minimal` | paragraph, header, list, image |
| `blog` | paragraph, header, list, quote, image, gallery, mxgallery, embed, delimiter |
| `full` | Same as default, including `gallery` and `mxgallery` |

### mxeditorjs.enabled_tools

If set, this comma-separated list is used and the profile is ignored.

**Example:** `paragraph,header,list,embed,image`

### mxeditorjs.profiles

JSON object with profile definitions. Each profile has a `tools` array.

```json
{
  "default": {
    "tools": ["paragraph", "header", "list", "checklist", "quote", "table",
              "code", "raw", "embed", "image", "gallery", "mxgallery", "attaches", "delimiter", "warning"]
  },
  "blog": {
    "tools": ["paragraph", "header", "list", "quote", "image", "gallery", "mxgallery", "embed", "delimiter"]
  }
}
```

To add a profile: add a key in JSON and set `mxeditorjs.profile` to its name.

### mxeditorjs.available_tools

Whitelist of all package block tools. Fallback when profile `tools` is empty and `enabled_tools` is not set. **Does not enable blocks directly** when a profile is set. See priority below.

Default: `paragraph,header,list,checklist,quote,table,code,raw,embed,image,gallery,mxgallery,attaches,delimiter,warning`

| ID | Description |
| --- | --- |
| `paragraph` | Paragraph |
| `header` | Headings H2–H5 |
| `list` | Bullet or numbered list |
| `checklist` | Checklist |
| `quote` | Quote |
| `table` | Table |
| `code` | Code block |
| `raw` | Raw HTML |
| `embed` | Embed (Paste API, no toolbox button) |
| `image` | Image (package ImageTool) |
| `gallery` | Gallery (fit/slider) |
| `mxgallery` | mxGallery block (toolbox only when mxGallery is installed) |
| `attaches` | File attachment |
| `delimiter` | Delimiter |
| `warning` | Warning |

Inline tools (marker, inline-code, underline, linkAutocomplete) and tunes (alignment, undo) are always on. They are not configured via profiles.

## Area: media (mxeditorjs_media)

### mxeditorjs.image_mediasource / mxeditorjs.file_mediasource

Media Source ID for images and for attachments (Attaches). Default `1`.

### mxeditorjs.image_upload_path

Path template inside Media Source for **images** (Image and Gallery blocks). Placeholder `{resource_id}` is replaced with the resource ID.

Examples: `images/resources/{resource_id}/`, `uploads/images/`, `content/{resource_id}/img/`

### mxeditorjs.file_upload_path

Path template for **attachments** (Attaches block). Independent of `image_upload_path`.

Examples: `files/resources/{resource_id}/`, `uploads/files/`, `content/{resource_id}/attachments/`

### mxeditorjs.gallery_max_count

Max images in one **Gallery** block. `0` = no limit. Upload and Browse use the same source and path as Image.

### mxeditorjs.allowed_image_types

Allowed image extensions, comma-separated: `jpg,jpeg,png,gif,webp,svg`

### mxeditorjs.max_upload_size

Max upload size in bytes. Examples: 1048576 (1 MB), 5242880 (5 MB), 10485760 (10 MB).

## Area: presets (mxeditorjs_presets)

### mxeditorjs.image_class_presets

JSON CSS classes for images. The user selects a style in Image block settings in the manager.

Format: `{"display_name": "css-class"}`

```json
{
  "default": "",
  "full-width": "img-fluid w-100",
  "thumbnail": "img-thumbnail",
  "rounded": "rounded"
}
```

::: warning
Server `HtmlRenderer` and client `renderPreviewHtml` **do not** add the selected preset to `<img>`. The preset is stored in block JSON. For the frontend add custom logic or a custom `image` block renderer.
:::

### mxeditorjs.link_class_presets

```json
{
  "default": "",
  "button-primary": "btn btn-primary",
  "external": "external-link"
}
```

### mxeditorjs.link_target_options / mxeditorjs.link_rel_options

JSON options for link `target` and `rel`. The class from `link_class_presets` is applied to link HTML on render.

## Related MODX settings

| Setting | Value for mxEditorJs | Description |
| --- | --- | --- |
| `which_editor` | `mxEditorJs` | RTE choice in manager (required) |
| `use_editor` | `true` | Global visual editor |
| `which_element_editor` | _(any)_ | Element code editor. **Does not affect** mxEditorJs |
| `cultureKey` | `en` / `ru` | UI language. mxEditorJs inherits it |

## Tool set priority

Implemented by `MxEditorJs\Config\EditorTools`:

1. **mxeditorjs.enabled_tools** (if not empty): highest priority
2. Else **mxeditorjs.profiles**[**mxeditorjs.profile**].tools intersect **mxeditorjs.available_tools**, plus package profile merge on upgrade (e.g. `gallery`, `mxgallery`)
3. Else **mxeditorjs.available_tools**: fallback

On upgrade from versions before 1.1.0, resolver `resolve.settings.php` adds `gallery` and `mxgallery` to `available_tools` and profiles `default`, `full`, `blog` if missing. After upgrade check JSON in `mxeditorjs.profiles` and clear cache.

## Package paths (not in transport)

`mxeditorjs.core_path` and `mxeditorjs.assets_url` are read by the plugin, `bootstrap.php`, and the connector. They are not in `_build/elements/settings.php`. Empty values fall back to `core_path`/`assets_url` + `components/mxeditorjs/`.
