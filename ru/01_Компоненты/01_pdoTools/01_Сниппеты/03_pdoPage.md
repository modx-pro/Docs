Вывод результатов работы других сниппетов с разбивкой на страницы.

[![](http://st.bezumkin.ru/files/7/e/a/7ea43b037fac16e28073cca778602c68s.jpg)](http://st.bezumkin.ru/files/7/e/a/7ea43b037fac16e28073cca778602c68.png)

Есть несколько серьезных отличий от сниппета getPage:

* 2 вида пагинации: с пропуском страниц и классическая (зависит от параметра pageLimit).
* Пагинация не плавает. Если указано показывать 5 ссылок на страницы - всегда будет 5 и не больше.
* Можно указать чанки для вывода при отсутствии ссылок на первую, последнюю, следующую или предыдущую страницу.
* Параметр maxLimit не позволяет пользователю затормозить ваш сайт большой выборкой.
* Редирект на первую страницу при отсутствии результатов или некорректном параметре page.
* Работает со сниппетом pdoResources, по умолчанию.

[![](http://st.bezumkin.ru/files/6/a/e/6aeef74bd91fda2a92600802289ac5e9s.jpg)](http://st.bezumkin.ru/files/6/a/e/6aeef74bd91fda2a92600802289ac5e9.png)

## Параметры
В вызове сниппета pdoPage указываются параметры сниппета, для которого производится пагинация. Данный сниппет должен понимать параметры **&page** и **&limit**. По умолчанию pdoPage принимает все параметры [pdoTools](index.md) и кроме того, некоторые свои:

Название | Описание | По умолчанию
---|---|---
**&plPrefix** | Префикс для выставляемых плейсхолдеров |
**&limit** | Ограничение количества результатов на странице. Если "0" - не ограниченно. | 10
**&maxLimit** | Максимально возможный лимит выборки. Перекрывает лимит, указанный пользователем через url. | 100
**&offset** | Пропуск результатов от начала. | 0
**&page** | Номер страницы для вывода. Перекрывается номером, указанным пользователем через url. | 1
**&pageVarKey** | Имя переменной для поиска номера страницы в url. | page
**&totalVar** | Имя плейсхолдера для сохранения общего количества результатов. | total
**&pageLimit** | Количество ссылок на страницы. Если больше или равно 7 - включается продвинутый режим отображения. | 5
**&element** | Имя сниппета для запуска. | pdoResources
**&pageNavVar** | Имя плейсхолдера для вывода пагинации. | page.nav
**&tplPage** | Чанк оформления обычной ссылки на страницу.
**&tplPageWrapper** | Чанк оформления всего блока пагинации, содержит плейсхолдеры страниц.
**&tplPageActive** | Чанк оформления ссылки на текущую страницу.
**&tplPageFirst** | Чанк оформления ссылки на первую страницу. 
**&tplPageLast** | Чанк оформления ссылки на последнюю страницу.
**&tplPagePrev** | Чанк оформления ссылки на предыдущую страницу.
**&tplPageNext** | Чанк оформления ссылки на следующую страницу.
**&tplPageSkip** | Чанк оформления пропущенных страниц при продвинутом режиме отображения (&pageLimit >= 7).
**&tplPageFirstEmpty** | Чанк, выводящийся при отсутствии ссылки на первую страницу.
**&tplPageLastEmpty** | Чанк, выводящийся при отсутствии ссылки на последнюю страницу.
**&tplPagePrevEmpty** | Чанк, выводящийся при отсутствии ссылки на предыдущую страницу.
**&tplPageNextEmpty** | Чанк, выводящийся при отсутствии ссылки на следующую страницу.
**&cache** | Кэширование результатов работы сниппета. | 0
**&cacheTime** | Время актуальности кэша, в секундах. | 3600
**&toPlaceholder** | Если не пусто, сниппет сохранит все данные в плейсхолдер с этим именем, вместо вывода не экран. |

Шаблон | По умолчанию
---|---
**&tplPage** | `@INLINE <li><a href="[[+href]]">[[+pageNo]]</a></li>`
**&tplPageWrapper** | `@INLINE <div class="pagination"><ul class="pagination">[[+first]][[+prev]][[+pages]][[+next]][[+last]]</ul></div>`
**&tplPageActive** | `@INLINE <li class="active"><a href="[[+href]]">[[+pageNo]]</a></li>`
**&tplPageFirst** | `@INLINE <li class="control"><a href="[[+href]]">[[%pdopage_first]]</a></li>`
**&tplPageLast** | `@INLINE <li class="control"><a href="[[+href]]">[[%pdopage_last]]</a></li>`
**&tplPagePrev** | `@INLINE <li class="control"><a href="[[+href]]">&laquo;</a></li>`
**&tplPageNext** | `@INLINE <li class="control"><a href="[[+href]]">&raquo;</a></li>`
**&tplPageSkip** | `@INLINE <li class="disabled"><span>...</span></li>`
**&tplPageFirstEmpty** | `@INLINE <li class="control"><span>[[%pdopage_first]]</span></li>`
**&tplPageLastEmpty** | `@INLINE <li class="control"><span>[[%pdopage_last]]</span></li>`
**&tplPagePrevEmpty** | `@INLINE <li class="disabled"><span>&laquo;</span></li>`
**&tplPageNextEmpty** | `@INLINE <li class="disabled"><span>&raquo;</span></li>`



## Примеры
Так как pdoPage является частью pdoTools, в параметре &element у него сразу прописан сниппет pdoResources. Поэтому простой вызов сниппета выведет вам дочерние ресурсы:
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

Указываем максимальный лимит выборки. Теперь, какой бы limit не указал пользвоатель в url - все равно будет не больше 10 результатов на странице.
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