---
title: "Таблица характеристик"
description: "Таблица «параметр / значение» с вступительным текстом. Слой Pro."
---

# Таблица характеристик

Двухколоночная таблица для технических данных. Сверху необязательный заголовок и вступление.

<!-- ![Таблица характеристик](/components/pagebuilder/screenshots/sections/spec_table.png) -->

::: info
Требуется PageBuilder Pro.
:::

## Зачем эта секция

- Параметр и значение в таблице, не в prose
- Вступление и заголовок секции опциональны
- Поле `table` редактируется в инспекторе

## Где применять

- **Карточка товара** — вес, размер, материал
- **Страница оборудования** — specs
- **Сравнение** одного продукта с нормой

## Примеры страниц

- Товар (описание): [Tabs](tabs) → вкладка «Характеристики» = [Spec table](spec_table)
- Оборудование: [Hero](hero) → [Spec table](spec_table) → [CTA](cta)

## Что заполнить

Поле **Характеристики** типа table: колонки параметр и значение. **Чередующиеся строки** включает zebra-стиль.

## Похожие секции

- [Таблица данных](data_table) для строк из CMP embeddedTable
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

### Чередующиеся строки (`striped`)

Тип [yesno](../fields/yesno#vyvod-v-section-data). Необязательное. Переключатель да/нет.

## Что видит посетитель

HTML-таблица `pb-spec-table`.

## Вывод в section.data

Пример JSON после сохранения секции. Для media, video и map значения на выводе могут быть обогащены:

```json
{
  "title": "Заголовок секции",
  "intro": "Краткое вступление перед основным содержимым.",
  "striped": true
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_spec_table`:

```fenom
{var $rows = $spec_rows|default:($specs|default:[])}
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
              <th scope="col">Параметр</th>
              <th scope="col">Значение</th>
            </tr>
          </thead>
          <tbody>
            {foreach $rows as $row}
              <tr>
                <th scope="row">{$row.label|default:''|escape}</th>
                <td>{$row.value|default:''|escape}</td>
              </tr>
            {/foreach}
          </tbody>
        </table>
      </div>
    {else}
      <p class="pb-spec-table__empty">Добавьте строки характеристик в инспекторе.</p>
    {/if}
  </div>
</section>
```

## JSON-определение

`PageBuilderPro/core/components/pagebuilderpro/sections/spec_table.json`

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
