# События

Доступны следующие события:

- `rgOnBeforeGetEffectiveUrl`
- `rgOnAfterGetEffectiveUrl` - получение прямой ссылки.
  - `data`  - дата объект.
  - `url`   - ссылка.
  - `value` - полученная ссылка.
  - `clear` - флаг.

## Примеры

Подменить `url` при защите от парсинга страницы товара:

```php
<?php

if ($modx->event->name === 'rgOnAfterGetEffectiveUrl') {

    if (!empty($value)) {
      return;
    }

    $parts = parse_url($url);
    $host = isset($parts['host']) ? $parts['host'] : '';

    $return = false;
    switch (true) {
      case $host[0] !== 'm' AND preg_match("!aliexpress.!usi", $host):
        $parts['host'] = 'm.' . $host;
        $return = true;
        break;
    }


    if ($return) {
      if (!empty($parts['scheme'])) {
        $value = $parts['scheme'] . '://' . $parts['host'];
      } else {
        $value = '//' . $parts['host'];
      }
      if (!empty($parts['path'])) {
        $value .= $parts['path'];
      }
    }

    if ($value) {
      $modx->event->returnedValues['value'] = $value;
    }

}
```
