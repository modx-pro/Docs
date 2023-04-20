This class handles chunks and contains various service methods.
```
$pdo = $modx->getService('pdoTools');
$chunk = $pdo->getChunk('chunkName', array('with', 'values'));
```

It can load chunks by various methods:
1. Default method - as chunk from database. Just specify its name.
2. `@INLINE` chunk that will be generated on the fly:
3. `@FILE` chunk, that will be loaded from file. Due to security reasons you can use only files of types `tpl` and `html`. Files are loaded from directory specified in system setting **pdotools_elements_path**.
```
[[!pdoResources?
    &elementsPath=`/core/elements/`
    &tpl=`@FILE chunks/file.tpl`
]]
```
4. `@TEMPLATE`- chunk will be generated on the fly from template of resource. So, this one only for rows with filled field `template`. It is kind of replacement for snippet **renderResources**.

**Every** pdoTools based snippet could load chunks this ways. pdoResources, getTickets, msProducts and so on.

The only thing you must remember - is to be careful with `@INLINE` because if you will specify placeolders directly on page - they can be processed **before** snippet run. That is why pdoTools supports different tags for placeholders:
```
[[!pdoResources?
    &parenets=`0`
    &tpl=`@INLINE <p>{{+id}} - {{+pagetitle}}</p>`
]]
```
This placeholders will pass to snippet unprocessed and than pdoTools will replace `{{}}` to `[[]]` with no harm to logic. Remember to use this syntax for all `@INLINE` chunks on MODX pages.

When placeholders are passed into pdoTools it tries to parse it yourself. It can parse simple tags like
* `[[+tag]]`
* `[[%lexicon]]`
* `[[~id_for_link]]`
* `[[~[[+id]]]]`

But it will load MODX parser to process any nested snippets, chunks or output filters. So, any chunk with output filter will be **slower**.

But how we can modify our data before processing? It is a simple - we need to use **&prepareSnippet**!
```
[[!pdoResources?
    &parents=`0`
    &tpl=`@INLINE <p>{{+id}} - {{+pagetitle}}</p>`
    &prepareSnippet=`cookMyData`
]]
```

Snippet `cookMyData` will receive `$row` variable with all selected fields of one row and must return string with it (because MODX snippets can`t return array).

Let`s we just add some random string to every pagetitle of resource:
```
<?php
$row['pagetitle'] .= rand();

return json_encode($row);
```
*you can use json_encode() or serialize() to return data*

Now you know how we able to throw away **all** output filters and nested snippets from your chunks to make them faster.
Of course, it is much faster to do some work in one snippet instead of parsing multiple snippets in chunks.

Also you can use objects `$modx` and `$pdoTools` in prepareSnippet to cache data you need to work.

pdoTools has methods `setStore()` and `getStore()`. For example, I want to highlight users of some groups in my comments (yes, it is the real task). So I call snippet with my prepareSnippet
```
[[!TicketComments?
    &prepareSnippet=`prepareComments`
]]
```

And there is my `prepareComments` snippet:
```
<?php
if (empty($row['createdby'])) {return json_encode($row);}

// If we do not have cached groups
if (!$groups = $pdoTools->getStore('groups')) {
	$tstart = microtime(true);
	$q = $modx->newQuery('modUserGroupMember');
	$q->innerJoin('modUserGroup', 'modUserGroup', 'modUserGroupMember.user_group = modUserGroup.id');
	$q->select('modUserGroup.name, modUserGroupMember.member');
	$q->where(array('modUserGroup.name:!=' => 'Users'));
	if ($q->prepare() && $q->stmt->execute()) {
		$modx->queryTime += microtime(true) - $tstart;
		$modx->executedQueries++;
		$groups = array();
		while ($tmp = $q->stmt->fetch(PDO::FETCH_ASSOC)) {
			$name = strtolower($tmp['name']);
			if (!isset($groups[$name])) {
				$groups[$name] = array($tmp['member']);
			}
			else {
				$groups[$name][] = $tmp['member'];
			}
		}
	}
	foreach ($groups as & $v) {
		$v = array_flip($v);
	}
	// Save groups to cache
	$pdoTools->setStore('groups', $groups);
}

$class = '';
if (!empty($row['blocked'])) {
	$class = 'blocked';
}
elseif (isset($groups['administrator'][$row['createdby']])) {
	$class = 'administrator';
}
$row['class'] = $class;

return json_encode($row);
```
And now I can use `[[+class]]` in my chunk to highlight admins and blocked users. Using of "Store" methods of pdoTools allows me to cache the data only at run time without save to hdd. It is very fast and handy.

It total:
1. You can load chunks by various ways.
2. They will be processed so fast, how they simple are.
3. It is much better to put all your template logic to `&prepareSnippet` instead of additional nested snippets or output filters calls in chunks.

Remember, **every** nested call in chunk costs you seconds of total time of page load. Logic must be in PHP, not in MODX tags.