---
title: "address"
description: "Текст адреса и координаты lat, lng. Слой Pro."
---

# Поле address

Версия: **Pro** (`advanced-fields`).

Объект `text`, `lat`, `lng`. Координаты хранятся строками. Карту собирает секция [map](../sections/map) или ваш chunk.

## Настройка

```json
{
  "name": "office",
  "type": "address",
  "label": "Адрес"
}
```

## Данные секции {#vyvod-v-section-data}

```json
{
  "office": {
    "text": "Москва, ул. Пример, 1",
    "lat": "55.75",
    "lng": "37.62"
  }
}
```

## Пример в chunk

```html
<address>{$office.text|escape}</address>
```

## Похожие типы

- [map](map) для встраивания карты
- Секция [Адреса](../sections/locations) для списка точек
