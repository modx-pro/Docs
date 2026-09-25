---
title: Fancybox modals
description: A FetchIt form in a Fancybox pop-up
---

# Fancybox modals

[Fancybox](https://fancyapps.com/fancybox/) — a gallery and pop-ups. If the site already has Fancybox for photos, the request form can open in it too.

::: warning
Fancybox is distributed under a commercial licence. A production site needs a [paid licence](https://fancyapps.com/pricing/); the library is free only during development. If you have no licence, use a modal with [`<dialog>`](/en/components/fetchit/examples/modals/dialog) or [a11y-dialog](/en/components/fetchit/examples/modals/a11y-dialog).
:::

## Loading

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@6/dist/fancybox/fancybox.css">
<script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@6/dist/fancybox/fancybox.umd.js" defer></script>
```

## A form in a modal

The form sits hidden on the page, and Fancybox shows it when a button with `data-src` is clicked:

::: code-group

```modx
<button type="button" data-fancybox data-src="#callback">Request a call</button>

<div id="callback" class="callback-popup" style="display: none;">
  <h2>Request a call</h2>
  <form action="[[~[[*id]]]]" method="post">
    <label> Name
      <input type="text" name="name" value="[[+fi.name]]" autocomplete="name">
      <span data-error="name">[[+fi.error.name]]</span>
    </label>
    <label> Phone
      <input type="tel" name="phone" value="[[+fi.phone]]" autocomplete="tel">
      <span data-error="phone">[[+fi.error.phone]]</span>
    </label>
    <div role="alert" data-validation-error style="display: none;"></div>
    <button type="submit">Send</button>
  </form>
</div>
```

```fenom
<button type="button" data-fancybox data-src="#callback">Request a call</button>

<div id="callback" class="callback-popup" style="display: none;">
  <h2>Request a call</h2>
  <form action="{$_modx->resource.id | url}" method="post">
    <label> Name
      <input type="text" name="name" value="{$_modx->getPlaceholder('fi.name')}" autocomplete="name">
      <span data-error="name">{$_modx->getPlaceholder('fi.error.name')}</span>
    </label>
    <label> Phone
      <input type="tel" name="phone" value="{$_modx->getPlaceholder('fi.phone')}" autocomplete="tel">
      <span data-error="phone">{$_modx->getPlaceholder('fi.error.phone')}</span>
    </label>
    <div role="alert" data-validation-error style="display: none;"></div>
    <button type="submit">Send</button>
  </form>
</div>
```

:::

## Script

```js
document.addEventListener('DOMContentLoaded', () => {
  Fancybox.bind('[data-fancybox]', {
    on: {
      // The modal is closing — reset the form inside so it is clean next time
      close: (fancybox) => {
        fancybox.getSlide()?.el?.querySelector('form[data-fetchit]')?.reset()
      },
    },
  })
})

// The form was accepted — close the modal
document.addEventListener('fetchit:success', ({ detail: { form } }) => {
  if (form.closest('.fancybox__container')) {
    Fancybox.close()
  }
})
```

- While the modal is open, Fancybox moves the form into its own markup and puts it back on close. FetchIt keeps working with it as usual: the instance is bound to the form itself, not to its place on the page.
- The `.fancybox__container` check keeps the modal open when another form on the page is accepted while Fancybox is showing, say, a photo.
- Resetting the form removes the FetchIt errors and messages ([`fetchit:reset`](/en/components/fetchit/frontend/events#fetchitreset)).

## A modal with the answer

Fancybox can also show a ready element — pass it in `html`. Insert the text of the answer with `textContent`, not by joining strings: that way tags in the message do not become markup.

```js
document.addEventListener('fetchit:success', ({ detail: { response } }) => {
  const box = document.createElement('div')
  box.className = 'thanks-popup'
  box.innerHTML = '<h2>Thank you!</h2><p></p>'
  box.querySelector('p').textContent = FetchIt.sanitizeHTML(response.message)

  Fancybox.show([{ html: box }])
})
```

To keep the answer from being repeated in a notification, do not set `FetchIt.Message` and turn off the `fetchit.frontend.default.notifier` setting.
