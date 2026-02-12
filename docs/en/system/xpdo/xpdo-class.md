# The xPDO class

The xPDO class serves several purposes, all aimed at providing a core set of capabilities for implementing an object model quickly and with minimal friction, and without limiting how you implement it. Below we look at xPDO's three main roles in more detail.

## As a PDO wrapper

PDO is the modern standard for database access in PHP, and its capabilities form the core of xPDO. A PDO instance is essentially a database connection; as a wrapper that turns it into a "service object", xPDO provides a rich buffer between your object model and the services that manage all database interactions.

Although xPDO does not extend PDO directly (it is not a subclass of PDO), it exposes the same methods as PDO, so xPDO can act as a mediator for all database calls. This allows query result caching and other advanced techniques for how your application talks to the database (e.g. by caching query results to file or memory, you can avoid database connections when the requested data is already in cache).

Finally, by extending xPDO in your own classes, you can implement whatever behaviour you need. For example, you can add domain-specific methods or override base methods in your subclasses and use instances as central domain objects for working with your model.
The MODX Revolution content management system is built this way: the central modX class extends xPDO and adds methods that define the MODX application domain.

Example of extending xPDO: `class myClass extends xPDO`

and defining the constructor:

```php
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

More on the constructor [below](#constructor).

## As a service layer

In addition to PDO, xPDO can wrap other objects you want to use with your model.

For example, you can load Smarty as an object callable directly from the xPDO instance:

```php
if ($className= $xpdo->loadClass('Smarty','/path/to/smarty/smarty.class.php', false, true)) {
  $xpdo->smarty= & new $className ($xpdo);
}

$xpdo->smarty->someFunc();
```

xPDO also provides a convenient one-liner for this:

```php
if ($xpdo->getService('myService', 'myServiceClass', '/path/to/model/root/', array('param1' => $param1, 'param2' => $param2)) {
  $xpdo->myService->doSomething();
}
```

If the service instance is already loaded in the current request, it will not be loaded again; a reference to it will be returned. This makes it easy to reuse service objects across your code.

## As an object-relational mapper

As a PDO wrapper, xPDO can use its PDO services to work with your relational model. Once you have defined your object model and generated the base classes and object-relational schemas that provide xPDO with the information it needs, you can use its methods to work with your objects in many ways. These methods are described in the [Object model][1] section.

## The xPDO constructor {#constructor}

By default the xPDO constructor is called as: `$xpdo= new xPDO($dsn, $username, $password, $options, $driverOptions)`

### Parameters

The constructor accepts 5 parameters, but only the first is required:

#### $dsn

This parameter is the DSN (connection string) in the format:
`mysql:host=MYHOSTNAME;dbname=MYDBNAME;charset=MYCHARSET`

Simply set the host, database name and charset. See the [PDO documentation on PHP.net][2] for more.

#### $username and $password

Database login and password. Set these to use database connections in xPDO.

#### $options

Allows passing an array of xPDO-specific options to the constructor.

Some of these options have predefined meanings, for example (but not limited to):

| Parameter                               | Description                                                                                                                                                                                  |
|-----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **xPDO::OPT_AUTO_CREATE_TABLES**        | If true, creates tables for requested classes when they do not yet exist in the database                                                                                                    |
| **xPDO::OPT_BASE_CLASSES**              | Array of class names to load when creating an xPDO instance                                                                                                                                  |
| **xPDO::OPT_BASE_PACKAGES**             | String of package names and paths in the format "package1:path1,package2:path2,...", loaded when creating an xPDO instance                                                                     |
| **xPDO::OPT_CACHE_COMPRESS**            | If set, any xPDOCache instance using a provider that supports compression will use this option by default (e.g. xPDOMemCache)                                                                |
| **xPDO::OPT_CACHE_DB**                  | If set, enables caching of query result sets                                                                                                                                                 |
| **xPDO::OPT_CACHE_DB_COLLECTIONS**      | If set, query result caching will attempt to cache whole collections                                                                                                                         |
| **xPDO::OPT_CACHE_DB_OBJECTS_BY_PK**    | If set, query result caching will create cache entries by primary key in addition to query signature                                                                                          |
| **xPDO::OPT_CACHE_DB_EXPIRES**          | If set, defines how many seconds the result cache lives; 0 means no expiry                                                                                                                   |
| **xPDO::OPT_CACHE_DB_HANDLER**          | If set, defines the xPDOCache subclass used to manage query result caching                                                                                                                   |
| **xPDO::OPT_CACHE_EXPIRES**             | If set, defines default cache TTL in seconds for any provider; 0 means no expiry                                                                                                             |
| **xPDO::OPT_CACHE_FORMAT**              | If set, defines the cache file format used by xPDOFileCache; default is PHP, JSON and serialized are available (xPDO 2.1+)                                                                    |
| **xPDO::OPT_CACHE_KEY**                 | If set, defines the default cache key; default is `default`                                                                                                                                   |
| **xPDO::OPT_CACHE_PATH**                | If set, defines the cachePath used by xPDO for caching                                                                                                                                       |
| **xPDO::OPT_CACHE_ATTEMPTS**            | If set, defines how many times xPDOFileCache will retry locking an existing cache entry for write; default 1 (xPDO 2.1+)                                                                     |
| **xPDO::OPT_CACHE_ATTEMPT_DELAY**       | If set, defines the delay in microseconds between cache lock retries; default 10000 (xPDO 2.1+)                                                                                                |
| **xPDO::OPT_CONNECTIONS**               | Defines additional database connections when creating an xPDO instance (xPDO 2.2+)                                                                                                            |
| **xPDO::OPT_CONN_INIT**                 | Defines options to apply to a connection when it is initialized; used when multiple connections are defined (xPDO 2.2+)                                                                       |
| **xPDO::OPT_CONN_MUTABLE**              | Defines whether the connection can be written to (true) or is read-only (false) (xPDO 2.2+)                                                                                                  |
| **xPDO::OPT_HYDRATE_FIELDS**            | If true, fields will be [hydrated](#hydrate)                                                                                                                                                 |
| **xPDO::OPT_HYDRATE_RELATED_OBJECTS**   | If true, related objects will be [hydrated](#hydrate)                                                                                                                                         |
| **xPDO::OPT_HYDRATE_ADHOC_FIELDS**      | If true, ad-hoc fields (not in the class map, created on the fly) will be [hydrated](#hydrate)                                                                                               |
| **xPDO::OPT_LOADER_CLASSES**            | Array of class names to load when creating an xPDO instance (deprecated since 2.0.0-pl)                                                                                                        |
| **xPDO::OPT_ON_SET_STRIPSLASHES**       | If set, `stripslashes()` is applied to values set via `xPDOObject::set()`                                                                                                                     |
| **xPDO::OPT_TABLE_PREFIX**              | If set, all classes will reference tables prefixed with this value                                                                                                                            |
| **xPDO::OPT_VALIDATOR_CLASS**           | If set, a custom validator class extending xPDOValidator (the default) will be used                                                                                                          |
| **xPDO::OPT_VALIDATE_ON_SAVE**          | If true, xPDOObject instances will be validated before save                                                                                                                                  |

#### $driverOptions

Optional array of options specific to each PDO driver. See the [PHP manual][3] for details.

## Database connections and xPDO

Database connectivity in xPDO is configured in the constructor. An xPDO instance can have only one connection, but you can create as many xPDO instances as you need. The constructor syntax is:

```php
xPDO::__construct($dsn, $username= '', $password= '', $options= array(), $driverOptions= null)
```

Suppose we need to connect to a database named 'test' on localhost port 3306 with utf-8:

```php
$dsn = 'mysql:host=localhost;dbname=test;port=3306;charset=utf-8';
$xpdo = new xPDO($dsn,'username','password');
```

Done!

You can optionally check the connection by adding:

```php
echo $o=($xpdo->connect()) ? 'Connected' : 'Not connected';
```

xPDO creates a PDO object and connects to the database only when a PDO method is called and a connection is needed. This "lazy connection" behaviour allows xPDO to serve data from cache without opening a database connection (provided the data was already cached).

### Connection example

```php
<?php

define('MODX_CORE_PATH', '/path/to/revo/core/');
define('MODX_CONFIG_KEY','config');
require_once MODX_CORE_PATH . 'model/modx/modx.class.php';

// Database parameters
$host = 'localhost';
$username = 'your_username';
$password = 'your_password';
$dbname = 'your_database';
$port = 3306;
$charset = 'utf-8';

$dsn = "mysql:host=$host;dbname=$dbname;port=$port;charset=$charset";
$xpdo = new xPDO($dsn, $username, $password);

// Test connection
echo $o = ($xpdo->connect()) ? 'Connected' : 'Not Connected';

// Query the database and output the number of results:
$results = $xpdo->query("SELECT id FROM some_table");
$recordCount = $results->rowCount();
print $recordCount;
```

## Multiple connections (xPDO 2.2+)

xPDO 2.2 added support for multiple connections and configuration options for read-only vs writable connections. This allows using xPDO with master/slave database setups. The feature is about configuring master/slave behaviour (one or more read-only nodes, at least one writable node), not about connecting to a specific database node. You can use the initial connection for read-only access, and xPDO will switch to a writable connection when a write is performed.

### xPDO::OPT_CONNECTIONS

To define additional connections for an xPDO instance, pass an array of connection configs (each config is also an array) in the *$options* parameter of the xPDO constructor. Each connection entry uses the same parameters as the xPDO constructor. Example with multiple read-only connections:

```php
$xpdo = new xPDO('mysql:host=127.0.0.1:19570;dbname=xpdotest;charset=utf8', 'username', 'password', array(
  xPDO::OPT_CONN_MUTABLE => true,
  xPDO::OPT_CONN_INIT => array(xPDO::OPT_CONN_MUTABLE => false),
  xPDO::OPT_CONNECTIONS => array(
      array(
        'dsn' => 'mysql:host=127.0.0.1:19571;dbname=xpdotest;charset=utf8',
        'username' => 'username',
        'password' => 'password',
        'options' => array(
          xPDO::OPT_CONN_MUTABLE => false,
        ),
        'driverOptions' => array(),
      ),
      array(
        'dsn' => 'mysql:host=127.0.0.1:19572;dbname=xpdotest;charset=utf8',
        'username' => 'username',
        'password' => 'password',
        'options' => array(
          xPDO::OPT_CONN_MUTABLE => false,
        ),
        'driverOptions' => array(),
      ),
    ),
));
```

### xPDO::OPT_CONN_MUTABLE

This option marks the connection as writable (true) or read-only (false). It is set in the constructor *$options* array and in each additional connection.

### xPDO::OPT_CONN_INIT

This option defines which connection xPDO uses as the initial connection. In master/slave setups, the usual value (set once in the main config) makes the initial connection read-only.

```php
xPDO::OPT_CONN_INIT => array(xPDO::OPT_CONN_MUTABLE => false)
```

This ensures xPDO picks a connection with **xPDO::OPT_CONN_MUTABLE** set to `false`. If a write is attempted on a read-only connection, xPDO will select a writable connection and cache it for subsequent writes in that request.

## Field hydration {#hydrate}

### What is hydration?

Hydration is the process by which fields and related objects (xPDOObject instances) are filled with values. By default, these fields are only accessible via the `get()`, `getOne()` and `getMany()` methods of xPDOObject and must be defined in the object map. You can control how xPDO hydrates fields and related objects with the options below.

These options are passed in the $config parameter of the xPDO constructor:

| Parameter                               | Description                                                                                                                                                                                                                      |
|-----------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **xPDO::OPT_HYDRATE_FIELDS**            | If true, fields will be hydrated as public object properties.                                                                                                                                                                    |
| **xPDO::OPT_HYDRATE_RELATED_OBJECTS**   | If true, related objects will be hydrated as public object properties.                                                                                                                                                           |
| **xPDO::OPT_HYDRATE_ADHOC_FIELDS**      | If true, ad-hoc fields (not in the class map, created on the fly) will be allowed and hydrated as public properties (requires **xPDO::OPT_HYDRATE_FIELDS**).                                                                      |

### Hydrated fields

If **xPDO::OPT_HYDRATE_FIELDS** is true, in addition to accessing fields via `xPDOObject::get()`, all object fields become available as public properties. Example:

```php
$object->set('name',$name);
echo $object->name;
```

This outputs the *'name'* field of *$object*, provided *'name'* is defined in the object schema.

> **Note: These are "raw" values**
> Direct property access returns only raw values as loaded from the database, ignoring metadata and any logic in your class's `get()` method (and parent classes).
> Prefer using `get()` for field access unless you specifically need raw values.

### Hydrating ad-hoc fields

If **xPDO::OPT_HYDRATE_ADHOC_FIELDS** is true, ad-hoc fields (not in the class map) are also hydrated. All fields, even those not in the object schema, will be populated. For example, to set an ad-hoc *'dollars'* field on a *Person* object:

```php
$object->set('name','John Doe');
$object->set('dollars',45);
echo $object->get('name') .' has '. $object->get('dollars') . ' dollars.';
```

This returns `John Doe has 45 dollars.`, even if *'dollars'* is not in the schema, as long as **xPDO::OPT_HYDRATE_ADHOC_FIELDS** and **xPDO::OPT_HYDRATE_FIELDS** are enabled.

### Hydrating related objects

If **xPDO::OPT_HYDRATE_RELATED_OBJECTS** is true, all related objects are also available as public properties.
By default, related objects are only available via `getOne()` or `getMany()`, but this option (like **xPDO::OPT_HYDRATE_FIELDS**) loads all related objects directly into properties. Example:

```php
$user->getMany('UserSettings');
foreach ($user->UserSettings as $setting) {
  echo $setting->get('key').' = ' . $setting->get('value') . '<br />';
}
```

This outputs the keys and values of the user settings for *$user*, which are normally loaded via `getMany()`.

> **One vs Many**
> Objects loaded via `getOne()` are available as a single object of that class; via `getMany()` they are available as an **array** of objects.

[1]: /en/system/xpdo/object-model
[2]: http://php.net/manual/en/pdo.construct.php
[3]: http://php.net/manual/en/pdo.drivers.php
