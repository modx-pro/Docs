---
title: Reactions snippet
---
# Reactions snippet

Renders an interactive reaction block with counters. Works on any MODX object: resource, miniShop3 product, Tickets comment.

## Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| `set` | from `reactions_default_set` | Reaction set key (`updown`, `github`, `full`, or custom) |
| `types` | *(empty)* | Comma-separated type name subset (intersection with the set). For `full`, otherwise uses `reactions_full_types` |
| `layout` | `auto` | `auto` — picker if more than 3 types, otherwise bar. `picker` — chips + popover. `bar` — all buttons in a row |
| `class` | `modResource` | Object `class_key` in xPDO |
| `object` | current resource ID | Object ID |
| `context` | current context key | MODX context (`web`, `mgr`, etc.) |
| `tpl` | `tpl.Reactions` | Chunk for one reaction button |
| `tplOuter` | `tpl.Reactions.outer` | Outer wrapper chunk |
| `toPlaceholder` | *(empty)* | Placeholder name instead of direct output |

## Built-in types and sets

All preset types (name → emoji). Names are what you pass to `&types=` and `reactions_full_types`.

| `name` | Emoji | `updown` | `github` | `full` |
| --- | --- | --- | --- | --- |
| `like` | 👍 | ✓ | ✓ | ✓ |
| `dislike` | 👎 | ✓ | ✓ | ✓ |
| `love` | ❤️ | | ✓ | ✓ |
| `funny` | 😂 | | ✓ | ✓ |
| `wow` | 😮 | | ✓ | ✓ |
| `sad` | 😢 | | ✓ | ✓ |
| `angry` | 😡 | | ✓ | ✓ |
| `hooray` | 🎉 | | ✓ | ✓ |
| `rocket` | 🚀 | | | ✓ |
| `eyes` | 👀 | | | ✓ |
| `fire` | 🔥 | | | ✓ |
| `clap` | 👏 | | | ✓ |
| `thinking` | 🤔 | | | ✓ |
| `party` | 🥳 | | | ✓ |
| `star` | ⭐ | | | ✓ |
| `beer` | 🍺 | | | ✓ |
| `sparkles` | ✨ | | | ✓ |
| `hundred` | 💯 | | | ✓ |
| `pray` | 🙏 | | | ✓ |
| `muscle` | 💪 | | | ✓ |
| `cool` | 😎 | | | ✓ |
| `heart_eyes` | 😍 | | | ✓ |
| `confused` | 😕 | | | ✓ |
| `raised_hands` | 🙌 | | | ✓ |

Sets in short:

- `updown` (2): `like`, `dislike`. Exclusive.
- `github` (8): `like`, `dislike`, `love`, `funny`, `wow`, `sad`, `angry`, `hooray`.
- `full` (24): every row in the table above.

Example value for a setting or parameter:

```text
like,love,fire,star,clap,rocket,heart_eyes
```

Custom types are added via [CLI](../cli) or [admin API](../api#admin) and attached to a set. They are not listed in this table.

## Button chunk placeholders (`tpl`)

| Placeholder | Description |
| --- | --- |
| `[[+emoji]]` | Reaction type emoji |
| `[[+name]]` | Type name (`like`, `love`, `funny`…) |
| `[[+count]]` | Current count |
| `[[+active]]` | `1` if the user chose this reaction, otherwise `0` |

## Outer chunk placeholders (`tplOuter`)

| Placeholder | Description |
| --- | --- |
| `[[+output]]` | HTML of all buttons |
| `[[+total]]` | Sum of all reactions |
| `[[+api_url]]` | API URL. The default outer writes it to `data-api`. JS can also resolve the API from the `reactions.js` path or `Reactions.config.api` |
| `[[+csrf]]` | CSRF token for AJAX |
| `[[+class_key]]` | Object class (as in the API, in the DB: `object_class`) |
| `[[+object_id]]` | Object ID |
| `[[+set]]` | Set key |
| `[[+context]]` | Context |
| `[[+types]]` | Comma-separated names of shown types (`data-types` for JS) |
| `[[+exclusive]]` | `1` / `0`: exclusive set (`data-exclusive`) |
| `[[+allow_multiple]]` | `1` / `0`: `reactions_allow_multiple` setting (`data-allow-multiple`) |
| `[[+layout]]` | `picker` or `bar` after resolving `auto` (`data-layout`) |
| `[[+trigger]]` | HTML for the `+` button in picker mode (empty in bar) |

The JS container needs the `reactions-widget` class and object data attributes (`data-class-key`, `data-object-id`). `data-api` is optional. See [js](../js).

## Examples

Examples in MODX and Fenom syntax.

### Set from `reactions_default_set` (no `&set`)

::: code-group

```modx
[[!Reactions]]
```

```fenom
{'!Reactions' | snippet}
```

:::

### Exclusive: `updown`

::: code-group

```modx
[[!Reactions?
    &set=`updown`
    &class=`modResource`
    &object=`[[*id]]`
    &context=`web`
]]
```

```fenom
{'!Reactions' | snippet : [
    'set'     => 'updown',
    'class'   => 'modResource',
    'object'  => $_modx->resource.id,
    'context' => 'web',
]}
```

:::

### `github` — compact picker (default with `layout=auto`)

Chips for current reactions and a `+` button with a type grid. No long strip of 8 buttons.

::: code-group

```modx
[[!Reactions? &set=`github`]]
[[!Reactions? &set=`github` &layout=`picker`]]
[[!Reactions? &set=`github` &layout=`bar`]]
```

```fenom
{'!Reactions' | snippet : ['set' => 'github']}
{'!Reactions' | snippet : ['set' => 'github', 'layout' => 'picker']}
{'!Reactions' | snippet : ['set' => 'github', 'layout' => 'bar']}
```

:::

### Up to 24 types: `full` (also picker by default)

::: code-group

```modx
[[!Reactions? &set=`full`]]
[[!Reactions? &set=`full` &layout=`bar`]]
```

```fenom
{'!Reactions' | snippet : ['set' => 'full']}
{'!Reactions' | snippet : ['set' => 'full', 'layout' => 'bar']}
```

:::

Without `&types=` for `full`, the system setting `reactions_full_types` is used. An empty setting means all 24 types in the popover.

### Subset via `&types=` on `full`

::: code-group

```modx
[[!Reactions?
    &set=`full`
    &types=`like,love,fire,star,clap`
]]
```

```fenom
{'!Reactions' | snippet : [
    'set'   => 'full',
    'types' => 'like,love,fire,star,clap',
]}
```

:::

Filter priority: `&types=` → otherwise `reactions_full_types` (`full` only) → the full set. Only names that are actually shown go into `data-types`.

### Dropping unknown names in `&types=`

`not_a_type` is discarded. Types from the set remain.

::: code-group

```modx
[[!Reactions?
    &set=`full`
    &types=`like,angry,not_a_type`
]]
```

```fenom
{'!Reactions' | snippet : [
    'set'   => 'full',
    'types' => 'like,angry,not_a_type',
]}
```

:::

Result: two buttons: `like`, `angry`.

### `&types=` on `github`: names outside the set are ignored

`fire` exists in `full` but not in `github` → only `like` and `love` appear on screen.

::: code-group

```modx
[[!Reactions?
    &set=`github`
    &types=`like,love,fire`
]]
```

```fenom
{'!Reactions' | snippet : [
    'set'   => 'github',
    'types' => 'like,love,fire',
]}
```

:::

### miniShop3 product

Short class `msProduct` and product ID. The server resolves the FQCN itself.

::: code-group

```modx
[[!Reactions?
    &set=`github`
    &class=`msProduct`
    &object=`[[*id]]`
    &context=`web`
]]
```

```fenom
{'!Reactions' | snippet : [
    'set'     => 'github',
    'class'   => 'msProduct',
    'object'  => $_modx->resource.id,
    'context' => 'web',
]}
```

:::

Same with exclusive:

::: code-group

```modx
[[!Reactions?
    &set=`updown`
    &class=`msProduct`
    &object=`[[+id]]`
]]
```

```fenom
{'!Reactions' | snippet : [
    'set'    => 'updown',
    'class'  => 'msProduct',
    'object' => $id,
]}
```

:::

### Tickets comment

On MODX 3 the Tickets package is not verified yet. Call pattern:

::: code-group

```modx
[[!Reactions?
    &class=`TicketComment`
    &object=`[[+id]]`
    &set=`updown`
]]
```

```fenom
{'!Reactions' | snippet : [
    'class'  => 'TicketComment',
    'object' => $id,
    'set'    => 'updown',
]}
```

:::

### Output to a placeholder

::: code-group

```modx
[[!Reactions?
    &set=`updown`
    &object=`[[*id]]`
    &toPlaceholder=`pageReactions`
]]
[[+pageReactions]]
```

```fenom
{'!Reactions' | snippet : [
    'set' => 'updown',
    'object' => $_modx->resource.id,
    'toPlaceholder' => 'pageReactions',
]}
{$_modx->getPlaceholder('pageReactions')}
```

:::

### Custom button and outer chunks

::: code-group

```modx
[[!Reactions?
    &set=`github`
    &tpl=`myReactionBtn`
    &tplOuter=`myReactionsWrap`
]]
```

```fenom
{'!Reactions' | snippet : [
    'set' => 'github',
    'tpl' => 'myReactionBtn',
    'tplOuter' => 'myReactionsWrap',
]}
```

:::

In `tplOuter` keep the `reactions-widget` class and data attributes (`data-class-key`, `data-object-id`, `data-exclusive`, `data-allow-multiple`, `data-layout`…) plus the `[[+trigger]]` placeholder for picker mode. See [js](../js).

## Button behavior

- A second click removes the reaction.
- In the `updown` set (and any `exclusive` set) choosing another reaction replaces the previous one.
- Several types at once: the set is not `exclusive` **and** `reactions_allow_multiple=Yes` (otherwise the server keeps one type per visitor even for `github` / `full`).
- Counters update via AJAX without a page reload.

## Loading scripts

Without `reactions.js` the buttons render but do not respond to clicks.

::: code-group

```html
<link rel="stylesheet" href="[[++assets_url]]components/reactions/js/web/reactions.css">
<script src="[[++assets_url]]components/reactions/js/web/reactions.js" defer></script>
```

```html
<link rel="stylesheet" href="{'assets_url' | config}components/reactions/js/web/reactions.css">
<script src="{'assets_url' | config}components/reactions/js/web/reactions.js" defer></script>
```

:::
