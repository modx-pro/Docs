---
title: Popover form
description: A FetchIt form in a pop-up block on the Popover API, without a modal and without JavaScript to open it
---

# Popover form

The [`popover`](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) attribute turns any block into a pop-up: a button opens it, and `Esc` or a click outside closes it — all without a line of JavaScript. Unlike [`<dialog>`](/en/components/fetchit/examples/modals/dialog), the page underneath stays usable, so a popover suits small forms: "Call me back" next to the phone number in the header, a newsletter sign-up, a quick question.

Popover works in all current browsers since 2024.

## Markup

::: code-group

```modx
<button type="button" popovertarget="callback">Call me back</button>

<div id="callback" class="popup" popover>
  <form action="[[~[[*id]]]]" method="post">
    <label> Phone
      <input type="tel" name="phone" value="[[+fi.phone]]" autocomplete="tel">
      <span data-error="phone">[[+fi.error.phone]]</span>
    </label>
    <div role="alert" data-validation-error style="display: none;"></div>
    <button type="submit">Call me</button>
    <button type="button" popovertarget="callback" popovertargetaction="hide">Cancel</button>
  </form>
</div>
```

```fenom
<button type="button" popovertarget="callback">Call me back</button>

<div id="callback" class="popup" popover>
  <form action="{$_modx->resource.id | url}" method="post">
    <label> Phone
      <input type="tel" name="phone" value="{$_modx->getPlaceholder('fi.phone')}" autocomplete="tel">
      <span data-error="phone">{$_modx->getPlaceholder('fi.error.phone')}</span>
    </label>
    <div role="alert" data-validation-error style="display: none;"></div>
    <button type="submit">Call me</button>
    <button type="button" popovertarget="callback" popovertargetaction="hide">Cancel</button>
  </form>
</div>
```

:::

A button with `popovertarget` opens and closes the block by itself. `popovertargetaction="hide"` turns a button into Cancel: it only closes.

## Script

JavaScript is needed only for what the browser does not know about FetchIt: closing the block after a success and resetting the form on close.

```js
// The form was accepted — close the block
document.addEventListener('fetchit:success', ({ detail: { form } }) => {
  form.closest('[popover]')?.hidePopover()
})

// The block was closed — reset the form. The toggle event does not bubble, so listen in the capture phase
document.addEventListener('toggle', ({ target, newState }) => {
  if (newState === 'closed' && target.matches?.('[popover]')) {
    target.querySelector('form[data-fetchit]')?.reset()
  }
}, true)
```

## Styling

By default the browser places the block in the centre of the screen. Under a button in the header it is usually placed by hand or with anchor positioning; here it simply goes to the top right corner:

```css
.popup {
  inset: 4.5rem 1rem auto auto;
  width: min(100% - 2rem, 22rem);
  margin: 0;
  padding: 1.25rem;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
  box-shadow: 0 1rem 2rem rgb(15 23 42 / 0.15);
}

.popup:popover-open {
  animation: popup-in 0.15s ease-out;
}

@keyframes popup-in {
  from {
    opacity: 0;
    transform: translateY(-0.5rem);
  }
}
```

::: tip
If the visitor must not use the page while the form is open, use [`<dialog>`](/en/components/fetchit/examples/modals/dialog): it is modal, popover is not.
:::
