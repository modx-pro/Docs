Сниппет для построения навигации в стиле хлебных крошек.

Хорошо заменяет [BreadCrumb][1], работает с документами из любых контекстов и позволяет указывать различные условия для выборки ресурсов.

Сниппет обладает очень высокой скоростью работы, за счет выборки всех нужных элементов из БД за один запрос.

## Параметры
Принимает все параметры [pdoTools][2] и некоторые свои:

Параметр			| Описание				| По умолчанию
--------------------|-----------------------|--------------------------------------------------------------------------------------------
**&showLog**		| 0						| Показывать дополнительную информацию о работе сниппета. Только для авторизованных в контекте «mgr».
**&from**			| 0						| Id ресурса, от которого строить хлебные крошки. Обычно это корень сайта, то есть «0».
**&to**				|  						| Id ресурса для которого строятся хлебные крошки. По умолчанию это id текущей страницы.
**&exclude**		|  						| Список id ресурсов, которые нужно исключить из выборки.
**&toPlaceholder**	|  						| Если не пусто, сниппет сохранит все данные в плейсхолдер с этим именем, вместо вывода не экран.
**&outputSeparator**| `&nbsp;&rarr;&nbsp;`	| Разделитель между крошками
**&tpl**			|  						| Имя чанка для оформления ресурса. Если не указан, то содержимое полей ресурса будет распечатано на экран.
**&tplCurrent**		|  						| Чанк оформления текущего документа в навигации.
**&tplMax**			|  						| Чанк, который добавляется в начало результатов, если их больше чем **&limit**.
**&tplHome**		|  						| Чанк оформления ссылки на главную страницу.
**&tplWrapper**		|  						| Чанк-обёртка, для заворачивания всех результатов. Понимает один плейсхолдер: `[[+output]]`. Не работает вместе с параметром **&toSeparatePlaceholders**.
**&wrapIfEmpty**	|  						| Включает вывод чанка-обертки **&tplWrapper** даже если результатов нет.
**&showCurrent**	| 1						| Выводить текущий документ в навигации.
**&showHome**		| 0						| Выводить ссылку на главную в начале навигации.
**&showAtHome**		| 1						| Показывать хлебные крошки на главной странице сайта.
**&hideSingle**		| 0						| Не выводить результат, если он один единственный.
**&direction**		| ltr					| Направление навигации: слева направо «ltr» или справа налево «rtl», например для Арабского языка.

### Шаблоны

Шаблон			| По умолчанию
----------------|--------------------------------------------------
**&tpl**		| `@INLINE <a href="[[+link]]">[[+menutitle]]</a>`
**&tplCurrent**	| `@INLINE <span>[[+menutitle]]</span>`
**&tplMax**		| `@INLINE <span>&nbsp;...&nbsp;</span>`
**&tplHome**	|
**&tplWrapper**	| `@INLINE <div class="breadcrumbs">[[+output]]</div>`

## Примеры
Генерация хлебных крошек для текущей страницы:
```
[[pdoCrumbs]]
```

Генерация в ограничением по количеству пунктов:
```
[[pdoCrumbs?
	&limit=`2`
]]
```

Сниппет хорошо работает при вызове из pdoResources. Например, вот такой чанк:
```
<h3>[[+pagetitle]]</h3>
<p>[[+introtext]]</p>
[[pdoCrumbs?
	&to=`[[+id]]`
	&showCurrent=`0`
]]
```

## Генерация title страниц
pdoCrumbs можно вызывать внутри другого сниппета, например, чтобы генерировать тег title для страниц сайта.
Сниппет Title:
```
<?php
// Определяем переменные
if (empty($separator)) {$separator = ' / ';}
if (empty($titlefield)) {$titlefield = 'longtitle';}
if (empty($parents_limit)) {$parents_limit = 3;}
if (empty($tplPages)) {$tplPages = 'стр. [[+page]] из [[+pageCount]]';}

// Ключ и параметры кэширования
$cacheKey = $modx->resource->getCacheKey() . '/title_' . sha1(serialize($_REQUEST));
$cacheOptions = array('cache_key' => 'resource');

if (!$title = $modx->cacheManager->get($cacheKey, $cacheOptions)) {
	// Узнаём имя страницы
	$title = !empty($modx->resource->$titlefield)
		? $modx->resource->$titlefield
		: $modx->resource->pagetitle;

	// Добавляем поисковый запрос, если есть
	if (!empty($_GET['query']) && strlen($_GET['query']) > 2) {
		// Нужно использовать плейсхолдер, чтобы не подсунули бяку
		$title .= ' «[[+mse2_query]]»';
	}

	// Добавляем пагинацию, если есть
	if (!empty($_GET['page'])) {
		$title .= $separator . str_replace('[[+page]]', intval($_GET['page']), $tplPages);
	}

	// Добавляем родителей
	$crumbs = $modx->runSnippet('pdoCrumbs', array(
		'to' => $modx->resource->id,
		'limit' => $parents_limit,
		'outputSeparator' => $separator,
		'showHome' => 0,
		'showAtHome' => 0,
		'showCurrent' => 0,
		'direction' => 'rtl',
		'tpl' => '@INLINE [[+menutitle]]',
		'tplCurrent' => '@INLINE [[+menutitle]]',
		'tplWrapper' => '@INLINE [[+output]]',
		'tplMax' => ''
	));
	if (!empty($crumbs)) {
		$title = $title . $separator . $crumbs;
	}

	// Кэшируем результаты
	$modx->cacheManager->set($cacheKey, $title, 0, $cacheOptions);
}

// Возвращаем title
return $title;
```

Вызов сниппета на странице
```
<title>[[Title]] / [[++site_name]] - мой самый лучший на свете сайт</title>
```

## Демо
Рабочий пример [генерации хлебных крошек в результатах поиска][3] mSearch2.

[![](http://file.modx.pro/files/a/f/4/af4033fffb71ad040e3ff2f6c01d9bf5s.jpg)](http://file.modx.pro/files/a/f/4/af4033fffb71ad040e3ff2f6c01d9bf5.png)

Также на всём сайте [bezumkin.ru][4] используются динамические title.


[1]: http://rtfm.modx.com/extras/revo/breadcrumb
[2]: /ru/01_Компоненты/01_pdoTools/04_Общие_параметры.md
[3]: http://bezumkin.ru/search?query=pdotools
[4]: http://bezumkin.ru/