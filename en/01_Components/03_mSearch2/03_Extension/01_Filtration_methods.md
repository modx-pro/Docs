mFilter2 can filter information from any tables, you will just have to describe how it can be received.

For you to do it there is a possibility to extend the filtration class, which is situated in `/core/components/msearch2/model/msearch2/filters.class.php`, with help of system setting **mse2_filters_handler_class**.

To extend the standard class you will have to create a new file in directory `/core/components/msearch2/custom/filters/` with name `имя.class.php` and inherit **mse2FiltersHandler**.
```
<?php
class myCustomFilter extends mse2FiltersHandler {

	// Here you can redefine methods of the parent class or create your own ones 
}
```

## Methods of filtration
There are 3 types of methods:

1. Getting information for filtration - methods **get`Имя`Values**.
2. Making filters for output - methods **build`Имя`Filter**.
3. Filtration by parameter - methods **filter`Имя`**.

These methods process values written in parameter **&filters**. For example:
```
&filters=`
	resource|parent:categories,
	resource|template:default,
	ms|price:number,
	tv|myname:default,
	msoption|size:default
`
```

The first word is code word for the selection of data from tables. If it is **resource**, **getResourceValues** will be summoned, if it is **ms**, then get**Ms**Values will be summoned, etc.

The second word is the field being selected. You can incidate more than one field for one table if they all are in it. 

The third word is the name of the method that you are applying to filter construction and filtration itself. 
If it is **default**, then **Default**Filter and filter**Default** will be summoned, if it is **number**, then build**Number**Filter and filter**Number** will be summoned, etc.

This means that we will have standard methods of class filtration 

 Method					| Name in &filters	| What it does
------------------------|-------------------|---------------------------------------------------------------
getResourceValues		| resource			| Selects data for the indicated fields of resource
getTvValues				| tv				| Selects data for the indicated tv parameters 
getMsValues				| ms				| Selects data for the indicated fields of product MS2 
getMsOptionValues		| msoption			| Selects data from special JSON table of fields of product MS2
						|					|
buildDefaultFilter		| default			| Builds new filter (which consists of checkboxes) by default 
buildNumberFilter		| number			| Builds filter for numbers that can be shown as slider 
buildVendorsFilter		| vendors			| Bulds filter in which names of producers of products MS2 operate as values. Can be applied only to **vendor** field `ms|vendor:vendors`.
buildBooleanFilter		| boolean			| Builds filter for zero values. Thanks to it 'yes' and 'no' answers will be shown instead of 0 and 1. 
buildParentsFilter		| parents			| Builds filter in which two parents of resource are selected and shown. Can be applied only to **parent** field `resource|parent:parents`.
buildCategoriesFilter	| categories		| Builds filter in which one parent of resource is selected and shown. Can be applied only to **parent** field `resource|parent:categories`.
buildGrandParentsFilter	| grandparents		| Builds filter in which second parent of resource is selected and shown. Can be applied only to **parent** field `resource|parent:grandparents`.
buildFullnameFilter		| fullname			| Builds filter in which full user names are selected and shown. Can be applied only to user id, for example `resource|createdby:fullname`.
buildYearFilter			| year				| Builds filter that shows the year, for example  `resource|createdon:year`.
						|					|
filterDefault			| default			| Regular filtration, works by default if there is no special method. 
filterGrandParents		| grandparents		| Special filtration by second parent (grandparent) of resource. 
filterNumber			| number			| Special filtration by range of number values. 
filterYear				| year				| Special filtration by date. 


You can redefine any of these methods or create your own one. 

## Returns

The first type of methods should return the following array of values: 
```
Array (
	[FieldName 1] => array(
		[Value1] => array(
			[0] => id of a suitable resource
			[1] => id of a suitable resource
			[2] => id of a suitable resource
		),
	),
)
```

For example, we summon
```
&filters=`resource|parent:parents,resource|template:default`
```
and method getResourceValues returns approximately the following array: 
```
Array (
	[parent] => array(
		[0] => array(
			[0] => 1
			[1] => 2
		)
		[2] => array(
			[0] => 5
		)
	)
	[template] => array(
		[1] => array(
			[0] => 1
			[1] => 2
			[2] => 3
		),
	)
)
```

The second type of methods returns an array for filter output for the user. It looks like this: 

```
Array (
	[FilterName] => Array (
		[title] => FilterName
		[value] => value of filter position 
		[type] => extra field for filter type 
		[resources] => Array (
			[0] => id of a suitable resource
			[1] => id of a suitable resource
			[2] => id of a suitable resource
		)
	)
)
```

For example, we summon
```
&filters=`resource|parent:categories`
```
and method getResourceValues returns an array that looks approximately like this:

```
Array (
	[Tickets] => Array (
		[title] => Tickets
		[value] => 71
		[type] => parents
		[resources] => Array (
			[0] => 72
			[1] => 73
			[2] => 74
		)
	)
	[mSearch2] => Array (
		[title] => mSearch2
		[value] => 62
		[type] => parents
		[resources] => Array (
			[0] => 63
			[1] => 64
		)
	)
)
```


As for the third type of methods, it should take 3 arrays: 

* Array with inquired values 
* Array of existing values, in which filter names are keys and suitable resources are values 
* Current array of results 

For example, if we filter by parent, in the first array we will get ids of parents inquired: 
```
Array (
	[0] => 71
)
```

In the second one we will get existing parents with their resources: 
```
Array (
	[71] => Array (
		[0] => 72
		[1] => 73
		[2] => 74
	)
)
```

And in the third one we will get ids of resources thatare still going through filtration and have not been excluded by other filters: 
```
Array (
 	[0] => 72
	[1] => 73
	[2] => 74
	[3] => 75
	[4] => 76
)
```

We should compare the first array to keys from the second array and values from the third one and then return array of resources that have passed the test. 
This array will either hit another filter (if there is one) or be given to mFilter2 for output of filtrated resources. 

This means that the user will see only those results that have passed all filters. 
