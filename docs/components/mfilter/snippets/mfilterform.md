# mFilterForm

Сниппет выводит форму фильтров.

## Где вызывать

На той же странице, что и сниппет `mFilter`. Хеш для AJAX-запросов выводит `mFilter` — без него форма запросы не отправляет.

В режиме с `&element` вызовите `mFilter` раньше формы: сохраните результат в переменную и выведите ниже по разметке.

```fenom
{set $results = '!mFilter' | snippet : [
    'element' => 'msProducts',
    'parents' => $_modx->resource.id
]}

<aside>{'!mFilterForm' | snippet}</aside>
<main>{$results}</main>
```

Если форма вызвана раньше, при загрузке страницы она посчитает значения по всем опубликованным ресурсам раздела, без условий из `&element`, и числа не сойдутся со списком. Готовый шаблон ресурса с правильным порядком — в [Быстром старте](/components/mfilter/quick-start#shag-3-vyvesti-filtry-v-shablone).

## Параметры

### Основные

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `resourceId` | текущий ресурс | Не задавайте: форма должна относиться к той же странице, что и выдача `mFilter`. С другим ресурсом счётчики и ссылки пагинации разойдутся с выдачей |
| `filters` | — | Вывести только эти фильтры (через запятую) |
| `exclude` | — | Исключить эти фильтры (через запятую) |
| `depth` | `10` | Глубина обхода дочерних ресурсов при подсчёте значений |

### Чанки

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `tpl` | `mfilter.filter` | Чанк блока фильтра |
| `tplOuter` | `mfilter.form` | Чанк обёртки формы |
| `tplItem` | `mfilter.item` | Чанк значения: чекбокс или радиокнопка |
| `tplSlider` | `mfilter.slider` | Чанк диапазона с ползунком |
| `tplColor` | `mfilter.color` | Чанк значения цветового фильтра |
| `tplBoolean` | `mfilter.boolean` | Чанк значения-переключателя (`boolean`) |

### Отображение значений

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `showCounts` | `true` | Показывать количество результатов |
| `hideZero` | `true` | Скрывать блоки без значений и значения с нулевым счётчиком. Действует при загрузке страницы, если не выбран ни один фильтр. Значения, которые обнулил выбор другого фильтра, остаются видны и помечаются классом `.mfilter-item-empty` |
| `sortByCount` | `false` | Сортировать значения по количеству результатов, по убыванию. Порядок задаётся при загрузке страницы и после фильтрации не меняется |

### Форма

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `formId` | `mfilter-form` | Атрибут `id` формы |
| `formClass` | `mfilter-form` | Атрибут `class` формы |
| `actionUrl` | адрес текущего ресурса | Служебный, менять не нужно: запросы формы уходят в API mFilter |
| `method` | `POST` | Служебный, менять не нужно |

### AJAX

Форма работает только через AJAX.

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `ajax` | `true` | Служебный, менять не нужно |
| `ajaxMode` | `form` | Действует только при `autoSubmit = 0`: значение `instant` включает событие `mfilter:change` при изменении полей — см. [JS API](/components/mfilter/development/js-api#sobytiya). Запрос при этом всё равно уходит по кнопке |
| `autoSubmit` | значение `mfilter.auto_submit` (`true`) | `1` — запрос при каждом изменении значений, `0` — по кнопке «Применить» |
| `autoSubmitDelay` | значение `mfilter.auto_submit_delay` (`300`) | Задержка автоотправки, мс |

### Вывод

| Параметр | По умолчанию | Описание |
|----------|--------------|----------|
| `outputSeparator` | `\n` | Разделитель между блоками фильтров |
| `toPlaceholder` | `false` | Не выводить форму на месте вызова. Форма в любом случае записывается в плейсхолдер `mfilter.form` |
| `placeholderPrefix` | `mfilter.` | Префикс плейсхолдеров `form` и `activeCount` |

## Переменные чанка `tplOuter`

| Переменная | Тип | Описание |
|------------|-----|----------|
| `$filters` | string | HTML всех блоков фильтров |
| `$formAttrs` | string | Готовая строка атрибутов формы |
| `$formId`, `$formClass` | string | ID и класс формы |
| `$resourceId` | int | ID текущего ресурса |
| `$hasFilters` | bool | Применён ли хотя бы один фильтр |
| `$activeFiltersCount` | int | Сколько фильтров применено. Диапазон считается за один, хотя форма отправляет два поля (`price\|min`, `price\|max`) |
| `$appliedFilters` | array | Применённые фильтры: `[ключ => [значения]]`. Диапазон — всегда один ключ со значением `[min, max]`. Если задана одна граница, вторая у числового диапазона равна нулю или `PHP_INT_MAX`, у диапазона дат — `null`. Выводить такие значения напрямую не стоит |
| `$ajax`, `$ajaxMode`, `$autoSubmit` | mixed | Значения одноимённых параметров |
| `$debugProfiler` | bool | Включена ли настройка `mfilter.debug_profiler`. Стандартный чанк выводит по ней блок профайлера `.mfilter-profiler` |

::: tip Почему `$activeFiltersCount`, а не `$activeCount`
Имя `$activeCount` занято в чанке **фильтра** (`tpl`): там это число выбранных значений в этом фильтре.
:::

### Кнопка сброса только при активных фильтрах

```html
<button type="reset" data-mfilter-reset{if !$hasFilters} hidden{/if}>
    Сбросить (<span data-mfilter-reset-count>{$activeFiltersCount}</span>)
</button>
```

Что в этой разметке важно:

1. **Кнопка выводится всегда**, а скрывается атрибутом `hidden`. JS не может показать элемент, которого нет в DOM.
2. **Атрибут `data-mfilter-reset`** (или класс `mfilter-reset-btn`) — по нему JS переключает видимость при AJAX-фильтрации и подключает сброс.
3. **`type="reset"`** (или класс `mfilter-reset`) — прежние маркеры сброса: сброс по ним работает, а видимость JS не переключает.

Счётчик в `[data-mfilter-reset-count]` скрипт обновляет сам, при нуле кнопка скрыта.

::: danger Не оборачивайте кнопку в `{if}`

```html
{* ТАК НЕЛЬЗЯ — кнопка не появится при AJAX *}
{if $hasFilters}
    <button type="reset" data-mfilter-reset>Сбросить</button>
{/if}
```

При загрузке страницы без фильтров кнопки не будет в DOM вообще. JS не найдёт её и не сможет показать после выбора фильтра — она появится только после полной перезагрузки страницы, то есть тогда, когда уже не нужна.
:::

::: warning Почему не плейсхолдеры
`mfilter.activeCount` устанавливается **после** отрисовки чанка и внутри него пуст. `mfilter.filters` заполняется только при разборе SEO-адреса — фильтры из обычной строки запроса (`?color[]=red`) в него не попадают. Переменные `$hasFilters` / `$activeFiltersCount` собираются из обоих источников и верны в любом режиме.
:::

### Кнопка сброса вне формы

Нажатие на кнопку вне формы скрипт не обрабатывает, даже если у неё есть атрибут или класс сброса. Такую кнопку подключайте через [JS API](/components/mfilter/development/js-api) — и сброс, и показ:

```html
<button type="button" data-filter-reset-outside hidden>Сбросить фильтры</button>

<script>
const resetOutside = document.querySelector('[data-filter-reset-outside]');

resetOutside.addEventListener('click', () => mfilterGet().reset());

// Кнопка видна, только когда выбран хоть один фильтр
const syncResetOutside = () => {
    resetOutside.hidden = Object.keys(mfilterGet().getFilters()).length === 0;
};
document.addEventListener('mfilter:ui:ready', syncResetOutside);
document.addEventListener('mfilter:success', syncResetOutside);
</script>
```

Если форм на странице несколько, передайте в `mfilterGet()` id нужной формы.

## Примеры

### Базовый вызов

```fenom
{'!mFilterForm' | snippet}
```

::: warning Вызывайте сниппет некэшируемым
Восклицательный знак в `{'!mFilterForm' | snippet}` и в `[[!mFilterForm]]` обязателен. Форма зависит от адреса страницы: в ней отмечены выбранные значения, посчитаны товары и лежат активные фильтры для скриптов. Кэшируемый вызов отдаст её из кэша от другого адреса — отметки будут чужими, а первое же действие потеряет выбранный фильтр.
:::

### Только определённые фильтры

```fenom
{'!mFilterForm' | snippet : [
    'filters' => 'vendor,color,price'
]}
```

### Исключить фильтры

```fenom
{'!mFilterForm' | snippet : [
    'exclude' => 'size,weight'
]}
```

### Фильтрация по кнопке «Применить»

```fenom
{'!mFilterForm' | snippet : [
    'autoSubmit' => 0
]}
```

### Сортировка значений по популярности

```fenom
{'!mFilterForm' | snippet : [
    'sortByCount' => 1,
    'hideZero' => 1
]}
```

### Своя обёртка формы

```fenom
{'!mFilterForm' | snippet : [
    'formId' => 'catalog-filter',
    'formClass' => 'filter-sidebar',
    'tplOuter' => '@INLINE <form{$formAttrs}>{$filters}</form>'
]}
```

`{$formAttrs}` обязателен: в нём id, класс и атрибуты, по которым скрипт подхватывает форму и отправляет AJAX-запросы. Id и класс задавайте параметрами `formId` и `formClass`, а не в разметке.

### Вывод в плейсхолдер

```fenom
{'!mFilterForm' | snippet : [
    'toPlaceholder' => 1
]}

{* Ниже по странице — строго после вызова *}
<aside>
    {$_modx->getPlaceholder('mfilter.form')}
</aside>
```

Имя плейсхолдера меняется параметром `placeholderPrefix`: с `'placeholderPrefix' => 'sidebar.'` форма будет в `sidebar.form`.

## Плейсхолдеры

После вызова сниппет ставит два плейсхолдера с префиксом из `placeholderPrefix`:

| Плейсхолдер | Описание |
|-------------|----------|
| `mfilter.form` | HTML формы — при любом значении `toPlaceholder` |
| `mfilter.activeCount` | Сколько фильтров применено. На SEO-адресе диапазон считается за два фильтра; внутри `tplOuter` используйте `$activeFiltersCount` |

## Обновление после фильтрации

После AJAX-запроса форма не перерисовывается. Скрипт обновляет в ней:

- числа в `.mfilter-count` и класс `.mfilter-item-empty` у значений без товаров;
- доступность пунктов в `select`;
- ползунок диапазона — если посетитель его не двигал;
- счётчики выбранных `[data-filter-badge]` и кнопку сброса.

Параметры `tpl*`, `hideZero`, `sortByCount`, `filters` и `exclude` действуют только при загрузке страницы: набор блоков, их разметка и порядок значений после фильтрации не меняются.

## Чанки фильтров

### Структура по умолчанию

Так выглядит разметка стандартных чанков без классов Bootstrap:

```html
<form id="mfilter-form" class="mfilter-form" method="POST" action="/catalog/" data-mfilter="true" …>
    <input type="hidden" name="resource_id" value="5">

    <!-- Фильтр «Бренд»: чанки mfilter.filter и mfilter.item -->
    <div class="mfilter-block" data-filter-key="vendor">
        <span data-filter-label="Бренд">Бренд</span>
        <span data-filter-badge class="d-none">0</span>
        <div class="mfilter-items" data-filter-items>
            <div class="mfilter-item">
                <input type="checkbox" name="vendor[]" value="3" id="mf-vendor-3">
                <label for="mf-vendor-3">
                    <span>Apple</span>
                    <span class="mfilter-count">15</span>
                </label>
            </div>
        </div>
    </div>

    <!-- Фильтр «Цена»: чанки mfilter.filter и mfilter.slider -->
    <div class="mfilter-block" data-filter-key="price">
        <span data-filter-label="Цена">Цена</span>
        <div class="mfilter-range" data-filter-key="price">
            <input type="number" name="price|min" value="0" min="0" max="100000" data-range="min">
            <input type="number" name="price|max" value="100000" min="0" max="100000" data-range="max">
            <div data-mfilter-slider data-key="price" data-min="0" data-max="100000"></div>
        </div>
    </div>

    <!-- Кнопки: чанк mfilter.form -->
    <div class="mfilter-auto-submit">
        <button type="submit" class="mfilter-submit-btn">Применить</button>
        <button type="reset" data-mfilter-reset hidden>Сбросить (<span data-mfilter-reset-count>0</span>)</button>
    </div>
</form>
```

Атрибуты формы на месте `…` сниппет собирает в `{$formAttrs}` — см. [Data-атрибуты](#data-atributy). Значение фильтра производителя — id производителя, а не название.

### Свой чанк фильтра

```fenom
{'!mFilterForm' | snippet : [
    'tpl' => '@FILE chunks/filter.custom.tpl'
]}
```

**chunks/filter.custom.tpl:**

```html
<div class="filter-block" data-filter-key="{$key | esc}">
    <h4 data-filter-label="{$label | esc}">
        {$label | esc}
        <span data-filter-badge class="{if $activeCount == 0}d-none{/if}">{$activeCount}</span>
    </h4>
    {$items}
</div>
```

Значения приходят в `{$items}` готовой разметкой. Разметку одного значения меняйте в `tplItem`, `tplColor` или `tplBoolean`, диапазона — в `tplSlider`. Счётчик выбранных значений `[data-filter-badge]` скрипт обновляет после AJAX-запроса и прячет классом `d-none`, когда ничего не выбрано.

### Переменные чанка фильтра

| Переменная | Описание |
|-------------|----------|
| `{$key}` | Ключ фильтра (`vendor`, `color`, `price`) |
| `{$label}` | Название фильтра: заголовок из набора фильтров (можно ключ лексикона или `@LEXICON:ключ`). Без заголовка — подпись TV или опции MiniShop3, затем лексикон `mfilter.field.<поле>` или `ms3_product_<поле>`, в крайнем случае — имя поля с заглавной буквы |
| `{$type}` | Тип фильтра — см. [Типы фильтров](/components/mfilter/development/filter-types). Ползунок выводится только у `number`, значения `colors` — чанком `tplColor`, `boolean` — `tplBoolean`, остальных типов — `tplItem` |
| `{$items}` | Разметка значений, уже собранная из чанков значения или диапазона |
| `{$itemCount}` | Сколько значений выведено |
| `{$activeCount}` | Сколько значений выбрано в этом фильтре |
| `{$multiple}` | Можно ли выбрать несколько значений |
| `{$collapsed}` | Всегда `false` |

### Переменные чанка значения

Чанки `tplItem`, `tplColor` и `tplBoolean` получают:

| Переменная | Описание |
|-------------|----------|
| `{$key}` | Ключ фильтра |
| `{$value}` | Значение — оно уходит в запрос |
| `{$label}` | Отображаемое название |
| `{$count}` | Количество результатов |
| `{$active}` | Выбрано ли значение |
| `{$slug}` | Слаг значения для SEO-адреса |
| `{$multiple}` | Можно ли выбрать несколько значений: в стандартном чанке от него зависит `checkbox` или `radio` |
| `{$disabled}` | У значения нет товаров, и оно не выбрано |
| `{$hex}` | HEX цвета — только у типа `colors` |

### Переменные чанка диапазона

Чанк `tplSlider` выводит фильтр типа `number`. Если у всех товаров одно значение или значений нет, блок не выводится.

| Переменная | Описание |
|-------------|----------|
| `{$key}` | Ключ фильтра |
| `{$label}` | Название фильтра |
| `{$min}`, `{$max}` | Границы диапазона по товарам раздела |
| `{$minValue}`, `{$maxValue}` | Выбранные границы; без выбора — `{$min}` и `{$max}` |
| `{$step}` | Шаг |
| `{$prefix}`, `{$suffix}` | Префикс и суффикс из набора фильтров. Стандартный чанк их не выводит; ползунок показывает их, если вывести в атрибутах `data-prefix` и `data-suffix` элемента `[data-mfilter-slider]` |

## Data-атрибуты

Атрибуты формы сниппет собирает в `{$formAttrs}` — в своём `tplOuter` выводите его, а не перечисляйте атрибуты вручную:

| Атрибут | Описание |
|---------|----------|
| `data-mfilter` | Маркер формы mFilter |
| `data-mfilter-mode` | `instant`, если включён `autoSubmit`, иначе значение `ajaxMode` |
| `data-mfilter-auto-submit` | Автоотправка при изменении полей |
| `data-mfilter-delay` | Задержка автоотправки, мс |
| `data-mfilter-action` | Адрес API mFilter, куда уходят запросы |
| `data-resource-id` | ID ресурса формы |
| `data-base-url` | Адрес страницы без фильтров — от него строятся SEO-адреса |
| `data-mfilter-url-separator`, `data-mfilter-values-separator` | Разделители SEO-адреса из настроек `mfilter.url_separator` и `mfilter.values_separator` |
| `data-mfilter-active-filters` | Выбранные фильтры в JSON — из них скрипт восстанавливает состояние при загрузке |
| `data-mfilter-debug` | Есть, если включена настройка `mfilter.debug_profiler` |
| `data-mfilter-ajax` | Включить AJAX (true/false). Только для своей разметки формы: сниппет этот атрибут не выводит, AJAX у него включает параметр `ajax` |

Атрибуты внутри формы, на которые опирается скрипт:

| Атрибут | Описание |
|---------|----------|
| `data-filter-key` | Ключ фильтра — на блоке фильтра и на блоке диапазона |
| `data-filter-label` | Название фильтра — по нему блок выбранных фильтров подписывает значения |
| `data-filter-badge` | Счётчик выбранных значений в блоке фильтра |
| `data-range` | Тип поля диапазона (min/max) |
| `data-mfilter-slider` | Маркер для noUiSlider |
| `data-key`, `data-min`, `data-max` | У ползунка: ключ фильтра и границы. По `data-key` скрипт находит ползунок после AJAX-запроса |

Скрытое поле `resource_id` из стандартной обёртки скрипт не добавляет в запрос как фильтр.

`data-mfilter-results` и `data-mfilter-hash` форма не выводит: их ставит сниппет `mFilter` на обёртку результатов в своём `tplOuter`. Без `data-mfilter-hash` на странице форма не отправляет AJAX-запросы. На саму форму `data-mfilter-results` не ставьте — ссылки пагинации перестанут работать через AJAX.

## CSS-классы

| Класс | Описание |
|-------|----------|
| `.mfilter-form` | Форма фильтров |
| `.mfilter-block` | Блок одного фильтра |
| `.mfilter-items` | Список значений в блоке |
| `.mfilter-item` | Контейнер значения: внутри — поле и `.mfilter-count`. По нему скрипт находит счётчик после AJAX-запроса |
| `.mfilter-label` | Необязательная метка подписи значения. В стандартных чанках её нет; если есть, блок выбранных фильтров берёт подпись из неё |
| `.mfilter-count` | Счётчик результатов |
| `.mfilter-range` | Блок диапазона |
| `.mfilter-reset-btn` | Кнопка сброса — то же, что атрибут `data-mfilter-reset`: скрипт подключает сброс и переключает видимость |
| `.mfilter-reset` | Прежний маркер кнопки сброса: сброс работает, видимость скрипт не переключает |
| `.mfilter-submit-btn` | Кнопка «Применить» |
| `.mfilter-auto-submit` | Стандартная обёртка ставит его на блок кнопок при включённом `autoSubmit` — кнопка «Применить» тогда скрыта |
| `.mfilter-loading` | Состояние загрузки |
| `.mfilter-item-empty` | Значение без товаров. Скрипт ставит класс после AJAX-запроса. При загрузке страницы стандартный чанк `mfilter.item` выводит такое поле с атрибутом `disabled` |

## Вынос фильтров за пределы формы

Исключите фильтр из формы параметром `exclude` и управляйте им через JS API:

```fenom
{* Основная форма без фильтра бренда *}
{'!mFilterForm' | snippet : [
    'exclude' => 'vendor',
    'formId' => 'main-filter'
]}

{* Отдельный фильтр бренда в шапке *}
<select id="header-brand">
    <option value="">Все бренды</option>
    <option value="3">Apple</option>
    <option value="7">Samsung</option>
</select>

<script>
document.getElementById('header-brand').addEventListener('change', (e) => {
    const filter = mfilterGet('main-filter');
    if (e.target.value) {
        filter.setFilter('vendor', e.target.value);
    } else {
        filter.removeFilter('vendor');
    }
});
</script>
```

Значение фильтра производителя — его id, как в полях формы. `setFilter()` и `removeFilter()` сами отправляют запрос, вызывать `submit()` не нужно.

Подробнее: [Внешние фильтры](/components/mfilter/cookbook/external-filters)
