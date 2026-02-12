# События

## Системные события

#### mspdOnBeforeGetDiscounts - генерируется перед получением списка активных скидок

Доступные параметры:

* **$query** - объект класса \xPDOQuery.
* **$object** - экземпляр класса MsProductDiscounts\Discounts.

::: details Пример плагина

```php:line-numbers
// ограничиваем выборку скидок теми, которые связаны с ресурсом 123
switch ($modx->event->name){
  case 'mspdOnBeforeGetDiscounts':
    $query->where(['mspdDiscount.resource' => 123]);
    break;
}
```

:::

#### mspdOnGetDiscounts - генерируется после получения списка активных скидок

Доступные параметры:

* **$discounts** - массив активных скидок.
* **$object** - экземпляр класса MsProductDiscounts\Discounts.

::: details Пример плагина

```php:line-numbers
switch ($modx->event->name){
// добавляем скидки с id = 123
  case 'mspdOnGetDiscounts':
      if($discount = $modx->getObject('mspdDiscount', 123)){
        $object->discounts[] = $discount->toArray();
      }       
    break;
}
```

:::

#### mspdOnFilterIdsByDiscount - генерируется при запросе списка скидок для товаров в каталоге или на странице отдельного товара

Доступные параметры:

* **$data** - массив всех данных товаров.
* **$ids** - массив id товаров.
* **$object** - экземпляр класса MsProductDiscounts\Discounts.

::: details Пример плагина

```php:line-numbers
// показываем все скидки вне зависимости от системной настройки
switch($modx->event->name){
  case 'mspdOnFilterIdsByDiscount':
        $object->showDiscountsForAll = true;   
    break;
}
```

:::

#### mspdOnGetProductDiscounts - генерируется при получении скидок для товара

Доступные параметры:

* **$productData** - массив данных товара, для которого будут получены скидки.
* **$object** - экземпляр класса MsProductDiscounts\Discounts.

::: details Пример плагина

```php:line-numbers
// добавим опцию color со значением red если товар имеет id = 123
switch($modx->event->name){
  case 'mspdOnGetProductDiscounts':
        if($productData['id'] === 123){
            $productData['options']['color'] = 'red';
        }        
    break;
}
```

:::

#### mspdOnBeforeCheckDiscount - генерируется перед началом проверки товара на соответствие условиям отдельной скидки

Доступные параметры:

* **$discount** - массив данных скидки, содержит только один элемент.
* **$productData** - массив данных товара, для которого будут получены скидки.
* **$object** - экземпляр класса MsProductDiscounts\Discounts.

::: details Пример плагина

```php:line-numbers
// добавим опцию color со значением red если скидка имеет id = 123
switch($modx->event->name){
  case 'mspdOnBeforeCheckDiscount':
        if($discount[0]['id'] === 123){
            $productData['options']['color'] = 'red';
        }        
    break;
}
```

:::

#### mspdOnCheckDiscount - генерируется после проверки товара на соответствие условиям отдельной скидки

Доступные параметры:

* **$discount** - массив данных скидки, содержит только один элемент.
* **$productData** - массив данных товара, для которого будут получены скидки.
* **$object** - экземпляр класса MsProductDiscounts\Discounts.

::: details Пример плагина

```php:line-numbers
// принудительно исключаем товар 123 для скидки 123, если выбран цвет red
switch($modx->event->name){
  case 'mspdOnCheckDiscount':
        if($discount[0]['id'] === 123 && $productData['id'] === 123 && $productData['options']['color'] === 'red'){
            $object->apply = false;
        }        
    break;
}
```

:::

#### mspdOnBeforeCheckCommonConditions - генерируется перед проверкой общих условий: количества в корзине, общей суммы, отступа и лимита

Доступные параметры:

* **$discount** - массив данных скидки, содержит только один элемент.
* **$productData** - массив данных товара, для которого будут получены скидки.
* **$object** - экземпляр класса MsProductDiscounts\Discounts.

::: details Пример плагина

```php:line-numbers
// отменяем проврку общих условий для случаем, когда скидки нужно просто показать; не будет запущено если mspd_show_for_all = `Нет` или $object->showDiscountsForAll = false
switch($modx->event->name){
  case 'mspdOnBeforeCheckCommonConditions':
        if($object->forShow){
            $object->ignoreCommonConditions = true;
        }        
    break;
}
```

:::

#### mspdOnGetProductDataByIds - генерируется перед получение данных о товарах

Доступные параметры:

* **$ids** - массив id товаров, для которых будет проведена проверка на доступность скидок.
* **$object** - экземпляр класса MsProductDiscounts\Discounts.

::: details Пример плагина

```php:line-numbers
// добавим id = 123
switch($modx->event->name){
  case 'mspdOnGetProductDataByIds':
         $object->ids[] = 123;      
    break;
}
```

:::

#### mspdOnGetWebConfig - генерируется перед добавление JS на страницу

Доступные параметры:

* **$webConfig** - массив параметров фронтэнда.
* **$object** - экземпляр класса MsProductDiscounts\Base.

::: details Пример плагина

```php:line-numbers
// передадим на фронт параметр myparam
switch($modx->event->name){
  case 'mspdOnGetWebConfig':
         $object->webConfig['myparam'] = 123;      
    break;
}
```

:::

#### mspdOnBeforeGetPromocode - генерируется перед получением данных промокода

Доступные параметры:

* **$code** - значение промокода.
* **$ctx** - ключ контекста.
* **$object** - экземпляр класса MsProductDiscounts\Promocodes.

::: details Пример плагина

```php:line-numbers
// меняем контекст и промокод если передан промокод TEST
switch($modx->event->name){
  case 'mspdOnBeforeGetPromocode':
      if($code === 'TEST'){
        $object->ctx = 'web'
        $object->code = 'BUYNOW'
      } 
    break;
}
```

#### mspdOnGetPromocode - генерируется после получением данных промокода

Доступные параметры:

* **$code** - значение промокода.
* **$promocodeData** - массив данных промокода.
* **$object** - экземпляр класса MsProductDiscounts\Promocodes.

::: details Пример плагина

```php:line-numbers
// передадим на фронт flag = true, если значение промокода TEST
switch($modx->event->name){
  case 'mspdOnGetPromocode':
      if($code === 'TEST'){       
        $object->promocodeData['flag'] = true;
      } 
    break;
}
```

:::

#### mspdOnBeforeGetDiscountPrice - генерируется перед получением цены со скидкой

Доступные параметры:

* **$discount** - массив данных скидки, содержит только один элемент.
* **$price** - цена товара до применения скидки.
* **$object** - экземпляр класса MsProductDiscounts\Discounts.

::: details Пример плагина

```php:line-numbers
// устновим минимальную цену товара в 0 если скидка id = 123
switch($modx->event->name){
  case 'mspdOnBeforeGetDiscountPrice':
      if($discount[0]['id'] === 123){       
        $object->minPrice = 0;
      } 
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

Событие возникает, когда от сервера получен статус доставки. Не может быть отменено.

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

#### mscdek:point:error - создание маркера на карте

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

Событие возникает, когда карта инициализирована, тут можно добавить объекты и слои. Не может быть отменено.

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

Событие возникает, перед показом карты пользователю, тут можно добавить объекты и слои, изменить координаты центра или зум. Не может быть отменено.

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
