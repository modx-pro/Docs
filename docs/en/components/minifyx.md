---
title: MinifyX
description: Automated minification of site scripts and styles
logo: https://modstore.pro/assets/extras/minifyx/logo-lg.jpg
author: sergant210
modstore: https://modstore.pro/packages/utilities/minifyx
modx: https://extras.modx.com/package/minifyx
repository: https://github.com/modx-pro/MinifyX
---
# MinifyX

Automated minification and caching of site scripts and styles.

## Parameters

| Name | Description |
|------|-------------|
| **&cssFilename** | Prefix or full name of the compiled CSS file. Default prefix is «styles». |
| **&cssGroups** | Style group names (comma-separated). |
| **&cssPlaceholder** | CSS placeholder name. Used when ``&registerCss=`placeholder` ``. Default «MinifyX.css». |
| **&cssSources** | List of CSS files to process. You can specify «\*.css», «\*.less» and «\*.scss». |
| **&cssTpl** | Template for the compiled styles file. Must include placeholder `[[+file]]`. Default `<link rel="stylesheet" href="[[+file]]">`. |
| **&forceUpdate** | Disable file change detection and regenerate scripts and styles every time. |
| **&hooks** | Comma-separated list of hooks for post-processing. Specify snippet name or file with extension. |
| **&jsFilename** | Prefix or full name of the compiled JS file. Default prefix is «scripts». |
| **&jsGroups** | Script group names (comma-separated). |
| **&jsPlaceholder** | JavaScript placeholder name. Used when ``&registerJs=`placeholder` ``. Default «MinifyX.javascript». |
| **&jsSources** | List of JS files to process. You can specify «\*.js» and «\*.coffee». |
| **&jsTpl** | Template for the compiled scripts file. Must include placeholder `[[+file]]`. Default `<script type="text/javascript" src="[[+file]]"></script>`. |
| **&minifyCss** | Enable CSS minification. Default off. |
| **&minifyJs** | Enable JS minification. Default off. |
| **&preHooks** | Comma-separated list of hooks for pre-processing. Specify snippet name or file with extension. |
| **&registerCss** | CSS registration: «placeholder» — save to placeholder, «default» — include in <head\>, «print» — output at snippet call. Default «placeholder». |
| **&registerJs** | JavaScript registration: «placeholder» — save to placeholder, «startup» — include in <head\>, «default» — before closing <body\>, «print» — output at snippet call. Default «placeholder». |

## Cache

While the component runs, all output files are cached to the directory set in system setting `minifyx_cacheFolder`. By default it is in the component's assets directory.

If you use a custom directory, be careful — MinifyX will delete all files in it. **Always use a separate empty directory for output files**!

## Groups

Script and style files can be grouped. Groups are defined in *core/components/minifyx/config/groups.php*.

## Hooks

Hooks are snippets or files that run during file processing. File hooks must be in *core/components/minifyx/hooks*.

There are 2 hook types — pre-processing and post-processing. They are set in parameters «preHooks» and «hooks» respectively. Pre-hooks can add groups and files. Post-hooks can change the cache file name and content (e.g. parse MODX placeholders).

The **$MinifyX** object is available in hooks, with methods to add groups and files and other helpers.

### Pre-hook methods

- addCssGroup('string or array') — add group to style groups list.
- addJsGroup('string or array') — add group to script groups list.
- addCssSource('string or array') — add file to style sources list.
- addJsSource('string or array') — add file to script sources list.
- setCssGroup('string or array') — replace style groups list.
- setJsGroup('string or array') — replace script groups list.
- setCssSource('string or array') — replace style sources list.
- setJsSource('string or array') — replace script sources list.
- getCssGroup('group name') — get specified group or all style groups.
- getJsGroup() — get specified group or all script groups.

### Post-hook methods

- isCss() — **true** if compiling CSS.
- isJs() — **true** if compiling JavaScript.
- getContent() — get compiled file content.
- setContent($content) — set compiled file content.
- setFilename($filename) — set output file name.
- getFileUrl() — get full URL of compiled file.
- getFilePath() — get path to compiled file.

## Examples

### Snippet output with styles in </head\> and scripts before </body\>

```modx
[[MinifyX?
  &minifyCss=`1`
  &minifyJs=`1`
  &registerCss=`default`
  &registerJs=`default`
  &cssSources=`
    assets/templates/himyf/css/normalize.css,
    assets/templates/himyf/css/foundation.css,
    assets/templates/himyf/css/font-awesome.css,
    assets/templates/himyf/css/app.css
  `
  &jsSources=`assets/templates/himyf/js/foundation.js`
]]
```

You can create a parameter set with the first 4 parameters as above and name it MinifyDefault (minify and register in default mode). Then the call becomes:

```modx
[[MinifyX@MinifyDefault?
  &cssSources=`
    assets/templates/himyf/css/normalize.css,
    assets/templates/himyf/css/foundation.css,
    assets/templates/himyf/css/font-awesome.css,
    assets/templates/himyf/css/app.css
  `
  &jsSources=`assets/templates/himyf/js/foundation.js`
]]
```

### Output to placeholders

In placeholder mode, the compiled styles file is saved to the placeholder from **&cssPlaceholder** (default `MinifyX.css`), and scripts to **&jsPlaceholder** (default `MinifyX.javascript`).

```modx
[[MinifyX?
  &minifyCss=`1`
  &minifyJs=`1`
  &cssSources=`
    assets/templates/himyf/css/normalize.css,
    assets/templates/himyf/css/foundation.css,
    assets/templates/himyf/css/font-awesome.css,
    assets/templates/himyf/css/app.css
  `
  &jsSources=`assets/templates/himyf/js/foundation.js`
]]
[[+MinifyX.css]]
[[+MinifyX.javascript]]
```

With Fenom template engine:

```fenom
{'!MinifyX' | snippet: [
  'minifyCss' => 1,
  'minifyJs' => 1,
  'jsSources' => '
    assets/plugins/jquery/jquery-2.1.4.min.js,
    assets/js/scripts.js
  ',
  'cssSources' => '
    assets/plugins/bootstrap/css/bootstrap.min.css,
    assets/css/essentials.css,
    assets/css/layout.css,
    assets/css/header-1.css,
    assets/css/color_scheme/green.css
  '
]}
{$_modx->getPlaceholder('MinifyX.css')}
{$_modx->getPlaceholder('MinifyX.javascript')}
```

### Using groups

File *groups.php*:

```php
<?php

return [
  'baseCss' => [
    '[[+assets_url]]templates/himyf/css/normalize.css',
    '{assets_url}templates/himyf/css/foundation.css',
    'assets/templates/himyf/css/font-awesome.css',
    'assets/templates/himyf/css/app.css'
  ],
  'baseJs' => [
    'assets/templates/himyf/js/foundation.js',
    '{assets_url}templates/himyf/js/scripts.js'
  ],
];
```

Snippet call:

```modx
[[MinifyX?
  &minifyCss=`1`
  &minifyJs=`1`
  &registerCss=`default`
  &registerJs=`default`
  &cssGroups=`baseCss`
  &jsGroups=`baseJs`
]]
```

### Pre-hook example: add scripts and styles for tickets

```php
<?php

if ($modx->resource->parent == 10) {
  // Add groups
  $MinifyX->addCssGroup('ticketsCss,officeCss');
  $MinifyX->addJsGroup('ticketsJs,officeJs');
  // Add files
  $MinifyX->addCssSource("{assets_url}css/jquery.fancybox.css");
  $MinifyX->addJsSource("{assets_url}js/jquery.fancybox.js");
}
```

### Post-hook example: fix vmax and vmin units

```php
<?php

if ($MinifyX->isCss()) {
  $data = preg_replace('#vm (ax|in)#', 'vm$1', $MinifyX->getContent());
  $MinifyX->setContent($data);
}
```

This hook is included in the package as **fixVm**. There is also **cssToPage**, which outputs the styles file content directly to the page. Both are in *core/components/minifyx/hooks*.
