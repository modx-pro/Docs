# Events

## System events

### SendIt events

---

#### OnGetFormParams - fired when building the parameter list; lets you fully override form send parameters; must return an array

Available parameters:

* **$formName** — form key from attribute **data-si-form**.
* **$presetName** — preset key from attribute **data-si-preset**.
* **$SendIt** — handler class instance.

::: details Plugin example

```php:line-numbers
switch ($modx->event->name){
  case 'OnGetFormParams':
    if ($presetName === 'test'){
      $SendIt->pluginParams['myparam'] = 123;
    }
    break;
}
```

:::

#### OnBeforeFileValidate - fired before validation of a file group starts

Available parameters:

* **$formName** — form key from attribute **data-si-form**.
* **$presetName** — preset key from attribute **data-si-preset**.
* **$SendIt** — handler class instance.
* **$filesData** — array of file information.
* **$totalCount** — number of files the user has already uploaded.

::: details Plugin example

```php:line-numbers
switch ($modx->event->name){
  case 'OnBeforeFileValidate':
    $SendIt->params['maxCount'] = 5;
    break;
}
```

:::

#### OnBeforeFileRemove - fired before an uploaded file is removed

Available parameters:

* **$path** — path to the file being removed.
* **$SendIt** — handler class instance.

::: details Plugin example

```php:line-numbers
switch ($modx->event->name){
  case 'OnBeforeFileRemove':
    $modx->log(\modX::LOG_LEVEL_INFO, 'Removing file: ' . $path);
    break;
}
```

:::

#### OnCheckPossibilityWork - fired after the standard check, before the result is applied; lets you change the check result

Available parameters:

* **$formName** — form or preset name.
* **$result** — result of the check.

::: details Plugin example

```php:line-numbers
// limit send rate per IP
switch($modx->event->name){
  case 'OnCheckPossibilityWork':
    $sessionManager = new \SendIt\Session\SessionManager($modx);
    if (!$session = $modx->getObject('siSession', [
      'session_id' => $_SERVER['REMOTE_ADDR'],
      'class_name' => $formName
    ])) {
      $sessionManager->set(['send' => 1], $_SERVER['REMOTE_ADDR'], $formName);
      $modx->event->returnedValues['result']['success'] = 1;
    } else{
      $createdon = strtotime($session->get('createdon')) + 360;
      if ($createdon > time()) {
        $modx->event->returnedValues['result'] = [
          'success' => 0,
          'message' => 'You cannot submit this form yet.',
          'data' => []
        ];
      } else{
        $modx->event->returnedValues['result']['success'] = 1;
        $sessionManager->set(['send' => 1], $_SERVER['REMOTE_ADDR'], $formName);
      }
    }
    break;
}
```

:::

#### OnBeforePageRender - fired before the hash is checked and the snippet render is called

Available parameters:

* **$formName** — form key from attribute **data-si-form**.
* **$presetName** — preset key from attribute **data-si-preset**.
* **$SendIt** — handler class instance.

::: details Plugin example

```php:line-numbers
switch ($modx->event->name){
  case 'OnBeforePageRender':
    if ($_REQUEST['query']){
      $SendIt->params['where']['pagetitle:LIKE'] = '%' . $_REQUEST['query'] . '%';
      $SendIt->params['query'] = $_REQUEST['query'];
    }
    break;
}
```

:::

#### OnBeforeReturnResponse - fired before the response is sent to the frontend, regardless of which snippet you use

Available parameters:

* **$formName** — form key from attribute **data-si-form**.
* **$presetName** — preset key from attribute **data-si-preset**.
* **$SendIt** — handler class instance.

::: details Plugin example

```php:line-numbers
switch ($modx->event->name){
  case 'OnBeforeReturnResponse':
    if ($_POST['email'] && in_array($presetName, ['auth', 'register'])){
      // MODX 2: $modx->getObject('modUser', ['username' => $_POST['email']])
      $user = $modx->getObject(\MODX\Revolution\modUser::class, ['username' => $_POST['email']]);
      if ($user && !$user->isMember('Designers')) {
        $SendIt->params['redirectUrl'] = $modx->makeUrl(54750, '', '', 'full');
      }
    }
    break;
}
```

:::

#### senditOnGetWebConfig - fired when building the frontend configuration

Available parameters:

* **$webConfig** — configuration parameter array, including `protectionMap` — the antispam protection map per preset (since 3.1.0).
* **$object** — SendIt class instance.

::: details Plugin example

```php:line-numbers
switch ($modx->event->name){
  case 'senditOnGetWebConfig':
    $object->webConfig['myparam'] = 'test';
    break;
}
```

:::

::: tip
Since 3.1.0 `webConfig` contains the `protectionMap` key — an array with the protection settings for each preset.
You can change the protection map in this event, for example disable PoW for specific presets:

```php:line-numbers
switch ($modx->event->name){
  case 'senditOnGetWebConfig':
    // Disable PoW for preset 'feedback'
    if (isset($object->webConfig['protectionMap']['feedback'])) {
        $object->webConfig['protectionMap']['feedback']['pow'] = false;
    }
    break;
}
```

:::

#### senditOnSetValue - fired before a new value is assigned to a key in $_POST

Available parameters:

* **$key** — field name.
* **$value** — original value.
* **$SendIt** — SendIt class instance.

::: details Plugin example

```php:line-numbers
switch ($modx->event->name){
  case 'senditOnSetValue':
    // set original value without any checks
    $SendIt->newValue = $value;
    break;
}
```

:::

### Identification events

---

#### siOnUserUpdate - fired after user data is updated from the frontend

Available parameters:

* **$user** — modUser object.
* **$profile** — modUserProfile object.
* **$data** — array of values sent from the frontend.

::: details Plugin example

```php:line-numbers
switch ($modx->event->name){
  case 'siOnUserUpdate':

    break;
}
```

:::

#### OnWebLogin - fired when the user logs in from the frontend

Available parameters:

* **$user** — modUser object.
* **$attributes** — **rememberme** parameter.
* **$lifetime** — session storage time.
* **$loginContext** — context the user is logging into.
* **$addContexts** — list of additional contexts for login.
* **$session_id** — session ID.

::: details Plugin example

```php:line-numbers
switch ($modx->event->name){
  case 'OnWebLogin':

    break;
}
```

:::

#### OnUserActivate - fired when the user is activated from the frontend

Available parameters:

* **$user** — modUser object.
* **$profile** — modUserProfile object.
* **$data** — array of values sent from the frontend.

::: details Plugin example

```php:line-numbers
switch ($modx->event->name){
  case 'OnUserActivate':

    break;
}
```

:::

## JavaScript events

### SendIt events

---

#### si:init - component initialization

Fired after all modules listed in the JS config are loaded. Has no parameters. Cannot be cancelled. Subscribe to this event so you can use all modules without issues, since the **SendIt** object and its children are available only after it fires.
::: details Example

```js:line-numbers
document.addEventListener('si:init', (e) => {
  console.log(SendIt);
});
```

:::

### Sending events

---

#### si:send:before - before send

Fired before data is sent to the server. Can be cancelled, which will stop further execution.

::: details Parameters

* **target** — can be the form, a field, a button, or the document.
* **action** — action name, used to tell different logic apart (e.g. run something only on form send, not on file upload); do not change; possible values:
  * *send* — sending data;
  * *validate_files* — file validation;
  * *removeFile* — removing a file;
* **fetchOptions** — request options (url, method, body); you can change, remove (with care), or add your own.
* **headers** — request headers; you can change, remove (with care), or add your own.
* **Sending** — instance of the *Sending* class for quick access to its methods and properties.
:::

::: details Example

```js:line-numbers
document.addEventListener('si:send:before', (e) => {
  const {action, target, fetchOptions, headers, Sending} = e.detail;

  // skip confirmation code until phone length >= 11
  if (target.name === 'phone' && target.value.length < 11){
    e.preventDefault();
  }
})
```

:::

#### si:send:after - after response received

Fired right after the server response is received and parsed as JSON. Can be cancelled, which will stop further execution, i.e. the **success()** and **error()** methods will not run.

::: details Parameters

* **target** — can be the form, a field, a button, or the document.
* **action** — action name (same as in si:send:before): *send*, *validate_files*, *removeFile*.
* **result** — server response as JSON.
* **headers** — request headers; you can change, remove (with care), or add your own.
* **Sending** — instance of the *Sending* class for quick access to its methods and properties.
:::

::: details Example

```js:line-numbers
document.addEventListener('si:send:after', (e) => {
    const {action, target, result, headers, Sending} = e.detail;

    SendIt.Notify.info('Server response received.');
})
```

:::

#### si:send:success - successful response handling

Fired when a successful response is received from the server and before the **success()** handler runs. Can be cancelled, which will stop further execution.

::: details Parameters

* **target** — can be the form, a field, a button, or the document.
* **action** — action name: *send*, *validate_files*, *removeFile*.
* **result** — server response as JSON.
* **headers** — request headers; you can change, remove (with care), or add your own.
* **Sending** — instance of the *Sending* class for quick access to its methods and properties.
:::

::: details Example

```js:line-numbers
document.addEventListener('si:send:success', (e) => {
    const {action, target, result, headers, Sending} = e.detail;

    Sending.success = (result, target) => {
        SendIt.Notify.success('Data sent. Thank you!');
    }
})
```

:::

#### si:send:error - error handling

Fired when the server returns an error response, before the **error()** handler runs. Can be cancelled, which will stop further execution.

::: details Parameters

* **target** — can be the form, a field, a button, or the document.
* **action** — action name: *send*, *validate_files*, *removeFile*.
* **result** — server response as JSON.
* **headers** — request headers; you can change, remove (with care), or add your own.
* **Sending** — instance of the *Sending* class for quick access to its methods and properties.
:::

::: details Example

```js:line-numbers
document.addEventListener('si:send:error', (e) => {
    const {action, target, result, headers, Sending} = e.detail;

    Sending.error = (result, target) => {
        SendIt.Notify.error('Data not sent. Fix errors!');
    }
})
```

:::

#### si:send:finish - send complete

Fired when the server response has been received and after the **success()** and **error()** handlers have run. Cannot be cancelled.

::: details Parameters

* **target** — can be the form, a field, a button, or the document.
* **action** — action name: *send*, *validate_files*, *removeFile*.
* **result** — server response as JSON.
* **headers** — request headers.
* **Sending** — instance of the *Sending* class for quick access to its methods and properties.
:::

::: details Example

```js:line-numbers
document.addEventListener('si:send:finish', (e) => {
    const {action, target, result, headers, Sending} = e.detail;

    console.log(result.data);
})
```

:::

#### si:send:reset - form reset

Fired at the end of **success()** when **clearFieldsOnSuccess** is set, or when a **type="reset"** button is clicked. Can be cancelled.

::: details Parameters

* **target** — the form or element that triggered the reset.
* **Sending** — instance of the *Sending* class.
:::

::: details Example

```js:line-numbers
document.addEventListener('si:send:reset', (e) => {
    const {target, Sending} = e.detail;

    e.preventDefault();
})
```

:::

#### si:send:reset:after - after form reset

Fired AFTER the form has been reset (after `target.reset()` is called or the field value is cleared). Can be cancelled.

::: details Parameters

* **target** — can be the form or the field.
* **Sending** — instance of the *Sending* class for quick access to its methods and properties.
:::

::: details Example

```js:line-numbers
document.addEventListener('si:send:reset:after', (e) => {
    const {target, Sending} = e.detail;

    target.querySelector('[name="phone"]')?.focus();
})
```

:::

### Quiz events

---

#### si:quiz:init - quiz initialization

Fired when each quiz form is initialized, BEFORE the form is reset and the progress bar is set up. Cannot be cancelled.

::: details Parameters

* **items** — array of step elements.
* **root** — form element.
* **currentIndex** — index of the current step (from cookie or 1 by default).
* **Quiz** — instance of the *Quiz* class for quick access to its methods and properties.
:::

::: details Example

```js:line-numbers
document.addEventListener('si:quiz:init', (e) => {
    const {items, root, currentIndex, Quiz} = e.detail;

    items.forEach((item, i) => {
        item.dataset.stepNumber = i + 1;
    });
})
```

:::

#### si:quiz:change - quiz step change

Fired BEFORE the step changes. Can be cancelled, which will stop further execution.

::: details Parameters

* **isTrusted** — whether the switch was automatic or manual.
* **btnReset** — form reset button element.
* **btnSend** — form submit button element.
* **btnNext** — next step button element.
* **btnPrev** — previous step button element.
* **root** — form element.
* **nextIndex** — id of the step that will become visible (value of **data-qf-item**).
* **items** — array of step elements.
* **current** — currently visible step element.
* **currentQuestion** — element that displays the current step number.
* **totalQuestions** — element that displays the total number of steps.
* **prevIndex** — id of the currently visible step that will become the previous one after the switch.
* **nextItem** — step element that will become visible after the switch.
* **dir** — direction of the switch (*prev* — back, *next* — forward).
* **Quiz** — instance of the *Quiz* class for quick access to its methods and properties.
:::

::: details Example

```js:line-numbers
document.addEventListener('si:quiz:change', (e) => {
    const {root, nextIndex, items, current, currentQuestion, totalQuestions, prevIndex, nextItem, dir, Quiz} = e.detail;

    const phoneField = current.querySelector('[name="phone"]');
    if(phoneField && phoneField.value){
        const pattern = new RegExp(/^\+7\(\d{3}\)\d{3}\-\d{2}\-\d{2}$/g);
        if(!pattern.test(phoneField.value)){
            SendIt.Notify.error('Enter phone as +7(999)999-99-99');
            e.preventDefault();
        }
    }
})
```

:::

#### si:quiz:progress - quiz progress percent change

Fired AFTER the progress percent has been set. Cannot be cancelled.

::: details Parameters

* **items** — array of step elements.
* **progressValue** — progress bar DOM element.
* **progress** — progress bar wrapper DOM element.
* **itemsComplete** — array of completed step elements.
* **total** — total number of steps.
* **root** — form element.
* **complete** — number of completed questions.
* **percent** — percent of completed questions.
* **Quiz** — instance of the *Quiz* class for quick access to its methods and properties.
:::

::: details Example

```js:line-numbers
document.addEventListener('si:quiz:progress', (e) => {
    const {root, progressValue, items, progress, itemsComplete, total, percent, Quiz} = e.detail;
})
```

:::

#### si:quiz:reset - quiz reset to start

Fired when the quiz is reset. The event cannot prevent the reset.

::: details Parameters

* **items** — array of step elements.
* **btns** — list of button elements.
* **progress** — progress indicator element.
* **currentQuestion** — current question number element.
* **totalQuestions** — total questions element.
* **root** — root form element.
* **finishItem** — last step element.
* **pages** — wrapper element for step count display.
* **Quiz** — instance of the *Quiz* class for quick access to its methods and properties.
:::

::: details Example

```js:line-numbers
document.addEventListener('si:quiz:reset', (e) => {
    const {items, btns, progress, currentQuestion, totalQuestions, root, finishItem, pages, Quiz} = e.detail;

    const steps = root.querySelectorAll('[data-qf-step]');
    steps.length && steps.forEach(el => {
        el.classList.remove('complete');
        el.classList[el.dataset.qfStep !== '1' ? 'remove' : 'add']('active');
    })
})
```

:::

### Notify events

---

#### si:notify:before - before notification is shown

Fired AFTER notification parameters are built but BEFORE it is displayed. Cannot be cancelled.

::: details Parameters

* **options** — notification options object (`type`, `title`, `upd` and options from `handlerOptions`).
* **Notify** — instance of the *Notify* class for quick access to its methods and properties.
:::

::: details Example

```js:line-numbers
document.addEventListener('si:notify:before', (e) => {
    const {options, Notify} = e.detail;

    if (options.type === 'error') {
        options.position = 'bottomCenter';
    }
})
```

:::

### Fileuploader events

---

#### fu:uploading:start - before file upload starts

Fired before file upload starts.

::: details Parameters

* **form** — form element.
* **field** — upload field element.
* **root** — wrapper element for the upload field.
* **files** — list of files to upload (FileList object).
* **FileUploader** — instance of the *FileUploader* class for quick access to its methods and properties.
:::

::: details Example

```js:line-numbers
document.addEventListener('fu:uploading:start', (e) => {
    const {root, form, field, files, FileUploader} = e.detail;
})
```

:::

#### fu:uploading:end - after all files uploaded

Fired after all files have finished uploading.

::: details Parameters

* **form** — form element.
* **field** — upload field element.
* **root** — wrapper element for the upload field.
* **files** — list of files that were uploaded (FileList object).
* **FileUploader** — instance of the *FileUploader* class for quick access to its methods and properties.
:::

::: details Example

```js:line-numbers
document.addEventListener('fu:uploading:end', (e) => {
    const {root, form, field, files, FileUploader} = e.detail;
})
```

:::

#### fu:uploading:remove - after file preview removed

Fired after a file preview has been removed.

::: details Parameters

* **path** — path of the removed file.
* **root** — wrapper element.
* **preview** — preview element that was removed.
* **FileUploader** — instance of the *FileUploader* class.
:::

### SaveFormData events

---

#### sf:save - before saving to localStorage

Fired before data is saved to localStorage. Can be cancelled.

::: details Parameters

* **root** — form or container element.
* **field** — field that triggered the save (if any).
* **savedData** — object that will be saved; you can modify it.
* **SaveFormData** — instance of the *SaveFormData* class.
:::

::: details Example

```js:line-numbers
document.addEventListener('sf:save', (e) => {
    const {root, field, savedData, SaveFormData} = e.detail;

    if(field.name === 'phone' && field.value){
        const formatted = field.value.replace(/^\d(\d{3})(\d{3})(\d{2})(\d{2})$/, '8 ($1)$2-$3-$4');
        savedData.phone = field.value = formatted;
    }
})
```

:::

#### sf:set:before - before restoring saved data

Fired before saved data is applied to the form. Can be cancelled.

::: details Parameters

* **root** — form or container element.
* **formFields** — form field elements.
* **savedData** — saved data object being restored.
* **SaveFormData** — instance of the *SaveFormData* class.
:::

#### sf:change - after setting value in field

Fired after a value has been set in a field. Cannot be cancelled.

::: details Parameters

* **SaveFormData** — instance of the *SaveFormData* class.
:::

#### sf:set:after - after all saved data set

Fired after all saved data has been applied to the form. Cannot be cancelled.

::: details Parameters

* **root** — form or container element.
* **formFields** — form field elements.
* **savedData** — saved data object that was restored.
* **SaveFormData** — instance of the *SaveFormData* class.
:::

#### sf:remove - before clearing saved data

Fired before saved data for the form is cleared. Can be cancelled.

::: details Parameters

* **root** — form or container element.
* **formName** — form name (key) whose data is being cleared.
* **SaveFormData** — instance of the *SaveFormData* class.
:::

### Pagination events

---

#### pn:handle:before - before pagination output

Can be cancelled.

::: details Params

* **result**, **PaginationHandler**
:::

#### pn:handle:after - after pagination output

Cannot be cancelled.

::: details Params

* **result**, **PaginationHandler**
:::
