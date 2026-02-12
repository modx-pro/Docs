# Creating and updating elements

The package includes script `mgr_elems` for site elements: resources, TVs, snippets, and plugins.

To create a resource tree in the admin, use the built-in script. Create folder `create` (default: inside `elements`; or set path in `mpc_path_to_create`). In it create `resource.inc.php` with content like:

```php
return [
  'web' => [
    [
      'pagetitle' => 'Seals and stamps',
      'hidemenu' => false,
      'published' => true,
      'file_name' => 'templatename.tpl',
      'tvs' => ['img' => 'assets/project_files/images/pechati.png'],
      'content' => '
        <div class="custom">
          <blockquote class="blockquote">
              Content text.
          </blockquote>
        </div>
      ',
      'resources' => [
        'pagetitle' => 'Seals and stamps',
        'hidemenu' => false,
        'published' => true,
        'file_name' => 'templatename.tpl',
      ],
    ],
  ],
];
```

`file_name` is the template file name; if set, the same actions as `mgr_tpl.php` run. You can set template ID in field `template`. Field `resources` defines child resources; do not set `parent` for them.

Run in terminal:

```sh
php -d display_errors -d error_reporting=E_ALL public_html/core/components/migxpageconfigurator/console/mgr_elems.php resource
```

## Creating and updating TVs

Same idea as resources: in folder `create` add `tv.inc.php` with content like:

```php
return [
  'test_sbl' => [
    'type' => 'superboxselect',
    'caption' => 'Related articles',
    'description' => '',
    'category' => 'Related resources',
    'input_properties' => [
      'selectType' => 'resources',
      'where' => '[{"template:=":"4"}]'
    ],
    'elements' => '',
    'templates' => ['Main'],
  ],
  'test_img' => [
    'type' => 'image',
    'caption' => 'Image',
    'description' => '',
    'category' => 'MigxPageConfigurator',
    'templates' => ['Empty template'],
    'resources' => [
      'page-types' => 'assets/img.jpg'
    ],
  ],
  'test_migx' => [
    'type' => 'migx',
    'caption' => 'Page config',
    'description' => '',
    'category' => 'MigxPageConfigurator',
    'input_properties' => ['configs' => 'config'],
    'templates' => [
      'Content output',
      'Empty template',
    ],
  ],
  'test_migx2' => [
    'type' => 'migx',
    'caption' => 'Blocks',
    'description' => 'TV description',
    'category' => 'Home blocks',
    'input_properties' => [
      'formtabs' => [
        [
          'caption' => 'Blocks',
          'fields' => [
            ['field' => 'block_title', 'caption' => 'Title'],
            ['field' => 'block_description', 'caption' => 'Description'],
            ['field' => 'block_image', 'caption' => 'Image', 'inputTVtype' => 'image'],
          ],
        ],
      ],
      'columns' => [
        ['header' => 'Image', 'dataIndex' => 'block_image', 'renderer' => 'this.renderImage'],
        ['header' => 'Title', 'dataIndex' => 'block_title'],
        ['header' => 'Description', 'dataIndex' => 'block_description'],
      ],
    ],
    'templates' => ['Content output'],
  ],
];
```

Run:

```sh
php -d display_errors -d error_reporting=E_ALL public_html/core/components/migxpageconfigurator/console/mgr_elems.php tv
```

## Creating and updating snippets

Even though pdoTools supports file-based snippets, a static snippet in the admin can be convenient for short names. In folder `create` add `snippet.inc.php`:

```php
return [
  'testSnippet' => [
    'file' => 'snippet.test',
    'description' => 'builds snippet call with preset',
    'categoryName' => 'New category',
    'properties' => [],
  ],
  'testStaticSnippet' => [
    'file' => 'snippet.static_test',
    'static' => 1,
    'description' => 'gets contacts as array',
    'properties' => [],
  ],
];
```

Snippet code file name is without extension; file goes in `core/elements/snippets/`. In `properties` you can set default parameters.

Run:

```sh
php -d display_errors -d error_reporting=E_ALL public_html/core/components/migxpageconfigurator/console/mgr_elems.php snippet
```

## Creating and updating plugins

Plugins in MODX Revolution must be created in the admin. In folder `create` add `plugin.inc.php`:

```php
return [
  'testPlugin' => [
    'file' => 'plugin.test',
    'description' => '',
    'categoryName' => 'Plugin category',
    'events' => [
      'OnDocFormDelete' => [],
      'OnCacheUpdate' => [],
      'OnResourceUndelete' => [],
      'OnDocFormSave' => [],
      'OnDocFormPrerender' => [],
      'OnLoadWebDocument' => [],
      'OnPackageInstall' => [],
    ],
  ],
  'testStaticPlugin' => [
    'file' => 'plugin.static_test',
    'description' => '',
    'static' => 1,
    'events' => [
      'OnLoadWebDocument' => [],
      'OnPackageInstall' => [],
    ],
  ],
];
```

Plugin code file name is without extension; file goes in `core/elements/plugins/`.

Run:

```sh
php -d display_errors -d error_reporting=E_ALL public_html/core/components/migxpageconfigurator/console/mgr_elems.php plugin
```
