Snippet to list the site users, based on the pdoTools library.

It generates a list of site users according to their's groups and roles.


## Settings

It uses all [General Settings of pdoTools][1] except the specific class *modResource*, as well as their own:

Name			| Default	| Description
--------------------|---------------|------------------------------------------------------------------------------------------
**&groups**			|  				| List of user groups, separated by commas. You can use the names and id. If the value begins with dash it means users belonging to this group will be skipped.
**&roles**			|  				|  List of user roles, separated by commas. You can use the names and id. If the value begins with a dash, then users with this role will be skipped.
**&users**			|  				| List for output, separated by commas. You can use usernames and id. If the value begins with a dash, that user will be excluded from the results.
**&showInactive**	| 0				| Includes  Inactive users in the results.
**&showBlocked**	| 0				| Includes Blocked users in the results.
**&returnIds**		|  				| Returns a string with a list of user ids instead of formatted results.
**&showLog**		| 0				| Show more information about running the snippet. Only displayed for logged-in users with the «mgr» context authorization.
**&toPlaceholder**	|  				| If not empty, this will the save output to a placeholder with this name instead of displaying the output to the screen.
**&wrapIfEmpty**	|  				| Includes output chunk wrapper **&tplWrapper** even if there are no results.
**&tplWrapper**		|  				| Chunk - wrapper, to wrap all results. Accepts one placeholder:`[[+output]]`. It does not work in conjunction with **&toSeparatePlaceholders**.


#### Override pdoTools

Name	| Default | Description
------------|---|---
**&class**	| modUser	| The base User class for MODx Revolution
**&sortby**	| modUser.id| Any user field for sorting. You can specify a JSON string with an array of multiple fields. To randomly select the sort «RAND ()»
**&sortdir** | ASC		| Sorting direction: Descending «DESC» or Ascending «ASC» .
All default templates are empty. To display the result as HTML, you must specify at least the value of the template in **&tpl**.

## Examples
Used without parameters, the snippet lists all users:

```
[[!pdoUsers]]
```

Members of usergroup Authors:
```
[[!pdoUsers?
	&groups=`Authors`
	&tpl=`tpl.Authors.author`
	&sortdir=`asc`
]]
```

You can combine it with pdoPage / getPage:

```
[[!pdoPage?
	&element=`pdoUsers`
	&groups=`Authors`
	&tpl=`tpl.Authors.author`
	&sortdir=`asc`
]]
```

with INLINE:
```
[[!pdoUsers?
	&roles=`Member`
	&tpl=`@INLINE <p>Имя - [[+fullname]], ID - [[+id]]</p>`
	&sortby=`id`
	&sortdir=`asc`
]]
```

## Demo
[Authors and friends][2] of the Simple Dream repository.

[![](https://file.modx.pro/files/b/7/9/b792406326ccd13a79ce417c6e7d2306s.jpg)](https://file.modx.pro/files/b/7/9/b792406326ccd13a79ce417c6e7d2306.png)

[1]: /en/components/pdotools/general-settings
[2]: http://store.simpledream.ru/friends.html
