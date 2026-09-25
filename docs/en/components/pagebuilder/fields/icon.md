---
title: "icon"
description: "SVG from the Lucide or Heroicons catalog. Not a Font Awesome class. Pro layer."
---

# Field icon

Version: **Pro** (`advanced-fields`).

The picker chooses an SVG from two sets: Lucide (ISC, 24×24) and Heroicons (MIT, 24×24). A class such as `fa-star` is not a valid value.

An icon name is lowercase letters, digits, and hyphens. In the inspector you can type `lucide:star` or an object `{ "set", "name" }`.

`IconValueResolver` adds a ready `svg` on output. An unknown name yields empty `set`, `name`, and `svg`.

## Schema

```json
{
  "name": "icon",
  "type": "icon",
  "label": "Icon"
}
```

## Section data {#output-in-section-data}

Saved value:

```json
{
  "icon": { "set": "lucide", "name": "star" }
}
```

After render the same key includes `svg`:

```json
{
  "icon": {
    "set": "lucide",
    "name": "star",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" ...></svg>"
  }
}
```

## Chunk example

`svg` is already HTML. Do not run it through `escape`.

::: code-group

```modx
<span class="pb-icon">[[+icon.svg]]</span>
```

```fenom
<span class="pb-icon">{$icon.svg}</span>
```

:::

## Similar types

- [image](image) when you need your own file, not the catalog
