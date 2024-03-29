# События UserLocation

Доступны следующие события:

* `ulOnBeforeGetLocation`
* `ulOnGetLocation` - получение локации
  * `object` - локация объект
* `ulOnBeforeSetLocation`
* `ulOnSetLocation` - установка локации
  * `object` - локация объект
* `ulOnProcessLocation` - обработка локации
  * `object` - локация объект
* `ulOnDetectLocation` - определение локации
  * `object` - локация объект
  * `data` - массив данных локации

Изменения объекта локации, плагин на событие `ulOnProcessLocation`:

```php
<?php
$object->set('свое поле', 'значение поля');
```

```php
Array
(
  [id] => 3300000400000
  [name] => Ковров
  [type] => city
  [postal] => 601900
  [gninmb] => 3332
  [okato] => 17425000000
  [oktmo] => 17725000
  [fias] => 0b4978e2-e64c-4db1-b84d-93cf34bdb04b
  [active] => 1
  [parent] => 3300000000000
  [resource] => 0
  [description] =>
  [properties] =>
  [свое поле] => значение поля
  [confirmed] => 1
)
```

Запрет показа сайта списку стран, плагин на событие `ulOnDetectLocation`:

```php
/** @var $self ulMethodDetectLocation */
if ($modx->event->name === 'ulOnDetectLocation') {

  if (isset($modx->resource)) {
    $countryCode = '';
    switch (get_class($self)) {
      case 'ulDetectLocationByIpGeoBase':
        if (is_array($data) AND !empty($data['ip']) AND !empty($data['ip']['country'])) {
          $countryCode = $data['ip']['country'];
        }
        break;
      case 'ulDetectLocationBySypexGeo':
        if (is_array($data) AND !empty($data['country']) AND !empty($data['country']['iso'])) {
          $countryCode = $data['country']['iso'];
        }
        break;
      case 'ulDetectLocationByDaData':
        if (is_array($data) AND !empty($data['location']) AND !empty($data['location']['data'])) {
          $countryCode = $data['location']['data']['country_iso_code'];
        }
        break;
    }

    $countryCode = strtoupper($countryCode);
    /** @var $withoutaccess ulLocation */
    if ($withoutaccess = $modx->getObject('ulLocation', ['id' => $countryCode, 'type' => 'withoutaccess', 'active' => true])) {
      if ($withoutaccess->resource AND $withoutaccess->resource != $modx->resource->id) {
        $url = $modx->makeUrl($withoutaccess->resource, '', '', 'full');
        $modx->sendRedirect($url, ['responseCode' => 'HTTP/1.1 403 Forbidden']);
      }
    }
  }

}
```

в локациях создаем объекты с типом `withoutaccess` и iso кодом страны в качестве идентификатора:

![в локациях создаем объекты с типом](https://file.modx.pro/files/b/2/c/b2cee6a3ec445f55fe3076055b52d9aa.jpg)

в поле ресурс указываем страницу на которую будет переадресован пользователь с информацией о запрете доступа.
