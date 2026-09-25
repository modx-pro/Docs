---
title: FetchIt snippet
description: FetchIt snippet properties, FormIt, files, pageId and property sets
---

# FetchIt snippet

The snippet renders the form chunk, stores call parameters under an action key, and registers the front-end script. On submit, `action.php` loads those parameters, runs the checks of the [protection](/en/components/fetchit/protection) and calls the snippet from `snippet` (FormIt by default).

## Parameters

| Parameter | Default | Description |
| --- | --- | --- |
| `form` | `tpl.FetchIt.example` | Chunk with the form markup. With pdoTools it can be `@FILE`, `@INLINE` and Fenom |
| `snippet` | `FormIt` | Handler. You can use `FormIt@PropertySet` |
| `actionUrl` | `[[+assetsUrl]]action.php` | Connector URL |
| `clearFieldsOnSuccess` | `1` | Clear fields after a successful AJAX response |

All other parameters go to the named snippet. For FormIt that means the usual `hooks`, `validate`, `emailTo`, `validationErrorMessage`, `successMessage`, `placeholderPrefix`, and so on.

On AJAX, `successMessage` lands in the response `message` and in `[data-success]`.

## Example

::: code-group

```modx
[[!FetchIt?
  &form=`myForm.tpl`
  &hooks=`email`
  &emailSubject=`Email subject`
  &emailTo=`info@domain.com`
  &validate=`name:required,email:required`
  &validationErrorMessage=`The form contains errors!`
  &successMessage=`Message sent successfully!`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'form' => 'myForm.tpl',
  'hooks' => 'email',
  'emailSubject' => 'Email subject',
  'emailTo' => 'info@domain.com',
  'validate' => 'name:required,email:required',
  'validationErrorMessage' => 'The form contains errors!',
  'successMessage' => 'Message sent successfully!',
]}
```

:::

## FormIt and reCAPTCHA

FormIt errors `recaptcha`, `recaptchav2_error`, and `recaptchav3_error` collapse into one key `data.recaptcha` in the AJAX response. In markup use `data-error="recaptcha"`. After success the client calls `grecaptcha.reset()` if the widget is on the page.

::: warning
The reCAPTCHA of FormIt 5.2 gets its answer through `formit.js`, which is disabled in FetchIt forms together with FormIt's AJAX mode. For such forms turn the captcha on with the [`fetchit.captcha`](/en/components/fetchit/protection#captcha) setting.
:::

## FormIt and property sets

::: code-group

```modx
[[!FetchIt?
  &snippet=`FormIt@ContactForm`
  &form=`tpl.contact`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'snippet' => 'FormIt@ContactForm',
  'form' => 'tpl.contact',
]}
```

:::

Property set parameters merge with the call. Explicit FetchIt parameters win when building `$scriptProperties` for the snippet.

## Files and context

The client posts `FormData` (including files) to `actionUrl` with the `X-FetchIt-Action` header. The body also gets `pageId`: the resource ID where the snippet was called. The connector can switch the MODX context from that ID.

An empty POST to `action.php` without an action redirects to the site start page.

## Service fields

Right after the form tag the snippet adds the hidden fields of the [spam protection](/en/components/fetchit/protection): the token, a field for the solution when the proof of work is on, and the trap field. They are removed from `$_POST` before FormIt or your snippet, so they reach neither e-mails nor `fields`.

The snippet also adds `method="post"` and the `data-fetchit` attribute to the form when they are missing.

## Where action parameters live

The action key is an md5 of the call parameters. Properties go into `$_SESSION['FetchIt'][$action]` or cache `fetchit/props_*` for one hour. If front-end sessions are off or the cache is cleared aggressively, you can get `fetchit_err_action_nf`. Check sessions and cache TTL.

## Chunk without pdoTools

If pdoTools is installed, the chunk renders through it. Otherwise it uses `modX::getChunk`.
