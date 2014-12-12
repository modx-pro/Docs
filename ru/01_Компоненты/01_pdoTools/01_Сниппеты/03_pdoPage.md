Сниппет **pdoPage** позволяет вывести результаты работы других сниппетов с разбивкой на страницы.

[![](http://file.modx.pro/files/7/e/a/7ea43b037fac16e28073cca778602c68s.jpg)](http://file.modx.pro/files/7/e/a/7ea43b037fac16e28073cca778602c68.png)

Есть несколько серьезных отличий от сниппета *getPage*:

* 2 вида пагинации: с пропуском страниц и классическая (зависит от параметра **&pageLimit**).
* Пагинация не плавает. Если указано показывать 5 ссылок на страницы - всегда будет 5 и не больше.
* Можно указать чанки для вывода при отсутствии ссылок на первую, последнюю, следующую или предыдущую страницу.
* Параметр **&maxLimit** не позволяет пользователю затормозить ваш сайт большой выборкой.
* Редирект на первую страницу при отсутствии результатов или некорректном параметре **&page**.
* Работает со сниппетом *pdoResources*, по умолчанию.
* Поддерка работы через ajax.

[![](http://file.modx.pro/files/6/a/e/6aeef74bd91fda2a92600802289ac5e9s.jpg)](http://file.modx.pro/files/6/a/e/6aeef74bd91fda2a92600802289ac5e9.png)

## Параметры
При вызове сниппета *pdoPage* указываются параметры сниппета, для которого производится пагинация. Данный сниппет должен понимать параметры **&page** и **&limit**. По умолчанию pdoPage принимает все параметры [pdoTools][0] и кроме того, некоторые свои:

Название				| Описание		| По умолчанию
------------------------|---------------|------------------------------------------------------------------------------------------
**&plPrefix**			|  				| Префикс для выставляемых плейсхолдеров
**&limit**				| 10			| Ограничение количества результатов на странице. Число должно быть больше 0, иначе вам не нужен этот сниппет.
**&maxLimit**			| 100			| Максимально возможный лимит выборки. Перекрывает лимит, указанный пользователем через url.
**&offset**				| 0				| Пропуск результатов от начала.
**&page**				| 1				| Номер страницы для вывода. Перекрывается номером, указанным пользователем через url.
**&pageVarKey**			| page			| Имя переменной для поиска номера страницы в url.
**&totalVar**			| page.total	| Имя плейсхолдера для сохранения общего количества результатов.
**&pageLimit**			| 5				| Количество ссылок на страницы. Если больше или равно 7 - включается продвинутый режим отображения.
**&element**			| pdoResources	| Имя сниппета для запуска.
**&pageNavVar**			| page.nav		| Имя плейсхолдера для вывода пагинации.
**&pageCountVar**		| pageCount		| Имя плейсхолдера для вывода количества страниц.
**&tplPage**			|  				| Чанк оформления обычной ссылки на страницу.
**&tplPageWrapper**		|  				| Чанк оформления всего блока пагинации, содержит плейсхолдеры страниц.
**&tplPageActive**		|  				| Чанк оформления ссылки на текущую страницу.
**&tplPageFirst**		|  				| Чанк оформления ссылки на первую страницу.
**&tplPageLast**		|  				| Чанк оформления ссылки на последнюю страницу.
**&tplPagePrev**		|  				| Чанк оформления ссылки на предыдущую страницу.
**&tplPageNext**		|  				| Чанк оформления ссылки на следующую страницу.
**&tplPageSkip**		|  				| Чанк оформления пропущенных страниц при продвинутом режиме отображения (**&pageLimit** >= 7).
**&tplPageFirstEmpty**	|  				| Чанк, выводящийся при отсутствии ссылки на первую страницу.
**&tplPageLastEmpty**	|  				| Чанк, выводящийся при отсутствии ссылки на последнюю страницу.
**&tplPagePrevEmpty**	|  				| Чанк, выводящийся при отсутствии ссылки на предыдущую страницу.
**&tplPageNextEmpty**	|  				| Чанк, выводящийся при отсутствии ссылки на следующую страницу.
**&cache**				| 0				| Кэширование результатов работы сниппета.
**&cacheTime**			| 3600			| Время актуальности кэша, в секундах.
**&cache_user**			|  				| Принудительно устанавливает ID посетителя, по-умолчанию кеширование производится с учетом ID посетителя
**&toPlaceholder**		|  				| Если не пусто, сниппет сохранит все данные в плейсхолдер с этим именем, вместо вывода не экран.
**&ajax**				| 0				| Включение поддержки асинхронных запросов к сниппету. См. ниже.

Шаблон					| По умолчанию
------------------------|------------------------------------------------------------------------------
**&tplPage**			| `@INLINE <li><a href="[[+href]]">[[+pageNo]]</a></li>`
**&tplPageWrapper**		| `@INLINE <div class="pagination"><ul class="pagination">[[+first]][[+prev]][[+pages]][[+next]][[+last]]</ul></div>`
**&tplPageActive**		| `@INLINE <li class="active"><a href="[[+href]]">[[+pageNo]]</a></li>`
**&tplPageFirst**		| `@INLINE <li class="control"><a href="[[+href]]">[[%pdopage_first]]</a></li>`
**&tplPageLast**		| `@INLINE <li class="control"><a href="[[+href]]">[[%pdopage_last]]</a></li>`
**&tplPagePrev**		| `@INLINE <li class="control"><a href="[[+href]]">&laquo;</a></li>`
**&tplPageNext**		| `@INLINE <li class="control"><a href="[[+href]]">&raquo;</a></li>`
**&tplPageSkip**		| `@INLINE <li class="disabled"><span>...</span></li>`
**&tplPageFirstEmpty**	| `@INLINE <li class="control"><span>[[%pdopage_first]]</span></li>`
**&tplPageLastEmpty**	| `@INLINE <li class="control"><span>[[%pdopage_last]]</span></li>`
**&tplPagePrevEmpty**	| `@INLINE <li class="disabled"><span>&laquo;</span></li>`
**&tplPageNextEmpty**	| `@INLINE <li class="disabled"><span>&raquo;</span></li>`

## Поддержка Ajax
pdoPage может выдавать JSON и прерывать работу движка при соответствии запроса трём характеристикам:

* Запрос сделан при помощи XMLHttpRequest, то есть — ajax.
* В запросе содержится переменная, указанная у сниппета в &pageVarKey. По умолчанию, это page.
* У сниппета включен параметр &ajax=`1`.

То есть, вам достаточно просто указать сниппету **&ajax=`1`** и отправить странице GET запрос типа:
```
$.get('document.html?page=5', function(response) {
	console.log(response);
}, 'json');
```
И в ответ вы получите JSON c результатами работы, пагинацией и служебными данными: номер страницы, сколько всего страниц и сколько всего результатов.
Учитывая, что pdoPage - это сниппет-обёртка, таким образом вы можете заставить работать через ajax многие другие сниппеты.

### Ajax пагинация
Оборачиваем вызов pdoPage в блоки с идентификаторами:
```
<div id="tickets-wrapper">
	<div id="tickets-rows">
		[[!pdoPage?
			&element=`getTickets`
			&parents=`0`
			&ajax=`1`
		]]
	</div>
	[[!+page.nav]]
</div>
```
Внутри [[+page.nav]] у нас div с классом pagination — так в pdoPage по умолчанию.

Теперь добавляем javascript на эту разметку:
```
// Работаем только при поддержке браузером History Api
if (window.history && history.pushState) {
	var JustLoaded = true;

	// Задаём функцию загрузки страницы
	function loadPage(href) {
		// Обёртка всего блока
		var parent = $('#tickets-wrapper');
		// Индикация загрузки контента
		parent.css({opacity: .3});
		// Если загружается первая страница, то у неё нет параметра ?page=1 -
		// нужно добавить самостоятельно, иначе pdoPage не отзовётся
		if (!href.match(/page=\d+/)) {
			href += href.match(/\?/)
				? '&page=1'
				: '?page=1';
		}
		// Запрос на сервер по указанной ссылке
		$.get(href, function(response) {
			// Дальше работаем только если пришел нормальный ответ
			if (response && response['total']) {
				// Вставляем контент и пагинацию в заранее подготовленные элементы
				parent.find('#tickets-rows').html(response['output']);
				parent.find('.pagination').html(response['pagination']);
				// Убираем индикацию загрузки
				parent.css({opacity: 1});

				// Здесь можно добавить еще разные операции для выполнения после загрузки страницы
				// См. ниже
			}
		}, 'json');
	}

	// Вешаем обработчик ссылок в нашей разметке на кнопки пагинации
	$(document).on('click', '#tickets-wrapper .pagination a', function(e) {
		e.preventDefault();
		var href = $(this).prop('href');
		history.pushState({href: href}, '', href);
		loadPage(href);
	});

	// Вешаем обработчик на переключение кнопок браузера взад-вперёд
	$(window).on('popstate', function(e) {
		if (!JustLoaded && e.originalEvent.state && e.originalEvent.state['href']) {
			loadPage(e.originalEvent.state['href']);
		}
		JustLoaded = false;
	});

	// При первой загрузке страницы помещаем в историю текущий адрес
	history.replaceState({href: window.location.href}, '');
}
```
Выглядит страшно, но если убрать все комментарии, то останется одна небольшая функция и 2 обработчика событий.

В итоге, вы получаете нормальную ajax навигацию в современных браузерах, с сохранением параметров в url, и обычную загрузку страниц поисковиками и древним IE6.

После загрузки новой страницы вы можете добавить еще пару функций:

**1.** Прокрутка контента страницы вверх:
```
$('html, body').animate({
	scrollTop: parent.position().top + 50 || 0
}, 0);
```
К parent.position().top можно прибавить несколько пикселей для более точного позиционирования. На стандартной верстке Bootstrap3 нужно плюсовать высоту навигационной панели — 50px.

**2.** Если вы используете [автогенерацию тега title][1], то можно эмулировать его работу и при ajax навигации:
```
var delimeter = ' / ';
var title = [];
var tmp = $('title').text().split(delimeter);
for (var i = 0; i < tmp.length; i++) {
	if (i === tmp.length - 1 && response.page && response.page > 1) {
		title.push('стр. ' + response.page + ' из ' + response.pages);
	}
	if (!tmp[i].match(/^стр\./)) {
		title.push(tmp[i]);
	}
}
$('title').text(title.join(delimeter));
```

## Примеры
Так как pdoPage является частью pdoTools, в параметре **&element** у него сразу прописан сниппет pdoResources. Поэтому простой вызов сниппета выведет вам дочерние ресурсы:
```
[[!pdoPage?
	&tpl=`@INLINE <p>[[+idx]] <a href="/[[+uri]]">[[+pagetitle]]</a></p>`
]]
[[!+page.nav]]
```

Выводим все возможные документы сайта:
```
[[!pdoPage?
	&tpl=`@INLINE <p>[[+idx]] <a href="/[[+uri]]">[[+pagetitle]]</a></p>`
	&parents=`0`
]]
[[!+page.nav]]
```

Включаем навигацию с пропуском страниц. Обратите внимание, что если страниц выходит меньше 7, то будет работать обычная навигация.
```
[[!pdoPage?
	&tpl=`@INLINE <p>[[+idx]] <a href="/[[+uri]]">[[+pagetitle]]</a></p>`
	&parents=`0`
	&pageLimit=`7`
]]
[[!+page.nav]]
```

Активируем кэш на 30 минут:
```
[[!pdoPage?
	&tpl=`@INLINE <p>[[+idx]] <a href="/[[+uri]]">[[+pagetitle]]</a></p>`
	&parents=`0`
	&pageLimit=`7`
	&cache=`1`
	&cacheTime=`1800`
]]
[[!+page.nav]]
```

Указываем максимальный лимит выборки. Теперь, какой бы limit не указал пользователь в url - все равно будет не больше 10 результатов на странице.
```
[[!pdoPage?
	&tpl=`@INLINE <p>[[+idx]] <a href="/[[+uri]]">[[+pagetitle]]</a></p>`
	&parents=`0`
	&pageLimit=`7`
	&cache=`1`
	&cacheTime=`1800`
	&maxLimit=`10`
]]
[[!+page.nav]]
```

[0]: /ru/01_Компоненты/01_pdoTools/04_Общие_параметры.md
[1]: https://bezumkin.ru/sections/tips_and_tricks/2153/
