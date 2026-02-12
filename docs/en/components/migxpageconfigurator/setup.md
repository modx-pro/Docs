# Getting started

## Component purpose

The component is for faster markup integration and more flexible site content management.

## Minimum requirements

- MigxPageConfigurator works with MODX 2 only.
- PHP 7.0 minimum
- Recommended: PHP 7.4
- PHP ^8.0: stability not guaranteed

## Dependencies

MigxPageConfigurator uses:

- pdoTools 2.#.# or higher
- pThumb 2.#.# or higher
- MIGX 2.#.# or higher
- AjaxFormItLogin 1.0.6 or higher

::: warning
If you did not install from the modstore repo, add the modstore repository to package providers before installing, otherwise **AjaxFormItLogin** will not be installed automatically.
:::

## Fenom template engine

::: warning Required
For correct operation you must use the [Fenom template engine](/en/components/pdotools/parser#shablonizator-fenom) from pdoTools for your templates and chunks. Set system setting `pdotools_fenom_parser` to `Yes`.
:::

## Where to start

Start by reviewing available fields: open the Migx GUI in the admin and check the configs. The default set is meant to be generic; you can add your own. Also check the available placeholders.

## Basic usage

Example: main page setup.

- Copy all from `core/components/migxpageconfigurator/examples/pages/` to `core/elements/pages/`
- Copy all from `core/components/migxpageconfigurator/examples/templates/` to `core/elements/templates/`
- If you work locally and the site is on a server, download `assets/components/migxpageconfigurator/css/mpc.css` for attribute hints in the IDE.
- Add your scripts and styles to `core/elements/templates/wrapper.tpl` (upload them first).
- Copy the main page markup into `core/elements/templates/index.tpl`
- At the top of that file add template data and default resource title:

```html
<!--##{"templatename":"Main","pagetitle":"Main Page","icon":"icon-home"}##-->
```

The comment format `<!--## ##-->` must stay as is; the content is parsed with regex and must be valid JSON.

- Mark up the template. Set section name with `data-mpc-name` and section config with `data-mpc-section`.
- Map fields inside the section. Example: a slider with pagination and arrows. One slide has: image, title, text, link, link text.

Use the bundled config `list_triple_img`: add `data-mpc-field="list_triple_img"` to the carousel inner block.
Mark each slide as a list item with `data-mpc-item` (no value). Markup is taken from the first item; content is filled in the admin from all slides.
Mark fields from `list_triple_img` with `data-mpc-field-1` (first nesting level). For nested Migx lists use `data-mpc-item-1`, then `data-mpc-field-2`, etc. Make the first slide active (e.g. class `active`).

Pagination for the slider you add yourself.

When markup is done, run in the terminal:

```sh
php -d display_errors -d error_reporting=E_ALL public_html/core/components/migxpageconfigurator/console/mgr_tpl.php web index.tpl 1
```

Parameters: `php` — interpreter; `-d display_errors -d error_reporting=E_ALL` — show PHP errors; then path to the script; then: `web` — context, `index.tpl` — template file name, `1` — write content from file to the manager. After the run, `core/elements/sections/` should contain a section file (e.g. `big_slider.tpl`). In the admin, a resource is created with title "Main Page" and template "Main". If nothing appears and there are no terminal errors, check the MODX error log.

The package also includes `slice_tpl.php`. Unlike `mgr_tpl.php`, it does not create a template or resource in the admin; it only creates the section file. Use it for the wrapper section (head, header, footer, etc.).

**mgr_tpl.php** takes 3 space-separated parameters: context, template file name, update content (1/0). The last one controls whether file content is written to the manager.
**slice_tpl.php** takes 2 parameters: context, template file name.
