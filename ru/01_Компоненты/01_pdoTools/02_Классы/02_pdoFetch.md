# pdoFetch

Этот класс предназначен для работы с любыми таблицами базы данных, неважно какими, лишь бы у MODX был к ним доступ и модель.

pdoFetch создаёт запрос и добавляет параметры через xPDO, а выбирает уже через PDO, что даёт защиту, гибкость и скорость.

## Инициализация класса

Объект запроса xPDOQuery создаётся методом **makeQuery()**, исходя из переданных в pdoFetch параметров. По умолчанию, он работает с modResource, но если вам нужен другой класс - нужно его указать.
При этом нужно учитывать, что метод modX::getService() всегда возвращает уже загруженный класс, если он есть.
То есть, если вы (или какой-то сниппет) уже проинициализировали pdoFetch, то вы получите именно этот экземпляр класса, с **уже установленными параметрами** запроса.

Чтобы наверняка применить свои параметры нужно использовать pdoFetch::**setConfig**():

``` php
$pdo = $modx->getService('pdoFetch');
$pdo->setConfig(array('class' => 'modUser'));
```

Метод setConfig может сразу загружать указанные модели компонентов, чтобы вы могли работать с чужими дополнениями, например:

``` php
$pdo->setConfig(array(
    'class' => 'msResourceFile',
    'loadModels' => 'ms2gallery'
));
```

pdoTools не знает, какой класс принадлежит какому компоненту, поэтому нужно указать директорию дополнения в `/core/components`.
В примере это компонент [ms2Gallery][2], и директория его ms2gallery - оттуда и будет загружена модель для работы, о чем появится запись в логе.

После определения того, какие объекты мы будем выбирать, можно строить запрос. Мы можем делать это вручную, запуская все нужные методы по порядку, или выполнить **pdoFetch::run()**, и он сделает это за нас. Давайте пройдём по всей цепочке.

## Метод makeQuery

Создаёт объект xPDOObject и добавляет его в приватное свойство класса pdoFetch.

Как мы выше уже выяснили, запрос создаётся для указанного класса, или для modResource, по умолчанию.

Основная цель pdoFetch - выбрать все данные за один запрос. Правда, если вы выбираете к ресурсу еще и ТВ параметры, то запросов приходится делать несколько.

## Методы addTVFilters и addTVs

Эти два метода добавляют в запрос ТВ параметры и настраивают фильтрацию по ним.

Очевидно, что они работают только, если запрос строится для modResource и его наследников. У галереи нет ТВ, поэтому к ней эти методы не относятся.

Метод **addTVFilters()** преобразовывает параметр [&tvFilters от getResources][1] в понятные для pdoFetch параметры: **where** и **includeTVs**. То есть, сам он ничего особо не делает, он только разбирает чужой формат запроса и передаёт дальше.

**Если вы умеете пользоваться параметром where, то tvFilters вам не нужен.**

А вот метод **addTVs()** очень полезен - он подключает ТВ параметры, указанные списком в **includeTVs**. Чем больше вы укажете ТВ, тем больше нужно будет сделать join таблицы `modTemplatevarContent`.

В принципе, это не особо влияет на скорость, просто имейте в виду.

## Метод addJoins

Этот метод получает параметры из конфига и отвечает за все подключения таблиц. Например, addTVs сам ничего не подключет, он только разбирает includeTVs и складывает попраметры в leftJoin.

Немного теории. Данные в реляционных БД хранятся в таблицах. Таблицы принято разделать согласно какой-то логике.

Например, есть сам юзер, а есть его профиль. Это две разные таблицы: `modUser` и `modUserProfile`.
Как нам выбрать юзеров вместе с их профилями? Правильно, нужно присоединить таблицу одну к другой.

Теперь, давайте разберем типы присоединения:

* **leftJoin** - выбираются все записи первой (левой) таблицы, даже если они не соответствуют записям во второй (правой) таблице. Этот способ используется для присоединения к ресурсу ТВ параметров, ибо они мы не знаем, есть они или нет, а вот ресурс нам нужно выбрать всегда.
* **rightJoin** - здесь наоборот, Выбираются все записи второй (правой) таблицы, даже если они не соответствуют записям в первой (левой) таблице.
* **innerJoin** - внутреннее объединение двух таблиц. Если для строки из одной таблицы нет соответствия в другой - такая строка исключается. То есть, innerJoin всегда возвращает данные сразу из двух таблиц.

Как нужно указывать параметры для присоединения в pdoFetch?

``` php
$pdo->setConfig(array(
    'class' => 'modUser',
    'leftJoin' => array(
        'Profile' => array(
            'class' => 'modUserProfile',
            'on' => 'modUser.id = Profile.internalKey',
        )
    ),
    'select' => array(
        'modUser' => '*',
        'Profile' => 'fullname,email',
    )
));
```

Итак, мы выбираем класс modUser, поэтому он сразу попадает в запрос. Затем мы указываем присоединить к нему класс modUserProfile под псевдонимом Profile.
Присоединение производим по колонке **id** у modUser и **internalKey** у modUserProfile.
А после мы указываем, какие столбцы в БД нам нужны для этих таблиц: для modUser выбираем все, а для Profile только полное имя и email.

Понятное дело, что при вызове сниппетов нельзя указывать массивы, поэтому в pdoResources наши параметры нужно превратить в JSON:

``` php
[[!pdoResources?
    &class=`modUser`
    &leftJoin=`{
        "Profile": {
            "class": "modUserProfile",
            "on": "modUser.id = Profile.internalKey"
    }
    }`
    &select=`{
        "modUser": "*",
        "Profile": "fullname,email"
    }`
    &showLog=`1`
    &sortby=`modUser.id`
    &sortdir=`ASC`
]]
```

И получаем вывод распечатанных массивов пользователей и вот такой лог pdoTools:

``` plain
0.0000799: pdoTools loaded
0.0000319: xPDO query object created
0.0005212: leftJoined modUserProfile as Profile
0.0001311: Added selection of modUser: SQL_CALC_FOUND_ROWS `id`, `username`, `password`, `cachepwd`, `class_key`, `active`, `remote_key`, `remote_data`, `hash_class`, `salt`, `primary_group`, `session_stale`, `sudo`
0.0000789: Added selection of modUserProfile: `fullname`, `email`
0.0000360: Sorted by modUser.id, ASC
0.0000050: Limited to 10, offset 0
0.0000942: SQL prepared "SELECT SQL_CALC_FOUND_ROWS `modUser`.`id`, `modUser`.`username`, `modUser`.`password`, `modUser`.`cachepwd`, `modUser`.`class_key`, `modUser`.`active`, `modUser`.`remote_key`, `modUser`.`remote_data`, `modUser`.`hash_class`, `modUser`.`salt`, `modUser`.`primary_group`, `modUser`.`session_stale`, `modUser`.`sudo`, `Profile`.`fullname`, `Profile`.`email` FROM `modx_users` AS `modUser` LEFT JOIN `modx_user_attributes` `Profile` ON modUser.id = Profile.internalKey ORDER BY modUser.id ASC LIMIT 10 "
0.0019310: SQL executed
0.0001349: Total rows: 3
0.0000298: Rows fetched
0.0001581: Returning processed chunks
0.0034399: Total time
3 932 160: Memory usage
```

Сортировку в pdoResources нужно указывать потому, что там по умолчанию стоит publishedon, которой нет в выбираемых таблицах и мы получим ошибку, если не указать имеющееся поле.

Теперь, давайте разберем пример посложнее. Есть ресурс, а есть прикреплённые к нему файлы через компонент [ms2Gallery][2].
Ресурс один, а файлов несколько. Значит, на каждую запись в таблице ресурсов есть несколько записей в таблице галереи.

Выбираем ресурсы, прикрепляя к каждому по одной, первой картинке галереи вместе с превьюшкой **120х90**:

``` php
[[!pdoResources?
    &parents=`0`
    &class=`modResource`
    &loadModels=`ms2gallery`
    &leftJoin=`{
        "Image": {
            "class": "msResourceFile",
            "on": "modResource.id = Image.resource_id AND Image.parent = 0"
        },
        "Thumb": {
            "class": "msResourceFile",
            "on": "Image.id = Thumb.parent AND Thumb.path LIKE '%120x90%'"
        }
    }`
    &select=`{
        "modResource": "*",
        "Image": "Image.url as image",
        "Thumb": "Thumb.url as thumb"
    }`
    &showLog=`1`
    &sortby=`id`
    &sortdir=`ASC`
]]
```

Здесь мы присоединяем одну таблицу msResourceFile 2 раза: первый раз как `Image`, а второй как `Thumb. msResourceFile` не родной класс MODX, о чем говорит его префикс **ms**, вместо **mod** - поэтому нам нужно подключить модель **ms2gallery**.

Дальше мы указываем как именно присоединять файлы. У превьюшек есть родитель, а у оригинальных картинок нет, значит нам нужно указать в условии Image.parent = 0.
А вот превьюшки можно уже прицеплять не к ресурсу, а к их родителям, поэтому уловие для Thumb выглядит так:

``` php
Image.id = Thumb.parent
```

Ну и добавляем фильтрацию по размеру превьюшки - он прописывается в её адресе.
Дальше мы указываем поля для выборки: у ресурса все, а у превьюшек только url под разными псевдонимами.

В итоге мы видим такой лог:

``` plain
0.0001011: Loaded model "ms2gallery" from "/core/components/ms2gallery/model/"
0.0001070: pdoTools loaded
0.0000360: xPDO query object created
0.0003860: leftJoined msResourceFile as Image
0.0003152: leftJoined msResourceFile as Thumb
0.0002568: Added selection of modResource: SQL_CALC_FOUND_ROWS `id`, `type`, `contentType`, `pagetitle`, `longtitle`, `description`, `alias`, `link_attributes`, `published`, `pub_date`, `unpub_date`, `parent`, `isfolder`, `introtext`, `content`, `richtext`, `template`, `menuindex`, `searchable`, `cacheable`, `createdby`, `createdon`, `editedby`, `editedon`, `deleted`, `deletedon`, `deletedby`, `publishedon`, `publishedby`, `menutitle`, `donthit`, `privateweb`, `privatemgr`, `content_dispo`, `hidemenu`, `class_key`, `context_key`, `content_type`, `uri`, `uri_override`, `hide_children_in_tree`, `show_in_tree`, `properties`
0.0000169: Added selection of msResourceFile: Image.url as image
0.0000129: Added selection of msResourceFile: Thumb.url as thumb
0.0000200: Processed additional conditions
0.0003581: Added where condition: modResource.published=1, modResource.deleted=0
0.0001092: Sorted by modResource.id, ASC
0.0000041: Limited to 10, offset 0
0.0002589: SQL prepared "SELECT SQL_CALC_FOUND_ROWS `modResource`.`id`, `modResource`.`type`, `modResource`.`contentType`, `modResource`.`pagetitle`, `modResource`.`longtitle`, `modResource`.`description`, `modResource`.`alias`, `modResource`.`link_attributes`, `modResource`.`published`, `modResource`.`pub_date`, `modResource`.`unpub_date`, `modResource`.`parent`, `modResource`.`isfolder`, `modResource`.`introtext`, `modResource`.`content`, `modResource`.`richtext`, `modResource`.`template`, `modResource`.`menuindex`, `modResource`.`searchable`, `modResource`.`cacheable`, `modResource`.`createdby`, `modResource`.`createdon`, `modResource`.`editedby`, `modResource`.`editedon`, `modResource`.`deleted`, `modResource`.`deletedon`, `modResource`.`deletedby`, `modResource`.`publishedon`, `modResource`.`publishedby`, `modResource`.`menutitle`, `modResource`.`donthit`, `modResource`.`privateweb`, `modResource`.`privatemgr`, `modResource`.`content_dispo`, `modResource`.`hidemenu`, `modResource`.`class_key`, `modResource`.`context_key`, `modResource`.`content_type`, `modResource`.`uri`, `modResource`.`uri_override`, `modResource`.`hide_children_in_tree`, `modResource`.`show_in_tree`, `modResource`.`properties`, Image.url as image, Thumb.url as thumb FROM `modx_site_content` AS `modResource` LEFT JOIN `modx_ms2_resource_files` `Image` ON modResource.id = Image.resource_id AND Image.parent = 0 LEFT JOIN `modx_ms2_resource_files` `Thumb` ON Image.id = Thumb.parent AND Thumb.path LIKE '%120x90%' WHERE  ( `modResource`.`published` = 1 AND `modResource`.`deleted` = 0 )  ORDER BY modResource.id ASC LIMIT 10 "
0.0015361: SQL executed
0.0000839: Total rows: 89
0.0001299: Rows fetched
0.0007241: Returning processed chunks
0.0049288: Total time
3 932 160: Memory usage
```

Как вы понимаете, можно смело указывать разные параметры для выборки ресурсов (&parents, &showHidden и т.д.), и к каждому из них будет прицеплено по 2 картинки, если есть.

Ну и последний пример с той же галерей, для закрепления. Теперь мы выберем все большие картинки с превьюшками 120х90 и названиями ресурсов к ним:

``` php
[[!pdoResources?
    &class=`msResourceFile`
    &loadModels=`ms2gallery`
    &where=`{
        "msResourceFile.parent": 0
    }`
    &leftJoin=`{
        "Resource": {
            "class": "modResource",
            "on": "msResourceFile.resource_id = Resource.id"
        },
        "Thumb": {
            "class": "msResourceFile",
            "on": "msResourceFile.id = Thumb.parent AND Thumb.path LIKE '%120x90%'"
        }
    }`
    &select=`{
        "msResourceFile": "*",
        "Resource": "pagetitle",
        "Thumb": "Thumb.url as thumb"
    }`
    &showLog=`1`
    &sortby=`id`
    &sortdir=`ASC`
]]
```

И получаем в итоге все картинки, к свойствам которых добавлено поле pagetitle от ресурса, и thumb с адресом превьюшки.

Лог работы:

``` plain
0.0001011: Loaded model "ms2gallery" from "/core/components/ms2gallery/model/"
0.0000682: pdoTools loaded
0.0000339: xPDO query object created
0.0001562: leftJoined modResource as Resource
0.0001469: leftJoined msResourceFile as Thumb
0.0001209: Added selection of msResourceFile: SQL_CALC_FOUND_ROWS `id`, `resource_id`, `source`, `parent`, `name`, `description`, `path`, `file`, `type`, `createdon`, `createdby`, `rank`, `url`, `properties`, `hash`, `active`
0.0001709: Added selection of modResource: `pagetitle`
0.0000141: Added selection of msResourceFile: Thumb.url as thumb
0.0001609: Added where condition: msResourceFile.parent=0
0.0000348: Sorted by msResourceFile.id, ASC
0.0000038: Limited to 10, offset 0
0.0001800: SQL prepared "SELECT SQL_CALC_FOUND_ROWS `msResourceFile`.`id`, `msResourceFile`.`resource_id`, `msResourceFile`.`source`, `msResourceFile`.`parent`, `msResourceFile`.`name`, `msResourceFile`.`description`, `msResourceFile`.`path`, `msResourceFile`.`file`, `msResourceFile`.`type`, `msResourceFile`.`createdon`, `msResourceFile`.`createdby`, `msResourceFile`.`rank`, `msResourceFile`.`url`, `msResourceFile`.`properties`, `msResourceFile`.`hash`, `msResourceFile`.`active`, `Resource`.`pagetitle`, Thumb.url as thumb FROM `modx_ms2_resource_files` AS `msResourceFile` LEFT JOIN `modx_site_content` `Resource` ON msResourceFile.resource_id = Resource.id LEFT JOIN `modx_ms2_resource_files` `Thumb` ON msResourceFile.id = Thumb.parent AND Thumb.path LIKE '%120x90%' WHERE `msResourceFile`.`parent` = 0 ORDER BY msResourceFile.id ASC LIMIT 10 "
0.0007789: SQL executed
0.0001690: Total rows: 24
0.0000670: Rows fetched
0.0005300: Returning processed chunks
0.0032029: Total time
3 932 160: Memory usage
```

Как видите, ничего сложного, если понимать, что делаешь.

### Метод addGrouping

Этот метод добавляет группировку в запрос. Он нужен только если вы используете Join, и одной строке левой таблицы соответствует несколько строк правой.

Обычно группировка нужна для подсчета количества правых строк. например, давайте выведем количество больших картинок галереи для каждого ресурса:

``` php
[[!pdoResources?
    &parents=`0`
    &class=`modResource`
    &loadModels=`ms2gallery`
    &leftJoin=`{
        "Image": {
            "class": "msResourceFile",
            "on": "modResource.id = Image.resource_id AND Image.parent = 0"
        }
    }`
    &select=`{
        "modResource": "*",
        "Image": "COUNT(Image.id) as images"
    }`
    &groupby=`modResource.id`
    &showLog=`1`
    &sortby=`id`
    &sortdir=`ASC`
]]
```

Если в этом запросе мы не добавим группировку по modResource.id, то получим ровно один результат, потому что MySql решит, что мы считаем общее количество картинок для всех строк и выведет нам только один результат.

С группировкой же, картинки считаются для каждой строки modResource  и всё выводится правильно - мы получаем поле images с общим количество больших картинок для ресурса.

Если логика не ясна, почитайте про то, как MySql работает с запросами.

### Метод addSelects

Выше в примерах мы уже видели применение select, а теперь нужно сказать пару слов о правилах выборки полей:

* Если вы не делаете Join, то select можно указывать строкой полей

``` php
&select=`id,pagetitle,longtitle`
```

* При использовании Join нужен массив, который укажет из какой таблицы что выбирать

``` php
&select=`{
    "modResource": "id,pagetitle,longtitle"
    "Image": "url"
}
```

* Если используются псевдонимы в select, то обязательно нужно указать и псевдоним таблицы

``` php
&select=`{
    "modResource": "id,pagetitle,longtitle"
    "Image": "Image.url as image"
}
```

* Перечисление всех полей можно заменять звездочкой

``` php
&select=`{
    "modResource": "*"
    "Image": "Image.url as image"
}
```

Все возможные ошибки Join, Select и Group смотрите в логе pdoTools - там всё пишется.

### Метод addWhere

Это очень важный метод, который берет параметр **&where**, разбирает его и добавляет условия выборки в запрос.

Задаётся он так же, массивом:

``` php
&where=`{"id:>": "15", "published:!=": "0"}`
```

Если вы подключили какие-то таблицы в выборку, то можно фильтровать по ним:

``` php
&leftJoin=`{
    "Image": {
        "class": "msResourceFile",
        "on": "modResource.id = Image.resource_id AND Image.parent = 0"
    }
}`
&where=`{
    "published:!=": "0",
    "Image.active": "1"
}`
```

Если у полей таблицы могут быть одинаковые столбцы (обычно это id), то нужно указывать имя колонки с таблицей:

``` php
&where=`{
    "modResource.id:>": "15",
    "published:!=": "0",
    "Image.active": "1"
}`
```

Стоит также заметить, про при фильтрации по подключенным ТВ псевдонимы обычно указывать не нужно, за вас это делает специальный метод **replaceTVCondition**.

``` php
&includeTVs=`image,file,mytv`
&where=`{
    "image:LIKE":"%yandex.ru%",
    "OR:file:=": "1",
    "OR:text:!=": "",
}`
```

Но если вдруг автозамена не сработает, то по ТВ нужно фильтровать вот так:

``` php
&includeTVs=`image,file,mytv`
&where=`{
    "TVimage.value:LIKE":"%yandex.ru%",
    "OR:TVfile.value:=": "1",
    "OR:TVtext.value:!=": "",
}`
```

Как видите, ТВ присоединияются как **TVимятв** и фильтровать нужно по значению **value**.

А что делать, если не получается указать нужное нам уловие при помощи массива для xPDO? Тогда нужно указывать массив с одной строкой с чистым SQL:

``` php
&where=`["
    TVimage LIKE '%yandex%' OR (TVfile.value = 1 AND TVtext.value != '')
"]
```

Обратите внимание на квадратные скобочки, вместо фигурных. Такое SQL условие попадет в запрос без дополнительных обработок, так что смотрите в лог на предмет ошибок.

Быстро проверить правильность JSON строк можно [здесь][3].

### Метод addSort

Этот метод добавляет в запрос сортировку и умеет принимать как строку, так и массив.
В случае простой сортировки по одному полю нужно указать два параметра:

``` php
&sortby=`publishedon`
&sortdir=`ASC
```

Если в запросе есть Join, то лучше указывать с именем таблицы:

``` php
&sortby=`modResource.publishedon`
&sortdir=`ASC
```

А если нужна сортировка по нескольким полям, тогда нужно указать массив поле => направление:

``` php
&sortby=`{
    "modResource.publishedon": "ASC",
    "modUser.id": "DESC"
}`
```

Конечно, не забываем присоединять таблицы через Join, если планируете сортировать по ним.

### Выполнение запроса

Дальше запрос подготавливается методом **prepareQuery**, и выполняется через PDO.

У сниппетов pdoFetch есть еще один параметр **&return=``**, который определяет, что вернет метод run():

* **sql** - строка с готовым SQL запросом, сам он не выполняется.
* **ids** - список с id подходящих объектов, через запятую. Обычно используется, чтобы выбрать одним сниппетом нужные id ресурсов и передать их на вход другому сниппету.
* **data** - массив с результатами. При вызове через сниппет вы получите слово Array, так как все сниппеты MODX возвращают только строки. Зато при вызове из другог осниппета вы получите массив.
* **tpl** - результат запроса, оформленный в указанный чанк **&tpl=``**. А если чанка нет, то просто распечатанные массивы результатов.

У сниппетов по умолчанию &return = **tpl**, а если есть параметр &returnIds, то **ids**. **Data** и **sql** в сниппетах не используется. Первый просто не работает, а второй вы и так видите в логе pdoTools.

### Обработка результатов

После выполнения запроса метод **run()** вызывает еще один интересный метод **prepareRows**() - его цель прогнать результаты и подготовить для вывода.

Именно этот метод отвечает за раскодировку JSON полей и подготовку ТВ, если указаны &**prepareTVs=``** или &**processTVs=``**.

Также вызывается еще  **checkPermissions()** - он отвечает за проверку разрешений, указанных в одноименном параметре.
Учтите, что для проверки разрешений приходится создавать объекты xPDO, что замедляет работу, поэтому используйте этот параметр только если он реально необходим:

``` php
&checkPermissions=`list,view`
```

Ну а дальше уже результаты отдаются в виде массива данных или оформленных чанков.

### Полезные методы getArray и getCollection

Эти два метода нужны для быстрой замены родным методам MODX: getObject и getCollection. В отличии от них, они возвращают массивы, а не объекты.

Пользоваться ими очень просто:

``` php
$pdo = $modx->getService('pdoFetch');
$res = $pdo->getArray('modResource', 1);
print_r($res);
```

или

``` php
$pdo = $modx->getService('pdoFetch');
$resources = $pdo->getCollection('modResource');
foreach ($res as $res) {
    print_r($res);
}
```

Эти методы всегда выполняются отдельным экземпляром, чтобы не мешать работающему сниппету. То есть, они выполняются отдельно, **изолированно**. Поэтому получить вывод лога от них можно только через специальный плейсхолдер:

``` php
$pdo = $modx->getService('pdoFetch');
$res = $pdo->getArray('modResource', 1);

print_r($modx->getPlaceholder('pdoTools.log'));
```

Первым параметром указывается класс для работы, вторым условие where, а третьим любой набор параметров, которые мы рассмотрели выше. Например, вот так будет выглядеть выборка всех файлов Тикета:

``` php
$files = $pdo->getCollection('TicketFile', array('parent' => 1));
print_r($files);
```

А вот так - вывод всех файлов тикетов с присоединением к ним **pagetitle** родительского документа:

``` plain
$files = $pdo->getCollection('TicketFile', array(), array(
    'innerJoin' => array(
        'Ticket' => array(
        'class' => 'Ticket',
            'on' => 'Ticket.id = TicketFile.parent'
        )
    ),
    'select' => array(
        'TicketFile' => '*',
        'Ticket' => 'pagetitle'
    ),
    'sortby' => array(
        'TicketFile.id' => 'ASC'
    )
));
print_r($modx->getPlaceholder('pdoTools.log'));
print_r($files);
```

Как видите, здесь второй массив пустой, но в нем можно указать условия для фильтрации.

Лог получается вот такой:

``` plain
0.0000322: xPDO query object created
0.0003891: innerJoined Ticket as Ticket
0.0001400: Added selection of TicketFile: SQL_CALC_FOUND_ROWS `id`, `parent`, `class`, `source`, `name`, `description`, `path`, `file`, `type`, `size`, `createdon`, `createdby`, `url`, `thumb`, `deleted`, `properties`, `hash`
0.0001042: Added selection of Ticket: `pagetitle`
0.0005560: SQL prepared "SELECT SQL_CALC_FOUND_ROWS `TicketFile`.`id`, `TicketFile`.`parent`, `TicketFile`.`class`, `TicketFile`.`source`, `TicketFile`.`name`, `TicketFile`.`description`, `TicketFile`.`path`, `TicketFile`.`file`, `TicketFile`.`type`, `TicketFile`.`size`, `TicketFile`.`createdon`, `TicketFile`.`createdby`, `TicketFile`.`url`, `TicketFile`.`thumb`, `TicketFile`.`deleted`, `TicketFile`.`properties`, `TicketFile`.`hash`, `Ticket`.`pagetitle` FROM `modx_tickets_files` AS `TicketFile` JOIN `modx_site_content` `Ticket` ON Ticket.id = TicketFile.parent "
0.0023780: Total time
1 835 008: Memory usage
```

Как видите, эти методы очень удобны для использования в своих сниппетах. На них можно переложить основную работу по добыче данных из БД, а если вспомнить еще про pdoTools::getChunk() - то и оформлению.

[1]: http://rtfm.modx.com/extras/revo/getresources
[2]: https://modstore.pro/ms2gallery
[3]: https://bezumkin.ru/utils/json
