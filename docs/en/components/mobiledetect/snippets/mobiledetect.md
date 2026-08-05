---
title: MobileDetect
---
# MobileDetect snippet

Compares the current device type with parameter `&input` and returns `1` (match) or `0` (no match).

**Important:** call **uncached** — `[[!MobileDetect]]`. With cache the result is the same for all visitors.

## Parameters

| Parameter | Description | Default |
| --- | --- | --- |
| `&input` | Expected type: `standard`, `tablet`, `mobile` | `mobile` |

Types match `getDeviceType()` from the MobileDetect service.

## Examples

### Mobile

::: code-group

```modx
[[!MobileDetect:is=`1`:then=`
  <p>Mobile content</p>
`:else=``:input=`mobile`]]
```

```fenom
{if $modx->runSnippet('MobileDetect', ['input' => 'mobile']) == 1}
  <p>Mobile content</p>
{/if}
```

:::

### Tablet

::: code-group

```modx
[[!MobileDetect:is=`1`:then=`
  <p>Tablet content</p>
`:else=``:input=`tablet`]]
```

```fenom
{if $modx->runSnippet('MobileDetect', ['input' => 'tablet']) == 1}
  <p>Tablet content</p>
{/if}
```

:::

### Desktop (standard)

::: code-group

```modx
[[!MobileDetect:is=`1`:then=`
  <p>Desktop content</p>
`:else=``:input=`standard`]]
```

```fenom
{if $modx->runSnippet('MobileDetect', ['input' => 'standard']) == 1}
  <p>Desktop content</p>
{/if}
```

:::

### Mobile / desktop branch

::: code-group

```modx
[[!MobileDetect:is=`1`:then=`
  [[$mobileHeader]]
`:else=`
  [[$desktopHeader]]
`:input=`mobile`]]
```

```fenom
{if $modx->runSnippet('MobileDetect', ['input' => 'mobile']) == 1}
  {$modx->getChunk('mobileHeader')}
{else}
  {$modx->getChunk('desktopHeader')}
{/if}
```

:::

## How it works

1. Snippet loads the `MobileDetect` service
2. Reads forced mode GET parameter (`md_force_browser_variable`)
3. Calls `resolveDevice()` — cookie, GET, or User-Agent
4. Compares `$input` with current type (case-insensitive)
5. Returns `(int) match`

Placeholder `[[+mobiledetect.device]]` is set by the plugin, not the snippet.

## Related

- [Integration](../integration) — Fenom and HTML tags
- [System settings](../settings) — GET parameters and cookie
- [Troubleshooting](../troubleshooting) — caching
