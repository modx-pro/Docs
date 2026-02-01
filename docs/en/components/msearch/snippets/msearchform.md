# mSearchForm

Snippet for outputting the search form with autocomplete.

::: warning Uncached call
Call the snippet **uncached** (with `!`), as it registers scripts and uses the current query from `$_REQUEST`.
:::

## Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| **tpl** | `mSearch.form` | Chunk with search form |
| **pageId** | current page | Page ID for search form action |
| **autocomplete** | `0` | Enable autocomplete (1 or 0) |

## Placeholders in tpl chunk

| Placeholder | Description |
|-------------|-------------|
| `[[+query]]` | Current query (escaped) |
| `[[+action]]` | Form action URL |
| `[[+autocomplete]]` | `true` or `false` — autocomplete on/off |

## Examples

### Basic call

```fenom
{'!mSearchForm' | snippet}
```

### With results page

```fenom
{'!mSearchForm' | snippet: [
    'pageId' => 5,
    'autocomplete' => 1
]}
```

### On separate page

Form on homepage, results on `/search/` (ID = 5):

```fenom
{'!mSearchForm' | snippet: [
    'pageId' => 5
]}
```

### Form and results on same page

```fenom
{'!mSearchForm' | snippet: [
    'pageId' => $_modx->resource.id,
    'autocomplete' => 1
]}

{'!mSearch' | snippet: [
    'tpl' => 'mSearch.row',
    'limit' => 10
]}
```

## Default chunk

Chunk `mSearch.form`:

```fenom
<form action="{$action}" method="get" class="msearch-form" data-autocomplete="{$autocomplete}">
    <input type="text" name="mse_query" value="{$query}" placeholder="{'mse_search_placeholder' | lexicon}" />
    <button type="submit">{'mse_search_button' | lexicon}</button>
</form>
```

## Autocomplete

When `autocomplete` is enabled the snippet registers a JS file that adds suggestions while typing.

### How it works

1. User types in the query
2. JS sends an AJAX request to the server
3. Server looks up matches in query history
4. User sees a list of suggestions

### Styling

Scripts and styles are set in system settings:

| Setting | Default | Description |
|---------|---------|-------------|
| `mse_frontend_css` | `[[++assets_url]]components/msearch/css/web/msearch.css` | CSS file |
| `mse_frontend_js` | `[[++assets_url]]components/msearch/js/web/msearch.js` | JS file |

To change styles or scripts, copy files elsewhere and set new paths in settings so updates do not overwrite them.

## Customizing the form

### Simple form without snippet

```fenom
<form action="{'search' | url}" method="get">
    <input type="text" name="mse_query" value="{$_GET['mse_query']}" placeholder="Search..." />
    <button type="submit">Search</button>
</form>
```

### Form with extra fields

```fenom
<form action="{'search' | url}" method="get" class="msearch-form">
    <div class="search-row">
        <input type="text" name="mse_query" value="{$_GET['mse_query']}" placeholder="Search..." />
        <select name="category">
            <option value="">All categories</option>
            <option value="5">News</option>
            <option value="10">Articles</option>
        </select>
    </div>
    <button type="submit">Search</button>
</form>
```

### Styled form

```fenom
{'!mSearchForm' | snippet: [
    'tpl' => 'mySearchForm',
    'pageId' => 5,
    'autocomplete' => 1
]}
```

Chunk `mySearchForm`:

```fenom
<form action="{$action}" method="get" class="search-widget" data-autocomplete="{$autocomplete}">
    <div class="search-input-wrapper">
        <i class="icon-search"></i>
        <input
            type="text"
            name="mse_query"
            value="{$query}"
            placeholder="What are you looking for?"
            autocomplete="off"
        />
        {if $query}
        <button type="button" class="clear-search" onclick="this.form.mse_query.value=''; this.form.submit();">
            <i class="icon-close"></i>
        </button>
        {/if}
    </div>
    <button type="submit" class="search-submit">
        <span>Search</span>
    </button>
</form>
```

## Differences from mSearch2

| Aspect | mSearch2 | mSearch |
|--------|----------|---------|
| Form chunk param | `tplForm` | `tpl` |
| Autocomplete | `results`, `queries`, `0` | `1` or `0` |
| Query variable | Configurable (`queryVar`) | Fixed `mse_query` |
| Snippet as element | Supported | Not supported |

::: tip Simpler architecture
mSearch autocomplete uses only query history. For more complex cases use AJAX with the mSearch snippet.
:::
