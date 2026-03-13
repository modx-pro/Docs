---
title: crawlerDetectBlock
---
# PreHook crawlerDetectBlock

FormIt preHook: blocks form submission if the request is from a bot (by User-Agent). The form is not validated or processed further; the user sees the message from settings.

**Usage:** add `crawlerDetectBlock` to FormIt’s **preHooks** parameter.

If you already have other preHooks, list them comma-separated: `crawlerDetectBlock,otherHook`.

## How it works

1. User submits the form.
2. FormIt runs preHook `crawlerDetectBlock` **before** validation and send.
3. If User-Agent is a bot → form is not processed; message from `crawlerdetect_block_message` is shown.
4. If human → form is processed as usual.

## Block message

Text is set in **System settings** → `crawlerdetect_block_message`. Default: "Failed to submit form. Please try again later."

Output in the form template via FormIt placeholder:

- **MODX:** `[[+fi.validation_error_message]]`
- **Fenom:** `{$modx->getPlaceholder('fi.validation_error_message')}`

## Examples

::: code-group

```modx
[[!FormIt?
  &preHooks=`crawlerDetectBlock`
  &hooks=`email,redirect`
]]
[[+fi.validation_error_message]]
<form method="post">...</form>
```

```fenom
{$modx->runSnippet('FormIt', [
  'preHooks' => 'crawlerDetectBlock',
  'hooks' => 'email,redirect'
])}
{if $modx->getPlaceholder('fi.validation_error_message')}
  <div class="error">{$modx->getPlaceholder('fi.validation_error_message')}</div>
{/if}
<form method="post">...</form>
```

:::

### Multiple preHooks (e.g. with CAPTCHA)

::: code-group

```modx
&preHooks=`crawlerDetectBlock,recaptcha`
```

```fenom
'preHooks' => 'crawlerDetectBlock,recaptcha'
```

:::

CrawlerDetect runs first and blocks bots before CAPTCHA.

## Compatibility

- **FetchIt** — if FetchIt posts to a page with FormIt, add `crawlerDetectBlock` to FormIt preHooks on that page. When a bot is blocked FetchIt gets an error response and shows the message from CrawlerDetect settings.
- **SendIt** — FormIt parameters are in presets (file from `si_path_to_presets`). Add `'preHooks' => 'crawlerDetectBlock'` to the preset. When a bot is blocked SendIt returns an error and shows the message from CrawlerDetect settings. See [Integration → SendIt](../integration#ajax-form-sendit).
- **AjaxForm** — if AjaxForm calls FormIt on the server, add `crawlerDetectBlock` to FormIt preHooks — protection will work.
