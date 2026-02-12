# Disable all map controls

This case shows how to remove default controls from a map called via snippet. Use the jQuery trigger `ymOnLoadMap` (available since 1.2.0).

## Step 1

Call the snippet as needed.

## Step 2

Add this code after jQuery is loaded:

```js
$(document).ready(function () {
  $(document).on('ymOnLoadMap', function (e, ym2, map) {
    map.controls
      .remove('fullscreenControl')    // fullscreen
      .remove('geolocationControl')   // my location
      .remove('rulerControl')         // ruler
      .remove('trafficControl')       // traffic
      .remove('searchControl')        // search
      .remove('typeSelector')         // layers
      .remove('zoomControl')          // zoom
    ;
  });
});
```

_See all available controls in the [documentation][1]._

This runs your JS after the map loads without modifying `default.js`.

[1]: https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/control.Manager-docpage/#method_detail__add-param-control
