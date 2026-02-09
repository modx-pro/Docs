# ymOnLoadObjects

Plugin runs per resource. A resource can have any number of map objects.

Fires after loading map objects from the database, before processing object text data.

## Parameters

- `array $data` — select data, usually:

```php
Array
(
  parent => (int)
  class => (string)
  list => (string)
)
```

- `array $objects` — map objects list,
- `array $snippetProperties` — snippet params used for object loading.
