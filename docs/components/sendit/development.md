# Разработка

## Заменить стандартные уведомления miniShop2

```js:line-numbers
document.addEventListener('si:init', (e) => {
  if(typeof miniShop2 !== 'undefined'){
    miniShop2.Message = SendIt.Notify;
  }
});
```

## Отправить запрос на свой коннектор

```js:line-numbers
document.addEventListener('si:init', (e) => {
  document.addEventListener('submit', (e) => {
    const target = e.target.closest('.js-my-form');
    if(!target) return;
    const params = new FormData(target);
    const url = 'assets/action.php';
    const headers = {};
  })
  SendIt.Sending.send(target, url, headers, params);
});
```

::: warning
Отправляя данные на собственный коннектор позаботьтесь о том, чтобы защити сервер от XSS атак и ботов.
:::

## Отправить запрос на стандартный коннектор

```js:line-numbers
document.addEventListener('si:init', (e) => {
  document.addEventListener('submit', (e) => {
    const target = e.target.closest('.js-my-form');
    if(!target) return;
    const preset = target.dataset[Sendit.Sending.config.presetKey];
  })
  SendIt.Sending.prepareSendParams(target, preset);
});
```

::: tip
Предполагается, что ключ пресета записан в атрибуте **data-si-preset**.
:::

## Свой сниппет для обработки данных

::: tip
В вашем сниппете параметры пресета будут доступны в виде переменных, а данные формы можно получить из массива $_POST, файлы из массива $_FILES.
:::

```php:line-numbers
if($flag){
  return $SendIt->success($successMessage, ['somedata' => 1234]);
}else{
  return $SendIt->error($validationErrorMessage, ['errors' => ['fieldName' => 'Тут текст ошибки']]);
}
```

::: tip
Вы можете делегировать валидацию полей компоненту **FormIt**, для этого просто добавьте в пресет параметр **validate**.
:::

## Создать интерфейс управления формами в админке

1. Устанавливаем Migx.
2. Создаем конфигурацию **validators**
    ::: details Можно импортировать эту

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
      "caption":"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435",
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
      "inputOptionValues":"\u041e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e \u0435\u0441\u043b\u0438==requiredIf||\u0414\u043b\u0438\u043d\u0430 \u043f\u0430\u0440\u043e\u043b\u044f==checkPassLength||\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043d\u0438\u0435 \u043f\u0430\u0440\u043e\u043b\u044f==passwordConfirm||\u0421\u0443\u0449\u0435\u0441\u0442\u0432\u043e\u0432\u0430\u043d\u0438\u0435 \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f==userNotExists||\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u043d\u0430 \u043f\u0443\u0441\u0442\u043e\u0442\u0443==blank||\u041e\u0431\u044f\u0437\u0430\u0442\u0435\u043b\u044c\u043d\u043e==required||\u0412\u0430\u043b\u0438\u0434\u043d\u044b\u0439 email==email||\u041c\u0438\u043d\u0438\u043c\u0430\u043b\u044c\u043d\u0430\u044f \u0434\u043b\u0438\u043d\u0430==minLength||\u041c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u0430\u044f \u0434\u043b\u0438\u043d\u0430==maxLength||\u041c\u0438\u043d\u0438\u043c\u0430\u043b\u044c\u043d\u043e\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435==minValue||\u041c\u0430\u043a\u0441\u0438\u043c\u0430\u043b\u044c\u043d\u043e\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435==maxValue||\u0421\u043e\u0434\u0435\u0440\u0436\u0438\u0442 \u0441\u0442\u0440\u043e\u043a\u0443==contains||\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0441\u0442\u0440\u043e\u043a\u0443==strip||\u0423\u0434\u0430\u043b\u0438\u0442\u044c html-\u0442\u044d\u0433\u0438==stripTags||\u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u044c \u0442\u044d\u0433\u0438==allowTags||\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u043d\u0430 \u0447\u0438\u0441\u043b\u043e==isNumber||\u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u044c \u0441\u043f\u0435\u0446\u0441\u0438\u043c\u0432\u043e\u043b\u044b==allowSpecialChars||\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u043d\u0430 \u0434\u0430\u0442\u0443==isDate||\u041f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u043f\u043e \u0440\u0435\u0433\u0443\u043b\u044f\u0440\u043a\u0435==regexp",
      "default":"",
      "useDefaultIfEmpty":"0",
      "pos":1
      },
      {
      "MIGX_id":2298,
      "field":"params",
      "caption":"\u041f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u044b",
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
      "caption":"\u0422\u0435\u043a\u0441\u0442 \u043e\u0448\u0438\u0431\u043a\u0438",
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
      "header":"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435",
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
      "header":"\u041f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u044b",
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
3. Создаем конфигурацию **formfield**
    ::: details Можно импортировать эту

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
    "caption":"\u0418\u043c\u044f",
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
    "caption":"\u041f\u043b\u0435\u0439\u0441\u0445\u043e\u043b\u0434\u0435\u0440",
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
    "caption":"\u0422\u0438\u043f",
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
    "inputOptionValues":"\u0422\u0435\u043a\u0441\u0442==text|| \u0422\u0435\u043b\u0435\u0444\u043e\u043d==tel|| \u041f\u043e\u0447\u0442\u0430==email|| \u041f\u0430\u0440\u043e\u043b\u044c==password|| \u0427\u0438\u0441\u043b\u043e==number|| \u0427\u0435\u043a\u0431\u043e\u043a\u0441==checkbox|| \u041f\u0435\u0440\u0435\u043a\u043b\u044e\u0447\u0430\u0442\u0435\u043b\u044c==radio|| \u0421\u043a\u0440\u044b\u0442\u044b\u0439==hidden|| \u0424\u0430\u0439\u043b==file|| \u0414\u0430\u0442\u0430==date|| \u0414\u0430\u0442\u0430 \u0438 \u0432\u0440\u0435\u043c\u044f==datetime-local|| \u0412\u0440\u0435\u043c\u044f==time|| \u0414\u0438\u0430\u043f\u0430\u0437\u043e\u043d==range|| \u0426\u0432\u0435\u0442==color|| \u0422\u0435\u043a\u0441\u0442\u043e\u0432\u0430\u044f \u043e\u0431\u043b\u0430\u0441\u0442\u044c==textarea|| \u0421\u043f\u0438\u0441\u043e\u043a==select",
    "default":"",
    "useDefaultIfEmpty":"0",
    "pos":3
    },
    {
    "MIGX_id":2302,
    "field":"values",
    "caption":"\u0412\u043e\u0437\u043c\u043e\u0436\u043d\u044b\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f",
    "description":"\u0440\u0430\u0437\u0434\u0435\u043b\u0438\u0442\u0435\u043b\u044c |",
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
    "caption":"\u041f\u043e\u0434\u043f\u0438\u0441\u044c",
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
    "caption":"\u0428\u0430\u0433",
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
    "caption":"\u0427\u0430\u043d\u043a",
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
    "field":"attributes",
    "caption":"\u0414\u0440\u0443\u0433\u0438\u0435 \u0430\u0442\u0440\u0438\u0431\u0443\u0442\u044b",
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
    "caption":"\u0412\u0430\u043b\u0438\u0434\u0430\u0442\u043e\u0440\u044b",
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
    "header":"\u0418\u043c\u044f",
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
    "header":"\u041f\u043e\u0434\u043f\u0438\u0441\u044c",
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
4. Создаем конфигурацию **list_double**
    ::: details Можно импортировать эту

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
    "caption":"\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a",
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
    "caption":"\u0421\u043e\u0434\u0435\u0440\u0436\u0438\u043c\u043e\u0435",
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
    "header":"\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a",
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
5. Создаем конфигурацию **si_forms**
   ::: details Можно импортировать эту

    ```json
    {
    "formtabs":[
    {
    "MIGX_id":407,
    "caption":"\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u043a\u0438",
    "print_before_tabs":"0",
    "fields":[
    {
    "MIGX_id":2306,
    "field":"fid",
    "caption":"ID \u0444\u043e\u0440\u043c\u044b",
    "description":"\u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435 \u0430\u0442\u0440\u0438\u0431\u0443\u0442\u0430 data-si-form",
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
    "caption":"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0444\u043e\u0440\u043c\u044b",
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
    "caption":"\u0427\u0430\u043d\u043a",
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
    "caption":"\u041f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u044b",
    "print_before_tabs":"0",
    "fields":[
    {
    "MIGX_id":2308,
    "field":"params",
    "caption":"\u0421\u043f\u0438\u0441\u043e\u043a \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u043e\u0432",
    "description":"\u044d\u0442\u0438 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u044b \u043f\u0435\u0440\u0435\u043e\u043f\u0440\u0435\u0434\u0435\u043b\u044f\u0442 \u043e\u0434\u043d\u043e\u0438\u043c\u0435\u043d\u043d\u044b\u0435 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u044b \u0438\u0437 \u043f\u0440\u0435\u0441\u0435\u0442\u0430",
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
    "caption":"\u041f\u0440\u0435\u0441\u0435\u0442",
    "description":"\u0431\u0435\u0440\u0443\u0442\u0441\u044f \u0438\u0437 \u0444\u0430\u0439\u043b\u0430",
    "description_is_code":"0",
    "inputTV":"",
    "inputTVtype":"listbox",
    "validation":"",
    "configs":"",
    "restrictive_condition":"",
    "display":"",
    "sourceFrom":"config",
    "sources":"",
    "inputOptionValues":"\u041d\u0435 \u0432\u044b\u0431\u0440\u0430\u043d||login_form||register_form||reset_form||logout_form||callback_form",
    "default":"",
    "useDefaultIfEmpty":"0",
    "pos":2
    }
    ],
    "pos":2
    },
    {
    "MIGX_id":409,
    "caption":"\u041f\u043e\u043b\u044f",
    "print_before_tabs":"0",
    "fields":[
    {
    "MIGX_id":2310,
    "field":"fields",
    "caption":"\u0421\u043f\u0438\u0441\u043e\u043a \u043f\u043e\u043b\u0435\u0439",
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
    "header":"\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0444\u043e\u0440\u043c\u044b",
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
6. Создаём TV типа *migx* с именем *si_form* и привязываем её в любому удобному шаблону.
7. Создаём плагин на событие **OnGetFormParams**, который достанет параметры нужной формы и вернёт их в виде массива.
    ::: details Пример плагина

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
