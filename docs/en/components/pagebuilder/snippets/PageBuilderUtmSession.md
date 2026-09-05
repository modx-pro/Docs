---
title: PageBuilderUtmSession
description: Persist UTM query parameters in session for section visibility rules
---

# PageBuilderUtmSession snippet

Writes UTM parameters from the query string into `$_SESSION['utm']`. Used with section visibility rules (`settings.utm` in the document JSON).

## Purpose

Keep campaign tags on first visit so [PageBuilder](PageBuilder) can show or hide sections by UTM in the same request and later in the session.

## When to call

The PageBuilder plugin already captures UTM on `OnHandleRequest` in the `web` context. Use the snippet if:

- the plugin is disabled on some templates;
- the session starts after the plugin event;
- you want an explicit call in the layout.

Place it **before** `PageBuilder` in the site header or base layout chunk.

## Parameters

No properties. Call with no arguments.

## Call

::: code-group

```modx
[[!PageBuilderUtmSession]]
```

```fenom
{'!PageBuilderUtmSession' | snippet}
```

:::

## What is stored

| Query | Session |
| --- | --- |
| `?utm_source=google` | `$_SESSION['utm']['source'] = 'google'` |
| `?utm_campaign=sale` | `$_SESSION['utm']['campaign'] = 'sale'` |

Keys are normalized to lowercase. Empty values are ignored.

Parameter registry and defaults live in CMP **UTM**. Section **visibility** rules are set in the resource inspector, not in CMP.

## Field placeholders

Url and button fields support <code v-pre>{{utm:key}}</code> (substituted at render). See [CMP → UTM](../cmp#utm).

## See also

- [PageBuilderUtmUrl](PageBuilderUtmUrl)
- [PageBuilder](PageBuilder)
