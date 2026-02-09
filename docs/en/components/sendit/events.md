# Events

## System events

### SendIt events

---

#### OnGetFormParams - fired when building param list; can fully override form send params; must return array

Params:

* **$formName** - form key from **data-si-form**.
* **$presetName** - preset key from **data-si-preset**.
* **$SendIt** - handler instance.

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

#### OnBeforeFileValidate - fired before file group validation

Params:

* **$formName** - form key from **data-si-form**.
* **$presetName** - preset key from **data-si-preset**.
* **$SendIt** - handler instance.
* **$filesData** - file info array.
* **$totalCount** - already uploaded file count.

::: details Plugin example

```php:line-numbers
switch ($modx->event->name){
  case 'OnBeforeFileValidate':
    $SendIt->params['maxCount'] = 5;
    break;
}
```

:::

#### OnCheckPossibilityWork - fired after standard check, before result check; can change results

Params:

* **$formName** - form or preset name.
* **$result** - check result.

::: details Plugin example

```php:line-numbers
// limit send rate per IP
switch($modx->event->name){
  case 'OnCheckPossibilityWork':
    if (!$session = $modx->getObject('siSession', [
      'session_id' => $_SERVER['REMOTE_ADDR'],
      'class_name' => $formName
    ])) {
      SendIt::setSession($modx, ['send' => 1], $_SERVER['REMOTE_ADDR'], $formName);
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
        SendIt::setSession($modx, ['send' => 1], $_SERVER['REMOTE_ADDR'], $formName);
      }
    }
    break;
}
```

:::

#### OnBeforePageRender - fired before hash check and snippet render

Params:

* **$formName** - form key from **data-si-form**.
* **$presetName** - preset key from **data-si-preset**.
* **$SendIt** - handler instance.

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

#### OnBeforeReturnResponse - fired before response to frontend, regardless of snippet

Params:

* **$formName** - form key from **data-si-form**.
* **$presetName** - preset key from **data-si-preset**.
* **$SendIt** - handler instance.

::: details Plugin example

```php:line-numbers
switch ($modx->event->name){
  case 'OnBeforeReturnResponse':
    if ($_POST['email'] && in_array($presetName, ['auth', 'register'])){
      $user = $modx->getObject('modUser', ['username' => $_POST['email']]);
      if ($user && !$user->isMember('Designers')) {
        $SendIt->params['redirectUrl'] = $modx->makeUrl(54750, '', '', 'full');
      }
    }
    break;
}
```

:::

#### senditOnGetWebConfig - fired when building frontend config

Params:

* **$webConfig** - config array.
* **$object** - SendIt instance.

::: details Plugin example

```php:line-numbers
switch ($modx->event->name){
  case 'senditOnGetWebConfig':
    $object->webConfig['myparam'] = 'test';
    break;
}
```

:::

#### senditOnSetValue - fired before assigning value to $_POST key

Params:

* **$key** - field name.
* **$value** - original value.
* **$SendIt** - SendIt instance.

::: details Plugin example

```php:line-numbers
switch ($modx->event->name){
  case 'senditOnSetValue':
    // set original value without checks
    $SendIt->newValue = $value;
    break;
}
```

:::

### Identification events

---

#### siOnUserUpdate - fired after user data update from frontend

Params:

* **$user** - modUser object.
* **$profile** - modUserProfile object.
* **$data** - data array from frontend.

::: details Plugin example

```php:line-numbers
switch ($modx->event->name){
  case 'siOnUserUpdate':

    break;
}
```

:::

#### OnWebLogin - fired on user login from frontend

Params:

* **$user** - modUser object.
* **$attributes** - **rememberme** param.
* **$lifetime** - session lifetime.
* **$loginContext** - login context.
* **$addContexts** - additional auth contexts.
* **$session_id** - session ID.

::: details Plugin example

```php:line-numbers
switch ($modx->event->name){
  case 'OnWebLogin':

    break;
}
```

:::

#### OnUserActivate - fired on user activation from frontend

Params:

* **$user** - modUser object.
* **$profile** - modUserProfile object.
* **$data** - data array from frontend.

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

#### si:init - component init

Fired after all modules from JS config are loaded. No params. Cannot be cancelled. Subscribe to this event to safely use all modules, as **SendIt** and its children are available after it fires.
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

Fired before sending data. Can be cancelled to abort.

::: details Params

* **target** - form, field, button or document.
* **action** - action name (*send*, *validate_files*, *removeFile*).
* **fetchOptions** - request params (url, method, body); can modify.
* **headers** - request headers; can modify.
* **Sending** - Sending class instance.
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

#### si:send:after - after response

Fired after server response parsed as JSON. Can be cancelled to abort **success()** and **error()**.

::: details Params

* **target**, **action**, **result**, **headers**, **Sending**
:::

::: details Example

```js:line-numbers
document.addEventListener('si:send:after', (e) => {
    const {action, target, result, headers, Sending} = e.detail;

    SendIt.Notify.info('Server response received.');
})
```

:::

#### si:send:success - success handler

Fired on success, before **success()** handler. Can be cancelled.

::: details Params

* **target**, **action**, **result**, **headers**, **Sending**
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

#### si:send:error - error handler

Fired on error, before **error()** handler. Can be cancelled.

::: details Params

* **target**, **action**, **result**, **headers**, **Sending**
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

Fired after **success()** and **error()**. Cannot be cancelled.

::: details Params

* **target**, **action**, **result**, **headers**, **Sending**
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

Fired at end of **success()** when **clearFieldsOnSuccess** set, or on **type="reset"** click. Can be cancelled.

::: details Params

* **target**, **Sending**
:::

::: details Example

```js:line-numbers
document.addEventListener('si:send:reset', (e) => {
    const {target, Sending} = e.detail;

    e.preventDefault();
})
```

:::

### Quiz events

---

#### si:quiz:change - quiz step change

Fired BEFORE step change. Can be cancelled.

::: details Params

* **isTrusted** - auto vs manual switch.
* **btnReset**, **btnSend**, **btnNext**, **btnPrev** - button elements.
* **root** - form element.
* **nextIndex** - target step id (**data-qf-item**).
* **items** - step elements.
* **current** - current visible step.
* **currentQuestion** - current step number display.
* **totalQuestions** - total steps display.
* **prevIndex**, **nextItem**, **dir** - direction (prev/next).
* **Quiz** - Quiz class instance.
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

#### si:quiz:progress - progress percent change

Fired AFTER progress percent is set. Cannot be cancelled.

::: details Params

* **items**, **progressValue**, **progress**, **itemsComplete**, **total**, **root**, **complete**, **percent**, **Quiz**
:::

#### si:quiz:reset - quiz reset

Fired on quiz reset. Cannot prevent reset.

::: details Params

* **items**, **btns**, **progress**, **currentQuestion**, **totalQuestions**, **root**, **finishItem**, **pages**, **Quiz**
:::

### Fileuploader events

---

#### fu:uploading:start - before file upload

::: details Params

* **form**, **field**, **root**, **files**, **FileUploader**
:::

#### fu:uploading:end - after all files uploaded

::: details Params

* **form**, **field**, **root**, **files**, **FileUploader**
:::

#### fu:uploading:remove - after preview removal

::: details Params

* **path**, **root**, **preview**, **FileUploader**
:::

### SaveFormData events

---

#### sf:save - before saving to localStorage

Can be cancelled.

::: details Params

* **root**, **field**, **savedData**, **SaveFormData**
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

Can be cancelled.

::: details Params

* **root**, **formFields**, **savedData**, **SaveFormData**
:::

#### sf:change - after setting value in field

Cannot be cancelled.

::: details Params

* **SaveFormData**
:::

#### sf:set:after - after all saved data set

Cannot be cancelled.

::: details Params

* **root**, **formFields**, **savedData**, **SaveFormData**
:::

#### sf:remove - before clearing saved data

Can be cancelled.

::: details Params

* **root**, **formName**, **SaveFormData**
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
