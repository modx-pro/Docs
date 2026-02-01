# Examples

## 1) Exclude some records from parsing

_Works in version 1.8.11 and above._

```php
$sp = &$scriptProperties;
switch ($modx->event->name) {
  case 'xParserOnBeforeTaskParse':
    // Only for tasks with id 73 and 74
    if (!in_array((int)$task['id'], [73, 74], true)) {
      break;
    }

    // Reshape records
    $items = [];
    foreach ($sp['items'] as $item) {
      // If source field title contains "online-tour" exclude from parsing
      if (preg_match('~(online[- ]tour)~usi', $item['title'])) {
        continue;
      }
      $items[] = $item;
    }
    $modx->event->returnedValues['items'] = $items;
    break;
}
```

## 2) Stop parser without adding anything

```php
switch ($modx->event->name) {
  case 'xParserOnBeforeTaskActions':
    $modx->event->output('I do not want to parse this!');
    break;
}
```

## 3) Disable resource publication if server response was 301, 302, 404

```php
$sp = &$scriptProperties;
switch ($modx->event->name) {
  case 'xParserOnBeforeTaskActions':
    foreach ($sp['rows'] as &$row) {
      $resource = &$row['Resource'];
      // If response code 301, 302, 404
      if (in_array($row['Request']['http_code'], array(301, 302, 404))) {
        $resource['published'] = 0; // set resource published = 0
      }
    }
    unset($resource, $row);
    $modx->event->returnedValues = $sp; // pass modified values back
    break;
}
```
