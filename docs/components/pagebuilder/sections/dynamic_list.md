---
title: "Динамический список"
description: "Список записей провайдера datasource. Capability datasources. Слой Pro."
---

# Динамический список

Секция `dynamic_list` показывает записи провайдера на момент рендера. Chunk: `pagebuilderpro_dynamic_list`. Нужны PageBuilder Pro и capability `datasources`.

![Динамический список](/components/pagebuilder/screenshots/sections/dynamic_list.jpg)

Провайдеры: `modx-resources`, `pagebuilder-tables`, `minishop3`. В поле `datasource` выбирают провайдера, при необходимости ключ таблицы, фильтры, sort и limit. Enrich вызывает `DatasourceQueryService` и передаёт в чанк `items` и `total`.

Превью в менеджере: `mgr/datasource/query`.

Секция входит в контекст страницы, чтобы HTML-кеш не замораживал живой список. Без Pro опубликованный HTML заново не строится: у типа `requires: ["pro"]`.

## Запрос

Запрос принимает только объявленные поля и операторы `eq`, `contains`, `in`, `gte`, `lte`, `between`, `empty`, `not_empty`. `contains` не различает регистр, включая кириллицу. Недопустимые операторы отсекает `QueryPolicy`. Ключи `sql`, `php`, `snippet` и `class` в payload и context запроса отклоняет `QueryRequest` (и `DatasourceQueryService` для context). Лимит секции и запроса обрезается до 100 без ошибки.

## Поля

| Поле | Тип | Обязательно | Назначение |
| --- | --- | --- | --- |
| `title` | text | нет | Заголовок секции |
| `datasource` | datasource | да | Провайдер, фильтры, sort, limit |
| `limit` | number | нет | Лимит строк |

## Рендер

`ProSectionRenderSupport` наполняет `items`. Подпись строки берётся по цепочке `pagetitle`, `title`, `name`, `label`, `id`. Ссылка есть только при `uri`. Иначе `<span>`. Если у записи есть `image`, карточка его показывает.

Ошибка запроса пишется в `query_error`. Без capability `datasources` текст `Datasources are not available.` Пустой провайдер: `Datasource is not configured.` Пустой результат: лексикон `pagebuilder_fe_list_empty`, запасная строка `No items.`

## Данные секции {#vyvod-v-section-data}

```json
{
  "title": "Новости",
  "datasource": {
    "provider": "modx-resources",
    "table": "",
    "filters": [{ "field": "parent", "op": "eq", "value": "5" }],
    "sort": [{ "field": "publishedon", "direction": "desc" }],
    "search": "",
    "limit": 20
  },
  "limit": 8
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_dynamic_list`:

```fenom
<section class="pb-section pb-section--dynamic-list" data-pb-section="dynamic_list"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner">
    {if $title}<h2 class="pb-heading">{$title|escape}</h2>{/if}
    {if $query_error}
      <p class="pb-dynamic-list__error" role="status">{$query_error|escape}</p>
    {elseif !$items || $items|count == 0}
      <p class="pb-dynamic-list__empty" role="status">{$lex_empty|default:'No items.'|escape}</p>
    {else}
      <ul class="pb-dynamic-list__items">
        {foreach $items as $item}
          <li class="pb-dynamic-list__item">
            {set $label = $item.pagetitle|default:$item.title|default:$item.name|default:$item.label|default:$item.id}
            {if $item.image}
              <img class="pb-dynamic-list__image" src="{$item.image|escape}" alt="{$label|escape}" loading="lazy" />
            {/if}
            {if $item.uri}
              <a href="{$item.uri|escape}">{$label|escape}</a>
            {elseif $item.alias}
              <span>{$label|escape}</span>
            {else}
              <span>{$label|escape}</span>
            {/if}
          </li>
        {/foreach}
      </ul>
    {/if}
  </div>
</section>
```

## Похожие секции

- [Сетка с фильтром](filterable_grid) для фильтров и пагинации
- [Записи блога](blog_posts) для дочерних ресурсов через `pdoResources`

## Связанные страницы

- [Каталог секций](index)
- [PageBuilder Pro](../pro)
