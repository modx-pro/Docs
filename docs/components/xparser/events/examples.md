# Примеры

## 1) Исключим некоторые записи из парсинга

_Работаем с версии 1.8.11 и выше._

```php
$sp = &$scriptProperties;
switch ($modx->event->name) {
  case 'xParserOnBeforeTaskParse':
    // Только для задания с id 73 и 74
    if (!in_array((int)$task['id'], [73, 74], true)) {
      break;
    }

    // Переформируем записи
    $items = [];
    foreach ($sp['items'] as $item) {
      // Если в поле источника title найдено вхождение "онлайн-экскурс" то исключить статью из парсинга
      if (preg_match('~(онлайн[-– ]экскурс)~usi', $item['title'])) {
        continue;
      }
      $items[] = $item;
    }
    $modx->event->returnedValues['items'] = $items;
    break;
}
```

## 2) Остановим парсер, ничего при этом не добавив

```php
switch ($modx->event->name) {
  case 'xParserOnBeforeTaskActions':
    $modx->event->output('Не хочу это парсить!');
    break;
}
```

## 3) Отключим публикацию ресурса, если код ответа сервера был 301, 302, 404

```php
$sp = &$scriptProperties;
switch ($modx->event->name) {
  case 'xParserOnBeforeTaskActions':
    foreach ($sp['rows'] as &$row) {
      $resource = &$row['Resource'];
      // Если код ответа 301, 302, 404
      if (in_array($row['Request']['http_code'], array(301, 302, 404))) {
        $resource['published'] = 0; // присвоим ресурсу published = 0
      }
    }
    unset($resource, $row);
    $modx->event->returnedValues = $sp; // передаём измененные значения обратно
    break;
}
```
