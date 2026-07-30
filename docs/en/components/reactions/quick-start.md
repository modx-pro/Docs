---
title: Quick start
description: Load CSS/JS and render the reactions block on a resource page
---

# Quick start

Minimal path: load assets, call the snippet, click a reaction.

## 1. CSS and JS

In the template or via `registerClientScript` / `registerClientCSS`.

::: code-group

```modx
<link rel="stylesheet" href="[[++assets_url]]components/reactions/js/web/reactions.css">
<script src="[[++assets_url]]components/reactions/js/web/reactions.js" defer></script>
```

```fenom
<link rel="stylesheet" href="{'assets_url' | config}components/reactions/js/web/reactions.css">
<script src="{'assets_url' | config}components/reactions/js/web/reactions.js" defer></script>
```

:::

Auto-init and data attributes: [JavaScript widget](js).

## 2. Reactions block

On a resource page (`github` set). With `layout=auto` (default) the widget draws a compact picker: chips + `+` button. For `updown` you still get a two-button strip.

::: code-group

```modx
[[!Reactions? &set=`github`]]
[[!Reactions? &set=`updown`]]
[[!Reactions? &set=`github` &layout=`bar`]]
```

```fenom
{'!Reactions' | snippet : ['set' => 'github']}
{'!Reactions' | snippet : ['set' => 'updown']}
{'!Reactions' | snippet : ['set' => 'github', 'layout' => 'bar']}
```

:::

Without `&set`, the snippet uses `reactions_default_set` (default `updown`).

miniShop3 product:

::: code-group

```modx
[[!Reactions?
    &class=`msProduct`
    &object=`[[*id]]`
    &set=`updown`
]]
```

```fenom
{'!Reactions' | snippet : [
    'class'  => 'msProduct',
    'object' => $_modx->resource.id,
    'set'    => 'updown',
]}
```

:::

Parameters and chunks: [Reactions snippet](snippets/reactions).

## 3. Check the API

```bash
curl "https://example.com/assets/components/reactions/api.php?action=counts&class_key=modResource&object_id=1&context=web"
```

The widget fetches CSRF and updates counts over AJAX.

## 4. Clear cache

After install or setting changes: **Manage → Clear Cache**.

---

Next:

- [System settings](settings) — identity strategy, rate limit, webhooks
- [Snippets](snippets/) — tops, counts, schema
- [Integrations](integrations/minishop3) — miniShop3, pdoTools, Tickets
