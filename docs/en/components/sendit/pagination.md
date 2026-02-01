# Pagination

Since 2.0.0 **SendIt** supports paginated output via wrapper snippet [Pagination](https://docs.modx.pro/components/sendit/snippets#pagination).

:::danger
Page list like in pdoPage is not supported.
:::

:::tip
You can call **Pagination** multiple times on one page.
:::

## Basic usage

Pagination works like pdoPage but without jQuery. Markup:

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
  <button type="button" data-pn-more="">Load more</button>
  <div>
    <button type="button" data-pn-first="1"><<</button>
    <button type="button" data-pn-prev=""><</button>
    <input type="number" name="onepage" data-pn-current data-si-preset="pagination" min="1" max="{$totalPages}" value="{$currentPage?:1}">
    <p>of <span data-pn-total="">{$totalPages?:1}</span></p>
    <button type="button" data-pn-next="">></button>
    <button type="button" data-pn-last="{$totalPages}">>></button>
  </div>

  <p>Show per page <input type="number" name="limit" data-pn-limit min="1" max="96" value="{$limit?:6}"></p>
</form>
```

**Pagination** call must be inside block with **data-pn-result**. Attribute value must match **pagination** parameter.

Nav buttons, page input, limit input must be inside form with **data-pn-pagination**. Attribute value must match **pagination** parameter.

### Attribute reference

* **data-pn-more** - "Load more" button. No value.
* **data-pn-first** - First page button. Value 1.
* **data-pn-prev** - Previous page button. No value.
* **data-pn-next** - Next page button. No value.
* **data-pn-last** - Last page button. Value = $totalPages.
* **data-pn-current** - Page number input. No value.
* **data-pn-limit** - Limit input. No value.
* **data-pn-total** - Total pages display. No value.
* **data-pn-type** - Wrapper for type: **classic** (buttons) or **scroll** (infinite scroll).

:::tip
Page input name: **pagination** value + "page".
:::

:::tip
Set **max** on limit input to cap max limit, or hide the field.
:::

:::warning
Page and limit inputs MUST exist.
:::

## Page list pagination

Classic pagination with page links.

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
  <button type="button" data-pn-more="">Load more</button>
  <ul data-pn-list>
    {$pageList}
  </ul>
  <input class="v_hidden" type="number" name="fourpage" data-pn-current data-si-preset="pagination-classic" min="1" max="{$totalPages}" value="{$currentPage?:1}">
  <p>Show per page <input type="number" name="limit" data-pn-limit form="searchForm" min="1" max="96" value="{$limit?:12}"></p>
</div>
```

:::tip
For page list: set **maxPageListItems** and add html element with **data-pn-list** in template.
:::

Default wrapper chunk:

```html:line-numbers
<li><a style="padding:10px" href="#" data-pn-first="1"><<</a></li>
<li><a style="padding:10px" href="#" data-pn-prev=""><</a></li>
{$items}
<li><a style="padding:10px" href="#" data-pn-next="">></a></li>
<li><a style="padding:10px" href="#" data-pn-last="{$totalPages}">>></a></li>
```

Default list item chunk:

```html:line-numbers
<li><a style="padding:10px" data-pn-page="{$page}" class="{$currentPage === $page ? 'active' : ''}" href="#">{$page}</a></li>
```

:::warning
*data-pn-page* is required.
:::

Placeholders in both chunks: **currentPage**, **totalPages**, **pageKey**.

## Scroll pagination

Uses Intersection Observer API. Simpler markup; form hidden with **data-pn-type="scroll"**:

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

## Dynamic parameters pagination

With pdoPage it was hard to change params dynamically and keep pagination. This is useful for in-catalog search.

Simple example:

```fenom:line-numbers
<form action="#" id="searchForm" data-si-form data-si-nosave>
  <input type="text" name="query" data-si-event="input" data-si-preset="pagination-search" placeholder="Search query">
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
    <button type="button" data-pn-more="">Load more</button>
    <div>
      <button type="button" data-pn-first="1"><<</button>
      <button type="button" data-pn-prev=""><</button>
      <input type="number" name="threepage" data-pn-current data-si-preset="pagination-search" form="searchForm" min="1" max="{$totalPages}" value="{$currentPage?:1}">
      <p>of <span data-pn-total="">{$totalPages?:1}</span>
      </p>
      <button type="button" data-pn-next="">></button>
      <button type="button" data-pn-last="{$totalPages}">>></button>
    </div>

    <p>Show per page <input type="number" name="limit" data-pn-limit form="searchForm" min="1" max="96" value="{$limit?:12}"></p>
</div>
```

This combines basic pagination with search form.

:::warning
Pagination block is no longer a form; page and limit inputs use **form** attribute to bind to search form.
:::

For search, add a plugin that adds **where** param to **pdoResources**:

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

Search by title with paginated results.

:::warning
For multiple filter params, set **hashParams** in Pagination call with comma-separated filter param keys. This resets to page 1 when any filter changes.
:::
