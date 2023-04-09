# Создание и обновление ресурсов

В комплекте с компонентом MigxPageConfigurator поставляется скрипт `mgr_elems` для работы с элементами сайта: ресурсами, TV, сниппетами и плагинами.

Часто при разработке сайта требуется создать в админке дерево ресурсов. Для ускорения процесса можно воспользоваться встроенным скриптом. Создайте папку `create`, по умолчанию в папке `elements`, если у вас другой путь, пропишите его в системной настройке `mpc_path_to_create`. В папке создайте файл `resource.inc.php` примерно с таким содержимым

```php
return [
  'web' => [
    [
      'pagetitle' => 'Изготовление печатей и штампов',
      'hidemenu' => false,
      'published' => true,
      'file_name' => 'templatename.tpl',
      'tvs' => ['img' => 'assets/project_files/images/pechati.png'],
      'content' => '
        <div class="custom">
          <blockquote class="blockquote">
              Таким образом, постоянный количественный рост и сфера нашей активности однозначно определяет каждого участника как способного принимать собственные решения касаемо стандартных подходов.
          </blockquote>
        </div>
      ',
      'resources' => [
        'pagetitle' => 'Изготовление печатей и штампов',
        'hidemenu' => false,
        'published' => true,
        'file_name' => 'templatename.tpl',
      ],
    ],
  ],
];
```

где `file_name` - имя файла шаблона, если указано будут произведены те же действия, что и при запуске скрипта `mgr_tpl.php`. Однако, можно указать сразу ID нужного шаблона в
поле `template`. Как вы поняли поле `resources` отвечает за дочерние ресурсы, для них не нужно указывать `parent`.
Затем нужно запустить в терминале скрипт:

```sh
php -d display_errors -d error_reporting=E_ALL public_html/core/components/migxpageconfigurator/console/mgr_elems.php resource
```

## Создание и обновление TV

С переменными шаблонов всё то же самое, что и с ресурсами: в папке `create` создаем файл `tv.inc.php`. Содержимое файла должно быть примерно таким

```php
return [
  'test_sbl' => [
    'type' => 'superboxselect',
    'caption' => 'Связанные статьи',
    'description' => '',
    'category' => 'Связанные ресурсы',
    'input_properties' => [
      'selectType' => 'resources',
      'where' => '[{"template:=":"4"}]'
    ],
    'elements' => '',
    'templates' => ['Главная'],
  ],
  'test_img' => [
    'type' => 'image',
    'caption' => 'Картинка',
    'description' => '',
    'category' => 'MigxPageConfigurator',
    'templates' => ['Пустой шаблон'],
    'resources' => [
      'page-types' => 'assets/img.jpg'
    ],
  ],
  'test_migx' => [
    'type' => 'migx',
    'caption' => 'Конфигурация страницы',
    'description' => '',
    'category' => 'MigxPageConfigurator',
    'input_properties' => ['configs' => 'config'],
    'templates' => [
      'Вывод содержимого',
      'Пустой шаблон',
    ],
  ],
  'test_migx2' => [
    'type' => 'migx',
    'caption' => 'Блоки',
    'description' => 'Описание ТВ',
    'category' => 'Блоки на главной',
    'input_properties' => [
      'formtabs' => [
        [
          'caption' => 'Блоки',
          'fields' => [
            [
              'field' => 'block_title',
              'caption' => 'Заголовок',
            ],
            [
              'field' => 'block_description',
              'caption' => 'Описание',
            ],
            [
              'field' => 'block_image',
              'caption' => 'Картинка',
              'inputTVtype' => 'image',
            ],
          ],
        ],
      ],
      'columns' => [
        [
          'header' => 'Картинка',
          'dataIndex' => 'block_image',
          'renderer' => 'this.renderImage',
        ],
        [
          'header' => 'Заголовок',
          'dataIndex' => 'block_title',
        ],
        [
          'header' => 'Описание',
          'dataIndex' => 'block_description',
        ],
      ],
    ],
    'templates' => ['Вывод содержимого'],
  ],
];
```

Затем нужно запустить в терминале скрипт:

```sh
php -d display_errors -d error_reporting=E_ALL public_html/core/components/migxpageconfigurator/console/mgr_elems.php tv
```

### Создание и обновление сниппетов

Несмотря на то, что pdoTools позволяет использовать файловые сниппеты, зачастую удобнее создать статичный сниппет в админке, чтобы вызывать его по короткому имени. Создадим для этого в папке `create` файл `snippet.inc.php` приблизительно следующего содержания:

```php
return [
  'testSnippet' => [
    'file' => 'snippet.test',
    'description' => 'формирует вызов сниппета с указанным пресетом',
    'categoryName' => 'Новая категория',
    'properties' => [],
  ],
  'testStaticSnippet' => [
    'file' => 'snippet.static_test',
    'static' => 1,
    'description' => 'получает контакты в формате массива',
    'properties' => [],
  ],
];
```

Обратите внимание, что имя файла с кодом сниппета указывается без расширения, сам файл должен лежать в папке `core/elements/snippets/`. В поле `properties` можно указать массив параметров по умолчанию.
Затем нужно запустить в терминале скрипт:

```sh
php -d display_errors -d error_reporting=E_ALL public_html/core/components/migxpageconfigurator/console/mgr_elems.php snippet
```

### Создание и обновление плагинов

Плагины в Modx Revolution вообще не работают, если не создать их в админке, поэтому методика изложенная выше, как нельзя лучше подходит для них. Порядок тот же: cоздаем в папке `create` файл `plugin.inc.php` примерно такого содержания

```php
return [
  'testPlugin' => [
    'file' => 'plugin.test',
    'description' => '',
    'categoryName' => 'Категория плагинов',
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

Обратите внимание, что имя файла с кодом плагина указывается без расширения, сам файл должен лежать в папке `core/elements/plugins/`.

Затем нужно запустить в терминале скрипт:

```sh
php -d display_errors -d error_reporting=E_ALL public_html/core/components/migxpageconfigurator/console/mgr_elems.php plugin
```
