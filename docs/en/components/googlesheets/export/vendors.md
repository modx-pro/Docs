# Vendors (msVendor)

## Standard fields

| Field       | Name |
| ----------- | -------- |
| id          | id       |
| name        | Name |
| resource    | Resource    |
| country     | Country   |
| logo        | Logo  |
| address     | Address    |
| phone       | Phone  |
| fax         | Fax     |
| email       | Email    |
| description | Description |

## Export example

**Export fields:** id,name,description,logo

**Result:**

![Result](https://file.modx.pro/files/5/b/9/5b9cd1ed172608f9521ba6898508d3cb.jpg)

## System events

Class **gsVendor** fires these events:

```php
<?php
switch ($modx->event->name) {
  // fetches the list of vendors
  case 'gsOnBeforeGetVendors':
    // $query - selection query
    // $range - sheet name, where data will be exported
    break;
  case 'gsOnGetVendors':
    // $vendors - array of vendors with all fields
    // $range - sheet name
    break;
}
```

### Examples

1. Select vendors that have a logo

    ```php
    <?php
    if ($modx->event->name == 'gsOnBeforeGetVendors') {
      $query->where(array('logo:!=' => ''));
    }
    ```

2. Add default country if vendor has none

    ```php
    <?php
    if ($modx->event->name == 'gsOnGetVendors') {
      $modx->event->params['vendors'] = array_map(function ($vendor) {
        if (empty($vendor['country'])) {
          $vendor['country'] = 'China';
        }
        return $vendor;
      }, $vendors);
    }
    ```
