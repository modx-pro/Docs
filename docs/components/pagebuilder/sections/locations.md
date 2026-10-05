---
title: "Адреса"
description: "Список точек с названием, адресом и ссылкой. Слой Pro."
---

# Адреса

Секция `locations` выводит точки из repeater. Chunk: `pagebuilderpro_locations`. Требуется PageBuilder Pro. Карту эта секция не встраивает.

![Адреса](/components/pagebuilder/screenshots/sections/locations.jpg)

## Где уместна

- Офисы и магазины списком
- Пункты выдачи без iframe карты
- Контакты филиалов

## Поля

| Поле | Тип | Обязательно | Назначение |
| --- | --- | --- | --- |
| `title` | text | нет | Заголовок секции |
| `items` | repeater | да | Точки |
| `items.title` | text | да | Название |
| `items.address` | textarea | нет | Адрес |
| `items.url` | url | нет | Ссылка |

## Рендер

Список `ul.pb-locations__list`. Адрес печатается, если заполнен. Ссылка ведёт на `url`, текст ссылки тоже `url`, отдельной подписи нет. Пустой repeater оставляет пустой список. Это не карта.

## Данные секции {#vyvod-v-section-data}

```json
{
  "title": "Офисы",
  "items": [
    {
      "title": "Центр",
      "address": "ул. Пример, 1",
      "url": "https://example.com/map"
    }
  ]
}
```

## Шаблон chunk

Fenom chunk `pagebuilderpro_locations`:

```fenom
<section class="pb-section pb-section--locations pb-locations{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="locations"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner">
    {if $title}<h2 class="pb-heading">{$title|escape}</h2>{/if}
    <ul class="pb-locations__list">
      {foreach $items as $item}
        <li class="pb-locations__item">
          <h3>{$item.title|escape}</h3>
          {if $item.address}<p>{$item.address|escape}</p>{/if}
          {if $item.url}<p><a href="{$item.url|escape}">{$item.url|escape}</a></p>{/if}
        </li>
      {/foreach}
    </ul>
  </div>
</section>
```

## Похожие секции

- [Карта](map) для одной точки с iframe
- [Контакты с картой](contact_map) для телефона, текста и карты в одном блоке

## Связанные страницы

- [Каталог секций](index)
