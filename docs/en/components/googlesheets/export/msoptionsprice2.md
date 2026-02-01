# msOptionsPrice2

Product options

## Standard fields

| Field        | Name             |
| ------------ | -------------------- |
| name         | Modification name |
| rid          | id resource           |
| type         | Modification type      |
| price        | Price                 |
| old_price    | Old price          |
| article      | SKU              |
| weight       | Weight                  |
| count        | Quantity           |
| image        | Image             |
| active       | Active modification |
| modification | Modification options    |

## Export example

**Export fields:** rid,article,name,price,modification

**Table:**

![Table](https://file.modx.pro/files/0/5/a/05a0e708fd2ff5baa6b40ba49b209362.jpg)

## System events

Class **gsOptionsPrice2** fires these events:

```php
<?php
switch ($modx->event->name) {
  // fetches the list of product modifications
  case 'gsOnBeforeGetOptionsPrice2':
    // $query - selection query
    // $range - sheet name, where data will be exported
    break;
  case 'gsOnGetOptionsPrice2':
    // $options - array of modifications with all fields
    // $range - sheet name
    break;
}
```

### Examples

1. Select all modifications for a specific product

```php
<?php
if ($modx->event->name == 'gsOnBeforeGetOptionsPrice2') {
  $query->where(array('rid' => 3)); // 3  - product id
}
```
