---
title: Redirect to another page
description: Redirect to a "Thank you" or order page after a successful FetchIt form submission
---

# Redirect to another page

After the submission the visitor is often taken to a separate page: "Thank you for your request", the order page, the account area. The address can be set in the form markup or returned by the processing snippet.

## Address in the markup

Suits FormIt: there is one "Thank you" page, and it is known in advance.

::: code-group

```modx
<form action="[[~[[*id]]]]" method="post" data-redirect="[[~15]]">
```

```fenom
<form action="{$_modx->resource.id | url}" method="post" data-redirect="{15 | url}">
```

:::

`15` is the ID of the page the form leads to.

## Address from the snippet

If the address depends on the data — on the number of the created order, for example — [your own snippet](/en/components/fetchit/snippets/custom) returns it in the second argument of `success()`:

```php
<?php
/** @var modX $modx */
/** @var array $fields */
$FetchIt = FetchIt::service($modx);

if (empty($fields)) {
    return '';
}

// ... check the fields and create the request
$orderId = 42;

return $FetchIt->success('The request has been accepted', [
    'redirect' => $modx->makeUrl(15, '', ['order' => $orderId], 'full'),
]);
```

## Script

One handler for both options: the address from the answer takes precedence over the address from the markup.

```js
document.addEventListener('fetchit:success', ({ detail: { form, response } }) => {
  const url = response.data.redirect || form.dataset.redirect
  if (url) {
    window.location.assign(url)
  }
})
```

The visitor will most likely not notice the success notification on the original page: the page changes at once. If they need to read it, delay the redirect:

```js
setTimeout(() => window.location.assign(url), 1500)
```
