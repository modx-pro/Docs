---
title: isCrawler
---
# isCrawler snippet

Detects whether the visitor is a bot. Without `&userAgent` JayBizzle concatenates headers: `HTTP_USER_AGENT`, `HTTP_FROM`, `HTTP_SEC_CH_UA`, and the rest of its list.

**Returns:** `"1"` (bot) or `"0"` (not bot).

Call uncached: `[[!isCrawler]]` (MODX) or `$modx->runSnippet('isCrawler', [])` (Fenom). Otherwise the result is shared across visitors.

## Parameters

| Parameter | Description | Default |
|-----------|-------------|---------|
| **userAgent** | Explicit string. Empty: JayBizzle headers from the request | — |
| **placeholderPrefix** | Placeholder prefix for detected bot name | `crawlerdetect.` |

When a bot is detected, placeholder `crawlerdetect.matches` (or your prefix) is set to the bot name, e.g. `Googlebot`. Use it when debugging.

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
