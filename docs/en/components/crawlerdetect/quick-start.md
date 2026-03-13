---
title: Quick start
---
# Quick start

In 2 minutes: protect a contact form from bots.

## Step 1: Open the page with the form

In the MODX editor open the page that shows the contact (or other FormIt) form.

## Step 2: Add preHook to the FormIt call

Find the FormIt call and add `crawlerDetectBlock` to **preHooks**.

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
{if $modx->getPlaceholder('fi.validation_error_message')}
  <div class="error">{$modx->getPlaceholder('fi.validation_error_message')}</div>
{/if}
<form action="{$modx->makeUrl($modx->resource->id)}" method="post">
  <input type="text" name="name" value="{$modx->getPlaceholder('fi.name')}" />
  <input type="email" name="email" value="{$modx->getPlaceholder('fi.email')}" />
  <button type="submit" name="submit">Submit</button>
</form>
```

:::

The block message is shown via placeholder `[[+fi.validation_error_message]]` (MODX) or `{$modx->getPlaceholder('fi.validation_error_message')}` (Fenom). Customize the text in [system settings](settings).

## Step 3: Save the page

The form is now protected from bots.

## What’s next

- [System settings](settings) — block message text, logging
- [Snippets](snippets/) — isCrawler and crawlerDetectBlock, parameters
- [Integration](integration) — form protection, hiding content, typical scenarios
- [Troubleshooting](troubleshooting) — if forms aren’t blocked or the message doesn’t show
