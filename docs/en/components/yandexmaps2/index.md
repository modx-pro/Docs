---
title: YandexMaps2
description: Yandex Maps constructor for any objects, mFilter2 integration
logo: https://modstore.pro/assets/extras/yandexmaps2/logo-lg.png
author: gvozdb
modstore: https://modstore.pro/packages/maps/yandexmaps2

items: [
  {
    text: 'Snippets',
    items: [
      { text: 'YandexMaps2', link: 'snippets/yandexmaps2' },
    ],
  },
  { text: 'Quick start', link: 'quick-start' },
  { text: 'Working with mFilter2', link: 'mfilter2-integration' },
  { text: 'jQuery events', link: 'jquery-events' },
  { text: 'Map constructor', link: 'map-constructor' },
  {
    text: 'Plugin events',
    link: 'events/',
    items: [
      { text: 'ymOnLoadObjects', link: 'events/ymonloadobjects' },
      { text: 'Examples', link: 'events/examples' },
    ],
  },
  {
    text: 'Cases',
    items: [
      { text: 'Points from MIGX with custom icons on frontend', link: 'cases/migx-integration' },
      { text: 'Disable all map controls', link: 'cases/disable-elements' },
      { text: 'Output parent resource data in balloons', link: 'cases/parent-data-in-balloons' },
    ],
  },
]
---
# YandexMaps2

::: warning
To keep Yandex.Maps API free, users must meet certain conditions - <https://tech.yandex.ru/maps/jsapi/doc/2.1/terms/index-docpage/#index__conditions>
:::

## Advantages over similar components

- New API version maintained by Yandex team
- [mFilter2 integration][1] out of the box with minimal setup in 3 steps
- Map constructor in backend displays in resources, products, tickets, users
- Works similarly to [UserFiles][2], allowing map constructor integration anywhere in the admin with basic ExtJS knowledge. For example, UserFiles was attached to a custom object without editing source code:

[![](https://file.modx.pro/files/6/d/7/6d769e3a8dec96b995ff750ee9b53664s.jpg)](https://file.modx.pro/files/6/d/7/6d769e3a8dec96b995ff750ee9b53664.png)

## Map constructor appearance

Map constructor in backend when editing a resource:

[![](https://file.modx.pro/files/6/6/7/6671db8a7e4acc9b3b1e5a57a0d0d168s.jpg)](https://file.modx.pro/files/6/6/7/6671db8a7e4acc9b3b1e5a57a0d0d168.png)

[Map constructor details][3]

[1]: /en/components/yandexmaps2/mfilter2-integration
[2]: https://modstore.pro/packages/photos-and-files/userfiles
[3]: /en/components/yandexmaps2/map-constructor
