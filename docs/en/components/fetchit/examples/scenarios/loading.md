---
title: Submit indicator
description: A spinner on the button and a "Sending…" label while FetchIt sends the form
---

# Submit indicator

While the request is running, the visitor should see that the form is being sent. Otherwise they press the button again or leave the page.

## CSS only

For the time of the request FetchIt sets the `disabled` attribute on all fields and buttons of the form. That is enough for a spinner without a single line of JavaScript:

```css
form[data-fetchit] [type="submit"]:disabled {
  position: relative;
  color: transparent;
  cursor: progress;
}

form[data-fetchit] [type="submit"]:disabled::after {
  content: '';
  position: absolute;
  inset: 0;
  width: 1.25em;
  height: 1.25em;
  margin: auto;
  border: 2px solid var(--spinner-color, #fff);
  border-right-color: transparent;
  border-radius: 50%;
  animation: fetchit-spin 0.7s linear infinite;
}

@keyframes fetchit-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  form[data-fetchit] [type="submit"]:disabled::after {
    animation-duration: 2s;
  }
}
```

The snippet adds the `data-fetchit` attribute to each of its forms, so the rule does not touch other forms of the site. The `--spinner-color` variable sets the colour of the spinner — for a light button set a dark one.

::: tip
If the button is disabled in the markup, for example until the terms are accepted, the spinner spins on it too. For such a button use the option below: it depends on events, not on `disabled`.
:::

## Text on the button

Instead of a spinner you can change the label: "Send" → "Sending…". This is another option, not an addition: the CSS from the previous section makes the button text transparent, and the new label would not be visible. The text shown while sending is set with the `data-loading` attribute:

```html
<button type="submit" data-loading="Sending…">Send</button>
```

```js
document.addEventListener('fetchit:before', (e) => {
  if (e.defaultPrevented) {
    return
  }

  const { form } = e.detail
  form.setAttribute('aria-busy', 'true')

  const button = form.querySelector('[type="submit"][data-loading]')
  if (button) {
    button.dataset.text = button.textContent
    button.textContent = button.dataset.loading
  }
})

const done = ({ detail: { form } }) => {
  form.removeAttribute('aria-busy')

  const button = form.querySelector('[type="submit"][data-text]')
  if (button) {
    button.textContent = button.dataset.text
    delete button.dataset.text
  }
}

document.addEventListener('fetchit:success', done)
document.addEventListener('fetchit:error', done)
```

- `fetchit:error` also comes when the request did not reach the server, so the label comes back in any case.
- `aria-busy` tells screen readers that the form is busy. It is also handy for styling the form: `form[aria-busy="true"] { opacity: 0.7 }`.

## Why not FetchIt.Message.before

The [`FetchIt.Message.before`](/en/components/fetchit/frontend/class#fetchitmessage) hook looks like the right place for a spinner, but it is called before the `fetchit:before` event. If client-side [validation](/en/components/fetchit/examples/validation/) cancels the submission, there is no request and no `after` — the spinner keeps spinning.

In `fetchit:before` you can see whether someone cancelled the submission earlier: `e.defaultPrevented`. So load the indicator code after the validation code — then its decision is already known.
