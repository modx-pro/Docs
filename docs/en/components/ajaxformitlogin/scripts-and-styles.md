# Scripts and styles

::: info
**Styles** — The component does not ship its own styles except those bundled with the IziToast notification library.
:::

::: info
**JavaScript** — The component uses ES6 module format. Scripts load asynchronously and have minimal impact on page load. The module format allows you to customize the scripts. Below are ways to work with the component's JS.
:::

## Handling form submit results

Use the `afl_complete` event:

```js
document.addEventListener('afl_complete', e => {
  console.log(e.detail.response); // server response
  console.log(e.detail.form); // current form
});
```

`e.detail.response` contains: `success` (true/false); `message` — error or success message from snippet params `successMessage` or `validationErrorMessage` (unless overridden in hooks); `data` — server data, including `data.errors` (validation errors), `data.redirectUrl`, `data.redirectTimeout`; and any params you pass via `transmittedParams`. Set `data.redirectUrl` to null to cancel redirect. Set `e.detail.response.message` to null to suppress the default notification and show your own.

## Form initialization {#forms}

After all forms on the page are initialized, the `afl_init` event fires (no params). Example:

```js
document.addEventListener('afl_init', e => {
  console.log(window.aflForms); // all initialized forms
});
```

### File upload handling

By default one file is handled. Methods: `onUploadProgress`, `onUploadFinished`, `onUploadError`. Each receives the event object and the form. You can override them by extending the `AjaxFormitLogin` class and using a custom entry file instead of `assets/components/ajaxformitlogin/js/default.js`.

### Using IziToast

You do not have to use the package snippets, unlike AjaxForm. If your JS is in assets/js/add_scripts.js, add:

```js
import AflIziToast from './../components/ajaxformitlogin/js/modules/aflizitoast.class.js';

const Notify = new AflIziToast({
  "jsPath": "assets/components/ajaxformitlogin/js/lib/izitoast/iziToast.min.js",
  "cssPath": "assets/components/ajaxformitlogin/css/lib/izitoast/iziToast.min.css",
  "handlerClassName": "iziToast",
  "handlerOptions": {
    "timeout": 2000,
    "position": "topCenter"
  }
});

Notify.success('Success message!');
Notify.error('Error message.');
Notify.info('Info message.');
```

Use `type="module"` on the script tag.

## Custom notification library {#notify}

1. Create a JS class that extends `AflNotify`. See `assets/components/ajaxformitlogin/js/modules/aflizitoast.class.js` for an example.
2. Set system settings: `ajaxformitlogin_notify_classname` — your class name; `ajaxformitlogin_notify_classpath` — path to the class file relative to `assets/components/ajaxformitlogin/js/modules/ajaxformitlogin.class.js`.
3. Add your class options to `assets/components/ajaxformitlogin/js/message_settings.json`. Use an empty object if there are none.
