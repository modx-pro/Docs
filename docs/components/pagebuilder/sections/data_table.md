---
title: "Таблица данных"
description: "Строки из встроенной таблицы PageBuilder (embeddedTable). Слой Pro."
---

# Таблица данных

Данные хранятся в панели управления или на вкладке **Таблицы** ресурса, а секция только выводит выбранную таблицу с лимитом строк.

![Таблица данных](/components/pagebuilder/screenshots/sections/data_table.jpg)

## Зачем таблица из панели управления

- Одни данные в панели управления, несколько секций могут ссылаться на `table_key`
- Обновление прайса без правки каждой страницы
- Лимит строк задаётся в секции

## Типичные данные

- Для прайс-листа услуг
- Для расписания мероприятий
- Для справочника точек выдачи из одного источника

## Примеры страниц

- Услуги: [Hero](hero) → [Data table](data_table) прайс → [FAQ](faq)
- Событие: [Data table](data_table) расписание → [Contact form](contact_form)

## table_key и лимит

В поле **Таблица** укажите `table_key` из панели управления и **Лимит** строк. Сами данные редактируются не в инспекторе секции. Тип помечен `"cacheable": false`.

## Похожие секции

- [Таблица характеристик](spec_table) для фиксированных пар на одной странице
- [Текстовый блок](richtext) для разового текста без панели управления

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `data_table` |
| Слой | Pro |
| Категория | контент (`content`) |
| Chunk | `pagebuilder_data_table` |
| Требования | pro |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Вступление (`intro`)

Тип [textarea](../fields/textarea#vyvod-v-section-data). Необязательное.

### Таблица (`table`)

Тип [embeddedTable](../fields/embeddedTable#vyvod-v-section-data). Обязательное. Ссылка на таблицу из Панель управления PageBuilder: ключ таблицы и лимит строк.

## Что видит посетитель

Секция `pb-data-table` с HTML-таблицей.

## Данные секции {#vyvod-v-section-data}

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "intro": "Краткое вступление перед основным содержимым.",
  "table": {
    "table_key": "prices",
    "limit": 10
  }
}
```

## Шаблон chunk

Fenom chunk `pagebuilder_data_table`:

```fenom
<section class="pb-section pb-section--data-table pb-data-table{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="data_table"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-data-table__inner">
    {if $title}
      <h2 class="pb-heading pb-data-table__title">{$title|pb_text}</h2>
    {/if}
    {if $intro}
      <p class="pb-data-table__intro">{$intro|escape}</p>
    {/if}
    {if $table.table_key}
      {set $resourceId = $resource_id|default:($modx->resource ? $modx->resource->get('id') : 0)}
      {set $tableListing = $modx->runSnippet('PageBuilderTableRows', [
        'resource_id' => $resourceId,
        'table_key' => $table.table_key,
        'limit' => $table.limit|default:20,
        'return' => 'html'
      ])}
      <div class="pb-data-table__embed">
        {$tableListing}
      </div>
    {/if}
  </div>
</section>
```

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
