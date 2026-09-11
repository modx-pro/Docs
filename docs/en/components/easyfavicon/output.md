---
title: Output on the site
description: Automatic injection by the plugin and manual output with the EasyFavicon snippet
---

# Output on the site

## Auto injection

The **EasyFavicon** plugin on `OnWebPagePrerender` puts the markup of the active profile before `</head>` on every page of the site. Nothing has to be added to the templates.

The `easyfavicon.auto_inject_profile` setting (name or id) picks the profile to output; empty means the active one. The `easyfavicon.auto_inject` setting turns auto injection off.

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
| `profile` | active | Profile name or id |
| `tpl` | `tpl.EasyFavicon` | Wrapper chunk with the `[[+html]]` placeholder |

The snippet puts `base_url` into the markup, so the file paths are right on a site in a subdirectory too.

::: warning
Do not keep both auto injection and the snippet on: the markup would land on the page twice.
:::
