---
title: TVGroup
description: Multiple fields in a single TV value (JSON) with conditional display logic
categories: utilities
author: consoleloh
repository: https://github.com/consoleloh/tvgroup
---

# TVGroup

TVGroup is a TV type that combines several native MODX fields (as well as MIGX) in a single interface and stores all their values in one TV value as JSON. Fields are configured right in the TV's Input Options with the native settings of each type (min/max for numbers, regex for text, etc.). Conditional logic is supported: fields are shown or hidden depending on the values of other fields.

```json
{"type": "image", "logo": "assets/images/logo.png", "price": "500"}
```

Requirements: MODX 3.0+, PHP 8.0+.

## Usage

Create a TV and on the **Input options** tab set **Input type** to "Field group". A field table appears below. Each field is configured in its own window with the following properties:

### Name

Lowercase latin letters, digits and `_`, starting with a letter. Templates access the value by this name.

::: details Note
Every field has an immutable key: conditions reference it, and when a field is renamed, values in resources (and in MIGX-TV records) are moved to the new name once the TV is saved.
:::

### Caption and Description

The text shown to the manager above the field.

### Type

Any native MODX input type: text, textarea, richtext, number, date, listbox, checkbox, image, file, etc. Each type exposes its own native input options (min/max for numbers, regex for text, media source for image).

### Input option values and Default value

Work exactly like regular TVs: `Image==image||Link==link`.

### Required

Validated only while the field is visible (not hidden by conditions).

### Field "From TV" <Badge type="info" text="Optional" />

A live reference to an existing TV (like `inputTV` in MIGX): type, input option values, options, default value and media source are taken from it. Changes to that TV apply at once in every group that uses it.

### Keep value while the field is hidden

The value is not erased while conditions hide the field, so you can switch variants (e.g. banner type) without re-entering data. The `[[*tv_name]]` output still omits hidden fields.

## Conditional logic

Every field can have "Show if" rules: "or" groups of "and" rules. Conditions reference fields above the current one.

Available operators: `==`, `!=`, `>`, `<`, `>=`, `<=`, "is empty", "is not empty", "contains", "matches regex".

::: tip
Fields hidden by conditions are not saved unless "Keep value while the field is hidden" is enabled.
:::

## Data and output

The TV value in a resource is JSON keyed by field names. The `[[*tv_name]]` output (and `getTVValue`, and `{$_modx->resource.tv_name}` in pdoTools) returns the same JSON without fields hidden by conditions:

```modx
{set $promo = $_modx->resource.promo | fromJSON}
{if $promo.type == 'image'}<img src="{$promo.logo}">{/if}
```

"From TV" fields of the `image` and `file` types get the TV's media source path in the output: a value of `banner.webp` from a source rooted at `assets/images/` is returned as `/assets/images/banner.webp`.

::: details Note
The raw database value (e.g. `includeTVs` without `processTVs`) also contains the saved values of hidden fields.
:::

## getTvGroup snippet

Outputs group fields into a chunk. Without `&tpl` it returns the same JSON as `[[*tv_name]]`.

| Name       | Default          | Description                                                                                  |
|------------|------------------|----------------------------------------------------------------------------------------------|
| **id**     | Current resource | Resource ID                                                                                  |
| **tv**     |                  | TV name or id; optional when `&value` is used                                                |
| **value**  |                  | Raw group value (JSON) — used instead of the resource's TV value; `&id` is not needed        |
| **tpl**    |                  | Chunk, `@INLINE` or `@FILE`; empty — JSON                                                     |
| **prefix** | `tv`             | Placeholders like `[[+tv.field]]`; an empty string gives flat `[[+field]]`                    |

```modx
[[getTvGroup? &id=`5` &tv=`promo` &tpl=`promo.tpl`]]
[[getTvGroup? &tv=`promo` &tpl=`@INLINE <b>[[+tv.type]]</b>: [[+tv.price]] ₽`]]
[[getTvGroup? &tv=`promo` &prefix=`` &tpl=`promo.tpl`]]
```

Multiple values are stored as an `a||b` string and can be split with a modifier: `` [[+tv.tags:split=`||`]] ``.

::: warning Important
The snippet reads TVs of other resources, so call it uncached: `[[!getTvGroup? ...]]` — otherwise editing a resource won't refresh the page cache. For the same reason, `@INLINE` with placeholders works reliably only in an uncached call.
:::

### The `&value` mode

With `&value`, the snippet needs only the raw group JSON and a template: no resource or TV is loaded. If `&tv` is also passed, the value additionally goes through the hidden-fields filter and gets media source paths — just like when read from a resource.

## Working with MIGX

Everything MIGX-related is enabled only when MIGX is installed. The integration works both ways.

### Group inside MIGX

A group is connected to MIGX as a regular field — via `inputTV`:

```json
[{"caption": "Slide", "fields": [
    {"field": "slide", "caption": "Slide", "inputTV": "promo"}
]}]
```

The group value is stored as a nested JSON string inside the MIGX array. On the frontend you can decode it a second time (`{$row.slide | fromJSON}`) or output it with the getTvGroup snippet right inside a `getImageList` chunk:

```modx
[[!getImageList? &tvname=`slides` &tpl=`slideRow`]]
```

```modx
[[- slideRow chunk: ]]
[[!getTvGroup? &value=`[[+slide]]` &tv=`promo` &tpl=`promo.tpl`]]
```

### MIGX inside a group

MIGX is added to a group as a regular "From TV" field: create a MIGX TV and reference it. Conditional logic and value collection work inside the MIGX window too, including nested "MIGX in a group in MIGX" structures.

### The this.renderTvGroup preview renderer

The renderer shows a preview of the group record right in the MIGX grid:

```json
[{"header": "Slide", "dataIndex": "slide", "renderer": "this.renderTvGroup"}]
```

The preview appearance is set in the group settings, the "Preview template (MIGX)" field, using Ext.XTemplate syntax:

```
<b>{type}</b>: {price} ₽<tpl if="logo"> <img src="{logo:this.thumb}"></tpl>
```

- values arrive as text: tag-free and escaped — markup comes only from the template itself;
- `{logo:this.thumb}` — thumbnail URL (phpThumb) with the field's media source;
- Ext.util.Format functions: `{note:ellipsis(40)}`, etc.;
- fields hidden by conditions are empty in the template;
- without a template, "Caption: value" of the filled fields is shown.

::: tip
The renderer only displays data and writes nothing back into the MIGX record (unlike `this.renderChunk`, which replaces the column value).
:::

## Field export and import

A group configuration can be exported to JSON and moved to another site or another group — as a file or by pasting. "From TV" fields are exported as plain own text fields: after import, link them to the right TVs with the "From TV" switch.

## Limitations

- The `tag` and `autotag` types are not supported inside a group: the native render collects tags from TV values by the TV id, and a group field is a virtual in-memory TV with a synthetic id, so the tag list is empty.
- A group cannot be nested inside a group.
- MIGXDB (MIGX custom tables, CMP) is not supported: a group can be connected there, but conditional display and value collection don't work, and the value migration on field rename doesn't reach migxdb tables.
- Client-side Form Customization rules (moving, hiding) don't apply to "From TV" fields inside a group; the server-side default value rule (`tvDefault`) applies as with regular TVs.

## System settings

### `tvgroup.core_path`

Overrides the path to `core/components/tvgroup` — handy for development with symlinks to the repository.

### `tvgroup.assets_path`

Overrides the path to `assets/components/tvgroup`.

### `tvgroup.assets_url`

Overrides the URL of `assets/components/tvgroup`.
