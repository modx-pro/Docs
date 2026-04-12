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
| `[[+ctx]]` | Ключ текущего контекста MODX |
| `[[+connectorUrl]]` | URL публичного API (`api.php`) |

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
<form action="{$action}" method="get" class="mse-form" data-msearch-form
      data-ctx="{$ctx}"
      data-connector-url="{$connectorUrl}"
      data-autocomplete="{$autocomplete}">
    <input type="text" name="mse_query" value="{$query}" placeholder="{'mse_search_placeholder' | lexicon}" class="mse-input" autocomplete="off">
    <button type="submit" class="mse-button">{'mse_search_button' | lexicon}</button>
</form>
```

Атрибут `data-msearch-form` — маркер для автоматической инициализации JavaScript UI.

## Автодополнение

При включённом параметре `autocomplete` сниппет регистрирует набор JavaScript файлов слоёной архитектуры:

1. `core/ApiClient.js` — HTTP-клиент
2. `core/SearchAPI.js` — фасад поискового API
3. `modules/hooks.js` — система хуков
4. `msearch.headless.js` — headless точка входа (`window.msearch`)
5. `ui/SearchUI.js` — UI-слой с автокомплитом
6. `msearch.js` — автоинициализация по `[data-msearch-form]`

Также в страницу добавляется inline-скрипт с конфигурацией `window.msearchConfig`, содержащей URL API и ключ контекста.

### Принцип работы

1. Пользователь начинает вводить запрос (минимум 2 символа)
2. JavaScript отправляет запрос на `api.php?route=/search/suggest`
3. Сервер выполняет поиск с морфологическим анализом
4. Пользователю показывается dropdown со ссылками на ресурсы

### Настройка стилей

CSS указывается в системной настройке:

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `mse_frontend_css` | `[[++assets_url]]components/msearch/css/web/msearch.css` | CSS файл |

Если вы хотите изменить стили, скопируйте файл в другое место и укажите новый путь в настройке — это защитит изменения при обновлении.

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

::: tip Headless-режим
Для интеграции с React, Vue или кастомным фронтендом можно использовать headless-режим без UI-слоя. Подробнее см. [JavaScript API](/components/msearch/javascript-api).
:::
