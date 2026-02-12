# Console Import

For bulk uploading photos into ms2Gallery you can use the upload processor.

A simplified call looks like this:

```php
// Call the upload processor
$response = $modx->runProcessor('gallery/upload', array(
    'file' => $file, // Image file
    'id' => 1 // ID of the resource with the gallery
  ),
  array('processors_path' => MODX_CORE_PATH.'components/ms2gallery/processors/mgr/')
);

// Output processor result
if ($response->isError()) {
  print_r($response->getAllErrors());
}
else {
  print_r($response->response);
}
```

A few things to keep in mind:

- In the current version the upload processor expects the ms2Gallery class to be loaded in the MODX object. Load it:

  ```php
  $modx->ms2Gallery = $modx->getService('ms2gallery', 'ms2Gallery', MODX_CORE_PATH . 'components/ms2gallery/model/ms2gallery/');
  ```

- All image files must already be on the server. The script cannot upload them from a remote source.
- The resource's `properties` must specify the file source. Usually opening the resource in the manager is enough, but in console import you need to handle this yourself.

Here is a complete console script that **creates** or **updates** resources and uploads files according to the given array:

```php
<?php

define('MODX_API_MODE', true);
// Script is in site root. If not, change path to index.php
require 'index.php';
// Load required services
$modx->getService('error','error.modError');
$modx->setLogLevel(modX::LOG_LEVEL_ERROR);
$modx->setLogTarget(XPDO_CLI_MODE ? 'ECHO' : 'HTML');
$modx->ms2Gallery = $modx->getService('ms2gallery', 'ms2Gallery', MODX_CORE_PATH . 'components/ms2gallery/model/ms2gallery/');

// Directory with files
$base = MODX_BASE_PATH . 'tmp_files/';
// Array of resources and images
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
    'id' => 2, // If id is set, the resource will be updated instead of created
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
  $modx->error->reset(); // Reset errors

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
    // Update file source. Must be done manually because the update processor
    // overwrites the entire resource properties field, which may contain other data
    if ($resource = $modx->getObject('modResource', $id)) {
      $properties = $resource->getProperties('ms2gallery');
      $properties['media_source'] = $values['media_source'];
      $resource->setProperties($properties, 'ms2gallery');
      $resource->save();
    }
  }

  // Finally, upload the files
  foreach ($values['files'] as $file) {
    // Call the upload processor
    $response = $modx->runProcessor('gallery/upload', array(
        'file' => $file, // Path to file from server root
        'id' => $id // ID of the resource with the gallery
      ),
      array('processors_path' => MODX_CORE_PATH . 'components/ms2gallery/processors/mgr/')
    );

    // Output processor result
    if ($response->isError()) {
      print_r($response->getAllErrors());
    }
  }
}
```
