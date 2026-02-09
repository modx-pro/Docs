# Update

Instructions for updating msFavorites.

## Version 3.x changes

Main change: support for any objects; you can build multiple favorites lists without limits.
Markup change: data attribute `data-data-id` was replaced with `data-data-key`; old calls still work. After update everything should work as before.

## Steps when upgrading from 2.x to 3.x

- Uninstall the old package via the package manager
- Install the current component version
- Run the migration script to move data to the new tables

```php
include MODX_CORE_PATH .'components/msfavorites/migration/v2tov3/favorites.php';
```

::: details Script output

```
Import complete in 2.0370631 s

Total idx: 601
Positive: 601
Negative: 0
```

:::
