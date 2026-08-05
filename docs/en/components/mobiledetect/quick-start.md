---
title: Quick start
---
# Quick start

Different content for desktop and mobile on one page in about 5 minutes.

## Step 1. Install

1. Install **MobileDetect** via **Extras → Installer** (see [overview](index#installation))
2. Ensure plugin **MobileDetect** is active and `md_disable_plugin = No`
3. Clear the MODX cache

## Step 2. Choose an output method

| You have pdoTools + Fenom | HTML template without Fenom |
| --- | --- |
| Fenom blocks (step 3a) | HTML tags (step 3b) |

## Step 3a. Fenom blocks (recommended)

In a template or chunk parsed by pdoTools via Fenom:

::: code-group

```fenom
{mobile}
  <p>Content for phone and tablet</p>
{/mobile}

{desktop}
  <p>Desktop content</p>
{/desktop}
```

```modx
[[!pdoPage?
  &element=`tplContent`
]]
```

:::

The `{mobile}` block shows for `mobile` **or** `tablet`. For phone without tablet use `{phone}` ([Integration](integration#fenom-blocks)).

## Step 3b. HTML tags

In the resource body or template:

```html
<standard>
  <p>Desktop content</p>
</standard>
<mobile>
  <p>Phone content</p>
</mobile>
```

The plugin on `OnWebPagePrerender` removes extra blocks before sending the page. Tag names are configured via `md_standard_node`, `md_mobile_node`, `md_tablet_node`.

::: warning
MODX tags and snippets inside HTML blocks parse **before** filtering. For conditional heavy snippets prefer Fenom — see [Integration](integration#output-methods).
:::

## Step 4. Verify

1. Open the page with markup
2. On desktop you see the `standard` / `{desktop}` block
3. In mobile emulation or on a phone — the `mobile` / `{mobile}` block
4. Forced mode: add `?browser=mobile` to the URL (parameter name is `md_force_browser_variable`, default `browser`)

## Step 5. Version switcher (optional)

The package includes chunk **tplMobileDetectSwitch** — Desktop / Tablet / Mobile / Auto links:

::: code-group

```fenom
{$modx->getChunk('tplMobileDetectSwitch')}
```

```modx
[[$tplMobileDetectSwitch]]
```

:::

## Checklist

- [ ] Plugin **MobileDetect** is enabled
- [ ] Content changes on desktop and mobile
- [ ] `?browser=mobile` and `?browser=detect` work
- [ ] Placeholder `[[+mobiledetect.device]]` is set (`standard`, `tablet`, or `mobile`)

## Next steps

- [System settings](settings) — cookie, tablets as desktop, GET parameter names
- [Integration](integration) — Fenom modifier, snippet, PHP API
- [MobileDetect snippet](snippets/mobiledetect) — output without Fenom
