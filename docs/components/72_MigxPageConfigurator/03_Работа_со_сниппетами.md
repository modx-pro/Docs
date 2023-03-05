### Пресеты

Если вы регулярно создаёте сайты на Modx Revolution, то могли заметить, что часто приходится использовать одни и те же сниппеты с одинаковым набором параметров. Я решил, что
удобно было бы вынести эти наборы параметров в файлы и брать оттуда по ключу. Собственно файл с набором параметров сниппета я и называю пресетом. Имя файла формируется из
названия сниппета в нижнем регистре и окончания `.inc.php`. Пример пресета `pdoresources.inc.php`

```php 
return [
    'services' => [
        'parents' => 10,
        'includeTVs' => 'img',
        'tvPrefix' => '',
        'limit' => 0,
        'tpl' => '@FILE chunks/pdoresources/services/item.tpl'
    ]
];
```

### Разметка

Для разметки сниппета используются такие атрибуты как:

* `data-mpc-snippet` - указывает на то какой сниппет нужно вызвать и как (кешированным или нет), через `|` указывается ключ списка настроек из пресета.
* `data-mpc-symbol` - используется, если нужно вызвать сниппет ещё при предварительном парсинге страницы, а не в момент запроса с фронта, в качестве значения принимает `{ `,
  чтобы IDE корректно подсвечивала синтаксис в шаблоне можно поставить пробел.
* `data-mpc-chunk` - содержит путь к файлу, в который будет помещён код чанка, указывается относительно папки `core/chunks`
  Пример простой разметки можно увидеть дальше

```html

<div data-mpc-chunk="pdoresources/services/item.tpl" class="col-md-4 sppb-col-md-4">
    <div id="sppb-addon-1507906826100" class="clearfix">
        <div class="sppb-addon sppb-addon-module ">
            <div class="sppb-addon-content">
                <div class="custom">
                    <h3 class="sppb-feature-box-title">{$menutitle?:$pagetitle}</h3>
                    <a href="{$uri}"><img src="{$img}" alt=""/></a>
                    <p>{$introtext}</p>
                    <a href="{$uri}" class="sppb-btn sppb-btn-default sppb-btn-rounded">Подробнее</a>
                </div>
            </div>
        </div>
    </div>
</div>
```

Как видите, плейсхолдеры внутри чанка вы должны расставить самостоятельно.
Давайте рассмотрим пример посложнее. Вывод меню с помощью сниппета `pdoMenu`. Принципиальное отличие этого сниппета от `pdoResources` в том, что у `pdoMenu` есть вложенные
чанки. Поэтому чтобы всё корректно собралось, нужно добавить вложенным чанкам атрибут `data-mpc-remove` со значением `1`, который покажет скрипту, что после получения
информации, чанки надо удалить и другого чанка. Вот так это будет выглядеть.

```html

<div data-mpc-unwrap="1" data-mpc-snippet="pdoMenu|main" data-mpc-symbol="{ ">
    <ul data-mpc-chunk="pdomenu/main/tplOuter.tpl" class="sp-megamenu-parent menu-slide-down hidden-sm hidden-xs">
        {$wrapper}
        <li class="sp-menu-item {$classnames}" data-mpc-remove="1" data-mpc-chunk="pdomenu/main/tpl.tpl">
            <a href="{$link}">{$link_attributes} {$menutitle}</a>
        </li>
        <li data-mpc-remove="1" data-mpc-chunk="pdomenu/main/tplParentRow.tpl" class="sp-menu-item sp-has-child {$classnames}">
            <a href="{$link}">{$link_attributes} {$menutitle}</a>
            <div class="sp-dropdown sp-dropdown-main sp-menu-right" style="width: 240px;">
                <div class="sp-dropdown-inner">
                    {$wrapper}
                    <ul data-mpc-remove="1" data-mpc-chunk="pdomenu/main/tplInner.tpl" class="sp-dropdown-items">
                        {$wrapper}
                    </ul>
                </div>
            </div>
        </li>
    </ul>
</div>
```
