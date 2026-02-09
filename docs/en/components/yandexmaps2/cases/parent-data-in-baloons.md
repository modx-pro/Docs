# Output parent resource data in balloons

Each map object has parent data in the `{$data}` placeholder. With `{$data | print}` in a balloon you get something like:

```php
Array
(
  [parent] => 13
  [class] => modDocument
  [list] => default
)
```

The `parent` element is the parent object ID. _The `modDocument` class means the parent is a resource._

Example: show parent resource pagetitle in the balloon:

```fenom
{$data.parent | resource : 'pagetitle'}
```

For a shared chunk used on many resources with maps, you can output the map snippet and, when balloon content is empty, show parent resource name and a TV. Example:

```fenom
{'!YandexMaps2' | snippet: [
  'class' => 'modDocument',
  'parent' => $_modx->resource.id,
  'defaultBalloonContent' => '
    <div><b>pagetitle</b>: {$data.parent | resource : "pagetitle"}</div>
    <div><b>tv</b>: {$data.parent | resource : "name_of_tv"}</div>
  ',
]}
```

Same approach works with [mFilter2 map output][1].

[1]: /en/components/yandexmaps2/mfilter2-integration
