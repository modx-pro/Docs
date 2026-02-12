# Filtration methods

mFilter2 can filter data from any tables as long as you define how to get it.

You extend the filter class in `/core/components/msearch2/model/msearch2/filters.class.php` via the **mse2_filters_handler_class** system setting.

To extend the default class, create a new file in `/core/components/msearch2/custom/filters/` named `name.class.php` and extend **mse2FiltersHandler**.

```php
<?php
class myCustomFilter extends mse2FiltersHandler {
  // Override parent methods or add your own
}
```

There are 3 method types:

1. **Getting filter data** — methods **get`Name`Values**.
2. **Building filters for output** — methods **build`Name`Filter**.
3. **Applying the filter** — methods **filter`Name`**.

These methods handle values from the **&filters** parameter. Example:

```modx
&filters=`
  resource|parent:categories,
  resource|template:default,
  ms|price:number,
  tv|myname:default,
  msoption|size:default
`
```

The first word is the method code for fetching data. **resource** calls **getResourceValues**, **ms** calls get**Ms**Values, etc.

The second word is the field to select. You can list several fields for one table if they exist.

The third word is the method name for building and applying the filter. **default** calls build**Default**Filter and filter**Default**, **number** calls build**Number**Filter and filter**Number**, etc.

Standard filter class methods:

| Method | Name in &filters | Description |
|--------|------------------|-------------|
| `getResourceValues` | `resource` | Fetches data for resource fields |
| `getTvValues` | `tv` | Fetches data for TV parameters |
| `getMsValues` | `ms` | Fetches data for MS2 product fields |
| `getMsOptionValues` | `msoption` | Fetches data from MS2 product JSON options table |
| `buildDefaultFilter` | `default` | Builds default checkbox filter |
| `buildNumberFilter` | `number` | Builds numeric filter (e.g. slider) |
| `buildVendorsFilter` | `vendors` | Filter by MS2 vendor names. Only for **vendor**: `ms|vendor:vendors` |
| `buildBooleanFilter` | `boolean` | Boolean filter (Yes/No instead of 0/1) |
| `buildParentsFilter` | `parents` | Filter by two parent levels. Only for **parent**: `resource|parent:parents` |
| `buildCategoriesFilter` | `categories` | Filter by one parent. Only for **parent**: `resource|parent:categories` |
| `buildGrandParentsFilter` | `grandparents` | Filter by second parent. Only for **parent**: `resource|parent:grandparents` |
| `buildFullnameFilter` | `fullname` | Filter by user full name. Only for user id, e.g. `resource|createdby:fullname` |
| `buildYearFilter` | `year` | Filter by year, e.g. `resource|createdon:year` |
| `filterDefault` | `default` | Default filter logic |
| `filterGrandParents` | `grandparents` | Filter by second parent |
| `filterNumber` | `number` | Filter by numeric range |
| `filterYear` | `year` | Filter by date |

You can override any of these or add your own.

## Return values

**Type 1 (get*Values)** must return:

```php
Array (
  [FieldName1] => array(
    [Value1] => array(
      [0] => matching resource id
      [1] => matching resource id
    ),
  ),
)
```

Example for `&filters=resource|parent:parents,resource|template:default`, getResourceValues returns:

```php
Array (
  [parent] => array(
    [0] => array(0 => 1, 1 => 2),
    [2] => array(0 => 5)
  ),
  [template] => array(
    [1] => array(0 => 1, 1 => 2, 2 => 3),
  )
)
```

**Type 2 (build*Filter)** returns an array for displaying filters:

```php
Array (
  [FilterName] => Array (
    [title] => Filter title
    [value] => filter option value
    [type] => optional filter type
    [resources] => Array (
      [0] => resource id
      [1] => resource id
    )
  )
)
```

Example for `&filters=resource|parent:categories`:

```php
Array (
  [Tickets] => Array (
    [title] => Tickets
    [value] => 71
    [type] => parents
    [resources] => Array (0 => 72, 1 => 73, 2 => 74)
  ),
  [mSearch2] => Array (
    [title] => mSearch2
    [value] => 62
    [type] => parents
    [resources] => Array (0 => 63, 1 => 64)
  )
)
```

**Type 3 (filter*)** receives 3 arrays:

- Requested values
- Available values (filter values => matching resource IDs)
- Current result set (resource IDs still in the filter chain)

Example for parent filter. First array — requested parent IDs:

```php
Array (0 => 71)
```

Second — parents and their resources:

```php
Array (
  [71] => Array (0 => 72, 1 => 73, 2 => 74)
)
```

Third — resource IDs still in the result:

```php
Array (0 => 72, 1 => 73, 2 => 74, 3 => 75, 4 => 76)
```

Compare the first with the keys of the second and the values of the third, then return the array of resource IDs that pass. That array is passed to the next filter or to mFilter2 for output.

The user only sees results that pass all filters.
