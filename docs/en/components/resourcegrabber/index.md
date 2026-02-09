---
title: ResourceGrabber
description: The component implements parsing data from a URL
logo: https://modstore.pro/assets/extras/resourcegrabber/logo-lg.png
author: vgrish
modstore: https://modstore.pro/packages/import-and-export/resourcegrabber

items: [
  {
    text: 'Interface',
    link: 'interface/',
    items: [
      { text: 'Data', link: 'interface/data' },
      { text: 'Snippets', link: 'interface/snippets' },
      { text: 'Settings', link: 'interface/settings' },
    ],
  },
  {
    text: 'Development',
    items: [
      {
        text: 'Services',
        items: [
          { text: 'Getter', link: 'development/services/getter' },
          { text: 'Grabber', link: 'development/services/grabber' },
          { text: 'Setter', link: 'development/services/setter' },
        ],
      },
      { text: 'Events', link: 'development/events' },
    ],
  },
]
---
# Quick start

You need MODX **2.3** or higher and PHP **5.4** or higher.

## Description

**ResourceGrabber** - Resource Grabber. The component implements parsing data from a URL.

![ResourceGrabber](https://file.modx.pro/files/1/e/9/1e9d05d759ccf7a3abfc7b28c4746b95.png)

Features:

- Integration with [**miniShop2**][0102] (creating/updating products)
- Integration with [**CurrencyRate**][0103]. (price modification)
- Integration with [**msOptionSeller**](https://modstore.pro/packages/ecommerce/msoptionseller). (setting the option `Store` miniShop2 product)

## Demo site

Demo site available at [http://s14332.h10.modhost.pro](http://s14332.h10.modhost.pro).

Login and password for [the manager](http://s14332.h10.modhost.pro/manager/): `test`

## Installation

- [Add our repository](https://modhost.pro)
- Install [**miniShop2**][0102] - the shop that provides store functionality
- Install **ResourceGrabber**

For testing you can use [our hosting](https://modhost.pro); these extras can be selected when creating a site.

![Installation](https://file.modx.pro/files/5/7/a/57a30e0dc6e98d36ff56e9718a5f0bc0.png)

### Settings

- `working_templates` — list the template IDs for which to enable the feature.

## Snippets

Create a snippet to parse data. A sample snippet for the `aliexpress` site is in `core/components/resourcegrabber/snippets/aliexpress/product.inc`.

You can create a snippet for your needs following this example.

## Cron

To update resources you can use the `cron` script; an example is in `core/components/resourcegrabber/cron/update.php`.

```php
<?php

// update all miniShop2 products older than 5 days

$q = $modx->newQuery('GrabData');
$q->setClassAlias('Grab');
$q->innerJoin('msProduct', 'Product', 'Grab.id = Product.id');
$q->where(array(
  'Grab.timestamp:<'  => $ResourceGrabber->changeDate(time(), '5d', true),
  'Product.deletedon' => false,
));

$idx = 0;
/** @var GrabData $d */
foreach ($modx->getCollection('GrabData', $q) as $d) {
  if ($data = $d->grab()) {
    $d->set('data', $data);
    $d->save();
    $idx++;
  }
}

$modx->log(modX::LOG_LEVEL_ERROR, "Process total: " . $idx);
```

[0102]: /en/components/minishop2/
[0103]: /en/components/currencyrate
