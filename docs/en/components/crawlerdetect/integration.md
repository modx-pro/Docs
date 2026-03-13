---
title: Integration
---
# Integration

Form protection, hiding content from bots, and typical CrawlerDetect usage.

## Form spam protection

### How it works

1. User submits the form.
2. FormIt runs preHook `crawlerDetectBlock` **before** validation and send.
3. If User-Agent is a bot → form is not processed; message from settings is shown.
4. If human → form is processed as usual.

See [crawlerDetectBlock](snippets/crawlerDetectBlock).

### Regular form (FormIt)

Add `crawlerDetectBlock` to FormIt’s `&preHooks`. If you have other preHooks, list them comma-separated:

::: code-group

```modx
&preHooks=`crawlerDetectBlock,otherHook`
```

```fenom
'preHooks' => 'crawlerDetectBlock,otherHook'
```

:::

### AJAX form (FetchIt)

FetchIt processes forms via FormIt on the server. To protect the form:

1. In FetchIt config set the URL/page where FormIt is called.
2. In that page’s FormIt call add `&preHooks=`crawlerDetectBlock``.
3. When a bot is blocked FetchIt gets an error response and shows the message from `crawlerdetect_block_message`.

### AJAX form (SendIt)

SendIt uses FormIt; parameters are set in presets (file from **si_path_to_presets**). To protect the form:

1. Open your presets file (your copy, not the default `core/components/sendit/presets/sendit.inc.php` — it is overwritten on SendIt update).
2. Add `preHooks` with `crawlerDetectBlock` to the needed preset.
3. When a bot is blocked SendIt returns an error and shows the message from CrawlerDetect settings.

**Preset example:**

```php
return [
  'contact' => [
    'preHooks' => 'crawlerDetectBlock',
    'hooks' => 'email,FormItSaveForm',
    'validate' => 'name:required,email:email:required',
    'emailTo' => 'manager@site.com',
    'emailSubject' => 'Contact form',
    // ...
  ],
];
```

If `preHooks` already exists, add comma-separated: `'preHooks' => 'crawlerDetectBlock,otherHook'`.

## Hiding content from bots

Snippet **isCrawler** returns `"1"` (bot) or `"0"` (not bot). Call it **uncached** and use for conditional output.

### Widget for humans only

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

### Analytics for humans only

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

See [isCrawler](snippets/isCrawler).

## Typical scenarios

### Contact form

Add `crawlerDetectBlock` to FormIt preHooks. See [Quick start](quick-start).

### Multiple forms on the site

Use the same preHook for all forms. Add `crawlerDetectBlock` to `&preHooks` in each FormIt call.

### “N users online” counter

Run the counter snippet only when the visitor is not a bot:

::: code-group

```modx
[[!isCrawler:eq=`0`:then=`[[!yourVisitorCounterSnippet]]`]]
```

```fenom
{if $modx->runSnippet('isCrawler', []) == '0'}
  {$modx->runSnippet('yourVisitorCounterSnippet', [])}
{/if}
```

:::

### “Request a call” form (FetchIt)

1. Ensure FetchIt is configured to call FormIt on the server.
2. In FormIt on the target page add `&preHooks=`crawlerDetectBlock``.
3. When a bot is blocked FetchIt shows the message from CrawlerDetect settings.

### E‑commerce — “Viewing this product”

Exclude bots from product view count:

::: code-group

```modx
[[!isCrawler:eq=`0`:then=`[[!msProductViews? &id=`[[*id]]`]]`]]
```

```fenom
{if $modx->runSnippet('isCrawler', []) == '0'}
  {$modx->runSnippet('msProductViews', ['id' => $productId])}
{/if}
```

:::
