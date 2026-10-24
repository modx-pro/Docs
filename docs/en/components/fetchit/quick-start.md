---
title: Quick start
description: The first FetchIt call with FormIt, a form chunk and error messages
---

# Quick start

Call the uncached **FetchIt** snippet and set the form chunk in `form`. By default the handler is FormIt: `hooks`, `validate`, `emailTo`, and the rest pass through unchanged.

::: warning
Put `!` before the snippet name, or the chunk and action land in the page cache.
:::

::: code-group

```modx
[[!FetchIt?
  &snippet=`FormIt`
  &form=`myForm.tpl`
  &hooks=`email`
  &emailSubject=`Email subject`
  &emailTo=`info@domain.com`
  &validate=`name:required,email:required`
  &validationErrorMessage=`The form contains errors!`
  &successMessage=`Message sent successfully`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'snippet' => 'FormIt',
  'form' => 'myForm.tpl',
  'hooks' => 'email',
  'emailSubject' => 'Email subject',
  'emailTo' => 'info@domain.com',
  'validate' => 'name:required,email:required',
  'validationErrorMessage' => 'The form contains errors!',
  'successMessage' => 'Message sent successfully',
]}
```

:::

`successMessage` goes into the AJAX response on FormIt success and shows in `[data-success]` and via `FetchIt.Message`.

## Form chunk

Minimum: `data-error` on field error containers (value = field `name`) and FormIt placeholders for values after a normal POST.

For AJAX add `[data-success]` and `[data-validation-error]` blocks. Without them, form-level success/error text will not appear on the client. Details: [Selectors](/en/components/fetchit/selectors).

::: code-group

```modx [myForm.tpl]
<form action="[[~[[*id]]]]" method="post">
  <label>
    Your name
    <input type="text" name="name" value="[[+fi.name]]">
    <span data-error="name">[[+fi.error.name]]</span>
  </label>

  <label>
    E-mail
    <input type="email" name="email" value="[[+fi.email]]">
    <span data-error="email">[[+fi.error.email]]</span>
  </label>

  <button type="submit">Submit</button>

  <div role="alert" data-success
        style="display: [[+fi.success:is=`1`:then=``:else=`none`]];">
    [[+fi.successMessage]]
  </div>
  <div role="alert" data-validation-error
        style="display: [[+fi.validation_error:is=`1`:then=``:else=`none`]];">
    [[+fi.validation_error_message]]
  </div>
</form>
```

```fenom [myForm.tpl]
<form action="{$_modx->resource.id | url}" method="post">
  <label>
    Your name
    <input type="text" name="name" value="{$_modx->getPlaceholder('fi.name')}">
    <span data-error="name">{$_modx->getPlaceholder('fi.error.name')}</span>
  </label>

  <label>
    E-mail
    <input type="email" name="email" value="{$_modx->getPlaceholder('fi.email')}">
    <span data-error="email">{$_modx->getPlaceholder('fi.error.email')}</span>
  </label>

  <button type="submit">Submit</button>

  <div role="alert" data-success
      style="display: {if $_modx->getPlaceholder('fi.success') == 1}{else}none{/if};">
    {$_modx->getPlaceholder('fi.successMessage')}
  </div>
  <div role="alert" data-validation-error
      style="display: {if $_modx->getPlaceholder('fi.validation_error') == 1}{else}none{/if};">
    {$_modx->getPlaceholder('fi.validation_error_message')}
  </div>
</form>
```

:::

The snippet sets `data-fetchit` and `method="post"` on the form itself, replacing any values of its own.

The default invalid field class is `is-invalid` (`fetchit.frontend.input.invalid.class`). Match it to your layout.

## Notifications

While `fetchit.frontend.default.notifier` is off, no notifications are shown: you only get the blocks in the form and the field errors. Turn the setting on to show the answers with the [built-in notifications](/en/components/fetchit/examples/notifications/#built-in-notifications), or wire your own library: [Notifications](/en/components/fetchit/examples/notifications/).

After success, fields clear unless you turn off `clearFieldsOnSuccess` (`1` by default).

## Spam protection

The form is closed to bots right away: a single-use token, a minimum fill time (3 seconds), a hidden trap field and a rate limit. There is nothing to configure, and the service fields never reach e-mails.

What is worth knowing about it:

- on a development site and in automated tests set `fetchit.protection.min_time` and `fetchit.protection.rate_limit` to `0`;
- pages with forms are better left out of a cache of the whole page, on the server or in a CDN;
- if spam still gets through, turn on the proof of work or a captcha.

In detail: [Spam protection](/en/components/fetchit/protection).
