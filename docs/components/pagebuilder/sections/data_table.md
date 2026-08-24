---
title: "Таблица данных"
description: "Строки из встроенной таблицы PageBuilder (embeddedTable). Слой Pro."
---

# Таблица данных

Данные хранятся в CMP или на вкладке **Таблицы** ресурса, а секция только выводит выбранную таблицу с лимитом строк.

<!-- ![Таблица данных](/components/pagebuilder/screenshots/sections/data_table.png) -->

::: info
Требуется PageBuilder Pro.
:::

## Зачем эта секция

- Одни данные в CMP, несколько секций могут ссылаться на `table_key`
- Обновление прайса без правки каждой страницы
- Лимит строк задаётся в секции

## Где применять

- **Прайс-лист** услуг
- **Расписание** мероприятий
- **Справочник** точек выдачи из одного источника

## Примеры страниц

- Услуги: [Hero](hero) → [Data table](data_table) прайс → [FAQ](faq)
- Событие: [Data table](data_table) расписание → [Contact form](contact_form)

## Что заполнить

В поле **Таблица** укажите `table_key` из CMP и **Лимит** строк. Сами данные редактируются не в инспекторе секции.

## Похожие секции

- [Таблица характеристик](spec_table) для фиксированных пар на одной странице
- [Текстовый блок](richtext) для разового текста без CMP

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

Тип [embeddedTable](../fields/embeddedTable#vyvod-v-section-data). Обязательное. Ссылка на таблицу из CMP PageBuilder: ключ таблицы и лимит строк.

## Что видит посетитель

Секция `pb-data-table` с HTML-таблицей.

## Вывод в section.data

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
      <h2 class="pb-heading pb-data-table__title">{$title|escape}</h2>
    {/if}
    {if $intro}
      <p class="pb-data-table__intro">{$intro|escape}</p>
    {/if}
    {if $table.table_key}
      <div class="pb-data-table__embed">
        {set $tableKey = $table.table_key}
        {set $tableLimit = $table.limit|default:20}
        {$modx->runSnippet('PageBuilderTableRows', [
          'table_key' => $tableKey,
          'limit' => $tableLimit,
          'return' => 'html'
        ])}
      </div>
    {/if}
  </div>
</section>
```

## JSON-определение

`PageBuilderPro/core/components/pagebuilderpro/sections/data_table.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
