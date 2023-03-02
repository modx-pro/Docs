For mass photo download in ms2Gallery you can use processor upload. 



In its simplest form, its call looks the following way: 

```

// Download processor call

$response = $modx->runProcessor('gallery/upload', array(

        'file' => $file, // Picture

        'id' => 1 // resource id with the gallery

    ),

    array('processors_path' => MODX_CORE_PATH.'components/ms2gallery/processors/mgr/')

);



// Processor output

if ($response->isError()) {

    print_r($response->getAllErrors());

}

else {

    print_r($response->response);

}

```



A few aspects should be taken into account:



*  In the current version download processor expects ms2Gallery class in MODX object.  You need to connect it:

```

$modx->ms2Gallery = $modx->getService('ms2gallery', 'ms2Gallery', MODX_CORE_PATH . 'components/ms2gallery/model/ms2gallery/');

```

* All picture files are to be found on the server. The scripts is unable to download them from a remote source. 

* In the field `properties` of the resource a file source should be prescribed. To open a resource in admin area is usually enough, but this aspect is needed to be provided in the console import. 



Therefore, there is a ready-made console script which **creates** or **updates** resources and downloads files in them at the specified array:

```

<?php



define('MODX_API_MODE', true);

// The script lies in the website root. If it doesn’t, you need to change the path to index.php 

require 'index.php';

// Necessary service connection 

$modx->getService('error','error.modError');

$modx->setLogLevel(modX::LOG_LEVEL_ERROR);

$modx->setLogTarget(XPDO_CLI_MODE ? 'ECHO' : 'HTML');

$modx->ms2Gallery = $modx->getService('ms2gallery', 'ms2Gallery', MODX_CORE_PATH . 'components/ms2gallery/model/ms2gallery/');



// File directory

$base = MODX_BASE_PATH . 'tmp_files/';

// Picture and resource array

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

        'id' => 2, // If id is specified, the resource should be updated, not created 

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

    $modx->error->reset(); // Error dropping

    

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

        // The file source should be updated. You have to do it manually, as processor simply will overwrite update. 

        // the whole resource properties field, and there can be something useful 

        if ($resource = $modx->getObject('modResource', $id)) {

            $properties = $resource->getProperties('ms2gallery');

            $properties['media_source'] = $values['media_source'];

            $resource->setProperties($properties, 'ms2gallery');

            $resource->save();

        }

    }

    

    // Finally you can download the files

    foreach ($values['files'] as $file) {

        // Download processor call

        $response = $modx->runProcessor('gallery/upload', array(

                'file' => $file, // File path from the server root

                'id' => $id // resource id with the gallery 

            ),

            array('processors_path' => MODX_CORE_PATH . 'components/ms2gallery/processors/mgr/')

        );

        

        // Processor output

        if ($response->isError()) {

            print_r($response->getAllErrors());

        }

    }

}

```
