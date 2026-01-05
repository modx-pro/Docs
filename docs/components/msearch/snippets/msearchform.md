# mSearchForm

Сниппет для вывода формы поиска с автодополнением.

::: warning Некэшируемый вызов
Сниппет должен вызываться **некэшированно** (с `!`), так как регистрирует скрипты и использует текущее значение запроса из `$_REQUEST`.
:::

## Параметры

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| **tpl** | `mSearch.form` | Чанк с формой поиска |
| **pageId** | текущая страница | ID страницы для отправки поискового запроса |
| **autocomplete** | `0` | Включить автодополнение (1 или 0) |

## Плейсхолдеры в чанке tpl

| Плейсхолдер | Описание |
|-------------|----------|
| `[[+query]]` | Текущий поисковый запрос (экранированный) |
| `[[+action]]` | URL страницы для отправки формы |
| `[[+autocomplete]]` | `true` или `false` — включено ли автодополнение |

## Примеры

### Базовый вызов

```fenom
{'!mSearchForm' | snippet}
```

### С указанием страницы результатов

```fenom
{'!mSearchForm' | snippet : [
    'pageId' => 5,
    'autocomplete' => 1
]}
```

### На отдельной странице

Форма на главной странице, результаты на странице `/search/` (ID = 5):

```fenom
{'!mSearchForm' | snippet : [
    'pageId' => 5
]}
```

### Форма и результаты на одной странице

```fenom
{'!mSearchForm' | snippet : [
    'pageId' => $_modx->resource.id,
    'autocomplete' => 1
]}

{'!mSearch' | snippet : [
    'tpl' => 'mSearch.row',
    'limit' => 10
]}
```

## Чанк по умолчанию

Чанк `mSearch.form`:

```fenom
<form action="{$action}" method="get" class="msearch-form" data-autocomplete="{$autocomplete}">
    <input type="text" name="mse_query" value="{$query}" placeholder="{'mse_search_placeholder' | lexicon}" />
    <button type="submit">{'mse_search_button' | lexicon}</button>
</form>
```

## Автодополнение

При включённом параметре `autocomplete` сниппет регистрирует JavaScript файл, который добавляет функционал подсказок при вводе.

### Принцип работы

1. Пользователь начинает вводить запрос
2. JavaScript отправляет AJAX-запрос на сервер
3. Сервер ищет совпадения в истории запросов
4. Пользователю показывается список подсказок

### Настройка стилей

Скрипты и стили указываются в системных настройках:

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `mse_frontend_css` | `[[++assets_url]]components/msearch/css/web/msearch.css` | CSS файл |
| `mse_frontend_js` | `[[++assets_url]]components/msearch/js/web/msearch.js` | JavaScript файл |

Если вы хотите изменить стили или скрипты, скопируйте файлы в другое место и укажите новые пути в настройках — это защитит изменения при обновлении.

## Кастомизация формы

### Простая форма без сниппета

Можно создать форму без использования сниппета:

```fenom
<form action="{'search' | url}" method="get">
    <input type="text" name="mse_query" value="{$_GET['mse_query']}" placeholder="Поиск..." />
    <button type="submit">Найти</button>
</form>
```

### Форма с дополнительными полями

```fenom
<form action="{'search' | url}" method="get" class="msearch-form">
    <div class="search-row">
        <input type="text" name="mse_query" value="{$_GET['mse_query']}" placeholder="Поиск..." />
        <select name="category">
            <option value="">Все категории</option>
            <option value="5">Новости</option>
            <option value="10">Статьи</option>
        </select>
    </div>
    <button type="submit">Найти</button>
</form>
```

### Стилизованная форма

```fenom
{'!mSearchForm' | snippet : [
    'tpl' => 'mySearchForm',
    'pageId' => 5,
    'autocomplete' => 1
]}
```

Чанк `mySearchForm`:

```fenom
<form action="{$action}" method="get" class="search-widget" data-autocomplete="{$autocomplete}">
    <div class="search-input-wrapper">
        <i class="icon-search"></i>
        <input
            type="text"
            name="mse_query"
            value="{$query}"
            placeholder="Что ищете?"
            autocomplete="off"
        />
        {if $query}
        <button type="button" class="clear-search" onclick="this.form.mse_query.value=''; this.form.submit();">
            <i class="icon-close"></i>
        </button>
        {/if}
    </div>
    <button type="submit" class="search-submit">
        <span>Найти</span>
    </button>
</form>
```

## Отличия от mSearch2

| Аспект | mSearch2 | mSearch |
|--------|----------|---------|
| Параметр формы | `tplForm` | `tpl` |
| Автодополнение | `results`, `queries`, `0` | `1` или `0` |
| Переменная запроса | Настраиваемая (`queryVar`) | Фиксированная `mse_query` |
| Вызов сниппета | `element` параметр | Не поддерживается |

::: tip Упрощённая архитектура
mSearch использует упрощённый подход к автодополнению — подсказки берутся только из истории запросов. Для более сложных сценариев используйте AJAX с вызовом сниппета mSearch.
:::
