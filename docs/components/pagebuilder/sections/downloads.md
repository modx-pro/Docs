---
title: "Загрузки"
description: "Список файлов с названием и описанием. Слой Pro."
---

# Загрузки

Секция `downloads` выводит файлы из repeater. Chunk: `pagebuilderpro_downloads`. Требуется PageBuilder Pro.

Поле `file` на сайте отдаёт `url` media-записи.

![Загрузки](/components/pagebuilder/screenshots/sections/downloads.jpg)

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `downloads` |
| Слой | Pro |
| Категория | контент (`content`) |
| Chunk | `pagebuilderpro_downloads` |
| Требования | pro |

## Где уместна

- Прайс, презентация, инструкция
- Документы к продукту
- Материалы после описания услуги

## Поля

| Поле | Тип | Обязательно | Назначение |
| --- | --- | --- | --- |
| `title` | text | нет | Заголовок секции |
| `items` | repeater | да | Файлы |
| `items.title` | text | да | Название |
| `items.file` | file | да | Файл |
| `items.description` | textarea | нет | Описание |

## Рендер

Список `ul.pb-downloads__list`. `file` может быть строкой или объектом с `url`. Если URL пустой, заголовок остаётся `<span>`, не ссылкой. Пустой repeater оставляет пустой список.

## Данные секции {#vyvod-v-section-data}

```json
{
  "title": "Файлы",
  "items": [
    {
      "title": "Прайс",
      "file": { "url": "assets/files/price.pdf" },
      "description": "PDF, 1 МБ"
    }
  ]
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_downloads`:

```fenom
<section class="pb-section pb-section--downloads pb-downloads{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="downloads"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner">
    {if $title}<h2 class="pb-heading">{$title|escape}</h2>{/if}
    <ul class="pb-downloads__list">
      {foreach $items as $item}
        {set $fileUrl = is_array($item.file) ? ($item.file.url ?: '') : ($item.file ?: '')}
        <li class="pb-downloads__item">
          {if $fileUrl}
            <a href="{$fileUrl|escape}">{$item.title|escape}</a>
          {else}
            <span>{$item.title|escape}</span>
          {/if}
          {if $item.description}<p>{$item.description|escape}</p>{/if}
        </li>
      {/foreach}
    </ul>
  </div>
</section>
```

## Похожие секции

- [Текстовый блок](richtext), если файл один и вставлен ссылкой в текст

## Связанные страницы

- [Каталог секций](index)
