---
title: "Сетка с фильтром"
description: "Записи datasource с фильтрами, сортировкой и пагинацией. Слой Pro."
---

# Сетка с фильтром

Секция `filterable_grid` показывает записи с фильтрами в URL. На сайте форма, сортировка и пагинация идут через Ajax (`pagebuilder-filterable-grid.js`), адрес обновляет `history.pushState`. Без JavaScript остаётся обычный GET. Chunk: `pagebuilderpro_filterable_grid`. Нужны PageBuilder Pro и capability `datasources`.

![Сетка с фильтром](/components/pagebuilder/screenshots/sections/filterable_grid.jpg)

1. Выберите datasource: `modx-resources`, `pagebuilder-tables` или `minishop3`.
2. Для таблиц укажите ключ `table`.
3. На сайте форма пишет в URL `pb_fg_{sectionId}_search`, `_sort`, `_dir`, `_page` и `_f_{поле}`. Кнопка сброса берёт лексикон `pagebuilder_fe_filter_clear`.

Пагинация в чанке идёт через `range` и `foreach`. Fenom `{for}` здесь не поддерживается.

Операторы запроса те же, что у [динамического списка](dynamic_list): `eq`, `contains`, `in`, `gte`, `lte`, `between`, `empty`, `not_empty`. `contains` не различает регистр, включая кириллицу. Ключи `sql`, `php`, `snippet` и `class` в payload и context отклоняет `QueryRequest`. Размер страницы (`limit`) обрезается до 100 без ошибки.

Подписи фильтров берутся из `label` колонки схемы таблицы, не из ключа поля. В форме и сортировке UI колонки типа `image` нет. Прямой GET с `f_*` по полю-картинке сервер по типу не отсекает. В форме тип поля задаёт оператор: text → `contains`, number и currency → `gte`, color → `eq`. Номер страницы пагинации больше последней приводится к последней.

Секция входит в контекст страницы, чтобы HTML-кеш не замораживал фильтр.

## Поля

| Поле | Тип | Обязательно | Назначение |
| --- | --- | --- | --- |
| `title` | text | нет | Заголовок секции |
| `datasource` | datasource | да | Провайдер и query |
| `limit` | number | нет | Размер страницы |

## Рендер

Форма `method="get"`. Скрипт `pagebuilder-filterable-grid.js` отправляет её через Ajax и пишет те же параметры в адрес через `history.pushState`. Без скрипта остаётся обычная отправка GET. Префикс параметров `pb_fg_{id}_`, его пишет `DatasourceSectionEnricher` в `filter_param_prefix`. Имена: `search`, `sort`, `dir`, `f_{поле}`, `page`. Поле `id` в фильтрах пропускается.

Пагинация рисуется, если `page_count` больше 1. Пустой результат: лексикон `pagebuilder_fe_filter_empty`, запасная строка `No items.` Ошибки те же, что у [динамического списка](dynamic_list).

## Данные секции {#vyvod-v-section-data}

```json
{
  "title": "Каталог",
  "datasource": {
    "provider": "modx-resources",
    "table": "",
    "filters": [],
    "sort": [{ "field": "menuindex", "direction": "asc" }],
    "search": "",
    "limit": 12
  },
  "limit": 12
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_filterable_grid`:

```fenom
{set $prefix = $filter_param_prefix|default:'pb_fg_'}
{set $sectionDomId = $id|default:'filterable_grid'}
{set $qs = ''}
{if $search_value}{set $qs = $qs ~ '&' ~ $prefix ~ 'search=' ~ ($search_value|urlencode)}{/if}
{if $sort_field}{set $qs = $qs ~ '&' ~ $prefix ~ 'sort=' ~ ($sort_field|escape) ~ '&' ~ $prefix ~ 'dir=' ~ ($sort_direction|escape)}{/if}
{if $filter_values}
  {foreach $filter_values as $fname => $fval}
    {if $fval !== ''}{set $qs = $qs ~ '&' ~ $prefix ~ 'f_' ~ $fname ~ '=' ~ ($fval|urlencode)}{/if}
  {/foreach}
{/if}
<section
  class="pb-section pb-section--filterable-grid pb-filterable-grid"
  data-pb-section="filterable_grid"
  data-pb-filterable-grid
  data-pb-fg-prefix="{$prefix|escape}"
  data-pb-fg-loading="{$lex_loading|default:'Loading…'|escape}"
  {if $id} id="pb-{$id|escape}"{/if}
>
  <div class="pb-section__inner">
    {if $title}<h2 class="pb-heading pb-filterable-grid__title">{$title|escape}</h2>{/if}

    <form class="pb-filterable-grid__filters" method="get" action="" data-pb-fg-form>
      <div class="pb-filterable-grid__toolbar">
        <label class="pb-filterable-grid__search" for="pb-{$sectionDomId|escape}-search">
          <span class="pb-filterable-grid__label">{$lex_search|default:'Search'|escape}</span>
          <input
            id="pb-{$sectionDomId|escape}-search"
            class="pb-filterable-grid__control"
            type="search"
            name="{$prefix|escape}search"
            value="{$search_value|escape}"
            autocomplete="off"
          />
        </label>
        {if $datasource_field_defs}
          <label class="pb-filterable-grid__sort" for="pb-{$sectionDomId|escape}-sort">
            <span class="pb-filterable-grid__label">{$lex_sort|default:'Sort'|escape}</span>
            <select id="pb-{$sectionDomId|escape}-sort" class="pb-filterable-grid__control" name="{$prefix|escape}sort">
              <option value="">{$lex_select_placeholder|default:'—'|escape}</option>
              {foreach $datasource_field_defs as $field}
                {if $field.type == 'image' || $field.key == 'id'}{continue}{/if}
                <option value="{$field.key|escape}"{if $sort_field == $field.key} selected{/if}>{$field.label|default:$field.key|escape}</option>
              {/foreach}
            </select>
          </label>
          <label class="pb-filterable-grid__dir" for="pb-{$sectionDomId|escape}-dir">
            <span class="pb-filterable-grid__label">{$lex_direction|default:'Direction'|escape}</span>
            <select id="pb-{$sectionDomId|escape}-dir" class="pb-filterable-grid__control" name="{$prefix|escape}dir">
              <option value="asc"{if $sort_direction != 'desc'} selected{/if}>{$lex_dir_asc|default:'asc'|escape}</option>
              <option value="desc"{if $sort_direction == 'desc'} selected{/if}>{$lex_dir_desc|default:'desc'|escape}</option>
            </select>
          </label>
        {/if}
      </div>

      {if $datasource_field_defs}
        <fieldset class="pb-filterable-grid__fields">
          <legend class="pb-filterable-grid__legend">{$lex_filters_legend|default:'Filters'|escape}</legend>
          <div class="pb-filterable-grid__fields-grid">
            {foreach $datasource_field_defs as $field}
              {if $field.key == 'id' || $field.type == 'image'}{continue}{/if}
              {set $ftype = $field.type|default:'text'}
              {set $fid = 'pb-' ~ $sectionDomId ~ '-f-' ~ $field.key}
              {set $fval = $filter_values[$field.key]|default:''}
              <label class="pb-filterable-grid__field" for="{$fid|escape}">
                <span class="pb-filterable-grid__label">{$field.label|default:$field.key|escape}</span>
                {if $ftype == 'number' || $ftype == 'currency'}
                  <input
                    id="{$fid|escape}"
                    class="pb-filterable-grid__control"
                    type="number"
                    inputmode="decimal"
                    min="0"
                    step="any"
                    name="{$prefix|escape}f_{$field.key|escape}"
                    value="{$fval|escape}"
                    placeholder="{$lex_price_from|default:''|escape}"
                  />
                {elseif $ftype == 'color' || $ftype == 'colorpalette'}
                  <span class="pb-filterable-grid__color">
                    <input
                      id="{$fid|escape}"
                      class="pb-filterable-grid__control pb-filterable-grid__control--color-text"
                      type="text"
                      name="{$prefix|escape}f_{$field.key|escape}"
                      value="{$fval|escape}"
                      placeholder="#2563eb"
                      spellcheck="false"
                      autocomplete="off"
                      data-pb-fg-color-text
                    />
                    <input
                      class="pb-filterable-grid__control pb-filterable-grid__control--color"
                      type="color"
                      value="{if $fval}{$fval|escape}{else}#2563eb{/if}"
                      aria-label="{$field.label|default:$field.key|escape}"
                      data-pb-fg-color-swatch
                      tabindex="-1"
                    />
                  </span>
                {else}
                  <input
                    id="{$fid|escape}"
                    class="pb-filterable-grid__control"
                    type="text"
                    name="{$prefix|escape}f_{$field.key|escape}"
                    value="{$fval|escape}"
                  />
                {/if}
              </label>
            {/foreach}
          </div>
        </fieldset>
      {/if}

      <div class="pb-filterable-grid__actions">
        <button type="submit" class="pb-button pb-filterable-grid__submit">{$lex_filter|default:'Filter'|escape}</button>
        <button type="reset" class="pb-button pb-button--secondary pb-filterable-grid__clear" data-pb-fg-clear>{$lex_clear|default:'Clear'|escape}</button>
      </div>
    </form>

    <div class="pb-filterable-grid__results" data-pb-fg-results aria-live="polite" aria-busy="false" aria-label="{$lex_results|default:'Results'|escape}">
      {if $query_error}
        <p class="pb-filterable-grid__error" role="alert">{$query_error|escape}</p>
      {elseif !$items || $items|count == 0}
        <p class="pb-filterable-grid__empty" role="status">{$lex_empty|default:'No items.'|escape}</p>
      {else}
        <div class="pb-filterable-grid__items">
          {foreach $items as $item}
            <article class="pb-filterable-grid__card">
              {set $label = $item.pagetitle|default:$item.title|default:$item.name|default:$item.label|default:$item.id}
              {if $item.image}
                {if $item.uri}
                  <a class="pb-filterable-grid__media" href="{$item.uri|escape}">
                    <img class="pb-filterable-grid__image" src="{$item.image|escape}" alt="{$label|escape}" loading="lazy" />
                  </a>
                {else}
                  <img class="pb-filterable-grid__image" src="{$item.image|escape}" alt="{$label|escape}" loading="lazy" />
                {/if}
              {/if}
              <div class="pb-filterable-grid__card-body">
                <h3 class="pb-filterable-grid__card-title">
                  {if $item.uri}
                    <a href="{$item.uri|escape}">{$label|escape}</a>
                  {else}
                    {$label|escape}
                  {/if}
                </h3>
                {if $item.price !== '' && $item.price !== null}
                  <p class="pb-filterable-grid__meta">{$item.price|escape} ₽</p>
                {/if}
                {if $item.uri && !$item.image}
                  <p><a class="pb-filterable-grid__open" href="{$item.uri|escape}">{$lex_open|default:'Open'|escape}</a></p>
                {/if}
              </div>
            </article>
          {/foreach}
        </div>
        {if $page_count > 1}
          <nav class="pb-filterable-grid__pagination" aria-label="{$lex_pagination|default:'Pagination'|escape}" data-pb-fg-pagination>
            {set $pages = range(1, $page_count)}
            {foreach $pages as $p}
              {if $p == $page}
                <span aria-current="page">{$p}</span>
              {else}
                <a href="?{$prefix|escape}page={$p}{$qs}" data-pb-fg-page="{$p}">{$p}</a>
              {/if}
            {/foreach}
          </nav>
        {/if}
      {/if}
    </div>
  </div>
</section>
```

## Похожие секции

- [Динамический список](dynamic_list) без формы фильтров
- [Сетка товаров](products_grid) для витрины miniShop3 через `msProducts`

## Связанные страницы

- [Каталог секций](index)
- [PageBuilder Pro](../pro)
