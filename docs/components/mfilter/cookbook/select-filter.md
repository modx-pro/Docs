# Фильтр выпадающим списком

Как вывести значения фильтра не чекбоксами, а выпадающим списком `<select>` — например, производителя в каталоге, где их несколько десятков.

## Что уже работает

Готового чанка для выпадающего списка в поставке нет, но JS обрабатывает `<select>` в форме фильтров полностью:

- отправляет форму при выборе значения — так же, как при клике по чекбоксу;
- переключает выбранное значение при переходах «Назад»/«Вперёд» в браузере и при вызове `setFilter()`/`removeFilter()` из JS API;
- сбрасывает список по кнопке сброса формы;
- после фильтрации блокирует (`disabled`) значения, по которым при текущем выборе не осталось товаров.

Нужно только написать разметку.

## Почему нужны два чанка

`mFilterForm` рисует каждый фильтр в два слоя: сначала каждое значение отдельным чанком, затем обёртку, в которую эти значения подставлены готовым HTML в `$items`.

Чанк значения выбирается **только по типу фильтра**:

| Тип фильтра | Чанк значения |
|-------------|---------------|
| `colors` | `&tplColor` |
| `boolean` | `&tplBoolean` |
| остальные | `&tplItem` |

Чанк обёртки `&tpl` — один на весь вызов сниппета. Отдельной настройки «показывать списком» у фильтра в наборе нет.

Поэтому выпадающий список делается ветвлением по ключу фильтра в обоих чанках: чанк значения выводит `<option>`, чанк обёртки — `<select>` вокруг них. Остальные фильтры формы остаются чекбоксами.

## Чанк значения

Создайте чанк, например `catalog.filter.item`. Ветка `{else}` — это стандартный чанк `mfilter.item` без изменений:

```fenom
{* Ключи фильтров, которые выводятся выпадающим списком.
   Тот же набор должен стоять в чанке обёртки. *}
{set $selectKeys = ['vendor']}

{if $key in $selectKeys}
    <option value="{$value | esc}"{if $active} selected{/if}{if $disabled} disabled{/if}>{$label | esc}</option>
{else}
    <div class="form-check mfilter-item{if $disabled} opacity-50{/if}">
        <input class="form-check-input" type="{if $multiple}checkbox{else}radio{/if}" name="{$key}{if $multiple}[]{/if}" value="{$value | esc}" id="mf-{$key}-{$slug}"{if $active} checked{/if}{if $disabled} disabled{/if}>
        <label class="form-check-label d-flex justify-content-between align-items-center w-100" for="mf-{$key}-{$slug}">
            <span>{$label | esc}</span>
            <span class="badge bg-secondary bg-opacity-25 text-dark rounded-pill ms-2 mfilter-count">{$count}</span>
        </label>
    </div>
{/if}
```

## Чанк обёртки

Создайте чанк, например `catalog.filter`. Это стандартный `mfilter.filter`, в котором ветка со списком стоит **первой** — до проверок типа, иначе фильтр типа `colors` или `boolean` уйдёт в свою ветку раньше:

```fenom
{set $selectKeys = ['vendor']}

<div class="card border-0 shadow-sm mb-3 mfilter-block" data-filter-key="{$key}">
    <div class="card-header bg-white border-bottom d-flex justify-content-between align-items-center py-3"
         data-bs-toggle="collapse" data-bs-target="#filter-{$key}"
         role="button" aria-expanded="true" style="cursor: pointer;">
        <span class="fw-semibold text-dark" data-filter-label="{$label | esc}">{$label | esc}</span>
        <div class="d-flex align-items-center gap-2">
            <span class="badge bg-primary rounded-pill{if $activeCount == 0} d-none{/if}" data-filter-badge="{$key}">{$activeCount}</span>
            <svg class="mfilter-chevron" width="16" height="16" fill="currentColor" style="transition: transform 0.2s;">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"/>
            </svg>
        </div>
    </div>
    <div class="collapse show" id="filter-{$key}">
        <div class="card-body py-3">
            {if $key in $selectKeys}
                <select class="form-select" name="{$key}">
                    <option value="">Все</option>
                    {$items}
                </select>
            {elseif $type == 'colors'}
                <div class="d-flex flex-wrap gap-2 mfilter-colors">
                    {$items}
                </div>
            {elseif $type == 'number'}
                {$items}
            {elseif $type == 'boolean'}
                {$items}
            {else}
                <div class="mfilter-items" data-filter-items style="max-height: 250px; overflow-y: auto;">
                    {$items}
                </div>
            {/if}
        </div>
    </div>
</div>
```

## Вызов

```fenom
{'!mFilterForm' | snippet : [
    'tpl' => 'catalog.filter',
    'tplItem' => 'catalog.filter.item',
]}
```

Чанки лучше заводить под своими именами, а не править стандартные `mfilter.filter` и `mfilter.item`: так видно, что разметка своя, и её не спутать с поставкой при следующем обновлении компонента.

## Правила разметки

Без любого из этих пунктов список отрисуется, но будет работать неправильно — и без ошибок в консоли.

### `name` — без `[]`

У чекбокса множественного фильтра имя `vendor[]`, и JS находит его в обоих вариантах. Список JS ищет строго по `select[name="vendor"]`. С `name="vendor[]"` перестанет работать блокировка пустых значений, а «Назад» в браузере перестанет отменять выбор в этом фильтре: JS не найдёт список, чтобы вернуть в нём прежнее значение, и при повторной отправке перечитает из формы новое.

Коварство в том, что при открытии страницы по ссылке всё будет выглядеть исправно: выбранную опцию отмечает сервер, а не JS.

### Первая опция — с пустым значением

`<option value="">Все</option>` JS никогда не блокирует, а её выбор снимает фильтр. Без неё выбранное значение из списка не убрать иначе как сбросом всей формы.

### Количество товаров — не в тексте опции

Для чекбоксов JS после фильтрации переписывает счётчик `.mfilter-count`. Для списка он только переключает `disabled` у опций. Текст вида `Бренд (12)` после первого же выбора в соседнем фильтре покажет устаревшее число.

### Одно значение

`multiple` на `<select>` не поддержан: при открытии страницы по ссылке с несколькими значениями фильтра JS выставляет их в список по очереди, и выбранным остаётся последнее. Если по фильтру нужно выбирать несколько значений — оставьте чекбоксы.

## Если что-то не так

| Симптом | Причина |
|---------|---------|
| Внутри блока чекбоксов появились голые `<option>` | Ключ фильтра добавлен в `$selectKeys` чанка значения, но не в чанке обёртки |
| Список пустой, а значения выведены чекбоксами рядом | Наоборот: ключ есть в обёртке, но нет в чанке значения |
| После фильтрации пустые значения не блокируются | `name` с `[]` |
| «Назад» в браузере не отменяет выбор в этом фильтре | `name` с `[]` |
| Фильтр нельзя снять, не сбросив форму | Нет опции с пустым значением |

Первые две строки — следствие того, что список ключей стоит в двух чанках. Короче не сделать: чанк значения рендерится раньше обёртки, и общих переменных у них нет.

Полный список переменных обоих чанков — в [Плейсхолдерах](../frontend/placeholders#chanki-mfilterform-forma-filtrov).
