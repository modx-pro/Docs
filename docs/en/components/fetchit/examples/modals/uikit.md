---
title: UIkit modals
description: A FetchIt form in a UIkit modal
---

# UIkit modals

If the site is built on [UIkit](https://getuikit.com/), its [Modal](https://getuikit.com/docs/modal) suits the form. The field markup is the same as in the [UIkit form](/en/components/fetchit/examples/form/uikit), which also says what class to put in the `fetchit.frontend.input.invalid.class` setting.

## A form in a modal

::: code-group

```modx
<button class="uk-button uk-button-primary" type="button" uk-toggle="target: #callback">Request a call</button>

<div id="callback" uk-modal>
  <div class="uk-modal-dialog uk-modal-body">
    <button class="uk-modal-close-default" type="button" uk-close aria-label="Close"></button>
    <h2 class="uk-modal-title">Request a call</h2>
    <form class="uk-form-stacked" action="[[~[[*id]]]]" method="post">
      <div class="uk-margin">
        <label class="uk-form-label" for="callback-name">Name</label>
        <input class="uk-input" id="callback-name" type="text" name="name" value="[[+fi.name]]">
        <span class="uk-text-danger" data-error="name">[[+fi.error.name]]</span>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label" for="callback-phone">Phone</label>
        <input class="uk-input" id="callback-phone" type="tel" name="phone" value="[[+fi.phone]]">
        <span class="uk-text-danger" data-error="phone">[[+fi.error.phone]]</span>
      </div>
      <div class="uk-alert-danger" role="alert" data-validation-error style="display: none;"></div>
      <p class="uk-text-right">
        <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
        <button class="uk-button uk-button-primary" type="submit">Send</button>
      </p>
    </form>
  </div>
</div>
```

```fenom
<button class="uk-button uk-button-primary" type="button" uk-toggle="target: #callback">Request a call</button>

<div id="callback" uk-modal>
  <div class="uk-modal-dialog uk-modal-body">
    <button class="uk-modal-close-default" type="button" uk-close aria-label="Close"></button>
    <h2 class="uk-modal-title">Request a call</h2>
    <form class="uk-form-stacked" action="{$_modx->resource.id | url}" method="post">
      <div class="uk-margin">
        <label class="uk-form-label" for="callback-name">Name</label>
        <input class="uk-input" id="callback-name" type="text" name="name" value="{$_modx->getPlaceholder('fi.name')}">
        <span class="uk-text-danger" data-error="name">{$_modx->getPlaceholder('fi.error.name')}</span>
      </div>
      <div class="uk-margin">
        <label class="uk-form-label" for="callback-phone">Phone</label>
        <input class="uk-input" id="callback-phone" type="tel" name="phone" value="{$_modx->getPlaceholder('fi.phone')}">
        <span class="uk-text-danger" data-error="phone">{$_modx->getPlaceholder('fi.error.phone')}</span>
      </div>
      <div class="uk-alert-danger" role="alert" data-validation-error style="display: none;"></div>
      <p class="uk-text-right">
        <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
        <button class="uk-button uk-button-primary" type="submit">Send</button>
      </p>
    </form>
  </div>
</div>
```

:::

## Script

```js
// The form was accepted — close the modal
document.addEventListener('fetchit:success', ({ detail: { form } }) => {
  const modal = form.closest('.uk-modal')
  if (modal) {
    UIkit.modal(modal).hide()
  }
})

// The modal was closed — reset the form so it is clean next time
document.addEventListener('hidden', ({ target }) => {
  if (target.matches?.('.uk-modal')) {
    target.querySelector('form[data-fetchit]')?.reset()
  }
})
```

UIkit sends the `hidden` event for other components too — dropdowns, accordions — so the handler checks that it is a modal that has closed.

## A modal with the answer

For a short answer the built-in UIkit dialog is enough:

```js
document.addEventListener('fetchit:success', ({ detail: { response } }) => {
  const text = FetchIt.sanitizeHTML(response.message).trim()
  if (text) {
    UIkit.modal.alert(text.replace(/&/g, '&amp;').replace(/</g, '&lt;'))
  }
})
```

`UIkit.modal.alert()` outputs the string as HTML, so the `&` and `<` characters in the text are escaped. To keep the answer from being repeated in a notification, do not set `FetchIt.Message` and turn off the `fetchit.frontend.default.notifier` setting.
