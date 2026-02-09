---
title: AjaxSnippet
description: Component to run snippets via Ajax. Lets you load news or comments after the main page
logo: https://modstore.pro/assets/extras/ajaxsnippet/logo-lg.jpg
modstore: https://modstore.pro/packages/utilities/ajaxsnippet
---
# AjaxSnippet

Small snippet that speeds up the site by loading less critical content via ajax.

- Call AjaxSnippet on any page with the snippet name and parameters.
- The snippet outputs an empty block with a preloader and registers an ajax request.
- After the page loads, the request runs and the response is put into that block.
- The request can run on page load or when a trigger link is clicked.

## Snippet parameters

| Name | Default | Description |
|------|---------|-------------|
| **&snippet** | `pdoResources` | Snippet to run via Ajax. |
| **&propertySet** | | Name of the snippet property set to use. |
| **&wrapper** | | Wrapper chunk. Must contain an element with `id="[[+key]]"`. |
| **&as_mode** | `onload` | When to load: right after page load («onload») or on trigger link click («onclick»). |
| **&as_trigger** | | Trigger link text for «onclick» mode. Default: lexicon entry «as_trigger». |
| **&as_target** | | CSS selector of the element to insert the response into. Default: where the wrapper chunk is output. |

Everything you pass to AjaxSnippet is forwarded to the snippet. **The snippet can be called cached.**

## Examples

Deferred loading with pdoResources:

```modx
[[AjaxSnippet?
  &snippet=`pdoResources`
  &parents=`0`
  &tpl=`@INLINE <p>[[+id]] - [[+pagetitle]]</p>`
  &as_mode=`onload`
]]
```

Same, but load starts on link click:

```modx
[[AjaxSnippet?
  &snippet=`pdoResources`
  &parents=`0`
  &tpl=`@INLINE <p>[[+id]] - [[+pagetitle]]</p>`
  &as_mode=`onclick`
  &as_trigger=`Click me!`
]]
```
