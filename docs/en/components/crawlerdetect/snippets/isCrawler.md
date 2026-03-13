---
title: isCrawler
---
# isCrawler snippet

Detects if the current visitor is a bot (web crawler) by the User-Agent header. Use for conditional output or counters.

**Returns:** `"1"` (bot) or `"0"` (not bot).

**Important:** call uncached — `[[!isCrawler]]` (MODX) or `$modx->runSnippet('isCrawler', [])` (Fenom). Otherwise the result is cached and won’t match the current visitor.

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| **userAgent** | User-Agent string to check (if empty — from current request) | — |
| **placeholderPrefix** | Placeholder prefix for detected bot name | `crawlerdetect.` |

When a bot is detected, placeholder `crawlerdetect.matches` (or your prefix) is set to the bot name (e.g. `Googlebot`) — useful for debugging.

## Examples

### Show widget to humans only

::: code-group

```modx
[[!isCrawler:eq=`0`:then=`[[$chatWidget]]`]]
```

```fenom
{if $modx->runSnippet('isCrawler', []) == '0'}
  {$modx->getChunk('chatWidget')}
{/if}
```

:::

### Don’t load analytics for bots

::: code-group

```modx
[[!isCrawler:eq=`0`:then=`[[$googleAnalytics]]`]]
```

```fenom
{if $modx->runSnippet('isCrawler', []) == '0'}
  {$modx->getChunk('googleAnalytics')}
{/if}
```

:::

### Different content for bot and human

::: code-group

```modx
[[!isCrawler:eq=`0`:then=`[[$fullContent]]`:else=`[[$liteContent]]`]]
```

```fenom
{set $isBot = $modx->runSnippet('isCrawler', [])}
{if $isBot == '0'}
  {$modx->getChunk('fullContent')}
{else}
  {$modx->getChunk('liteContent')}
{/if}
```

:::

### Debug: which bot was detected

::: code-group

```modx
[[!isCrawler]]
[[+crawlerdetect.matches]]
```

```fenom
{$modx->runSnippet('isCrawler', [])}
{if $modx->getPlaceholder('crawlerdetect.matches')}
  Bot: {$modx->getPlaceholder('crawlerdetect.matches')}
{/if}
```

:::
