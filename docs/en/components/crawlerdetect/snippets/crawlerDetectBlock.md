---
title: crawlerDetectBlock
---
# PreHook crawlerDetectBlock

FormIt preHook: blocks the submit if the library treats the request as a bot. Without an explicit UA it reads JayBizzle headers, not only `User-Agent`.

Add it to FormIt `&preHooks`. A direct `[[!crawlerDetectBlock]]` call returns `"1"` / `"0"`, same as `isCrawler`.

If the service is unavailable, the hook returns `true` and the form is sent.

List other preHooks comma-separated: `crawlerDetectBlock,otherHook`.

## How it works

1. User submits the form.
2. FormIt runs preHook `crawlerDetectBlock` **before** validation and send.
3. If bot, the hook returns `false`, writes `fi.validation_error_message` and `$hook->addError('crawlerdetect', …)`.
4. If human, the hook returns `true`.

## Block message

Text is set in **System settings** → `crawlerdetect_block_message`. Transport default is the Russian string «Не удалось отправить форму. Попробуйте позже.»

Output the FormIt placeholder in the form template:

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
{$modx->getPlaceholder('fi.validation_error_message')}
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

CrawlerDetect is first in the list and blocks bots before CAPTCHA.

## Compatibility

- **FetchIt.** If FetchIt posts to a page with FormIt, add `crawlerDetectBlock` to FormIt preHooks on that page. When a bot is blocked FetchIt gets an error response and shows the message from CrawlerDetect settings.
- **SendIt.** FormIt parameters are in presets (file from `si_path_to_presets`). Add `'preHooks' => 'crawlerDetectBlock'` to the preset. When a bot is blocked SendIt returns an error and shows the message from CrawlerDetect settings. See [Integration → SendIt](../integration#ajax-form-sendit).
- **AjaxForm.** If AjaxForm calls FormIt on the server, add `crawlerDetectBlock` to FormIt preHooks.
