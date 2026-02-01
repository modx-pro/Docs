# Sending data

**SendIt** sends on 4 JavaScript events: *submit* (default if **data-si-event** not set), *change*, *input*, *click*. All can be used in one form.

**Form example:**

```html:line-numbers
<form data-si-form="oneStepForm" data-si-preset="onestepform" data-si-event="submit" data-si-nosave>
    <label>
        <input type="text" name="name" placeholder="Full name">
        <p data-si-error="name"></p>
    </label>
    <label>
        <input type="text" name="email" placeholder="Email">
        <p data-si-error="email"></p>
    </label>
    <label>
        <input type="tel" name="phone" placeholder="+7(">
        <p data-si-error="phone"></p>
    </label>
    <label for="politics">
        <input type="checkbox" name="politics" id="politics">
        I agree!
    </label>
    <button type="submit">Submit</button>
</form>
```

## Attribute reference

* **data-si-preset** - preset name (optional).
* **data-si-event** - event that triggers send (optional).
* **data-si-nosave** - disable saving entered data (optional).
* **data-si-form** - form name; component uses this to work with form; enables [saving data](/en/components/sendit/saveformdata) and [admin params](/en/components/sendit/development).
* **data-si-error** - validated field name; element for error text (optional); if omitted, errors show via [notifications](/en/components/sendit/notify).

## Presets

Preset file path: **si_path_to_presets** system setting. Path relative to **MODX_BASE_PATH**. PHP file that returns array:

```php:line-numbers
return [
  'default' => [
    'validate' => 'phone:required,name:required,email:email:required,politics:checkbox:required',
  ]
]
```

::: info
Line 2 contains preset key for **data-si-preset** attribute.
:::

Component supports all **FormIt** params. Full list in [FormIt docs](https://docs.modx.com/current/en/extras/formit). There are also SendIt-specific params for features like registration. You can add custom params; they are available in handler and JavaScript.

```php:line-numbers
return [
  'default' => [
    'validate' => 'phone:required,name:required,email:email:required,politics:checkbox:required',
    'successMessage' => 'Submitted!',
  ],
  'onestepform' => [
    'extends' => 'default',
    'redirectTo' => 0,
    'redirectTimeout' => 3000,
    'clearFieldsOnSuccess' => 1,
    'fieldNames' => 'age==Age',
    'successMessage' => 'Form submitted!',
  ],
]
```

**onestepform** extends **default**; shared keys are overridden by **onestepform**. On success user sees "Form submitted!" not "Submitted!".

::: warning
Extends is recursive; if **default** extends **third**, **third** params are added to **onestepform**.
:::

Custom validators don't require manual `customValidators` param; it's auto-added from `validate`.

::: warning
**checkbox** validator has no snippet. It marks *politics* as **input[type="checkbox"]**. **:checkbox:required** makes **politics** required. No extra handling needed.
:::

## Send on "change" event

Apply to whole form, group of fields, or single field. To send only some fields, group them:

```html:line-numbers
<form>
  <input name="username">
  <div data-si-form data-si-preset="change_handler" data-si-event="change">
    <input name="code">
    <input name="phone">
  </div>
</form>
```

::: info
*code* and *phone* are sent when either changes.
:::

Single field:

```html:line-numbers
<form>
  <input name="username">
  <input name="code" data-si-form data-si-preset="change_handler" data-si-event="change">
  <input name="phone">
</form>
```

Whole form on any field change:

```html:line-numbers
<form data-si-form data-si-preset="change_handler" data-si-event="change">
  <input name="username">
  <input name="code">
  <input name="phone">
</form>
```

## Send on "input" event

Works like change; use **data-si-event="input"**. Useful for autocomplete: send as user types, search server-side, show suggestions. **SendIt** handles change tracking and send; you handle search and display.

## Send on "click" event

Example: verify phone by sending code. User enters phone → code sent → user enters code and clicks Confirm → verify → unlock Registration.

```html:line-numbers
<form data-si-form data-si-preset="register">
  <input name="phone" data-si-preset="send_code" data-si-event="change">
  <input name="code">
  <button type="button" data-si-preset="check_code" data-si-event="click">Confirm</button>
  <button type="submit" disabled>Register</button>
</form>
```

## Yandex Metrika goals

Set **si_send_goal** to *Yes*, **si_counter_id** to counter id, and pass `goalName` in preset.

::: warning
Goal type must be **JavaScript event**.
:::

::: info
Ensure Metrika script is installed on site.
:::

## Bot and external access protection

::: info
No built-in captcha; add your own via [Events](/en/components/sendit/events).
:::

Before send, `event.isTrusted` is checked (must be user-initiated, not `dispatchEvent()`). On any button click (configurable via `antiSpamEvent`), `event.isTrusted` is stored in cookie; if false, request is rejected (see *si_msg_antispam* in dictionary).

Each request is signed with a token (not full CSRF; lives until reload). Sufficient to deter spammers. For IP-based limits use a plugin (see [Events](/en/components/sendit/events)).

Settings for manual spam:

* **si_max_sending_per_session** - max sends per form without reload.
* **si_pause_between_sending** - pause between sends.

::: tip
Since 2.0.0: **pauseBetweenSending** and **sendingPerSession** in snippet call.
:::

::: warning
These apply only to forms with **FormItAutoResponder** or **email** hooks or **antispam** = 1.
:::

Use plugin on **OnCheckPossibilityWork** to exempt forms.

## Server response handling

Since 2.0.0: output received HTML. Set **resultBlockSelector** in preset (CSS selector for response block). **resultShowMethod**: **insert** (replace) or **append**. Response snippet must set **data.html** with HTML string.

## JavaScript config

::: details Default config

```js:line-numbers
export default function returnConfigs() {
  return {
    Sending: {
      pathToScripts: './modules/sending.js?v=3255345435',
      rootSelector: '[data-si-form]',
      rootKey: 'siForm',
      presetKey: 'siPreset',
      eventKey: 'siEvent',
      goalKey: 'siGoal',
      actionUrl: 'assets/components/sendit/action.php',
      antiSpamEvent: 'keydown',
      errorBlockSelector: '[data-si-error="${fieldName}"]',
      eventSelector: '[data-si-event="${eventName}"]',
      errorClass: 'si-error'
    },
  }
}
```

:::

| Key | Description | Value |
|:---:|:---:|:---:|
| `pathToScripts` | Path to module (relative to sendit.js) | ./modules/sending.js |
| `rootSelector` | Form selector | [data-si-form] |
| `rootKey` | Form name dataset key | siForm |
| `presetKey` | Preset dataset key | siPreset |
| `eventKey` | Send event dataset key | siEvent |
| `goalKey` | Goal names dataset key | siGoal |
| `actionUrl` | Connector path | assets/components/sendit/action.php |
| `antiSpamEvent` | Anti-spam event | keydown |
| `errorBlockSelector` | Error block selector | [data-si-error="${fieldName}"] |
| `eventSelector` | Send event selector | [data-si-event="${eventName}"] |
| `errorClass` | Error field class | si-error |
