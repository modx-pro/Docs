# jQuery events

Since version 1.2.0 the component includes jQuery triggers.
This logic allows attaching your own JS code to frontend map events.

## ymOnLoadMap

Fires when the map loads.

### Example

```js
$(document).ready(function() {
  $(document).on('ymOnLoadMap', function(e, ym2, map) {
    console.log('ym2', ym2); // YandexMaps2 class instance
    console.log('map', map); // Map object
  });
});
```
