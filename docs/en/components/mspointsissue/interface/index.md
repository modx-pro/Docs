# Interface

The Manager is in a separate site section: [miniShop2 settings][01020104], tab **Delivery options**.
The delivery window has the following component tabs:

## Points

Tab that lists delivery points. Sortable and searchable.
Actions: **create**/**edit**/**delete** point.

![Points](https://file.modx.pro/files/2/8/8/2885b4e4512e4f93904d1752e3a67513.png)

Points can be loaded via the [geonames](http://www.geonames.org) service.

## Terminals

Tab that lists delivery terminals.
Actions: **create**/**edit**/**delete** terminal.

![Terminals - 1](https://file.modx.pro/files/1/5/8/1582155fa31727cef0b3796e92d65411.png)

Address search on the map. Google and Yandex map services are available.

![Terminals - 2](https://file.modx.pro/files/2/c/f/2cff73134c3033e1af829730ab6e8984.png)

## Properties

Tab for the delivery method properties — the `properties` field.

```json
{
  "hidden": "delivery_address,mspointsissue_map",
  "geonames": {
    "country": "RU",
    "cities": "cities15000"
  },
  "mode": "point"
}
```

- `mode` — delivery mode. Values: `terminal`, `point`.
- `geonames` — geonames service parameters for loading delivery points
- `hidden` — list of hidden order form fields

[01020104]: /en/components/minishop2/interface/settings
