---
title: Bootstrap modals
description: A FetchIt form in a Bootstrap Modal and a modal with the answer after sending
---

# Bootstrap modals

Cases with [Bootstrap Modal](https://getbootstrap.com/docs/5.3/components/modal/). In all the examples the modal is taken with `bootstrap.Modal.getOrCreateInstance()`: it returns the instance however the modal was opened — with a `data-bs-toggle` button or from JS.

## A form in a modal

The modal closes after a successful submission, and the next time it opens the form is clean — without the errors and messages from last time.

::: code-group

```modx
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#callback">
  Request a call
</button>

<div class="modal fade" id="callback" tabindex="-1" aria-labelledby="callback-title" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <form class="modal-content" action="[[~[[*id]]]]" method="post">
      <div class="modal-header">
        <h2 class="modal-title fs-5" id="callback-title">Request a call</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label for="callback-name" class="form-label">Name</label>
          <input type="text" class="form-control" id="callback-name" name="name" value="[[+fi.name]]">
          <div class="invalid-feedback" data-error="name">[[+fi.error.name]]</div>
        </div>
        <div class="mb-3">
          <label for="callback-phone" class="form-label">Phone</label>
          <input type="tel" class="form-control" id="callback-phone" name="phone" value="[[+fi.phone]]">
          <div class="invalid-feedback" data-error="phone">[[+fi.error.phone]]</div>
        </div>
        <div class="alert alert-danger mb-0" role="alert" data-validation-error style="display: none;"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="submit" class="btn btn-primary">Send</button>
      </div>
    </form>
  </div>
</div>
```

```fenom
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#callback">
  Request a call
</button>

<div class="modal fade" id="callback" tabindex="-1" aria-labelledby="callback-title" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <form class="modal-content" action="{$_modx->resource.id | url}" method="post">
      <div class="modal-header">
        <h2 class="modal-title fs-5" id="callback-title">Request a call</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label for="callback-name" class="form-label">Name</label>
          <input type="text" class="form-control" id="callback-name" name="name" value="{$_modx->getPlaceholder('fi.name')}">
          <div class="invalid-feedback" data-error="name">{$_modx->getPlaceholder('fi.error.name')}</div>
        </div>
        <div class="mb-3">
          <label for="callback-phone" class="form-label">Phone</label>
          <input type="tel" class="form-control" id="callback-phone" name="phone" value="{$_modx->getPlaceholder('fi.phone')}">
          <div class="invalid-feedback" data-error="phone">{$_modx->getPlaceholder('fi.error.phone')}</div>
        </div>
        <div class="alert alert-danger mb-0" role="alert" data-validation-error style="display: none;"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="submit" class="btn btn-primary">Send</button>
      </div>
    </form>
  </div>
</div>
```

:::

The `is-invalid` class that Bootstrap expects on an invalid field is set by FetchIt by default (the `fetchit.frontend.input.invalid.class` setting) — more in the [Bootstrap form](/en/components/fetchit/examples/form/bootstrap). There is no `[data-success]` block in the modal: it closes, and a notification reports the success — provided the [built-in notifications](/en/components/fetchit/examples/notifications/#built-in-notifications) are on (they are off by default) or a `FetchIt.Message` of your own is set.

```js
document.addEventListener('fetchit:success', ({ detail: { form } }) => {
  const modal = form.closest('.modal')
  if (modal) {
    bootstrap.Modal.getOrCreateInstance(modal).hide()
  }
})

// The modal was closed — clear the errors and the input, so the form is clean next time
document.addEventListener('hidden.bs.modal', ({ target }) => {
  target.querySelector('form[data-fetchit]')?.reset()
})
```

Resetting the form fires [`fetchit:reset`](/en/components/fetchit/frontend/events#fetchitreset): FetchIt removes the errors from the fields and hides the messages by itself.

## A modal with the answer

The form is on the page, and after a success a modal with the text of the answer opens:

```html
<div class="modal fade" id="thanks" tabindex="-1" aria-labelledby="thanks-title" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h2 class="modal-title fs-5" id="thanks-title">Thank you!</h2>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body"></div>
    </div>
  </div>
</div>
```

```js
document.addEventListener('fetchit:success', ({ detail: { response } }) => {
  const modal = document.getElementById('thanks')
  modal.querySelector('.modal-body').textContent = FetchIt.sanitizeHTML(response.message)
  bootstrap.Modal.getOrCreateInstance(modal).show()
})
```

`textContent` outputs the message as text, and `sanitizeHTML` strips tags from it if the lexicon has any. To keep the same message from being repeated in a notification, do not set `FetchIt.Message` and turn off the `fetchit.frontend.default.notifier` setting.
