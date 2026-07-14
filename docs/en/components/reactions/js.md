---
title: JavaScript widget
description: Frontend widget for Reactions — data attributes, init, sets, styling, AJAX
---
# JavaScript widget

Files:

| File | Purpose |
| --- | --- |
| `assets/components/reactions/js/web/reactions.js` | Widget logic |
| `assets/components/reactions/js/web/reactions.css` | Styles |

## Include

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

The `Reactions` snippet outputs ready markup. The widget initializes automatically when the DOM loads.

## Auto-init

The script finds elements with the `.reactions-widget` class and mounts a widget on each. Re-init of the same element is blocked by `data-mounted="true"`.

## Container data attributes

| Attribute | Required | Description |
| --- | --- | --- |
| `data-class-key` | yes | Object class (`modResource`, `msProduct`…) |
| `data-object-id` | yes | Object ID (integer > 0) |
| `data-set` | no | Set key, default `updown` |
| `data-context` | no | Context, default `web` |
| `data-csrf` | no | CSRF token. If empty, the widget requests one |
| `data-api` | no* | API URL. In snippet SSR filled from `[[+api_url]]`. Without the attribute: `Reactions.config.api`, otherwise a path derived from `reactions.js` (same-origin) |
| `data-types` | no | Type names, comma-separated. Attribute missing → catalog from `data-set`. Empty string → 0 buttons. Extra names outside the set are ignored |
| `data-exclusive` | no | `1` when the set is exclusive (SSR from the snippet) |
| `data-allow-multiple` | no | `1` when `reactions_allow_multiple` is on (SSR) |
| `data-layout` | no | `auto` (default), `picker`, or `bar`. `auto` → picker when there are more than 3 types |

API URL resolution order:

1. `data-api` on the element (snippet sets `[[+api_url]]`)
2. `window.Reactions.config.api`
3. path from same-origin `<script src="…/components/reactions/js/web/reactions.js">` → `…/components/reactions/api.php`

The `Reactions` snippet fills `data-types` with the types actually shown (after the `types` / `reactions_full_types` filter). An empty filter result → `data-types=""`, and the widget does not fall back to the full set.
Markup example (manual chunk / AJAX):

::: code-group

```html
<div
    class="reactions-widget"
    data-api="[[++assets_url]]components/reactions/api.php"
    data-class-key="modResource"
    data-object-id="[[*id]]"
    data-set="full"
    data-types="like,love,fire,star"
    data-context="[[*context_key]]"
></div>
```

```html
<div
    class="reactions-widget"
    data-api="{'assets_url' | config}components/reactions/api.php"
    data-class-key="modResource"
    data-object-id="{$_modx->resource.id}"
    data-set="full"
    data-types="like,love,fire,star"
    data-context="{$_modx->context.key}"
></div>
```

:::

Override (CDN or non-standard path to `api.php`):

```html
<script>
  window.Reactions = window.Reactions || {};
  window.Reactions.config = { api: '[[++assets_url]]components/reactions/api.php' };
</script>
```

or on a specific widget: `data-api="[[++assets_url]]components/reactions/api.php"`.

The `Reactions` snippet fills required data attributes via the `tpl.Reactions.outer` chunk. With a custom chunk, keep the `reactions-widget` class and correct data attributes. `data-api` is optional.

## Manual init

Global object `window.Reactions`:

```javascript
// All widgets on the page
Reactions.init();

// Only inside a container (after AJAX load)
const container = document.getElementById('comments');
Reactions.init(container);
```

`init(root)` returns an array of `ReactionsWidget` instances.

## Lifecycle

1. Parse data attributes.
2. Request CSRF (`GET ?action=csrf`) if no token was passed.
3. Load counters (`GET ?action=counts`).
4. Render: `bar` (all types in a row) or `picker` (chips + popover).
5. On click / pick in the popover: optimistic UI → `POST ?action=react` or `DELETE ?action=react`.
6. On error: roll back state, refresh CSRF.

## Sets in JS

The widget knows emoji for built-in sets:

| Set | Types |
| --- | --- |
| `updown` | like 👍, dislike 👎 |
| `github` | like 👍, dislike 👎, love ❤️, funny 😂, wow 😮, sad 😢, angry 😡, hooray 🎉 |
| `full` | `github` + rocket 🚀, eyes 👀, fire 🔥, clap 👏, thinking 🤔, party 🥳, star ⭐, beer 🍺, sparkles ✨, hundred 💯, pray 🙏, muscle 💪, cool 😎, heart_eyes 😍, confused 😕, raised_hands 🙌 |

For custom sets, server validation still works through the API, but JS renders buttons only when the set matches `REACTION_SETS` in the bundle. For fully custom sets use server render via the `Reactions` snippet without JS, or extend the frontend.

## Exclusive and sync

The server treats the mode as exclusive when the set is `exclusive` **or** `reactions_allow_multiple` is off. The snippet writes this into `data-exclusive` / `data-allow-multiple`. The widget mirrors the same logic: under exclusive, another button clears the previous one (optimistic UI).

Several widgets for the same object (`class_key` + `object_id` + `context`) sync via the `reactions:updated` event on `document` after a successful POST/DELETE.

## Layout: bar and picker

| Mode | When | UI |
| --- | --- | --- |
| `bar` | `updown` or `layout=bar` | All types in a row |
| `picker` | `github` / `full` with `layout=auto`, or `layout=picker` | Chips for current reactions + `+` button and popover grid |

Escape and outside click close the popover. Snippet:

::: code-group

```modx
[[!Reactions? &set=`github` &layout=`picker`]]
[[!Reactions? &set=`full` &layout=`bar`]]
```

```fenom
{'!Reactions' | snippet : ['set' => 'github', 'layout' => 'picker']}
{'!Reactions' | snippet : ['set' => 'full', 'layout' => 'bar']}
```

:::

## Accessibility

- Container: `role="group"`, `aria-label="Reactions"`.
- Reaction buttons: `aria-pressed`, `aria-label` with type name and count.
- Picker: `+` button with `aria-expanded` / `aria-haspopup`. Popover closes on Escape and outside click.
- Errors: `role="alert"`.
- Keyboard: Enter and Space activate the button.

## Styling

BEM classes:

| Class | Element |
| --- | --- |
| `.reactions-widget` | Container (`data-loading`, `aria-busy` while loading) |
| `.reactions-widget__buttons` | Button group (`bar` layout) |
| `.reactions-widget__shell` | Summary + trigger wrapper (`picker` layout) |
| `.reactions-widget__summary` | Chips for selected / non-zero reactions |
| `.reactions-widget__trigger` | `+` button (`.is-open` when the popover is open) |
| `.reactions-widget__popover` | Popover panel |
| `.reactions-widget__picker` | Type grid inside the popover |
| `.reactions-widget__picker-button` | Type button in the popover |
| `.reactions-widget__button` | Reaction button (bar or chip in summary) |
| `.reactions-widget__button.is-active` / `[aria-pressed="true"]` | Selected reaction |
| `.reactions-widget__emoji` | Emoji |
| `.reactions-widget__count` | Counter (hidden at `0`) |
| `.reactions-widget__error` | Error message |

SSR and JS share the same classes. Override via CSS custom properties: `--reactions-border`, `--reactions-bg`, `--reactions-active-border`, `--reactions-muted`, and others.

## AJAX after dynamic load

Tickets and infinite scroll inject HTML without a full reload. After inserting new comments, call:

```javascript
document.getElementById('new-comments').addEventListener('load', () => {
    Reactions.init(document.getElementById('new-comments'));
});
```

## Cookie requirements

The widget sends requests with `credentials: include`. For the `ip_cookie` strategy the browser must accept the `reactions_fid` cookie. CSRF is bound to the PHP session.

## Build from sources

Sources: `frontend/src/`. With `php _build/build.php` the widget builds automatically (`assets()` step). Manually:

```bash
cd frontend
npm install
npm run build
```

Vite writes artifacts to `assets/components/reactions/js/web/` (`reactions.js`, `reactions.css`). Those files go into the transport package.
