# Categories (msCategory)

## Export fields

All resource fields are supported.

## System events

Class **gsCategory** fires these events:

```php
<?php
switch ($modx->event->name) {
  // fetches the list of categories
  case 'gsOnBeforeGetCategories':
    // $query - selection query
    // $range - sheet name where data will be exported
    break;
  case 'gsOnGetCategories':
    // $categories - array of categories with all fields
    // $range - sheet name
    break;
}
```

### Examples

1. Select categories with a specific parent

    ```php
    <?php
    if ($modx->event->name == 'gsOnBeforeGetCategories') {
      $query->where(array('parent' => 23)); // 23 - parent id
    }
    ```

2. Convert publishedon from milliseconds to date

    ```php
    <?php
    if ($modx->event->name == 'gsOnGetCategories') {
      $modx->event->params['categories'] = array_map(function($category){
        if (!empty($category['publishedon'])) {
          $category['publishedon'] = date("d-m-Y", $category['publishedon']);
        }
        return $category;
      }, $categories);
    }
    ```
