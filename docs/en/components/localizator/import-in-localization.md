# Import into localizations

If you run an online store and need to tie product attribute import (TVs) into **MiniShop2** via **msImportExport**, here is one approach:

## Category import

- Create a plugin, e.g. `localizatorMSIECatUA`
- In **System events** subscribe to `msieOnAfterImportCategory`
- Plugin code:

```php
<?php
/* @var modX $modx */
/* @var localizator $localizator */
$localizator = $modx->getService('localizator');
switch($modx->event->name) {
  case 'msieOnAfterImportCategory':
    // by MSIE preset (see msImportExport field mapping)
    if ($preset != 6) return;

    // Uncomment for debug
    // $modx->log(xPDO::LOG_LEVEL_ERROR, 'srcData: '.print_r($srcData,1)."\ndestData:".print_r($destData,1)."\ndata:".print_r($data,1));

    // Fill localizations from import file
    $localizatorContent = array(
      'key' => 'ru',
      'resource_id' => $data['id'],
      'pagetitle' => $srcData[4], // column in file
    );

    if (!empty($srcData[36])){
      $localizatorContent['longtitle'] = $srcData[36];
    }
    if (!empty($srcData[37])){
      $localizatorContent['seotitle'] = $srcData[37];
    }
    if (!empty($srcData[38])){
      $localizatorContent['description'] = $srcData[38];
    }
    if (!empty($srcData[39])){
      $localizatorContent['introtext'] = $srcData[39];
    }

    $content[] = $localizatorContent;

    foreach ($content as $arr) {
      if (!$loc = $modx->getObject('localizatorContent', array('key' => $arr['key'], 'resource_id' => $data['id']))){
        $loc = $modx->newObject('localizatorContent');
      }
      $loc->fromArray($arr);
      $loc->save();
    }

    $tvs = array();

    // Fill TVs from import file
    $tvs[] = array(
      'key' => 'ua',
      'tmplvarid' => 67, // TV id
      'contentid' => $data['id'],
      'value' => $srcData[3], // Excel column
    );

    $tvs[] = array(
      'key' => 'ua',
      'tmplvarid' => 68,
      'contentid' => $data['id'],
      'value' => $srcData[4],
    );

    $tvs[] = array(
      'key' => 'ua',
      'tmplvarid' => 85,
      'contentid' => $data['id'],
      'value' => $srcData[22],
    );

    $table = $modx->getTableName('locTemplateVarResource');
    foreach ($tvs as $arr) {
      $loctv = $modx->getObject('locTemplateVarResource', array('key' => $arr['key'], 'contentid' => $data['id'], 'tmplvarid' => $arr['tmplvarid']));

      if (!empty($arr['value'])) {
        if (!$loctv){
          $loctv = $modx->newObject('locTemplateVarResource');
        }
        $loctv->fromArray($arr);
        $loctv->save();
        $modx->log(modX::LOG_LEVEL_ERROR, 'save - '.print_r($arr, 1));
      }
      elseif ($loctv) {
        $loctv->remove();
      }
    }
    break;
  }
```

- Enable the plugin
- In **msImportExport** → **Import** choose **Category import**, select the field mapping
- Run import
- When done, localizations and TV values will be created

## Product import

- Create a plugin, e.g. `localizatorMSIEProductUA`
- In **System events** subscribe to `msieOnAfterImportProduct`
- Use the same pattern as for categories (adjust preset id, map TV/Excel columns, set localization key)
