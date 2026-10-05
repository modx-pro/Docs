---
title: Goals in Yandex Metrika and Google Analytics
description: Sending Yandex Metrika, GA4, Google Tag Manager and VK Ads goals after a successful FetchIt form submission
---

# Goals in Yandex Metrika and Google Analytics

A goal counts when the server has accepted the form — on the [`fetchit:success`](/en/components/fetchit/frontend/events#fetchitsuccess) event. A click on the button does not fit: it also counts forms with errors and repeated presses.

## Goal name in the markup

It is easiest to keep the goal name in the form itself. Then one script serves all forms of the site, and a new form gets its goal without changes to the JavaScript:

```html
<form action="…" method="post" data-goal="callback">
```

A form without `data-goal` sends no goal.

## Script

```js
document.addEventListener('fetchit:success', ({ detail: { form } }) => {
  const goal = form.dataset.goal
  if (!goal) {
    return
  }

  // Yandex Metrika
  window.ym?.(12345678, 'reachGoal', goal)

  // Google Analytics 4
  window.gtag?.('event', 'generate_lead', { form_name: goal })

  // Google Tag Manager
  window.dataLayer?.push({ event: 'form_submit', form_name: goal })

  // VK Ads (Top.Mail.Ru pixel)
  window._tmr?.push({ type: 'reachGoal', id: 1234567, goal })
})
```

Replace the counter numbers with your own and keep only the systems installed on the site.

- Calls through `?.` do not fail when the counter is not on the page: for example, the visitor did not consent to analytics, and the cookie banner did not load it. The goal is then simply not sent.
- `generate_lead` is the GA4 [recommended event](https://support.google.com/analytics/answer/9267735) for leads. The form name goes in the `form_name` parameter, and reports can be split by it.
- In Google Tag Manager the `form_submit` event is caught by a "Custom Event" trigger, and `form_name` is read with a Data Layer Variable.

## Setting up the goal in Yandex Metrika

In the counter settings create a goal of the "JavaScript event" type with the identifier from `data-goal`, for example `callback`. To check that the goal arrives, add `?_ym_debug=1` to the page address: Metrika then writes each goal it sends to the browser console.

## Request parameters

Form data can be passed with the goal too — the chosen plan, for example. Do not send the name, phone and e-mail to analytics: these are personal data.

```js
document.addEventListener('fetchit:success', ({ detail: { form, formData } }) => {
  const goal = form.dataset.goal
  if (!goal) {
    return
  }

  window.ym?.(12345678, 'reachGoal', goal, {
    tariff: formData.get('tariff'),
  })
})
```
