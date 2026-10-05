---
title: "address"
description: "Текст адреса и координаты lat, lng. Слой Pro."
---

# Поле address

Версия: **Pro** (`advanced-fields`).

Объект `text`, `lat`, `lng`. Координаты хранятся строками. При чтении в менеджере устаревший ключ `address` в объекте трактуется как `text`. Карту собирает секция [map](../sections/map) или ваш chunk.

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

::: code-group

```modx
<address>[[+office.text]]</address>
```

```fenom
<address>{$office.text|pb_text}</address>
```

:::

## Похожие типы

- [map](map) для встраивания карты
- Секция [Адреса](../sections/locations) для списка точек
