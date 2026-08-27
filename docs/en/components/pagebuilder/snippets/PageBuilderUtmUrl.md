---
title: PageBuilderUtmUrl
description: Append PageBuilder registry UTM parameters to a URL
---

# PageBuilderUtmUrl snippet

Appends UTM parameters from the CMP registry to any URL. Values come from the query string, `$_SESSION['utm']`, or the record `default_value` in `pb_utm_params`.

## Purpose

Link to a landing or form with the same tags as the current visit without hand-building query strings in the template.

## Where to call

Template, chunk outside PageBuilder, custom buttons. For url/button fields inside sections, use <code v-pre>{{utm:key}}</code> in the inspector instead.

## Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| `url` | empty | Target URL. Empty → empty output |
| `params` | empty | JSON with extra query params. Keys in `params` override the registry |

## Basic call

::: code-group

```modx
[[!PageBuilderUtmUrl?
  &url=`https://example.com/landing`
]]
```

```fenom
{'!PageBuilderUtmUrl' | snippet : [
  'url' => 'https://example.com/landing'
]}
```

:::

## Extra query parameters

::: code-group

```modx
[[!PageBuilderUtmUrl?
  &url=`/contacts/`
  &params=`{"utm_content":"hero-cta"}`
]]
```

```fenom
{'!PageBuilderUtmUrl' | snippet : [
  'url' => '/contacts/',
  'params' => '{"utm_content":"hero-cta"}'
]}
```

:::

## Fenom: utm_query modifier

pdoTools registers a modifier on `pdoToolsOnFenomInit`:

```fenom
<a href="{$button.url|utm_query}">{$button.label}</a>
```

Same as the snippet for URLs from section data.

## UTM session

For first-visit tags in links, call [PageBuilderUtmSession](PageBuilderUtmSession) before render or rely on the PageBuilder plugin.

## See also

- [PageBuilderUtmSession](PageBuilderUtmSession)
- [CMP → UTM](../cmp#utm)
