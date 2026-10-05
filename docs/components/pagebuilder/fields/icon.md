---
title: "icon"
description: "SVG из каталога Lucide или Heroicons. Не класс Font Awesome. Слой Pro."
---

# Поле icon

Версия: **Pro** (`advanced-fields`).

Иконку выбирают из двух наборов SVG: Lucide (ISC, 24×24) и Heroicons (MIT, 24×24). Класс вроде `fa-star` значением не является.

Имя иконки — строчные буквы, цифры и дефис. В инспекторе вводят `lucide:star` или объект `{ "set", "name" }`.

## Настройка

```json
{
  "name": "icon",
  "type": "icon",
  "label": "Иконка"
}
```

## Данные секции {#vyvod-v-section-data}

Сохранённое значение:

```json
{
  "icon": { "set": "lucide", "name": "star" }
}
```

При выводе у того же ключа появляется `svg`:

```json
{
  "icon": {
    "set": "lucide",
    "name": "star",
    "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" ...></svg>"
  }
}
```

Неизвестное имя даёт пустые `set`, `name` и `svg`.

## Пример в chunk

`svg` уже HTML: не прогоняйте его через `escape`.

::: code-group

```modx
<span class="pb-icon">[[+icon.svg]]</span>
```

```fenom
<span class="pb-icon">{$icon.svg|raw}</span>
```

:::

## Похожие типы

- [image](image), если нужен свой файл, а не каталог
