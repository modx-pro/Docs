# mSearchForm

Сниппет для вывода формы поиска с опциональным автодополнением.

::: warning Некэшируемый вызов
Сниппет должен вызываться **некэшированно** (с `!`), так как регистрирует скрипты, пишет конфигурацию формы в кэш MODX и использует текущее значение запроса из `$_REQUEST`.
:::

## Параметры

### Параметры формы

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| **tplForm** | `mSearch.form` | Чанк с разметкой формы поиска |
| **queryVar** | `mse_query` | Имя HTTP-параметра, в котором передаётся поисковый запрос. Валидируется по regex `^[a-zA-Z_][a-zA-Z0-9_]*$`, при невалидном имени — fallback на `mse_query` |
| **pageId** | текущая страница | ID страницы, на которую отправляется поисковый запрос |
| **autocomplete** | `0` | Включить автодополнение (1 — включено, 0 — отключено). При `0` JavaScript-стек не подключается |

### Параметры автодополнения

Эти параметры действуют только при `autocomplete=1`. Сниппет записывает их в кэш MODX под уникальным `formId`, и серверный API читает их оттуда при каждом AJAX-запросе — клиент сам не передаёт их в URL.

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| **tpl** | `mSearch.suggest.row` | Чанк строки подсказки в выпадающем списке |
| **limit** | `5` | Максимальное количество подсказок |
| **ctx** | текущий контекст | Контексты для фильтрации, через запятую (например `web,shop`) |
| **element** | | Имя внешнего сниппета (например `msProducts`), который загружает данные для подсказок вместо собственного SQL адаптера. См. ниже раздел «Интеграция через element» |
| **elementProperties** | | Дополнительные параметры для `element`. Принимается как JSON-строка (стандартный MODX-тег) или как PHP-массив (Fenom-вызов через `\| snippet : [...]`). Ключи `resources` и `return` адаптер всегда переопределяет |

## Плейсхолдеры в чанке формы

| Плейсхолдер | Описание |
|-------------|----------|
| `[[+query]]` | Текущий поисковый запрос, экранированный через `htmlspecialchars(ENT_QUOTES \| ENT_HTML5)` |
| `[[+queryVar]]` | Имя HTTP-параметра запроса (значение свойства `queryVar`) — используется в `name="..."` поля ввода |
| `[[+action]]` | URL страницы для submit формы |
| `[[+autocomplete]]` | `true` или `false` — включено ли автодополнение |
| `[[+connectorUrl]]` | URL публичного API (`api.php`) |
| `[[+formId]]` | Уникальный идентификатор формы (12-символьный хеш от свойств) — для связи AJAX-запросов с серверной конфигурацией |

## Примеры

### Базовый вызов

```fenom
{'!mSearchForm' | snippet}
```

### С автодополнением на текущей странице

```fenom
{'!mSearchForm' | snippet : ['autocomplete' => 1]}
```

### Форма на главной, результаты на странице поиска

```fenom
{'!mSearchForm' | snippet : [
    'pageId' => 5,
    'autocomplete' => 1
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

### Кастомное имя HTTP-параметра запроса

```fenom
{'!mSearchForm' | snippet : [
    'queryVar' => 'q',
    'autocomplete' => 1
]}
```

В этом случае input получит `name="q"`, submit отправит `?q=...`. Сниппет `mSearch` на странице результатов нужно вызвать с тем же `queryVar`:

```fenom
{'!mSearch' | snippet : ['queryVar' => 'q']}
```

### Ограничение по контекстам

```fenom
{'!mSearchForm' | snippet : [
    'autocomplete' => 1,
    'ctx' => 'web,shop'
]}
```

## Чанк формы по умолчанию

Чанк `mSearch.form`:

```fenom
<form action="{$action}" method="get" class="mse-form" data-msearch-form
      data-connector-url="{$connectorUrl}"
      data-form-id="{$formId}"
      data-autocomplete="{$autocomplete}">
    <input type="text" name="{$queryVar}" value="{$query}" placeholder="{'mse_search_placeholder' | lexicon}" class="mse-input" autocomplete="off">
    <button type="submit" class="mse-button">{'mse_search_button' | lexicon}</button>
</form>
```

Атрибут `data-msearch-form` — маркер для автоматической инициализации JavaScript UI. Атрибут `data-form-id` связывает форму с серверной конфигурацией.

## Автодополнение

При `autocomplete=1` сниппет:

1. Записывает конфигурацию (`tpl`, `limit`, `ctx`, `element`, `elementProperties`) в кэш MODX под ключом `formId` (TTL 24 часа, partition `msearch/forms`).
2. Регистрирует CSS из системной настройки `mse_frontend_css`.
3. Регистрирует JavaScript-слой (6 файлов в правильном порядке):
   - `core/ApiClient.js` — HTTP-клиент
   - `core/SearchAPI.js` — фасад поискового API
   - `modules/hooks.js` — система хуков
   - `msearch.headless.js` — headless-точка входа (`window.msearch`)
   - `ui/SearchUI.js` — UI-слой автокомплита
   - `msearch.js` — автоинициализация по `[data-msearch-form]`
4. Добавляет inline-скрипт с `window.msearchConfig` (содержит только `apiUrl` и `autoInit` — никаких служебных параметров на клиенте).

### Принцип работы

1. Пользователь вводит запрос (минимум 2 символа — настраивается системной настройкой `mse_suggest_min_query_length`).
2. JavaScript с задержкой 300мс (debounce) отправляет запрос `api.php?route=/search/suggest&query=...&form=...`.
3. Сервер читает конфигурацию формы из кэша по `formId`, выполняет поиск с морфологическим анализом, рендерит каждую подсказку через указанный `tpl` и возвращает массив с готовым HTML.
4. UI вставляет готовый HTML в dropdown.

### Безопасность

Сервер принимает от клиента только `query`, `offset` (для основного поиска) и `ctx` (для headless-режима). Все остальные параметры (`tpl`, `limit`, `element`, `elementProperties`) приходят исключительно из кэша по `formId`. Клиент не может подменить имя чанка или подсунуть произвольный сниппет — это закрывает вектор SSTI.

### Настройка стилей

| Настройка | По умолчанию | Описание |
|-----------|--------------|----------|
| `mse_frontend_css` | `[[++assets_url]]components/msearch/css/web/msearch.css` | URL CSS-файла. Пустое значение отключает регистрацию |
| `mse_suggest_min_query_length` | `2` | Минимальная длина запроса для срабатывания автокомплита |

Чтобы переопределить стили — скопируйте файл в свою тему и укажите новый путь в `mse_frontend_css`.

## Интеграция через element

Свойство `element` позволяет загружать данные подсказок через внешний сниппет (например, `msProducts` от miniShop3), при этом сохраняя морфологический поиск mSearch.

### Как это работает

1. Поиск выполняет `Searcher` mSearch — с морфологией и весами.
2. Адаптер получает список найденных ID и вызывает `runSnippet($element, [...])` вместо собственного SQL.
3. Сниппет применяет свои события, плагины (например, скидки miniShop3) и форматирование.
4. Адаптер обогащает результат подсветкой, `url`, `type`, `idx`.

### Пример: товары miniShop3

```fenom
{'!mSearchForm' | snippet : [
    'autocomplete' => 1,
    'element' => 'msProducts',
    'elementProperties' => [
        'parents' => 0,
        'formatPrices' => 1,
        'withCurrency' => 1
    ]
]}
```

Что даёт:
- `formatPrices=1` + `withCurrency=1` — цены вернутся отформатированными строками типа `1 500 ₽`.
- `parents=0` — `msProducts` ищет по всему каталогу, а не только в детях текущей страницы (важно — без этого ничего не найдётся).
- Скидки от плагинов miniShop3 применятся автоматически.

### Передача через стандартный MODX-тег

В этом случае `elementProperties` — JSON-строка:

```
[[!mSearchForm?
    &autocomplete=`1`
    &element=`msProducts`
    &elementProperties=`{"parents":0,"formatPrices":1,"withCurrency":1}`
]]
```

::: tip Зарезервированные ключи
Ключи `resources` (список ID от `Searcher`) и `return` (`json`) адаптер всегда устанавливает сам — указывать их в `elementProperties` бесполезно.
:::

### Подсказки для смешанной выдачи

Если в индексе есть и товары, и обычные ресурсы, `element` применяется **только** к адаптеру, который его поддерживает (по умолчанию — `MsProductAdapter`). Для обычных `modResource` срабатывает родной адаптер с raw SQL. Перемешанные результаты обрабатываются корректно.

## Кастомизация формы

### Простая форма без сниппета

Можно построить форму вручную без `mSearchForm`:

```fenom
<form action="{'search' | url}" method="get">
    <input type="text" name="mse_query" value="{$_GET['mse_query']}" placeholder="Поиск..." />
    <button type="submit">Найти</button>
</form>
```

Минус — нет автокомплита и нет связи с серверной конфигурацией через `formId`.

### Свой чанк формы

```fenom
{'!mSearchForm' | snippet : [
    'tplForm' => 'mySearchForm',
    'autocomplete' => 1
]}
```

Чанк `mySearchForm` использует те же плейсхолдеры, что и дефолтный:

```fenom
<form action="{$action}" method="get" class="search-widget" data-msearch-form
      data-connector-url="{$connectorUrl}"
      data-form-id="{$formId}"
      data-autocomplete="{$autocomplete}">
    <div class="search-input-wrapper">
        <i class="icon-search"></i>
        <input type="text" name="{$queryVar}" value="{$query}" placeholder="Что ищете?" autocomplete="off" />
    </div>
    <button type="submit"><span>Найти</span></button>
</form>
```

::: warning Что обязательно в чанке
Для работы автокомплита оставьте атрибуты `data-msearch-form`, `data-form-id`, `data-connector-url`, `data-autocomplete` и поле `name="{$queryVar}"`. Без них JavaScript не подключится к форме.
:::

## Headless-режим

Для интеграции с React / Vue / SPA без рендера сниппета на странице доступен глобальный объект `window.msearch`:

```javascript
window.msearch.suggest('тренажер', { ctx: 'web' })
    .then(result => console.log(result.items));
```

В этом режиме сервер использует дефолтные значения (`tpl` — из адаптера, `limit=5`), потому что конфигурации в кэше нет. Параметр `ctx` можно передать в options — он принимается как публичный фильтр.

Подробнее — см. [JavaScript API](/components/msearch/javascript-api).
