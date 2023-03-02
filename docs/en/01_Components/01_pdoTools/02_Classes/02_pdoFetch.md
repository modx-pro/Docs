pdoFetch extends pdoTools so you need to load only one class depending of what you want right now.
You can load each class very simple:
```
$pdo = $modx->getService('pdoFetch');
```
And than
```
$resources = $pdo->getCollection('modResource', array(
    'published' => true,
    'deleted' => false
), array(
    'parents' => '1,5,6,-9',
    'includeTVs' => 'tv1, tv2',
    'sortby' => 'id',
    'sortdir' => 'asc',
    'limit' => 20,
));
$tpl = '@INLINE <p>[[+id]] - [[+pagetitle]]</p>';
$output = '';
foreach ($resources as $resource) {
    $output .= $pdo->getChunk($tpl, $resource);
}
return $output;
```

The whole awesome logic of pdoResources actually is inside of pdoFetch class, and you could use it in your snippets.

pdoFetch tries to execute only one query at a time. That is why you need to join tables. The only time when there are an additional queries are made is when TVs are selected. We need to get their names and default values for proper request.

But yes, TVs are joined as well as other tables, so there is no additional queries to get their values as in **getResources**.

That is why you need to use query for silter by TVs:
```
[[!pdoResources?
    &parents=`0`
    &includeTVs=`tv1`
    &where=`{"tv1":"my_value"}`
]]
```

Default TVs values do not saved to table, they are just TV settings, so you need to compare them to `null`:
```
[[!pdoResources?
    &parents=`0`
    &includeTVs=`tv2`
    &where=`{"tv2":null}`
]]
```

If you want to select resource where `tv2` has default value - you need to select resources with `null` for this TV. But pdoFetch will return **default** value of TV as value for this field in results.

I hope, now you understand logic of pdoFetch a little better. In total:
1. One query to rule them all.
2. With table joins, if you need more data. No additional requests!
3. Pure arrays in results, without objects.
4. But if you will enable `&checkPermissions` - there will be generated minimal objects to call `checkPolicy()` method. And it will slow down your snippet.
