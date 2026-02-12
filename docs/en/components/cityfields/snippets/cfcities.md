# cfCities snippet

Snippet for outputting the current city, city list and city selector. On call it includes the CSS and JavaScript files specified in the component system settings.

![Snippet output](https://file.modx.pro/files/a/3/f/a3f58aecef516b7c1e3a87949c837d0d.png)

## Parameters

| Name        | Default          | Description                                                                                         |
|-----------------|-----------------------|--------------------------------------------------------------------------------------------------|
| **&tpl**        | `cfCities.row`        | Row chunk                                                                                        |
| **&tplWrapper** | `cfCities.outer`      | Wrapper chunk for all results. Understands one placeholder: `[[+rows]]`         |
| **&selected**   | `selected="selected"` | If current city, this value is written to placeholder `[[+selected]]`        |
| **&where**      |                       | JSON-encoded array of additional query parameters                                  |
| **&sortby**     | `id`                  | City field to sort the list by. Available: `id`, `key`, `name` |
| **&sortdir**    | `ASC`                 | Sort direction: `DESC` or `ASC`                                 |
| **&limit**      |                       | Maximum number of results                                                       |

## Call examples

To use the component, call the snippet uncached anywhere on the site, with no parameters:

```modx
[[!cfCities]]
```

To sort cities alphabetically:

```modx
[[!cfCities?
  &sortby=`name`
]]
```

To output only certain cities, use the `where` parameter:

```modx
[[!cfCities?
  &where=`{"name:IN":["Moscow","Saint Petersburg","Yekaterinburg","Tyumen"]}`
]]
```

Or limit the number of results:

```modx
[[!cfCities?
  &limit=`12`
]]
```
