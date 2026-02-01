# Events

## System events

#### mspdOnBeforeGetDiscounts - fired before fetching active discounts list

Available parameters:

* **$query** - \xPDOQuery object.
* **$object** - MsProductDiscounts\Discounts instance.

::: details Plugin example

```php:line-numbers
// limit discount selection to those linked to resource 123
switch ($modx->event->name){
  case 'mspdOnBeforeGetDiscounts':
    $query->where(['mspdDiscount.resource' => 123]);
    break;
}
```

:::

#### mspdOnGetDiscounts - fired after fetching active discounts list

Available parameters:

* **$discounts** - array of active discounts.
* **$object** - MsProductDiscounts\Discounts instance.

::: details Plugin example

```php:line-numbers
switch ($modx->event->name){
  // add discount with id = 123
  case 'mspdOnGetDiscounts':
      if($discount = $modx->getObject('mspdDiscount', 123)){
        $object->discounts[] = $discount->toArray();
      }       
    break;
}
```

:::

#### mspdOnFilterIdsByDiscount - fired when requesting discounts list for catalog products or product page

Available parameters:

* **$data** - array of all product data.
* **$ids** - array of product ids.
* **$object** - MsProductDiscounts\Discounts instance.

::: details Plugin example

```php:line-numbers
// show all discounts regardless of system setting
switch($modx->event->name){
  case 'mspdOnFilterIdsByDiscount':
        $object->showDiscountsForAll = true;   
    break;
}
```

:::

#### mspdOnGetProductDiscounts - fired when getting discounts for product

Available parameters:

* **$productData** - array of product data for which discounts will be fetched.
* **$object** - MsProductDiscounts\Discounts instance.

::: details Plugin example

```php:line-numbers
// add color option with value red if product has id = 123
switch($modx->event->name){
  case 'mspdOnGetProductDiscounts':
        if($productData['id'] === 123){
            $productData['options']['color'] = 'red';
        }        
    break;
}
```

:::

#### mspdOnBeforeCheckDiscount - fired before checking product against discount conditions

Available parameters:

* **$discount** - array of discount data, single element.
* **$productData** - array of product data.
* **$object** - MsProductDiscounts\Discounts instance.

::: details Plugin example

```php:line-numbers
// add color option with value red if discount has id = 123
switch($modx->event->name){
  case 'mspdOnBeforeCheckDiscount':
        if($discount[0]['id'] === 123){
            $productData['options']['color'] = 'red';
        }        
    break;
}
```

:::

#### mspdOnCheckDiscount - fired after checking product against discount conditions

Available parameters:

* **$discount** - array of discount data, single element.
* **$productData** - array of product data.
* **$object** - MsProductDiscounts\Discounts instance.

::: details Plugin example

```php:line-numbers
// forcibly exclude product 123 for discount 123 if color red is selected
switch($modx->event->name){
  case 'mspdOnCheckDiscount':
        if($discount[0]['id'] === 123 && $productData['id'] === 123 && $productData['options']['color'] === 'red'){
            $object->apply = false;
        }        
    break;
}
```

:::

#### mspdOnBeforeCheckCommonConditions - fired before checking common conditions: cart count, total sum, offset and limit

Available parameters:

* **$discount** - array of discount data, single element.
* **$productData** - array of product data.
* **$object** - MsProductDiscounts\Discounts instance.

::: details Plugin example

```php:line-numbers
// skip common conditions check when just showing discounts; won't run if mspd_show_for_all = `No` or $object->showDiscountsForAll = false
switch($modx->event->name){
  case 'mspdOnBeforeCheckCommonConditions':
        if($object->forShow){
            $object->ignoreCommonConditions = true;
        }        
    break;
}
```

:::

#### mspdOnGetProductDataByIds - fired before fetching product data

Available parameters:

* **$ids** - array of product ids for discount availability check.
* **$object** - MsProductDiscounts\Discounts instance.

::: details Plugin example

```php:line-numbers
// add id = 123
switch($modx->event->name){
  case 'mspdOnGetProductDataByIds':
         $object->ids[] = 123;      
    break;
}
```

:::

#### mspdOnGetWebConfig - fired before adding JS to page

Available parameters:

* **$webConfig** - array of frontend parameters.
* **$object** - MsProductDiscounts\Base instance.

::: details Plugin example

```php:line-numbers
// pass myparam to frontend
switch($modx->event->name){
  case 'mspdOnGetWebConfig':
         $object->webConfig['myparam'] = 123;      
    break;
}
```

:::

#### mspdOnBeforeGetPromocode - fired before fetching promocode data

Available parameters:

* **$code** - promocode value.
* **$ctx** - context key.
* **$object** - MsProductDiscounts\Promocodes instance.

::: details Plugin example

```php:line-numbers
// change context and promocode if TEST passed
switch($modx->event->name){
  case 'mspdOnBeforeGetPromocode':
      if($code === 'TEST'){
        $object->ctx = 'web'
        $object->code = 'BUYNOW'
      } 
    break;
}
```

#### mspdOnGetPromocode - fired after fetching promocode data

Available parameters:

* **$code** - promocode value.
* **$promocodeData** - array of promocode data.
* **$object** - MsProductDiscounts\Promocodes instance.

::: details Plugin example

```php:line-numbers
// pass flag = true to frontend if promocode value is TEST
switch($modx->event->name){
  case 'mspdOnGetPromocode':
      if($code === 'TEST'){       
        $object->promocodeData['flag'] = true;
      } 
    break;
}
```

:::

#### mspdOnBeforeGetDiscountPrice - fired before getting discounted price

Available parameters:

* **$discount** - array of discount data, single element.
* **$price** - product price before discount.
* **$object** - MsProductDiscounts\Discounts instance.

::: details Plugin example

```php:line-numbers
// set min product price to 0 if discount id = 123
switch($modx->event->name){
  case 'mspdOnBeforeGetDiscountPrice':
      if($discount[0]['id'] === 123){       
        $object->minPrice = 0;
      } 
    break;
}
```

:::

## JavaScript events

#### mscdek:initialized - component initialization complete

Fired after all modules from JS config are loaded. Cannot be cancelled. Subscribe to this event to safely use all modules, as **mscdek** object and its children are available after it fires.

Available parameters:

* **object** - Mscdek class instance.

::: details Example

```js:line-numbers
document.addEventListener('mscdek:initialized', (e) => {
  console.log(e.detail.object);
});
```

:::

#### mscdek:init - single module initialization complete

Fired when a specific module is loaded and initialized. Cannot be cancelled.

Available parameters:

* **moduleName** - initialized module name (Address, List, Map).
* **object** - current module class instance.

::: details Example

```js:line-numbers
document.addEventListener('mscdek:init', e => {
  const {moduleName, object} = e.detail;
   console.log(moduleName, object);
})
```

:::

#### mscdek:address:select:suggestion - address suggestion selected

Fired when user selects a suggestion. Can be cancelled.

Available parameters:

* **location** - selected location data object.
* **ymap** - map object.
* **object** - Address class instance.

::: details Example

```js:line-numbers
document.addEventListener('mscdek:address:select:suggestion', e => {
  const {location, ymap, object} = e.detail;  
  console.log(location, ymap, object);  
})
```

:::

#### mscdek:list:get - pickup points list received

Fired when pickup points list is received from server. Cannot be cancelled.

Available parameters:

* **showList** - whether to show list to user.
* **cache** - whether list came from server or cache.
* **result** - server response object.
* **object** - List class instance.

::: details Example

```js:line-numbers
document.addEventListener('mscdek:list:get', e => {
  const {showList, cache, result, object} = e.detail;
  console.log(cache, result, object);  
})
```

:::

#### mscdek:status:get - delivery status received

Fired when delivery status is received from server. Cannot be cancelled.

Available parameters:

* **status** - delivery data.
* **result** - server response object.
* **object** - List class instance.

::: details Example

```js:line-numbers
document.addEventListener('mscdek:status:get', e => {
  const {status, result, object} = e.detail;
  console.log(status, result, object);  
})
```

:::

#### mscdek:point:change - pickup point selected

Fired when pickup point is selected from list. Cannot be cancelled.

Available parameters:

* **mscdekCode** - selected pickup point code.
* **selectedPoint** - selected pickup point data.
* **result** - server response object.
* **object** - List class instance.

::: details Example

```js:line-numbers
document.addEventListener('mscdek:point:change', e => {
  const {mscdekCode, selectedPoint, result, object} = e.detail;
  console.log(mscdekCode, selectedPoint, result, object);
})
```

:::

#### mscdek:point:error - pickup point not selected

Fired when user submits order without selecting pickup point. Cannot be cancelled.

Available parameters:

* **response** - server response object.
* **object** - List class instance.

::: details Example

```js:line-numbers
document.addEventListener('mscdek:point:error', e => {
  const {response, object} = e.detail;
  console.log(response, object);
})
```

:::

#### mscdek:map:init - map initialized

Fired when map is initialized; you can add objects and layers. Cannot be cancelled.

Available parameters:

* **mapBlock** - HTML element of map container.
* **ymap** - map object.
* **object** - Map class instance.

::: details Example

```js:line-numbers
document.addEventListener('mscdek:map:init', e => {
  const {mapBlock, ymap, object} = e.detail;
  console.log(mapBlock, ymap, object);
})
```

:::

#### mscdek:map:show - map shown

Fired before showing map to user; you can add objects/layers, change center or zoom. Cannot be cancelled.

Available parameters:

* **mapBlock** - HTML element of map container.
* **mapUpdParams** - map update parameters object.
* **ymap** - map object.
* **object** - Map class instance.

::: details Example

```js:line-numbers
document.addEventListener('mscdek:map:show', e => {
  const {mapBlock, mapUpdParams, ymap, object} = e.detail;
  console.log(mapBlock, points, coordinates, ymap, object);
})
```

:::

#### mscdek:map:hide - map hidden

Fired after map is hidden. Cannot be cancelled.

Available parameters:

* **mapBlock** - HTML element of map container.
* **ymap** - map object.
* **object** - Map class instance.

::: details Example

```js:line-numbers
document.addEventListener('mscdek:map:hide', e => {
  const {mapBlock, ymap, object} = e.detail;
  console.log(mapBlock, ymap, object);
})
```

:::

#### mscdek:map:choose - pickup point chosen on map

Fired when user selects pickup point on map. Cannot be cancelled.

Available parameters:

* **allMarkers** - collection of marker HTML elements.
* **marker** - selected marker HTML element.
* **markerData** - selected pickup point data.
* **mapBlock** - HTML element of map container.
* **ymap** - map object.
* **object** - Map class instance.

::: details Example

```js:line-numbers
document.addEventListener('mscdek:map:choose', e => {
  const {allMarkers, marker, mapBlock, markerData, ymap, object} = e.detail;
  console.log(allMarkers, marker, mapBlock, markerData, ymap, object); 
})
```

:::

#### mscdek:marker:create - marker created on map

Fired when new marker is created on map. Cannot be cancelled.

Available parameters:

* **marker** - marker HTML element.
* **markerData** - pickup point data.
* **object** - Map class instance.

::: details Example

```js:line-numbers
document.addEventListener('mscdek:marker:create', e => {
  const {marker, markerData, object} = e.detail;
  console.log(marker, markerData, object);  
})
```

:::
