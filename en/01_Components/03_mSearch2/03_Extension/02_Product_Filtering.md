[miniShop2][1] умеет работать с любыми столбцами таблицы свойств товара, а [mSearch2][2] умеет получать любые столбцы из таблиц и генерировать по ним фильтры.

Давайте соединим эти 2 возможности, и напишем фильтр по наличию товара. Заодно научимся добавлять собственные поля в товар и строить по нему необычный фильтр.

## Расширение свойств товара: новое поле availability
Первым делом читаем про [расширение товаров miniShop2][3].

Затем создаём в таблице msProductData новую колонку **availability** INT(10).

[![](http://file.modx.pro/files/5/0/b/50b2b7853493cc3e400ffc7719ce7a72s.jpg)](http://file.modx.pro/files/5/0/b/50b2b7853493cc3e400ffc7719ce7a72.png)
[![](http://file.modx.pro/files/6/2/6/6262c3163e205ef7f7bccce915014492s.jpg)](http://file.modx.pro/files/6/2/6/6262c3163e205ef7f7bccce915014492.png)

Добавляем новое поле в модель товара:
```
<?php
// Файл /core/components/minishop2/plugins/availability/model/msproductdata.map.inc.php
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
[![](http://file.modx.pro/files/8/0/0/800be6cb587629b2480883f9e0c69ce4s.jpg)](http://file.modx.pro/files/8/0/0/800be6cb587629b2480883f9e0c69ce4.png)

Добавляем виджеты ExtJS для этого поля в админку:
```
// Файл /assets/components/minishop2/plugins/availability/msproductdata.js
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
[![](http://file.modx.pro/files/9/0/a/90a03e1b6ab23fc57913f821e54bdecfs.jpg)](http://file.modx.pro/files/9/0/a/90a03e1b6ab23fc57913f821e54bdecf.png)

Связываем это вместе индексным файлом, который включит плагин:
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
[![](http://file.modx.pro/files/d/e/0/de08c7b92662cf8f349a8761bb19e009s.jpg)](http://file.modx.pro/files/d/e/0/de08c7b92662cf8f349a8761bb19e009.png)

И добавляем запись в лексикон:
[![](http://file.modx.pro/files/d/b/c/dbc0d8f29d135e559ad052c244f335f0s.jpg)](http://file.modx.pro/files/d/b/c/dbc0d8f29d135e559ad052c244f335f0.png)

Тщательно чистим кэш и пробуем включить новое поле в настройках.
[![](http://file.modx.pro/files/1/2/4/124a4466e092bd4340662c7783bc2be5s.jpg)](http://file.modx.pro/files/1/2/4/124a4466e092bd4340662c7783bc2be5.png)

Если не получилось - внимательно повторяем вся заново. У меня заработало с первого раза:
[![](http://file.modx.pro/files/a/9/7/a97179f499ce5eb0329c56860c005bb2s.jpg)](http://file.modx.pro/files/a/9/7/a97179f499ce5eb0329c56860c005bb2.png)
[![](http://file.modx.pro/files/a/8/a/a8ad101ebe4d170ca92c7bfd1f563674s.jpg)](http://file.modx.pro/files/a/8/a/a8ad101ebe4d170ca92c7bfd1f563674.png)

## Добавление фильтра по новому полю
Поле **availability** теперь точно такое же родное поле товара, как и price, weight и остальные поля msProductData.

То есть, включить мы его можем очень просто:
```
[[!mFilter?
	&filters=`ms|availability:availability`
]]
```

Только это выведет нам чекбоксы, где будут указаны цифрами разные варианты наличия товаров. 0, 5, 10 и т.д.
Слайдер с диапазоном цен тут тоже не подходит, явно просится радиокнопка.

```
[[!mFilter?
	&filters=`ms|availability:availability`
	&suggestionsRadion=`ms|availability`
	&tplFilter.row.ms|availability=`tpl.mFilter2.filter.radio`
]]
```
[![](http://file.modx.pro/files/0/5/d/05dc53a3bc715b00efa89be498b8b0f3s.jpg)](http://file.modx.pro/files/0/5/d/05dc53a3bc715b00efa89be498b8b0f3.png)

Упс! Добавляем запись в словари mSearch2, чистим кэш и обновляем:
[![](http://file.modx.pro/files/7/2/4/72429ab995d21fd5447f74e21ee1d7c3s.jpg)](http://file.modx.pro/files/7/2/4/72429ab995d21fd5447f74e21ee1d7c3.png)
[![](http://file.modx.pro/files/e/1/1/e11843246e354e562123930f42f25739s.jpg)](http://file.modx.pro/files/e/1/1/e11843246e354e562123930f42f25739.png)


Прописываем наличие в товары, чистим кэш и видим вполне ожидаемую картину - столбик значений:
[![](http://file.modx.pro/files/3/7/6/376b75e579f656a1a2bef073f466cbe0s.jpg)](http://file.modx.pro/files/3/7/6/376b75e579f656a1a2bef073f466cbe0.png)

Нам нужно написать свой метод фильтрации, который будет выдавать: есть товар в наличии, или нет?

## Расширяем класс фильтрации
Все стандартные фильтры mSearch2 находятся в файле **/core/components/msearch2/model/msearch2/filters.class.php**.
Нам нужно унаследовать его, равширить и указать новый класс в системных настройках.

Создаём новый файл в **/core/components/msearch2/custom/filters/custom.class.php** и пишем в него:
```
<?php
class myCustomFilter extends mse2FiltersHandler {}
```
[![](http://file.modx.pro/files/c/e/1/ce1b59d8e489e9ec87fa2f4b5b937d3fs.jpg)](http://file.modx.pro/files/c/e/1/ce1b59d8e489e9ec87fa2f4b5b937d3f.png)

Указывем его в системной настройке **mse2_filters_handler_class**.
[![](http://file.modx.pro/files/4/1/e/41ef22830e9c9d4a916ba02c79acfafds.jpg)](http://file.modx.pro/files/4/1/e/41ef22830e9c9d4a916ba02c79acfafd.png)

С этого момента mSearch2 использует для работы **ваш** класс фильтрации, в котором вы можете писать новые методы, или переопределять стандартные.

Для получения данных используются методы get**ИмяМетода**Values(), для подготовки фильтра — build**ИмяМетода**Filter(), а для фильтрации filter**ИмяМетода**. Можно посмотреть, как работают эти 3 типа методов в filters.class.php.

## Добавляем новый фильтр availability
Нам нужно написать свои методы подготовки и фильтрации данных, чтобы разложить все товары 2 массива:
<ul>
	<li>Поле availability <= 0</li>
	<li>Поле availability > 0</li>
</ul>
То есть, все товары делим на группы "в наличии" и "отсутствуют".

Пишем методы **buildAvailabilityFilter** и **filterAvailability**:
```
<?php
class myCustomFilter extends mse2FiltersHandler {
	
	// За образец берем стандартный buildBooleanFilter и немного его меняем
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
	
	
	// Собственно фильтрация, берём за основу filterNumber
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

[![](http://file.modx.pro/files/3/c/5/3c5f44865b879243f4f9ca2d7be16bd2s.jpg)](http://file.modx.pro/files/3/c/5/3c5f44865b879243f4f9ca2d7be16bd2.png)

Добавляем в лексикон записи **mse2_filter_availability_no** и **mse2_filter_availability_yes** и получаем нужный нам фильтр:
[![](http://file.modx.pro/files/4/e/b/4eb544d494a4a7e9b47fde7e938b6dd7s.jpg)](http://file.modx.pro/files/4/e/b/4eb544d494a4a7e9b47fde7e938b6dd7.png)

Конечно, можно оформить это чекбоксами, поменять текст в словарях и т.д. Принцип останется прежним.

[1]: /ru/01_Компоненты/02_miniShop2/
[2]: /ru/01_Компоненты/03_mSearch2/
[3]: http://bezumkin.ru/modx/minishop2/classes/910/