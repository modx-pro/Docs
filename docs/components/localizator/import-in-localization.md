# Импорт в локализации

Если вы делаете интернет-магазин и вам наужно связать импорт характеристик товара (созданных через ТВ параметры) в **MiniShop2** через **msImportExport**, то ниже решение данного кейса:

## Импорт категорий товаров

- Создаем плагин, называем его для примера `localizatorMSIECatUA`
- Во вкладке **Системные события** отмечаем событие `msieOnAfterImportCategory`
- В коде плагина пишем:

```php
<?php
/* @var modX $modx */
/* @var localizator $localizator */
$localizator = $modx->getService('localizator');
switch($modx->event->name) {
    case 'msieOnAfterImportCategory':
        // по набору параметров MSIE (можно посмотреть в msImportExport в Управлении списком настроек полей)
        if ($preset != 6) return;

        // Для вывода лога работы нужно раскоментировать
        // $modx->log(xPDO::LOG_LEVEL_ERROR, 'srcData: '.print_r($srcData,1)."\ndestData:".print_r($destData,1)."\ndata:".print_r($data,1));

        // Заполняешь Локализации из файла импорта
        $localizatorContent = array(
          'key' => 'ru',
          'resource_id' => $data['id'],
          'pagetitle' => $srcData[4], //колонка в файле
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

        // Заполняешь ТВшки из файла импорта
        $tvs[] = array(
            'key' => 'ua',
            'tmplvarid' => 67, //id tvшки
            'contentid' => $data['id'],
            'value' => $srcData[3], // колонка в файле Excel
        );

        $tvs[] = array(
            'key' => 'ua',
            'tmplvarid' => 68, //id tvшки
            'contentid' => $data['id'],
            'value' => $srcData[4], //колонка в файле Excel
        );

        $tvs[] = array(
            'key' => 'ua',
            'tmplvarid' => 85, //id tvшки
            'contentid' => $data['id'],
            'value' => $srcData[22], //колонка в файле
        );

        $table = $modx->getTableName('locTemplateVarResource');
        foreach ($tvs as $arr) {
            $loctv = $modx->getObject('locTemplateVarResource', array('key' => $arr['key'], 'contentid' => $data['id'], 'tmplvarid' => $arr['tmplvarid']));

            if (!empty($arr['value'])){
                if (!$loctv){
                    $loctv = $modx->newObject('locTemplateVarResource');
                }
                $loctv->fromArray($arr);
                $loctv->save();
                $modx->log(modX::LOG_LEVEL_ERROR, 'save - '.print_r($arr, 1));
            }
            elseif($loctv){
                $loctv->remove();
            }
        }
        //$modx->log(xPDO::LOG_LEVEL_ERROR, 'content: '.print_r($content,1).print_r($tvs,1));
        break;
    }
```

- Активируем плагин
- Переходим в **msImportExport** -> **Импорт**, выбираем **Импорт категорий товаров**, **Указываем настройку полей**, указанную в файле
- Запускаем импорт
- По завершению у нас будут созданы Локализации и заполнены соответствующие поля TV.

## Импорт товаров

- Создаем плагин, называем его для примера `localizatorMSIEProductUA`
- Во вкладке **Системные события** отмечаем событие `msieOnAfterImportProduct`
- В коде плагина пишем тоже самое по аналогии с Импортом категорий (меняем id настройки полей, прописываем соответствие полей TV/колонок Excel, меняем ключ локализации).
