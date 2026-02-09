# События

## Системные события

#### msCdek2OnSetTariffCode - генерируется на этапе получения кода тарифа, позволяет его подменить

Доступные параметры:

* **$delivery** - объект класса \msDelivery.
* **$object** - экземпляр класса MsCdek2Services\MsCdek2.

::: details Пример плагина

```php:line-numbers
switch ($modx->event->name){
  case 'msCdek2OnSetTariffCode':
    $object->tariffCode = 123;
    break;
}
```

:::

#### msCdek2OnSetRequestData - генерируется перед отправкой запросов в API, позволяет дополнить или изменить данные запроса

Доступные параметры:

* **$method** - метод с помощью которого будет формироваться запрос (`getCalculationRequestData` - подготовка запроса расчёта стоимости;
  `getCoordinatesRequestData` - подготовка запроса на получение координат центра карты при инициализации или смене города;
  `getListPVZRequestData` - подготовка запроса на получение списка ПВЗ).
* **$params** - массив параметров для формирования запроса.
* **$request** - массив сформированного запроса.
* **$object** - экземпляр класса MsCdek2Services\MsCdek2.

::: details Пример плагина

```php:line-numbers
// меняем тип получаемых ПВЗ
switch ($modx->event->name){
  case 'msCdek2OnSetRequestData':
      if($method === 'getListPVZRequestData'){
        $object->requestData['type'] = 'ALL';
      }  
    break;
}
```

:::

#### msCdekOnGetWebConfig - генерируется при добавление JavaScript компонента на страницу, позволяет прокинуть любые параметры в JavaScript

Доступные параметры:

* **$webConfig** - массив параметров конфигурации.
* **$object** - экземпляр класса MsCdek2Services\MsCdek2.

::: details Пример плагина

```php:line-numbers
// меняем стандартный маркер
switch($modx->event->name){
  case 'msCdekOnGetWebConfig':
    $object->webConfig['markerImgParams'] = [
        'width' => 24,
        'height' => 32,
        'src' => 'new/path/to/marker/img.png'
    ];
    break;
}
```

:::

#### msCdek2OnResetStatus - генерируется после сброса некоторых данных статуса доставки

Доступные параметры:

* **$object** - экземпляр класса MsCdek2Services\MsCdek2.

::: details Пример плагина

```php:line-numbers
// удаляем custom_param из статуса доставки
switch ($modx->event->name){
  case 'msCdek2OnResetStatus':
       unset($_SESSION['mscdek2']['data']['custom_param']);
    break;
}
```

:::

## События JavaScript

#### mscdek:initialized - инициализация компонента завершена

Событие возникает после загрузки всех модулей, указанных в JS конфигурации. Не может быть отменено. Чтобы без проблем использовать все модули,
подписывайте на это событие, так как после его срабатывания объект **mscdek** и его дочерние элементы точно доступны.

Доступные параметры:

* **object** - экземпляр класса Mscdek.

::: details Пример использования

```js:line-numbers
document.addEventListener('mscdek:initialized', (e) => {
  console.log(e.detail.object);
});
```

:::

#### mscdek:init - инициализация отдельного модуля компонента завершена

Событие возникает, когда конкретный модуль загружен и инициализирован. Не может быть отменено.

Доступные параметры:

* **moduleName** - имя инициализированного модуля (Address, List, Map).
* **object** - экземпляр класса текущего модуля.

::: details Пример использования

```js:line-numbers
document.addEventListener('mscdek:init', e => {
  const {moduleName, object} = e.detail;
   console.log(moduleName, object);
})
```

:::

#### mscdek:address:select:suggestion - выбор подсказки при вводе адреса

Событие возникает, когда пользователь выбирает одну из подсказок. Может быть отменено.

Доступные параметры:

* **location** - объект данных о выбранном населенном пункте.
* **ymap** - объект карты.
* **object** - экземпляр класса Address.

::: details Пример использования

```js:line-numbers
document.addEventListener('mscdek:address:select:suggestion', e => {
  const {location, ymap, object} = e.detail;  
  console.log(location, ymap, object);  
})
```

:::

#### mscdek:list:get - получение списка ПВЗ

Событие возникает, когда от сервера получен список ПВЗ. Не может быть отменено.

Доступные параметры:

* **showList** - параметр, определяющий будет ли показан список пользователю.
* **cache** - параметр, информирующий о том откуда был получен список с сервера или из кэша.
* **result** - объект ответа сервера.
* **object** - экземпляр класса List.

::: details Пример использования

```js:line-numbers
document.addEventListener('mscdek:list:get', e => {
  const {showList, cache, result, object} = e.detail;
  console.log(cache, result, object);  
})
```

:::

#### mscdek:status:get - получение статуса доставки

Событие возникает, когда от сервера получен статус доставки.  Не может быть отменено.

Доступные параметры:

* **status** - данные о доставке.
* **result** - объект ответа сервера.
* **object** - экземпляр класса List.

::: details Пример использования

```js:line-numbers
document.addEventListener('mscdek:status:get', e => {
  const {status, result, object} = e.detail;
  console.log(status, result, object);  
})
```

:::

#### mscdek:point:change - создание маркера на карте

Событие возникает, когда выбран ПВЗ из списка. Не может быть отменено.

Доступные параметры:

* **mscdekCode** - код выбранного ПВЗ.
* **selectedPoint** - объект данных выбранного ПВЗ.
* **result** - объект ответа сервера.
* **object** - экземпляр класса List.

::: details Пример использования

```js:line-numbers
document.addEventListener('mscdek:point:change', e => {
  const {mscdekCode, selectedPoint, result, object} = e.detail;
  console.log(mscdekCode, selectedPoint, result, object);
})
```

:::

#### mscdek:point:error - отправка заказа без ПВЗ

Событие возникает, когда пользователь отправляет заказ не выбрав ПВЗ. Не может быть отменено.

Доступные параметры:

* **response** - объект ответа сервера.
* **object** - экземпляр класса List.

::: details Пример использования

```js:line-numbers
document.addEventListener('mscdek:point:error', e => {
  const {response, object} = e.detail;
  console.log(response, object);
})
```

:::

#### mscdek:map:init - инициализация карты

Событие возникает, когда карта инициализирована, тут можно добавить объекты и слои.  Не может быть отменено.

Доступные параметры:

* **mapBlock** - html элемент блока, в который отрисована карта.
* **ymap** - объект карты.
* **object** - экземпляр класса Map.

::: details Пример использования

```js:line-numbers
document.addEventListener('mscdek:map:init', e => {
  const {mapBlock, ymap, object} = e.detail;
  console.log(mapBlock, ymap, object);
})
```

:::

#### mscdek:map:show - карта показана

Событие возникает, перед показом карты пользователю, тут можно добавить объекты и слои, изменить координаты центра или зум.  Не может быть отменено.

Доступные параметры:

* **mapBlock** - html элемент блока, в который отрисована карта.
* **mapUpdParams** - объект параметров обновления карты.
* **ymap** - объект карты.
* **object** - экземпляр класса Map.

::: details Пример использования

```js:line-numbers
document.addEventListener('mscdek:map:show', e => {
  const {mapBlock, mapUpdParams, ymap, object} = e.detail;
  console.log(mapBlock, points, coordinates, ymap, object);
})
```

:::

#### mscdek:map:hide - карта скрыта

Событие возникает, после того как карта скрыта. Не может быть отменено.

Доступные параметры:

* **mapBlock** - html элемент блока, в который отрисована карта.
* **ymap** - объект карты.
* **object** - экземпляр класса Map.

::: details Пример использования

```js:line-numbers
document.addEventListener('mscdek:map:hide', e => {
  const {mapBlock, ymap, object} = e.detail;
  console.log(mapBlock, ymap, object);
})
```

:::

#### mscdek:map:choose - выбран ПВЗ на карте

Событие возникает, после того как пользователь выбрал ПВЗ на карте. Не может быть отменено.

Доступные параметры:

* **allMarkers** - коллекция html элементов маркеров.
* **marker** - html элемент выбранного маркера.
* **markerData** - объект данных выбранного ПВЗ.
* **mapBlock** - html элемент блока, в который отрисована карта.
* **ymap** - объект карты.
* **object** - экземпляр класса Map.

::: details Пример использования

```js:line-numbers
document.addEventListener('mscdek:map:choose', e => {
  const {allMarkers, marker, mapBlock, markerData, ymap, object} = e.detail;
  console.log(allMarkers, marker, mapBlock, markerData, ymap, object); 
})
```

:::

#### mscdek:marker:create - создание маркера на карте

Событие возникает, когда создаётся новый маркер на карте. Не может быть отменено.

Доступные параметры:

* **marker** - html элемент выбранного маркера.
* **markerData** - объект данных выбранного ПВЗ.
* **object** - экземпляр класса Map.

::: details Пример использования

```js:line-numbers
document.addEventListener('mscdek:marker:create', e => {
  const {marker, markerData, object} = e.detail;
  console.log(marker, markerData, object);  
})
```

:::
