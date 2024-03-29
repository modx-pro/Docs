# Консольный импорт

Для массовой загрузки фотографий в ms2Gallery можно использовать процесор upload.

В упрощенном виде его вызов выглядит так:

```php
// Вызов процессора загрузки
$response = $modx->runProcessor('gallery/upload', array(
    'file' => $file, // Картинка
    'id' => 1 // id ресурса с галереей
  ),
  array('processors_path' => MODX_CORE_PATH.'components/ms2gallery/processors/mgr/')
);

// Вывод результата работы процессора
if ($response->isError()) {
  print_r($response->getAllErrors());
}
else {
  print_r($response->response);
}
```

Нужно учесть несколько моментов:

- В текущей версии процессор загрузки ожидает класс ms2Gallery в объекте MODX. Нужно его подключить:

  ```php
  $modx->ms2Gallery = $modx->getService('ms2gallery', 'ms2Gallery', MODX_CORE_PATH . 'components/ms2gallery/model/ms2gallery/');
  ```

- Все файлы картинок уже должны быть на сервере. Закачивать их с удалённого источника скрипт не умеет.
- В поле `properties` ресурса должен быть прописан источник файлов. Обычно для этого достаточно просто открыть ресурс в админке, но в консольном импорте этот момент нужно предусмотреть.

Таким образом, вот готовый консольный скрипт, который **создаёт** или **обновляет** ресурсы и загружает в них файлы по указанному массиву:

```php
<?php

define('MODX_API_MODE', true);
// Скрипт лежит в корне сайта. Если нет - нужно поменять путь к index.php
require 'index.php';
// Подключение нужных служб
$modx->getService('error','error.modError');
$modx->setLogLevel(modX::LOG_LEVEL_ERROR);
$modx->setLogTarget(XPDO_CLI_MODE ? 'ECHO' : 'HTML');
$modx->ms2Gallery = $modx->getService('ms2gallery', 'ms2Gallery', MODX_CORE_PATH . 'components/ms2gallery/model/ms2gallery/');

// Диретория с файлами
$base = MODX_BASE_PATH . 'tmp_files/';
// Массив ресурсов и картинок
$resources = array(
  array(
    'context_key' => 'web',
    'pagetitle' => 'Test',
    'alias' => 'test',
    'media_source' => $modx->getOption('ms2gallery_source_default'),
    'files' => array(
      $base . '1.jpg',
      $base . '2.jpg',
      $base . '3.jpg',
    )
  ),
  array(
    'id' => 2, // Если указан id, то будем обновлять ресурс, а не создавать
    'context_key' => 'web',
    'pagetitle' => 'Test 2',
    'alias' => 'test2',
    'media_source' => $modx->getOption('ms2gallery_source_default'),
    'files' => array(
      $base . '4.jpg',
      $base . '5.jpg',
      $base . '6.jpg',
    )
  )
);

foreach ($resources as $values) {
  $modx->error->reset(); // Сброс ошибок

  if (empty($values['id'])) {
    $response = $modx->runProcessor('resource/create', $values);
  }
  else {
    $response = $modx->runProcessor('resource/update', $values);
  }
  if ($response->isError()) {
    print_r($response->getAllErrors());
    return;
  }

  $object = $response->getObject();
  $id = $object['id'];
  if (!empty($values['media_source'])) {
    // Обновляем источник файлов. Это нужно делать вручную, потому что процессор update просто перезапишет
    // всё поле properties ресурса, а там может быть что-то полезное
    if ($resource = $modx->getObject('modResource', $id)) {
      $properties = $resource->getProperties('ms2gallery');
      $properties['media_source'] = $values['media_source'];
      $resource->setProperties($properties, 'ms2gallery');
      $resource->save();
    }
  }

  // И, наконец, загружаем файлы
  foreach ($values['files'] as $file) {
    // Вызов процессора загрузки
    $response = $modx->runProcessor('gallery/upload', array(
        'file' => $file, // Путь к файлу от корня сервера
        'id' => $id // id ресурса с галереей
      ),
      array('processors_path' => MODX_CORE_PATH . 'components/ms2gallery/processors/mgr/')
    );

    // Вывод результата работы процессора
    if ($response->isError()) {
      print_r($response->getAllErrors());
    }
  }
}
```
