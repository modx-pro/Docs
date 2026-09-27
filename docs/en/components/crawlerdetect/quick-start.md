---
title: Quick start
---
# Quick start

In 2 minutes: protect a contact form from bots.

## Step 1: Open the page with the form

In the MODX editor open the page that shows a FormIt form.

## Step 2: Add preHook to the FormIt call

Add `crawlerDetectBlock` to **preHooks**.

::: code-group

```modx
[[!FormIt?
  &preHooks=`crawlerDetectBlock`
  &hooks=`email,redirect`
  &validate=`name:required,email:required:email`
  &redirectTo=`[[*id]]`
  &emailTo=`[[++emailsender]]`
  &emailSubject=`Contact form`
]]
[[+fi.validation_error_message]]
<form action="[[~[[*id]]]]" method="post">
  <input type="text" name="name" value="[[+fi.name]]" />
  <input type="email" name="email" value="[[+fi.email]]" />
  <button type="submit" name="submit">Submit</button>
</form>
```

```fenom
{$modx->runSnippet('FormIt', [
  'preHooks' => 'crawlerDetectBlock',
  'hooks' => 'email,redirect',
  'validate' => 'name:required,email:required:email',
  'redirectTo' => $modx->resource->id,
  'emailTo' => $modx->getOption('emailsender'),
  'emailSubject' => 'Contact form'
])}
{$modx->getPlaceholder('fi.validation_error_message')}
<form action="{$modx->makeUrl($modx->resource->id)}" method="post">
  <input type="text" name="name" value="{$modx->getPlaceholder('fi.name')}" />
  <input type="email" name="email" value="{$modx->getPlaceholder('fi.email')}" />
  <button type="submit" name="submit">Submit</button>
</form>
```

:::

The block message is shown via `[[+fi.validation_error_message]]` (MODX) or `{$modx->getPlaceholder('fi.validation_error_message')}` (Fenom). Set the text in [system settings](settings).

## Step 3: Save the page

The form is now protected from bots.

## What’s next

- [System settings](settings): block message text, logging
- [Snippets](snippets/): `isCrawler` and `crawlerDetectBlock`
- [Integration](integration): forms, hiding content, scenarios
- [Troubleshooting](troubleshooting): forms not blocked, message missing
