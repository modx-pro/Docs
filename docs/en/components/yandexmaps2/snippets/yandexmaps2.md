# YandexMaps2

Main snippet of the component that outputs the map on the frontend.

## Parameters

| Name                     | Default           | Description                                                                                                                                                                                                                 |
| ------------------------ | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **parents**              |                   | ID of parent with nested resources that have objects on the map.                                                                                                                                                     |
| **parent**               | `0`               | ID of resource with objects on the map.                                                                                                                                                                                         |
| **class**                |                   | Object class.                                                                                                                                                                                                           |
| **list**                 | `default`         | List name. The map will be bound to it.                                                                                                                                                                                |
| **map**                  | `ym2map`          | ID of map block.                                                                                                                                                                                                       |
| **center**               | `[55.72, 37.64]`  | Map center coordinates.                                                                                                                                                                                            |
| **zoom**                 | `10`              | Map zoom level.                                                                                                                                                                                                       |
| **scrollZoom**           | `1`               | Zoom on mouse scroll.                                                                                                                                                                                          |
| **objectsInScope**       | `0`               | Set center and zoom based on objects on the map. In other words, if `true` or `1`, all map objects will fit in the viewport, and `center` and `zoom` properties will be **ignored**. |
| **objects**              |                   | Array of map objects. If specified, objects will not be fetched from the database.                                                                                                                                     |
| **defaultIconContent**   |                   | Icon label. Used when the map icon has no content.                                                                                                                                                    |
| **defaultIconCaption**   |                   | Icon title. Used when the map icon has no content.                                                                                                                                                     |
| **defaultBalloonContent**|                   | Balloon text. Used when the map object has no content.                                                                                                                                                        |
| **mode**                 | `default`         | Snippet mode. Options: `default`, `mfilter2`                                                                                                                                                                          |
| **apiUrl**               |                   | Link to Yandex Maps API. If specified, overrides system setting `ym2_api_url`.                                                                                                                              |
| **apiKey**               |                   | Yandex Maps API key. If specified, overrides system setting `ym2_api_key`.                                                                                                                                   |
| **scripts**              | `1`               | Whether to load map scripts.                                                                                                                                                                                       |
| **jquery**               | `1`               | Whether to load jQuery.                                                                                                                                                                                              |
| **tpl**                  | `tpl.YandexMaps2` | Map output chunk.                                                                                                                                                                                                       |

::: warning Important!
Specify either `parents` or `parent` parameter. They are interchangeable. Examples below show usage for better understanding.
:::

## Examples

### All objects of resource 15 with class modDocument

```fenom
{'!YandexMaps2' | snippet: [
  'parent' => 15,
  'class' => 'modDocument',
]}
```

### All objects of class modDocument

```fenom
{'!YandexMaps2' | snippet: [
  'class' => 'modDocument',
]}
```

### All objects of nested resources of parent 15 with class modDocument

```fenom
{'!YandexMaps2' | snippet: [
  'parents' => 15,
  'class' => 'modDocument',
]}
```

### All objects of class msProduct with scroll zoom disabled

```fenom
{'!YandexMaps2' | snippet: [
  'class' => 'msProduct',
  'scrollZoom' => false,
]}
```

### All user objects

```fenom
{'!YandexMaps2' | snippet: [
  'class' => 'modUser',
  'map' => 'ym2map-users',
]}
```
