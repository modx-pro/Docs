A ready-made decision for filtration of product categories by daughter products. Parameters of products are shown in filters, whereas categories that contain those products are shown in results.

The work logic of mFilter2:

* The filter uses for search and output one snippet indicated in &elements. In case of working with products msProducts is usually indicated there.
* There will be 2 calls for this snippet: preliminary selection and return of products suitable for id, and then their output for the user. 
* These 2 calls can be distinguished by parameter **returnIds**, which is sent.

You should not interfere in the process of id getting products because filter has to build filters from them. Only output of these products should be changed: they should be replaced by categories. 

We write new snippet **msProductsCategories**:
```
<?php
// It works only when we initiate product output rather than call for suitable ids
if (empty($returnIds)) {
	// We join the table of categories
	if (empty($innerJoin) || !$where = $modx->fromJSON($innerJoin)) {
		$innerJoin = array();
	}
	$innerJoin['Category'] = array(
		'class' => 'msCategory',
	);
	$scriptProperties['innerJoin'] = $modx->toJSON($innerJoin);
	// We group by category 
	$scriptProperties['groupby'] = 'Category.id';
	//We replace fields of products with fields of categories 
	$scriptProperties['select'] = $modx->toJSON(array(
		'Category' => '*',
		// Selection of fields of products can also be redefined for them to have prefixes,
		// but I have commented on it, because Data fields are accessible as they are and, as for products, they are not needed 
		//'msProduct' => $modx->getSelectColumns('msProduct', 'msProduct', 'product.'),
		//'Data' => $modx->getSelectColumns('msProductData', 'Data', 'data.'),
	));
}

// We have added our own options. Then it should be the standard snippet that should work: 
return $modx->runSnippet('msProducts', $scriptProperties);
```
As you see, everything works by standard parameters pdoTools and no special hacks are needed.
You just have to indicate this new snippet when you summon mFilter2:
```
[[!mFilter2?
	&class=`msProduct`
	&element=`msProductsCategories`
	&parents=`0`
	&filters=`
		ms|price:number,
		msoption|tags,
		ms|vendor:vendors,
		ms|old_price:boolean,
	`
	&tpl=`@INLINE <p>
		<a href="{$uri}">
			<img src="{$thumb ?: '/assets/components/minishop2/img/web/ms2_small.png'}">
			{$pagetitle}
		</a>
	</p>`
	&tplFilter.outer.ms|price=`tpl.mFilter2.filter.slider`
	&tplFilter.row.ms|price=`tpl.mFilter2.filter.number`
]]
```
This decision does not change anything in the original component, therefore, it can be safely updated. 
