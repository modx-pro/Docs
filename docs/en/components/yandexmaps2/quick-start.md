# Quick start

::: warning
To keep Yandex.Maps API free, users must meet certain conditions - <https://tech.yandex.ru/maps/jsapi/doc/2.1/terms/index-docpage/#index__conditions>
:::

Yandex [introduced mandatory API key][1] for maps. YandexMaps2 users need to take some steps so their maps work correctly.

## After installation

### Step 1

First, generate an API key. Go to [Developer Console][2], click "Get key" and when filling the form select "JavaScript API and HTTP Geocoder" service.

### Step 2

After submitting the request, copy the new key from the "Keys" section and paste it into system setting `ym2_api_key`.

### For those upgrading

Follow the steps above and update setting `ym2_api_url` to something like: `api-maps.yandex.ru/2.1/?lang=ru_RU&load=package.full&apikey={$key}`.

_I cannot auto-update this setting, because if you previously changed its value, conflicts may occur and maps on your service may stop working._

[1]: https://yandex.ru/blog/mapsapi/novye-pravila-dostupa-k-api-kart
[2]: https://developer.tech.yandex.ru
