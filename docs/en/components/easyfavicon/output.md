---
title: Output on the site
description: Automatic injection by the plugin and manual output with the EasyFavicon snippet
---

# Output on the site

## Auto injection

The **EasyFavicon** plugin on `OnWebPagePrerender` puts the markup of the active profile of the page's context before `</head>` on every page of the site. Nothing has to be added to the templates.

The `easyfavicon.auto_inject_profile` setting (name or id) picks the profile to output; empty means the active profile of the context. The `easyfavicon.auto_inject` setting turns auto injection off.

If the response has no `</head>`, the plugin inserts nothing and writes a warning to the error log — output the markup with the snippet on such pages.

## EasyFavicon snippet

To choose the place yourself, turn `easyfavicon.auto_inject` off and call the snippet in the template's `<head>`:

::: code-group

```modx
[[EasyFavicon]]
```

```fenom
{'EasyFavicon' | snippet}
```

:::

| Parameter | Default | Description |
| --- | --- | --- |
| `profile` | active profile of the context | Profile name or id |
| `tpl` | `tpl.EasyFavicon` | Wrapper chunk with the `[[+html]]` placeholder |

For example, output a particular profile:

::: code-group

```modx
[[EasyFavicon? &profile=`New Year`]]
```

```fenom
{'EasyFavicon' | snippet : ['profile' => 'New Year']}
```

:::

Both the plugin and the snippet put `base_url` and the `?v=…` build stamp into the paths, so the links are right on a site in a subdirectory too, and after switching profiles the browser does not keep the old icon in its cache.

::: tip
If the snippet has already output the same markup, the plugin does not repeat it. But if the snippet and `easyfavicon.auto_inject_profile` point to different profiles, the page gets both sets — so turn auto injection off when you output the markup by hand.
:::
