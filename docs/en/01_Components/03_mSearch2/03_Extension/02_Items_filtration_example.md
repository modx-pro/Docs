[miniShop2][1] can work with any column of product properties table, whereas [mSearch2][2] can receive any columns from tables and generate filters on the base of them. 

Let us combine these 2 abilities and write a filter by product availability. We will also learn to add our own fields to product and build a special filter for it. 

## Product properties extension: new availability field
First of all we read about [product extension miniShop2][3].

Then we create new column **availability** INT(10) in table msProductData.

[![](https://file.modx.pro/files/5/0/b/50b2b7853493cc3e400ffc7719ce7a72s.jpg)](https://file.modx.pro/files/5/0/b/50b2b7853493cc3e400ffc7719ce7a72.png)
[![](https://file.modx.pro/files/6/2/6/6262c3163e205ef7f7bccce915014492s.jpg)](https://file.modx.pro/files/6/2/6/6262c3163e205ef7f7bccce915014492.png)

We add the new field in product model: 
```
<?php
// File /core/components/minishop2/plugins/availability/model/msproductdata.map.inc.php
return array(
	'fields' => array(
		'availability' => 0
	)
	,'fieldMeta' => array(
		'availability' => array(
			'dbtype' => 'integer'
			,'precision' => '10'
			,'phptype' => 'integer'
			,'null' => true
			,'default' => 0
		)
	)
);
```
[![](https://file.modx.pro/files/8/0/0/800be6cb587629b2480883f9e0c69ce4s.jpg)](https://file.modx.pro/files/8/0/0/800be6cb587629b2480883f9e0c69ce4.png)

We add vidgets ExtJS for this field to the admin space: 
```
// File /assets/components/minishop2/plugins/availability/msproductdata.js
miniShop2.plugin.pluginname = {
	getFields: function(config) {
		return {
			availability: {xtype: 'numberfield', description: _('ms2_product_availability_help')}
		}
	}
	,getColumns: function() {
		return {
			availability: {width:50, sortable:true, editor: {xtype:'numberfield'}}
		}
	}
};
```
[![](https://file.modx.pro/files/9/0/a/90a03e1b6ab23fc57913f821e54bdecfs.jpg)](https://file.modx.pro/files/9/0/a/90a03e1b6ab23fc57913f821e54bdecf.png)

We join all this with an index file which will turn on the plugin: 
```
<?php
// /core/components/minishop2/plugins/availability/index.php
return array(
	'xpdo_meta_map' => array(
		'msProductData' => require_once dirname(__FILE__) .'/model/msproductdata.map.inc.php'
	)
	,'manager' => array(
		'msProductData' => MODX_ASSETS_URL . 'components/minishop2/plugins/availability/msproductdata.js'
	)
);
```
[![](https://file.modx.pro/files/d/e/0/de08c7b92662cf8f349a8761bb19e009s.jpg)](https://file.modx.pro/files/d/e/0/de08c7b92662cf8f349a8761bb19e009.png)

We add record to lexicon: 
[![](https://file.modx.pro/files/d/b/c/dbc0d8f29d135e559ad052c244f335f0s.jpg)](https://file.modx.pro/files/d/b/c/dbc0d8f29d135e559ad052c244f335f0.png)

Then we clear the cache properly and try to turn on the new field in settings. 
[![](https://file.modx.pro/files/1/2/4/124a4466e092bd4340662c7783bc2be5s.jpg)](https://file.modx.pro/files/1/2/4/124a4466e092bd4340662c7783bc2be5.png)

If it does not work, we will have to do all this for a second time. It worked for me at once, though: 
[![](https://file.modx.pro/files/a/9/7/a97179f499ce5eb0329c56860c005bb2s.jpg)](https://file.modx.pro/files/a/9/7/a97179f499ce5eb0329c56860c005bb2.png)
[![](https://file.modx.pro/files/a/8/a/a8ad101ebe4d170ca92c7bfd1f563674s.jpg)](https://file.modx.pro/files/a/8/a/a8ad101ebe4d170ca92c7bfd1f563674.png)

## Adding filter by the new field 
**availability** field is now as native a field of product as price, weight and all other fields msProductData.

This means that we can turn it on very easily: 
```
[[!mFilter?
	&filters=`ms|availability:availability`
]]
```

Only this will show us checkboxes where different variants of product availability will be indicated by figures. 0, 5, 10, etc.
Evidently, a slider with a range of prices will not suit here. It is a radio button that we need. 
```
[[!mFilter?
	&filters=`ms|availability:availability`
	&suggestionsRadio=`ms|availability`
	&tplFilter.row.ms|availability=`tpl.mFilter2.filter.radio`
]]
```
[![](https://file.modx.pro/files/0/5/d/05dc53a3bc715b00efa89be498b8b0f3s.jpg)](https://file.modx.pro/files/0/5/d/05dc53a3bc715b00efa89be498b8b0f3.png)

Упс! Добавляем запись в словари mSearch2, чистим кэш и обновляем:
[![](https://file.modx.pro/files/7/2/4/72429ab995d21fd5447f74e21ee1d7c3s.jpg)](https://file.modx.pro/files/7/2/4/72429ab995d21fd5447f74e21ee1d7c3.png)
[![](https://file.modx.pro/files/e/1/1/e11843246e354e562123930f42f25739s.jpg)](https://file.modx.pro/files/e/1/1/e11843246e354e562123930f42f25739.png)


We write availability into products, clear the cache and see something quite expectable - a column of values: 
[![](https://file.modx.pro/files/3/7/6/376b75e579f656a1a2bef073f466cbe0s.jpg)](https://file.modx.pro/files/3/7/6/376b75e579f656a1a2bef073f466cbe0.png)

We have to write our own method of filtration which will show whether a product is available or not. 

## Extending filtration class 
All standard filters mSearch2 are situated in file **/core/components/msearch2/model/msearch2/filters.class.php**.
We have to inherit it, extend it and indicate new class in system settings. 

We create a new file in **/core/components/msearch2/custom/filters/custom.class.php** write in it:
```
<?php
class myCustomFilter extends mse2FiltersHandler {}
```
[![](https://file.modx.pro/files/c/e/1/ce1b59d8e489e9ec87fa2f4b5b937d3fs.jpg)](https://file.modx.pro/files/c/e/1/ce1b59d8e489e9ec87fa2f4b5b937d3f.png)

Then we indicate it in system setting **mse2_filters_handler_class**.
[![](https://file.modx.pro/files/4/1/e/41ef22830e9c9d4a916ba02c79acfafds.jpg)](https://file.modx.pro/files/4/1/e/41ef22830e9c9d4a916ba02c79acfafd.png)

From this moment on mSearch2 uses for work **your** filtration class, in which you can write new methods or redefine standard ones. 

For getting data methods get**MethodName**Values() are used, for preparing filter — build**MethodName**Filter(), for filtration - filter**MethodName**. How these 3 types of methods work can be seen in filters.class.php.

## Adding new availability filter
We need to write our own methods of data preparation and filtration in order to divide all products into 2 arrays: 
<ul>
	<li>Field availability <= 0</li>
	<li>Field availability > 0</li>
</ul>
This means that all products are divided into groups 'available' or 'unavailable'. 

We write methods **buildAvailabilityFilter** and **filterAvailability**:
```
<?php
class myCustomFilter extends mse2FiltersHandler {

	// We take standard buildBooleanFilter as a sample and change it a little
	public function buildAvailabilityFilter(array $values) {
		if (count($values) < 2 && empty($this->config['showEmptyFilters'])) {
			return array();
		}

		$results = array();
		foreach ($values as $value => $ids) {
			$title = ($value <= 0)
				? $this->modx->lexicon('mse2_filter_availability_no')
				: $this->modx->lexicon('mse2_filter_availability_yes');

			$value = $value <= 0 ? '0' : '1';

			if (!isset($results[$value])) {
				$results[$value] = array(
					'title' => $title
					,'value' => $value
					,'type' => 'availability'
					,'resource' => array()
				);
			}

			foreach ($ids as $id) {
				$results[$value]['resources'][] = $id;
			}
		}

		ksort($results);
		return $results;
	}


	// When it comes to proper filtration, we take filterNumber as a basis
	public function filterAvailability(array $requested, array $values, array $ids) {
		$matched = array();

		$value = $requested[0];
		$tmp = array_flip($ids);
		foreach ($values as $number => $resources) {
			if ($value && $number > 0) {
				foreach ($resources as $id) {
					if (isset($tmp[$id])) {
						$matched[] = $id;
					}
				}
			}
			elseif (!$value && $number <= 0) {
				foreach ($resources as $id) {
					if (isset($tmp[$id])) {
						$matched[] = $id;
					}
				}
			}
		}

		return $matched;
	}
}
```

[![](https://file.modx.pro/files/3/c/5/3c5f44865b879243f4f9ca2d7be16bd2s.jpg)](https://file.modx.pro/files/3/c/5/3c5f44865b879243f4f9ca2d7be16bd2.png)

We add records **mse2_filter_availability_no** and **mse2_filter_availability_yes** into lexicon and get the filter needed: 
[![](https://file.modx.pro/files/4/e/b/4eb544d494a4a7e9b47fde7e938b6dd7s.jpg)](https://file.modx.pro/files/4/e/b/4eb544d494a4a7e9b47fde7e938b6dd7.png)

Obviously, this can be supported by checkboxes, texts in dictionaries can be changed, etc. The principle remains as it is. 

[1]: /en/01_Components/02_miniShop2/
[2]: /en/01_Components/03_mSearch2/
[3]: http://bezumkin.ru/modx/minishop2/classes/910/
