---
title: "Таблица характеристик"
description: "Таблица «параметр / значение» с вступительным текстом. Слой Pro."
---

# Таблица характеристик

Двухколоночная таблица для технических данных. Сверху необязательный заголовок и вступление.

![Таблица характеристик](/components/pagebuilder/screenshots/sections/spec_table.jpg)

## Specs в таблице

- Параметр и значение в таблице, не в prose
- Вступление и заголовок секции опциональны
- Поле `table` редактируется в инспекторе

## Типичные страницы

- На карточке товара: вес, размер, материал
- На странице оборудования: specs
- Для сравнения одного продукта с нормой

## Примеры страниц

- Товар (описание): [Tabs](tabs) → вкладка «Характеристики» = [Spec table](spec_table)
- Оборудование: [Hero](hero) → [Spec table](spec_table) → [CTA](cta)

## Таблица характеристик

Поле **Характеристики** типа table: колонки параметр и значение. **Чередующиеся строки** включает zebra-стиль.

## Похожие секции

- [Таблица данных](data_table) для строк из embeddedTable в панели управления
- [Сравнение товаров](product_comparison) для нескольких SKU (MS3)

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `spec_table` |
| Слой | Pro |
| Категория | контент (`content`) |
| Chunk | `pagebuilderpro_spec_table` |
| Требования | pro |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Вступление (`intro`)

Тип [textarea](../fields/textarea#vyvod-v-section-data). Необязательное.

### Характеристики (`specs`)

Тип [table](../fields/table#vyvod-v-section-data). Обязательное. Таблица с фиксированными колонками.

Колонки:

| Колонка | Тип | Подпись |
| --- | --- | --- |
| `label` | text | Параметр |
| `value` | text | Значение |

В инспекторе доступны строки-группы (`_pbGroup`), объединение ячеек (`_span` по `label` / `value`) и превью под сеткой.

### Чередующиеся строки (`striped`)

Тип [yesno](../fields/yesno#vyvod-v-section-data). Необязательное. Переключатель да/нет.

## Что видит посетитель

HTML-таблица `pb-spec-table`. При `striped` добавляется `pb-spec-table--striped`. Группы — `pb-spec-table__row--group`. Строки, полностью закрытые span, — `pb-spec-table__row--span-cont`.

## Данные секции {#vyvod-v-section-data}

Пример JSON после сохранения. На выводе Pro добавляет `spec_rows` через `TableCells::present()` (`_pb_cells` у каждой строки):

```json
{
  "title": "Характеристики",
  "intro": "Основные параметры модели.",
  "striped": true,
  "specs": [
    { "label": "Габариты", "value": "", "_pbGroup": true },
    {
      "label": "Память",
      "value": "128 ГБ",
      "_span": { "value": { "colspan": 1, "rowspan": 2 } }
    },
    { "label": "Толщина с чехлом", "value": "" },
    { "label": "Цвет", "value": "Графит" }
  ]
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_spec_table` берёт `$spec_rows`, иначе `$specs`:

```fenom
{set $rows = $spec_rows|default:($specs|default:[])}
<section class="pb-section pb-section--spec-table pb-spec-table{if $striped} pb-spec-table--striped{/if}{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="spec_table"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-spec-table__inner">
    {if $title}
      <h2 class="pb-heading pb-spec-table__title">{$title|escape}</h2>
    {/if}
    {if $intro}
      <p class="pb-spec-table__intro">{$intro|escape}</p>
    {/if}
    {if $rows && ($rows | length) > 0}
      <div class="pb-spec-table__scroll">
        <table class="pb-spec-table__table">
          <thead>
            <tr>
              <th scope="col">{'pagebuilder_fe_spec_param' | lexicon}</th>
              <th scope="col">{'pagebuilder_fe_spec_value' | lexicon}</th>
            </tr>
          </thead>
          <tbody>
            {foreach $rows as $row}
              {if $row._pbGroup}
                <tr class="pb-spec-table__row--group">
                  <th colspan="2" scope="colgroup">{$row.label|default:''|escape}</th>
                </tr>
              {elseif $row._pb_cells.label.hidden && $row._pb_cells.value.hidden}
                <tr class="pb-spec-table__row--span-cont" aria-hidden="true"></tr>
              {else}
                <tr>
                  {if !$row._pb_cells.label.hidden}
                    <th scope="row" colspan="{$row._pb_cells.label.colspan|default:1}" rowspan="{$row._pb_cells.label.rowspan|default:1}">{$row.label|default:''|escape}</th>
                  {/if}
                  {if !$row._pb_cells.value.hidden}
                    <td colspan="{$row._pb_cells.value.colspan|default:1}" rowspan="{$row._pb_cells.value.rowspan|default:1}">{$row.value|default:''|escape}</td>
                  {/if}
                </tr>
              {/if}
            {/foreach}
          </tbody>
        </table>
      </div>
    {else}
      <p class="pb-spec-table__empty">{'pagebuilder_fe_spec_empty' | lexicon}</p>
    {/if}
  </div>
</section>
```

Текст ячеек экранируется (`|escape`). HTML из редактора на сайте не исполняется.

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
