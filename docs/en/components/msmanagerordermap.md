---
title: msManagerOrderMap
description: Shows a map in the order manager, on the Address tab
author: webinmd
modstore: https://modstore.pro/packages/integration/msmanagerordermap
repository: https://github.com/webinmd/msManagerOrderMap

dependencies: miniShop2
---

# msManagerOrderMap

Shows a map in the order manager on the Address tab.

![Appearance](https://file.modx.pro/files/a/c/9/ac9aeeb79b4177b71b1b01d3c2a3fdc1.png)

::: warning
The component does not work without a Yandex Maps API key!
:::

## System settings

| Setting              | Default     | Description                                                                                    |
| -------------------- | :---------: | ---------------------------------------------------------------------------------------------- |
| Address fields       | `addr_street` | Comma-separated fields for the address. Address section fields use prefix addr_                 |
| Yandex Api key       | `-`         | Yandex Maps API key. Get it [here](https://developer.tech.yandex.ru/services/)                 |
| Delivery ID          | `1,2`       | Delivery IDs for which to show the map. Comma-separated                                       |
| Map locale           | `ru_RU`     | Supported: ru_RU, en_US, en_RU, ru_UA, uk_UA, tr_TR                                            |
| Address prefix       | `-`         | Prepended to the address before geocoding                                                      |
| Address suffix       | `-`         | Appended to the address before geocoding                                                       |
| Disable zoom         | No          | Disable map zoom on mouse scroll                                                               |
