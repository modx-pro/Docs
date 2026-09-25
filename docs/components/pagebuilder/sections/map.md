---
title: "Карта"
description: "Встраивание карты по координатам (Яндекс.Карты по умолчанию). Слой Pro."
---

# Карта

Точка на карте по координатам или адресу. Iframe собирает `MapEmbedResolver`. Провайдер по умолчанию: Яндекс.Карты.

![Карта](/components/pagebuilder/screenshots/sections/map.jpg)

## Отдельная карта

- Координаты в поле map, iframe собирает resolver
- Провайдер в поле map: `yandex` по умолчанию или `osm` (OpenStreetMap)
- Отдельно от текста контактов

## Сценарии

- На странице контактов: офис или шоурум
- В блоке доставки: зона покрытия одной точкой
- На странице события: место проведения

## Примеры страниц

- Контакты: [Contact](contact) → [Map](map)
- Филиал: [Hero](hero) → [Map](map) → [FAQ](faq)

## Точка на карте

Поле **Точка на карте** (map): координаты и масштаб. Заголовок секции необязателен.

## Похожие секции

- [Контакты с картой](contact_map) для объединённого блока
- Статичная картинка в [Изображении](image), если интерактив не нужен

## Параметры блока

| Параметр | Значение |
| --- | --- |
| key | `map` |
| Слой | Pro |
| Категория | медиа (`media`) |
| Chunk | `pagebuilderpro_map` |
| Требования | pro |

## Поля в редакторе

Заполните поля в инспекторе секции на ресурсе. Описание типов полей: [справочник типов](../fields/types).

### Заголовок (`title`)

Тип [text](../fields/text#vyvod-v-section-data). Необязательное.

### Карта (`location`)

Тип [map](../fields/map#vyvod-v-section-data). Обязательное. Точка на карте. На сайте. iframe через MapEmbedResolver.

## Что видит посетитель

Iframe в блоке `pb-map`.

## Данные секции {#vyvod-v-section-data}

Пример JSON после сохранения и enrich (`MapEmbedResolver`). Полный контракт поля map — в [справочнике map](../fields/map#vyvod-v-section-data).

```json
{
  "title": "Заголовок секции",
  "location": {
    "lat": 55.751244,
    "lng": 37.618423,
    "zoom": 14,
    "provider": "yandex",
    "embed_url": "https://yandex.ru/map-widget/v1/?ll=37.618423%2C55.751244&z=14&pt=37.618423%2C55.751244%2Cpm2rdm&l=map",
    "watch_url": "https://yandex.ru/maps/?ll=37.618423%2C55.751244&z=14&pt=37.618423%2C55.751244%2Cpm2rdm&l=map"
  },
  "map_embed_url": "https://yandex.ru/map-widget/v1/?ll=37.618423%2C55.751244&z=14&pt=37.618423%2C55.751244%2Cpm2rdm&l=map",
  "map_provider": "yandex",
  "map_watch_url": "https://yandex.ru/maps/?ll=37.618423%2C55.751244&z=14&pt=37.618423%2C55.751244%2Cpm2rdm&l=map"
}
```

Плоские `map_embed_url`, `map_provider`, `map_watch_url` дублируют embed для chunk (приоритет у `location`). Chunk читает `$map_embed_url` и `$map_watch_url`.

## Шаблон chunk

Fenom chunk `pagebuilderpro_map`:

```fenom
<section class="pb-section pb-section--map pb-map{if $cssClass} {$cssClass|escape}{/if}" data-pb-section="map"{if $id} id="pb-{$id|escape}"{/if}>
  <div class="pb-section__inner pb-map__inner">
    {if $title}
      <h2 class="pb-heading pb-map__title">{$title|escape}</h2>
    {/if}
    {if $map_embed_url}
      <div class="pb-map__embed">
        <iframe
          class="pb-map__frame"
          title="{$title|default:'Map'|escape}"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          src="{$map_embed_url|escape}"
        ></iframe>
      </div>
    {elseif $map_watch_url}
      <p><a class="pb-button" href="{$map_watch_url|escape}">{'pagebuilder_fe_map_open' | lexicon}</a></p>
    {/if}
  </div>
</section>
```

## Связанные страницы

- [Каталог секций](index)
- [Обзор полей](../fields/overview)
- [Вывод на сайте](../frontend)
