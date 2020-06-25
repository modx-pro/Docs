Frontend Editor is a simple plugin that allows you to edit content without having to log in through the manager interface to do this. It includes TinyMCE 5 for easy editing.

[![](https://file.modx.pro/files/5/c/8/5c8ed6dafbae4a9e2d4457b19787f0f1s.jpg)](https://file.modx.pro/files/5/c/8/5c8ed6dafbae4a9e2d4457b19787f0f1.png)

## Features

- Supported editing of document fields including TV fields.
- Easy image loading without using a resource manager.
- Editing fields by resource ID (useful for creating editable menus, breadcrumbs, etc.)

## Installation

Install the extension. Wrap the fields you want to edit with the tag with attribute `data-frontendeditor="content"`  specify the field name as the attribute value. For example:

```html
<div data-frontendeditor="content">
    [[*content]]
</div>
```

Available values: `content, pagetitle, longtitle, menutitle, description, introtext`

#### Editing TV fields

For editing TV fields as attribute value must be specified `tv-` in front of the field name.

```html
<div data-frontendeditor="tv-myTvField">
    [[*myTvField]]
</div>
```

#### Editor's Choice

For each field, you can specify one of two types of editors: TinyMCE `tinymce` (no need to specify by default) or a simple input field `simple`.

```html
<div data-frontendeditor="tv-myTvField, simple">
    [[*myTvField]]
</div>
```

#### Editing values by resource ID

If you need to edit the fields of another resource, you need to specify its id as the first option. This is especially useful for creating editable menus, breadcrumbs, and other interface elements.

Example of editing of `pagetitle` for a resource with id – `2`

```html
<a href="/index.php?id=2" data-frontendeditor="2, pagetitle, simple">
    [[pdoField?&id=`2`&field=`pagetitle`]]
</a>
```

Example of an editable menu:

```html
[[pdoMenu?
    &parents=`0`
    &tpl=`@INLINE <li><a href="[[+link]]" data-frontendeditor="[[+id]], menutitle, simple">[[+menutitle]]</a>[[+wrapper]]</li>`
]]
```

### Field menutitle

For editable fields menutitle if they are empty special behavior are provided. They are filled with the value from pagetitle, and the result is saved in menutitle. These behavior can be changed, see advanced settings.

## Additional settings

`frontendeditor.tinymce_init_default` - TinyMCE configuration settings. For more details see [TinyMCE 5.0 Documentation][1]

`frontendeditor.upload_path` - image upload directory

`frontendeditor.upload_file_name` - processing the file name, can take the following values:

* empty (by default) - does nothing
* sanitize - removes the characters  $-+!*'(),{}|\\^~[]`<>#%\";/?:@&="
* uniqid - generates a unique name such as 5db365920976f.png

`frontendeditor.menutitle_behavior` - editor behavior for empty menutitle fields. It can take the following values:

* 0 - the editor works with empty menutitle as well as with other fields.
* 1 (default) - Empty menutitle field is substituted with the value from pagetitle and the result is saved in  menutitle.
* 2 - Empty menutitle field is substituted with the value from pagetitle and the result is saved in pagetitle.

## System Requirements

* On those pages where you are going to use the editor, DOCTYPE should be indicated such as: <!DOCTYPE html>
* TinyMCE 5 should [support][2] your browser.

## Screenshots

[![](https://file.modx.pro/files/e/3/4/e3483249078e30ae051b9fd74f09dae5.png)](https://file.modx.pro/files/e/3/4/e3483249078e30ae051b9fd74f09dae5.png)

[![](https://file.modx.pro/files/1/6/1/1617d1d329d68265515338e0d4b9bd08.png)](https://file.modx.pro/files/1/6/1/1617d1d329d68265515338e0d4b9bd08.png)

[![](https://file.modx.pro/files/7/4/a/74a888cbb8f1635033b868120a366850.png)](https://file.modx.pro/files/7/4/a/74a888cbb8f1635033b868120a366850.png)

[1]: https://www.tiny.cloud/docs/
[2]: https://www.tiny.cloud/docs/general-configuration-guide/system-requirements
