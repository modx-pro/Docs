---
title: MigxPageConfigurator
description: Markup integration and content management
author: shevartv
modstore: https://modstore.pro/packages/utilities/migxpageconfigurator

items: [
  { text: 'Getting started', link: 'setup' },
  { text: 'Working with chunks', link: 'chunks' },
  { text: 'Working with snippets', link: 'snippets' },
  { text: 'Working with forms', link: 'forms' },
  { text: 'Working with contacts', link: 'contacts' },
  { text: 'Working with images', link: 'images' },
  { text: 'Creating and updating elements', link: 'elements' },
  { text: 'Region-specific data', link: 'regions' },
]
---
# MigxPageConfigurator

The component was designed for more flexible content management in the admin: letting non-HTML users reorder blocks, build new templates from existing blocks, and add customization options. During implementation it became clear that the same steps kept repeating: extracting chunks, writing snippet calls, moving content into the manager. So the component was extended to automate those routines. It now works as follows:

1. Put shared HTML into a wrapper file.
2. Split the rest of the HTML into template files.
3. Mark each template file and the wrapper with special attributes (see below).
4. Run a script: `slice_tpl.php` for the wrapper, `mgr_tpl.php` for template files.
5. Optionally use `mgr_elems.php` to create site elements: plugins, snippets, TVs, resources.

Additional features:

* Built-in lazy-load with image cropping.
* Form management from the admin.

## Markup attributes

If you use an IDE, copy `assets/components/migxpageconfigurator/css/mpc.css` to your machine so the IDE can suggest available attributes during markup.

::: danger
All attributes use the prefix data-mpc-
:::

1. `sff` — used with `data-mpc-form` to set preset parameters in the admin.
2. `copy` — used with `data-mpc-section` when this section is a copy of a section from another template; value should be the original section file name.
3. `symbol` — used with `data-mpc-snippet` or `data-mpc-parse` when the call must run at pre-parse stage; values: `{` or `##`; default `##`.
4. `form` — used with `data-mpc-chunk` to replace the chunk with a call to snippet `AjaxFormitLogin`.
5. `preset` — used with `data-mpc-form` or `data-mpc-snippet`; for snippets you can pass preset via `|`; value is the parameter array key; for forms — parameters of snippet `AjaxFormitLogin`.
6. `cond` — used with `data-mpc-item` to output Migx field items by condition; value is a condition using `$i` (iteration index) or `$l` (last iteration); with nested Migx, variables get indices by level; only comparison operators encoded with urlencode() are allowed (phpQuery limitation).
7. `static` — used with `data-mpc-section` when the section is static (same on all pages).
8. `name` — used with `data-mpc-section` or `data-mpc-form` for a human-readable section or form name.
9. `item` — on the HTML element that holds field values for Migx configs; must be inside `data-mpc-field` (index allowed).
10. `unwrap` — used with `data-mpc-chunk` or `data-mpc-item` when the chunk is only the inner content, without the wrapper tag.
11. `section` — on the HTML element that is a content section in the page config.
12. `snippet` — on the element where the snippet call should go; value format: SnippetName|presetName (snippet name as you would call it in Fenom, presetName — key in the parameter array).
13. `chunk` — on the element whose content should be extracted to a chunk; value is path to the chunk relative to the chunks folder from system settings.
14. `include` — used with `data-mpc-chunk` to replace with `{include 'file:path/to/chunk'}`.
15. `parse` — used with `data-mpc-chunk` to replace with `{$_modx->parseChunk('@FILE path/to/chunk', $params)}`; value is a parameter array, e.g. `data-mpc-parse="[$id => 1]"`.
16. `remove` — on the element to remove from output after processing; often `data-mpc-field` or `data-mpc-chunk` for nested chunks.
17. `attr` — for dynamic attributes, e.g. `<input type="checkbox" data-mpc-attr="{$checked}">`.
18. `field` — passes value from template to admin; if the element has href or src (link, frame, image), value is taken from that attribute, otherwise from the element content.

## Rendering

To avoid slowing the server, configs are parsed either when running `mgr_tpl.php` or when saving a resource. Parsing means replacing placeholders with values and snippets with their output. Snippets can run on frontend request or at pre-parse stage.

The second option is not suitable for snippets that must run uncached (e.g. AjaxForm, AjaxFormItLogin, mFilter2). If a snippet must run only when the page is requested, its call in the section file must start with `##` — do not change this. Do not edit section files directly; change the template file instead. The call format is controlled by `data-mpc-symbol`: default (when omitted) is `##`; if set, use `{` or `##` (with space for IDE). For placeholders available only on the frontend, use `##`:

```html
##$placeholder}
```

### Caching

During development you may want changes to apply immediately. Set system setting `mpc_dev_mode` to `Yes`; then each run of `mgr_tpl.php` will clear `elements/parsed` and full site cache. You can also clear cache from the admin header; that clears the component cache too. To clear only the component cache (folder `elements/parsed`) without the admin, run `core/components/migxpageconfigurator/console/clear_cache.php`.

### Basic terms

`template` — set of `sections` for one or more site pages.
`section` — HTML block that is part of a page template, can be reordered, and is made of simpler elements.
`template resource` — resource that is a child of the "Page types" resource and was created by `mgr_tpl`.

## Field description

### Section settings

A `section` has these settings:

* `id` — section ID, unique per page (two identical sections need different ids).
* `section_name` — section name for the manager and as the resource sections array key; must be unique per resource; if it differs from the template resource section name, the section will be duplicated.
* `file_name` — path to the section file (for maintainers; better to edit via template file and script).
* `pt-lg`, `pb-lg`, `pt`, `pb` — spacing between sections (padding); useful when reordering.
* `hide_section` — hide section on the page without removing it.
* `copy_from_origin` — copy data from the original section in a child of "Page types".
* `is_static` — when set, section content is taken from the "Page types" resource (for global sections with the same content on every page).
* `position` — section order. If a resource has a template and a template resource exists, sections from the template resource are shown even when the current resource has none. Example: service pages with 3 sections — description (from resource content), pricing (from section), contact form (static). You may only override the pricing section; use `position` (e.g. `-1`) to reorder (e.g. form first).

### Section content

Full list of fields is in the Migx GUI: edit config `base`. Some fields are Migx configs too; they are listed there. Configs `config`, `contacts`, and `form_list` are not section content.
