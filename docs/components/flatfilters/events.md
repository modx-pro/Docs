# События

## Системные события

### События индексации

###

#### ffOnGetIndexingQuery - генерируется на этапе формирования запроса на индексацию, позволяет изменить этот запрос

Доступные параметры:

* **$configData** - массив параметров конфигурации.
* **$query** - объект `xPDOQuery_mysql`.

::: details Пример плагина

```php:line-numbers
switch($modx->event->name){
    case 'ffOnGetIndexingQuery':
        // устанавливаем ограничение выборки ресурсов для индексации для конфигурации id=1 по шаблону с id=1.
        if($configData['id'] === 1){
            $query->andCondition(['template' => 1]);
        }        
        break;
}
```

:::

#### ffOnBeforeSetIndexValue - генерируется на этапе формирования данных для индексации, позволяет изменить индексируемые значения

Доступные параметры:

* **$FlatFilters** - объект класса индексации.
* **$key** - ключ фильтра.
* **$value** - значение фильтра.

::: details Пример плагина

```php:line-numbers
switch($modx->event->name){
    case 'ffOnBeforeSetIndexValue':
        // заменяем пустое значение на строку 'не задан'.
        if (in_array($key, ['color', 'tags'])) {
            $modx->event->returnedValues['value'] = $value ?: 'не задан';
        }      
        break;
}
```

:::

### События фильтрации

###

#### ffOnGetFieldKeys - генерируется на этапе получения списка полей для фильтрации при отрисовки страницы конфигурации в админке, позволяет изменить этот список

Доступные параметры:

* **$type** - массив параметров конфигурации.
* **$FlatFilters** - объект класса фильтрации.

::: details Пример плагина

```php:line-numbers
switch($modx->event->name){
    case 'ffOnGetFieldKeys':
        // устанавливаем для конфигурации с типом 'statistic' ключи фильтров.
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

#### ffOnBeforeFilter - генерируется перед фильтрацией и проверкой хэша, позволяет изменить значения фильтров

Доступные параметры:

* **$configData** - массив параметров конфигурации.
* **$FlatFilters** - объект класса фильтрации.

::: details Пример плагина

```php:line-numbers
switch($modx->event->name){
    case 'ffOnBeforeFilter':
        // добавляем параметр query в значения фильтров, чтобы сработала фильтрация
        if (in_array($configData['id'], [1, 2, 4]) && $_REQUEST['query']) {
            $FlatFilters->values['query'] = $_REQUEST['query'];
        }       
        break;
}
```

:::

#### ffOnAfterFilter - генерируется после фильтрации, позволяет изменить список ID найденных ресурсов

Доступные параметры:

* **$configData** - массив параметров конфигурации.
* **$rids** - объект класса фильтрации.

::: details Пример плагина

```php:line-numbers
switch($modx->event->name){
    case 'ffOnAfterFilter':
        // выполним поиск по отфильтрованным ресурсам
        if ($_REQUEST['query']) {
            if($configData['id'] === 1){
                $modx->event->returnedValues['rids'] =  $modx->runSnippet('searchResource', ['rids' => $rids, 'query' => $_REQUEST['query']]); // вернёт '1,2,3,4'
            }            
        }
        break;
}
```

:::

#### ffOnBeforeSetFilterConditions - генерируется при формировании запроса на фильтрацию, позволяет изменить условия фильтрации

Доступные параметры:

* **$configData** - массив параметров конфигурации.
* **$FlatFilters** - объект класса фильтрации.
* **$conditions** - массив условий фильтрации.

::: details Пример плагина

```php:line-numbers
switch($modx->event->name){
    case 'ffOnBeforeSetFilterConditions':
        // скрываем от пользователей группы Managers ресурсы со статусом 7
        if ($configData['id'] === 2 && $modx->user->isMember(['Managers'])) {
            $conditions[] = '`status` != 7';
        }

        $modx->event->returnedValues['conditions'] = $conditions;
        break;
}
```

:::

#### ffOnBeforeGetFilterValues - генерируется перед формированием списка значений фильтров, позволяет изменить условия получения значений

Доступные параметры:

* **$configData** - массив параметров конфигурации.
* **$FlatFilters** - объект класса фильтрации.
* **$conditions** - массив условий фильтрации.

::: details Пример плагина

```php:line-numbers
switch($modx->event->name){
    case 'ffOnBeforeGetFilterValues':
        // делаем так, чтобы пользователи группы 'Designers' могли видеть только те значения фильтров, которые есть у их ресурсов
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

#### ffOnAfterGetFilterValues - генерируется после формированием списка значений фильтров, позволяет изменить этот список

Доступные параметры:

* **$configData** - массив параметров конфигурации.
* **$FlatFilters** - объект класса фильтрации.
* **$output** - массив значений.

::: details Пример плагина

```php:line-numbers
switch($modx->event->name){
    case 'ffOnAfterGetFilterValues':
        // добавляем в список значений для фильтров 'color' и 'tags' значение 'не задан'
        if ($configData['id'] === 2) {
            foreach($output as $key => $item){
                if(in_array($key, ['color', 'tags'])){
                    $array = $item['values'];
                    $k = array_search("не задан", $array);
                    if ($k !== false) {
                        unset($array[$k]);
                        array_unshift($array, "не задан");
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

## События JavaScript

#### ff:init - инициализация компонента

Событие возникает после загрузки всех модулей, указанных в JS конфигурации. Не имеет параметров. Не может быть отменено. Чтобы без проблем использовать все модули,
подписывайте на это событие, так как после его срабатывания объект **FlatFilters** и его дочерние элементы точно доступны.
::: details Пример использования

```js:line-numbers
document.addEventListener('ff:init', (e) => {
    // получаем дополнительные общие данные после инициализации фильтров
    const total = document.querySelector('[data-total]');
    total && SendIt.setComponentCookie('sitrusted', 1);
    total && SendIt.Sending.prepareSendParams(FlatFilters.MainHandler.form, 'get_totals');
});
```

:::

#### ff:after:reset - сброс всех фильтров

Событие возникает после сброса всех фильтров. Не может быть отменено. Позволяет произвести дополнительные манипуляции после сброса.
::: details Передаваемые параметры

* **filters** - коллекция DOM-элементов с полями фильтрации.
:::

::: details Пример использования

```js:line-numbers
document.addEventListener('ff:after:reset', (e) => {
    const queryField = document.querySelector('[data-query]');
    // сбрасываем поисковый запрос
    queryField && (queryField.value = '');
    
    // сбрасываем выбранный период
    if (typeof dp !== 'undefined') {
        const {datePickerField, datePickerFieldMin, datePickerFieldMax, selectDateText} = project.getDatepickerElements();
        dp.clear();
        datePickerFieldMin && (datePickerFieldMin.value = '');
        datePickerFieldMax && (datePickerFieldMax.value = '');
        selectDateText && (selectDateText.textContent = 'Не задано');
    }    
});
```

:::

#### ff:before:remove - удаление выбранного значения

Событие возникает перед удалением выбранного значения фильтра. Может быть отменено. Позволяет отменить удаление значения.
::: details Передаваемые параметры

* **eventOptions.target** - DOM-элемент кнопки удаления значения.
* **eventOptions.filter** - DOM-элемент поля с фильтром.
* **eventOptions.type** - тип поля.
:::

::: details Пример использования

```js:line-numbers
document.addEventListener('ff:before:remove', (e) => {
    const { eventOptions } = e.detail;  
    // не позволяем сбросить фильтр по цвету 
    if(eventOptions.filter.dataset.ffFilter === 'color'){
        e.preventDefault();
    }   
});
```

:::

#### ff:before:render - отображение выбранного значения

Событие возникает перед показом выбранного значения фильтра. Может быть отменено. Позволяет изменить показываемое значение.
::: details Передаваемые параметры

* **eventOptions.key** - ключ фильтра.
* **eventOptions.value** - передаваемое на сервер значение фильтра.
* **eventOptions.caption** - видимое значение фильтра.
:::

::: details Пример использования

```js:line-numbers
document.addEventListener('ff:before:render', (e) => {
    const { eventOptions } = e.detail;
    // меняем английское название цвета, на русское
    if(eventOptions.key === 'color' && eventOptions.value[0] === 'black'){
        eventOptions.caption = 'Чёрный';
    }
});
```

:::

#### ff:values:disabled - установка недоступных значений

Событие возникает в процессе установки недоступных значений фильтров. Не может быть отменено. Позволяет отменить произведённое действие.

::: details Передаваемые параметры

* **type** - тип поля.
* **element** - DOM-элемент поля с фильтром.
* **key** - ключ фильтра.
* **data** - ответ сервера.
* **filters** - коллекция DOM-элементов с полями фильтрации.
:::

::: details Пример использования

```js:line-numbers
document.addEventListener('ff:values:disabled', (e) => {
    const { type, element, key, data, filters } = e.detail;
    
    // какой-то полезный код
});
```

:::
