# UserLocation events

Available events:

* `ulOnBeforeGetLocation`
* `ulOnGetLocation` - location fetch
  * `object` - location object
* `ulOnBeforeSetLocation`
* `ulOnSetLocation` - location set
  * `object` - location object
* `ulOnProcessLocation` - location processing
  * `object` - location object
* `ulOnDetectLocation` - location detection
  * `object` - location object
  * `data` - location data array

To modify the location object, use a plugin on `ulOnProcessLocation`:

```php
<?php
$object->set('custom_field', 'field value');
```

```php
Array
(
  [id] => 3300000400000
  [name] => Kovrov
  [type] => city
  [postal] => 601900
  ...
  [custom_field] => field value
  [confirmed] => 1
)
```

To block site access by country list, use a plugin on `ulOnDetectLocation`:

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

In locations, create objects with type `withoutaccess` and the country ISO code as id:

![Create withoutaccess objects in locations](https://file.modx.pro/files/b/2/c/b2cee6a3ec445f55fe3076055b52d9aa.jpg)

In the resource field, set the page to redirect the user to with the access denied message.
