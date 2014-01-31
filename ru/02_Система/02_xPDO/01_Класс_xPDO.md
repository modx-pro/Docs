Класс xPDO сам по себе служит многим целям, все из которых направлены на обеспечение базового набора возможностей для того, чтобы можно было быстро и безболезненно реализовать объектную модель
и сделать это без ограничений в ее реализации. Далее подробнее рассматриваются три главные роли xPDO.

### В качестве надстройки PDO

PDO - это новый стандарт доступа к базам данных в PHP, и его возможности служат ядром для всего xPDO. Экземпляр PDO по существу представляет собой соединение к базе данных, и в качестве надстройки, превращая его в «сервис-объект», xPDO может обеспечивать богатый буфер между вашей объектной моделью и сервисами, ответственными за управление всеми связями с базами данных.

И хотя xPDO не расширяет напрямую PDO (не является его классом-наследником), он предоставляет те же методы, что и PDO, что позволяет xPDO быть посредником между всеми вызовами базы данных. Это позволяет использовать кеширование результатов запросов и другие продвинутые техники оптимизации того, как ваши приложения взаимодействуют с базой данных (например, кешируя результаты запросов к БД в файлы или память, вы можете избежать соединений к БД, если все запрашиваемое уже есть в кеше).

Наконец, наследуя xPDO своими классами, вы можете добиться выполнения всех требуемых вами задач. Например, вы можете добавить специфичные для конкретной предметной области методы или расширить базовые методы в ваших наследниках и использовать экземпляры как центральные объекты предметной области для взаимодействия с вашей моделью.
Так построена Система управления контентом MODx Revolution: центральный класс modX расширяет xPDO и добавляет методы, которые формируют предметную область приложения MODX.

Пример расширения класса xPDO:
`class myClass extends xPDO`

и определения конструктора:
```
function __construct($options = array()) {
    $options = array(
        xPDO::OPT_CACHE_PATH => '/path/to/my/cache/dir',
        xPDO::OPT_TABLE_PREFIX => 'myprefix_',
        xPDO::OPT_HYDRATE_FIELDS => true,
        xPDO::OPT_HYDRATE_RELATED_OBJECTS => true,
        xPDO::OPT_HYDRATE_ADHOC_FIELDS => true,
        xPDO::OPT_VALIDATE_ON_SAVE => true,
    );
    parent :: __construct(
        'mysql:host=localhost;dbname=myxpdodb;charset=utf8',
        'username',
        'password',
        $options,
        array (
            PDO::ATTR_ERRMODE => PDO::ERRMODE_SILENT,
            PDO::ATTR_PERSISTENT => false,
            PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true
        )
    );
    $this->setPackage('mypackage', 'path/to/my/model/');
}
```
Подробнее о конструкторе [ниже](#constructor).

### В качестве сервисного слоя

В добавление к PDO, xPDO может обертывать другие объекты, с которыми хотите работать в своей модели.

Например, вы можете загрузить Smarty как объект, который можно вызывать напрямую из экземпляра xPDO:
```
if ($className= $xpdo->loadClass('Smarty','/path/to/smarty/smarty.class.php', false, true)) {
    $xpdo->smarty= & new $className ($xpdo);
}

$xpdo->smarty->someFunc();
```

xPDO предоставляет также удобный метод сделать это в одну строчку:
```
if ($xpdo->getService('myService', 'myServiceClass', '/path/to/model/root/', array('param1' => $param1, 'param2' => $param2)) {
    $xpdo->myService->doSomething();
}
```

При этом если сервисный экземпляр уже загружен в текущем запросе, он не будет загружен снова, а будет возвращена ссылка на него. Это создает простой способ обеспечивать повторно использование сервисных объектов для общих задач.

### В качестве объектно-реляционного отображения

В качестве надстройки над PDO, xPDO может легко использовать свои PDO сервисы для взаимодействия с вашей реляционной моделью. Как только вы определили объектную модель и сгенерировали
 базовые классы и объектно-реляционные схемы, предоставляющие нужную xPDO информацию, вы можете использовать его методы для взаимодействия с вашими объектами множеством различных способов
 Эти методы будут рассмотрены подробнее в разделе [«Объектная модель»][1].


## <a name="constructor"></a>Конструктор The xPDO Constructor

По умолчанию xPDO конструктор вызывается так:
`$xpdo= new xPDO($dsn, $username, $password, $options, $driverOptions)`

### Параметры

В конструкторе доступно 5 параметров, но единственный необходимый это первый:

#### $dsn

Этот параметр запрашивает значение DSN соединения, которое задается в следующем формате:
`mysql:host=MYHOSTNAME;dbname=MYDBNAME;charset=MYCHARSET`

Нужно просто поменять значение имен хоста, базы данных и кодировки. Больше информации доступно в документации [PDO на PHP.net][2].

#### $username и $password

Это логин и пароль к базе данных. Установите их, если хотите использовать соединения к БД в xPDO.


#### $options

Позволяет передать в конструктор массив характерных для xPDO свойств.

Некоторые из этих свойств имеют предопределенные значения, например, следующие (но не ограничены ими):

Параметр | Описание
---|---
**xPDO::OPT_BASE_CLASSES** | Массив имен классов, загружаемых во время создания экземпляра класса xPDO.
**xPDO::OPT_BASE_PACKAGES** | Строка имен пакетов и путей к ним, в формате "имя_пакета1:путь_до_пакета1,имя_пакета1:путь_до_пакета1,...", загружаемые при создании экземпляра класса xPDO.
**xPDO::OPT_CACHE_COMPRESS** | Если установлена, любой экземпляр класса xPDOCache, использующий провайдера, который поддерживает сжатие данных, будет использовать эту опцию по умолчанию (например, xPDOMemCache).
**xPDO::OPT_CACHE_DB** | Если установлена, будет включено кеширование наборов данных запросов к БД.
**xPDO::OPT_CACHE_DB_COLLECTIONS** | Если установлена, кеширование наборов данных запросов к БД будет пытаться кешировать целые коллекции.
**xPDO::OPT_CACHE_DB_OBJECTS_BY_PK** | Если установлена, кеширование наборов данных запросов к БД будет создавать элементы кеша по первичному ключу в дополнение к используемой подписи запроса.
**xPDO::OPT_CACHE_DB_EXPIRES** | Если установлена, определяет число секунд, которые существует кеш наборов данных; 0 означает, что кеш не истекает.
**xPDO::OPT_CACHE_DB_HANDLER** | Если установлена, определяет наследника класса xPDOCache для управления кеширование наборов данных.
**xPDO::OPT_CACHE_EXPIRES** | Если установлена, определяет число секунд жизни кеша для любого провайдера по умолчанию; 0 означает, что кеш не истекает.
**xPDO::OPT_CACHE_FORMAT** | Если установлена, определяет формат файлов кеша, используемых в xPDOFileCache; по умолчанию PHP, но доступны JSON и сериализованный. (начиная с версии xPDO 2.1)
**xPDO::OPT_CACHE_KEY** | Если установлена, defines the key of the default cache instance; the default value is default.
**xPDO::OPT_CACHE_PATH** | Если установлена, will set a custom cachePath class variable to the xPDO object that can be used in caching.
**xPDO::OPT_CACHE_ATTEMPTS** | Если установлена, defines the number attempts xPDOFileCache will attempt to lock an existing cache entry for writing; default is 1. (2.1 only)
**xPDO::OPT_CACHE_ATTEMPT_DELAY** | Если установлена, defines the number microseconds to delay each attempt to lock existing cache entries for writing; default is 10000. (2.1 only)
**xPDO::OPT_CONNECTIONS** | Optionally defines a pool of additional connections to select from when instantiating xPDO. (2.2 only)
**xPDO::OPT_CONN_INIT** | Defines options a connection must have to be selected as the initial connection; applicable when multiple connections are defined. (2.2 only)
**xPDO::OPT_CONN_MUTABLE** | Defines if data from a connection can be changed, i.e. is writable. (2.2 only)
**xPDO::OPT_HYDRATE_FIELDS** | If true, fields will be hydrated.
**xPDO::OPT_HYDRATE_RELATED_OBJECTS** | If true, related objects will be hydrated.
**xPDO::OPT_HYDRATE_ADHOC_FIELDS** | If true, ad-hoc fields will be hydrated.
**xPDO::OPT_LOADER_CLASSES** | Can be an array of class names to load upon instantiation of the xPDO object. (deprecated in 2.0.0-pl)
**xPDO::OPT_ON_SET_STRIPSLASHES** | Если установлена, stripslashes() is applied to values being set() on xPDOObject instances.
**xPDO::OPT_TABLE_PREFIX** | Если установлена, all database class references will be prefixed with this prefix.
**xPDO::OPT_VALIDATOR_CLASS** | Если установлена, will use a custom class specified that derives from xPDOValidator (the default)
**xPDO::OPT_VALIDATE_ON_SAVE** | If true, xPDOObjects will be validated against their Validators before saving.

$driverOptions

An optional array of driver-specific PDO options. More info can be found here.

## Hydrating Fields

### What is hydration?

Hydration is the process in which fields and related objects represented by an xPDOObject are populated with values. By default, these fields are only accessible using the get(), getOne() and getMany() methods of xPDOObject, and must be defined with appropriate metadata in the map for the object. However, there are a number of options you can use to extend how xPDO hydrates fields and related objects.

The options are available by passing any of the following configuration options into the $config parameter of the xPDO constructor:

    xPDO::OPT_HYDRATE_FIELDS - If true, fields will be hydrated as public member variables of the object.
    xPDO::OPT_HYDRATE_RELATED_OBJECTS - If true, related objects will be hydrated as public member variables of the object.
    xPDO::OPT_HYDRATE_ADHOC_FIELDS - If true, ad-hoc fields will be allowed and hydrated on the object (respects xPDO::OPT_HYDRATE_FIELDS setting as well).

Hydrating Fields

If the xPDO::OPT_HYDRATE_FIELDS option is set to true, in addition to accessing fields via the xPDOObject::get() method, all object fields will be made accessible for reading directly as public member variables of the object. An example of this is such:

$object->set('name',$name);
echo $object->name;

This would output the 'name' field of the object, assuming that the 'name' field is defined in the object's schema.
These are "raw" values
Please note that accessing fields of the object directly provides only the "raw" value as loaded from the database, ignoring the metadata that is defined for the field, and avoiding any logic applied by the get() method of your xPDOObject class (or any of it's parent classes). It is recommended that you always use the get() method to access object fields unless you need the raw value or to avoid the get() logic for a specific reason.
Hydrating Ad Hoc Fields

If the xPDO::OPT_HYDRATE_ADHOC_FIELDS option is set to true, field hydration will be enabled for arbitrary fields not defined in the class map. It takes one step further the idea of hydrating fields, and now hydrates all ad hoc fields; or rather, any field that is not defined in the schema. Say we want to set an arbitrary field called 'puns' to a Person object:

$object->set('name','Arthur Dent');
$object->set('puns',42);
echo $object->get('name') .' has '. $object->get('puns') . ' puns.';

This would echo the appropriate value, even if the field 'puns' isn't defined in the schema.
The option respects the xPDO::OPT_HYDRATE_FIELDS option with respect to making the ad hoc fields available directly as public member variables of the object.
Hydrating Related Objects

If the xPDO::OPT_HYDRATE_RELATED_OBJECTS option is set to true, all related objects will be made available as public member variables of the object. By default, related objects are only accessible via the getOne or getMany methods of xPDOObject, but this option (similar to xPDO::OPT_HYDRATE_FIELDS) makes any related objects already loaded by those methods accessible directly as variables. Example:

$fordPrefect->getMany('Beers');
foreach ($fordPrefect->Beers as $beer) {
   echo $beer->get('name').'<br />';
}

This would echo a list of all the Beers associated to the $fordPrefect object loaded by the getMany method.
One vs. Many
Objects loaded with getOne are available directly as an object of that class, while those with getMany are available as an array of objects of the class.
See Also

    The xPDO Constructor
    Setting Object Fields
    Working with Related Objects
[1]: ru/02_Система/02_xPDO/01_Объектная_модель/01_Объекты_xPDO.md
[2]: http://php.net/manual/ru/pdo.construct.php