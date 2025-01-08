# Пагинация

С версии 2.0.0. **SendIt** умеет выводить данные с постраничной навигацией. Для этого используется сниппет-обёртка [Pagination](https://docs.modx.pro/components/sendit/snippets#pagination).
:::danger
Сделать пагинацию со списком страниц как в pdoPage невозможно.
:::
:::tip
Вы можете вызывать сниппет **Pagination** на одной странице столько раз сколько вам нужно.
:::

## Базовое использование

Пагинация работает почти так же как и pdoPage, только не требует подключения jQuery. Разметка должна быть такой

```fenom:line-numbers
<div data-pn-result="one">
  {'!Pagination' | snippet: [
    'parents' => 7,
    'query' => '',
    'snippet' => '!Pagination',
    'render' => '!pdoResources',
    'presetName' => 'pagination',
    'tpl' => '@FILE chunks/pdoresources/item.tpl',
    'tplEmpty' => '@FILE chunks/pdoresources/empty.tpl',
    'limit' => 6,
    'includeContent' => 1,
    'setTotal' => 1,
    'pagination' => 'one',
    'resultBlockSelector' => '[data-pn-result="one"]',
    'resultShowMethod' => 'insert'
  ]}
</div>

<!-- PAGINATION -->
{set $totalPages = 'one.totalPages' | placeholder}
{set $currentPage = 'one.currentPage' | placeholder}
{set $limit = 'one.limit' | placeholder}

<form data-pn-pagination="one" data-pn-type="" class="{$totalPages < 2 ? 'v_hidden' : ''}">
  <button type="button" data-pn-more="">Загрузить ещё</button>
  <div>
    <button type="button" data-pn-first="1"><<</button>
    <button type="button" data-pn-prev=""><</button>
    <input type="number" name="onepage" data-pn-current data-si-preset="pagination" min="1" max="{$totalPages}" value="{$currentPage?:1}">
    <p>из <span data-pn-total="">{$totalPages?:1}</span></p>
    <button type="button" data-pn-next="">></button>
    <button type="button" data-pn-last="{$totalPages}">>></button>
  </div>

  <p>Показывать по <input type="number" name="limit" data-pn-limit min="1" max="96" value="{$limit?:6}"></p>
</form>
```

Вызов сниппета **Pagination** должен быть размещён внутри блока с атрибутом **data-pn-result**. Значение этого атрибута должно быть равно значению в параметре **pagination**.

Кнопки постраничной навигации, поле ввода номера страницы, поле ввода лимита должны ледать внутри формы с атрибутом **data-pn-pagination**.
Значение этого атрибута должно быть равно значению в параметре **pagination**.

Описание других атрибутов

* **data-pn-more** - атрибут кнопки "Загрузить ещё". Без значения.
* **data-pn-first** - атрибут кнопки перехода на первую страницу. Значение равно 1.
* **data-pn-prev** - атрибут кнопки перехода на предыдущую страницу. Без значения.
* **data-pn-next** - атрибут кнопки перехода на следующую страницу. Без значения.
* **data-pn-last** - атрибут кнопки перехода на последнюю страницу. Значение равно значению плейсхолдера $totalPages.
* **data-pn-current** - атрибут поля ввода номера страницы. Без значения.
* **data-pn-limit** - атрибут поля ввода лимита. Без значения.
* **data-pn-total** - атрибут блока отображения общего числа страниц. Без значения.
* **data-pn-type** - атрибут блока-обёртки для указания типа пагинации **classic** для навигации кнопками или **scroll** для добавления страниц при прокрутке.

:::tip
Поле ввода номера страницы должно иметь имя в формате "значение параметра **pagination**" + "page".
:::

:::tip
Для поля ввода лимита рекомендую указывать атрибут **max**, чтобы ограничить максимальный лимит, или же скройте это поле.
:::

:::warning
Поля для ввода номера страницы и лимита ОБЯЗАТЕЛЬНО должны существовать.
:::

## Пагинация со списком страниц

Это классический вариант постраничной навигации, при котором выводится список ссылок на другие доступные страницы.

```fenom:line-numbers
<div data-pn-result="four">
  {'!Pagination' | snippet: [
    'parents' => 7,
    'query' => '',
    'snippet' => '!Pagination',
    'render' => '!pdoResources',
    'presetName' => 'pagination-classic',
    'tpl' => '@FILE chunks/pdoresources/item.tpl',
    'tplEmpty' => '@FILE chunks/pdoresources/empty.tpl',
    'limit' => 6,
    'includeContent' => 1,
    'setTotal' => 1,
    'pagination' => 'four',
    'resultBlockSelector' => '[data-pn-result="four"]',
    'resultShowMethod' => 'insert',
    'maxPageListItems' => 6,
    'tplPageListItem' => 'siPageListItem',
    'tplPageListWrapper' => 'siPageListWrapper',
  ]}
</div>

<!-- PAGINATION -->
{set $totalPages = 'four.totalPages' | placeholder}
{set $currentPage = 'four.currentPage' | placeholder}
{set $limit = 'four.limit' | placeholder}
{set $pageList = 'four.pageList' | placeholder}

<div data-pn-pagination="four" data-pn-type="" class="{$totalPages < 2 ? 'v_hidden' : ''}">
  <button type="button" data-pn-more="">Загрузить ещё</button>
  <ul data-pn-list>
    {$pageList}
  </ul>
  <input class="v_hidden" type="number" name="fourpage" data-pn-current data-si-preset="pagination-classic" min="1" max="{$totalPages}" value="{$currentPage?:1}">
  <p>Показывать по <input type="number" name="limit" data-pn-limit form="searchForm" min="1" max="96" value="{$limit?:12}"></p>
</div>
```

:::tip
Для того, чтобы выводился список страниц, обязательно нужно указать значение для параметра *maxPageListItems*. И добавить в шаблон html-элемент с атрибутом *data-pn-list*
:::

Чанк по умолчанию для обёртки списка выглядит так

```html:line-numbers
<li><a style="padding:10px" href="#" data-pn-first="1"><<</a></li>
<li><a style="padding:10px" href="#" data-pn-prev=""><</a></li>
{$items}
<li><a style="padding:10px" href="#" data-pn-next="">></a></li>
<li><a style="padding:10px" href="#" data-pn-last="{$totalPages}">>></a></li>
```

Чанк по умолчанию для элемента списка выглядит так

```html:line-numbers
<li><a style="padding:10px" data-pn-page="{$page}" class="{$currentPage === $page ? 'active' : ''}" href="#">{$page}</a></li>
```

:::warning
Атрибут *data-pn-page* обязательный.
:::

В обоих чанках доступны плейсхолдеры

* **currentPage** - номер текущей страницы.
* **totalPages** - общее число страниц.
* **pageKey** - значение параметра *pagination*.

## Загрузка страниц при прокрутке

Для отслеживания прокрутки используется Intersection Observer API. Разметка для этого способа гораздо проще. В форме есть только два обязательных поля, сама форма скрыта и содержит атрибут **data-pn-type="scroll"**

```fenom:line-numbers
<div data-pn-result="two">
  {'!Pagination' | snippet: [
    'parents' => 7,
    'snippet' => '!Pagination',
    'render' => '!pdoResources',
    'presetName' => 'pagination-scroll',
    'tpl' => '@FILE chunks/pdoresources/item.tpl',
    'tplEmpty' => '@FILE chunks/pdoresources/empty.tpl',
    'limit' => 6,
    'includeContent' => 1,
    'setTotal' => 1,
    'pagination' => 'two',
    'resultBlockSelector' => '[data-pn-result="two"]',
    'resultShowMethod' => 'append'
  ]}
</div>

<!-- PAGINATION -->
{set $twoTotalPages = 'two.totalPages' | placeholder}
{set $twoCurrentPage = 'two.currentPage' | placeholder}
{set $twoLimit = 'two.limit' | placeholder}

<form data-pn-pagination="two" data-pn-type="scroll" class="v_hidden">
  <input type="number" name="twopage" data-pn-current data-si-preset="pagination-scroll" min="1" max="{$twoTotalPages}" value="{$currentPage?:1}">
  <input type="number" name="limit" data-pn-limit min="1" max="96" value="{$twoLimit?:6}">
</form>
```

## Пагинация с динамическими параметрами

С pdoPage было крайне хлопотно сделать так, чтобы можно было динамически менять параметры вызова сниппета и сохранить пагинацию.

Данный функционал может понадобиться, если вы хотите сделать поиск не на отдельной странице, а прямо в каталоге.

Ниже я приведу пример самого простого варианта решения данной задачи.

```fenom:line-numbers
<form action="#" id="searchForm" data-si-form data-si-nosave>
  <input type="text" name="query" data-si-event="input" data-si-preset="pagination-search" placeholder="Поисковый запрос">
</form>

<div data-pn-result="three">
  {'!Pagination' | snippet: [
    'parents' => 7,
    'query' => '',
    'snippet' => '!Pagination',
    'render' => '!pdoResources',
    'presetName' => 'pagination-search',
    'tpl' => '@FILE chunks/pdoresources/item.tpl',
    'tplEmpty' => '@FILE chunks/pdoresources/empty.tpl',
    'limit' => 6,
    'includeContent' => 1,
    'setTotal' => 1,
    'pagination' => 'three',
    'resultBlockSelector' => '[data-pn-result="three"]',
    'resultShowMethod' => 'insert',
    'hashParams' => 'pagination,limit,presetName,query'
  ]}
</div>

<!-- PAGINATION -->
{set $totalPages = 'three.totalPages' | placeholder}
{set $currentPage = 'three.currentPage' | placeholder}
{set $limit = 'three.limit' | placeholder}

<div data-pn-pagination="three" data-pn-type="" class="{$totalPages < 2 ? 'v_hidden' : ''}">
    <button type="button" data-pn-more="">Загрузить ещё</button>
    <div>
      <button type="button" data-pn-first="1"><<</button>
      <button type="button" data-pn-prev=""><</button>
      <input type="number" name="threepage" data-pn-current data-si-preset="pagination-search" form="searchForm" min="1" max="{$totalPages}" value="{$currentPage?:1}">
      <p>из <span data-pn-total="">{$totalPages?:1}</span>
      </p>
      <button type="button" data-pn-next="">></button>
      <button type="button" data-pn-last="{$totalPages}">>></button>
    </div>

    <p>Показывать по <input type="number" name="limit" data-pn-limit form="searchForm" min="1" max="96" value="{$limit?:12}"></p>
</div>
```

В данном случае мы комбинируем базовое использование пагинации и форму ввода поискового запроса.
:::warning
Блок с кнопками пагинации больше не является формой, а поля ввода номера страницы и лимита содержат атрибут form, который привязывает их в форме с поисковым запросом.
:::

Для того, чтобы работал поиск нужно написать плагин, который добавит в вызов сниппета **pdoResources** параметр **where**

```php:line-numbers
switch ($modx->event->name) {
  case 'OnBeforePageRender':
    $SendIt->params['query'] = $_REQUEST['query'] ?? '';
    if ($_REQUEST['query']){
      $SendIt->params['where']['pagetitle:LIKE'] = '%' . $_REQUEST['query'] . '%';
    }
    break;
}
```

Теперь будет работать поиск ресурсов по заголовку и вывод результатов с постраничной навигацией.

:::warning
Если вы захотите сделать фильтрацию результатов по нескольким свойствам, то нужно в вызове сниппета **Pagination** указать параметр **hashParams**,
где через запятую нужно перечислить ключи параметров фильтрации.
Это нужно для того, чтобы при смене значения любого из параметров отображение страниц начиналось с первой.
:::
