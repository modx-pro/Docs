# pdoFetch

This class works with any database tables, as long as MODX has access to them and a model.

pdoFetch builds the query and adds parameters via xPDO, but selects via PDO, which provides protection, flexibility and speed.

## Class initialization

The xPDOQuery object is created by method **makeQuery()**, based on pdoFetch parameters. By default it works with modResource, but if you need another class you must specify it.
Note that modX::getService() always returns an already loaded class if it exists.
So if you (or some snippet) have already initialized pdoFetch, you will get exactly that class instance with **parameters already set** for the query.

To ensure your params are applied use pdoFetch::**setConfig**():

```php
$pdo = $modx->getService('pdoFetch');
$pdo->setConfig(array('class' => 'modUser'));
```

Method setConfig can load specified component models to work with third-party extras, e.g.:

```php
$pdo->setConfig(array(
  'class' => 'msResourceFile',
  'loadModels' => 'ms2gallery'
));
```

pdoTools does not know which class belongs to which component, so specify the add-on directory in `/core/components`.
In the example this is component [ms2Gallery][2], and its directory is ms2gallery - the model will be loaded from there and logged.

After defining which objects to select, you can build the query. You can do this manually by running all needed methods in order, or execute **pdoFetch::run()** and it will do it for you. Let's go through the whole chain.

## Method makeQuery

Creates xPDOObject and adds it to a private property of class pdoFetch.

As we found above, the query is created for the specified class, or for modResource, by default.

Main goal of pdoFetch - select all data in one query. Though if you also select TV parameters for the resource, several queries will need to be made.

## Methods addTVFilters and addTVs

These two methods add TV params to the query and configure filtering by them.

They work only if the query is for modResource and its extensions. The gallery has no TVs, so these methods don't apply to it.

Method **addTVFilters()** converts parameter [&tvFilters from getResources][1] to pdoFetch params: **where** and **includeTVs**. That is, it doesn't do much itself, it just parses the request format and passes it on.

**If you know how to use the where parameter, tvFilters is not needed.**

But method **addTVs()** is very useful - it connects TV parameters listed in **includeTVs**. The more TVs you specify, the more joins to table `modTemplatevarContent` will be needed.

In principle this doesn't affect speed much, just keep it in mind.

## Method addJoins

This method gets params from config and handles all table joins. For example, addTVs itself doesn't connect anything, it only parses includeTVs and adds parameters to leftJoin.

A bit of theory. Data in relational DBs is stored in tables. Tables are usually split according to some logic.

For example, there is the user, and there is their profile. These are two different tables: `modUser` and `modUserProfile`.
How do we select users together with their profiles? Right, we need to join one table to another.

Now let's look at join types:

- **leftJoin** - all records from the first (left) table are selected, even if they don't match records in the second (right) table. This is used for joining TV parameters to resources, because we don't know if they exist or not, but we always need to select the resource.
- **rightJoin** - here it's the opposite; all records from the second (right) table are selected, even if they don't match records in the first (left) table.
- **innerJoin** - inner join of two tables. If there's no match in the other table for a row from one table, that row is excluded. That is, innerJoin always returns data from both tables.

How to specify params for joining in pdoFetch?

```php
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

So we select class modUser, so it goes straight into the query. Then we specify to join modUserProfile to it under alias Profile.
We join by column **id** in modUser and **internalKey** in modUserProfile.
After that we specify which columns from the DB we need for these tables: for modUser we select all, for Profile only fullname and email.

Obviously when calling snippets you can't specify arrays, so in pdoResources our parameters need to be converted to JSON:

```modx
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

And we get printed arrays of users and this pdoTools log:

```php
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

Sorting in pdoResources must be specified because by default publishedon is used, which isn't in the selected tables, and we'll get an error if we don't specify an existing field.

Now let's look at a more complex example. There is a resource, and files attached to it via component [ms2Gallery][2].
One resource, several files. So for each record in the resources table there are several records in the gallery table.

We select resources, attaching one first gallery image with **120x90** thumbnail to each:

```modx
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

Here we join the msResourceFile table twice: first as `Image`, second as `Thumb`. msResourceFile is not a native MODX class, as indicated by its **ms** prefix instead of **mod** - so we need to load the **ms2gallery** model.

Next we specify how to join the files. Thumbnails have a parent, original images don't, so we need to specify Image.parent = 0 in the condition.
Thumbnails can be attached not to the resource but to their parents, so the condition for Thumb looks like:

```modx
Image.id = Thumb.parent
```

And we add filtering by thumbnail size - it's in its path.
Next we specify fields for selection: all for resource, for thumbnails only url under different aliases.

In the end we see this log:

```php
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

As you understand, you can safely specify different parameters for resource selection (&parents, &showHidden, etc.), and two images will be attached to each if they exist.

And the last example with the same gallery, for practice. Now we'll select all large images with 120x90 thumbnails and resource titles:

```modx
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

And we get all images with pagetitle from resource added to their properties, and thumb with the thumbnail address.

Work log:

```php
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

As you see, nothing complex if you understand what you're doing.

### Method addGrouping

This method adds grouping to the query. It's only needed if you use Join and one row in the left table corresponds to several rows in the right.

Usually grouping is needed to count right-side rows. For example, let's output the count of large gallery images for each resource:

```modx
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

If we don't add grouping by modResource.id in this query, we'll get exactly one result, because MySQL will decide we're counting total images for all rows and return only one result.

With grouping, images are counted for each modResource row and everything outputs correctly - we get the images field with the total count of large images for the resource.

If the logic isn't clear, read about how MySQL works with queries.

### Method addSelects

Above in examples we saw select usage, now a few words about field selection rules:

- If you're not doing Join, select can be a string of fields

```modx
&select=`id,pagetitle,longtitle`
```

- When using Join you need an array that specifies which table to select from

```modx
&select=`{
  "modResource": "id,pagetitle,longtitle"
  "Image": "url"
}
```

- If aliases are used in select, you must specify the table alias too

```modx
&select=`{
    "modResource": "id,pagetitle,longtitle"
    "Image": "Image.url as image"
}
```

- You can replace listing all fields with asterisk

```modx
&select=`{
  "modResource": "*"
  "Image": "Image.url as image"
}
```

All possible Join, Select and Group errors - see in pdoTools log, everything is written there.

### Method addWhere

This is a very important method that takes parameter **&where**, parses it and adds selection conditions to the query.

It's set the same way, as an array:

```modx
&where=`{"id:>": "15", "published:!=": "0"}`
```

If you connected some tables to the selection, you can filter by them:

```modx
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

If table fields can have same column names (usually id), you need to specify column name with table:

```modx
&where=`{
  "modResource.id:>": "15",
  "published:!=": "0",
  "Image.active": "1"
}`
```

Also note that when filtering by connected TVs, aliases usually don't need to be specified, the special method **replaceTVCondition** does it for you.

```modx
&includeTVs=`image,file,mytv`
&where=`{
  "image:LIKE":"%yandex.ru%",
  "OR:file:=": "1",
  "OR:text:!=": "",
}`
```

But if auto-replace doesn't work, filter by TV like this:

```modx
&includeTVs=`image,file,mytv`
&where=`{
  "TVimage.value:LIKE":"%yandex.ru%",
  "OR:TVfile.value:=": "1",
  "OR:TVtext.value:!=": "",
}`
```

As you see, TVs are joined as **TVtvname** and you filter by **value**.

What to do if you can't specify the needed condition with an array for xPDO? Then specify an array with one string of raw SQL:

```modx
&where=`["
  TVimage LIKE '%yandex%' OR (TVfile.value = 1 AND TVtext.value != '')
"]
```

Note the square brackets instead of curly. Such SQL condition goes into the query without extra processing, so check the log for errors.

You can quickly validate JSON strings [here][3].

### Method addSort

This method adds sorting to the query and accepts both string and array.
For simple sort by one field specify two parameters:

```modx
&sortby=`publishedon`
&sortdir=`ASC
```

If the query has Join, better specify with table name:

```modx
&sortby=`modResource.publishedon`
&sortdir=`ASC
```

If sorting by multiple fields is needed, specify array field => direction:

```modx
&sortby=`{
  "modResource.publishedon": "ASC",
  "modUser.id": "DESC"
}`
```

Of course, don't forget to join tables via Join if you plan to sort by them.

### Query execution

Next the query is prepared by method **prepareQuery** and executed via PDO.

pdoFetch snippets have another parameter **&return=``** that determines what method run() returns:

- **sql** - string with ready SQL query, it's not executed.
- **ids** - list of matching object ids, comma-separated. Usually used to select needed resource ids with one snippet and pass them to another.
- **data** - array with results. When calling via snippet you get the word Array, since all MODX snippets return only strings. But when called from another snippet you get an array.
- **tpl** - query result formatted in specified chunk **&tpl=``**. If no chunk, just printed result arrays.

By default snippets have &return = **tpl**, and if parameter &returnIds exists, then **ids**. **Data** and **sql** in snippets aren't used. First just doesn't work, second you see in pdoTools log anyway.

### Result processing

After query execution method **run()** calls another method **prepareRows**() - its goal is to process results and prepare for output.

This method handles JSON field decoding and TV preparation, if &**prepareTVs=``** or &**processTVs=``** are specified.

Also **checkPermissions()** is called - it checks permissions specified in the parameter of the same name.
Note that checking permissions requires creating xPDO objects, which slows things down, so use this parameter only when really needed:

```modx
&checkPermissions=`list,view`
```

And then results are returned as data array or formatted chunks.

### Useful methods getArray and getCollection

These two methods are for quick replacement of native MODX methods: getObject and getCollection. Unlike them, they return arrays, not objects.

Using them is very simple:

```php
$pdo = $modx->getService('pdoFetch');
$res = $pdo->getArray('modResource', 1);
print_r($res);
```

or

```php
$pdo = $modx->getService('pdoFetch');
$resources = $pdo->getCollection('modResource');
foreach ($res as $res) {
  print_r($res);
}
```

These methods always run in a separate instance so as not to interfere with the working snippet. That is, they run separately, **in isolation**. So you can only get log output from them via a special placeholder:

```php
$pdo = $modx->getService('pdoFetch');
$res = $pdo->getArray('modResource', 1);

print_r($modx->getPlaceholder('pdoTools.log'));
```

First parameter is the class to work with, second is where condition, third is any set of parameters we discussed above. For example, here's how selection of all Ticket files would look:

```php
$files = $pdo->getCollection('TicketFile', array('parent' => 1));
print_r($files);
```

And here - output of all ticket files with **pagetitle** of parent document joined:

```php
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

As you see, the second array is empty here, but you can specify filter conditions in it.

The log looks like this:

```php
0.0000322: xPDO query object created
0.0003891: innerJoined Ticket as Ticket
0.0001400: Added selection of TicketFile: SQL_CALC_FOUND_ROWS `id`, `parent`, `class`, `source`, `name`, `description`, `path`, `file`, `type`, `size`, `createdon`, `createdby`, `url`, `thumb`, `deleted`, `properties`, `hash`
0.0001042: Added selection of Ticket: `pagetitle`
0.0005560: SQL prepared "SELECT SQL_CALC_FOUND_ROWS `TicketFile`.`id`, `TicketFile`.`parent`, `TicketFile`.`class`, `TicketFile`.`source`, `TicketFile`.`name`, `TicketFile`.`description`, `TicketFile`.`path`, `TicketFile`.`file`, `TicketFile`.`type`, `TicketFile`.`size`, `TicketFile`.`createdon`, `TicketFile`.`createdby`, `TicketFile`.`url`, `TicketFile`.`thumb`, `TicketFile`.`deleted`, `TicketFile`.`properties`, `TicketFile`.`hash`, `Ticket`.`pagetitle` FROM `modx_tickets_files` AS `TicketFile` JOIN `modx_site_content` `Ticket` ON Ticket.id = TicketFile.parent "
0.0023780: Total time
1 835 008: Memory usage
```

As you see, these methods are very convenient for use in your snippets. You can offload the main work of fetching data from DB to them, and if you remember pdoTools::getChunk() - also formatting.

[1]: http://rtfm.modx.com/extras/revo/getresources
[2]: https://modstore.pro/ms2gallery
[3]: https://bezumkin.ru/utils/json
