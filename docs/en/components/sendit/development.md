# Development

## Replace miniShop2 notifications

```js:line-numbers
document.addEventListener('si:init', (e) => {
    if(typeof miniShop2 !== 'undefined'){
        miniShop2.Message = SendIt.Notify;
    }
});
```

## Send request to custom connector

```js:line-numbers
document.addEventListener('si:init', (e) => {
    document.addEventListener('submit', (e) => {
        const target = e.target.closest('.js-my-form');
        if(!target) return;
        const params = new FormData(target);
        const url = 'assets/action.php';
        const headers = {};
        SendIt?.setComponentCookie('sitrusted', '1');
        SendIt.Sending.send(target, url, headers, params);
    })
});
```

::: warning
When sending to custom connector, protect the server from XSS and bots.
:::

## Send request to standard connector

```js:line-numbers
document.addEventListener('si:init', (e) => {
    document.addEventListener('submit', (e) => {
        const target = e.target.closest('.js-my-form');
        if(!target) return;
        const preset = target.dataset[Sendit.Sending.config.presetKey];
        SendIt.Sending.prepareSendParams(target, preset);
    })

});
```

::: tip
Preset key should be in **data-si-preset** attribute.
:::

## Send request WITHOUT form to standard connector

```js:line-numbers
document.addEventListener('si:init', (e) => {
    SendIt?.setComponentCookie('sitrusted', '1');
    SendIt?.Sending?.prepareSendParams(document, 'custom');
})
```

::: tip
`custom` is the preset key you added to the preset file.
:::

To limit bot activity, when receiving response (if sending on load), set `sitrusted` to 0:

```js:line-numbers
document.addEventListener('si:send:after', (e) => {
    const {action, target, result, headers, Sending} = e.detail;

    if(result.somedata){
        SendIt?.setComponentCookie('sitrusted', '0');
    }
})
```

## Custom snippet for data processing

::: tip
In your snippet preset params are available as variables; form data from $_POST, files from $_FILES.
:::

```php:line-numbers
if($flag){
    return $SendIt->success($successMessage, ['somedata' => 1234]);
}else{
    return $SendIt->error($validationErrorMessage, ['errors' => ['fieldName' => 'Error text here']]);
}
```

::: tip
Delegate field validation to **FormIt** by adding **validate** param to preset.
:::

## Change file validation params from JavaScript

Example: change max allowed file count for preset *upload_design* based on selected parent and size:

```js:line-numbers
document.addEventListener('si:send:before', (e) => {
    const {fetchOptions, headers} = e.detail;
    if (typeof fetchOptions.body.get === 'function') {
        switch (headers['X-SIPRESET']) {
            case 'upload_design':
                const parent = document.querySelector('[name="parent"]:checked');
                let count = 0;
                if (parent) {
                    const sizeSelect = document.querySelector(parent.dataset.sizeTarget);
                    count = sizeSelect.options[sizeSelect.selectedIndex].value;
                }
                fetchOptions.body.set('params', JSON.stringify({maxCount: count}));
            break;
        }
    }
})
```

## Create form management interface in admin

1. Install Migx.
2. Create **validators** configuration
   ::: details Import this

   ```json
   {
   "formtabs":[{"MIGX_id":405,"caption":"","print_before_tabs":"0","fields":[{"MIGX_id":2297,"field":"name","caption":"Name","inputOptionValues":"Required if==requiredIf||Password length==checkPassLength||Password confirm==passwordConfirm||User not exists==userNotExists||Blank check==blank||Required==required||Valid email==email||Min length==minLength||Max length==maxLength||Min value==minValue||Max value==maxValue||Contains string==contains||Strip string==strip||Strip HTML tags==stripTags||Allow tags==allowTags||Number check==isNumber||Allow special chars==allowSpecialChars||Date check==isDate||Regexp check==regexp","pos":1},{"MIGX_id":2298,"field":"params","caption":"Parameters","pos":2},{"MIGX_id":2311,"field":"error_text","caption":"Error text","pos":3}],"pos":1}],"columns":[{"header":"Name","dataIndex":"name"},{"header":"Parameters","dataIndex":"params"}]}
   ```

   :::
3. Create **formfield** configuration
   ::: details Import this

   ```json
   {"formtabs":[{"MIGX_id":406,"fields":[{"field":"name","caption":"Name","pos":1},{"field":"placeholder","caption":"Placeholder","pos":2},{"field":"type","caption":"Type","inputOptionValues":"Text==text||Phone==tel||Email==email||Password==password||Number==number||Checkbox==checkbox||Radio==radio||Hidden==hidden||File==file||Date==date||Date and time==datetime-local||Time==time||Range==range||Color==color||Textarea==textarea||Select==select","pos":3},{"field":"values","caption":"Possible values","description":"separator |","pos":4},{"field":"label","caption":"Label","pos":5},{"field":"step","caption":"Step","pos":6},{"field":"chunk","caption":"Chunk","pos":7},{"field":"atributes","caption":"Other attributes","pos":8},{"field":"validators","caption":"Validators","configs":"validators","pos":9}],"pos":1}],"columns":[{"header":"Name","dataIndex":"name"},{"header":"Label","dataIndex":"label"}]}
   ```

   :::
4. Create **list_double** configuration
   ::: details Import this

   ```json
   {"formtabs":[{"fields":[{"field":"title","caption":"Title","pos":1},{"field":"content","caption":"Content","pos":2}],"pos":1}],"columns":[{"header":"Title","dataIndex":"title"}]}
   ```

   :::
5. Create **si_forms** configuration
   ::: details Import this

   ```json
   {"formtabs":[{"caption":"Settings","fields":[{"field":"fid","caption":"Form ID","description":"data-si-form attribute value","pos":1},{"field":"formName","caption":"Form name","pos":2},{"field":"chunk","caption":"Chunk","pos":3}],"pos":1},{"caption":"Parameters","fields":[{"field":"params","caption":"Params list","description":"these override preset params","configs":"list_double","pos":1},{"field":"preset","caption":"Preset","description":"from file","inputOptionValues":"Not selected||login_form||register_form||reset_form||logout_form||callback_form","pos":2}],"pos":2},{"caption":"Fields","fields":[{"field":"fields","caption":"Fields list","configs":"formfield","pos":1}],"pos":3}],"columns":[{"header":"Form name","dataIndex":"formName"}]}
   ```

   :::
6. Create TV of type *migx* named *si_form* and attach to a template.
7. Create plugin on **OnGetFormParams** to fetch form params and return array.
   ::: details Plugin example

    ```php:line-numbers
    switch($modx->event->name){
        case 'OnGetFormParams':
            $resource = $modx->getObject('modResource', 10);
            $forms = json_decode($resource->getTVValue('si_forms'),1);
            $params = [];
            foreach($forms as $form){
                if($form['fid'] === $formName){
                    $paramsRaw = json_decode($form['params'],1);
                    break;
                }

            }
            if($paramsRaw){
                foreach($paramsRaw as $p){
                    $params[$p['title']] = $p['content'];
                }
            }
            $modx->event->returnedValues = $params;
            break;
    }
    ```

   :::
