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
        // v2 (deprecated): SendIt.Sending.send(target, url, headers, params);
        SendIt.Sending.fetch(target, url, headers, params);
    })
});
```

::: warning
When sending to a custom connector, protect the server from XSS and bots.
:::

## Send request to standard connector

```js:line-numbers
document.addEventListener('si:init', (e) => {
    document.addEventListener('submit', (e) => {
        const target = e.target.closest('.js-my-form');
        if(!target) return;
        const preset = target.dataset[SendIt.Sending.config.presetKey];
        // v2 (deprecated): SendIt.Sending.prepareSendParams(target, preset);
        SendIt.Sending.sendRequest(target, preset);
    })

});
```

::: tip
The preset key is expected in the **data-si-preset** attribute.
:::

## Send request WITHOUT form to standard connector

```js:line-numbers
document.addEventListener('si:init', (e) => {
    SendIt?.setComponentCookie('sitrusted', '1');
    // v2 (deprecated): SendIt?.Sending?.prepareSendParams(document, 'custom');
    SendIt?.Sending?.sendRequest(document, 'custom');
})
```

::: tip
`custom` is the preset key you added to the preset file.
:::

To limit bot activity, when you receive the response (if sending on page load), set `sitrusted` to 0:

```js:line-numbers
document.addEventListener('si:send:after', (e) => {
    const {action, target, result, headers, Sending} = e.detail;

    if(result.somedata){
        SendIt?.setComponentCookie('sitrusted', '0');
    }
})
```

## Disabling antispam for individual forms

As of 3.1.0, antispam (PoW, behavior signature) is configured per preset. If you do not need it for programmatic requests or search forms, simply omit `usePoW` and `useBehaviorSign` in the preset:

```php:line-numbers
'search' => [
    'hooks' => '',
    'snippet' => 'searchSnippet',
    // usePoW and useBehaviorSign not set — protection disabled
],
```

If the preset extends another with antispam enabled, you can disable it explicitly:

```php:line-numbers
'fast_form' => [
    'extends' => 'default',
    'usePoW' => 0, // [!code warning]
    'useBehaviorSign' => 0, // [!code warning]
    'validate' => 'name:required',
],
```

You can also control the protection map via the [**senditOnGetWebConfig**](https://docs.modx.pro/en/components/sendit/events#senditongetwebconfig) event.

## Custom snippet for data processing

::: tip
In your snippet, preset parameters are available as variables; form data from `$_POST`, files from `$_FILES`.
:::

```php:line-numbers
if($flag){
    return $SendIt->success($successMessage, ['somedata' => 1234]);
}else{
    return $SendIt->error($validationErrorMessage, ['errors' => ['fieldName' => 'Error text here']]);
}
```

::: tip
You can delegate field validation to **FormIt** by adding the **validate** parameter to the preset.
:::

## Changing file validation parameters from JavaScript

In the example below, the maximum allowed number of files for the *upload_design* preset is changed based on the selected parent and size:

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
   ::: details You can import this

   ```json
    {
    "formtabs":[
    {
    "MIGX_id":405,
    "caption":"",
    "print_before_tabs":"0",
    "fields":[
    {
    "MIGX_id":2297,
    "field":"name",
    "caption":"Name",
    "description":"",
    "description_is_code":"0",
    "inputTV":"",
    "inputTVtype":"listbox-multiple",
    "validation":"",
    "configs":"",
    "restrictive_condition":"",
    "display":"",
    "sourceFrom":"config",
    "sources":"",
    "inputOptionValues":"Required if==requiredIf||Password length==checkPassLength||Password confirm==passwordConfirm||User not exists==userNotExists||Blank check==blank||Required==required||Valid email==email||Min length==minLength||Max length==maxLength||Min value==minValue||Max value==maxValue||Contains string==contains||Strip string==strip||Strip HTML tags==stripTags||Allow tags==allowTags||Number check==isNumber||Allow special chars==allowSpecialChars||Date check==isDate||Regexp check==regexp",
    "default":"",
    "useDefaultIfEmpty":"0",
    "pos":1
    },
    {
    "MIGX_id":2298,
    "field":"params",
    "caption":"Parameters",
    "description":"",
    "description_is_code":"0",
    "inputTV":"",
    "inputTVtype":"",
    "validation":"",
    "configs":"",
    "restrictive_condition":"",
    "display":"",
    "sourceFrom":"config",
    "sources":"",
    "inputOptionValues":"",
    "default":"",
    "useDefaultIfEmpty":"0",
    "pos":2
    },
    {
    "MIGX_id":2311,
    "field":"error_text",
    "caption":"Error text",
    "description":"",
    "description_is_code":"0",
    "inputTV":"",
    "inputTVtype":"",
    "validation":"",
    "configs":"",
    "restrictive_condition":"",
    "display":"",
    "sourceFrom":"config",
    "sources":"",
    "inputOptionValues":"",
    "default":"",
    "useDefaultIfEmpty":"0",
    "pos":3
    }
    ],
    "pos":1
    }
    ],
    "contextmenus":"",
    "actionbuttons":"",
    "columnbuttons":"",
    "filters":"",
    "extended":{
    "migx_add":"",
    "disable_add_item":"",
    "add_items_directly":"",
    "formcaption":"",
    "update_win_title":"",
    "win_id":"",
    "maxRecords":"",
    "addNewItemAt":"bottom",
    "media_source_id":"",
    "multiple_formtabs":"",
    "multiple_formtabs_label":"",
    "multiple_formtabs_field":"",
    "multiple_formtabs_optionstext":"",
    "multiple_formtabs_optionsvalue":"",
    "actionbuttonsperrow":4,
    "winbuttonslist":"",
    "extrahandlers":"",
    "filtersperrow":4,
    "packageName":"",
    "classname":"",
    "task":"",
    "getlistsort":"",
    "getlistsortdir":"",
    "sortconfig":"",
    "gridpagesize":"",
    "use_custom_prefix":"0",
    "prefix":"",
    "grid":"",
    "gridload_mode":1,
    "check_resid":1,
    "check_resid_TV":"",
    "join_alias":"",
    "has_jointable":"yes",
    "getlistwhere":"",
    "joins":"",
    "hooksnippets":"",
    "cmpmaincaption":"",
    "cmptabcaption":"",
    "cmptabdescription":"",
    "cmptabcontroller":"",
    "winbuttons":"",
    "onsubmitsuccess":"",
    "submitparams":""
    },
    "permissions":{
    "apiaccess":"",
    "view":"",
    "list":"",
    "save":"",
    "create":"",
    "remove":"",
    "delete":"",
    "publish":"",
    "unpublish":"",
    "viewdeleted":"",
    "viewunpublished":""
    },
    "fieldpermissions":"",
    "columns":[
    {
    "MIGX_id":1,
    "header":"Name",
    "dataIndex":"name",
    "width":"",
    "sortable":"false",
    "show_in_grid":1,
    "customrenderer":"",
    "renderer":"",
    "clickaction":"",
    "selectorconfig":"",
    "renderchunktpl":"",
    "renderoptions":"",
    "editor":""
    },
    {
    "MIGX_id":2,
    "header":"Parameters",
    "dataIndex":"params",
    "width":"",
    "sortable":"false",
    "show_in_grid":1,
    "customrenderer":"",
    "renderer":"",
    "clickaction":"",
    "selectorconfig":"",
    "renderchunktpl":"",
    "renderoptions":"",
    "editor":""
    }
    ],
    "category":""
    }
    ```

   :::
3. Create **formfield** configuration
   ::: details You can import this

     ```json
      {
    "formtabs":[
    {
    "MIGX_id":406,
    "caption":"",
    "print_before_tabs":"0",
    "fields":[
    {
    "MIGX_id":2299,
    "field":"name",
    "caption":"Name",
    "description":"",
    "description_is_code":"0",
    "inputTV":"",
    "inputTVtype":"",
    "validation":"",
    "configs":"",
    "restrictive_condition":"",
    "display":"",
    "sourceFrom":"config",
    "sources":"",
    "inputOptionValues":"",
    "default":"",
    "useDefaultIfEmpty":"0",
    "pos":1
    },
    {
    "MIGX_id":2300,
    "field":"placeholder",
    "caption":"Placeholder",
    "description":"",
    "description_is_code":"0",
    "inputTV":"",
    "inputTVtype":"",
    "validation":"",
    "configs":"",
    "restrictive_condition":"",
    "display":"",
    "sourceFrom":"config",
    "sources":"",
    "inputOptionValues":"",
    "default":"",
    "useDefaultIfEmpty":"0",
    "pos":2
    },
    {
    "MIGX_id":2301,
    "field":"type",
    "caption":"Type",
    "description":"",
    "description_is_code":"0",
    "inputTV":"",
    "inputTVtype":"listbox",
    "validation":"",
    "configs":"",
    "restrictive_condition":"",
    "display":"",
    "sourceFrom":"config",
    "sources":"",
    "inputOptionValues":"Text==text||Phone==tel||Email==email||Password==password||Number==number||Checkbox==checkbox||Radio==radio||Hidden==hidden||File==file||Date==date||Date and time==datetime-local||Time==time||Range==range||Color==color||Textarea==textarea||Select==select",
    "default":"",
    "useDefaultIfEmpty":"0",
    "pos":3
    },
    {
    "MIGX_id":2302,
    "field":"values",
    "caption":"Possible values",
    "description":"separator |",
    "description_is_code":"0",
    "inputTV":"",
    "inputTVtype":"",
    "validation":"",
    "configs":"",
    "restrictive_condition":"",
    "display":"",
    "sourceFrom":"config",
    "sources":"",
    "inputOptionValues":"",
    "default":"",
    "useDefaultIfEmpty":"0",
    "pos":4
    },
    {
    "MIGX_id":2303,
    "field":"label",
    "caption":"Label",
    "description":"",
    "description_is_code":"0",
    "inputTV":"",
    "inputTVtype":"",
    "validation":"",
    "configs":"",
    "restrictive_condition":"",
    "display":"",
    "sourceFrom":"config",
    "sources":"",
    "inputOptionValues":"",
    "default":"",
    "useDefaultIfEmpty":"0",
    "pos":5
    },
    {
    "MIGX_id":2312,
    "field":"step",
    "caption":"Step",
    "description":"",
    "description_is_code":"0",
    "inputTV":"",
    "inputTVtype":"",
    "validation":"",
    "configs":"",
    "restrictive_condition":"",
    "display":"",
    "sourceFrom":"config",
    "sources":"",
    "inputOptionValues":"",
    "default":"",
    "useDefaultIfEmpty":"0",
    "pos":6
    },
    {
    "MIGX_id":2313,
    "field":"chunk",
    "caption":"Chunk",
    "description":"",
    "description_is_code":"0",
    "inputTV":"",
    "inputTVtype":"",
    "validation":"",
    "configs":"",
    "restrictive_condition":"",
    "display":"",
    "sourceFrom":"config",
    "sources":"",
    "inputOptionValues":"",
    "default":"",
    "useDefaultIfEmpty":"0",
    "pos":7
    },
    {
    "MIGX_id":2304,
    "field":"atributes",
    "caption":"Other attributes",
    "description":"",
    "description_is_code":"0",
    "inputTV":"",
    "inputTVtype":"textarea",
    "validation":"",
    "configs":"",
    "restrictive_condition":"",
    "display":"",
    "sourceFrom":"config",
    "sources":"",
    "inputOptionValues":"",
    "default":"",
    "useDefaultIfEmpty":"0",
    "pos":8
    },
    {
    "MIGX_id":2305,
    "field":"validators",
    "caption":"Validators",
    "description":"",
    "description_is_code":"0",
    "inputTV":"",
    "inputTVtype":"migx",
    "validation":"",
    "configs":"validators",
    "restrictive_condition":"",
    "display":"",
    "sourceFrom":"config",
    "sources":"",
    "inputOptionValues":"",
    "default":"",
    "useDefaultIfEmpty":"0",
    "pos":9
    }
    ],
    "pos":1
    }
    ],
    "contextmenus":"",
    "actionbuttons":"",
    "columnbuttons":"",
    "filters":"",
    "extended":{
    "migx_add":"",
    "disable_add_item":"",
    "add_items_directly":"",
    "formcaption":"",
    "update_win_title":"",
    "win_id":"",
    "maxRecords":"",
    "addNewItemAt":"bottom",
    "media_source_id":"",
    "multiple_formtabs":"",
    "multiple_formtabs_label":"",
    "multiple_formtabs_field":"",
    "multiple_formtabs_optionstext":"",
    "multiple_formtabs_optionsvalue":"",
    "actionbuttonsperrow":4,
    "winbuttonslist":"",
    "extrahandlers":"",
    "filtersperrow":4,
    "packageName":"",
    "classname":"",
    "task":"",
    "getlistsort":"",
    "getlistsortdir":"",
    "sortconfig":"",
    "gridpagesize":"",
    "use_custom_prefix":"0",
    "prefix":"",
    "grid":"",
    "gridload_mode":1,
    "check_resid":1,
    "check_resid_TV":"",
    "join_alias":"",
    "has_jointable":"yes",
    "getlistwhere":"",
    "joins":"",
    "hooksnippets":"",
    "cmpmaincaption":"",
    "cmptabcaption":"",
    "cmptabdescription":"",
    "cmptabcontroller":"",
    "winbuttons":"",
    "onsubmitsuccess":"",
    "submitparams":""
    },
    "permissions":{
    "apiaccess":"",
    "view":"",
    "list":"",
    "save":"",
    "create":"",
    "remove":"",
    "delete":"",
    "publish":"",
    "unpublish":"",
    "viewdeleted":"",
    "viewunpublished":""
    },
    "fieldpermissions":"",
    "columns":[
    {
    "MIGX_id":1,
    "header":"Name",
    "dataIndex":"name",
    "width":"",
    "sortable":"false",
    "show_in_grid":1,
    "customrenderer":"",
    "renderer":"",
    "clickaction":"",
    "selectorconfig":"",
    "renderchunktpl":"",
    "renderoptions":"",
    "editor":""
    },
    {
    "MIGX_id":2,
    "header":"Label",
    "dataIndex":"label",
    "width":"",
    "sortable":"false",
    "show_in_grid":1,
    "customrenderer":"",
    "renderer":"",
    "clickaction":"",
    "selectorconfig":"",
    "renderchunktpl":"",
    "renderoptions":"",
    "editor":""
    }
    ],
    "category":""
    }
    ```

   :::
4. Create **list_double** configuration
   ::: details You can import this

    ```json
    {
    "formtabs":[
    {
    "MIGX_id":4,
    "caption":"",
    "print_before_tabs":"0",
    "fields":[
    {
    "MIGX_id":37,
    "field":"title",
    "caption":"Title",
    "description":"",
    "description_is_code":"0",
    "inputTV":"",
    "inputTVtype":"",
    "validation":"",
    "configs":"",
    "restrictive_condition":"",
    "display":"",
    "sourceFrom":"config",
    "sources":"",
    "inputOptionValues":"",
    "default":"",
    "useDefaultIfEmpty":"0",
    "pos":1
    },
    {
    "MIGX_id":38,
    "field":"content",
    "caption":"Content",
    "description":"",
    "description_is_code":"0",
    "inputTV":"",
    "inputTVtype":"textarea",
    "validation":"",
    "configs":"",
    "restrictive_condition":"",
    "display":"",
    "sourceFrom":"config",
    "sources":"",
    "inputOptionValues":"",
    "default":"",
    "useDefaultIfEmpty":"0",
    "pos":2
    }
    ],
    "pos":1
    }
    ],
    "contextmenus":"",
    "actionbuttons":"",
    "columnbuttons":"",
    "filters":"",
    "extended":{
    "migx_add":"",
    "disable_add_item":"",
    "add_items_directly":"",
    "formcaption":"",
    "update_win_title":"",
    "win_id":"",
    "maxRecords":"",
    "addNewItemAt":"bottom",
    "media_source_id":"",
    "multiple_formtabs":"",
    "multiple_formtabs_label":"",
    "multiple_formtabs_field":"",
    "multiple_formtabs_optionstext":"",
    "multiple_formtabs_optionsvalue":"",
    "actionbuttonsperrow":4,
    "winbuttonslist":"",
    "extrahandlers":"",
    "filtersperrow":4,
    "packageName":"",
    "classname":"",
    "task":"",
    "getlistsort":"",
    "getlistsortdir":"",
    "sortconfig":"",
    "gridpagesize":"",
    "use_custom_prefix":"0",
    "prefix":"",
    "grid":"",
    "gridload_mode":1,
    "check_resid":1,
    "check_resid_TV":"",
    "join_alias":"",
    "has_jointable":"yes",
    "getlistwhere":"",
    "joins":"",
    "hooksnippets":"",
    "cmpmaincaption":"",
    "cmptabcaption":"",
    "cmptabdescription":"",
    "cmptabcontroller":"",
    "winbuttons":"",
    "onsubmitsuccess":"",
    "submitparams":""
    },
    "permissions":{
    "apiaccess":"",
    "view":"",
    "list":"",
    "save":"",
    "create":"",
    "remove":"",
    "delete":"",
    "publish":"",
    "unpublish":"",
    "viewdeleted":"",
    "viewunpublished":""
    },
    "fieldpermissions":"",
    "columns":[
    {
    "MIGX_id":1,
    "header":"Title",
    "dataIndex":"title",
    "width":"",
    "sortable":"false",
    "show_in_grid":1,
    "customrenderer":"",
    "renderer":"",
    "clickaction":"",
    "selectorconfig":"",
    "renderchunktpl":"",
    "renderoptions":"",
    "editor":""
    }
    ],
    "category":""
    }
    ```

   :::
5. Create **si_forms** configuration
   ::: details You can import this

    ```json
    {
    "formtabs":[
    {
    "MIGX_id":407,
    "caption":"Settings",
    "print_before_tabs":"0",
    "fields":[
    {
    "MIGX_id":2306,
    "field":"fid",
    "caption":"Form ID",
    "description":"data-si-form attribute value",
    "description_is_code":"0",
    "inputTV":"",
    "inputTVtype":"",
    "validation":"",
    "configs":"",
    "restrictive_condition":"",
    "display":"",
    "sourceFrom":"config",
    "sources":"",
    "inputOptionValues":"",
    "default":"",
    "useDefaultIfEmpty":"0",
    "pos":1
    },
    {
    "MIGX_id":2307,
    "field":"formName",
    "caption":"Form name",
    "description":"",
    "description_is_code":"0",
    "inputTV":"",
    "inputTVtype":"",
    "validation":"",
    "configs":"",
    "restrictive_condition":"",
    "display":"",
    "sourceFrom":"config",
    "sources":"",
    "inputOptionValues":"",
    "default":"",
    "useDefaultIfEmpty":"0",
    "pos":2
    },
    {
    "MIGX_id":2314,
    "field":"chunk",
    "caption":"Chunk",
    "description":"",
    "description_is_code":"0",
    "inputTV":"",
    "inputTVtype":"",
    "validation":"",
    "configs":"",
    "restrictive_condition":"",
    "display":"",
    "sourceFrom":"config",
    "sources":"",
    "inputOptionValues":"",
    "default":"",
    "useDefaultIfEmpty":"0",
    "pos":3
    }
    ],
    "pos":1
    },
    {
    "MIGX_id":408,
    "caption":"Parameters",
    "print_before_tabs":"0",
    "fields":[
    {
    "MIGX_id":2308,
    "field":"params",
    "caption":"Params list",
    "description":"these override preset params",
    "description_is_code":"0",
    "inputTV":"",
    "inputTVtype":"migx",
    "validation":"",
    "configs":"list_double",
    "restrictive_condition":"",
    "display":"",
    "sourceFrom":"config",
    "sources":"",
    "inputOptionValues":"",
    "default":"",
    "useDefaultIfEmpty":"0",
    "pos":1
    },
    {
    "MIGX_id":2309,
    "field":"preset",
    "caption":"Preset",
    "description":"from file",
    "description_is_code":"0",
    "inputTV":"",
    "inputTVtype":"listbox",
    "validation":"",
    "configs":"",
    "restrictive_condition":"",
    "display":"",
    "sourceFrom":"config",
    "sources":"",
    "inputOptionValues":"Not selected||login_form||register_form||reset_form||logout_form||callback_form",
    "default":"",
    "useDefaultIfEmpty":"0",
    "pos":2
    }
    ],
    "pos":2
    },
    {
    "MIGX_id":409,
    "caption":"Fields",
    "print_before_tabs":"0",
    "fields":[
    {
    "MIGX_id":2310,
    "field":"fields",
    "caption":"Fields list",
    "description":"",
    "description_is_code":"0",
    "inputTV":"",
    "inputTVtype":"migx",
    "validation":"",
    "configs":"formfield",
    "restrictive_condition":"",
    "display":"",
    "sourceFrom":"config",
    "sources":"",
    "inputOptionValues":"",
    "default":"",
    "useDefaultIfEmpty":"0",
    "pos":1
    }
    ],
    "pos":3
    }
    ],
    "contextmenus":"",
    "actionbuttons":"",
    "columnbuttons":"",
    "filters":"",
    "extended":{
    "migx_add":"",
    "disable_add_item":"",
    "add_items_directly":"",
    "formcaption":"",
    "update_win_title":"",
    "win_id":"",
    "maxRecords":"",
    "addNewItemAt":"bottom",
    "media_source_id":"",
    "multiple_formtabs":"",
    "multiple_formtabs_label":"",
    "multiple_formtabs_field":"",
    "multiple_formtabs_optionstext":"",
    "multiple_formtabs_optionsvalue":"",
    "actionbuttonsperrow":4,
    "winbuttonslist":"",
    "extrahandlers":"",
    "filtersperrow":4,
    "packageName":"",
    "classname":"",
    "task":"",
    "getlistsort":"",
    "getlistsortdir":"",
    "sortconfig":"",
    "gridpagesize":"",
    "use_custom_prefix":"0",
    "prefix":"",
    "grid":"",
    "gridload_mode":1,
    "check_resid":1,
    "check_resid_TV":"",
    "join_alias":"",
    "has_jointable":"yes",
    "getlistwhere":"",
    "joins":"",
    "hooksnippets":"",
    "cmpmaincaption":"",
    "cmptabcaption":"",
    "cmptabdescription":"",
    "cmptabcontroller":"",
    "winbuttons":"",
    "onsubmitsuccess":"",
    "submitparams":""
    },
    "permissions":{
    "apiaccess":"",
    "view":"",
    "list":"",
    "save":"",
    "create":"",
    "remove":"",
    "delete":"",
    "publish":"",
    "unpublish":"",
    "viewdeleted":"",
    "viewunpublished":""
    },
    "fieldpermissions":"",
    "columns":[
    {
    "MIGX_id":1,
    "header":"Form name",
    "dataIndex":"formName",
    "width":"",
    "sortable":"false",
    "show_in_grid":1,
    "customrenderer":"",
    "renderer":"",
    "clickaction":"",
    "selectorconfig":"",
    "renderchunktpl":"",
    "renderoptions":"",
    "editor":""
    }
    ],
    "category":""
    }
    ```

   :::
6. Create a TV of type *migx* named *si_form* and attach it to a template.
7. Create a plugin on **OnGetFormParams** that loads the form parameters and returns them as an array.
   ::: details Plugin example

    ```php:line-numbers
    switch($modx->event->name){
        case 'OnGetFormParams':
            // MODX 2: $modx->getObject('modResource', 10)
            $resource = $modx->getObject(\MODX\Revolution\modResource::class, 10);
            $forms = json_decode($resource->getTVValue('si_forms'), true);
            $params = [];
            foreach($forms as $form){
                if($form['fid'] === $formName){
                    $paramsRaw = json_decode($form['params'], true);
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
