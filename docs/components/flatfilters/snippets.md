# Сниппеты

## ffConnector

### Назначение

Обрабатывает запросы компонента.

### Параметры

Не принимает ни каких параметров.

### Результат работы

Возвращает JSON обратно на фронт.

### Пример использования

Используется внутри компонента и не предназначен для отдельного вызова.

## ffGetGroupName

### Назначение

Получает имя группы пользователей по ID.

### Параметры

Не принимает ни каких параметров.

### Результат работы

Возвращает имя группы пользователей.

### Пример использования

Используется внутри компонента и не предназначен для отдельного вызова.

## ffGetFilterForm

### Назначение

Рендерит форму с фильтрами.

### Параметры

* `configId` - ID конфигурации фильтров, которую нужно  вывести.
* `wrapper` - чанк-обертка для фильтров.
* `defaultTplOuter` - чанк-обёртка отдельного фильтра.
* `defaultTplRow` - чанк значения фильтра.

:::tip
Если возникает необходимость задать разные шаблоны для разных фильтров, то следует именовать параметры следующим образом
ключ-фильтраTplOuter - для обёртки;
ключ-фильтраTplRow - для значения.
:::

### Результат работы

Возвращает форму фильтрации.

### Пример использования
:::danger
Не смешивайте синтаксис при использовании компонента.
:::
```fenom:line-numbers
{set $pageLimit = 8}
{set $configId = 1}
{'!ffGetFilterForm' | snippet: [
    'configId' => $configId,
    'pagination' => 'filters',
    'wrapper' => 'tpl.ffForm',
    'priceTplOuter' => 'tpl.ffRange',
    'favoriteTplOuter' => 'tpl.ffCheckbox',
    'newTplOuter' => 'tpl.ffCheckbox',
    'popularTplOuter' => 'tpl.ffCheckbox',
    'colorTplOuter' => 'tpl.ffCheckboxGroupOuter',
    'colorTplRow' => 'tpl.ffCheckboxGroup',
    'defaultTplOuter' => 'tpl.ffSelect',
    'defaultTplRow' => 'tpl.ffOption',
    'createdonTplOuter' => 'tpl.ffDateRange',
]}
```
```modx:line-numbers
[[!ffGetFilterForm?
    &configId=1    
    &wrapper=`tpl.ffForm`
    &priceTplOuter=`tpl.ffRange`
    &favoriteTplOuter=`tpl.ffCheckbox`
    &newTplOuter=`tpl.ffCheckbox`
    &popularTplOuter=`tpl.ffCheckbox`
    &colorTplOuter=`tpl.ffCheckboxGroupOuter`
    &colorTplRow=`tpl.ffCheckboxGroup`
    &defaultTplOuter=`tpl.ffSelect`
    &defaultTplRow=`tpl.ffOption`
    &createdonTplOuter=`tpl.ffDateRange`
]]
```
