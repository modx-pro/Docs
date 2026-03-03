---
title: SendIt
description: Component for working with forms on the site, similar to AjaxForm.
outline: [2,3]
lastUpdated: true
logo: https://sendit.art-sites.ru/assets/components/sendit/logo.jpg
modstore: https://modstore.pro/packages/users/sendit
repository: https://github.com/ShevArtV/sendit
author: ShevArtV
items: [
  { text: 'Getting started', link: 'index' },
  { text: 'Sending data', link: 'sending' },
  { text: 'Pagination', link: 'pagination' },
  { text: 'Identification', link: 'identification' },
  { text: 'Quiz forms', link: 'quizform' },
  { text: 'File upload', link: 'fileuploader' },
  { text: 'Saving form data', link: 'saveformdata' },
  { text: 'Notifications', link: 'notify' },
  { text: 'Snippets', link: 'snippets' },
  { text: 'Events', link: 'events' },
  { text: 'Development', link: 'development' },
]
dependencies: ['pdoTools', 'FormIt']
---

# SendIt

::: tip
The **pdoTools** component is only required for file-based snippets and the **Fenom** parser.
The component works without it.
:::

## Features

1. Send data to the server without reloading the page.
2. Upload files of any size and attach them to emails.
3. Create quiz forms (multi-step forms).
4. Save form data in localStorage and restore fields after reload.
5. Login, registration, password recovery and profile editing.
6. Output any data with pagination.

## Highlights

1. Uses cookie and localStorage.
2. No snippet call needed to submit the form.
3. Bot and external access protection.
4. Behaviour can be adjusted via events.
5. Submission can run on change, input and button click.
6. From 2.0.0, temporary data is stored in the **si_sessions** table.

## Basic usage

::: danger
Do not edit the preset file at *core/components/sendit/presets/sendit.inc.php*; changes will be overwritten on component update.

Create a copy in a directory of your choice and set its path in the **si_path_to_presets** system setting.
:::

The component sends arbitrary data to the server, passes it to a handler and returns a response.
The handler can be any snippet, e.g. *FormIt* (for email), or your own snippet.

To use **SendIt**, add a form or at least an input field with the required attributes (see [Sending data](https://docs.modx.pro/components/sendit/sending)):

```html:line-numbers
<textarea
  data-si-form
  data-si-preset="check_text"
  data-si-event="change" name="text"
></textarea>
```

When the value of **name="text"** changes, it is sent to the server and passed to the handler snippet defined in the preset under **check_text**.
::: tip
A preset is a set of snippet call parameters. **SendIt** does not require a snippet call in the template; presets are stored in a separate file, whose path is set in **si_path_to_presets**.
:::
For this example the preset might look like:

```php:line-numbers
return [
  'check_text' => [
    'snippet' => 'checkText'
  ]
];
```

::: tip
The **snippet** value can be '@FILE snippets/checktext.php' to use a file-based snippet.
:::

In the handler snippet you process the data and return a response:

```php:line-numbers
/*
  your code that processes $_POST
  and has access to preset parameters ($scriptProperties)
*/
$result = myFuntion($_POST, $scriptProperties);
$msg = $result['msg']; // message to show the user
$data = $result['data']; // data to return to the frontend
return $result['success'] ? $SendIt->success($msg, $data) : $SendIt->error($msg, $data);
```

## Preset advantages

1. Edit parameters in one file.
2. Parameter inheritance: shared parameters can go in a base preset and be extended with **extends**.
3. Easy to reuse across projects.

## Preset limitations

1. Placeholders and lexicon keys cannot be used (a [plugin](https://docs.modx.pro/components/sendit/events#pered-ustanovkoy-parametrov) can work around this).
2. Different workflow (the [RenderForm](https://docs.modx.pro/components/sendit/snippets) snippet can help).

## System settings

| Key | Description | Default |
|:---|:---|:---|
| **si_frontend_css** | Path to main CSS | `[[+assetsUrl]]components/sendit/web/css/index.min.css` |
| **si_frontend_js** | Path to main JS | `[[+assetsUrl]]components/sendit/web/js/sendit.js` |
| **si_js_config_path** | Path to JS config file | `./sendit.inc.js` |
| **si_uploaddir** | Upload directory | `/assets/components/sendit/uploaded_files/` |
| **si_path_to_presets** | Path to presets | `/core/components/sendit/presets/sendit.inc.php` |
| **si_send_goal** | Send goals to Yandex.Metrika | *No* |
| **si_counter_id** | Metrika counter ID | |
| **si_default_email** | Default email address for sending | |
| **si_default_admin** | Default administrator ID | |
| **si_default_emailtpl** | Default email chunk | `siDefaultEmail` |
| **si_max_sending_per_session** | Max form submissions per session | `2` |
| **si_pause_between_sending** | Pause between submissions of the same form (seconds) | `30` |
| **si_unset_params** | Params to omit from the response | `emailTo,extends` |
| **si_precision** | File upload progress percentage precision | `2` |
| **si_storage_time** | How long to keep uploaded files in temp folder (seconds) | `86400` |
| **si_allow_dirs** | Folder names from which other folders can be deleted | `uploaded_files` |

## Default parameters

To send data by email you do not need a preset; add **data-si-form** to the form.
A default parameter set will be used.
The recipient email is taken from **si_default_email**; if empty, **ms2_email_manager** is checked; if still empty, the administrator email (user ID **si_default_admin**) is used. If no email is found, only the **FormItSaveForm** hook is added. Form name, subject and user message come from the component lexicon.
The email chunk is set in system settings (**si_default_emailtpl**). The default parameters look roughly like:

```php
[
  'successMessage' => 'Form submitted!',
  'hooks' => 'email,FormItSaveForm',
  'emailTpl' => 'siDefaultEmail',
  'emailTo' => 'some@email.ru',
  'formName' => 'Default form',
  'emailSubject' => 'Message from domain.ru',
]
```

::: warning
The form must have a button with **type="submit"**.
:::
The form will be saved in the Manager and sent to the resolved email.

## JavaScript configuration

The component lets you override some JavaScript options.
::: details Default configuration

```js:line-numbers{3,22,29,47,76,89}
export default function returnConfigs() {
  return {
    PaginationFactory: {
      pathToScripts: './modules/paginationhandler.js',
      sendEvent: 'si:send:finish',
      rootSelector: '[data-pn-pagination]',
      firstPageBtnSelector: '[data-pn-first]',
      lastPageBtnSelector: '[data-pn-last]',
      lastPageKey: 'pnLast',
      prevPageBtnSelector: '[data-pn-prev]',
      nextPageBtnSelector: '[data-pn-next]',
      morePageBtnSelector: '[data-pn-more]',
      resultBlockSelector: '[data-pn-result="${key}"]',
      currentPageInputSelector: '[data-pn-current]',
      totalPagesSelector: '[data-pn-total]',
      limitSelector: '[data-pn-limit]',
      typeKey: 'pnType',
      hideClass: 'v_hidden',
      presetKey: 'siPreset',
      rootKey: 'pnPagination'
    },
    SaveFormData: {
      pathToScripts: './modules/saveformdata.js',
      rootSelector: '[data-si-form]',
      noSaveSelector: '[data-si-nosave]',
      rootKey: 'siForm',
      resetEvent: 'si:send:reset'
    },
    Notify: {
      pathToScripts: './modules/notify.js',
      jsPath: 'assets/components/sendit/js/web/lib/izitoast/iziToast.min.js',
      cssPath: 'assets/components/sendit/css/web/lib/izitoast/iziToast.min.css',
      handlerClassName: 'iziToast',
      toastSelector: '.iziToast',
      typeSelectors: {
        success: '.iziToast-color-green',
        info: '.iziToast-color-blue',
        error: '.iziToast-color-red',
        warning: '.iziToast-color-yellow',
      },
      titleSelector: '.iziToast-title',
      handlerOptions: {
        timeout: 2500,
        position: "topCenter"
      }
    },
    QuizForm: {
      pathToScripts: './modules/quizform.js',
      rootSelector: '[data-si-form]',
      rootKey: 'siForm',
      autoKey: 'qfAuto',
      itemSelector: '[data-qf-item]',
      itemKey: 'qfItem',
      itemCompleteSelector: '[data-qf-complete="1"]',
      itemCompleteKey: 'qfComplete',
      finishSelector: '[data-qf-finish]',
      itemCurrentSelector: '[data-qf-item="${currentIndex}"]',
      btnSelector: '[data-qf-btn]',
      btnKey: 'qfBtn',
      btnNextSelector: '[data-qf-btn="next"]',
      btnPrevSelector: '[data-qf-btn="prev"]',
      btnSendSelector: '[data-qf-btn="send"]',
      btnResetSelector: '[data-qf-btn="reset"]',
      nextIndexSelector: '[data-qf-next]',
      nextIndexKey: 'qfNext',
      progressSelector: '[data-qf-progress]',
      currentQuestionSelector: '[data-qf-page]',
      totalQuestionSelector: '[data-qf-total]',
      pagesSelector: '[data-qf-pages]',
      progressValueSelector: '[data-qf-progress-value]',
      activeClass: 'active',
      visabilityClass: 'v_hidden',
      disabledClass: 'disabled',
      sendEvent: 'si:send:finish',
    },
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
    FileUploaderFactory: {
      pathToScripts: './modules/fileuploader.js',
      formSelector: '[data-si-form]',
      progressSelector: '[data-fu-progress]',
      rootSelector: '[data-fu-wrap]',
      tplSelector: '[data-fu-tpl]',
      dropzoneSelector: '[data-fu-dropzone]',
      fileListSelector: '[data-fu-list]',
      progressIdAttr: 'data-fu-id',
      progressTextAttr: 'data-fu-text',
      hideBlockSelector: '[data-fu-hide]',
      presetSelector: '[data-si-preset]',
      presetKey: 'siPreset',
      sendEvent: 'si:send:after',
      pathKey: 'fuPath',
      pathAttr: 'data-fu-path',
      actionUrl: 'assets/components/sendit/action.php',
      hiddenClass: 'v_hidden',
      progressClass: 'progress__line',
      showTime: true
    }
  }
}
```

:::
The highlighted lines are the module names loaded when the component initializes. Remove a module's config to disable it.
You can also add your own modules via this config; they will be available on the global **SendIt** object. See the docs for each module:

* [**Sending**](https://docs.modx.pro/components/sendit/sending)
* [**QuizForm**](https://docs.modx.pro/components/sendit/quizform)
* [**FileUploader**](https://docs.modx.pro/components/sendit/fileuploader)
* [**SaveFormData**](https://docs.modx.pro/components/sendit/saveformdata)
* [**Notify**](https://docs.modx.pro/components/sendit/notify)
* [**Pagination**](https://docs.modx.pro/components/sendit/pagination)
