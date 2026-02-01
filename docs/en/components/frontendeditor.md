---
title: Frontend Editor
description: Edit content without opening the Manager
logo: https://modstore.pro/assets/extras/frontendeditor/logo-lg.png
author: apnix
modstore: https://modstore.pro/packages/content/frontendeditor
modx: https://extras.modx.com/package/frontendeditor
repository: https://github.com/apnix/frontendeditor
---
# Frontend Editor

Frontend Editor is a plugin that lets you edit content without opening the Manager. It includes TinyMCE 5 for editing.

![Frontend Editor](https://file.modx.pro/files/5/c/8/5c8ed6dafbae4a9e2d4457b19787f0f1.png)

## Features

- Edit document fields including TV fields.
- Simple image upload without the resource manager.
- Edit fields by resource ID (useful for editable menus, breadcrumbs, etc.)

## Installation and usage

Install the extra. Wrap fields you want to edit in an element with `data-frontendeditor` and the field name as the value:

```modx
<div data-frontendeditor="content">
  [[*content]]
</div>
```

Allowed values: `content, pagetitle, longtitle, menutitle, description, introtext`

### Editing TV fields

Use `tv-` plus the TV name:

```modx
<div data-frontendeditor="tv-myTvField">
  [[*myTvField]]
</div>
```

### Editor type

For each field you can use TinyMCE `tinymce` (default) or a simple input `simple`:

```modx
<div data-frontendeditor="tv-myTvField, simple">
  [[*myTvField]]
</div>
```

### Editing by resource ID

To edit another resource's fields, pass its id as the first option. Useful for editable menus, breadcrumbs, etc.

Example: edit `pagetitle` for resource id 2:

```modx
<a href="/index.php?id=2" data-frontendeditor="2, pagetitle, simple">
  [[pdoField? &id=`2` &field=`pagetitle`]]
</a>
```

Editable menu example:

```modx
[[pdoMenu?
  &parents=`0`
  &tpl=`@INLINE <li><a href="[[+link]]" data-frontendeditor="[[+id]], menutitle, simple">[[+menutitle]]</a>[[+wrapper]]</li>`
]]
```

### menutitle field

For empty menutitle fields, the editor shows pagetitle and saves to menutitle. This can be changed; see extra settings.

## Extra settings

- **frontendeditor.tinymce_init_default** — TinyMCE config; see [TinyMCE 5 docs](https://www.tiny.cloud/docs/).
- **frontendeditor.upload_path** — Image upload directory.
- **frontendeditor.upload_file_name** — File name handling: empty (default), sanitize, or uniqid.
- **frontendeditor.menutitle_behavior** — For empty menutitle: 0 = normal, 1 (default) = show pagetitle / save to menutitle, 2 = show and save pagetitle.

## Requirements

- Pages using the editor must have a DOCTYPE such as `<!DOCTYPE html>`.
- TinyMCE 5 must [support](https://www.tiny.cloud/docs/general-configuration-guide/system-requirements) your browser.

## Screenshots

![Screenshot 1](https://file.modx.pro/files/1/6/1/1617d1d329d68265515338e0d4b9bd08.png)

![Screenshot 2](https://file.modx.pro/files/e/3/4/e3483249078e30ae051b9fd74f09dae5.png)

![Screenshot 3](https://file.modx.pro/files/7/4/a/74a888cbb8f1635033b868120a366850.png)
