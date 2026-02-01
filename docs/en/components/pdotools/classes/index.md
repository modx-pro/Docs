# Classes

The component core is split into 3 classes: [pdoTools][1] (general), [pdoFetch][2] (database), and [pdoParser][3] (templating).

They register on install so you can run them like this:

```php
$pdoTools = $modx->getService('pdoTools');
$pdoFetch = $modx->getService('pdoFetch');
$pdoParser = $modx->getService('pdoParser');
```

pdoFetch extends pdoTools, so you don't need both. Use Fetch for database work, Tools otherwise.

You don't need to call the parser directly; it is enabled or disabled in MODX. pdoTools uses it for chunk processing anyway.

[1]: /en/components/pdotools/classes/pdotools
[2]: /en/components/pdotools/classes/pdofetch
[3]: /en/components/pdotools/classes/pdoparser
