# Events

## System events

### Indexing events

#### ffOnGetIndexingQuery — fired when building the indexing query; allows modifying the query

Parameters:

* **$configData** — Configuration parameters array.
* **$query** — `xPDOQuery_mysql` object.

::: details Plugin example

```php:line-numbers
switch($modx->event->name){
    case 'ffOnGetIndexingQuery':
        // limit indexed resources for config id=1 to template id=1
        if($configData['id'] === 1){
            $query->andCondition(['template' => 1]);
        }
        break;
}
```

:::

#### ffOnBeforeSetIndexValue — fired when building index data; allows changing indexed values

Parameters:

* **$FlatFilters** — Indexing class instance.
* **$key** — Filter key.
* **$value** — Filter value.

::: details Plugin example

```php:line-numbers
switch($modx->event->name){
    case 'ffOnBeforeSetIndexValue':
        // replace empty value with string 'not set'
        if (in_array($key, ['color', 'tags'])) {
            $modx->event->returnedValues['value'] = $value ?: 'not set';
        }
        break;
}
```

:::

### Filtering events

#### ffOnGetFieldKeys — fired when getting the list of filter fields for the config page in the manager; allows changing the list

Parameters:

* **$type** — Configuration type (config params).
* **$FlatFilters** — Filtering class instance.

::: details Plugin example

```php:line-numbers
switch($modx->event->name){
    case 'ffOnGetFieldKeys':
        // set filter keys for config type 'statistic'
        if ($type === 'statistic') {
            $modx->event->returnedValues = array_merge(
                $FlatFilters->getTableKeys('site_content'),
                $FlatFilters->getTableKeys('ms2_products'),
                $FlatFilters->getTableKeys('salesstatistics_items')
            );
        }
        break;
}
```

:::

#### ffOnBeforeFilter — fired before filtering and hash check; allows changing filter values

Parameters:

* **$configData** — Configuration parameters array.
* **$FlatFilters** — Filtering class instance.

::: details Plugin example

```php:line-numbers
switch($modx->event->name){
    case 'ffOnBeforeFilter':
        // add query param to filter values so filtering runs
        if (in_array($configData['id'], [1, 2, 4]) && $_REQUEST['query']) {
            $FlatFilters->values['query'] = $_REQUEST['query'];
        }
        break;
}
```

:::

#### ffOnAfterFilter — fired after filtering; allows changing the list of found resource IDs

Parameters:

* **$configData** — Configuration parameters array.
* **$rids** — List of result IDs (filtering class).

::: details Plugin example

```php:line-numbers
switch($modx->event->name){
    case 'ffOnAfterFilter':
        // search within filtered resources
        if ($_REQUEST['query']) {
            if($configData['id'] === 1){
                $modx->event->returnedValues['rids'] =  $modx->runSnippet('searchResource', ['rids' => $rids, 'query' => $_REQUEST['query']]); // returns '1,2,3,4'
            }
        }
        break;
}
```

:::

#### ffOnBeforeSetFilterConditions — fired when building the filter query; allows changing filter conditions

Parameters:

* **$configData** — Configuration parameters array.
* **$FlatFilters** — Filtering class instance.
* **$conditions** — Filter conditions array.

::: details Plugin example

```php:line-numbers
switch($modx->event->name){
    case 'ffOnBeforeSetFilterConditions':
        // hide resources with status 7 from Managers group
        if ($configData['id'] === 2 && $modx->user->isMember(['Managers'])) {
            $conditions[] = '`status` != 7';
        }

        $modx->event->returnedValues['conditions'] = $conditions;
        break;
}
```

:::

#### ffOnBeforeGetFilterValues — fired before building the filter value list; allows changing the conditions used to get values

Parameters:

* **$configData** — Configuration parameters array.
* **$FlatFilters** — Filtering class instance.
* **$conditions** — Conditions array.

::: details Plugin example

```php:line-numbers
switch($modx->event->name){
    case 'ffOnBeforeGetFilterValues':
        // make 'Designers' group see only filter values that exist on their resources
        if ($modx->user->isMember(['Designers'])) {
            foreach($conditions as $k => $condition){
                if(strpos($condition, ':createdby') !== false){
                    $conditions[$k] = str_replace('>', '=', $condition);
                    $FlatFilters->tokens['createdby'] = $modx->user->get('id');
                }
            }
        }
        $modx->event->returnedValues['conditions'] = $conditions;
        break;
}
```

:::

#### ffOnAfterGetFilterValues — fired after building the filter value list; allows changing the list

Parameters:

* **$configData** — Configuration parameters array.
* **$FlatFilters** — Filtering class instance.
* **$output** — Values array.

::: details Plugin example

```php:line-numbers
switch($modx->event->name){
    case 'ffOnAfterGetFilterValues':
        // add 'not set' to values for filters 'color' and 'tags'
        if ($configData['id'] === 2) {
            foreach($output as $key => $item){
                if(in_array($key, ['color', 'tags'])){
                    $array = $item['values'];
                    $k = array_search("not set", $array);
                    if ($k !== false) {
                        unset($array[$k]);
                        array_unshift($array, "not set");
                        $output[$key]['values'] = $array;
                    }
                }
            }
        }
        $modx->event->returnedValues['output'] = $output;
        break;
}
```

:::

## JavaScript events

#### ff:init — component initialization

Fired after all modules from the JS config are loaded. No parameters. Cannot be cancelled. Subscribe to this event so you can use the **FlatFilters** object and its children after they are available.

::: details Example

```js:line-numbers
document.addEventListener('ff:init', (e) => {
    // get extra shared data after filters init
    const total = document.querySelector('[data-total]');
    total && SendIt.setComponentCookie('sitrusted', 1);
    total && SendIt.Sending.prepareSendParams(FlatFilters.MainHandler.form, 'get_totals');
});
```

:::

#### ff:after:reset — all filters reset

Fired after all filters are reset. Cannot be cancelled. Use it to run extra logic after reset.

::: details Parameters

* **filters** — DOM collection of filter field elements.
:::

::: details Example

```js:line-numbers
document.addEventListener('ff:after:reset', (e) => {
    const queryField = document.querySelector('[data-query]');
    // clear search query
    queryField && (queryField.value = '');

    // clear selected date range
    if (typeof dp !== 'undefined') {
        const {datePickerField, datePickerFieldMin, datePickerFieldMax, selectDateText} = project.getDatepickerElements();
        dp.clear();
        datePickerFieldMin && (datePickerFieldMin.value = '');
        datePickerFieldMax && (datePickerFieldMax.value = '');
        selectDateText && (selectDateText.textContent = 'Not set');
    }
});
```

:::

#### ff:before:remove — before removing a selected value

Fired before a selected filter value is removed. Can be cancelled. Use it to prevent removal.

::: details Parameters

* **eventOptions.target** — DOM element of the remove button.
* **eventOptions.filter** — DOM element of the filter field.
* **eventOptions.type** — Field type.
:::

::: details Example

```js:line-numbers
document.addEventListener('ff:before:remove', (e) => {
    const { eventOptions } = e.detail;
    // do not allow clearing the color filter
    if(eventOptions.filter.dataset.ffFilter === 'color'){
        e.preventDefault();
    }
});
```

:::

#### ff:before:render — before showing a selected value

Fired before a selected filter value is displayed. Can be cancelled. Use it to change the displayed value.

::: details Parameters

* **eventOptions.key** — Filter key.
* **eventOptions.value** — Value sent to the server.
* **eventOptions.caption** — Displayed value.
:::

::: details Example

```js:line-numbers
document.addEventListener('ff:before:render', (e) => {
    const { eventOptions } = e.detail;
    // show Russian color name instead of English
    if(eventOptions.key === 'color' && eventOptions.value[0] === 'black'){
        eventOptions.caption = 'Black';
    }
});
```

:::

#### ff:values:disabled — when setting disabled filter values

Fired while setting disabled filter values. Cannot be cancelled. Use it to undo the action.

::: details Parameters

* **type** — Field type.
* **element** — DOM element of the filter field.
* **key** — Filter key.
* **data** — Server response.
* **filters** — DOM collection of filter field elements.
:::

::: details Example

```js:line-numbers
document.addEventListener('ff:values:disabled', (e) => {
    const { type, element, key, data, filters } = e.detail;

    // your logic here
});
```

:::
