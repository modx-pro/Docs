# Sending data

**SendIt** can send data on 4 JavaScript events: *submit* (used when **data-si-event** is not set), *change*, *input*, and *click*.
All four can be used in a single form.
Each event is optional; omit **data-si-event** to use the default *submit*.

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

* **data-si-preset** — name of the parameter set (optional).
* **data-si-event** — name of the event that triggers send (optional).
* **data-si-nosave** — disables saving of entered data (optional).
* **data-si-form** — form name; the attribute is required so the component can work with the form; its value is used for [saving entered data](/en/components/sendit/saveformdata) and [editing parameters from the admin](/en/components/sendit/development).
* **data-si-error** — name of the validated field; points to the element where the error text will be shown (optional); if not set, errors are shown via [popup notifications](/en/components/sendit/notify).

## Presets

The path to the preset file is set in system setting **si_path_to_presets**. The path is relative to **core_path** (**MODX_CORE_PATH**).
The preset file is an includable PHP file that must return an array in this format.
Keys of the array are preset names; values are parameter sets.

```php:line-numbers
return [
  'default' => [
    'validate' => 'phone:required,name:required,email:email:required,politics:checkbox:required',
  ]
]
```

::: info
The highlighted line (no. 2) contains the preset key that you use in the **data-si-preset** attribute.
:::

The component supports all parameters available in **FormIt**. The full list is in the [FormIt documentation](https://docs.modx.com/current/en/extras/formit). There are also SendIt-specific parameters needed for certain features (e.g. registration). You can add custom parameters; they are available in the handler and in JavaScript.

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

In the example, preset **onestepform** has parameter `extends`, so it gets all parameters from **default**. If both presets have the same key, the value from **onestepform** wins — so on success the user sees ***Form submitted!*** instead of "Submitted!".

::: warning
Inheritance is recursive: if **default** extends **third**, **third** parameters are also added to **onestepform**.
:::

If you use custom validators, you do not need to add the `customValidators` parameter manually; it is added automatically from the data in `validate`.

::: warning
The **checkbox** validator is not implemented as a snippet and you do not need to create one. Its job is to mark the field named *politics* as **input[type="checkbox"]**. The combination **:checkbox:required** makes the **politics** field required. No extra steps (hidden fields, JS) are needed for checkbox validation.
:::

## Send on "change" event

You can trigger send on change for the whole form (all fields), for a group of fields, or for a single field.
If you do not need to send the entire form but only certain fields, group those fields as in the example below.

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
Fields *code* and *phone* are sent to the server when the user changes either of them.
:::

To send only one specific field on change, use:

```html:line-numbers
<form>
  <input name="username">
  <input name="code" data-si-form data-si-preset="change_handler" data-si-event="change">
  <input name="phone">
</form>
```

Finally, you can send the whole form when any of its fields changes:

```html:line-numbers
<form data-si-form data-si-preset="change_handler" data-si-event="change">
  <input name="username">
  <input name="code">
  <input name="phone">
</form>
```

## Send on "input" event

::: info
Sending on input works the same way as sending on change; use the attribute **data-si-event="input"**.
:::

When would you use it? Imagine the user must choose one option out of a thousand. A plain select is impractical. With **input** you can send data as the user types, run a search on the server over those values, and show suggestions. **SendIt** handles change tracking and sending; you implement the search and display of suggestions.

## Send on "click" event

To see how to use this, consider an example: you need to verify that the user’s phone number is real by sending them a code. You build a form like this:

```html:line-numbers
<form data-si-form data-si-preset="register">
  <input name="phone" data-si-preset="send_code" data-si-event="change">
  <input name="code">
  <button type="button"
  data-si-preset="check_code"
  data-si-event="click">Confirm</button>
  <button type="submit" disabled>Register</button>
</form>
```

It works as follows:

1. The user enters their phone; the data is sent to the *send_code* preset handler, which sends the code and stores it in the session.
2. The user receives the code, enters it in the field, and clicks *Confirm*; the data is sent again to the server, this time to the *check_code* handler.
3. If verification succeeds, you can enable the *Register* button and complete registration.

## Sending goals to Yandex.Metrika

To have **SendIt** send goals to Yandex.Metrika, set system setting **si_send_goal** to *Yes*.
Set the counter ID in **si_counter_id**.
In the preset pass parameter `goalName` with the goal name.

::: warning
The goal must be of type **JavaScript event**.
:::

::: info
Make sure the site has the current Metrika counter code installed.
:::

## Bot and external access protection

::: info
The component does not include a captcha; you can add your own using [Events](/en/components/sendit/events).
:::

As of 3.1.0 the component uses **three-level antispam** configured per preset.
You can enable one, two, or all three levels.
Disabled levels are not run and do not affect performance.

### 1. Proof of Work (PoW)

Before each send the browser must solve a small computational task: find a nonce such that the SHA-256 hash of the challenge plus the nonce has a given number of leading zero bits. Mass submissions by bots or scripts become impractical because every send requires this work.

**Preset parameters:**

| Parameter | Type | Default | Description |
|:---:|:---:|:---:|:---|
| `usePoW` | int | `0` | `1` — enable, `0` — disable |
| `powDifficulty` | int | `18` | Leading zero bits. Higher = slower. 18 ≈ 1–5 sec. |

**Flow:** The plugin generates a `challenge` on page load (stored in session and cookie `sipowchallenge`). Before send, the JavaScript module `ProofOfWork` finds the nonce. The nonce is sent as `_pow_nonce`. The server verifies the hash. A new challenge is generated after a successful send. If verification fails, the form is not submitted.

### 2. Behavior signature (BehaviorSign)

Behavior analysis result is encrypted on the client with **AES-128-GCM** and decrypted on the server, so the client cannot forge it. The server only trusts the decrypted payload.

**Preset parameters:**

| Parameter | Type | Default | Description |
|:---:|:---:|:---:|:---|
| `useBehaviorSign` | int | `0` | `1` — enable, `0` — disable |
| `maxBotScore` | int | `50` | Max allowed suspicion score (0–100) |
| `minFillTime` | int | `3` | Min form fill time in seconds |

**Server checks:** `isBot` must be `false`; `score` must not exceed `maxBotScore`; `powChallenge` must match the one issued; form fill time must be at least `minFillTime` seconds.

### 3. Behavior analysis (UserBehaviorTracker)

**UserBehaviorTracker** continuously analyzes behavior and computes a suspicion score (0–100). Metrics include signs of automation (webdriver, headless, small viewport), mouse movements, clicks, keystrokes, scrolling, and overall activity and form fill time. The module is configurable in JavaScript (see [Getting started](/en/components/sendit/index)). A high score or bot-like behavior can block the send even if PoW was solved.

### Configuring protection in preset

Protection is configured per preset. Use `extends` to inherit antispam settings from a base preset and override only what you need:

```php:line-numbers
return [
    'default' => [
        'validate' => 'name:required,email:email:required',
        'usePoW' => 1,
        'powDifficulty' => 18,
        'useBehaviorSign' => 1,
        'minFillTime' => 3,
    ],
    'simpleform' => [
        'extends' => 'default',
        'validate' => 'email:email:required,name:required',
    ],
    'search' => [
        'hooks' => '',
        'snippet' => 'searchSnippet',
        // no antispam for search
    ],
];
```

::: tip
Enable antispam for forms that send email or register users.
For search, pagination, or similar actions it is usually unnecessary and can be left off in a separate preset.
:::

If a preset has no `usePoW` or `useBehaviorSign`, the corresponding checks are skipped.
The **search** preset in the example above has no antispam so that autocomplete and search remain fast.
You can tune `powDifficulty` (e.g. 16–20) to balance security and user wait time.
Higher values make the client work longer before send.

::: warning
If `useBehaviorSign` is on but `usePoW` is off, challenge check in the signature is skipped. For strongest protection enable both.
:::

### Protection map (protectionMap)

The component builds a protection map from all presets and passes it to the frontend via `window.siConfig.protectionMap`.
The frontend uses it to decide which checks to run before sending.
Each preset key in the map holds the options (usePoW, useBehaviorSign, etc.) for that preset.
Presets with no antispam options are still listed; the frontend skips checks for them.

### External access protection

Each request is signed with a token (not a full CSRF token; it lives until page reload). This is usually enough to deter simple spam.

Additional settings: **si_max_sending_per_session** (max sends per form without reload), **si_pause_between_sending** (pause between sends). Since 2.0.0 you can use **pauseBetweenSending** and **sendingPerSession** in the snippet call. These apply only to forms with **FormItAutoResponder** or **email** hooks or **antispam** = 1. Use a plugin on **OnCheckPossibilityWork** to exempt forms.

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
