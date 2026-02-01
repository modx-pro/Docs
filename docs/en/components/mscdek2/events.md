# Events

## System events

#### msCdek2OnSetTariffCode — fired when tariff code is obtained; allows overriding it

Parameters:

* **$delivery** — \msDelivery instance.
* **$object** — MsCdek2Services\MsCdek2 instance.

::: details Plugin example

```php:line-numbers
switch ($modx->event->name){
  case 'msCdek2OnSetTariffCode':
    $object->tariffCode = 123;
    break;
}
```

:::

#### msCdek2OnSetRequestData — fired before API requests; allows modifying request data

Parameters:

* **$method** — request method: `getCalculationRequestData` (cost), `getCoordinatesRequestData` (map center), `getListPVZRequestData` (pickup list).
* **$params** — request parameters.
* **$request** — built request.
* **$object** — MsCdek2Services\MsCdek2 instance.

::: details Plugin example

```php:line-numbers
// change pickup type
switch ($modx->event->name){
  case 'msCdek2OnSetRequestData':
      if($method === 'getListPVZRequestData'){
        $object->requestData['type'] = 'ALL';
      }
    break;
}
```

:::

#### msCdekOnGetWebConfig — fired when component JS is added to page; allows passing config to JavaScript

Parameters:

* **$webConfig** — config array.
* **$object** — MsCdek2Services\MsCdek2 instance.

::: details Plugin example

```php:line-numbers
// change default marker
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

#### msCdek2OnResetStatus — fired after delivery status data is reset

Parameters:

* **$object** — MsCdek2Services\MsCdek2 instance.

::: details Plugin example

```php:line-numbers
// remove custom_param from status
switch ($modx->event->name){
  case 'msCdek2OnResetStatus':
       unset($_SESSION['mscdek2']['data']['custom_param']);
    break;
}
```

:::

## JavaScript events

#### mscdek:initialized — component init complete

Fired after all JS config modules are loaded. Cannot be cancelled. Subscribe to use **mscdek** and its modules.

Parameters:

* **object** — Mscdek instance.

::: details Example

```js:line-numbers
document.addEventListener('mscdek:initialized', (e) => {
  console.log(e.detail.object);
});
```

:::

#### mscdek:init — single module init complete

Fired when a module is loaded and initialized. Cannot be cancelled.

Parameters:

* **moduleName** — module name (Address, List, Map).
* **object** — module instance.

::: details Example

```js:line-numbers
document.addEventListener('mscdek:init', e => {
  const {moduleName, object} = e.detail;
   console.log(moduleName, object);
})
```

:::

#### mscdek:address:select:suggestion — address suggestion selected

Fired when user selects a suggestion. Can be cancelled.

Parameters:

* **location** — selected location data.
* **ymap** — map object.
* **object** — Address module instance.

::: details Example

```js:line-numbers
document.addEventListener('mscdek:address:select:suggestion', e => {
  const {location, ymap, object} = e.detail;
  console.log(location, ymap, object);
})
```

:::

#### mscdek:list:get — pickup list received

Fired when pickup list is received from server. Cannot be cancelled.

Parameters:

* **showList** — whether list is shown.
* **cache** — from server or cache.
* **result** — server response.
* **object** — List instance.

::: details Example

```js:line-numbers
document.addEventListener('mscdek:list:get', e => {
  const {showList, cache, result, object} = e.detail;
  console.log(cache, result, object);
})
```

:::

#### mscdek:status:get — delivery status received

Fired when delivery status is received. Cannot be cancelled.

Parameters:

* **status** — delivery data.
* **result** — server response.
* **object** — List instance.

::: details Example

```js:line-numbers
document.addEventListener('mscdek:status:get', e => {
  const {status, result, object} = e.detail;
  console.log(status, result, object);
})
```

:::

#### mscdek:point:change — pickup selected from list

Fired when user selects a pickup from the list. Cannot be cancelled.

Parameters:

* **mscdekCode** — selected pickup code.
* **selectedPoint** — selected pickup data.
* **result** — server response.
* **object** — List instance.

::: details Example

```js:line-numbers
document.addEventListener('mscdek:point:change', e => {
  const {mscdekCode, selectedPoint, result, object} = e.detail;
  console.log(mscdekCode, selectedPoint, result, object);
})
```

:::

#### mscdek:point:error — order submitted without pickup

Fired when user submits order without selecting a pickup. Cannot be cancelled.

Parameters:

* **response** — server response.
* **object** — List instance.

::: details Example

```js:line-numbers
document.addEventListener('mscdek:point:error', e => {
  const {response, object} = e.detail;
  console.log(response, object);
})
```

:::

#### mscdek:map:init — map initialized

Fired when map is initialized; add layers/objects here. Cannot be cancelled.

Parameters:

* **mapBlock** — map container element.
* **ymap** — map object.
* **object** — Map instance.

::: details Example

```js:line-numbers
document.addEventListener('mscdek:map:init', e => {
  const {mapBlock, ymap, object} = e.detail;
  console.log(mapBlock, ymap, object);
})
```

:::

#### mscdek:map:show — map shown

Fired before map is shown; change center/zoom here. Cannot be cancelled.

Parameters:

* **mapBlock** — map container.
* **mapUpdParams** — map update params.
* **ymap** — map object.
* **object** — Map instance.

::: details Example

```js:line-numbers
document.addEventListener('mscdek:map:show', e => {
  const {mapBlock, mapUpdParams, ymap, object} = e.detail;
  console.log(mapBlock, points, coordinates, ymap, object);
})
```

:::

#### mscdek:map:hide — map hidden

Fired after map is hidden. Cannot be cancelled.

Parameters:

* **mapBlock** — map container.
* **ymap** — map object.
* **object** — Map instance.

::: details Example

```js:line-numbers
document.addEventListener('mscdek:map:hide', e => {
  const {mapBlock, ymap, object} = e.detail;
  console.log(mapBlock, ymap, object);
})
```

:::

#### mscdek:map:choose — pickup selected on map

Fired when user selects a pickup on the map. Cannot be cancelled.

Parameters:

* **allMarkers** — all marker elements.
* **marker** — selected marker element.
* **markerData** — selected pickup data.
* **mapBlock** — map container.
* **ymap** — map object.
* **object** — Map instance.

::: details Example

```js:line-numbers
document.addEventListener('mscdek:map:choose', e => {
  const {allMarkers, marker, mapBlock, markerData, ymap, object} = e.detail;
  console.log(allMarkers, marker, mapBlock, markerData, ymap, object);
})
```

:::

#### mscdek:marker:create — marker created

Fired when a new map marker is created. Cannot be cancelled.

Parameters:

* **marker** — marker element.
* **markerData** — pickup data.
* **object** — Map instance.

::: details Example

```js:line-numbers
document.addEventListener('mscdek:marker:create', e => {
  const {marker, markerData, object} = e.detail;
  console.log(marker, markerData, object);
})
```

:::
