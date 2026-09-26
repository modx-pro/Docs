---
title: Custom snippet handling
description: A custom snippet instead of FormIt, the success/message/data JSON answer and FetchIt::service()
---

# Custom snippet handling

Instead of FormIt you can name your own snippet in the `snippet` property. It gets the fields of the form and has to return JSON with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `success` | `bool` | Accepted or refused |
| `message` | `string` | Text for the notification and for the `[data-success]` / `[data-validation-error]` blocks |
| `data` | `object` | On an error: field name → error text (for `[data-error]` and the invalid classes). On success: any data for your own code, such as the address for a [redirect](/en/components/fetchit/examples/scenarios/redirect) |

The `error()` and `success()` methods of the service build that answer for you. Get the service itself with `FetchIt::service()` — it works on MODX 2 and MODX 3 alike:

```php
<?php
/** @var modX $modx */
/** @var array $fields */
$FetchIt = FetchIt::service($modx);

if (empty($fields)) {
    // Output of the form, not a submission: the snippet runs on every output.
    return '';
}

$name = trim((string) ($fields['name'] ?? ''));
if ($name === '') {
    return $FetchIt->error('There are errors in the form', [
        'name' => 'Enter your name',
    ]);
}

// ... save, send an e-mail
return $FetchIt->success('The form has been accepted');
```

::: warning
The `empty($fields)` check is required: the snippet also runs on every output of the form, with an empty `$fields`. Without it the snippet would, for example, send an empty e-mail on every page view.
:::

You can also return an array with the same keys yourself.

## The call

::: code-group

```modx
[[!FetchIt?
  &snippet=`MySnippet`
  &form=`tpl.FetchIt.example`
]]
```

```fenom
{'!FetchIt' | snippet : [
  'snippet' => 'MySnippet',
  'form' => 'tpl.FetchIt.example',
]}
```

:::

## What the snippet gets

`$scriptProperties` holds the stored properties of the FetchIt call and a `fields` key — an associative array of the submitted fields:

- for a FetchIt submission that is `$_POST`, with the files in `$_FILES`;
- for a normal submission without JavaScript, `$_POST` only.

The service fields of the [protection](/en/components/fetchit/protection) are removed from `fields`. There are no GET values and no cookies in it: before FetchIt 4 the snippet got `$_REQUEST`.

Do not put PHP objects into the properties of the call: they are dropped before the properties are written to the session or the cache.

The client sends the context of the form page as `pageId` in the FormData.

## A submission without JavaScript

The answer of the snippet is not output on a normal submission: a message appears on the page only if the snippet sets the placeholders itself.

## The older ways to get the service

They work too, and return the same object:

```php
// the FetchIt 1.x way — works on MODX 2 and MODX 3
$FetchIt = $modx->getService('fetchit', 'FetchIt', MODX_CORE_PATH . 'components/fetchit/model/');

// the FetchIt 3.x way — MODX 3 only
$FetchIt = $modx->services->get('FetchIt');
```

In detail: [Upgrading to FetchIt 4](/en/components/fetchit/upgrade).
