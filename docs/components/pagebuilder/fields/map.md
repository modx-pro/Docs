---
title: "map"
description: "Точка на карте с enrich embed_url и watch_url"
---

# Поле map

Версия: **Pro** (`advanced-fields`).

<!-- ![map](/components/pagebuilder/screenshots/fields/map.jpg) -->

## Зачем этот тип

Широта, долгота, масштаб и провайдер карты в инспекторе (отдельного поля «улица» нет — текстовый адрес у типа [address](address)). После save enrich добавляет `embed_url` и `watch_url` любому объекту с ключами `lat` и `lng`. Плоские `map_embed_url`, `map_provider`, `map_watch_url` пишутся при первом успешном embed; при нескольких точках приоритет у ключа `location`.

## Когда использовать

- Офис на странице контактов
- Одна точка доставки или самовывоза
- Карта рядом с формой

## Советы

Несколько точек собирают полем [repeater](repeater): широта и долгота отдельными текстовыми полями или своей схемой. Адрес встраивания берите из сохранённых данных, не собирайте ссылку вручную.

## Похожие типы

- [text](textarea) для адреса без координат
- [url](url), если нужна готовая ссылка на карты и точку не выбирают на карте

## Настройка

```json
{
  "name": "location",
  "type": "map",
  "label": "Карта",
  "tab": "Контент",
  "width": 100,
  "active": true
}
```

## Значение

Объект `{ lat, lng, zoom, provider }`; enrich: `embed_url` в объекте и плоский `map_embed_url`.

## Данные секции {#vyvod-v-section-data}

Ключ `location` в данных секции после save enrich (`MapEmbedResolver`):

```json
{
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

- Плоские `map_embed_url`, `map_provider`, `map_watch_url` дублируют embed первого map-поля (приоритет у ключа `location`).
- Провайдер по умолчанию `yandex`; `osm`: OpenStreetMap.

## Пример в chunk

::: code-group

```modx
<iframe src="[[+location.embed_url]]" title="Карта"></iframe>
```

```fenom
<iframe src="{$location.embed_url|default($map_embed_url)|escape}" title="Карта"></iframe>
```

:::

## Общие свойства

Для полей с `name`, которые сохраняются в данных секции:

| Ключ | Тип | Роль | Панель |
| --- | --- | --- | --- |
| `tab` | string | Подзаголовок группы в инспекторе | да |
| `width` | 25, 33, 50, 66, 75, 100 | Ширина поля в % строки (flex); в CMP только эти значения | да |
| `description` | string | Подсказка под подписью | да |
| `default` | any | Начальное значение новой секции | да |
| `active` | bool | `false`: скрыть поле в инспекторе | да |
| `required` | bool | Обязательно при **publish** (черновик сохраняется) | да |

- Дополнительно: enrich добавляет `embed_url`, `watch_url` и плоские `map_*` в данных секции.

Подробнее: [обзор полей](overview#общие-свойства-поля).

## Дальше

- [Справочник типов](types)
- [Обзор полей](overview)
- [Pro в менеджере](../integration)
